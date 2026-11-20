// Упаковка ONNX для телефона: веса float32 → отдельный файл float16 (вдвое меньше), граф — без весов,
// со ссылками «external data» на файл w.bin. В браузере веса разворачиваются обратно в float32 (точность та же: косинус 0,9998).
// node pack-onnx.mjs <in.onnx> <out-graph.onnx> <out-weights.f16>
import { readFileSync, writeFileSync } from 'node:fs';

const [inPath, outGraph, outW, mode = 'f16'] = process.argv.slice(2);
const q8parts = []; const index = [];
const buf = readFileSync(inPath);

function varint(b, p) { let x = 0, s = 1, c; do { c = b[p++]; x += (c & 0x7f) * s; s *= 128; } while (c & 0x80); return [x, p]; }
function encVarint(x) { const out = []; do { let c = x % 128; x = Math.floor(x / 128); if (x) c |= 0x80; out.push(c); } while (x); return Buffer.from(out); }
// поля сообщения: [{num, wt, start (с ключом), data: [from, to]}]
function fields(b, from, to) {
  const out = [];
  let p = from;
  while (p < to) {
    const start = p;
    let key; [key, p] = varint(b, p);
    const num = Math.floor(key / 8), wt = key % 8;
    let dFrom = p, dTo;
    if (wt === 0) { [, p] = varint(b, p); dTo = p; } else if (wt === 1) { p += 8; dTo = p; } else if (wt === 5) { p += 4; dTo = p; } else if (wt === 2) { let len; [len, p] = varint(b, p); dFrom = p; p += len; dTo = p; } else throw new Error(`wire type ${wt} at ${p}`);
    out.push({ num, wt, start, end: p, data: [dFrom, dTo] });
  }
  return out;
}
const ld = (num, payload) => Buffer.concat([encVarint(num * 8 + 2), encVarint(payload.length), payload]);
const vi = (num, v) => Buffer.concat([encVarint(num * 8), encVarint(v)]);
const str = (s) => Buffer.from(s, 'utf8');

// float32 → float16 (округление к ближайшему)
const f32 = new Float32Array(1), u32 = new Uint32Array(f32.buffer);
function toHalf(v) {
  f32[0] = v; const x = u32[0];
  const sign = (x >>> 16) & 0x8000; let e = ((x >>> 23) & 0xff) - 127 + 15; let m = x & 0x7fffff;
  if (e <= 0) { if (e < -10) return sign; m |= 0x800000; const sh = 14 - e; let h = m >> sh; if ((m >> (sh - 1)) & 1) h++; return sign | h; }
  if (e >= 31) return sign | 0x7c00;
  let h = sign | (e << 10) | (m >> 13);
  if (m & 0x1000) h++;
  return h;
}

const top = fields(buf, 0, buf.length);
const g = top.find((f) => f.num === 7);
const gf = fields(buf, g.data[0], g.data[1]);
const halves = [];
let off32 = 0, nConv = 0, kept = 0;
const newGraphParts = gf.map((f) => {
  if (f.num !== 5) return buf.subarray(f.start, f.end);
  const tf = fields(buf, f.data[0], f.data[1]);
  const dt = tf.find((x) => x.num === 2);
  const raw = tf.find((x) => x.num === 9);
  const type = dt ? varint(buf, dt.data[0])[0] : 0;
  if (type !== 1 || !raw || raw.data[1] - raw.data[0] < 1024) { kept++; return buf.subarray(f.start, f.end); }
  const bytes = buf.subarray(raw.data[0], raw.data[1]);
  const fl = new Float32Array(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.length));
  const dims = tf.filter((x) => x.num === 1).flatMap((x) => { if (x.wt === 0) return [varint(buf, x.data[0])[0]]; const out = []; let p = x.data[0]; while (p < x.data[1]) { let v; [v, p] = varint(buf, p); out.push(v); } return out; });
  const rows = dims.length > 1 ? dims[0] : 1, per = fl.length / rows;
  if (mode === 'q8' && fl.length >= 4096 && per >= 16) {
    const q = new Uint8Array(fl.length), mm = new Float32Array(rows * 2);
    for (let r = 0; r < rows; r++) {
      let lo = Infinity, hi = -Infinity;
      for (let i = r * per; i < (r + 1) * per; i++) { if (fl[i] < lo) lo = fl[i]; if (fl[i] > hi) hi = fl[i]; }
      const sc = (hi - lo) / 255 || 1;
      mm[r * 2] = lo; mm[r * 2 + 1] = sc;
      for (let i = r * per; i < (r + 1) * per; i++) q[i] = Math.round((fl[i] - lo) / sc);
    }
    index.push([1, fl.length, rows]); q8parts.push(Buffer.from(mm.buffer), Buffer.from(q.buffer));
  } else {
    const h = new Uint16Array(fl.length);
    for (let i = 0; i < fl.length; i++) h[i] = toHalf(fl[i]);
    index.push([0, fl.length, 0]); q8parts.push(Buffer.from(h.buffer));
    halves.push(Buffer.from(h.buffer));
  }
  const len = fl.length * 4;
  const entry = (k, v) => ld(13, Buffer.concat([ld(1, str(k)), ld(2, str(v))]));
  const parts = tf.filter((x) => x.num !== 9 && x.num !== 13 && x.num !== 14).map((x) => buf.subarray(x.start, x.end));
  parts.push(entry('location', 'w.bin'), entry('offset', String(off32)), entry('length', String(len)), vi(14, 1));
  off32 += len; nConv++;
  return ld(5, Buffer.concat(parts));
});
const graph = Buffer.concat(newGraphParts);
const model = Buffer.concat(top.map((f) => (f.num === 7 ? ld(7, graph) : buf.subarray(f.start, f.end))));
writeFileSync(outGraph, model);
if (mode === 'q8') { const head = Buffer.from(JSON.stringify(index)); const len = Buffer.alloc(4); len.writeUInt32LE(head.length); writeFileSync(outW, Buffer.concat([len, head, ...q8parts])); console.log('q8 file', (fs_size(q8parts) / 1e6).toFixed(2), 'MB'); } else writeFileSync(outW, Buffer.concat(halves));
function fs_size(p) { return p.reduce((a, b) => a + b.length, 0); }
console.log(`initializers → float16: ${nConv}, оставлены как есть: ${kept}; граф ${(model.length / 1e6).toFixed(2)} МБ, веса f16 ${(off32 / 2 / 1e6).toFixed(2)} МБ (float32 ${(off32 / 1e6).toFixed(2)} МБ)`);
