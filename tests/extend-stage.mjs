// Проверка этапа 4 «Продли» без браузера: цены — медианы прайсов, физика батареи и срока службы,
// выбор досок совпадает с полным перебором, закон минимума, решения для вещей README, план пилота, цифры README.
// Запуск: npm run extend-stage
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { EXTEND, ROP } from '../src/data.js';
import { decide, fleet, restLife, batteryEnd, batteryLeft, batteryFresh, erfcx, fixCost, lessWaste, CAP_YEARS, MIN_GAIN } from '../src/lib/extend.js';
import { staves } from '../src/lib/extend-staves.js';
import { model, KASPI, WORKSHOPS, MARKET, median } from '../extend/model/extend-model.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let failed = 0;
const ok = (cond, msg) => {
  if (cond) console.log(`  ✓ ${msg}`);
  else { failed++; console.log(`  ✗ ${msg}`); }
};
const ru = (v) => String(v).replace('-', '−').replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const m = model();
const F = EXTEND.fixes;
const K = EXTEND.kinds;

console.log('1. Цены — медианы полных списков Kaspi (Актобе) и прайсы мастерских');
ok(K.laptop.newPrice === m.K.newLaptop && K.phone.newPrice === m.K.newPhone && K.washer.newPrice === m.K.newWasher,
  `новые вещи: ноутбук ${ru(m.K.newLaptop)}, телефон ${ru(m.K.newPhone)}, стиралка ${ru(m.K.newWasher)} ₸ = src/data.js`);
ok(F.lapBattery.part === m.K.lapBattery && F.lapSsdNew.part === m.K.ssd240 && F.washerPump.part === m.K.pump && F.washerHeater.part === m.K.heater,
  `детали: батарея ${ru(m.K.lapBattery)}, SSD ${ru(m.K.ssd240)}, насос ${ru(m.K.pump)}, ТЭН ${ru(m.K.heater)} ₸ = src/data.js`);
ok(EXTEND.fleet.perUnit.ssd === m.K.ssd128 && EXTEND.fleet.parts.find((p) => p.id === 'battery').price === m.K.lapBattery && EXTEND.fleet.parts.find((p) => p.id === 'charger').price === m.K.lapCharger,
  'закон минимума: SSD 128 ГБ, батарея и зарядка — те же медианы');
ok(F.phoneScreenBank.work === EXTEND.screenMarket - m.K.phoneDisplay, `работа над экраном телефона = 16 000 с работой − ${ru(m.K.phoneDisplay)} (медиана дисплея) = ${ru(F.phoneScreenBank.work)} ₸`);
const lists = Object.values(KASPI);
ok(lists.every((l) => l.prices.length >= 3 && l.ids.length === 3 && l.q && l.filter), `у всех ${lists.length} списков Kaspi есть запрос, фильтр, цены и номера товаров`);
ok(Object.values(KASPI).every((l) => l.prices.every((p, i, a) => i === 0 || a[i - 1] <= p)), 'списки цен отсортированы — медиану видно глазами');
ok(WORKSHOPS.every((w) => w.id > 0 && w.city && /^2026-11-1[89]$/.test(w.date)), `у всех ${WORKSHOPS.length} прайсов мастерских есть номер объявления, город и дата`);
ok(F.lapBattery.work === 10000 && F.washerPump.work === 12000 && F.washerBoard.work === 22000 && F.phoneBattery.work === 10000, 'работа: ноутбук 10 000, стиралка 10 000 + диагностика 2 000, плата 20 000 + 2 000, батарея телефона 10 000 ₸');

