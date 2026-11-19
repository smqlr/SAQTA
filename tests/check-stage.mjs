// Проверка этапа 2 «Проверка» без браузера: ценность проверки, физика ТЕСТ-30, QAITA Доктор, цифры README.
// Запуск: npm run check-stage   (нужен собранный dist/qaita.html для проверки ссылки: npm run build)
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { EXAMPLES, TEST30, CHECK } from '../src/data.js';
import { checkValue, packChipValue } from '../src/lib/voi.js';
import { runTest30 } from '../src/lib/test30.js';
import { decodePassport, suggestFromPassport } from '../src/lib/doctor.js';
import { model } from '../check/model/check-model.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let failed = 0;
const ok = (cond, msg) => {
  if (cond) console.log(`  ✓ ${msg}`);
  else { failed++; console.log(`  ✗ ${msg}`); }
};
const part = (id, name) => EXAMPLES.find((e) => e.id === id).parts.find((p) => p.name.includes(name));

console.log('1. Ценность проверки (ЦП) = min((1 − P) × K, P × (V − K))');
ok(checkValue(part('a50', 'Экран')) === 108, 'экран A50 с заявкой: ЦП = (1 − 0,7) × 360 = 108 ₸');
ok(checkValue(part('a50', 'Камера')) === 0, 'камера A50 без заявки: ЦП = 0 — рабочая всё равно не окупается');
ok(checkValue(part('lenovo', 'память')) === 6, 'память Lenovo: ЦП = 6 ₸ — снять за минуту дешевле, чем проверять');
ok(checkValue(part('lenovo', 'SSD')) === 18, 'SSD Lenovo: ЦП = 18 ₸');
const cells = part('lenovo', 'ячейки');
const pk = packChipValue({ pCells: cells.pWorks, V: cells.price * 0.9, K: cells.minutes * 60 });
ok(pk.blind === 72 && pk.withChip === 222 && pk.value === 180 && pk.run, `пакет: вслепую ${pk.blind} ₸, с чипом ${pk.withChip} ₸, ЦП чипа ${pk.value} ₸ > ${pk.chipCost} ₸`);
// Перебор: формула совпадает с прямым расчётом «идеальная проверка минус лучшее решение без неё»
let brute = true;
let combos = 0;
for (let i = 1; i <= 19; i++) for (const V of [100, 900, 3600, 6000]) for (const K of [60, 180, 360, 900]) {
  const P = i / 20;
  combos++;
  const direct = P * Math.max(0, V - K) - Math.max(0, P * V - K);
  const f = checkValue({ pWorks: P, price: V, minutes: K / 60, hasOrder: null });
  const viaPrice = checkValue({ pWorks: P, price: V / 0.9, minutes: K / 60, hasOrder: true });
  if (f !== null || Math.abs(viaPrice - Math.round(direct)) > 1) brute = false;
}
ok(brute, `формула ЦП совпадает с прямым расчётом «идеальная проверка минус лучшее решение без неё» на ${combos} комбинациях P, V, K`);

console.log('2. ТЕСТ-30: импульс не меряет ёмкость');
let phys = true; let outliers = true; let safety = true; let noChip = true; let seen = { A: 0, B: 0, C: 0, '?': 0 };
for (let seed = 1; seed <= 40; seed++) {
  const r = runTest30({ seed, packSoh: 86 });
  if (r.results.length !== TEST30.cells) phys = false;
  for (const c of r.results) {
    seen[c.grade]++;
    const pack = r.packs.find((p) => p.id === c.pack);
    if (c.soh != null && (pack.soh == null || c.soh !== Math.round(pack.soh))) phys = false; // ёмкость только от чипа пакета
    if (c.rRel != null && c.rRel > CHECK.outlierRatio && c.soh != null) outliers = false;
    if ((c.uOpen < TEST30.gradeC.minVolt || c.heatC > TEST30.gradeC.maxHeatC) && c.grade !== 'C') safety = false;
    if (pack.soh == null && ['A', 'B'].includes(c.grade)) noChip = false;
    if (c.uOpen >= 3 && (c.current < 1.6 || c.current > 2.1)) phys = false; // у глубоко разряженной ток меньше — это физика
  }
}
ok(phys, 'ёмкость у ячейки — только унаследованная от чипа её пакета; ток импульса 1,6–2,1 А при U ≥ 3 В');
ok(outliers, `выбивается из соседей больше чем в ${String(CHECK.outlierRatio).replace('.', ',')} раза — ёмкость не наследует`);
ok(safety, 'U < 2,5 В или нагрев > 2 °C — всегда C');
ok(noChip, 'без чипа ни A, ни B: только полный цикл Lii-500 или C');
ok(Object.values(seen).every((n) => n > 0), `встречаются все исходы: A ${seen.A}, B ${seen.B}, C ${seen.C}, спорные ${seen['?']}`);
const low = runTest30({ seed: 30, packSoh: 72 });
ok(low.results.filter((c) => c.pack === 'A').every((c) => c.grade !== 'A'), 'пакет 72% — его ячейки не получают A');

