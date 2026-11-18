// Экран «Акимат»: счётчик тонн к цели 229,6 т, тонны по каналам, деньги РОП, рейтинг школ, сценарии.
import { PILOT, ROP, SCENARIOS, BONUS_TOTALS, SCHOOL_LEAGUE, WEIGHT_KG } from '../data.js';
import { num, num1, num2, tenge, dateTime, esc } from '../lib/format.js';
import { demoMark } from '../lib/ui.js';
import { ICON } from '../lib/icons.js';
import { makeChart, destroyCharts, cssVar } from '../lib/charts.js';
import { fridgeRopTenge } from '../store.js';

let ui = { scenario: 'base' };
let lastKg = null;
export function home() {}

const SHORT = ['Мелкая бытовая', 'Крупная', 'Холодильники', 'ТВ и мониторы', 'Телефоны, ноутбуки', 'Лампы', 'Солнечные панели'];

export function render(el, st) {
  destroyCharts();
  const kg = Object.values(st.akimat.kg).reduce((a, b) => a + b, 0);
  const t = kg / 1000;
  const grew = lastKg != null && kg > lastKg;
  lastKg = kg;
  const sc = SCENARIOS.find((s) => s.id === ui.scenario);
  const events = [...st.akimat.events].reverse().slice(0, 5);
  const schools = Object.entries(st.akimat.schools).sort((a, b) => b[1] - a[1]);
  const maxFund = Math.max(...SCENARIOS.map((s) => s.fund));

  const maxT = Math.max(...PILOT.channels.map((x) => x.t));
  el.innerHTML = `
  <div class="screen-head"><div><h1>Панель акимата</h1><p class="muted">Пилот ${PILOT.months} · бюджет ${tenge(PILOT.budget)}</p></div></div>
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
        ${e.channel === 'reverse' && e.kg === WEIGHT_KG.demoFridge ? `<div class="xs muted">РОП за этот холодильник ≈ ${tenge(fridgeRopTenge())} на всю цепочку (${num(e.kg)} кг × ${num2(ROP.fridgeRate)} ₸ за т)</div>` : ''}
        <div class="xs faint">${dateTime(e.ts)}</div></div></div>`).join('')}</div>`
        : '<div class="empty">Пока пусто. Сдайте технику на экранах «Житель», «Магазин» или «ОСИ».</div>'}
    </section>

    <section class="span-5 stack" aria-label="Главные цифры" style="align-content:start">
      <div class="kpis" style="grid-template-columns:repeat(2,1fr)">
        <div class="kpi"><div class="v">≈ ${PILOT.recycleTargetPct}%</div><div class="l">доля переработки на рабочем темпе</div><div class="was">сейчас ${PILOT.recycleNowPct}%</div></div>
        <div class="kpi"><div class="v">≈ ${num(PILOT.yearPaceT)} т</div><div class="l">в год после разгона, +${num1(PILOT.ppGain)} п.п.</div></div>
        <div class="kpi"><div class="v">${num1(PILOT.costPerKg)} ₸</div><div class="l">стоит пилоту килограмм техники</div></div>
        <div class="kpi"><div class="v">${num1(ROP.totalLostMln)} млн ₸</div><div class="l">РОП в год, который город не получает</div></div>
      </div>
      <div class="card">
        <div class="card-title"><h2>Рейтинг школ</h2>${demoMark()}</div>
        <div class="list">${schools.map(([name, n], i) => `<div class="li"><div class="ico" style="font-weight:700">${i + 1}</div><div class="grow"><b>${esc(name)}</b></div><div class="amt">${num(n)} шт.</div></div>`).join('')}</div>
        <p class="xs muted mt-8">${SCHOOL_LEAGUE.schools} школ в Донор-лиге. Классы-победители получают ${SCHOOL_LEAGUE.prize}. Названия и числа — после договоров.</p>
      </div>
    </section>

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

  el.onclick = (e) => {
    const b = e.target.closest('[data-sc]');
    if (b) { ui.scenario = b.dataset.sc; render(el, st); }
  };
}