console.log('2. Физика: батарея и срок службы');
const close = (a, b, eps = 1e-6) => Math.abs(a - b) <= eps * Math.max(1, Math.abs(b));
// Закон корня: 1 − SoH = b·√t. На t_end ёмкость ровно 80%
let sqrtOk = true;
for (const [soh, age] of [[0.884, 2], [0.61, 6], [0.78, 3], [0.95, 1]]) {
  const t = batteryEnd(soh, age);
  const b = (1 - soh) / Math.sqrt(age);
  if (!close(1 - b * Math.sqrt(t), EXTEND.sohEnd)) sqrtOk = false;
}
ok(sqrtOk, 'по одному замеру батарея доходит до 80% ровно в t_end: 1 − SoH = b·√t');
ok(m.mac.left === 3.93 && m.mac.end === 5.93, `MacBook команды (чип: 5 523 из 6 249 мА·ч, 2 года): до 80% ещё ${ru(m.mac.left)} года`);
ok(batteryLeft(0.7, 4) === 0 && batteryLeft(0.9, 4) > batteryLeft(0.85, 4), 'ниже 80% — остаток 0; здоровее батарея — дольше живёт');
ok(close(batteryFresh(0.78, 3), batteryEnd(0.78, 3)) && batteryFresh(0.78, 3, { donorSoh: 0.9 }) < batteryFresh(0.78, 3), 'новая батарея у того же хозяина живёт t_end; пакет из банка с 90% — меньше');
// Средний остаток жизни Вейбулла формы 2 = ∫ₐ^∞ S(t) dt / S(a): формула через erfcx против численного интеграла
const numericRest = (age, L) => {
  const lam = L / (Math.sqrt(Math.PI) / 2);
  const S = (t) => Math.exp(-((t / lam) ** 2));
  const hi = age + 12 * lam;
  const n = 20000;
  const dx = (hi - age) / n;
  let sum = S(age) + S(hi);
  for (let i = 1; i < n; i++) sum += (i % 2 ? 4 : 2) * S(age + i * dx);
  return ((sum * dx) / 3) / S(age);
};
let restOk = true;
for (const [age, L] of [[0, 4.5], [2, 4.5], [6, 4.5], [3, 3], [7, 3], [8, 10], [14, 10], [25, 10]]) {
  if (Math.abs(restLife(age, L) - Math.min(CAP_YEARS, numericRest(age, L))) > 1e-4) { restOk = false; console.log('    расхождение', age, L, restLife(age, L), numericRest(age, L)); }
}
ok(restOk, 'остаток жизни «остального» L·erfcx(age/λ) совпадает с численным интегралом Вейбулла на 8 парах (возраст, срок)');
ok(close(restLife(0, 4.5), 4.5) && restLife(2, 4.5) > restLife(6, 4.5) && restLife(25, 10) > 0, 'новая вещь живёт L, старая — меньше, но не ноль');
ok(Math.abs(erfcx(0) - 1) < 1e-6 && Math.abs(erfcx(1) - Math.exp(1) * 0.1572992070502851) < 1e-6, 'erfcx: erfcx(0) = 1, erfcx(1) = e·erfc(1)');

console.log('3. Бочка: выбор досок совпадает с полным перебором');
let seed = 11;
const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
const brute = (list, newPrice, life) => {
  const sorted = list.map((s) => ({ ...s, rul: Math.min(CAP_YEARS, s.rul) }));
  const T0 = Math.min(...sorted.map((s) => s.rul));
  const fixable = sorted.filter((s) => s.fix);
  let best = null;
  for (let mask = 1; mask < 1 << fixable.length; mask++) {
    const set = fixable.filter((_, i) => mask & (1 << i));
    const ids = new Set(set.map((s) => s.id));
    const T = Math.min(...sorted.map((s) => (ids.has(s.id) ? Math.min(CAP_YEARS, s.fix.rul) : s.rul)));
    const gain = T - T0;
    if (gain < MIN_GAIN - 1e-9) continue;
    const per = set.reduce((a, s) => a + fixCost(s.fix), 0) / gain;
    if (!best || per < best.per - 1e-9) best = { per, gain };
  }
  const verdict = T0 >= MIN_GAIN ? 'ok' : best && best.per < newPrice / life ? 'extend' : 'replace';
  return { best, verdict };
};
let sets = 0;
let same = true;
let honest = true;
for (let t = 0; t < 3000; t++) {
  const n = 2 + Math.floor(rnd() * 4);
  const list = Array.from({ length: n }, (_, i) => {
    const rul = rnd() < 0.3 ? 0 : rnd() * 6;
    const hasFix = i < n - 1 ? rnd() < 0.8 : rnd() < 0.2; // последняя доска — «остальное», у неё замены почти никогда нет
    return { id: `s${i}`, name: `s${i}`, rul, fix: hasFix ? { part: Math.round(rnd() * 30000), work: Math.round(rnd() * 12000), rul: rnd() < 0.3 ? CAP_YEARS : rnd() * 8 } : null };
  });
  const newPrice = 50000 + rnd() * 400000;
  const life = 2 + rnd() * 10;
  const d = decide(list, { newPrice, life, kg: 1 });
  const b = brute(list, newPrice, life);
  sets++;
  if (d.verdict !== b.verdict || (b.best && (!d.best || Math.abs(d.best.perYear - b.best.per) > 1e-6 * b.best.per))) { same = false; }
  if (d.verdict === 'extend' && (d.best.gain < MIN_GAIN - 1e-9 || d.best.perYear >= newPrice / life)) honest = false;
}
ok(same, `только короткие доски по порядку: ответ совпадает с перебором всех сочетаний на ${ru(sets)} случайных вещах`);
ok(honest, 'бочка не советует ремонт, который добавляет меньше года или дороже нового за год');

