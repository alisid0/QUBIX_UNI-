import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const COLORS = {
  navy: 0x071633,
  cream: 0xf5e8b4,
  warmCream: 0xf2ebdd,
  orange: 0xf1873f,
  teal: 0x4f8c80,
  green: 0x72c75c,
  error: 0xf26a45
};

const OUTPUT_WIDTH = 540;
const OUTPUT_HEIGHT = 960;

const canvas = document.querySelector('#mascot-canvas');
const stageShell = document.querySelector('#stage-shell');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true,
  powerPreference: 'high-performance'
});
renderer.setPixelRatio(1);
renderer.setSize(OUTPUT_WIDTH, OUTPUT_HEIGHT, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color(COLORS.navy);

const camera = new THREE.OrthographicCamera(-3, 3, 5.333, -5.333, 0.1, 100);
camera.position.set(4.4, 3.2, 7.5);
camera.lookAt(0, 0.2, 0);

scene.add(new THREE.HemisphereLight(0xfff6d6, 0x18334a, 2.2));
const keyLight = new THREE.DirectionalLight(0xffe4b6, 3.1);
keyLight.position.set(-4, 7, 6);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
keyLight.shadow.camera.near = .5;
keyLight.shadow.camera.far = 24;
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(COLORS.teal, 1.6);
rimLight.position.set(5, 1, -2);
scene.add(rimLight);

const mascotRoot = new THREE.Group();
scene.add(mascotRoot);

const materials = [
  new THREE.MeshStandardMaterial({ color: COLORS.teal, roughness: .86, flatShading: true }),
  new THREE.MeshStandardMaterial({ color: 0x365f61, roughness: .86, flatShading: true }),
  new THREE.MeshStandardMaterial({ color: COLORS.orange, roughness: .82, flatShading: true }),
  new THREE.MeshStandardMaterial({ color: 0x233d4b, roughness: .9, flatShading: true }),
  new THREE.MeshStandardMaterial({ color: COLORS.cream, roughness: .9, flatShading: true }),
  new THREE.MeshStandardMaterial({ color: 0x294551, roughness: .9, flatShading: true })
];

// Pixel character comes from flat colour planes, block-built facial features,
// and stepped accents—not from enlarging a low-resolution render. A small,
// one-segment chamfer keeps the silhouette crisp while catching enough light
// to read as a physical cube.
const cubeGeometry = new RoundedBoxGeometry(2.2, 2.2, 2.2, 1, .065);
const cubeOutline = new THREE.Mesh(
  cubeGeometry,
  new THREE.MeshBasicMaterial({ color: 0x031027, side: THREE.BackSide })
);
cubeOutline.scale.setScalar(1.018);
mascotRoot.add(cubeOutline);

const cube = new THREE.Mesh(cubeGeometry, materials);
cube.castShadow = true;
cube.receiveShadow = true;
mascotRoot.add(cube);

const face = new THREE.Group();
face.position.z = 1.106;
mascotRoot.add(face);

const darkBasic = new THREE.MeshBasicMaterial({ color: COLORS.navy });
const irisBasic = new THREE.MeshBasicMaterial({ color: 0x6fa99e });
const highlightBasic = new THREE.MeshBasicMaterial({ color: 0xfff4d7 });
const browBasic = new THREE.MeshBasicMaterial({ color: 0x294b57 });
const cheekBasic = new THREE.MeshBasicMaterial({ color: COLORS.orange, transparent: true, opacity: .32 });
const eyeGeometry = new RoundedBoxGeometry(.3, .42, .045, 3, .09);
const eyes = [];
const pupils = [];
const glints = [];
const brows = [];

for (const x of [-.43, .43]) {
  const eye = new THREE.Group();
  eye.position.set(x, .22, 0);

  const socket = new THREE.Mesh(eyeGeometry, darkBasic);
  eye.add(socket);

  const pupil = new THREE.Group();
  pupil.position.z = .03;
  const iris = new THREE.Mesh(new THREE.CircleGeometry(.085, 16), irisBasic);
  iris.position.set(0, -.045, .006);
  iris.scale.y = .82;
  const glint = new THREE.Mesh(new THREE.CircleGeometry(.038, 12), highlightBasic);
  glint.position.set(-.04, .055, .012);
  const glintSmall = new THREE.Mesh(new THREE.CircleGeometry(.018, 10), highlightBasic);
  glintSmall.position.set(.045, -.035, .013);
  pupil.add(iris, glint, glintSmall);
  eye.add(pupil);

  const brow = new THREE.Mesh(new THREE.PlaneGeometry(.22, .035), browBasic);
  brow.position.set(x, .52, .02);
  brow.userData.side = Math.sign(x);
  brow.visible = false;
  face.add(brow);

  face.add(eye);
  eyes.push(eye);
  pupils.push(pupil);
  glints.push(glint, glintSmall);
  brows.push(brow);
}

for (const x of [-.71, .71]) {
  const cheek = new THREE.Mesh(new THREE.PlaneGeometry(.13, .055), cheekBasic);
  cheek.position.set(x, -.13, .018);
  face.add(cheek);
}

const gazeTarget = new THREE.Vector2();
const gazeCurrent = new THREE.Vector2();

stageShell.addEventListener('pointermove', event => {
  const rect = canvas.getBoundingClientRect();
  const nx = (event.clientX - (rect.left + rect.width / 2)) / Math.max(rect.width * .72, 1);
  const ny = (event.clientY - (rect.top + rect.height / 2)) / Math.max(rect.height * .72, 1);
  gazeTarget.set(
    THREE.MathUtils.clamp(nx, -1, 1) * .05,
    THREE.MathUtils.clamp(-ny, -1, 1) * .06
  );
});

stageShell.addEventListener('pointerleave', () => gazeTarget.set(0, 0));
window.addEventListener('blur', () => gazeTarget.set(0, 0));

const mouth = new THREE.Group();
const mouthParts = [
  [-.12, -.28, .12, .055],
  [0, -.34, .13, .055],
  [.12, -.28, .12, .055]
];
for (const [x, y, w, h] of mouthParts) {
  const part = new THREE.Mesh(new THREE.PlaneGeometry(w, h), darkBasic);
  part.position.set(x, y, .01);
  mouth.add(part);
}
face.add(mouth);

const openMouth = new THREE.Mesh(new RoundedBoxGeometry(.27, .34, .04, 1, .04), darkBasic);
openMouth.position.set(0, -.28, .015);
openMouth.visible = false;
face.add(openMouth);

const shadow = new THREE.Mesh(
  new THREE.CircleGeometry(1.2, 48),
  new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .25, depthWrite: false })
);
shadow.rotation.x = -Math.PI / 2;
shadow.scale.y = .4;
shadow.position.set(0, -1.55, 0);
scene.add(shadow);

