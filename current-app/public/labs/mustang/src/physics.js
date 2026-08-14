/**
 * physics.js — longitudinal vehicle dynamics for the Mustang Lab.
 *
 * Deliberately free of any Three.js import: this file is pure maths, so it can
 * be unit-tested in Node and read by a student without wading through graphics
 * code. Every equation used here is on the GCSE / early A-level syllabus.
 *
 *   Newton's 2nd law      a = F_net / m
 *   Newton's 3rd law      tyre pushes road backwards, road pushes car forwards
 *   Limiting friction     F_max = mu * N
 *   Aerodynamic drag      F_drag = 1/2 * rho * Cd * A * v^2
 *   Rolling resistance    F_rr   = Crr * m * g
 *   Kinetic energy        Ek     = 1/2 * m * v^2
 *
 * SIGN CONVENTION: +x is forward. All forces are returned in newtons and are
 * signed, so they can be drawn as arrows without further thought.
 */

export const G = 9.81;          // m/s^2
export const RHO_AIR = 1.225;   // kg/m^3 at sea level, 15 C

/** Road surfaces. mu_s is limiting (static) friction, mu_k is sliding friction. */
export const SURFACES = {
  dry:    { label: 'Dry tarmac', mu_s: 0.90, mu_k: 0.70, colour: 0x33363c },
  wet:    { label: 'Wet tarmac', mu_s: 0.60, mu_k: 0.45, colour: 0x2b3038 },
  gravel: { label: 'Loose gravel', mu_s: 0.40, mu_k: 0.35, colour: 0x4a4033 },
  ice:    { label: 'Ice', mu_s: 0.12, mu_k: 0.08, colour: 0x6d7c88 }
};

/** 1969 Mustang Boss 302, near enough. */
export const DEFAULT_SPEC = {
  mass: 1450,          // kg, kerb weight with driver
  wheelbase: 2.79,     // m
  cgHeight: 0.50,      // m above the road
  frontWeightBias: 0.57, // fraction of static weight on the front axle
  wheelRadius: 0.33,   // m, rolling radius
  dragCoefficient: 0.44,
  frontalArea: 1.90,   // m^2
  rollingCoefficient: 0.015,
  maxDriveForce: 9600, // N at the contact patch in 1st gear (393 Nm x 2.32 x 3.50 / 0.33)
  maxBrakeForce: 14000, // N of clamping capability, before the tyres have their say
  brakeBias: 0.66       // fraction of brake force sent to the FRONT axle (real cars are front-biased)
};

/**
 * Solve the load on the driven (rear) axle.
 *
 * Under acceleration the car pitches back and presses the rear tyres into the
 * road, which RAISES the grip limit. But the grip limit sets the acceleration,
 * which sets the load transfer... so this is circular. We break the loop with
 * a few fixed-point iterations, which converges quickly for sane inputs.
 */
export function rearAxleLoad(spec, ax) {
  const staticRear = spec.mass * G * (1 - spec.frontWeightBias);
  const transfer = spec.mass * ax * spec.cgHeight / spec.wheelbase;
  return Math.max(0, staticRear + transfer);
}

export function frontAxleLoad(spec, ax) {
  const staticFront = spec.mass * G * spec.frontWeightBias;
  const transfer = spec.mass * ax * spec.cgHeight / spec.wheelbase;
  return Math.max(0, staticFront - transfer);
}

export class Vehicle {
  constructor(spec = DEFAULT_SPEC, surfaceKey = 'dry') {
    this.spec = { ...spec };
    this.setSurface(surfaceKey);
    this.reset();
  }

  reset() {
    this.v = 0;            // m/s
    this.distance = 0;     // m
    this.ax = 0;           // m/s^2
    this.wheelSpin = 0;    // 0 = pure rolling, >0 = the tyre is sliding
    this.heatJoules = 0;   // energy dumped into the brakes
    this.time = 0;
    this.forces = { drive: 0, drag: 0, rolling: 0, brake: 0, net: 0 };
    this.gripLimit = 0;
    this.slideLimit = 0;
    this.demand = 0;
    this.rearLoad = 0;
    this.frontLoad = 0;
    this.slipping = false;
    this.frontLocked = false;
    this.rearLocked = false;
  }

  setSurface(key) {
    this.surfaceKey = key;
    this.surface = SURFACES[key];
  }

  get speedKph() { return this.v * 3.6; }
  get kineticEnergy() { return 0.5 * this.spec.mass * this.v * this.v; }

  /** Angular velocity of the driven wheels, rad/s. Exceeds v/r when spinning. */
  get wheelOmega() {
    const rolling = this.v / this.spec.wheelRadius;
    return rolling * (1 + this.wheelSpin) + (this.wheelSpin > 0 ? 6 * this.wheelSpin : 0);
  }

