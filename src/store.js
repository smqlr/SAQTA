// Общее состояние демо: житель, кошелёк, хаб, акимат, магазин, ОСИ.
// Хранится в localStorage (если доступен), иначе в памяти. «Сбросить демо» возвращает пресет.
import {
  BONUS, DEVICE_TYPES, EXAMPLES, WALLET, WEIGHT_KG, PARTS, SAMPLE_PASSPORT, SAMPLE_TAG_NO,
  DEMO_WALLET, LAPTOP_NOTIFICATION, ROP, PILOT, SHOP_ITEMS,
} from './data.js';
import { LEAGUE, pointById } from './geo/points.js';
import { expectedValue } from './lib/ev.js';
import { runTest30 } from './lib/test30.js';
import { DAY, pad, num } from './lib/format.js';

const KEY = 'qaita-v4';
const VERSION = 4; // 2: точки на карте; 3: адреса; 4: заявки мастерских и сертификаты стирания данных
const listeners = new Set();
let state;

const uid = () => Math.random().toString(36).slice(2, 10);
const now = () => Date.now();
// Способы очистки носителей для сертификата донору
const WIPE = {
  purge: 'Стирание по NIST SP 800-88 (Purge) с проверкой',
  destroy: 'Физическое уничтожение носителя по NIST SP 800-88 (Destroy)',
};

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function write() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* хранилище недоступно — работаем в памяти */
  }
}

// ── Начальные данные ────────────────────────────────────────────────────────
function seedHub(t) {
  // демо: очередь хаба с примерами; номер D-000781 — из образца QR-паспорта в документации
  const item = (n, exampleId, status, extra = {}) => {
    const ex = EXAMPLES.find((e) => e.id === exampleId);
    return {
      id: uid(), deviceNo: `D-${pad(n)}`, exampleId, model: ex.model, type: ex.type, state: ex.state,
      suggestedTag: ex.tag, tag: status === 'triaged' ? ex.tag : null, status, donationId: null,
      ts: t - (800 - n) * 60000, demo: true, soh: null, test30: null, ...extra,
    };
  };
  return [
    item(781, 'a50', 'triaged'),
    item(782, 'iphone11', 'new'),
    item(783, 'scooter', 'new'),
    item(784, 'nokia105', 'new'),
    item(785, 'kettle', 'new'),
  ];
}

function seedBank(t) {
  return [
    {
      id: uid(), passportNo: SAMPLE_PASSPORT.no, part: SAMPLE_PASSPORT.part, model: SAMPLE_PASSPORT.model,
      fromDevice: SAMPLE_PASSPORT.fromDevice, check: SAMPLE_PASSPORT.check, price: SAMPLE_PASSPORT.price,
      createdTs: t - 12 * DAY, // демо: деталь лежит 12 дней
      sold: false, donationId: null, groupId: null, demo: true, hasOrder: true, orderId: 'w1',
    },
  ];
}

// Заявки мастерских (док: «Мастерская оставляет в приложении заявку на деталь, например „экран Samsung A50“»).
// Экран A50 уже снят под первую заявку (образец QR-паспорта), на память Lenovo заявка есть (док: «Сценарий демо»).
function seedOrders(t) {
  const o = (id, no, model, part, status, extra = {}) => ({ id, no, shop: 'Мастерская-партнёр', model, part, status, ts: t - (10 - no) * DAY, ...extra }); // демо: название и даты заявок
  return [
    o('w1', 1, SAMPLE_PASSPORT.model, SAMPLE_PASSPORT.part, 'reserved', { deviceNo: SAMPLE_PASSPORT.fromDevice, partNo: SAMPLE_PASSPORT.no }),
    o('w2', 2, 'Lenovo IdeaPad', 'Оперативная память', 'open'),
    o('w3', 3, SAMPLE_PASSPORT.model, SAMPLE_PASSPORT.part, 'open'),
  ];
}

