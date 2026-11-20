// ИИ в телефоне — работает без интернета. Собирается отдельным файлом (ai/engine.js) и грузится, только когда житель фотографирует вещь.
// Основной движок — MobileCLIP-S0 (Apple, 2024) в ONNX Runtime Web: WebAssembly на процессоре телефона, веса float16 (23 МБ)
// разворачиваются в float32 при загрузке. Поверх него — голова SAQTA на 48 видов техники и «не техника»: обучена на ~29 000 фото
// Open Images (рамки вещей, 117 000 ракурсов) и смешана с «нулевым обучением» по текстовым описаниям видов (tools/ai-train).
// Запасной движок — MobileNet v2 (tfjs, WebGL или процессор) с такой же обученной головой: если WebAssembly не запустился.
import * as ort from 'onnxruntime-web/wasm';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import MODEL from './mobilenet.json';
import HEAD_CLIP from './head-clip.json';
import HEAD_MN from './head-mobilenet.json';
// Чтение штрихкодов (EAN/UPC) с фото: ZXing в WebAssembly. Сам wasm передаётся снаружи (ai/zxing_reader.wasm
// на Pages или внутри офлайн-файла), поэтому в CDN модуль не ходит.
import { prepareZXingModule, readBarcodes } from 'zxing-wasm/reader';

const bytes = (b64) => { const bin = atob(b64); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; };
const f32 = (b64) => new Float32Array(bytes(b64));
// float16 → float32 через таблицу на 65 536 значений
let HALF = null;
function halfToFloat(half) {
  if (!HALF) {
    HALF = new Float32Array(65536);
    for (let i = 0; i < 65536; i++) {
      const s = i & 0x8000 ? -1 : 1, e = (i >> 10) & 0x1f, m = i & 0x3ff;
      HALF[i] = e === 0 ? s * m * 2 ** -24 : e === 31 ? (m ? NaN : s * Infinity) : s * (1 + m / 1024) * 2 ** (e - 15);
    }
  }
  const out = new Float32Array(half.length);
  for (let i = 0; i < half.length; i++) out[i] = HALF[half[i]];
  return out;
}
const f16 = (b64) => halfToFloat(new Uint16Array(bytes(b64)));

// Голова: нормировка → (скрытый слой ReLU) → логиты; плюс «нулевое обучение» — косинус с текстовыми описаниями видов
function makeHead(H) {
  const mean = f32(H.mean), std = f32(H.std);
  const dec = H.f16 ? f16 : f32;
  const W = H.W.map((w) => ({ shape: w.shape, d: dec(w.data) }));
  const text = H.text ? dec(H.text) : null;
  const K = H.classes.length, D = H.dim;
  const dense = (x, w, b, relu) => {
    const [n, m] = w.shape, out = new Float32Array(m);
    for (let j = 0; j < m; j++) out[j] = b.d[j];
    for (let i = 0; i < n; i++) { const xi = x[i]; if (!xi) continue; const o = i * m; for (let j = 0; j < m; j++) out[j] += xi * w.d[o + j]; }
    if (relu) for (let j = 0; j < m; j++) if (out[j] < 0) out[j] = 0;
    return out;
  };
  const softmax = (z, t = 1) => { let mx = -Infinity; for (const v of z) mx = Math.max(mx, v * t); let s = 0; const e = z.map((v) => { const x = Math.exp(v * t - mx); s += x; return x; }); return e.map((v) => v / s); };
  return (feat) => {
    let x = Float32Array.from(feat);
    if (H.norm) { let n = 0; for (const v of x) n += v * v; n = Math.sqrt(n) || 1; for (let i = 0; i < D; i++) x[i] /= n; }
    const z = new Float32Array(D);
    for (let i = 0; i < D; i++) z[i] = (x[i] - mean[i]) / std[i];
    const logits = W.length === 4 ? dense(dense(z, W[0], W[1], true), W[2], W[3], false) : dense(z, W[0], W[1], false);
    const p = Array.from(softmax(Array.from(logits)));
    if (!text || !H.mix) return p;
    const zs = new Array(K).fill(0);
    for (let k = 0; k < K; k++) { let d = 0; for (let i = 0; i < D; i++) d += x[i] * text[k * D + i]; zs[k] = d; }
    const pz = softmax(zs, H.mix.t);
    return p.map((v, k) => (1 - H.mix.w) * v + H.mix.w * pz[k]);
  };
}

