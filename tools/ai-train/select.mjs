// Выбор обучающих образцов: рамки Open Images (вырезаем вещь) + проверенные метки «на фото есть X» (фото целиком)
import { createReadStream, readFileSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { OI } from './classes.mjs';
import { IMG } from './imglabels.mjs';

const names = Object.fromEntries(readFileSync('boxable.csv', 'utf8').trim().split(/\r?\n/).map((l) => { const i = l.indexOf(','); return [l.slice(0, i), l.slice(i + 1)]; }));
const mid2oi = {};
for (const [mid, n] of Object.entries(names)) if (OI[n]) mid2oi[mid] = n;

async function lines(file, fn) {
  const rl = createInterface({ input: createReadStream(file, { highWaterMark: 1 << 20 }), crlfDelay: Infinity });
  let n = 0;
  for await (const l of rl) { if (n++) fn(l); }
  return n;
}

const boxes = {}; // oiName → [{split,id,box,occ}]
for (const [split, file] of [['validation', 'validation-bbox.csv'], ['test', 'test-bbox.csv'], ['train', 'train-bbox.csv']]) {
  const t0 = Date.now();
  const n = await lines(file, (l) => {
    const c2 = l.indexOf(',', l.indexOf(',') + 1), c3 = l.indexOf(',', c2 + 1);
    const oi = mid2oi[l.slice(c2 + 1, c3)];
    if (!oi) return;
    const p = l.split(',');
    if (p[10] === '1' || p[11] === '1') return; // группа или рисунок
    const x0 = +p[4], x1 = +p[5], y0 = +p[6], y1 = +p[7];
    const w = x1 - x0, h = y1 - y0;
    if (w * h < 0.02 || w < 0.08 || h < 0.08) return; // слишком мелко
    (boxes[oi] ??= []).push({ split, id: p[0], box: [x0, x1, y0, y1], occ: p[8] === '1' });
  });
  console.log(split, 'bbox rows', n, ((Date.now() - t0) / 1000).toFixed(0) + 's');
}

const imgs = {}; // cls → [{split,id}]
for (const [split, file] of [['validation', 'val-imglabels.csv'], ['test', 'test-imglabels.csv'], ['train', 'train-imglabels.csv']]) {
  const t0 = Date.now();
  const n = await lines(file, (l) => {
    const c1 = l.indexOf(','), c2 = l.indexOf(',', c1 + 1), c3 = l.indexOf(',', c2 + 1);
    const cls = IMG[l.slice(c2 + 1, c3)];
    if (!cls || l.slice(c3 + 1).trim() !== '1') return;
    (imgs[cls] ??= []).push({ split, id: l.slice(0, c1) });
  });
  console.log(split, 'imglabel rows', n, ((Date.now() - t0) / 1000).toFixed(0) + 's');
}

// Рамки техники по фото: «не техника» не должна содержать технику, а фото целиком — чужую крупную технику
const techBoxes = new Map(); // id → [{cls, box}]
for (const [oi, list] of Object.entries(boxes)) {
  if (OI[oi] === 'other') continue;
  for (const b of list) { if (!techBoxes.has(b.id)) techBoxes.set(b.id, []); techBoxes.get(b.id).push({ cls: OI[oi], box: b.box }); }
}
const inter = (a, b) => Math.max(0, Math.min(a[1], b[1]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[2], b[2]));
const area = (a) => (a[1] - a[0]) * (a[3] - a[2]);
const grow = ([x0, x1, y0, y1], k) => { const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, w = (x1 - x0) * k / 2, h = (y1 - y0) * k / 2; return [cx - w, cx + w, cy - h, cy + h]; };
let droppedNeg = 0, droppedImg = 0;
for (const [oi, list] of Object.entries(boxes)) {
  if (OI[oi] !== 'other') continue;
  boxes[oi] = list.filter((b) => {
    const crop = grow(b.box, 1.5);
    const bad = (techBoxes.get(b.id) || []).some((t) => inter(crop, t.box) > 0.25 * area(t.box));
    if (bad) droppedNeg++;
    return !bad;
  });
}
for (const [cls, list] of Object.entries(imgs)) {
  imgs[cls] = list.filter((x) => {
    const bad = (techBoxes.get(x.id) || []).some((t) => t.cls !== cls && area(t.box) > 0.12);
    if (bad) droppedImg++;
    return !bad;
  });
}
console.log('dropped negatives with tech inside', droppedNeg, '| whole photos with other big tech', droppedImg);

// детерминированное перемешивание
let seed = 12345;
const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const CAP = { phone: 2200, tablet: 1000, laptop: 1000, monitor: 900, tv: 900, headphones: 900, camera: 800, keyboard: 700, mouse: 700, remote: 900, calculator: 700, player: 900, watch: 800, other: 3200 };
const DEFAULT_CAP = 600;
const IMG_CAP = { phone: 700, tablet: 400, laptop: 200, headphones: 300, kettle: 300, player: 500 };
const IMG_DEFAULT = 650;

// класс → образцы; рамки одного класса Open Images делим поровну между его OI-именами
const byCls = {};
const oiByCls = {};
for (const [oi, list] of Object.entries(boxes)) (oiByCls[OI[oi]] ??= []).push(oi);
for (const [cls, ois] of Object.entries(oiByCls)) {
  const cap = CAP[cls] ?? DEFAULT_CAP;
  const per = Math.ceil(cap / ois.length);
  const pool = [];
  // сначала поровну с каждого OI-класса, остаток — из самых больших
  const lists = ois.map((oi) => shuffle([...boxes[oi]]).sort((a, b) => a.occ - b.occ));
  for (const l of lists) pool.push(...l.splice(0, per).map((x) => ({ ...x, oi: ois[lists.indexOf(l)] })));
  const rest = shuffle(lists.flatMap((l, k) => l.map((x) => ({ ...x, oi: ois[k] }))));
  while (pool.length < cap && rest.length) pool.push(rest.pop());
  byCls[cls] = pool.slice(0, cap).map((x) => ({ ...x, src: 'box' }));
}
for (const [cls, list] of Object.entries(imgs)) {
  const cap = IMG_CAP[cls] ?? IMG_DEFAULT;
  const uniq = [...new Map(list.map((x) => [x.id, x])).values()];
  (byCls[cls] ??= []).push(...shuffle(uniq).slice(0, cap).map((x) => ({ ...x, box: null, src: 'img' })));
}

const samples = [];
for (const [cls, list] of Object.entries(byCls)) for (const s of list) samples.push({ cls, split: s.split, id: s.id, box: s.box, src: s.src, oi: s.oi || '' });
shuffle(samples);
samples.forEach((s, i) => { s.i = i; s.file = s.id + '.jpg'; });
writeFileSync('samples.json', JSON.stringify(samples));
const imgSet = new Map(samples.map((s) => [s.id, s.split]));
writeFileSync('download.txt', [...imgSet].map(([id, split]) => `${split}/${id}`).join('\n'));
const counts = {};
for (const s of samples) { counts[s.cls] ??= { box: 0, img: 0 }; counts[s.cls][s.src]++; }
for (const [k, v] of Object.entries(counts).sort((a, b) => (b[1].box + b[1].img) - (a[1].box + a[1].img))) console.log(k.padEnd(12), 'box', String(v.box).padStart(5), 'img', String(v.img).padStart(5), '| available boxes', (oiByCls[k] || []).map((oi) => `${oi}:${boxes[oi].length}`).join(' '), '| imgs', imgs[k]?.length || 0);
console.log('samples', samples.length, 'unique images', imgSet.size);
