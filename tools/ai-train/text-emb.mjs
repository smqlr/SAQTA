// Текстовые эмбеддинги MobileCLIP для описаний классов (нулевое обучение: «фото смартфона» и т. п.)
import { AutoTokenizer, CLIPTextModelWithProjection, env } from '@huggingface/transformers';
import { writeFileSync } from 'node:fs';
env.cacheDir = './hf-cache';

export const PROMPTS = {
  phone: ['a smartphone', 'a mobile phone', 'a cell phone', 'an old mobile phone', 'a push-button cell phone', 'the back of a smartphone with cameras', 'an iPhone', 'an Android phone'],
  tablet: ['a tablet computer', 'an iPad', 'an Android tablet'],
  ebook: ['an e-book reader', 'a Kindle e-reader'],
  laptop: ['a laptop', 'a notebook computer', 'an open laptop', 'a closed laptop', 'a MacBook'],
  pc: ['a desktop computer tower', 'a PC system unit', 'a computer case'],
  monitor: ['a computer monitor', 'a desktop display screen'],
  tv: ['a television', 'a TV set', 'a flat screen TV', 'an old CRT television'],
  keyboard: ['a computer keyboard'],
  mouse: ['a computer mouse'],
  headphones: ['headphones', 'wireless earbuds', 'a headset', 'earphones'],
  camera: ['a camera', 'a digital camera', 'a DSLR camera', 'a camcorder'],
  microwave: ['a microwave oven'],
  fridge: ['a refrigerator', 'a fridge', 'a freezer'],
  washer: ['a washing machine'],
  dishwasher: ['a dishwasher'],
  stove: ['a kitchen stove', 'an oven', 'a gas stove', 'an electric cooktop'],
  kettle: ['an electric kettle', 'a kettle'],
  coffee: ['a coffee maker', 'an espresso machine', 'a coffee machine'],
  blender: ['a blender', 'a food processor', 'a stand mixer', 'a hand mixer'],
  toaster: ['a toaster', 'a waffle iron', 'a sandwich maker'],
  multicooker: ['a slow cooker', 'a multicooker', 'a pressure cooker', 'a rice cooker'],
  dryer: ['a hair dryer', 'a hair straightener', 'an electric shaver'],
  fan: ['an electric fan', 'a ceiling fan', 'a desk fan'],
  heater: ['a space heater', 'an electric heater', 'an oil radiator heater', 'a humidifier'],
  lamp: ['a lamp', 'a desk lamp', 'a floor lamp', 'a light bulb'],
  flashlight: ['a flashlight', 'a torch'],
  tool: ['a power drill', 'a power tool', 'an angle grinder', 'a chainsaw', 'a cordless screwdriver'],
  calculator: ['a calculator', 'a pocket calculator'],
  watch: ['a wristwatch', 'a smartwatch', 'a fitness tracker band'],
  clock: ['an alarm clock', 'a wall clock', 'a digital clock'],
  remote: ['a remote control', 'a TV remote control'],
  printer: ['a printer', 'a laser printer', 'a fax machine', 'a scanner'],
  player: ['an iPod', 'an MP3 player', 'a cassette player', 'a portable media player', 'a walkman'],
  landline: ['a landline telephone', 'a corded phone', 'a cordless home phone', 'a rotary phone'],
  microphone: ['a microphone'],
  synth: ['an electronic keyboard instrument', 'a synthesizer', 'a digital piano'],
  sewing: ['a sewing machine'],
  router: ['a wifi router', 'a modem', 'a network router with antennas'],
  console: ['a video game console', 'a game controller', 'a gamepad', 'a PlayStation', 'a handheld game console'],
  iron: ['a clothes iron', 'a steam iron'],
  vacuum: ['a vacuum cleaner', 'a robot vacuum cleaner', 'a cordless stick vacuum'],
  speaker: ['a loudspeaker', 'a bluetooth speaker', 'a radio', 'a subwoofer', 'a smart speaker'],
  projector: ['a video projector'],
  disk: ['a hard disk drive', 'a USB flash drive', 'an SSD', 'an external hard drive'],
  battery: ['batteries', 'AA batteries', 'a car battery', 'a lithium battery pack'],
  charger: ['a phone charger', 'a power adapter', 'a USB cable', 'an extension cord', 'tangled cables', 'a laptop charger'],
  ac: ['an air conditioner', 'a split air conditioner unit', 'a window air conditioner'],
  other: ['a book', 'a cup', 'a shoe', 'a toy', 'a bag', 'a plant', 'a person', 'a chair', 'food', 'a bottle', 'a cat', 'a dog', 'a room', 'a table', 'clothes', 'a wallet', 'a box', 'a picture frame', 'a pen', 'a window'],
};
const TEMPLATES = ['a photo of {}.', 'a close-up photo of {}.', 'a photo of an old {}.', 'a photo of a broken {}.', '{} on a table.'];

if (process.argv[2]) {
  const tok = await AutoTokenizer.from_pretrained('Xenova/mobileclip_s0');
  const model = await CLIPTextModelWithProjection.from_pretrained('Xenova/mobileclip_s0', { dtype: 'fp32' });
  const out = {};
  for (const [cls, ps] of Object.entries(PROMPTS)) {
    const texts = ps.flatMap((p) => TEMPLATES.map((t) => t.replace('{}', p).replace('an old a ', 'an old ').replace('a broken a ', 'a broken ').replace('an old an ', 'an old ').replace('a broken an ', 'a broken ')));
    const inputs = tok(texts, { padding: 'max_length', truncation: true, max_length: 77 });
    const { text_embeds } = await model(inputs);
    const d = text_embeds.dims[1], data = text_embeds.data;
    const mean = new Float64Array(d);
    for (let i = 0; i < texts.length; i++) {
      let n = 0; for (let j = 0; j < d; j++) n += data[i * d + j] ** 2; n = Math.sqrt(n);
      for (let j = 0; j < d; j++) mean[j] += data[i * d + j] / n;
    }
    let n = 0; for (let j = 0; j < d; j++) n += mean[j] ** 2; n = Math.sqrt(n);
    out[cls] = Array.from(mean, (v) => +(v / n).toFixed(6));
    process.stdout.write(cls + ' ');
  }
  writeFileSync(process.argv[2], JSON.stringify(out));
  console.log('\nsaved');
}