export function initialState(preset = 'ready') {
  const t = now();
  const s = {
    v: VERSION,
    preset,
    tazaru: false,
    seq: { device: 786, part: 4513, tag: 143 }, // демо: следующие номера после образцов из документации
    wallet: { balance: 0, tx: [] },
    notes: [],
    donations: [],
    hub: { queue: seedHub(t), selected: null },
    bank: seedBank(t),
    akimat: { kg: { reverse: 0, osi: 0, amnesty: 0, requests: 0, hub: 0 }, events: [] },
    shop: { orders: [], crewEarned: 0 },
    workshop: { orders: seedOrders(t), seq: 4 },
    certs: [],
    osi: { balance: 0, tags: [], home: null },
    test30Runs: 0,
  };
  if (preset === 'ready') {
    // Решение команды 18.11: в демо-кошельке «сдача ноутбука +200» и «роялти +1 120» (итого 1 320)
    const school = LEAGUE[0]; // демо: школа из Донор-лиги для сдачи из примера
    const cert = { id: uid(), no: 'WD-000780', deviceNo: 'D-000780', model: 'Lenovo IdeaPad', ts: t - 3 * DAY + 3600000, method: WIPE.purge, by: 'Хаб QAITA' };
    const d = { id: uid(), ts: t - 3 * DAY, deviceNo: 'D-000780', model: 'Lenovo IdeaPad', type: 'laptop', state: 'разбит корпус', tag: 'donor', method: 'school', pointId: school.id, point: school.name, address: school.address || '', lat: school.lat, lon: school.lon, exampleId: 'lenovo', status: 'sold', bonus: DEMO_WALLET.laptopBonus, certId: cert.id };
    s.donations.push(d);
    s.certs.push(cert);
    s.wallet.tx.push(
      { id: uid(), ts: t - 3 * DAY + 3600000, kind: 'accrual', title: 'Сдача ноутбука', sub: 'Lenovo IdeaPad · D-000780', amount: DEMO_WALLET.laptopBonus, status: 'Зачислено' },
      { id: uid(), ts: t - DAY, kind: 'royalty', title: 'Роялти', sub: 'Детали Lenovo IdeaPad проданы', amount: DEMO_WALLET.laptopRoyalty, status: 'Зачислено' },
    );
    s.wallet.balance = DEMO_WALLET.laptopBonus + DEMO_WALLET.laptopRoyalty;
    s.notes.push({ id: uid(), ts: t - DAY, title: 'Твой ноутбук спас 3 устройства', body: `${LAPTOP_NOTIFICATION} +${num(DEMO_WALLET.laptopRoyalty)} бонусов в твоём кошельке.`, kind: 'royalty', unread: true });
  }
  return s;
}

state = read() || initialState('ready');
if (!state || state.v !== VERSION) state = initialState('ready');

// ── Подписка ────────────────────────────────────────────────────────────────
export const getState = () => state;
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function commit(event) {
  write();
  listeners.forEach((fn) => fn(state, event));
}
export function reset(preset) {
  state = initialState(preset);
  commit({ type: 'reset' });
}
export function setTazaru(on) {
  state.tazaru = !!on;
  commit({ type: 'tazaru' });
}

// ── Помощники ───────────────────────────────────────────────────────────────
const mult = () => (state.tazaru ? BONUS.tazaruMultiplier : 1);
function credit(amount, kind, title, sub) {
  if (!amount) return;
  state.wallet.balance += amount;
  state.wallet.tx.push({ id: uid(), ts: now(), kind, title, sub, amount, status: 'Зачислено' });
}
function note(title, body, kind = 'info') {
  state.notes.push({ id: uid(), ts: now(), title, body, kind, unread: true });
}
function addKg(channel, kg, text, extra = {}) {
  state.akimat.kg[channel] = Math.round((state.akimat.kg[channel] + kg) * 100) / 100;
  state.akimat.events.push({ ts: now(), channel, kg, text, ...extra });
}
const nextDevice = () => `D-${pad(state.seq.device++)}`;
const nextPart = () => `AQ-${pad(state.seq.part++)}`;

export function suggestTag(type, condition) {
  // Правило для ручного ввода; итоговую бирку подтверждает техник хаба
  if (condition === 'swollen') return 'danger';
  if (type === 'cable' || type === 'small') return 'raw';
  if (condition === 'works') return 'whole';
  if (type === 'phone' || type === 'laptop' || type === 'screen') return 'donor';
  return 'raw';
}

export function donationsThisMonth() {
  const d = new Date();
  return state.donations.filter((x) => {
    const t = new Date(x.ts);
    return t.getMonth() === d.getMonth() && t.getFullYear() === d.getFullYear();
  }).length;
}

