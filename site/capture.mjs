// Свежие снимки приложения для сайта: node site/capture.mjs
// Открывает собранное приложение docs/index.html, пропускает знакомство и снимает главные экраны.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'site', 'img');
mkdirSync(out, { recursive: true });
const app = pathToFileURL(join(root, 'docs', 'index.html')).href;

async function launch() {
  if (process.env.PW_CHANNEL) return chromium.launch({ channel: process.env.PW_CHANNEL });
  try { return await chromium.launch(); } catch { return chromium.launch({ channel: 'chrome' }); }
}

const shots = [
  { name: 'app-home', hash: '#home' },
  { name: 'app-map', hash: '#map' },
  { name: 'app-wallet', hash: '#wallet' },
  { name: 'app-extend', hash: '#extend' },
  { name: 'app-hub', hash: '#hub' },
  { name: 'app-akimat', hash: '#akimat', wide: true },
];

const browser = await launch();
for (const s of shots) {
  const ctx = await browser.newContext({
    viewport: s.wide ? { width: 1280, height: 800 } : { width: 390, height: 844 },
    deviceScaleFactor: 2, colorScheme: 'light', locale: 'ru-RU',
  });
  const page = await ctx.newPage();
  await page.goto(app + s.hash);
  await page.waitForTimeout(900);
  const skip = page.locator('[data-onb="skip"]');
  if (await skip.count()) { await skip.first().click(); await page.waitForTimeout(400); }
  await page.evaluate((h) => { location.hash = h; }, s.hash);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: join(out, `${s.name}.jpg`), type: 'jpeg', quality: 80 });
  console.log(s.name, await page.evaluate(() => location.hash), (await page.title()));
  await ctx.close();
}
await browser.close();
