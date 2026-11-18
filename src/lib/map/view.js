// Карта в экранах: Leaflet + собственная подложка Актобе. Экземпляры карт живут между перерисовками экрана,
// поэтому масштаб и положение не сбрасываются, когда меняется состояние приложения.
import L from 'leaflet';
import { Basemap } from './basemap.js';
import { geo, distM } from './geo.js';
import { ICON } from '../icons.js';
import { esc } from '../format.js';

const maps = new Map();

const PIN = {
  school: { cls: 'p-school', glyph: ICON.school },
  con: { cls: 'p-box', glyph: ICON.box },
  university: { cls: 'p-box', glyph: ICON.box },
  hub: { cls: 'p-hub', glyph: ICON.hub },
  store: { cls: 'p-store', glyph: ICON.shop },
  townhall: { cls: 'p-gov', glyph: ICON.akimat },
  landfill: { cls: 'p-danger', glyph: ICON.bolt },
  pickup: { cls: 'p-pickup', glyph: ICON.truck },
  osi: { cls: 'p-osi', glyph: ICON.tag },
  reverse: { cls: 'p-store', glyph: ICON.truck },
  home: { cls: 'p-home', glyph: ICON.pin },
};

function pinIcon(it, selected) {
  const p = PIN[it.kind] || PIN.home;
  const badge = it.count ? `<b class="qpin-n">${it.count}</b>` : '';
  return L.divIcon({
    className: 'qpin-wrap',
    html: `<div class="qpin ${p.cls}${selected ? ' sel' : ''}" data-pin="${esc(it.id || '')}">${p.glyph}${badge}</div>`,
    iconSize: selected ? [38, 38] : [28, 28],
    iconAnchor: selected ? [19, 19] : [14, 14],
  });
}

// Подписи микрорайонов: отдельные элементы поверх плиток, чтобы не обрезались на краях
function addPlaceLabels(map) {
  const group = L.layerGroup().addTo(map);
  const marks = geo().places.map((p) => ({
    p,
    m: L.marker([p.lat, p.lon], {
      interactive: false,
      keyboard: false,
      icon: L.divIcon({ className: `qplace r${p.rank}`, html: `<span>${esc(p.name)}</span>`, iconSize: null }),
    }),
  }));
  const show = { 1: [11, 15], 2: [13, 16], 3: [14, 16] };
  marks.sort((a, b) => a.p.rank - b.p.rank || a.p.name.length - b.p.name.length);
  // Подписи не наезжают друг на друга: сначала крупные районы, остальные — если есть место
  const update = () => {
    const z = map.getZoom();
    const taken = [];
    for (const { p, m } of marks) {
      const [a, b] = show[p.rank] || [14, 16];
      let on = z >= a && z <= b;
      if (on) {
        const pt = map.project([p.lat, p.lon], z);
        const hw = (p.name.length * (p.rank === 1 ? 8.4 : 6.6)) / 2 + 6;
        const box = [pt.x - hw, pt.y - 10, pt.x + hw, pt.y + 10];
        if (taken.some((t) => box[0] < t[2] && box[2] > t[0] && box[1] < t[3] && box[3] > t[1])) on = false;
        else taken.push(box);
      }
      if (on && !group.hasLayer(m)) group.addLayer(m);
      if (!on && group.hasLayer(m)) group.removeLayer(m);
    }
  };
  map.on('zoomend', update);
  update();
}

const LocateControl = L.Control.extend({
  options: { position: 'topright' },
  onAdd() {
    const b = L.DomUtil.create('button', 'qmap-btn');
    b.type = 'button';
    b.title = 'Где я';
    b.setAttribute('aria-label', 'Показать, где я');
    b.innerHTML = ICON.locate;
    L.DomEvent.disableClickPropagation(b);
    L.DomEvent.on(b, 'click', () => this.options.onClick?.());
    return b;
  },
});

