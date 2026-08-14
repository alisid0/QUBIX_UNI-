import { MATHS_MEDIA_EXPANSION } from './mathsMediaExpansion.js';
import { MATHS_MEDIA_80_EXPANSION } from './mathsMedia80Expansion.js';

/**
 * Per-floor rich-media attachment for boards (the forward-looking, dynamic-board
 * companion to media.js, which only covers the static deck).
 *
 * Keyed by board number → floor index → media spec. Reader.floorMedia() consults
 * getFloorMedia() for any media beyond a layer's own image. This is where audio /
 * video / interactive specs for the dynamic launch boards (1000+) will live too;
 * Three.js 3D is the first type wired up.
 *
 * NOTE: keyed by Supabase sort_order, which the review ingest reassigns on every
 * run. Re-check these against the live board titles after any re-ingest.
 * Current mapping verified against the 2026-06-28 re-ingest (78 boards, 1000-1077).
 *
 * 3D specs (rendered by src/lib/components/media/ThreeScene.svelte):
 *   { type:'three', spec:{ kind:'atom',     symbol, shells:[2,8,1] } }
 *   { type:'three', spec:{ kind:'molecule', formula, shape, center, ligand, count } }
 *   { type:'three', spec:{ kind:'lattice',  a, b, size } }
 *   { type:'three', spec:{ kind:'nucleus',  protons, neutrons, title } }
 *   { type:'three', spec:{ kind:'electric-attraction', title } }
 *   { type:'three', spec:{ kind:'field', title, label, charges:[{x,y,z,q}] } }
 *   { type:'three', spec:{ kind:'vectors', mode:'add'|'cross'|'components', title, label } }
 *   { type:'three', spec:{ kind:'waves', mode:'traveling'|'standing'|'interference', title, label } }
 *   { type:'three', spec:{ kind:'solid-revolution', shape:'paraboloid'|'cone'|'sphere'|'vase', title, label } }
 *     (no live BB is wired yet — awaiting a volumes-of-revolution / calculus board)
 *   { type:'three', spec:{ kind:'isotopes', isotopes:[{label,protons,neutrons}] } }
 *   shape ∈ linear | bent | trigonal | pyramidal | tetrahedral
 */

