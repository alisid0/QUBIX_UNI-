/**
 * environment.js — the test-track exhibit the car sits in.
 *
 * The scene is a measured lane, not scenery: shoulders frame the road, painted
 * numbers every 10 m let a student read stopping distance straight off the
 * ground, and each surface gets its own material so dry, wet, gravel and ice
 * are distinguishable at a glance rather than by the selector alone.
 *
 * Nothing here feeds physics.js. Geometry is cosmetic; the numbers stay in the
 * HUD and the free-body arrows.
 */

import * as THREE from 'three';
import { SURFACES } from './physics.js';

export const TRACK = {
  length: 200,        // m of road plane
  laneWidth: 9,       // m between the shoulders
  shoulderWidth: 3.4, // m of verge either side
  markerSpacing: 10,  // m between painted distance numbers
  markerCount: 24     // markers recycled along the lane
};

/** Sky dome: a vertical gradient, painted once into a texture. */
function makeSkyTexture() {
  const c = document.createElement('canvas');
  c.width = 4; c.height = 256;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0.00, '#243247');   // zenith
  grad.addColorStop(0.55, '#4c6076');   // mid sky
  grad.addColorStop(0.78, '#7b8a95');   // haze above the horizon
  grad.addColorStop(1.00, '#39413f');   // ground haze
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 4, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Road surface texture: transverse bands every 2 m, plus a lane centre line. */
function makeRoadTexture(surfaceKey) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 256, 256);

  // One tile spans 2 m along the direction of travel (canvas width).
  ctx.fillStyle = '#c9c9c9';
  ctx.fillRect(0, 0, 18, 256);

  // Dashed lane centre line, running along the middle of the tile height.
  ctx.fillStyle = '#e8e2cf';
  ctx.fillRect(40, 120, 150, 16);

  if (surfaceKey === 'gravel') {
    // Speckle so loose gravel does not read as smooth tarmac.
    ctx.fillStyle = 'rgba(0,0,0,0.20)';
    for (let i = 0; i < 900; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      ctx.fillRect(x, y, 2, 2);
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(TRACK.length / 2, 1);
  tex.anisotropy = 8;
  return tex;
}

/** Painted distance numeral, drawn to its own small canvas. */
function makeMarkerTexture(metres) {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 64;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 64);
  ctx.fillStyle = 'rgba(238, 232, 210, 0.86)';
  ctx.font = 'bold 46px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${metres}`, 64, 34);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Per-surface look. Physics reads mu from SURFACES; these values only decide
 * how wet tarmac, gravel and ice differ to the eye.
 */
const SURFACE_LOOK = {
  dry:    { colour: SURFACES.dry.colour,    roughness: 0.94, metalness: 0.00, fog: 0x1b2230 },
  wet:    { colour: SURFACES.wet.colour,    roughness: 0.30, metalness: 0.22, fog: 0x161d29 },
  gravel: { colour: SURFACES.gravel.colour, roughness: 1.00, metalness: 0.00, fog: 0x241f18 },
  ice:    { colour: SURFACES.ice.colour,    roughness: 0.12, metalness: 0.10, fog: 0x27333d }
};

/** Soft radial blob used for smoke and spray. */
function makePuffTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,0.85)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

/**
 * Tyre smoke on wheelspin and spray on a locked axle.
 *
 * A fixed pool of billboards recycled as they fade — enough to make a slide
 * unmistakable without turning the exhibit into a particle demo.
 */
export class TyrePuffs {
  constructor(scene, count = 36) {
    const map = makePuffTexture();
    this.items = [];
    for (let i = 0; i < count; i++) {
      const mat = new THREE.SpriteMaterial({
        map, transparent: true, opacity: 0, depthWrite: false, color: 0xdcdcdc
      });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.setScalar(0.5);
      sprite.visible = false;
      scene.add(sprite);
      this.items.push({ sprite, life: 0, maxLife: 1, vy: 0, vx: 0 });
    }
    this.cursor = 0;
    this.emitAccumulator = 0;
  }

