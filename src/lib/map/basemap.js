// Подложка карты: рисуем улицы, дома, воду и зелень Актобе на canvas-плитках Leaflet из встроенных данных OSM.
// Своя приглушённая палитра: подложка не спорит с метками, видно только главное.
// Интернет не нужен: плитки строятся в браузере, на любом масштабе с 10 по 19.
import L from 'leaflet';
import { geo } from './geo.js';

// Своя «тихая» палитра: подложка почти однотонная, чтобы в глаза бросались только метки, маршрут и «где я».
// Дороги без жёлтого, зелень и промзоны еле заметны, подписей мало. Две версии — под светлую и тёмную тему.
const LIGHT = {
  land: '#f4f4f1',
  poly: { 1: '#d3dfe8', 2: '#e4eadf', 3: '#e0e7db', 4: '#e8ede4', 5: '#e9ebe5', 6: '#e6ebe2', 7: '#efefec', 8: '#ece7dd' },
  landfillStroke: '#d4c9b5',
  water: '#ccdae4',
  building: '#e8e7e2',
  buildingStroke: '#dddcd6',
  casing: { 1: '#d6d6da', 2: '#d9d9dd', 3: '#dcdce0', 4: '#dfdfe2', 5: '#e2e2e4', 6: '#e5e5e7', 8: '#e1ded7' },
  fill: { 1: '#ffffff', 2: '#ffffff', 3: '#ffffff', 4: '#ffffff', 5: '#ffffff', 6: '#ffffff', 8: '#f2f0ea' },
  thin: { 1: '#d2d2d6', 2: '#d6d6d9', 3: '#d9d9dc', 4: '#dcdcdf', 5: '#e0e0e2', 6: '#e3e3e5', 8: '#dedad2' },
  path: '#dcdcd8',
  rail: '#cdcdd0',
  railDash: '#f4f4f1',
  label: '#8b8b90',
  labelMajor: '#6c6c71',
  waterLabel: '#7d98ab',
  halo: 'rgba(244,244,241,.95)',
  routeCasing: '#ffffff',
};
const DARK = {
  land: '#1a1a1c',
  poly: { 1: '#1b2630', 2: '#1c221d', 3: '#1b211c', 4: '#1d221e', 5: '#1e211f', 6: '#1d231f', 7: '#1d1d20', 8: '#23201c' },
  landfillStroke: '#4a4236',
  water: '#23313c',
  building: '#232326',
  buildingStroke: '#2b2b2f',
  casing: { 1: '#121214', 2: '#131315', 3: '#141416', 4: '#151517', 5: '#161618', 6: '#171719', 8: '#161614' },
  fill: { 1: '#3a3a3f', 2: '#36363b', 3: '#333337', 4: '#2f2f33', 5: '#2c2c30', 6: '#29292c', 8: '#29272a' },
  thin: { 1: '#38383d', 2: '#343439', 3: '#313135', 4: '#2e2e32', 5: '#2b2b2f', 6: '#28282b', 8: '#2a2826' },
  path: '#2a2a2d',
  rail: '#3a3a3e',
  railDash: '#1a1a1c',
  label: '#86868b',
  labelMajor: '#a3a3a8',
  waterLabel: '#6f8aa0',
  halo: 'rgba(26,26,28,.92)',
  routeCasing: '#1c1c1e',
};
// Палитра текущей темы: тема ставит data-theme="dark" на <html>
export const mapPalette = () => (document.documentElement.dataset.theme === 'dark' ? DARK : LIGHT);

// Ширина линии по масштабу: индекс 0 — зум 10, индекс 9 — зум 19.
// Дворовые проезды (6), тропинки (7) и грунтовки (8) появляются только при сильном приближении.
const W = {
  1: [1.6, 2, 2.6, 3.4, 4.6, 6.4, 9, 13, 18, 24],
  2: [1.2, 1.6, 2.2, 3, 4.2, 6, 8.5, 12, 17, 22],
  3: [0.8, 1.1, 1.6, 2.4, 3.6, 5.2, 7.5, 11, 15, 20],
  4: [0.5, 0.8, 1.2, 2, 3.2, 4.6, 6.8, 10, 14, 18],
  5: [0, 0.3, 0.55, 1, 1.8, 3, 4.8, 7.5, 11, 15],
  6: [0, 0, 0, 0, 0, 1.2, 2.2, 3.8, 6, 8.5],
  7: [0, 0, 0, 0, 0, 0, 0.8, 1.1, 1.5, 1.9],
  8: [0, 0, 0, 0, 0, 0.7, 1.1, 1.6, 2.2, 2.8],
};
const RIVER = { 1: [1.4, 1.8, 2.4, 3, 4, 5, 7, 9, 12, 15], 2: [0.8, 1, 1.4, 1.8, 2.4, 3, 4, 5, 6, 7], 3: [0, 0.4, 0.6, 0.8, 1.1, 1.4, 1.8, 2.2, 2.6, 3] };
const zi = (z) => Math.max(0, Math.min(9, z - 10));
// Подписей меньше, чем на обычной карте: главные улицы с 14-го масштаба, дворовые — с 17-го
const LABEL_MIN_ZOOM = { 1: 14, 2: 14, 3: 14, 4: 15, 5: 16, 6: 17, 8: 18 };

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
  const C = mapPalette();
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

  // Здания: только вблизи и блёкло — это фон, а не ориентир
  if (z >= 15) {
    const ids = g.q.buildings(x0, y0, x1, y1);
    ctx.beginPath();
    for (const id of ids) pts(g.buildings[id].pts, true);
    ctx.globalAlpha = z === 15 ? 0.6 : 1;
    ctx.fillStyle = C.building;
    ctx.fill();
    if (z >= 17) { ctx.strokeStyle = C.buildingStroke; ctx.lineWidth = 0.8; ctx.stroke(); }
    ctx.globalAlpha = 1;
  }

  // Железная дорога
  if (z >= 12) {
    ctx.beginPath();
    for (const l of lines) if (l.kind === 10 || (l.kind === 11 && z >= 15)) pts(l.pts);
    ctx.strokeStyle = C.rail;
    ctx.lineWidth = z >= 15 ? 2 : z >= 13 ? 1.4 : 1;
    ctx.stroke();
    if (z >= 15) { ctx.strokeStyle = C.railDash; ctx.lineWidth = 0.9; ctx.setLineDash([6, 6]); ctx.stroke(); ctx.setLineDash([]); }
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
    ctx.strokeStyle = W[cls][i] < 1.8 ? C.thin[cls] : C.fill[cls];
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
    const major = ch.cls <= 3;
    const font = `${major ? 600 : 500} ${z >= 17 ? 12 : 11}px ${family}`;
    const xy = [];
    for (let k = 0; k < ch.idx.length; k++) xy.push(NX[ch.idx[k]] * S - ox, NY[ch.idx[k]] * S - oy);
    label(ch.name, runs(xy), font, major ? C.labelMajor : C.label);
  }
  if (z >= 14) {
    for (const l of lines) {
      if (l.kind !== 1 || !l.name) continue;
      const xy = [];
      for (let k = 0; k < l.pts.length; k += 2) xy.push(l.pts[k] * S - ox, l.pts[k + 1] * S - oy);
      label(l.name, runs(xy), `italic 500 11.5px ${family}`, C.waterLabel);
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
