/**
 * car.js — builds the 1969 Mustang Boss 302 out of code.
 *
 * The body is a single extruded side-profile rather than a stack of boxes, so
 * the silhouette is continuous and the wheel arches are real cut-outs.
 *
 * buildCar() returns handles to the parts the lessons need to animate.
 */

import * as THREE from 'three';

const TAU = Math.PI * 2;

export const GEOMETRY = {
  frontAxleX: 1.30,
  rearAxleX: -1.49,
  frontRadius: 0.44,
  rearRadius: 0.45,
  rockerY: 0.32,
  trackHalf: 0.91
};

export function makeMaterials() {
  return {
    paint: new THREE.MeshPhysicalMaterial({
      color: 0x1668c8, metalness: 0.55, roughness: 0.22,
      clearcoat: 1.0, clearcoatRoughness: 0.06
    }),
    blackout: new THREE.MeshPhysicalMaterial({
      color: 0x0b0b0c, metalness: 0.2, roughness: 0.55, clearcoat: 0.6
    }),
    chrome: new THREE.MeshStandardMaterial({ color: 0xf2f4f6, metalness: 1.0, roughness: 0.06 }),
    rubber: new THREE.MeshStandardMaterial({ color: 0x0e0f10, roughness: 0.95, metalness: 0.0 }),
    darkMetal: new THREE.MeshStandardMaterial({ color: 0x25272b, metalness: 0.8, roughness: 0.38 }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xaad4ee, metalness: 0.0, roughness: 0.03, transmission: 0.9,
      thickness: 0.05, transparent: true, opacity: 0.6, side: THREE.DoubleSide
    }),
    lensRed: new THREE.MeshStandardMaterial({
      color: 0xd41400, emissive: 0x5a0800, roughness: 0.25, metalness: 0.1
    })
  };
}

/** Extrude a 2D side-profile across the car's width, with bevelled edges. */
function extrudeProfile(shape, depth, bevel, material, curveSegments = 32) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth, bevelEnabled: true,
    bevelThickness: bevel, bevelSize: bevel, bevelSegments: 5,
    curveSegments, steps: 1
  });
  geo.computeBoundingBox();
  const bb = geo.boundingBox;
  geo.translate(0, 0, -(bb.min.z + bb.max.z) / 2);
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

const box = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);

function buildBodyProfile() {
  const g = GEOMETRY;
  const p = new THREE.Shape();
  p.moveTo(2.36, g.rockerY);
  p.lineTo(1.7854, g.rockerY);
  p.absarc(g.frontAxleX, 0.44, 0.50, -0.2424, Math.PI + 0.2424, false);   // front arch
  p.lineTo(-0.9865, g.rockerY);
  p.absarc(g.rearAxleX, 0.45, 0.52, -0.2527, Math.PI + 0.2527, false);    // rear arch
  p.lineTo(-2.30, g.rockerY);
  p.quadraticCurveTo(-2.44, 0.36, -2.42, 0.64);      // tail panel
  p.quadraticCurveTo(-2.40, 0.94, -2.24, 1.01);
  p.lineTo(-2.02, 1.04);
  p.lineTo(-1.55, 1.06);                              // short rear deck
  p.lineTo(0.20, 1.00);                               // beltline
  p.lineTo(0.58, 0.98);                               // cowl
  p.lineTo(0.66, 0.90);                               // step down onto the hood
  p.lineTo(2.02, 0.82);                               // long hood
  p.quadraticCurveTo(2.30, 0.80, 2.34, 0.66);         // nose
  p.quadraticCurveTo(2.44, 0.50, 2.36, g.rockerY);
  p.closePath();
  return p;
}

function buildRoofProfile() {
  const p = new THREE.Shape();
  p.moveTo(0.56, 0.94);
  p.lineTo(-0.20, 1.38);                              // windscreen / A-pillar
  p.quadraticCurveTo(-0.60, 1.42, -1.00, 1.39);       // roof crown
  p.quadraticCurveTo(-1.62, 1.33, -2.06, 1.02);       // fastback
  p.lineTo(-1.70, 0.96);
  p.closePath();
  return p;
}

/** One wheel, built with its axle along Z so it rolls about that axis. */
export function createWheel(radius, width, mats) {
  const wheel = new THREE.Group();

  const tyre = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 40), mats.rubber);
  tyre.rotation.x = Math.PI / 2;
  tyre.castShadow = true;
  wheel.add(tyre);

  const face = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.70, radius * 0.70, width * 1.03, 40), mats.chrome
  );
  face.rotation.x = Math.PI / 2;
  wheel.add(face);

  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, width * 1.1, 20), mats.chrome);
  hub.rotation.x = Math.PI / 2;
  wheel.add(hub);

  // Magnum 500 slots. Each slot sits in its own pivot group so the rotation
  // happens about the axle rather than about the slot's own centre.
  for (let i = 0; i < 5; i++) {
    for (const side of [1, -1]) {
      const pivot = new THREE.Group();
      pivot.rotation.z = (i / 5) * TAU;
      const slot = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.19, 0.02), mats.darkMetal);
      slot.position.set(0, radius * 0.44, side * (width * 0.52 + 0.004));
      pivot.add(slot);
      wheel.add(pivot);
    }
  }
  return wheel;
}

