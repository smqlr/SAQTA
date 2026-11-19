// Сборка одного офлайн-файла: JS, CSS и картинки внутри HTML. Шрифт — системный, файлов шрифтов нет.
// Выход: dist/<APP_FILE>.html (для флешки) и docs/index.html (для GitHub Pages).
import { build } from 'esbuild';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const { APP_NAME, APP_FILE } = await import(pathToFileURL(join(root, 'src/data.js')).href);


const js = await build({
  entryPoints: [join(root, 'src/main.js')],
  bundle: true,
  format: 'iife',
  minify: true,
  target: ['es2020'],
  write: false,
  legalComments: 'none',
  charset: 'utf8',
  // данные карты Актобе: gzip внутри файла, распаковка в браузере; фото техники — webp внутри файла
  loader: { '.gz': 'binary', '.webp': 'dataurl' },
});

const [tpl, appCss, appCss2, leafletCss] = await Promise.all([
  readFile(join(root, 'src/index.html'), 'utf8'),
  readFile(join(root, 'src/styles.css'), 'utf8'),
  readFile(join(root, 'src/styles-app.css'), 'utf8'),
  readFile(join(root, 'node_modules/leaflet/dist/leaflet.css'), 'utf8'),
]);
// Стандартные картинки Leaflet (маркеры, слои) не используются — убираем ссылки, чтобы файл не ходил в сеть
const css = `${leafletCss.replace(/url\([^)]*\)/g, 'none')}\n${appCss}\n${appCss2}`;

// ИИ в телефоне (MobileNet v2): отдельный файл, грузится только при первом фото
const ai = await build({
  entryPoints: [join(root, 'src/ai/engine.js')],
  bundle: true,
  format: 'iife',
  minify: true,
  target: ['es2020'],
  write: false,
  legalComments: 'none',
  charset: 'utf8',
  loader: { '.json': 'json' },
});
const aiJs = ai.outputFiles[0].text;
const aiWeights = await readFile(join(root, 'src/ai/mobilenet.bin'));

// Вставляем через функции-замены, чтобы символы `$` в коде не трактовались как шаблоны замены
const jsCode = js.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const html = tpl
  .replaceAll('__APP_NAME__', APP_NAME)
  .replace('/*__CSS__*/', () => css)
  .replace('/*__JS__*/', () => jsCode);
// Офлайн-файл: движок и веса ИИ внутри (text/plain — браузер их не исполняет, пока житель не сфотографирует вещь)
const inlineAi = `<script type="text/plain" id="qaita-ai-js">${aiJs.replace(/<\/script/gi, '<\\/script')}</script>\n<script type="text/plain" id="qaita-ai-w">${aiWeights.toString('base64')}</script>\n`;
const offline = html.replace('</body>', () => `${inlineAi}</body>`);

const outFile = join(root, 'dist', `${APP_FILE}.html`);
await mkdir(join(root, 'dist'), { recursive: true });
await mkdir(join(root, 'docs', 'ai'), { recursive: true });
await writeFile(outFile, offline);
await writeFile(join(root, 'docs', 'index.html'), html);
await writeFile(join(root, 'docs', 'ai', 'engine.js'), aiJs);
await writeFile(join(root, 'docs', 'ai', 'mobilenet.bin'), aiWeights);

// PWA только для версии на GitHub Pages (на file:// main.js их не подключает)
const version = createHash('sha1').update(html).digest('hex').slice(0, 10);
await writeFile(join(root, 'docs', 'manifest.webmanifest'), JSON.stringify({
  name: APP_NAME,
  short_name: APP_NAME,
  lang: 'ru',
  start_url: './',
  scope: './',
  display: 'standalone',
  background_color: '#f2f2f7',
  theme_color: '#f9f9fb',
  icons: [
    { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml' },
  ],
}, null, 2));
const sw = (await readFile(join(root, 'src/pwa/sw.js'), 'utf8')).replace('__VERSION__', version);
await writeFile(join(root, 'docs', 'sw.js'), sw);
for (const f of ['icon.svg', 'icon-192.png', 'icon-512.png']) await copyFile(join(root, 'src/pwa', f), join(root, 'docs', f));
await writeFile(join(root, 'docs', '.nojekyll'), '');
console.log(`OK: dist/${APP_FILE}.html — ${(offline.length / 1048576).toFixed(1)} МБ (с ИИ внутри), docs/index.html — ${(html.length / 1024).toFixed(0)} КБ, docs/ai — ${((aiJs.length + aiWeights.length) / 1048576).toFixed(1)} МБ`);
