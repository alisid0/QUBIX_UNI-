import { stateSetter } from './kit.js';

export const CHECKOUT_STATION_ASSET = Object.freeze({
  id: 'qx-superstore-checkout-station',
  version: 1,
  status: 'AI_DRAFT',
  units: 'metres',
  footprint: { width: 4.6, depth: 1.45, height: 2.05 },
  attachmentPoints: ['belt-entry', 'scanner-centre', 'bagging-area', 'operator-position']
});

const PALETTE = Object.freeze({
  ink: 0x241f16,
  canvas: 0xf1ede4,
  clay: 0xa85a34,
  olive: 0x3e9e2a,
  red: 0xcf3423,
  steel: 0x676b68,
  belt: 0x343735,
  screen: 0xbde8d2
});

/**
 * Create a compact, low-poly supermarket checkout station.
 *
 * The returned group owns its geometries and materials. Call `dispose()` when
 * removing it permanently. Named parts and attachment points are exposed so a
 * lesson can animate a scan without knowing how the model is constructed.
 */
export function createCheckoutStation(THREE) {
  const root = new THREE.Group();
  root.name = CHECKOUT_STATION_ASSET.id;
  root.userData.asset = CHECKOUT_STATION_ASSET;

  const materials = {
    cabinet: new THREE.MeshStandardMaterial({ color: PALETTE.canvas, roughness: 0.72, metalness: 0.03 }),
    edge: new THREE.MeshStandardMaterial({ color: PALETTE.ink, roughness: 0.68, metalness: 0.08 }),
    clay: new THREE.MeshStandardMaterial({ color: PALETTE.clay, roughness: 0.58, metalness: 0.04 }),
    olive: new THREE.MeshStandardMaterial({ color: PALETTE.olive, roughness: 0.55, metalness: 0.03 }),
    steel: new THREE.MeshStandardMaterial({ color: PALETTE.steel, roughness: 0.34, metalness: 0.58 }),
    belt: new THREE.MeshStandardMaterial({ color: PALETTE.belt, roughness: 0.88, metalness: 0.01 }),
    screen: new THREE.MeshStandardMaterial({ color: PALETTE.screen, emissive: 0x173c2d, emissiveIntensity: 0.34, roughness: 0.28 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0xccefe9, transparent: true, opacity: 0.46, roughness: 0.12, transmission: 0.16 }),
    scanner: new THREE.MeshStandardMaterial({ color: PALETTE.red, emissive: PALETTE.red, emissiveIntensity: 0.2, roughness: 0.42 })
  };

  const box = (name, size, position, material, radius = 0) => {
    const geometry = radius > 0
      ? new THREE.BoxGeometry(size[0], size[1], size[2], 2, 2, 2)
      : new THREE.BoxGeometry(...size);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
    return mesh;
  };

  // Main lane: dark plinth, warm cabinet and a recessed conveyor surface.
  box('lane-plinth', [4.45, 0.12, 1.28], [0, 0.06, 0], materials.edge);
  box('counter-body', [4.25, 0.7, 1.1], [0.08, 0.45, 0], materials.cabinet);
  box('counter-kickplate', [4.32, 0.16, 1.16], [0.03, 0.17, 0], materials.edge);
  const belt = box('conveyor-belt', [2.26, 0.08, 0.78], [-0.86, 0.845, 0], materials.belt);
  box('belt-left-rail', [2.42, 0.12, 0.08], [-0.86, 0.88, -0.46], materials.steel);
  box('belt-right-rail', [2.42, 0.12, 0.08], [-0.86, 0.88, 0.46], materials.steel);

  // Scanner glass and clay divider make the action point readable at a glance.
  box('scanner-deck', [0.66, 0.1, 0.82], [0.68, 0.86, 0], materials.clay);
  const scannerGlass = box('scanner-glass', [0.46, 0.035, 0.58], [0.68, 0.925, 0], materials.glass);
  const scanLight = box('scanner-light', [0.3, 0.018, 0.045], [0.68, 0.95, 0], materials.scanner);

  // Bagging platform is visually distinct and leaves space for a lesson item.
  box('bagging-platform', [0.94, 0.12, 1.04], [1.5, 0.86, 0], materials.olive);
  box('bagging-well', [0.68, 0.07, 0.76], [1.5, 0.945, 0], materials.edge);

  // Till mast and angled display. The display is a separate named part so
  // lessons may change its emissive state without rebuilding the model.
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.075, 0.78, 12), materials.steel);
  mast.name = 'terminal-mast';
  mast.position.set(0.96, 1.27, -0.42);
  mast.castShadow = true;
  root.add(mast);

  const terminal = new THREE.Group();
  terminal.name = 'terminal';
  terminal.position.set(0.96, 1.65, -0.4);
  terminal.rotation.y = -0.18;
  root.add(terminal);

  const displayFrame = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.48, 0.09), materials.edge);
  displayFrame.name = 'display-frame';
  displayFrame.castShadow = true;
  terminal.add(displayFrame);
  const display = new THREE.Mesh(new THREE.BoxGeometry(0.61, 0.36, 0.018), materials.screen);
  display.name = 'display-screen';
  display.position.z = 0.055;
  terminal.add(display);

  // A small keypad and receipt slot make the silhouette recognisably a till.
  box('keypad-base', [0.48, 0.08, 0.34], [0.92, 1.0, 0.34], materials.edge).rotation.x = -0.16;
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 4; column += 1) {
      box(`key-${row}-${column}`, [0.075, 0.026, 0.056], [0.79 + column * 0.088, 1.055 - row * 0.005, 0.26 + row * 0.074], row === 2 && column === 3 ? materials.clay : materials.cabinet);
    }
  }
  box('receipt-printer', [0.34, 0.22, 0.34], [1.38, 1.04, -0.36], materials.edge);
  box('receipt-slot', [0.22, 0.018, 0.04], [1.38, 1.16, -0.18], materials.steel);

  // Attachment points are empty transforms—not visible geometry.
  const attachments = {
    'belt-entry': [-1.82, 1.02, 0],
    'scanner-centre': [0.68, 1.03, 0],
    'bagging-area': [1.5, 1.08, 0],
    'operator-position': [0.82, 0, 1.1]
  };
  Object.entries(attachments).forEach(([name, position]) => {
    const point = new THREE.Object3D();
    point.name = name;
    point.position.set(...position);
    root.add(point);
  });

  const dispose = () => {
    root.traverse((object) => object.geometry?.dispose());
    Object.values(materials).forEach((material) => material.dispose());
  };

  return {
    group: root,
    footprint: CHECKOUT_STATION_ASSET.footprint,
    parts: { belt, scannerGlass, scanLight, display },
    setState: stateSetter(materials.scanner),
    attachment: name => root.getObjectByName(name),
    dispose
  };
}
