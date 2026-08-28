import fs from 'node:fs';
import crypto from 'node:crypto';
import { DSA_SEQUENCE_PREVIEW as lesson, inspectionsToFind } from '../src/lib/content/dsa-sequence-preview.js';
import { DSA_ARRAY_INSERTION_PREVIEW as insertion, itemsMovedForInsert } from '../src/lib/content/dsa-array-insertion-preview.js';
import { DSA_INTRODUCTION_PREVIEW as introduction } from '../src/lib/content/dsa-introduction-preview.js';
import approvals from '../curriculum/APPROVED-DSA.json' with { type: 'json' };

let failed = false;
const check = (condition, label) => {
  console.log(`${condition ? '   PASS' : '   FAIL'}  ${label}`);
  if (!condition) failed = true;
};

check(lesson.id === 'DSA-SEQ-001', 'sample has a stable curriculum identifier');
check(/APPROVED.*AUTHORING ONLY/.test(lesson.status), 'sample states its approval and authoring boundary');
check(lesson.objective.split(/[.!?]/).filter(Boolean).length === 1, 'sample has one objective');
check(lesson.prerequisites.length >= 2, 'prerequisites are explicit');
check(lesson.items.length === 16 && new Set(lesson.items).size === 16, 'sequence has sixteen unique labels');
check(lesson.direct.targetIndex >= 0 && lesson.direct.targetIndex < lesson.items.length, 'direct-access ticket points to a real position');
check(lesson.items.includes(lesson.search.target), 'search ticket points to a real value');
check(inspectionsToFind(lesson.items, lesson.search.target) === lesson.items.indexOf(lesson.search.target) + 1, 'linear search counts every inspected item');
check(inspectionsToFind(lesson.items, 'NOT-HERE') === lesson.items.length, 'unsuccessful search inspects the whole sequence');
check(lesson.prediction.answers.some(answer => answer.id === lesson.prediction.correct), 'growth prediction has a valid correct answer');

