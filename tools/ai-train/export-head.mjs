// Обученная голова → компактный JSON для приложения (веса float16 в base64, нормировка float32).
// node export-head.mjs <head.json> <out.json> <size> [text-emb.json] [w] [t]
import { readFileSync, writeFileSync } from 'node:fs';
const [inPath, outPath, size, textPath, w, t] = process.argv.slice(2);
const H = JSON.parse(readFileSync(inPath, 'utf8'));
const f32b64 = (a) => Buffer.from(Float32Array.from(a).buffer).toString('base64');
const f32 = new Float32Array(1), u32 = new Uint32Array(f32.buffer);
function toHalf(v) {
  f32[0] = v; const x = u32[0];
  const sign = (x >>> 16) & 0x8000; const e = ((x >>> 23) & 0xff) - 127 + 15; let m = x & 0x7fffff;
  if (e <= 0) { if (e < -10) return sign; m |= 0x800000; const sh = 14 - e; let h = m >> sh; if ((m >> (sh - 1)) & 1) h++; return sign | h; }
  if (e >= 31) return sign | 0x7c00;
  let h = sign | (e << 10) | (m >> 13);
  if (m & 0x1000) h++;
  return h;
}
const f16b64 = (a) => { const h = new Uint16Array(a.length); for (let i = 0; i < a.length; i++) h[i] = toHalf(a[i]); return Buffer.from(h.buffer).toString('base64'); };
const out = {
  about: `Голова SAQTA: ${H.classes.length - 1} видов техники + «не техника». Обучена ${new Date().toLocaleDateString('ru-RU')} на фото Open Images V7; точность на проверочных фото ${(H.val * 100).toFixed(1)}%, с двумя кадрами ${(H.valTTA * 100).toFixed(1)}%.`,
  classes: H.classes, dim: H.dim || 1280, size: +size, norm: !!textPath || H.dim === 512, f16: true,
  mean: f32b64(H.mean), std: f32b64(H.std),
  W: H.W.map((x) => ({ shape: x.shape.length === 1 ? x.shape : x.shape, data: f16b64(x.data) })),
};
if (textPath) {
  const T = JSON.parse(readFileSync(textPath, 'utf8'));
  out.text = f16b64(H.classes.flatMap((c) => T[c]));
  out.mix = { w: +w, t: +t };
}
// у линейной головы bias — 1-мерный; у скрытого слоя — тоже: shape [n] и [n, m]
writeFileSync(outPath, JSON.stringify(out));
console.log(`${outPath}: ${(JSON.stringify(out).length / 1024).toFixed(0)} КБ, классов ${H.classes.length}`);
