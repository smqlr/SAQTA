// Обучение головы-классификатора поверх признаков MobileNet (1280) на видеокарте (tfjs WebGL в Edge без окна).
// node train.mjs <samples.json> <feats-префикс> <выход.json> [hidden=512] [epochs=40] [drop.json]
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const REPO = join(import.meta.dirname, '../..');
const { chromium } = createRequire(REPO + '/package.json')('playwright');
const [samplesPath, featPrefix, outPath, hiddenArg = '512', epochsArg = '40', dropPath = ''] = process.argv.slice(2);
const HERE = import.meta.dirname;
const DIM = +(process.env.DIM || 1280);
const APP = process.env.APP || join(HERE, 'app.f32');
const samples = JSON.parse(readFileSync(samplesPath, 'utf8'));
const meta = JSON.parse(readFileSync(featPrefix + '.meta.json', 'utf8'));
const drop = dropPath && existsSync(dropPath) ? new Set(JSON.parse(readFileSync(dropPath, 'utf8'))) : new Set();

// классы — по алфавиту, «other» последним
const classes = [...new Set(samples.map((s) => s.cls))].filter((c) => c !== 'other').sort();
classes.push('other');
const ci = Object.fromEntries(classes.map((c, i) => [c, i]));
// проверочная часть: 12% фото по хэшу id (одно фото — только в одной части)
const hash = (s) => { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const isVal = (s) => hash(s.id) % 100 < 12;
const rows = meta.map(([si, v], r) => ({ r, si, v, y: ci[samples[si].cls], val: isVal(samples[si]), drop: drop.has(si) }));

const srv = createServer((req, res) => {
  const u = req.url.split('?')[0];
  if (u === '/') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end('<!doctype html><meta charset="utf-8"><body><script src="/fe.js"></script></body>'); }
  if (u === '/fe.js') { res.writeHead(200, { 'content-type': 'text/javascript' }); return res.end(readFileSync(join(HERE, 'fe.js'))); }
  if (u === '/feats') { res.writeHead(200, { 'content-type': 'application/octet-stream' }); return res.end(readFileSync(featPrefix + '.f32')); }
  if (u === '/app') { res.writeHead(200); return res.end(readFileSync(APP)); }
  res.writeHead(404); res.end();
});
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--ignore-gpu-blocklist', '--js-flags=--max-old-space-size=8192'] });
const page = await browser.newPage();
page.on('console', (m) => console.log('page:', m.text()));
await page.goto(`http://127.0.0.1:${srv.address().port}/`);