  /**
   * Advance the simulation.
   * @param {number} dt seconds
   * @param {{throttle:number, brake:number}} controls both 0..1
   */
  step(dt, { throttle = 0, brake = 0 } = {}) {
    const s = this.spec;
    const mu_s = this.surface.mu_s;
    const mu_k = this.surface.mu_k;

    // --- resistive forces (always oppose motion) ---
    const drag = 0.5 * RHO_AIR * s.dragCoefficient * s.frontalArea * this.v * this.v;
    const rolling = this.v > 0.01 ? s.rollingCoefficient * s.mass * G : 0;

    // --- driving force, limited by grip at the rear axle ---
    // Iterate: guess acceleration -> load transfer -> grip -> new acceleration.
    //
    // Friction is HYSTERETIC, and getting this wrong is the classic modelling
    // trap. A gripping tyre breaks away when demand exceeds mu_s*N. But once it
    // is sliding, backing off to just under mu_s*N is not enough to recover —
    // you have to drop below the lower SLIDING limit, mu_k*N. Without that
    // hysteresis the model chatters across the boundary and can latch into
    // permanent wheelspin. It is also true to life: this gap between breaking
    // traction and regaining it is exactly why a slide is easy to start and
    // awkward to stop.
    //
    let ax = this.ax;
    let slipping = this.slipping;
    let drive = 0, gripLimit = 0, slideLimit = 0;
    const demand = throttle * s.maxDriveForce;

    for (let i = 0; i < 4; i++) {
      const N = rearAxleLoad(s, ax);
      gripLimit = mu_s * N;      // limiting static friction — the break-away point
      slideLimit = mu_k * N;     // kinetic friction — all you get once it lets go

      if (!slipping) {
        if (demand > gripLimit) { slipping = true; drive = slideLimit; }
        else { drive = demand; }
      } else {
        if (demand <= slideLimit) { slipping = false; drive = demand; }
        else { drive = slideLimit; }
      }
      ax = (drive - drag - rolling) / s.mass;
    }

    // --- braking, per-axle with weight transfer and lockup ---
    //
    // Same fixed-point iteration as traction: deceleration → weight transfer
    // → axle loads → grip ceilings → actual brake force → deceleration.
    //
    // A front brake bias means the front axle demands more force. But under
    // braking the load shifts FORWARD (ax negative → front rises, rear falls),
    // so the rear axle loses grip first. That is correct and is a teaching
    // moment: real cars have bigger front brakes for exactly this reason.
    //
    // Lockup is HYSTERETIC, exactly like wheelspin: a locked tyre stays locked
    // until demand drops below the lower KINETIC limit. Without this the model
    // chatters across the boundary.
    let brakeForce = 0;
    let frontLocked = this.frontLocked;
    let rearLocked = this.rearLocked;
    let frontBrakeForce = 0, rearBrakeForce = 0;

    if (brake > 0 && this.v > 0) {
      // Start from the drive-only ax computed above — close enough for the
      // fixed-point loop to converge from.
      let aGuess = ax;

      for (let i = 0; i < 4; i++) {
        const Nf = frontAxleLoad(s, aGuess);
        const Nr = rearAxleLoad(s, aGuess);

        const fGripCeiling = mu_s * Nf;
        const rGripCeiling = mu_s * Nr;
        const fSlideCeiling = mu_k * Nf;
        const rSlideCeiling = mu_k * Nr;

        const totalDemand = brake * s.maxBrakeForce;
        const fDemand = totalDemand * s.brakeBias;
        const rDemand = totalDemand * (1 - s.brakeBias);

        // Front axle — hysteretic lockup
        if (!frontLocked) {
          if (fDemand > fGripCeiling) { frontLocked = true; frontBrakeForce = fSlideCeiling; }
          else { frontBrakeForce = fDemand; }
        } else {
          if (fDemand <= fSlideCeiling) { frontLocked = false; frontBrakeForce = fDemand; }
          else { frontBrakeForce = fSlideCeiling; }
        }

        // Rear axle — hysteretic lockup
        if (!rearLocked) {
          if (rDemand > rGripCeiling) { rearLocked = true; rearBrakeForce = rSlideCeiling; }
          else { rearBrakeForce = rDemand; }
        } else {
          if (rDemand <= rSlideCeiling) { rearLocked = false; rearBrakeForce = rDemand; }
          else { rearBrakeForce = rSlideCeiling; }
        }

        brakeForce = frontBrakeForce + rearBrakeForce;
        aGuess = (drive - drag - rolling - brakeForce) / s.mass;
      }

      this.frontLocked = frontLocked;
      this.rearLocked = rearLocked;
    } else {
      // Not braking — any locked axle recovers.
      this.frontLocked = false;
      this.rearLocked = false;
    }

    // --- net force and integration ---
    const net = drive - drag - rolling - brakeForce;
    this.ax = net / s.mass;

    const vNew = this.v + this.ax * dt;
    // Don't let braking or drag reverse the car.
    this.v = (this.v > 0 && vNew < 0) ? 0 : Math.max(0, vNew);
    this.distance += this.v * dt;
    this.time += dt;

    // Brakes turn kinetic energy into heat: P = F * v
    this.heatJoules += brakeForce * this.v * dt;

    // Wheelspin for the visuals: how far past the limit are we?
    const overshoot = gripLimit > 0 ? (demand - gripLimit) / gripLimit : 0;
    const target = slipping ? Math.min(3, Math.max(0, overshoot) * 0.6) : 0;
    this.wheelSpin += (target - this.wheelSpin) * Math.min(1, dt * 8);

    this.slipping = slipping;
    this.demand = demand;
    this.gripLimit = gripLimit;
    this.slideLimit = slideLimit;
    this.rearLoad = rearAxleLoad(s, this.ax);
    this.frontLoad = frontAxleLoad(s, this.ax);
    this.forces = { drive, drag, rolling, brake: brakeForce, net };

    return this;
  }
}