export const BOARD_MEDIA = {
  // Static deck · Atomic Chemistry 2.1 “The chemist’s dozen”
  34: {
    0: { type: 'img', src: '/media/bb-34-f0.gif?v=6b5cb9' }
  },

  // ── Chemistry · Atomic structure ──
  // Batch 1 of the floor-by-floor Three.js audit: exact particle counts only.
  1055: { 0: { type: 'three', spec: { kind: 'nucleus', protons: 6, neutrons: 6, label: 'C-12 nucleus', title: 'Z = 6 · A = 12' } } },
  1056: {
    1: { type: 'three', spec: { kind: 'isotopes', title: 'same protons, different neutrons', isotopes: [{ label: 'C-12', protons: 6, neutrons: 6 }, { label: 'C-13', protons: 6, neutrons: 7 }, { label: 'C-14', protons: 6, neutrons: 8 }] } },
    2: { type: 'three', spec: { kind: 'isotopes', title: 'same Z, different A', isotopes: [{ label: 'C-12', protons: 6, neutrons: 6 }, { label: 'C-13', protons: 6, neutrons: 7 }, { label: 'C-14', protons: 6, neutrons: 8 }] } }
  },
  // 1057 "Electron shells: where electrons live" — Concrete floor walks sodium 2,8,1.
  1057: {
    1: { type: 'three', spec: { kind: 'atom', symbol: 'Na', shells: [2, 8, 1] } },
    2: { type: 'three', spec: { kind: 'atom', symbol: 'Na', shells: [2, 8, 1] } }
  },
  // Batch 2: electron transfer, filled shells, and the first shared pair.
  1058: {
    1: { type: 'three', spec: { kind: 'ionic-transfer', from: 'Na', to: 'Cl', product: 'Na+ + Cl-', title: '11 e− becomes 10 · 17 e− becomes 18' } },
    3: { type: 'three', spec: { kind: 'ionic-transfer', from: 'Na', to: 'Cl', product: 'Na+ + Cl-', title: 'both ions reach a full outer shell' } }
  },
  1059: { 1: { type: 'three', spec: { kind: 'atom', symbol: 'Ne', shells: [2, 8] } } },
  1061: { 1: { type: 'three', spec: { kind: 'covalent-share', atom: 'H', pairs: 1, title: 'one shared pair completes both shells' } } },

  // ── Chemistry · Molecular architecture ──
  // 1070 "Ionic lattices: the giant structure" — the repeating NaCl grid.
  // Batch 3: return to each structure when the lesson reaches its formal definition.
  1062: {
    0: { type: 'three', spec: { kind: 'ionic-transfer', from: 'Na', to: 'Cl', product: 'Na+ + Cl-', title: 'electron transfer' } },
    2: { type: 'three', spec: { kind: 'ionic-transfer', from: 'Na', to: 'Cl', product: 'Na+ + Cl-', title: 'opposite ions attract after transfer' } }
  },
  1063: { 1: { type: 'three', spec: { kind: 'covalent-share', atom: 'O', pairs: 2, title: 'shared electron pairs' } } },
  1064: {
    1: { type: 'three', spec: { kind: 'metallic-sea', title: 'mobile electrons in metal' } },
    2: { type: 'three', spec: { kind: 'metallic-sea', title: 'positive ions held by delocalised electrons' } }
  },
  1066: { 2: { type: 'three', spec: { kind: 'mole-scale', title: 'one mole is a counting unit' } } },
  1067: { 1: { type: 'three', spec: { kind: 'mass-moles', title: 'grams translate into moles', equation: 'n = m / M' } } },
  1068: { 1: { type: 'three', spec: { kind: 'isotope-average', title: 'weighted isotope average', result: 'Cl average = 35.5' } } },

  1070: {
    0: { type: 'three', spec: { kind: 'lattice', a: 'Na', b: 'Cl', size: 3 } },
    2: { type: 'three', spec: { kind: 'lattice', a: 'Na', b: 'Cl', size: 3 } }
  },
  1071: {
    1: { type: 'three', spec: { kind: 'covalent-network', title: 'same carbon, different structure' } },
    2: { type: 'three', spec: { kind: 'covalent-network', title: 'continuous bonds make one giant structure' } }
  },
  // 1072 "Molecular shapes: VSEPR" — the showcase: a rotatable tetrahedron.
  // Batch 5: eight audited returns spanning shape, atomic structure, and shells.
  1072: {
    0: { type: 'three', spec: { kind: 'molecule', formula: 'CH₄', shape: 'tetrahedral', center: 'C', ligand: 'H', count: 4 } },
    1: { type: 'three', spec: { kind: 'molecule-gallery', title: 'electron regions choose the geometry' } },
    2: { type: 'three', spec: { kind: 'molecule-gallery', title: 'two, three, and four regions spread apart' } },
    3: { type: 'three', spec: { kind: 'polarity', title: 'shape decides whether bond dipoles cancel' } }
  },
  // 1075 "What is a molecule?" — the most familiar molecule.
  // Batch 4: exact molecular geometries and their polarity consequence.
  1073: {
    1: { type: 'three', spec: { kind: 'polarity', title: 'dipoles add or cancel' } },
    2: { type: 'three', spec: { kind: 'polarity', title: 'bond dipoles combine through molecular shape' } }
  },
  1074: { 2: { type: 'three', spec: { kind: 'hydrogen-bonds', title: 'hydrogen bonds between molecules' } } },
  1075: {
    0: { type: 'three', spec: { kind: 'molecule', formula: 'H₂O', shape: 'bent', center: 'O', ligand: 'H', count: 2 } },
    4: { type: 'three', spec: { kind: 'structure-comparison', title: 'discrete molecule · ionic lattice · covalent network' } },
    6: { type: 'three', spec: { kind: 'molecule-gallery', title: 'molecules occupy specific 3D geometries' } }
  },
  // 1076 "Bond angles and the shape of a molecule" — the pyramidal case.
  1076: {
    0: { type: 'three', spec: { kind: 'molecule', formula: 'NH₃', shape: 'pyramidal', center: 'N', ligand: 'H', count: 3 } },
    2: { type: 'three', spec: { kind: 'molecule', formula: 'BF₃ · 120°', shape: 'trigonal', center: 'B', ligand: 'F', count: 3 } },
    3: { type: 'three', spec: { kind: 'molecule', formula: 'CH₄ · 109.5°', shape: 'tetrahedral', center: 'C', ligand: 'H', count: 4 } },
    4: { type: 'three', spec: { kind: 'lone-pair-geometry', title: 'one lone pair compresses NH₃ to about 107°' } },
    5: { type: 'three', spec: { kind: 'water-lone-pairs', title: 'two lone pairs compress H₂O to 104.5°' } }
  },
  1077: {
    2: { type: 'three', spec: { kind: 'dna-helix', title: 'two strands twist together' } },
    3: { type: 'three', spec: { kind: 'dna-helix', title: 'paired bases form the rungs' } },
    6: { type: 'three', spec: { kind: 'protein-alpha-helix', title: 'hydrogen bonds brace a right-handed α-helix' } }
  },

  1096: { 1: { type: 'three', spec: { kind: 'atom', symbol: 'He', shells: [2] } } },
  1098: { 2: { type: 'three', spec: { kind: 'nucleus', protons: 8, neutrons: 8, label: 'O-16 nucleus', title: '8 protons identifies oxygen' } } },
  1101: { 3: { type: 'three', spec: { kind: 'molecule', formula: 'H₂O', shape: 'bent', center: 'O', ligand: 'H', count: 2 } } },

  1202: {
    1: { type: 'three', spec: { kind: 'atom', symbol: 'Na', shells: [2, 8, 1] } },
    2: { type: 'three', spec: { kind: 'atom', symbol: 'Na', shells: [2, 8, 1] } },
    3: { type: 'three', spec: { kind: 'atom', symbol: 'Na', shells: [2, 8, 1] } }
  },
  // Batch 6: eight floors linking shells, molecular shape, polarity, and DNA.
  1205: { 2: { type: 'three', spec: { kind: 'atom', symbol: 'Ne', shells: [2, 8] } } },

  // ── The Atom · pixel-art floor animations ──
  1094: {
    0: { type: 'img', src: '/videos/card-1094-floor0.gif?v=944949' },   // layer 0 — foil dividing down to the smallest piece
    1: { type: 'img', src: '/videos/card-1094-floor1.gif?v=1cdafa' },    // layer 1 — the philosophers' argument (never-ends vs a-limit)
    2: { type: 'img', src: '/videos/card-1094-floor2.png?v=7d7d7b' },    // layer 2 — ATOMOS: the smallest, uncuttable piece
    3: { type: 'img', src: '/videos/card-1094-floor3.gif?v=77f695' }     // layer 3 — Jean Perrin: atoms are real (Brownian motion)
  },

  // ── The Bit · pixel-art floor animations ──
  // Atom 2.x: nucleus, charge, neutrons, and isotopes.
  1109: { 2: { type: 'three', spec: { kind: 'nucleus', protons: 6, neutrons: 6, title: 'inside the nucleus' } } },
  1110: { 3: { type: 'three', spec: { kind: 'electric-attraction', title: '+ nucleus attracts - electrons' } } },
  1113: { 4: { type: 'three', spec: { kind: 'nucleus', protons: 6, neutrons: 8, title: 'protons + neutrons' } } },
  1115: { 2: { type: 'three', spec: {
    kind: 'isotopes',
    title: 'same protons, different neutrons',
    isotopes: [
      { label: 'C-12', protons: 6, neutrons: 6 },
      { label: 'C-13', protons: 6, neutrons: 7 },
      { label: 'C-14', protons: 6, neutrons: 8 }
    ]
  } } },
  1117: { 4: { type: 'three', spec: { kind: 'covalent-share', atom: 'O', pairs: 2, title: 'shared electrons glue atoms' } } },
  1119: { 3: { type: 'three', spec: { kind: 'metallic-sea', title: 'ions plus roaming electrons' } } },
  1120: { 3: { type: 'three', spec: { kind: 'metallic-sea', title: 'electron flow is current' } } },
  1121: { 4: { type: 'three', spec: { kind: 'mole-scale', title: 'a mole is a huge count' } } },
  // Concrete analogies rendered as authored 16-bit scenes. These stay photographic/story-like;
  // the exact scientific structure is handled by deterministic interactive media below.
  1023: { 3: { type: 'img', src: '/images/pixel/bb-1023-f3-inertia-seatbelt.webp' } },
  1285: {
    0: { type: 'concept-explorer', spec: { kind: 'pipeline', primary: 15, secondary: 8, prompt: 'Find the stage that limits the whole system.' } },
    2: { type: 'img', src: '/images/pixel/bb-1285-f2-road-bottleneck.webp' },
    5: { type: 'concept-explorer', spec: { kind: 'pipeline', primary: 15, secondary: 8, prompt: 'Test the redesign against the bottleneck.' } }
  },

  // Chemistry spatial set · rotatable models at the floor where 3D structure matters.
  1203: {
    1: { type: 'three', spec: { kind: 'atom', symbol: 'Ne', shells: [2, 8] } },
    4: { type: 'three', spec: { kind: 'atom', symbol: 'Ne', shells: [2, 8] } }
  },
  1204: { 2: { type: 'three', spec: { kind: 'atom', symbol: 'Na', shells: [2, 8, 1] } } },
  1206: {
    2: { type: 'three', spec: { kind: 'ionic-transfer', from: 'Na', to: 'Cl', product: 'Na+ + Cl-', title: 'one electron changes both charges' } },
    4: { type: 'three', spec: { kind: 'ionic-transfer', from: 'Na', to: 'Cl', product: 'Na+ + Cl-', title: 'neutral atoms become ions' } }
  },
  1213: {
    0: { type: 'three', spec: { kind: 'molecule', formula: 'CH₄', shape: 'tetrahedral', center: 'C', ligand: 'H', count: 4 } },
    2: { type: 'three', spec: { kind: 'molecule', formula: 'CH₄', shape: 'tetrahedral', center: 'C', ligand: 'H', count: 4 } },
    3: { type: 'three', spec: { kind: 'molecule', formula: 'CH₄', shape: 'tetrahedral', center: 'C', ligand: 'H', count: 4 } }
  },
  1214: {
    0: { type: 'three', spec: { kind: 'molecule', formula: 'CO₂ · 180°', shape: 'linear', center: 'C', ligand: 'O', count: 2 } },
    1: { type: 'three', spec: { kind: 'molecule', formula: 'BF₃ · 120°', shape: 'trigonal', center: 'B', ligand: 'F', count: 3 } },
    2: { type: 'three', spec: { kind: 'molecule', formula: 'H₂O', shape: 'bent', center: 'O', ligand: 'H', count: 2 } },
    3: { type: 'three', spec: { kind: 'water-lone-pairs', title: 'lone pairs occupy more space and squeeze the bonds' } },
    4: { type: 'three', spec: { kind: 'molecule', formula: 'H₂O', shape: 'bent', center: 'O', ligand: 'H', count: 2 } }
  },
  1215: {
    1: { type: 'three', spec: { kind: 'polarity', title: 'oxygen pulls shared electrons more strongly' } },
    2: { type: 'three', spec: { kind: 'polarity', title: 'uneven sharing creates two poles' } },
    3: { type: 'three', spec: { kind: 'polarity', title: 'a polar bond is an uneven tug-of-war' } }
  },
  1216: {
    0: { type: 'three', spec: { kind: 'polarity', title: '3D symmetry decides whether dipoles cancel' } },
    2: { type: 'three', spec: { kind: 'polarity', title: 'shape decides whether dipoles cancel' } },
    3: { type: 'three', spec: { kind: 'polarity', title: 'bent geometry leaves a net dipole' } }
  },
  1217: {
    3: { type: 'three', spec: { kind: 'hydrogen-bonds', title: 'weak attractions link water molecules' } },
    4: { type: 'three', spec: { kind: 'hydrogen-bonds', title: 'many weak links change water’s behaviour' } }
  },
  1218: {
    1: { type: 'three', spec: { kind: 'dna-helix', title: 'two strands form a double helix' } },
    2: { type: 'three', spec: { kind: 'dna-helix', title: 'hydrogen bonds fasten the two strands' } },
    3: { type: 'three', spec: { kind: 'dna-helix', title: 'strong enough to hold, weak enough to unzip' } }
  },

  // Concise chemistry course · reinforce each abstract model with direct manipulation.
  1333: {
    1: { type: 'three', spec: { kind: 'isotopes', title: 'same element, different mass', isotopes: [{ label: 'C-12', protons: 6, neutrons: 6 }, { label: 'C-14', protons: 6, neutrons: 8 }] } },
    3: { type: 'three', spec: { kind: 'isotopes', title: 'neutrons change mass, not identity', isotopes: [{ label: 'C-12', protons: 6, neutrons: 6 }, { label: 'C-14', protons: 6, neutrons: 8 }] } }
  },
  1334: {
    0: { type: 'three', spec: { kind: 'atom', symbol: 'Na', shells: [2, 8, 1] } },
    2: { type: 'three', spec: { kind: 'atom', symbol: 'Na', shells: [2, 8, 1] } }
  },
  1335: {
    0: { type: 'three', spec: { kind: 'electric-attraction', title: 'electron count sets the charge' } },
    1: { type: 'three', spec: { kind: 'ion-charge-builder', protons: 11, electrons: 10, title: '11 protons · 10 electrons · charge +1' } },
    2: { type: 'three', spec: { kind: 'ion-charge-builder', protons: 17, electrons: 18, title: '17 protons · 18 electrons · charge −1' } },
    3: { type: 'three', spec: { kind: 'ion-charge-builder', protons: 11, electrons: 10, title: 'the nucleus stays at 11p⁺ while one electron is lost' } }
  },
  1336: {
    0: { type: 'three', spec: { kind: 'ionic-transfer', from: 'Na', to: 'Cl', product: 'Na+ + Cl-', title: 'give and take' } },
    3: { type: 'three', spec: { kind: 'lattice', a: 'Na', b: 'Cl', size: 3 } }
  },
  // Batch 7: four comparison floors plus four precise model returns.
  1337: {
    0: { type: 'three', spec: { kind: 'covalent-share', atom: 'O', pairs: 2, title: 'a shared pair holds both atoms' } },
    2: { type: 'three', spec: { kind: 'covalent-share', atom: 'O', pairs: 2, title: 'the shared pair is attracted to both nuclei' } }
  },
  1338: {
    1: { type: 'three', spec: { kind: 'metallic-sea', title: 'mobile electrons through an ion lattice' } },
    2: { type: 'three', spec: { kind: 'metallic-sea', title: 'mobile electrons hold the positive lattice together' } }
  },
  1339: {
    1: { type: 'three', spec: { kind: 'molecule', formula: 'CH₄', shape: 'tetrahedral', center: 'C', ligand: 'H', count: 4 } },
    2: { type: 'three', spec: { kind: 'molecule-gallery', title: 'compare four electron-pair geometries' } },
    3: { type: 'three', spec: { kind: 'molecule', formula: 'CH₄', shape: 'tetrahedral', center: 'C', ligand: 'H', count: 4 } }
  },
  1340: {
    0: { type: 'three', spec: { kind: 'polarity', title: 'uneven sharing shifts electron density' } },
    2: { type: 'three', spec: { kind: 'polarity', title: 'a small separation of charge' } }
  },
  // Batch 8: scale, structure, lone pairs, protein form, and nuclear forces.
  1053: { 4: { type: 'three', spec: { kind: 'atom-scale', title: 'the nucleus is about 100,000× smaller than the atom' } } },
  1054: { 2: { type: 'three', spec: { kind: 'atomic-structure', title: 'compact nucleus · surrounding electron region' } } },
  1104: { 2: { type: 'three', spec: { kind: 'atom-scale', title: 'stadium-sized atom · marble-sized nucleus' } } },
  1112: { 3: { type: 'three', spec: { kind: 'nucleus-forces', title: 'proton repulsion pushes out · nuclear force holds in' } } },
  // Batch 9: carbon structures, ion charge, proton transfer, and reaction motion.
  1118: { 2: { type: 'three', spec: { kind: 'carbon-architecture', title: 'carbon bonds build chains, rings, and branches' } } },
  1414: {
    3: { type: 'three', spec: { kind: 'proton-transfer', title: 'HCl gives H⁺ to water' } },
    4: { type: 'three', spec: { kind: 'proton-transfer', title: 'one transferred proton changes both species' } }
  },
  1122: { 2: { type: 'three', spec: { kind: 'mole-scale', title: 'tiny atoms become visible amounts' } } },
  1123: {
    2: { type: 'img', src: '/images/pixel/bb-1123-f2-counting-by-weighing.webp' },
    4: { type: 'three', spec: { kind: 'mass-moles', title: 'count atoms by weighing' } }
  },
  1127: { 3: { type: 'three', spec: { kind: 'isotope-average', title: 'not one atom, an average', result: 'table mass = average' } } },
  1128: { 3: { type: 'three', spec: { kind: 'isotope-average', title: '75 percent light, 25 percent heavy', result: '35.5 from the mix' } } },
  1129: { 4: { type: 'three', spec: { kind: 'mass-moles', title: 'the scale becomes a counter' } } },

  // Same smoke-signal relay GIF reused on every floor of the first two BBs
  // (founder decision). ?v= is the file's md5 prefix — bump it whenever the
  // GIF is rebuilt, or the cache-first SW keeps serving the old frames.
  1130: {
    0: { type: 'img', src: '/videos/card-1130-floor0.gif?v=515d99' },
    1: { type: 'img', src: '/videos/card-1130-floor0.gif?v=515d99' },
    2: { type: 'img', src: '/videos/card-1130-floor0.gif?v=515d99' },
    3: { type: 'img', src: '/videos/card-1130-floor0.gif?v=515d99' }
  },
  1131: {
    0: { type: 'img', src: '/videos/card-1130-floor0.gif?v=515d99' },
    1: { type: 'img', src: '/videos/card-1130-floor0.gif?v=515d99' },
    2: { type: 'img', src: '/videos/card-1130-floor0.gif?v=515d99' },
    3: { type: 'img', src: '/videos/card-1130-floor0.gif?v=515d99' },
    4: { type: 'img', src: '/videos/card-1130-floor0.gif?v=515d99' }
  },

  // ── Maths · Coordinate geometry ──
  // Manim GIFs bundled with the app. Rendered with STRATA_THEME=light.
  // The Line · "A line" — drag either point; arrows preserve the defining
  // property that a line continues without endpoints in both directions.
  1078: { 0: { type: 'line-explorer' } },

  // Curated manipulation layer. These are intentionally sparse: attach an
  // explorer only when changing a quantity exposes the board's core idea.
  // Number and scale
  1081: { 0: { type: 'concept-explorer', spec: { kind: 'number-line', primary: 2, prompt: 'Move the point across zero.' } } },
  1087: { 0: { type: 'concept-explorer', spec: { kind: 'number-line', primary: 1.5, step: 0.5, prompt: 'Place values between the whole numbers.' } } },
  1013: { 1: { type: 'concept-explorer', spec: { kind: 'scale', primary: 3, prompt: 'Move one step at a time through powers of ten.' } } },
  1156: { 0: { type: 'concept-explorer', spec: { kind: 'scale', primary: 0, prompt: 'Slide from microscopic to astronomical scales.' } } },

  // Motion, vectors, forces and rates
  1018: { 0: { type: 'concept-explorer', spec: { kind: 'vector', primary: 3, secondary: 1, prompt: 'Change the observer\'s horizontal and vertical motion.' } } },
  1032: {
    0: { type: 'concept-explorer', spec: { kind: 'force', primary: 10, secondary: 5, prompt: 'Change force and mass; acceleration must follow.' } },
    2: { type: 'concept-explorer', spec: { kind: 'force', primary: 10, secondary: 5, prompt: 'Use F = ma, then test a different force or mass.' } }
  },
  1159: { 0: { type: 'concept-explorer', spec: { kind: 'vector', primary: 3, secondary: 2, prompt: 'A vector needs both size and direction.' } } },
  1165: {
    0: { type: 'concept-explorer', spec: { kind: 'vector', primary: 4, secondary: 3, prompt: 'Build a resultant from horizontal and vertical parts.' } },
    1: { type: 'three', spec: { kind: 'vectors', mode: 'add', title: 'a + b closes the parallelogram' } }
  },
  1192: { 0: { type: 'concept-explorer', spec: { kind: 'vector', primary: 2, secondary: -4, prompt: 'Combine sideways motion with downward motion.' } } },
  1278: { 1: { type: 'three', spec: { kind: 'vectors', mode: 'components', title: 'v = vx + vy + vz' } } },
  1405: { 0: { type: 'concept-explorer', spec: { kind: 'linear', primary: 0.7, secondary: 0, prompt: 'Change the slope and watch the rate change.' } } },
  1420: { 0: { type: 'concept-explorer', spec: { kind: 'rate', primary: 12, secondary: 4, prompt: 'Change distance or time to change the rate.' } } },

  // Functions (MATH_FUNCTIONS) — floors merged to 0–2; media on 0 and 1 only
  1219: {
    0: { type: 'concept-explorer', spec: { kind: 'function', primary: 2, prompt: 'Send different inputs through the same rule.' } },
    1: { type: 'concept-explorer', spec: { kind: 'function', primary: 2, prompt: 'Build the table: each input gets one output.' } }
  },
  1220: {
    0: { type: 'concept-explorer', spec: { kind: 'function', primary: 2, prompt: 'Find the input that produces two different outputs.' } },
    1: { type: 'concept-explorer', spec: { kind: 'function', primary: 3, prompt: 'Same input twice must land on the same output.' } }
  },
  1222: {
    0: { type: 'concept-explorer', spec: { kind: 'function', fn: 'quadratic', primary: 2, prompt: 'Decide which inputs the square machine should accept.' } },
    1: { type: 'concept-explorer', spec: { kind: 'function', fn: 'quadratic', primary: 2, prompt: 'List the outputs that actually come out — that is the range.' } }
  },
  1225: {
    0: { type: 'concept-explorer', spec: { kind: 'function', fn: 'exponential', primary: 1, prompt: 'Move x one step and watch repeated multiplication.' } },
    1: { type: 'concept-explorer', spec: { kind: 'function', fn: 'exponential', primary: 1, prompt: 'Watch how the jumps grow as the amount grows.' } }
  },
  1226: {
    0: { type: 'concept-explorer', spec: { kind: 'function', fn: 'quadratic', primary: 2, prompt: 'Compare positive and negative inputs after squaring.' } },
    1: { type: 'concept-explorer', spec: { kind: 'function', fn: 'quadratic', primary: 2, prompt: 'Notice the graph flatten near the bottom and steepen on the sides.' } }
  },
  1228: {
    0: { type: 'concept-explorer', spec: { kind: 'function', primary: 2, prompt: 'Run one rule, then feed its output into a second rule.' } },
    1: { type: 'concept-explorer', spec: { kind: 'function', primary: 1, prompt: 'Inside machine first: compute g(x), then f of that result.' } }
  },
  1267: { 0: { type: 'concept-explorer', spec: { kind: 'linear', primary: 0.5, secondary: 0, prompt: 'Adjust the gradient to change steepness.' } } },
  1270: { 0: { type: 'concept-explorer', spec: { kind: 'linear', primary: 0, secondary: 1, prompt: 'Find the horizontal case; notice the vertical case is different.' } } },
  1272: { 0: { type: 'concept-explorer', spec: { kind: 'linear', primary: 0.6, secondary: 1, prompt: 'Change m and c independently.' } } },
  1310: { 0: { type: 'concept-explorer', spec: { kind: 'matrix', primary: 25, prompt: 'Transform every corner with one rotation.' } } },
  1312: { 0: { type: 'concept-explorer', spec: { kind: 'matrix', primary: 90, prompt: 'Rotate the square through positive and negative angles.' } } },
  1380: { 0: { type: 'concept-explorer', spec: { kind: 'trig', primary: 45, prompt: 'Move between the special angles.' } } },
  1382: {
    0: { type: 'concept-explorer', spec: { kind: 'trig', primary: 0, prompt: 'Travel around the circle and watch sine and cosine repeat.' } },
    1: { type: 'three', spec: { kind: 'waves', mode: 'traveling', title: 'the wave travels; the dot bobs in place' } },
    2: { type: 'three', spec: { kind: 'waves', mode: 'standing', title: 'nodes stay still; antinodes swing' } },
    3: { type: 'three', spec: { kind: 'waves', mode: 'interference', title: 'two sources interfere' } }
  },
  1384: { 0: { type: 'concept-explorer', spec: { kind: 'trig', primary: 90, prompt: 'Sweep an angle around the circle.' } } },
  1385: { 0: { type: 'concept-explorer', spec: { kind: 'derivative', primary: 1, prompt: 'Move the point; the tangent reveals local slope.' } } },
  1386: { 0: { type: 'concept-explorer', spec: { kind: 'limit', primary: 150, prompt: 'Approach the missing point without landing on it.' } } },
  1430: { 0: { type: 'concept-explorer', spec: { kind: 'limit', primary: 190, prompt: 'Make the input gap smaller and watch the output settle.' } } },

  // Computing foundations
  1132: { 0: { type: 'concept-explorer', spec: { kind: 'binary', prompt: 'Flip the switches to build a number.' } } },
  1134: { 0: { type: 'concept-explorer', spec: { kind: 'logic', gate: 'AND', prompt: 'AND turns on only when both inputs are on.' } } },
  1135: { 0: { type: 'concept-explorer', spec: { kind: 'logic', gate: 'OR', prompt: 'OR turns on when either input is on.' } } },

  // Electricity, matter, heat and chemical amount
  1327: { 0: { type: 'concept-explorer', spec: { kind: 'circuit', primary: 6, secondary: 3, prompt: 'Change voltage or resistance; current must respond.' } } },
  1343: { 0: { type: 'concept-explorer', spec: { kind: 'thermal', primary: 280, prompt: 'Temperature tracks average particle motion, not stored heat.' } } },
  1352: { 0: { type: 'concept-explorer', spec: { kind: 'gas', primary: 300, secondary: 8, prompt: 'Change temperature and volume; pressure responds.' } } },
  1422: {
    0: { type: 'concept-explorer', spec: { kind: 'thermal', primary: 250, prompt: 'Raise temperature to make energetic collisions more likely.' } },
    1: { type: 'three', spec: { kind: 'reaction-collisions', title: 'warm particles move faster and meet more often' } },
    2: { type: 'three', spec: { kind: 'reaction-collisions', title: 'more energetic collisions change the reaction rate' } }
  },
  1397: { 0: { type: 'concept-explorer', spec: { kind: 'mole', primary: 36, secondary: 18, prompt: 'Translate a visible mass into chemical amount.' } } },
  1399: { 0: { type: 'concept-explorer', spec: { kind: 'mole', primary: 24, secondary: 12, prompt: 'Use n = m ÷ M as a bridge.' } } },

  // Ray optics
  1392: { 0: { type: 'concept-explorer', spec: { kind: 'optics', mode: 'reflection', primary: 35, prompt: 'Change the incoming angle; the reflected angle matches it.' } } },
  1395: { 0: { type: 'concept-explorer', spec: { kind: 'optics', mode: 'refraction', primary: 45, prompt: 'Change the incoming angle at the air–glass boundary.' } } },

  // Curated manipulation layer · batch two
  // Measurement and uncertainty
  1001: {
    0: { type: 'concept-explorer', spec: { kind: 'measure', primary: 4, secondary: 3, prompt: 'Cover the surface with unit squares.' } },
    4: { type: 'three', spec: { kind: 'unit-cube-volume', title: '3 × 3 × 3 = 27 unit cubes' } }
  },
  1015: { 0: { type: 'concept-explorer', spec: { kind: 'uncertainty', primary: 62, secondary: 2, prompt: 'Change the instrument resolution and watch the uncertainty.' } } },
  1193: { 0: { type: 'concept-explorer', spec: { kind: 'uncertainty', primary: 60, secondary: 5, prompt: 'A finer scale narrows the range, but never removes it.' } } },

  // Geometry, functions and further calculus
  1080: { 0: { type: 'concept-explorer', spec: { kind: 'line-types', primary: 0, prompt: 'Compare endpoints on a segment, ray, and line.' } } },
  1044: { 0: { type: 'concept-explorer', spec: { kind: 'two-lines', mode: 'parallel', primary: 20, prompt: 'Turn both lines without changing their relationship.' } } },
  1045: { 0: { type: 'concept-explorer', spec: { kind: 'two-lines', mode: 'perpendicular', primary: 15, prompt: 'Turn the pair; the right angle remains.' } } },
  1269: { 0: { type: 'concept-explorer', spec: { kind: 'linear', primary: -0.6, secondary: 0, prompt: 'Cross through zero to switch gradient direction.' } } },
  1271: { 0: { type: 'concept-explorer', spec: { kind: 'linear', primary: 0.5, secondary: 2, prompt: 'Move c to change where the line crosses the y-axis.' } } },
  1227: {
    0: { type: 'concept-explorer', spec: { kind: 'inverse', primary: 2, prompt: 'Run the process forward, then undo it.' } },
    1: { type: 'concept-explorer', spec: { kind: 'inverse', primary: 2, prompt: 'Ask whether each output points back to exactly one input.' } }
  },
  1318: { 0: { type: 'concept-explorer', spec: { kind: 'function', fn: 'decay', primary: 2, prompt: 'Each step keeps the same fraction, not the same difference.' } } },
  1319: { 0: { type: 'concept-explorer', spec: { kind: 'log', primary: 4, prompt: 'Change the exponent; the logarithm names it.' } } },
  1322: { 0: { type: 'concept-explorer', spec: { kind: 'log', primary: 5, prompt: 'Watch exponentiation and logarithms mirror each other.' } } },
  1432: { 0: { type: 'concept-explorer', spec: { kind: 'derivative', primary: 0, prompt: 'Find where the local slope becomes zero.' } } },

  // Circuits and thermal physics
  1328: { 0: { type: 'concept-explorer', spec: { kind: 'circuit-pair', mode: 'series', primary: 4, secondary: 6, prompt: 'Change either resistor; series resistance adds.' } } },
  1329: { 0: { type: 'concept-explorer', spec: { kind: 'circuit-pair', mode: 'parallel', primary: 4, secondary: 6, prompt: 'Add parallel paths and compare the equivalent resistance.' } } },
  1347: { 0: { type: 'concept-explorer', spec: { kind: 'phase', primary: 0, prompt: 'Move through a change of state.' } } },
  1349: {
    0: { type: 'concept-explorer', spec: { kind: 'phase', primary: 25, prompt: 'Change temperature and watch particle arrangement change.' } },
    1: { type: 'three', spec: { kind: 'particle-states', title: 'the same particles rearrange as state changes' } }
  },

  // Chemical equations and limiting reactants
  1342: { 0: { type: 'concept-explorer', spec: { kind: 'balance', primary: 1, secondary: 1, prompt: 'Choose coefficients that conserve every atom.' } } },
  1412: { 0: { type: 'concept-explorer', spec: { kind: 'balance', primary: 3, secondary: 2, prompt: 'Balance the atoms on both sides.' } } },
  1401: { 0: { type: 'concept-explorer', spec: { kind: 'limiting', primary: 4, secondary: 7, prompt: 'Change the supplies and identify what runs out first.' } } },

  // Computing: arithmetic, control flow and system capacity
  1232: { 0: { type: 'concept-explorer', spec: { kind: 'binary-add', primary: 5, secondary: 3, prompt: 'Add two switch patterns.' } } },
  1237: { 0: { type: 'concept-explorer', spec: { kind: 'loop', primary: 5, prompt: 'Change how many times the same instruction runs.' } } },
  1238: { 0: { type: 'concept-explorer', spec: { kind: 'branch', primary: 40, secondary: 50, prompt: 'Change the input to choose a path.' } } },
  1263: { 0: { type: 'concept-explorer', spec: { kind: 'pipeline', primary: 10, secondary: 10, prompt: 'Balance demand with processing capacity.' } } },
  1264: { 0: { type: 'concept-explorer', spec: { kind: 'branch', primary: 55, secondary: 50, prompt: 'Change the condition and see which predicted path wins.' } } },
  1286: { 0: { type: 'concept-explorer', spec: { kind: 'pipeline', primary: 12, secondary: 16, prompt: 'Increase effective capacity until the queue disappears.' } } },

  // Lenses
  1396: {
    0: { type: 'concept-explorer', spec: { kind: 'lens', primary: 18, secondary: 6, prompt: 'Move the object and change the focal length.' } },
    2: { type: 'concept-explorer', spec: { kind: 'lens', primary: 18, secondary: 6, prompt: 'Shorten the focal length and compare the stronger bend.' } }
  },

  // Curated manipulation layer · batch three
  // Motion and Newtonian mechanics
  1026: { 0: { type: 'concept-explorer', spec: { kind: 'rate', primary: 15, secondary: 5, prompt: 'Change distance or time and compare how quickly position changes.' } } },
  1031: { 0: { type: 'concept-explorer', spec: { kind: 'force-balance', primary: 10, secondary: 10, prompt: 'Balance the forces until the net force is zero.' } } },
  1033: { 0: { type: 'concept-explorer', spec: { kind: 'force-pair', primary: 8, prompt: 'Strengthen the interaction; both forces change together.' } } },
  1160: { 0: { type: 'concept-explorer', spec: { kind: 'vector', primary: 4, secondary: 0, prompt: 'Give motion a direction to turn speed into velocity.' } } },
  1166: { 0: { type: 'concept-explorer', spec: { kind: 'vector', primary: 3, secondary: 4, prompt: 'Combine perpendicular components into one resultant.' } } },
  1181: { 0: { type: 'concept-explorer', spec: { kind: 'force-balance', primary: 6, secondary: 12, prompt: 'Break the balance and watch the net force appear.' } } },

  // Electricity, heat, gases and energy
  1325: {
    0: { type: 'concept-explorer', spec: { kind: 'ratio', primary: 12, secondary: 3, primaryLabel: 'Energy transferred', secondaryLabel: 'Charge moved', resultLabel: 'Voltage', resultUnit: ' J/C', prompt: 'Change energy and charge to reveal voltage as energy per charge.' } },
    3: { type: 'concept-explorer', spec: { kind: 'ratio', primary: 12, secondary: 3, primaryLabel: 'Energy transferred', secondaryLabel: 'Charge moved', resultLabel: 'Voltage', resultUnit: ' J/C', prompt: 'Return to energy per charge and test a new ratio.' } }
  },
  1330: { 0: { type: 'concept-explorer', spec: { kind: 'rate', primary: 20, secondary: 4, primaryLabel: 'Energy', primaryUnit: ' J', secondaryLabel: 'Time', secondaryUnit: ' s', resultLabel: 'Power', resultUnit: ' W', prompt: 'Transfer the same energy in less time to raise power.' } } },
  1332: {
    0: { type: 'concept-explorer', spec: { kind: 'capacitor', primary: 6, secondary: 4, prompt: 'Change voltage or capacitance and watch stored charge respond.' } },
    1: { type: 'three', spec: { kind: 'field', title: 'field between + and −', label: 'drag to orbit · separated charge fills space with a field' } }
  },
  1345: { 0: { type: 'three', spec: { kind: 'thermal-lattice', title: 'stronger vibration increases average spacing' } } },
  1351: { 0: { type: 'concept-explorer', spec: { kind: 'gas', primary: 300, secondary: 9, prompt: 'Change temperature and volume to expose the gas-law pattern.' } } },
  1353: {
    0: { type: 'three', spec: { kind: 'gas-wall-collisions', title: 'repeated wall impacts create gas pressure' } },
    1: { type: 'three', spec: { kind: 'gas-wall-collisions', hot: true, title: 'heating makes wall impacts faster and harder' } }
  },
  // Final spatial-audit batch: all remaining atom, gas, volume, and entropy floors.
  1197: { 2: { type: 'three', spec: { kind: 'atom-scale', title: 'stadium-sized atom · marble-sized nucleus' } } },
  1350: { 1: { type: 'three', spec: { kind: 'ideal-gas-particles', title: 'tiny points · random motion · elastic wall collisions' } } },
  1356: { 2: { type: 'three', spec: { kind: 'entropy-microstates', title: 'one ordered state · many dispersed microstates' } } },
  1354: { 0: { type: 'concept-explorer', spec: { kind: 'energy', primary: 80, secondary: 55, prompt: 'Divide the input between useful transfer and energy sent elsewhere.' } } },

  // Number lines, graphs, exponents and matrices
  1082: { 0: { type: 'concept-explorer', spec: { kind: 'number-line', primary: -3, prompt: 'Move left through zero into the negative numbers.' } } },
  1083: { 0: { type: 'concept-explorer', spec: { kind: 'number-line', primary: 0.5, step: 0.5, prompt: 'Place a value in the space between integers.' } } },
  1086: { 0: { type: 'concept-explorer', spec: { kind: 'number-line', primary: -2, prompt: 'Walk backward and watch subtraction move left.' } } },
  1043: {
    0: { type: 'concept-explorer', spec: { kind: 'linear', primary: 0.8, secondary: -1, prompt: 'Adjust the gradient and intercept to build the required line.' } },
    4: { type: 'concept-explorer', spec: { kind: 'linear', primary: 3, secondary: 1, prompt: 'Rebuild y = 3x + 1 and verify the finished line.' } }
  },
  1273: { 0: { type: 'concept-explorer', spec: { kind: 'two-lines', mode: 'parallel', primary: -18, prompt: 'Rotate both lines while their equal gradients keep them parallel.' } } },
  1306: { 0: { type: 'concept-explorer', spec: { kind: 'matrix-index', primary: 2, secondary: 3, prompt: 'Choose a row and column to locate one entry.' } } },
  1311: { 0: { type: 'concept-explorer', spec: { kind: 'matrix', primary: 0, prompt: 'Start at zero rotation: the identity leaves every point unchanged.' } } },
  1317: { 0: { type: 'concept-explorer', spec: { kind: 'function', fn: 'exponential', primary: 2, prompt: 'Advance one step at a time and watch equal factors compound.' } } },
  1320: { 0: { type: 'concept-explorer', spec: { kind: 'log', primary: 6, prompt: 'Move between a power and the logarithm that names its exponent.' } } },

  // Chemical ratios, amount and conservation
  1069: { 0: { type: 'concept-explorer', spec: { kind: 'ratio', primary: 2, secondary: 1, primaryLabel: 'Atoms of element A', secondaryLabel: 'Atoms of element B', resultLabel: 'Formula ratio', prompt: 'Change the whole-number ratio that defines an empirical formula.' } } },
  1209: {
    0: { type: 'concept-explorer', spec: { kind: 'mole', primary: 40, secondary: 20, prompt: 'Use mass and molar mass to cross the bridge into moles.' } },
    4: { type: 'concept-explorer', spec: { kind: 'mole', primary: 80, secondary: 40, prompt: 'Confirm that 80 g at 40 g/mol gives 2 moles.' } }
  },
  1210: { 0: { type: 'concept-explorer', spec: { kind: 'balance', primary: 1, secondary: 2, prompt: 'Adjust coefficients until the chemical recipe conserves atoms.' } } },
  1341: { 0: { type: 'concept-explorer', spec: { kind: 'balance', primary: 2, secondary: 2, prompt: 'Rearrange atoms without creating or destroying any.' } } },
  1398: { 0: { type: 'concept-explorer', spec: { kind: 'mole', primary: 54, secondary: 18, prompt: 'Count an invisible number of particles by weighing the sample.' } } },
  1400: { 0: { type: 'concept-explorer', spec: { kind: 'balance', primary: 1, secondary: 1, prompt: 'Balance the equation before reading it as a mole recipe.' } } },

  // Computing memory and resilience
  1257: { 0: { type: 'concept-explorer', spec: { kind: 'memory', primary: 3, secondary: 128, prompt: 'Select an address and change the value stored there.' } } },
  1287: { 0: { type: 'concept-explorer', spec: { kind: 'reliability', primary: 2, secondary: 90, prompt: 'Add independent copies and watch failure become less likely.' } } },

  1035: { 0: { type: 'img', src: '/media/board-gifs/bb-1035-number-line.gif' } },
  1036: { 0: { type: 'img', src: '/media/board-gifs/bb-1036-second-axis.gif' } },
  // 1038 "Every point has an address" — interactive coordinate plane (SVG, themed).
  1038: { 0: { type: 'coord-plane', spec: {
    xRange: [0, 6], yRange: [0, 2.5],
    interactive: true,
    points: [{ x: 3, y: 2 }]
  } } },
  1040: { 0: { type: 'img', src: '/videos/cg21_gradient_sign.gif' } },         // The slanted line: y follows x (+/− gradient)
  1041: { 0: { type: 'img', src: '/videos/cg18_steepness_sweep.gif' } },       // The slope of a line (steepness)
  1046: { 0: { type: 'img', src: '/videos/cg15_distance_pythagoras.gif' } },   // Distance between two points
  1049: { 0: { type: 'img', src: '/videos/cg17_rectangle_proof.gif' } },       // Proving a shape with coordinates

  // Computer Science - AI Behind the Curtain
  // 1378 "The machine still only has switches" - text is encoded before AI can process it.
  1378: { 0: { type: 'three', spec: {
    kind: 'ai-pipeline',
    title: 'English becomes machine data',
    words: ['words', 'tokens', 'bits'],
    bits: '0100000101001001'
  } } },

  // Draft expansion - Trigonometry
  // 1379 "The unit circle holds every angle" - spatial anchor for cos theta and sin theta.
  1379: {
    0: { type: 'three', spec: { kind: 'unit-circle', title: '(cos theta, sin theta)', theta: 52 } },
    4: { type: 'three', spec: { kind: 'unit-circle', title: 'rotation makes sine and cosine repeat', theta: 52 } }
  },

  // Draft expansion - Optics
  // 1394 "Refraction bends light at boundaries" - ray bends as it crosses into glass.
  1394: { 0: { type: 'three', spec: {
    kind: 'ray-optics',
    label: 'refraction at a boundary'
  } } },

  // ── Interactive-coverage batch (2026-08-02) ──
  // Wire already-verified concept explorers to uncovered boards whose concept
  // clearly matches a built kind. Kinds validated in the concept-explorer
  // visual-QA sweep; keys checked against live catalogue titles (1163-1431 range
  // alignment confirmed). Raises interactive coverage from 41% toward ~46%.
  1163: { 0: { type: 'concept-explorer', spec: { kind: 'vector', primary: 3, secondary: 2, prompt: 'Set the horizontal and vertical parts to build the arrow.' } } },
  1221: {
    0: { type: 'concept-explorer', spec: { kind: 'function', primary: 2, prompt: 'Send an input through the rule and read the output.' } },
    1: { type: 'concept-explorer', spec: { kind: 'function', primary: 5, prompt: 'Read f(5) as a button press: feed 5, then apply the rule.' } }
  },
  1223: {
    0: { type: 'concept-explorer', spec: { kind: 'function', primary: 2, prompt: 'Change the input and watch the output move.' } },
    1: { type: 'concept-explorer', spec: { kind: 'function', primary: 2, prompt: 'A vertical line should hit the graph at most once.' } }
  },
  1224: {
    0: { type: 'concept-explorer', spec: { kind: 'linear', primary: 0.7, secondary: 0, prompt: 'Change the gradient and the intercept of the line.' } },
    1: { type: 'concept-explorer', spec: { kind: 'linear', primary: 0.5, secondary: 1, prompt: 'Keep the slope steady — that is the linear signature.' } }
  },
  1230: { 0: { type: 'concept-explorer', spec: { kind: 'logic', gate: 'AND', prompt: 'Toggle the two inputs and read the gate output.' } } },
  1275: { 0: { type: 'concept-explorer', spec: { kind: 'linear', primary: 0.5, secondary: 0, prompt: 'Steepen the gradient and watch the rate change.' } } },
  1276: { 0: { type: 'concept-explorer', spec: { kind: 'logic', gate: 'OR', prompt: 'Flip the inputs to see how a gate decides its output.' } } },
  1305: { 0: { type: 'concept-explorer', spec: { kind: 'matrix-index', prompt: 'Pick a row and a column to read the entry address.' } } },
  1307: { 0: { type: 'concept-explorer', spec: { kind: 'matrix-index', prompt: 'Rows then columns: locate any entry by its address.' } } },
  1309: { 0: { type: 'concept-explorer', spec: { kind: 'matrix-index', prompt: 'Each cell holds one value; the grid holds the data.' } } },
  1313: { 0: { type: 'concept-explorer', spec: { kind: 'log', primary: 3, prompt: 'Raise the power and watch repeated multiplication.' } } },
  1314: { 0: { type: 'concept-explorer', spec: { kind: 'log', primary: 3, prompt: 'Compare powers of the same base.' } } },
  1315: { 0: { type: 'concept-explorer', spec: { kind: 'log', primary: 3, prompt: 'Change the power and read the exponent it asks for.' } } },
  1326: { 0: { type: 'concept-explorer', spec: { kind: 'circuit', primary: 6, secondary: 2, prompt: 'Raise the resistance and watch the current fall.' } } },
  1344: { 0: { type: 'concept-explorer', spec: { kind: 'thermal', primary: 300, prompt: 'Lower the temperature toward the cold limit.' } } },
  1346: { 0: { type: 'concept-explorer', spec: { kind: 'thermal', primary: 300, prompt: 'Warm the particles and watch their motion change.' } } },
  1387: { 0: { type: 'concept-explorer', spec: { kind: 'derivative', primary: 2, prompt: 'Move the point and read the slope of x squared.' } } },
  1407: { 0: { type: 'concept-explorer', spec: { kind: 'energy', primary: 20, secondary: 4, prompt: 'Split the energy into useful and lost.' } } },
  1421: { 0: { type: 'concept-explorer', spec: { kind: 'energy', primary: 20, secondary: 8, prompt: 'Follow the energy: useful plus lost stays constant.' } } },
  1423: { 0: { type: 'concept-explorer', spec: { kind: 'limit', primary: 2, prompt: 'Slide x toward the target and watch the output approach.' } } },
  1427: { 0: { type: 'concept-explorer', spec: { kind: 'limit', primary: 2, prompt: 'Approach the awkward point from either side.' } } },
  1431: { 0: { type: 'concept-explorer', spec: { kind: 'derivative', primary: 1, prompt: 'The slope at each point describes the motion.' } } }
};

// Keep the large, audited Mathematics expansion separate from the hand-tuned
// catalogue while exposing one lookup surface to the reader.
// Hand-tuned BOARD_MEDIA floors win over bulk expansion (so a curated
// concept-explorer is never replaced by a looping math-motion filler).
for (const [board, floors] of Object.entries(MATHS_MEDIA_EXPANSION)) {
  BOARD_MEDIA[board] = { ...floors, ...(BOARD_MEDIA[board] || {}) };
}
for (const [board, floors] of Object.entries(MATHS_MEDIA_80_EXPANSION)) {
  BOARD_MEDIA[board] = { ...floors, ...(BOARD_MEDIA[board] || {}) };
}

/** Media spec for a board number + floor index, or null. */
export function getFloorMedia(boardNumber, floor) {
  const board = BOARD_MEDIA[boardNumber];
  if (!board) return null;
  return board[floor] || null;
}
