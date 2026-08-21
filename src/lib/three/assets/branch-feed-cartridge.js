export const BRANCH_FEED_CARTRIDGE_ASSET = Object.freeze({
  id: 'qx-branch-feed-cartridge',
  version: 1,
  status: 'AI_DRAFT',
  units: 'metres',
  recordFields: ['id', 'source', 'table', 'field', 'valueState']
});

export function createBranchFeedCartridge(THREE, record) {
  if (!record || !BRANCH_FEED_CARTRIDGE_ASSET.recordFields.every(field => record[field] !== undefined)) {
    throw new Error('Branch feed cartridge requires a complete record descriptor.');
  }
  const root = new THREE.Group();
  root.name = `${BRANCH_FEED_CARTRIDGE_ASSET.id}:${record.id}`;
  root.userData.asset = BRANCH_FEED_CARTRIDGE_ASSET;
  root.userData.record = Object.freeze({ ...record });

  const materials = {
    shell: new THREE.MeshStandardMaterial({ color: 0xe8dfce, roughness: 0.67 }),
    edge: new THREE.MeshStandardMaterial({ color: 0x292722, roughness: 0.58, metalness: 0.12 }),
    band: new THREE.MeshStandardMaterial({ color: record.colour || 0xa85a34, roughness: 0.55 }),
    indicator: new THREE.MeshStandardMaterial({ color: 0xe2a42d, emissive: 0xe2a42d, emissiveIntensity: 0.65, roughness: 0.38 }),
    contact: new THREE.MeshStandardMaterial({ color: 0xc3a04a, roughness: 0.25, metalness: 0.7 })
  };
  const add = (name, geometry, material, position) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
    return mesh;
  };
  add('cartridge-body', new THREE.BoxGeometry(0.58, 0.84, 0.18), materials.shell, [0, 0.42, 0]);
  add('cartridge-spine', new THREE.BoxGeometry(0.09, 0.86, 0.2), materials.edge, [-0.25, 0.42, 0]);
  add('source-band', new THREE.BoxGeometry(0.49, 0.15, 0.205), materials.band, [0.045, 0.64, 0]);
  add('label-panel', new THREE.BoxGeometry(0.38, 0.25, 0.02), materials.shell, [0.055, 0.37, 0.102]);
  const indicator = add('state-indicator', new THREE.SphereGeometry(0.055, 14, 10), materials.indicator, [0.19, 0.17, 0.12]);
  for (let index = 0; index < 4; index += 1) add(`contact-${index}`, new THREE.BoxGeometry(0.065, 0.035, 0.025), materials.contact, [-0.12 + index * 0.09, 0.02, 0]);

  function setState(state = 'warning') {
    const colours = { warning: 0xe2a42d, error: 0xc83c2c, resolved: 0x63b13b, neutral: 0x79807b };
    const colour = colours[state] || colours.warning;
    materials.indicator.color.setHex(colour);
    materials.indicator.emissive.setHex(colour);
  }
  const dispose = () => {
    root.traverse(object => object.geometry?.dispose());
    Object.values(materials).forEach(material => material.dispose());
  };
  return { group: root, record: root.userData.record, parts: { indicator }, setState, dispose };
}