export function mountMap(slot, key, opts = {}) {
  let m = maps.get(key);
  if (m) {
    slot.appendChild(m.el);
    m.opts = opts;
    requestAnimationFrame(() => m.map.invalidateSize());
    return m;
  }
  const g = geo();
  const el = document.createElement('div');
  el.className = 'qmap';
  slot.appendChild(el);
  const pad = 0.03;
  const map = L.map(el, {
    zoomControl: false,
    minZoom: 11,
    maxZoom: 19,
    zoomSnap: 1,
    maxBounds: L.latLngBounds([g.bounds.south - pad, g.bounds.west - pad], [g.bounds.north + pad, g.bounds.east + pad]),
    maxBoundsViscosity: 0.9,
    worldCopyJump: false,
  });
  map.attributionControl.setPrefix(false);
  map.attributionControl.addAttribution(`© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> · ${g.date.split('-').reverse().join('.')}`);
  new Basemap().addTo(map);
  L.control.zoom({ position: 'topright', zoomInTitle: 'Приблизить', zoomOutTitle: 'Отдалить' }).addTo(map);
  addPlaceLabels(map);
  m = { key, el, map, layers: {}, opts, me: null };
  new LocateControl({ onClick: () => locate(m) }).addTo(map);
  map.on('click', (e) => m.opts.onMapClick?.({ lat: e.latlng.lat, lon: e.latlng.lng }));
  const c = opts.center || g.center;
  map.setView([c.lat, c.lon], opts.zoom || 12);
  maps.set(key, m);
  return m;
}

// Метки: items = [{ id, kind, name, lat, lon, count? }]
export function setPins(m, layer, items, { selectedId = null, onClick = null, tooltip = true } = {}) {
  m.layers[layer]?.remove();
  const group = L.layerGroup();
  for (const it of items) {
    const sel = it.id === selectedId;
    const mk = L.marker([it.lat, it.lon], { icon: pinIcon(it, sel), title: it.name, riseOnHover: true, zIndexOffset: sel ? 1000 : 0 });
    if (tooltip) mk.bindTooltip(`<b>${esc(it.name)}</b>${it.address ? `<br>${esc(it.address)}` : ''}`, { direction: 'top', offset: [0, -14], className: 'qtip' });
    if (onClick) mk.on('click', () => onClick(it));
    group.addLayer(mk);
  }
  group.addTo(m.map);
  m.layers[layer] = group;
  return group;
}

export function setArea(m, layer, latlngs, { color = '#d0281e', label = '' } = {}) {
  m.layers[layer]?.remove();
  if (!latlngs) return;
  const shape = L.circle(latlngs, { radius: label ? 600 : 300, color, weight: 1.5, fillOpacity: 0.08, dashArray: '4 4', interactive: false });
  m.layers[layer] = L.layerGroup([shape]).addTo(m.map);
}

export function setLine(m, layer, latlngs, { color = '#0a6cdf', weight = 5 } = {}) {
  m.layers[layer]?.remove();
  if (!latlngs?.length) return;
  const casing = L.polyline(latlngs, { color: '#ffffff', weight: weight + 4, opacity: 0.95, interactive: false, lineJoin: 'round' });
  const line = L.polyline(latlngs, { color, weight, opacity: 0.95, interactive: false, lineJoin: 'round' });
  m.layers[layer] = L.layerGroup([casing, line]).addTo(m.map);
}

export function fitTo(m, points, { maxZoom = 16, padding = 36 } = {}) {
  const ll = points.filter(Boolean).map((p) => [p.lat, p.lon]);
  if (!ll.length) return;
  if (ll.length === 1) { m.map.setView(ll[0], Math.min(maxZoom, 16), { animate: false }); return; }
  m.map.fitBounds(L.latLngBounds(ll), { padding: [padding, padding], maxZoom, animate: false });
}

export function panTo(m, p, zoom) {
  m.map.setView([p.lat, p.lon], zoom || Math.max(m.map.getZoom(), 15), { animate: true });
}

// Моё местоположение: только внутри Актобе, иначе — центр города
export function locate(m) {
  const done = (pos) => {
    m.opts.onLocate?.(pos);
  };
  if (!navigator.geolocation) { done(null); return; }
  navigator.geolocation.getCurrentPosition(
    (p) => {
      const pos = { lat: p.coords.latitude, lon: p.coords.longitude };
      if (!geo().inCity(pos.lat, pos.lon)) { done({ outside: true }); return; }
      setMe(m, pos);
      m.map.setView([pos.lat, pos.lon], 15);
      done(pos);
    },
    () => done(null),
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
  );
}

export function setMe(m, pos) {
  m.me?.remove();
  if (!pos) return;
  m.me = L.marker([pos.lat, pos.lon], { interactive: false, keyboard: false, zIndexOffset: 2000, icon: L.divIcon({ className: 'qme', iconSize: [18, 18], iconAnchor: [9, 9] }) }).addTo(m.map);
}

// Ближайшие точки к месту: сортировка по расстоянию
export function byDistance(from, items) {
  return items
    .map((it) => ({ ...it, dist: distM(from.lat, from.lon, it.lat, it.lon) }))
    .sort((a, b) => a.dist - b.dist);
}

export const fmtDist = (m) => (m < 1000 ? `${Math.round(m / 10) * 10} м` : `${(m / 1000).toFixed(1).replace('.', ',')} км`);
