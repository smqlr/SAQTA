// Экран «Сдать»: фото (ИИ узнаёт вещь) или каталог → карточка: что внутри живо и что будет с вещью →
// куда сдать (школа, бокс, вывоз) → QR-квитанция на карту донора.
import { EXAMPLES, CATEGORIES, DEVICE_TYPES, METHODS, BONUS, WALLET, TAGS, APP_NAME, DONOR_LINE, ECON, GENERIC_PARTS } from '../data.js';
import { LEAGUE, BOXES, pointsFor, pointById } from '../geo/points.js';
import { geo } from '../lib/map/geo.js';
import { mountMap, setPins, setMe, panTo, fitTo, byDistance, fmtDist } from '../lib/map/view.js';
import { reverse } from '../lib/map/address.js';
import { addressField, bindAddress } from '../lib/addr-ui.js';
import { getState, submitDonation, residentPickupDone, suggestTag, donationsThisMonth, selectHubItem } from '../store.js';
import { ART } from '../lib/art.js';
import { GROUPS } from '../lib/ai-map.js';
import { recognize } from '../lib/ai.js';
import { mascot } from '../lib/mascot.js';
import { getProfile, fmtCardId } from '../lib/donor.js';
import { ICON } from '../lib/icons.js';
import { qrSvg } from '../lib/qr.js';
import { num, esc, dateTime } from '../lib/format.js';
import { tagChip, demoMark, toast } from '../lib/ui.js';
import { openCert } from './wallet.js';

// Локальное состояние потока (не сохраняется: это шаги одного действия)
let cat = CATEGORIES[0].id; // выбранная подтема — переживает возврат на старт
const fresh = () => ({ step: 'start', exampleId: null, manual: null, photoUrl: null, ai: null, method: null, pointId: null, receiptId: null, tab: 'school', all: false, fitted: '', pick: { q: null, addr: null, day: 1, time: 0 } });
let me = null; // где житель (если разрешил геолокацию); иначе расстояния — от центра города
let prefer = null; // пункт, выбранный на вкладке «Карта» кнопкой «Сдать сюда»

// Окна вывоза крупной техники: ближайшие три дня, три интервала
const TIMES = ['10:00–13:00', '13:00–16:00', '16:00–19:00'];
const dayFmt = new Intl.DateTimeFormat('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' });
const dayLabel = (n) => dayFmt.format(new Date(Date.now() + n * 86400000)).replace('.', '');
const slotText = (p) => `${dayLabel(p.day)}, ${TIMES[p.time]}`;
let ui = fresh();
export function home() {
  if (ui.photoUrl) URL.revokeObjectURL(ui.photoUrl);
  ui = fresh();
}
// #resident/<подтема> — открыть каталог на подтеме (например, «Бытовая техника» для вывоза)
export function open(param) {
  if (CATEGORIES.some((c) => c.id === param)) { home(); cat = param; }
}
export function preferPoint(id, method) { prefer = { id, method }; home(); }

const CONDITIONS = [
  { id: 'works', label: 'Работает' },
  { id: 'dead', label: 'Не включается' },
  { id: 'broken', label: 'Разбит корпус или экран' },
  { id: 'swollen', label: 'Вздулась батарея' },
  { id: 'other', label: 'Другое' },
];

const STATUS = {
  sent: ['Едет в хаб', ''],
  checked: ['Проверено, бонусы начислены', 'ok'],
  sold: ['Детали нашли новых владельцев', 'ok'],
  'awaiting-pickup': ['Ждёт вывоза', ''],
  picked: ['Забрали, бонусы начислены', 'ok'],
};

function device() {
  if (ui.exampleId) return { ...EXAMPLES.find((e) => e.id === ui.exampleId), isExample: true };
  if (ui.manual) {
    const m = ui.manual;
    return { id: null, model: m.model, state: m.stateText, type: m.type, tag: suggestTag(m.type, m.condition), art: m.art || artFor(m.type), parts: [], isExample: false, ai: m.ai || null };
  }
  return null;
}
const artFor = (type) => ({ phone: 'phone', laptop: 'laptop', small: 'kettle', big: 'fridge', screen: 'monitor', cable: 'cables' })[type] || 'device';
const bonusFor = (type) => DEVICE_TYPES[type].bonus * (getState().tazaru ? BONUS.tazaruMultiplier : 1);

export function render(el, st) {
  const fn = { start, photo, manual, card, method, receipt }[ui.step] || start;
  el.innerHTML = `<div class="phone-col">${fn(st)}</div>`;
  bind(el);
  attachMap(el);
}