export function buildCar(mats = makeMaterials()) {
  const g = GEOMETRY;
  const car = new THREE.Group();
  car.name = 'Mustang';

  // --- body shell + greenhouse (narrower, so the sides taper inwards) ---
  const shell = extrudeProfile(buildBodyProfile(), 1.60, 0.13, mats.paint);
  shell.name = 'BodyShell';
  car.add(shell);

  const greenhouse = extrudeProfile(buildRoofProfile(), 1.44, 0.09, mats.paint);
  greenhouse.name = 'Greenhouse';
  car.add(greenhouse);

  // --- glass ---
  const sideGlassShape = new THREE.Shape();
  sideGlassShape.moveTo(0.40, 1.02);
  sideGlassShape.lineTo(-0.16, 1.33);
  sideGlassShape.lineTo(-0.98, 1.31);
  sideGlassShape.lineTo(-1.06, 1.02);
  sideGlassShape.closePath();

  for (const side of [1, -1]) {
    const geo = new THREE.ExtrudeGeometry(sideGlassShape, { depth: 0.02, bevelEnabled: false });
    const m = new THREE.Mesh(geo, mats.glass);
    m.position.z = side > 0 ? 0.80 : -0.82;
    car.add(m);
  }

  const windscreen = box(0.878, 0.03, 1.36, mats.glass);
  windscreen.position.set(0.190, 1.177, 0);
  windscreen.rotation.z = Math.atan2(0.44, -0.76);
  car.add(windscreen);

  const backlight = box(1.053, 0.03, 1.34, mats.glass);
  backlight.position.set(-1.506, 1.244, 0);
  backlight.rotation.z = Math.atan2(-0.33, -1.0);
  car.add(backlight);

  // --- Boss 302 trim ---
  const hoodBlack = box(1.38, 0.02, 1.34, mats.blackout);
  hoodBlack.position.set(1.34, 0.878, 0);
  hoodBlack.rotation.z = Math.atan2(-0.08, 1.36);
  car.add(hoodBlack);

  for (const side of [1, -1]) {
    const stripe = box(2.30, 0.13, 0.015, mats.blackout);
    stripe.position.set(0.42, 0.74, side * 0.932);
    car.add(stripe);
    const scoop = box(0.46, 0.15, 0.05, mats.blackout);
    scoop.position.set(-1.22, 1.16, side * 0.80);
    scoop.rotation.z = 0.30;
    car.add(scoop);
  }

  // --- front ---
  const grille = box(0.10, 0.34, 1.44, mats.blackout);
  grille.position.set(2.32, 0.62, 0);
  car.add(grille);

  const corral = box(0.05, 0.17, 0.34, mats.chrome);
  corral.position.set(2.37, 0.62, 0);
  car.add(corral);

  const headGeo = new THREE.CylinderGeometry(0.105, 0.105, 0.06, 24);
  for (const [z, r] of [[0.30, 0.10], [0.58, 0.115]]) {
    for (const side of [1, -1]) {
      const lamp = new THREE.Mesh(headGeo, mats.chrome);
      lamp.scale.setScalar(r / 0.105);
      lamp.rotation.z = Math.PI / 2;
      lamp.position.set(2.35, 0.64, side * z);
      car.add(lamp);
    }
  }

  const frontBumper = box(0.10, 0.10, 1.84, mats.chrome);
  frontBumper.position.set(2.40, 0.42, 0);
  frontBumper.castShadow = true;
  car.add(frontBumper);

  const spoiler = box(0.26, 0.05, 1.72, mats.blackout);
  spoiler.position.set(2.28, 0.26, 0);
  car.add(spoiler);

  // --- rear ---
  const rearBumper = box(0.10, 0.10, 1.80, mats.chrome);
  rearBumper.position.set(-2.45, 0.42, 0);
  rearBumper.castShadow = true;
  car.add(rearBumper);

  const brakeLights = [];
  for (const side of [1, -1]) {
    for (let j = 0; j < 3; j++) {
      const bar = box(0.05, 0.15, 0.11, mats.lensRed.clone());
      bar.position.set(-2.44, 0.76, side * (0.34 + j * 0.14));
      car.add(bar);
      brakeLights.push(bar);
    }
    const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.22, 16), mats.chrome);
    tip.rotation.z = Math.PI / 2;
    tip.position.set(-2.36, 0.30, side * 0.46);
    car.add(tip);
  }

  // --- wheels: front pair steer, rear pair drive ---
  const wheels = { front: [], rear: [], all: [] };
  const specs = [
    ['front', g.frontAxleX, g.frontRadius, 0.30, 0.92],
    ['front', g.frontAxleX, g.frontRadius, 0.30, -0.92],
    ['rear', g.rearAxleX, g.rearRadius, 0.34, 0.90],
    ['rear', g.rearAxleX, g.rearRadius, 0.34, -0.90]
  ];
  specs.forEach(([axle, x, r, w, z], i) => {
    const wheel = createWheel(r, w, mats);
    wheel.position.set(x, r, z);
    wheel.name = `Wheel_${axle}_${i}`;
    wheel.userData = { axle, radius: r };
    car.add(wheel);
    wheels[axle].push(wheel);
    wheels.all.push(wheel);
  });

  // --- inline-4 engine, kept for the thermodynamics lesson later ---
  const engine = new THREE.Group();
  engine.name = 'EngineAssembly';
  engine.position.set(1.25, 0.62, 0);
  car.add(engine);

  const block = box(0.62, 0.34, 0.52, mats.darkMetal);
  block.name = 'EngineBlock';
  engine.add(block);

  const pistons = [];
  for (let i = 0; i < 4; i++) {
    const piston = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.055, 0.14, 12), mats.chrome
    );
    piston.position.set(-0.20 + i * 0.135, 0.20, 0);
    piston.name = `Piston_${i}`;
    engine.add(piston);
    pistons.push(piston);
  }

  return { car, shell, greenhouse, wheels, engine, pistons, brakeLights, materials: mats };
}
