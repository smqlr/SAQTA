// Карта Актобе из OpenStreetMap, встроенная в файл приложения (src/geo/aktobe.json.gz, см. tools/osm).
// Здесь — распаковка, координаты в проекции Меркатора (0…1), сетка для быстрого поиска объектов.
import { gunzipSync, strFromU8 } from 'fflate';
import GZ from '../../geo/aktobe.json.gz';

const RAD = Math.PI / 180;
export const mercX = (lon) => (lon + 180) / 360;
export const mercY = (lat) => {
  const s = Math.sin(lat * RAD);
  return 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI);
};
export const lonOf = (x) => x * 360 - 180;
export const latOf = (y) => Math.atan(Math.sinh(Math.PI * (1 - 2 * y))) / RAD;

// Расстояние по поверхности Земли, метры
export function distM(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * RAD;
  const dLon = (lon2 - lon1) * RAD;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * RAD) * Math.cos(lat2 * RAD) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371008.8 * Math.asin(Math.sqrt(a));
}

const CELL = 1 / 2 ** 15; // ≈ 780 м у Актобе

let G = null;
export function geo() {
  if (!G) G = decode(JSON.parse(strFromU8(gunzipSync(GZ))));
  return G;
}

function decode(d) {
  const lon0 = d.o[0];
  const lat0 = d.o[1];
  const Q = d.q;
  const X = (qx) => mercX(lon0 + qx / Q);
  const Y = (qy) => mercY(lat0 + qy / Q);

  // Узлы дорог
  const nN = d.rn.length / 2;
  const nx = new Float64Array(nN);
  const ny = new Float64Array(nN);
  const nlon = new Float64Array(nN);
  const nlat = new Float64Array(nN);
  {
    let x = 0, y = 0;
    for (let i = 0; i < nN; i++) {
      x += d.rn[2 * i]; y += d.rn[2 * i + 1];
      nlon[i] = lon0 + x / Q; nlat[i] = lat0 + y / Q;
      nx[i] = mercX(nlon[i]); ny[i] = mercY(nlat[i]);
    }
  }
  const names = d.names;
  const roads = [];
  for (let i = 0; i < d.rw.length;) {
    const cls = d.rw[i++];
    const name = d.rw[i++];
    const flags = d.rw[i++];
    const n = d.rw[i++];
    const idx = new Int32Array(n);
    idx[0] = d.rw[i++];
    for (let k = 1; k < n; k++) idx[k] = idx[k - 1] + d.rw[i++];
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const j of idx) { if (nx[j] < x0) x0 = nx[j]; if (nx[j] > x1) x1 = nx[j]; if (ny[j] < y0) y0 = ny[j]; if (ny[j] > y1) y1 = ny[j]; }
    roads.push({ cls, name: name ? names[name - 1] : '', oneway: flags & 3, link: !!(flags & 4), idx, box: [x0, y0, x1, y1] });
  }

  // Цепочки координат (здания, площади, линии): дельты от предыдущей точки
  let cx = 0, cy = 0;
  const ring = (arr, at, n) => {
    const out = new Float64Array(n * 2);
    for (let k = 0; k < n; k++) { cx += arr[at + 2 * k]; cy += arr[at + 2 * k + 1]; out[2 * k] = X(cx); out[2 * k + 1] = Y(cy); }
    return out;
  };
  const boxOf = (pts) => {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (let k = 0; k < pts.length; k += 2) { if (pts[k] < x0) x0 = pts[k]; if (pts[k] > x1) x1 = pts[k]; if (pts[k + 1] < y0) y0 = pts[k + 1]; if (pts[k + 1] > y1) y1 = pts[k + 1]; }
    return [x0, y0, x1, y1];
  };
  const buildings = [];
  cx = 0; cy = 0;
  for (let i = 0; i < d.b.length;) { const n = d.b[i++]; const pts = ring(d.b, i, n); i += 2 * n; buildings.push({ pts, box: boxOf(pts) }); }
  const polys = [];
  cx = 0; cy = 0;
  for (let i = 0; i < d.p.length;) {
    const kind = d.p[i++];
    const nr = d.p[i++];
    const rings = [];
    for (let r = 0; r < nr; r++) { const n = d.p[i++]; rings.push(ring(d.p, i, n)); i += 2 * n; }
    polys.push({ kind, rings, box: boxOf(rings[0]) });
  }
  const lines = [];
  cx = 0; cy = 0;
  for (let i = 0; i < d.l.length;) {
    const kind = d.l[i++];
    const name = d.l[i++];
    const n = d.l[i++];
    const pts = ring(d.l, i, n); i += 2 * n;
    lines.push({ kind, name: name ? names[name - 1] : '', pts, box: boxOf(pts) });
  }
  const places = d.pl.map(([name, qx, qy, rank]) => ({ name, rank, lat: lat0 + qy / Q, lon: lon0 + qx / Q }));

  // Цепочки для подписей: в OSM улица разрезана на куски — склеиваем куски одной улицы по общим узлам
  const chains = [];
  const groups = new Map();
  for (const r of roads) {
    if (!r.name || r.cls > 6) continue;
    const k = `${r.cls}|${r.name}`;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(Array.from(r.idx));
  }
  for (const [k, pool] of groups) {
    const cls = +k.slice(0, k.indexOf('|'));
    const name = k.slice(k.indexOf('|') + 1);
    while (pool.length) {
      let ch = pool.pop();
      for (let grown = true; grown;) {
        grown = false;
        for (let i = 0; i < pool.length; i++) {
          const w = pool[i];
          const h = ch[0], t = ch[ch.length - 1];
          if (w[0] === t) ch = ch.concat(w.slice(1));
          else if (w[w.length - 1] === t) ch = ch.concat(w.slice(0, -1).reverse());
          else if (w[w.length - 1] === h) ch = w.concat(ch.slice(1));
          else if (w[0] === h) ch = w.slice(1).reverse().concat(ch);
          else continue;
          pool.splice(i, 1);
          grown = true;
          break;
        }
      }
      const idx = Int32Array.from(ch);
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const j of idx) { if (nx[j] < x0) x0 = nx[j]; if (nx[j] > x1) x1 = nx[j]; if (ny[j] < y0) y0 = ny[j]; if (ny[j] > y1) y1 = ny[j]; }
      chains.push({ cls, name, idx, box: [x0, y0, x1, y1] });
    }
  }

  const bounds = { south: lat0, west: lon0, north: lat0 + d.box[3] / Q, east: lon0 + d.box[2] / Q };
  const gx0 = mercX(bounds.west), gy0 = mercY(bounds.north);
  const gw = Math.ceil((mercX(bounds.east) - gx0) / CELL) + 1;
  const gh = Math.ceil((mercY(bounds.south) - gy0) / CELL) + 1;
  const grid = (items) => {
    const cells = Array.from({ length: gw * gh }, () => []);
    items.forEach((it, id) => {
      const [x0, y0, x1, y1] = it.box;
      const i0 = Math.max(0, Math.floor((x0 - gx0) / CELL)), i1 = Math.min(gw - 1, Math.floor((x1 - gx0) / CELL));
      const j0 = Math.max(0, Math.floor((y0 - gy0) / CELL)), j1 = Math.min(gh - 1, Math.floor((y1 - gy0) / CELL));
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) cells[j * gw + i].push(id);
    });
    const stamp = new Uint32Array(items.length);
    let tick = 0;
    return (x0, y0, x1, y1) => {
      tick++;
      const out = [];
      const i0 = Math.max(0, Math.floor((x0 - gx0) / CELL)), i1 = Math.min(gw - 1, Math.floor((x1 - gx0) / CELL));
      const j0 = Math.max(0, Math.floor((y0 - gy0) / CELL)), j1 = Math.min(gh - 1, Math.floor((y1 - gy0) / CELL));
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) for (const id of cells[j * gw + i]) {
        if (stamp[id] === tick) continue;
        stamp[id] = tick;
        const b = items[id].box;
        if (b[2] >= x0 && b[0] <= x1 && b[3] >= y0 && b[1] <= y1) out.push(id);
      }
      return out;
    };
  };

  return {
    date: d.date,
    bounds,
    center: { lat: 50.2839, lon: 57.1670 }, // центр Актобе
    nodes: { x: nx, y: ny, lon: nlon, lat: nlat, count: nN },
    roads, buildings, polys, lines, places, chains,
    q: { roads: grid(roads), buildings: grid(buildings), polys: grid(polys), lines: grid(lines), chains: grid(chains) },
    raw: { a: d.a, o: d.o, q: Q },
    inCity: (lat, lon) => lat > bounds.south && lat < bounds.north && lon > bounds.west && lon < bounds.east,
  };
}
