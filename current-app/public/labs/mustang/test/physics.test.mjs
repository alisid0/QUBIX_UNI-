/**
 * Physics sanity checks. Run with:  node test/physics.test.mjs
 *
 * These are the tests that matter for an educational tool: if the simulation
 * quietly disagrees with the equations printed on screen, the whole thing
 * teaches the wrong lesson.
 */

import {
  Vehicle, DEFAULT_SPEC, SURFACES, G,
  tractionLimitedAcceleration, dragLimitedSpeed,
  stoppingDistance, stoppingTime, brakingDeceleration,
  frontAxleLoad, rearAxleLoad
} from '../src/physics.js';
import { specForPreset } from '../src/vehicles.js';

let passed = 0, failed = 0;

function check(name, condition, detail = '') {
  if (condition) { passed++; console.log(`  ok   ${name}`); }
  else { failed++; console.log(`  FAIL ${name}${detail ? '  — ' + detail : ''}`); }
}
function close(a, b, tol, name) {
  check(name, Math.abs(a - b) <= tol, `got ${a.toFixed(3)}, expected ${b.toFixed(3)} ±${tol}`);
}

const run = (v, seconds, controls, dt = 1 / 240) => {
  for (let t = 0; t < seconds; t += dt) v.step(dt, controls);
  return v;
};

console.log('\nNewton / traction');
{
  // On ice, acceleration must be set by grip, not by the engine.
  const v = new Vehicle(DEFAULT_SPEC, 'ice');
  run(v, 1.0, { throttle: 1 });
  check('flooring it on ice causes wheelspin', v.slipping);
  const expected = SURFACES.ice.mu_k * v.rearLoad / DEFAULT_SPEC.mass;
  close(v.ax, expected, 0.35, 'ice acceleration equals mu_k*N/m');

  // Same car, dry road: much larger, and still well under the naive F/m.
  const d = new Vehicle(DEFAULT_SPEC, 'dry');
  run(d, 1.0, { throttle: 1 });
  const naive = DEFAULT_SPEC.maxDriveForce / DEFAULT_SPEC.mass;
  check('dry acceleration beats ice', d.ax > v.ax * 3);
  check('dry acceleration is below the naive F/m figure', d.ax < naive,
    `${d.ax.toFixed(2)} vs ${naive.toFixed(2)}`);
}

console.log('\nWeight transfer');
{
  const v = new Vehicle(DEFAULT_SPEC, 'dry');
  v.step(1 / 240, { throttle: 0 });
  const restRear = v.rearLoad, restFront = v.frontLoad;
  close(restRear + restFront, DEFAULT_SPEC.mass * G, 1,
    'axle loads at rest sum to the weight');

  run(v, 1.0, { throttle: 1 });
  check('accelerating moves load to the rear', v.rearLoad > restRear);
  check('accelerating unloads the front', v.frontLoad < restFront);
  close(v.rearLoad + v.frontLoad, DEFAULT_SPEC.mass * G, 1,
    'axle loads still sum to the weight under acceleration');
}

console.log('\nFriction hysteresis');
{
  // Once the tyre is sliding, easing back to just under the STATIC limit must
  // not magically restore grip — the demand has to fall under the KINETIC one.
  const v = new Vehicle(DEFAULT_SPEC, 'dry');
  run(v, 0.5, { throttle: 1 });
  check('flooring it on dry tarmac breaks traction', v.slipping);

  const justUnderStatic = (v.gripLimit * 0.99) / DEFAULT_SPEC.maxDriveForce;
  v.step(1 / 240, { throttle: justUnderStatic });
  check('easing to just under mu_s*N does not recover grip', v.slipping);

  const underKinetic = (v.slideLimit * 0.9) / DEFAULT_SPEC.maxDriveForce;
  v.step(1 / 240, { throttle: underKinetic });
  check('dropping under mu_k*N recovers grip', !v.slipping);
}

console.log('\nClosed-form agreement');
{
  // The analytic traction limit the lesson prints must match what the
  // integrator actually produces, or the student is being lied to.
  // A traction-control driver holds demand at f of the grip limit; the same
  // f appears in the closed form, along with the rolling-resistance term.
  const f = 0.98, mu = SURFACES.dry.mu_s, s = DEFAULT_SPEC;
  const rearShare = 1 - s.frontWeightBias;
  const expected = (f * mu * G * rearShare - s.rollingCoefficient * G) /
                   (1 - f * mu * s.cgHeight / s.wheelbase);

  const v = new Vehicle(s, 'dry');
  for (let t = 0; t < 1.5; t += 1 / 480) {
    const limit = v.gripLimit || mu * s.mass * G * rearShare;
    v.step(1 / 480, { throttle: Math.min(1, (f * limit) / s.maxDriveForce) });
  }
  check('a traction-controlled launch never breaks traction', !v.slipping);
  close(v.ax, expected, 0.12, 'simulated grip-limited a matches the closed form');

  // And the headline figure the lesson prints is the f -> 1 case.
  close(tractionLimitedAcceleration(s, mu),
        (mu * G * rearShare) / (1 - mu * s.cgHeight / s.wheelbase), 1e-9,
        'tractionLimitedAcceleration matches its own algebra');
}

console.log('\nDrag and top speed');
{
  const v = new Vehicle(DEFAULT_SPEC, 'dry');
  run(v, 400, { throttle: 0.25 }, 1 / 60);
  const predicted = dragLimitedSpeed(DEFAULT_SPEC, 0.25 * DEFAULT_SPEC.maxDriveForce);
  close(v.v, predicted, 2.0, 'terminal speed matches where drive force = drag + rolling');
  check('drag grows with the square of speed', (() => {
    const a = new Vehicle(DEFAULT_SPEC, 'dry'); a.v = 10; a.step(1e-6, {});
    const b = new Vehicle(DEFAULT_SPEC, 'dry'); b.v = 20; b.step(1e-6, {});
    return Math.abs(b.forces.drag / a.forces.drag - 4) < 0.05;
  })());
}