  spawn(x, colour) {
    const item = this.items[this.cursor];
    this.cursor = (this.cursor + 1) % this.items.length;
    item.life = 0;
    item.maxLife = 0.7 + Math.random() * 0.5;
    item.vx = -2.2 - Math.random() * 2.0;
    item.vy = 0.7 + Math.random() * 0.9;
    // Behind the contact patch and outboard of the body, so the plume is not
    // hidden by the car itself.
    const side = Math.random() < 0.5 ? 1 : -1;
    item.sprite.position.set(
      x - 0.5 - Math.random() * 0.5,
      0.16,
      side * (0.75 + Math.random() * 0.5)
    );
    item.sprite.scale.setScalar(0.55);
    item.sprite.material.color.setHex(colour);
    item.sprite.visible = true;
  }

  update(dt, vehicle, axleX) {
    const spinning = vehicle.slipping && vehicle.forces.drive > 10;
    const locked = vehicle.frontLocked || vehicle.rearLocked;

    if (spinning || locked) {
      // Pale surfaces need a darker plume to stay legible against the road.
      const pale = vehicle.surfaceKey === 'ice';
      const colour = pale ? 0x8fa3b5 : 0xe8e8e8;
      this.emitAccumulator += dt;
      while (this.emitAccumulator > 0.025) {
        this.emitAccumulator -= 0.025;
        if (spinning) this.spawn(axleX.rear, colour);
        if (vehicle.frontLocked) this.spawn(axleX.front, colour);
        if (vehicle.rearLocked) this.spawn(axleX.rear, colour);
      }
    } else {
      this.emitAccumulator = 0;
    }

    for (const item of this.items) {
      if (!item.sprite.visible) continue;
      item.life += dt;
      const t = item.life / item.maxLife;
      if (t >= 1) { item.sprite.visible = false; item.sprite.material.opacity = 0; continue; }
      item.sprite.position.x += item.vx * dt;
      item.sprite.position.y += item.vy * dt;
      item.sprite.scale.setScalar(0.55 + t * 1.6);
      // Fade in quickly, then out, so a puff never pops into existence.
      item.sprite.material.opacity = 0.85 * Math.min(1, t * 6) * (1 - t);
    }
  }
}