console.log('4. Закон минимума: класс одинаковых ноутбуков');
const f = m.fleet;
ok(f.free === Math.min(...EXTEND.fleet.parts.map((p) => p.alive)) && f.scarce.id === 'battery', `без покупок — ${f.free}: по самой редкой живой детали (батареи)`);
let stepsOk = true;
let fleetSame = true;
for (let t = 0; t < 400; t++) {
  const parts = [
    { id: 'board', alive: 3 + Math.floor(rnd() * 10), price: null },
    { id: 'a', alive: Math.floor(rnd() * 12), price: Math.round(rnd() * 30000) },
    { id: 'b', alive: Math.floor(rnd() * 12), price: Math.round(rnd() * 15000) },
  ];
  const years = 0.5 + rnd() * 4;
  const r = fleet({ n: 12, parts, perUnit: Math.round(rnd() * 20000), years, newPrice: 100000 + rnd() * 300000, life: 4.5 });
  for (let i = 1; i < r.units.length; i++) if (r.units[i].marginal < r.units[i - 1].marginal) stepsOk = false;
  let want = 0;
  for (const u of r.units) { if (u.perYear < r.newPerYear) want = u.u; else break; }
  if (want !== r.built || r.cost !== r.units.slice(0, want).reduce((a, u) => a + u.marginal, 0)) fleetSame = false;
}
ok(stepsOk, 'цена каждой следующей вещи только растёт ступеньками — 400 случайных классов');
ok(fleetSame, 'собираем ровно те вещи, чей год жизни дешевле нового, — сверено перебором');
ok(f.built === 10 && f.cost === 249800 && f.years === 1.94 && f.times === 6 && f.donors === 2 && f.missing.battery === 6 && f.missing.charger === 2,
  `пример: 10 ноутбуков из 12 за 249 800 ₸ (6 батарей и 2 зарядки), год работы в ${f.times} раз дешевле, 2 донора`);
ok(f.hours === 33.3 && f.hours < m.spare, `10 классов — ${ru(f.hours)} ч работы хаба при запасе ${ru(m.spare)} ч`);

console.log('5. Решения для вещей из README');
const c = m.cases;
ok(c.lenovo.verdict === 'extend' && c.lenovo.best.cost === 38500 && c.lenovo.best.fixes.join() === 'battery,speed' && Math.round(c.lenovo.best.perYear) === 24399,
  'ноутбук 6 лет: батарея и SSD из банка — 38 500 ₸, год жизни 24 399 ₸');
ok(c.mac.verdict === 'ok' && Math.round(c.mac.T0 * 100) / 100 === 3.03, 'MacBook по чипу: чинить не нужно, ещё ≈ 3 года');
ok(c.phone3.verdict === 'extend' && c.phone3.best.cost === 10000 && Math.round(c.phone3.best.perYear) === 7234, 'телефон 3 года: батарея за 10 000 ₸, год жизни 7 234 ₸');
ok(c.phone7.verdict === 'replace', 'телефон 7 лет с разбитым экраном: честное «нет» — сдать на детали');
ok(c.washer8.verdict === 'extend' && c.washer8.best.cost === 16999 && Math.round(c.washer8.best.perYear) === 3254 && c.washer8.kgSaved === 22.51,
  'стиралка 8 лет: насос за 16 999 ₸, год жизни 3 254 ₸, −22,51 кг');
