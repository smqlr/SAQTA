// Смесь «своя голова + нулевое обучение по текстам»: подбор веса w и температуры t на проверочной части.
// Голова считается так же, как в приложении (makeHead в src/ai/engine.js) — заодно проверка той реализации.
// node ens.mjs <head.json> <feats-префикс> <text-emb.json> <app.f32>
import { readFileSync } from 'node:fs';
const [headPath, featPrefix, textPath, appPath] = process.argv.slice(2);
const H = JSON.parse(readFileSync(headPath, 'utf8'));
const T = JSON.parse(readFileSync(textPath, 'utf8'));
const val = JSON.parse(readFileSync(headPath.replace('.json', '.val.json'), 'utf8'));
const meta = JSON.parse(readFileSync(featPrefix + '.meta.json', 'utf8'));
const all = new Float32Array(readFileSync(featPrefix + '.f32').buffer.slice(0));
const D = H.dim, K = H.classes.length;
const text = H.classes.map((c) => T[c]);
const rowOf = new Map(meta.map(([si, v], r) => [`${si}:${v}`, r]));
const W = H.W.map((w) => ({ shape: w.shape, d: Float32Array.from(w.data) }));
const mean = Float32Array.from(H.mean), std = Float32Array.from(H.std);
const dense = (x, w, b, relu) => { const [n, m] = w.shape, out = new Float32Array(m); for (let j = 0; j < m; j++) out[j] = b.d[j]; for (let i = 0; i < n; i++) { const xi = x[i]; if (!xi) continue; const o = i * m; for (let j = 0; j < m; j++) out[j] += xi * w.d[o + j]; } if (relu) for (let j = 0; j < m; j++) if (out[j] < 0) out[j] = 0; return out; };
const softmax = (z, t = 1) => { let mx = -Infinity; for (const v of z) mx = Math.max(mx, v * t); let s = 0; const e = Array.from(z, (v) => { const x = Math.exp(v * t - mx); s += x; return x; }); return e.map((v) => v / s); };
function feats(src, r) { const x = Float32Array.from(src.subarray(r * D, (r + 1) * D)); let n = 0; for (const v of x) n += v * v; n = Math.sqrt(n); for (let i = 0; i < D; i++) x[i] /= n; return x; }
function probe(x) { const z = new Float32Array(D); for (let i = 0; i < D; i++) z[i] = (x[i] - mean[i]) / std[i]; const lg = W.length === 4 ? dense(dense(z, W[0], W[1], true), W[2], W[3], false) : dense(z, W[0], W[1], false); return softmax(lg); }
function zs(x) { return text.map((t) => { let d = 0; for (let i = 0; i < D; i++) d += x[i] * t[i]; return d; }); }

const items = val.idx.map(([si, y], k) => {
  const x0 = feats(all, rowOf.get(`${si}:0`)), x1 = feats(all, rowOf.get(`${si}:1`) ?? rowOf.get(`${si}:0`));
  return { y, p0: probe(x0), p1: probe(x1), z0: zs(x0), z1: zs(x1), pv: val.pv[k] };
});
// проверка совпадения с tfjs-головой
let maxDiff = 0; for (const it of items.slice(0, 200)) for (let k = 0; k < K; k++) maxDiff = Math.max(maxDiff, Math.abs(it.p0[k] - it.pv[k]));
console.log('расхождение JS-головы с tfjs:', maxDiff.toFixed(5));
const argmax = (p) => p.indexOf(Math.max(...p));
let best = null;
for (const t of [30, 50, 70, 100]) for (const w of [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 1]) {
  let ok = 0;
  for (const it of items) {
    const a = softmax(it.z0, t), b = softmax(it.z1, t);
    const p = it.p0.map((v, k) => (1 - w) * (v + it.p1[k]) / 2 + w * (a[k] + b[k]) / 2);
    if (argmax(p) === it.y) ok++;
  }
  const acc = ok / items.length;
  if (!best || acc > best.acc) best = { t, w, acc };
  if (w === 0 || w === 1 || t === 50) console.log(`t ${t} w ${w}: ${(acc * 100).toFixed(2)}%`);
}
console.log('лучшее:', best);
// фото каталога приложения
const app = new Float32Array(readFileSync(appPath).buffer.slice(0));
const S = JSON.parse(readFileSync(process.env.APP_SAMPLES || new URL('./data/app-samples.json', import.meta.url), 'utf8'));
let okApp = 0;
for (const s of S) {
  const x0 = feats(app, s.i * 4), x1 = feats(app, s.i * 4 + 1);
  const p0 = probe(x0), p1 = probe(x1), a = softmax(zs(x0), best.t), b = softmax(zs(x1), best.t);
  const p = p0.map((v, k) => (1 - best.w) * (v + p1[k]) / 2 + best.w * (a[k] + b[k]) / 2);
  const top = p.map((v, k) => [v, H.classes[k]]).sort((m, n) => n[0] - m[0]).slice(0, 3);
  const want = { aa: 'battery', iphone: 'phone', nokia: 'phone', pda: 'phone', freezer: 'fridge', tvNew: 'tv', aio: 'monitor', cables: 'charger' }[s.cls] || s.cls;
  if (top[0][1] === want || (s.cls === 'aio' && ['pc', 'monitor'].includes(top[0][1]))) okApp++;
  console.log(`${s.cls.padEnd(11)} → ${top.map(([v, c]) => `${c} ${(v * 100).toFixed(0)}%`).join(', ')}`);
}
console.log(`каталог: ${okApp}/${S.length}`);
