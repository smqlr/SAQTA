// Проверка на «живых» фото, которых не было в обучении (проверочная часть по хэшу id): вырезаем вещь как
// снимок жителя (квадрат ×1,4 вокруг рамки), сохраняем JPEG и прогоняем через само приложение (офлайн-файл).
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const REPO = join(import.meta.dirname, '../..');
const { chromium } = createRequire(REPO + '/package.json')('playwright');
const OI = process.env.OI_DIR || join(import.meta.dirname, 'data');
const OUT = join(OI, 'real');
mkdirSync(OUT, { recursive: true });
const samples = JSON.parse(readFileSync(join(OI, 'samples.json'), 'utf8'));
const hash = (s) => { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const WANT = { phone: 40, player: 12, tablet: 12, remote: 10, calculator: 10, headphones: 10, laptop: 10, charger: 8 };
const pick = [];
for (const [cls, n] of Object.entries(WANT)) {
  const list = samples.filter((s) => s.cls === cls && s.box && hash(s.id) % 100 < 12 && existsSync(join(OI, 'imgs', s.file)) && statSync(join(OI, 'imgs', s.file)).size > 2000);
  pick.push(...list.slice(0, n));
}
const LABEL = { phone: /Телефон/, player: /Плеер/, tablet: /Планшет/, remote: /Пульт/, calculator: /Калькулятор/, headphones: /Наушники/, laptop: /Ноутбук/, charger: /Зарядка/ };
const browser = await chromium.launch({ channel: 'msedge' });
// 1) вырезаем
const cp = await browser.newPage();
for (const s of pick) {
  const out = join(OUT, `${s.cls}-${s.id}.jpg`);
  if (existsSync(out)) continue;
  const b64 = readFileSync(join(OI, 'imgs', s.file)).toString('base64');
  const jpg = await cp.evaluate(async ({ b64, box }) => {
    const bmp = await createImageBitmap(await (await fetch('data:image/jpeg;base64,' + b64)).blob());
    const W = bmp.width, H = bmp.height, [x0, x1, y0, y1] = box;
    const bw = (x1 - x0) * W, bh = (y1 - y0) * H, side = Math.min(Math.max(bw, bh) * 1.4, W, H);
    let sx = (x0 * W + bw / 2) - side / 2, sy = (y0 * H + bh / 2) - side / 2;
    sx = Math.max(0, Math.min(W - side, sx)); sy = Math.max(0, Math.min(H - side, sy));
    const c = document.createElement('canvas'); c.width = 640; c.height = 640;
    c.getContext('2d').drawImage(bmp, sx, sy, side, side, 0, 0, 640, 640);
    return c.toDataURL('image/jpeg', 0.9).split(',')[1];
  }, { b64, box: s.box });
  writeFileSync(out, Buffer.from(jpg, 'base64'));
}
await cp.close();
// 2) прогоняем через приложение
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
await ctx.route('**/*', (r) => (/^(file|data|blob):/.test(r.request().url()) ? r.continue() : r.abort()));
const page = await ctx.newPage();
await page.goto(pathToFileURL(join(REPO, 'dist/saqta.html')).href);
await page.waitForSelector('.onb');
for (let i = 0; i < 4; i++) await page.click('[data-onb="next"]');
await page.fill('#onbName', 'Тест'); await page.click('[data-onb="issue"]'); await page.click('[data-onb="done"]');
const res = {};
const wrong = [];
for (const s of pick) {
  await page.evaluate(() => { location.hash = 'resident'; });
  await page.waitForTimeout(150);
  if (!(await page.$('#photoInput'))) await page.click('[data-go="start"]');
  await page.setInputFiles('#photoInput', join(OUT, `${s.cls}-${s.id}.jpg`));
  await page.waitForSelector('.guess-i, .notice.warn', { timeout: 120000 });
  const top = ((await page.textContent('.guess-i[aria-pressed="true"] b').catch(() => '')) || 'НЕ ТЕХНИКА').trim();
  const all = await page.$$eval('.guess-i', (els) => els.map((e) => e.textContent.replace(/\s+/g, ' ').trim()));
  res[s.cls] ??= { n: 0, ok: 0, top2: 0 };
  res[s.cls].n++;
  if (LABEL[s.cls].test(top)) res[s.cls].ok++; else wrong.push(`${s.cls}-${s.id}: «${top}» | ${all.join(' / ')}`);
  if (all.slice(0, 2).some((t) => LABEL[s.cls].test(t))) res[s.cls].top2++;
  await page.click('.back').catch(() => {});
}
for (const [c, v] of Object.entries(res)) console.log(`${c.padEnd(11)} первая догадка ${v.ok}/${v.n}, в двух первых ${v.top2}/${v.n}`);
console.log('--- ошибки:'); for (const w of wrong) console.log(w);
await browser.close();
