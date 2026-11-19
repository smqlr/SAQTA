// Цифры этапа 4 «Продли» — одна модель, из неё все числа раздела README «Этап 4. Сокращение».
// Запуск: node extend/model/extend-model.mjs   (тест сверяет README и src/data.js с этим расчётом: npm run extend-stage)
// Входы: Kaspi (Актобе, 19.11.2026) — полные списки цен по запросу; прайсы мастерских и б/у на OLX.kz (номер объявления, город, дата);
// сроки службы — EEB (2019) и документация команды (док); физика батареи — Ploehn и др. (2004).
import { pathToFileURL } from 'node:url';
import { EXTEND, PILOT, ROP, EV, WEIGHT_KG } from '../../src/data.js';
import { decide, fleet, restLife, batteryLeft, batteryEnd, lessWaste, fixCost } from '../../src/lib/extend.js';
import { staves } from '../../src/lib/extend-staves.js';

export const median = (arr) => {
  const s = [...arr].sort((a, b) => a - b);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
};
const r1 = (v) => Math.round(v * 10) / 10;
const r2 = (v) => Math.round(v * 100) / 100;

// Kaspi, город Актобе (c=151010000), 19.11.2026: поиск /yml/product-view/pl/filters, две страницы выдачи,
// товары с одним id считаем один раз, фильтр по названию и категории — в поле filter. ids — первые три товара для проверки.
export const KASPI = {
  newLaptop: { q: 'Lenovo IdeaPad Slim 3', filter: 'название с «IdeaPad Slim 3», категория «Ноутбуки»', ids: [135203809, 130761798, 116139285],
    prices: [243889, 249994, 250958, 254561, 254998, 255037, 256702, 256999, 274103, 284114, 284857, 305000, 319900, 329000, 329899, 329899, 339000, 339000, 339999, 340990, 354985, 359185, 359472, 359753, 359999, 361136, 366000, 375180, 399997, 419999, 423733, 437585, 449768, 469606, 472985, 488276, 489603, 489990, 509990, 539990] },
  newPhone: { q: 'Samsung Galaxy A26', filter: 'название с «Galaxy A26», категория «Смартфоны»', ids: [136435860, 138125426, 137606450],
    prices: [158993, 159900, 159999, 165379, 169372, 172406, 174374, 178420, 179455, 179622, 179989, 179990, 183139, 188300, 188748, 188980, 189990, 193571, 194410, 195000, 196847, 198108, 199999, 204031, 205001, 209780, 209875, 209900, 209900, 209988, 209990, 209990, 209990, 209990, 209990, 209990, 209990, 209990, 209990, 219990, 219990, 219990, 221844, 229990, 230000, 239545, 239990, 299000] },
  newWasher: { q: 'стиральная машина', filter: 'название начинается со «Стиральная машина», без мини, полуавтоматов и активаторных', ids: [132580158, 157477393, 143121541],
    prices: [17000, 17199, 24099, 26990, 49990, 57671, 69990, 75200, 81990, 86990, 99990, 104990, 109990, 113900, 114979, 119990, 119990, 129000, 129990, 129990, 132434, 134990, 142999, 145990, 146957, 155451, 171136, 174990, 181425, 183728, 191408, 191976, 195253, 200402, 201124, 205521, 213000, 249890, 249970, 259990, 260000, 272967, 868632, 901204] },
  ssd240: { q: 'SSD 240 ГБ SATA', filter: 'SSD 240–256 ГБ, категория накопителей, без NVMe, M.2 и внешних', ids: [101078795, 6801247, 6800658],
    prices: [9900, 15390, 15490, 15500, 15990, 16350, 16400, 16450, 17898, 17900, 17999, 17999, 18063, 18280, 20000, 21400, 21480, 22888, 22991, 23285, 23290, 23425, 23912, 24452, 24791, 24899, 27300, 27692, 29990, 31426, 37800, 39900, 184884] },
  ssd128: { q: 'SSD 128 ГБ SATA', filter: 'SSD 120–128 ГБ, категория накопителей, без NVMe, M.2 и внешних', ids: [168575885, 141466263, 128354670],
    prices: [9499, 9499, 9499, 9999, 10000, 10200, 10900, 11990, 12200, 12230, 12500, 14400, 14850, 14864, 15700, 16000, 16360, 16500, 16900, 16950, 17000, 17589, 18000, 18990, 19313, 19792, 25900, 38990] },
  lapBattery: { q: 'аккумулятор для ноутбука', filter: 'название «Аккумулятор …», категория ноутбуков', ids: [114861127, 112527349, 114881106],
    prices: [7498, 8998, 8998, 9000, 9307, 9465, 9484, 9598, 9777, 9790, 9859, 9881, 9897, 9949, 9984, 10038, 10945, 11000, 11168, 11663, 11999, 12014, 12408, 12499, 12500, 12500, 12500, 12500, 12538, 12990, 12990, 12990, 13000, 13409, 13990, 13990, 13998, 13998, 14000, 14050, 14905, 19700, 20000, 20000, 20000, 21499, 24000, 25000] },
  lapCharger: { q: 'блок питания для ноутбука 65W', filter: 'блок питания или зарядное для ноутбука', ids: [169826680, 186000532, 172149913],
    prices: [4490, 4990, 11990] },
  phoneDisplay: { q: 'дисплей Samsung Galaxy A50', filter: 'дисплей или модуль для A50, без стёкол и плёнок', ids: [113308399, 128354668, 104065418],
    prices: [6875, 8689, 11380, 12000, 12799, 13890, 13898, 15900, 18000, 18000, 18888, 19888] },
  pump: { q: 'насос сливной для стиральной машины', filter: 'насос или помпа, без отдельных корпусов', ids: [184014273, 106171000, 106531816],
    prices: [3000, 3199, 3200, 3200, 3350, 3350, 3350, 3450, 3500, 3800, 3800, 4500, 4900, 4900, 4900, 4990, 4999, 6498, 7900, 7990, 8000, 8000, 9490, 9500, 9895, 11600, 11920, 12000, 14500, 14972, 15490, 16800, 18000] },
  heater: { q: 'ТЭН для стиральной машины', filter: 'ТЭН или нагревательный элемент', ids: [106072948, 138503242, 114385202],
    prices: [2489, 2492, 2499, 2499, 2500, 2500, 2687, 3000, 3000, 3250, 3296, 3789, 3790, 3800, 3850, 3855, 4390, 4490, 4500, 4500, 4700, 4780, 4800, 4850, 4998, 4998, 4998, 4999, 5250, 6000, 6000, 6497, 6500, 6900, 7490, 7800, 7870, 8900, 9500, 9600, 14830, 16688, 23400, 23830, 32500, 39000, 100000] },
};

