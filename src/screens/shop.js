// Экран «Магазин»: «Обратный рейс» — заказ крупной техники (выбирается один товар) с галочкой
// «вывезти старую технику», адрес доставки и приложение экипажа с маршрутом по улицам Актобе.
import { PILOT, SHOP_ITEMS } from '../data.js';
import { getState, placeOrder, crewPickup } from '../store.js';
import { STORE } from '../geo/points.js';
import { ART } from '../lib/art.js';
import { ICON } from '../lib/icons.js';
import { num, tenge, dateTime, esc } from '../lib/format.js';
import { toast } from '../lib/ui.js';
import { addressField, bindAddress } from '../lib/addr-ui.js';
import { reverse } from '../lib/map/address.js';
import { route, fmtKm, fmtMin } from '../lib/map/route.js';
import { mountMap, setPins, setLine, fitTo, panTo } from '../lib/map/view.js';

const fresh = () => ({ mode: 'buyer', itemId: SHOP_ITEMS[0].id, pickupOld: true, placed: null, dest: { q: null, addr: null }, fitted: '' });
let ui = fresh();
export function home() { ui = fresh(); }
const routes = new Map(); // маршруты экипажа по заказам: склад → покупатель → склад

const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);

export function render(el, st) {
  el.innerHTML = `<div class="phone-col">
    <div class="screen-head"><h1>Магазин</h1><p>«Обратный рейс»: привезли новое, забрали старое</p></div>
    <div class="seg block" role="group" aria-label="Режим">
      <button data-mode="buyer" aria-pressed="${ui.mode === 'buyer'}">Покупатель</button>
      <button data-mode="crew" aria-pressed="${ui.mode === 'crew'}">Экипаж доставки</button>
    </div>
    <div class="mt-16">${ui.mode === 'buyer' ? buyer(st) : crew(st)}</div>
  </div>`;
  bind(el);
  if (ui.mode === 'buyer' && !ui.placed) attachBuyerMap(el);
  if (ui.mode === 'crew') attachCrewMap(el, st);
}

function buyer() {
  if (ui.placed) {
    const o = getState().shop.orders.find((x) => x.id === ui.placed);
    return `<div class="card receipt">
      <div class="done-line">${ICON.check}Заказ оформлен</div>
      <h2>Заказ №${o.no}</h2>
      <div class="kv">
        <div><span>Товар</span><b>${esc(o.item)}</b></div>
        <div><span>Адрес доставки</span><b>${esc(o.address || '—')}</b></div>
        <div><span>Вывоз старой техники</span><b>${o.pickupOld ? 'бесплатно' : 'не нужен'}</b></div>
      </div>
      ${o.pickupOld ? '<p class="small muted" style="text-align:left">Экипаж привезёт новую технику и вынесет старую. Её заберёт лицензированный партнёр: откачает фреон и выдаст акт с весом. Если техника работает, её проверят и передадут семье через акимат.</p>' : ''}
      <div class="row" style="width:100%"><button class="btn ghost grow" data-new>Новый заказ</button><button class="btn primary grow" data-mode="crew">Экипаж</button></div>
    </div>`;
  }
  const sel = SHOP_ITEMS.find((i) => i.id === ui.itemId);
  return `
  <div class="section-label">Магазин-партнёр · доставка на дом</div>
  <div class="shop-grid" role="radiogroup" aria-label="Товар">
    ${SHOP_ITEMS.map((i) => `<button class="shop-item" role="radio" aria-checked="${i.id === ui.itemId}" data-item="${i.id}">
      <span class="pick" aria-hidden="true">${ICON.check}</span>
      ${ART[i.art](i.name)}<b>${esc(i.name)}</b><span class="xs muted">вывоз старой бесплатно</span></button>`).join('')}
  </div>
  <label class="check mt-16">
    <input type="checkbox" id="pickupOld" ${ui.pickupOld ? 'checked' : ''}>
    <span><b>Вывезти старую технику</b><br><span class="small muted">Бесплатно. Отметка стоит по умолчанию, снять её может только покупатель.</span></span>
  </label>
  <div class="section-label mt-24">Куда доставить</div>
  ${addressField('dAddr', ui.dest, { label: 'Адрес доставки' })}
  <div class="map-card mt-8" style="height:220px"><div class="map-slot" data-map></div></div>
  <p class="error mt-12" id="destErr" hidden>Укажите адрес доставки</p>
  <button class="btn primary lg block mt-16" data-order>Оформить: ${esc(lower(sel.name))}</button>`;
}

function attachBuyerMap(el) {
  const slot = el.querySelector('[data-map]');
  if (!slot) return;
  const setAddr = (a) => { ui.dest.addr = a; ui.dest.q = null; render(el, getState()); };
  const m = mountMap(slot, 'shop-buyer', { zoom: 12, onMapClick: (p) => setAddr(reverse(p.lat, p.lon)), onLocate: (p) => p && !p.outside && setAddr(reverse(p.lat, p.lon)) });
  const a = ui.dest.addr;
  setPins(m, 'dest', a ? [{ id: 'dest', kind: 'home', name: a.label, lat: a.lat, lon: a.lon }] : [], { selectedId: 'dest' });
  const view = a ? `${a.lat},${a.lon}` : 'none';
  if (ui.fitted !== view) { ui.fitted = view; if (a) panTo(m, a, 16); else fitTo(m, [STORE], { maxZoom: 12 }); }
  bindAddress(el, 'dAddr', ui.dest, setAddr);
}

