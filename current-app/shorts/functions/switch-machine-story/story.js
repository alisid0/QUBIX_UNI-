const canvas = document.querySelector('#film');
const ctx = canvas.getContext('2d', { alpha: false });

const W = 540;
const H = 960;
const FPS = 30;
const DURATION = 58;

const C = {
  navy: '#071232', deep: '#030817', blue: '#183b67', cyan: '#54d6d1',
  teal: '#2d7c83', cream: '#fff3df', paper: '#f8ead3', ink: '#211d19',
  orange: '#f1843d', gold: '#ffc85a', green: '#6ecb63', red: '#ef625b',
  white: '#fffdf8', muted: '#b8c8da', brown: '#8e4d2d'
};

const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => 1 - Math.pow(1 - clamp(t), 3);
const phase = (t, start, end) => clamp((t - start) / (end - start));
const pulse = (t, speed = 1) => (Math.sin(t * Math.PI * 2 * speed) + 1) / 2;

function roundedRect(x, y, w, h, r, fill, stroke = null, line = 0) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = line; ctx.stroke(); }
}

function text(value, x, y, size, colour = C.white, align = 'left', weight = 800) {
  ctx.font = `${weight} ${size}px Arial`;
  ctx.fillStyle = colour; ctx.textAlign = align; ctx.textBaseline = 'alphabetic';
  ctx.fillText(value, x, y);
}

function wrap(value, x, y, maxWidth, size, lineHeight, colour = C.ink, align = 'left', weight = 700) {
  ctx.font = `${weight} ${size}px Arial`; ctx.fillStyle = colour; ctx.textAlign = align; ctx.textBaseline = 'top';
  const words = value.split(/\s+/); const lines = []; let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word; }
    else line = test;
  }
  if (line) lines.push(line);
  lines.forEach((entry, index) => ctx.fillText(entry, x, y + index * lineHeight));
}

function pixelFrame(x, y, w, h, fill = C.cream, border = C.ink) {
  ctx.fillStyle = border; ctx.fillRect(x - 5, y - 5, w + 10, h + 10);
  ctx.fillStyle = C.gold; ctx.fillRect(x - 1, y - 1, w + 2, h + 2);
  ctx.fillStyle = fill; ctx.fillRect(x + 4, y + 4, w - 8, h - 8);
  for (const [cx, cy] of [[x, y], [x + w - 8, y], [x, y + h - 8], [x + w - 8, y + h - 8]]) {
    ctx.fillStyle = border; ctx.fillRect(cx, cy, 8, 8);
  }
}

