// Сквозной сценарий демо в настоящем браузере (Playwright), офлайн, с проверкой чисел.
// Запуск: npm run build && npm test   (SHOTS=папка — сохранить скриншоты шагов)
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { APP_FILE } = await import(pathToFileURL(join(root, 'src/data.js')).href);
const FILE = pathToFileURL(join(root, 'dist', `${APP_FILE}.html`)).href;
const SHOTS = process.env.SHOTS;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });

let failed = 0;
const ok = (cond, msg) => {
  if (cond) console.log(`  ✓ ${msg}`);
  else { failed++; console.log(`  ✗ ${msg}`); }
};
const digits = (s) => Number(String(s).replace(/[^\d]/g, ''));
// Поиск адреса: набрать текст и выбрать первую подсказку
async function pickAddress(input, text) {
  await page.fill(input, text);
  await page.waitForSelector(`${input}-list .sugg-i`);
  const first = (await page.textContent(`${input}-list .sugg-i`)).trim();
  await page.click(`${input}-list .sugg-i`);
  await page.waitForTimeout(150);
  return first;
}

// Браузер: Chromium из `npx playwright install chromium`, а если его нет — установленный Google Chrome
async function launch() {
  if (process.env.PW_CHANNEL) return chromium.launch({ channel: process.env.PW_CHANNEL });
  try { return await chromium.launch(); } catch { return chromium.launch({ channel: 'chrome' }); }
}
const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, colorScheme: 'light' });
const external = [];
await ctx.route('**/*', (r) => {
  const u = r.request().url();
  if (/^(file|data|blob):/.test(u)) return r.continue();
  external.push(u);
  return r.abort();
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

const go = async (screen) => { await page.evaluate((s) => { location.hash = s; }, screen); await page.waitForTimeout(250); };
const shot = async (name) => { if (SHOTS) await page.screenshot({ path: join(SHOTS, `${name}.png`), fullPage: true }); };
// Плитки карты: средняя яркость (0–255) и доля насыщенных пикселей (жёлтые дороги, яркая зелень)
const tileStats = (p) => p.$$eval('.qmap canvas.leaflet-tile', (cs) => {
  let n = 0, sat = 0, lum = 0;
  for (const c of cs) {
    const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    for (let i = 0; i < d.length; i += 64) {
      const mx = Math.max(d[i], d[i + 1], d[i + 2]), mn = Math.min(d[i], d[i + 1], d[i + 2]);
      n++;
      lum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
      if (mx > 40 && (mx - mn) / mx > 0.25) sat++;
    }
  }
  return { lum: n ? lum / n : 0, sat: n ? sat / n : 0 };
});
const balance = async () => { await go('wallet'); return digits(await page.textContent('[data-testid="balance"]')); };
const reset = async (preset) => {
  await page.click('#menuBtn');
  await page.click(`.menu [data-act="${preset}"]`);
  await page.waitForTimeout(200);
};

await page.goto(FILE);

console.log('0. Знакомство с Сактиком и карта донора');
await page.waitForSelector('.onb');
ok(await page.isVisible('.onb .m-body'), 'обучение ведёт Сактик');
for (let i = 0; i < 4; i++) await page.click('[data-onb="next"]');
await page.fill('#onbName', 'Айгерим');
await page.click('[data-onb="issue"]');
const cardId = (await page.textContent('.onb .dcard-id')).replace(/\s/g, '');
const luhn = (s) => { let sum = 0; for (let i = 0; i < s.length; i++) { let d = +s[s.length - 1 - i]; if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; } sum += d; } return sum % 10 === 0; };
ok(/^\d{12}$/.test(cardId) && luhn(cardId), `карта донора: 12 цифр, контроль по Луну (${cardId})`);
ok((await page.textContent('.onb .dcard-name')).includes('АЙГЕРИМ') || (await page.textContent('.onb .dcard-name')).includes('Айгерим'), 'имя на карте');
await page.click('[data-onb="done"]');
await page.waitForTimeout(200);
ok(!(await page.$('.onb')) && (await page.textContent('#view')).includes('Айгерим'), 'главная: приветствие по имени');
const tiles = () => page.$eval('.hscroll', (c) => ({
  overflow: c.scrollWidth > c.clientWidth,
  bar: getComputedStyle(c).scrollbarWidth,
  hidden: getComputedStyle(c, '::-webkit-scrollbar').display === 'none',
  l: c.classList.contains('more-l'), r: c.classList.contains('more-r'),
  mask: getComputedStyle(c).maskImage || getComputedStyle(c).webkitMaskImage,
  x: c.scrollLeft,
}));
const t0 = await tiles();
ok(t0.overflow && t0.bar !== 'none' && !t0.hidden, `«Что можно сдать»: ряд прокручивается, ползунок виден (scrollbar-width: ${t0.bar})`);
ok(t0.r && !t0.l && /gradient/.test(t0.mask), 'в начале ряда правый край плавно гаснет, левый — нет');
await page.hover('.hscroll');
await page.mouse.wheel(0, 2000);
await page.waitForTimeout(300);
const t1 = await tiles();
ok(t1.x > 0 && t1.l && !t1.r, 'колесо докручивает ряд до конца: затухание слева, последняя плитка видна целиком');
await page.$eval('.hscroll', (c) => { c.scrollLeft = 0; });

console.log('1. Чистый старт');
await reset('clean');
ok((await balance()) === 0, 'баланс 0');

console.log('2. Житель: подтемы, пример «Lenovo IdeaPad» → школьный короб → QR');
await go('resident');
const cats = await page.$$eval('.cat', (els) => els.map((e) => e.dataset.cat));
ok(cats.length === 5, `подтем техники: ${cats.length}`);
for (const c of cats) {
  await page.click(`[data-cat="${c}"]`);
  const n = await page.$$eval('.examples .ex', (els) => els.length);
  ok(n >= 4 && n <= 5, `подтема «${await page.textContent(`[data-cat="${c}"]`)}»: ${n} устройств`);
}
await page.click('[data-cat="digital"]');
const catBar = await page.$eval('.cats', (c) => ({
  overflow: c.scrollWidth > c.clientWidth,
  bar: getComputedStyle(c).scrollbarWidth,
  hidden: getComputedStyle(c, '::-webkit-scrollbar').display === 'none',
}));
ok(catBar.overflow && catBar.bar !== 'none' && !catBar.hidden, `ряд подтем прокручивается, ползунок виден (scrollbar-width: ${catBar.bar})`);
await page.hover('.cats');
await page.mouse.wheel(0, 300);
await page.waitForTimeout(150);
ok((await page.$eval('.cats', (c) => c.scrollLeft)) > 0, 'колесо мыши сдвигает ряд подтем');
await page.$eval('.cats', (c) => { c.scrollLeft = 0; });
await page.click('[data-example="lenovo"]');
ok((await page.textContent('#view')).includes('+200'), 'в карточке +200 бонусов за ноутбук');
await shot('02-card');
await page.click('[data-go="method"]');
await page.waitForSelector('.qmap .leaflet-tile-loaded');
ok((await page.$$('.qmap .qpin')).length === 40, 'на карте 40 школ Донор-лиги');
const painted = await page.$$eval('.qmap canvas.leaflet-tile', (cs) => cs.filter((c) => {
  const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
  const seen = new Set();
  for (let i = 0; i < d.length; i += 64) seen.add(`${d[i]},${d[i + 1]},${d[i + 2]}`);
  return seen.size > 4; // улицы, дома, зелень — не однотонная заливка
}).length);
ok(painted > 0, `плитки карты нарисованы из встроенных данных OSM (${painted})`);
const quiet = await tileStats(page);
ok(quiet.sat < 0.01,`подложка тихая: ярких пикселей ${(quiet.sat * 100).toFixed(1)} % (нет жёлтых дорог)`);
const pinsFull = (await page.$$('.qmap .qpin:not(.mini)')).length;
const pinsMini = (await page.$$('.qmap .qpin.mini')).length;
ok(pinsFull >= 4 && pinsFull <= 5 && pinsFull + pinsMini === 40, `видно главное: ${pinsFull} ближайшие школы метками, ещё ${pinsMini} — точками`);
const dists = await page.$$eval('.pick-row', (rows) => rows.map((r) => {
  const t = r.querySelector('.nowrap').textContent.replace(/\s/g, '').replace(',', '.');
  return t.endsWith('км') ? parseFloat(t) * 1000 : parseFloat(t);
}));
ok(dists.length === 4 && dists.every((d, i) => i === 0 || d >= dists[i - 1]), `ближайшие школы по расстоянию: ${dists.join(', ')} м`);
await page.click('.pick-row:nth-child(2)');
const chosen = (await page.textContent('.pick-row[aria-pressed="true"] b')).trim();
await page.click('[data-method="box"]');
await page.waitForTimeout(200);
ok((await page.$$('.qmap .qpin')).length === 5, 'боксы в ЦОН и вузах: 5 на карте');
await page.click('[data-method="school"]');
await page.waitForTimeout(200);
await page.click('.pick-row:nth-child(2)');
await page.click('[data-submit]');
const receiptNo = (await page.textContent('.receipt h2')).trim();
ok(/^D-\d{6}$/.test(receiptNo), `квитанция ${receiptNo}`);
ok(await page.isVisible('.receipt svg.qr'), 'QR-код нарисован');
const receiptText = await page.textContent('.receipt');
ok(receiptText.includes(chosen) && /улица|проспект|микрорайон|переулок/.test(receiptText), `в квитанции школа и адрес: ${chosen}`);
await shot('02-receipt');

console.log('3. Хаб: триаж, «Спроси устройство», ТЕСТ-30, банк деталей');
await page.click('[data-to-hub]');
await page.waitForTimeout(300);
ok((await page.textContent('.qi[aria-current="true"]')).includes(receiptNo), 'в хабе выбрано устройство жителя');
await page.click('[data-confirm]');
await page.waitForTimeout(200);
ok((await balance()) === 200, 'после триажа баланс 200');
await go('hub');
await page.click('[data-ask]');
await page.setInputFiles('#brFile', join(root, 'tests/fixtures/battery-report.html'));
await page.waitForSelector('[data-save]');
ok((await page.textContent('.sheet')).includes('80%'), 'battery-report.html разобран: SoH 80%');
await page.click('[data-save]');
await page.waitForTimeout(200);
await page.click('#view [data-run]:not([data-run=""])');
await page.waitForTimeout(2600);
const grades = await page.$$eval('.cells .grade', (els) => els.map((e) => e.textContent.trim()));
ok(grades.length === 16 && grades.every((g) => /^[ABC?]$/.test(g)), `ТЕСТ-30: 16 ячеек с грейдами (${grades.join('')})`);
const disputed = Number(await page.textContent('[data-testid="disputed"]'));
const liiCells = await page.$$eval('.cells .cell', (els) => els.filter((e) => e.textContent.includes('Lii-500')).length);
ok(disputed > 0 && liiCells === disputed, `ТЕСТ-30: спорных ${disputed} — у них ёмкость неизвестна, идут на Lii-500`);
ok((await page.textContent('#test30')).includes('не ёмкость'), 'ТЕСТ-30 честно пишет: импульс меряет не ёмкость');
const doctorLine = (await page.textContent('[data-testid="doctor-line"]')).replace(/[\u00a0\u202f]/g, ' ');
ok(doctorLine.includes('204 ₸') && doctorLine.includes('запускаем') && doctorLine.includes('222 ₸'), 'ноутбук: SAQTA Доктор окупается — ЦП 204 ₸ > 60 ₸, пакет с чипом 222 ₸');
ok(await page.isVisible('#t30chart'), 'кривые напряжения нарисованы');
await shot('03-hub');
await page.click('button:has-text("Детали проданы")');
await page.waitForTimeout(200);
ok((await balance()) === 1320, 'после продажи деталей баланс 1 320 (+1 120 роялти)');
ok((await page.textContent('#view')).includes('Твой ноутбук спас 3 устройства'), 'уведомление донору');
await shot('04-wallet');

console.log('3б. Этап 3: сортировка по дереву разборки');
const norm = (t) => t.replace(/[\u00a0\u202f]/g, ' ');
const sortPlan = async () => norm(await page.textContent('[data-testid="sort-plan"]'));
const litBins = () => page.$$eval('[data-testid="wall"] .bin.lit', (els) => els.map((e) => e.dataset.bin).join(','));
await go('hub');
await page.click(`.qi:has-text("${receiptNo}")`);
await page.waitForTimeout(150);
let sp = await sortPlan();
ok(sp.includes('сделано на этапе 2') && /Вынуть плату, снять радиатор[\s\S]*не окупается[\s\S]*4 557 ₸\/кг[\s\S]*не делаем/.test(sp), 'Lenovo после этапа 2: плату не вынимаем — окупится, если плата дороже 4 557 ₸/кг');
await page.check('[data-flag]');
await page.waitForTimeout(200);
sp = await sortPlan();
ok(/Вынуть плату, снять радиатор[\s\S]*вскрытие даёт \+142 ₸[\s\S]*делаем/.test(sp), 'плата «с жёлтым флажком» 5 500 ₸/кг: дерево само решает вынуть плату (+142 ₸)');
await page.click('[data-sort]');
await page.waitForTimeout(250);
ok((await litBins()) === 'boardLaptop,rest', `свет над ящиками: ${await litBins()}`);
const boardBin = norm(await page.textContent('[data-bin="boardLaptop"]'));
ok(boardBin.includes('0,15 кг') && boardBin.includes('825 ₸'), 'в ящике «Платы ноутбуков» 0,15 кг ≈ 825 ₸');
await shot('03b-sort');
await page.click('[data-lot="boardLaptop"]');
await page.waitForTimeout(200);
const lotsText = norm(await page.textContent('[data-testid="lots"]'));
ok(lotsText.includes('P-0001') && lotsText.includes('Платы ноутбуков') && lotsText.includes('Батарей нет'), 'партия P-0001 с паспортом: платы ноутбуков, батарей нет');
await page.uncheck('[data-flag]');
await page.waitForTimeout(150);

console.log('4. EV по формуле из документации (Samsung A50)');
await go('hub');
await page.click('.qi:has-text("D-000781")');
await page.waitForTimeout(200);
const evText = (await page.textContent('#view table')).replace(/[\u00a0\u202f]/g, ' ');
ok(evText.includes('+2 160 ₸'), 'экран A50: EV = +2 160 ₸');
ok(evText.includes('−36 ₸'), 'камера A50: EV = −36 ₸');
const cps = (await page.$$eval('[data-testid="cp"]', (els) => els.map((e) => e.textContent))).map((t) => t.replace(/[\u00a0\u202f]/g, ' '));
ok(cps[0].includes('108 ₸') && cps[0].includes('не включается'), 'экран A50: ЦП 108 ₸, до снятия не проверить — не включается');
ok(cps[1].includes('0 ₸') && cps[1].includes('ничего не изменит'), 'камера A50: ЦП 0 ₸ — проверка ничего не изменит');
const planA50 = await page.textContent('[data-testid="plan"]');
ok(planA50.includes('10 минут на зарядке') && planA50.includes('Стирание данных') && !planA50.includes('Экран блокировки'), 'план проверки A50 (не включается): зарядка, стирание; экрана блокировки нет');
await page.click('.qi:has-text("D-000783")');
await page.waitForTimeout(150);
const planScooter = await page.textContent('[data-testid="plan"]');
ok(planScooter.includes('Дальше не проверяем') && !planScooter.includes('Стирание'), 'вздутая батарея самоката: только приём, дальше не проверяем');

console.log('5. Вывод на карту (макет)');
await go('wallet');
await page.click('[data-act="withdraw"]');
await page.fill('#wAmount', '500');
await page.click('.sheet button[type="submit"]');
ok((await page.textContent('.sheet')).includes('Минимум для вывода'), 'сумма < 1 000 отклонена');
await page.fill('#wAmount', '1000');
await page.click('.sheet button[type="submit"]');
await page.fill('#wCard', '4111111111111112');
await page.click('.sheet button[type="submit"]');
ok((await page.textContent('.sheet')).includes('не прошёл проверку'), 'неверная карта отклонена (Luhn)');
await page.fill('#wCard', '4111111111111111');
await page.click('.sheet button[type="submit"]');
await page.fill('#wCode', '0000');
await page.click('.sheet button[type="submit"]');
ok((await page.textContent('.sheet')).includes('Неверный код'), 'неверный код отклонён');
await page.fill('#wCode', '1234');
await page.click('.sheet button[type="submit"]');
ok((await page.textContent('.sheet')).includes('Заявка на вывод принята'), 'вывод принят');
await shot('05-withdraw');
await page.click('.sheet [data-close]');
ok((await balance()) === 320, 'после вывода баланс 320');

console.log('6. Магазин → адрес доставки → экипаж с маршрутом → акимат');
await go('shop');
ok(await page.isChecked('#pickupOld'), 'галочка «вывезти старую технику» стоит по умолчанию');
await page.click('[data-order]');
ok(await page.isVisible('#destErr'), 'без адреса заказ не оформляется');
const dest = await pickAddress('#dAddr', 'Абилкайыр хана 40');
ok(dest === 'проспект Абилкайыр Хана, 40', `адрес найден: ${dest}`);
await page.click('[data-order]');
ok((await page.textContent('.receipt')).includes(dest), 'адрес в заказе');
await page.click('button[data-mode="crew"]');
await page.waitForSelector('[data-testid="crew-route"]');
const crewKm = parseFloat((await page.textContent('[data-testid="crew-route"]')).replace(',', '.'));
ok(crewKm > 1 && crewKm < 40, `маршрут экипажа по улицам: ${crewKm} км`);
ok(await page.$$eval('.qmap path.leaflet-interactive, .qmap svg path', (p) => p.length) > 0, 'линия маршрута на карте');
await page.click('[data-pick]');
await go('akimat');
ok((await page.textContent('[data-testid="tonnes"]')).startsWith('0,05'), 'на счётчике акимата 0,05 т (+50 кг)');
await shot('06-akimat');

console.log('6б. Каталог магазина: выбирается ровно один товар');
await go('shop');
await page.click('button[data-mode="buyer"]');
await page.click('[data-new]');
const items = await page.$$eval('.shop-item', (els) => els.length);
ok(items >= 5, `в каталоге ${items} товаров`);
await page.click('[data-item="freezer"]');
await page.click('[data-item="tv"]');
const checked = await page.$$eval('.shop-item[aria-checked="true"]', (els) => els.map((e) => e.dataset.item));
ok(checked.length === 1 && checked[0] === 'tv', `выбран один товар: ${checked.join(', ')}`);
ok((await page.textContent('[data-order]')).includes('телевизор'), 'кнопка заказа называет выбранный товар');
await shot('06-shop');

console.log('6в. Карта сбора у акимата');
await go('akimat');
await page.waitForSelector('.qmap .leaflet-tile-loaded');
const akPins = (await page.$$('.qmap .qpin')).length;
ok(akPins >= 47, `на карте акимата ${akPins} точек: школы, боксы, хаб, акимат, полигон`);
const akFocus = await page.$$eval('.qmap .qpin', (ps) => ({
  badged: ps.filter((p) => !p.classList.contains('mini') && p.querySelector('.qpin-n')).length,
  mini: ps.filter((p) => p.classList.contains('mini')).length,
}));
ok(akFocus.badged >= 1 && akFocus.mini > 30, `главное на карте акимата: точки со сданными вещами — метки с цифрой (${akFocus.badged}), пустые школы — точки (${akFocus.mini})`);
ok((await page.textContent('[aria-label="Карта сбора"]')).includes('Сдано через школы и боксы: 1'), 'счётчик сдач через точки: 1');
ok((await page.textContent('#view')).includes(chosen), `в рейтинге школ — ${chosen}`);

console.log('6г. Вкладка «Карта»: пункты приёма');
await go('points');
await page.waitForSelector('.qmap .leaflet-tile-loaded');
ok((await page.$$('.qmap .qpin')).length === 46, 'на карте 46 точек: 40 школ, 5 боксов и хаб');
const ptFull = (await page.$$('.qmap .qpin:not(.mini)')).length;
ok(ptFull >= 6 && ptFull <= 7, `видно главное: ${ptFull} метками (ближайшие из списка и хаб), остальные ${46 - ptFull} — точками`);
await page.click('[data-f="box"]');
await page.waitForTimeout(250);
ok((await page.$$('.qmap .qpin')).length === 5, 'фильтр «ЦОН и вузы»: 5 боксов');
const boxes = await page.$$eval('.pt-row b', (els) => els.map((e) => e.textContent));
ok(boxes.length === 5 && boxes.some((b) => b.includes('обслуживания населения')) && boxes.some((b) => b.includes('университет')), `боксы: ${boxes.length} (ЦОН и вузы)`);
await page.click('.pt-row');
await page.waitForTimeout(150);
ok((await page.textContent('[data-testid="point-detail"]')).includes('Крупную технику не приносить'), 'карточка пункта: что принимает');
await page.click('[data-give]');
await page.waitForTimeout(250);
ok((await page.textContent('#view')).includes('Пункт выбран'), '«Сдать сюда» переносит пункт в раздел «Сдать»');
await page.click('[data-unprefer]');
await page.click('[data-f="all"]').catch(() => {});

console.log('6д. Вывоз холодильника по адресу');
await go('resident');
await page.click('[data-cat="home"]');
await page.click('[data-example="fridge"]');
await page.click('[data-go="method"]');
await page.click('[data-submit]');
ok(await page.isVisible('#addrErr'), 'без адреса вывоз не оформляется');
const pAddr = await pickAddress('#pAddr', 'Тургенева 109');
ok(pAddr === 'улица Тургенева, 109', `адрес вывоза: ${pAddr}`);
await page.click('[data-day="2"]');
await page.click('[data-time="1"]');
await page.click('[data-submit]');
const pr = await page.textContent('.receipt');
ok(pr.includes('Заявка на вывоз создана') && pr.includes(pAddr) && pr.includes('13:00–16:00'), 'квитанция: адрес и время вывоза');
await page.click('[data-pickup]');
await page.waitForTimeout(150);
await go('akimat');
ok((await page.textContent('[aria-label="Карта сбора"]')).includes('вывоз по заявке · 1'), 'заявка на вывоз на карте акимата');

console.log('7. ОСИ: бирка у бака');
await go('osi');
ok(await page.isVisible('#hAddr') && await page.isDisabled('[data-save-home]'), 'сначала ОСИ указывает адрес дома');
const home = await pickAddress('#hAddr', 'мкр 12');
await page.click('[data-save-home]');
ok((await page.textContent('[data-testid="osi-home"]')).trim() === home, `дом ОСИ: ${home}`);
await page.click('[data-mark]');
ok((await page.textContent('.receipt')).includes(home), 'в бирке адрес дома');
ok(/B-\d{4}/.test(await page.textContent('.receipt')), 'бирка с номером и QR');
await page.click('[data-pickup]');
ok((await page.textContent('.bank-card')).includes('200'), 'бонусы ОСИ +200 за крупную вещь');

console.log('7б. Маршрут Газели по улицам');
await page.click('[data-done]');
await page.click('[data-kind="small"]');
await page.click('[data-mark]');
await go('hub');
await page.click('[data-route]');
await page.waitForSelector('[data-testid="route-km"]');
const routeKm = parseFloat((await page.textContent('[data-testid="route-km"]')).replace(',', '.'));
const stopsN = await page.$$eval('[data-testid="route-stops"] .li', (els) => els.length);
ok(routeKm > 10 && routeKm < 150, `маршрут Газели: ${routeKm} км`);
const stopNames = await page.$$eval('[data-testid="route-stops"] .li b', (els) => els.map((e) => e.textContent));
ok(stopsN === 7 && stopNames.some((n) => n.startsWith('Бирка у бака')), `в маршруте хаб и ${stopsN - 1} точек: 5 боксов и бирка у бака с мелкой техникой`);
await shot('07-route');

console.log('8. Сохранение и сброс');
const before = await balance();
ok(before === 620, `баланс 620: 320 после вывода на карту + 300 за вывоз холодильника (${before})`);
await page.reload();
ok((await balance()) === before, 'после перезагрузки баланс сохранился');
await reset('ready');
ok((await balance()) === 1320, 'пресет «готовый кошелёк»: 1 320');

console.log('9. Лимит 10 устройств в месяц');
await reset('clean');
await go('resident');
await page.click('[data-cat="home"]');
let limitHit = false;
for (let i = 0; i < 11; i++) {
  await page.click('[data-example="kettle"]');
  await page.click('[data-go="method"]');
  await page.click('[data-submit]');
  if (await page.isVisible('#limitErr')) { limitHit = i; break; }
  await page.click('.stack [data-go="start"]');
}
ok(limitHit === 10, `11-я сдача в месяце отклонена (на попытке ${limitHit === false ? '—' : limitHit + 1})`);

console.log('9б. Заявки мастерских: разборка под заказ');
await reset('clean');
await go('hub');
await page.click('.qi:has-text("D-000781")');
await page.waitForTimeout(150);
const evRow = async (name) => (await page.textContent(`#view table tbody tr:has-text("${name}")`)).replace(/[\u00a0\u202f]/g, ' ');
ok((await evRow('Камера')).includes('−36 ₸') && (await evRow('Камера')).includes('оставляем'), 'камера A50 без заявки: −36 ₸, оставляем');
await page.selectOption('#oModel', 'a50');
await page.selectOption('#oPart', '1');
await page.click('#orderForm button[type="submit"]');
await page.waitForTimeout(150);
ok((await evRow('Камера')).includes('+468 ₸') && (await evRow('Камера')).includes('снимаем'), 'заявка мастерской: EV камеры +468 ₸ (0,8 × 900 × 0,9 − 3 × 60), снимаем');
ok((await page.textContent('[data-testid="orders"]')).includes('Камера'), 'заявка в списке мастерских');

await go('resident');
await page.click('[data-cat="digital"]');
await page.click('[data-example="a50"]');
await page.click('[data-go="method"]');
await page.click('[data-submit]');
const a50No = (await page.textContent('.receipt h2')).trim();
await page.click('[data-to-hub]');
await page.waitForTimeout(250);
await page.click('[data-confirm]');
await page.waitForTimeout(200);
await go('hub');
const bank = await page.textContent('[aria-label="Банк деталей"]');
ok(bank.includes(`Из устройства № ${a50No}`) && /Камера · Samsung Galaxy A50[\s\S]*заявка №6/.test(bank), 'камера снята под заявку №6 (№4 и №5 — SSD и ячейки Lenovo) и лежит в банке с QR-паспортом');
const camCard = page.locator('.passport', { hasText: `Камера · Samsung Galaxy A50` }).filter({ hasText: a50No });
await camCard.locator('[data-sell]').click();
await page.waitForTimeout(200);
ok((await page.textContent('[data-testid="orders"]')).includes('выдана мастерской'), 'деталь выдана мастерской, заявка закрыта');
ok((await balance()) === 50 + 90, `кошелёк донора: +50 за телефон и роялти +90 (10% от 900 ₸) = ${await balance()}`);

console.log('9в. Сертификат: данные удалены');
await go('wallet');
ok(await page.isVisible('[data-cert]'), 'в кошельке есть сертификат');
await page.click('[data-cert]');
const cert = await page.textContent('.sheet');
ok(cert.includes(`WD-${a50No.slice(2)}`) && cert.includes('NIST SP 800-88') && cert.includes('Данные удалены'), `сертификат WD-${a50No.slice(2)}: стирание по NIST SP 800-88`);
await page.click('.sheet [data-close]');

console.log('9г. Этап 3: стена, батарея в шкаф, партия с паспортом');
await go('hub');
await page.click('.qi:has-text("D-000785")');
await page.waitForTimeout(150);
await page.click('[data-confirm]');
await page.waitForTimeout(200);
const kp = norm(await page.textContent('[data-testid="sort-kpis"]'));
ok(kp.includes('90 ₸') && kp.includes('−172 ₸') && kp.includes('152 ₸'), 'чайник: целиком 90 ₸, разобрать всё −172 ₸, по дереву 152 ₸');
ok(/Отрезать сетевой шнур[\s\S]*делаем/.test(await sortPlan()), 'дерево: шнур отрезаем — 9 с дают +62 ₸');
await page.click('[data-sort]');
await page.waitForTimeout(200);
ok((await litBins()) === 'cable,whole', `чайник: свет над ящиками ${await litBins()}`);
await page.click('.qi:has-text("D-000783")');
await page.waitForTimeout(150);
await page.click('[data-confirm]');
await page.waitForTimeout(200);
await page.click('[data-sort]');
await page.waitForTimeout(200);
ok((await litBins()) === 'batt', 'вздутая батарея самоката: горит только шкаф с песком');
await page.click('[data-sort-all]');
await page.waitForTimeout(250);
ok(/Li-ion: \d/.test(norm(await page.textContent('[data-bin="whole"]'))), 'смартфон целиком переработчику: на ящике счётчик «Li-ion внутри»');
const boardPhone = norm(await page.textContent('[data-bin="boardPhone"]'));
ok(boardPhone.includes('0,03 кг'), 'A50 жителя уже вскрыт на этапе 2 (камера под заявку): вынуть плату окупается — 0,03 кг в ящике «Платы телефонов»');
await page.click('[data-lot="whole"]');
await page.waitForTimeout(200);
const lotW = norm(await page.textContent('[data-testid="lots"] .passport'));
ok(lotW.includes('P-0001') && lotW.includes('UN3481') && lotW.includes('РОП'), 'партия «Целиком переработчику»: паспорт с UN3481 и категориями РОП');
await shot('09-wall');

console.log('9д. Помощник Сактик');
await go('home');
await page.click('#askBtn');
await page.fill('#chatIn', 'Куда сдать холодильник?');
await page.press('#chatIn', 'Enter');
const chatHas = (t) => page.waitForFunction((s) => document.querySelector('.chat-log')?.textContent.includes(s), t, { timeout: 5000 }).then(() => true, () => false);
ok(await chatHas('Вызвать вывоз'), 'на вопрос про холодильник — вывоз из дома');
await page.waitForSelector('.typing', { state: 'detached' });
await page.click('.chat-sugg .chip:has-text("Как стереть данные?")');
ok(await chatHas('NIST'), 'про стирание данных — порядок и NIST SP 800-88');
await page.keyboard.press('Escape');

console.log('9е. ИИ в телефоне: распознавание фото без интернета');
await go('resident');
if (!(await page.$('#photoInput'))) await page.click('[data-go="start"]');
await page.setInputFiles('#photoInput', join(root, 'src/assets/photos/kettle.webp'));
await page.waitForSelector('.guess-i, .notice.warn', { timeout: 90000 });
const top = (await page.textContent('.guess-i[aria-pressed="true"] b').catch(() => '')) || '';
ok(/Чайник/.test(top), `ИИ в браузере (MobileCLIP) узнал чайник: «${top.trim()}»`);
await page.click('[data-cond="dead"]');
await page.click('[data-ai-next]');
ok((await page.textContent('#view')).includes('Что будет с вещью'), 'после фото — карточка и путь вещи');

console.log('9е2. Штрихкод → открытые базы товаров, сервер → магазины');
// Открытые базы и сервер подменены заготовками (CORS как у настоящих API); остальная сеть по-прежнему закрыта
const PHONE_EAN = '8806090312014';
const looked = [];
const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': 'content-type', 'access-control-allow-methods': 'GET, POST, OPTIONS' };
await ctx.route('https://api.upcitemdb.com/**', (r) => {
  const code = new URL(r.request().url()).searchParams.get('upc');
  looked.push(`upc:${code}`);
  const items = code === PHONE_EAN ? [{
    ean: PHONE_EAN, title: 'Samsung Galaxy A50 SM-A505F 64GB Smartphone', brand: 'Samsung', model: 'SM-A505F',
    category: 'Electronics > Communications > Telephony > Mobile Phones',
    offers: [
      { merchant: 'Amazon.com', domain: 'amazon.com', price: 199.99, currency: 'USD', link: 'https://www.upcitemdb.com/norob/alink/?id=a1' },
      { merchant: 'eBay', domain: 'ebay.com', price: 120, currency: 'USD', link: 'https://www.upcitemdb.com/norob/alink/?id=e1' },
    ],
  }] : [];
  return r.fulfill({ status: 200, headers: cors, contentType: 'application/json', body: JSON.stringify({ code: 'OK', total: items.length, items }) });
});
await ctx.route('https://world.openproductsfacts.org/**', (r) => {
  looked.push('opf');
  return r.fulfill({ status: 200, headers: cors, contentType: 'application/json', body: JSON.stringify({ status: 0, status_verbose: 'product not found' }) });
});
// Картинка штрихкода EAN-13 на белом фоне, как на коробке
const ean13 = (code) => {
  const L = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
  const G = L.map((p) => [...p].reverse().map((b) => (b === '0' ? '1' : '0')).join(''));
  const R = L.map((p) => [...p].map((b) => (b === '0' ? '1' : '0')).join(''));
  const PAR = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];
  const d = [...code].map(Number);
  let bits = '101';
  for (let i = 1; i <= 6; i++) bits += (PAR[d[0]][i - 1] === 'L' ? L : G)[d[i]];
  bits += '01010';
  for (let i = 7; i <= 12; i++) bits += R[d[i]];
  return bits + '101';
};
const barcodePng = Buffer.from((await page.evaluate((bits) => {
  const k = 4, quiet = 14 * k;
  const c = document.createElement('canvas');
  c.width = bits.length * k + quiet * 2; c.height = 240;
  const g = c.getContext('2d');
  g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = '#000';
  [...bits].forEach((b, i) => { if (b === '1') g.fillRect(quiet + i * k, 30, k, 180); });
  return c.toDataURL('image/png');
}, ean13(PHONE_EAN))).split(',')[1], 'base64');
await go('resident');
if (!(await page.$('#photoInput'))) await page.click('[data-go="start"]');
await page.setInputFiles('#photoInput', { name: 'box.png', mimeType: 'image/png', buffer: barcodePng });
await page.waitForSelector('.guess-i, .notice.warn', { timeout: 90000 });
ok((await page.textContent('[data-testid="ai-engine"]').catch(() => '')).includes('По штрихкоду'), 'штрихкод прочитан прямо на фото (ZXing в телефоне)');
ok(looked.includes(`upc:${PHONE_EAN}`) && looked.includes('opf'), 'код проверен в двух открытых базах: UPCitemdb и Open Products Facts');
const bcTop = norm(await page.textContent('.guess-i[aria-pressed="true"]'));
ok(bcTop.includes('Samsung Galaxy A50') && bcTop.includes(`штрихкод ${PHONE_EAN}`) && bcTop.includes('Телефон'), `модель из базы: ${bcTop.replace(/\s+/g, ' ').trim().slice(0, 60)}`);
const bcFound = norm(await page.textContent('[data-testid="found"]'));
ok(bcFound.includes('upcitemdb.com') && bcFound.includes('amazon.com') && bcFound.includes('199.99 USD'), 'источники: база и магазины с ценами');
ok((await page.getAttribute('[data-testid="found"] a.src', 'target')) === '_blank', 'ссылки на источники открываются в новой вкладке');
ok((await page.inputValue('#aiModel')).includes('Galaxy A50'), 'модель подставлена в поле «Модель»');
await shot('09e-barcode');

