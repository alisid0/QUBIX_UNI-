// One Superstore branch, as a repeatable unit.
//
// The world claims 48 branches across five regions. That is only meaningful if
// a branch is a thing you can place, count and compare, so this is built from
// the record rather than modelled: the format decides the footprint, the aisle
// count decides how much shelving is inside, and the region tints the sign.
//
// Preview: ?mode=assets&asset=branch-store-module

import { PALETTE, makeMaterials, boxAdder, attachPoint, disposer, stateSetter, requireFields } from './kit.js';

// Three formats, because a learner comparing branches needs the sizes to differ
// for a reason they can state, not because the models happened to differ.
export const BRANCH_FORMATS = Object.freeze({
  compact: Object.freeze({ width: 7, depth: 5, height: 2.4, maxAisles: 3 }),
  standard: Object.freeze({ width: 11, depth: 8, height: 3.0, maxAisles: 6 }),
  supercentre: Object.freeze({ width: 16, depth: 11, height: 3.6, maxAisles: 10 })
});

export const REGION_COLOURS = Object.freeze({
  north: PALETTE.slate, south: PALETTE.clay, east: 0x3d6b5e, west: 0x8a6d3b, central: 0x6a4a6e
});

export const BRANCH_STORE_MODULE_ASSET = Object.freeze({
  id: 'qx-branch-store-module', version: 1, status: 'AI_DRAFT', units: 'metres',
  recordFields: ['id', 'region', 'format', 'aisles'],
  attachmentPoints: ['entrance', 'checkout-line', 'stock-room', 'sign', 'delivery-bay']
});

export function createBranchStoreModule(THREE, record) {
  requireFields(BRANCH_STORE_MODULE_ASSET, record);
  const shape = BRANCH_FORMATS[record.format];
  if (!shape) throw new Error(`${BRANCH_STORE_MODULE_ASSET.id}: unknown format "${record.format}".`);
  const regionColour = REGION_COLOURS[record.region];
  if (regionColour === undefined) throw new Error(`${BRANCH_STORE_MODULE_ASSET.id}: unknown region "${record.region}".`);

  // A branch cannot hold more aisles than it has room for. Silently drawing
  // eleven aisles in a compact store would teach the wrong thing about format.
  const aisles = Math.max(1, Math.min(shape.maxAisles, Math.round(record.aisles)));

  const root = new THREE.Group();
  root.name = `${BRANCH_STORE_MODULE_ASSET.id}:${record.id}`;
  root.userData.asset = BRANCH_STORE_MODULE_ASSET;
  root.userData.record = Object.freeze({ ...record, aisles });

  const materials = makeMaterials(THREE, {
    region: { color: regionColour, roughness: 0.55 },
    shelf: { color: PALETTE.sand, roughness: 0.7 },
    glass: { color: 0x9fb8bd, roughness: 0.18, metalness: 0.4, transparent: true, opacity: 0.55 }
  });
  const add = boxAdder(THREE, root);
  const { width: w, depth: d, height: h } = shape;

  add('slab', [w, 0.2, d], [0, -0.1, 0], materials.edge);
  add('floor', [w - 0.4, 0.06, d - 0.4], [0, 0.03, 0], materials.base);
  add('wall-back', [w, h, 0.24], [0, h / 2, -d / 2], materials.base);
  add('wall-left', [0.24, h, d], [-w / 2, h / 2, 0], materials.base);
  add('wall-right', [0.24, h, d], [w / 2, h / 2, 0], materials.base);
  add('roof-band', [w + 0.3, 0.36, d + 0.3], [0, h + 0.18, 0], materials.region);

  // The front is glass either side of an opening, so the entrance reads as a
  // way in rather than a missing wall.
  const doorWidth = Math.min(2.6, w * 0.26);
  const paneWidth = (w - doorWidth) / 2;
  add('front-left', [paneWidth, h - 0.3, 0.14], [-(doorWidth + paneWidth) / 2, (h - 0.3) / 2, d / 2], materials.glass);
  add('front-right', [paneWidth, h - 0.3, 0.14], [(doorWidth + paneWidth) / 2, (h - 0.3) / 2, d / 2], materials.glass);
  add('canopy', [doorWidth + 1.2, 0.16, 1.5], [0, h - 0.28, d / 2 + 0.7], materials.region);

  // Aisles run front to back, evenly spread and inset from both side walls.
  const shelves = [];
  const usable = w - 2.4;
  const pitch = usable / aisles;
  for (let i = 0; i < aisles; i += 1) {
    const x = -usable / 2 + pitch / 2 + i * pitch;
    shelves.push(add(`aisle-${i}`, [Math.min(0.9, pitch * 0.55), 1.5, d - 3.2], [x, 0.78, -0.6], materials.shelf));
  }

  // Checkouts face the entrance, one per two aisles, never fewer than two.
  const lanes = Math.max(2, Math.ceil(aisles / 2));
  for (let i = 0; i < lanes; i += 1) {
    const x = -((lanes - 1) * 1.5) / 2 + i * 1.5;
    add(`checkout-${i}`, [1.1, 0.85, 0.7], [x, 0.45, d / 2 - 1.5], materials.steel);
  }

  const pylon = add('sign-pylon', [0.28, 2.6, 0.28], [-w / 2 + 0.9, 1.3, d / 2 + 1.9], materials.edge);
  add('sign-board', [2.2, 0.9, 0.18], [-w / 2 + 0.9, 2.9, d / 2 + 1.9], materials.region);
  const beacon = add('sign-light', [0.34, 0.16, 0.34], [-w / 2 + 0.9, 3.45, d / 2 + 1.9], materials.light);

  add('delivery-door', [2.4, h - 0.9, 0.2], [w / 2 - 2.2, (h - 0.9) / 2, -d / 2 - 0.1], materials.steel);

  attachPoint(THREE, root, 'entrance', [0, 0, d / 2 + 0.4]);
  attachPoint(THREE, root, 'checkout-line', [0, 0.9, d / 2 - 2.4]);
  attachPoint(THREE, root, 'stock-room', [w / 2 - 2.2, 0.9, -d / 2 + 1.2]);
  attachPoint(THREE, root, 'sign', [-w / 2 + 0.9, 3.6, d / 2 + 1.9]);
  attachPoint(THREE, root, 'delivery-bay', [w / 2 - 2.2, 0, -d / 2 - 2.2]);

  return {
    group: root,
    record: root.userData.record,
    footprint: Object.freeze({ width: w, depth: d, height: h + 0.36 }),
    parts: { shelves, beacon, pylon },
    attachment: name => root.getObjectByName(name),
    setState: stateSetter(materials.light),
    dispose: disposer(root, materials)
  };
}
