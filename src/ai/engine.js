// ИИ в телефоне: MobileNet v2 (ImageNet), веса uint8 3,3 МБ. Собирается отдельным файлом (ai/engine.js),
// грузится только когда житель фотографирует вещь. Работает без интернета: WebGL, а если его нет — процессор.
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import MODEL from './mobilenet.json';

let model = null;

async function load(weightData) {
  if (model) return;
  let ok = false;
  try { ok = await tf.setBackend('webgl'); } catch { ok = false; }
  if (!ok) await tf.setBackend('cpu');
  await tf.ready();
  model = await loadGraphModel(tf.io.fromMemory({
    modelTopology: MODEL.modelTopology,
    weightSpecs: MODEL.weightSpecs,
    weightData,
    format: MODEL.format,
    generatedBy: MODEL.generatedBy,
    convertedBy: MODEL.convertedBy,
  }));
  tf.tidy(() => model.predict(tf.zeros([1, 224, 224, 3]))); // прогрев
}

// source — canvas 224×224. Вход модели — [0, 1], выход — 1001 логит (первый — «фон», его убираем).
async function classify(source) {
  const probs = tf.tidy(() => {
    const img = tf.div(tf.cast(tf.browser.fromPixels(source), 'float32'), 255);
    const logits = model.predict(tf.reshape(img, [1, 224, 224, 3]));
    return tf.softmax(tf.slice(logits, [0, 1], [-1, 1000]));
  });
  const data = await probs.data();
  probs.dispose();
  return data;
}

window.QAITA_AI = { load, classify, backend: () => tf.getBackend() };
