// Адреса Актобе из OpenStreetMap: поиск «улица + дом» и обратный поиск по точке на карте.
// Понимает русские и казахские названия: «Тургенева 109», «Абилкайыр хана 40», «Бағланова».
import { geo, distM } from './geo.js';

const KZ = { 'ә': 'а', 'ғ': 'г', 'қ': 'к', 'ң': 'н', 'ө': 'о', 'ұ': 'у', 'ү': 'у', 'һ': 'х', 'і': 'и', 'ё': 'е' };
const TYPE = /^(улица|ул|проспект|пр|пр-т|переулок|пер|бульвар|б-р|тупик|туп|шоссе|ш|микрорайон|мкр|мкрн|көшесі|даңғылы|тұйығы|жилой|массив|дом|д)$/;
export const norm = (s) => String(s || '').toLowerCase().replace(/[әғқңөұүһіё]/g, (c) => KZ[c]).replace(/[«»"'.,()]/g, ' ');
const words = (s) => norm(s).split(/\s+/).filter((w) => w && !TYPE.test(w));
const normHn = (s) => norm(s).replace(/\s+/g, '').replace(/^(дом|д)/, '');

let A = null;
function index() {
  if (A) return A;
  const g = geo();
  const [lon0, lat0] = g.raw.o;
  const q = g.raw.q;
  const list = [];
  for (const [street, alt, hns, xy] of g.raw.a) {
    const keys = [...new Set([...words(street), ...words(alt)])];
    let x = 0, y = 0;
    hns.split('|').forEach((hn, i) => {
      x += xy[2 * i]; y += xy[2 * i + 1];
      list.push({ street, hn, keys, h: normHn(hn), lat: lat0 + y / q, lon: lon0 + x / q });
    });
  }
  A = list;
  return A;
}

export const label = (a) => (a.hn ? `${a.street}, ${a.hn}` : a.street);

// Поиск: все слова запроса должны найтись в названии улицы (с окончаниями: «Тургенева» ↔ «Тургенев»), номер — с начала
export function search(query, limit = 6) {
  const toks = norm(query).split(/[\s,]+/).filter(Boolean);
  // «мкр 12, 5» и «12 мкр 5»: число рядом с «мкр» — часть названия микрорайона, следующее число — дом
  const MKR = /^(мкр|мкрн|микрорайон)$/;
  const ws = [];
  let num = null;
  toks.forEach((t, i) => {
    const digit = /^\d/.test(t);
    if (digit && (MKR.test(toks[i - 1] || '') || MKR.test(toks[i + 1] || ''))) ws.push(t.replace(/-?й$/, ''));
    else if (digit) { if (!num) num = t; }
    else if (!TYPE.test(t) && t.length >= 2) ws.push(t);
  });
  if (!ws.length) return [];
  const match = (keys) => ws.every((t) => keys.some((k) => k.startsWith(t) || (k.length >= 4 && t.startsWith(k.slice(0, -1)))));
  const res = [];
  const seenStreet = new Set();
  for (const a of index()) {
    if (!match(a.keys)) continue;
    if (num) {
      if (!a.h.startsWith(normHn(num))) continue;
      res.push(a);
    } else if (!seenStreet.has(a.street)) {
      seenStreet.add(a.street);
      res.push({ ...a, hn: '' , lat: a.lat, lon: a.lon });
    }
    if (res.length > 200) break;
  }
  const n = num ? normHn(num) : '';
  res.sort((a, b) => (a.h === n ? 0 : 1) - (b.h === n ? 0 : 1) || a.h.length - b.h.length || a.street.length - b.street.length);
  return res.slice(0, limit).map((a) => ({ street: a.street, hn: a.hn, lat: a.lat, lon: a.lon, label: label(a) }));
}

// Обратный поиск: ближайший дом в 70 м, иначе ближайшая улица, иначе микрорайон
export function reverse(lat, lon) {
  let best = null, bd = 70;
  for (const a of index()) {
    if (Math.abs(a.lat - lat) > 0.001 || Math.abs(a.lon - lon) > 0.0015) continue;
    const d = distM(lat, lon, a.lat, a.lon);
    if (d < bd) { bd = d; best = a; }
  }
  if (best) return { street: best.street, hn: best.hn, lat, lon, label: label(best) };
  const g = geo();
  let street = '', sd = 150;
  for (const ch of g.chains) {
    if (ch.cls > 6) continue;
    for (let k = 0; k < ch.idx.length; k++) {
      const v = ch.idx[k];
      if (Math.abs(g.nodes.lat[v] - lat) > 0.002 || Math.abs(g.nodes.lon[v] - lon) > 0.003) continue;
      const d = distM(lat, lon, g.nodes.lat[v], g.nodes.lon[v]);
      if (d < sd) { sd = d; street = ch.name; }
    }
  }
  if (street) return { street, hn: '', lat, lon, label: street };
  const place = g.places.reduce((b, p) => (!b || distM(lat, lon, p.lat, p.lon) < distM(lat, lon, b.lat, b.lon) ? p : b), null);
  const name = place ? place.name : 'Актобе';
  return { street: name, hn: '', lat, lon, label: name };
}
