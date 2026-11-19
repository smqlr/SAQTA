// Цифры этапа 2 «Проверка» — одна модель, из неё все числа раздела README «Этап 2. Проверка».
// Запуск: node check/model/check-model.mjs   (тест сверяет README с этим расчётом: npm run check-stage)
// Входы: кейс Hack.IT, документация команды (док), src/data.js приложения и оценки этапа 2 (README) — у каждой подпись.
import { pathToFileURL } from 'node:url';
import { EV, EXAMPLES, TEST30, CHECK } from '../../src/data.js';
import { checkValue, packChipValue } from '../../src/lib/voi.js';

export const INPUT = {
  rate: EV.tengePerMinute, // кейс: 900 ₸ / 15 мин = 60 ₸/мин
  cellManualMin: 15, // кейс: ручная проверка ячейки — 15 мин
  cellManualTenge: 900, // кейс: и 900 ₸
  deviceManualTenge: 3000, // кейс: полная проверка устройства — 3 000 ₸
  cellsPilot: 5610, // док: ячеек, проверенных стендом за пилот
  standTenge: 154884, // док: стенд — 166 884 ₸ строки «Диагностика и ТЕСТ-30» без 4 флешек (12 000 ₸)
  cellHandsSec: 10, // док: 10 секунд работы рук на ячейку
  standCells: TEST30.cells, // док: 16 ячеек
  standSec: TEST30.seconds, // док: за 30 секунд
  keptShare: 0.8, // README: доля ячеек A и B — они лежат 7 дней (оценка до калибровки)
  remeasureSec: 3, // README: повторный замер напряжения через 7 дней — мультиметр, 3 с (оценка)
  disputedShare: 0.1, // README: цель — не больше 10% спорных ячеек
  cycleHandsSec: 20, // README: поставить и снять ячейку на Lii-500 — 2 × 10 с
  liiSlots: CHECK.liiSlots, // док: 2 анализатора Lii-500 по 4 слота
  liiCycleH: CHECK.liiCycleH, // README: полный цикл ≈ 8 ч → 1 ячейка на слот за рабочий день
  workDays: 100, // README: ≈ 100 рабочих дней хаба, февраль–июнь 2027 (101 по производственному календарю)
  chipMachineSec: CHECK.chipMachineSec, // замер 18.11: ioreg прочитал чип за 0,015 с
  chipMin: CHECK.chipMin, // README: 30 с человека на чтение чипа
  doctorMin: CHECK.doctorMin, // README: 1 мин человека на QAITA Доктор
  packGood: CHECK.packGoodShare, // README: доля пакетов с SoH ≥ 60% (IBM UrJar: 70%, берём 50%)
  devicesPilot: 20000, // док: 20 000 устройств в хабе
  inaLsbMv: 4, // даташит INA219: шаг напряжения шины 4 мВ
  pulseA: 1.85, // ток импульса: 3,7 В / 2 Ом ≈ 1,85 А
};

const r1 = (v) => Math.round(v * 10) / 10;
const r2 = (v) => Math.round(v * 100) / 100;