// Работа мастерских — прайсы в объявлениях OLX.kz (19.11.2026). В Актобе есть прайс на стиральные машины;
// на ноутбуки и телефоны берём верх прайсов Алматы и Астаны — ремонт выйдет не дороже.
export const WORKSHOPS = [
  { id: 403019370, city: 'Алматы', date: '2026-11-19', what: 'установка SSD, замена диска или памяти — 10 000 ₸ за работу', lapWork: 10000 },
  { id: 401214647, city: 'Бесагаш', date: '2026-11-19', what: 'замена HDD на SSD — от 5 000 ₸', lapWorkLow: 5000 },
  { id: 402585792, city: 'Алматы', date: '2026-11-19', what: 'замена аккумулятора — от 10 000 ₸, аккумулятор входит в цену', phoneBattery: 10000 },
  { id: 389925583, city: 'Астана', date: '2026-11-19', what: 'замена аккумулятора от 7 000 ₸ на все модели', phoneBatteryLow: 7000 },
  { id: 71484181, city: 'Астана', date: '2026-11-18', what: 'дисплей Samsung A50 — 16 000 ₸ с работой', phoneScreen: 16000 },
  { id: 290021181, city: 'Актобе', date: '2026-11-19', what: 'замена помпы или ТЭНа — от 10 000 ₸, ремонт платы — от 20 000 ₸', washerWork: 10000, washerBoard: 20000 },
  { id: 352490578, city: 'Актобе', date: '2026-11-19', what: 'диагностика стиральной машины — 2 000 ₸', washerDiag: 2000 },
];
// Сколько мастерских уже есть: 2ГИС, Актобе
export const REPAIR_PLACES = { phoneLaptop: 213, washer: 29 }; // 2ГИС: «ремонт телефонов и ноутбуков» (18.11.2026), «ремонт стиральных машин» (19.11.2026)

