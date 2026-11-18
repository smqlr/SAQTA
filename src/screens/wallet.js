// Экран «Кошелёк», как в банковском приложении: баланс, уведомления, история, вывод на карту (макет).
import { WALLET, BONUS, PILOT, APP_NAME } from '../data.js';
import { getState, withdraw, markNotesRead } from '../store.js';
import { ICON } from '../lib/icons.js';
import { num, esc, dateTime, signed } from '../lib/format.js';
import { sheet, toast } from '../lib/ui.js';
import { qrSvg } from '../lib/qr.js';

let highlight = new Set();
export function home() { highlight = new Set(); }

export function render(el, st) {
  const unread = st.notes.filter((n) => n.unread);
  unread.forEach((n) => highlight.add(n.id));
  const pending = st.donations.filter((d) => d.status === 'sent' || d.status === 'awaiting-pickup').reduce((s, d) => s + d.bonus, 0);
  const canWithdraw = st.wallet.balance >= WALLET.withdrawMin;
  const lastNote = [...st.notes].reverse()[0];
  const tx = [...st.wallet.tx].reverse();

  el.innerHTML = `<div class="phone-col">
    <div class="screen-head"><h1>Кошелёк</h1></div>

    <section class="bank-card" aria-label="Баланс бонусов">
      <div class="sub">Бонусы ${APP_NAME}</div>
      <div class="bal mt-8"><span class="num" data-testid="balance">${num(st.wallet.balance)}</span> <span class="unit">бонусов</span></div>
      <div class="sub mt-8">≈ ${num(st.wallet.balance * WALLET.tengePerBonus)} ₸ · 1 бонус = 1 ₸</div>
      ${pending ? `<span class="pending">Ждут проверки: +${num(pending)}</span>` : ''}
    </section>

    <div class="quick mt-12">
      <button data-act="withdraw" ${canWithdraw ? '' : 'aria-disabled="true"'}><span class="ico">${ICON.card}</span>На карту</button>
      <button data-act="rides"><span class="ico">${ICON.bus}</span>Поездки</button>
      <button data-act="discounts"><span class="ico">${ICON.percent}</span>Скидки</button>
    </div>
    <p class="footnote center">${canWithdraw ? `Вывод на карту любого банка от ${num(WALLET.withdrawMin)} бонусов` : `До вывода на карту: ещё ${num(WALLET.withdrawMin - st.wallet.balance)} бонусов`}</p>

    ${lastNote ? `<div class="notice mt-16 ${highlight.has(lastNote.id) ? 'hl' : ''}"><div class="ico ${lastNote.kind === 'royalty' ? '' : ''}">${lastNote.kind === 'royalty' ? ICON.heart : ICON.bell}</div>
      <div class="small grow"><b>${esc(lastNote.title)}</b><div class="mt-8" style="margin-top:2px">${esc(lastNote.body)}</div><div class="xs faint mt-8">${dateTime(lastNote.ts)}</div></div></div>` : ''}

    <div class="section-label mt-24">История</div>
    <div class="card">${tx.length ? `<div class="list">${tx.map(txRow).join('')}</div>` : '<div class="empty">Пока пусто. Сдайте устройство — бонусы придут после проверки в хабе.</div>'}</div>

    ${st.notes.length > 1 ? `<div class="section-label mt-24">Уведомления</div>
      <div class="card"><div class="list">${[...st.notes].reverse().slice(1).map((n) => `<div class="li"><div class="ico ${n.kind === 'royalty' ? 'red' : 'blue'}">${n.kind === 'royalty' ? ICON.heart : ICON.bell}</div><div class="grow small"><b>${esc(n.title)}</b><div class="muted">${esc(n.body)}</div><div class="xs faint">${dateTime(n.ts)}</div></div></div>`).join('')}</div></div>` : ''}

    ${st.certs.length ? `<div class="section-label mt-24">Сертификаты: данные удалены</div>
      <div class="card"><div class="list">${[...st.certs].reverse().map((c) => `<button class="li li-btn" data-cert="${c.id}">
        <div class="ico blue">${ICON.shield}</div>
        <div class="grow"><b>${esc(c.model)}</b><div class="xs muted">${c.no} · ${dateTime(c.ts)}</div></div>${ICON.chevron}</button>`).join('')}</div></div>` : ''}

    <div class="section-label mt-24">Как начисляем</div>
    <div class="card"><div class="kv">
      <div><span>Телефон или планшет</span><b>${BONUS.phone}</b></div>
      <div><span>Ноутбук или системный блок</span><b>${BONUS.laptop}</b></div>
      <div><span>Монитор или телевизор</span><b>${BONUS.screen}</b></div>
      <div><span>Мелкая бытовая, роутер, аккумулятор</span><b>${BONUS.small}</b></div>
      <div><span>Вывоз крупной техники</span><b>${BONUS.bigPickup}</b></div>
      <div><span>Зарядки и кабели</span><b>${BONUS.cable}</b></div>
      <div><span>Деталь вашего устройства продана</span><b>${Math.round(BONUS.royaltyShare * 100)}% цены</b></div>
    </div></div>
    <p class="footnote">Бонусы платим из ${Math.round(WALLET.fundRevenueShare * 100)}% выручки хаба и стартового фонда ${num(WALLET.fundStart)} ₸. Это выплата за сданное вторсырьё, вывод — ${WALLET.payoutCycle}. Платежи сейчас в тестовом режиме.</p>
  </div>`;

  if (unread.length) setTimeout(markNotesRead, 0);

  el.onclick = (e) => {
    const c = e.target.closest('[data-cert]');
    if (c) return openCert(c.dataset.cert);
    const b = e.target.closest('[data-act]');
    if (!b) return;
    if (b.dataset.act === 'withdraw') {
      if (!canWithdraw) return toast(`Вывод от ${num(WALLET.withdrawMin)} бонусов`);
      return openWithdraw();
    }
    if (b.dataset.act === 'rides' || b.dataset.act === 'discounts') return openPartners(b.dataset.act);
  };
}

