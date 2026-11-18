// Сквозной сценарий демо в настоящем браузере (Playwright), офлайн, с проверкой чисел.
// Запуск: npm run build && npm test   (SHOTS=папка — сохранить скриншоты шагов)
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { APP_FILE } = await import(join(root, 'src/data.js'));
const FILE = `file://${join(root, 'dist', `${APP_FILE}.html`)}`;
const SHOTS = process.env.SHOTS;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });

let failed = 0;
const ok = (cond, msg) => {
  if (cond) console.log(`  ✓ ${msg}`);
  else { failed++; console.log(`  ✗ ${msg}`); }
};
const digits = (s) => Number(String(s).replace(/[^\d]/g, ''));

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
await page.click('[data-submit]');
const receiptNo = (await page.textContent('.receipt h2')).trim();
ok(/^D-\d{6}$/.test(receiptNo), `квитанция ${receiptNo}`);
ok(await page.isVisible('.receipt svg.qr'), 'QR-код нарисован');
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

console.log('6. Магазин → экипаж → акимат');
await go('shop');
ok(await page.isChecked('#pickupOld'), 'галочка «вывезти старую технику» стоит по умолчанию');
await page.click('[data-order]');
await page.click('button[data-mode="crew"]');
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

console.log('7. ОСИ: бирка у бака');
await go('osi');
await page.click('[data-mark]');
ok(/B-\d{4}/.test(await page.textContent('.receipt')), 'бирка с номером и QR');
await page.click('[data-pickup]');
ok((await page.textContent('.bank-card')).includes('200'), 'бонусы ОСИ +200 за крупную вещь');

console.log('8. Сохранение и сброс');
await page.reload();
ok((await balance()) === 320, 'после перезагрузки баланс сохранился');
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

console.log('10. Офлайн и ошибки');
ok(external.length === 0, `внешних запросов нет (${external.length})`);
ok(errors.length === 0, `ошибок в консоли нет${errors.length ? ': ' + errors.join(' | ') : ''}`);

await browser.close();
console.log(failed ? `\nПровалено проверок: ${failed}` : '\nВсе проверки пройдены');
process.exit(failed ? 1 : 0);
