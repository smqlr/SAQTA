// Маршруты по улицам Актобе: граф дорог из OSM, кратчайший по времени путь (Дейкстра),
// порядок объезда точек (ближайший сосед + 2-opt). Всё считается в браузере, без сервера.
import { geo, distM } from './geo.js';

// Средняя скорость Газели в городе по типу дороги, км/ч (оценка для расчёта времени в пути)
const SPEED = { 1: 60, 2: 50, 3: 45, 4: 40, 5: 30, 6: 15, 8: 20 };

let G = null;
function graph() {
  if (G) return G;
  const g = geo();
  const n = g.nodes.count;
  const { lat, lon } = g.nodes;
  const from = [];
  const to = [];
  const len = [];
  const sec = [];
  for (const r of g.roads) {
    const v = SPEED[r.cls];
    if (!v) continue;
    for (let k = 1; k < r.idx.length; k++) {
      const a = r.idx[k - 1];
      const b = r.idx[k];
      const d = distM(lat[a], lon[a], lat[b], lon[b]);
      const t = d / (v / 3.6);
      if (r.oneway !== 2) { from.push(a); to.push(b); len.push(d); sec.push(t); }
      if (r.oneway !== 1) { from.push(b); to.push(a); len.push(d); sec.push(t); }
    }
  }
  // Списки смежности (CSR)
  const off = new Uint32Array(n + 1);
  for (const a of from) off[a + 1]++;
  for (let i = 0; i < n; i++) off[i + 1] += off[i];
  const pos = off.slice(0, n);
  const adj = new Uint32Array(from.length);
  const w = new Float64Array(from.length);
  const l = new Float64Array(from.length);
  for (let e = 0; e < from.length; e++) {
    const p = pos[from[e]]++;
    adj[p] = to[e]; w[p] = sec[e]; l[p] = len[e];
  }
  // Главная связная часть сети (без учёта направлений): к ней привязываем точки,
  // чтобы адрес у отдельного проезда не оказался «островом» без пути
  const main = new Uint8Array(n);
  let start = 0;
  for (let i = 1; i < n; i++) if (off[i + 1] - off[i] > off[start + 1] - off[start]) start = i;
  const undirected = Array.from({ length: n }, () => []);
  for (let e = 0; e < from.length; e++) { undirected[from[e]].push(to[e]); undirected[to[e]].push(from[e]); }
  const stack = [start];
  main[start] = 1;
  while (stack.length) {
    const v = stack.pop();
    for (const u of undirected[v]) if (!main[u]) { main[u] = 1; stack.push(u); }
  }
  G = { n, off, adj, w, l, main };
  return G;
}

// Ближайший узел дороги, по которой может проехать машина
export function snap(lat, lon) {
  const gr = graph();
  const g = geo();
  for (const r of [0.004, 0.012, 0.04]) {
    const x = (lon + 180) / 360;
    const s = Math.sin((lat * Math.PI) / 180);
    const y = 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI);
    const d = r / 360;
    let best = -1;
    let bd = Infinity;
    for (const id of g.q.roads(x - d, y - d, x + d, y + d)) {
      const road = g.roads[id];
      if (!SPEED[road.cls]) continue;
      for (const v of road.idx) {
        if (!gr.main[v]) continue;
        const dd = distM(lat, lon, g.nodes.lat[v], g.nodes.lon[v]);
        if (dd < bd) { bd = dd; best = v; }
      }
    }
    if (best >= 0) return best;
  }
  return -1;
}

// Двоичная куча для Дейкстры
class Heap {
  constructor() { this.k = []; this.v = []; }
  push(key, val) {
    const k = this.k, v = this.v;
    let i = k.length;
    k.push(key); v.push(val);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (k[p] <= key) break;
      k[i] = k[p]; v[i] = v[p]; i = p;
    }
    k[i] = key; v[i] = val;
  }
  pop() {
    const k = this.k, v = this.v;
    const top = v[0];
    const lk = k.pop(), lv = v.pop();
    if (k.length) {
      let i = 0;
      for (;;) {
        let c = 2 * i + 1;
        if (c >= k.length) break;
        if (c + 1 < k.length && k[c + 1] < k[c]) c++;
        if (k[c] >= lk) break;
        k[i] = k[c]; v[i] = v[c]; i = c;
      }
      k[i] = lk; v[i] = lv;
    }
    return top;
  }
  get size() { return this.k.length; }
}

