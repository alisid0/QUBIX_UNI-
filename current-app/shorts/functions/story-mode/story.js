const canvas = document.querySelector('#film');
const ctx = canvas.getContext('2d', { alpha: false });

const W = 540;
const H = 960;
const FPS = 30;
const DURATION = 58;

const C = {
  navy: '#071232',
  deep: '#030817',
  blue: '#183b67',
  cyan: '#54d6d1',
  teal: '#2d7c83',
  cream: '#fff3df',
  paper: '#f8ead3',
  ink: '#211d19',
  orange: '#f1843d',
  gold: '#ffc85a',
  green: '#6ecb63',
  red: '#ef625b',
  white: '#fffdf8',
  muted: '#b8c8da'
};

const assets = {};
const assetPaths = {
  neutral: '../assets/aron/aron-neutral.png',
  thinking: '../assets/aron/aron-thinking.png',
  surprised: '../assets/aron/aron-surprised.png',
  pleased: '../assets/aron/aron-pleased.png',
  understands: '../assets/aron/aron-understands.png'
};

const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => 1 - Math.pow(1 - clamp(t), 3);
const pulse = (t, speed = 1) => (Math.sin(t * Math.PI * 2 * speed) + 1) / 2;
const phase = (t, start, end) => clamp((t - start) / (end - start));

function roundedRect(x, y, w, h, r, fill, stroke = null, line = 0) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = line; ctx.stroke(); }
}

function text(value, x, y, size, colour = C.white, align = 'left', weight = 800, family = 'Arial') {
  ctx.font = `${weight} ${size}px ${family}`;
  ctx.fillStyle = colour;
  ctx.textAlign = align;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(value, x, y);
}

function wrap(value, x, y, maxWidth, size, lineHeight, colour = C.ink, align = 'left', weight = 700) {
  ctx.font = `${weight} ${size}px Arial`;
  ctx.fillStyle = colour;
  ctx.textAlign = align;
  ctx.textBaseline = 'top';
  const words = value.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else line = test;
  }
  if (line) lines.push(line);
  lines.forEach((entry, index) => ctx.fillText(entry, x, y + index * lineHeight));
  return lines.length * lineHeight;
}

function pixelFrame(x, y, w, h, fill = C.cream, border = C.ink) {
  ctx.fillStyle = border;
  ctx.fillRect(x - 5, y - 5, w + 10, h + 10);
  ctx.fillStyle = C.gold;
  ctx.fillRect(x - 1, y - 1, w + 2, h + 2);
  ctx.fillStyle = fill;
  ctx.fillRect(x + 4, y + 4, w - 8, h - 8);
  for (const [cx, cy] of [[x, y], [x + w - 8, y], [x, y + h - 8], [x + w - 8, y + h - 8]]) {
    ctx.fillStyle = border;
    ctx.fillRect(cx, cy, 8, 8);
  }
}

function background(t, variant = 'navy') {
  const gradient = ctx.createLinearGradient(0, 0, 0, H);
  if (variant === 'cream') {
    gradient.addColorStop(0, '#fff7e9');
    gradient.addColorStop(1, '#f4d9bd');
  } else {
    gradient.addColorStop(0, '#0b1c48');
    gradient.addColorStop(1, C.deep);
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);

  ctx.globalAlpha = variant === 'cream' ? 0.12 : 0.2;
  ctx.fillStyle = variant === 'cream' ? C.orange : C.cyan;
  const offset = Math.floor((t * 16) % 32);
  for (let y = -32 + offset; y < H; y += 32) {
    for (let x = 0; x < W; x += 32) {
      if (((x + y) / 32) % 2 === 0) ctx.fillRect(x, y, 16, 16);
    }
  }
  ctx.globalAlpha = 1;
}

