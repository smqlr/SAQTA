// Цифры этапа 3 «Сортировка» — одна модель, из неё все числа раздела README «Этап 3. Сортировка».
// Запуск: node sort/model/sort-model.mjs   (тест сверяет README и src/data.js с этим расчётом: npm run sort-stage)
// Входы: прайсы скупщиков на OLX.kz (номер объявления, город, дата), Kaspi (Актобе), кейс, документация команды (док)
// и дерево разборки из src/data.js. Медиану берём, чтобы один щедрый или жадный скупщик не двигал цену.
import { pathToFileURL } from 'node:url';
import { SORT_BINS, SORT_FLAG, SORT_TREES, TYPE_KG, RAW, RAW_PILOT_TENGE, ROP, EV } from '../../src/data.js';
import { planFor, solve, fullValue, massOf } from '../../src/lib/sort.js';

const olx = (id) => `https://www.olx.kz/d/obyavlenie/${id}`; // короткая ссылка: полная — в поле url
// Прайсы скупщиков плат: одна сеть объявлений «Приём плат и микросхем», цены за 1 кг, платы без железа и алюминиевых радиаторов
export const BOARD_BUYERS = [
  { id: 345707504, city: 'Астана', date: '2026-11-18', url: 'https://www.olx.kz/d/obyavlenie/priem-platy-i-mikroshem-IDnoyju.html',
    ram: [26000, 27000], boardLaptop: 3000, boardLaptopFlag: 5500, boardPhone: 13000, phones: 2000, boardHome: 550 },
  { id: 392172853, city: 'Петропавловск', date: '2026-11-18', url: 'https://www.olx.kz/d/obyavlenie/priem-platy-i-mikroshem-IDqxv4B.html',
    ram: 20000, boardLaptop: 3000, boardPhone: 10000, phones: 1000, boardHome: 400 },
  { id: 379353358, city: 'Семей', date: '2026-11-18', url: 'https://www.olx.kz/d/obyavlenie/priem-plat-i-mikroshem-dorogo-IDpFJ8y.html',
    ram: 25000, boardLaptop: 2200, boardLaptopFlag: 4500, boardPhone: 12000, phones: 1500, boardHome: 500 },
  { id: 402770109, city: 'Щучинск', date: '2026-11-15', url: 'https://www.olx.kz/d/obyavlenie/priem-plat-i-mikroshem-v-g-schuchinsk-IDrfYU5.html',
    ram: 24000, boardLaptop: 2500, boardLaptopFlag: 4000, boardPhone: 11000, phones: 1500, boardHome: 400 },
  { id: 388910020, city: 'Павлодар', date: '2026-11-04', url: 'https://www.olx.kz/d/obyavlenie/priem-plat-i-mikroshem-IDqjPgg.html',
    ram: [15000, 20000], boardLaptop: 4000, boardPhone: 10000, phones: [1200, 2000], boardHome: 400, alkaline: [150, 170] },
];
// Металл и кабель: ближайшие к хабу прайсы (Актобе, Уральск) и цены кабеля из прайсов цветмета
export const METAL_BUYERS = [
  { id: 394529785, city: 'Актобе', date: '2026-11-18', url: 'https://www.olx.kz/d/obyavlenie/priem-metalla-v-aktobe-med-latun-alyuminiy-akb-tsink-banka-IDqHpdD.html', copper: 3800, alum: 620 },
  { id: 394529762, city: 'Актобе', date: '2026-11-17', url: 'https://www.olx.kz/d/obyavlenie/prinimaem-tsvetnye-metally-IDqHpdg.html', copper: 4700, alum: 740, steel: 40 },
  { id: 323335383, city: 'Уральск', date: '2026-11-18', url: 'https://www.olx.kz/d/obyavlenie/metal-dorogo-metallolom-priem-metalla-chermet-tsvetmet-IDlSGiP.html', copper: 3900, alum: 600, steel: 45 },
  { id: 401045968, city: 'Уральск', date: '2026-11-17', url: 'https://www.olx.kz/d/obyavlenie/priem-metala-metalolom-metal-dorogo-metalopriemka-IDr8Knm.html', copper: 3900, alum: 600, steel: 45 },
];
// Медный кабель: «цена от процента меди» — берём нижние границы (тонкий шнур, мало меди)
export const CABLE_BUYERS = [
  { id: 400086072, city: 'Алматы', date: '2026-11-19', low: 1000, high: 3000 },
  { id: 400261531, city: 'Астана', date: '2026-11-17', low: 800, high: 4000 },
  { id: 403151501, city: 'Алматы', date: '2026-11-19', low: 800, high: 1100 },
  { id: 330427939, city: 'Усть-Каменогорск', date: '2026-11-18', low: 1000, high: null },
];
export const MOTOR_BUYER = { id: 330427939, city: 'Усть-Каменогорск', date: '2026-11-18', motor: 250 }; // «электродвигатели от 250»