function txRow(t) {
  const ico = t.kind === 'withdraw' ? ICON.card : t.kind === 'royalty' ? ICON.heart : ICON.leaf;
  const cls = t.kind === 'withdraw' ? 'blue' : t.kind === 'royalty' ? 'red' : '';
  return `<div class="li"><div class="ico ${cls}">${ico}</div>
    <div class="grow"><b>${esc(t.title)}</b><div class="xs muted">${esc(t.sub)} · ${dateTime(t.ts)}</div>
    ${t.status !== 'Зачислено' ? `<div class="xs" style="color:var(--warn);font-weight:600">${esc(t.status)}</div>` : ''}</div>
    <div class="amt ${t.amount > 0 ? 'pos' : ''}">${signed(t.amount)}</div></div>`;
}

// Сертификат стирания данных: что сделали с носителем, когда и кто
export function openCert(id) {
  const c = getState().certs.find((x) => x.id === id);
  if (!c) return;
  const destroyed = /Destroy/.test(c.method);
  sheet('Сертификат', (body) => {
    body.innerHTML = `<div class="card receipt">
      <div class="done-line">${ICON.shield}${destroyed ? 'Носитель уничтожен' : 'Данные удалены'}</div>
      ${qrSvg(`${APP_NAME}:wipe:${c.no}`, { label: `QR сертификата ${c.no}` })}
      <div><div class="xs muted">Сертификат ${APP_NAME}</div><h2 class="num">${c.no}</h2></div>
      <div class="kv">
        <div><span>Устройство</span><b>${esc(c.model)}</b></div>
        <div><span>Номер в хабе</span><b>${c.deviceNo}</b></div>
        <div><span>Способ</span><b>${esc(c.method)}</b></div>
        <div><span>Дата</span><b>${dateTime(c.ts)}</b></div>
        <div><span>Выдал</span><b>${esc(c.by)}</b></div>
      </div>
      <p class="small muted" style="text-align:left">${destroyed ? 'Накопитель физически уничтожен: восстановить с него данные невозможно.' : 'Все данные стёрты без возможности восстановления, результат проверен. Устройство или его детали можно передавать дальше.'}</p>
      <button class="btn primary block" data-close>Готово</button>
    </div>`;
  });
}

function openPartners(kind) {
  sheet(kind === 'rides' ? 'Поездки' : 'Скидки', (body) => {
    body.innerHTML = `<div class="stack">
      <div class="notice"><div class="ico">${kind === 'rides' ? ICON.bus : ICON.percent}</div><div class="small">
        Бонусы можно не выводить, а потратить на ${kind === 'rides' ? 'поездки' : 'скидки у партнёров'}. Партнёры подключаются в пилоте: ${PILOT.months}.</div></div>
      <p class="small muted">Список партнёров и условия появятся после подписания договоров.</p>
      <button class="btn primary block" data-close>Понятно</button></div>`;
  });
}

// ── Вывод на карту (макет) ──────────────────────────────────────────────────
export function luhn(digits) {
  let sum = 0;
  let dbl = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (dbl) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
    dbl = !dbl;
  }
  return digits.length >= 16 && sum % 10 === 0;
}
function brand(d) {
  if (/^4/.test(d)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(d)) return 'Mastercard';
  if (/^62/.test(d)) return 'UnionPay';
  return '';
}
const fmtCard = (d) => d.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
const DEMO_CODE = '1234'; // демо: код подтверждения в макете