function hud(label, progress, dark = true) {
  const fg = dark ? C.white : C.ink;
  text('QUBIX', 30, 44, 20, C.orange, 'left', 900);
  text(label, 510, 42, 13, fg, 'right', 900);
  roundedRect(30, 58, 480, 10, 4, dark ? '#203257' : '#dec6aa');
  roundedRect(30, 58, 480 * clamp(progress), 10, 4, C.cyan);
}

function drawCube(x, y, size, t, mood = 'idle') {
  const bob = Math.sin(t * 3.4) * 5;
  const s = size;
  y += bob;
  const wobble = mood === 'alert' ? Math.sin(t * 18) * 3 : 0;
  x += wobble;
  ctx.save();
  ctx.translate(x, y);
  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = '#08112a';
  ctx.beginPath();
  ctx.ellipse(0, s * 0.78, s * 0.58, s * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = C.orange;
  ctx.beginPath();
  ctx.moveTo(-s * .52, -s * .24);
  ctx.lineTo(0, -s * .52);
  ctx.lineTo(s * .52, -s * .24);
  ctx.lineTo(0, s * .03);
  ctx.closePath(); ctx.fill();

  ctx.fillStyle = '#ffe5a5';
  ctx.beginPath();
  ctx.moveTo(-s * .52, -s * .24);
  ctx.lineTo(0, s * .03);
  ctx.lineTo(0, s * .62);
  ctx.lineTo(-s * .52, s * .32);
  ctx.closePath(); ctx.fill();

  ctx.fillStyle = '#3b858c';
  ctx.beginPath();
  ctx.moveTo(s * .52, -s * .24);
  ctx.lineTo(0, s * .03);
  ctx.lineTo(0, s * .62);
  ctx.lineTo(s * .52, s * .32);
  ctx.closePath(); ctx.fill();

  const blink = Math.sin(t * 1.3) > .985;
  ctx.fillStyle = C.navy;
  if (blink) {
    ctx.fillRect(-s * .34, s * .11, s * .13, 4);
    ctx.fillRect(-s * .08, s * .11, s * .13, 4);
  } else {
    ctx.fillRect(-s * .34, s * .05, s * .13, s * .18);
    ctx.fillRect(-s * .08, s * .05, s * .13, s * .18);
    ctx.fillStyle = C.white;
    ctx.fillRect(-s * .31, s * .07, s * .04, s * .05);
    ctx.fillRect(-s * .05, s * .07, s * .04, s * .05);
  }

  ctx.strokeStyle = C.navy;
  ctx.lineWidth = 4;
  ctx.beginPath();
  if (mood === 'alert') {
    ctx.arc(-s * .14, s * .31, s * .07, 0, Math.PI * 2);
  } else if (mood === 'happy') {
    ctx.arc(-s * .14, s * .24, s * .11, .15, Math.PI - .15);
  } else {
    ctx.moveTo(-s * .21, s * .3); ctx.lineTo(-s * .08, s * .3);
  }
  ctx.stroke();
  ctx.restore();
}

function drawAron(key, x, y, w, alpha = 1) {
  const image = assets[key] || assets.neutral;
  if (!image) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.imageSmoothingEnabled = false;
  const h = w * (image.height / image.width);
  ctx.drawImage(image, x, y, w, h);
  ctx.restore();
}

function dialogue(name, value, y, accent = C.orange) {
  pixelFrame(26, y, 488, 152, C.cream, C.ink);
  roundedRect(48, y - 18, 134, 34, 4, accent, C.ink, 3);
  text(name, 115, y + 6, 16, C.ink, 'center', 900);
  wrap(value, 52, y + 35, 430, 24, 31, C.ink, 'left', 800);
  const arrowPulse = pulse(performance.now() / 1000, 1.6);
  ctx.fillStyle = C.orange;
  ctx.beginPath();
  ctx.moveTo(478, y + 125 + arrowPulse * 4);
  ctx.lineTo(493, y + 125 + arrowPulse * 4);
  ctx.lineTo(485, y + 137 + arrowPulse * 4);
  ctx.closePath(); ctx.fill();
}

function node(x, y, value, colour = C.cream, stroke = C.ink, size = 58) {
  ctx.fillStyle = C.deep;
  ctx.beginPath(); ctx.arc(x + 5, y + 6, size / 2, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = colour;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.arc(x, y, size / 2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  text(String(value), x, y + 10, 29, C.ink, 'center', 900);
}

function arrow(x1, y1, x2, y2, colour = C.cyan, progress = 1, width = 7) {
  const p = clamp(progress);
  const ex = lerp(x1, x2, p);
  const ey = lerp(y1, y2, p);
  ctx.strokeStyle = colour;
  ctx.fillStyle = colour;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(ex, ey); ctx.stroke();
  if (p > .9) {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 18 * Math.cos(angle - .5), y2 - 18 * Math.sin(angle - .5));
    ctx.lineTo(x2 - 18 * Math.cos(angle + .5), y2 - 18 * Math.sin(angle + .5));
    ctx.closePath(); ctx.fill();
  }
}

function mapPanel(x, y, w, h, label, rows, good, reveal = 1) {
  pixelFrame(x, y, w, h, C.paper, C.ink);
  roundedRect(x + 16, y + 16, 70, 34, 4, good ? C.green : C.red, C.ink, 3);
  text(label, x + 51, y + 41, 18, C.ink, 'center', 900);
  rows.forEach((row, index) => {
    const yy = y + 83 + index * 60;
    node(x + 48, yy, row[0], C.white, C.ink, 40);
    row.slice(1).forEach((out, outIndex) => {
      const targetY = yy + (outIndex - (row.length - 2) / 2) * 38;
      arrow(x + 73, yy, x + w - 65, targetY, row.length > 2 ? C.red : C.teal, reveal, 5);
      node(x + w - 42, targetY, out, C.white, C.ink, 40);
    });
  });
}

function sceneBoot(t) {
  background(t);
  hud('STORY MODE', phase(t, 0, DURATION));
  const intro = ease(phase(t, .2, 1.2));
  ctx.save();
  ctx.translate(270, 340);
  ctx.scale(intro, intro);
  ctx.translate(-270, -340);
  text('QUBIX', 270, 240, 28, C.orange, 'center', 900);
  text('FUNCTION', 270, 310, 62, C.white, 'center', 900);
  text('QUEST', 270, 370, 74, C.gold, 'center', 900);
  ctx.restore();
  roundedRect(74, 430, 392, 58, 8, '#152d5b', C.cyan, 4);
  text('LEVEL 01 · THE ONE-ANSWER RULE', 270, 467, 18, C.white, 'center', 900);
  drawCube(270, 610, 124, t, 'happy');
  text('PRESS START', 270, 795, 24, C.white, 'center', 900);
  ctx.globalAlpha = .45 + pulse(t, 1.7) * .55;
  text('▶', 270, 845, 28, C.cyan, 'center', 900);
  ctx.globalAlpha = 1;
}

function sceneMission(t) {
  background(t, 'cream');
  hud('MISSION', .12, false);
  drawAron('thinking', 64, 86, 340);
  drawCube(440, 168, 100, t, 'idle');
  dialogue('ARON', 'A function sounds complicated. What does it actually mean?', 700, C.orange);
}

function sceneRule(t) {
  background(t);
  hud('RULE FOUND', .34);
  text('ONE INPUT', 270, 140, 38, C.white, 'center', 900);
  text('ONE CLEAR OUTPUT', 270, 183, 32, C.gold, 'center', 900);
  const p = ease(phase(t, 11.5, 14.5));
  node(95, 365, 2, C.cream, C.ink, 76);
  roundedRect(194, 317, 150, 96, 8, C.orange, C.ink, 5);
  text('× 2 + 1', 269, 376, 30, C.ink, 'center', 900);
  node(445, 365, 5, C.green, C.ink, 76);
  arrow(138, 365, 188, 365, C.cyan, p);
  arrow(350, 365, 402, 365, C.cyan, p);
  text('INPUT', 95, 445, 15, C.muted, 'center', 900);
  text('RULE', 269, 445, 15, C.muted, 'center', 900);
  text('OUTPUT', 445, 445, 15, C.muted, 'center', 900);

  pixelFrame(40, 545, 460, 188, C.cream, C.ink);
  text('2 has one destination: 5', 270, 603, 27, C.ink, 'center', 900);
  wrap('The rule is predictable. Give it 2 again and you still get 5.', 270, 642, 390, 23, 30, C.ink, 'center', 700);
  drawCube(270, 812, 80, t, 'happy');
}

function sceneGlitch(t) {
  background(t);
  hud('GLITCH DETECTED', .53);
  text('WATCH THE PATH', 270, 137, 36, C.white, 'center', 900);
  node(100, 390, 2, C.cream, C.ink, 78);
  node(435, 310, 5, C.cream, C.ink, 72);
  node(435, 480, 7, C.cream, C.ink, 72);
  const p = ease(phase(t, 22, 24.5));
  arrow(145, 378, 390, 320, C.red, p);
  arrow(145, 402, 390, 470, C.red, p);
  drawCube(270, 265, 74, t, 'alert');
  roundedRect(75, 560, 390, 58, 7, C.red, C.ink, 4);
  text('SAME INPUT · TWO OUTPUTS', 270, 598, 21, C.ink, 'center', 900);
  pixelFrame(46, 662, 448, 170, C.cream, C.ink);
  text('NOT A FUNCTION', 270, 720, 30, C.red, 'center', 900);
  wrap('A function cannot send the same input to two different answers.', 270, 752, 380, 23, 30, C.ink, 'center', 800);
}

function sceneChallenge(t) {
  background(t, 'cream');
  hud('YOUR TURN', .7, false);
  text('WHICH MAP IS A FUNCTION?', 270, 125, 31, C.ink, 'center', 900);
  mapPanel(24, 174, 236, 338, 'A', [[1, 3], [2, 5], [3, 7]], true, ease(phase(t, 31.3, 33.5)));
  mapPanel(280, 174, 236, 338, 'B', [[1, 3, 4], [2, 5]], false, ease(phase(t, 31.8, 34)));
  pixelFrame(44, 566, 452, 142, C.white, C.ink);
  text('CHECK EVERY INPUT', 270, 615, 19, C.orange, 'center', 900);
  wrap('Does each one have exactly one arrow leaving it?', 270, 646, 380, 24, 30, C.ink, 'center', 800);
  const remaining = Math.max(1, 3 - Math.floor(phase(t, 36.5, 41.5) * 3));
  text(String(remaining), 270, 820, 92, C.orange, 'center', 900);
  text('MAKE YOUR CHOICE', 270, 875, 17, C.ink, 'center', 900);
}

function sceneReveal(t) {
  background(t);
  hud('LEVEL CLEAR', .86);
  const pop = ease(phase(t, 42, 43));
  ctx.save();
  ctx.translate(270, 260); ctx.scale(pop, pop); ctx.translate(-270, -260);
  roundedRect(85, 145, 370, 190, 10, C.green, C.ink, 6);
  text('A', 270, 245, 92, C.ink, 'center', 900);
  text('IS A FUNCTION', 270, 305, 26, C.ink, 'center', 900);
  ctx.restore();
  pixelFrame(38, 395, 464, 268, C.cream, C.ink);
  text('THE RULE', 270, 449, 18, C.orange, 'center', 900);
  wrap('Every input has exactly one output.', 270, 487, 405, 28, 36, C.ink, 'center', 900);
  ctx.strokeStyle = '#d1b695'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(80, 554); ctx.lineTo(460, 554); ctx.stroke();
  wrap('Different inputs may share an output. That is still allowed.', 270, 579, 398, 22, 29, C.ink, 'center', 700);
  pixelFrame(62, 674, 416, 270, C.cream, C.ink);
  drawAron('understands', 155, 650, 230);
  drawCube(410, 770, 85, t, 'happy');
}

function sceneCTA(t) {
  background(t);
  hud('QUEST COMPLETE', 1);
  drawCube(270, 220, 132, t, 'happy');
  text('FUNCTIONS ARE', 270, 365, 33, C.white, 'center', 900);
  text('RULES YOU CAN RELY ON.', 270, 405, 29, C.gold, 'center', 900);
  roundedRect(56, 487, 428, 102, 10, C.cream, C.orange, 6);
  text('LEARN BY TRYING IT.', 270, 546, 29, C.ink, 'center', 900);
  text('Try the Qubix beta', 270, 672, 25, C.white, 'center', 800);
  roundedRect(58, 704, 424, 82, 8, C.orange, C.ink, 5);
  text('qubix.university', 270, 758, 31, C.ink, 'center', 900);
  text('More lessons are coming.', 270, 846, 18, C.muted, 'center', 700);
  text('Your feedback will shape them.', 270, 876, 18, C.muted, 'center', 700);
}

const scenes = [
  { start: 0, end: 4.5, draw: sceneBoot },
  { start: 4.5, end: 11, draw: sceneMission },
  { start: 11, end: 22, draw: sceneRule },
  { start: 22, end: 31, draw: sceneGlitch },
  { start: 31, end: 42, draw: sceneChallenge },
  { start: 42, end: 50, draw: sceneReveal },
  { start: 50, end: DURATION, draw: sceneCTA }
];

function renderAt(t) {
  ctx.save();
  ctx.setTransform(2, 0, 0, 2, 0, 0);
  ctx.imageSmoothingEnabled = false;
  const scene = scenes.find(entry => t >= entry.start && t < entry.end) || scenes.at(-1);
  scene.draw(t);
  const fadeIn = clamp((t - scene.start) / .28);
  const fadeOut = clamp((scene.end - t) / .28);
  ctx.globalAlpha = 1 - Math.min(fadeIn, fadeOut);
  ctx.fillStyle = C.deep;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

function scheduleSound(audioContext, destination, time, frequency, duration = .06, gain = .035, type = 'square') {
  const osc = audioContext.createOscillator();
  const amp = audioContext.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, time);
  amp.gain.setValueAtTime(0, time);
  amp.gain.linearRampToValueAtTime(gain, time + .008);
  amp.gain.exponentialRampToValueAtTime(.0001, time + duration);
  osc.connect(amp); amp.connect(destination);
  osc.start(time); osc.stop(time + duration + .02);
}

function scheduleAudio(audioContext, destination) {
  const base = audioContext.currentTime + .08;
  [0.2, 4.5, 11, 22, 31, 42, 50].forEach((offset, index) =>
    scheduleSound(audioContext, destination, base + offset, index === 5 ? 660 : 330, .055, .025)
  );
  [36.8, 38.4, 40].forEach(offset => scheduleSound(audioContext, destination, base + offset, 440, .05, .03));
  [42, 42.12, 42.24].forEach((offset, index) => scheduleSound(audioContext, destination, base + offset, [523, 659, 784][index], .16, .035, 'triangle'));
  [50, 50.16].forEach((offset, index) => scheduleSound(audioContext, destination, base + offset, [659, 880][index], .22, .03, 'triangle'));
}

function makeBackgroundTransparent(image) {
  const cutout = document.createElement('canvas');
  cutout.width = image.naturalWidth;
  cutout.height = image.naturalHeight;
  const cutoutContext = cutout.getContext('2d', { willReadFrequently: true });
  cutoutContext.drawImage(image, 0, 0);
  const pixels = cutoutContext.getImageData(0, 0, cutout.width, cutout.height);
  const data = pixels.data;
  const total = cutout.width * cutout.height;
  const seen = new Uint8Array(total);
  const queue = new Int32Array(total);
  const background = [data[0], data[1], data[2]];
  const threshold = 34 * 34;
  let read = 0;
  let write = 0;

  const enqueue = index => {
    if (seen[index]) return;
    seen[index] = 1;
    queue[write++] = index;
  };
  for (let x = 0; x < cutout.width; x += 1) {
    enqueue(x);
    enqueue((cutout.height - 1) * cutout.width + x);
  }
  for (let y = 0; y < cutout.height; y += 1) {
    enqueue(y * cutout.width);
    enqueue(y * cutout.width + cutout.width - 1);
  }

  while (read < write) {
    const index = queue[read++];
    const offset = index * 4;
    const dr = data[offset] - background[0];
    const dg = data[offset + 1] - background[1];
    const db = data[offset + 2] - background[2];
    if (dr * dr + dg * dg + db * db > threshold) continue;
    data[offset + 3] = 0;
    const x = index % cutout.width;
    const y = Math.floor(index / cutout.width);
    if (x > 0) enqueue(index - 1);
    if (x < cutout.width - 1) enqueue(index + 1);
    if (y > 0) enqueue(index - cutout.width);
    if (y < cutout.height - 1) enqueue(index + cutout.width);
  }
  cutoutContext.putImageData(pixels, 0, 0);
  return cutout;
}

async function loadAssets() {
  await Promise.all(Object.entries(assetPaths).map(([key, src]) => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => { assets[key] = makeBackgroundTransparent(image); resolve(); };
    image.onerror = reject;
    image.src = src;
  })));
}

