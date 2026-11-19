#!/usr/bin/env node
// Данные карты Актобе из OpenStreetMap для офлайн-карты приложения.
//
//   node tools/osm/build-aktobe.mjs <выгрузка.osm.pbf>
//
// Выгрузку берём с https://download.geofabrik.de/asia/kazakhstan.html (kazakhstan-latest.osm.pbf).
// Нужен osmium-tool: `brew install osmium-tool` или `apt install osmium-tool`.
//
// Выход:
//   src/geo/aktobe.json.gz — улицы с графом для маршрутов, здания, вода, зелень, ж/д, микрорайоны, адреса;
//   src/geo/places.json    — точки на карте: школы, ЦОН, вузы, акимат, полигон ТБО (читаемый JSON).
// Данные © участники OpenStreetMap, лицензия ODbL 1.0 (https://www.openstreetmap.org/copyright).
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SRC = process.argv[2];
if (!SRC) {
  console.error('Укажите выгрузку OSM: node tools/osm/build-aktobe.mjs kazakhstan-latest.osm.pbf');
  process.exit(1);
}

// Город с пригородами: от Курашасая на западе до Каргалинского на востоке
const BBOX = [57.02, 50.16, 57.42, 50.40]; // долгота, широта (мин), долгота, широта (макс)
const Q = 1e5; // шаг сетки: 0,00001° ≈ 1,1 м по широте и 0,7 м по долготе
const LAT0 = 50.28;
const MX = (111320 * Math.cos((LAT0 * Math.PI) / 180)) / Q; // метров в шаге по X
const MY = 110574 / Q; // метров в шаге по Y
const qx = (lon) => Math.round((lon - BBOX[0]) * Q);
const qy = (lat) => Math.round((lat - BBOX[1]) * Q);

const tmp = mkdtempSync(join(tmpdir(), 'saqta-osm-'));
const city = join(tmp, 'city.osm.pbf');
const roadsXml = join(tmp, 'roads.osm');
const allSeq = join(tmp, 'all.geojsonseq');
const run = (...a) => execFileSync('osmium', a, { stdio: ['ignore', 'ignore', 'inherit'] });
console.log('1/4 osmium: вырезаем город, дороги и слои');
run('extract', '-b', BBOX.join(','), SRC, '-o', city, '--overwrite');
run('tags-filter', city, 'w/highway', '-o', roadsXml, '--overwrite');
run('export', city, '-f', 'geojsonseq', '--geometry-types=point,linestring,polygon', '-o', allSeq, '--overwrite');

// ── Помощники ────────────────────────────────────────────────────────────────
// «Роза Бағланова көшесі» → «улица Роза Бағланова»: тип улицы по-русски, само название как в OSM
const STREET_TYPE = [[/\s+көшесі$/i, 'улица'], [/\s+даңғылы$/i, 'проспект'], [/\s+тұйығы$/i, 'тупик'], [/\s+шағын ауданы$/i, 'микрорайон'], [/\s+тас жолы$/i, 'шоссе'], [/\s+бульвары$/i, 'бульвар']];
const ruStreet = (s) => { for (const [re, t] of STREET_TYPE) if (re.test(s)) return `${t} ${s.replace(re, '')}`; return s; };
const unxml = (s) => s.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&amp;/g, '&');

