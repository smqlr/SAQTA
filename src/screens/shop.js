// Экран «Магазин»: «Обратный рейс» — заказ крупной техники (выбирается один товар) с галочкой
// «вывезти старую технику» и приложение экипажа.
import { PILOT, SHOP_ITEMS } from '../data.js';
import { getState, placeOrder, crewPickup } from '../store.js';
import { ART } from '../lib/art.js';
import { ICON } from '../lib/icons.js';
import { num, tenge, dateTime, esc } from '../lib/format.js';
import { toast } from '../lib/ui.js';

const fresh = () => ({ mode: 'buyer', itemId: SHOP_ITEMS[0].id, pickupOld: true, placed: null });
let ui = fresh();
export function home() { ui = fresh(); }

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
}

function buyer() {
  if (ui.placed) {
    const o = getState().shop.orders.find((x) => x.id === ui.placed);
    return `<div class="card receipt">
      <div class="done-line">${ICON.check}Заказ оформлен</div>
      <h2>Заказ №${o.no}</h2>
      <div class="kv">
        <div><span>Товар</span><b>${esc(o.item)}</b></div>
        <div><span>Доставка</span><b>на дом</b></div>
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
  <button class="btn primary lg block mt-16" data-order>Оформить: ${esc(lower(sel.name))}</button>`;
}

function crew(st) {
  const orders = [...st.shop.orders].reverse();
  return `<div class="crew">
    <div class="crew-head"><div><b>Задания экипажа</b><div class="xs muted">${tenge(PILOT.crewPremium)} за каждую вынесенную единицу</div></div><div class="center"><div class="xs muted">Премии</div><b class="num">${tenge(st.shop.crewEarned)}</b></div></div>
    <div class="stack mt-12">${orders.length ? orders.map((o) => `<div class="card">
      <div class="row between"><b>№${o.no} · ${esc(lower(o.item))}</b><span class="xs muted">${dateTime(o.ts)}</span></div>
      ${o.pickupOld
        ? o.crewDone
          ? `<div class="done-line mt-8">${ICON.check}Старая техника забрана · +${tenge(PILOT.crewPremium)}</div><p class="xs muted mt-8">Панель акимата: +${num(o.kg)} кг${o.rop != null ? ` · РОП ≈ ${tenge(o.rop)}` : ''}</p>`
          : `<p class="small mt-8">Доставить новую технику и <b>забрать старую: +${tenge(PILOT.crewPremium)}</b></p><button class="btn primary block mt-12" data-pick="${o.id}">${ICON.truck} Старую забрали</button>`
        : '<p class="small muted mt-8">Только доставка: покупатель отказался от вывоза.</p>'}
    </div>`).join('') : '<div class="card"><p class="small muted">Заданий нет. Оформите заказ в режиме «Покупатель».</p></div>'}</div>
  </div>`;
}

function bind(el) {
  el.onclick = (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.mode) { ui.mode = b.dataset.mode; return render(el, getState()); }
    if (b.dataset.item) { ui.itemId = b.dataset.item; return render(el, getState()); } // выбран ровно один товар
    if ('order' in b.dataset) {
      const o = placeOrder(ui.itemId, ui.pickupOld);
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