// ── Шаг 1: старт ────────────────────────────────────────────────────────────
function start(st) {
  const left = Math.max(0, WALLET.monthlyDeviceLimit - donationsThisMonth());
  const pp = prefer && pointById(prefer.id);
  return `
  <div class="screen-head"><h1>Сдать технику</h1><p>${DONOR_LINE}</p></div>
  ${pp ? `<div class="notice mt-8"><div class="ico">${ICON.pin}</div><div class="small grow"><b>Пункт выбран:</b> ${esc(pp.name)}<div class="xs muted">${esc(pp.address || '')}</div></div><button class="btn sm plain" data-unprefer>Сбросить</button></div>` : ''}
  <label class="cta primary" for="photoInput" style="display:grid;cursor:pointer;margin-top:12px">
    <span class="cta-ico">${ICON.camera}</span>
    <div><b>Сфотографировать вещь</b><span>ИИ узнает, что это, прямо в телефоне — даже без интернета</span></div>
  </label>
  <input id="photoInput" type="file" accept="image/*" capture="environment" class="sr-only">
  <h2 class="h-sec">Или выбери из каталога <button data-go="manual">Ввести вручную</button></h2>
  ${examplesGrid()}
  <p class="footnote">До ${WALLET.monthlyDeviceLimit} устройств в месяц на человека · осталось ${left}</p>
  ${myDonations(st)}`;
}

function examplesGrid() {
  const c = CATEGORIES.find((x) => x.id === cat);
  const items = EXAMPLES.filter((e) => e.cat === cat);
  return `<div class="cats" role="tablist" aria-label="Виды техники">${CATEGORIES.map(
    (x) => `<button class="cat" role="tab" data-cat="${x.id}" aria-selected="${x.id === cat}">${x.label}</button>`,
  ).join('')}</div>
  <p class="footnote" style="margin:8px 4px 10px">${esc(c.hint)}</p>
  <div class="examples" role="tabpanel" aria-label="${esc(c.label)}">${items.map((e) => {
    const b = bonusFor(e.type);
    return `<button class="ex" data-example="${e.id}" aria-label="${esc(e.model)}, ${esc(e.state)}"><div class="ph">${ART[e.art](e.model)}</div><b>${esc(e.model)}</b><span>${esc(e.state)}</span><span class="ex-bonus">${b ? `+${num(b)} бонусов` : 'без бонусов'}</span></button>`;
  }).join('')}</div>`;
}

function myDonations(st) {
  const list = [...st.donations].reverse();
  if (!list.length) return '';
  return `<h2 class="h-sec">Мои сдачи</h2>
  <div class="card"><div class="list">${list
    .map((d) => {
      const [label, kind] = STATUS[d.status] || [d.status, ''];
      return `<div class="li">
        <div class="ico ${d.type === 'big' ? 'orange' : ''}">${d.type === 'big' ? ICON.truck : ICON.box}</div>
        <div class="grow"><b>${esc(d.model)}</b> <span class="xs faint">${d.deviceNo}</span>
          <div class="xs muted">${d.type === 'big' && d.address ? `${esc(d.address)} · ${esc(d.slot || '')}` : `${d.point ? `${esc(d.point)} · ` : ''}${dateTime(d.ts)}`}</div>
          <span class="status-pill ${kind} mt-8">${label}</span>
          ${d.status === 'awaiting-pickup' ? `<div><button class="btn sm ghost mt-8" data-pickup="${d.id}">${ICON.truck} Скупка забрала</button></div>` : ''}
          ${d.certId ? `<div><button class="btn sm plain mt-8" data-cert="${d.certId}">${ICON.shield} Сертификат: данные удалены</button></div>` : ''}
        </div>
        <div class="amt ${['checked', 'sold', 'picked'].includes(d.status) ? 'pos' : 'faint'}">${d.bonus ? `+${num(d.bonus)}` : '0'}</div>
      </div>`;
    })
    .join('')}</div></div>`;
}