console.log('\nBraking and energy');
{
  const v = new Vehicle(DEFAULT_SPEC, 'dry');
  v.v = 27.78;                       // 100 km/h
  const ke = v.kineticEnergy;
  close(ke, 0.5 * DEFAULT_SPEC.mass * 27.78 ** 2, 1, 'kinetic energy is 1/2 m v^2');
  run(v, 6, { brake: 1 });
  check('braking stops the car', v.v === 0);
  check('the car never reverses under braking', v.v >= 0);
  const ratio = v.heatJoules / ke;
  check('heat generated is comparable to the kinetic energy lost',
    ratio > 0.8 && ratio < 1.05, `ratio ${ratio.toFixed(3)}`);
}

console.log('\nSurfaces');
{
  for (const [k, s] of Object.entries(SURFACES)) {
    check(`${k}: sliding friction is lower than limiting friction`, s.mu_k < s.mu_s);
  }
  const order = ['ice', 'gravel', 'wet', 'dry'];
  let prev = -1, monotonic = true;
  for (const k of order) {
    const a = tractionLimitedAcceleration(DEFAULT_SPEC, SURFACES[k].mu_s);
    if (a <= prev) monotonic = false;
    prev = a;
  }
  check('grippier surfaces permit greater acceleration', monotonic);
}

console.log('\nBraking — ideal stopping distance');
{
  const d30 = stoppingDistance(30, 0.9);
  // d = v²/(2μg) = 900 / (2 × 0.9 × 9.81) = 900 / 17.658 ≈ 50.97 m
  close(d30, 50.97, 0.05, 'stopping distance from 30 m/s on dry tarmac');

  const d60 = stoppingDistance(60, 0.9);
  // Double the speed → quadruple the distance (v² law).
  close(d60 / d30, 4, 0.01, 'stopping distance scales with v² (60 vs 30 m/s)');

  // Higher μ → shorter distance.
  check('better grip shortens stopping distance',
    stoppingDistance(30, 0.9) < stoppingDistance(30, 0.6));
  check('stoppingTime returns t = v/(μg)',
    Math.abs(stoppingTime(30, 0.9) - 30 / (0.9 * G)) < 0.01);
}

console.log('\nBraking — weight transfer under deceleration');
{
  // At a ≈ -8.83 m/s² (full braking on dry, near μ·g), load shifts forward.
  const a = -8.83;
  const Nf = frontAxleLoad(DEFAULT_SPEC, a);
  const Nr = rearAxleLoad(DEFAULT_SPEC, a);

  // Static front: mg·b_f = 1450×9.81×0.57 = 8110.37
  // Transfer:    m·|a|·h/L = 1450×8.83×0.50/2.79 = 2295.34
  // Front:       8110.37 + 2295.34 ≈ 10405 N
  close(Nf, 10400, 15, 'front axle load under 8.83 m/s² braking');
  close(Nr, 3820, 15, 'rear axle load under 8.83 m/s² braking');
  close(Nf + Nr, DEFAULT_SPEC.mass * G, 1,
    'axle loads still sum to the weight under braking');

  // The front carries more load under braking.
  check('front carries more load than rear under braking', Nf > Nr);
}

console.log('\nBraking — per-axle lockup');
{
  // Full brake on dry tarmac: with 0.66 front bias and weight shifting forward,
  // the REAR axle should lock first (less normal force → lower grip ceiling).
  const v = new Vehicle(DEFAULT_SPEC, 'dry');
  v.v = 30;
  run(v, 0.3, { brake: 1 });
  check('rear axle locks before or with front at full brake', v.rearLocked);

  // Threshold braking (just under lockup) should avoid locking either axle.
  const v2 = new Vehicle(DEFAULT_SPEC, 'dry');
  v2.v = 30;
  // Find the brake level just below rear lockup by iterating.
  // At full brake the rear locks; at ~0.5 it shouldn't.
  run(v2, 0.3, { brake: 0.5 });
  check('partial braking avoids rear lockup', !v2.rearLocked);
}

console.log('\nBraking — energy conservation');
{
  // Braking from 30 m/s dumps ½·m·v² = 652 500 J into heat.
  const v = new Vehicle(DEFAULT_SPEC, 'dry');
  v.v = 30;
  const keStart = v.kineticEnergy;
  close(keStart, 652500, 50, 'kinetic energy at 30 m/s');

  run(v, 6, { brake: 0.8 });
  check('car stops under braking', v.v === 0);
  const ratio = v.heatJoules / keStart;
  check('heat generated matches kinetic energy lost',
    ratio > 0.90 && ratio < 1.05, `ratio ${ratio.toFixed(3)}`);
}

console.log('\nVehicle presets — mass and Newton II');
{
  check('compact mass is 900 kg', specForPreset('compact').mass === 900);
  check('van mass is 2200 kg', specForPreset('van').mass === 2200);

  const push = new Vehicle(specForPreset('push'), 'dry');
  check('push preset caps drive force at 500 N', push.spec.maxDriveForce === 500);
  run(push, 0.2, { throttle: 1 });
  close(push.demand, 500, 1, 'push demand at full throttle');

  for (const key of ['mustang', 'compact', 'van', 'push']) {
    const v = new Vehicle(specForPreset(key), 'dry');
    run(v, 0.3, { throttle: 0.15 });
    close(v.ax, v.forces.net / v.spec.mass, 0.1, `F=ma holds for ${key}`);
  }
}

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed ? 1 : 0);
