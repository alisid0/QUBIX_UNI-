/**
 * Classify every publishable BB floor under the strict raster-motion policy:
 * generated/raster GIFs are allowed only for tangible real-world scenes and
 * analogies. Technical diagrams must be code-native (Manim/SVG/canvas/Three).
 *
 * This is a conservative first-pass audit. Ambiguous floors never become GIFs.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BOARD_MEDIA } from '../src/lib/content/boardMedia.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const sourcePath = join(root, '.audit-cache', 'live-production-bbs.json');
const csvPath = join(root, '.audit-cache', 'GIF-ELIGIBILITY-AUDIT.csv');
const reportPath = join(root, 'docs', 'GIF-ELIGIBILITY-AUDIT.md');
const catalogue = JSON.parse(readFileSync(sourcePath, 'utf8'));
const boardById = new Map(catalogue.boards.map((board) => [board.id, board]));

function layerText(layer) {
  if (!layer) return '';
  return typeof layer === 'object' ? (layer.text || layer.content || '') : String(layer);
}

const source = catalogue.boards.map((board) => {
  const subject = board.tags?.subject || board.paths?.[0]?.subject || '';
  const topic = board.tags?.topic || board.paths?.[0]?.pathName || '';
  const floors = board.layers.map((layer, floor) => `**Floor ${floor}:** ${layerText(layer)}`).join('\n\n');
  return `## BB ${board.id} — ${board.title}\n\n**Subject:** ${subject} | **Topic:** ${topic}\n\n${floors}`;
}).join('\n\n---\n\n');

const formulaPattern = /(?:[A-Za-z][A-Za-z0-9⃗_{}()]*\s*=\s*[^.!?]{1,90}|[∝√Σ±]|&radic;|&prop;|&frac\d+;|\b(?:equation|formula|substitut|calculate|gradient|slope)\b)/i;
const historicalPattern = /\b(?:history|historical|invented|discovered|photograph|microscope|scientist|portrait|archive|Newton|Boole|Bell Labs|Le Grand K|CGPM)\b/i;
const sequencePattern = /\b(?:first|then|next|finally|starts?|ends?|before|after|until|step by step|one by one|gradually|as .* (?:moves?|falls?|rises?|fills?|turns?))\b/i;
const visibleMotionPattern = /\b(?:walks?|runs?|jumps?|falls?|drops?|rises?|rolls?|slides?|swings?|spins?|bounces?|stretches?|bends?|breaks?|shatters?|pours?|fills?|empties|stacks?|cuts?|tears?|folds?|unfolds?|opens?|closes?|flips?|tips?|pushes?|pulls?|throws?|catches?|carries|weighs?|hammer(?:s|ing)?|burns?|melts?|freezes?|boils?|spills?|collides?|crashes?|drips?|flows? down|moves? across|covers?|grows?|shrinks?)\b/i;
const tangiblePattern = /\b(?:egg|cake|baker|cup|spoon|tablespoon|penn(?:y|ies)|coin|jar|dog|park|marble|backpack|hammer|wire|salt crystal|rope|tug-of-war|train|car|bus|boat|desk|stick|ruler|ball|balloon|box|brick|stone|tower|smoke|door|switch|bulb|water|bucket|pipe|tap|stairs?|lift|elevator|crowd|queue|road|bridge|wheel|spring|pendulum|book|paper|map|kitchen|scale|shopping trolley|skater|bicycle|runner|rain|river|sand|glass|candle|shadow|mirror|prism|lens)\b/i;
const analogyPattern = /\b(?:imagine|think of|picture|like a|like an|as if|analogy|just like|suppose|for example|say you|everyday|recipe)\b/i;
const invisibleTechnicalPattern = /\b(?:atom|atomic|electron|proton|neutron|nucleus|molecule|molecular|isotope|ion|ionic|covalent|orbital|shell|charges?|electric field|magnetic field|bond|lattice|VSEPR|mole\b|Avogadro|particle|wavefunction|quantum|photon|current|voltage|resistance|capacitance|inductance|vector|component|resultant|momentum|acceleration|velocity|force|mass|weight|gravity|friction|speed|temperature|pressure|energy|power|density|area|volume|field line|ray diagram|wavelength|frequency|amplitude|coordinate|axis|axes|quadrant|graph|function|domain|range|gradient|slope|intercept|matrix|determinant|mathematical line|point|angle|gate|binary|bit\b|transistor|diode|circuit|packet|protocol|network|input|output|CPU|RAM|cache|bus|register|algorithm|database|server|encryption|compiler|pipeline)\b/i;
const exactStructurePattern = /\b(?:label|labelled|parts?|structure|architecture|arrangement|geometry|angle|ratio|proportion|scale drawing|table|plot|proof|derive|derivation|formula|equation|symbol|notation|diagram|schematic|cross-section|truth table|flowchart)\b/i;
const definitionPattern = /\b(?:is defined as|means that|is called|definition|in other words|the rule is|remember that|the name for)\b/i;
const comparisonPattern = /\b(?:versus|different from|difference between|compare|both|neither|same as|whereas|advantage|disadvantage|summary|recap)\b/i;

const existingMedia = new Map();
for (const board of catalogue.boards) {
  if (board.img) existingMedia.set(`${board.id}:0`, 'top-level hero image');
  board.layers.forEach((layer, floor) => {
    if (layer && typeof layer === 'object' && (layer.img || layer.image)) {
      existingMedia.set(`${board.id}:${floor}`, 'authored layer image');
    }
  });
  for (const [floor, spec] of Object.entries(BOARD_MEDIA[board.id] || {})) {
    existingMedia.set(`${board.id}:${floor}`, `boardMedia:${spec.type}`);
  }
}
const existing = new Set(existingMedia.keys());

// Human-reviewed exceptions: the raster treatment is limited to the visible
// real-world action named here. It must not contain technical overlays,
// generated labels, formulae, vectors, particle models, graphs, or schematics.
const reviewedSceneGifs = new Map([
  ['1123:2', { score: 10, expect: 'Think of a jar of pennies' }],
  ['1208:2', { score: 10, expect: 'Think of a jar of pennies' }],
  ['1240:0', { score: 10, expect: 'In a plumbing system' }],
  ['1023:3', { score: 9, expect: 'When a car brakes hard' }],
  ['1137:3', { score: 9, expect: 'first valve is open' }],
  ['1285:2', { score: 9, expect: 'wide road that suddenly narrows' }],
  ['1422:0', { score: 9, expect: 'effervescent tablet into cold water' }],
  ['1001:0', { score: 8, expect: 'lay a stick along the edge' }],
  ['1022:0', { score: 8, expect: 'bowling ball takes far more force' }],
  ['1023:0', { score: 8, expect: 'car rolls down a long, straight highway' }],
  ['1023:2', { score: 8, expect: 'car still coasts to a stop' }],
  ['1121:0', { score: 8, expect: 'bake a cake' }],
  ['1178:0', { score: 8, expect: 'car coasts down a long, straight highway' }],
]);

const reviewedTechnical = new Map([
  ['1001:2', ['TECH_ANIMATION', 'Manim/canvas unit-square construction', 'Area depends on exact square geometry and counting.']],
  ['1018:3', ['TECH_ANIMATION', 'Manim relative-velocity construction', 'The rain angle and velocity combination are exact technical relationships.']],
  ['1030:3', ['TECH_ANIMATION', 'Deterministic scale, mass, and gravity animation', 'The Earth/Moon reading and mass distinction require exact values and labels.']],
  ['1035:1', ['TECH_STATIC', 'Code-native SVG mathematical line', 'Zero thickness, infinity, and arrowheads form a precise mathematical diagram.']],
  ['1048:3', ['TECH_ANIMATION', 'SVG/canvas point-list transformation', 'Points, joins, scaling, and rotation must remain geometrically exact.']],
  ['1053:1', ['TECH_ANIMATION', 'Manim scale and repeated-halving animation', 'The numbered cuts and orders of magnitude require deterministic scaling.']],
  ['1070:1', ['TECH_ANIMATION', 'SVG/Three.js ionic-lattice fracture animation', 'Charge placement, layer displacement, and repulsion are technical structure.']],
  ['1128:0', ['TECH_ANIMATION', 'Code-native weighted-average comparison', 'The dog-park analogy still depends on exact weights and averaging.']],
  ['1191:1', ['TECH_ANIMATION', 'Manim reference-frame animation', 'The train and passenger speeds must combine exactly.']],
  ['1222:0', ['TECH_STATIC', 'Code-native function-domain visual', 'The current live floor is an abstract function rule, not the old vending-machine scene.']],
  ['1396:0', ['TECH_ANIMATION', 'Manim/SVG ray-optics animation', 'Ray bending and focal convergence require exact geometry.']],
  ['1019:0', ['STATIC_SCENE', 'Single editorial physics scene', 'The live hook names several phenomena; choose one still rather than animating a technical montage.']],
  ['1140:0', ['STATIC_SCENE', 'Single editorial measuring-stick scene', 'Picking up a stick contains too little meaningful change to justify a GIF.']],
]);

function clean(value) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function classify({ bb, floor, subject, text }) {
  const key = `${bb}:${floor}`;
  if (existing.has(key)) {
    return {
      classification: 'EXISTING_MEDIA',
      rasterPolicy: 'LOCKED_EXISTING',
      media: 'Audit existing asset; do not regenerate automatically',
      gifScore: 0,
      reason: 'Media is already wired to this BB and floor.',
    };
  }

  if (reviewedTechnical.has(key)) {
    const [classification, media, reason] = reviewedTechnical.get(key);
    return {
      classification,
      rasterPolicy: classification === 'STATIC_SCENE' ? 'ALLOWED_SCENE_ONLY' : 'FORBIDDEN_TECHNICAL',
      media,
      gifScore: 0,
      reason,
    };
  }

  if (reviewedSceneGifs.has(key)) {
    const approval = reviewedSceneGifs.get(key);
    if (!text.includes(approval.expect)) {
      return {
        classification: 'REVIEW_STALE',
        rasterPolicy: 'REVIEW_REQUIRED',
        media: 'Do not produce; the production floor changed after scene approval',
        gifScore: 0,
        reason: `Scene approval expected live text containing: ${approval.expect}`,
      };
    }
    return {
      classification: 'SCENE_GIF',
      rasterPolicy: 'ALLOWED_SCENE_ONLY',
      media: 'Short raster scene GIF/WebM; no technical overlays or generated text',
      gifScore: approval.score,
      reason: 'Human-reviewed tangible action. Raster frames may show only the visible scene; the technical explanation stays in prose or code-native media.',
    };
  }

  const hasFormula = formulaPattern.test(text);
  const invisibleTechnical = invisibleTechnicalPattern.test(text);
  const exactStructure = exactStructurePattern.test(text);
  const technical = hasFormula || invisibleTechnical || exactStructure;
  const visibleMotion = visibleMotionPattern.test(text);
  const tangible = tangiblePattern.test(text);
  const analogy = analogyPattern.test(text);
  const sequence = sequencePattern.test(text);
  const historical = historicalPattern.test(text);

  if (technical) {
    const continuous = subject === 'maths' || /\b(?:graph|axis|coordinate|vector|trajectory|rotate|angle|gradient|slope|function|wave|field|acceleration|velocity|force)\b/i.test(text);
    const mechanism = visibleMotion || sequence || /\b(?:transfer|share|flow|changes?|moves?|builds?|converts?|process|cycle|interaction|reaction)\b/i.test(text);
    return {
      classification: mechanism ? 'TECH_ANIMATION' : 'TECH_STATIC',
      rasterPolicy: 'FORBIDDEN_TECHNICAL',
      media: mechanism
        ? continuous ? 'Manim or deterministic canvas animation' : 'SVG/canvas/Three.js state animation'
        : 'Code-native SVG/Three.js/static schematic',
      gifScore: 0,
      reason: 'Accuracy, geometry, notation, invisible mechanism, or labels must remain deterministic and editable.',
    };
  }

  if (historical && !visibleMotion) {
    return {
      classification: 'PHOTO_ARCHIVE',
      rasterPolicy: 'REAL_EVIDENCE_ONLY',
      media: 'Licensed photograph or archival image',
      gifScore: 0,
      reason: 'The person, object, or historical artefact is evidence; do not fabricate it.',
    };
  }

  if (visibleMotion && tangible && (analogy || sequence || floor === 0)) {
    const score = Math.min(10, 4 + (visibleMotion ? 2 : 0) + (tangible ? 2 : 0) + (analogy ? 1 : 0) + (sequence ? 1 : 0));
    return {
      classification: 'SCENE_GIF_REVIEW',
      rasterPolicy: 'REVIEW_REQUIRED',
      media: 'Do not produce until a human confirms the action can stand alone without technical overlays',
      gifScore: score,
      reason: 'A tangible action was detected, but the floor may still depend on exact or invisible technical meaning.',
    };
  }

  if (tangible && (analogy || floor === 0)) {
    return {
      classification: 'STATIC_SCENE',
      rasterPolicy: 'ALLOWED_SCENE_ONLY',
      media: 'Single editorial scene illustration; motion would add little',
      gifScore: 0,
      reason: 'A tangible scene is useful, but the floor does not contain a meaningful visible change.',
    };
  }

  if (comparisonPattern.test(text)) {
    return {
      classification: 'TECH_STATIC',
      rasterPolicy: 'FORBIDDEN_TECHNICAL',
      media: 'Code-native comparison layout or table',
      gifScore: 0,
      reason: 'Comparison needs stable, inspectable alignment rather than generated frames.',
    };
  }

  return {
    classification: 'NONE',
    rasterPolicy: 'NOT_NEEDED',
    media: 'Text-only or continuity motif',
    gifScore: 0,
    reason: definitionPattern.test(text)
      ? 'This is primarily a definition or rule; a new animation would repeat the prose.'
      : 'No safe, necessary motion treatment was identified; default to no asset.',
  };
}

const rows = [];
for (const block of source.split(/^---\s*$/m)) {
  const heading = block.match(/^\s*## BB (\d+)\s+[—-]\s+(.+)$/m);
  if (!heading) continue;
  const [, bb, rawTitle] = heading;
  const subject = block.match(/^\*\*Subject:\*\*\s*([^|\r\n]+)/m)?.[1].trim() || '';
  const topic = block.match(/\|\s*\*\*Topic:\*\*\s*([^|\r\n]*)/m)?.[1].trim() || '';
  for (const floorMatch of block.matchAll(/^\*\*Floor (\d+):\*\*\s*(.+)$/gm)) {
    const floor = Number(floorMatch[1]);
    const text = clean(floorMatch[2]);
    rows.push({
      bb: Number(bb),
      title: clean(rawTitle),
      subject,
      topic,
      floor,
      pathNames: [...new Set((boardById.get(Number(bb))?.paths || []).map((path) => path.pathName))].join(' | '),
      contentSource: boardById.get(Number(bb))?.source || '',
      existingMedia: existingMedia.get(`${bb}:${floor}`) || '',
      ...classify({ bb, floor, subject, text }),
      floorText: text,
      reviewStatus: 'automated-conservative-pass',
      reviewNotes: '',
      assetPath: '',
    });
  }
}

function csv(value) {
  const str = String(value ?? '');
  return /[",\r\n]/.test(str) ? `"${str.replaceAll('"', '""')}"` : str;
}

const headers = Object.keys(rows[0]);
writeFileSync(csvPath, `${[headers.join(','), ...rows.map((row) => headers.map((key) => csv(row[key])).join(','))].join('\n')}\n`, 'utf8');

const counts = rows.reduce((map, row) => map.set(row.classification, (map.get(row.classification) || 0) + 1), new Map());
const subjects = [...new Set(rows.map((row) => row.subject))];
const candidates = rows
  .filter((row) => row.classification === 'SCENE_GIF')
  .sort((a, b) => b.gifScore - a.gifScore || a.bb - b.bb || a.floor - b.floor);
const reviewCandidates = rows
  .filter((row) => row.classification === 'SCENE_GIF_REVIEW')
  .sort((a, b) => b.gifScore - a.gifScore || a.bb - b.bb || a.floor - b.floor);
const boardsWithMedia = new Set([...existing].map((key) => Number(key.split(':')[0])));
const heroImages = catalogue.boards.filter((board) => board.img).length;
const layerImages = catalogue.boards.reduce((sum, board) => sum + board.layers.filter((layer) => layer && typeof layer === 'object' && (layer.img || layer.image)).length, 0);
const attachedMedia = catalogue.boards.reduce((sum, board) => sum + Object.keys(BOARD_MEDIA[board.id] || {}).length, 0);
const boardCoverage = (boardsWithMedia.size / catalogue.boardCount * 100).toFixed(1);
const floorCoverage = (existing.size / catalogue.floorCount * 100).toFixed(1);

const report = `# Live production GIF and media audit\n\n` +
  `- Catalogue: production Path manifest plus current production Supabase rows\n` +
  `- Fetched: ${catalogue.fetchedAt || 'unknown; rerun the audit'}\n` +
  `- Generated working files: \`.audit-cache/\` (ignored by Git)\n` +
  `- Coverage: ${new Set(rows.map((row) => row.bb)).size} live BBs / ${rows.length} live floors\n` +
  `- Policy: raster GIFs are permitted only for tangible real-world scenes and analogies. Technical diagrams are code-native.\n\n` +
  `## Current production media gap\n\n` +
  `| Measure | Covered | Total | Coverage |\n|---|---:|---:|---:|\n` +
  `| BBs with any media | ${boardsWithMedia.size} | ${catalogue.boardCount} | ${boardCoverage}% |\n` +
  `| Floors with any media | ${existing.size} | ${catalogue.floorCount} | ${floorCoverage}% |\n\n` +
  `The ${existing.size} covered floors comprise ${heroImages} top-level hero images, ${layerImages} authored layer images, and ${attachedMedia} \`boardMedia.js\` attachments. This measures media the current Reader can actually resolve.\n\n` +
  `### Media coverage by subject\n\n` +
  `| Subject | BBs covered | BBs total | Floors covered | Floors total |\n|---|---:|---:|---:|---:|\n` +
  subjects.map((subject) => {
    const set = rows.filter((row) => row.subject === subject);
    return `| ${subject} | ${new Set(set.filter((row) => row.existingMedia).map((row) => row.bb)).size} | ${new Set(set.map((row) => row.bb)).size} | ${set.filter((row) => row.existingMedia).length} | ${set.length} |`;
  }).join('\n') +
  `\n\n` +
  `## Classification totals\n\n` +
  `| Classification | Floors |\n|---|---:|\n` +
  [...counts].sort().map(([key, value]) => `| ${key} | ${value} |`).join('\n') +
  `\n\n## Subject coverage\n\n| Subject | BBs | Floors | Scene-GIF candidates | Technical animation | Technical static |\n|---|---:|---:|---:|---:|---:|\n` +
  subjects.map((subject) => {
    const set = rows.filter((row) => row.subject === subject);
    return `| ${subject} | ${new Set(set.map((row) => row.bb)).size} | ${set.length} | ${set.filter((row) => row.classification === 'SCENE_GIF').length} | ${set.filter((row) => row.classification === 'TECH_ANIMATION').length} | ${set.filter((row) => row.classification === 'TECH_STATIC').length} |`;
  }).join('\n') +
  `\n\n## Highest-confidence scene-GIF candidates\n\n` +
  `These floors passed the automated scan and a conservative scene-only review. They are eligible for storyboard work, not automatic generation. Technical overlays, labels, formulae, and diagrams remain forbidden in raster frames.\n\n` +
  `| Rank | BB | Floor | Subject | Title | Score | Floor beat |\n|---:|---:|---:|---|---|---:|---|\n` +
  candidates.slice(0, 60).map((row, index) => `| ${index + 1} | ${row.bb} | ${row.floor} | ${row.subject} | ${row.title.replaceAll('|', '\\|')} | ${row.gifScore} | ${row.floorText.slice(0, 150).replaceAll('|', '\\|')}${row.floorText.length > 150 ? '…' : ''} |`).join('\n') +
  `\n\n## Scene candidates awaiting manual approval\n\n` +
  `These matched the tangible-action rules but remain blocked until the floor is checked for hidden technical dependencies.\n\n` +
  `| BB | Floor | Subject | Title | Score | Floor beat |\n|---:|---:|---|---|---:|---|\n` +
  reviewCandidates.slice(0, 80).map((row) => `| ${row.bb} | ${row.floor} | ${row.subject} | ${row.title.replaceAll('|', '\\|')} | ${row.gifScore} | ${row.floorText.slice(0, 150).replaceAll('|', '\\|')}${row.floorText.length > 150 ? '…' : ''} |`).join('\n') +
  `\n\n## Non-negotiable production rule\n\n` +
  `- **SCENE_GIF / STATIC_SCENE:** raster imagery may depict only visible real-world action or a narrative analogy.\n` +
  `- **SCENE_GIF_REVIEW:** quarantined; do not produce until a human confirms the scene does not carry technical diagram work.\n` +
  `- **REVIEW_STALE:** production floor text changed after approval; block production until the floor is reviewed again.\n` +
  `- **TECH_ANIMATION / TECH_STATIC:** use Manim, SVG, canvas, Three.js, or another deterministic source. Never use generated raster imagery.\n` +
  `- **PHOTO_ARCHIVE:** use traceable real evidence, not generated documentary imagery.\n` +
  `- **NONE:** do not add media merely to fill a slot.\n`;

writeFileSync(reportPath, report, 'utf8');
console.log(`Audited ${rows.length} floors across ${new Set(rows.map((row) => row.bb)).size} BBs.`);
console.log([...counts].sort().map(([key, value]) => `${key}: ${value}`).join('\n'));
console.log(`Scene-GIF candidates: ${candidates.length}`);
console.log(`Media coverage: ${boardsWithMedia.size}/${catalogue.boardCount} BBs; ${existing.size}/${catalogue.floorCount} floors.`);
