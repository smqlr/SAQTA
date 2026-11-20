// Распознавание техники по фото: Claude смотрит на фото, читает надписи и штрихкод,
// затем ищет модель в магазинах и каталогах по всему миру (инструмент web_search на стороне Anthropic)
// и возвращает точную модель, год, характеристики, цены «по данным магазинов» и ссылки на источники.
// Здесь нет импорта SDK: клиент передаётся снаружи (worker.js), поэтому логику можно проверить тестом без сети.

export const MODEL = 'claude-opus-5-5';
export const GROUPS = 'phone, tablet, ebook, pda, laptop, pc, monitor, tv, fridge, washer, dishwasher, stove, ac, microwave, kettle, coffee, blender, toaster, multicooker, iron, vacuum, dryer, fan, heater, sewing, headphones, speaker, player, watch, clock, camera, console, remote, calculator, microphone, synth, landline, router, peripheral, printer, projector, disk, tool, lamp, flashlight, battery, charger';
const MAX_CONTINUATIONS = 3; // продолжения после pause_turn (поиск длиннее одного круга)

export const SYSTEM_VISION = `Ты распознаёшь технику на фото для пункта приёма SAQTA (Актобе, Казахстан).
Порядок работы:
1. Посмотри на фото: вид вещи, бренд, надписи, номер модели на наклейке или корпусе, штрихкод, видимые повреждения.
2. Найди эту вещь в интернете: в магазинах техники и каталогах по всему миру — Kaspi.kz, Technodom, Sulpak, Amazon, AliExpress, eBay, Best Buy, сайты производителей, GSMArena и подобные. Ищи по бренду, номеру модели и штрихкоду, если он есть. Сверь фото с картинками и описаниями товара и выбери точную модель. Если модель на фото не видна, назови самую вероятную и честно снизь confidence.
3. Ответь ТОЛЬКО одним JSON-объектом без пояснений:
{"group": одно из [${GROUPS}], "type": "phone"|"laptop"|"screen"|"small"|"cable"|"big", "label": "вид техники по-русски", "model": "бренд и точная модель или пустая строка", "year": "год выхода или пустая строка", "specs": ["3–5 главных характеристик по-русски, коротко"], "price": {"new": "цена новой, как в источнике, с валютой, или пустая строка", "used": "цена б/у, как в источнике, с валютой, или пустая строка"}, "condition": "works"|"dead"|"broken"|"swollen"|null, "damage": ["видимые повреждения по-русски"], "parts": ["детали, которые обычно можно снять с такой вещи"], "sources": [{"title": "магазин или сайт", "url": "адрес страницы, где нашёл товар"}], "confidence": число 0..1}
type: phone — телефоны и планшеты, laptop — ноутбуки и компьютеры, screen — мониторы и ТВ, big — холодильник, стиральная или посудомоечная машина, плита, кондиционер, cable — зарядки и кабели, small — всё остальное.
В sources — только страницы из результатов поиска, где ты действительно видел этот товар. Цены не придумывай: если в источниках цены нет, оставь пустую строку. Если на фото не техника — group "", confidence 0.`;

const SEARCH_TOOL = {
  type: 'web_search_20260209',
  name: 'web_search',
  max_uses: 4,
  // Поиск с местными магазинами впереди: Актобе, Казахстан
  user_location: { type: 'approximate', city: 'Aktobe', country: 'KZ', timezone: 'Asia/Aqtobe' },
};

export class RecognizeError extends Error {
  constructor(code, message) { super(message || code); this.code = code; }
}

// Адреса, которые реально пришли в результатах поиска (успешный результат — список, ошибка — объект)
function searchedUrls(blocks) {
  const urls = new Map();
  for (const b of blocks) {
    if (b.type !== 'web_search_tool_result' || !Array.isArray(b.content)) continue;
    for (const r of b.content) if (r?.type === 'web_search_result' && r.url) urls.set(normUrl(r.url), { url: r.url, title: r.title || '' });
  }
  return urls;
}
const normUrl = (u) => String(u).trim().replace(/#.*$/, '').replace(/\/+$/, '').toLowerCase();
const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };
const str = (v, max = 120) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const strs = (a, n, max = 80) => (Array.isArray(a) ? a.map((x) => str(x, max)).filter(Boolean).slice(0, n) : []);