// ── Житель ──────────────────────────────────────────────────────────────────
// pointId — школа Донор-лиги или бокс в ЦОН/вузе на карте (для вывоза крупной техники — нет)
// pickup — адрес и время вывоза крупной техники: { label, lat, lon, slot }
export function submitDonation({ exampleId, manual, method, pointId, pickup = null }) {
  if (donationsThisMonth() >= WALLET.monthlyDeviceLimit) {
    const err = new Error('limit');
    err.code = 'limit';
    throw err;
  }
  const ex = exampleId ? EXAMPLES.find((e) => e.id === exampleId) : null;
  const model = ex ? ex.model : manual.model;
  const type = ex ? ex.type : manual.type;
  const stateText = ex ? ex.state : manual.stateText;
  const tag = ex ? ex.tag : suggestTag(manual.type, manual.condition);
  const big = DEVICE_TYPES[type].big;
  const pt = big ? null : pointById(pointId);
  if (!big && !pt) throw new Error('point');
  if (big && !pickup) throw new Error('address');
  const where = pt || pickup;
  const d = {
    id: uid(), ts: now(), deviceNo: nextDevice(), model, type, state: stateText, tag, method,
    pointId: pt?.id || null, point: pt?.name || null, address: pt ? pt.address || null : pickup.label,
    lat: where.lat, lon: where.lon, slot: pickup?.slot || null, exampleId: ex ? ex.id : null,
    status: big ? 'awaiting-pickup' : 'sent', bonus: DEVICE_TYPES[type].bonus * mult(),
  };
  state.donations.push(d);
  if (!big) {
    state.hub.queue.unshift({
      id: uid(), deviceNo: d.deviceNo, exampleId: d.exampleId, model, type, state: stateText,
      suggestedTag: tag, tag: null, status: 'new', donationId: d.id, ts: d.ts, demo: false, soh: null, test30: null,
    });
  }
  commit({ type: 'donation', donation: d });
  return d;
}

// Сколько вещей сдано в каждую точку (школы — для рейтинга Донор-лиги и карты акимата)
export function pointCounts() {
  const c = {};
  for (const d of state.donations) if (d.pointId) c[d.pointId] = (c[d.pointId] || 0) + 1;
  return c;
}

export function residentPickupDone(donationId) {
  const d = state.donations.find((x) => x.id === donationId);
  if (!d || d.status !== 'awaiting-pickup') return;
  d.status = 'picked';
  credit(d.bonus, 'accrual', 'Вывоз крупной техники', `${d.model} · ${d.deviceNo}`);
  addKg('requests', WEIGHT_KG.residentPickup, `${d.model}: вывоз по заявке жителя`, { lat: d.lat, lon: d.lon, address: d.address });
  note('Технику забрали', `${d.model}: скупка забрала технику и выдала акт с весом. +${num(d.bonus)} бонусов.`, 'bonus');
  commit({ type: 'pickup', donation: d });
}

// ── Хаб ─────────────────────────────────────────────────────────────────────
export function selectHubItem(id) {
  state.hub.selected = id;
  commit({ type: 'select' });
}

// ── Мастерские ──────────────────────────────────────────────────────────────
const orderMatch = (o, model, part) => o.model === model && o.part === part;
// Есть ли заявка на деталь: свободная или уже закреплённая за этим устройством.
// Без заявки — false, а если в документации нет данных о спросе (null) и заявок нет — null.
export function hasOrderFor(p, model, deviceNo = null) {
  const any = state.workshop.orders.some((o) => orderMatch(o, model, p.name) && (o.status === 'open' || (deviceNo && o.deviceNo === deviceNo)));
  if (any) return true;
  return p.hasOrder === null ? null : false;
}
export function addWorkshopOrder({ shop, model, part }) {
  const o = { id: uid(), no: state.workshop.seq++, shop: shop || 'Мастерская-партнёр', model, part, status: 'open', ts: now() };
  state.workshop.orders.push(o);
  commit({ type: 'workshop-order', order: o });
  return o;
}
export function cancelWorkshopOrder(id) {
  const o = state.workshop.orders.find((x) => x.id === id);
  if (!o || o.status !== 'open') return;
  o.status = 'cancelled';
  commit({ type: 'workshop-cancel', order: o });
}

// ── Сертификат стирания данных (док: «Стирание или физическое уничтожение носителя, сертификат донору в приложении») ──
function issueCert(d, tag) {
  const c = {
    id: uid(), no: `WD-${d.deviceNo.slice(2)}`, deviceNo: d.deviceNo, model: d.model, ts: now(),
    method: tag === 'whole' || tag === 'donor' ? WIPE.purge : WIPE.destroy, by: 'Хаб QAITA',
  };
  state.certs.push(c);
  d.certId = c.id;
  return c;
}