console.log('3. QAITA Доктор');
const doctor = join(root, 'check/doctor/qaita-doctor.sh');
const fx = join(root, 'tests/fixtures/doctor-linux');
const linuxEnv = { ...process.env, QAITA_OS: 'Linux', QAITA_ROOT: fx, PATH: `${join(fx, 'bin')}:${process.env.PATH}` };
const lin = decodePassport(execFileSync('sh', [doctor, '--json'], { env: linuxEnv, encoding: 'utf8' }));
ok(lin.ok && lin.battery.design === 50450 && lin.battery.full === 39830 && lin.battery.soh === 79 && lin.battery.cycles === 412, 'Linux: батарея из /sys — 39 830 из 50 450 мВт·ч, 79%, 412 циклов');
ok(lin.ok && lin.device.model === 'ThinkPad T480 (20L5S0AJ00)' && lin.device.ramGB === 8 && lin.device.serial === '...BCDE', 'Linux: модель, память 8 ГБ, серийный номер скрыт до 4 знаков');
ok(lin.ok && lin.disks.length === 1 && lin.disks[0].smart === 'ok' && lin.disks[0].wearPct === 7 && lin.disks[0].hours === 6214, 'Linux: NVMe — SMART в норме, износ 7%, 6 214 ч; флешка Доктора не считается');
ok(lin.ok && suggestFromPassport(lin) === 'donor', 'Linux: батарея 79% → бирка «Донор»');
if (process.platform === 'darwin') {
  const mac = decodePassport(execFileSync('sh', [doctor, '--json'], { encoding: 'utf8' }));
  const b = mac.battery;
  ok(mac.ok && (!b || (b.soh > 0 && b.soh <= 150 && b.cellsMv.length > 0)), `macOS: настоящий чип${b ? ` ${b.chip}: ${b.soh}%, ${b.cycles} циклов, ячейки ${b.cellsMv.join('/')} мВ` : ' — батареи нет'}`);
  ok(mac.ok && mac.disks.length > 0 && mac.disks.every((d) => d.model && !/plist|error/i.test(d.model)), `macOS: диски — ${mac.disks.map((d) => `${d.model} (${d.smart})`).join(', ')}`);
  ok(mac.ok && mac.ms != null && mac.ms < 5000, `macOS: прочитано за ${mac.ms} мс`);
}
const app = join(root, 'dist/qaita.html');
if (existsSync(app)) {
  const out = execFileSync('sh', [doctor, '--no-open', '--app', app], { env: linuxEnv, encoding: 'utf8' });
  const link = out.split('\n').find((l) => l.includes('#hub/doctor='));
  const back = decodePassport(link);
  ok(link?.startsWith('file://') && back.ok && back.battery.full === 39830, 'ссылка на офлайн-файл: file://…#hub/doctor=… читается обратно без потерь');
}
const ps1 = readFileSync(join(root, 'check/doctor/qaita-doctor.ps1'));
const ps1Text = ps1.toString('utf8');
ok(ps1[0] === 0xef && ps1[1] === 0xbb && ps1[2] === 0xbf, 'Windows: файл в UTF-8 с BOM — PowerShell 5.1 прочитает кириллицу');
const code = ps1Text.replace(/'[^'\r\n]*'|"[^"\r\n]*"/g, "''").replace(/#.*$/gm, '');
ok(!/\?\?|\?\.|&&|\|\|/.test(code), 'Windows: без операторов PowerShell 7 (??, ?., &&, ||) — работает в 5.1');
ok(/BatteryStaticData/.test(ps1Text) && /BatteryFullChargedCapacity/.test(ps1Text) && /batteryreport/.test(ps1Text) && /Get-PhysicalDisk/.test(ps1Text), 'Windows: WMI батареи, запасной отчёт powercfg и диски');
ok(!decodePassport('doctor=@@@').ok && !decodePassport('{"qaita":2}').ok && !decodePassport('{"qaita":1,"battery":{"design":100,"full":900}}').ok, 'испорченный или чужой паспорт отклоняется');

console.log('4. Цифры README = расчёт check/model');
const m = model();
const readme = readFileSync(join(root, 'README.md'), 'utf8').replace(/[  ]/g, ' ');
const ru = (v) => { const [a, b] = String(v).split('.'); return a.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (b ? `,${b}` : ''); };
const must = [
  `${ru(m.manualH)} ч`, `${ru(m.manualTenge)} ₸`, `${ru(m.qaitaHandsH)} ч`, `${ru(m.testCell)} ₸`, `${ru(m.fullCell)} ₸`,
  `${ru(m.standPerHour)} ячейк`, `${ru(m.liiCapacity)} полных циклов`, `${ru(m.liiMaxShare)}%`, `${m.manual3Min} мин и ${ru(m.manual3Tenge)} ₸`,
  `${ru(m.inaResMOhm)} мОм`, `+${ru(m.pack.blind)} ₸`, `+${ru(m.pack.withChip)} ₸`, `${m.pack.value} ₸`, `${m.doctorSum} ₸`, `${m.cv.a50screen} ₸`,
  `${ru(m.extraPerDevice)} ₸`,
];
for (const s of must) ok(readme.includes(s), `README содержит «${s}»`);

console.log(failed ? `\nПровалено проверок: ${failed}` : '\nВсе проверки этапа 2 прошли');
process.exit(failed ? 1 : 0);
