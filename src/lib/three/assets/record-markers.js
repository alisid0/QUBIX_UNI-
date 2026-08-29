// Three small props that name what is wrong with a row.
//
// The missions already talk about missing values, duplicates and outliers, but
// they say it in the panel on the right while the scene on the left carries on
// looking fine. These are the objects that let the scene say it too: drop one
// on a row tile and the fault has a place, not just a sentence.
//
// They are deliberately tiny and deliberately different in silhouette. A
// learner glancing at a shelf of rows should be able to count the faults
// without reading a single label.
//
// Preview: ?mode=assets&asset=record-markers

import { PALETTE, makeMaterials, boxAdder, disposer, stateSetter, requireFields } from './kit.js';

const marker = (THREE, asset, record, build, extras = {}, lit = ['light']) => {
  requireFields(asset, record);
  const root = new THREE.Group();
  root.name = `${asset.id}:${record.id}`;
  root.userData.asset = asset;
  root.userData.record = Object.freeze({ ...record });
  const materials = makeMaterials(THREE, extras);
  const parts = build(boxAdder(THREE, root), materials, root);
  return {
    group: root,
    record: root.userData.record,
    footprint: Object.freeze({ width: 0.4, depth: 0.4, height: 0.6 }),
    parts,
    attachment: name => root.getObjectByName(name),
    setState: stateSetter(...lit.map(key => materials[key])),
    dispose: disposer(root, materials)
  };
};

/* ------------------------------------------------------------------ null -- */
// An open frame. A missing value is not a zero and not an empty string, so the
// marker for it is the only one here with nothing in the middle.
export const NULL_TOKEN_ASSET = Object.freeze({
  id: 'qx-null-token', version: 1, status: 'AI_DRAFT', units: 'metres', recordFields: ['id']
});

export function createNullToken(THREE, record) {
  // The frame is the signal, since there is nothing inside to light up. That is
  // the whole idea of the token, so its state tints the ring itself.
  return marker(THREE, NULL_TOKEN_ASSET, record, (add, materials) => ({
    frame: [
      add('frame-top', [0.34, 0.05, 0.05], [0, 0.29, 0], materials.ring),
      add('frame-bottom', [0.34, 0.05, 0.05], [0, 0.05, 0], materials.ring),
      add('frame-left', [0.05, 0.29, 0.05], [-0.145, 0.17, 0], materials.ring),
      add('frame-right', [0.05, 0.29, 0.05], [0.145, 0.17, 0], materials.ring)
    ]
  }), { ring: { color: PALETTE.amber, emissive: PALETTE.amber, emissiveIntensity: 0.45, roughness: 0.4 } }, ['ring']);
}

/* -------------------------------------------------------------- duplicate -- */
// Two identical plates, one offset from the other. The duplicate is not damage
// and not noise: it is the same row again, and the marker says exactly that.
export const DUPLICATE_STAMP_ASSET = Object.freeze({
  id: 'qx-duplicate-stamp', version: 1, status: 'AI_DRAFT', units: 'metres', recordFields: ['id']
});

export function createDuplicateStamp(THREE, record) {
  return marker(THREE, DUPLICATE_STAMP_ASSET, record, (add, materials) => ({
    original: add('plate-original', [0.3, 0.06, 0.22], [-0.05, 0.09, -0.03], materials.cell),
    copy: add('plate-copy', [0.3, 0.06, 0.22], [0.05, 0.17, 0.03], materials.copy),
    light: add('stamp-light', [0.09, 0.04, 0.09], [0, 0.24, 0], materials.light)
  }), { copy: { color: PALETTE.clay, roughness: 0.58 } });
}

/* ---------------------------------------------------------------- outlier -- */
// A flag on a pole, leaning. An outlier is not necessarily an error, so this
// one points at a row rather than condemning it.
export const OUTLIER_FLAG_ASSET = Object.freeze({
  id: 'qx-outlier-flag', version: 1, status: 'AI_DRAFT', units: 'metres', recordFields: ['id']
});

export function createOutlierFlag(THREE, record) {
  return marker(THREE, OUTLIER_FLAG_ASSET, record, (add, materials, root) => {
    add('base', [0.16, 0.04, 0.16], [0, 0.02, 0], materials.edge);
    const pole = add('pole', [0.035, 0.52, 0.035], [0, 0.3, 0], materials.steel);
    const flag = add('flag', [0.26, 0.16, 0.02], [0.14, 0.48, 0], materials.light);
    pole.rotation.z = -0.14;
    flag.rotation.z = -0.14;
    root.userData.leaning = true;
    return { pole, flag };
  });
}

export const RECORD_MARKERS = Object.freeze([NULL_TOKEN_ASSET, DUPLICATE_STAMP_ASSET, OUTLIER_FLAG_ASSET]);