function pixelBox(w, h, color) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, .12), new THREE.MeshBasicMaterial({ color }));
}

const arrow = new THREE.Group();
arrow.add(pixelBox(.62, .14, COLORS.orange));
const arrowTop = pixelBox(.36, .14, COLORS.orange);
arrowTop.rotation.z = Math.PI / 4;
arrowTop.position.set(.32, .13, 0);
arrow.add(arrowTop);
const arrowBottom = pixelBox(.36, .14, COLORS.orange);
arrowBottom.rotation.z = -Math.PI / 4;
arrowBottom.position.set(.32, -.13, 0);
arrow.add(arrowBottom);
arrow.visible = false;
scene.add(arrow);

const button = new THREE.Group();
const buttonBase = new THREE.Mesh(
  new RoundedBoxGeometry(.45, .72, .22, 1, .05),
  new THREE.MeshStandardMaterial({ color: 0x17304a, roughness: .8 })
);
const buttonFace = new THREE.Mesh(
  new RoundedBoxGeometry(.24, .36, .16, 1, .04),
  new THREE.MeshStandardMaterial({ color: COLORS.orange, emissive: COLORS.orange, emissiveIntensity: .15 })
);
buttonFace.position.z = .16;
button.add(buttonBase, buttonFace);
button.position.set(2.15, -.08, .15);
button.visible = false;
scene.add(button);

const thoughtPixels = new THREE.Group();
for (let i = 0; i < 5; i++) {
  const p = pixelBox(.14 + i * .012, .14 + i * .012, i % 2 ? COLORS.teal : COLORS.orange);
  thoughtPixels.add(p);
}
thoughtPixels.visible = false;
scene.add(thoughtPixels);

const transitionPixels = new THREE.Group();
for (let i = 0; i < 28; i++) {
  const p = pixelBox(.09 + (i % 3) * .025, .09 + (i % 3) * .025, [COLORS.orange, COLORS.teal, COLORS.cream][i % 3]);
  p.userData.angle = i / 28 * Math.PI * 2;
  p.userData.radius = .45 + (i % 5) * .18;
  transitionPixels.add(p);
}
transitionPixels.visible = false;
scene.add(transitionPixels);