ok(c.washer14.verdict === 'extend' && c.washer14.best.cost === 22000 && Math.round(c.washer14.best.perYear) === 5950, 'стиралка 14 лет: плата за 22 000 ₸, год жизни 5 950 ₸');
ok(m.ratio.ssd === 3.6 && m.ratio.screen === 2.6, 'деталь из Банка дешевле: SSD в 3,6 раза, экран телефона в 2,6 раза');
// Вздутую батарею не продлеваем: подсказка «можно продлить» есть только у ноутбуков, телефонов и стиралок без бирки «Опасно»
const res = readFileSync(join(root, 'src/screens/resident.js'), 'utf8');
ok(/d\.tag === 'danger' \? null/.test(res), 'вещь с вздутой батареей не предлагаем продлить — только в шкаф с песком');

console.log('6. План пилота и город');
const P = EXTEND.pilot;
ok(P.residents === m.pilot.total && P.residentsKg === Math.round(m.pilot.kgForever), `жители: ${P.residents} вещей, ${P.residentsKg} кг`);
ok(P.family === m.family.n && P.familyKg === Math.round(m.family.kg), `«Обратный рейс» → семья: ${P.family} вещей, ${ru(P.familyKg)} кг`);
ok(P.classes === m.I.fleetClasses && P.laptops === m.total.fleetLaptops && P.procurementMln === Math.round(m.total.fleetDeferred / 1e5) / 10, `школы: ${P.classes} классов, ${P.laptops} ноутбуков, закупка ${ru(P.procurementMln)} млн ₸`);
ok(P.foreverT === Math.round(m.total.forever / 100) / 10 && P.deferredT === Math.round(m.total.deferred / 100) / 10 && P.savedMln === Math.round(m.pilot.savedPilot / 1e5) / 10,
  `итого: ${ru(P.foreverT)} т не родится, ${ru(P.deferredT)} т не придут в мусор, жители сберегут ${ru(P.savedMln)} млн ₸`);
ok(Math.round(lessWaste(ROP.totalT, EXTEND.cityGrowth)) === 364 && m.city === 364, '+10% к сроку службы техники города — минус 364 т в год');
ok(EXTEND.market.iphone === m.market.iphonePct && EXTEND.market.samsung === m.market.samsungPct && MARKET.iphone.withHealth === 114 && MARKET.samsung.withHealth === 2,
  'рынок Актобе: здоровье батареи пишут 61% объявлений iPhone (114 из 187) и 1,8% Samsung (2 из 112)');
ok(median([3, 1, 2]) === 2 && median([4, 1, 3, 2]) === 2.5, 'медиана считается правильно');
// Доски из src/lib/extend-staves.js: у «остального» нет замены, вздутие и мёртвый диск — доска 0 лет
const st = staves('laptop', { age: 4, soh: 0.9, disk: 'ssd', diskFail: true });
ok(st.find((s) => s.id === 'disk').rul === 0 && !st.find((s) => s.id === 'rest').fix, 'SMART «диск умирает» — доска 0 лет; «остальное» заменить нельзя');

console.log('7. README совпадает с моделью');
const readme = readFileSync(join(root, 'README.md'), 'utf8').replace(/[  ]/g, ' ');
const want = [
  '347 988 ₸', '204 516 ₸', '138 995 ₸', '77 331 ₸', '68 172 ₸', '13 900 ₸', '12 500 ₸', '21 480 ₸', '15 282 ₸', '4 999 ₸', '4 850 ₸', '13 894 ₸', '2 106 ₸',
  '38 500 ₸', '24 399 ₸', '3,2 раза', '7 234 ₸', '9,4 раза', '16 999 ₸', '3 254 ₸', '4,3 раза', '22 000 ₸', '5 950 ₸', '22,5 кг', '3,9 года',
  '249 800 ₸', '3 479 880 ₸', '12 856 ₸', 'в 6 раз', '33,3 ч', '136,7 ч', '364 т', '61%', '114 из 187', '2 из 112',
  `${ru(P.residents)} вещи`, `${ru(P.family)} вещей`, `${ru(P.foreverT)} т`, `${ru(P.deferredT)} т`, `${ru(P.savedMln)} млн ₸`, `${ru(P.procurementMln)} млн ₸`,
  `${ru(sets)} случайных`, '213', '29 мастерских', 'ст. 329',
];
for (const s of want) ok(readme.includes(s), `README содержит «${s}»`);

console.log(failed ? `\nПровалено проверок этапа 4: ${failed}` : '\nВсе проверки этапа 4 прошли');
process.exit(failed ? 1 : 0);