function perpDist(p, a, b) {
  const ax = a[0] * MX, ay = a[1] * MY, bx = b[0] * MX, by = b[1] * MY, px = p[0] * MX, py = p[1] * MY;
  const dx = bx - ax, dy = by - ay;
  const len2 = dx * dx + dy * dy;
  if (!len2) return Math.hypot(px - ax, py - ay);
  let t = ((px - ax) * dx + (py - ay) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}
// Дуглас — Пекер: индексы точек, которые остаются (концы всегда остаются)
function dpKeep(pts, tol) {
  const keep = new Uint8Array(pts.length);
  keep[0] = 1; keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [i, j] = stack.pop();
    let best = -1, bi = -1;
    for (let k = i + 1; k < j; k++) {
      const d = perpDist(pts[k], pts[i], pts[j]);
      if (d > best) { best = d; bi = k; }
    }
    if (best > tol) { keep[bi] = 1; stack.push([i, bi], [bi, j]); }
  }
  return keep;
}
const simplify = (pts, tol) => { if (pts.length <= 2) return pts; const k = dpKeep(pts, tol); return pts.filter((_, i) => k[i]); };
function ringArea(r) { // м², по модулю
  let s = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) s += (r[j][0] * MX) * (r[i][1] * MY) - (r[i][0] * MX) * (r[j][1] * MY);
  return Math.abs(s / 2);
}
function centroid(r) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const f = r[j][0] * r[i][1] - r[i][0] * r[j][1];
    a += f; cx += (r[j][0] + r[i][0]) * f; cy += (r[j][1] + r[i][1]) * f;
  }
  if (!a) return [r[0][0], r[0][1]];
  return [Math.round(cx / (3 * a)), Math.round(cy / (3 * a))];
}
// Кривая Гильберта: соседние на карте объекты рядом в массиве — дельты маленькие, gzip жмёт лучше
function hilbert(x, y, n = 1 << 16) {
  let d = 0;
  for (let s = n >> 1; s > 0; s >>= 1) {
    const rx = (x & s) > 0 ? 1 : 0;
    const ry = (y & s) > 0 ? 1 : 0;
    d += s * s * ((3 * rx) ^ ry);
    if (ry === 0) { if (rx === 1) { x = s - 1 - x; y = s - 1 - y; } [x, y] = [y, x]; }
  }
  return d;
}
const inBox = (x, y) => x >= -2000 && y >= -2000 && x <= (BBOX[2] - BBOX[0]) * Q + 2000 && y <= (BBOX[3] - BBOX[1]) * Q + 2000;

