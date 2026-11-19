// Сквозной сценарий демо в настоящем браузере (Playwright), офлайн, с проверкой чисел.
// Запуск: npm run build && npm test   (SHOTS=папка — сохранить скриншоты шагов)
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

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
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
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
const balance = async () => { await go('wallet'); return digits(await page.textContent('[data-testid="balance"]')); };
const reset = async (preset) => {
  await page.click('#menuBtn');
  await page.click(`.menu [data-act="${preset}"]`);
  await page.waitForTimeout(200);
};

await page.goto(FILE);

console.log('0. Знакомство с Кайтиком и карта донора');
await page.waitForSelector('.onb');
ok(await page.isVisible('.onb .m-body'), 'обучение ведёт Кайтик');
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
ok(grades.length === 16 && grades.every((g) => /^[ABC]$/.test(g)), `ТЕСТ-30: 16 ячеек с грейдами (${grades.join('')})`);
ok(await page.isVisible('#t30chart'), 'кривые напряжения нарисованы');
await shot('03-hub');
await page.click('button:has-text("Детали проданы")');
await page.waitForTimeout(200);
ok((await balance()) === 1320, 'после продажи деталей баланс 1 320 (+1 120 роялти)');
ok((await page.textContent('#view')).includes('Твой ноутбук спас 3 устройства'), 'уведомление донору');
await shot('04-wallet');

console.log('4. EV по формуле из документации (Samsung A50)');
await go('hub');
await page.click('.qi:has-text("D-000781")');
await page.waitForTimeout(200);
const evText = (await page.textContent('#view table')).replace(/[\u00a0\u202f]/g, ' ');
ok(evText.includes('+2 160 ₸'), 'экран A50: EV = +2 160 ₸');
ok(evText.includes('−36 ₸'), 'камера A50: EV = −36 ₸');

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
ok((await page.textContent('[aria-label="Карта сбора"]')).includes('Сдано через школы и боксы: 1'), 'счётчик сдач через точки: 1');
ok((await page.textContent('#view')).includes(chosen), `в рейтинге школ — ${chosen}`);

console.log('6г. Вкладка «Карта»: пункты приёма');
await go('points');
await page.waitForSelector('.qmap .leaflet-tile-loaded');
ok((await page.$$('.qmap .qpin')).length === 46, 'на карте 46 точек: 40 школ, 5 боксов и хаб');
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
ok(bank.includes(`Из устройства № ${a50No}`) && /Камера · Samsung Galaxy A50[\s\S]*заявка №4/.test(bank), 'камера снята под заявку №4 и лежит в банке с QR-паспортом');
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

console.log('9г. Сырьё: отгрузка переработчику');
await go('hub');
const rawBefore = await page.textContent('[aria-label="Сырьё и переработчики"]');
ok(/готово к отгрузке/.test(rawBefore), 'в хабе есть раздел «Сырьё и переработчики»');
if (await page.isEnabled('[data-ship]')) {
  await page.click('[data-ship]');
  await page.waitForTimeout(200);
  ok((await page.textContent('[aria-label="Сырьё и переработчики"]')).includes('Акт R-0001'), 'акт отгрузки R-0001 с весом');
} else ok(false, 'после триажа есть сырьё для отгрузки');

console.log('9д. Помощник Кайтик');
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
ok(/Чайник/.test(top), `MobileNet в браузере узнал чайник: «${top.trim()}»`);
await page.click('[data-cond="dead"]');
await page.click('[data-ai-next]');
ok((await page.textContent('#view')).includes('Что будет с вещью'), 'после фото — карточка и путь вещи');

console.log('10. Офлайн и ошибки');
ok(external.length === 0, `внешних запросов нет (${external.length})`);
ok(errors.length === 0, `ошибок в консоли нет${errors.length ? ': ' + errors.join(' | ') : ''}`);

await browser.close();
console.log(failed ? `\nПровалено проверок: ${failed}` : '\nВсе проверки пройдены');
process.exit(failed ? 1 : 0);