// ── Шаг 1б: фото и распознавание ────────────────────────────────────────────
function photo() {
  const a = ui.ai || { status: 'loading', stage: 'Готовлю ИИ…' };
  const head = `<button class="back" data-go="start">${ICON.back} Назад</button><h1>Что на фото?</h1>`;
  if (a.status === 'loading') {
    return `${head}
    <div class="scan mt-12"><img src="${ui.photoUrl}" alt="Твоё фото"><div class="beam"></div><div class="scan-cap"><span class="spinner"></span>${esc(a.stage)}</div></div>
    <div class="onb-guide" style="margin-top:6px"><div style="width:84px;flex:none">${mascot('scan', { label: 'Сактик смотрит на фото' })}</div><div class="bubble">Секунду, рассматриваю! Первый раз ИИ загружается чуть дольше.</div></div>`;
  }
  if (a.status === 'error' || !a.result?.guesses?.length || a.result.techness < 0.06) {
    return `${head}
    <img class="photo-prev mt-12" src="${ui.photoUrl}" alt="Твоё фото">
    <div class="notice warn mt-12"><div class="ico">${ICON.info}</div><div class="small"><b>${a.status === 'error' ? 'ИИ сейчас недоступен.' : 'Не похоже на технику, которую я знаю.'}</b><br>Выбери похожую вещь в каталоге или введи модель — мастер в хабе всё проверит при приёмке.</div></div>
    <h2 class="h-sec">Похожая вещь</h2>
    ${examplesGrid()}
    <button class="btn ghost block mt-16" data-go="manual">${ICON.edit} Ввести модель вручную</button>`;
  }
  const r = a.result;
  const top = r.guesses[0];
  if (!a.pick) a.pick = top.id;
  if (!a.cond) a.cond = top.condition || (top.prob > 0 ? null : null);
  const g = r.guesses.find((x) => x.id === a.pick) || top;
  return `${head}
  <div class="scan mt-12"><img src="${ui.photoUrl}" alt="Твоё фото"></div>
  <div class="row mt-12" style="gap:8px"><span class="ai-badge">${ICON.check}${r.engine === 'claude' ? 'Claude' : 'ИИ в телефоне'}</span><span class="xs muted">${r.engine === 'claude' ? 'распознал модель и поломки' : 'узнаёт вид техники, без интернета'}</span></div>
  <div class="section-label mt-16">Похоже на</div>
  <div class="guess">${r.guesses.map((x) => `<button class="guess-i" data-guess="${x.id}" aria-pressed="${x.id === a.pick}">
      <span class="dev-ph">${ART[x.art] ? ART[x.art](x.label) : ICON.box}</span>
      <span class="grow"><b>${esc(x.model || x.label)}</b><span class="conf">${Math.round(x.prob * 100)}% · ${esc(DEVICE_TYPES[x.type].label)}</span><span class="bar"><i style="width:${Math.max(4, Math.round(x.prob * 100))}%"></i></span></span>
    </button>`).join('')}</div>
  ${g.damage?.length ? `<p class="small mt-12"><b>Видно на фото:</b> ${esc(g.damage.join(', '))}</p>` : ''}
  <div class="section-label mt-16">Что с вещью?</div>
  <div class="chips">${CONDITIONS.filter((c) => c.id !== 'other').map((c) => `<button class="chip" data-cond="${c.id}" aria-pressed="${a.cond === c.id}">${c.label}</button>`).join('')}</div>
  <div class="field mt-16"><label for="aiModel">Модель, если знаешь</label><input class="input" id="aiModel" maxlength="60" placeholder="${esc(g.type === 'phone' ? 'Например, Samsung Galaxy A50' : g.type === 'laptop' ? 'Например, Lenovo IdeaPad 330' : 'Можно оставить пустым')}" value="${esc(a.model ?? g.model ?? '')}"></div>
  <p class="error mt-8" id="condErr" hidden>Выбери, что с вещью — так точнее бирка</p>
  <button class="btn primary lg block mt-16" data-ai-next>Дальше</button>
  <button class="btn plain block mt-8" data-go="start">Не то — выбрать из каталога</button>`;
}

async function runRecognition(el, file) {
  ui.ai = { status: 'loading', stage: 'Готовлю ИИ…' };
  rerender(el);
  try {
    const result = await recognize(file, (stage) => {
      if (ui.step !== 'photo' || !ui.ai) return;
      ui.ai.stage = stage;
      const cap = el.querySelector('.scan-cap');
      if (cap) cap.innerHTML = `<span class="spinner"></span>${esc(stage)}`;
    });
    if (ui.step !== 'photo') return;
    ui.ai = { status: 'done', result, pick: null, cond: result.guesses?.[0]?.condition || null };
  } catch (e) {
    if (ui.step !== 'photo') return;
    ui.ai = { status: 'error', error: String(e?.message || e) };
  }
  render(el, getState());
}

