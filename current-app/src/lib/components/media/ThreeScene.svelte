<script>
  import { onMount, onDestroy } from 'svelte';

  // spec: { kind:'atom'|'molecule'|'lattice', ... } — see boardMedia.js
  export let spec;

  let container;
  let loading = true;
  let failed = false;
  let cleanup = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // CPK-ish element colours + relative radii.
  const ELEMENTS = {
    H:  { color: 0xeef0f4, radius: 0.32 },
    B:  { color: 0xf2a07b, radius: 0.54 },
    C:  { color: 0x36363f, radius: 0.62 },
    N:  { color: 0x4f6bed, radius: 0.58 },
    O:  { color: 0xe5484d, radius: 0.56 },
    F:  { color: 0x8bd450, radius: 0.50 },
    Na: { color: 0x9a6ce0, radius: 0.55 },
    Cl: { color: 0x69e037, radius: 0.80 }
  };
  const el = (s) => ELEMENTS[s] || { color: 0x9aa0ff, radius: 0.5 };

  $: label = spec?.kind === 'molecule' ? spec.formula
    : spec?.kind === 'molecule-gallery' ? (spec.label || 'compare molecular shapes')
    : spec?.kind === 'atom' ? spec.symbol
    : spec?.kind === 'lattice' ? `${spec.a}${spec.b}`
    : spec?.kind === 'nucleus' ? (spec.label || 'nucleus')
    : spec?.kind === 'electric-attraction' ? (spec.label || 'electrical attraction')
    : spec?.kind === 'isotopes' ? (spec.label || 'same protons, different neutrons')
    : spec?.kind === 'ionic-transfer' ? (spec.label || 'electron transfer')
    : spec?.kind === 'covalent-share' ? (spec.label || 'shared electrons')
    : spec?.kind === 'metallic-sea' ? (spec.label || 'electron sea')
    : spec?.kind === 'polarity' ? (spec.label || 'shape decides polarity')
    : spec?.kind === 'hydrogen-bonds' ? (spec.label || 'hydrogen bonds')
    : spec?.kind === 'mole-scale' ? (spec.label || 'the mole scales atoms up')
    : spec?.kind === 'mass-moles' ? (spec.label || 'mass to moles')
    : spec?.kind === 'isotope-average' ? (spec.label || 'weighted average mass')
    : spec?.kind === 'covalent-network' ? (spec.label || 'structure decides properties')
    : spec?.kind === 'dna-helix' ? (spec.label || 'DNA double helix')
    : spec?.kind === 'atom-scale' ? (spec.label || 'an atom is mostly empty space')
    : spec?.kind === 'atomic-structure' ? (spec.label || 'nucleus and electron region')
    : spec?.kind === 'structure-comparison' ? (spec.label || 'molecule, lattice, or network')
    : spec?.kind === 'lone-pair-geometry' ? (spec.label || 'lone pairs shape the molecule')
    : spec?.kind === 'water-lone-pairs' ? (spec.label || 'two bonds and two lone pairs')
    : spec?.kind === 'protein-alpha-helix' ? (spec.label || 'protein alpha helix')
    : spec?.kind === 'nucleus-forces' ? (spec.label || 'repulsion inside the nucleus')
    : spec?.kind === 'carbon-architecture' ? (spec.label || 'carbon builds chains, rings, and branches')
    : spec?.kind === 'ion-charge-builder' ? (spec.label || 'charge comes from an electron imbalance')
    : spec?.kind === 'proton-transfer' ? (spec.label || 'a proton moves between molecules')
    : spec?.kind === 'reaction-collisions' ? (spec.label || 'warmer particles collide more often')
    : spec?.kind === 'unit-cube-volume' ? (spec.label || 'volume is built from unit cubes')
    : spec?.kind === 'thermal-lattice' ? (spec.label || 'heating increases particle spacing')
    : spec?.kind === 'particle-states' ? (spec.label || 'the same particles, rearranged')
    : spec?.kind === 'ideal-gas-particles' ? (spec.label || 'ideal gas particles move freely')
    : spec?.kind === 'gas-wall-collisions' ? (spec.label || 'wall collisions create pressure')
    : spec?.kind === 'entropy-microstates' ? (spec.label || 'many arrangements are more probable')
    : spec?.kind === 'ai-pipeline' ? (spec.label || 'text -> bits -> vectors')
    : spec?.kind === 'unit-circle' ? (spec.label || 'cos θ, sin θ')
    : spec?.kind === 'ray-optics' ? (spec.label || 'light bends at a boundary')
    : spec?.kind === 'field' ? (spec.label || 'the field fills the space')
    : spec?.kind === 'vectors' ? (spec.label || (spec.mode === 'cross' ? 'the cross product points perpendicular to both' : spec.mode === 'components' ? 'every vector is the sum of its x, y, z parts' : 'add tip to tail; the resultant closes the parallelogram'))
    : spec?.kind === 'waves' ? (spec.label || (spec.mode === 'standing' ? 'a standing wave: fixed nodes, swinging antinodes' : spec.mode === 'interference' ? 'two sources overlap into an interference pattern' : 'a traveling wave carries the pattern, not the medium'))
    : spec?.kind === 'solid-revolution' ? (spec.label || 'revolve a curve about the axis to sweep a solid') : '';

  // Unit bond directions for each VSEPR geometry.
  function shapeDirs(shape) {
    const d2r = Math.PI / 180;
    if (shape === 'linear') return [[0, 1, 0], [0, -1, 0]];
    if (shape === 'bent') {
      const h = (104.5 / 2) * d2r;
      return [[Math.sin(h), -Math.cos(h), 0], [-Math.sin(h), -Math.cos(h), 0]];
    }
    if (shape === 'trigonal') {
      return [0, 1, 2].map(i => { const a = i * 120 * d2r; return [Math.cos(a), 0, Math.sin(a)]; });
    }
    if (shape === 'pyramidal') {
      const b = 70 * d2r; // polar angle from -Y; ~107° between bonds
      return [0, 1, 2].map(i => {
        const a = i * 120 * d2r;
        return [Math.sin(b) * Math.cos(a), -Math.cos(b), Math.sin(b) * Math.sin(a)];
      });
    }
    // tetrahedral
    const n = Math.sqrt(3);
    return [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(v => [v[0] / n, v[1] / n, v[2] / n]);
  }

  function sphere(THREE, r, color) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(r, 32, 24),
      new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.05 })
    );
  }

  function makeLabel(THREE, text, opts = {}) {
    const width = opts.width || 512;
    const height = opts.height || 160;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const r = 30;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(width - r, 0);
    ctx.quadraticCurveTo(width, 0, width, r);
    ctx.lineTo(width, height - r);
    ctx.quadraticCurveTo(width, height, width - r, height);
    ctx.lineTo(r, height);
    ctx.quadraticCurveTo(0, height, 0, height - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fillStyle = opts.bg || 'rgba(14, 13, 18, 0.88)';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = opts.border || 'rgba(238, 147, 98, 0.72)';
    ctx.stroke();
    ctx.fillStyle = opts.fg || '#f6efe4';
    ctx.font = `800 ${opts.size || 42}px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
    const scale = opts.scale || [1.35, 0.42, 1];
    sprite.scale.set(scale[0], scale[1], scale[2]);
    return sprite;
  }

  function bond(THREE, a, b) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.085, 0.085, dir.length(), 16),
      new THREE.MeshStandardMaterial({ color: 0xb9bdd4, roughness: 0.5 })
    );
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return mesh;
  }

  function buildMolecule(THREE, group) {
    const len = 1.5;
    const c = el(spec.center);
    group.add(sphere(THREE, c.radius, c.color));
    const lg = el(spec.ligand);
    for (const d of shapeDirs(spec.shape)) {
      const v = new THREE.Vector3(d[0], d[1], d[2]).multiplyScalar(len);
      const m = sphere(THREE, lg.radius, lg.color);
      m.position.copy(v);
      group.add(m);
      group.add(bond(THREE, new THREE.Vector3(0, 0, 0), v));
    }
    return len + Math.max(c.radius, lg.radius) + 0.4;
  }

  function buildMoleculeGallery(THREE, group) {
    const examples = [
      { formula: 'CO₂ · linear', shape: 'linear', center: 'C', ligand: 'O', x: -1.9, y: 1.3 },
      { formula: 'BF₃ · trigonal', shape: 'trigonal', center: 'B', ligand: 'F', x: 1.9, y: 1.3 },
      { formula: 'CH₄ · tetrahedral', shape: 'tetrahedral', center: 'C', ligand: 'H', x: -1.9, y: -1.35 },
      { formula: 'H₂O · bent', shape: 'bent', center: 'O', ligand: 'H', x: 1.9, y: -1.35 }
    ];
    const molecules = [];
    examples.forEach((example) => {
      const molecule = new THREE.Group();
      const center = el(example.center);
      const ligand = el(example.ligand);
      molecule.add(sphere(THREE, center.radius, center.color));
      for (const d of shapeDirs(example.shape)) {
        const end = new THREE.Vector3(d[0], d[1], d[2]).multiplyScalar(1.35);
        const atom = sphere(THREE, ligand.radius, ligand.color);
        atom.position.copy(end);
        molecule.add(atom);
        molecule.add(bond(THREE, new THREE.Vector3(), end));
      }
      molecule.scale.setScalar(0.62);
      molecule.position.set(example.x, example.y, 0);
      group.add(molecule);
      molecules.push(molecule);

      const caption = makeLabel(THREE, example.formula, {
        width: 410,
        height: 118,
        size: 39,
        scale: [1.22, 0.35, 1]
      });
      caption.position.set(example.x, example.y - 1.05, 0.35);
      group.add(caption);
    });
    group.userData.animate = (time) => {
      molecules.forEach((molecule, index) => {
        molecule.rotation.y = Math.sin(time * 0.00045 + index * 0.8) * 0.22;
        molecule.rotation.x = Math.cos(time * 0.00035 + index * 0.65) * 0.07;
      });
    };
    return 4.35;
  }

  function buildAtomScale(THREE, group) {
    const cloud = new THREE.Mesh(
      new THREE.SphereGeometry(3.05, 42, 30),
      new THREE.MeshStandardMaterial({ color: 0x6574d9, transparent: true, opacity: 0.075, roughness: 0.2, side: THREE.DoubleSide })
    );
    group.add(cloud);
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(3.05, 28, 20),
      new THREE.MeshBasicMaterial({ color: 0x9aa0ff, transparent: true, opacity: 0.17, wireframe: true })
    );
    group.add(shell);

    const nucleus = new THREE.Group();
    nucleus.add(sphere(THREE, 0.16, 0xee9362));
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 24, 18),
      new THREE.MeshBasicMaterial({ color: 0xffc09a, transparent: true, opacity: 0.22 })
    );
    nucleus.add(halo);
    group.add(nucleus);

    const radialMaterial = new THREE.LineBasicMaterial({ color: 0x8e96c9, transparent: true, opacity: 0.28 });
    for (const end of [[3.05, 0, 0], [-3.05, 0, 0], [0, 3.05, 0], [0, -3.05, 0], [0, 0, 3.05], [0, 0, -3.05]]) {
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(...end)]), radialMaterial));
    }
    const tag = makeLabel(THREE, spec.title || 'nucleus : atom width ≈ 1 : 100,000', {
      width: 700, height: 120, size: 34, scale: [2.35, 0.4, 1]
    });
    tag.position.set(0, -3.65, 0.4);
    group.add(tag);
    group.userData.animate = (time) => {
      shell.rotation.y = time * 0.00008;
      shell.rotation.x = time * 0.00004;
      const pulse = 1 + Math.sin(time * 0.003) * 0.12;
      halo.scale.setScalar(pulse);
    };
    return 4.35;
  }

  function buildAtomicStructure(THREE, group) {
    const nucleus = new THREE.Group();
    const offsets = [[-.22,0,0],[.22,0,0],[0,.22,.12],[0,-.22,-.12],[.12,.08,-.22],[-.12,-.08,.22]];
    offsets.forEach((p, index) => {
      const particle = sphere(THREE, 0.25, index % 2 ? 0x9aa0ff : 0xee9362);
      particle.position.set(...p);
      nucleus.add(particle);
    });
    group.add(nucleus);

    const orbitGroup = new THREE.Group();
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x7782d8, transparent: true, opacity: 0.32 });
    [0, Math.PI / 3, -Math.PI / 3].forEach((tilt, index) => {
      const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.018, 8, 96), orbitMaterial.clone());
      orbit.rotation.x = Math.PI / 2;
      orbit.rotation.y = tilt;
      orbitGroup.add(orbit);
      for (let e = 0; e < 2; e++) {
        const electron = sphere(THREE, 0.13, 0x6672ed);
        const angle = index * 1.6 + e * Math.PI;
        electron.position.set(Math.cos(angle) * 2.35, Math.sin(angle) * 2.35, 0);
        electron.rotation.z = angle;
        const carrier = new THREE.Group();
        carrier.rotation.y = tilt;
        carrier.add(electron);
        orbitGroup.add(carrier);
      }
    });
    group.add(orbitGroup);
    const tag = makeLabel(THREE, spec.title || 'compact nucleus · surrounding electron region', {
      width: 720, height: 120, size: 33, scale: [2.4, 0.4, 1]
    });
    tag.position.set(0, -3.0, 0.3);
    group.add(tag);
    group.userData.animate = (time) => {
      orbitGroup.rotation.y = time * 0.00025;
      orbitGroup.rotation.z = Math.sin(time * 0.0003) * 0.12;
      nucleus.rotation.y = -time * 0.00018;
    };
    return 3.7;
  }

  function buildStructureComparison(THREE, group) {
    const models = [];
    const molecule = new THREE.Group();
    const oxygen = sphere(THREE, 0.42, el('O').color);
    molecule.add(oxygen);
    shapeDirs('bent').forEach((d) => {
      const end = new THREE.Vector3(...d).multiplyScalar(0.92);
      const hydrogen = sphere(THREE, 0.23, el('H').color);
      hydrogen.position.copy(end); molecule.add(hydrogen); molecule.add(bond(THREE, new THREE.Vector3(), end));
    });
    molecule.position.set(-3.05, 0.35, 0); group.add(molecule); models.push(molecule);

    const lattice = new THREE.Group();
    for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) for (let z = 0; z < 2; z++) {
      const ion = sphere(THREE, (x + y + z) % 2 ? 0.25 : 0.20, (x + y + z) % 2 ? el('Cl').color : el('Na').color);
      ion.position.set((x - 1) * 0.52, (y - 1) * 0.52, (z - .5) * 0.52); lattice.add(ion);
    }
    lattice.position.set(0, 0.35, 0); group.add(lattice); models.push(lattice);

    const network = new THREE.Group();
    const networkPoints = [[0,0,0],[.85,.85,.85],[.85,-.85,-.85],[-.85,.85,-.85],[-.85,-.85,.85]];
    networkPoints.forEach((p, index) => {
      const atom = sphere(THREE, index ? 0.25 : 0.32, el('C').color); atom.position.set(...p); network.add(atom);
      if (index) network.add(bond(THREE, new THREE.Vector3(), new THREE.Vector3(...p)));
    });
    network.scale.setScalar(0.72); network.position.set(3.05, 0.35, 0); group.add(network); models.push(network);

    [['H₂O molecule',-3.05],['NaCl lattice',0],['carbon network',3.05]].forEach(([text, x]) => {
      const caption = makeLabel(THREE, text, { width: 410, height: 118, size: 36, scale: [1.25, 0.35, 1] });
      caption.position.set(x, -1.35, 0.35); group.add(caption);
    });
    group.userData.animate = (time) => models.forEach((model, index) => {
      model.rotation.y = Math.sin(time * 0.00045 + index) * 0.28;
      model.rotation.x = Math.cos(time * 0.00035 + index) * 0.08;
    });
    return 4.8;
  }

  function addLonePair(THREE, group, direction, color = 0xffbd75) {
    const lobe = new THREE.Mesh(
      new THREE.SphereGeometry(0.48, 28, 20),
      new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.18, transparent: true, opacity: 0.72, roughness: 0.25 })
    );
    lobe.scale.set(0.72, 1.18, 0.72);
    lobe.position.copy(direction).multiplyScalar(1.28);
    lobe.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    group.add(lobe);
    const e1 = sphere(THREE, 0.10, 0xfff0d8), e2 = sphere(THREE, 0.10, 0xfff0d8);
    const side = new THREE.Vector3(1, 0, 0).applyQuaternion(lobe.quaternion).multiplyScalar(0.15);
    e1.position.copy(direction).multiplyScalar(1.5).add(side); e2.position.copy(direction).multiplyScalar(1.5).sub(side);
    group.add(e1); group.add(e2);
  }

  function buildLonePairGeometry(THREE, group, water = false) {
    const centerSymbol = water ? 'O' : 'N';
    group.add(sphere(THREE, 0.58, el(centerSymbol).color));
    const bonded = (water ? shapeDirs('bent') : shapeDirs('pyramidal')).map(d => new THREE.Vector3(...d));
    const lone = water
      ? [new THREE.Vector3(0.65, 0.58, 0.5).normalize(), new THREE.Vector3(-0.65, 0.58, -0.5).normalize()]
      : [new THREE.Vector3(0, 1, 0)];
    bonded.forEach((direction) => {
      const end = direction.clone().multiplyScalar(1.55);
      const hydrogen = sphere(THREE, 0.30, el('H').color); hydrogen.position.copy(end);
      group.add(hydrogen); group.add(bond(THREE, new THREE.Vector3(), end));
    });
    lone.forEach(direction => addLonePair(THREE, group, direction));
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.95, 0.025, 8, 96),
      new THREE.MeshBasicMaterial({ color: 0xee9362, transparent: true, opacity: 0.34 })
    );
    ring.rotation.x = Math.PI / 2; group.add(ring);
    const caption = makeLabel(THREE, spec.title || (water ? '2 bonds + 2 lone pairs · bent 104.5°' : '3 bonds + 1 lone pair · pyramidal 107°'), {
      width: 720, height: 120, size: 34, scale: [2.45, 0.4, 1]
    });
    caption.position.set(0, -2.7, 0.3); group.add(caption);
    group.userData.animate = (time) => {
      const pulse = 1 + Math.sin(time * 0.003) * 0.05;
      ring.scale.setScalar(pulse);
    };
    return 3.45;
  }

  function buildProteinAlphaHelix(THREE, group) {
    const points = [];
    const residues = [];
    for (let i = 0; i < 28; i++) {
      const angle = i * 0.62;
      const point = new THREE.Vector3(Math.cos(angle) * 1.35, (i - 13.5) * 0.19, Math.sin(angle) * 1.35);
      points.push(point);
      const residue = sphere(THREE, 0.18, i % 4 === 0 ? 0xee9362 : 0x7b86e8);
      residue.position.copy(point); group.add(residue); residues.push(residue);
      if (i) group.add(bond(THREE, points[i - 1], point));
      if (i >= 4) {
        const start = points[i - 4], end = point;
        for (let d = 1; d < 5; d++) {
          const dot = sphere(THREE, 0.045, 0x7ee4dd);
          dot.position.copy(start).lerp(end, d / 5); group.add(dot);
        }
      }
    }
    group.rotation.z = Math.PI / 2;
    const caption = makeLabel(THREE, spec.title || 'hydrogen bonds brace a right-handed helix', {
      width: 720, height: 120, size: 33, scale: [2.45, 0.4, 1]
    });
    caption.position.set(0, -2.55, 0.4); caption.rotation.z = -Math.PI / 2; group.add(caption);
    group.userData.animate = (time) => residues.forEach((residue, index) => {
      const pulse = 1 + Math.sin(time * 0.003 + index * 0.35) * 0.08; residue.scale.setScalar(pulse);
    });
    return 3.75;
  }

  function buildNucleusForces(THREE, group) {
    const particles = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < 26; i++) {
      const y = 1 - (i / 25) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y)) * 1.2;
      const angle = golden * i;
      const position = new THREE.Vector3(Math.cos(angle) * radius, y * 1.2, Math.sin(angle) * radius);
      const proton = i % 2 === 0;
      const particle = sphere(THREE, 0.31, proton ? 0xee9362 : 0x8993df);
      particle.position.copy(position); group.add(particle); particles.push(particle);
      if (proton && i % 4 === 0) {
        const direction = position.clone().normalize();
        group.add(new THREE.ArrowHelper(direction, position.clone().add(direction.clone().multiplyScalar(0.18)), 1.0, 0xffbd75, 0.24, 0.14));
      }
    }
    const cohesion = new THREE.Mesh(
      new THREE.SphereGeometry(1.72, 32, 24),
      new THREE.MeshBasicMaterial({ color: 0x7ee4dd, transparent: true, opacity: 0.09, wireframe: true })
    );
    group.add(cohesion);
    const caption = makeLabel(THREE, spec.title || 'electric repulsion pushes out · nuclear force holds in', {
      width: 780, height: 120, size: 31, scale: [2.6, 0.4, 1]
    });
    caption.position.set(0, -2.7, 0.4); group.add(caption);
    group.userData.animate = (time) => {
      particles.forEach((particle, index) => { if (index % 2 === 0) particle.scale.setScalar(1 + Math.sin(time * 0.003 + index) * 0.055); });
      cohesion.rotation.y = time * 0.00018;
    };
    return 3.5;
  }

  function buildCarbonArchitecture(THREE, group) {
    const models = [];
    const addCarbonSkeleton = (points, links, x) => {
      const model = new THREE.Group();
      points.forEach((point) => {
        const atom = sphere(THREE, 0.27, el('C').color);
        atom.position.set(...point); model.add(atom);
      });
      links.forEach(([a, b]) => model.add(bond(THREE, new THREE.Vector3(...points[a]), new THREE.Vector3(...points[b]))));
      model.position.set(x, 0.38, 0); group.add(model); models.push(model);
    };
    addCarbonSkeleton(
      [[-1.05,0,0],[-.35,.28,.18],[.35,-.18,-.18],[1.05,.12,.12]],
      [[0,1],[1,2],[2,3]], -3.2
    );
    const ringPoints = Array.from({ length: 6 }, (_, i) => {
      const angle = i * Math.PI / 3; return [Math.cos(angle) * 0.92, Math.sin(angle) * 0.92, Math.sin(angle * 2) * 0.12];
    });
    addCarbonSkeleton(ringPoints, Array.from({ length: 6 }, (_, i) => [i, (i + 1) % 6]), 0);
    addCarbonSkeleton(
      [[0,0,0],[-.85,.62,.2],[.85,.62,-.2],[-.65,-.75,-.25],[.65,-.75,.25],[0,-1.45,0]],
      [[0,1],[0,2],[0,3],[0,4],[3,5],[4,5]], 3.2
    );
    [['chain',-3.2],['ring',0],['branch',3.2]].forEach(([text, x]) => {
      const tag = makeLabel(THREE, text, { width: 300, height: 110, size: 40, scale: [0.9, 0.31, 1] });
      tag.position.set(x, -1.55, 0.35); group.add(tag);
    });
    group.userData.animate = (time) => models.forEach((model, index) => {
      model.rotation.y = Math.sin(time * 0.00042 + index * 0.9) * 0.3;
      model.rotation.x = Math.cos(time * 0.00033 + index) * 0.08;
    });
    return 4.9;
  }

  function buildIonChargeBuilder(THREE, group) {
    const protons = spec.protons || 11;
    const electrons = spec.electrons ?? 10;
    const charge = protons - electrons;
    const nucleus = new THREE.Group();
    const nucleusCore = sphere(THREE, 0.52, 0xee9362);
    nucleus.add(nucleusCore);
    const nucleusTag = makeLabel(THREE, `${protons}p⁺`, {
      width: 190, height: 110, size: 46, scale: [0.56, 0.32, 1], bg: 'rgba(91, 34, 20, 0.88)'
    });
    nucleusTag.position.set(0, 0, 0.58); nucleus.add(nucleusTag); group.add(nucleus);

    const shellGroup = new THREE.Group();
    const shellCounts = electrons <= 10 ? [Math.min(2, electrons), Math.max(0, electrons - 2)] : [2, 8, electrons - 10];
    let outerRadius = 1.25;
    const electronMeshes = [];
    shellCounts.forEach((count, shellIndex) => {
      if (!count) return;
      const radius = 1.25 + shellIndex * 0.88; outerRadius = radius;
      const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.018, 8, 96),
        new THREE.MeshBasicMaterial({ color: 0x7f89dd, transparent: true, opacity: 0.32 })
      );
      orbit.rotation.x = shellIndex * 0.42; shellGroup.add(orbit);
      for (let index = 0; index < count; index++) {
        const angle = (index / count) * Math.PI * 2 + shellIndex * 0.4;
        const electron = sphere(THREE, 0.13, 0x6975f0);
        electron.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        electron.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), shellIndex * 0.42);
        shellGroup.add(electron); electronMeshes.push(electron);
      }
    });
    group.add(shellGroup);

    const chargeColor = charge > 0 ? 0xffa36e : charge < 0 ? 0x7e9dff : 0x9ca3af;
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(outerRadius + 0.38, 30, 22),
      new THREE.MeshBasicMaterial({ color: chargeColor, transparent: true, opacity: 0.08, wireframe: true })
    );
    group.add(halo);
    const chargeText = charge === 0 ? 'neutral' : `charge ${charge > 0 ? '+' : '−'}${Math.abs(charge)}`;
    const caption = makeLabel(THREE, spec.title || `${protons} protons · ${electrons} electrons · ${chargeText}`, {
      width: 760, height: 120, size: 32, scale: [2.55, 0.4, 1], border: charge > 0 ? 'rgba(255,163,110,.8)' : 'rgba(126,157,255,.8)'
    });
    caption.position.set(0, -outerRadius - 0.92, 0.35); group.add(caption);
    const chargeTag = makeLabel(THREE, charge > 0 ? '+' : charge < 0 ? '−' : '0', {
      width: 130, height: 130, size: 76, scale: [0.38, 0.38, 1], bg: 'rgba(14,13,18,.72)', border: 'rgba(246,239,228,.4)'
    });
    chargeTag.position.set(outerRadius + 0.75, outerRadius * 0.55, 0.4); group.add(chargeTag);
    group.userData.animate = (time) => {
      shellGroup.rotation.z = time * 0.00016;
      shellGroup.rotation.y = Math.sin(time * 0.00024) * 0.14;
      const pulse = 1 + Math.sin(time * 0.003) * 0.05; halo.scale.setScalar(pulse);
      electronMeshes.forEach((electron, index) => electron.scale.setScalar(1 + Math.sin(time * 0.004 + index) * 0.08));
    };
    return outerRadius + 1.35;
  }

  function buildProtonTransfer(THREE, group) {
    const donor = new THREE.Group();
    const chlorine = sphere(THREE, 0.72, el('Cl').color); donor.add(chlorine);
    donor.position.set(-2.55, 0.35, 0); group.add(donor);
    const acceptor = new THREE.Group();
    const oxygen = sphere(THREE, 0.55, el('O').color); acceptor.add(oxygen);
    shapeDirs('bent').forEach((d) => {
      const end = new THREE.Vector3(...d).multiplyScalar(1.05);
      const hydrogen = sphere(THREE, 0.27, el('H').color); hydrogen.position.copy(end);
      acceptor.add(hydrogen); acceptor.add(bond(THREE, new THREE.Vector3(), end));
    });
    acceptor.position.set(2.25, 0.35, 0); group.add(acceptor);

    const proton = sphere(THREE, 0.25, 0xffb06f); group.add(proton);
    const trail = [];
    for (let i = 0; i < 8; i++) {
      const dot = sphere(THREE, 0.045, 0xffc99f); dot.material.transparent = true; dot.material.opacity = 0.5;
      group.add(dot); trail.push(dot);
    }
    const donorTag = makeLabel(THREE, 'HCl → Cl⁻', { width: 330, height: 110, size: 37, scale: [1.0, 0.32, 1] });
    donorTag.position.set(-2.55, -1.25, 0.4); group.add(donorTag);
    const acceptorTag = makeLabel(THREE, 'H₂O → H₃O⁺', { width: 370, height: 110, size: 36, scale: [1.15, 0.32, 1] });
    acceptorTag.position.set(2.25, -1.25, 0.4); group.add(acceptorTag);
    const caption = makeLabel(THREE, spec.title || 'one proton changes both species', {
      width: 680, height: 110, size: 34, scale: [2.2, 0.36, 1]
    });
    caption.position.set(0, -2.05, 0.45); group.add(caption);
    group.userData.animate = (time) => {
      const phase = (Math.sin(time * 0.0014) + 1) / 2;
      const smooth = phase * phase * (3 - 2 * phase);
      proton.position.set(-1.72 + smooth * 3.25, 0.45 + Math.sin(smooth * Math.PI) * 0.8, Math.sin(smooth * Math.PI) * 0.3);
      trail.forEach((dot, index) => {
        const prior = Math.max(0, smooth - (index + 1) * 0.035);
        dot.position.set(-1.72 + prior * 3.25, 0.45 + Math.sin(prior * Math.PI) * 0.8, Math.sin(prior * Math.PI) * 0.3);
      });
      donor.rotation.y = Math.sin(time * 0.0004) * 0.16;
      acceptor.rotation.y = -Math.sin(time * 0.0004) * 0.16;
    };
    return 4.25;
  }

  function addWireBox(THREE, parent, x, color) {
    const box = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(2.65, 2.45, 2.25)),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.48 })
    );
    box.position.x = x; parent.add(box); return box;
  }

  function buildReactionCollisions(THREE, group) {
    const chambers = [
      { x: -1.65, speed: 0.48, color: 0x7e9dff, label: 'cool · fewer collisions' },
      { x: 1.65, speed: 1.18, color: 0xff9b68, label: 'warm · more collisions' }
    ];
    const particles = [];
    chambers.forEach((chamber, chamberIndex) => {
      addWireBox(THREE, group, chamber.x, chamber.color);
      for (let i = 0; i < 13; i++) {
        const mesh = sphere(THREE, 0.12, i % 2 ? 0xf2d16b : chamber.color);
        const local = new THREE.Vector3(
          (((i * 37 + chamberIndex * 11) % 23) / 22 - .5) * 2.15,
          (((i * 19 + chamberIndex * 7) % 17) / 16 - .5) * 1.9,
          (((i * 13 + chamberIndex * 5) % 19) / 18 - .5) * 1.7
        );
        mesh.position.copy(local).add(new THREE.Vector3(chamber.x, 0.25, 0)); group.add(mesh);
        const velocity = new THREE.Vector3(Math.sin(i * 1.7 + .4), Math.cos(i * 1.3 + .8), Math.sin(i * .9 + 1.2)).normalize().multiplyScalar(chamber.speed);
        particles.push({ mesh, velocity, chamber, local, flash: i % 5 === 0 });
      }
      const tag = makeLabel(THREE, chamber.label, { width: 430, height: 110, size: 34, scale: [1.32, 0.33, 1], border: chamberIndex ? 'rgba(255,155,104,.8)' : 'rgba(126,157,255,.8)' });
      tag.position.set(chamber.x, -1.55, 0.35); group.add(tag);
    });
    let previousTime = 0;
    group.userData.animate = (time) => {
      const dt = Math.min(0.035, previousTime ? (time - previousTime) / 1000 : 0.016); previousTime = time;
      particles.forEach((particle, index) => {
        particle.local.addScaledVector(particle.velocity, dt);
        if (Math.abs(particle.local.x) > 1.15) { particle.local.x = Math.sign(particle.local.x) * 1.15; particle.velocity.x *= -1; }
        if (Math.abs(particle.local.y) > 1.0) { particle.local.y = Math.sign(particle.local.y) * 1.0; particle.velocity.y *= -1; }
        if (Math.abs(particle.local.z) > 0.9) { particle.local.z = Math.sign(particle.local.z) * 0.9; particle.velocity.z *= -1; }
        particle.mesh.position.copy(particle.local).add(new THREE.Vector3(particle.chamber.x, 0.25, 0));
        particle.mesh.scale.setScalar(particle.flash ? 1 + Math.max(0, Math.sin(time * 0.006 + index)) * 0.25 : 1);
      });
    };
    return 4.1;
  }

  function makeUnitCube(THREE, size, color, opacity = 0.72) {
    const cube = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(size, size, size),
      new THREE.MeshStandardMaterial({ color, transparent: true, opacity, roughness: 0.38, metalness: 0.04 })
    );
    cube.add(body);
    cube.add(new THREE.LineSegments(
      new THREE.EdgesGeometry(body.geometry),
      new THREE.LineBasicMaterial({ color: 0xf6efe4, transparent: true, opacity: 0.46 })
    ));
    return cube;
  }

  function buildUnitCubeVolume(THREE, group) {
    const cubes = [];
    const spacing = 0.84;
    for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) for (let z = 0; z < 3; z++) {
      const cube = makeUnitCube(THREE, 0.76, [0x6e7fe7, 0x8b78db, 0xee9362][y], 0.68);
      cube.position.set((x - 1) * spacing, (y - 1) * spacing, (z - 1) * spacing);
      group.add(cube); cubes.push({ cube, layer: y });
    }
    const axisMaterial = new THREE.LineBasicMaterial({ color: 0xffc191, transparent: true, opacity: 0.52 });
    [[-1.55,-1.55,-1.55],[1.55,-1.55,-1.55],[-1.55,1.55,-1.55],[-1.55,-1.55,1.55]].forEach((p, index, points) => {
      if (!index) return;
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...points[0]), new THREE.Vector3(...p)]), axisMaterial));
    });
    const caption = makeLabel(THREE, spec.title || '3 × 3 × 3 = 27 unit cubes', {
      width: 650, height: 118, size: 38, scale: [2.18, 0.4, 1]
    });
    caption.position.set(0, -2.35, 0.45); group.add(caption);
    group.userData.animate = (time) => cubes.forEach(({ cube, layer }, index) => {
      const pulse = 1 + Math.max(0, Math.sin(time * 0.0025 - layer * 0.8 - index * 0.025)) * 0.035;
      cube.scale.setScalar(pulse);
    });
    return 3.35;
  }

  function addWireBoxSized(THREE, parent, position, size, color, opacity = 0.45) {
    const box = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(size[0], size[1], size[2])),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity })
    );
    box.position.set(position[0], position[1], position[2]); parent.add(box); return box;
  }

  function buildThermalLattice(THREE, group) {
    const particles = [];
    const samples = [
      { x: -2.0, spacing: 0.55, vibration: 0.035, color: 0x7e9dff, label: 'cool · close together' },
      { x: 2.0, spacing: 0.72, vibration: 0.13, color: 0xff9b68, label: 'hot · farther apart' }
    ];
    samples.forEach((sample, sampleIndex) => {
      addWireBoxSized(THREE, group, [sample.x, 0.25, 0], [2.45, 2.45, 1.75], sample.color);
      for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = 0; z < 2; z++) {
        const base = new THREE.Vector3(sample.x + x * sample.spacing, 0.25 + y * sample.spacing, (z - .5) * sample.spacing);
        const particle = sphere(THREE, 0.16, sample.color); particle.position.copy(base); group.add(particle);
        particles.push({ particle, base, vibration: sample.vibration, phase: particles.length * 0.73 });
      }
      const tag = makeLabel(THREE, sample.label, { width: 430, height: 110, size: 34, scale: [1.35, 0.33, 1], border: sampleIndex ? 'rgba(255,155,104,.8)' : 'rgba(126,157,255,.8)' });
      tag.position.set(sample.x, -1.55, 0.35); group.add(tag);
    });
    group.userData.animate = (time) => particles.forEach(({ particle, base, vibration, phase }) => {
      particle.position.set(
        base.x + Math.sin(time * 0.008 + phase) * vibration,
        base.y + Math.cos(time * 0.009 + phase * 1.3) * vibration,
        base.z + Math.sin(time * 0.011 + phase * .7) * vibration
      );
    });
    return 4.25;
  }

  function buildParticleStates(THREE, group) {
    const stateParticles = [];
    const states = [
      { kind: 'solid', x: -2.45, color: 0x7893e8 },
      { kind: 'liquid', x: 0, color: 0x72c9d4 },
      { kind: 'gas', x: 2.45, color: 0xee9362 }
    ];
    states.forEach((state, stateIndex) => {
      addWireBoxSized(THREE, group, [state.x, 0.25, 0], [1.9, 2.55, 1.75], state.color);
      for (let i = 0; i < 10; i++) {
        const particle = sphere(THREE, 0.13, state.color);
        let local;
        if (state.kind === 'solid') local = new THREE.Vector3((i % 2 - .5) * .55, (Math.floor(i / 2) % 5 - 2) * .42, (i % 3 - 1) * .3);
        else if (state.kind === 'liquid') local = new THREE.Vector3(((i * 7) % 9 / 8 - .5) * 1.25, -0.7 + Math.floor(i / 4) * .38, (((i * 5) % 7) / 6 - .5) * 1.1);
        else local = new THREE.Vector3((((i * 7) % 13) / 12 - .5) * 1.45, (((i * 11) % 17) / 16 - .5) * 2.0, (((i * 5) % 11) / 10 - .5) * 1.3);
        particle.position.copy(local).add(new THREE.Vector3(state.x, 0.25, 0)); group.add(particle);
        const velocity = new THREE.Vector3(Math.sin(i * 1.4), Math.cos(i * 1.1), Math.sin(i * .8 + .4)).normalize().multiplyScalar(state.kind === 'gas' ? 0.62 : 0.12);
        stateParticles.push({ particle, state, local, base: local.clone(), velocity, phase: i * .8 + stateIndex });
      }
      const tag = makeLabel(THREE, state.kind, { width: 260, height: 105, size: 41, scale: [0.78, 0.3, 1] });
      tag.position.set(state.x, -1.55, 0.35); group.add(tag);
    });
    let previousTime = 0;
    group.userData.animate = (time) => {
      const dt = Math.min(.035, previousTime ? (time - previousTime) / 1000 : .016); previousTime = time;
      stateParticles.forEach((entry) => {
        if (entry.state.kind === 'solid') entry.local.set(entry.base.x + Math.sin(time * .009 + entry.phase) * .025, entry.base.y + Math.cos(time * .01 + entry.phase) * .025, entry.base.z);
        else if (entry.state.kind === 'liquid') {
          entry.local.x = entry.base.x + Math.sin(time * .0013 + entry.phase) * .18;
          entry.local.z = entry.base.z + Math.cos(time * .0011 + entry.phase) * .14;
        } else {
          entry.local.addScaledVector(entry.velocity, dt);
          if (Math.abs(entry.local.x) > .76) entry.velocity.x *= -1;
          if (Math.abs(entry.local.y) > 1.05) entry.velocity.y *= -1;
          if (Math.abs(entry.local.z) > .68) entry.velocity.z *= -1;
          entry.local.x = Math.max(-.76, Math.min(.76, entry.local.x)); entry.local.y = Math.max(-1.05, Math.min(1.05, entry.local.y)); entry.local.z = Math.max(-.68, Math.min(.68, entry.local.z));
        }
        entry.particle.position.copy(entry.local).add(new THREE.Vector3(entry.state.x, .25, 0));
      });
    };
    return 4.35;
  }

  function buildIdealGasParticles(THREE, group) {
    addWireBoxSized(THREE, group, [0, .2, 0], [3.8, 3.4, 3.2], 0x8f9aef, .58);
    const particles = [];
    for (let i = 0; i < 28; i++) {
      const particle = sphere(THREE, 0.105, i % 3 ? 0x8fa2ff : 0xf2d16b);
      const local = new THREE.Vector3((((i * 17) % 29) / 28 - .5) * 3.25, (((i * 13) % 23) / 22 - .5) * 2.85, (((i * 11) % 19) / 18 - .5) * 2.65);
      particle.position.copy(local).add(new THREE.Vector3(0,.2,0)); group.add(particle);
      const velocity = new THREE.Vector3(Math.sin(i * 1.7 + .2), Math.cos(i * 1.23 + .7), Math.sin(i * .91 + 1.1)).normalize().multiplyScalar(.72);
      particles.push({ particle, local, velocity });
    }
    const caption = makeLabel(THREE, spec.title || 'tiny points · random motion · elastic collisions', { width: 720, height: 115, size: 33, scale: [2.4, .38, 1] });
    caption.position.set(0, -2.15, .4); group.add(caption);
    let previousTime = 0;
    group.userData.animate = (time) => {
      const dt = Math.min(.035, previousTime ? (time - previousTime) / 1000 : .016); previousTime = time;
      particles.forEach(({ particle, local, velocity }) => {
        local.addScaledVector(velocity, dt);
        if (Math.abs(local.x) > 1.76) { local.x = Math.sign(local.x) * 1.76; velocity.x *= -1; }
        if (Math.abs(local.y) > 1.55) { local.y = Math.sign(local.y) * 1.55; velocity.y *= -1; }
        if (Math.abs(local.z) > 1.42) { local.z = Math.sign(local.z) * 1.42; velocity.z *= -1; }
        particle.position.copy(local).add(new THREE.Vector3(0,.2,0));
      });
    };
    return 3.9;
  }

  function buildGasWallCollisions(THREE, group) {
    const hot = spec.hot === true;
    const color = hot ? 0xff9966 : 0x82a0ff;
    addWireBoxSized(THREE, group, [0,.2,0], [3.8,3.35,3.15], color, .62);
    const particles = [], flashes = [];
    for (let i = 0; i < 24; i++) {
      const particle = sphere(THREE, 0.12, i % 4 ? color : 0xf2d16b);
      const local = new THREE.Vector3((((i * 17) % 29) / 28 - .5) * 3.2, (((i * 13) % 23) / 22 - .5) * 2.75, (((i * 11) % 19) / 18 - .5) * 2.55);
      particle.position.copy(local).add(new THREE.Vector3(0,.2,0)); group.add(particle);
      const velocity = new THREE.Vector3(Math.sin(i * 1.5 + .3), Math.cos(i * 1.13 + .6), Math.sin(i * .83 + 1.4)).normalize().multiplyScalar(hot ? 1.18 : .68);
      particles.push({ particle, local, velocity });
    }
    for (let i = 0; i < 12; i++) {
      const flash = sphere(THREE, 0.16, 0xffe0a3); flash.material.transparent = true; flash.material.opacity = 0; group.add(flash);
      flashes.push({ mesh: flash, life: 0 });
    }
    const caption = makeLabel(THREE, spec.title || (hot ? 'hotter gas · faster, harder wall impacts' : 'every wall impact contributes to pressure'), { width: 740, height: 115, size: 32, scale: [2.45,.38,1], border: hot ? 'rgba(255,153,102,.82)' : 'rgba(130,160,255,.82)' });
    caption.position.set(0,-2.12,.4); group.add(caption);
    let previousTime = 0, flashIndex = 0;
    group.userData.animate = (time) => {
      const dt = Math.min(.035, previousTime ? (time - previousTime) / 1000 : .016); previousTime = time;
      particles.forEach(({ particle, local, velocity }) => {
        local.addScaledVector(velocity, dt); let impact = false;
        if (Math.abs(local.x) > 1.76) { local.x = Math.sign(local.x) * 1.76; velocity.x *= -1; impact = true; }
        if (Math.abs(local.y) > 1.52) { local.y = Math.sign(local.y) * 1.52; velocity.y *= -1; impact = true; }
        if (Math.abs(local.z) > 1.39) { local.z = Math.sign(local.z) * 1.39; velocity.z *= -1; impact = true; }
        particle.position.copy(local).add(new THREE.Vector3(0,.2,0));
        if (impact) { const flash = flashes[flashIndex++ % flashes.length]; flash.mesh.position.copy(particle.position); flash.life = 1; }
      });
      flashes.forEach((flash) => { flash.life = Math.max(0, flash.life - dt * 3.5); flash.mesh.material.opacity = flash.life * .72; flash.mesh.scale.setScalar(1 + (1 - flash.life) * 1.7); });
    };
    return 3.9;
  }

  function buildEntropyMicrostates(THREE, group) {
    const wanderers = [];
    addWireBoxSized(THREE, group, [-2.05,.25,0], [2.8,2.7,2.15], 0x8294e8);
    addWireBoxSized(THREE, group, [2.05,.25,0], [2.8,2.7,2.15], 0xee9362);
    for (let i = 0; i < 16; i++) {
      const ordered = sphere(THREE, .13, 0x8294e8);
      ordered.position.set(-2.05 + (i % 4 - 1.5) * .4, .25 + (Math.floor(i / 4) - 1.5) * .4, 0); group.add(ordered);
      const dispersed = sphere(THREE, .13, i % 3 ? 0xee9362 : 0xf2d16b);
      const base = new THREE.Vector3(2.05 + ((((i * 7) % 17) / 16) - .5) * 2.1, .25 + ((((i * 11) % 19) / 18) - .5) * 2.05, ((((i * 5) % 13) / 12) - .5) * 1.55);
      dispersed.position.copy(base); group.add(dispersed); wanderers.push({ dispersed, base, phase: i * .63 });
    }
    [['one ordered arrangement',-2.05],['many accessible arrangements',2.05]].forEach(([text,x],index) => {
      const tag = makeLabel(THREE, text, { width: 470, height: 110, size: 31, scale: [1.47,.33,1], border: index ? 'rgba(238,147,98,.82)' : 'rgba(130,148,232,.82)' });
      tag.position.set(x,-1.6,.4); group.add(tag);
    });
    group.userData.animate = (time) => wanderers.forEach(({ dispersed, base, phase }) => {
      dispersed.position.set(base.x + Math.sin(time * .0012 + phase) * .23, base.y + Math.cos(time * .0015 + phase * 1.2) * .2, base.z + Math.sin(time * .0017 + phase * .8) * .2);
    });
    return 4.4;
  }

  function buildAtom(THREE, group) {
    group.add(sphere(THREE, 0.45, 0xff79ac)); // nucleus
    const shells = spec.shells || [2, 8, 8];
    let maxR = 1;
    shells.forEach((count, si) => {
      const r = 1.3 + si * 1.05;
      maxR = r;
      group.add(new THREE.Mesh(
        new THREE.SphereGeometry(r, 24, 18),
        new THREE.MeshBasicMaterial({ color: 0x6f76a8, transparent: true, opacity: 0.07, wireframe: true })
      ));
      for (let k = 0; k < count; k++) {
        const y = 1 - ((k + 0.5) / count) * 2;
        const rad = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = Math.PI * (1 + Math.sqrt(5)) * k;
        const e = sphere(THREE, 0.13, 0x454ade);
        e.position.set(Math.cos(theta) * rad * r, y * r, Math.sin(theta) * rad * r);
        group.add(e);
      }
    });
    return maxR + 0.6;
  }

  function buildLattice(THREE, group) {
    const size = spec.size || 3;
    const sp = 1.25;
    const ra = el(spec.a), rb = el(spec.b);
    const off = (size - 1) / 2;
    for (let i = 0; i < size; i++)
      for (let j = 0; j < size; j++)
        for (let k = 0; k < size; k++) {
          const isA = (i + j + k) % 2 === 0;
          const m = sphere(THREE, isA ? 0.40 : 0.52, (isA ? ra : rb).color);
          m.position.set((i - off) * sp, (j - off) * sp, (k - off) * sp);
          group.add(m);
        }
    return off * sp * 1.8 + 1;
  }

  function makeParticle(THREE, type = 'proton', radius = 0.28) {
    const isProton = type === 'proton';
    const p = sphere(THREE, radius, isProton ? 0xee9362 : 0x9aa0ff);
    p.add(makeLabel(THREE, isProton ? '+' : 'n', {
      width: 128,
      height: 128,
      bg: 'rgba(0,0,0,0)',
      border: 'rgba(0,0,0,0)',
      fg: '#fff8ef',
      size: 70,
      scale: [0.2, 0.2, 1]
    }));
    return p;
  }

  function clusterPositions(THREE, count, radius = 0.58) {
    const pts = [];
    if (count <= 1) return [new THREE.Vector3(0, 0, 0)];
    for (let i = 0; i < count; i++) {
      const y = 1 - ((i + 0.5) / count) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push(new THREE.Vector3(
        Math.cos(theta) * rad * radius,
        y * radius,
        Math.sin(theta) * rad * radius
      ));
    }
    return pts;
  }

  function buildNucleus(THREE, group) {
    const nucleus = new THREE.Group();
    group.add(nucleus);
    const protons = spec.protons || 6;
    const neutrons = spec.neutrons ?? protons;
    const total = protons + neutrons;
    clusterPositions(THREE, total, Math.min(0.95, 0.38 + total * 0.035)).forEach((pos, i) => {
      const particle = makeParticle(THREE, i < protons ? 'proton' : 'neutron', 0.27);
      particle.position.copy(pos);
      nucleus.add(particle);
    });

    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(1.22, 36, 24),
      new THREE.MeshBasicMaterial({ color: 0xee9362, transparent: true, opacity: 0.06, wireframe: true })
    );
    group.add(shell);

    const title = makeLabel(THREE, spec.title || `${protons} protons + ${neutrons} neutrons`, {
      width: 720,
      height: 140,
      border: 'rgba(238, 147, 98, 0.72)',
      size: 38,
      scale: [2.0, 0.4, 1]
    });
    title.position.set(0, -1.8, 0);
    group.add(title);

    group.userData.animate = (t) => {
      nucleus.rotation.y = t * 0.0008;
      nucleus.rotation.x = Math.sin(t * 0.0007) * 0.18;
      shell.rotation.y = -t * 0.0004;
    };
    return 2.4;
  }

  function buildElectricAttraction(THREE, group) {
    const nucleus = sphere(THREE, 0.52, 0xee9362);
    group.add(nucleus);
    nucleus.add(makeLabel(THREE, '+ nucleus', {
      width: 360,
      height: 130,
      bg: 'rgba(0,0,0,0)',
      border: 'rgba(0,0,0,0)',
      fg: '#fff8ef',
      size: 44,
      scale: [0.9, 0.32, 1]
    }));

    const cloud = new THREE.Group();
    group.add(cloud);
    const electronMat = new THREE.MeshStandardMaterial({
      color: 0x8ee6c7,
      roughness: 0.35,
      emissive: 0x1d6b59,
      emissiveIntensity: 0.42
    });
    const electronGeo = new THREE.SphereGeometry(0.12, 24, 16);
    const electrons = [];
    [0, 1, 2, 3, 4, 5].forEach((i) => {
      const e = new THREE.Mesh(electronGeo, electronMat);
      const a = (i / 6) * Math.PI * 2;
      e.position.set(Math.cos(a) * 1.75, Math.sin(a * 1.7) * 0.72, Math.sin(a) * 1.75);
      cloud.add(e);
      electrons.push({ mesh: e, phase: a });
    });

    const lineMat = new THREE.LineBasicMaterial({ color: 0x8ee6c7, transparent: true, opacity: 0.42 });
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const p = new THREE.Vector3(Math.cos(a) * 1.55, Math.sin(a * 2) * 0.5, Math.sin(a) * 1.55);
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([p, new THREE.Vector3(0, 0, 0)]), lineMat));
    }

    const title = makeLabel(THREE, spec.title || '+ attracts -', {
      width: 520,
      height: 140,
      border: 'rgba(142, 230, 199, 0.7)',
      fg: '#e8fff8',
      size: 46,
      scale: [1.45, 0.38, 1]
    });
    title.position.set(0, -2.05, 0);
    group.add(title);

    group.userData.animate = (t) => {
      cloud.rotation.y = t * 0.001;
      cloud.rotation.z = Math.sin(t * 0.0006) * 0.14;
      electrons.forEach(({ mesh, phase }) => {
        mesh.scale.setScalar(1 + Math.sin(t * 0.004 + phase) * 0.12);
      });
    };
    return 2.6;
  }

  function buildField(THREE, group) {
    // Electric field of point charges (default: a dipole). Field lines and
    // vectors fill 3D space, arrow length shows the inverse-square falloff, and
    // a positive test charge rides a line from + to −.
    const raw = (spec.charges && spec.charges.length) ? spec.charges
      : [{ x: -1.5, q: 1 }, { x: 1.5, q: -1 }];
    const charges = raw.map((c) => ({ pos: new THREE.Vector3(c.x || 0, c.y || 0, c.z || 0), q: c.q }));
    const POS = 0xee9362, NEG = 0x7fb2e6, VEC = 0xc99a6a;

    const fieldAt = (p) => {
      const E = new THREE.Vector3();
      for (const c of charges) {
        const d = new THREE.Vector3().subVectors(p, c.pos);
        const r = d.length();
        if (r > 0.05) E.addScaledVector(d, c.q / (r * r * r));
      }
      return E;
    };

    for (const c of charges) {
      const s = sphere(THREE, 0.34, c.q > 0 ? POS : NEG);
      s.material.emissive = new THREE.Color(c.q > 0 ? 0x7a3418 : 0x1c3d63);
      s.material.emissiveIntensity = 0.5;
      s.position.copy(c.pos);
      group.add(s);
      const glyph = makeLabel(THREE, c.q > 0 ? '+' : '−', {
        width: 120, height: 120, bg: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)', fg: '#fff8ef', size: 96, scale: [0.55, 0.55, 1]
      });
      glyph.position.set(0, 0.52, 0);
      s.add(glyph);
    }

    // Field lines seeded evenly around each + charge, integrated along E.
    const lineMat = new THREE.LineBasicMaterial({ color: 0xbfa07f, transparent: true, opacity: 0.5 });
    for (const c of charges.filter((x) => x.q > 0)) {
      const N = 16;
      for (let i = 0; i < N; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / N);
        const th = Math.PI * (1 + Math.sqrt(5)) * i;
        const dir = new THREE.Vector3(Math.sin(phi) * Math.cos(th), Math.sin(phi) * Math.sin(th), Math.cos(phi));
        let p = c.pos.clone().addScaledVector(dir, 0.42);
        const pts = [p.clone()];
        for (let s = 0; s < 120; s++) {
          const E = fieldAt(p); const len = E.length();
          if (len < 1e-4) break;
          p = p.clone().addScaledVector(E.multiplyScalar(1 / len), 0.11);
          pts.push(p.clone());
          if (p.length() > 4.6 || charges.some((n) => n.q < 0 && p.distanceTo(n.pos) < 0.36)) break;
        }
        if (pts.length > 2) group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
      }
    }

    // Field vectors on three planes; arrow length encodes |E| (inverse-square).
    for (const zc of [-1, 0, 1]) {
      for (let ix = -1; ix <= 1; ix++) {
        for (let iy = -1; iy <= 1; iy++) {
          const p = new THREE.Vector3(ix * 1.5, iy * 1.5, zc * 0.95);
          if (charges.some((c) => p.distanceTo(c.pos) < 0.75)) continue;
          const E = fieldAt(p); const len = E.length();
          if (len < 0.015) continue;
          const L = Math.min(0.6, 0.16 + len * 0.7);
          group.add(new THREE.ArrowHelper(E.multiplyScalar(1 / len), p, L, VEC, L * 0.42, L * 0.28));
        }
      }
    }

    // A positive test charge riding a field line from + to −.
    const src = charges.find((c) => c.q > 0) || charges[0];
    const path = [];
    let tp = src.pos.clone().add(new THREE.Vector3(0.42, 0.03, 0.02));
    for (let s = 0; s < 260; s++) {
      const E = fieldAt(tp); const len = E.length(); if (len < 1e-4) break;
      tp = tp.clone().addScaledVector(E.multiplyScalar(1 / len), 0.05);
      path.push(tp.clone());
      if (tp.length() > 4.6 || charges.some((n) => n.q < 0 && tp.distanceTo(n.pos) < 0.34)) break;
    }
    const test = sphere(THREE, 0.135, 0xffd27a);
    test.material.emissive = new THREE.Color(0x8a5a12); test.material.emissiveIntensity = 0.7;
    if (path.length) test.position.copy(path[0]);
    group.add(test);

    const title = makeLabel(THREE, spec.title || 'the field fills the space', {
      width: 560, height: 140, border: 'rgba(217, 160, 106, 0.7)', fg: '#f6efe4', size: 44, scale: [1.55, 0.4, 1]
    });
    title.position.set(0, -2.35, 0);
    group.add(title);

    group.userData.animate = (t) => {
      if (path.length > 1) {
        const f = (t * 0.00013) % 1;
        test.position.copy(path[Math.min(path.length - 1, Math.floor(f * path.length))]);
      }
    };
    return 3.3;
  }

  function buildVectors(THREE, group) {
    // 3D vector scene with three modes: 'add' (resultant + parallelogram),
    // 'cross' (a×b perpendicular to both), 'components' (split into x/y/z).
    const mode = spec.mode || 'add';
    const AX = 0xcf6a4c, AY = 0x9ba86b, AZ = 0x6e8fd6;         // x / y / z axes
    const A_COL = 0xee9362, B_COL = 0x59b6a2, R_COL = 0xffce7d; // a / b / result
    const hexStr = (c) => '#' + c.toString(16).padStart(6, '0');

    const grid = new THREE.GridHelper(6, 6, 0x715f4d, 0x453a2d);
    grid.material.transparent = true; grid.material.opacity = 0.4;
    group.add(grid);

    group.add(sphere(THREE, 0.085, 0xf6efe4)); // origin
    const axLen = 2.7;
    [[new THREE.Vector3(1, 0, 0), AX, 'x'], [new THREE.Vector3(0, 1, 0), AY, 'y'], [new THREE.Vector3(0, 0, 1), AZ, 'z']].forEach(([dir, col, name]) => {
      const ah = new THREE.ArrowHelper(dir, new THREE.Vector3(), axLen, col, 0.16, 0.1);
      ah.line.material.transparent = true; ah.line.material.opacity = 0.55;
      ah.cone.material.transparent = true; ah.cone.material.opacity = 0.7;
      group.add(ah);
      const lbl = makeLabel(THREE, name, { width: 96, height: 96, bg: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)', fg: hexStr(col), size: 64, scale: [0.34, 0.34, 1] });
      lbl.position.copy(dir.clone().multiplyScalar(axLen + 0.24));
      group.add(lbl);
    });

    const vec = (to, color, from = new THREE.Vector3(), opacity = 1, head = 0.26) => {
      const d = new THREE.Vector3().subVectors(to, from); const len = d.length();
      if (len < 1e-4) return null;
      const ah = new THREE.ArrowHelper(d.multiplyScalar(1 / len), from, len, color, head, head * 0.6);
      [ah.line.material, ah.cone.material].forEach((m) => { m.transparent = true; m.opacity = opacity; });
      group.add(ah); return ah;
    };
    const tag = (text, at, color) => {
      const t = makeLabel(THREE, text, { width: 176, height: 96, bg: 'rgba(14,13,18,0.82)', border: hexStr(color), fg: '#f6efe4', size: 52, scale: [0.58, 0.31, 1] });
      t.position.copy(at); group.add(t);
    };
    const paraFill = (a, b, color, opacity) => {
      const ab = new THREE.Vector3().addVectors(a, b);
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute([
        0, 0, 0, a.x, a.y, a.z, ab.x, ab.y, ab.z,
        0, 0, 0, ab.x, ab.y, ab.z, b.x, b.y, b.z
      ], 3));
      group.add(new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide })));
    };

    let travel = null;
    const dot = sphere(THREE, 0.11, 0xfff0d4);
    dot.material.emissive = new THREE.Color(0x7a5a1a); dot.material.emissiveIntensity = 0.6;
    group.add(dot);

    if (mode === 'cross') {
      const a = new THREE.Vector3(1.9, 0.35, 0.9), b = new THREE.Vector3(0.5, 1.7, -0.6);
      const c = new THREE.Vector3().crossVectors(a, b);
      if (c.length() > 2.6) c.setLength(2.6);
      paraFill(a, b, R_COL, 0.16);
      vec(a, A_COL); vec(b, B_COL); vec(c, R_COL, new THREE.Vector3(), 1, 0.3);
      tag('a', a.clone().multiplyScalar(0.6).add(new THREE.Vector3(0.1, 0.2, 0)), A_COL);
      tag('b', b.clone().multiplyScalar(0.6).add(new THREE.Vector3(0.1, 0.2, 0)), B_COL);
      tag('a × b', c.clone().multiplyScalar(1.04).add(new THREE.Vector3(0, 0.2, 0)), R_COL);
      travel = [new THREE.Vector3(), c.clone()];
    } else if (mode === 'components') {
      const v = new THREE.Vector3(1.8, 1.5, 1.15);
      const px = new THREE.Vector3(v.x, 0, 0), pxy = new THREE.Vector3(v.x, v.y, 0);
      vec(px, AX, new THREE.Vector3(), 0.95, 0.18);
      vec(pxy, AY, px, 0.95, 0.18);
      vec(v, AZ, pxy, 0.95, 0.18);
      vec(v, R_COL, new THREE.Vector3(), 1, 0.28);
      addWireBoxSized(THREE, group, [v.x / 2, v.y / 2, v.z / 2], [v.x, v.y, v.z], 0x8a7a63, 0.42);
      tag('vx', new THREE.Vector3(v.x / 2, -0.22, 0), AX);
      tag('vy', new THREE.Vector3(v.x + 0.18, v.y / 2, 0), AY);
      tag('vz', new THREE.Vector3(v.x + 0.34, v.y - 0.12, v.z / 2), AZ);
      tag('v', v.clone().multiplyScalar(1.05).add(new THREE.Vector3(0, 0.42, 0)), R_COL);
      travel = [new THREE.Vector3(), px.clone(), pxy.clone(), v.clone()];
    } else {
      const a = new THREE.Vector3(2.0, 0.55, 0.4), b = new THREE.Vector3(0.5, 1.85, 1.35);
      const r = new THREE.Vector3().addVectors(a, b);
      paraFill(a, b, R_COL, 0.12);
      vec(a, A_COL); vec(b, B_COL);
      vec(r, B_COL, a.clone(), 0.4);
      vec(r, A_COL, b.clone(), 0.4);
      vec(r, R_COL, new THREE.Vector3(), 1, 0.3);
      tag('a', a.clone().multiplyScalar(0.55).add(new THREE.Vector3(0.05, -0.22, 0)), A_COL);
      tag('b', b.clone().multiplyScalar(0.55).add(new THREE.Vector3(-0.28, 0.1, 0)), B_COL);
      tag('a + b', r.clone().multiplyScalar(0.62).add(new THREE.Vector3(0.18, 0.15, 0)), R_COL);
      travel = [new THREE.Vector3(), a.clone(), r.clone()];
    }

    const caption = makeLabel(THREE, spec.title || (mode === 'cross' ? 'a × b is perpendicular to both' : mode === 'components' ? 'v = vx + vy + vz' : 'a + b closes the parallelogram'), {
      width: 640, height: 120, size: 40, scale: [2.05, 0.4, 1]
    });
    caption.position.set(0, -2.55, 0); group.add(caption);

    group.userData.animate = (t) => {
      if (!travel || travel.length < 2) return;
      const segs = travel.length - 1;
      const f = ((t * 0.00016) % 1) * segs;
      const i = Math.min(segs - 1, Math.floor(f));
      dot.position.lerpVectors(travel[i], travel[i + 1], f - i);
    };
    return 4.1;
  }

  function buildWaves(THREE, group) {
    // Waves in 3D. Modes: 'traveling' (pattern moves, medium bobs), 'standing'
    // (fixed nodes, swinging antinodes), 'interference' (two-source surface).
    const mode = spec.mode || 'traveling';
    const WAVE = 0xee9362, ACCENT = 0xffce7d, NODE = 0x6e8fd6, SRC = 0x59b6a2, GUIDE = 0x8a7a63;

    if (mode === 'interference') {
      const S = 6, seg = 56;
      const geo = new THREE.PlaneGeometry(S, S, seg, seg);
      geo.rotateX(-Math.PI / 2);
      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: WAVE, roughness: 0.55, metalness: 0.08, side: THREE.DoubleSide }));
      group.add(mesh);
      const s1 = { x: -1.5, z: 0 }, s2 = { x: 1.5, z: 0 };
      const src1 = sphere(THREE, 0.16, SRC), src2 = sphere(THREE, 0.16, SRC);
      src1.position.set(s1.x, 0, s1.z); src2.position.set(s2.x, 0, s2.z); group.add(src1); group.add(src2);
      const pos = geo.attributes.position, bx = [], bz = [];
      for (let i = 0; i < pos.count; i++) { bx.push(pos.getX(i)); bz.push(pos.getZ(i)); }
      const k = 5.0, w = 0.006, amp = 0.32;
      group.userData.animate = (t) => {
        for (let i = 0; i < pos.count; i++) {
          const r1 = Math.hypot(bx[i] - s1.x, bz[i] - s1.z), r2 = Math.hypot(bx[i] - s2.x, bz[i] - s2.z);
          pos.setY(i, amp * (Math.sin(k * r1 - w * t) / (1 + r1 * 0.4) + Math.sin(k * r2 - w * t) / (1 + r2 * 0.4)));
        }
        pos.needsUpdate = true; geo.computeVertexNormals();
        src1.position.y = amp; src2.position.y = amp;
      };
      const caption = makeLabel(THREE, spec.title || 'two sources interfere', { width: 560, height: 116, size: 40, scale: [1.9, 0.4, 1] });
      caption.position.set(0, -2.1, 0); group.add(caption);
      return 4.7;
    }

    const N = mode === 'standing' ? 140 : 170;
    const L = mode === 'standing' ? 4.2 : 5.2, amp = 0.9;
    const xs = [];
    for (let i = 0; i < N; i++) xs.push(-L / 2 + (i / (N - 1)) * L);
    const geo = new THREE.BufferGeometry().setFromPoints(xs.map((x) => new THREE.Vector3(x, 0, 0)));
    group.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: WAVE })));
    const pos = geo.attributes.position;
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-L / 2, 0, 0), new THREE.Vector3(L / 2, 0, 0)]),
      new THREE.LineBasicMaterial({ color: GUIDE, transparent: true, opacity: 0.4 })));

    if (mode === 'standing') {
      const harmonic = spec.harmonic || 3;
      const k = harmonic * Math.PI / L;
      for (let n = 0; n <= harmonic; n++) {
        const m = sphere(THREE, 0.1, NODE); m.position.set(-L / 2 + n * L / harmonic, 0, 0); group.add(m);
      }
      for (const sgn of [1, -1]) {
        const env = xs.map((x) => new THREE.Vector3(x, sgn * amp * Math.abs(Math.sin(k * (x + L / 2))), 0));
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(env), new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.35 })));
      }
      group.userData.animate = (t) => {
        const c = Math.cos(0.004 * t);
        for (let i = 0; i < N; i++) pos.setY(i, amp * Math.sin(k * (xs[i] + L / 2)) * c);
        pos.needsUpdate = true;
      };
      const caption = makeLabel(THREE, spec.title || 'nodes stay still; antinodes swing', { width: 640, height: 116, size: 38, scale: [2.0, 0.4, 1] });
      caption.position.set(0, -1.9, 0); group.add(caption);
      return 3.5;
    }

    const k = 2.4, w = 0.005;
    const particle = sphere(THREE, 0.17, ACCENT);
    particle.material.emissive = new THREE.Color(0x7a5a1a); particle.material.emissiveIntensity = 0.5; group.add(particle);
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -amp, 0), new THREE.Vector3(0, amp, 0)]),
      new THREE.LineBasicMaterial({ color: GUIDE, transparent: true, opacity: 0.35 })));
    const lambda = 2 * Math.PI / k, yb = amp + 0.4;
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-lambda / 2, yb, 0), new THREE.Vector3(lambda / 2, yb, 0)]),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.6 })));
    for (const sx of [-lambda / 2, lambda / 2]) {
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(sx, yb - 0.12, 0), new THREE.Vector3(sx, yb + 0.12, 0)]),
        new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.6 })));
    }
    const lam = makeLabel(THREE, 'λ', { width: 90, height: 90, bg: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)', fg: '#ffce7d', size: 62, scale: [0.4, 0.4, 1] });
    lam.position.set(0, yb + 0.3, 0); group.add(lam);
    group.userData.animate = (t) => {
      for (let i = 0; i < N; i++) pos.setY(i, amp * Math.sin(k * xs[i] - w * t));
      pos.needsUpdate = true;
      particle.position.set(0, amp * Math.sin(-w * t), 0);
    };
    const caption = makeLabel(THREE, spec.title || 'the wave travels; the dot bobs in place', { width: 760, height: 116, size: 36, scale: [2.3, 0.36, 1] });
    caption.position.set(0, -1.7, 0); group.add(caption);
    return 3.7;
  }

  function buildSolid(THREE, group) {
    // Solid of revolution: a profile curve revolved about the vertical axis,
    // with a sliding disk (the disk method) and a sweeping ghost of the curve.
    const shape = spec.shape || 'paraboloid';
    const SURF = 0xee9362, CURVE = 0xffce7d, DISK = 0x6e8fd6, AXIS = 0x8a7a63;
    const H = 2.4, R = 1.5, M = 64, Rs = H / 2;
    const rOf = (y) => {
      const u = y / H;
      if (shape === 'cone') return R * (1 - u);
      if (shape === 'sphere') return Math.sqrt(Math.max(0, Rs * Rs - (y - H / 2) * (y - H / 2)));
      if (shape === 'vase') return 0.34 * R + 0.55 * R * (0.5 + 0.5 * Math.sin(u * Math.PI * 1.6 - 0.3));
      return R * Math.sqrt(u); // paraboloid (revolve y = (r/R)^2)
    };
    const prof2 = [], prof3 = [];
    for (let i = 0; i <= M; i++) {
      const y = (i / M) * H, r = Math.max(0.0006, rOf(y));
      prof2.push(new THREE.Vector2(r, y - H / 2));
      prof3.push(new THREE.Vector3(r, y - H / 2, 0));
    }
    const lathe = new THREE.LatheGeometry(prof2, 48);
    group.add(new THREE.Mesh(lathe, new THREE.MeshStandardMaterial({ color: SURF, roughness: 0.5, metalness: 0.1, transparent: true, opacity: 0.5, side: THREE.DoubleSide })));
    group.add(new THREE.LineSegments(new THREE.WireframeGeometry(lathe), new THREE.LineBasicMaterial({ color: SURF, transparent: true, opacity: 0.14 })));
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -H / 2 - 0.35, 0), new THREE.Vector3(0, H / 2 + 0.35, 0)]),
      new THREE.LineBasicMaterial({ color: AXIS, transparent: true, opacity: 0.6 })));
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(prof3), new THREE.LineBasicMaterial({ color: CURVE })));
    const ghostPivot = new THREE.Group();
    ghostPivot.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(prof3), new THREE.LineBasicMaterial({ color: CURVE, transparent: true, opacity: 0.5 })));
    group.add(ghostPivot);
    const disk = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.1, 44), new THREE.MeshStandardMaterial({ color: DISK, transparent: true, opacity: 0.55, roughness: 0.4 }));
    group.add(disk);
    const axl = makeLabel(THREE, 'axis', { width: 150, height: 84, bg: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)', fg: '#c9b79a', size: 44, scale: [0.6, 0.32, 1] });
    axl.position.set(0, H / 2 + 0.62, 0); group.add(axl);
    const caption = makeLabel(THREE, spec.title || 'spin a curve to sweep a solid', { width: 620, height: 116, size: 40, scale: [2.0, 0.4, 1] });
    caption.position.set(0, -H / 2 - 0.9, 0); group.add(caption);
    group.userData.animate = (t) => {
      ghostPivot.rotation.y = (t * 0.0015) % (Math.PI * 2);
      const yy = (0.5 + 0.5 * Math.sin(t * 0.0011)) * H, rd = Math.max(0.02, rOf(yy));
      disk.position.y = yy - H / 2;
      disk.scale.set(rd, 1, rd);
    };
    return 3.7;
  }

  function buildIsotopes(THREE, group) {
    const isotopes = spec.isotopes || [
      { label: 'C-12', protons: 6, neutrons: 6 },
      { label: 'C-13', protons: 6, neutrons: 7 },
      { label: 'C-14', protons: 6, neutrons: 8 }
    ];
    const row = new THREE.Group();
    group.add(row);
    isotopes.forEach((iso, idx) => {
      const mini = new THREE.Group();
      mini.position.set((idx - 1) * 1.7, 0.18, 0);
      row.add(mini);
      const total = iso.protons + iso.neutrons;
      clusterPositions(THREE, total, 0.52).forEach((pos, i) => {
        const particle = makeParticle(THREE, i < iso.protons ? 'proton' : 'neutron', 0.18);
        particle.position.copy(pos);
        mini.add(particle);
      });
      const tag = makeLabel(THREE, iso.label, {
        width: 260,
        height: 120,
        border: 'rgba(246, 239, 228, 0.32)',
        size: 42,
        scale: [0.72, 0.3, 1]
      });
      tag.position.set(mini.position.x, -1.12, 0);
      group.add(tag);
    });

    const title = makeLabel(THREE, spec.title || 'same element, different mass', {
      width: 760,
      height: 140,
      border: 'rgba(238, 147, 98, 0.72)',
      size: 38,
      scale: [2.2, 0.38, 1]
    });
    title.position.set(0, 1.45, 0);
    group.add(title);

    group.userData.animate = (t) => {
      row.rotation.y = Math.sin(t * 0.0007) * 0.32;
      row.children.forEach((child, i) => {
        child.rotation.y = t * (0.00045 + i * 0.00008);
      });
    };
    return 3.0;
  }

  function arrow(THREE, from, to, color = 0xee9362) {
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = dir.length();
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.45, emissive: color, emissiveIntensity: 0.15 });
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, Math.max(0.1, len - 0.28), 16), mat);
    shaft.position.copy(from).add(to).multiplyScalar(0.5);
    shaft.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.32, 24), mat);
    head.position.copy(to).add(dir.clone().normalize().multiplyScalar(-0.12));
    head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    const g = new THREE.Group();
    g.add(shaft);
    g.add(head);
    return g;
  }

  function buildIonicTransfer(THREE, group) {
    const left = new THREE.Group();
    const right = new THREE.Group();
    left.position.set(-1.45, 0.15, 0);
    right.position.set(1.45, 0.15, 0);
    group.add(left);
    group.add(right);

    left.add(sphere(THREE, 0.52, el(spec.from || 'Na').color));
    right.add(sphere(THREE, 0.72, el(spec.to || 'Cl').color));
    left.add(new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.018, 12, 96), new THREE.MeshBasicMaterial({ color: 0x9aa0ff, transparent: true, opacity: 0.35 })));
    right.add(new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.018, 12, 96), new THREE.MeshBasicMaterial({ color: 0x8ee6c7, transparent: true, opacity: 0.35 })));

    const electron = sphere(THREE, 0.13, 0x8ee6c7);
    group.add(electron);
    const path = arrow(THREE, new THREE.Vector3(-0.72, 0.92, 0), new THREE.Vector3(0.72, 0.92, 0), 0x8ee6c7);
    group.add(path);

    const labels = [
      [spec.fromLabel || 'Na', -1.45, -1.15, 'rgba(154, 160, 255, 0.55)'],
      [spec.toLabel || 'Cl', 1.45, -1.15, 'rgba(142, 230, 199, 0.55)'],
      [spec.product || 'Na+ + Cl-', 0, -1.85, 'rgba(238, 147, 98, 0.72)']
    ];
    labels.forEach(([text, x, y, border]) => {
      const tag = makeLabel(THREE, text, { width: 360, height: 125, border, size: 42, scale: [0.9, 0.3, 1] });
      tag.position.set(x, y, 0);
      group.add(tag);
    });

    group.userData.animate = (t) => {
      const p = (Math.sin(t * 0.0014) + 1) / 2;
      electron.position.set(-0.95 + p * 1.9, 0.92 + Math.sin(p * Math.PI) * 0.28, 0.12);
      left.rotation.y = t * 0.00035;
      right.rotation.y = -t * 0.0003;
    };
    return 2.8;
  }

  function buildCovalentShare(THREE, group) {
    const pairs = spec.pairs || 1;
    const atomColor = el(spec.atom || 'O').color;
    const a = new THREE.Vector3(-0.88, 0.08, 0);
    const b = new THREE.Vector3(0.88, 0.08, 0);
    const atomA = sphere(THREE, 0.58, atomColor);
    const atomB = sphere(THREE, 0.58, atomColor);
    atomA.position.copy(a);
    atomB.position.copy(b);
    group.add(atomA);
    group.add(atomB);

    for (let i = 0; i < pairs; i++) {
      const off = (i - (pairs - 1) / 2) * 0.24;
      group.add(bond(THREE, new THREE.Vector3(-0.5, off + 0.08, 0), new THREE.Vector3(0.5, off + 0.08, 0)));
    }

    const shared = new THREE.Group();
    group.add(shared);
    const electrons = [];
    for (let i = 0; i < pairs * 2; i++) {
      const e = sphere(THREE, 0.11, 0x8ee6c7);
      shared.add(e);
      electrons.push(e);
    }

    const title = makeLabel(THREE, spec.title || `${pairs} shared pair${pairs > 1 ? 's' : ''}`, {
      width: 620,
      height: 140,
      border: 'rgba(142, 230, 199, 0.7)',
      fg: '#e8fff8',
      size: 42,
      scale: [1.65, 0.38, 1]
    });
    title.position.set(0, -1.55, 0);
    group.add(title);

    group.userData.animate = (t) => {
      electrons.forEach((e, i) => {
        const pair = Math.floor(i / 2);
        const side = i % 2 === 0 ? -1 : 1;
        const phase = t * 0.0025 + pair * 0.9;
        e.position.set(Math.cos(phase) * 0.16, 0.18 + (pair - (pairs - 1) / 2) * 0.34 + side * 0.08, Math.sin(phase) * 0.28);
      });
      shared.rotation.y = Math.sin(t * 0.0007) * 0.22;
    };
    return 2.25;
  }

  function buildMetallicSea(THREE, group) {
    const ionMat = new THREE.MeshStandardMaterial({ color: 0xee9362, roughness: 0.42, metalness: 0.12 });
    const electronMat = new THREE.MeshStandardMaterial({ color: 0x8ee6c7, roughness: 0.3, emissive: 0x1d6b59, emissiveIntensity: 0.45 });
    const ions = new THREE.Group();
    group.add(ions);
    for (let x = -2; x <= 2; x++) {
      for (let y = -1; y <= 1; y++) {
        const ion = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 18), ionMat);
        ion.position.set(x * 0.7, y * 0.62, (x + y) % 2 === 0 ? 0.08 : -0.08);
        ions.add(ion);
        const plus = makeLabel(THREE, '+', { width: 96, height: 96, bg: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)', size: 58, scale: [0.16, 0.16, 1] });
        plus.position.copy(ion.position).add(new THREE.Vector3(0, 0, 0.21));
        ions.add(plus);
      }
    }

    const electrons = [];
    for (let i = 0; i < 18; i++) {
      const e = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), electronMat);
      group.add(e);
      electrons.push({ mesh: e, phase: i * 0.7, lane: i % 5 });
    }

    const title = makeLabel(THREE, spec.title || 'mobile electrons hold metal together', {
      width: 780,
      height: 140,
      border: 'rgba(238, 147, 98, 0.72)',
      size: 36,
      scale: [2.25, 0.38, 1]
    });
    title.position.set(0, -1.8, 0);
    group.add(title);

    group.userData.animate = (t) => {
      ions.rotation.y = Math.sin(t * 0.00045) * 0.22;
      electrons.forEach(({ mesh, phase, lane }) => {
        const x = ((t * 0.0012 + phase) % 4.8) - 2.4;
        mesh.position.set(x, -0.75 + lane * 0.36 + Math.sin(t * 0.002 + phase) * 0.06, 0.38 + Math.cos(t * 0.001 + phase) * 0.18);
      });
    };
    return 3.0;
  }

  function buildPolarity(THREE, group) {
    const water = new THREE.Group();
    water.position.set(-1.45, 0.22, 0);
    group.add(water);
    const o = sphere(THREE, 0.36, el('O').color);
    water.add(o);
    const h1 = new THREE.Vector3(-0.55, -0.56, 0);
    const h2 = new THREE.Vector3(0.55, -0.56, 0);
    [h1, h2].forEach((p) => {
      const h = sphere(THREE, 0.2, el('H').color);
      h.position.copy(p);
      water.add(h);
      water.add(bond(THREE, new THREE.Vector3(0, 0, 0), p));
    });
    water.add(arrow(THREE, new THREE.Vector3(0, -0.92, 0.2), new THREE.Vector3(0, 0.62, 0.2), 0x8ee6c7));

    const co2 = new THREE.Group();
    co2.position.set(1.45, 0.2, 0);
    group.add(co2);
    const c = sphere(THREE, 0.32, el('C').color);
    co2.add(c);
    [-0.72, 0.72].forEach((x) => {
      const oxygen = sphere(THREE, 0.34, el('O').color);
      oxygen.position.set(x, 0, 0);
      co2.add(oxygen);
      co2.add(bond(THREE, new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, 0, 0)));
    });
    co2.add(arrow(THREE, new THREE.Vector3(-0.12, 0.42, 0.2), new THREE.Vector3(-0.7, 0.42, 0.2), 0x9aa0ff));
    co2.add(arrow(THREE, new THREE.Vector3(0.12, -0.42, 0.2), new THREE.Vector3(0.7, -0.42, 0.2), 0x9aa0ff));

    [
      ['H2O: adds', -1.45, -1.35, 'rgba(142, 230, 199, 0.7)'],
      ['CO2: cancels', 1.45, -1.35, 'rgba(154, 160, 255, 0.58)']
    ].forEach(([text, x, y, border]) => {
      const tag = makeLabel(THREE, text, { width: 410, height: 125, border, size: 38, scale: [1.02, 0.3, 1] });
      tag.position.set(x, y, 0);
      group.add(tag);
    });

    group.userData.animate = (t) => {
      water.rotation.y = Math.sin(t * 0.0007) * 0.28;
      co2.rotation.y = -Math.sin(t * 0.0007) * 0.18;
    };
    return 3.0;
  }

  function buildHydrogenBonds(THREE, group) {
    const waters = new THREE.Group();
    group.add(waters);
    const positions = [
      [-1.2, 0.55, 0],
      [0.85, 0.62, 0.08],
      [-0.2, -0.58, -0.05],
      [1.55, -0.62, 0.02]
    ];
    positions.forEach(([x, y, z], idx) => {
      const w = new THREE.Group();
      w.position.set(x, y, z);
      w.rotation.z = (idx % 2 ? -1 : 1) * 0.42;
      waters.add(w);
      w.add(sphere(THREE, 0.26, el('O').color));
      [new THREE.Vector3(-0.38, -0.36, 0), new THREE.Vector3(0.38, -0.36, 0)].forEach((p) => {
        const h = sphere(THREE, 0.15, el('H').color);
        h.position.copy(p);
        w.add(h);
        w.add(bond(THREE, new THREE.Vector3(0, 0, 0), p));
      });
    });

    const hbMat = new THREE.LineBasicMaterial({ color: 0x8ee6c7, transparent: true, opacity: 0.42 });
    const hbonds = [
      [new THREE.Vector3(-0.86, 0.2, 0.08), new THREE.Vector3(-0.32, -0.34, 0.08)],
      [new THREE.Vector3(0.58, 0.26, 0.08), new THREE.Vector3(0.1, -0.35, 0.08)],
      [new THREE.Vector3(1.02, 0.22, 0.08), new THREE.Vector3(1.36, -0.36, 0.08)]
    ].map(([a, b]) => new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), hbMat));
    hbonds.forEach((line) => group.add(line));

    const title = makeLabel(THREE, spec.title || 'weak bonds, strong network', {
      width: 700,
      height: 140,
      border: 'rgba(142, 230, 199, 0.7)',
      fg: '#e8fff8',
      size: 40,
      scale: [1.85, 0.38, 1]
    });
    title.position.set(0, -1.85, 0);
    group.add(title);

    group.userData.animate = (t) => {
      waters.rotation.y = Math.sin(t * 0.00055) * 0.26;
      hbMat.opacity = 0.3 + (Math.sin(t * 0.003) + 1) * 0.16;
    };
    return 3.0;
  }

  function buildMoleScale(THREE, group) {
    const tinyMat = new THREE.MeshStandardMaterial({ color: 0x8ee6c7, roughness: 0.35, emissive: 0x1d6b59, emissiveIntensity: 0.25 });
    const visibleMat = new THREE.MeshStandardMaterial({ color: 0xee9362, roughness: 0.45, emissive: 0x8a3f1f, emissiveIntensity: 0.18 });
    const atomGroup = new THREE.Group();
    group.add(atomGroup);
    const dotGeo = new THREE.SphereGeometry(0.055, 12, 8);
    for (let i = 0; i < 120; i++) {
      const dot = new THREE.Mesh(dotGeo, tinyMat);
      const a = i * 2.399;
      const r = 0.18 * Math.sqrt(i);
      dot.position.set(Math.cos(a) * r, Math.sin(a) * r * 0.62 + 0.18, Math.sin(a * 1.7) * 0.35);
      atomGroup.add(dot);
    }

    const spoon = new THREE.Mesh(
      new THREE.CylinderGeometry(1.25, 0.9, 0.16, 48),
      new THREE.MeshStandardMaterial({ color: 0x353644, roughness: 0.62, metalness: 0.18 })
    );
    spoon.scale.set(1.45, 0.32, 1);
    spoon.rotation.x = Math.PI / 2;
    spoon.position.set(0, -0.88, -0.1);
    group.add(spoon);

    for (let i = 0; i < 8; i++) {
      const bead = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 14), visibleMat);
      bead.position.set((i % 4 - 1.5) * 0.28, -0.72 + Math.floor(i / 4) * 0.22, 0.1);
      group.add(bead);
    }

    const title = makeLabel(THREE, spec.title || '6.022 x 10²³ tiny units', {
      width: 760,
      height: 140,
      border: 'rgba(238, 147, 98, 0.72)',
      size: 38,
      scale: [2.05, 0.38, 1]
    });
    title.position.set(0, -1.72, 0);
    group.add(title);

    group.userData.animate = (t) => {
      atomGroup.rotation.y = t * 0.00055;
      atomGroup.rotation.x = Math.sin(t * 0.0006) * 0.14;
    };
    return 2.7;
  }

  function buildMassMoles(THREE, group) {
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x22232e, roughness: 0.72, metalness: 0.08 });
    const accentMat = new THREE.MeshStandardMaterial({ color: 0xee9362, roughness: 0.42, emissive: 0x8a3f1f, emissiveIntensity: 0.16 });
    const panMat = new THREE.MeshStandardMaterial({ color: 0x6f76a8, roughness: 0.46, metalness: 0.28 });

    const stand = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.1, 0.6), baseMat);
    stand.position.set(0, -0.72, 0);
    group.add(stand);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.5, 16), baseMat);
    post.position.set(0, 0.05, 0);
    group.add(post);
    const beam = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.06, 0.08), accentMat);
    beam.position.set(0, 0.7, 0);
    group.add(beam);

    [-1.2, 1.2].forEach((x) => {
      const string = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, 0.68, 0), new THREE.Vector3(x, 0.1, 0)]),
        new THREE.LineBasicMaterial({ color: 0xf6efe4, transparent: true, opacity: 0.42 })
      );
      group.add(string);
      const pan = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.42, 0.08, 36), panMat);
      pan.position.set(x, 0.05, 0);
      group.add(pan);
    });

    for (let i = 0; i < 10; i++) {
      const atom = sphere(THREE, 0.09, 0x8ee6c7);
      atom.position.set(-1.2 + (i % 5 - 2) * 0.12, 0.18 + Math.floor(i / 5) * 0.12, 0.05);
      group.add(atom);
    }

    const eq = makeLabel(THREE, spec.equation || 'n = m / M', {
      width: 440,
      height: 140,
      border: 'rgba(142, 230, 199, 0.7)',
      fg: '#e8fff8',
      size: 50,
      scale: [1.15, 0.34, 1]
    });
    eq.position.set(1.2, 0.25, 0.18);
    group.add(eq);

    const title = makeLabel(THREE, spec.title || 'weigh it, then count it', {
      width: 690,
      height: 140,
      border: 'rgba(238, 147, 98, 0.72)',
      size: 40,
      scale: [1.85, 0.38, 1]
    });
    title.position.set(0, -1.52, 0);
    group.add(title);

    group.userData.animate = (t) => {
      beam.rotation.z = Math.sin(t * 0.0013) * 0.04;
    };
    return 2.55;
  }

  function buildIsotopeAverage(THREE, group) {
    const lightMat = new THREE.MeshStandardMaterial({ color: 0x8ee6c7, roughness: 0.35, emissive: 0x1d6b59, emissiveIntensity: 0.22 });
    const heavyMat = new THREE.MeshStandardMaterial({ color: 0x9aa0ff, roughness: 0.45, emissive: 0x34375f, emissiveIntensity: 0.28 });
    const bars = [
      { label: spec.lightLabel || 'Cl-35', x: -0.72, height: 1.45, mat: lightMat, pct: '75%' },
      { label: spec.heavyLabel || 'Cl-37', x: 0.82, height: 0.55, mat: heavyMat, pct: '25%' }
    ];
    bars.forEach((bar) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.56, bar.height, 0.42), bar.mat);
      mesh.position.set(bar.x, -0.3 + bar.height / 2, 0);
      group.add(mesh);
      const pct = makeLabel(THREE, bar.pct, { width: 220, height: 110, border: 'rgba(246, 239, 228, 0.28)', size: 42, scale: [0.55, 0.24, 1] });
      pct.position.set(bar.x, bar.height + 0.48, 0);
      group.add(pct);
      const tag = makeLabel(THREE, bar.label, { width: 260, height: 110, border: 'rgba(246, 239, 228, 0.28)', size: 36, scale: [0.65, 0.24, 1] });
      tag.position.set(bar.x, -1.22, 0);
      group.add(tag);
    });

    const avg = makeLabel(THREE, spec.result || 'average = 35.5', {
      width: 670,
      height: 140,
      border: 'rgba(238, 147, 98, 0.72)',
      size: 42,
      scale: [1.75, 0.38, 1]
    });
    avg.position.set(0, -1.82, 0);
    group.add(avg);

    group.userData.animate = (t) => {
      group.rotation.y = Math.sin(t * 0.0005) * 0.18;
    };
    return 2.55;
  }

  function buildCovalentNetwork(THREE, group) {
    const diamond = new THREE.Group();
    diamond.position.set(-1.35, 0.15, 0);
    group.add(diamond);
    const dPts = [
      [0, 0, 0], [0.65, 0.65, 0.65], [0.65, -0.65, -0.65], [-0.65, 0.65, -0.65], [-0.65, -0.65, 0.65]
    ].map(p => new THREE.Vector3(p[0], p[1], p[2]));
    dPts.forEach((p, i) => {
      const atom = sphere(THREE, i === 0 ? 0.16 : 0.13, el('C').color);
      atom.position.copy(p);
      diamond.add(atom);
      if (i > 0) diamond.add(bond(THREE, dPts[0], p));
    });

    const graphite = new THREE.Group();
    graphite.position.set(1.45, 0.05, 0);
    group.add(graphite);
    const hexPts = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      hexPts.push(new THREE.Vector3(Math.cos(a) * 0.62, Math.sin(a) * 0.62, 0));
    }
    [0, 0.34].forEach((z, layer) => {
      hexPts.forEach((p, i) => {
        const atom = sphere(THREE, 0.12, el('C').color);
        atom.position.set(p.x, p.y - layer * 0.18, z);
        graphite.add(atom);
        const next = hexPts[(i + 1) % hexPts.length];
        graphite.add(bond(THREE, new THREE.Vector3(p.x, p.y - layer * 0.18, z), new THREE.Vector3(next.x, next.y - layer * 0.18, z)));
      });
    });
    const slideArrow = arrow(THREE, new THREE.Vector3(0.05, -0.95, 0.5), new THREE.Vector3(0.7, -0.95, 0.5), 0x8ee6c7);
    graphite.add(slideArrow);

    [
      ['diamond', -1.35, -1.35],
      ['graphite', 1.45, -1.35]
    ].forEach(([text, x, y]) => {
      const tag = makeLabel(THREE, text, { width: 300, height: 120, border: 'rgba(246, 239, 228, 0.32)', size: 38, scale: [0.78, 0.28, 1] });
      tag.position.set(x, y, 0);
      group.add(tag);
    });

    group.userData.animate = (t) => {
      diamond.rotation.y = t * 0.00055;
      graphite.rotation.y = -t * 0.00035;
    };
    return 2.9;
  }

  function buildDnaHelix(THREE, group) {
    const strandMatA = new THREE.LineBasicMaterial({ color: 0xee9362, transparent: true, opacity: 0.88 });
    const strandMatB = new THREE.LineBasicMaterial({ color: 0x9aa0ff, transparent: true, opacity: 0.88 });
    const rungMat = new THREE.LineBasicMaterial({ color: 0x8ee6c7, transparent: true, opacity: 0.5 });
    const aPts = [];
    const bPts = [];
    const rungs = [];
    const turns = spec.turns || 1.7;
    const steps = 34;
    for (let i = 0; i <= steps; i++) {
      const p = i / steps;
      const theta = p * Math.PI * 2 * turns;
      const y = (p - 0.5) * 2.9;
      const a = new THREE.Vector3(Math.cos(theta) * 0.72, y, Math.sin(theta) * 0.72);
      const b = new THREE.Vector3(Math.cos(theta + Math.PI) * 0.72, y, Math.sin(theta + Math.PI) * 0.72);
      aPts.push(a);
      bPts.push(b);
      if (i % 3 === 0) rungs.push([a, b, i]);
    }
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(aPts), strandMatA));
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(bPts), strandMatB));
    rungs.forEach(([a, b, i]) => {
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), rungMat));
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const bead = sphere(THREE, 0.07, i % 2 === 0 ? 0x8ee6c7 : 0xf6efe4);
      bead.position.copy(mid);
      group.add(bead);
    });

    const title = makeLabel(THREE, spec.title || 'two strands, paired bases', {
      width: 700,
      height: 140,
      border: 'rgba(142, 230, 199, 0.7)',
      fg: '#e8fff8',
      size: 40,
      scale: [1.85, 0.38, 1]
    });
    title.position.set(0, -2.05, 0);
    group.add(title);

    group.userData.animate = (t) => {
      group.rotation.y = t * 0.00055;
    };
    return 2.9;
  }

  function buildAiPipeline(THREE, group) {
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xee9362,
      roughness: 0.38,
      metalness: 0.08,
      emissive: 0x8a3f1f,
      emissiveIntensity: 0.28
    });
    const bitOnMat = new THREE.MeshStandardMaterial({
      color: 0x8ee6c7,
      roughness: 0.35,
      emissive: 0x1d6b59,
      emissiveIntensity: 0.55
    });
    const bitOffMat = new THREE.MeshStandardMaterial({
      color: 0x353644,
      roughness: 0.68,
      emissive: 0x11131c,
      emissiveIntensity: 0.18
    });

    const title = makeLabel(THREE, spec.title || 'English becomes numbers', {
      width: 720,
      height: 150,
      border: 'rgba(154, 160, 255, 0.7)',
      size: 42,
      scale: [2.2, 0.46, 1]
    });
    title.position.set(0, 2.35, 0);
    group.add(title);

    const words = spec.words || ['I', 'ask', 'AI'];
    words.forEach((word, i) => {
      const chip = makeLabel(THREE, word, {
        width: 320,
        height: 150,
        bg: 'rgba(32, 27, 24, 0.92)',
        border: 'rgba(238, 147, 98, 0.82)',
        size: 48,
        scale: [0.9, 0.42, 1]
      });
      chip.position.set(-3.2, 0.9 - i * 0.62, 0);
      group.add(chip);
    });

    const arrowGeo = new THREE.ConeGeometry(0.13, 0.42, 24);
    const shaftGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.72, 16);
    [-1.85, 1.35].forEach((x) => {
      const shaft = new THREE.Mesh(shaftGeo, accentMat);
      shaft.rotation.z = Math.PI / 2;
      shaft.position.set(x, 0.28, 0);
      group.add(shaft);
      const head = new THREE.Mesh(arrowGeo, accentMat);
      head.rotation.z = -Math.PI / 2;
      head.position.set(x + 0.44, 0.28, 0);
      group.add(head);
    });

    const bitGroup = new THREE.Group();
    bitGroup.position.set(0, 0.2, 0);
    group.add(bitGroup);
    const boxGeo = new THREE.BoxGeometry(0.32, 0.32, 0.32);
    const bits = spec.bits || '0100000101001001';
    for (let i = 0; i < 16; i++) {
      const bit = bits[i % bits.length];
      const cube = new THREE.Mesh(boxGeo, bit === '1' ? bitOnMat : bitOffMat);
      cube.position.set((i % 4 - 1.5) * 0.42, (1.5 - Math.floor(i / 4)) * 0.42, 0);
      bitGroup.add(cube);
      const bitLabel = makeLabel(THREE, bit, {
        width: 128,
        height: 128,
        bg: 'rgba(0,0,0,0)',
        border: 'rgba(0,0,0,0)',
        fg: bit === '1' ? '#0d1f1a' : '#e7e0d3',
        size: 70,
        scale: [0.22, 0.22, 1]
      });
      bitLabel.position.set(cube.position.x, cube.position.y, 0.2);
      bitGroup.add(bitLabel);
    }

    const vectorGroup = new THREE.Group();
    vectorGroup.position.set(3.05, 0.12, 0);
    group.add(vectorGroup);
    const pts = [
      [-0.58, -0.42, 0.18],
      [-0.2, 0.52, -0.32],
      [0.34, 0.26, 0.42],
      [0.64, -0.34, -0.12],
      [0.08, -0.08, 0.7]
    ].map(p => new THREE.Vector3(p[0], p[1], p[2]));
    pts.forEach((p, i) => {
      const dot = sphere(THREE, 0.12 + (i === 2 ? 0.04 : 0), i === 2 ? 0xee9362 : 0x9aa0ff);
      dot.position.copy(p);
      vectorGroup.add(dot);
    });
    const linePositions = [];
    for (let i = 0; i < pts.length - 1; i++) {
      linePositions.push(pts[i].x, pts[i].y, pts[i].z, pts[i + 1].x, pts[i + 1].y, pts[i + 1].z);
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    vectorGroup.add(new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: 0x6f76a8, transparent: true, opacity: 0.72 })
    ));

    const vectorLabel = makeLabel(THREE, 'vector space', {
      width: 440,
      height: 140,
      bg: 'rgba(17, 18, 28, 0.82)',
      border: 'rgba(142, 230, 199, 0.58)',
      fg: '#e8fff8',
      size: 38,
      scale: [1.15, 0.36, 1]
    });
    vectorLabel.position.set(3.05, -1.05, 0);
    group.add(vectorLabel);

    const base = new THREE.Mesh(
      new THREE.BoxGeometry(6.9, 0.06, 1.7),
      new THREE.MeshStandardMaterial({ color: 0x111018, roughness: 0.8, transparent: true, opacity: 0.72 })
    );
    base.position.set(0, -1.2, 0);
    group.add(base);

    return 3.6;
  }

  function buildUnitCircle(THREE, group) {
    const lineMat = new THREE.LineBasicMaterial({ color: 0xf6efe4, transparent: true, opacity: 0.82 });
    const accentMat = new THREE.LineBasicMaterial({ color: 0xee9362 });
    const yMat = new THREE.LineBasicMaterial({ color: 0x8ee6c7 });
    const xMat = new THREE.LineBasicMaterial({ color: 0x9aa0ff });

    const circlePts = [];
    for (let i = 0; i <= 160; i++) {
      const a = (i / 160) * Math.PI * 2;
      circlePts.push(new THREE.Vector3(Math.cos(a) * 1.55, Math.sin(a) * 1.55, 0));
    }
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(circlePts), lineMat));

    const axes = [
      [new THREE.Vector3(-2.05, 0, 0), new THREE.Vector3(2.05, 0, 0), xMat],
      [new THREE.Vector3(0, -2.05, 0), new THREE.Vector3(0, 2.05, 0), yMat]
    ];
    axes.forEach(([a, b, mat]) => group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), mat)));

    const theta = (spec.theta || 52) * Math.PI / 180;
    const point = new THREE.Vector3(Math.cos(theta) * 1.55, Math.sin(theta) * 1.55, 0);
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), point]), accentMat));
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([point, new THREE.Vector3(point.x, 0, 0)]), yMat));
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([point, new THREE.Vector3(0, point.y, 0)]), xMat));

    const dot = sphere(THREE, 0.12, 0xee9362);
    dot.position.copy(point);
    group.add(dot);

    // Label the projections so cosine (x) and sine (y) never get confused.
    const cosLbl = makeLabel(THREE, 'cos θ', { width: 210, height: 84, bg: 'rgba(14,13,18,0.72)', border: 'rgba(154,160,255,0.6)', fg: '#dfe2ff', size: 40, scale: [0.64, 0.26, 1] });
    cosLbl.position.set(point.x / 2, point.y + 0.24, 0); group.add(cosLbl);
    const sinLbl = makeLabel(THREE, 'sin θ', { width: 210, height: 84, bg: 'rgba(14,13,18,0.72)', border: 'rgba(142,230,199,0.6)', fg: '#c9f5e6', size: 40, scale: [0.64, 0.26, 1] });
    sinLbl.position.set(point.x + 0.46, point.y / 2, 0); group.add(sinLbl);

    const title = makeLabel(THREE, spec.title || '(cos θ, sin θ)', {
      width: 650,
      height: 140,
      border: 'rgba(238, 147, 98, 0.72)',
      size: 42,
      scale: [1.85, 0.4, 1]
    });
    title.position.set(0, -2.45, 0);
    group.add(title);

    return 2.8;
  }

  function buildRayOptics(THREE, group) {
    const airMat = new THREE.MeshStandardMaterial({ color: 0x202232, roughness: 0.8, transparent: true, opacity: 0.52 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x254c63, roughness: 0.55, transparent: true, opacity: 0.58 });
    const rayMat = new THREE.LineBasicMaterial({ color: 0xee9362, linewidth: 2 });
    const normalMat = new THREE.LineBasicMaterial({ color: 0xf6efe4, transparent: true, opacity: 0.45 });

    const air = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.5, 0.08), airMat);
    air.position.set(0, 0.75, -0.05);
    group.add(air);
    const glass = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.5, 0.08), glassMat);
    glass.position.set(0, -0.75, -0.05);
    group.add(glass);

    group.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 1.85, 0.05), new THREE.Vector3(0, -1.85, 0.05)]),
      normalMat
    ));
    group.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2.35, 0, 0.05), new THREE.Vector3(2.35, 0, 0.05)]),
      normalMat
    ));

    const incoming = new THREE.Vector3(-1.55, 1.25, 0.08);
    const boundary = new THREE.Vector3(0, 0, 0.08);
    const refracted = new THREE.Vector3(0.72, -1.25, 0.08);
    const reflected = new THREE.Vector3(1.1, 0.9, 0.08);
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([incoming, boundary, refracted]), rayMat));
    group.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([boundary, reflected]),
      new THREE.LineBasicMaterial({ color: 0x9aa0ff, transparent: true, opacity: 0.68 })
    ));

    [
      ['air', -1.55, 0.82],
      ['glass', 1.4, -0.82],
      ['normal', 0.62, 1.42]
    ].forEach(([text, x, y]) => {
      const labelSprite = makeLabel(THREE, text, {
        width: 250,
        height: 120,
        bg: 'rgba(15, 15, 20, 0.76)',
        border: 'rgba(246, 239, 228, 0.28)',
        size: 42,
        scale: [0.7, 0.28, 1]
      });
      labelSprite.position.set(x, y, 0.18);
      group.add(labelSprite);
    });

    return 2.6;
  }

  onMount(() => {
    let disposed = false;
    (async () => {
      try {
        const THREE = await import('three');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
        if (disposed || !container) return;

        const w = container.clientWidth || 320;
        const h = container.clientHeight || 240;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(w, h);
        container.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 0.8));
        const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(4, 6, 5); scene.add(key);
        const fill = new THREE.DirectionalLight(0x9aa0ff, 0.35); fill.position.set(-5, -3, -4); scene.add(fill);

        const group = new THREE.Group();
        scene.add(group);
        const fit = spec.kind === 'atom' ? buildAtom(THREE, group)
          : spec.kind === 'molecule-gallery' ? buildMoleculeGallery(THREE, group)
          : spec.kind === 'atom-scale' ? buildAtomScale(THREE, group)
          : spec.kind === 'atomic-structure' ? buildAtomicStructure(THREE, group)
          : spec.kind === 'structure-comparison' ? buildStructureComparison(THREE, group)
          : spec.kind === 'lone-pair-geometry' ? buildLonePairGeometry(THREE, group)
          : spec.kind === 'water-lone-pairs' ? buildLonePairGeometry(THREE, group, true)
          : spec.kind === 'protein-alpha-helix' ? buildProteinAlphaHelix(THREE, group)
          : spec.kind === 'nucleus-forces' ? buildNucleusForces(THREE, group)
          : spec.kind === 'carbon-architecture' ? buildCarbonArchitecture(THREE, group)
          : spec.kind === 'ion-charge-builder' ? buildIonChargeBuilder(THREE, group)
          : spec.kind === 'proton-transfer' ? buildProtonTransfer(THREE, group)
          : spec.kind === 'reaction-collisions' ? buildReactionCollisions(THREE, group)
          : spec.kind === 'unit-cube-volume' ? buildUnitCubeVolume(THREE, group)
          : spec.kind === 'thermal-lattice' ? buildThermalLattice(THREE, group)
          : spec.kind === 'particle-states' ? buildParticleStates(THREE, group)
          : spec.kind === 'ideal-gas-particles' ? buildIdealGasParticles(THREE, group)
          : spec.kind === 'gas-wall-collisions' ? buildGasWallCollisions(THREE, group)
          : spec.kind === 'entropy-microstates' ? buildEntropyMicrostates(THREE, group)
          : spec.kind === 'lattice' ? buildLattice(THREE, group)
          : spec.kind === 'nucleus' ? buildNucleus(THREE, group)
          : spec.kind === 'electric-attraction' ? buildElectricAttraction(THREE, group)
          : spec.kind === 'isotopes' ? buildIsotopes(THREE, group)
          : spec.kind === 'ionic-transfer' ? buildIonicTransfer(THREE, group)
          : spec.kind === 'covalent-share' ? buildCovalentShare(THREE, group)
          : spec.kind === 'metallic-sea' ? buildMetallicSea(THREE, group)
          : spec.kind === 'polarity' ? buildPolarity(THREE, group)
          : spec.kind === 'hydrogen-bonds' ? buildHydrogenBonds(THREE, group)
          : spec.kind === 'mole-scale' ? buildMoleScale(THREE, group)
          : spec.kind === 'mass-moles' ? buildMassMoles(THREE, group)
          : spec.kind === 'isotope-average' ? buildIsotopeAverage(THREE, group)
          : spec.kind === 'covalent-network' ? buildCovalentNetwork(THREE, group)
          : spec.kind === 'dna-helix' ? buildDnaHelix(THREE, group)
          : spec.kind === 'ai-pipeline' ? buildAiPipeline(THREE, group)
          : spec.kind === 'unit-circle' ? buildUnitCircle(THREE, group)
          : spec.kind === 'ray-optics' ? buildRayOptics(THREE, group)
          : spec.kind === 'field' ? buildField(THREE, group)
          : spec.kind === 'vectors' ? buildVectors(THREE, group)
          : spec.kind === 'waves' ? buildWaves(THREE, group)
          : spec.kind === 'solid-revolution' ? buildSolid(THREE, group)
          : buildMolecule(THREE, group);

        const presentationLocked = ['molecule-gallery', 'structure-comparison', 'carbon-architecture', 'proton-transfer', 'reaction-collisions', 'thermal-lattice', 'particle-states', 'entropy-microstates', 'unit-circle'].includes(spec.kind)
          || (spec.kind === 'waves' && (spec.mode || 'traveling') !== 'interference');
        const waveSurface = spec.kind === 'waves' && (spec.mode || 'traveling') === 'interference';
        if (waveSurface) camera.position.set(0, fit * 1.55, fit * 1.82); // elevated 3/4 for a rippling surface
        else if (presentationLocked) camera.position.set(0, 0, fit * 2.5);
        else camera.position.set(fit * 0.4, fit * 0.5, fit * 2.5);
        camera.lookAt(0, 0, 0);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.enableDamping = true;
        controls.autoRotate = !reduceMotion && !presentationLocked;
        controls.autoRotateSpeed = 1.3;
        if (presentationLocked) {
          controls.minAzimuthAngle = -0.28;
          controls.maxAzimuthAngle = 0.28;
          controls.minPolarAngle = Math.PI / 2 - 0.2;
          controls.maxPolarAngle = Math.PI / 2 + 0.2;
        }

        let raf;
        const tick = (time = 0) => {
          if (!reduceMotion && group.userData.animate) group.userData.animate(time);
          controls.update();
          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        };
        tick();

        const ro = new ResizeObserver(() => {
          const W = container.clientWidth, H = container.clientHeight;
          if (!W || !H) return;
          camera.aspect = W / H; camera.updateProjectionMatrix(); renderer.setSize(W, H);
        });
        ro.observe(container);

        loading = false;
        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          controls.dispose();
          scene.traverse(o => {
            if (o.geometry) o.geometry.dispose();
            if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => {
              if (m.map) m.map.dispose();
              m.dispose();
            });
          });
          renderer.dispose();
          if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        };
      } catch (e) {
        failed = true;
        loading = false;
      }
    })();
    return () => { disposed = true; };
  });

  onDestroy(() => cleanup());
</script>

<div class="three-stage" bind:this={container}>
  {#if loading && !failed}
    <div class="three-loading"><span></span><span></span><span></span></div>
  {/if}
  {#if failed}
    <div class="three-failed">3D view unavailable</div>
  {/if}
  {#if label}<div class="three-label">{label}</div>{/if}
  <div class="three-hint">drag to rotate</div>
</div>

<style>
  .three-stage {
    position: relative; width: 100%; height: 100%; overflow: hidden;
    background: radial-gradient(ellipse at 50% 32%, #211f2b, #0d0c11 86%);
    touch-action: none;
  }
  .three-stage :global(canvas) { display: block; }

  .three-label {
    position: absolute; left: 10px; bottom: 9px;
    /* leave room for the bottom-right "drag to rotate" hint so long captions
       wrap upward instead of running underneath it */
    max-width: calc(100% - 104px); line-height: 1.3;
    font-family: var(--qx-font); font-size: 12px; font-weight: 800; letter-spacing: 0.02em;
    color: #f4f1e9; background: rgba(0,0,0,0.35); border-radius: var(--qx-radius-pill); padding: 3px 10px;
    pointer-events: none;
  }
  .three-hint {
    position: absolute; right: 10px; bottom: 11px;
    font-family: var(--qx-font); font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.45);
    pointer-events: none;
  }

  .three-loading { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 7px; }
  .three-loading span { width: 7px; height: 7px; border-radius: 50%; background: #6E7689; animation: tBounce 1.4s infinite ease-in-out both; }
  .three-loading span:nth-child(1) { animation-delay: -0.32s; }
  .three-loading span:nth-child(2) { animation-delay: -0.16s; }
  @keyframes tBounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

  .three-failed { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.5); font-size: 13px; font-family: var(--qx-font); }
</style>
