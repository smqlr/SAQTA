// Сжатие MobileNet v2 (TF Hub, tfjs graph model) до uint8: веса в 4 раза меньше, точность почти та же.
// Вход: папка с model.json и group1-shard*.bin (скачать: см. README, раздел «ИИ в телефоне»).
// Выход: src/ai/mobilenet.json (топология + описание весов) и src/ai/mobilenet.bin (веса uint8).
// Запуск: node tools/ai/quantize.mjs путь/к/папке
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const src = process.argv[2];
if (!src) throw new Error('Укажите папку с model.json');
const model = JSON.parse(await readFile(join(src, 'model.json'), 'utf8'));
const group = model.weightsManifest[0];
const data = Buffer.concat(await Promise.all(group.paths.map((p) => readFile(join(src, p)))));

const MODE = process.argv[3] || 'float16'; // float16 (по умолчанию) или uint8
const SIZE = { float32: 4, int32: 4 };
// float32 → float16 (IEEE 754 half), с округлением до ближайшего
const f32 = new Float32Array(1);
const u32 = new Uint32Array(f32.buffer);
function toHalf(v) {
  f32[0] = v;
  const x = u32[0];
  const sign = (x >>> 16) & 0x8000;
  let exp = ((x >>> 23) & 0xff) - 127 + 15;
  let mant = x & 0x7fffff;
  if (exp <= 0) {
    if (exp < -10) return sign;
    mant = (mant | 0x800000) >>> (1 - exp);
    return sign | ((mant + 0x1000) >>> 13);
  }
  if (exp >= 31) return sign | 0x7c00;
  const r = sign | ((exp << 10) + ((mant + 0x1000) >>> 13));
  return r;
}
const specs = [];
const chunks = [];
let off = 0;
let before = 0;
let after = 0;
for (const w of group.weights) {
  const n = w.shape.reduce((a, b) => a * b, 1);
  const bytes = n * SIZE[w.dtype];
  const buf = data.subarray(off, off + bytes);
  off += bytes;
  before += bytes;
  if (MODE === 'float16' && w.dtype === 'float32' && n >= 64 && !w.quantization) {
    // float16: вдвое меньше, точность как у исходной модели (uint8 у MobileNet v2 портит депсвайз-свёртки)
    const f = new Float32Array(buf.buffer.slice(buf.byteOffset, buf.byteOffset + bytes));
    const h = new Uint16Array(n);
    for (let i = 0; i < n; i++) h[i] = toHalf(f[i]);
    specs.push({ name: w.name, shape: w.shape, dtype: 'float32', quantization: { dtype: 'float16' } });
    chunks.push(Buffer.from(h.buffer));
    after += n * 2;
  } else if (MODE === 'uint8' && w.dtype === 'float32' && n >= 64 && !w.quantization) {
    const f = new Float32Array(buf.buffer.slice(buf.byteOffset, buf.byteOffset + bytes));
    let min = Infinity, max = -Infinity;
    for (const v of f) { if (v < min) min = v; if (v > max) max = v; }
    const scale = max > min ? (max - min) / 255 : 1;
    const q = new Uint8Array(n);
    for (let i = 0; i < n; i++) q[i] = Math.max(0, Math.min(255, Math.round((f[i] - min) / scale)));
    specs.push({ name: w.name, shape: w.shape, dtype: 'float32', quantization: { dtype: 'uint8', min, scale } });
    chunks.push(Buffer.from(q.buffer));
    after += n;
  } else {
    specs.push({ name: w.name, shape: w.shape, dtype: w.dtype });
    chunks.push(Buffer.from(buf));
    after += bytes;
  }
}
if (off !== data.length) throw new Error(`Размер весов не сошёлся: ${off} из ${data.length}`);
await mkdir(join(root, 'src', 'ai'), { recursive: true });
await writeFile(join(root, 'src', 'ai', 'mobilenet.json'), JSON.stringify({ format: model.format, generatedBy: model.generatedBy, convertedBy: model.convertedBy, modelTopology: model.modelTopology, weightSpecs: specs }));
await writeFile(join(root, 'src', 'ai', 'mobilenet.bin'), Buffer.concat(chunks));
console.log(`MobileNet v2: ${(before / 1048576).toFixed(1)} МБ → ${(after / 1048576).toFixed(1)} МБ, тензоров ${specs.length}`);
