// Подложка карты: рисуем улицы, дома, воду и зелень Актобе на canvas-плитках Leaflet из встроенных данных OSM.
// Интернет не нужен: плитки строятся в браузере, на любом масштабе с 10 по 19.
import L from 'leaflet';
import { geo } from './geo.js';

const C = {
  land: '#f3f2ee',
  poly: { 1: '#a8d1f0', 2: '#cde8c0', 3: '#c2dfb2', 4: '#dcedd1', 5: '#dbe4d3', 6: '#cce7c3', 7: '#eae7ec', 8: '#e6d9c3' },
  landfillStroke: '#cdb68c',
  water: '#a8d1f0',
  building: '#e3dfd7',
  buildingStroke: '#d4cfc5',
  casing: { 1: '#dfb15e', 2: '#dfc986', 3: '#d2cfc8', 4: '#d2cfc8', 5: '#d8d5ce', 6: '#dbd8d1', 8: '#d5cbb4' },
  fill: { 1: '#ffd37e', 2: '#fff0bd', 3: '#ffffff', 4: '#ffffff', 5: '#ffffff', 6: '#ffffff', 8: '#efe7d5' },
  path: '#bdbab2',
  rail: '#b3b0a9',
  label: '#45474c',
  waterLabel: '#3f7fb0',
  halo: 'rgba(255,255,255,.94)',
};
// Ширина линии по масштабу: индекс 0 — зум 10, индекс 9 — зум 19
const W = {
  1: [1.6, 2, 2.6, 3.4, 4.6, 6.4, 9, 13, 18, 24],
  2: [1.2, 1.6, 2.2, 3, 4.2, 6, 8.5, 12, 17, 22],
  3: [0.8, 1.1, 1.6, 2.4, 3.6, 5.2, 7.5, 11, 15, 20],
  4: [0.5, 0.8, 1.2, 2, 3.2, 4.6, 6.8, 10, 14, 18],
  5: [0, 0.3, 0.55, 1, 1.8, 3, 4.8, 7.5, 11, 15],
  6: [0, 0, 0, 0.4, 0.8, 1.5, 2.6, 4.2, 6.5, 9],
  7: [0, 0, 0, 0, 0.6, 0.8, 1.1, 1.4, 1.8, 2.2],
  8: [0, 0, 0, 0.35, 0.6, 0.9, 1.4, 2, 2.8, 3.6],
};
const RIVER = { 1: [1.4, 1.8, 2.4, 3, 4, 5, 7, 9, 12, 15], 2: [0.8, 1, 1.4, 1.8, 2.4, 3, 4, 5, 6, 7], 3: [0, 0.4, 0.6, 0.8, 1.1, 1.4, 1.8, 2.2, 2.6, 3] };
const zi = (z) => Math.max(0, Math.min(9, z - 10));
const LABEL_MIN_ZOOM = { 1: 13, 2: 13, 3: 14, 4: 14, 5: 15, 6: 16, 8: 17 };

// Сокращения в подписях, как на картах: «улица Тургенева» → «ул. Тургенева»
const SHORT = [[/^улица /i, 'ул. '], [/^проспект /i, 'пр. '], [/^переулок /i, 'пер. '], [/^бульвар /i, 'б-р '], [/^тупик /i, 'туп. '], [/^микрорайон /i, 'мкр '], [/^шоссе /i, 'ш. ']];
const shortName = (s) => { for (const [re, t] of SHORT) if (re.test(s)) return s.replace(re, t); return s; };

const widths = new Map();
function measure(ctx, text) {
  const key = `${ctx.font}|${text}`;
  if (!widths.has(key)) widths.set(key, ctx.measureText(text).width);
  return widths.get(key);
}