/**
 * Theoretical best 0-100 km/h, ignoring drag, if the tyres are the only limit.
 * Useful for the "predict" step: students can work this out on paper first.
 */
export function tractionLimitedAcceleration(spec, mu) {
  // At the limit: F = mu * N_rear, and N_rear itself depends on a.
  // mu*(m*g*r + m*a*h/L) = m*a   =>   a = mu*g*r / (1 - mu*h/L)
  const r = 1 - spec.frontWeightBias;
  const denom = 1 - mu * spec.cgHeight / spec.wheelbase;
  return (mu * G * r) / denom;
}

/** Speed at which drag alone equals a given driving force. */
export function dragLimitedSpeed(spec, force) {
  const rr = spec.rollingCoefficient * spec.mass * G;
  const usable = force - rr;
  if (usable <= 0) return 0;
  return Math.sqrt(2 * usable / (RHO_AIR * spec.dragCoefficient * spec.frontalArea));
}

/**
 * Ideal stopping distance — all four tyres at the friction limit, no lockup.
 *   d = v² / (2·μ·g)
 */
export function stoppingDistance(v, mu, g = G) {
  return (v * v) / (2 * mu * g);
}

/**
 * Ideal stopping time — all four tyres at the friction limit.
 *   t = v / (μ·g)
 */
export function stoppingTime(v, mu, g = G) {
  return v / (mu * g);
}

/**
 * Actual braking deceleration (positive m/s²) including weight transfer and
 * per-axle lockup. Runs the same fixed-point loop as Vehicle.step() so the
 * number agrees with what the simulation produces.
 */
export function brakingDeceleration(spec, brake, surface, v) {
  const mu_s = surface.mu_s;
  const mu_k = surface.mu_k;

  // Drag and rolling also help slow the car.
  const drag = 0.5 * RHO_AIR * spec.dragCoefficient * spec.frontalArea * v * v;
  const rolling = v > 0.01 ? spec.rollingCoefficient * spec.mass * G : 0;

  const totalDemand = brake * spec.maxBrakeForce;
  const fDemand = totalDemand * spec.brakeBias;
  const rDemand = totalDemand * (1 - spec.brakeBias);

  let a = 0;           // deceleration guess (negative in our sign convention)
  let fForce = 0, rForce = 0;
  let fLocked = false, rLocked = false;

  for (let i = 0; i < 6; i++) {
    const Nf = frontAxleLoad(spec, a);
    const Nr = rearAxleLoad(spec, a);

    const fGrip = mu_s * Nf;
    const fSlide = mu_k * Nf;
    if (!fLocked) {
      if (fDemand > fGrip) { fLocked = true; fForce = fSlide; }
      else { fForce = fDemand; }
    } else {
      if (fDemand <= fSlide) { fLocked = false; fForce = fDemand; }
      else { fForce = fSlide; }
    }

    const rGrip = mu_s * Nr;
    const rSlide = mu_k * Nr;
    if (!rLocked) {
      if (rDemand > rGrip) { rLocked = true; rForce = rSlide; }
      else { rForce = rDemand; }
    } else {
      if (rDemand <= rSlide) { rLocked = false; rForce = rDemand; }
      else { rForce = rSlide; }
    }

    const brakeForce = fForce + rForce;
    a = -(brakeForce + drag + rolling) / spec.mass;
  }

  // Return positive deceleration magnitude.
  return Math.abs(a);
}
