// Проверка сжатой модели в Node (процессор): node tools/ai/test-node.mjs фото1.jpg фото2.jpg …
// Нужен sharp (npm i -g sharp или в отдельной папке) — путь к нему в переменной SHARP.
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-cpu';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const sharp = createRequire(import.meta.url)(process.env.SHARP || 'sharp');
const { topGroups } = await import(pathToFileURL(join(root, 'src/lib/ai-map.js')).href);
const M = JSON.parse(await readFile(join(root, 'src/ai/mobilenet.json'), 'utf8'));
const w = await readFile(join(root, 'src/ai/mobilenet.bin'));
await tf.setBackend('cpu');
const model = await loadGraphModel(tf.io.fromMemory({ modelTopology: M.modelTopology, weightSpecs: M.weightSpecs, weightData: w.buffer.slice(w.byteOffset, w.byteOffset + w.length), format: M.format }));
for (const f of process.argv.slice(2)) {
  const { data } = await sharp(f).flatten({ background: '#fff' }).resize(224, 224, { fit: 'contain', background: '#fff' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const probs = tf.tidy(() => {
    const img = tf.div(tf.cast(tf.tensor3d(new Uint8Array(data), [224, 224, 3], 'int32'), 'float32'), 255);
    const logits = model.predict(tf.reshape(img, [1, 224, 224, 3]));
    return tf.softmax(tf.slice(logits, [0, 1], [-1, 1000]));
  });
  const p = await probs.data();
  const { guesses, techness } = topGroups(p);
  if (process.env.TOP) {
    const L = createRequire(import.meta.url)(process.env.TOP).IMAGENET_CLASSES;
    const idx = [...p.keys()].sort((a, b) => p[b] - p[a]).slice(0, 5);
    console.log('   top5:', idx.map((i) => `${i}:${L[i].split(',')[0]} ${(p[i] * 100).toFixed(0)}%`).join(' | '));
  }
  console.log(f.split(/[\\/]/).slice(-2).join('/'), `техника ${(techness * 100).toFixed(0)}%:`, guesses.map((g) => `${g.label} ${(g.prob * 100).toFixed(0)}%`).join(', '));
}
