// Распознавание техники по фото.
// 1) Сервер SAQTA с Claude (если подключён в профиле): модель, поломки, детали — и поиск этой модели
//    в магазинах и каталогах по всему миру, со ссылками на источники.
// 2) Без сервера, но с интернетом: штрихкод на фото (или цифры вручную) → открытые базы товаров.
// 3) ИИ в телефоне (MobileNet v2, без интернета): вид техники. Движок, веса и читалка штрихкодов грузятся
//    при первом фото: в офлайн-файле они внутри HTML, на GitHub Pages — файлы в папке ai/.
import { topGroups, GROUPS } from './ai-map.js';
import { getApi } from './bot.js';
import { lookupBarcode, validCode } from './barcode.js';

let loading = null;

function b64ToBuffer(b64) {
  const bin = atob(b64.replace(/\s+/g, ''));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}

function addScript({ src, text }) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    if (text != null) { s.textContent = text; document.head.appendChild(s); resolve(); return; }
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Не удалось загрузить ИИ'));
    document.head.appendChild(s);
  });
}

export function engineReady() { return !!window.SAQTA_AI?.ready; }

export function loadEngine(onStage = () => {}) {
  if (engineReady()) return Promise.resolve(window.SAQTA_AI);
  if (loading) return loading;
  loading = (async () => {
    onStage('Загружаю ИИ в телефон…');
    const inlineJs = document.getElementById('saqta-ai-js');
    if (!window.SAQTA_AI) await addScript(inlineJs ? { text: inlineJs.textContent } : { src: 'ai/engine.js' });
    const inlineW = document.getElementById('saqta-ai-w');
    let weights;
    if (inlineW) weights = b64ToBuffer(inlineW.textContent);
    else {
      const r = await fetch('ai/mobilenet.bin');
      if (!r.ok) throw new Error('Не удалось загрузить веса ИИ');
      weights = await r.arrayBuffer();
    }
    onStage('Запускаю нейросеть…');
    await window.SAQTA_AI.load(weights);
    window.SAQTA_AI.ready = true;
    return window.SAQTA_AI;
  })();
  loading.catch(() => { loading = null; });
  return loading;
}

// Читалка штрихкодов (ZXing, WebAssembly) — грузится только когда нужна
let bcLoading = null;
function loadBarcodeReader(ai) {
  if (!bcLoading) {
    bcLoading = (async () => {
      const inline = document.getElementById('saqta-bc-w');
      let wasm;
      if (inline) wasm = b64ToBuffer(inline.textContent);
      else {
        const r = await fetch('ai/zxing_reader.wasm');
        if (!r.ok) throw new Error('Не удалось загрузить читалку штрихкодов');
        wasm = await r.arrayBuffer();
      }
      await ai.loadBarcode(wasm);
    })();
    bcLoading.catch(() => { bcLoading = null; });
  }
  return bcLoading;
}

// Фото → квадрат 224×224 по центру (как видит MobileNet)
async function toCanvas(file, size = 224) {
  const bmp = await createImageBitmap(file);
  const s = Math.min(bmp.width, bmp.height);
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const g = c.getContext('2d');
  g.fillStyle = '#fff';
  g.fillRect(0, 0, size, size);
  g.drawImage(bmp, (bmp.width - s) / 2, (bmp.height - s) / 2, s, s, 0, 0, size, size);
  bmp.close?.();
  return c;
}

// Фото → JPEG до 1024 px в base64 (для сервера)
async function toJpegB64(file, max = 1024) {
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = document.createElement('canvas');
  c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
  bmp.close?.();
  return c.toDataURL('image/jpeg', 0.85).split(',')[1];
}

