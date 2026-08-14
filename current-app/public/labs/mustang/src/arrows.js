/**
 * arrows.js — the force overlay.
 *
 * Free-body diagrams are the single most useful thing a physics student learns
 * to draw, and the hardest to believe until you watch one change in real time.
 * Each arrow is anchored where the force actually acts, and its LENGTH is
 * proportional to the magnitude, so students can compare them by eye.
 */

import * as THREE from 'three';

const SCALE = 1 / 2500;   // metres of arrow per newton
const MIN_LEN = 0.06;

export const FORCE_COLOURS = {
  drive: 0x35d07f,     // green  — the road pushing the car forward
  drag: 0xff5c5c,      // red    — air resistance
  rolling: 0xffa93d,   // orange — rolling resistance
  brake: 0xff2fb3,     // pink   — braking
  weight: 0x6aa9ff,    // blue   — gravity
  normal: 0xc77dff,    // violet — the road pushing up
  reaction: 0x9fe870   // pale green — the tyre pushing back on the road
};

class Arrow {
  constructor(scene, colour, origin, dir) {
    this.helper = new THREE.ArrowHelper(dir.clone().normalize(), origin, MIN_LEN, colour, 0.16, 0.09);
    this.helper.visible = false;
    scene.add(this.helper);
  }
  set(origin, dir, magnitude) {
    const len = Math.abs(magnitude) * SCALE;
    if (len < MIN_LEN) { this.helper.visible = false; return; }
    this.helper.visible = true;
    this.helper.position.copy(origin);
    this.helper.setDirection(dir.clone().normalize());
    this.helper.setLength(len, Math.min(0.22, len * 0.3), Math.min(0.12, len * 0.16));
  }
  hide() { this.helper.visible = false; }
  dispose(scene) { scene.remove(this.helper); }
}

export class ForceOverlay {
  constructor(scene) {
    this.scene = scene;
    this.enabled = true;
    const V = THREE.Vector3;
    this.arrows = {
      drive:    new Arrow(scene, FORCE_COLOURS.drive,    new V(), new V(1, 0, 0)),
      reaction: new Arrow(scene, FORCE_COLOURS.reaction, new V(), new V(-1, 0, 0)),
      drag:     new Arrow(scene, FORCE_COLOURS.drag,     new V(), new V(-1, 0, 0)),
      rolling:  new Arrow(scene, FORCE_COLOURS.rolling,  new V(), new V(-1, 0, 0)),
      brake:    new Arrow(scene, FORCE_COLOURS.brake,    new V(), new V(-1, 0, 0)),
      weight:   new Arrow(scene, FORCE_COLOURS.weight,   new V(), new V(0, -1, 0)),
      normalF:  new Arrow(scene, FORCE_COLOURS.normal,   new V(), new V(0, 1, 0)),
      normalR:  new Arrow(scene, FORCE_COLOURS.normal,   new V(), new V(0, 1, 0))
    };
  }

  setEnabled(on) {
    this.enabled = on;
    if (!on) Object.values(this.arrows).forEach(a => a.hide());
  }

  /** @param {import('./physics.js').Vehicle} vehicle */
  update(vehicle, geometry) {
    if (!this.enabled) return;
    const V = THREE.Vector3;
    const f = vehicle.forces;
    const rearX = geometry.rearAxleX;
    const frontX = geometry.frontAxleX;

    // Newton's third law, drawn as a pair: the tyre pushes the road backwards
    // (below the contact patch), the road pushes the car forwards (above it).
    this.arrows.drive.set(new V(rearX, 0.06, 0), new V(1, 0, 0), f.drive);
    this.arrows.reaction.set(new V(rearX, -0.02, 0), new V(-1, 0, 0), f.drive);

    // Resistances act on the body.
    this.arrows.drag.set(new V(2.0, 1.05, 0), new V(-1, 0, 0), f.drag);
    this.arrows.rolling.set(new V(frontX, 0.10, 0), new V(-1, 0, 0), f.rolling);
    this.arrows.brake.set(new V(0.2, 0.20, 0), new V(-1, 0, 0), f.brake);

    // Weight at the centre of gravity, normal reactions at each axle. Watch the
    // two normal arrows swap size the instant you accelerate or brake.
    // The CoG sits (1 - frontBias) of the wheelbase behind the front axle:
    // more weight on the front axle means the CoG is nearer to it.
    const spec = vehicle.spec;
    const cgX = frontX - (1 - spec.frontWeightBias) * spec.wheelbase;
    this.arrows.weight.set(new V(cgX, 0.50, 0), new V(0, -1, 0), vehicle.spec.mass * 9.81);
    this.arrows.normalF.set(new V(frontX, 0.02, 0), new V(0, 1, 0), vehicle.frontLoad);
    this.arrows.normalR.set(new V(rearX, 0.02, 0), new V(0, 1, 0), vehicle.rearLoad);
  }
}