export function drawTile(ctx, tx, ty, z) {
  const g = geo();
  const S = 256 * 2 ** z;
  const ox = tx * 256;
  const oy = ty * 256;
  const pad = 48 / S;
  const x0 = ox / S - pad, x1 = (ox + 256) / S + pad, y0 = oy / S - pad, y1 = (oy + 256) / S + pad;
  const i = zi(z);
  const NX = g.nodes.x;
  const NY = g.nodes.y;
  const pts = (arr, close) => {
    ctx.moveTo(arr[0] * S - ox, arr[1] * S - oy);
    for (let k = 2; k < arr.length; k += 2) ctx.lineTo(arr[k] * S - ox, arr[k + 1] * S - oy);
    if (close) ctx.closePath();
  };
  const road = (r) => {
    const idx = r.idx;
    ctx.moveTo(NX[idx[0]] * S - ox, NY[idx[0]] * S - oy);
    for (let k = 1; k < idx.length; k++) ctx.lineTo(NX[idx[k]] * S - ox, NY[idx[k]] * S - oy);
  };

  ctx.fillStyle = C.land;
  ctx.fillRect(0, 0, 256, 256);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Площади: промзоны, зелень, полигон ТБО, вода
  const polys = g.q.polys(x0, y0, x1, y1).map((id) => g.polys[id]);
  for (const kind of [7, 4, 5, 6, 2, 3, 8, 1]) {
    const list = polys.filter((p) => p.kind === kind);
    if (!list.length) continue;
    ctx.beginPath();
    for (const p of list) for (const r of p.rings) pts(r, true);
    ctx.fillStyle = C.poly[kind];
    ctx.fill('nonzero');
    if (kind === 8 && z >= 13) { ctx.strokeStyle = C.landfillStroke; ctx.lineWidth = 1; ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([]); }
  }

  // Реки и каналы
  const lines = g.q.lines(x0, y0, x1, y1).map((id) => g.lines[id]);
  for (const kind of [3, 2, 1]) {
    const w = RIVER[kind][i];
    if (!w) continue;
    ctx.beginPath();
    for (const l of lines) if (l.kind === kind) pts(l.pts);
    ctx.strokeStyle = C.water;
    ctx.lineWidth = w;
    ctx.stroke();
  }

  // Здания
  if (z >= 14) {
    const ids = g.q.buildings(x0, y0, x1, y1);
    ctx.beginPath();
    for (const id of ids) pts(g.buildings[id].pts, true);
    ctx.globalAlpha = z === 14 ? 0.55 : 1;
    ctx.fillStyle = C.building;
    ctx.fill();
    if (z >= 16) { ctx.strokeStyle = C.buildingStroke; ctx.lineWidth = 0.8; ctx.stroke(); }
    ctx.globalAlpha = 1;
  }

  // Железная дорога
  if (z >= 11) {
    ctx.beginPath();
    for (const l of lines) if (l.kind === 10 || (l.kind === 11 && z >= 14)) pts(l.pts);
    ctx.strokeStyle = C.rail;
    ctx.lineWidth = z >= 15 ? 2.6 : z >= 13 ? 1.8 : 1.2;
    ctx.stroke();
    if (z >= 14) { ctx.strokeStyle = '#ffffff'; ctx.lineWidth = z >= 15 ? 1.2 : 0.8; ctx.setLineDash([6, 6]); ctx.stroke(); ctx.setLineDash([]); }
  }

  // Дороги: сначала обводки, затем заливка — от второстепенных к главным
  const byClass = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [] };
  for (const id of g.q.roads(x0, y0, x1, y1)) { const r = g.roads[id]; if (W[r.cls][i]) byClass[r.cls].push(r); }
  if (byClass[7].length) {
    ctx.beginPath();
    for (const r of byClass[7]) road(r);
    ctx.strokeStyle = C.path;
    ctx.lineWidth = W[7][i];
    if (z >= 16) ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  const order = [8, 6, 5, 4, 3, 2, 1];
  const casingW = (cls) => W[cls][i] + (z >= 15 ? 2 : 1.4);
  for (const cls of order) {
    if (!byClass[cls].length || W[cls][i] < 1.8) continue;
    ctx.beginPath();
    for (const r of byClass[cls]) road(r);
    ctx.strokeStyle = C.casing[cls];
    ctx.lineWidth = casingW(cls);
    ctx.stroke();
  }
  for (const cls of order) {
    if (!byClass[cls].length) continue;
    ctx.beginPath();
    for (const r of byClass[cls]) road(r);
    ctx.strokeStyle = W[cls][i] < 1.8 ? C.casing[cls] : C.fill[cls];
    ctx.lineWidth = W[cls][i];
    ctx.stroke();
  }

  // Подписи улиц и рек вдоль линий; подпись целиком внутри плитки, без наложений
  const placed = [];
  const done = new Set();
  const label = (name, segs, font, color, minLen = 0) => {
    if (!name || done.has(name)) return;
    ctx.font = font;
    const text = shortName(name);
    const tw = measure(ctx, text);
    let best = null;
    let bestLen = Math.max(tw + 10, minLen);
    for (const s of segs) {
      const len = Math.hypot(s[2] - s[0], s[3] - s[1]);
      if (len > bestLen) { bestLen = len; best = s; }
    }
    if (!best) return;
    let ang = Math.atan2(best[3] - best[1], best[2] - best[0]);
    if (ang > Math.PI / 2) ang -= Math.PI;
    else if (ang < -Math.PI / 2) ang += Math.PI;
    const mx = (best[0] + best[2]) / 2;
    const my = (best[1] + best[3]) / 2;
    const c = Math.abs(Math.cos(ang)), s = Math.abs(Math.sin(ang));
    const hw = tw / 2 + 3, hh = 7;
    const ex = hw * c + hh * s, ey = hw * s + hh * c;
    const box = [mx - ex, my - ey, mx + ex, my + ey];
    if (box[0] < 1 || box[1] < 1 || box[2] > 255 || box[3] > 255) return;
    if (placed.some((p) => box[0] < p[2] && box[2] > p[0] && box[1] < p[3] && box[3] > p[1])) return;
    placed.push(box);
    done.add(name);
    ctx.save();
    ctx.translate(mx, my);
    ctx.rotate(ang);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 3;
    ctx.strokeStyle = C.halo;
    ctx.strokeText(text, 0, 0.5);
    ctx.fillStyle = color;
    ctx.fillText(text, 0, 0.5);
    ctx.restore();
  };
  const inside = (x, y) => x > 3 && x < 253 && y > 3 && y < 253;
  // Почти прямые куски линии внутри плитки: соседние отрезки сливаются, пока поворот меньше 12°
  const runs = (xy) => {
    const out = [];
    let start = -1;
    let dir = 0;
    const flush = (end) => { if (start >= 0 && end > start) out.push([xy[2 * start], xy[2 * start + 1], xy[2 * end], xy[2 * end + 1]]); };
    for (let k = 1; k < xy.length / 2; k++) {
      const ax = xy[2 * k - 2], ay = xy[2 * k - 1], bx = xy[2 * k], by = xy[2 * k + 1];
      if (!inside(ax, ay) || !inside(bx, by)) { flush(k - 1); start = -1; continue; }
      const a = Math.atan2(by - ay, bx - ax);
      if (start < 0) { start = k - 1; dir = a; continue; }
      let turn = Math.abs(a - dir);
      if (turn > Math.PI) turn = 2 * Math.PI - turn;
      if (turn > 0.21) { flush(k - 1); start = k - 1; }
      dir = a;
    }
    flush(xy.length / 2 - 1);
    return out;
  };
  const family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
  const chains = g.q.chains(x0, y0, x1, y1).map((id) => g.chains[id]).sort((a, b) => a.cls - b.cls);
  for (const ch of chains) {
    if (z < LABEL_MIN_ZOOM[ch.cls]) continue;
    const font = `${ch.cls <= 3 ? 600 : 500} ${z >= 17 ? 12.5 : 11.5}px ${family}`;
    const xy = [];
    for (let k = 0; k < ch.idx.length; k++) xy.push(NX[ch.idx[k]] * S - ox, NY[ch.idx[k]] * S - oy);
    label(ch.name, runs(xy), font, C.label);
  }
  if (z >= 13) {
    for (const l of lines) {
      if (l.kind !== 1 || !l.name) continue;
      const xy = [];
      for (let k = 0; k < l.pts.length; k += 2) xy.push(l.pts[k] * S - ox, l.pts[k + 1] * S - oy);
      label(l.name, runs(xy), `italic 500 12px ${family}`, C.waterLabel);
    }
  }
}

export const Basemap = L.GridLayer.extend({
  options: { tileSize: 256, minZoom: 10, maxZoom: 19, keepBuffer: 4, updateWhenZooming: false, className: 'qmap-base' },
  createTile(c) {
    const tile = document.createElement('canvas');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    tile.width = 256 * dpr;
    tile.height = 256 * dpr;
    const ctx = tile.getContext('2d');
    ctx.scale(dpr, dpr);
    drawTile(ctx, c.x, c.y, c.z);
    return tile;
  },
});