const arr = (a, n) => (Array.isArray(a) ? a.filter((x) => typeof x === 'string' && x.trim()).slice(0, n) : []);
const links = (a) => (Array.isArray(a) ? a : [])
  .filter((s) => s && /^https?:\/\//.test(s.url))
  .slice(0, 6)
  .map((s) => ({ title: String(s.title || s.host || '').slice(0, 80), url: s.url, host: s.host || new URL(s.url).hostname.replace(/^www\./, ''), price: s.price || '' }));

// Сервер: Claude смотрит на фото и ищет модель в магазинах (до минуты — поиск в интернете дольше одного взгляда)
async function viaServer(api, file, barcode = '') {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 60000);
  try {
    const r = await fetch(`${api}/recognize`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ image: await toJpegB64(file), mediaType: 'image/jpeg', barcode }), signal: ctl.signal });
    if (!r.ok) return null;
    const j = await r.json();
    if (!j || !j.type) return null;
    const g = GROUPS[j.group] || Object.values(GROUPS).find((x) => x.type === j.type) || GROUPS.phone;
    return {
      engine: 'claude',
      techness: 1,
      searched: !!j.searched,
      barcode,
      guesses: [{
        id: j.group || g.art, label: j.label || g.label, model: j.model || '', type: j.type, art: g.art, cat: g.cat,
        prob: j.confidence ?? 0.9, condition: j.condition || null, damage: arr(j.damage, 6), parts: arr(j.parts, 8),
        year: j.year || '', specs: arr(j.specs, 5), price: { new: j.price?.new || '', used: j.price?.used || '' }, sources: links(j.sources),
      }],
    };
  } finally {
    clearTimeout(t);
  }
}

// Товар из открытой базы → первая догадка; запасные — от MobileNet
function withProduct(product, fallback = [], extra = {}) {
  const top = fallback[0];
  const g = (product.group && GROUPS[product.group]) || (top && GROUPS[top.id]) || GROUPS.phone;
  const id = product.group || top?.id || 'phone';
  const guess = {
    id, label: g.label, model: product.title, type: g.type, art: g.art, cat: g.cat, prob: 1, via: 'barcode',
    code: product.code, sources: links(product.sources), specs: [], year: '', price: { new: '', used: '' },
  };
  return { engine: 'barcode', techness: 1, barcode: product.code, ...extra, guesses: [guess, ...fallback.filter((x) => x.id !== id)].slice(0, 3) };
}

// Цифры штрихкода, введённые вручную: с сервером — Claude ищет по фото и коду, без него — открытые базы.
// prev — прошлый результат распознавания (его догадки остаются запасными). null — ничего не нашли.
export async function recognizeBarcode(file, raw, prev = null, onStage = () => {}) {
  const code = validCode(raw);
  if (!code) return { error: 'code' };
  const api = getApi();
  if (api && file) {
    try {
      onStage('Claude ищет модель по штрихкоду в магазинах…');
      const r = await viaServer(api, file, code);
      if (r) return r;
    } catch { /* сервер недоступен — открытые базы */ }
  }
  onStage('Ищу товар в открытых базах…');
  const product = await lookupBarcode(code);
  if (!product) return { error: 'notfound', code };
  const fallback = (prev?.guesses || []).filter((x) => x.via !== 'barcode' && prev.engine !== 'claude');
  return withProduct(product, fallback, { backend: prev?.backend });
}

export async function recognize(file, onStage = () => {}) {
  const api = getApi();
  if (api) {
    try {
      onStage('Claude ищет модель в магазинах…');
      const r = await viaServer(api, file);
      if (r) return r;
    } catch { /* сервер недоступен — распознаём в телефоне */ }
  }
  const ai = await loadEngine(onStage);
  // Штрихкод на фото ищем, только если есть интернет: без сети базы товаров недоступны
  let code = '';
  if (navigator.onLine !== false) {
    try {
      onStage('Ищу штрихкод на фото…');
      await loadBarcodeReader(ai);
      code = (await ai.barcodes(file)).map(validCode).find(Boolean) || '';
    } catch { code = ''; }
  }
  onStage('ИИ смотрит на фото…');
  const probs = await ai.classify(await toCanvas(file));
  const { guesses, techness } = topGroups(probs, 3);
  if (code) {
    onStage('Ищу товар в открытых базах…');
    const product = await lookupBarcode(code);
    if (product) return withProduct(product, guesses, { backend: ai.backend() });
  }
  return { engine: 'device', backend: ai.backend(), guesses, techness, barcode: code };
}