// ── 2. Дороги и граф ──────────────────────────────────────────────────────────
console.log('2/4 дороги и граф для маршрутов');
const CLASS = {
  motorway: 1, trunk: 1, motorway_link: 1, trunk_link: 1,
  primary: 2, primary_link: 2,
  secondary: 3, secondary_link: 3,
  tertiary: 4, tertiary_link: 4,
  residential: 5, unclassified: 5, living_street: 5, road: 5,
  service: 6,
  pedestrian: 7, footway: 7, path: 7, cycleway: 7, steps: 7, bridleway: 7,
  track: 8,
};
const xml = readFileSync(roadsXml, 'utf8');
const nodeXY = new Map();
for (const m of xml.matchAll(/<node id="(\d+)"[^>]*? lat="([-\d.]+)" lon="([-\d.]+)"/g)) nodeXY.set(m[1], [qx(+m[3]), qy(+m[2])]);
const ways = [];
const refCount = new Map();
const kkToRu = new Map(); // казахское название улицы → русское (для адресов)
for (const m of xml.matchAll(/<way id="(\d+)"[^>]*>([\s\S]*?)<\/way>/g)) {
  const tags = {};
  for (const t of m[2].matchAll(/<tag k="([^"]*)" v="([^"]*)"\/>/g)) tags[unxml(t[1])] = unxml(t[2]);
  const cls = CLASS[tags.highway];
  if (!cls || tags.area === 'yes') continue;
  const refs = [...m[2].matchAll(/<nd ref="(\d+)"\/>/g)].map((r) => r[1]).filter((r) => nodeXY.has(r));
  if (refs.length < 2) continue;
  const ru = tags['name:ru'] || (tags.name ? ruStreet(tags.name) : '');
  if (tags.name && tags['name:ru']) kkToRu.set(tags.name, tags['name:ru']);
  let oneway = 0;
  if (cls <= 6 && (tags.oneway === 'yes' || tags.oneway === '1' || tags.junction === 'roundabout')) oneway = 1;
  if (cls <= 6 && tags.oneway === '-1') oneway = 2;
  const link = /_link$/.test(tags.highway) ? 4 : 0;
  ways.push({ cls, name: ru, flags: oneway | link, refs });
  for (const r of refs) refCount.set(r, (refCount.get(r) || 0) + 1);
}
const keptIds = new Set();
for (const w of ways) {
  const pts = w.refs.map((r) => nodeXY.get(r));
  const anchors = [0];
  for (let i = 1; i < w.refs.length - 1; i++) if (refCount.get(w.refs[i]) > 1) anchors.push(i);
  anchors.push(w.refs.length - 1);
  const keepIdx = new Set(anchors);
  for (let a = 0; a < anchors.length - 1; a++) {
    const i = anchors[a], j = anchors[a + 1];
    if (j - i < 2) continue;
    const k = dpKeep(pts.slice(i, j + 1), 1.5);
    k.forEach((v, n) => { if (v) keepIdx.add(i + n); });
  }
  w.refs = w.refs.filter((_, i) => keepIdx.has(i));
  // повторяющиеся подряд узлы
  w.refs = w.refs.filter((r, i) => i === 0 || r !== w.refs[i - 1]);
  w.refs.forEach((r) => keptIds.add(r));
}
const nodeList = [...keptIds].map((id) => ({ id, xy: nodeXY.get(id) }));
nodeList.sort((a, b) => hilbert(a.xy[0] + 1000, a.xy[1] + 1000) - hilbert(b.xy[0] + 1000, b.xy[1] + 1000));
const nodeIdx = new Map(nodeList.map((n, i) => [n.id, i]));
const rn = [];
{ let px = 0, py = 0; for (const n of nodeList) { rn.push(n.xy[0] - px, n.xy[1] - py); [px, py] = n.xy; } }
const names = [];
const nameIdx = new Map();
const nameId = (s) => { if (!s) return 0; if (!nameIdx.has(s)) { nameIdx.set(s, names.length + 1); names.push(s); } return nameIdx.get(s); };
ways.sort((a, b) => a.cls - b.cls || nodeIdx.get(a.refs[0]) - nodeIdx.get(b.refs[0]));
const rw = [];
for (const w of ways) {
  if (w.refs.length < 2) continue;
  const idx = w.refs.map((r) => nodeIdx.get(r));
  rw.push(w.cls, nameId(w.name), w.flags, idx.length, idx[0]);
  for (let i = 1; i < idx.length; i++) rw.push(idx[i] - idx[i - 1]);
}

// ── 3. Остальные слои ─────────────────────────────────────────────────────────
console.log('3/4 здания, вода, зелень, адреса');
const POLY = { water: 1, park: 2, forest: 3, grass: 4, cemetery: 5, pitch: 6, industrial: 7, landfill: 8 };
const LINE = { river: 1, canal: 2, stream: 3, rail: 10, railMinor: 11 };
const buildings = [];
const polys = [];
const lines = [];
const placeLabels = new Map();
const addrRaw = [];
const pois = { school: [], university: [], college: [], con: [], townhall: [], landfill: [] };
const PLACE_RANK = { suburb: 1, quarter: 2, neighbourhood: 2, village: 2, hamlet: 3 };

const toQ = (ring) => ring.map(([lon, lat]) => [qx(lon), qy(lat)]);
function polyKind(p) {
  if (p.natural === 'water' || p.landuse === 'reservoir' || p.landuse === 'basin' || p.waterway === 'riverbank' || p.water) return 'water';
  if (p.landuse === 'landfill') return 'landfill';
  if (['park', 'garden', 'nature_reserve', 'golf_course', 'playground'].includes(p.leisure)) return 'park';
  if (p.landuse === 'forest' || p.natural === 'wood') return 'forest';
  if (['grass', 'meadow', 'recreation_ground', 'village_green', 'allotments', 'orchard'].includes(p.landuse) || ['grassland', 'scrub', 'heath'].includes(p.natural)) return 'grass';
  if (p.landuse === 'cemetery' || p.amenity === 'grave_yard') return 'cemetery';
  if (['pitch', 'stadium', 'sports_centre', 'track'].includes(p.leisure)) return 'pitch';
  if (['industrial', 'railway', 'garages'].includes(p.landuse)) return 'industrial';
  return null;
}
const ruName = (p) => p['name:ru'] || p.name || '';

