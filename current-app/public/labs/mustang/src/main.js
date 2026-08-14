/**
 * main.js — scene, render loop, and the wiring between physics, car and UI.
 *
 * The car stays at the origin and the ROAD moves underneath it. That keeps the
 * camera simple and, more usefully, keeps the free-body diagram in one place so
 * students can watch the arrows change without chasing the car around.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

import { Vehicle, SURFACES, stoppingDistance } from './physics.js';
import { specForPreset, DEFAULT_PRESET_KEY } from './vehicles.js';
import { buildCar, GEOMETRY } from './car.js';
import { ForceOverlay } from './arrows.js';
import { Hud } from './hud.js';
import { LessonController, frictionLesson, brakeLesson } from './lesson.js';
import { ObservationBooklet } from './observations.js';
import { TrackEnvironment, TyrePuffs, TRACK } from './environment.js';

// ------------------------------------------------------------------ scene
const canvasHost = document.getElementById('viewport');

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x1b2230, 40, 130);

// Slightly side-on and low: the angle that reads the force arrows and the
// car's pitch under braking at the same time.
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 400);
camera.position.set(7.4, 2.2, 7.6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
canvasHost.appendChild(renderer.domElement);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.65;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.target.set(0, 0.75, 0);
controls.minDistance = 4;
controls.maxDistance = 24;
controls.maxPolarAngle = Math.PI / 2 - 0.03;

// ----------------------------------------------------------------- lights
scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x30302c, 0.55));

const key = new THREE.DirectionalLight(0xffffff, 2.1);
key.position.set(6, 9, 5);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 30 });
key.shadow.camera.updateProjectionMatrix();
key.shadow.bias = -0.0005;
scene.add(key);

const rimLight = new THREE.DirectionalLight(0xbcd4ff, 0.7);
rimLight.position.set(-7, 4, -6);
scene.add(rimLight);

// ------------------------------------------------------- track environment
// Sky, verge, measured lane, distance numerals and cones. Cosmetic only: the
// physics never reads from here.
const track = new TrackEnvironment(scene);
const puffs = new TyrePuffs(scene);

// Stopping-distance marker — a line on the road showing the predicted stop.
const markerGeo = new THREE.PlaneGeometry(0.22, TRACK.laneWidth);
const markerMat = new THREE.MeshBasicMaterial({ color: 0xff5c5c, side: THREE.DoubleSide, transparent: true, opacity: 0.75 });
const stopMarker = new THREE.Mesh(markerGeo, markerMat);
stopMarker.rotation.x = -Math.PI / 2;
stopMarker.position.y = 0.03;
stopMarker.visible = false;
scene.add(stopMarker);

// Skid-mark planes under each axle (shown during lockup).
const skidGeo = new THREE.PlaneGeometry(1.6, 0.5);
const skidMat = new THREE.MeshBasicMaterial({ color: 0x111111, side: THREE.DoubleSide, transparent: true, opacity: 0 });
const frontSkid = new THREE.Mesh(skidGeo, skidMat);
frontSkid.rotation.x = -Math.PI / 2;
frontSkid.position.set(0, 0.015, 0);
scene.add(frontSkid);
const rearSkid = new THREE.Mesh(skidGeo, skidMat.clone());
rearSkid.rotation.x = -Math.PI / 2;
rearSkid.position.set(0, 0.015, 0);
scene.add(rearSkid);

// ------------------------------------------------------------------- car
const built = buildCar();
scene.add(built.car);

const overlay = new ForceOverlay(scene);

// --------------------------------------------------------------- simulation
const vehicle = new Vehicle(specForPreset(DEFAULT_PRESET_KEY), 'dry');
let currentPresetKey = DEFAULT_PRESET_KEY;
let slowMo = false;
let throttleLimit = 1;
const stats = {
  reached100: null, everSlipped: false,
  stoppedFrom30: null, everLocked: false
};
let brakingRun = null; // { startDist, startSpeed } when a brake run begins

function resetRun() {
  vehicle.reset();
  stats.reached100 = null;
  stats.everSlipped = false;
  stats.stoppedFrom30 = null;
  stats.everLocked = false;
  brakingRun = null;
  built.car.rotation.z = 0;
}

function applyPreset(key) {
  currentPresetKey = key;
  Object.assign(vehicle.spec, specForPreset(key));
  hud.setPreset(key);
  resetRun();
}

function applySurface(k) {
  vehicle.setSurface(k);
  track.applySurface(k);
  hud.setSurface(k);
  showSurfaceBanner(SURFACES[k].label);
}

// A short caption when the surface changes, the way an exhibit labels its
// current configuration.
const surfaceBanner = document.getElementById('surface-banner');
let surfaceBannerTimer = null;
function showSurfaceBanner(label) {
  if (!surfaceBanner) return;
  surfaceBanner.textContent = label;
  surfaceBanner.classList.add('visible');
  clearTimeout(surfaceBannerTimer);
  surfaceBannerTimer = setTimeout(() => surfaceBanner.classList.remove('visible'), 1800);
}

// ---------------------------------------------------------------------- ui
const hud = new Hud(document.getElementById('hud'), document.getElementById('driver'), {
  onSurface: (k) => { applySurface(k); resetRun(); },
  onPreset: (k) => applyPreset(k),
  onReset: resetRun,
  onToggleForces: (on) => overlay.setEnabled(on),
  onToggleSlowMo: (on) => { slowMo = on; }
});
hud.setPreset(currentPresetKey);

// Sidebar tabs: Observe / Lesson / Instruments.
const tabButtons = [...document.querySelectorAll('#tabs button')];
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.toggle('active', b === button));
    document.querySelectorAll('.pane').forEach((pane) => {
      pane.classList.toggle('active', pane.id === button.dataset.pane);
    });
  });
});

// Observation booklet (museum-style numbered trail)
const booklet = new ObservationBooklet(document.getElementById('observations'));

// Lesson switcher
const lessons = { friction: frictionLesson, brakes: brakeLesson };
let currentLessonKey = 'friction';

const lessonRoot = document.getElementById('lesson');
let lesson = new LessonController(frictionLesson, lessonRoot, (setup) => {
  if (setup.surface) applySurface(setup.surface);
  if (setup.throttleLimit != null) throttleLimit = setup.throttleLimit;
  resetRun();
});

const picker = document.getElementById('lesson-pick');
picker.innerHTML = `
  <option value="friction">Lesson 1 — Friction & Traction</option>
  <option value="brakes">Lesson 2 — Braking & Stopping</option>`;
picker.value = currentLessonKey;
picker.addEventListener('change', () => {
  currentLessonKey = picker.value;
  booklet.setLesson(currentLessonKey);
  lesson = new LessonController(lessons[currentLessonKey], lessonRoot, (setup) => {
    if (setup.surface) applySurface(setup.surface);
    if (setup.throttleLimit != null) throttleLimit = setup.throttleLimit;
    resetRun();
  });
});

// ------------------------------------------------------------------- loop
function resize() {
  const w = canvasHost.clientWidth, h = canvasHost.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);

const clock = new THREE.Clock();
let wheelAngle = 0;

function animate() {
  requestAnimationFrame(animate);

  const raw = Math.min(0.05, clock.getDelta());
  const dt = slowMo ? raw * 0.25 : raw;

  const c = hud.readControls();
  vehicle.step(dt, { throttle: Math.min(c.throttle, throttleLimit), brake: c.brake });

  // 0-100 km/h timing
  if (!stats.reached100 && vehicle.speedKph >= 100) stats.reached100 = vehicle.time;
  if (vehicle.slipping) stats.everSlipped = true;

  // Brake lesson stats: track a braking run from ≥ 30 m/s to a stop.
  // Record the distance at the moment braking starts, so the stopping
  // distance is finalDist - startDist.
  if (!brakingRun && vehicle.v >= 29.5 && c.brake > 0.1) {
    brakingRun = { startDist: vehicle.distance, startSpeed: vehicle.v };
  }
  if (brakingRun && vehicle.v === 0) {
    const d = vehicle.distance - brakingRun.startDist;
    if (brakingRun.startSpeed >= 29.5) {
      if (!stats.stoppedFrom30 || d < stats.stoppedFrom30) {
        stats.stoppedFrom30 = d;
      }
    }
    brakingRun = null;
  }
  // If the user lets off the brake before stopping, reset the run.
  if (brakingRun && c.brake < 0.05) {
    brakingRun = null;
  }
  if (vehicle.frontLocked || vehicle.rearLocked) stats.everLocked = true;

  lesson.reportProgress(stats);

  // scroll the lane, distance numerals and cones backwards under the car
  track.update(vehicle.distance);

  // wheels: driven wheels turn faster than the road when they are spinning
  wheelAngle -= vehicle.wheelOmega * dt;
  const rollAngle = -(vehicle.distance / GEOMETRY.frontRadius);
  built.wheels.rear.forEach(w => { w.rotation.z = wheelAngle; });
  built.wheels.front.forEach(w => { w.rotation.z = rollAngle; });

  // squat under power, dive under braking — a visible cue for weight transfer
  // +rotation.z lifts the nose, so accelerating (ax > 0) squats the tail.
  const targetPitch = THREE.MathUtils.clamp(vehicle.ax * 0.006, -0.05, 0.05);
  built.car.rotation.z += (targetPitch - built.car.rotation.z) * Math.min(1, dt * 6);

  // brake lights
  const braking = c.brake > 0.02;
  built.brakeLights.forEach(l => l.material.emissive.setHex(braking ? 0xff2200 : 0x5a0800));

  // Lockup visuals — skid marks under locked axles.
  const axleX = { front: 1.4, rear: -1.4 };
  frontSkid.material.opacity = vehicle.frontLocked ? 0.6 : 0;
  frontSkid.position.x = axleX.front;
  rearSkid.material.opacity = vehicle.rearLocked ? 0.6 : 0;
  rearSkid.position.x = axleX.rear;

  // Tyre smoke on wheelspin, spray on a locked axle: the slide should be
  // visible in the world, not only in the readout.
  puffs.update(dt, vehicle, axleX);

  // Stopping-distance marker — where the car would stop from here.
  if (vehicle.v > 2 && c.brake > 0.02) {
    stopMarker.position.x = stoppingDistance(vehicle.v, vehicle.surface.mu_s);
    stopMarker.visible = true;
  } else {
    stopMarker.visible = false;
  }

  overlay.update(vehicle, GEOMETRY);
  hud.update(vehicle, stats);

  controls.update();
  renderer.render(scene, camera);
}

resize();
animate();