function openWithdraw() {
  const w = { step: 1, amount: WALLET.withdrawMin, card: '', code: '', err: '' };
  sheet('Вывод на карту', (body, close) => {
    const draw = () => {
      const bal = getState().wallet.balance;
      const steps = `<div class="steps" aria-hidden="true">${[1, 2, 3, 4].map((i) => `<i class="${i <= w.step ? 'on' : ''}"></i>`).join('')}</div>`;
      if (w.step === 1) {
        body.innerHTML = `${steps}<form class="stack mt-16" data-step="1" novalidate>
          <div class="field"><label for="wAmount">Сумма, бонусов</label>
            <input class="input big num" id="wAmount" inputmode="numeric" autocomplete="off" value="${w.amount}">
            <span class="hint">Доступно ${num(bal)} · минимум ${num(WALLET.withdrawMin)} · 1 бонус = 1 ₸</span></div>
          <div class="row wrap"><button type="button" class="btn sm ghost" data-amt="${WALLET.withdrawMin}">${num(WALLET.withdrawMin)}</button><button type="button" class="btn sm ghost" data-amt="${bal}">Всё: ${num(bal)}</button></div>
          <div class="card tight row between"><span class="muted small">Придёт на карту</span><b class="num" id="wGet">${num(w.amount * WALLET.tengePerBonus)} ₸</b></div>
          ${w.err ? `<p class="error" role="alert">${w.err}</p>` : ''}
          <button class="btn primary block" type="submit">Дальше</button></form>`;
      } else if (w.step === 2) {
        const b = brand(w.card);
        body.innerHTML = `${steps}<form class="stack mt-16" data-step="2" novalidate>
          <div class="field"><label for="wCard">Номер карты любого банка</label>
            <input class="input num" id="wCard" inputmode="numeric" autocomplete="cc-number" placeholder="0000 0000 0000 0000" maxlength="23" value="${fmtCard(w.card)}">
            <span class="hint" id="wBrand">${b || 'Visa, Mastercard, UnionPay'}</span></div>
          ${w.err ? `<p class="error" role="alert">${w.err}</p>` : ''}
          <div class="row"><button type="button" class="btn ghost" data-back>Назад</button><button class="btn primary grow" type="submit">Дальше</button></div></form>`;
      } else if (w.step === 3) {
        body.innerHTML = `${steps}<form class="stack mt-16" data-step="3" novalidate>
          <div class="card tight"><div class="kv">
            <div><span>Сумма</span><b class="num">${num(w.amount)} ₸</b></div>
            <div><span>Карта</span><b class="num">${brand(w.card)} •• ${w.card.slice(-4)}</b></div>
            <div><span>Выплата</span><b>${WALLET.payoutCycle}</b></div>
          </div></div>
          <div class="field"><label for="wCode">Код из SMS на подтверждённый номер</label>
            <input class="input big num" id="wCode" inputmode="numeric" autocomplete="one-time-code" maxlength="4" placeholder="••••" value="${w.code}">
            <span class="hint">Тестовый режим: код ${DEMO_CODE}</span></div>
          ${w.err ? `<p class="error" role="alert">${w.err}</p>` : ''}
          <div class="row"><button type="button" class="btn ghost" data-back>Назад</button><button class="btn primary grow" type="submit">Подтвердить вывод</button></div></form>`;
      } else {
        body.innerHTML = `${steps}<div class="receipt mt-16">
          <div class="done-line" style="font-size:16px">${ICON.check} Готово</div>
          <h2>Заявка на вывод принята</h2>
          <div class="counter" style="font-size:36px">${num(w.amount)} ₸</div>
          <p class="muted small">на карту ${brand(w.card)} •• ${w.card.slice(-4)}<br>Статус: в обработке · выплата ${WALLET.payoutCycle}</p>
          <span class="xs muted">Тестовый режим: деньги не переводятся</span>
          <button class="btn primary block" data-close>Готово</button></div>`;
      }
      body.querySelector('input')?.focus();
    };

    body.addEventListener('input', (e) => {
      if (e.target.id === 'wAmount') {
        w.amount = Number(e.target.value.replace(/\D/g, '')) || 0;
        const g = body.querySelector('#wGet');
        if (g) g.textContent = `${num(w.amount * WALLET.tengePerBonus)} ₸`;
      }
      if (e.target.id === 'wCard') {
        w.card = e.target.value.replace(/\D/g, '').slice(0, 19);
        e.target.value = fmtCard(w.card);
        body.querySelector('#wBrand').textContent = brand(w.card) || 'Visa, Mastercard, UnionPay';
      }
      if (e.target.id === 'wCode') w.code = e.target.value.replace(/\D/g, '').slice(0, 4);
    });
    body.addEventListener('click', (e) => {
      const a = e.target.closest('[data-amt]');
      if (a) { w.amount = Number(a.dataset.amt); w.err = ''; draw(); }
      if (e.target.closest('[data-back]')) { w.step -= 1; w.err = ''; draw(); }
    });
    body.addEventListener('submit', (e) => {
      e.preventDefault();
      const bal = getState().wallet.balance;
      if (w.step === 1) {
        if (w.amount < WALLET.withdrawMin) w.err = `Минимум для вывода — ${num(WALLET.withdrawMin)} бонусов`;
        else if (w.amount > bal) w.err = `На счёте только ${num(bal)} бонусов`;
        else { w.err = ''; w.step = 2; }
      } else if (w.step === 2) {
        if (!luhn(w.card)) w.err = 'Проверьте номер карты: он не прошёл проверку';
        else { w.err = ''; w.step = 3; }
      } else if (w.step === 3) {
        if (w.code !== DEMO_CODE) w.err = 'Неверный код';
        else {
          w.err = '';
          withdraw(w.amount, `${brand(w.card)} •• ${w.card.slice(-4)}`);
          w.step = 4;
        }
      }
      draw();
    });
    draw();
  });
}