// ── Шаг 1в: ручной ввод ─────────────────────────────────────────────────────
function manual() {
  const m = ui.manual || { model: '', type: 'phone', condition: 'dead' };
  return `
  <button class="back" data-go="start">${ICON.back} Назад</button>
  <h1>Модель вручную</h1>
  <p class="muted mt-8">Техник хаба сверит модель и состояние при приёмке.</p>
  <form class="stack mt-16" id="manualForm" novalidate>
    <div class="field"><label for="mModel">Модель</label><input class="input" id="mModel" name="model" required maxlength="60" autocomplete="off" placeholder="Например, Xiaomi Redmi Note 8" value="${esc(m.model)}"></div>
    <div class="field"><label for="mType">Вид техники</label><select class="input" id="mType" name="type">
      ${Object.entries(DEVICE_TYPES).map(([k, v]) => `<option value="${k}" ${k === m.type ? 'selected' : ''}>${v.label} · ${v.bonus} бонусов</option>`).join('')}
    </select></div>
    <div class="field"><label for="mCond">Состояние</label><select class="input" id="mCond" name="condition">
      ${CONDITIONS.map((c) => `<option value="${c.id}" ${c.id === m.condition ? 'selected' : ''}>${c.label}</option>`).join('')}
    </select></div>
    <p class="error" id="mErr" hidden>Введите модель устройства</p>
    <button class="btn primary lg block" type="submit">Дальше</button>
  </form>`;
}

