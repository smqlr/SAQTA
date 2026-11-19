// Вкладка «Карта»: все пункты приёма Актобе, фильтр по типу, что принимает каждый пункт, «Сдать сюда» и маршрут.
import { SCHOOL_LEAGUE, CITY_CENTER, BONUS } from '../data.js';
import { LEAGUE, BOXES, HUB } from '../geo/points.js';
import { mountMap, setPins, setMe, panTo, fitTo, byDistance, fmtDist } from '../lib/map/view.js';
import { preferPoint } from './resident.js';
import { ICON } from '../lib/icons.js';
import { esc } from '../lib/format.js';
import { toast } from '../lib/ui.js';

const HUB_PT = { ...HUB, id: 'hub' };
const FILTERS = [
  { id: 'all', label: 'Все' },
  { id: 'school', label: `Школы · ${LEAGUE.length}` },
  { id: 'box', label: `ЦОН и вузы · ${BOXES.length}` },
  { id: 'hub', label: 'Хаб' },
];
const ACCEPTS = {
  school: { yes: ['Телефоны и планшеты', 'Зарядки и кабели', 'Наушники, часы', 'Батарейки — в отдельный контейнер'], no: 'Крупную технику не приносить' },
  box: { yes: ['Телефоны и ноутбуки', 'Планшеты', 'Мелкая бытовая техника', 'Батарейки и аккумуляторы'], no: 'Крупную технику не приносить' },
  hub: { yes: ['Любая малая техника', 'Вздутые батареи — в шкаф с песком', 'Списанная техника организаций'], no: 'Холодильники — только через вывоз' },
};
const KIND = { school: 'Школа Донор-лиги', con: 'Бокс в ЦОН', university: 'Бокс в вузе', hub: 'Хаб QAITA: мастер на месте' };
const group = (p) => (p.kind === 'school' ? 'school' : p.kind === 'hub' ? 'hub' : 'box');
const methodOf = (p) => (p.kind === 'school' ? 'school' : 'box');

let filter = 'all';
let focus = null;
let me = null;
let fitted = '';
let showAll = false;

export function home() { focus = null; showAll = false; }
export function open(param) { if (param) { focus = param; filter = 'all'; fitted = ''; } }

const items = () => (filter === 'school' ? LEAGUE : filter === 'box' ? BOXES : filter === 'hub' ? [HUB_PT] : [...LEAGUE, ...BOXES, HUB_PT]);
const ref = () => me || CITY_CENTER;

export function render(el) {
  const list = byDistance(ref(), items());
  const sel = focus ? [...LEAGUE, ...BOXES, HUB_PT].find((p) => p.id === focus) : null;
  el.innerHTML = `<div class="phone-col">
    <div class="screen-head"><h1>Пункты приёма</h1><p>${SCHOOL_LEAGUE.schools} школ, ${SCHOOL_LEAGUE.boxes} боксов и хаб. Крупную технику заберём из дома.</p></div>
    <div class="seg pills" role="group" aria-label="Тип пункта">${FILTERS.map((f) => `<button data-f="${f.id}" aria-pressed="${filter === f.id}">${f.label}</button>`).join('')}</div>
    <div class="map-card full mt-12"><div class="map-slot" data-map></div></div>
    ${sel ? detail(sel) : `<p class="footnote">Нажми на точку на карте или в списке. Расстояния — ${me ? 'от тебя' : 'от центра города'}.</p>`}
    <a class="banner green mt-16" href="#resident/home"><span class="b-ico">${ICON.truck}</span><div><b>Холодильник, стиралка, плита?</b><span>Не неси их сам — вызови вывоз: бесплатно, +${BONUS.bigPickup} бонусов</span></div></a>
    <h2 class="h-sec">Ближе всего ${me ? 'к тебе' : 'к центру'}</h2>
    ${list.slice(0, showAll ? list.length : 6).map((p) => `<button class="pt-row" data-point="${p.id}" aria-pressed="${p.id === focus}">
      <span class="pt-ico" style="background:${p.kind === 'school' ? 'var(--brand)' : p.kind === 'hub' ? '#5e5ce6' : 'var(--blue)'}">${p.kind === 'school' ? ICON.school : p.kind === 'hub' ? ICON.hub : ICON.box}</span>
      <span class="grow"><b>${esc(p.name)}</b><span class="xs muted">${esc(p.address || KIND[p.kind] || '')}</span></span>
      <span class="dist">${fmtDist(p.dist)}</span></button>`).join('')}
    ${list.length > 6 ? `<button class="btn plain mt-8" data-more>${showAll ? 'Свернуть' : `Показать все: ${list.length}`}</button>` : ''}
    <p class="footnote">Карта: © участники OpenStreetMap. Хаб — условная точка до аренды помещения.</p>
  </div>`;
  attach(el);
  bind(el);
}