// Дейкстра от source; если targets заданы — останавливаемся, когда все найдены
function dijkstra(source, targets) {
  const gr = graph();
  const dist = new Float64Array(gr.n).fill(Infinity);
  const prev = new Int32Array(gr.n).fill(-1);
  const done = new Uint8Array(gr.n);
  const want = targets ? new Set(targets) : null;
  dist[source] = 0;
  const h = new Heap();
  h.push(0, source);
  while (h.size) {
    const v = h.pop();
    if (done[v]) continue;
    done[v] = 1;
    if (want) { want.delete(v); if (!want.size) break; }
    for (let e = gr.off[v]; e < gr.off[v + 1]; e++) {
      const u = gr.adj[e];
      const nd = dist[v] + gr.w[e];
      if (nd < dist[u]) { dist[u] = nd; prev[u] = v; h.push(nd, u); }
    }
  }
  return { dist, prev };
}

function walk(prev, source, target) {
  const path = [];
  for (let v = target; v !== -1; v = prev[v]) { path.push(v); if (v === source) break; }
  return path[path.length - 1] === source ? path.reverse() : null;
}

function measure(path) {
  const gr = graph();
  let meters = 0, seconds = 0;
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1], b = path[i];
    for (let e = gr.off[a]; e < gr.off[a + 1]; e++) if (gr.adj[e] === b) { meters += gr.l[e]; seconds += gr.w[e]; break; }
  }
  return { meters, seconds };
}

const latlngs = (path) => {
  const g = geo();
  return path.map((v) => [g.nodes.lat[v], g.nodes.lon[v]]);
};

// Путь между двумя точками: { latlngs, meters, seconds } или null
export function route(a, b) {
  const s = snap(a.lat, a.lon);
  const t = snap(b.lat, b.lon);
  if (s < 0 || t < 0) return null;
  if (s === t) return { latlngs: [[a.lat, a.lon], [b.lat, b.lon]], meters: distM(a.lat, a.lon, b.lat, b.lon), seconds: 0 };
  const { prev } = dijkstra(s, [t]);
  const path = walk(prev, s, t);
  if (!path) return null;
  return { latlngs: latlngs(path), ...measure(path) };
}

// Объезд точек с возвратом в start: порядок, общий путь, километры и время
export function tour(start, stops) {
  const pts = [start, ...stops];
  const nodes = pts.map((p) => snap(p.lat, p.lon));
  if (nodes.some((v) => v < 0)) return null;
  const k = pts.length;
  const T = Array.from({ length: k }, () => new Float64Array(k));
  const P = [];
  for (let i = 0; i < k; i++) {
    const { dist, prev } = dijkstra(nodes[i], nodes);
    P.push(prev);
    for (let j = 0; j < k; j++) T[i][j] = dist[nodes[j]];
  }
  if (T.some((row) => [...row].some((x) => !Number.isFinite(x)))) return null;
  // Ближайший сосед
  const order = [0];
  const left = new Set(Array.from({ length: k - 1 }, (_, i) => i + 1));
  while (left.size) {
    const cur = order[order.length - 1];
    let best = -1;
    for (const j of left) if (best < 0 || T[cur][j] < T[cur][best]) best = j;
    order.push(best);
    left.delete(best);
  }
  // 2-opt по времени, маршрут замкнут на старт
  const cost = (o) => o.reduce((s, v, i) => s + T[v][o[(i + 1) % o.length]], 0);
  let improved = true;
  let bestCost = cost(order);
  while (improved) {
    improved = false;
    for (let i = 1; i < k - 1; i++) {
      for (let j = i + 1; j < k; j++) {
        const cand = [...order.slice(0, i), ...order.slice(i, j + 1).reverse(), ...order.slice(j + 1)];
        const c = cost(cand);
        if (c + 1e-6 < bestCost) { order.splice(0, k, ...cand); bestCost = c; improved = true; }
      }
    }
  }
  const legs = [];
  let all = [];
  let meters = 0, seconds = 0;
  for (let i = 0; i < k; i++) {
    const a = order[i];
    const b = order[(i + 1) % k];
    const path = walk(P[a], nodes[a], nodes[b]) || [nodes[a], nodes[b]];
    const m = measure(path);
    meters += m.meters;
    seconds += m.seconds;
    legs.push({ from: a, to: b, ...m });
    all = all.concat(latlngs(path));
  }
  return { order: order.slice(1).map((i) => i - 1), legs, latlngs: all, meters, seconds };
}

export const fmtKm = (m) => `${(m / 1000).toFixed(1).replace('.', ',')} км`;
export const fmtMin = (s) => {
  const min = Math.max(1, Math.round(s / 60));
  return min < 60 ? `${min} мин` : `${Math.floor(min / 60)} ч ${min % 60} мин`;
};
