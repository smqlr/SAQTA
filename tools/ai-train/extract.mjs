// Признаки MobileNet (слой AvgPool, 1280) для обучающих фото: по 4 вида на образец
//  v0 — как в приложении: квадрат вокруг вещи (у фото целиком — центр), v1 — вещь целиком с белыми полями,
//  v2, v3 — случайные кадрирование/яркость/отражение (только для обучения)
// Запуск: node extract.mjs <samples.json> <папка с фото> <выход-префикс>
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, openSync, writeSync, closeSync, createReadStream, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const REPO = join(import.meta.dirname, '../..');
const { chromium } = createRequire(REPO + '/package.json')('playwright');
const [samplesPath, imgDir, outPrefix] = process.argv.slice(2);
const samples = JSON.parse(readFileSync(samplesPath, 'utf8'));
const HERE = import.meta.dirname;
const PAGE = '<!doctype html><meta charset="utf-8"><body><script src="/fe.js"></script></body>';

const srv = createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  if (u === '/') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end(PAGE); }
  if (u === '/fe.js') { res.writeHead(200, { 'content-type': 'text/javascript' }); return res.end(readFileSync(join(HERE, 'fe.js'))); }
  if (u === '/w.bin') { res.writeHead(200); return res.end(readFileSync(join(REPO, 'src/ai/mobilenet.bin'))); }
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
const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--enable-gpu', '--ignore-gpu-blocklist'] });
let page;
async function openPage() {
  if (page) await page.close();
  page = await browser.newPage();
page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('404')) console.log('page:', m.text()); });
await page.goto(base + '/');
console.log('backend', await page.evaluate(async () => FE.load(await (await fetch('/w.bin')).arrayBuffer())));
await setup();
}
async function setup() {

// Страничная часть: декод, виды, батч в нейросеть → base64 признаков
await page.evaluate(() => {
  const S = 224;
  const rng = (seed) => () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  function canvasFor(bmp, view, flip, filter) {
    const c = document.createElement('canvas'); c.width = S; c.height = S;
    const g = c.getContext('2d');
    g.fillStyle = '#fff'; g.fillRect(0, 0, S, S);
    if (filter) g.filter = filter;
    if (flip) { g.translate(S, 0); g.scale(-1, 1); }
    const { sx, sy, sw, sh, dx = 0, dy = 0, dw = S, dh = S } = view;
    g.drawImage(bmp, sx, sy, sw, sh, dx, dy, dw, dh);
    return c;
  }
  // квадрат стороной side с центром около (cx, cy), сдвинутый внутрь фото
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
    if (!canv.length) return { owner: [], f: '', top: [] };
    const [f, p] = await FE.feats(canv);
    // из ImageNet оставляем top-1 класс и его вероятность (сравнить со старой схемой)
    const top = [];
    for (let i = 0; i < canv.length; i++) {
      let bi = 0, bv = 0;
      for (let j = 0; j < 1000; j++) { const v = p[i * 1000 + j]; if (v > bv) { bv = v; bi = j; } }
      top.push([bi, +bv.toFixed(3)]);
    }
    return { owner, f: b64(f), top };
  };
});
}
await openPage();

const fd = openSync(outPrefix + '.f32', 'w');
const meta = [];
const B = 16;
const t0 = Date.now();
let done = 0;
for (let i = 0; i < samples.length; i += B) {
  if (i && i % 3008 === 0) await openPage();
  const items = samples.slice(i, i + B);
  const r = await page.evaluate((it) => window.runBatch(it), items);
  if (r.owner.length) {
    writeSync(fd, Buffer.from(r.f, 'base64'));
    r.owner.forEach(([si, v], k) => meta.push([si, v, ...r.top[k]]));
  }
  done += items.length;
  if ((i / B) % 50 === 0) console.log(`${done}/${samples.length} samples, ${meta.length} views, ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
closeSync(fd);
writeFileSync(outPrefix + '.meta.json', JSON.stringify(meta));
console.log(`DONE ${meta.length} views in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
await browser.close();
srv.close();