function detail(p) {
  const g = group(p);
  const acc = ACCEPTS[g];
  const url = `https://2gis.kz/aktobe/geo/${p.lon}%2C${p.lat}`;
  return `<div class="pt-detail" data-testid="point-detail">
    <div class="xs muted">${esc(KIND[p.kind] || '')}</div>
    <h2>${esc(p.name)}</h2>
    <div class="small muted">${esc(p.address || '')}${p.dist != null ? ` · ${fmtDist(p.dist)}` : ''}</div>
    <div class="acc">${acc.yes.map((x) => `<span>${esc(x)}</span>`).join('')}<span class="no">${esc(acc.no)}</span></div>
    <div class="row mt-12" style="gap:8px">
      ${g === 'hub' ? '' : `<button class="btn primary grow" data-give="${p.id}">${ICON.box} Сдать сюда</button>`}
      <a class="btn ${g === 'hub' ? 'primary grow' : ''}" href="${url}" target="_blank" rel="noopener">${ICON.route} Маршрут</a>
    </div>
  </div>`;
}

function attach(el) {
  const slot = el.querySelector('[data-map]');
  const m = mountMap(slot, 'points', {
    center: ref(),
    zoom: 12,
    onLocate: (pos) => {
      if (!pos) return toast('Не удалось определить, где ты. Расстояния — от центра города');
      if (pos.outside) return toast('Ты не в Актобе. Расстояния — от центра города');
      me = pos;
      fitted = '';
      render(el);
    },
  });
  setMe(m, me);
  // Главное на карте — пункты из списка «Ближе всего» (6 ближайших), хаб и выбранный; остальные — маленькие точки
  const shown = byDistance(ref(), items()).slice(0, showAll ? Infinity : 6);
  const focusIds = new Set([...shown.map((p) => p.id), HUB_PT.id]);
  setPins(m, 'points', items(), { selectedId: focus, focusIds, onClick: (p) => { focus = p.id; render(el); } });
  const view = `${filter}:${me ? 'me' : ''}`;
  if (fitted !== view) {
    fitted = view;
    const near = byDistance(ref(), items()).slice(0, filter === 'hub' ? 1 : 8);
    const f = focus && [...LEAGUE, ...BOXES, HUB_PT].find((p) => p.id === focus);
    if (f) panTo(m, f, 15);
    else fitTo(m, me ? [me, ...near] : near, { maxZoom: 15 });
  } else if (focus) {
    const f = [...LEAGUE, ...BOXES, HUB_PT].find((p) => p.id === focus);
    if (f) panTo(m, f);
  }
}

function bind(el) {
  el.onclick = (e) => {
    const f = e.target.closest('[data-f]');
    if (f) { filter = f.dataset.f; focus = null; showAll = false; return render(el); }
    const pt = e.target.closest('[data-point]');
    if (pt) { focus = pt.dataset.point; render(el); el.querySelector('[data-map]')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); return; }
    if (e.target.closest('[data-more]')) { showAll = !showAll; return render(el); }
    const g = e.target.closest('[data-give]');
    if (g) {
      const p = [...LEAGUE, ...BOXES].find((x) => x.id === g.dataset.give);
      preferPoint(p.id, methodOf(p));
      toast(`Пункт выбран: ${p.name}`);
      location.hash = 'resident';
    }
  };
}