// Рынок б/у в Актобе (OLX.kz, город id 26, 19.11.2026): первые 200 объявлений по запросу, телефоны от 15 000 ₸,
// без аксессуаров и ремонта. Считаем, где продавец пишет здоровье батареи числом рядом со словами «акб», «аккумулятор»,
// «батарея», «ёмкость». iPhone показывает здоровье в настройках, Samsung — нет. Два «Samsung» с процентом — на деле айфоны.
export const MARKET = {
  iphone: { n: 187, withHealth: 114, ids: [403058688, 403101331, 403108449, 402999907, 403167717, 402878335, 403080025, 401482550] },
  samsung: { n: 112, withHealth: 2, ids: [403101515, 399696846] },
  usedLaptop: { n: 95, median: 150000 }, // OLX Актобе «ноутбук», 25 000–1 500 000 ₸, без запчастей и скупки
  usedWasher: { n: 30, median: 50000 }, // OLX Актобе «стиральная машина», без ремонта и запчастей
};

// Сроки службы и физика — источники в README
export const SOURCES = {
  eeb: 'EEB, «Coolproducts don’t cost the earth», 2019: смартфон — 3 года, ноутбук — 4,5 года',
  ploehn: 'Ploehn, Ramadass, White, J. Electrochem. Soc. 151 (2004) A456: плёнка SEI растёт как √t',
  wrap: 'WRAP, 2011: 23% техники в пунктах приёма годны к повторному использованию — 12% сразу, 11% после мелкого ремонта',
  uba: 'UBA (Prakash и др., 2016): крупную бытовую технику чаще всего меняют из-за поломки',
  law: 'Экологический кодекс РК, ст. 329: предотвращение образования отходов — первая ступень иерархии',
};

export const INPUT = {
  rate: EV.tengePerMinute, // кейс: 900 ₸ / 15 мин
  smallDonations: 8000, // док: «Результаты» — около 8 000 сдач малой техники
  pickups: 1200, // док: заявки жителей на вывоз — 1 200 единиц
  hubMix: { phone: 6400, laptop: 2000 }, // док: телефоны и планшеты 6 400, ноутбуки и системные блоки 2 000
  wrapAfterRepair: 0.11, // WRAP: 11% — годны после мелкого ремонта (12% «сразу» — это бирка «Целое», она уже в модели команды)
  accept: 0.25, // README: допущение — каждый четвёртый, увидев цену года жизни, выбирает ремонт; пилот это измерит
  hubHours: 1300, hubHoursUsed: 1146, sortHours: 17.3, // док: 1 300 и 1 146 ч; этап 3: шнуры и провода — 17,3 ч
  fleetClasses: 10, // README: классы в пилоте — каждый, как пример ниже
  fleetUnitMin: 20, // README: сборка, SSD и Доктор — 20 мин на ноутбук (оценка)
  cityGrowth: 0.1, // README: «+10% к сроку службы» — пример для формулы города
  reverseUnits: 2500, // док: «Обратный рейс» — 2 500 единиц крупной техники за пилот
  wrapNow: 0.12, // WRAP: 12% годны сразу — рабочая старая техника
};

