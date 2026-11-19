// Проверка правила команды «все цифры — из документации»:
// у каждой строки src/data.js с числом должен быть комментарий `док:`, `демо:` или `README:` (этап 2 «Проверка»; на этой или предыдущей строке).
// Печатает список значений null — это цифры, которых нет в документации (уточнить у Асмира).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lines = readFileSync(join(root, 'src/data.js'), 'utf8').split('\n');
const stripStrings = (l) => l.replace(/'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g, "''");
let bad = 0;
const nulls = [];
let inTemplate = false;
lines.forEach((line, i) => {
  const ticks = (line.match(/`/g) || []).length;
  const wasInTemplate = inTemplate;
  if (ticks % 2 === 1) inTemplate = !inTemplate;
  if (wasInTemplate && !line.includes('док:')) return; // содержимое многострочной строки (скрипт PowerShell)
  const code = stripStrings(line.split('//')[0]);
  const hasNumber = /(^|[^\w.])\d[\d_]*(\.\d+)?/.test(code);
  const annotated = (l) => /\/\/.*(док|демо|README)/.test(l || '');
  // комментарий-строка «// док: …» сразу над строкой (до 3 строк выше, только комментарии между ними)
  let block = false;
  for (let j = i - 1; j >= Math.max(0, i - 3); j--) {
    if (!/^\s*\/\//.test(lines[j])) break;
    if (/док|демо|README/.test(lines[j])) { block = true; break; }
  }
  if (hasNumber && !annotated(line) && !block) {
    bad++;
    console.log(`без источника, строка ${i + 1}: ${line.trim()}`);
  }
  if (/\bnull\b/.test(code)) nulls.push(`строка ${i + 1}: ${line.trim()}`);
});
console.log(`\nЗначений null (нет в документации, спросить Асмира): ${nulls.length}`);
nulls.forEach((n) => console.log('  ' + n));
console.log(bad ? `\nСтрок с цифрами без источника: ${bad}` : '\nУ всех цифр есть источник');
process.exit(bad ? 1 : 0);
