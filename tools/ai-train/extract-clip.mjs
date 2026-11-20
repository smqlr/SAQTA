// Признаки MobileCLIP-S0 (512) для обучающих фото: те же 4 вида на образец, что и для MobileNet, но кадр 256×256.
// node extract-clip.mjs <samples.json> <папка с фото> <выход-префикс> <модель.onnx> [ep=webgpu]
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, openSync, writeSync, closeSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const REPO = join(import.meta.dirname, '../..');
const { chromium } = createRequire(REPO + '/package.json')('playwright');
const [samplesPath, imgDir, outPrefix, modelPath, ep = 'webgpu'] = process.argv.slice(2);
const samples = JSON.parse(readFileSync(samplesPath, 'utf8'));
const HERE = import.meta.dirname;
const ORT = join(REPO, 'node_modules/onnxruntime-web/dist');
const PAGE = '<!doctype html><meta charset="utf-8"><body><script type="module">import * as ort from "/ort/ort.webgpu.bundle.min.mjs"; window.ort = ort; window.ortReady = true;</script></body>';

const srv = createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  if (u === '/') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end(PAGE); }
  if (u.startsWith('/ort/')) { const f = join(ORT, u.slice(5)); if (!existsSync(f)) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'content-type': f.endsWith('.wasm') ? 'application/wasm' : 'text/javascript' }); return res.end(readFileSync(f)); }
  if (u === '/model.onnx') { res.writeHead(200); return res.end(readFileSync(modelPath)); }
  if (u.startsWith('/img/')) {
    const f = join(imgDir, u.slice(5));
    if (!existsSync(f) || statSync(f).size < 1000) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': f.endsWith('.webp') ? 'image/webp' : f.endsWith('.png') ? 'image/png' : 'image/jpeg' });
    return res.end(readFileSync(f));
  }
  res.writeHead(404); res.end();
});
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${srv.address().port}`;
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--ignore-gpu-blocklist', '--enable-unsafe-webgpu'] });
let page;
async function openPage() {
  if (page) await page.close();
  page = await browser.newPage();
  page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('404')) console.log('page:', m.text()); });
  page.on('pageerror', (e) => console.log('pageerror:', e.message));
  await page.goto(base + '/');
  await page.waitForFunction(() => window.ortReady);
  const info = await page.evaluate(async (ep) => {
    const buf = await (await fetch('/model.onnx')).arrayBuffer();
    window.sess = await ort.InferenceSession.create(buf, { executionProviders: [ep], graphOptimizationLevel: 'all' });
    return { inputs: sess.inputNames, outputs: sess.outputNames, ep };
  }, ep);
  console.log('session', JSON.stringify(info));
  await setup();
}
async function setup() {
  await page.evaluate(() => {
    const S = 256;
    const rng = (seed) => () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    function canvasFor(bmp, view, flip, filter) {
      const c = document.createElement('canvas'); c.width = S; c.height = S;
      const g = c.getContext('2d', { willReadFrequently: true });
      g.fillStyle = '#fff'; g.fillRect(0, 0, S, S);
      g.imageSmoothingQuality = 'high';
      if (filter) g.filter = filter;
      if (flip) { g.translate(S, 0); g.scale(-1, 1); }
      const { sx, sy, sw, sh, dx = 0, dy = 0, dw = S, dh = S } = view;
      g.drawImage(bmp, sx, sy, sw, sh, dx, dy, dw, dh);
      return c;
    }
    function square(W, H, cx, cy, side) {
      side = Math.min(side, W, H);
      let sx = cx - side / 2, sy = cy - side / 2;
      sx = Math.max(0, Math.min(W - side, sx)); sy = Math.max(0, Math.min(H - side, sy));
      return { sx, sy, sw: side, sh: side };
    }
    function letterbox(W, H, x0, y0, w, h) {
      x0 = Math.max(0, x0); y0 = Math.max(0, y0); w = Math.min(W - x0, w); h = Math.min(H - y0, h);
      const k = S / Math.max(w, h);
      const dw = w * k, dh = h * k;
      return { sx: x0, sy: y0, sw: w, sh: h, dx: (S - dw) / 2, dy: (S - dh) / 2, dw, dh };
    }
    function views(bmp, s) {
      const W = bmp.width, H = bmp.height, r = rng(s.i * 7919 + 17);
      const jitter = () => `brightness(${(0.8 + r() * 0.4).toFixed(2)}) contrast(${(0.8 + r() * 0.4).toFixed(2)}) saturate(${(0.7 + r() * 0.6).toFixed(2)})${r() < 0.15 ? ' blur(1px)' : ''}`;
      const out = [];
      if (s.box) {
        const [x0, x1, y0, y1] = s.box;
        const bx = x0 * W, by = y0 * H, bw = (x1 - x0) * W, bh = (y1 - y0) * H, cx = bx + bw / 2, cy = by + bh / 2;
        out.push([square(W, H, cx, cy, Math.max(bw, bh) * 1.3), false, '']);
        out.push([letterbox(W, H, bx - bw * 0.08, by - bh * 0.08, bw * 1.16, bh * 1.16), false, '']);
        for (let k = 0; k < 2; k++) {
          const sc = 1.0 + r() * 0.9, jx = (r() - 0.5) * 0.25 * bw, jy = (r() - 0.5) * 0.25 * bh;
          out.push([square(W, H, cx + jx, cy + jy, Math.max(bw, bh) * sc), k === 1 || r() < 0.3, jitter()]);
        }
      } else {
        const m = Math.min(W, H);
        out.push([square(W, H, W / 2, H / 2, m), false, '']);
        out.push([letterbox(W, H, 0, 0, W, H), false, '']);
        for (let k = 0; k < 2; k++) {
          const side = m * (0.6 + r() * 0.4);
          out.push([square(W, H, side / 2 + r() * (W - side), side / 2 + r() * (H - side), side), k === 1 || r() < 0.3, jitter()]);
        }
      }
      return out.map(([v, f, fl]) => canvasFor(bmp, v, f, fl));
    }
    const b64 = (f32) => {
      const u8 = new Uint8Array(f32.buffer, f32.byteOffset, f32.byteLength);
      let s = '';
      for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
      return btoa(s);
    };
    window.runBatch = async (items) => {
      const canv = [], owner = [];
      const bmps = await Promise.all(items.map(async (s) => {
        try { const r = await fetch('/img/' + s.file); if (!r.ok) return null; return await createImageBitmap(await r.blob()); } catch { return null; }
      }));
      items.forEach((s, k) => {
        const bmp = bmps[k]; if (!bmp) return;
        try { views(bmp, s).forEach((c, v) => { canv.push(c); owner.push([s.i, v]); }); } catch { /* битое фото */ }
        bmp.close();
      });
      if (!canv.length) return { owner: [], f: '' };
      const n = canv.length, P = S * S;
      const x = new Float32Array(n * 3 * P);
      canv.forEach((c, k) => {
        const d = c.getContext('2d').getImageData(0, 0, S, S).data;
        const o = k * 3 * P;
        for (let i = 0; i < P; i++) { x[o + i] = d[i * 4] / 255; x[o + P + i] = d[i * 4 + 1] / 255; x[o + 2 * P + i] = d[i * 4 + 2] / 255; }
      });
      const inName = sess.inputNames[0];
      const out = await sess.run({ [inName]: new ort.Tensor('float32', x, [n, 3, S, S]) });
      const e = out[sess.outputNames.includes('image_embeds') ? 'image_embeds' : sess.outputNames[0]];
      return { owner, f: b64(e.data), dim: e.dims[e.dims.length - 1] };
    };
  });
}
await openPage();

const fd = openSync(outPrefix + '.f32', 'w');
const meta = [];
const B = 16;
const t0 = Date.now();
let done = 0, dim = 0;
for (let i = 0; i < samples.length; i += B) {
  if (i && i % 3000 === 0) await openPage();
  const items = samples.slice(i, i + B);
  const r = await page.evaluate((it) => window.runBatch(it), items);
  if (r.owner.length) {
    writeSync(fd, Buffer.from(r.f, 'base64'));
    dim = r.dim;
    r.owner.forEach(([si, v]) => meta.push([si, v]));
  }
  done += items.length;
  if ((i / B) % 100 === 0) console.log(`${done}/${samples.length} samples, ${meta.length} views, ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
closeSync(fd);
writeFileSync(outPrefix + '.meta.json', JSON.stringify(meta));
console.log(`DONE ${meta.length} views, dim ${dim}, in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
await browser.close();
srv.close();
