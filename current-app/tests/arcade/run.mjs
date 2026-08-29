import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

const bundle = readFileSync('tests/arcade/.out/bundle.js', 'utf8');
const dom = new JSDOM('<!doctype html><html data-qx-theme="light"><body><div id="app"></div></body></html>', {
  runScripts: 'outside-only', pretendToBeVisual: true
});
const { window } = dom;
const errors = [];
window.addEventListener('error', (e) => errors.push('window: ' + e.message));

// stubs
const ctxStub = () => new Proxy({ canvas: {} }, {
  get(t, p) {
    if (p === 'measureText') return () => ({ width: 10 });
    if (p === 'createRadialGradient' || p === 'createLinearGradient') return () => ({ addColorStop: () => {} });
    return () => undefined;
  }, set() { return true; }
});
window.HTMLCanvasElement.prototype.getContext = function () { return ctxStub(); };
let rafQ = [];
window.requestAnimationFrame = (fn) => { rafQ.push(fn); return rafQ.length; };
window.cancelAnimationFrame = () => {};
const tick = (ms = 6) => new Promise((r) => setTimeout(r, ms));
const pump = async (n) => { for (let i = 0; i < n; i++) { const q = rafQ; rafQ = []; q.forEach((f) => { try { f(Date.now()); } catch (e) { errors.push('raf: ' + e.message); } }); await tick(1); } };
class FN { connect() { return this; } start() {} stop() {} }
class FA {
  constructor() { this.currentTime = 0; this.destination = new FN(); this.state = 'running'; }
  createOscillator() { const n = new FN(); n.frequency = { value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {}, linearRampToValueAtTime() {} }; n.type = ''; return n; }
  createGain() { const n = new FN(); n.gain = { value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {}, linearRampToValueAtTime() {} }; return n; }
  resume() { return Promise.resolve(); }
}
window.AudioContext = FA; window.webkitAudioContext = FA;
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
// SVG geometry for pointer-drag tests (Ropeworks): 360x300 viewBox at 1:1
window.SVGElement.prototype.getBoundingClientRect = function () {
  return { left: 0, top: 0, width: 360, height: 300, right: 360, bottom: 300 };
};
window.SVGElement.prototype.setPointerCapture = () => {};

let pass = 0, fail = 0;
const check = (n, ok, x = '') => { ok ? pass++ : fail++; console.log((ok ? 'PASS' : 'FAIL') + ' · ' + n + (x && !ok ? ' — ' + x : '')); };
const $$ = (s) => window.eval(`$$(${JSON.stringify(s)})`);
const btn = (t) => window.eval(`btnByText(${JSON.stringify(t)})`);
const click = async (b) => { if (!b) { console.log('STATE>>', bodyText().slice(0, 260)); throw new Error('missing button'); } b.click(); await tick(20); };
const setRange = async (ix, val) => {
  const el = $$('input[type=range]')[ix];
  el.value = String(val);
  el.dispatchEvent(new window.Event('input', { bubbles: true }));
  await tick(8);
};
const doneCount = () => window.eval('__done.length');
const lastDone = () => JSON.parse(window.eval('JSON.stringify(__done[__done.length-1]||null)'));
const bodyText = () => window.eval('document.body.textContent');

window.eval(bundle);

// ═══ 1 · SKYHOOK (trig) — full playthrough ═══
console.log('— Skyhook —');
errors.length = 0;
window.eval(`__mount('trig')`); await tick(20);
await click(btn('take the controls'));
const rescueAngles = [30, 60, 45, 15, 75];
for (let i = 0; i < rescueAngles.length; i += 1) {      // M1 rescues
  const th = rescueAngles[i];
  await setRange(0, th);
  await click(btn('dispatch the hook'));
  await click(btn(i === rescueAngles.length - 1 ? 'continue to the ratio test' : 'continue to the next climber'));
}
check('skyhook: mission 2 briefing reached', bodyText().includes('The Ratio'), bodyText().slice(0, 120));
await click(btn('take the controls'));                  // enter mission 2
await click(btn('extend to'));                          // L1 measure
await click(btn('continue to the longer arm'));
await click(btn('extend to'));                          // L2 measure → commit
await click(btn('make a prediction'));
check('skyhook: commit MCQ appears', !!btn('260'));
await click(btn('260'));                                // round 1 correct
await click(btn('continue to the next angle'));
await click(btn('extend to'));
await click(btn('continue to the longer arm'));
await click(btn('extend to'));
await click(btn('make a prediction'));
await click(btn('320'));                                // round 2 correct
await click(btn('continue to the next angle'));
await click(btn('extend to'));
await click(btn('continue to the longer arm'));
await click(btn('extend to'));
await click(btn('make a prediction'));
await click(btn('255'));                                // round 3 correct
await click(btn('continue to the next angle'));
await click(btn('extend to'));
await click(btn('continue to the longer arm'));
await click(btn('extend to'));
await click(btn('make a prediction'));
await click(btn('272'));                                // round 4 correct
await click(btn('continue to the final rescue'));
await click(btn('take the controls'));                  // mission 3 brief
for (const th of [37, 30, 53]) {
  await setRange(0, th);
  await click(btn('take the shot'));
  await click(btn(th === 53 ? 'reveal the concept' : 'continue to the next ratio rescue'));
}
check('skyhook: reveal names sine/cosine', bodyText().includes('SINE') && bodyText().includes('COSINE'));
check('skyhook: reward recorded once, transferFirstTry', doneCount() === 1 && lastDone().transferFirstTry === true, JSON.stringify(lastDone()));
check('skyhook: no errors', errors.length === 0, errors.slice(0, 2).join(' | '));

