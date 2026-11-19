// Штрихкод товара (EAN/UPC) → что это за продукт, по открытым базам товаров. Нужен интернет, ключи не нужны.
// - Open Products Facts — открытая база непродовольственных товаров (лицензия ODbL);
// - UPCitemdb — бесплатный пробный доступ: название, бренд, модель, категория и предложения магазинов.
// Обе базы опрашиваются параллельно; если одна молчит (нет сети, лимит, CORS), берём ответ другой.
import { groupFromText } from './ai-map.js';

export const SOURCES = {
  opf: { name: 'Open Products Facts', api: (c) => `https://world.openproductsfacts.org/api/v2/product/${c}.json`, page: (c) => `https://world.openproductsfacts.org/product/${c}` },
  upc: { name: 'UPCitemdb', api: (c) => `https://api.upcitemdb.com/prod/trial/lookup?upc=${c}`, page: (c) => `https://www.upcitemdb.com/upc/${c}` },
};

// Цифры под штрихкодом → код с верной контрольной цифрой (EAN-8, UPC-A, EAN-13, GTIN-14) или ''
export function validCode(raw) {
  const d = String(raw || '').replace(/\D/g, '');
  if (![8, 12, 13, 14].includes(d.length)) return '';
  let sum = 0;
  for (let i = d.length - 2, w = 3; i >= 0; i--, w = 4 - w) sum += Number(d[i]) * w;
  return (10 - (sum % 10)) % 10 === Number(d.at(-1)) ? d : '';
}

const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };

async function getJson(url, ms) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctl.signal, headers: { accept: 'application/json' } });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

function fromOpf(code, j) {
  const p = j?.status === 1 ? j.product : null;
  if (!p) return null;
  const title = [p.brands?.split(',')[0], p.product_name || p.generic_name].filter(Boolean).join(' ').trim();
  if (!title) return null;
  return { title, brand: p.brands?.split(',')[0]?.trim() || '', model: '', category: p.categories || '', offers: [], page: SOURCES.opf.page(code), base: 'opf' };
}

function fromUpc(code, j) {
  const it = j?.code === 'OK' && Array.isArray(j.items) ? j.items[0] : null;
  if (!it?.title) return null;
  const offers = (Array.isArray(it.offers) ? it.offers : [])
    .filter((o) => o?.link && (o.merchant || o.domain))
    .slice(0, 4)
    .map((o) => ({ shop: o.merchant || o.domain, host: o.domain || hostOf(o.link), url: o.link, price: o.price ? `${o.price} ${o.currency || ''}`.trim() : '' }));
  return { title: it.title, brand: it.brand || '', model: it.model || '', category: it.category || '', offers, page: SOURCES.upc.page(code), base: 'upc' };
}

// Код → { code, title, brand, model, group, sources, offers } или null, если ни одна база не знает товар
export async function lookupBarcode(raw, { timeout = 8000 } = {}) {
  const code = validCode(raw);
  if (!code) return null;
  const [opf, upc] = await Promise.all([
    getJson(SOURCES.opf.api(code), timeout).then((j) => fromOpf(code, j)),
    getJson(SOURCES.upc.api(code), timeout).then((j) => fromUpc(code, j)),
  ]);
  const found = [upc, opf].filter(Boolean); // у UPCitemdb обычно точнее модель и есть магазины
  if (!found.length) return null;
  const main = found[0];
  const sources = [
    ...found.map((f) => ({ title: SOURCES[f.base].name, url: f.page, host: hostOf(f.page) })),
    ...(upc?.offers || []).map((o) => ({ title: o.shop, url: o.url, host: o.host, price: o.price })),
  ];
  return {
    code,
    title: main.title.slice(0, 90),
    brand: main.brand,
    model: main.model,
    group: groupFromText(...found.map((f) => `${f.title} ${f.category}`)),
    sources: sources.slice(0, 6),
  };
}
