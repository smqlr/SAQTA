// Проверка установки на телефон (PWA) по HTTP, как на GitHub Pages: npm run build && npm run test:pwa
// Chrome должен считать приложение устанавливаемым, manifest — без ошибок, service worker — работать без сети.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium, devices } = require('playwright');
const docs = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml' };

const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  try {
    const body = await readFile(join(docs, path.endsWith('/') ? `${path}index.html` : path));
    res.writeHead(200, { 'content-type': TYPES[extname(path) || '.html'] || 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404); res.end(); }
}).listen(0);
const URL_ = `http://localhost:${server.address().port}/`;

let failed = 0;
const ok = (c, m) => { console.log(`  ${c ? '✓' : '✗'} ${m}`); if (!c) failed++; };
async function launch() {
  try { return await chromium.launch(); } catch { /* нет браузера этой версии Playwright */ }
  try { return await chromium.launch({ channel: 'chrome' }); } catch { /* нет Google Chrome */ }
  return chromium.launch({ executablePath: process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium' });
}
const browser = await launch();

console.log('1. Установка (Chrome)');
const ctx = await browser.newContext();
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(URL_);
await page.waitForTimeout(2000);
const cdp = await ctx.newCDPSession(page);
const { installabilityErrors } = await cdp.send('Page.getInstallabilityErrors');
// «in-incognito» — Playwright всегда открывает браузер в режиме инкогнито, где установка запрещена
const real = installabilityErrors.filter((e) => e.errorId !== 'in-incognito');
ok(!real.length, `Chrome считает приложение устанавливаемым${real.length ? ': ' + JSON.stringify(real) : ''}`);
const man = await cdp.send('Page.getAppManifest');
ok(!man.errors.length, `manifest без ошибок${man.errors.length ? ': ' + JSON.stringify(man.errors) : ''}`);
const manifest = JSON.parse(man.data);
ok(manifest.display === 'standalone', 'открывается без адресной строки (display: standalone)');
ok(manifest.icons.some((i) => i.purpose === 'maskable'), 'есть адаптивная иконка для Android');
ok(manifest.shortcuts?.length >= 3, `быстрые действия на иконке: ${manifest.shortcuts?.length}`);
ok(manifest.screenshots?.some((s) => s.form_factor === 'narrow'), 'скриншоты для окна установки');
for (const f of ['apple-touch-icon.png', ...manifest.icons.map((i) => i.src), ...manifest.screenshots.map((s) => s.src)]) {
  const r = await page.request.get(URL_ + f);
  if (!r.ok()) ok(false, `нет файла ${f}`);
}
ok(await page.evaluate(async () => !!(await navigator.serviceWorker.getRegistration())), 'service worker зарегистрирован');
await ctx.setOffline(true);
await page.reload();
ok(await page.evaluate(() => !!document.querySelector('.tabbar')), 'без интернета приложение открывается из кэша');
ok(!errors.length, `ошибок в консоли нет${errors.length ? ': ' + errors.join(' | ') : ''}`);
await ctx.close();

// Первый запуск на телефоне: житель сначала проходит знакомство с Кайтиком, потом видит плашку установки
async function finishOnboarding(p) {
  if (!(await p.$('.onb'))) return;
  for (let i = 0; i < 4; i++) await p.click('[data-onb="next"]');
  await p.fill('#onbName', 'Айгерим');
  await p.click('[data-onb="issue"]');
  await p.click('[data-onb="done"]');
  await p.waitForTimeout(200);
}

console.log('2. Телефоны');
for (const [name, dev] of [['Android', devices['Pixel 7']], ['iPhone', devices['iPhone 13']]]) {
  const c = await browser.newContext({ ...dev });
  const p = await c.newPage();
  await p.goto(`${URL_}#resident`);
  await p.waitForTimeout(600);
  ok(await p.isVisible('.install-bar'), `${name}: плашка «Установите QAITA»`);
  await finishOnboarding(p);
  await p.click('.install-bar [data-install]');
  const text = await p.textContent('.sheet');
  ok(name === 'iPhone' ? text.includes('На экран') : text.includes('Установить приложение'), `${name}: шаги установки для своей системы`);
  await p.click('.sheet [data-close]');
  await p.click('.install-bar [data-dismiss]');
  await p.reload();
  await p.waitForTimeout(400);
  ok(!(await p.isVisible('.install-bar')), `${name}: закрытая плашка больше не появляется`);
  ok(await p.evaluate(() => Math.round(document.querySelector('.tabbar').getBoundingClientRect().bottom) === innerHeight), `${name}: вкладки внизу экрана`);
  await c.close();
}

await browser.close();
server.close();
console.log(failed ? `\nПровалено проверок: ${failed}` : '\nВсе проверки пройдены');
process.exit(failed ? 1 : 0);