function crewRoute(o) {
  if (!o.lat) return null;
  if (!routes.has(o.id)) {
    const go = route(STORE, o);
    const back = route(o, STORE);
    routes.set(o.id, go && back ? { latlngs: [...go.latlngs, ...back.latlngs], go, back } : null);
  }
  return routes.get(o.id);
}

function crew(st) {
  const orders = [...st.shop.orders].reverse();
  const active = orders.find((o) => o.pickupOld && !o.crewDone && o.lat != null);
  const r = active ? crewRoute(active) : null;
  return `<div class="crew">
    <div class="crew-head"><div><b>Задания экипажа</b><div class="xs muted">${tenge(PILOT.crewPremium)} за каждую вынесенную единицу</div></div><div class="center"><div class="xs muted">Премии</div><b class="num">${tenge(st.shop.crewEarned)}</b></div></div>
    ${active ? `<div class="section-label mt-24">Текущий рейс · №${active.no}</div>
    <div class="map-card" style="height:260px"><div class="map-slot" data-map></div></div>
    ${r ? `<div class="card mt-8"><div class="kv">
      <div><span>Склад → ${esc(active.address)}</span><b>${fmtKm(r.go.meters)} · ${fmtMin(r.go.seconds)}</b></div>
      <div><span>Обратно на склад со старой техникой</span><b>${fmtKm(r.back.meters)} · ${fmtMin(r.back.seconds)}</b></div>
      <div><span>Весь рейс</span><b data-testid="crew-route">${fmtKm(r.go.meters + r.back.meters)}</b></div>
    </div></div>` : '<p class="footnote">Маршрут не построен: адрес вне дорожной сети.</p>'}` : ''}
    <div class="stack mt-12">${orders.length ? orders.map((o) => `<div class="card">
      <div class="row between"><b>№${o.no} · ${esc(lower(o.item))}</b><span class="xs muted">${dateTime(o.ts)}</span></div>
      ${o.address ? `<div class="xs muted mt-8">${ICON.pin} ${esc(o.address)}</div>` : ''}
      ${o.pickupOld
        ? o.crewDone
          ? `<div class="done-line mt-8">${ICON.check}Старая техника забрана · +${tenge(PILOT.crewPremium)}</div><p class="xs muted mt-8">Панель акимата: +${num(o.kg)} кг${o.rop != null ? ` · РОП ≈ ${tenge(o.rop)}` : ''}</p>`
          : `<p class="small mt-8">Доставить новую технику и <b>забрать старую: +${tenge(PILOT.crewPremium)}</b></p><button class="btn primary block mt-12" data-pick="${o.id}">${ICON.truck} Старую забрали</button>`
        : '<p class="small muted mt-8">Только доставка: покупатель отказался от вывоза.</p>'}
    </div>`).join('') : '<div class="card"><p class="small muted">Заданий нет. Оформите заказ в режиме «Покупатель».</p></div>'}</div>
  </div>`;
}

function attachCrewMap(el, st) {
  const slot = el.querySelector('[data-map]');
  if (!slot) return;
  const active = [...st.shop.orders].reverse().find((o) => o.pickupOld && !o.crewDone && o.lat != null);
  const m = mountMap(slot, 'crew', { zoom: 12 });
  setPins(m, 'stops', [{ id: 'store', ...STORE }, { id: 'dest', kind: 'home', name: active.address, lat: active.lat, lon: active.lon }], { selectedId: 'dest' });
  const r = crewRoute(active);
  setLine(m, 'route', r?.latlngs, { color: '#ff9500' });
  if (ui.fitted !== `crew:${active.id}`) { ui.fitted = `crew:${active.id}`; fitTo(m, [STORE, active], { maxZoom: 15, padding: 30 }); }
}

function bind(el) {
  el.onclick = (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.mode) { ui.mode = b.dataset.mode; ui.fitted = ''; return render(el, getState()); }
    if (b.dataset.item) { ui.itemId = b.dataset.item; return render(el, getState()); } // выбран ровно один товар
    if ('order' in b.dataset) {
      if (!ui.dest.addr) { el.querySelector('#destErr').hidden = false; el.querySelector('#dAddr')?.focus(); return; }
      const o = placeOrder(ui.itemId, ui.pickupOld, ui.dest.addr);
      ui.placed = o.id;
      return render(el, getState());
    }
    if ('new' in b.dataset) { const m = ui.mode; ui = fresh(); ui.mode = m; return render(el, getState()); }
    if (b.dataset.pick) {
      const o = getState().shop.orders.find((x) => x.id === b.dataset.pick);
      crewPickup(b.dataset.pick);
      toast(`Старая техника забрана: +${num(o.kg)} кг на панели акимата`);
    }
  };
  el.onchange = (e) => { if (e.target.id === 'pickupOld') ui.pickupOld = e.target.checked; };
}
