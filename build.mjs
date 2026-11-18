// Сборка одного офлайн-файла: JS, CSS и картинки внутри HTML. Шрифт — системный, файлов шрифтов нет.
// Выход: dist/<APP_FILE>.html (для флешки) и docs/index.html (для GitHub Pages).
import { build } from 'esbuild';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const { APP_NAME, APP_FILE } = await import(join(root, 'src/data.js'));


const js = await build({
  entryPoints: [join(root, 'src/main.js')],
  bundle: true,
  format: 'iife',
  minify: true,
  target: ['es2020'],
  write: false,
  legalComments: 'none',
  charset: 'utf8',
});

const [tpl, css] = await Promise.all([
  readFile(join(root, 'src/index.html'), 'utf8'),
  readFile(join(root, 'src/styles.css'), 'utf8'),
]);

// Вставляем через функции-замены, чтобы символы `$` в коде не трактовались как шаблоны замены
const jsCode = js.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const html = tpl
  .replaceAll('__APP_NAME__', APP_NAME)
  .replace('/*__CSS__*/', () => css)
  .replace('/*__JS__*/', () => jsCode);

const outFile = join(root, 'dist', `${APP_FILE}.html`);
await mkdir(join(root, 'dist'), { recursive: true });
await mkdir(join(root, 'docs'), { recursive: true });
await writeFile(outFile, html);
await writeFile(join(root, 'docs', 'index.html'), html);

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
console.log(`OK: dist/${APP_FILE}.html и docs/index.html — ${(html.length / 1024).toFixed(0)} КБ`);
