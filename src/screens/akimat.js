// Экран «Акимат»: счётчик тонн к цели 229,6 т, тонны по каналам, деньги РОП, рейтинг школ, сценарии.
import { PILOT, ROP, SCENARIOS, BONUS_TOTALS, SCHOOL_LEAGUE, WEIGHT_KG, EXTEND, EV } from '../data.js';
import { fleet, restLife, lessWaste } from '../lib/extend.js';
import { demoMark } from '../lib/ui.js';
import { num, num1, num2, tenge, dateTime, esc } from '../lib/format.js';
import { ICON } from '../lib/icons.js';
import { makeChart, destroyCharts, cssVar } from '../lib/charts.js';
import { pointCounts, extendTotals } from '../store.js';
import { LEAGUE, BOXES, HUB, AKIMAT_PT, LANDFILLS } from '../geo/points.js';
import { geo } from '../lib/map/geo.js';
import { mountMap, setPins, setArea, fitTo } from '../lib/map/view.js';

let ui = { scenario: 'base', fitted: false, life: Math.round(EXTEND.cityGrowth * 100) };
let lastKg = null;
export function home() {}

function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}
const SHORT = ['Мелкая бытовая', 'Крупная', 'Холодильники', 'ТВ и мониторы', 'Телефоны, ноутбуки', 'Лампы', 'Солнечные панели'];