const text = readFileSync(allSeq, 'utf8');
for (let line of text.split('\n')) {
  line = line.replace(/^\x1e/, '').trim();
  if (!line) continue;
  const f = JSON.parse(line);
  const p = f.properties;
  const g = f.geometry;
  const polysOf = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : null;
  const point = g.type === 'Point' ? [qx(g.coordinates[0]), qy(g.coordinates[1])] : polysOf ? centroid(toQ(polysOf[0][0])) : null;

  if (p.building && polysOf) {
    for (const poly of polysOf) {
      const ring = simplify(toQ(poly[0]), 0.6);
      if (ring.length < 4 || ringArea(ring) < 12) continue;
      const c = centroid(ring);
      if (!inBox(c[0], c[1])) continue;
      buildings.push({ c, ring: ring.slice(0, -1) });
    }
  }
  const pk = polysOf && !p.building ? polyKind(p) : null;
  if (pk) {
    for (const poly of polysOf) {
      const rings = poly.map((r) => simplify(toQ(r), pk === 'water' ? 2 : 3)).filter((r) => r.length >= 4 && ringArea(r) > 60);
      if (!rings.length) continue;
      const c = centroid(rings[0]);
      if (!inBox(c[0], c[1])) continue;
      polys.push({ kind: POLY[pk], c, rings: rings.map((r) => r.slice(0, -1)) });
    }
  }
  if (g.type === 'LineString') {
    let lk = null;
    if (p.waterway === 'river') lk = 'river';
    else if (p.waterway === 'canal') lk = 'canal';
    else if (['stream', 'drain', 'ditch'].includes(p.waterway)) lk = 'stream';
    else if (p.railway === 'rail' && !p.service) lk = 'rail';
    else if (p.railway === 'rail') lk = 'railMinor';
    if (lk) {
      const pts = simplify(toQ(g.coordinates), 2);
      if (pts.length >= 2) lines.push({ kind: LINE[lk], c: pts[0], pts, name: lk === 'river' ? ruName(p) : '' });
    }
  }
  if (p.place && PLACE_RANK[p.place] && point && inBox(point[0], point[1])) {
    const name = ruName(p);
    if (name && !placeLabels.has(name)) placeLabels.set(name, { name, x: point[0], y: point[1], rank: PLACE_RANK[p.place] });
  }
  if (p['addr:housenumber'] && (p['addr:street'] || p['addr:street:ru']) && point && inBox(point[0], point[1])) {
    const street = p['addr:street:ru'] || kkToRu.get(p['addr:street']) || ruStreet(p['addr:street']);
    addrRaw.push({ street, kk: p['addr:street'] || '', hn: p['addr:housenumber'].trim(), x: point[0], y: point[1] });
  }
  if (point && p.name) {
    const nm = ruName(p);
    const addr = p['addr:street'] ? `${kkToRu.get(p['addr:street']) || ruStreet(p['addr:street'])}${p['addr:housenumber'] ? `, ${p['addr:housenumber']}` : ''}` : '';
    const rec = { name: nm, official: p.name, x: point[0], y: point[1], addr };
    const low = `${p.name} ${p['name:ru'] || ''}`.toLowerCase();
    if (p.amenity === 'school') pois.school.push(rec);
    if (p.amenity === 'university') pois.university.push(rec);
    if (p.amenity === 'college') pois.college.push(rec);
    if (/халыққа қызмет|обслуживания населения/.test(low) && !/авто/.test(low)) pois.con.push(rec);
    if (p.amenity === 'townhall') pois.townhall.push(rec);
  }
  if (p.landuse === 'landfill' && polysOf) pois.landfill.push({ name: 'Полигон ТБО', official: p.operator || '', x: point[0], y: point[1], addr: '' });
}

