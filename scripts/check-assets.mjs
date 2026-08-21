// Every Three.js asset must answer to the same contract, and the ones whose
// geometry carries data must actually carry it.
//
// Why this exists: the first six assets were written one at a time and drifted
// apart without anything failing. Two called the state function `setStatus` and
// two called it `setState`; one returned its handles loose instead of under
// `parts`; two had no state control at all; one declared a footprint. Nothing
// caught it because nothing was looking.
//
// Three.js builds geometry perfectly well in Node with no renderer, so this
// runs the real factories rather than reading the source.
//
//   npm run check:assets

import * as THREE from 'three';
import * as A from '../src/lib/three/assets/index.js';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

// One sample record per factory, chosen so every branch of the geometry runs.
const SAMPLES = [
  ['createCheckoutStation', undefined],
  ['createProductPackage', undefined],
  ['createDataQualityTerminal', undefined],
  ['createBranchFeedCartridge', { id: 'feed-1', source: 'B-17', table: 'sale', field: 'basket_total', valueState: 'missing' }],
  ['createRelationalWorkbench', undefined],
  ['createDataRowTile', { id: 'row-1', columnCount: 4, colour: 0xa85a34 }],
  ['createBranchStoreModule', { id: 'B-17', region: 'north', format: 'standard', aisles: 5 }],
  ['createTableStack', { id: 'sale', name: 'sale', rowCount: 4312, columnCount: 4 }],
  ['createJoinBridge', { id: 'j', leftRows: 100, matchesPerLeft: 3 }],
  ['createNullToken', { id: 'n' }],
  ['createDuplicateStamp', { id: 'd' }],
  ['createOutlierFlag', { id: 'o' }]
];

console.log('the asset contract\n');

const built = [];
for (const [name, record] of SAMPLES) {
  const make = A[name];
  if (typeof make !== 'function') { ok(name.padEnd(28) + 'exported', false); continue; }
  let asset;
  try { asset = record === undefined ? make(THREE) : make(THREE, record); }
  catch (e) { ok(name.padEnd(28) + 'builds', false, String(e.message).slice(0, 70)); continue; }

  const has = k => asset[k] !== undefined;
  const problems = [
    !asset.group?.isObject3D && 'no group',
    !has('parts') && 'no parts',
    typeof asset.setState !== 'function' && 'no setState',
    typeof asset.dispose !== 'function' && 'no dispose',
    !asset.footprint && 'no footprint',
    typeof asset.attachment !== 'function' && 'no attachment'
  ].filter(Boolean);
  ok(name.padEnd(28) + 'contract', problems.length === 0, problems.join(', '));
  built.push([name, asset]);
}

// Every state a mission can ask for has to be accepted, and has to change
// something. A setState that silently ignores 'error' is worse than none.
console.log('');
const colours = group => {
  const out = [];
  group.traverse(o => { if (o.material?.color) out.push(o.material.color.getHex()); });
  return out;
};
for (const [name, asset] of built) {
  const before = colours(asset.group);
  asset.setState('error');
  const after = colours(asset.group);
  asset.setState('idle');
  const moved = before.filter((c, i) => c !== after[i]).length;
  ok(`${name.padEnd(28)}setState('error') changes the picture`, moved > 0, `${moved} of ${before.length} meshes`);
}

// The assets whose geometry is a claim about the data have to keep the claim.
console.log('');
const stack = n => A.createTableStack(THREE, { id: `t${n}`, name: 't', rowCount: n, columnCount: 4 }).layerCount;
const counts = [1, 10, 100, 1000, 10000].map(stack);
ok('table stack grows with the row count', counts.every((v, i) => i === 0 || v > counts[i - 1]), counts.join(' < '));
ok('table stack stays on the desk', stack(1e9) <= A.MAX_LAYERS, `${stack(1e9)} plates for a billion rows`);
ok('layersFor is what the stack built', stack(4312) === A.layersFor(4312), `${A.layersFor(4312)} plates`);

const bridge = n => A.createJoinBridge(THREE, { id: 'b', leftRows: 250, matchesPerLeft: n });
const one = bridge(1), three = bridge(3);
ok('one span per match', one.parts.spans.length === 1 && three.parts.spans.length === 3,
  `${one.parts.spans.length} and ${three.parts.spans.length}`);
ok('the bridge reports the rows it returns', one.resultRows === 250 && three.resultRows === 750,
  `${one.resultRows} and ${three.resultRows}`);
ok('a fanning join cannot claim to preserve grain', one.preservesGrain && !three.preservesGrain);

const branch = f => A.createBranchStoreModule(THREE, { id: 'B', region: 'north', format: f, aisles: 20 });
ok('a branch cannot hold more aisles than its format',
  branch('compact').record.aisles === 3 && branch('supercentre').record.aisles === 10,
  `compact ${branch('compact').record.aisles}, supercentre ${branch('supercentre').record.aisles}`);
ok('an unknown region is refused rather than drawn grey', (() => {
  try { A.createBranchStoreModule(THREE, { id: 'B', region: 'nowhere', format: 'standard', aisles: 3 }); return false; }
  catch { return true; }
})());

// The registry is what the app lists, so a registered asset with no preview or
// an unregistered asset are both dead ends.
console.log('');
const ids = new Set(A.THREE_ASSET_REGISTRY.map(e => e.id));
ok('every registry entry has a preview route', A.THREE_ASSET_REGISTRY.every(e => e.preview?.startsWith('?mode=assets')));
ok('every built asset is registered',
  built.every(([, a]) => ids.has(a.group.userData.asset?.id ?? a.group.name.split(':')[0])),
  `${ids.size} registered, ${built.length} built`);
ok('no duplicate ids in the registry', ids.size === A.THREE_ASSET_REGISTRY.length);

built.forEach(([, a]) => a.dispose());
console.log(`\n${bad ? `${bad} check(s) FAILED` : `all checks pass, ${built.length} assets`}`);
process.exit(bad ? 1 : 0);
