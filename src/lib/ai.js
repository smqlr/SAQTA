// Распознавание техники по фото.
// 1) Сервер SAQTA с Claude (если подключён в профиле): модель, видимые поломки, живые детали.
// 2) ИИ в телефоне (MobileNet v2, без интернета): вид техники. Движок и веса грузятся при первом фото:
//    в офлайн-файле они внутри HTML, на GitHub Pages — файлы ai/engine.js и ai/mobilenet.bin.
import { topGroups, GROUPS } from './ai-map.js';
import { getApi } from './bot.js';

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

async function viaServer(api, file) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 25000);
  try {
    const r = await fetch(`${api}/recognize`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ image: await toJpegB64(file), mediaType: 'image/jpeg' }), signal: ctl.signal });
    if (!r.ok) return null;
    const j = await r.json();
    if (!j || !j.type) return null;
    const g = GROUPS[j.group] || Object.values(GROUPS).find((x) => x.type === j.type) || GROUPS.phone;
    return {
      engine: 'claude',
      techness: 1,
      guesses: [{ id: j.group || g.art, label: j.label || g.label, model: j.model || '', type: j.type, art: g.art, cat: g.cat, prob: j.confidence ?? 0.9, condition: j.condition || null, damage: j.damage || [], parts: j.parts || [] }],
    };
  } finally {
    clearTimeout(t);
  }
}

export async function recognize(file, onStage = () => {}) {
  const api = getApi();
  if (api) {
    try {
      onStage('Claude смотрит на фото…');
      const r = await viaServer(api, file);
      if (r) return r;
    } catch { /* сервер недоступен — распознаём в телефоне */ }
  }
  const ai = await loadEngine(onStage);
  onStage('ИИ смотрит на фото…');
  const probs = await ai.classify(await toCanvas(file));
  const { guesses, techness } = topGroups(probs, 3);
  return { engine: 'device', backend: ai.backend(), guesses, techness };
}