// Последний JSON-объект в тексте ответа (текст идёт после блоков поиска)
function lastJson(blocks) {
  const text = blocks.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
  const starts = [];
  for (let i = 0; i < text.length; i++) if (text[i] === '{') starts.push(i);
  for (let s = 0; s < starts.length; s++) {
    const from = starts[s];
    const to = text.lastIndexOf('}');
    for (let end = to; end > from; end = text.lastIndexOf('}', end - 1)) {
      try { const o = JSON.parse(text.slice(from, end + 1)); if (o && typeof o === 'object' && 'group' in o) return o; } catch { /* дальше */ }
    }
  }
  return null;
}

// Ответ Claude → проверенный JSON для приложения
export function toResult(blocks) {
  const o = lastJson(blocks);
  if (!o || !o.group) throw new RecognizeError('not_recognized');
  const seen = searchedUrls(blocks);
  const sources = [];
  for (const s of Array.isArray(o.sources) ? o.sources : []) {
    const hit = s && seen.get(normUrl(s.url));
    if (!hit || sources.some((x) => normUrl(x.url) === normUrl(hit.url))) continue; // только реально найденные страницы
    sources.push({ title: str(s.title, 80) || hit.title.slice(0, 80) || hostOf(hit.url), url: hit.url, host: hostOf(hit.url) });
    if (sources.length >= 5) break;
  }
  const conf = Number(o.confidence);
  return {
    group: str(o.group, 20),
    type: str(o.type, 10),
    label: str(o.label, 60),
    model: str(o.model, 80),
    year: str(String(o.year ?? ''), 10),
    specs: strs(o.specs, 5),
    price: { new: str(o.price?.new, 40), used: str(o.price?.used, 40) },
    condition: ['works', 'dead', 'broken', 'swollen'].includes(o.condition) ? o.condition : null,
    damage: strs(o.damage, 6),
    parts: strs(o.parts, 8),
    sources,
    searched: seen.size > 0,
    confidence: Number.isFinite(conf) ? Math.max(0, Math.min(1, conf)) : 0.8,
  };
}

const isBadRequest = (e) => e?.status === 400;

// client — new Anthropic(...) из @anthropic-ai/sdk (или подделка в тестах)
export async function recognize(client, { image, mediaType, barcode = '', model = MODEL }) {
  if (typeof image !== 'string' || !image || image.length > 6000000) throw new RecognizeError('image');
  const code = String(barcode || '').replace(/\D/g, '').slice(0, 14);
  const messages = [{
    role: 'user',
    content: [
      { type: 'image', source: { type: 'base64', media_type: mediaType === 'image/png' ? 'image/png' : 'image/jpeg', data: image } },
      { type: 'text', text: `Что это за вещь и в каком она состоянии? Найди её в магазинах и ответь JSON.${code ? ` Телефон прочитал на фото штрихкод: ${code}.` : ''}` },
    ],
  }];
  let tool = SEARCH_TOOL;
  const ask = () => client.beta.messages.create({
    model,
    max_tokens: 16000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default', // если Claude откажет, запрос повторит запасная модель на стороне Anthropic
    system: SYSTEM_VISION,
    tools: [tool],
    messages,
  });
  let r;
  try {
    r = await ask();
  } catch (e) {
    if (!isBadRequest(e)) throw e;
    // Поиск может не принять местоположение (страна не поддерживается) — ищем без него
    const { user_location: _drop, ...plain } = SEARCH_TOOL;
    tool = plain;
    r = await ask();
  }
  const blocks = [...r.content];
  for (let i = 0; r.stop_reason === 'pause_turn' && i < MAX_CONTINUATIONS; i++) {
    // Поиск не уложился в один круг: отправляем ответ обратно, сервер Anthropic продолжит сам
    messages.push({ role: 'assistant', content: r.content });
    r = await ask();
    blocks.push(...r.content);
  }
  if (r.stop_reason === 'refusal') throw new RecognizeError('refusal');
  return toResult(blocks);
}