// Сортировочная стена «свет над ящиком» — Kaspi, Актобе, 19.11.2026
export const WALL_BOM = [
  { item: 'ESP32-WROOM-32 (Dev Board, Type-C)', n: 1, price: 3488 },
  { item: 'Полоска WS2812B, 8 светодиодов — по одной над каждым бином', n: SORT_BINS.length, price: 750 },
  { item: 'Блок питания 5 В 2 А', n: 1, price: 800 },
  { item: 'Весы 5 кг с шагом 1 г (ОЗУ и платы — по граммам)', n: 1, price: 1650 },
];

export const INPUT = {
  rate: EV.tengePerMinute, // кейс: 900 ₸ / 15 мин
  pilot: { phone: 6400, laptop: 2000, screen: 600, small: 4400 }, // док: «Бонусный кошелёк: сколько стоит» — штуки по видам
  devicesPilot: 20000, // док: 20 000 устройств в хабе; зарядки и кабели — остаток: 20 000 − 13 400
  cordShare: 0.5, // README: оценка — половина мелкой техники и экранов приходит со шнуром; проверим журналом хаба
  hubHours: 1300, // док: доступно 1 300 часов работы рук
  hubHoursUsed: 1146, // док: на 20 000 устройств нужно 1 146 часов
  reserve: 393559, // док: резерв 393 559 ₸ (3,9%)
  goldShred: 25.6, // Chancerel и др., 2009: после шредера в извлекаемые фракции попадает 25,6% золота и палладия
  fireLiion: 48, // Eunomia для ESA, Великобритания 2019–2020: 48% пожаров на объектах отходов — литий-ионные батареи
  caseLaptopMin: [25, 30], // кейс: разборка ноутбука 25–30 мин
};

export const median = (arr) => {
  const v = arr.map((x) => (Array.isArray(x) ? (x[0] + x[1]) / 2 : x)).filter((x) => x != null).sort((a, b) => a - b);
  const n = v.length;
  return n % 2 ? v[(n - 1) / 2] : (v[n / 2 - 1] + v[n / 2]) / 2;
};

const r1 = (v) => Math.round(v * 10) / 10;
const r2 = (v) => Math.round(v * 100) / 100;

export function prices() {
  const col = (k) => BOARD_BUYERS.map((b) => b[k]).filter((x) => x != null);
  return {
    ram: median(col('ram')),
    boardPhone: median(col('boardPhone')),
    boardLaptop: median(col('boardLaptop')),
    boardLaptopFlagMax: Math.max(...col('boardLaptopFlag')),
    phones: median(col('phones')),
    boardHome: median(col('boardHome')),
    cable: median(CABLE_BUYERS.map((c) => c.low)),
    alum: median(METAL_BUYERS.map((m) => m.alum)),
    steel: median(METAL_BUYERS.map((m) => m.steel).filter((x) => x != null)),
    copper: median(METAL_BUYERS.map((m) => m.copper)),
    motor: MOTOR_BUYER.motor,
    alkaline: median(col('alkaline')),
  };
}

// Типовые вещи пилота: дерево по виду, без деталей этапа 2 (их снимает этап 2, когда есть спрос)
const item = (type, exampleId) => ({ type, exampleId, tag: 'raw' });
export const DEVICES = {
  laptop: item('laptop', 'lenovo'),
  phone: item('phone', 'galaxyj'),
  phoneButton: item('phone', 'nokia105'),
  screen: item('screen', 'tv'),
  small: item('small', 'kettle'),
  gadget: item('small', 'headphones'),
  cable: item('cable', 'cables'),
};