// Примеры из README: таблица «Что бочка решила для каждой вещи»
export const CASES = [
  { id: 'lenovo', kind: 'laptop', title: 'Ноутбук Lenovo IdeaPad, 6 лет: тормозит, батарея 61%', input: { age: 6, soh: 0.61, disk: 'hdd', slow: true } },
  { id: 'mac', kind: 'laptop', title: 'MacBook Pro, 2 года: чип прочитан SAQTA Доктором — 88,4%, 239 циклов', input: { age: 2, soh: 5523 / 6249, disk: 'ssd', slow: false } },
  { id: 'phone3', kind: 'phone', title: 'Смартфон, 3 года: «до вечера не хватает» — батарея ≈ 78%', input: { age: 3, soh: 0.78 } },
  { id: 'phone7', kind: 'phone', title: 'Смартфон, 7 лет: разбит экран, батарея ≈ 65%', input: { age: 7, soh: 0.65, screen: 'broken' } },
  { id: 'washer8', kind: 'washer', title: 'Стиральная машина, 8 лет: не сливает воду', input: { age: 8, fault: 'pump' } },
  { id: 'washer14', kind: 'washer', title: 'Стиральная машина, 14 лет: не включается', input: { age: 14, fault: 'board' } },
];

// Пример парка для закона минимума: класс из 12 одинаковых ноутбуков одной закупки 2021 года (пример для показа).
export const FLEET_SAMPLE = EXTEND.fleet;

export function model() {
  const K = Object.fromEntries(Object.entries(KASPI).map(([k, v]) => [k, Math.round(median(v.prices))]));
  const I = INPUT;
  const out = {};
  for (const c of CASES) {
    const kd = EXTEND.kinds[c.kind];
    out[c.id] = decide(staves(c.kind, c.input), { newPrice: kd.newPrice, life: kd.life, kg: kd.kg });
  }
  const per = Object.fromEntries(Object.entries(EXTEND.kinds).map(([k, v]) => [k, Math.round(v.newPrice / v.life)]));
  // Пилот: перехват на экране «Сдать» — малая техника и вывоз крупной
  const small = Math.round(I.smallDonations * I.wrapAfterRepair * I.accept);
  const phones = Math.round((small * I.hubMix.phone) / (I.hubMix.phone + I.hubMix.laptop));
  const laptops = small - phones;
  const washers = Math.round(I.pickups * I.wrapAfterRepair * I.accept);
  const typical = { phone: out.phone3, laptop: out.lenovo, washer: out.washer8 };
  const n = { phone: phones, laptop: laptops, washer: washers };
  const kgForever = r1(Object.entries(n).reduce((a, [k, v]) => a + v * typical[k].kgSaved, 0));
  const kgDeferred = r1(Object.entries(n).reduce((a, [k, v]) => a + v * EXTEND.kinds[k].kg, 0));
  const savedPilot = Object.entries(n).reduce((a, [k, v]) => a + v * typical[k].saved, 0);
  const bankSsd = laptops; // в типичном ноутбуке пересаживаем SSD из Банка деталей
  // Парк: закон минимума
  const f = EXTEND.fleet;
  const kdL = EXTEND.kinds.laptop;
  const fleetYears = restLife(f.age, kdL.life);
  const perUnit = f.perUnit.ssd + Math.round(I.fleetUnitMin * I.rate);
  const fl = fleet({ n: f.n, parts: f.parts, perUnit, years: fleetYears, newPrice: kdL.newPrice, life: kdL.life });
  const fleetHours = r1((I.fleetClasses * fl.built * I.fleetUnitMin) / 60);
  const spare = r1(I.hubHours - I.hubHoursUsed - I.sortHours);
  // «Вторая семья»: рабочую старую технику из «Обратного рейса» — в семью через акимат, с паспортом остатка жизни.
  // Меняют её в среднем в возрасте L, а в этом возрасте вещь в среднем живёт ещё 0,46·L (Вейбулл формы 2) — для любого L
  const family = Math.round(I.reverseUnits * I.wrapNow);
  const familyShare = restLife(1, 1);
  const familyKg = r1(family * WEIGHT_KG.reverseAvg * familyShare);
  const fleetKg = r1((I.fleetClasses * fl.built * kdL.kg * fleetYears) / kdL.life);
  const totalForever = r1(kgForever + familyKg + fleetKg);
  const totalDeferred = r1(kgDeferred + family * WEIGHT_KG.reverseAvg + I.fleetClasses * fl.built * kdL.kg);
  // Город
  const city = Math.round(lessWaste(ROP.totalT, I.cityGrowth));
  const F = EXTEND.fixes;
  return {
    K, per, cases: out,
    ratio: {
      ssd: r1(K.ssd240 / F.lapSsdBank.part),
      screen: r1(EXTEND.screenMarket / fixCost(F.phoneScreenBank)),
      bankScreenVsNew: r1(K.phoneDisplay / F.phoneScreenBank.part),
    },
    pilot: { small, phones, laptops, washers, total: small + washers, kgForever, kgDeferred, savedPilot, bankSsd, bankSsdTenge: bankSsd * F.lapSsdBank.part },
    fleet: { ...fl, years: r2(fleetYears), perUnit, hours: fleetHours, classes: I.fleetClasses, newCost: fl.built * kdL.newPrice,
      kg: r1((fl.built * kdL.kg * fleetYears) / kdL.life), times: r1(fl.newPerYear / fl.perYear) },
    family: { n: family, share: r2(familyShare), kg: familyKg, avgKg: WEIGHT_KG.reverseAvg },
    total: { devices: small + washers + family + I.fleetClasses * fl.built, forever: totalForever, deferred: totalDeferred, fleetKg, fleetLaptops: I.fleetClasses * fl.built, fleetDeferred: I.fleetClasses * fl.built * kdL.newPrice },
    spare, city, pilotT: PILOT.goalT, yearPaceT: PILOT.yearPaceT,
    market: { iphonePct: Math.round((MARKET.iphone.withHealth / MARKET.iphone.n) * 100), samsungPct: r1((MARKET.samsung.withHealth / MARKET.samsung.n) * 100) },
    washerAsPhones: Math.round(out.washer8.kgSaved / EXTEND.kinds.phone.kg),
    mac: { left: r2(batteryLeft(5523 / 6249, 2)), end: r2(batteryEnd(5523 / 6249, 2)) },
    I,
  };
}