export class TrackEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.surfaceKey = 'dry';
    this.roadTextures = {};
    this.markers = [];

    this.buildSky();
    this.buildGround();
    this.buildRoad();
    this.buildShoulders();
    this.buildMarkers();
    this.buildCones();

    this.applySurface('dry');
  }

  buildSky() {
    const geo = new THREE.SphereGeometry(160, 32, 16);
    const mat = new THREE.MeshBasicMaterial({
      map: makeSkyTexture(), side: THREE.BackSide, depthWrite: false, fog: false
    });
    this.sky = new THREE.Mesh(geo, mat);
    this.scene.add(this.sky);
  }

  /** Verge either side of the lane, so the road does not float in a void. */
  buildGround() {
    const mat = new THREE.MeshStandardMaterial({ color: 0x2b3128, roughness: 1.0, metalness: 0.0 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(TRACK.length + 80, 220), mat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.02;
    ground.receiveShadow = true;
    this.scene.add(ground);
    this.ground = ground;
  }

  buildRoad() {
    for (const key of Object.keys(SURFACES)) {
      this.roadTextures[key] = makeRoadTexture(key);
    }
    this.roadMat = new THREE.MeshStandardMaterial({
      color: SURFACES.dry.colour, roughness: 0.94, metalness: 0.0,
      map: this.roadTextures.dry
    });
    const road = new THREE.Mesh(new THREE.PlaneGeometry(TRACK.length, TRACK.laneWidth), this.roadMat);
    road.rotation.x = -Math.PI / 2;
    road.receiveShadow = true;
    this.scene.add(road);
    this.road = road;
  }

  /** Painted edge lines plus a darker verge strip on each side of the lane. */
  buildShoulders() {
    const halfLane = TRACK.laneWidth / 2;
    const shoulderMat = new THREE.MeshStandardMaterial({ color: 0x1d222b, roughness: 0.98 });
    const lineMat = new THREE.MeshStandardMaterial({ color: 0xd8d2bd, roughness: 0.85 });

    this.shoulders = [];
    for (const side of [1, -1]) {
      const shoulder = new THREE.Mesh(
        new THREE.PlaneGeometry(TRACK.length, TRACK.shoulderWidth), shoulderMat
      );
      shoulder.rotation.x = -Math.PI / 2;
      shoulder.position.set(0, -0.005, side * (halfLane + TRACK.shoulderWidth / 2));
      shoulder.receiveShadow = true;
      this.scene.add(shoulder);
      this.shoulders.push(shoulder);

      const line = new THREE.Mesh(new THREE.PlaneGeometry(TRACK.length, 0.18), lineMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(0, 0.012, side * (halfLane - 0.35));
      this.scene.add(line);
    }
  }

  /**
   * Distance numerals on the verge. They scroll with the road and recycle, so a
   * student braking from 30 m/s can watch the metres tick past the car.
   */
  buildMarkers() {
    const halfLane = TRACK.laneWidth / 2;
    for (let i = 0; i < TRACK.markerCount; i++) {
      const metres = i * TRACK.markerSpacing;
      const mat = new THREE.MeshBasicMaterial({
        map: makeMarkerTexture(metres), transparent: true,
        depthWrite: false, side: THREE.DoubleSide
      });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.1), mat);
      // Flat on the road and reading along the direction of travel, which is
      // the only orientation that stays legible from the side-on camera.
      plane.rotation.x = -Math.PI / 2;
      plane.position.set(metres, 0.02, halfLane - 1.4);
      this.scene.add(plane);
      this.markers.push({ mesh: plane, metres });
    }
    this.markerSpan = TRACK.markerCount * TRACK.markerSpacing;
  }

  /** Lane cones at intervals — a test-track cue, kept sparse and low. */
  buildCones() {
    const coneGeo = new THREE.ConeGeometry(0.16, 0.5, 12);
    const coneMat = new THREE.MeshStandardMaterial({ color: 0xd8622a, roughness: 0.7 });
    const halfLane = TRACK.laneWidth / 2;
    this.cones = [];
    for (let i = 0; i < 16; i++) {
      for (const side of [1, -1]) {
        const cone = new THREE.Mesh(coneGeo, coneMat);
        cone.position.set(i * 20, 0.25, side * (halfLane - 0.9));
        cone.castShadow = true;
        this.scene.add(cone);
        this.cones.push({ mesh: cone, baseX: i * 20, side });
      }
    }
    this.coneSpan = 16 * 20;
  }

  /** Swap road material and fog tint when the surface changes. */
  applySurface(key) {
    const look = SURFACE_LOOK[key] || SURFACE_LOOK.dry;
    this.surfaceKey = key;
    this.roadMat.map = this.roadTextures[key];
    this.roadMat.color.setHex(look.colour);
    this.roadMat.roughness = look.roughness;
    this.roadMat.metalness = look.metalness;
    this.roadMat.needsUpdate = true;
    if (this.scene.fog) this.scene.fog.color.setHex(look.fog);
  }

  /**
   * Scroll the world backwards under a stationary car.
   * @param {number} distance total metres travelled by the vehicle
   */
  update(distance) {
    this.roadMat.map.offset.x = distance / 2;

    for (const marker of this.markers) {
      const x = ((marker.metres - distance) % this.markerSpan + this.markerSpan) % this.markerSpan;
      marker.mesh.position.x = x - 20;
    }

    for (const cone of this.cones) {
      const x = ((cone.baseX - distance) % this.coneSpan + this.coneSpan) % this.coneSpan;
      cone.mesh.position.x = x - 40;
    }
  }
}