// Цифры вручную: ошибка в контрольной цифре, неизвестный код, верный код
await page.click('[data-go="start"]');
await page.setInputFiles('#photoInput', join(root, 'src/assets/photos/kettle.webp'));
await page.waitForSelector('.guess-i, .notice.warn', { timeout: 90000 });
await page.fill('#bcIn', '8806090312015');
await page.click('#bcForm [data-bc]');
await page.waitForTimeout(200);
ok(!(await page.isHidden('#bcErr')) && (await page.textContent('#bcErr')).includes('Проверь цифры'), 'неверная контрольная цифра — подсказка, без запроса в базы');
await page.fill('#bcIn', '4006381333931');
await page.click('#bcForm [data-bc]');
await page.waitForFunction(() => document.querySelector('#bcErr')?.textContent.includes('нет в открытых базах'), null, { timeout: 10000 }).catch(() => {});
ok((await page.textContent('#bcErr')).includes('нет в открытых базах'), 'неизвестный код — честно: в базах нет, можно ввести модель');
await page.fill('#bcIn', '8806 0903 1201 4');
await page.click('#bcForm [data-bc]');
await page.waitForFunction(() => document.querySelector('[data-testid="ai-engine"]')?.textContent.includes('По штрихкоду'), null, { timeout: 10000 });
ok(norm(await page.textContent('.guess')).includes('Samsung Galaxy A50'), 'введённый вручную код найден: Samsung Galaxy A50');