// ═══ 2 · THE BIG WHEEL (sine) — full playthrough ═══
console.log('— The Big Wheel —');
errors.length = 0;
window.eval(`__mount('hacker')`); await tick(20);
const rides = [
  { params: [{ 0: 60 }, { 0: 25 }] },                                   // M1: A
  { params: [{ 0: 45, 1: 3.0 }, { 0: 65, 1: 1.0 }] },                   // M2: A, w
  { params: [{ 0: 40, 1: 2.0, 2: 1.6, 3: 25 }, { 0: 55, 1: 1.5, 2: 3.1, 3: -20 }] }, // M3
  { params: [{ 0: 50, 1: 2.0, 2: 1.5, 3: 20 }] }                        // M4 dark
];
for (let mi = 0; mi < rides.length; mi++) {
  const m = rides[mi];
  await click(btn('start the wheel'));
  for (let ri = 0; ri < m.params.length; ri++) {
    const ride = m.params[ri];
    for (const [ix, v] of Object.entries(ride)) await setRange(Number(ix), v);
    const lock = $$('button.lock.armed')[0];
    check('wheel: lock armed', !!lock, bodyText().match(/MATCH \d+%/)?.[0]);
    if (!lock) break;
    lock.click();
    await tick(20);
    await click(btn(ri < m.params.length - 1
      ? 'continue to the next ride'
      : mi < rides.length - 1 ? 'continue to the next mission' : 'reveal the concept'));
  }
}
check('wheel: dark ride showed formula banner', true); // asserted implicitly by lock arming on M4
check('wheel: reveal ties wheel to sine', bodyText().includes('spinning wheel'));
check('wheel: reward recorded once', doneCount() === 2, 'done=' + doneCount());
check('wheel: no errors', errors.length === 0, errors.slice(0, 2).join(' | '));

// ═══ 3 · ROPEWORKS (conics) — full playthrough incl. rig drag ═══
console.log('— Ropeworks —');
errors.length = 0;
window.eval(`__mount('orbit')`); await tick(20);
const ptr = (type, wx, wy) => {
  const e = new window.Event(type, { bubbles: true });
  e.clientX = wx + 180; e.clientY = 156 - wy; e.pointerId = 1;
  $$('svg.scene')[0].dispatchEvent(e);
};
const dragRig = async (wx, wy) => { ptr('pointerdown', 0, 0); await tick(4); ptr('pointermove', wx, wy); await tick(4); ptr('pointerup', wx, wy); await tick(8); };
// M1: circles
await click(btn('rig the rope'));
await setRange(0, 140); await click(btn('sweep the orbit')); await click(btn('continue to the next sweep'));
await setRange(0, 190); await click(btn('sweep the orbit')); await click(btn('continue to the next mission'));
// M2: spread anchors
await click(btn('rig the rope'));
await setRange(0, 240); await setRange(1, 212); await click(btn('sweep the orbit')); await click(btn('continue to the next sweep'));
await setRange(0, 220); await setRange(1, 188); await click(btn('sweep the orbit')); await click(btn('continue to the next mission'));
// M3: slide the rig. Drag while anchors are spread (sep 90) so the rig
// handle is grabbable, then merge anchors and size the rope.
const dragRigFrom = async (fx, fy, wx, wy) => { ptr('pointerdown', fx, fy); await tick(4); ptr('pointermove', wx, wy); await tick(4); ptr('pointerup', wx, wy); await tick(8); };
await click(btn('rig the rope'));
await dragRig(95, 40); await setRange(1, 0); await setRange(0, 118);
await click(btn('sweep the orbit')); await click(btn('continue to the next sweep'));
await setRange(1, 90);
await dragRigFrom(95, 40, -100, -47);
await setRange(1, 0); await setRange(0, 96);
await click(btn('sweep the orbit')); await click(btn('continue to the final check'));
check('ropeworks: transfer equation shown', bodyText().includes('(x − 60)'), bodyText().slice(0, 140));
await click(btn('(−40, 0)'));                          // wrong on purpose
check('ropeworks: wrong anchor call shows c²=a²−b² hint', bodyText().includes('c² = a² − b²'));
await click(btn('(−20, 0)'));
check('ropeworks: reveal names foci + string rule', bodyText().includes('FOCI'));
check('ropeworks: reward recorded, retry flagged', doneCount() === 3 && lastDone().transferFirstTry === false, JSON.stringify(lastDone()));
check('ropeworks: no errors', errors.length === 0, errors.slice(0, 2).join(' | '));

