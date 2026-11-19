// Иконки и скриншоты для установки SAQTA на телефон (PWA). Запуск после `npm run build`:
//   node tools/pwa-assets.mjs
// Нужен Playwright с Chromium. Результат — в src/pwa/; build.mjs копирует его в docs/.
import { createRequire } from 'node:module';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pwa = join(root, 'src/pwa');
const { APP_FILE } = await import(join(root, 'src/data.js'));
const { ICON } = await import(join(root, 'src/lib/icons.js'));

const BRAND = '#1d8a4a';
// Знак приложения без фона: круговая стрелка и галочка (как в icon.svg)
const GLYPH = '<g fill="none" stroke="#fff" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"><path d="M392 256a136 136 0 1 1-51-106"/><path d="M392 120v86h-86"/><path d="M196 264l40 40 76-86"/></g>';
// scale — доля знака от холста: маскируемая иконка Android обрезается до круга, знак держим в безопасной зоне
const fullBleed = (scale) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="${BRAND}"/>
  <g transform="translate(256 256) scale(${scale}) translate(-256 -256)">${GLYPH}</g></svg>`;
const shortcut = (icon) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" rx="22" fill="${BRAND}"/>
  <svg x="24" y="24" width="48" height="48" viewBox="0 0 24 24" style="color:#fff">${icon.replace(/<svg[^>]*>|<\/svg>/g, '')}</svg></svg>`
  .replace('fill="none" stroke="currentColor"', '');

const ICONS = [
  { file: 'icon-192.png', size: 192, svg: readFileSync(join(pwa, 'icon.svg'), 'utf8') },
  { file: 'icon-512.png', size: 512, svg: readFileSync(join(pwa, 'icon.svg'), 'utf8') },
  { file: 'icon-maskable-512.png', size: 512, svg: fullBleed(0.72) },
  { file: 'apple-touch-icon.png', size: 180, svg: fullBleed(0.82) },
  { file: 'shortcut-give.png', size: 96, svg: shortcut(ICON.camera) },
  { file: 'shortcut-wallet.png', size: 96, svg: shortcut(ICON.wallet) },
  { file: 'shortcut-akimat.png', size: 96, svg: shortcut(ICON.akimat) },
];

// Браузер: как в tests/e2e.mjs — Chromium Playwright, иначе Google Chrome, иначе заранее установленный Chromium
async function launch() {
  try { return await chromium.launch(); } catch { /* нет браузера этой версии Playwright */ }
  try { return await chromium.launch({ channel: 'chrome' }); } catch { /* нет Google Chrome */ }
  return chromium.launch({ executablePath: process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium' });
}
const browser = await launch();
for (const ic of ICONS) {
  const p = await browser.newPage({ viewport: { width: ic.size, height: ic.size }, deviceScaleFactor: 1 });
  const svg = ic.svg.replace('<svg ', `<svg width="${ic.size}" height="${ic.size}" `)
    .replace(/<svg x="24"([^>]*)>/, '<svg x="24"$1 fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">');
  await p.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block}</style>${svg}`);
  await p.screenshot({ path: join(pwa, ic.file), omitBackground: true });
  await p.close();
}

// Скриншоты для окна установки (Android показывает их в карточке приложения)
mkdirSync(join(pwa, 'screens'), { recursive: true });
const file = `file://${join(root, 'dist', `${APP_FILE}.html`)}`;
const SHOTS = [
  { name: 'phone-resident.png', hash: 'resident', vp: { width: 390, height: 844 }, dpr: 2 },
  { name: 'phone-wallet.png', hash: 'wallet', vp: { width: 390, height: 844 }, dpr: 2 },
  { name: 'phone-hub.png', hash: 'hub', vp: { width: 390, height: 844 }, dpr: 2 },
  { name: 'wide-akimat.png', hash: 'akimat', vp: { width: 1280, height: 800 }, dpr: 1 },
];
for (const s of SHOTS) {
  const p = await browser.newPage({ viewport: s.vp, deviceScaleFactor: s.dpr, isMobile: s.vp.width < 600, hasTouch: s.vp.width < 600 });
  await p.goto(`${file}#${s.hash}`);
  await p.waitForTimeout(900);
  await p.screenshot({ path: join(pwa, 'screens', s.name) });
  await p.close();
}
await browser.close();
console.log(`OK: ${ICONS.length} иконок и ${SHOTS.length} скриншота в src/pwa/`);