export function model(I = INPUT) {
  const P = prices();
  const plans = Object.fromEntries(Object.entries(DEVICES).map(([k, it]) => [k, planFor(it)]));
  // Lenovo после этапа 2: память, SSD и ячейки сняты под заказ
  const lenovoParts = ['Оперативная память', 'SSD', '3 ячейки 18650'];
  const lenovo2 = planFor(item('laptop', 'lenovo'), { bankParts: lenovoParts });
  const lenovoFlag = planFor(item('laptop', 'lenovo'), { bankParts: lenovoParts, prices: { [SORT_FLAG.bin]: SORT_FLAG.price } });
  const boardRow = lenovo2.rows.find((r) => r.id === 'lpCore' && r.kind === 'open');
  // Смартфон: при каком времени «крышка + батарея» вскрытие окупается
  const ph = plans.phone;
  const tree = SORT_TREES.phone;
  const ctxPh = { ...ph.ctx };
  const body = solve(tree.children.find((c) => c.id === 'phBody'), ctxPh);
  const phoneBreakEvenMin = r2((body.value - ph.asIs) / I.rate);
  const phoneOpenMin = tree.access.min + tree.children.find((c) => c.id === 'phBat').take;
  // Пилот: что даёт дерево без вскрытия корпусов — шнуры и провода (устойчивые решения, не зависят от масс плат)
  const pilot = {};
  pilot.cable = I.devicesPilot - Object.values(I.pilot).reduce((a, b) => a + b, 0);
  const gain = (k) => r2(plans[k].value - plans[k].asIs);
  const robust = {
    small: { n: I.pilot.small * I.cordShare, gain: gain('small'), min: plans.small.minutes },
    screen: { n: I.pilot.screen * I.cordShare, gain: gain('screen'), min: plans.screen.minutes },
    cable: { n: pilot.cable, gain: gain('cable'), min: plans.cable.minutes },
  };
  const robustTenge = Math.round(Object.values(robust).reduce((a, r) => a + r.n * r.gain, 0));
  const robustHours = r1(Object.values(robust).reduce((a, r) => a + r.n * r.min, 0) / 60);
  // «Разобрать всё до материалов» против дерева — на всех вещах пилота
  const counts = { laptop: I.pilot.laptop, phone: I.pilot.phone, screen: I.pilot.screen, small: I.pilot.small, cable: pilot.cable };
  let fullHours = 0;
  let fullLoss = 0;
  for (const [k, n] of Object.entries(counts)) {
    fullHours += (n * plans[k].fullMin) / 60;
    fullLoss += n * (plans[k].value - plans[k].full);
  }
  const wall = WALL_BOM.reduce((a, b) => a + b.n * b.price, 0);
  const ropIT = ROP.rows.find((r) => r.name.startsWith('Телефоны')).rate;
  const ropSmall = ROP.rows.find((r) => r.name.startsWith('Мелкая')).rate;
  const tKg = (k) => r2(massOf(SORT_TREES[k], { typeKg: TYPE_KG[k] }));
  return {
    prices: P,
    flag: { price: SORT_FLAG.price, max: P.boardLaptopFlagMax },
    spread: {
      ramVsLaptop: Math.round(P.ram / RAW.find((r) => r.id === 'laptop').perKg),
      phoneBoardVsPhone: Math.round(P.boardPhone / RAW.find((r) => r.id === 'phone').perKg),
      boardPhoneVsHome: Math.round(P.boardPhone / P.boardHome),
      cableVsSmall: Math.round(P.cable / RAW.find((r) => r.id === 'small').perKg),
    },
    plans, lenovo2, lenovoFlag,
    boardThreshold: boardRow?.threshold?.price,
    phoneBreakEvenMin, phoneOpenMin,
    cordPerMin: Math.round(gain('small') / plans.small.minutes),
    robust, robustTenge, robustHours, robustShare: r1((robustTenge / RAW_PILOT_TENGE) * 100),
    fullHours: Math.round(fullHours), fullLoss: Math.round(fullLoss),
    hubHours: I.hubHours, spareHours: I.hubHours - I.hubHoursUsed,
    wall, reserveAfter: I.reserve - wall,
    ropRatio: r1(ropIT / ropSmall), ropIT, ropSmall,
    treeKg: { laptop: tKg('laptop'), phone: tKg('phone'), screen: tKg('screen'), small: tKg('small'), cable: tKg('cable') },
    laptopFullMin: fullValue(SORT_TREES.laptop, { ...plans.laptop.ctx, removed: new Set(), opened: new Set() }).min,
    I,
  };
}

const ru = (v) => String(v).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const m = model();
  console.log('Цены скупщиков (медианы), ₸/кг:', Object.entries(m.prices).map(([k, v]) => `${k} ${ru(v)}`).join(' · '));
  console.log(`Разброс: ОЗУ дороже ноутбука целиком в ${m.spread.ramVsLaptop} раз, плата телефона дороже телефона в ${m.spread.phoneBoardVsPhone} раз, провод дороже мелкой бытовой в ${m.spread.cableVsSmall} раз`);
  for (const [k, p] of Object.entries(m.plans)) console.log(`${k}: целиком ${ru(p.asIs)} · всё ${ru(p.full)} (${ru(p.fullMin)} мин) · дерево ${ru(p.value)} (${ru(p.minutes)} мин)`);
  console.log(`Lenovo после этапа 2: ${ru(m.lenovo2.value)} ₸, с «жёлтым флажком» ${ru(m.lenovoFlag.value)} ₸; порог платы ${ru(m.boardThreshold)} ₸/кг`);
  console.log(`Смартфон: вскрытие окупается, если крышка и батарея снимаются быстрее ${ru(m.phoneBreakEvenMin)} мин (сейчас ${ru(m.phoneOpenMin)})`);
  console.log(`Шнур: +${ru(r2(m.plans.small.value - m.plans.small.asIs))} ₸ за 9 с — ${m.cordPerMin} ₸/мин`);
  console.log(`Пилот: шнуры и провода +${ru(m.robustTenge)} ₸ (${ru(m.robustShare)}% к сырью команды) за ${ru(m.robustHours)} ч; запас мощности ${m.spareHours} ч`);
  console.log(`«Разобрать всё»: ${ru(m.fullHours)} ч (у хаба ${m.hubHours} ч) и −${ru(m.fullLoss)} ₸ против дерева`);
  console.log(`Стена: ${ru(m.wall)} ₸, резерв после — ${ru(m.reserveAfter)} ₸; ставки РОП различаются в ${ru(m.ropRatio)} раза`);
  console.log('Массы деревьев:', m.treeKg, 'полная разборка ноутбука', m.laptopFullMin, 'мин');
}