let previewStart = performance.now();
let rendering = false;
function previewLoop(now) {
  if (!rendering) renderAt(((now - previewStart) / 1000) % DURATION);
  requestAnimationFrame(previewLoop);
}

window.renderFilm = async () => {
  rendering = true;
  const audioContext = new AudioContext({ sampleRate: 44100 });
  const audioDestination = audioContext.createMediaStreamDestination();
  scheduleAudio(audioContext, audioDestination);
  const canvasStream = canvas.captureStream(FPS);
  const stream = new MediaStream([
    ...canvasStream.getVideoTracks(),
    ...audioDestination.stream.getAudioTracks()
  ]);
  const mp4 = 'video/mp4;codecs=avc1.42E01E,mp4a.40.2';
  const webm = 'video/webm;codecs=vp9,opus';
  const wantsMp4 = new URLSearchParams(location.search).get('format') === 'mp4';
  const mimeType = wantsMp4 && MediaRecorder.isTypeSupported(mp4) ? mp4 : webm;
  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: 500000,
    audioBitsPerSecond: 24000
  });
  const chunks = [];
  recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
  const stopped = new Promise(resolve => recorder.onstop = resolve);
  const start = performance.now();
  recorder.start();
  await new Promise(resolve => {
    function frame(now) {
      const elapsed = (now - start) / 1000;
      renderAt(Math.min(elapsed, DURATION - .001));
      if (elapsed < DURATION) requestAnimationFrame(frame);
      else resolve();
    }
    requestAnimationFrame(frame);
  });
  recorder.stop();
  await stopped;
  await audioContext.close();
  const blob = new Blob(chunks, { type: mimeType });
  const extension = mimeType.startsWith('video/mp4') ? 'mp4' : 'webm';
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `qubix-functions-story-mode-short.${extension}`;
  document.body.append(link);
  link.click();
  link.remove();
  rendering = false;
  previewStart = performance.now();
  return { size: blob.size, type: mimeType, extension, duration: DURATION };
};

await loadAssets();
const reviewTime = Number(new URLSearchParams(location.search).get('frame'));
if (Number.isFinite(reviewTime) && location.search.includes('frame=')) {
  renderAt(clamp(reviewTime, 0, DURATION - .001));
} else {
  renderAt(0);
  requestAnimationFrame(previewLoop);
}
window.filmReady = true;