function background(t, cream = false) {
  const gradient = ctx.createLinearGradient(0, 0, 0, H);
  gradient.addColorStop(0, cream ? '#fff8ec' : '#0b1c48');
  gradient.addColorStop(1, cream ? '#f3d7b9' : C.deep);
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = cream ? .1 : .18;
  ctx.fillStyle = cream ? C.orange : C.cyan;
  const offset = Math.floor((t * 12) % 32);
  for (let y = -32 + offset; y < H; y += 32) {
    for (let x = 0; x < W; x += 32) if (((x + y) / 32) % 2 === 0) ctx.fillRect(x, y, 16, 16);
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

function arrow(x1, y1, x2, y2, colour = C.cyan, progress = 1, width = 7) {
  const p = clamp(progress); const ex = lerp(x1, x2, p); const ey = lerp(y1, y2, p);
  ctx.strokeStyle = colour; ctx.fillStyle = colour; ctx.lineWidth = width; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(ex, ey); ctx.stroke();
  if (p > .9) {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 17 * Math.cos(angle - .5), y2 - 17 * Math.sin(angle - .5));
    ctx.lineTo(x2 - 17 * Math.cos(angle + .5), y2 - 17 * Math.sin(angle + .5));
    ctx.closePath(); ctx.fill();
  }
}

function drawCube(x, y, size, t, mood = 'idle') {
  const bob = Math.sin(t * 3.4) * 4; y += bob; const s = size;
  ctx.save(); ctx.translate(x, y); ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#020615'; ctx.beginPath(); ctx.ellipse(0, s * .76, s * .58, s * .13, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.orange; ctx.beginPath(); ctx.moveTo(-s*.52,-s*.24); ctx.lineTo(0,-s*.52); ctx.lineTo(s*.52,-s*.24); ctx.lineTo(0,s*.03); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#ffe5a5'; ctx.beginPath(); ctx.moveTo(-s*.52,-s*.24); ctx.lineTo(0,s*.03); ctx.lineTo(0,s*.62); ctx.lineTo(-s*.52,s*.32); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#3b858c'; ctx.beginPath(); ctx.moveTo(s*.52,-s*.24); ctx.lineTo(0,s*.03); ctx.lineTo(0,s*.62); ctx.lineTo(s*.52,s*.32); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.navy; ctx.fillRect(-s*.34,s*.05,s*.13,s*.18); ctx.fillRect(-s*.08,s*.05,s*.13,s*.18);
  ctx.fillStyle = C.white; ctx.fillRect(-s*.31,s*.07,s*.04,s*.05); ctx.fillRect(-s*.05,s*.07,s*.04,s*.05);
  ctx.strokeStyle = C.navy; ctx.lineWidth = 4; ctx.beginPath();
  if (mood === 'happy') ctx.arc(-s*.14,s*.24,s*.11,.15,Math.PI-.15);
  else if (mood === 'alert') ctx.arc(-s*.14,s*.3,s*.06,0,Math.PI*2);
  else { ctx.moveTo(-s*.21,s*.3); ctx.lineTo(-s*.08,s*.3); }
  ctx.stroke(); ctx.restore();
}

function drawSwitch(x, y, on, scale = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
  ctx.fillStyle = '#081127'; ctx.fillRect(-53, -73, 112, 152);
  ctx.fillStyle = C.paper; ctx.fillRect(-58, -78, 112, 152);
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.strokeRect(-58, -78, 112, 152);
  ctx.fillStyle = '#b8aa98'; ctx.fillRect(-25, -48, 50, 96);
  ctx.fillStyle = on ? C.green : '#766f68';
  ctx.beginPath();
  if (on) { ctx.moveTo(-22, 14); ctx.lineTo(22, -32); ctx.lineTo(22, 23); ctx.lineTo(-22, 43); }
  else { ctx.moveTo(-22, -32); ctx.lineTo(22, 14); ctx.lineTo(22, 43); ctx.lineTo(-22, 23); }
  ctx.closePath(); ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.stroke();
  text(on ? 'ON' : 'OFF', 0, 102, 18, C.ink, 'center', 900);
  ctx.restore();
}

function drawBulb(x, y, on, scale = 1, glow = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
  if (on) {
    ctx.globalAlpha = .16 * glow; ctx.fillStyle = C.gold;
    ctx.beginPath(); ctx.arc(0, -10, 72, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
  }
  ctx.fillStyle = on ? C.gold : '#8b93a2'; ctx.strokeStyle = C.ink; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.arc(0, -18, 39, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = on ? '#fff5bd' : '#b9c1cc'; ctx.beginPath(); ctx.arc(-12, -30, 9, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#697283'; ctx.fillRect(-22, 19, 44, 18); ctx.fillRect(-17, 39, 34, 12);
  text(on ? 'LIGHT ON' : 'LIGHT OFF', 0, 88, 18, on ? C.gold : C.muted, 'center', 900);
  ctx.restore();
}

function drawCup(x, y, kind, scale = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
  const liquid = kind === 'JUICE' ? C.orange : kind === 'TEA' ? C.brown : C.cyan;
  ctx.fillStyle = '#071020'; ctx.fillRect(-28, -25, 63, 67);
  ctx.fillStyle = C.white; ctx.fillRect(-32, -29, 62, 66);
  ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.strokeRect(-32, -29, 62, 66);
  ctx.fillStyle = liquid; ctx.fillRect(-25, -21, 48, 18);
  ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.arc(31, -3, 17, -Math.PI/2, Math.PI/2); ctx.stroke();
  text(kind, 0, 68, 15, C.white, 'center', 900); ctx.restore();
}

function drawMachine(x, y, active = null, split = false, scale = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
  ctx.fillStyle = '#071020'; ctx.fillRect(-117, -163, 246, 338);
  ctx.fillStyle = C.teal; ctx.fillRect(-124, -170, 246, 338);
  ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.strokeRect(-124, -170, 246, 338);
  ctx.fillStyle = C.navy; ctx.fillRect(-91, -136, 180, 68);
  text('OUTPUT', 0, -94, 22, C.cyan, 'center', 900);
  for (const [label, yy] of [['A', -24], ['B', 48]]) {
    ctx.fillStyle = active === label ? C.gold : C.cream;
    ctx.beginPath(); ctx.arc(-64, yy, 26, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    text(label, -64, yy + 8, 22, C.ink, 'center', 900);
  }
  ctx.fillStyle = '#112448'; ctx.fillRect(4, -46, 83, 119);
  ctx.fillStyle = C.deep; ctx.fillRect(19, -25, 53, 67);
  if (active) { ctx.fillStyle = split ? C.red : C.green; ctx.fillRect(28, 50, 35, 10); }
  ctx.fillStyle = C.orange; ctx.fillRect(-124, 113, 246, 55);
  text('DRINK LAB', 0, 148, 19, C.ink, 'center', 900);
  ctx.restore();
}

function labelPill(value, x, y, colour = C.cyan, width = 206) {
  roundedRect(x - width / 2, y - 24, width, 48, 7, colour, C.ink, 4);
  text(value, x, y + 7, 18, C.ink, 'center', 900);
}

function sceneBoot(t) {
  background(t); hud('STORY MODE', phase(t, 0, DURATION));
  const p = ease(phase(t, .2, 1.3));
  ctx.save(); ctx.translate(270, 265); ctx.scale(p, p); ctx.translate(-270, -265);
  drawCube(270, 230, 126, t, 'happy'); ctx.restore();
  text('FUNCTION QUEST', 270, 402, 42, C.white, 'center', 900);
  text('LEVEL 02', 270, 452, 25, C.orange, 'center', 900);
  pixelFrame(54, 510, 432, 118, C.cream, C.ink);
  text('SWITCH & DRINK LAB', 270, 580, 27, C.ink, 'center', 900);
  wrap('One rule. Two everyday tests.', 270, 687, 410, 24, 31, C.muted, 'center', 700);
  text('PRESS START', 270, 865 + pulse(t, 1.5) * 5, 19, C.gold, 'center', 900);
}

function sceneSwitch(t) {
  background(t); hud('TEST 01 · SWITCH', .2);
  text('WHAT DOES THE SWITCH DO?', 270, 118, 30, C.white, 'center', 900);
  const local = t - 4.5; const on = local >= 3.2;
  pixelFrame(34, 156, 472, 492, '#102754', C.ink);
  drawSwitch(146, 374, on, 1.12);
  arrow(225, 374, 330, 374, on ? C.green : C.muted, ease(phase(local, .4, 1.3)), 8);
  drawBulb(405, 370, on, 1.12, 1 + pulse(t, 1.2));
  labelPill(on ? 'INPUT: ON' : 'INPUT: OFF', 146, 565, on ? C.green : C.muted, 190);
  labelPill(on ? 'OUTPUT: LIGHT ON' : 'OUTPUT: LIGHT OFF', 392, 565, on ? C.gold : C.muted, 218);
  pixelFrame(42, 700, 456, 130, C.cream, C.ink);
  wrap('Each switch position gives one light state.', 270, 739, 400, 27, 34, C.ink, 'center', 900);
}

function scenePromise(t) {
  background(t, true); hud('THE RULE', .39, false);
  text('A FUNCTION IS A PROMISE', 270, 127, 32, C.ink, 'center', 900);
  pixelFrame(46, 171, 448, 318, C.white, C.ink);
  labelPill('INPUT', 128, 221, C.orange, 132); labelPill('OUTPUT', 410, 221, C.cyan, 146);
  const p1 = ease(phase(t, 16, 17)); const p2 = ease(phase(t, 17.2, 18.2));
  text('OFF', 126, 321, 29, C.ink, 'center', 900); arrow(180, 312, 350, 312, C.teal, p1, 7); text('LIGHT OFF', 415, 321, 24, C.ink, 'center', 900);
  text('ON', 126, 421, 29, C.ink, 'center', 900); arrow(180, 412, 350, 412, C.green, p2, 7); text('LIGHT ON', 415, 421, 24, C.ink, 'center', 900);
  pixelFrame(34, 548, 472, 214, C.cream, C.ink);
  wrap('Each input gets exactly one output.', 270, 599, 420, 31, 39, C.ink, 'center', 900);
  roundedRect(82, 692, 376, 48, 6, C.green, C.ink, 4);
  text('PREDICTABLE EVERY TIME', 270, 724, 19, C.ink, 'center', 900);
  drawCube(270, 847, 82, t, 'happy');
}

function sceneMachine(t) {
  background(t); hud('TEST 02 · MACHINE', .56);
  text('NOW TEST THE MACHINE', 270, 118, 31, C.white, 'center', 900);
  const local = t - 24; const active = local < 6 ? 'A' : 'B'; const split = active === 'B';
  drawMachine(270, 397, active, split, .92);
  if (active === 'A') {
    arrow(343, 392, 420, 392, C.green, ease(phase(local, .8, 1.6)), 7);
    drawCup(459, 392, 'JUICE', .78);
    labelPill('A ALWAYS GIVES JUICE', 270, 672, C.green, 336);
  } else {
    arrow(343, 392, 420, 342, C.red, ease(phase(local, 6.4, 7.1)), 6);
    arrow(343, 392, 420, 474, C.red, ease(phase(local, 6.8, 7.5)), 6);
    drawCup(461, 326, 'TEA', .7); drawCup(461, 480, 'WATER', .7);
    labelPill('B CAN GIVE TWO DRINKS', 270, 672, C.red, 350);
  }
  pixelFrame(54, 742, 432, 100, C.cream, C.ink);
  text(split ? 'ONE INPUT. TWO POSSIBLE OUTPUTS.' : 'ONE INPUT. ONE OUTPUT.', 270, 802, split ? 17 : 21, C.ink, 'center', 900);
}

function choiceCard(x, y, label, description, colour) {
  pixelFrame(x, y, 220, 282, C.paper, C.ink);
  roundedRect(x + 62, y + 20, 96, 56, 8, colour, C.ink, 4);
  text(label, x + 110, y + 58, 29, C.ink, 'center', 900);
  drawMachine(x + 110, y + 164, label, label === 'B', .31);
  wrap(description, x + 110, y + 224, 182, 18, 23, C.ink, 'center', 800);
}

function sceneChallenge(t) {
  background(t, true); hud('YOUR TURN', .74, false);
  text('WHICH BUTTON FOLLOWS', 270, 112, 30, C.ink, 'center', 900);
  text('A FUNCTION?', 270, 150, 35, C.orange, 'center', 900);
  choiceCard(35, 201, 'A', 'Always gives juice', C.green);
  choiceCard(285, 201, 'B', 'Gives tea or water', C.red);
  pixelFrame(54, 548, 432, 108, C.white, C.ink);
  wrap('Look for one output for each input.', 270, 584, 380, 24, 30, C.ink, 'center', 900);
  const countdown = Math.max(1, 3 - Math.floor(phase(t, 40.5, 46.5) * 3));
  text(String(countdown), 270, 794, 102, C.orange, 'center', 900);
  text('LOCK IN YOUR ANSWER', 270, 858, 18, C.ink, 'center', 900);
}

function sceneReveal(t) {
  background(t); hud('LEVEL CLEAR', .88);
  const p = ease(phase(t, 47, 48));
  ctx.save(); ctx.translate(270, 243); ctx.scale(p, p); ctx.translate(-270, -243);
  roundedRect(75, 138, 390, 205, 10, C.green, C.ink, 6);
  text('BUTTON A', 270, 227, 43, C.ink, 'center', 900);
  text('IS A FUNCTION', 270, 291, 29, C.ink, 'center', 900);
  ctx.restore();
  pixelFrame(42, 400, 456, 264, C.cream, C.ink);
  text('WHY?', 270, 459, 19, C.orange, 'center', 900);
  wrap('Press A and you can predict the result.', 270, 499, 390, 27, 35, C.ink, 'center', 900);
  roundedRect(78, 586, 384, 50, 7, C.green, C.ink, 4);
  text('ONE INPUT → ONE OUTPUT', 270, 619, 21, C.ink, 'center', 900);
  drawCube(270, 793, 108, t, 'happy');
  text('RULE CONFIRMED', 270, 902, 18, C.gold, 'center', 900);
}

function sceneCTA(t) {
  background(t); hud('QUEST COMPLETE', 1);
  drawCube(270, 210, 125, t, 'happy');
  text('FUNCTIONS ARE RULES', 270, 350, 31, C.white, 'center', 900);
  text('YOU CAN RELY ON.', 270, 391, 31, C.gold, 'center', 900);
  roundedRect(50, 467, 440, 106, 10, C.cream, C.orange, 6);
  text('LEARN BY TRYING IT', 270, 530, 29, C.ink, 'center', 900);
  text('Try the Qubix beta', 270, 656, 25, C.white, 'center', 800);
  roundedRect(58, 694, 424, 82, 8, C.orange, C.ink, 5);
  text('qubix.university', 270, 748, 31, C.ink, 'center', 900);
  text('More lessons are coming.', 270, 842, 18, C.muted, 'center', 700);
  text('Your feedback will shape them.', 270, 873, 18, C.muted, 'center', 700);
}

const scenes = [
  { start: 0, end: 4.5, draw: sceneBoot },
  { start: 4.5, end: 15.5, draw: sceneSwitch },
  { start: 15.5, end: 24, draw: scenePromise },
  { start: 24, end: 38, draw: sceneMachine },
  { start: 38, end: 47, draw: sceneChallenge },
  { start: 47, end: 53, draw: sceneReveal },
  { start: 53, end: DURATION, draw: sceneCTA }
];

function renderAt(t) {
  ctx.save(); ctx.setTransform(2, 0, 0, 2, 0, 0); ctx.imageSmoothingEnabled = false;
  const scene = scenes.find(entry => t >= entry.start && t < entry.end) || scenes.at(-1);
  scene.draw(t);
  const fadeIn = clamp((t - scene.start) / .25); const fadeOut = clamp((scene.end - t) / .25);
  ctx.globalAlpha = 1 - Math.min(fadeIn, fadeOut); ctx.fillStyle = C.deep; ctx.fillRect(0, 0, W, H); ctx.restore();
}

function scheduleSound(audioContext, destination, time, frequency, duration = .06, gain = .026, type = 'square') {
  const osc = audioContext.createOscillator(); const amp = audioContext.createGain();
  osc.type = type; osc.frequency.setValueAtTime(frequency, time);
  amp.gain.setValueAtTime(0, time); amp.gain.linearRampToValueAtTime(gain, time + .008);
  amp.gain.exponentialRampToValueAtTime(.0001, time + duration);
  osc.connect(amp); amp.connect(destination); osc.start(time); osc.stop(time + duration + .02);
}

function scheduleAudio(audioContext, destination) {
  const base = audioContext.currentTime + .08;
  [0.2, 4.5, 15.5, 24, 38, 47, 53].forEach((offset, index) => scheduleSound(audioContext, destination, base + offset, index === 5 ? 660 : 330));
  [7.7, 30, 40.7, 42.7, 44.7].forEach(offset => scheduleSound(audioContext, destination, base + offset, 440, .045, .022));
  [47, 47.12, 47.24].forEach((offset, index) => scheduleSound(audioContext, destination, base + offset, [523, 659, 784][index], .16, .03, 'triangle'));
  [53, 53.16].forEach((offset, index) => scheduleSound(audioContext, destination, base + offset, [659, 880][index], .2, .026, 'triangle'));
}

let previewStart = performance.now(); let rendering = false;
function previewLoop(now) {
  if (!rendering) renderAt(((now - previewStart) / 1000) % DURATION);
  requestAnimationFrame(previewLoop);
}

window.renderFilm = async () => {
  rendering = true;
  const audioContext = new AudioContext({ sampleRate: 44100 });
  const audioDestination = audioContext.createMediaStreamDestination(); scheduleAudio(audioContext, audioDestination);
  const canvasStream = canvas.captureStream(FPS);
  const stream = new MediaStream([...canvasStream.getVideoTracks(), ...audioDestination.stream.getAudioTracks()]);
  const mimeType = 'video/webm;codecs=vp9,opus';
  const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 500000, audioBitsPerSecond: 24000 });
  const chunks = []; recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
  const stopped = new Promise(resolve => recorder.onstop = resolve); const start = performance.now(); recorder.start();
  await new Promise(resolve => {
    function frame(now) {
      const elapsed = (now - start) / 1000; renderAt(Math.min(elapsed, DURATION - .001));
      if (elapsed < DURATION) requestAnimationFrame(frame); else resolve();
    }
    requestAnimationFrame(frame);
  });
  recorder.stop(); await stopped; await audioContext.close();
  const blob = new Blob(chunks, { type: mimeType }); const link = document.createElement('a');
  link.href = URL.createObjectURL(blob); link.download = 'qubix-switch-machine-function-short.webm';
  document.body.append(link); link.click(); link.remove(); rendering = false; previewStart = performance.now();
  return { size: blob.size, type: mimeType, extension: 'webm', duration: DURATION };
};

const reviewTime = Number(new URLSearchParams(location.search).get('frame'));
if (Number.isFinite(reviewTime) && location.search.includes('frame=')) renderAt(clamp(reviewTime, 0, DURATION - .001));
else { renderAt(0); requestAnimationFrame(previewLoop); }
window.filmReady = true;