// здания: по кривой Гильберта, координаты — дельтами одной цепочкой
buildings.sort((a, b) => hilbert(a.c[0] + 1000, a.c[1] + 1000) - hilbert(b.c[0] + 1000, b.c[1] + 1000));
const bOut = [];
{ let px = 0, py = 0; for (const b of buildings) { bOut.push(b.ring.length); for (const [x, y] of b.ring) { bOut.push(x - px, y - py); px = x; py = y; } } }
polys.sort((a, b) => a.kind - b.kind || hilbert(a.c[0] + 1000, a.c[1] + 1000) - hilbert(b.c[0] + 1000, b.c[1] + 1000));
const pOut = [];
{ let px = 0, py = 0; for (const p of polys) { pOut.push(p.kind, p.rings.length); for (const r of p.rings) { pOut.push(r.length); for (const [x, y] of r) { pOut.push(x - px, y - py); px = x; py = y; } } } }
const lOut = [];
{ let px = 0, py = 0; for (const l of lines) { lOut.push(l.kind, nameId(l.name), l.pts.length); for (const [x, y] of l.pts) { lOut.push(x - px, y - py); px = x; py = y; } } }

// адреса: по улицам, внутри улицы — по номеру дома
const seen = new Set();
const byStreet = new Map();
for (const a of addrRaw) {
  const key = `${a.street}|${a.hn}|${Math.round(a.x / 30)}|${Math.round(a.y / 30)}`;
  if (seen.has(key)) continue;
  seen.add(key);
  if (!byStreet.has(a.street)) byStreet.set(a.street, { kk: a.kk, list: [] });
  byStreet.get(a.street).list.push(a);
}
const collator = new Intl.Collator('ru', { numeric: true });
const aOut = [];
for (const [street, { kk, list }] of [...byStreet].sort((a, b) => collator.compare(a[0], b[0]))) {
  list.sort((a, b) => collator.compare(a.hn, b.hn));
  const xy = [];
  let px = 0, py = 0;
  for (const a of list) { xy.push(a.x - px, a.y - py); px = a.x; py = a.y; }
  aOut.push([street, kk !== street ? kk : '', list.map((a) => a.hn).join('|'), xy]);
}

const data = {
  v: 1,
  src: 'OpenStreetMap',
  date: new Date().toISOString().slice(0, 10),
  o: [BBOX[0], BBOX[1]],
  q: Q,
  box: [0, 0, Math.round((BBOX[2] - BBOX[0]) * Q), Math.round((BBOX[3] - BBOX[1]) * Q)],
  names,
  rn, rw,
  b: bOut,
  p: pOut,
  l: lOut,
  pl: [...placeLabels.values()].map((p) => [p.name, p.x, p.y, p.rank]),
  a: aOut,
};
const json = JSON.stringify(data);
const gz = gzipSync(Buffer.from(json), { level: 9 });
mkdirSync(join(root, 'src/geo'), { recursive: true });
writeFileSync(join(root, 'src/geo/aktobe.json.gz'), gz);