export function triage(itemId, tag) {
  const item = state.hub.queue.find((x) => x.id === itemId);
  if (!item || item.status === 'triaged') return;
  item.tag = tag;
  item.status = 'triaged';
  addKg('hub', WEIGHT_KG.hubAvg, `${item.model}: принято в хабе`);
  const ex = item.exampleId ? EXAMPLES.find((e) => e.id === item.exampleId) : null;
  // Детали в банк: только «Донор» и только детали под заявку / с EV > 0
  if (tag === 'donor' && ex && ex.parts.length) {
    const groupId = ex.royalty ? uid() : null;
    for (const p of ex.parts) {
      const hasOrder = hasOrderFor(p, ex.model);
      const ev = expectedValue({ ...p, hasOrder });
      const take = ev == null ? true : ev > 0; // для Lenovo цен нет в документации — снимаем по сценарию демо
      if (!take) continue;
      const order = state.workshop.orders.find((o) => o.status === 'open' && orderMatch(o, ex.model, p.name));
      const passportNo = nextPart();
      if (order) Object.assign(order, { status: 'reserved', deviceNo: item.deviceNo, partNo: passportNo });
      state.bank.unshift({
        id: uid(), passportNo, part: p.name, model: ex.model, fromDevice: item.deviceNo,
        check: p.price == null ? 'проверка ТЕСТ-30 / стенд' : 'проверена', price: p.price, createdTs: now(),
        sold: false, donationId: item.donationId, groupId, goesTo: p.goesTo || null, hasOrder: !!order || hasOrder, orderId: order?.id || null, demo: false,
      });
    }
  }
  if (item.donationId) {
    const d = state.donations.find((x) => x.id === item.donationId);
    if (d) {
      d.status = 'checked';
      d.tag = tag;
      credit(d.bonus, 'accrual', `Сдача: ${DEVICE_TYPES[d.type].label.toLowerCase().split(',')[0]}`, `${d.model} · ${d.deviceNo}`);
      const cert = ['phone', 'laptop'].includes(d.type) ? issueCert(d, tag) : null;
      note(
        'Устройство проверено в хабе',
        `${d.model} (${d.deviceNo}) получил бирку и прошёл проверку.${d.bonus ? ` +${num(d.bonus)} бонусов.` : ' За зарядки и кабели бонусов нет.'}${cert ? ` Данные стёрты: сертификат ${cert.no} в кошельке.` : ''}`,
        'bonus',
      );
    }
  }
  commit({ type: 'triage', item });
}

export function askDevice(itemId, { full, design, cycles, source }) {
  const item = state.hub.queue.find((x) => x.id === itemId);
  if (!item) return;
  item.soh = { full, design, cycles: cycles ?? null, value: Math.round((full / design) * 100), source, ts: now() };
  commit({ type: 'ask', item });
}

export function runCells(itemId) {
  const item = state.hub.queue.find((x) => x.id === itemId);
  state.test30Runs += 1;
  const res = runTest30(29 + state.test30Runs);
  if (item) item.test30 = { count: res.count, seed: res.seed, ts: now() };
  commit({ type: 'test30', item });
  return res;
}

export function sellPart(partId) {
  const part = state.bank.find((x) => x.id === partId);
  if (!part || part.sold) return null;
  const group = part.groupId ? state.bank.filter((x) => x.groupId === part.groupId) : [part];
  group.forEach((p) => {
    p.sold = true;
    p.soldTs = now();
    const o = p.orderId && state.workshop.orders.find((x) => x.id === p.orderId);
    if (o) { o.status = 'done'; o.doneTs = now(); } // деталь выдана мастерской с QR-паспортом и гарантией
  });
  const ex = EXAMPLES.find((e) => e.model === part.model);
  let royalty = null;
  let toDonor = null;
  if (part.groupId && ex?.royalty) royalty = ex.royalty; // док: образец уведомления, +1 120
  else if (part.price != null) royalty = Math.round(part.price * BONUS.royaltyShare);
  if (part.donationId) {
    const d = state.donations.find((x) => x.id === part.donationId);
    if (d) {
      d.status = 'sold';
      if (royalty) credit(royalty, 'royalty', 'Роялти', `Детали ${d.model} проданы`);
      if (part.groupId && ex?.notification) note('Твой ноутбук спас 3 устройства', `${ex.notification} +${num(royalty)} бонусов в твоём кошельке.`, 'royalty');
      else if (royalty) note('Твоё устройство спасло ещё одно', `${part.part} от ${d.model} нашла нового владельца. +${num(royalty)} бонусов.`, 'royalty');
      toDonor = 'you';
    }
  } else {
    toDonor = part.fromDevice;
  }
  commit({ type: 'sell', part, royalty, toDonor });
  return { royalty, toDonor };
}

