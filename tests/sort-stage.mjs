// Проверка этапа 3 «Сортировка» без браузера: оптимальность дерева разборки, батарея, цены скупщиков, цифры README.
// Запуск: npm run sort-stage
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { SORT_BINS, SORT_TREES, SORT_FLAG, TYPE_KG } from '../src/data.js';
import { planFor, solve, allValues, massOf, priceOf } from '../src/lib/sort.js';
import { model, BOARD_BUYERS, METAL_BUYERS, CABLE_BUYERS } from '../sort/model/sort-model.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let failed = 0;
const ok = (cond, msg) => {
  if (cond) console.log(`  ✓ ${msg}`);
  else { failed++; console.log(`  ✗ ${msg}`); }
};
const m = model();
const bin = (id) => SORT_BINS.find((b) => b.id === id);
const ru = (v) => String(v).replace('-', '−').replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

console.log('1. Цены ящиков — медианы прайсов скупщиков');
for (const id of ['ram', 'boardPhone', 'boardLaptop', 'phones', 'cable', 'boardHome', 'alum', 'steel', 'motor']) {
  ok(m.prices[id] === bin(id).price, `«${bin(id).label}»: медиана ${ru(m.prices[id])} ₸/кг = цене в src/data.js`);
}
ok(SORT_FLAG.price === m.flag.max, `плата с «жёлтым флажком»: лучший прайс ${ru(m.flag.max)} ₸/кг`);
const all = [...BOARD_BUYERS, ...METAL_BUYERS, ...CABLE_BUYERS];
ok(all.every((b) => b.id > 0 && b.city && /^2026-11-(0[4-9]|1\d)$/.test(b.date)), `у всех ${all.length} прайсов есть номер объявления, город и дата 4–19.11.2026`);

console.log('2. Дерево: массы и время сходятся с кейсом и документацией');
for (const [k, kg] of Object.entries(m.treeKg)) ok(Math.abs(kg - TYPE_KG[k]) < 1e-9, `дерево «${SORT_TREES[k].name}»: листья дают ${ru(kg)} кг, как в документации`);
ok(m.laptopFullMin >= m.I.caseLaptopMin[0] && m.laptopFullMin <= m.I.caseLaptopMin[1], `полная разборка ноутбука по дереву — ${m.laptopFullMin} мин (кейс: 25–30)`);

console.log('3. Оптимальность: динамическое программирование = перебор всех вариантов разборки');
let seed = 7;
const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
let combos = 0;
let same = true;
let gate = true;
const binIds = SORT_BINS.filter((b) => !b.byType).map((b) => b.id);
const variants = {
  laptop: [[], ['Оперативная память', 'SSD', '3 ячейки 18650'], ['SSD']],
  phone: [[], ['Экран OLED'], ['Экран OLED', 'Камера']],
};
for (const [id, tree] of Object.entries(SORT_TREES)) {
  for (const parts of variants[id] || [[]]) {
    for (let t = 0; t < 120; t++) {
      const prices = Object.fromEntries(binIds.map((b) => [b, Math.round(bin(b).price * (0.05 + rnd() * 6))]));
      const rate = [30, 60, 120][t % 3];
      const type = id === 'phoneButton' ? 'phone' : id === 'gadget' || id === 'cells' ? 'small' : id;
      const p = planFor({ type, exampleId: null, tag: 'raw' }, { bankParts: parts, prices, rate });
      const ctx = { ...p.ctx, typeKg: TYPE_KG[type] };
      const dp = solve(SORT_TREES[id], ctx).value;
      const brute = Math.max(...allValues(SORT_TREES[id], ctx));
      combos++;
      if (Math.abs(dp - brute) > 0.011) { same = false; console.log('    расхождение', id, parts, dp, brute); }
      if (id !== p.treeId && !(id === 'phoneButton' || id === 'gadget' || id === 'cells')) same = false;
      for (const f of p.frags) if (f.battery && !['whole', 'batt'].includes(f.bin)) gate = false;
    }
  }
}
ok(same, `дерево находит лучший вариант: совпадает с перебором на ${combos} наборах цен, ставок и деталей этапа 2`);
ok(gate, 'ни в одном из них часть с батареей не попала в ящик скупщика');
// Батарея — в данных: узел с батареей внутри продаётся только целиком переработчику или в шкаф; после вскрытия батарею снимают всегда
let dataGate = true;
const hasBatt = (n) => n.sell === 'batt' || (n.children || []).some(hasBatt);
const check = (n) => {
  if (n.sell === 'batt' && n.children?.length) dataGate = false;
  if (hasBatt(n) && !['whole', 'batt'].includes(n.sell)) dataGate = false;
  for (const c of n.children || []) { if (c.sell === 'batt' && !c.must) dataGate = false; check(c); }
};
Object.values(SORT_TREES).forEach(check);
ok(dataGate, 'данные: вещь с батареей идёт только «целиком переработчику» или в шкаф, после вскрытия батарея снимается всегда');

