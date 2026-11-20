// Проверка сайта: node tests/site.mjs (сначала собирает site/index.html)
// Поднимает статический сервер на корне репозитория, как GitHub Pages, и проходит страницу на телефоне и ноутбуке.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { dirname, join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
execFileSync(process.execPath, [join(root, 'site', 'build.mjs')], { stdio: 'inherit' });

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml', '.bin': 'application/octet-stream', '.jpg': 'image/jpeg' };
const server = createServer(async (req, res) => {
  try {
    let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    let f = join(root, p);
    if ((await stat(f)).isDirectory()) f = join(f, 'index.html');
    const body = await readFile(f);
    res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404); res.end('not found');
  }
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;

async function launch() {
  if (process.env.PW_CHANNEL) return chromium.launch({ channel: process.env.PW_CHANNEL });
  try { return await chromium.launch(); } catch { return chromium.launch({ channel: 'chrome' }); }
}

let pass = 0, fail = 0;
const ok = (cond, name, extra = '') => {
  if (cond) { pass++; } else { fail++; console.log(`  ✗ ${name}${extra ? ` — ${extra}` : ''}`); }
};
const norm = (s) => (s || '').replace(/[  ]/g, ' ').replace(/−/g, '-').replace(/\s+/g, ' ').trim();

const browser = await launch();

async function open(viewport) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, locale: 'ru-RU' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url().slice(0, 80)}`));
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`http ${r.status()}: ${r.url().slice(0, 80)}`); });
  await page.goto(`${base}/site/`, { waitUntil: 'load' });
  return { ctx, page, errors };
}

// ——— ноутбук ———
{
  const { ctx, page, errors } = await open({ width: 1366, height: 860 });
  ok(norm(await page.title()).startsWith('SAQTA'), 'заголовок страницы');

  const anchors = await page.$$eval('a[href^="#"]', (as) => as.map((a) => a.getAttribute('href')).filter((h) => h.length > 1 && !document.getElementById(h.slice(1))));
  ok(anchors.length === 0, 'все якоря ведут на разделы', anchors.join(', '));

  const imgs = await page.$$eval('img', (xs) => xs.map((i) => ({ a: i.alt, w: i.naturalWidth })));
  await page.evaluate(async () => { for (const i of document.images) { i.loading = 'eager'; await i.decode().catch(() => {}); } });
  const broken = await page.$$eval('img', (xs) => xs.filter((i) => !i.naturalWidth).map((i) => i.alt));
  ok(imgs.length === 5 && broken.length === 0, '5 снимков приложения загружены', broken.join(', '));
  ok(await page.$$eval('.qr svg', (xs) => xs.length) === 2, 'два QR-кода на странице');

  // Ценность проверки: числа README
  const voiWant = [[2160, 108], [-36, 0], [3180, 6], [4470, 18], [504, 72]];
  for (let i = 0; i < voiWant.length; i++) {
    await page.click(`[data-voi-presets] [data-i="${i}"]`);
    const ev = norm(await page.textContent('#voiEv'));
    const cp = norm(await page.textContent('#voiCp'));
    const [wEv, wCp] = voiWant[i];
    const evStr = `${wEv > 0 ? '+' : wEv < 0 ? '-' : ''}${Math.abs(wEv).toLocaleString('ru-RU').replace(/\s/g, ' ')} ₸`;
    ok(ev === norm(evStr), `ЦП: EV пресета ${i}`, `${ev} ≠ ${evStr}`);
    ok(cp === `${wCp} ₸`, `ЦП: ЦП пресета ${i}`, cp);
  }
  ok(/108 секунд/.test(norm(await page.textContent('#voiVerdict')).replace(/\s/g, ' ')) === false, 'вердикт ЦП обновляется');
  await page.click('[data-voi-presets] [data-i="0"]');
  ok(/108 секунд/.test(norm(await page.textContent('#voiVerdict'))), 'ЦП экрана A50 = 108 секунд работы');
  await page.fill('#voiPrice', '200');
  await page.dispatchEvent('#voiPrice', 'input');
  ok(norm(await page.textContent('#voiCp')) === '0 ₸', 'ЦП падает до нуля при дешёвой детали');

  // Дерево разборки: README «Ноутбук Lenovo IdeaPad»
  const tree = async () => ({ whole: norm(await page.textContent('#treeWhole')), full: norm(await page.textContent('#treeFull')), best: norm(await page.textContent('#treeBest')) });
  let t = await tree();
  ok(t.whole === '550 ₸', 'дерево: целиком 550 ₸', t.whole);
  ok(t.full.startsWith('-775,2 ₸') && t.full.includes('26 мин'), 'дерево: разобрать всё −775,2 ₸ за 26 мин', t.full);
  ok(t.best.startsWith('596,5 ₸') && t.best.includes('2 мин'), 'дерево: 596,5 ₸ за 2 мин', t.best);
  ok(norm(await page.textContent('#treeSteps')).includes('4 557 ₸/кг'), 'дерево: порог платы 4 557 ₸/кг');
  const lit = await page.$$eval('#wall .bin.lit', (xs) => xs.map((x) => x.dataset.bin).sort().join(','));
  ok(lit === 'batt,boardLaptop,ram,whole', 'стена: горят ОЗУ, платы/SSD, шкаф и «целиком»', lit);
  ok(await page.$$eval('#wall .bin', (xs) => xs.length) === 12, 'стена: 12 ящиков');
  await page.check('#treeStage2');
  t = await tree();
  ok(t.best.startsWith('503,5 ₸'), 'дерево после этапа 2: 503,5 ₸', t.best);
  await page.click('.chip[data-price="5500"]');
  t = await tree();
  ok(t.best.startsWith('645 ₸'), 'дерево после этапа 2 с «жёлтым флажком»: 645 ₸', t.best);
  ok(norm(await page.textContent('#treePriceo')) === '5 500 ₸/кг', 'ползунок цены показывает 5 500');
  await page.uncheck('#treeStage2');
  await page.click('.chip[data-price="3000"]');

  // Продлить или сдать: README «Что бочка решила для каждой вещи»
  const lifeWant = [
    { cls: 'verdict', has: ['24 399 ₸', 'в 3,2 раза'] },
    { cls: 'verdict ok', has: ['Чинить не нужно'] },
    { cls: 'verdict', has: ['7 234 ₸', 'в 9,4 раза'] },
    { cls: 'verdict no', has: ['Не продлевать'] },
    { cls: 'verdict', has: ['3 254 ₸', 'в 4,3 раза'] },
    { cls: 'verdict', has: ['5 950 ₸', 'в 2,3 раза'] },
  ];
  for (let i = 0; i < lifeWant.length; i++) {
    await page.click(`[data-life-cases] [data-i="${i}"]`);
    const v = norm(await page.textContent('#lifeVerdict'));
    const cls = await page.getAttribute('#lifeVerdict', 'class');
    ok(cls === lifeWant[i].cls, `бочка: вердикт примера ${i}`, `${cls}: ${v}`);
    for (const s of lifeWant[i].has) ok(v.includes(s), `бочка: пример ${i} содержит «${s}»`, v);
  }
  await page.click('[data-life-cases] [data-i="1"]');
  ok(norm(await page.textContent('#lifeStaves')).includes('3,9 года'), 'MacBook: батарее до 80% ещё 3,9 года');
  ok(await page.$eval('#lifeCurve', (f) => !f.hidden && f.querySelector('polyline') !== null), 'кривая √t нарисована');
  await page.click('[data-life-cases] [data-i="4"]');
  ok(await page.$eval('#lifeSohField', (f) => f.hidden), 'у стиралки нет ползунка батареи');
  await page.click('[data-life-cases] [data-i="0"]');
  await page.fill('#lifeSoh', '95');
  await page.dispatchEvent('#lifeSoh', 'input');
  ok(norm(await page.textContent('#lifeSoho')) === '95%', 'ползунок здоровья батареи работает');

  // Сценарии
  await page.click('#scenSeg [data-s="pess"]');
  ok(norm(await page.textContent('#scRev')) === '2 653 328 ₸' && norm(await page.textContent('#scRet')) === '27%', 'сценарий: пессимистичный');
  await page.click('#scenSeg [data-s="care"]');
  ok(norm(await page.textContent('#scRev')) === '4 735 642 ₸' && norm(await page.textContent('#scDev')) === '15 000', 'сценарий: осторожный');

  // Бюджет
  const total = norm(await page.textContent('#budgetTable tr.total'));
  ok(total.includes('10 000 000 ₸') && total.includes('100%'), 'бюджет: итого 10 000 000 ₸', total);
  ok(await page.$$eval('#budgetTable tbody tr', (xs) => xs.length) === 14, 'бюджет: 13 статей и итог');
  ok(await page.$$eval('#binPrices .bar-row', (xs) => xs.length) === 9, 'цены ящиков: 9 полос');

  // Неразрывные пробелы не попали в атрибуты SVG
  ok(await page.$eval('#lifeCurve svg', (s) => s.viewBox.baseVal.width === 320), 'viewBox кривой цел');

  // Прототип на странице
  await page.click('#liveBtn');
  const handle = await page.waitForSelector('#live.on iframe');
  const frame = await handle.contentFrame();
  if (frame) await frame.waitForLoadState('load');
  ok(!!frame && frame.url().includes('/docs/'), 'iframe приложения открыт', frame && frame.url());
  if (frame) {
    await frame.waitForFunction(() => document.title === 'SAQTA', null, { timeout: 8000 }).catch(() => {});
    ok((await frame.title()) === 'SAQTA', 'приложение загрузилось внутри сайта', await frame.title());
  }
  await page.click('#liveBtn');
  ok(await page.$('#live iframe') === null, 'прототип сворачивается');

  const wide = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  ok(wide <= 0, 'ноутбук: нет горизонтальной прокрутки', String(wide));
  ok(errors.length === 0, 'ноутбук: ни одной ошибки в консоли и сети', errors.join(' | '));
  await ctx.close();
}

// ——— крупные цифры не вылезают из своих ячеек ни на одной ширине ———
{
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 860 } });
  const page = await ctx.newPage();
  await page.goto(`${base}/site/`, { waitUntil: 'load' });
  for (const width of [1440, 1366, 1180, 1081, 1000, 921, 800, 700, 641, 390, 360]) {
    await page.setViewportSize({ width, height: 860 });
    const bad = await page.evaluate(() => [...document.querySelectorAll('.ledger .n, .hook .big, .out-big, .tree-sum .v, .scen .v, .timeline .m, h1, h2, h3, .flow .metric, .bar-row .val, .label-title')]
      .filter((el) => el.offsetParent && el.scrollWidth > el.clientWidth + 1)
      .map((el) => `${el.className || el.tagName}: «${el.textContent.trim().slice(0, 24)}» ${el.scrollWidth}>${el.clientWidth}`));
    ok(bad.length === 0, `${width}px: крупные цифры и заголовки помещаются`, bad.join('; '));
  }
  await ctx.close();
}

// ——— телефон ———
for (const width of [360, 390]) {
  const { ctx, page, errors } = await open({ width, height: 800 });
  const wide = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  ok(wide <= 0, `${width}px: нет горизонтальной прокрутки`, String(wide));
  const over = await page.evaluate(() => [...document.querySelectorAll('main *')].filter((el) => {
    const r = el.getBoundingClientRect();
    if (!r.width || el.closest('.tbl-wrap')) return false;
    return r.right > innerWidth + 1;
  }).slice(0, 5).map((el) => `${el.tagName.toLowerCase()}.${el.className}`));
  ok(over.length === 0, `${width}px: ничего не вылезает за экран`, over.join(', '));
  ok(await page.isVisible('.menu-btn'), `${width}px: кнопка меню видна`);
  ok(!(await page.isVisible('#nav')), `${width}px: меню закрыто`);
  await page.click('.menu-btn');
  ok(await page.isVisible('#nav a[href="#budget"]'), `${width}px: меню открывается`);
  await page.click('#nav a[href="#budget"]');
  await page.waitForFunction(() => Math.abs(document.getElementById('budget').getBoundingClientRect().top) < 120, null, { timeout: 5000 }).catch(() => {});
  ok(!(await page.isVisible('#nav')), `${width}px: меню закрывается после выбора раздела`);
  const y = await page.$eval('#budget', (el) => Math.round(el.getBoundingClientRect().top));
  ok(y >= 0 && y < 120, `${width}px: переход к разделу «Бюджет»`, String(y));
  ok(errors.length === 0, `${width}px: ни одной ошибки`, errors.join(' | '));
  await ctx.close();
}

await browser.close();
server.close();
console.log(`site: ${pass} проверок прошло, ${fail} не прошло`);
process.exit(fail ? 1 : 0);
