// A table, as a solid whose height is its row count.
//
// This is the companion to the row tile. A tile is one row you can read; a
// stack is a whole table you cannot, and the point of the asset is that you
// stop reading and start comparing. Two stacks side by side answer "did the
// join change the grain?" before a single number is quoted.
//
// The height is logarithmic. Linear height would make 3 rows invisible beside
// 4,312, and the comparison a learner needs is "an order of magnitude bigger",
// not "2,847 taller".
//
// Preview: ?mode=assets&asset=table-stack

import { PALETTE, makeMaterials, boxAdder, attachPoint, disposer, stateSetter, requireFields } from './kit.js';

export const TABLE_STACK_ASSET = Object.freeze({
  id: 'qx-table-stack', version: 1, status: 'AI_DRAFT', units: 'metres',
  recordFields: ['id', 'name', 'rowCount', 'columnCount'],
  attachmentPoints: ['top', 'label', 'join-left', 'join-right']
});

export const MIN_LAYERS = 1;
export const MAX_LAYERS = 18;
export const LAYER_HEIGHT = 0.13;

/**
 * How many plates stand for this many rows. One plate for a single row, then
 * four more per power of ten, capped so a billion-row table still fits on a
 * desk. Exported because the mission text quotes it and a check asserts it.
 */
export const layersFor = rowCount => {
  const rows = Math.max(0, Math.floor(rowCount));
  if (rows <= 1) return MIN_LAYERS;
  return Math.max(MIN_LAYERS, Math.min(MAX_LAYERS, Math.round(Math.log10(rows) * 4) + 1));
};

export function createTableStack(THREE, record) {
  requireFields(TABLE_STACK_ASSET, record);

  const layerCount = layersFor(record.rowCount);
  const columns = Math.max(2, Math.min(8, Math.round(record.columnCount)));

  const root = new THREE.Group();
  root.name = `${TABLE_STACK_ASSET.id}:${record.id}`;
  root.userData.asset = TABLE_STACK_ASSET;
  root.userData.record = Object.freeze({ ...record, layerCount, columns });

  const materials = makeMaterials(THREE, {
    body: { color: record.colour ?? PALETTE.sand, roughness: 0.66 }
  });
  const add = boxAdder(THREE, root);

  add('plinth', [2.4, 0.12, 1.5], [0, 0.06, 0], materials.edge);

  // One plate per layer, with a thin dark gap between, so the count is
  // countable rather than a smooth block of unknown size.
  const layers = [];
  for (let i = 0; i < layerCount; i += 1) {
    const y = 0.12 + LAYER_HEIGHT / 2 + i * LAYER_HEIGHT;
    layers.push(add(`layer-${i}`, [2.2, LAYER_HEIGHT - 0.025, 1.3], [0, y, 0], materials.body));
  }
  const top = 0.12 + layerCount * LAYER_HEIGHT;

  // The columns are grooved into the cap, so the two numbers that define a
  // table's shape are both visible at once.
  add('cap', [2.26, 0.05, 1.36], [0, top + 0.025, 0], materials.cell);
  const gutter = 2.0 / columns;
  for (let i = 1; i < columns; i += 1) {
    add(`column-rule-${i}`, [0.02, 0.06, 1.3], [-1.0 + i * gutter, top + 0.03, 0], materials.edge);
  }

  add('label-plate', [1.5, 0.28, 0.06], [0, 0.34, 0.72], materials.cell);
  const indicator = add('stack-light', [0.16, 0.06, 0.16], [0.92, top + 0.06, 0.5], materials.light);

  attachPoint(THREE, root, 'top', [0, top + 0.08, 0]);
  attachPoint(THREE, root, 'label', [0, 0.34, 0.78]);
  attachPoint(THREE, root, 'join-left', [-1.2, top / 2, 0]);
  attachPoint(THREE, root, 'join-right', [1.2, top / 2, 0]);

  return {
    group: root,
    record: root.userData.record,
    footprint: Object.freeze({ width: 2.4, depth: 1.5, height: top + 0.1 }),
    parts: { layers, indicator },
    layerCount,
    attachment: name => root.getObjectByName(name),
    setState: stateSetter(materials.light),
    dispose: disposer(root, materials)
  };
}