export function render(el, st) {
  destroyCharts();
  const kg = Object.values(st.akimat.kg).reduce((a, b) => a + b, 0);
  const t = kg / 1000;
  const grew = lastKg != null && kg > lastKg;
  lastKg = kg;
  const sc = SCENARIOS.find((s) => s.id === ui.scenario);
  const events = [...st.akimat.events].reverse().slice(0, 5);
  const counts = pointCounts();
  const schools = LEAGUE.map((s) => [s, counts[s.id] || 0]).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const viaPoints = Object.values(counts).reduce((a, b) => a + b, 0);
  const layers = requestLayers(st);
  const maxFund = Math.max(...SCENARIOS.map((s) => s.fund));

  const maxT = Math.max(...PILOT.channels.map((x) => x.t));
  el.innerHTML = `
  <div class="screen-head"><h1>Панель акимата</h1><p>Пилот: ${PILOT.months} · бюджет ${tenge(PILOT.budget)}</p></div>
  <div class="dash">
    <section class="card span-7" aria-label="Счётчик тонн">
      <div class="card-title"><h2>Техника, выведенная из мусора</h2></div>
      <div class="counter ${grew ? 'flash' : ''}" data-testid="tonnes">${t < 1 ? num2(t) : num1(t)} <small>т из ${num1(PILOT.goalT)} т</small></div>
      <div class="progress mt-12" aria-label="Прогресс к цели"><i style="width:${Math.min(100, (t / PILOT.goalT) * 100)}%"></i></div>
      <div class="row between xs muted mt-8"><span>факт ${num(kg)} кг</span><span>цель пилота ${num1(PILOT.goalT)} т за 6 месяцев</span></div>

      <div class="row between mt-16"><div class="section-label" style="margin:0">Тонны по каналам</div><div class="legend"><span><i style="background:var(--brand);opacity:.35"></i>план</span><span><i style="background:var(--warn)"></i>факт</span></div></div>
      <div class="bars mt-8">${PILOT.channels.map((c) => {
        const factT = st.akimat.kg[c.id] / 1000;
        return `<div class="bar-row"><div class="top"><span><b>${c.name}</b> <span class="xs muted">${c.how}</span></span><span class="num nowrap"><b>${num1(c.t)} т</b></span></div>
          <div class="bar-track"><i style="width:${(c.t / maxT) * 100}%;opacity:.3"></i><i class="fact" style="width:${factT > 0 ? Math.max(0.6, Math.min(100, (factT / maxT) * 100)) : 0}%"></i></div>
          ${st.akimat.kg[c.id] ? `<div class="xs" style="color:var(--warn);font-weight:600">факт: ${num(st.akimat.kg[c.id])} кг</div>` : ''}</div>`;
      }).join('')}</div>

      <div class="section-label mt-16">Последние поступления</div>
      ${events.length ? `<div class="list">${events.map((e) => `<div class="li"><div class="ico">${ICON.scale}</div><div class="grow small"><b>+${num(e.kg)} кг</b> · ${esc(e.text)}
        ${e.rop != null ? `<div class="xs muted">РОП за эту технику ≈ ${tenge(e.rop)} на всю цепочку (${num(e.kg)} кг × ${num2(e.rate)} ₸ за т)</div>` : ''}
        <div class="xs faint">${dateTime(e.ts)}</div></div></div>`).join('')}</div>`
        : '<div class="empty">Поступлений пока нет. Они появятся, когда технику сдадут жители, магазины или ОСИ.</div>'}
    </section>

    <section class="span-5 stack" aria-label="Главные цифры" style="align-content:start">
      <div class="kpis" style="grid-template-columns:repeat(2,1fr)">
        <div class="kpi"><div class="v">≈ ${PILOT.recycleTargetPct}%</div><div class="l">доля переработки на рабочем темпе</div><div class="was">Сейчас: ${PILOT.recycleNowPct}%</div></div>
        <div class="kpi"><div class="v">≈ ${num(PILOT.yearPaceT)} т</div><div class="l">в год после разгона, +${num1(PILOT.ppGain)} п.п.</div></div>
        <div class="kpi"><div class="v">${num1(PILOT.costPerKg)} ₸</div><div class="l">стоит пилоту килограмм техники</div></div>
        <div class="kpi"><div class="v">${num1(ROP.totalLostMln)} млн ₸</div><div class="l">РОП в год, который город не получает</div></div>
      </div>
      <div class="card">
        <div class="card-title"><h2>Рейтинг школ</h2><span class="xs muted">Донор-лига</span></div>
        <div class="list">${schools.map(([s, n], i) => `<div class="li"><div class="ico num-ico">${i + 1}</div><div class="grow"><b>${esc(s.name)}</b><div class="xs muted">${esc(s.address || '')}</div></div><div class="amt">${num(n)} шт.</div></div>`).join('')}</div>
        <p class="xs muted mt-8">${SCHOOL_LEAGUE.schools} школ в Донор-лиге. Классы-победители получают ${SCHOOL_LEAGUE.prize}.</p>
      </div>
    </section>

    <section class="card span-12" aria-label="Карта сбора">
      <div class="card-title"><h2>Карта сбора</h2>
        <div class="legend"><span><i class="legend-dot p-school"></i>школы Донор-лиги · ${LEAGUE.length}</span><span><i class="legend-dot p-box"></i>боксы в ЦОН и вузах · ${BOXES.length}</span><span><i class="legend-dot p-pickup"></i>вывоз по заявке · ${layers.pickups.length}</span><span><i class="legend-dot p-osi"></i>бирки у бака · ${layers.osi.length}</span><span><i class="legend-dot p-store"></i>«Обратный рейс» · ${layers.reverse.length}</span><span><i class="legend-dot p-hub"></i>хаб</span><span><i class="legend-dot p-danger"></i>полигон ТБО</span></div></div>
      <div class="map-card tall"><div class="map-slot" data-map></div></div>
      <p class="xs muted mt-8">Сдано через школы и боксы: ${num(viaPoints)} шт. Цифра у точки — сколько вещей туда сдали. Сейчас техника из баков уходит на полигон ТБО, где мусор горит годами. Адреса: © участники OpenStreetMap, ${geo().date.split('-').reverse().join('.')}.</p>
    </section>

    <section class="card span-12" aria-label="Сокращение отходов" data-testid="reduce">${reduceCard()}</section>

    <section class="card span-12" aria-label="Калькулятор сценариев">
      <div class="card-title"><h2>Сценарии пилота</h2>
        <div class="seg" role="group" aria-label="Сценарий">${SCENARIOS.map((s) => `<button data-sc="${s.id}" aria-pressed="${s.id === ui.scenario}">${s.name}</button>`).join('')}</div></div>
      <div class="dash">
        <div class="span-6">
          <div class="kpis">
            <div class="kpi"><div class="v">${sc.collect}%</div><div class="l">сбор</div></div>
            <div class="kpi"><div class="v">${sc.sales}%</div><div class="l">продажи деталей</div></div>
            <div class="kpi"><div class="v">${sc.prices}%</div><div class="l">цены</div></div>
            <div class="kpi"><div class="v">${num(sc.devices)}</div><div class="l">устройств в хабе</div></div>
          </div>
          <div class="row between mt-16"><span class="muted">Чистая выручка</span><b class="num" style="font-size:22px">${tenge(sc.revenue)}</b></div>
          <div class="row between mt-8"><span class="muted">Возврат бюджета</span><b class="num">${sc.returnPct}%</b></div>
          <div class="progress mt-8"><i style="width:${sc.returnPct}%"></i></div>
        </div>
        <div class="span-6">
          <div class="section-label" style="margin-top:0">Бонусный фонд и выплаты жителям</div>
          <div class="bars">
            <div class="bar-row"><div class="top"><span>Фонд</span><b class="num">${tenge(sc.fund)}</b></div><div class="bar-track"><i style="width:${(sc.fund / maxFund) * 100}%"></i></div></div>
            <div class="bar-row"><div class="top"><span>Выплаты</span><b class="num">${tenge(sc.payouts)}</b></div><div class="bar-track"><i class="fact" style="width:${(sc.payouts / maxFund) * 100}%"></i></div></div>
          </div>
          <p class="xs muted mt-12">Фонд больше выплат во всех сценариях. Бюджет ${tenge(PILOT.budget)} исполняется и без выручки.${sc.id === 'base' ? ` Всего начислено ${num(BONUS_TOTALS.accrued)} бонусов, выведут около ${Math.round(BONUS_TOTALS.withdrawShare * 100)}%.` : ''}</p>
        </div>
      </div>
    </section>

    <section class="card span-12" aria-label="Деньги РОП">
      <div class="card-title"><h2>Где лежат ${num(ROP.totalT)} т и деньги РОП</h2><span class="xs muted">МРП 2026 = ${tenge(ROP.mrp)}</span></div>
      <div class="dash">
        <div class="span-5">
          <div class="row between"><b class="small">Тонн в год</b><div class="legend"><span><i style="background:var(--brand)"></i>перерабатывается</span><span><i style="background:var(--warn)"></i>нет</span></div></div>
          <div class="chart-box mt-8"><canvas id="ropChart" aria-label="Тонны по видам техники"></canvas></div>
        </div>
        <div class="span-7"><div class="table-wrap"><table>
          <thead><tr><th>Вид техники</th><th class="r">Тонн</th><th class="r">Не перераб., т</th><th class="r">Ставка РОП, ₸/т</th><th class="r">Не получает, млн ₸</th></tr></thead>
          <tbody>${ROP.rows.map((r) => `<tr><td class="small">${esc(r.name)}</td><td class="r">${num(r.t)}</td><td class="r">${num(r.lostT)}</td><td class="r">${r.rate == null ? '<span class="muted">нет ставки</span>' : num2(r.rate)}</td><td class="r">${r.lostMln == null ? '—' : num1(r.lostMln)}</td></tr>`).join('')}
          <tr class="total"><td>Итого</td><td class="r">${num(ROP.totalT)}</td><td class="r">${num(ROP.totalLostT)}</td><td></td><td class="r">${num1(ROP.totalLostMln)}</td></tr></tbody></table></div>
          <p class="small muted mt-8">Всего за технику города положено около ${num(ROP.owedMln)} млн ₸ выплат РОП в год, из них около ${num1(ROP.totalLostMln)} млн ₸ никто не получает. За ${num1(PILOT.goalT)} т пилота — около ${num1(ROP.pilotChainMln)} млн ₸ на всю цепочку.</p>
        </div>
      </div>
    </section>
  </div>`;

  const cv = el.querySelector('#ropChart');
  makeChart(cv, {
    type: 'bar',
    data: {
      labels: SHORT,
      datasets: [
        { label: 'перерабатывается', data: ROP.rows.map((r) => r.t - r.lostT), backgroundColor: cssVar('--brand'), borderRadius: 4, stack: 's' },
        { label: 'не перерабатывается', data: ROP.rows.map((r) => r.lostT), backgroundColor: cssVar('--warn'), borderRadius: 4, stack: 's' },
      ],
    },
    options: {
      indexAxis: 'y',
      scales: { x: { stacked: true, ticks: { callback: (v) => num(v) } }, y: { stacked: true, grid: { display: false } } },
      plugins: { tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${num(c.parsed.x)} т` } } },
    },
  });

  attachMap(el, counts, layers);

  el.onclick = (e) => {
    const b = e.target.closest('[data-sc]');
    if (b) { ui.scenario = b.dataset.sc; render(el, st); }
  };
  // Ползунок срока службы: меняем только цифры, без перерисовки панели
  el.oninput = (e) => {
    if (e.target.id !== 'lifeRange') return;
    ui.life = +e.target.value;
    el.querySelector('#lifeOut').textContent = `+${ui.life}%`;
    el.querySelector('[data-testid="less-waste"]').innerHTML = lessWasteHtml();
  };
}

// ── Этап 4 «Продли»: количество отходов уменьшает только длинная жизнь ─────────
const lessWasteHtml = () => `−${num(Math.round(lessWaste(ROP.totalT, ui.life / 100)))} <small>т отходов в год</small>`;
function fleetCalc() {
  const f = EXTEND.fleet;
  const kd = EXTEND.kinds.laptop;
  const years = restLife(f.age, kd.life);
  const perUnit = f.perUnit.ssd + Math.round(f.unitMin * EV.tengePerMinute);
  return { f, kd, years, perUnit, r: fleet({ n: f.n, parts: f.parts, perUnit, years, newPrice: kd.newPrice, life: kd.life }) };
}
function reduceCard() {
  const tot = extendTotals();
  const P = EXTEND.pilot;
  const { f, kd, years, r } = fleetCalc();
  const part = (id) => f.parts.find((p) => p.id === id);
  const partName = (id) => part(id).name.split(' ')[0].toLowerCase();
  // Ступеньки цены: подряд идущие ноутбуки с одним набором покупок — одна строка
  const steps = [];
  for (const u of r.units.slice(0, r.built)) {
    const key = u.buy.join('+');
    const last = steps[steps.length - 1];
    if (last && last.key === key) last.to = u.u;
    else steps.push({ key, from: u.u, to: u.u, buy: u.buy, marginal: u.marginal });
  }
  const bought = Object.entries(r.missing).filter(([, v]) => v > 0).map(([id, v]) => `${num(v)} ${plural(v, ...part(id).buy)}`).join(' и ');
  const times = (v) => { const x = Math.round(v * 10) / 10; return Number.isInteger(x) ? `${num(x)} ${plural(x, 'раз', 'раза', 'раз')}` : `${num1(x)} раза`; };
  return `
  <div class="card-title"><h2>Сокращение: техника живёт дольше</h2><span class="xs muted">этап 4 «Продли»</span></div>
  <div class="dash">
    <div class="span-5">
      <p class="small">Отходов в год = <b>парк × масса ÷ срок службы</b>. Сбор и сортировка меняют судьбу отходов, а их количество уменьшает только длинная жизнь вещей.</p>
      <div class="row between mt-12"><span class="small">Вся техника города живёт дольше на</span><b class="num" id="lifeOut">+${ui.life}%</b></div>
      <input type="range" class="range" id="lifeRange" min="0" max="30" step="5" value="${ui.life}" aria-label="На сколько дольше живёт техника города">
      <div class="counter mt-8" data-testid="less-waste">${lessWasteHtml()}</div>
      <p class="xs muted">Из ${num(ROP.totalT)} т в год. Для сравнения: сбор пилота — ${num1(PILOT.goalT)} т за 6 месяцев.</p>
      <div class="section-label mt-16">План пилота</div>
      <div class="list">
        <div class="li"><div class="ico">${ICON.heart}</div><div class="grow small"><b>«Подожди — можно продлить»</b><div class="xs muted">экран «Сдать» и вывоз: ${num(P.residents)} ${plural(P.residents, 'вещь', 'вещи', 'вещей')}</div></div><div class="amt">${num(P.residentsKg)} кг</div></div>
        <div class="li"><div class="ico">${ICON.truck}</div><div class="grow small"><b>«Обратный рейс» → вторая семья</b><div class="xs muted">рабочая старая техника с паспортом: ${num(P.family)} ${plural(P.family, 'вещь', 'вещи', 'вещей')}</div></div><div class="amt">${num1(P.familyKg / 1000)} т</div></div>
        <div class="li"><div class="ico">${ICON.school}</div><div class="grow small"><b>Школы: закон минимума</b><div class="xs muted">${num(P.classes)} классов, ${num(P.laptops)} ноутбуков снова в работе</div></div><div class="amt">${num1(P.procurementMln)} млн ₸</div></div>
      </div>
      <p class="xs muted mt-8">Итого: <b>${num1(P.foreverT)} т</b> отходов не родится, ${num1(P.deferredT)} т не придут в мусор за пилот, жители сберегут ≈ ${num1(P.savedMln)} млн ₸. Килограммы — только за добавленные годы: m × ΔL ÷ L.</p>
      <div class="kpis mt-12" style="grid-template-columns:repeat(3,1fr)" data-testid="extend-fact">
        <div class="kpi"><div class="v">${num(tot.n)}</div><div class="l">продлено в приложении</div></div>
        <div class="kpi"><div class="v">${num1(tot.kg)}</div><div class="l">кг не родится</div></div>
        <div class="kpi"><div class="v">${num(Math.round(tot.saved / 1000))}</div><div class="l">тыс. ₸ у жителей</div></div>
      </div>
    </div>
    <div class="span-7">
      <div class="row between wrap" style="gap:8px"><b>Закон минимума: класс из ${num(f.n)} ноутбуков одной закупки</b>${demoMark('пример')}</div>
      <div class="table-wrap mt-8"><table>
        <thead><tr><th>Деталь</th><th class="r">Живых</th><th class="r">Докупить</th></tr></thead>
        <tbody>${f.parts.map((p) => `<tr${p.id === r.scarce.id ? ' class="hl"' : ''}><td class="small">${esc(p.name)}</td><td class="r">${num(p.alive)}</td><td class="r">${p.price == null ? '<span class="muted">не покупаем</span>' : r.missing[p.id] ? `${num(r.missing[p.id])} × ${tenge(p.price)}` : '—'}</td></tr>`).join('')}</tbody>
      </table></div>
      <div class="list mt-8" data-testid="fleet-steps">${steps.map((x) => `<div class="li"><div class="ico num-ico" style="width:auto;min-width:32px;padding:0 8px;white-space:nowrap">${x.from === x.to ? x.from : `${x.from}–${x.to}`}</div><div class="grow small">${x.buy.length ? `докупить: ${x.buy.map(partName).join(' и ')}` : 'только SSD и 20 минут хаба'}</div><div class="amt">${tenge(x.marginal)}</div></div>`).join('')}</div>
      <p class="small mt-8" data-testid="fleet-result">Без покупок ${plural(r.free, 'собирается', 'собираются', 'собираются')} <b>${num(r.free)} ${plural(r.free, 'ноутбук', 'ноутбука', 'ноутбуков')}</b>: меньше всего живых ${esc(r.scarce.gen)} — как бочка Либиха держит воду до самой короткой доски.
        Докупив ${esc(bought)}, класс получает <b>${num(r.built)} ноутбуков за ${tenge(r.cost)}</b> вместо ${tenge(r.built * kd.newPrice)} за новые.
        Год работы ноутбука — ${tenge(Math.round(r.perYear))} против ${tenge(Math.round(r.newPerYear))}: в ${times(r.newPerYear / r.perYear)} дешевле, закупка откладывается на ${num1(Math.round(years * 10) / 10)} года. ${num(r.donors)} ${plural(r.donors, 'ноутбук', 'ноутбука', 'ноутбуков')} без живой платы или экрана — доноры для Банка деталей.</p>
    </div>
  </div>`;
}

// Заявки с адресами: вывоз крупной техники жителям, бирки ОСИ, «Обратный рейс»
function requestLayers(st) {
  const pickups = st.donations.filter((d) => d.type === 'big' && d.lat != null)
    .map((d) => ({ id: d.id, kind: 'pickup', name: `${d.model}: ${d.status === 'picked' ? 'вывезено' : 'ждёт вывоза'}`, address: d.address, lat: d.lat, lon: d.lon }));
  const homes = new Map();
  for (const t of st.osi.tags) {
    if (t.lat == null) continue;
    const h = homes.get(t.address) || { id: `osi:${t.address}`, kind: 'osi', name: `Бирки у бака`, address: t.address, lat: t.lat, lon: t.lon, count: 0 };
    h.count++;
    homes.set(t.address, h);
  }
  const reverse = st.shop.orders.filter((o) => o.pickupOld && o.lat != null)
    .map((o) => ({ id: o.id, kind: 'reverse', name: `«Обратный рейс»: ${o.item.toLowerCase()} · ${o.crewDone ? 'забрали' : 'в пути'}`, address: o.address, lat: o.lat, lon: o.lon }));
  return { pickups, osi: [...homes.values()], reverse };
}

function attachMap(el, counts, layers) {
  const slot = el.querySelector('[data-map]');
  if (!slot) return;
  const m = mountMap(slot, 'akimat', { zoom: 12 });
  const pts = [
    ...LEAGUE.map((p) => ({ ...p, count: counts[p.id] || 0 })),
    ...BOXES.map((p) => ({ ...p, count: counts[p.id] || 0 })),
    { ...HUB, id: 'hub' },
    { ...AKIMAT_PT, id: 'akimat', name: AKIMAT_PT.name },
    ...LANDFILLS.map((l, i) => ({ ...l, id: `lf${i}`, name: l.official ? `Полигон ТБО «${l.official}»` : 'Полигон ТБО' })),
  ];
  // Главное — где уже что-то есть: пункты со сданными вещами, хаб, полигон, акимат и все заявки.
  // Пустые школы и боксы — маленькие точки.
  const all = [...pts, ...layers.pickups, ...layers.osi, ...layers.reverse];
  const focusIds = new Set(all.filter((p) => !(p.kind === 'school' || p.kind === 'con' || p.kind === 'university') || p.count > 0).map((p) => p.id));
  setPins(m, 'points', all, { focusIds });
  setArea(m, 'landfill', LANDFILLS[0] ? [LANDFILLS[0].lat, LANDFILLS[0].lon] : null, { label: 'Полигон ТБО' });
  if (!ui.fitted) { ui.fitted = true; fitTo(m, [...LEAGUE, ...BOXES, ...LANDFILLS], { maxZoom: 13, padding: 20 }); }
}