// ── Кошелёк ─────────────────────────────────────────────────────────────────
export function withdraw(amount, cardMasked) {
  if (amount < WALLET.withdrawMin || amount > state.wallet.balance) throw new Error('amount');
  state.wallet.balance -= amount;
  state.wallet.tx.push({ id: uid(), ts: now(), kind: 'withdraw', title: 'Вывод на карту', sub: cardMasked, amount: -amount, status: 'В обработке' });
  commit({ type: 'withdraw', amount });
}
export function markNotesRead() {
  let changed = false;
  state.notes.forEach((n) => { if (n.unread) { n.unread = false; changed = true; } });
  if (changed) commit({ type: 'notes' });
}
export const unreadCount = () => state.notes.filter((n) => n.unread).length;

// ── Магазин и экипаж ────────────────────────────────────────────────────────
export const ropRate = (item) => ROP.rows.find((r) => r.name === item.rop)?.rate ?? null;
export const ropTenge = (kg, rate) => (rate == null ? null : Math.round((kg / 1000) * rate)); // ставка РОП × вес

// addr — адрес доставки: { label, lat, lon }
export function placeOrder(itemId, pickupOld, addr = null) {
  const it = SHOP_ITEMS.find((x) => x.id === itemId) || SHOP_ITEMS[0];
  const rate = ropRate(it);
  const o = {
    id: uid(), ts: now(), itemId: it.id, item: it.name, kg: it.kg, rate, rop: ropTenge(it.kg, rate),
    pickupOld, crewDone: false, no: `${state.shop.orders.length + 1}`,
    address: addr?.label || null, lat: addr?.lat ?? null, lon: addr?.lon ?? null,
  };
  state.shop.orders.push(o);
  commit({ type: 'order', order: o });
  return o;
}
export function crewPickup(orderId) {
  const o = state.shop.orders.find((x) => x.id === orderId);
  if (!o || o.crewDone || !o.pickupOld) return;
  o.crewDone = true;
  state.shop.crewEarned += PILOT.crewPremium;
  addKg('reverse', o.kg, `${o.item}: «Обратный рейс»`, { rop: o.rop, rate: o.rate, lat: o.lat, lon: o.lon, address: o.address });
  commit({ type: 'crew', order: o });
}

// ── ОСИ ─────────────────────────────────────────────────────────────────────
export function osiSetHome(addr) {
  state.osi.home = addr ? { label: addr.label, lat: addr.lat, lon: addr.lon } : null;
  commit({ type: 'osi-home' });
}
export function osiMark({ kind, what, photo }) {
  const h = state.osi.home;
  const t = { id: uid(), no: `B-${pad(state.seq.tag++, 4)}`, kind, what, photo: !!photo, ts: now(), status: 'marked', address: h?.label || null, lat: h?.lat ?? null, lon: h?.lon ?? null };
  state.osi.tags.unshift(t);
  commit({ type: 'osi-mark', tag: t });
  return t;
}
export function osiPickup(tagId) {
  const t = state.osi.tags.find((x) => x.id === tagId);
  if (!t || t.status !== 'marked') return;
  t.status = 'picked';
  const bonus = t.kind === 'big' ? BONUS.osiBig : BONUS.osiSmall;
  state.osi.balance += bonus;
  const at = { lat: t.lat, lon: t.lon, address: t.address };
  if (t.kind === 'big') addKg('osi', WEIGHT_KG.osiBig, `${t.what}: «Бирка у бака»`, at);
  else addKg('hub', WEIGHT_KG.hubAvg, `${t.what}: «Бирка у бака», мелкое — маршрут в хаб`, at);
  commit({ type: 'osi-pickup', tag: t, bonus });
}

export const SAMPLE_TAG = SAMPLE_TAG_NO;
export const PARTS_DAYS = PARTS;