const NORM = !!process.env.NORM;
const result = await page.evaluate(async ({ rows, K, hidden, epochs, DIM, NORM }) => {
  const { tf } = window.FE;
  await tf.setBackend('webgl'); await tf.ready();
  const D = DIM;
  const all = new Float32Array(await (await fetch('/feats')).arrayBuffer());
  // L2-нормировка строк (для CLIP)
  if (NORM) for (let o = 0; o < all.length; o += D) { let n = 0; for (let j = 0; j < D; j++) n += all[o + j] ** 2; n = Math.sqrt(n) || 1; for (let j = 0; j < D; j++) all[o + j] /= n; }
  const train = rows.filter((x) => !x.val && !x.drop);
  const val0 = rows.filter((x) => x.val && x.v === 0);
  const val1 = new Map(rows.filter((x) => x.val && x.v === 1).map((x) => [x.si, x]));
  // нормировка по обучающей части
  const mean = new Float32Array(D), sq = new Float32Array(D);
  for (const x of train) { const o = x.r * D; for (let j = 0; j < D; j++) { const v = all[o + j]; mean[j] += v; sq[j] += v * v; } }
  const std = new Float32Array(D);
  for (let j = 0; j < D; j++) { mean[j] /= train.length; std[j] = Math.sqrt(Math.max(1e-6, sq[j] / train.length - mean[j] * mean[j])) + 1e-3; }
  const batchOf = (list) => {
    const b = new Float32Array(list.length * D);
    list.forEach((x, k) => { const o = x.r * D, p = k * D; for (let j = 0; j < D; j++) b[p + j] = (all[o + j] - mean[j]) / std[j]; });
    return b;
  };
  // веса классов: 1/sqrt(частоты), нормированы к среднему 1
  const cnt = new Array(K).fill(0); for (const x of train) cnt[x.y]++;
  let cw = cnt.map((c) => 1 / Math.sqrt(Math.max(c, 1)));
  const avg = cw.reduce((s, v, i) => s + v * cnt[i], 0) / train.length; cw = cw.map((v) => v / avg);
  const cwT = tf.tensor1d(cw);

  const he = (a, b) => tf.variable(tf.randomNormal([a, b], 0, Math.sqrt(2 / a), 'float32', 7));
  const W1 = hidden ? he(D, hidden) : null, b1 = hidden ? tf.variable(tf.zeros([hidden])) : null;
  const W2 = he(hidden || D, K), b2 = tf.variable(tf.zeros([K]));
  const vars = hidden ? [W1, b1, W2, b2] : [W2, b2];
  const forward = (x, training) => tf.tidy(() => {
    let h = x;
    if (training) h = tf.dropout(h, 0.2);
    if (hidden) { h = tf.relu(tf.add(tf.matMul(h, W1), b1)); if (training) h = tf.dropout(h, 0.4); }
    return tf.add(tf.matMul(h, W2), b2);
  });
  const opt = tf.train.adam(0.001);
  const BS = 512;
  const steps = Math.ceil(train.length / BS);
  const LS = 0.1, WD = 1e-4;
  const evalList = (list, list1) => {
    const preds = [];
    for (let i = 0; i < list.length; i += 2048) {
      const part = list.slice(i, i + 2048);
      const p0 = tf.tidy(() => tf.softmax(forward(tf.tensor2d(batchOf(part), [part.length, D]), false)));
      let p = p0;
      if (list1) {
        const part1 = part.map((x) => list1.get(x.si) || x);
        const p1 = tf.tidy(() => tf.softmax(forward(tf.tensor2d(batchOf(part1), [part1.length, D]), false)));
        p = tf.tidy(() => tf.div(tf.add(p0, p1), 2)); p0.dispose(); p1.dispose();
      }
      const d = p.dataSync(); p.dispose();
      for (let k = 0; k < part.length; k++) preds.push(Array.from(d.subarray(k * K, k * K + K)));
    }
    return preds;
  };
  const acc = (list, preds) => { let ok = 0; list.forEach((x, k) => { const p = preds[k]; if (p.indexOf(Math.max(...p)) === x.y) ok++; }); return ok / list.length; };
  let lr = 0.001;
  for (let ep = 0; ep < epochs; ep++) {
    // косинусное затухание шага
    lr = 0.0002 + 0.0008 * 0.5 * (1 + Math.cos(Math.PI * ep / epochs));
    opt.learningRate = lr;
    const order = train.map((_, i) => i).sort(() => Math.random() - 0.5);
    let lossSum = 0;
    for (let s = 0; s < steps; s++) {
      const part = order.slice(s * BS, (s + 1) * BS).map((i) => train[i]);
      const xb = tf.tensor2d(batchOf(part), [part.length, D]);
      const yb = tf.tidy(() => tf.add(tf.mul(tf.oneHot(tf.tensor1d(part.map((x) => x.y), 'int32'), K), 1 - LS), LS / K));
      const wb = tf.tidy(() => tf.gather(cwT, tf.tensor1d(part.map((x) => x.y), 'int32')));
      const cost = opt.minimize(() => tf.tidy(() => {
        const logits = forward(xb, true);
        const ce = tf.neg(tf.sum(tf.mul(yb, tf.logSoftmax(logits)), 1));
        const l2 = tf.addN(vars.filter((v) => v.shape.length === 2).map((v) => tf.sum(tf.square(v))));
        return tf.add(tf.mean(tf.mul(ce, wb)), tf.mul(l2, WD));
      }), true, vars);
      lossSum += cost.dataSync()[0];
      cost.dispose(); xb.dispose(); yb.dispose(); wb.dispose();
    }
    if (ep % 5 === 4 || ep === epochs - 1) {
      const pv = evalList(val0);
      console.log(`epoch ${ep + 1} loss ${(lossSum / steps).toFixed(3)} val ${(acc(val0, pv) * 100).toFixed(1)}%`);
    }
  }
  const pv = evalList(val0), pt = evalList(val0, val1);
  const pv1 = evalList(val0.map((x) => val1.get(x.si) || x));
  // предсказания для обучающих образцов (вид 0) — для чистки шумных меток
  const tr0 = rows.filter((x) => !x.val && x.v === 0);
  const ptr = evalList(tr0);
  const noisy = [];
  tr0.forEach((x, k) => { const p = ptr[k]; if (p[x.y] < 0.03 && Math.max(...p) > 0.7) noisy.push(x.si); });
  // фото каталога приложения
  const appAll = new Float32Array(await (await fetch('/app')).arrayBuffer());
  if (NORM) for (let o = 0; o < appAll.length; o += D) { let n = 0; for (let j = 0; j < D; j++) n += appAll[o + j] ** 2; n = Math.sqrt(n) || 1; for (let j = 0; j < D; j++) appAll[o + j] /= n; }
  const nApp = appAll.length / D / 4;
  const appRows = [];
  for (let i = 0; i < nApp; i++) for (let v = 0; v < 4; v++) appRows.push({ r: i * 4 + v, si: i, v });
  const saveAll = all;
  // подменяем источник признаков на фото каталога
  const appPred = (() => {
    const batch = (list) => { const b = new Float32Array(list.length * D); list.forEach((x, k) => { const o = x.r * D, p = k * D; for (let j = 0; j < D; j++) b[p + j] = (appAll[o + j] - mean[j]) / std[j]; }); return b; };
    const out = [];
    for (let i = 0; i < nApp; i++) {
      const p = tf.tidy(() => tf.mean(tf.softmax(forward(tf.tensor2d(batch([appRows[i * 4], appRows[i * 4 + 1]]), [2, D]), false)), 0));
      out.push(Array.from(p.dataSync())); p.dispose();
    }
    return out;
  })();
  void saveAll;
  const W = await Promise.all(vars.map(async (v) => ({ shape: v.shape, data: Array.from(await v.data()) })));
  return {
    val: acc(val0, pv), valTTA: acc(val0, pt), confusion: val0.map((x, k) => [x.y, pv[k].indexOf(Math.max(...pv[k])), pt[k].indexOf(Math.max(...pt[k])), +pt[k][x.y].toFixed(3), x.si]),
    valIdx: val0.map((x) => [x.si, x.y]), pv: pv.map((p) => p.map((v) => +v.toFixed(4))), pv1: pv1.map((p) => p.map((v) => +v.toFixed(4))),
    noisy, appPred, mean: Array.from(mean), std: Array.from(std), W, nTrain: train.length, nVal: val0.length,
  };
}, { rows, K: classes.length, hidden: +hiddenArg, epochs: +epochsArg, DIM, NORM });