// ── 4. Точки на карте ─────────────────────────────────────────────────────────
console.log('4/4 точки: школы, ЦОН, вузы, акимат');
const toLonLat = (x, y) => [+(BBOX[0] + x / Q).toFixed(6), +(BBOX[1] + y / Q).toFixed(6)];
const dist = (a, b) => Math.hypot((a.x - b.x) * MX, (a.y - b.y) * MY);
function dedupe(list, meters) {
  const out = [];
  for (const r of list) if (!out.some((o) => o.official === r.official && dist(o, r) < meters)) out.push(r);
  return out;
}
const nearestAddr = (x, y) => {
  let best = null, bd = 60;
  for (const a of addrRaw) { const d = Math.hypot((a.x - x) * MX, (a.y - y) * MY); if (d < bd) { bd = d; best = a; } }
  return best ? `${best.street}, ${best.hn}` : '';
};
// Ближайшая названная улица (если у здания нет точного адреса — показываем улицу без номера)
const roadNames = ways.filter((w) => w.cls <= 5 && w.name).map((w) => ({ name: w.name, pts: w.refs.map((r) => nodeXY.get(r)) }));
const nearestStreet = (x, y) => {
  let best = '', bd = 150;
  for (const w of roadNames) for (let i = 1; i < w.pts.length; i++) {
    const d = perpDist([x, y], w.pts[i - 1], w.pts[i]);
    if (d < bd) { bd = d; best = w.name; }
  }
  return best;
};
const schoolNoOf = (s) => +((`${s.name} ${s.official}`.match(/№\s*(\d+)|школа\s+(\d+)/i) || []).slice(1).find(Boolean) || 0);
function shortName(kind, r) {
  if (kind !== 'school') return r.name;
  const no = schoolNoOf(r);
  if (!no) return r.name;
  const t = `${r.name} ${r.official}`;
  return `${/гимнази/i.test(t) ? 'Школа-гимназия' : /лицей/i.test(t) ? 'Школа-лицей' : 'Школа'} №${no}`;
}
const place = (kind, r, extra = {}) => {
  const [lon, lat] = toLonLat(r.x, r.y);
  const name = shortName(kind, r);
  const full = r.name !== name ? r.name : r.official !== name ? r.official : undefined;
  const area = [...placeLabels.values()].reduce((b, l) => (!b || dist(l, r) < dist(b, r) ? l : b), null);
  const address = r.addr || nearestAddr(r.x, r.y) || nearestStreet(r.x, r.y) || (area && dist(area, r) < 1500 ? area.name : undefined);
  return { kind, name, official: full, address, lat, lon, ...extra };
};
// Донор-лига — 40 обычных школ (док: «40 школ в Донор-лиге»), равномерно по городу:
// k-средних по координатам школ, в каждом кластере — ближайшая к центру школа.
const EXCLUDE = /специальн|коррекц|вечерн|сменн|музык|искусств|военн|интернат|частн|международн|smart|акбобек|ақбөбек|инновац/i;
const eligible = [];
for (const s of dedupe(pois.school, 300)) {
  const t = `${s.official} ${s.name}`;
  if (!/№\s*\d+|школ|мектеб|гимнази|лицей/i.test(t) || EXCLUDE.test(t)) continue;
  // одна школа бывает в OSM дважды (точка и здание, разные названия)
  // номера школ в городе не повторяются: одинаковый номер — дубль в OSM
  const twin = eligible.find((e) => (schoolNoOf(e) && schoolNoOf(e) === schoolNoOf(s)) || (e.name === s.name && dist(e, s) < 1500));
  if (!twin) { eligible.push(s); continue; }
  if (!twin.addr && s.addr) Object.assign(twin, { addr: s.addr });
  if (/[әғқңөұүһі]/i.test(twin.name) && !/[әғқңөұүһі]/i.test(s.name)) Object.assign(twin, { name: s.name, official: s.official });
}
function kmeansPick(list, k) {
  const pts = list.map((s) => [s.x * MX, s.y * MY]);
  const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length, cy = pts.reduce((a, p) => a + p[1], 0) / pts.length;
  const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  let first = 0; pts.forEach((p, i) => { if (d2(p, [cx, cy]) < d2(pts[first], [cx, cy])) first = i; });
  const cent = [pts[first]];
  while (cent.length < k) { // дальняя точка — детерминированный старт
    let bi = 0, bd = -1;
    pts.forEach((p, i) => { const d = Math.min(...cent.map((c) => d2(p, c))); if (d > bd) { bd = d; bi = i; } });
    cent.push(pts[bi]);
  }
  for (let it = 0; it < 30; it++) {
    const sum = cent.map(() => [0, 0, 0]);
    pts.forEach((p) => { let bi = 0; cent.forEach((c, i) => { if (d2(p, c) < d2(p, cent[bi])) bi = i; }); sum[bi][0] += p[0]; sum[bi][1] += p[1]; sum[bi][2]++; });
    sum.forEach((s, i) => { if (s[2]) cent[i] = [s[0] / s[2], s[1] / s[2]]; });
  }
  const used = new Set();
  return cent.map((c) => {
    let bi = -1;
    pts.forEach((p, i) => { if (!used.has(i) && (bi < 0 || d2(p, c) < d2(pts[bi], c))) bi = i; });
    used.add(bi);
    return list[bi];
  });
}
const league = kmeansPick(eligible, 40);
league.sort((a, b) => (schoolNoOf(a) || 999) - (schoolNoOf(b) || 999) || collator.compare(a.name, b.name));