// Сервер с Claude: поиск по магазинам и источники
const API = 'https://saqta-ai.test.workers.dev';
let sent = null;
await ctx.route(`${API}/**`, async (r) => {
  if (r.request().method() === 'OPTIONS') return r.fulfill({ status: 204, headers: cors });
  sent = JSON.parse(r.request().postData() || '{}');
  return r.fulfill({ status: 200, headers: cors, contentType: 'application/json', body: JSON.stringify({
    group: 'phone', type: 'phone', label: 'Смартфон', model: 'Samsung Galaxy A50 (SM-A505F)', year: '2019',
    specs: ['Экран 6,4″ Super AMOLED', '4 ГБ / 64 ГБ'], price: { new: '', used: '45 000 ₸' }, condition: 'dead', damage: [], parts: ['экран'],
    sources: [{ title: 'Kaspi', url: 'https://kaspi.kz/shop/p/samsung-galaxy-a50-100000001/', host: 'kaspi.kz' }, { title: 'GSMArena', url: 'https://www.gsmarena.com/samsung_galaxy_a50-9554.php', host: 'gsmarena.com' }],
    searched: true, confidence: 0.93,
  }) });
});
await page.evaluate((u) => localStorage.setItem('saqta-api', u), API);
await page.click('[data-go="start"]');
await page.setInputFiles('#photoInput', join(root, 'src/assets/photos/phone.webp'));
await page.waitForSelector('.guess-i, .notice.warn', { timeout: 90000 });
ok(sent && typeof sent.image === 'string' && sent.image.length > 1000, 'фото ушло на сервер SAQTA');
ok((await page.textContent('[data-testid="ai-engine"]')).includes('Claude + магазины'), 'бейдж: Claude + магазины');
const srvFound = norm(await page.textContent('[data-testid="found"]'));
ok(srvFound.includes('вышел в 2019') && srvFound.includes('б/у — 45 000 ₸') && srvFound.includes('kaspi.kz') && srvFound.includes('gsmarena.com'), 'год, цена по данным магазинов и источники Kaspi и GSMArena');
await shot('09e-claude');
await page.evaluate(() => localStorage.removeItem('saqta-api'));