export function model(I = INPUT) {
  // Ячейка: тест на стенде (как в документации) и полный путь до продажи
  const standPerCell = I.standTenge / I.cellsPilot;
  const testCell = I.cellHandsSec * (I.rate / 60) + standPerCell;
  const extraSec = I.keptShare * I.remeasureSec + I.disputedShare * I.cycleHandsSec;
  const fullCell = testCell + extraSec * (I.rate / 60);
  // Все ячейки пилота: вручную по кейсу и в QAITA
  const manualH = (I.cellsPilot * I.cellManualMin) / 60;
  const manualTenge = I.cellsPilot * I.cellManualTenge;
  const qaitaHandsH = (I.cellsPilot * (I.cellHandsSec + extraSec)) / 3600;
  const qaitaTenge = I.cellsPilot * fullCell;
  // Пропускная способность стенда: руки (16 × 10 с) + тест 30 с на пачку
  const batchSec = I.standCells * I.cellHandsSec + I.standSec;
  const standPerHour = (3600 / batchSec) * I.standCells;
  const standHours = (I.cellsPilot / I.standCells) * (batchSec / 3600);
  // Полные циклы Lii-500: только в рабочее время
  const liiCapacity = I.liiSlots * Math.floor(8 / I.liiCycleH) * I.workDays;
  const disputed = I.cellsPilot * I.disputedShare;
  // Чип против ручной проверки трёх ячеек (ноутбук команды, 18.11)
  const manual3Min = 3 * I.cellManualMin;
  const manual3Tenge = 3 * I.cellManualTenge;
  // Ценность проверки (ЦП) на деталях из документации
  const ex = (id) => EXAMPLES.find((e) => e.id === id);
  const part = (id, name) => {
    const p = ex(id).parts.find((x) => x.name.includes(name));
    return { ...p, hasOrder: p.hasOrder };
  };
  const a50screen = part('a50', 'Экран');
  const a50cam = part('a50', 'Камера');
  const ram = part('lenovo', 'память');
  const ssd = part('lenovo', 'SSD');
  const cells = part('lenovo', 'ячейки');
  const pSellOrder = EV.pSellWithOrder;
  const pack = packChipValue({ pGood: I.packGood, pCells: cells.pWorks, V: cells.price * pSellOrder, K: cells.minutes * I.rate, chipMin: I.chipMin });
  const cv = {
    a50screen: checkValue(a50screen),
    a50cam: checkValue(a50cam),
    ram: checkValue(ram),
    ssd: checkValue(ssd),
    cells: checkValue(cells),
  };
  const doctorSum = cv.ram + cv.ssd + pack.value;
  // Добавка к обработке устройства (документация: 206 ₸) от повторного замера и полных циклов
  const extraPerDevice = (I.cellsPilot * extraSec * (I.rate / 60)) / I.devicesPilot;
  return {
    standPerCell: r2(standPerCell),
    testCell: r1(testCell),
    extraCell: r1(extraSec * (I.rate / 60)),
    fullCell: r1(fullCell),
    cheaperTest: r1(I.cellManualTenge / testCell),
    cheaperFull: r1(I.cellManualTenge / fullCell),
    manualH: r1(manualH),
    manualTenge,
    qaitaHandsH: r1(qaitaHandsH),
    qaitaTenge: Math.round(qaitaTenge / 1000) * 1000,
    batchSec,
    standPerHour: Math.round(standPerHour),
    standHours: r1(standHours),
    liiCapacity,
    liiMaxShare: r1((liiCapacity / I.cellsPilot) * 100),
    disputed: Math.round(disputed),
    liiLoad: Math.round((disputed / liiCapacity) * 100),
    manual3Min,
    manual3Tenge,
    chipVsHand: Math.round(manual3Tenge / (I.chipMin * I.rate)),
    inaResMOhm: r1(I.inaLsbMv / I.pulseA),
    cv,
    pack,
    doctorSum,
    doctorCost: I.doctorMin * I.rate,
    extraPerDevice: r1(extraPerDevice),
  };
}

const ru = (v) => {
  const [a, b] = String(v).split('.');
  return a.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (b ? `,${b}` : '');
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const m = model();
  const rows = [
    ['Ячейка: тест на стенде (документация)', `10 ₸ рук + ${ru(m.standPerCell)} ₸ стенда = ${ru(m.testCell)} ₸ (в ${ru(m.cheaperTest)} раза дешевле 900 ₸)`],
    ['Ячейка: повторный замер через 7 дней и полный цикл спорных', `+${ru(m.extraCell)} ₸ → всего ${ru(m.fullCell)} ₸ (в ${ru(m.cheaperFull)} раза дешевле)`],
    ['5 610 ячеек вручную (кейс)', `${ru(m.manualH)} ч и ${ru(m.manualTenge)} ₸`],
    ['5 610 ячеек в QAITA', `${ru(m.qaitaHandsH)} ч рук и ≈ ${ru(m.qaitaTenge)} ₸`],
    ['Стенд: пачка 16 ячеек', `${m.batchSec} с (160 с рук + 30 с тест) → ${ru(m.standPerHour)} ячеек в час, весь пилот — ${ru(m.standHours)} ч`],
    ['Lii-500: полных циклов за пилот', `${ru(m.liiCapacity)} → хватает, если спорных ≤ ${ru(m.liiMaxShare)}%; при 10% (${ru(m.disputed)}) загрузка ${m.liiLoad}%`],
    ['Три ячейки ноутбука команды', `вручную ${m.manual3Min} мин и ${ru(m.manual3Tenge)} ₸; чип — 0,015 с машины и 30 с человека (в ${m.chipVsHand} раз дешевле)`],
    ['Разрешение INA219 по R', `4 мВ / 1,85 А ≈ ${ru(m.inaResMOhm)} мОм`],
    ['ЦП: экран A50 / камера A50', `${m.cv.a50screen} ₸ / ${m.cv.a50cam} ₸`],
    ['ЦП: память / SSD / ячейки Lenovo', `${m.cv.ram} ₸ / ${m.cv.ssd} ₸ / ${m.cv.cells} ₸`],
    ['Пакет батареи: вслепую / с чипом / ЦП чипа', `${m.pack.blind} ₸ / ${m.pack.withChip} ₸ / ${m.pack.value} ₸ при цене чтения ${m.pack.chipCost} ₸`],
    ['QAITA Доктор на Lenovo', `${m.cv.ram} + ${m.cv.ssd} + ${m.pack.value} = ${m.doctorSum} ₸ > ${m.doctorCost} ₸ → запускаем`],
    ['Добавка к обработке устройства', `+${ru(m.extraPerDevice)} ₸ на устройство (206 ₸ в документации)`],
  ];
  const w = Math.max(...rows.map((r) => r[0].length));
  console.log('Этап 2 «Проверка» — расчёт\n');
  for (const [k, v] of rows) console.log(`${k.padEnd(w)}  ${v}`);
}