// 5 боксов в ЦОН и вузах (док: «Ещё 5 боксов в ЦОН и вузах»): два ЦОН и три вуза в разных частях города
const cons = dedupe(pois.con, 100).filter((c) => c.addr);
const conBoxes = [cons.find((c) => /№\s*1/.test(c.name)) || cons[0], cons.find((c) => /Санкибай/.test(c.addr))].filter(Boolean);
const uni = dedupe(pois.university, 400);
const uniBoxes = ['Жубанова', 'Оспанова', 'Казахско-Русский'].map((k) => uni.find((u) => u.name.includes(k))).filter(Boolean);

// Хаб: в центре сети точек сбора, на крупной улице. Дом не указываем: помещение ещё не арендовано.
const net = [...league, ...conBoxes, ...uniBoxes];
const mid = { x: net.reduce((a, s) => a + s.x, 0) / net.length, y: net.reduce((a, s) => a + s.y, 0) / net.length };
const bigStreet = /проспект|даңғылы|улица (Братьев Жубановых|Маресьева|Есет Батыра|Тургенева|Абая|Айтеке Би)/;
const near = (pt, filter) => addrRaw.filter(filter).reduce((b, a) => (!b || dist(a, pt) < dist(b, pt) ? a : b), null);
const hubA = near(mid, (a) => bigStreet.test(a.street));
// Склад магазина-партнёра для «Обратного рейса»: промзона, ближайшая к центру сети
const industrial = polys.filter((p) => p.kind === POLY.industrial && ringArea(p.rings[0]) > 20000)
  .reduce((b, p) => (!b || dist({ x: p.c[0], y: p.c[1] }, mid) < dist({ x: b.c[0], y: b.c[1] }, mid) ? p : b), null);
const storeA = near({ x: industrial.c[0], y: industrial.c[1] }, () => true);
const akimat = dedupe(pois.townhall, 100).find((t) => /города Актобе$/.test(t.name) && /Аппарат акима города/.test(t.name));

let n = 0;
const places = {
  source: `© участники OpenStreetMap, ODbL; выгрузка ${data.date}`,
  league: league.map((s) => place('school', s, { id: `s${++n}` })),
  boxes: [...conBoxes, ...uniBoxes].map((b, i) => place(conBoxes.includes(b) ? 'con' : 'university', b, { id: `b${i + 1}` })),
  hub: { kind: 'hub', name: 'Хаб SAQTA', address: hubA.street, lat: toLonLat(hubA.x, hubA.y)[1], lon: toLonLat(hubA.x, hubA.y)[0] },
  store: { kind: 'store', name: 'Склад магазина-партнёра', address: storeA.street, lat: toLonLat(storeA.x, storeA.y)[1], lon: toLonLat(storeA.x, storeA.y)[0] },
  akimat: place('townhall', akimat),
  landfill: dedupe(pois.landfill, 2000).map((l) => place('landfill', l)),
};
writeFileSync(join(root, 'src/geo/places.json'), `${JSON.stringify(places, null, 1)}\n`);
rmSync(tmp, { recursive: true, force: true });

const kb = (n) => `${(n / 1024).toFixed(0)} КБ`;
console.log(`Готово: aktobe.json.gz ${kb(gz.length)} (JSON ${kb(json.length)})`);
console.log(`  узлов ${nodeList.length}, дорог ${ways.length}, зданий ${buildings.length}, площадей ${polys.length}, линий ${lines.length}`);
console.log(`  микрорайонов ${placeLabels.size}, улиц с адресами ${byStreet.size}, адресов ${seen.size}`);
console.log(`  Донор-лига ${places.league.length} школ (из ${eligible.length}), боксов ${places.boxes.length}, хаб: ${places.hub.address}, склад: ${places.store.address}`);