const app = fs.readFileSync(new URL('../src/App.svelte', import.meta.url), 'utf8');
const view = fs.readFileSync(new URL('../src/views/DsaSequencePreview.svelte', import.meta.url), 'utf8');
check(/showDsaSequencePreview\s*=.*workshop/.test(app), 'route is gated behind the authoring workshop');
check(!/mission === ['"]dsa-sequence-preview/.test(app), 'preview does not enter the learner mission roster');
check(/opendatastructures\.org/.test(view) && /opendsa-server\.cs\.vt\.edu/.test(view) && /docs\.python\.org/.test(view), 'learner preview carries source links');

const approval = approvals[lesson.id];
check(approval?.approvedBy === 'founder' && approval?.approvedOn === '2026-08-28', 'founder approval is recorded with its date');
for (const [file, expected] of Object.entries(approval?.files || {})) {
  const source = fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
    .replace(/\r\n/g, '\n');
  const actual = crypto.createHash('sha256').update(source, 'utf8').digest('hex');
  check(actual === expected, `${file} is unchanged since founder approval`);
}

check(insertion.id === 'DSA-ARR-002', 'second sample has a stable curriculum identifier');
check(/AI_DRAFT.*AUTHORING ONLY/.test(insertion.status), 'second sample states its review boundary');
check(insertion.objective.split(/[.!?]/).filter(Boolean).length === 1, 'second sample has one objective');
check(insertion.prerequisites.some(item => item.includes('DSA-SEQ-001')), 'second sample names the approved prerequisite');
check(insertion.initialItems.at(-1) === null, 'insertion model declares one spare slot');
check(insertion.insertion.moveOrder.join(',') === '5,4,3,2', 'safe move order runs from occupied end to insertion index');
check(itemsMovedForInsert(6, 0) === 6 && itemsMovedForInsert(6, 3) === 3 && itemsMovedForInsert(6, 6) === 0, 'insertion cost follows the requested position');
check(itemsMovedForInsert(6, 7) === null, 'invalid insertion position is rejected');
check(/showDsaArrayInsertionPreview\s*=.*workshop/.test(app), 'second route is gated behind the authoring workshop');
check(!/mission === ['"]dsa-array-insertion-preview/.test(app), 'second preview does not enter the learner mission roster');
const insertionView = fs.readFileSync(new URL('../src/views/DsaArrayInsertionPreview.svelte', import.meta.url), 'utf8');
check(/opendatastructures\.org/.test(insertionView) && /opendsa-server\.cs\.vt\.edu/.test(insertionView) && /docs\.python\.org/.test(insertionView), 'second preview carries source links');
const insertionFigure = fs.readFileSync(new URL('../src/lib/components/ArrayInsertionFigure.svelte', import.meta.url), 'utf8');
check(/<svg[\s>]/.test(insertionFigure) && !/<img|\.png|\.jpe?g|\.webp/.test(insertionFigure), 'array illustration is deterministic SVG, not raster');
check(/prefers-reduced-motion/.test(insertionFigure) && /reducedMotion/.test(insertionFigure), 'array animation honours reduced-motion preference');
check(/Replay movement/.test(insertionFigure) && /on:click=\{play\}/.test(insertionFigure), 'array animation can be replayed');
check(/ArrayInsertionFigure/.test(insertionView), 'second reading includes the animated model');

check(introduction.id === 'DSA-INTRO-000', 'orientation has a stable curriculum identifier');
check(/APPROVED.*AUTHORING ONLY/.test(introduction.status), 'orientation states its approval and authoring boundary');
check(introduction.objective.split(/[.!?]/).filter(Boolean).length === 1, 'orientation has one objective');
check(introduction.prerequisites.some(item => /No coding required/.test(item)), 'orientation is explicit that coding is not a prerequisite');
check(introduction.structures.length === 4 && introduction.cases.length === 4, 'orientation compares four problem shapes');
check(introduction.operationLenses.length === 4, 'orientation asks learners to identify the operation before the structure');
check(introduction.cases.every(item => introduction.structures.some(shape => shape.id === item.answer)), 'every orientation case has a valid structural answer');
check(introduction.cases.every(item => introduction.operationLenses.some(lens => lens.id === item.operation)), 'every orientation case has a valid operation lens');
check(introduction.cases.every(item => item.constraint && item.constraint.length >= 45), 'every orientation case states the constraint that drives the decision');
check(new Set(introduction.cases.map(item => item.answer)).size === 4, 'each problem shape is earned exactly once');
check(introduction.structures.every(item => item.tradeoff && item.tradeoff.length >= 45), 'every structure names a real trade-off');
check(introduction.transfer.answers.some(answer => answer.id === introduction.transfer.correct), 'orientation ends with a valid transfer check');
check(introduction.extension.stations.length === 4 && introduction.extension.links.length === 4, 'orientation extension keeps one stable station dataset');
check(introduction.extension.tasks.length === 2 && new Set(introduction.extension.tasks.map(item => item.answer)).size === 2, 'same data is used for two different structural decisions');
check(/showDsaIntroductionPreview\s*=.*workshop/.test(app), 'orientation route is gated behind the authoring workshop');
check(!/mission === ['"]dsa-introduction-preview/.test(app), 'orientation does not enter the learner mission roster');
const introView = fs.readFileSync(new URL('../src/views/DsaIntroductionPreview.svelte', import.meta.url), 'utf8');
const introFigure = fs.readFileSync(new URL('../src/lib/components/DsaOrientationFigure.svelte', import.meta.url), 'utf8');
const introLab = fs.readFileSync(new URL('../src/lib/components/DsaOrientationLab.svelte', import.meta.url), 'utf8');
const multipleViewsLab = fs.readFileSync(new URL('../src/lib/components/DsaMultipleViewsLab.svelte', import.meta.url), 'utf8');
check(/DsaOrientationFigure/.test(introView) && /DsaOrientationLab/.test(introView), 'orientation pairs animated reading with illustrated play');
check(/DsaMultipleViewsLab/.test(introView), 'orientation extends into a same-data different-work transfer lab');
check(/class="tradeoffs"/.test(introView), 'orientation reading makes benefits and trade-offs visible');
check(/<svg[\s>]/.test(introFigure) && !/<img|\.png|\.jpe?g|\.webp/.test(`${introFigure}${introLab}${multipleViewsLab}`), 'orientation visuals are deterministic and raster-free');
check(/Replay idea/.test(introFigure) && /prefers-reduced-motion/.test(`${introFigure}${introLab}`), 'orientation motion is replayable and honours reduced-motion preference');
check(/One railway\. Two useful organisations\./.test(multipleViewsLab) && /different levels/.test(multipleViewsLab), 'extension explains multiple views and abstraction levels precisely');
check(/opendatastructures\.org/.test(introView) && /opendsa-server\.cs\.vt\.edu/.test(introView) && /docs\.python\.org/.test(introView), 'orientation carries source links');

const introductionApproval = approvals[introduction.id];
check(introductionApproval?.approvedBy === 'founder' && introductionApproval?.approvedOn === '2026-08-28', 'orientation founder approval is recorded with its date');
for (const [file, expected] of Object.entries(introductionApproval?.files || {})) {
  const source = fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
    .replace(/\r\n/g, '\n');
  const actual = crypto.createHash('sha256').update(source, 'utf8').digest('hex');
  check(actual === expected, `${file} is unchanged since founder approval`);
}

if (failed) process.exit(1);
console.log('\nall checks pass, the DSA sample remains authoring-only and mechanically coherent');
