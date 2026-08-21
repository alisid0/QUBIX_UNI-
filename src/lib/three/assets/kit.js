// Shared parts for every Three.js asset in the Superstore world.
//
// The first six assets were written one at a time and drifted: two names for
// the same state function, one asset returning `barcodePanel` where the others
// return `parts`, two with no state control at all, and one footprint between
// them. Nothing was wrong with any single file; they simply had no common
// middle. This is that middle.
//
// Importing it creates no renderer and no scene. THREE is still passed into
// every factory rather than imported here, so the registry stays inert.

// One palette, so a shelf built in one asset matches a plinth built in another.
export const PALETTE = Object.freeze({
  base: 0xeee8da, edge: 0x26231f, clay: 0xa85a34, steel: 0x747a75,
  cell: 0xf4efe5, amber: 0xe2a42d, red: 0xc83c2c, green: 0x63b13b,
  slate: 0x3f4a52, sand: 0xd8cdb6
});

// What a learning state looks like. `idle` is waiting, `warning` is worth a
// look, `error` is the thing the mission is about, `resolved` is done.
export const STATE_COLOURS = Object.freeze({
  idle: PALETTE.amber, warning: PALETTE.clay, error: PALETTE.red, resolved: PALETTE.green
});
export const STATES = Object.freeze(Object.keys(STATE_COLOURS));

/** Standard materials, plus any extras the asset needs. */
export const makeMaterials = (THREE, extra = {}) => ({
  base: new THREE.MeshStandardMaterial({ color: PALETTE.base, roughness: 0.74 }),
  edge: new THREE.MeshStandardMaterial({ color: PALETTE.edge, roughness: 0.62 }),
  clay: new THREE.MeshStandardMaterial({ color: PALETTE.clay, roughness: 0.56 }),
  steel: new THREE.MeshStandardMaterial({ color: PALETTE.steel, roughness: 0.3, metalness: 0.55 }),
  cell: new THREE.MeshStandardMaterial({ color: PALETTE.cell, roughness: 0.78 }),
  light: new THREE.MeshStandardMaterial({ color: PALETTE.amber, emissive: PALETTE.amber, emissiveIntensity: 0.45 }),
  ...Object.fromEntries(Object.entries(extra).map(([k, spec]) => [k, new THREE.MeshStandardMaterial(spec)]))
});

/** A named, shadowed box at a position. The workhorse of every asset here. */
export const boxAdder = (THREE, root) => (name, size, pos, mat) => {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
  mesh.name = name;
  mesh.position.set(...pos);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  root.add(mesh);
  return mesh;
};

/** A named empty, for docking one asset onto another. */
export const attachPoint = (THREE, root, name, pos) => {
  const point = new THREE.Object3D();
  point.name = name;
  point.position.set(...pos);
  root.add(point);
  return point;
};

/** Every asset frees the same way, so none of them has to remember how. */
export const disposer = (root, materials) => () => {
  root.traverse(object => object.geometry?.dispose());
  Object.values(materials).forEach(material => material.dispose());
};

/**
 * The state control every asset exposes. Pass the light materials it should
 * tint; resolved burns a little brighter than the rest, which is the only
 * difference a learner needs to see at a glance.
 */
export const stateSetter = (...lights) => (state = 'idle') => {
  const colour = STATE_COLOURS[state] || STATE_COLOURS.idle;
  for (const material of lights.filter(Boolean)) {
    material.color.setHex(colour);
    if (material.emissive) material.emissive.setHex(colour);
    material.emissiveIntensity = state === 'resolved' ? 0.75 : 0.45;
  }
};

/** Fails loudly at build time rather than drawing something meaningless. */
export const requireFields = (asset, record) => {
  if (!record) throw new Error(`${asset.id} requires a record.`);
  const missing = asset.recordFields.filter(field => record[field] === undefined);
  if (missing.length) throw new Error(`${asset.id} requires ${missing.join(', ')}.`);
};