// ── MobileCLIP-S0 (ONNX Runtime Web, WebAssembly) ───────────────────────────
let clip = null;
const headClip = makeHead(HEAD_CLIP);
async function loadClip({ wasm, graph, weights }) {
  if (clip) return;
  ort.env.wasm.numThreads = 1; // без заголовков COOP/COEP потоки недоступны — считаем в одном
  ort.env.wasm.wasmBinary = wasm;
  const w = halfToFloat(new Uint16Array(weights));
  clip = await ort.InferenceSession.create(new Uint8Array(graph), { executionProviders: ['wasm'], graphOptimizationLevel: 'all', externalData: [{ path: 'w.bin', data: new Uint8Array(w.buffer) }] });
  const S = HEAD_CLIP.size;
  await clip.run({ pixel_values: new ort.Tensor('float32', new Float32Array(3 * S * S), [1, 3, S, S]) }); // прогрев
}
// canvases — кадры size×size одного фото → вероятности видов (среднее по кадрам)
async function classifyClip(canvases) {
  const S = HEAD_CLIP.size, P = S * S;
  const acc = new Array(HEAD_CLIP.classes.length).fill(0);
  for (const c of canvases) {
    const d = c.getContext('2d').getImageData(0, 0, S, S).data;
    const x = new Float32Array(3 * P);
    for (let i = 0; i < P; i++) { x[i] = d[i * 4] / 255; x[P + i] = d[i * 4 + 1] / 255; x[2 * P + i] = d[i * 4 + 2] / 255; }
    const out = await clip.run({ pixel_values: new ort.Tensor('float32', x, [1, 3, S, S]) });
    headClip(out.image_embeds.data).forEach((v, k) => { acc[k] += v / canvases.length; });
  }
  return acc;
}

// ── MobileNet v2 (tfjs) — запасной ──────────────────────────────────────────
let model = null;
const headMn = makeHead(HEAD_MN);
const FEAT = 'module_apply_default/MobilenetV2/Logits/AvgPool';
async function load(weightData) {
  if (model) return;
  let ok = false;
  try { ok = await tf.setBackend('webgl'); } catch { ok = false; }
  if (!ok) await tf.setBackend('cpu');
  await tf.ready();
  model = await loadGraphModel(tf.io.fromMemory({
    modelTopology: MODEL.modelTopology,
    weightSpecs: MODEL.weightSpecs,
    weightData,
    format: MODEL.format,
    generatedBy: MODEL.generatedBy,
    convertedBy: MODEL.convertedBy,
  }));
  tf.tidy(() => model.execute(tf.zeros([1, 224, 224, 3]), FEAT)); // прогрев
}
// canvases 224×224 → вероятности видов головы MobileNet (среднее по кадрам)
async function classifyMn(canvases) {
  const f = tf.tidy(() => {
    const x = tf.stack(canvases.map((c) => tf.div(tf.cast(tf.browser.fromPixels(c), 'float32'), 255)));
    return tf.reshape(model.execute(x, FEAT), [canvases.length, 1280]);
  });
  const data = await f.data();
  f.dispose();
  const acc = new Array(HEAD_MN.classes.length).fill(0);
  for (let k = 0; k < canvases.length; k++) headMn(data.subarray(k * 1280, (k + 1) * 1280)).forEach((v, i) => { acc[i] += v / canvases.length; });
  return acc;
}

let zxing = null;
function loadBarcode(wasmBinary) {
  if (!zxing) zxing = prepareZXingModule({ overrides: { wasmBinary }, fireImmediately: true });
  return zxing;
}

// Фото → коды EAN/UPC (товарные штрихкоды с коробки или наклейки)
async function barcodes(blob) {
  const found = await readBarcodes(blob, { formats: ['EANUPC'], tryHarder: true, tryRotate: true, tryInvert: true, maxNumberOfSymbols: 2 });
  return found.filter((r) => r.isValid && /^\d{8,14}$/.test(r.text)).map((r) => r.text);
}

window.SAQTA_AI = {
  loadClip, classifyClip, clipReady: () => !!clip, clipClasses: HEAD_CLIP.classes, clipSize: HEAD_CLIP.size,
  load, classifyMn, mnClasses: HEAD_MN.classes,
  engine: () => (clip ? 'mobileclip' : 'mobilenet'),
  backend: () => (clip ? 'wasm' : tf.getBackend()),
  loadBarcode, barcodes,
};