const duration = {
  idle: 3.4,
  curious: 3.2,
  'face-front': 3.4,
  'face-right': 3.2,
  'face-left': 3.2,
  think: 4,
  surprise: 2.6,
  celebrate: 3,
  error: 2.5,
  'point-left': 3,
  'point-right': 3,
  press: 3.2,
  transition: 3
};

const labels = {
  idle: 'Idle loop ready',
  curious: 'Curious tilt playing',
  'face-front': 'Front-facing loop playing',
  'face-right': 'Right-facing turn playing',
  'face-left': 'Left-facing turn playing',
  think: 'Thinking orbit playing',
  surprise: 'Surprise reaction playing',
  celebrate: 'Celebration playing',
  error: 'Incorrect-answer reaction playing',
  'point-left': 'Pointing left',
  'point-right': 'Pointing right',
  press: 'Button press playing',
  transition: 'Pixel transition playing'
};

let activeAnimation = 'idle';
let animationStarted = performance.now();
let playbackSpeed = 1;
const timelineProgress = document.querySelector('#timeline-progress');
const stageAnimation = document.querySelector('#stage-animation');

const clamp01 = value => Math.max(0, Math.min(1, value));
const smooth = value => {
  const v = clamp01(value);
  return v * v * (3 - 2 * v);
};
const pulse = (p, start, end) => smooth((p - start) / .12) * smooth((end - p) / .12);

function resetModel() {
  mascotRoot.position.set(0, .15, 0);
  mascotRoot.rotation.set(0, 0, 0);
  mascotRoot.scale.setScalar(1);
  shadow.scale.set(1.2, .42, 1);
  shadow.material.opacity = .25;
  eyes.forEach(eye => eye.scale.set(1, 1, 1));
  glints.forEach(glint => glint.visible = true);
  brows.forEach(brow => {
    brow.position.y = .52;
    brow.rotation.z = 0;
    brow.visible = false;
  });
  cheekBasic.opacity = .32;
  mouth.visible = true;
  openMouth.visible = false;
  arrow.visible = false;
  button.visible = false;
  thoughtPixels.visible = false;
  transitionPixels.visible = false;
  cube.visible = true;
  face.visible = true;
  materials.forEach(material => {
    material.emissive?.setHex(0x000000);
    material.emissiveIntensity = 0;
  });
}

function baseFloat(t) {
  const bob = Math.sin(t * Math.PI * 2 / 2.8) * .085;
  mascotRoot.position.y += bob;
  mascotRoot.rotation.y = Math.sin(t * Math.PI * 2 / 4.6) * .045;
  shadow.scale.x = 1.2 - bob * .32;
  shadow.scale.y = .42 - bob * .1;
}