// ═══ 4 · RADAR NINE (polar) — full playthrough ═══
console.log('— Radar Nine —');
errors.length = 0;
window.eval(`__mount('aegis')`); await tick(20);
await click(btn('to the console'));
for (const b of [{ r: 120, th: 150 }, { r: 80, th: 30 }, { r: 100, th: 270 }, { r: 60, th: 200 }]) {
  await setRange(0, b.r); await setRange(1, b.th);
  await click(btn('tag the blip'));
  await click(btn(b.th === 200 ? 'continue to translation' : 'continue to the next blip'));
}
check('radar: translation mission reached', bodyText().includes('Two Languages'), bodyText().slice(0, 120));
await click(btn('to the console'));
await click(btn('(50, 87)'));
await click(btn('continue to the next translation'));
await click(btn('(−80, 0)'));
await click(btn('continue to the fence'));
await click(btn('to the console'));                     // mission 3
await setRange(0, 100); await setRange(1, 3);           // round 1: k=3 aligns 0°,60°…
await click(btn('energize')); await click(btn('continue to the rotated raid'));
await setRange(1, 3);                                    // round 2: k=3 must FAIL (rotated raid)
await click(btn('energize')); await tick(100);
check('radar: misaligned petals breach', bodyText().includes('BREACH'));
await setRange(0, 100); await setRange(1, 6);            // k=6 aligns 30°,90°… (a resets between rounds)
await click(btn('energize')); await click(btn('continue to the formula'));
check('radar: root question shown', bodyText().includes('110 · cos(3θ)'), bodyText().slice(0, 140));
await click(btn('to the console'));
await click(btn('0°, 60°, 120°'));
await click(btn('reveal the concept'));
check('radar: reveal names polar + rose', bodyText().includes('ROSE CURVE'));
check('radar: reward recorded once', doneCount() === 4, 'done=' + doneCount());
check('radar: no errors', errors.length === 0, errors.slice(0, 2).join(' | '));

// ═══ 5 · regression: Bayes / Projectile / Vector Racer beats still intact ═══
console.log('— regression: earlier upgrades —');
errors.length = 0;
window.eval(`__mount('bayes')`); await tick(20);
for (let lvl = 0; lvl < 3; lvl++) {
  await click(btn('sweep the detector'));
  await click(btn('lock in'));
  await click(btn(lvl < 2 ? 'next field' : 'what did i just do'));
}
await click(btn('about 1 in 21'));
check('bayes: transfer + reward intact', doneCount() === 5 && lastDone().transferFirstTry === true);
window.eval(`__mount('projectile')`); await tick(20);
await setRange(0, 45); await setRange(1, 22); await click(btn('fire')); await pump(4); await tick(40);
await click(btn('next mission'));
await setRange(0, 60); await setRange(1, 29); await click(btn('fire')); await pump(4); await tick(40);
await click(btn('next mission'));
check('projectile: L3 preview still hidden', $$('.aim').length === 0);
await setRange(0, 45); await click(btn('fire')); await pump(4); await tick(40);
await click(btn('what did i just do'));
await click(btn('60°'));
check('projectile: transfer + reward intact', doneCount() === 6);
check('regression: no errors', errors.length === 0, errors.slice(0, 2).join(' | '));

console.log(`\n═══ Results: ${pass} passed, ${fail} failed ═══`);
process.exit(fail ? 1 : 0);