// ── Шаг 2: карточка устройства ──────────────────────────────────────────────
function card(st) {
  const d = device();
  const bonus = bonusFor(d.type);
  return `
  <button class="back" data-go="start">${ICON.back} Назад</button>
  <div class="card">
    <div class="row" style="align-items:flex-start;gap:14px">
      <div class="dev-ph">${ART[d.art] ? ART[d.art](d.model) : ICON.box}</div>
      <div class="grow stack" style="gap:6px">
        <div class="row wrap" style="gap:8px">${tagChip(d.tag)}${d.isExample ? demoMark('пример') : ''}${d.ai ? `<span class="ai-badge">${ICON.check}${d.ai === 'claude' ? 'Claude' : 'ИИ'}</span>` : ''}</div>
        <h2>${esc(d.model)}</h2>
        <div class="muted small">${esc(d.state)} · ${DEVICE_TYPES[d.type].label}</div>
      </div>
    </div>
    <div class="divider mt-12"></div>
    <div class="row between mt-12"><span class="muted">Бонусы за сдачу</span><b class="num" style="font-size:24px;color:var(--brand)">+${num(bonus)}</b></div>
    <p class="xs muted">Придут после ${DEVICE_TYPES[d.type].big ? 'вывоза' : 'проверки в хабе'}${st.tazaru ? ' · Тазару күні, × 2' : ''}</p>
  </div>

  ${partsBlock(d)}

  <h2 class="h-sec">Что будет с вещью</h2>
  <div class="card">${journey(d)}</div>
  ${d.tag === 'danger' ? `<div class="notice danger mt-12"><div class="ico">${ICON.flame}</div><div class="small">Вздутая батарея может загореться. Не заряжай её и не выбрасывай в мусорный бак. Положи в негорючую коробку подальше от тепла.</div></div>` : ''}
  <button class="btn primary lg block mt-16" data-go="method">${DEVICE_TYPES[d.type].big ? 'Вызвать вывоз' : 'Выбрать, куда сдать'}</button>`;
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Путь вещи по бирке: от сдачи до второй жизни
function journey(d) {
  const big = DEVICE_TYPES[d.type].big;
  const steps = [];
  if (big) {
    steps.push(['', ICON.truck, 'Заберём из дома', 'Лицензированная скупка: бесплатно, с актом и весом']);
    steps.push(['', ICON.leaf, 'Фреон и масло — безопасно', 'Откачивают по правилам, а не в воздух']);
    steps.push(['raw', ICON.recycle, 'Металл и пластик — в переработку', 'Корпус, медь и компрессор станут сырьём']);
    return `<div class="journey">${steps.map(jstep).join('')}</div>`;
  }
  steps.push(['', ICON.box, 'Газель отвезёт в хаб', 'Короба школ и боксы объезжаем раз в неделю']);
  steps.push(['', ICON.tag, `Мастер ставит бирку за ${ECON.triageSec} с`, `${TAGS[d.tag].label}: ${TAGS[d.tag].hint}`]);
  if (d.tag === 'whole') steps.push(['', ICON.heart, 'Вторая жизнь целиком', 'Продаём со скидкой или отдаём семье через акимат']);
  if (d.tag === 'donor') steps.push(['', ICON.chip, 'Живые детали — новым хозяевам', `С QR-паспортом и гарантией 30 дней. Тебе — ${Math.round(BONUS.royaltyShare * 100)}% цены`]);
  if (d.tag === 'danger') steps.push(['danger', ICON.flame, 'Батарея — в шкаф с песком', 'И лицензированному переработчику в спецупаковке']);
  if (['phone', 'laptop'].includes(d.type)) steps.push(['', ICON.shield, 'Данные сотрём', 'Сертификат придёт в кошелёк']);
  steps.push(['raw', ICON.recycle, 'Остальное — в переработку', 'Платы, металл и пластик — лицензированному переработчику']);
  return `<div class="journey">${steps.map(jstep).join('')}</div>`;
}
const jstep = ([cls, ico, t, s]) => `<div class="jstep ${cls}"><span class="j-ico">${ico}</span><div><b>${esc(t)}</b><span>${esc(s)}</span></div></div>`;

function partsBlock(d) {
  if (d.parts?.length) {
    const priced = d.parts.filter((p) => p.price != null);
    return `<h2 class="h-sec">Что внутри ещё живо</h2>
    <div class="card"><div class="list">${d.parts
      .map(
        (p) => `<div class="li"><div class="ico blue">${ICON.chip}</div>
          <div class="grow"><b>${esc(p.name)}</b>${p.goesTo ? `<div class="xs muted">может уйти ${esc(p.goesTo)}</div>` : ''}
          ${p.hasOrder ? '<div class="xs" style="color:var(--brand);font-weight:600">есть заявка мастерской</div>' : ''}</div>
          ${p.price != null ? `<div class="amt">${num(p.price)} ₸</div>` : ''}</div>`,
      )
      .join('')}</div></div>
    <p class="footnote">${priced.length ? 'Цены — за проверенную деталь с гарантией. ' : ''}Когда деталь продадут, тебе придёт ещё ${Math.round(BONUS.royaltyShare * 100)}% её цены${d.royalty ? ` (по этому ноутбуку — +${num(d.royalty)} бонусов)` : ''}.</p>`;
  }
  if (d.wholeNote) {
    return `<h2 class="h-sec">Вторая жизнь целиком</h2><div class="card small">${esc(d.wholeNote)}.${d.wholePrice ? ` Цена для покупателя — около ${num(d.wholePrice)} ₸.` : ''}</div>`;
  }
  const generic = GENERIC_PARTS[d.type];
  if (!d.isExample && generic?.length) {
    return `<h2 class="h-sec">Что внутри может жить</h2>
    <div class="card"><div class="chips">${generic.map((p) => `<span class="chip" style="cursor:default">${esc(p)}</span>`).join('')}</div>
    <p class="xs muted mt-12">Точно проверит мастер на сортировке за ${ECON.triageSec} секунд: прочитает чип батареи, проверит экран, ячейки — на стенде ТЕСТ-30.</p></div>`;
  }
  return '';
}

// ── Шаг 3: способ сдачи ─────────────────────────────────────────────────────
function method() {
  const d = device();
  const big = DEVICE_TYPES[d.type].big;
  const opts = big ? ['pickup'] : ['school', 'box'];
  if (prefer && !big && opts.includes(prefer.method) && !ui.method) { ui.method = prefer.method; ui.pointId = prefer.id; }
  if (!opts.includes(ui.method)) ui.method = opts[0];
  const icons = { school: ICON.school, box: ICON.box, pickup: ICON.truck };
  return `
  <button class="back" data-go="card">${ICON.back} ${esc(d.model)}</button>
  <h1>${big ? 'Вывоз из дома' : 'Куда сдать'}</h1>
  <p class="muted mt-8">+${num(bonusFor(d.type))} бонусов после ${big ? 'вывоза' : 'проверки в хабе'}</p>
  <div class="choices mt-16">${opts
    .map(
      (k) => `<button class="choice" data-method="${k}" aria-pressed="${ui.method === k}">
        <span class="ico">${icons[k]}</span><span class="grow"><b>${METHODS[k].label}</b><br><span class="small muted">${cap(METHODS[k].hint)}</span></span></button>`,
    )
    .join('')}</div>
  ${big ? pickupForm() : pointPicker(ui.method)}
  <p class="error mt-12" id="limitErr" hidden>В этом месяце уже сдано ${WALLET.monthlyDeviceLimit} устройств — это лимит на человека. Продолжить можно в следующем месяце.</p>
  <button class="btn primary lg block mt-16" data-submit>${big ? 'Вызвать вывоз' : 'Сдать и получить QR-код'}</button>`;
}

// ── Точки на карте ──────────────────────────────────────────────────────────
const ref = () => me || geo().center;
const refLabel = () => (me ? 'от вас' : 'от центра города');
const kindLabel = { school: 'Школа Донор-лиги', con: 'Бокс в ЦОН', university: 'Бокс в вузе' };

function pointRows(list, { selectable, selectedId, limit }) {
  const shown = limit ? list.slice(0, limit) : list;
  return `<div class="card"><div class="list">${shown.map((p) => `<button class="li li-btn${selectable ? ' pick-row' : ''}" data-point="${p.id}" ${selectable ? `aria-pressed="${p.id === selectedId}"` : ''}>
      <div class="ico ${p.kind === 'school' ? '' : 'blue'}">${p.kind === 'school' ? ICON.school : ICON.box}</div>
      <div class="grow"><b>${esc(p.name)}</b><div class="xs muted">${esc(p.address || kindLabel[p.kind])}</div></div>
      <div class="xs muted nowrap">${fmtDist(p.dist)}</div>
    </button>`).join('')}</div></div>`;
}

// Выбор школы или бокса: карта + ближайшие точки списком
function pointPicker(m) {
  const list = byDistance(ref(), pointsFor(m));
  if (!list.find((p) => p.id === ui.pointId)) ui.pointId = list[0].id;
  // Выбранный на «Карте» пункт — первым в списке, чтобы было видно
  const sel = list.findIndex((p) => p.id === ui.pointId);
  if (sel > 3 && !ui.all) list.unshift(...list.splice(sel, 1));
  return `
  <div class="section-label mt-24">${m === 'school' ? 'Школа' : 'Бокс'} · ближе всего ${refLabel()}</div>
  <div class="map-card"><div class="map-slot" data-map></div></div>
  <div class="mt-8">${pointRows(list, { selectable: true, selectedId: ui.pointId, limit: ui.all ? 0 : 4 })}</div>
  ${list.length > 4 ? `<button class="btn plain mt-8" data-all>${ui.all ? 'Свернуть список' : `Все ${m === 'school' ? 'школы' : 'боксы'}: ${list.length}`}</button>` : ''}`;
}

// Вывоз крупной техники: адрес (поиск или точка на карте) и удобное время
function pickupForm() {
  const p = ui.pick;
  return `
  <div class="section-label mt-24">Откуда забрать</div>
  ${addressField('pAddr', p)}
  <div class="map-card mt-8"><div class="map-slot" data-map></div></div>
  <p class="footnote">Найди адрес или нажми на карту, где стоит техника.</p>
  <div class="section-label mt-24">Когда удобно</div>
  <div class="seg block" role="group" aria-label="День">${[1, 2, 3].map((d) => `<button data-day="${d}" aria-pressed="${p.day === d}">${dayLabel(d)}</button>`).join('')}</div>
  <div class="seg block mt-8" role="group" aria-label="Время">${TIMES.map((t, i) => `<button data-time="${i}" aria-pressed="${p.time === i}">${t}</button>`).join('')}</div>
  <p class="error mt-12" id="addrErr" hidden>Укажите адрес: найдите его или поставьте точку на карте</p>`;
}

function attachMap(el) {
  const slot = el.querySelector('[data-map]');
  if (!slot) return;
  if (ui.step === 'method' && ui.method === 'pickup') return attachPickupMap(el, slot);
  const items = pointsFor(ui.method);
  const m = mountMap(slot, 'resident', {
    center: ref(),
    zoom: 12,
    onLocate: (pos) => {
      if (!pos) return toast('Не удалось определить, где вы. Расстояния — от центра города');
      if (pos.outside) return toast('Вы не в Актобе. Расстояния — от центра города');
      me = pos;
      ui.pointId = null;
      ui.fitted = '';
      render(el, getState());
    },
  });
  setMe(m, me);
  // Главное на карте — пункты из списка под картой (ближайшие) и выбранный; остальные — точки
  const near = byDistance(ref(), items).slice(0, 4);
  setPins(m, 'points', items, {
    selectedId: ui.pointId,
    focusIds: new Set((ui.all ? items : near).map((p) => p.id)),
    onClick: (p) => { ui.pointId = p.id; render(el, getState()); },
  });
  const view = `${ui.step}:${ui.method}:${me ? 'me' : ''}`;
  if (ui.fitted !== view) {
    ui.fitted = view;
    const sel = ui.pointId && pointById(ui.pointId);
    if (sel && prefer?.id === sel.id) panTo(m, sel, 15);
    else fitTo(m, me ? [me, ...near] : near, { maxZoom: 15 });
  } else if (ui.pointId && ui.panTo === ui.pointId) {
    panTo(m, pointById(ui.pointId));
  }
  ui.panTo = null;
}

function attachPickupMap(el, slot) {
  const setAddr = (a) => { ui.pick.addr = a; ui.pick.q = null; ui.fitted = ''; render(el, getState()); };
  const m = mountMap(slot, 'pickup', {
    center: ui.pick.addr || ref(),
    zoom: 13,
    onMapClick: (pos) => setAddr(reverse(pos.lat, pos.lon)),
    onLocate: (pos) => {
      if (!pos) return toast('Не удалось определить, где вы');
      if (pos.outside) return toast('Вы не в Актобе — найдите адрес поиском');
      me = pos;
      setAddr(reverse(pos.lat, pos.lon));
    },
  });
  setMe(m, me);
  const a = ui.pick.addr;
  setPins(m, 'home', a ? [{ id: 'home', kind: 'pickup', name: a.label, lat: a.lat, lon: a.lon }] : [], { selectedId: 'home' });
  const view = `pickup:${a ? `${a.lat},${a.lon}` : ''}`;
  if (ui.fitted !== view) { ui.fitted = view; if (a) panTo(m, a, 16); else fitTo(m, [ref()], { maxZoom: 12 }); }
  bindAddress(el, 'pAddr', ui.pick, setAddr);
}

// ── Шаг 4: QR-квитанция ─────────────────────────────────────────────────────
function receipt(st) {
  const d = st.donations.find((x) => x.id === ui.receiptId);
  if (!d) return start(st);
  const big = d.type === 'big';
  const payload = `${APP_NAME}:receipt:${d.deviceNo}:${getProfile().cardId}`;
  return `
  <div class="card receipt">
    <div style="width:120px;margin:-4px auto -6px">${mascot('party', { label: 'Сактик радуется' })}</div>
    <div class="done-line">${ICON.check}${big ? 'Заявка на вывоз создана' : 'Квитанция готова'}</div>
    ${qrSvg(payload, { label: `QR-квитанция ${d.deviceNo}` })}
    <div><div class="xs muted">Квитанция ${APP_NAME}</div><h2 class="num">${d.deviceNo}</h2></div>
    <div class="kv">
      <div><span>Устройство</span><b>${esc(d.model)}</b></div>
      <div><span>Куда</span><b>${d.point ? esc(d.point) : METHODS[d.method].label}</b></div>
      ${d.address ? `<div><span>Адрес</span><b>${esc(d.address)}</b></div>` : ''}
      ${d.slot ? `<div><span>Когда</span><b>${esc(d.slot)}</b></div>` : ''}
      <div><span>Карта донора</span><b class="num">•••• ${getProfile().cardId.slice(-4)}</b></div>
      <div><span>Бонусы</span><b>+${num(d.bonus)} после ${big ? 'вывоза' : 'проверки'}</b></div>
    </div>
    ${['phone', 'laptop'].includes(d.type) ? `<div class="notice" style="text-align:left;width:100%;background:var(--fill-2);box-shadow:none"><div class="ico">${ICON.shield}</div><div class="small">Данные сотрём или уничтожим носитель. Сертификат придёт сюда, в приложение.</div></div>` : ''}
    ${big ? `<div class="notice" style="text-align:left;width:100%;background:var(--fill-2);box-shadow:none"><div class="ico">${ICON.truck}</div><div class="small">${cap(METHODS.pickup.hint)}.</div></div>` : ''}
  </div>
  <div class="stack mt-16">
    ${big ? `<button class="btn ghost block" data-pickup="${d.id}">${ICON.truck} Скупка забрала</button>` : `<button class="btn ghost block" data-to-hub="${d.deviceNo}">${ICON.hub} Открыть в хабе</button>`}
    <button class="btn primary lg block" data-go="start">Готово</button>
  </div>`;
}

// ── События ─────────────────────────────────────────────────────────────────
function bind(el) {
  // Ряд подтем: колесо мыши крутит его вбок (полоса-ползунок и свайп работают сами)
  const cats = el.querySelector('.cats');
  if (cats) {
    cats.addEventListener('wheel', (e) => {
      if (cats.scrollWidth <= cats.clientWidth || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      cats.scrollLeft += e.deltaY;
    }, { passive: false });
  }
  el.onclick = (e) => {
    const t = e.target.closest('button, [data-go]');
    if (!t) return;
    if (t.dataset.go) {
      if (t.dataset.go === 'start') home();
      else { ui.step = t.dataset.go; ui.all = false; ui.fitted = ''; }
      return rerender(el);
    }
    if ('unprefer' in t.dataset) { prefer = null; return render(el, getState()); }
    if (t.dataset.cat) {
      cat = t.dataset.cat;
      render(el, getState());
      el.querySelector(`[data-cat="${cat}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center' });
      return;
    }
    if (t.dataset.example) {
      ui.exampleId = t.dataset.example;
      ui.manual = null;
      ui.step = 'card';
      return rerender(el);
    }
    if (t.dataset.guess) { ui.ai.pick = t.dataset.guess; ui.ai.model = el.querySelector('#aiModel')?.value; return render(el, getState()); }
    if (t.dataset.cond) { ui.ai.cond = t.dataset.cond; ui.ai.model = el.querySelector('#aiModel')?.value; return render(el, getState()); }
    if ('aiNext' in t.dataset) {
      const a = ui.ai;
      if (!a.cond) { el.querySelector('#condErr').hidden = false; return; }
      const g = a.result.guesses.find((x) => x.id === a.pick) || a.result.guesses[0];
      const model = (el.querySelector('#aiModel')?.value || '').trim() || g.model || g.label;
      ui.manual = { model, type: g.type, condition: a.cond, stateText: CONDITIONS.find((c) => c.id === a.cond).label.toLowerCase(), art: g.art, ai: a.result.engine };
      ui.exampleId = null;
      ui.step = 'card';
      return rerender(el);
    }
    if (t.dataset.method) {
      ui.method = t.dataset.method;
      ui.pointId = null;
      ui.all = false;
      return render(el, getState());
    }
    if (t.dataset.day) { ui.pick.day = +t.dataset.day; return render(el, getState()); }
    if (t.dataset.time) { ui.pick.time = +t.dataset.time; return render(el, getState()); }
    if ('all' in t.dataset) {
      ui.all = !ui.all;
      return render(el, getState());
    }
    if (t.dataset.point) {
      ui.pointId = t.dataset.point;
      ui.panTo = t.dataset.point;
      render(el, getState());
      el.querySelector('[data-map]')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      return;
    }
    if (t.dataset.cert) return openCert(t.dataset.cert);
    if (t.dataset.pickup) {
      residentPickupDone(t.dataset.pickup);
      toast('Технику забрали, бонусы начислены');
      return;
    }
    if (t.dataset.toHub) {
      const item = getState().hub.queue.find((q) => q.deviceNo === t.dataset.toHub);
      home();
      if (item) selectHubItem(item.id);
      location.hash = 'hub';
      return;
    }
    if (t.hasAttribute('data-submit')) {
      try {
        if (ui.method === 'pickup' && !ui.pick.addr) { el.querySelector('#addrErr').hidden = false; el.querySelector('#pAddr')?.focus(); return; }
        const pickup = ui.method === 'pickup' ? { ...ui.pick.addr, slot: slotText(ui.pick) } : null;
        const d = submitDonation({ exampleId: ui.exampleId, manual: ui.manual, method: ui.method, pointId: ui.pointId, pickup });
        prefer = null;
        ui.receiptId = d.id;
        ui.step = 'receipt';
        rerender(el);
      } catch (err) {
        if (err.code === 'limit') el.querySelector('#limitErr').hidden = false;
        else throw err;
      }
    }
  };
  el.onchange = (e) => {
    if (e.target.id === 'photoInput' && e.target.files?.[0]) {
      if (ui.photoUrl) URL.revokeObjectURL(ui.photoUrl);
      const file = e.target.files[0];
      ui.photoUrl = URL.createObjectURL(file);
      ui.step = 'photo';
      runRecognition(el, file);
    }
  };
  const form = el.querySelector('#manualForm');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const model = String(fd.get('model') || '').trim();
      if (!model) {
        el.querySelector('#mErr').hidden = false;
        el.querySelector('#mModel').focus();
        return;
      }
      const condition = String(fd.get('condition'));
      ui.manual = { model, type: String(fd.get('type')), condition, stateText: CONDITIONS.find((c) => c.id === condition).label.toLowerCase() };
      ui.exampleId = null;
      ui.step = 'card';
      rerender(el);
    };
  }
}

function rerender(el) {
  render(el, getState());
  window.scrollTo({ top: 0 });
}
export const GROUP_LIST = GROUPS;
