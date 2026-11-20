// Бандл для обучения: тот же MobileNet v2 и тот же tfjs, что в приложении; отдаёт признаки слоя AvgPool (1280)
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-core/dist/register_all_gradients';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import MODEL from '../../src/ai/mobilenet.json';
let model;
const FEAT = 'module_apply_default/MobilenetV2/Logits/AvgPool';
const LOGITS = 'module_apply_default/MobilenetV2/Logits/output';
async function load(weightData) {
  await tf.setBackend('webgl'); await tf.ready();
  model = await loadGraphModel(tf.io.fromMemory({ modelTopology: MODEL.modelTopology, weightSpecs: MODEL.weightSpecs, weightData, format: MODEL.format }));
  return tf.getBackend();
}
// canvases — массив canvas 224×224 → Float32Array (n×1280) признаков и (n×1000) вероятностей ImageNet
async function feats(canvases) {
  const [f, p] = tf.tidy(() => {
    const x = tf.stack(canvases.map((c) => tf.div(tf.cast(tf.browser.fromPixels(c), 'float32'), 255)));
    const [fe, lo] = model.execute(x, [FEAT, LOGITS]);
    return [tf.reshape(fe, [canvases.length, 1280]), tf.softmax(tf.slice(lo, [0, 1], [-1, 1000]))];
  });
  const out = [await f.data(), await p.data()];
  f.dispose(); p.dispose();
  return out;
}
window.FE = { load, feats, tf };
