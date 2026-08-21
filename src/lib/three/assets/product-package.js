export const PRODUCT_PACKAGE_ASSET = Object.freeze({
  id: 'qx-superstore-product-package',
  version: 1,
  status: 'AI_DRAFT',
  units: 'metres',
  recordFields: ['sku', 'barcode', 'name', 'category', 'packageType', 'unitPrice', 'taxRate']
});

export const PRODUCT_CATALOG = Object.freeze([
  Object.freeze({
    sku: 'QX-CER-001', barcode: '5012345678900', name: 'Oat Crunch', category: 'Cereal',
    packageType: 'box', unitPrice: 3.4, taxRate: 0.2, colour: 0xd99b42, accent: 0x633d26
  }),
  Object.freeze({
    sku: 'QX-DRK-014', barcode: '5012345678917', name: 'Orchard Juice', category: 'Drinks',
    packageType: 'bottle', unitPrice: 2.15, taxRate: 0.2, colour: 0xd87932, accent: 0x3e9e2a
  }),
  Object.freeze({
    sku: 'QX-TIN-032', barcode: '5012345678924', name: 'Garden Peas', category: 'Tinned food',
    packageType: 'can', unitPrice: 0.85, taxRate: 0, colour: 0x4d9d58, accent: 0xf1d88a
  }),
  Object.freeze({
    sku: 'QX-FRT-006', barcode: '5012345678931', name: 'Royal Apple', category: 'Fresh produce',
    packageType: 'produce', unitPrice: 0.55, taxRate: 0, colour: 0xb93428, accent: 0x6f8f3f
  })
]);

const cloneRecord = record => Object.freeze({
  sku: record.sku,
  barcode: record.barcode,
  name: record.name,
  category: record.category,
  packageType: record.packageType,
  unitPrice: record.unitPrice,
  taxRate: record.taxRate
});

function addBarcode(THREE, root, barcode, placement) {
  const group = new THREE.Group();
  group.name = 'barcode-panel';
  group.position.set(...placement.position);
  group.rotation.set(...placement.rotation);
  root.add(group);

  const stickerMaterial = new THREE.MeshStandardMaterial({ color: 0xfaf8f1, roughness: 0.86 });
  const inkMaterial = new THREE.MeshBasicMaterial({ color: 0x171512 });
  const sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.19), stickerMaterial);
  sticker.name = 'barcode-sticker';
  group.add(sticker);

  const digits = `${barcode}`.split('').map(Number);
  const pattern = [1, 1, 2, ...digits.flatMap(digit => [1 + digit % 3, 1, 1 + (digit + 1) % 2]), 2, 1, 1];
  const total = pattern.reduce((sum, width) => sum + width, 0);
  let cursor = -0.185;
  pattern.forEach((width, index) => {
    const logicalWidth = (width / total) * 0.37;
    if (index % 2 === 0) {
      const bar = new THREE.Mesh(new THREE.PlaneGeometry(logicalWidth, index < 3 || index > pattern.length - 4 ? 0.145 : 0.122), inkMaterial);
      bar.position.set(cursor + logicalWidth / 2, 0.008, 0.001);
      group.add(bar);
    }
    cursor += logicalWidth;
  });
  return { group, materials: [stickerMaterial, inkMaterial] };
}