console.log('9ж. Этап 2: SAQTA Доктор по ссылке');
const pass = readFileSync(join(root, 'tests/fixtures/doctor-passport.json'), 'utf8').trim();
const b64 = Buffer.from(pass, 'utf8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
await page.goto(`${FILE}#hub/doctor=${b64}`);
await page.waitForTimeout(500);
ok((await page.textContent('.qi[aria-current="true"]')).includes('MacBook Pro'), 'ссылка Доктора: в очереди хаба выбрана новая карточка MacBook Pro');
const passObj = JSON.parse(pass);
const sohWant = `${Math.round((passObj.battery.full / passObj.battery.design) * 100)}%`;
ok((await page.textContent('[data-testid="soh"]')).trim() === sohWant, `паспорт: здоровье батареи ${sohWant} (${passObj.battery.full} из ${passObj.battery.design} мА·ч)`);
const askText = await page.textContent('[data-testid="ask"]');
ok(askText.includes('прочитано SAQTA Доктором') && askText.includes(passObj.battery.chip) && askText.includes('блокировка активации'), 'паспорт: чип, группы ячеек, блокировка активации — «прочитано SAQTA Доктором»');
ok((await page.evaluate(() => location.hash)) === '#hub', 'после импорта ссылка очищена до #hub — повторно не импортируется');
ok((await page.textContent('[data-testid="plan"]')).includes('готово'), 'план проверки: SAQTA Доктор — готово');
await shot('09-doctor');
const linFx = join(root, 'tests/fixtures/doctor-linux');
const linOut = execFileSync('sh', [join(root, 'check/doctor/saqta-doctor.sh'), '--no-open'], { env: { ...process.env, SAQTA_OS: 'Linux', SAQTA_ROOT: linFx, PATH: `${join(linFx, 'bin')}:${process.env.PATH}` }, encoding: 'utf8' });
const linLink = linOut.split('\n').find((l) => l.includes('#hub/doctor='));
await page.click('#view [data-ask]');
await page.fill('#psPaste', linLink);
await page.click('[data-paste]');
await page.waitForSelector('[data-testid="ask-result"]');
ok((await page.textContent('[data-testid="ask-result"]')).includes('79%'), 'вставленная ссылка Доктора с Linux: здоровье 79%');
await page.click('[data-save]');
await page.waitForTimeout(200);
ok((await page.textContent('[data-testid="soh"]')).trim() === '79%', 'паспорт сохранён в карточку: 79%');
await page.goto(`${FILE}#hub/doctor=@@@`);
await page.waitForTimeout(400);
ok((await page.textContent('.toasts')).includes('не паспорт'), 'испорченная ссылка: понятная ошибка, карточка не создаётся');

console.log('9л. Этап 4: продлить жизнь');
await go('home');
ok(await page.isVisible('[data-testid="cta-extend"]'), 'на главной — «Не выбрасывай — продли»');
await page.click('[data-testid="cta-extend"]');
await page.waitForTimeout(250);
const verdictOf = () => page.getAttribute('[data-testid="verdict"]', 'data-verdict');
const vText = async () => (await page.textContent('[data-testid="verdict"]')).replace(/\s+/g, ' ');
ok((await page.evaluate(() => location.hash)) === '#extend' && (await verdictOf()) === 'extend', 'ноутбук Lenovo, 6 лет: вердикт «продлить»');
let vt = await vText();
ok(vt.includes('38 500 ₸') && vt.includes('24 399 ₸') && vt.includes('3,2 раза') && vt.includes('SSD из Банка деталей'), 'батарея и SSD из Банка: 38 500 ₸, год жизни 24 399 ₸ — в 3,2 раза дешевле нового');
ok((await page.$$('[data-testid="barrel"] .stave')).length === 3 && (await page.textContent('[data-testid="barrel"]')).includes('после пересадки: 1,6 года'), 'бочка: три доски, после пересадки — 1,6 года');
await shot('09l-extend');
await page.click('[data-ex="mac"]');
await page.waitForTimeout(150);
ok((await verdictOf()) === 'ok' && (await vText()).includes('3,9 года'), 'MacBook по чипу: чинить не нужно, батарее ещё 3,9 года');
await page.click('[data-passport]');
await page.fill('#extPs', `#hub/doctor=${b64}`);
await page.click('#extPsGo');
await page.waitForTimeout(200);
ok((await page.textContent('#extForm')).includes('чип прочитан SAQTA Доктором') && (await page.inputValue('#extSoh')) === '88', 'паспорт SAQTA Доктора вставлен: батарея 88% — настоящее чтение');
await page.click('[data-kind="phone"]');
await page.waitForTimeout(150);
ok((await verdictOf()) === 'extend' && (await vText()).includes('10 000 ₸') && (await vText()).includes('9,4 раза'), 'телефон 3 года, «до вечера не хватает»: батарея за 10 000 ₸ — в 9,4 раза дешевле');
await page.selectOption('#extForm [data-field="age"]', '7');
await page.click('[data-field="feel"][data-val="hours"]');
await page.click('[data-field="screen"][data-val="broken"]');
await page.waitForTimeout(150);
ok((await verdictOf()) === 'replace' && (await vText()).includes('честное «нет»'), 'телефон 7 лет, разбит экран: честное «нет» — сдать на детали');
await page.click('[data-kind="washer"]');
await page.waitForTimeout(150);
vt = await vText();
ok((await verdictOf()) === 'extend' && vt.includes('16 999 ₸') && vt.includes('3 254 ₸') && vt.includes('4,3 раза'), 'стиралка 8 лет, не сливает: насос за 16 999 ₸, 3 254 ₸ в год — в 4,3 раза дешевле');
await page.click('[data-order]');
await page.waitForTimeout(200);
ok((await page.textContent('[data-testid="tickets"]')).includes('Обратный билет T-0001'), 'заказ: обратный билет T-0001 в «Моих вещах на продлении»');
await page.click('[data-kind="laptop"]');
await page.click('[data-ex="lenovo"]');
await page.waitForTimeout(150);
await page.click('[data-order]');
await page.waitForTimeout(200);
ok((await page.textContent('[data-testid="tickets"]')).includes('T-0002'), 'пересадка ноутбуку: обратный билет T-0002');
await go('hub');
const ordersText = await page.textContent('[data-testid="orders"]');
ok(ordersText.includes('Пересадка жителю') && /SSD/.test(ordersText), 'хаб: «Заявки мастерских» — «Пересадка жителю · SSD» для дерева разборки');
await go('wallet');
ok((await page.textContent('#view')).includes('Пересадка заказана'), 'житель получил уведомление «Пересадка заказана»');
await go('resident/digital');
await page.waitForTimeout(150);
const lenovoTile = await page.$('[data-ex-id="lenovo"], [data-example="lenovo"], [data-id="lenovo"]');
if (lenovoTile) await lenovoTile.click();
await page.waitForTimeout(200);
if (await page.$('[data-testid="extend-hint"]')) {
  ok(true, 'карточка вещи перед сдачей: «Подожди: может, её можно продлить?»');
  await page.click('[data-testid="extend-hint"]');
  await page.waitForTimeout(200);
  ok((await page.evaluate(() => location.hash)) === '#extend/laptop', 'подсказка ведёт в «Продлить жизнь» для ноутбука');
} else ok(false, 'карточка вещи перед сдачей: подсказка «можно продлить» не найдена');
await go('akimat');
ok((await page.textContent('[data-testid="less-waste"]')).replace(/\s/g, '').includes('−364'), 'акимат: +10% к сроку службы — минус 364 т в год');
await page.$eval('#lifeRange', (r) => { r.value = '20'; r.dispatchEvent(new Event('input', { bubbles: true })); });
ok((await page.textContent('[data-testid="less-waste"]')).replace(/\s/g, '').includes('−667'), 'ползунок +20% — минус 667 т в год');
const fleetText = (await page.textContent('[data-testid="fleet-result"]')).replace(/\s+/g, ' ');
ok(fleetText.includes('10 ноутбуков за 249 800 ₸') && fleetText.includes('в 6 раз') && fleetText.includes('4 ноутбука'), 'закон минимума: 4 без покупок, 10 ноутбуков за 249 800 ₸, год работы в 6 раз дешевле');
ok((await page.textContent('[data-testid="extend-fact"] .kpi .v')).trim() === '2', 'акимат: продлено в приложении — 2 вещи');

console.log('9з. Тема как в системе');
await go('home');
const bodyBg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
const theme = () => page.getAttribute('html', 'data-theme');
ok((await theme()) === null, 'система светлая — приложение светлое');
const lightBg = await bodyBg();
await page.emulateMedia({ colorScheme: 'dark' });
await page.waitForTimeout(150);
ok((await theme()) === 'dark', 'система стала тёмной — приложение сразу тёмное, без перезагрузки');
const darkBg = await bodyBg();
ok(darkBg !== lightBg && /rgb\(0, 0, 0\)/.test(darkBg), `фон тёмный (${darkBg})`);
const wide = [];
for (const s of ['home', 'points', 'resident', 'extend', 'wallet', 'profile', 'shop', 'osi', 'hub', 'akimat']) {
  await go(s);
  await shot(`dark-${s}`);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  if (sw > 390) wide.push(`${s}: ${sw} px`);
}
ok(!wide.length, `на ширине 390 px ни один экран не уезжает вбок${wide.length ? ': ' + wide.join(', ') : ''}`);
await page.waitForSelector('.qmap .leaflet-tile-loaded');
await page.waitForTimeout(300);
const darkTiles = await tileStats(page);
ok(darkTiles.lum < 60, `карта перерисовалась в тёмной палитре (яркость ${darkTiles.lum.toFixed(0)})`);
await page.emulateMedia({ colorScheme: 'light' });
await page.waitForTimeout(400);
ok((await theme()) === null && (await bodyBg()) === lightBg, 'система снова светлая — приложение тоже');
ok((await tileStats(page)).lum > 200, 'карта снова светлая');
await page.click('#menuBtn');
ok((await page.getAttribute('.menu [data-theme-mode="system"]', 'aria-pressed')) === 'true', 'в меню по умолчанию выбрано «Системная»');
await page.click('.menu [data-theme-mode="dark"]');
await page.waitForTimeout(150);
ok((await theme()) === 'dark' && await page.isVisible('.menu'), 'меню → «Тёмная»: тёмная при светлой системе, меню не закрылось');
await page.reload();
ok((await theme()) === 'dark', 'выбор «Тёмная» сохраняется после перезагрузки');
await page.click('#menuBtn');
ok((await page.getAttribute('.menu [data-theme-mode="dark"]', 'aria-pressed')) === 'true', 'в меню отмечено «Тёмная»');
await page.click('.menu [data-theme-mode="system"]');
await page.waitForTimeout(150);
ok((await theme()) === null, '«Системная»: снова как в системе (светлая)');
await page.keyboard.press('Escape');
const night = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'dark' });
const np = await night.newPage();
await np.goto(`${FILE}#resident`);
ok((await np.getAttribute('html', 'data-theme')) === 'dark', 'телефон в ночном режиме: приложение тёмное с первого открытия');
ok((await np.getAttribute('meta[name="theme-color"]', 'content')) === '#161618', 'и строка состояния тёмная');
await night.close();