function animateModel(timeMs) {
  resetModel();
  const elapsed = (timeMs - animationStarted) / 1000 * playbackSpeed;
  const d = duration[activeAnimation];
  const p = (elapsed % d) / d;
  gazeCurrent.lerp(gazeTarget, .09);
  pupils.forEach(pupil => pupil.position.set(gazeCurrent.x, gazeCurrent.y, .03));
  baseFloat(elapsed);

  if (activeAnimation === 'face-front') {
    mascotRoot.rotation.y = 0;
  }

  if (activeAnimation === 'face-right' || activeAnimation === 'face-left') {
    const direction = activeAnimation === 'face-right' ? 1 : -1;
    mascotRoot.rotation.y = direction * .62 * pulse(p, .1, .9);
  }

  if (activeAnimation === 'idle') {
    const blinkPhase = elapsed % 3.4;
    if (blinkPhase > 2.72 && blinkPhase < 2.88) {
      const close = Math.abs(blinkPhase - 2.8) / .08;
      eyes.forEach(eye => eye.scale.y = Math.max(.08, close));
      glints.forEach(glint => glint.visible = false);
    }
  }

  if (activeAnimation === 'curious') {
    const tilt = pulse(p, .15, .78);
    mascotRoot.rotation.z = -.16 * tilt;
    mascotRoot.rotation.y += .12 * tilt;
    pupils.forEach(pupil => pupil.position.x += .04 * tilt);
    brows.forEach(brow => brow.visible = true);
    brows[0].position.y += .035 * tilt;
    brows[0].rotation.z = -.12 * tilt;
    brows[1].position.y -= .025 * tilt;
    brows[1].rotation.z = .08 * tilt;
  }

  if (activeAnimation === 'think') {
    const thinking = pulse(p, .08, .88);
    mascotRoot.rotation.z = .11 * Math.sin(p * Math.PI * 2) * thinking;
    pupils.forEach(pupil => {
      pupil.position.x -= .035 * thinking;
      pupil.position.y += .065 * thinking;
    });
    brows.forEach(brow => brow.visible = true);
    brows[0].rotation.z = -.12 * thinking;
    brows[1].rotation.z = .12 * thinking;
    thoughtPixels.visible = true;
    thoughtPixels.children.forEach((pixel, i) => {
      const angle = p * Math.PI * 2 + i / 5 * Math.PI * 2;
      pixel.position.set(Math.cos(angle) * 1.65, .5 + Math.sin(angle) * .58, .5);
      pixel.rotation.z = angle;
    });
  }

  if (activeAnimation === 'surprise') {
    const hit = pulse(p, .16, .72);
    mascotRoot.scale.set(1 - .09 * hit, 1 + .2 * hit, 1 - .09 * hit);
    mascotRoot.position.y += .16 * hit;
    eyes.forEach(eye => eye.scale.set(1.18, 1.2, 1));
    cheekBasic.opacity = .32 + .22 * hit;
    mouth.visible = false;
    openMouth.visible = true;
    openMouth.scale.setScalar(.7 + .3 * hit);
  }

  if (activeAnimation === 'celebrate') {
    const jump = Math.pow(Math.abs(Math.sin(p * Math.PI * 2)), .72);
    mascotRoot.position.y += jump * .72;
    mascotRoot.rotation.y += p * Math.PI * 2;
    mascotRoot.scale.set(1 - jump * .06, 1 + jump * .08, 1 - jump * .06);
    materials.forEach(material => {
      material.emissive?.setHex(COLORS.green);
      material.emissiveIntensity = .14 * jump;
    });
    shadow.material.opacity = .25 - jump * .14;
  }

  if (activeAnimation === 'error') {
    const intensity = pulse(p, .08, .82);
    mascotRoot.position.x += Math.sin(p * Math.PI * 18) * .16 * intensity;
    mascotRoot.rotation.z = Math.sin(p * Math.PI * 18) * .035 * intensity;
    eyes.forEach(eye => eye.scale.y = .58);
    brows.forEach(brow => brow.visible = true);
    brows[0].rotation.z = -.24 * intensity;
    brows[1].rotation.z = .24 * intensity;
    brows.forEach(brow => brow.position.y -= .04 * intensity);
    materials.forEach(material => {
      material.emissive?.setHex(COLORS.error);
      material.emissiveIntensity = .2 * intensity;
    });
  }

  if (activeAnimation === 'point-left' || activeAnimation === 'point-right') {
    const direction = activeAnimation === 'point-left' ? -1 : 1;
    const show = pulse(p, .12, .86);
    mascotRoot.rotation.z = direction * -.08 * show;
    pupils.forEach(pupil => pupil.position.x += direction * .07 * show);
    arrow.visible = show > .02;
    arrow.scale.setScalar(.8 + .13 * Math.sin(p * Math.PI * 8));
    arrow.position.set(direction * 2.05, .28 + Math.sin(p * Math.PI * 4) * .04, .4);
    arrow.rotation.z = direction < 0 ? Math.PI : 0;
  }

  if (activeAnimation === 'press') {
    button.visible = true;
    const approach = pulse(p, .15, .72);
    mascotRoot.position.x += approach * .72;
    mascotRoot.rotation.z = -approach * .1;
    pupils.forEach(pupil => pupil.position.x += .065 * approach);
    const pressDepth = Math.max(0, 1 - Math.abs(p - .46) / .08);
    buttonFace.position.z = .16 - pressDepth * .11;
    buttonFace.material.emissiveIntensity = .15 + pressDepth * .9;
  }

  if (activeAnimation === 'transition') {
    const vanish = smooth((p - .18) / .38);
    const returnIn = smooth((p - .68) / .24);
    const visibility = p < .68 ? 1 - vanish : returnIn;
    mascotRoot.scale.setScalar(Math.max(.02, visibility));
    mascotRoot.rotation.y += p * Math.PI * 4;
    transitionPixels.visible = true;
    transitionPixels.children.forEach((pixel, i) => {
      const wave = Math.sin(p * Math.PI);
      const angle = pixel.userData.angle + p * Math.PI * 2;
      const radius = pixel.userData.radius * (1 + wave * 1.4);
      pixel.position.set(Math.cos(angle) * radius, .2 + Math.sin(angle) * radius, .3);
      pixel.scale.setScalar(.55 + wave * .55);
    });
  }
}