/** Create one product instance from a catalogue record or SKU. */
export function createProductPackage(THREE, recordOrSku = PRODUCT_CATALOG[0]) {
  const record = typeof recordOrSku === 'string'
    ? PRODUCT_CATALOG.find(item => item.sku === recordOrSku)
    : recordOrSku;
  if (!record || !PRODUCT_PACKAGE_ASSET.recordFields.every(field => record[field] !== undefined))
    throw new Error('Product package requires a complete Qubix product record.');

  const root = new THREE.Group();
  root.name = `${PRODUCT_PACKAGE_ASSET.id}:${record.sku}`;
  root.userData.asset = PRODUCT_PACKAGE_ASSET;
  root.userData.product = cloneRecord(record);

  const materials = [];
  const material = (options) => {
    const value = new THREE.MeshStandardMaterial(options);
    materials.push(value);
    return value;
  };
  const bodyMaterial = material({ color: record.colour, roughness: 0.64, metalness: record.packageType === 'can' ? 0.28 : 0.03 });
  const accentMaterial = material({ color: record.accent, roughness: 0.58, metalness: 0.03 });
  const darkMaterial = material({ color: 0x241f16, roughness: 0.72 });
  const paleMaterial = material({ color: 0xf5efe2, roughness: 0.76 });

  const add = (name, geometry, partMaterial, position = [0, 0, 0]) => {
    const mesh = new THREE.Mesh(geometry, partMaterial);
    mesh.name = name;
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
    return mesh;
  };

  let barcodePlacement;
  if (record.packageType === 'box') {
    add('package-body', new THREE.BoxGeometry(0.72, 1.02, 0.36), bodyMaterial, [0, 0.54, 0]);
    add('brand-band', new THREE.BoxGeometry(0.73, 0.21, 0.372), accentMaterial, [0, 0.82, 0]);
    add('front-label', new THREE.BoxGeometry(0.46, 0.27, 0.018), paleMaterial, [0, 0.48, 0.19]);
    add('label-mark', new THREE.CylinderGeometry(0.085, 0.085, 0.022, 20), accentMaterial, [0, 0.52, 0.212]).rotation.x = Math.PI / 2;
    barcodePlacement = { position: [0, 0.28, -0.184], rotation: [0, Math.PI, 0] };
  } else if (record.packageType === 'bottle') {
    add('package-body', new THREE.CylinderGeometry(0.29, 0.32, 0.78, 24), bodyMaterial, [0, 0.42, 0]);
    add('bottle-shoulder', new THREE.CylinderGeometry(0.16, 0.29, 0.2, 24), bodyMaterial, [0, 0.91, 0]);
    add('bottle-neck', new THREE.CylinderGeometry(0.13, 0.15, 0.2, 20), paleMaterial, [0, 1.08, 0]);
    add('bottle-cap', new THREE.CylinderGeometry(0.145, 0.145, 0.11, 20), accentMaterial, [0, 1.235, 0]);
    add('front-label', new THREE.CylinderGeometry(0.302, 0.312, 0.31, 24, 1, true, -0.78, 1.56), paleMaterial, [0, 0.47, 0]);
    barcodePlacement = { position: [0, 0.43, 0.318], rotation: [0, 0, 0] };
  } else if (record.packageType === 'can') {
    add('package-body', new THREE.CylinderGeometry(0.34, 0.34, 0.72, 28), bodyMaterial, [0, 0.39, 0]);
    add('can-top', new THREE.CylinderGeometry(0.342, 0.342, 0.035, 28), paleMaterial, [0, 0.767, 0]);
    add('can-bottom', new THREE.CylinderGeometry(0.342, 0.342, 0.035, 28), paleMaterial, [0, 0.013, 0]);
    add('label-band', new THREE.CylinderGeometry(0.351, 0.351, 0.28, 28, 1, true), accentMaterial, [0, 0.44, 0]);
    barcodePlacement = { position: [0, 0.23, 0.352], rotation: [0, 0, 0] };
  } else if (record.packageType === 'produce') {
    const apple = add('package-body', new THREE.SphereGeometry(0.43, 28, 20), bodyMaterial, [0, 0.47, 0]);
    apple.scale.set(1, 0.92, 0.96);
    const stem = add('produce-stem', new THREE.CylinderGeometry(0.035, 0.045, 0.23, 10), darkMaterial, [0.03, 0.91, 0]);
    stem.rotation.z = -0.14;
    const leaf = add('produce-leaf', new THREE.SphereGeometry(0.13, 14, 8), accentMaterial, [0.16, 0.88, 0]);
    leaf.scale.set(1.5, 0.23, 0.75);
    leaf.rotation.z = -0.34;
    barcodePlacement = { position: [0, 0.43, 0.405], rotation: [0, 0, 0] };
  } else {
    throw new Error(`Unsupported package type: ${record.packageType}`);
  }

  const barcode = addBarcode(THREE, root, record.barcode, barcodePlacement);
  materials.push(...barcode.materials);

  const scanPoint = new THREE.Object3D();
  scanPoint.name = 'scan-point';
  scanPoint.position.copy(barcode.group.position);
  root.add(scanPoint);

  const dispose = () => {
    root.traverse(object => object.geometry?.dispose());
    [...new Set(materials)].forEach(item => item.dispose());
  };

  return {
    group: root,
    record: root.userData.product,
    barcodePanel: barcode.group,
    scanPoint,
    dispose
  };
}
