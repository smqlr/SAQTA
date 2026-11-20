// Проверенные людьми метки «на фото есть X» (Open Images) для видов техники без рамок
import { createWriteStream } from 'node:fs';
export const IMG = {
  '/m/0169zh': 'phone', '/m/027lnzs': 'phone', '/m/0bxyyx_': 'phone', '/m/09rvlp4': 'tablet', '/m/04bkg6': 'ebook',
  '/m/0403lcy': 'laptop', '/m/0dvvc': 'pc', '/m/049d8b': 'pc', '/m/03mb156': 'headphones',
  '/m/0nvhx_': 'kettle', '/m/0h8nvhx': 'kettle', '/m/0d8rlg': 'heater', '/m/0h8kvt3': 'player', '/m/05bfd4': 'player',
  '/m/0466s58': 'router', '/m/04wyr': 'router', '/m/07_tb': 'console', '/m/05zxk': 'console', '/m/0q56v': 'console', '/m/044fq': 'console',
  '/m/04jphh9': 'iron', '/m/0d31p': 'vacuum', '/m/0cfpc': 'speaker', '/m/0cf89': 'speaker', '/m/06bz3': 'speaker',
  '/m/02jq5x': 'projector', '/m/0h8n5ml': 'projector', '/m/03l34': 'disk', '/m/023s_v': 'disk', '/m/01c0z': 'battery',
  '/m/0892cv': 'charger', '/m/03bx2yv': 'charger', '/m/0h8mdzr': 'charger', '/m/0bmz2': 'charger', '/m/04b7gf': 'charger',
  '/m/01127': 'ac',
};
if (process.argv[2]) {
  const out = createWriteStream('imglabels-filtered.csv');
  let kept = 0, rows = 0;
  for (const [split, url] of [['validation', 'https://storage.googleapis.com/openimages/v5/validation-annotations-human-imagelabels.csv'], ['test', 'https://storage.googleapis.com/openimages/v5/test-annotations-human-imagelabels.csv'], ['train', 'https://storage.googleapis.com/openimages/v6/oidv6-train-annotations-human-imagelabels.csv']]) {
    const res = await fetch(url);
    const dec = new TextDecoder();
    let buf = '';
    for await (const chunk of res.body) {
      buf += dec.decode(chunk, { stream: true });
      let start = 0, nl;
      while ((nl = buf.indexOf('\n', start)) !== -1) {
        const line = buf.slice(start, nl); start = nl + 1; rows++;
        const p = line.trim().split(',');
        const cls = IMG[p[2]];
        if (cls && p[3] === '1') { out.write(`${split},${p[0]},${p[2]},${cls}\n`); kept++; }
      }
      buf = buf.slice(start);
    }
    console.log(split, 'rows so far', rows, 'kept', kept);
  }
  out.end();
  console.log('DONE', rows, kept);
}
