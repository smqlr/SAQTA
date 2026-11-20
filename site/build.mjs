// Сборка сайта в один файл: node site/build.mjs → site/index.html
// Стили, скрипт (с формулами из src/lib), снимки приложения и QR-код — внутри файла, поэтому сайт работает и без интернета.
import { build, transform } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import qrcode from 'qrcode-generator';
import { SORT_BINS, SORT_FLAG } from '../src/data.js';

const here = dirname(fileURLToPath(import.meta.url));
const APP_URL = 'https://smqlr.github.io/SAQTA/';

// Бюджет пилота — документация команды, раздел «Бюджет и сроки» (68 строк сведены в 13 статей)
const BUDGET = [
  ['Команда', 4652400, 'М1–М6, техник с М3'],
  ['Двигатель «Тонны»', 935000, 'М2–М6'],
  ['Логистика', 672000, 'М2–М6'],
  ['Помещение', 630000, 'М1–М6'],
  ['Бонусный кошелёк', 500000, 'М2–М6'],
  ['Резерв', 393559, 'по необходимости'],
  ['Юридическое и учёт', 388000, 'М1–М6'],
  ['Привлечение жителей', 385000, 'М1–М6, Тазару күні в М3'],
  ['Склад и безопасность', 357234, 'М1'],
  ['Сбор малой техники', 327520, 'М1–М2'],
  ['ИИ и связь', 306000, 'М1–М6'],
  ['Рабочие места', 286403, 'М1'],
  ['Диагностика и ТЕСТ-30', 166884, 'М1'],
];
const TOTAL = 10000000;
const sum = BUDGET.reduce((a, r) => a + r[1], 0);
if (sum !== TOTAL) throw new Error(`Бюджет не сходится: ${sum} вместо ${TOTAL}`);

const nf = new Intl.NumberFormat('ru-RU');
const pct = (v) => `${(Math.round((v / TOTAL) * 1000) / 10).toFixed(1).replace('.', ',')}%`;
const max = Math.max(...BUDGET.map((r) => r[1]));
const budgetRows = BUDGET.map(([name, v, when]) =>
  `<tr><td>${name}<span class="track" style="display:block;height:6px;background:var(--paper);margin-top:7px"><span style="display:block;height:100%;width:${((v / max) * 100).toFixed(1)}%;background:${name === 'Резерв' ? 'var(--flag)' : 'var(--ink)'}"></span></span></td><td class="num">${nf.format(v)} ₸</td><td class="num">${pct(v)}</td><td>${when}</td></tr>`,
).join('') + `<tr class="total"><td>Итого</td><td class="num">${nf.format(TOTAL)} ₸</td><td class="num">100%</td><td></td></tr>`;

// Цены ящиков — из src/data.js (медианы прайсов OLX), шкала логарифмическая от 10 ₸/кг
const priced = SORT_BINS.filter((b) => b.price > 0).sort((a, b) => b.price - a.price);
const top = Math.log10(priced[0].price) - 1;
const binBars = priced.map((b) => {
  const w = ((Math.log10(b.price) - 1) / top) * 100;
  const flag = b.id === SORT_FLAG.bin ? `<small>с «жёлтым флажком» — до ${nf.format(SORT_FLAG.price)} ₸/кг</small>` : `<small>${b.buyer}</small>`;
  return `<div class="bar-row"><span class="name">${b.label}${flag}</span><span class="val">${nf.format(b.price)}</span><span class="track"><span class="fill${b.id === 'ram' || b.id.startsWith('board') ? ' g' : ''}" style="width:${w.toFixed(1)}%"></span></span></div>`;
}).join('');

// Неразрывные пробелы в тексте (не в атрибутах): 10 000 000, 900 ₸, 15 мин, № 1, тире
function typo(text) {
  return text
    .replace(/(\d) (?=\d{3}(?:\D|$))/g, '$1 ')
    .replace(/(\d) (?=(?:₸|т|кг|ч|мин|с|млн|мОм|°C|%)(?![а-яёА-ЯЁ]))/g, '$1 ')
    .replace(/№ (?=\d)/g, '№ ')
    .replace(/ — /g, ' — ');
}

const qr = qrcode(0, 'M');
qr.addData(APP_URL);
qr.make();
const qrSvg = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true, alt: 'QR: smqlr.github.io/SAQTA', title: 'smqlr.github.io/SAQTA' });

const js = (await build({
  entryPoints: [join(here, 'src', 'site.js')], bundle: true, minify: true, format: 'iife',
  target: ['es2019', 'safari13'], write: false, legalComments: 'none', charset: 'utf8',
})).outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const css = (await transform(readFileSync(join(here, 'src', 'site.css'), 'utf8'), { loader: 'css', minify: true })).code;

let html = readFileSync(join(here, 'src', 'index.html'), 'utf8');
html = html.replace(/>([^<]+)</g, (m, t) => `>${typo(t)}<`);
html = html
  .replace('<tbody></tbody>', () => `<tbody>${budgetRows}</tbody>`)
  .replace('<div class="bars" id="binPrices"></div>', () => `<div class="bars" id="binPrices">${binBars}</div>`)
  .replaceAll('{{QR}}', () => qrSvg)
  .replace(/\{\{IMG:([\w-]+)\}\}/g, (m, n) => `data:image/jpeg;base64,${readFileSync(join(here, 'img', `${n}.jpg`)).toString('base64')}`)
  .replace('/*CSS*/', () => css)
  .replace('/*JS*/', () => js);

const out = join(here, 'index.html');
writeFileSync(out, html);
console.log(`site/index.html — ${(Buffer.byteLength(html) / 1024).toFixed(0)} КБ (скрипт ${(js.length / 1024).toFixed(0)} КБ, стили ${(css.length / 1024).toFixed(0)} КБ)`);