const ru = (v) => String(v).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const m = model();
  console.log('Kaspi, медианы:', Object.entries(m.K).map(([k, v]) => `${k} ${ru(v)}`).join(' · '));
  console.log('Год жизни новой:', Object.entries(m.per).map(([k, v]) => `${k} ${ru(v)} ₸`).join(' · '));
  for (const c of CASES) {
    const d = m.cases[c.id];
    const b = d.best;
    console.log(`${c.title}\n   T₀ ${ru(Math.round(d.T0 * 100) / 100)} г (слабое: ${d.weakest.name}) → ${d.verdict}` +
      (b ? ` | лучший: ${b.fixes.join('+')} ${ru(b.cost)} ₸, +${ru(Math.round(b.gain * 100) / 100)} г, ${ru(Math.round(b.perYear))} ₸/год` : '') +
      (d.verdict === 'extend' ? ` | в ${ru(Math.round(d.ratio * 10) / 10)} раза дешевле нового, −${ru(d.kgSaved)} кг, сбережёт ${ru(d.saved)} ₸` : ''));
    console.log('   доски:', d.staves.map((s) => `${s.id} ${ru(Math.round(s.rul * 100) / 100)}${s.fix ? ` (→${ru(Math.round(s.fix.rul * 100) / 100)} за ${ru(s.fix.cost)})` : ''}`).join(' · '));
  }
  console.log('Банк против нового: SSD в', m.ratio.ssd, 'раза, экран телефона в', m.ratio.screen, 'раза (деталь — в', m.ratio.bankScreenVsNew, ')');
  console.log('Пилот:', m.pilot);
  console.log('Парк:', { built: m.fleet.built, free: m.fleet.free, scarce: m.fleet.scarce.id, cost: m.fleet.cost, years: m.fleet.years, perYear: Math.round(m.fleet.perYear), times: m.fleet.times, newCost: m.fleet.newCost, kg: m.fleet.kg, hours: m.fleet.hours, missing: m.fleet.missing, units: m.fleet.units.map((u) => u.marginal) });
  console.log('Вторая семья:', m.family, 'Итого:', m.total);
  console.log('Запас хаба', m.spare, 'ч; город +10% жизни →', m.city, 'т в год меньше; рынок iPhone', m.market.iphonePct, '% Samsung', m.market.samsungPct, '%; стиралка =', m.washerAsPhones, 'телефонов; Mac', m.mac);
}
