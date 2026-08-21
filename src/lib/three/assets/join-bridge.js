// What a join does to the row count, built as a bridge between two tables.
//
// The mistake this asset exists for: a learner joins `sale` to `sale_line`,
// gets more rows than they started with, and reports the new number as if it
// were sales. Told in words it sounds like arithmetic. Built as spans, one per
// match, the fan-out is the shape of the thing and the result plate underneath
// is simply how many rows fell out of it.
//
// One match per left row is a bridge. Three is a fan, and the light goes amber
// before anyone has said the word "grain".
//
// Preview: ?mode=assets&asset=join-bridge

import { makeMaterials, boxAdder, attachPoint, disposer, stateSetter, requireFields } from './kit.js';

export const JOIN_BRIDGE_ASSET = Object.freeze({
  id: 'qx-join-bridge', version: 1, status: 'AI_DRAFT', units: 'metres',
  recordFields: ['id', 'leftRows', 'matchesPerLeft'],
  attachmentPoints: ['left-pier', 'right-pier', 'result-plate']
});

export const MAX_SPANS = 6;

export function createJoinBridge(THREE, record) {
  requireFields(JOIN_BRIDGE_ASSET, record);

  const leftRows = Math.max(1, Math.round(record.leftRows));
  const matches = Math.max(1, Math.min(MAX_SPANS, Math.round(record.matchesPerLeft)));
  // The number a wrong join actually returns. Kept on the asset so the mission
  // and the picture can never quote different figures.
  const resultRows = leftRows * matches;
  const preservesGrain = matches === 1;

  const root = new THREE.Group();
  root.name = `${JOIN_BRIDGE_ASSET.id}:${record.id}`;
  root.userData.asset = JOIN_BRIDGE_ASSET;
  root.userData.record = Object.freeze({ ...record, leftRows, matches, resultRows, preservesGrain });

  const materials = makeMaterials(THREE, {
    span: { color: 0x8a6d3b, roughness: 0.5 }
  });
  const add = boxAdder(THREE, root);

  const reach = 3.2;
  add('left-pier', [0.5, 1.1, 1.2], [-reach / 2, 0.55, 0], materials.edge);
  add('right-pier', [0.5, 1.1, 1.2], [reach / 2, 0.55, 0], materials.edge);
  add('left-key', [0.34, 0.12, 0.34], [-reach / 2, 1.16, 0], materials.steel);
  add('right-key', [0.34, 0.12, 0.34], [reach / 2, 1.16, 0], materials.steel);

  // One span per match, spread across the depth of the piers. A single span
  // sits on the centre line; several fan out either side of it.
  const spans = [];
  const spread = matches > 1 ? 0.9 : 0;
  for (let i = 0; i < matches; i += 1) {
    const z = matches === 1 ? 0 : -spread + (2 * spread * i) / (matches - 1);
    const span = add(`span-${i}`, [reach - 0.5, 0.08, 0.16], [0, 1.22, z], materials.span);
    // Splayed from a shared left key out to separate landing points, so the
    // one-to-many shape is visible from above as well as from the side.
    span.rotation.y = matches === 1 ? 0 : Math.atan2(z, reach) * 0.9;
    spans.push(span);
  }

  add('result-plate', [reach + 0.8, 0.1, 1.6], [0, 0.05, 1.9], materials.cell);
  const indicator = add('grain-light', [0.2, 0.08, 0.2], [0, 0.14, 1.9], materials.light);

  attachPoint(THREE, root, 'left-pier', [-reach / 2, 1.24, 0]);
  attachPoint(THREE, root, 'right-pier', [reach / 2, 1.24, 0]);
  attachPoint(THREE, root, 'result-plate', [0, 0.12, 1.9]);

  const setState = stateSetter(materials.light);
  // A bridge that changed the grain opens amber whatever the caller says, so
  // the picture cannot be set to "fine" while it is fanning.
  setState(preservesGrain ? 'resolved' : 'warning');

  return {
    group: root,
    record: root.userData.record,
    footprint: Object.freeze({ width: reach + 0.8, depth: 3.2, height: 1.4 }),
    parts: { spans, indicator },
    resultRows,
    preservesGrain,
    attachment: name => root.getObjectByName(name),
    setState,
    dispose: disposer(root, materials)
  };
}