console.log('9и. Как приложение на телефоне');
await go('home');
const nav = await page.evaluate(() => {
  const t = document.querySelector('.tabbar');
  return { shown: !t.hidden && getComputedStyle(t).display !== 'none', pinned: Math.round(t.getBoundingClientRect().bottom) === innerHeight };
});
ok(nav.shown && nav.pinned, 'на телефоне меню жителя внизу экрана, как в приложении');
await page.click('.tabbar .tb[data-screen="wallet"]');
await page.waitForTimeout(250);
ok((await page.evaluate(() => location.hash)) === '#wallet', 'нижнее меню переключает разделы');
await page.click('#menuBtn');
await page.click('.menu [data-act="install"]');
await page.waitForTimeout(200);
ok((await page.textContent('.sheet')).includes('офлайн-файл'), 'офлайн-файл объясняет, что установка — по ссылке');
await page.click('.sheet [data-close]');
const desk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desk.goto(`${FILE}#home`);
await desk.waitForTimeout(300);
ok(await desk.evaluate(() => { const t = document.querySelector('.tabbar'); return !t.hidden && getComputedStyle(t).display !== 'none'; }), 'на компьютере меню жителя тоже на месте — разделы не теряются');
await desk.close();

console.log('9к. Переименование QAITA → SAQTA: сохранённое не теряется');
const balBefore = await balance();
await page.evaluate(() => {
  const keys = Object.keys(localStorage).filter((k) => k.startsWith('saqta-'));
  for (const k of keys) { localStorage.setItem(`qaita-${k.slice(6)}`, localStorage.getItem(k)); localStorage.removeItem(k); }
});
await page.reload();
await page.waitForTimeout(300);
const left = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith('qaita-')).length);
ok(!(await page.$('.onb')) && left === 0, 'данные из старых ключей qaita-* перенесены, обучение не показывается заново');
ok((await balance()) === balBefore, `баланс после переноса тот же: ${balBefore}`);
ok((await page.title()) === 'SAQTA' && (await page.textContent('.brand')).includes('SAQTA'), 'название в шапке и вкладке браузера — SAQTA');

console.log('10. Офлайн и ошибки');
ok(external.length === 0, `внешних запросов нет (${external.length})`);
ok(errors.length === 0, `ошибок в консоли нет${errors.length ? ': ' + errors.join(' | ') : ''}`);

await browser.close();
console.log(failed ? `\nПровалено проверок: ${failed}` : '\nВсе проверки пройдены');
process.exit(failed ? 1 : 0);
