// Экран «Магазин»: заказ холодильника с галочкой «вывезти старую технику» и приложение экипажа.
import { PILOT, WEIGHT_KG } from '../data.js';
import { getState, placeOrder, crewPickup, fridgeRopTenge } from '../store.js';
import { ART } from '../lib/art.js';
import { ICON } from '../lib/icons.js';
import { num, tenge, dateTime } from '../lib/format.js';
import { toast } from '../lib/ui.js';

let ui = { mode: 'buyer', pickupOld: true, placed: null };
export function home() { ui = { mode: 'buyer', pickupOld: true, placed: null }; }

export function render(el, st) {
  el.innerHTML = `<div class="phone-col">
    <div class="screen-head"><div><h1>Магазин</h1><p class="muted">«Обратный рейс»: привезли новое — забрали старое</p></div><span class="note-demo">макет</span></div>
    <div class="seg" role="group" aria-label="Режим">
      <button data-mode="buyer" aria-pressed="${ui.mode === 'buyer'}">Покупатель</button>
      <button data-mode="crew" aria-pressed="${ui.mode === 'crew'}">Экипаж доставки</button>
    </div>
    <div class="mt-16">${ui.mode === 'buyer' ? buyer(st) : crew(st)}</div>
  </div>`;
  bind(el);
}

function buyer() {
  if (ui.placed) {
    const o = getState().shop.orders.find((x) => x.id === ui.placed);
    return `<div class="card receipt">
      <div class="mini-ico" style="width:56px;height:56px">${ICON.check}</div>
      <h2>Заказ №${o.no} оформлен</h2>
      <p class="muted small">${o.pickupOld ? 'Экипаж привезёт новый холодильник и бесплатно вынесет старый.' : 'Доставка без вывоза старой техники.'}</p>
      ${o.pickupOld ? `<p class="small">Старая техника поедет на склад магазина, оттуда лицензированный партнёр заберёт партию, откачает фреон и выдаст акт с весом. Если старая техника работает, её проверят и отдадут семье через акимат.</p>` : ''}
      <div class="row" style="width:100%"><button class="btn ghost grow" data-new>Новый заказ</button><button class="btn primary grow" data-mode="crew">Открыть экипаж</button></div>
    </div>`;
  }
  return `<div class="card">
    <div class="row" style="align-items:flex-start;gap:14px"><div style="width:84px;flex:none">${ART.fridge('Холодильник')}</div>
      <div class="grow"><h2>Холодильник</h2><p class="small muted mt-8">Магазин-партнёр · доставка на дом</p></div></div>
  </div>
  <label class="check mt-12">
    <input type="checkbox" id="pickupOld" ${ui.pickupOld ? 'checked' : ''}>
    <span><b>Вывезти старую технику</b><br><span class="small muted">Бесплатно. Галочка стоит по умолчанию — снять её может только сам покупатель.</span></span>
  </label>
  <button class="btn primary block mt-16" data-order>Оформить заказ</button>`;
}

function crew(st) {
  const orders = [...st.shop.orders].reverse();
  return `<div class="crew">
    <div class="row between"><b>Приложение экипажа</b><span class="small">Премии: <b class="num">${tenge(st.shop.crewEarned)}</b></span></div>
    <p class="xs muted mt-8">${tenge(PILOT.crewPremium)} за каждую вынесенную единицу старой техники</p>
    <div class="stack mt-12">${orders.length ? orders.map((o) => `<div class="card">
      <div class="row between"><b>Заказ №${o.no}: ${o.item.toLowerCase()}</b><span class="xs muted">${dateTime(o.ts)}</span></div>
      ${o.pickupOld
        ? o.crewDone
          ? `<p class="small mt-8">${ICON_OK} Старый забран · +${tenge(PILOT.crewPremium)}</p><p class="xs muted">На панели акимата +${num(WEIGHT_KG.demoFridge)} кг · РОП ≈ ${tenge(fridgeRopTenge())}</p>`
          : `<p class="small mt-8">Доставить новый, <b>забрать старый, +${tenge(PILOT.crewPremium)}</b></p><button class="btn primary block mt-12" data-pick="${o.id}">${ICON.truck} Забрал старый</button>`
        : '<p class="small muted mt-8">Доставка без вывоза: покупатель снял галочку</p>'}
    </div>`).join('') : '<div class="card"><p class="small muted">Заданий нет. Оформите заказ в режиме «Покупатель».</p></div>'}</div>
  </div>`;
}
const ICON_OK = '✓';

function bind(el) {
  el.onclick = (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.mode) { ui.mode = b.dataset.mode; return render(el, getState()); }
    if ('order' in b.dataset) {
      const o = placeOrder(ui.pickupOld);
      ui.placed = o.id;
      return render(el, getState());
    }
    if ('new' in b.dataset) { ui.placed = null; ui.pickupOld = true; return render(el, getState()); }
    if (b.dataset.pick) { crewPickup(b.dataset.pick); toast(`Старый холодильник забран: +${num(WEIGHT_KG.demoFridge)} кг на панели акимата`); }
  };
  el.onchange = (e) => { if (e.target.id === 'pickupOld') ui.pickupOld = e.target.checked; };
}