function render(time) {
  animateModel(time);
  const elapsed = (time - animationStarted) / 1000 * playbackSpeed;
  const progress = (elapsed % duration[activeAnimation]) / duration[activeAnimation];
  timelineProgress.style.width = `${progress * 100}%`;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

function selectAnimation(name) {
  activeAnimation = name;
  animationStarted = performance.now();
  document.querySelectorAll('[data-animation]').forEach(buttonEl => {
    buttonEl.classList.toggle('active', buttonEl.dataset.animation === name);
  });
  document.querySelector('#status-text').textContent = labels[name];
  stageAnimation.textContent = name.replace('-', ' ');
}

document.querySelector('#animation-grid').addEventListener('click', event => {
  const animation = event.target.closest('[data-animation]')?.dataset.animation;
  if (animation) selectAnimation(animation);
});

document.querySelector('#background-select').addEventListener('change', event => {
  const value = event.target.value;
  scene.background = value === 'transparent' ? null : new THREE.Color(value === 'cream' ? COLORS.warmCream : COLORS.navy);
});

document.querySelector('#speed-select').addEventListener('change', event => {
  playbackSpeed = Number(event.target.value);
  animationStarted = performance.now();
});

document.querySelector('#safe-zone-toggle').addEventListener('change', event => {
  document.querySelector('#stage-shell').classList.toggle('show-safe', event.target.checked);
});

function downloadBlob(blob, filename) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

document.querySelector('#snapshot-button').addEventListener('click', () => {
  // preserveDrawingBuffer keeps the current WebGL frame available for this
  // synchronous export. A data URL is reliable in installed and headless
  // Chromium, where canvas.toBlob callbacks may be suppressed.
  renderer.render(scene, camera);
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `qubix-cube-${activeAnimation}.png`;
  link.click();
});

document.querySelector('#record-button').addEventListener('click', async event => {
  const recordButton = event.currentTarget;
  const recordLabel = recordButton.querySelector('span');
  const selectedAnimation = activeAnimation;
  const recordingSeconds = duration[selectedAnimation] / playbackSpeed;
  recordButton.disabled = true;
  recordLabel.textContent = 'Recording…';
  selectAnimation(selectedAnimation);
  document.querySelector('#status-text').textContent = `Recording one ${selectedAnimation} loop`;

  const stream = canvas.captureStream(30);
  const mimeType = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'].find(type => MediaRecorder.isTypeSupported(type));
  const recorderOptions = { videoBitsPerSecond: 8_000_000 };
  if (mimeType) recorderOptions.mimeType = mimeType;
  const recorder = new MediaRecorder(stream, recorderOptions);
  const chunks = [];
  recorder.ondataavailable = eventData => eventData.data.size && chunks.push(eventData.data);
  const stopped = new Promise(resolve => recorder.onstop = resolve);
  recorder.start(250);
  await new Promise(resolve => setTimeout(resolve, recordingSeconds * 1000));
  recorder.stop();
  await stopped;
  stream.getTracks().forEach(track => track.stop());
  downloadBlob(new Blob(chunks, { type: mimeType }), `qubix-cube-${selectedAnimation}.webm`);
  recordButton.disabled = false;
  recordLabel.textContent = 'Record one loop';
  document.querySelector('#status-text').textContent = `${labels[selectedAnimation]} · recording saved`;
});

document.addEventListener('keydown', event => {
  const shortcuts = {
    '1': 'idle', '2': 'curious', '3': 'think', '4': 'surprise', '5': 'celebrate',
    '6': 'error', '7': 'point-left', '8': 'point-right', '9': 'press', '0': 'transition',
    'f': 'face-front', 'r': 'face-right', 'l': 'face-left'
  };
  if (shortcuts[event.key.toLowerCase()]) selectAnimation(shortcuts[event.key.toLowerCase()]);
  if (event.key.toLowerCase() === 's') document.querySelector('#snapshot-button').click();
});
