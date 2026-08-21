export const DATA_QUALITY_TERMINAL_ASSET = Object.freeze({
  id: 'qx-data-quality-terminal',
  version: 1,
  status: 'AI_DRAFT',
  units: 'metres',
  footprint: { width: 3.2, depth: 1.55, height: 2.15 },
  attachmentPoints: ['cartridge-entry', 'review-position', 'operator-position']
});

const COLOURS = Object.freeze({ ink: 0x25231f, canvas: 0xeee8da, clay: 0xa85a34, steel: 0x737873, green: 0x63b13b, amber: 0xe2a42d, red: 0xc83c2c, screen: 0xbfe8d6 });

export function createDataQualityTerminal(THREE) {
  const root = new THREE.Group();
  root.name = DATA_QUALITY_TERMINAL_ASSET.id;
  root.userData.asset = DATA_QUALITY_TERMINAL_ASSET;

  const materials = {
    cabinet: new THREE.MeshStandardMaterial({ color: COLOURS.canvas, roughness: 0.74 }),
    edge: new THREE.MeshStandardMaterial({ color: COLOURS.ink, roughness: 0.64, metalness: 0.08 }),
    clay: new THREE.MeshStandardMaterial({ color: COLOURS.clay, roughness: 0.58 }),
    steel: new THREE.MeshStandardMaterial({ color: COLOURS.steel, roughness: 0.32, metalness: 0.52 }),
    screen: new THREE.MeshStandardMaterial({ color: COLOURS.screen, emissive: 0x174632, emissiveIntensity: 0.55, roughness: 0.25 }),
    alert: new THREE.MeshStandardMaterial({ color: COLOURS.amber, emissive: COLOURS.amber, emissiveIntensity: 0.5, roughness: 0.35 }),
    green: new THREE.MeshStandardMaterial({ color: COLOURS.green, emissive: COLOURS.green, emissiveIntensity: 0.26, roughness: 0.42 })
  };

  const box = (name, size, position, material, parent = root) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    mesh.name = name;
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  box('desk-plinth', [3.15, 0.14, 1.5], [0, 0.07, 0], materials.edge);
  box('desk-cabinet', [3.0, 0.72, 1.38], [0, 0.48, 0], materials.cabinet);
  box('worktop', [3.18, 0.12, 1.55], [0, 0.9, 0], materials.clay);

  const monitor = new THREE.Group();
  monitor.name = 'quality-monitor';
  monitor.position.set(-0.48, 1.55, -0.22);
  monitor.rotation.y = 0.08;
  root.add(monitor);
  box('monitor-frame', [1.45, 0.86, 0.12], [0, 0, 0], materials.edge, monitor);
  const screen = box('monitor-screen', [1.28, 0.69, 0.025], [0, 0, 0.073], materials.screen, monitor);
  box('monitor-stand', [0.12, 0.5, 0.12], [-0.02, -0.65, 0], materials.steel, monitor);
  box('monitor-foot', [0.65, 0.07, 0.34], [-0.02, -0.9, 0.12], materials.steel, monitor);

  const keyboard = box('keyboard', [1.12, 0.08, 0.42], [-0.45, 1.02, 0.38], materials.edge);
  keyboard.rotation.x = -0.1;
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 9; column += 1) {
      box(`terminal-key-${row}-${column}`, [0.085, 0.022, 0.07], [-0.79 + column * 0.087, 1.07 - row * 0.004, 0.26 + row * 0.082], column === 8 && row === 2 ? materials.clay : materials.cabinet);
    }
  }

  box('cartridge-reader', [0.72, 0.48, 0.68], [1.02, 1.16, -0.22], materials.edge);
  box('reader-slot', [0.46, 0.13, 0.04], [1.02, 1.22, 0.14], materials.steel);
  const alertLight = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.22, 16), materials.alert);
  alertLight.name = 'quality-alert';
  alertLight.position.set(1.02, 1.58, -0.22);
  alertLight.castShadow = true;
  root.add(alertLight);
  const statusLights = [];
  for (let index = 0; index < 5; index += 1) {
    const light = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 8), index === 0 ? materials.alert : materials.green);
    light.name = `status-light-${index}`;
    light.position.set(0.78 + index * 0.12, 1.03, 0.14);
    root.add(light);
    statusLights.push(light);
  }

  const attachments = {
    'cartridge-entry': [1.02, 1.31, 0.5],
    'review-position': [0.38, 1.3, 0.48],
    'operator-position': [-0.4, 0, 1.35]
  };
  Object.entries(attachments).forEach(([name, position]) => {
    const point = new THREE.Object3D();
    point.name = name;
    point.position.set(...position);
    root.add(point);
  });

  function setStatus(status = 'warning') {
    const states = {
      idle: { colour: COLOURS.screen, emissive: 0x174632, alert: COLOURS.green, intensity: 0.25 },
      warning: { colour: 0xf1d08d, emissive: 0x65400c, alert: COLOURS.amber, intensity: 0.75 },
      error: { colour: 0xf0b7ae, emissive: 0x64160f, alert: COLOURS.red, intensity: 1.25 },
      resolved: { colour: 0xcfeabb, emissive: 0x244f18, alert: COLOURS.green, intensity: 0.7 }
    };
    const state = states[status] || states.warning;
    materials.screen.color.setHex(state.colour);
    materials.screen.emissive.setHex(state.emissive);
    materials.alert.color.setHex(state.alert);
    materials.alert.emissive.setHex(state.alert);
    materials.alert.emissiveIntensity = state.intensity;
  }

  const dispose = () => {
    root.traverse(object => object.geometry?.dispose());
    Object.values(materials).forEach(material => material.dispose());
  };

  // setState is the name every asset answers to; setStatus is what this file
  // called it first, kept so existing call sites keep working.
  return { group: root, footprint: DATA_QUALITY_TERMINAL_ASSET.footprint, parts: { screen, alertLight, statusLights }, attachment: name => root.getObjectByName(name), setState: setStatus, setStatus, dispose };
}
