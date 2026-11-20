// ИИ в телефоне на фото каталога: офлайн-файл в настоящем браузере, сеть закрыта.
// Проверяет основной движок (MobileCLIP + голова SAQTA) и запасной (MobileNet + голова).
// Запуск: npm run build && npm run test:ai   (PW_CHANNEL=msedge — через установленный Edge)
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { APP_FILE } = await import(pathToFileURL(join(root, 'src/data.js')).href);
let FILE = pathToFileURL(join(root, 'dist', `${APP_FILE}.html`)).href;
// PAGES=1 — версия для GitHub Pages: папка docs/ по http, файлы ИИ грузятся из docs/ai/
let server = null;
if (process.env.PAGES) {
  const { createServer } = await import('node:http');
  const { readFile } = await import('node:fs/promises');
  const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.wasm': 'application/wasm', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
  server = createServer(async (req, res) => {
    try {
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      if (p.endsWith('/')) p += 'index.html';
      const body = await readFile(join(root, 'docs', p));
      res.writeHead(200, { 'content-type': TYPES[p.slice(p.lastIndexOf('.'))] || 'application/octet-stream' });
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  }).listen(0);
  FILE = `http://127.0.0.1:${server.address().port}/`;
  console.log(`Версия для GitHub Pages: ${FILE}`);
}
const photo = (n) => join(root, 'src/assets/photos', `${n}.webp`);

let failed = 0;
const ok = (cond, msg) => { if (cond) console.log(`  ✓ ${msg}`); else { failed++; console.log(`  ✗ ${msg}`); } };

const browser = process.env.PW_CHANNEL ? await chromium.launch({ channel: process.env.PW_CHANNEL }) : await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }));

async function session(forceMobileNet = false) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route('**/*', (r) => (/^(file|data|blob):|^http:\/\/127\.0\.0\.1/.test(r.request().url()) ? r.continue() : r.abort()));
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  if (forceMobileNet) await page.addInitScript(() => { window.SAQTA_FORCE_MOBILENET = true; });
  await page.goto(FILE);
  // Знакомство с Сактиком: пролистать и выпустить карту донора
  await page.waitForSelector('.onb', { timeout: 10000 }).catch(() => {});
  if (await page.$('.onb')) {
    for (let i = 0; i < 4; i++) await page.click('[data-onb="next"]');
    await page.fill('#onbName', 'Тест');
    await page.click('[data-onb="issue"]');
    await page.click('[data-onb="done"]');
    await page.waitForTimeout(200);
  }
  return { ctx, page, errors };
}
// Фото → первая догадка ИИ и бейдж движка
async function recognize(page, file) {
  await page.evaluate(() => { location.hash = 'resident'; });
  await page.waitForTimeout(200);
  if (!(await page.$('#photoInput'))) await page.click('[data-go="start"]');
  await page.setInputFiles('#photoInput', file);
  await page.waitForSelector('.guess-i, .notice.warn', { timeout: 120000 });
  const top = ((await page.textContent('.guess-i[aria-pressed="true"] b').catch(() => '')) || '').trim();
  const badge = ((await page.textContent('.ai-badge + .xs').catch(() => '')) || '').trim();
  await page.click('.back').catch(() => {});
  return { top, badge };
}

// Ожидания по фото каталога (src/assets/photos): вид техники, который должен быть первой догадкой
const CASES = [
  ['iphone', /Телефон/], ['phone', /Телефон/], ['nokia', /Телефон/], ['laptop', /Ноутбук/], ['headphones', /Наушники/],
  ['kettle', /Чайник/], ['washer', /Стиральная/], ['freezer', /Холодильник/], ['fridge', /Холодильник/], ['tv', /Телевизор/],
  ['monitor', /Монитор/], ['router', /Роутер/], ['watch', /Часы/], ['speaker', /Колонка/], ['console', /Приставка/],
  ['camera', /Фотоаппарат/], ['aa', /Батарейки/], ['battery', /Батарейки/], ['cables', /Зарядка/], ['ebook', /Электронная книга/],
  ['iron', /Утюг/], ['vacuum', /Пылесос/], ['dishwasher', /Посудомоечная/], ['stove', /Плита/], ['ac', /Кондиционер/],
  ['pc', /Системный блок/],
];

console.log('1. MobileCLIP + голова SAQTA (основной движок)');
{
  const { ctx, page, errors } = await session();
  const t0 = Date.now();
  let first = true;
  for (const [name, want] of CASES) {
    const { top, badge } = await recognize(page, photo(name));
    if (first) { ok(/MobileCLIP/.test(badge), `движок — MobileCLIP («${badge}»), первая загрузка ${((Date.now() - t0) / 1000).toFixed(1)} с`); first = false; }
    ok(want.test(top), `${name}.webp → «${top}»`);
  }
  ok(!errors.length, `без ошибок на странице${errors.length ? `: ${errors.slice(0, 3).join(' | ')}` : ''}`);
  await ctx.close();
}

console.log('2. Запасной движок: MobileNet + голова SAQTA');
{
  const { ctx, page, errors } = await session(true);
  for (const [name, want] of [['kettle', /Чайник/], ['iphone', /Телефон/], ['laptop', /Ноутбук/], ['washer', /Стиральная/]]) {
    const { top, badge } = await recognize(page, photo(name));
    ok(want.test(top) && !/MobileCLIP/.test(badge), `${name}.webp → «${top}» (${badge})`);
  }
  ok(!errors.length, 'без ошибок на странице');
  await ctx.close();
}

await browser.close();
server?.close();
console.log(failed ? `\nПровалено: ${failed}` : '\nВсе проверки ИИ пройдены');
process.exit(failed ? 1 : 0);