console.log('4. Решения дерева на вещах пилота');
const pl = m.plans;
ok(pl.laptop.asIs === 550 && pl.laptop.full === -775.2 && pl.laptop.value === 596.5 && pl.laptop.minutes === 2, 'ноутбук: целиком 550 ₸, разобрать всё −775,2 ₸ за 26 мин, по дереву 596,5 ₸ за 2 мин');
ok(m.lenovo2.value === 503.5 && m.lenovoFlag.value === 645 && m.boardThreshold === 4557, 'Lenovo после этапа 2: 503,5 ₸; плату вынимаем при цене от 4 557 ₸/кг; с «жёлтым флажком» — 645 ₸');
ok(pl.phone.value === 108 && pl.phone.asIs === 108 && m.phoneBreakEvenMin === 1.45, 'смартфон: целиком 108 ₸ — вскрытие окупается, только если крышка и батарея снимаются быстрее 1,45 мин');
ok(pl.phoneButton.value - pl.phoneButton.asIs === 21, 'кнопочный телефон: крышка на защёлке, +21 ₸ — телефон без батареи у скупщика плат');
ok(pl.small.value === 152.4 && pl.small.minutes === 0.15 && m.cordPerMin === 416, 'мелкая бытовая: шнур за 9 с даёт +62,4 ₸ — 416 ₸ в минуту');
ok(pl.screen.value === 277 && pl.cable.value === 75, 'экран: шнур, корпус целиком — 277 ₸; зарядка: провод отдельно — 75 ₸');
ok(pl.gadget.value === 18 && pl.gadget.liionInside, 'гаджет с аккумулятором не вскрываем: целиком переработчику, в паспорте партии — Li-ion внутри');
ok(m.robustTenge === 325380 && m.robustHours === 17.3 && m.robustHours < m.spareHours, `пилот: шнуры и провода +325 380 ₸ за 17,3 ч — в запасе мощности хаба (${m.spareHours} ч)`);
ok(m.fullHours === 1890 && m.fullHours > m.hubHours && m.fullLoss === 4764960, '«разобрать всё»: 1 890 ч при 1 300 ч у хаба и −4 764 960 ₸ против дерева');
ok(m.wall === 14938 && m.reserveAfter === 378621, 'сортировочная стена: 14 938 ₸ из резерва, остаётся 378 621 ₸');

console.log('5. README совпадает с моделью');
const readme = readFileSync(join(root, 'README.md'), 'utf8').replace(/[  ]/g, ' ');
const want = [
  '24 000', '11 000', '3 000', '1 500', '900', '400', '610', '45 ₸', '5 500', `${m.spread.ramVsLaptop} раз`, `${m.spread.phoneBoardVsPhone} раз`,
  '550 ₸', '−775,2 ₸', '596,5 ₸', '503,5 ₸', '645 ₸', '4 557 ₸/кг', '1,45 мин', '+62,4 ₸', '416 ₸', '277 ₸', '+21 ₸',
  '325 380 ₸', '17,3 ч', `${m.robustShare}%`.replace('.', ','), '1 890 ч', '4 764 960 ₸', '14 938 ₸', '378 621 ₸', '25,6%', '48%',
  `в ${String(m.ropRatio).replace('.', ',')} раз`, `${ru(combos)} наборах`, '13 прайсов',
];
for (const s of want) ok(readme.includes(s), `README содержит «${s}»`);

console.log(failed ? `\nПровалено проверок этапа 3: ${failed}` : '\nВсе проверки этапа 3 прошли');
process.exit(failed ? 1 : 0);