console.log(`train views ${result.nTrain}, val samples ${result.nVal}, val acc ${(result.val * 100).toFixed(1)}%, with TTA ${(result.valTTA * 100).toFixed(1)}%`);
// точность по классам и главные путаницы
const per = classes.map(() => ({ n: 0, ok: 0, conf: {} }));
for (const [y, , pt] of result.confusion) { per[y].n++; if (pt === y) per[y].ok++; else per[y].conf[classes[pt]] = (per[y].conf[classes[pt]] || 0) + 1; }
classes.forEach((c, i) => {
  const p = per[i];
  const top = Object.entries(p.conf).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => `${k}:${v}`).join(' ');
  console.log(`${c.padEnd(12)} ${String(p.ok).padStart(4)}/${String(p.n).padEnd(4)} ${p.n ? ((p.ok / p.n) * 100).toFixed(0).padStart(3) : '  -'}%  ${top}`);
});
const appS = JSON.parse(readFileSync(process.env.APP_SAMPLES || join(HERE, 'data/app-samples.json'), 'utf8'));
console.log('--- фото каталога приложения:');
for (const s of appS) {
  const p = result.appPred[s.i];
  const order = p.map((v, i) => [v, i]).sort((a, b) => b[0] - a[0]).slice(0, 3);
  console.log(`${s.cls.padEnd(11)} → ${order.map(([v, i]) => `${classes[i]} ${(v * 100).toFixed(0)}%`).join(', ')}`);
}
writeFileSync(outPath, JSON.stringify({ classes, dim: DIM, hidden: +hiddenArg, mean: result.mean, std: result.std, W: result.W, val: result.val, valTTA: result.valTTA }));
writeFileSync(outPath.replace('.json', '.noisy.json'), JSON.stringify(result.noisy));
writeFileSync(outPath.replace('.json', '.val.json'), JSON.stringify({ classes, idx: result.valIdx, pv: result.pv, pv1: result.pv1 }));
console.log('noisy candidates', result.noisy.length);
await browser.close();
srv.close();
