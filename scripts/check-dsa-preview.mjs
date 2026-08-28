import fs from 'node:fs';
import crypto from 'node:crypto';
import { DSA_SEQUENCE_PREVIEW as lesson, inspectionsToFind } from '../src/lib/content/dsa-sequence-preview.js';
import { DSA_ARRAY_INSERTION_PREVIEW as insertion, occupiedCount, itemsMovedForInsert } from '../src/lib/content/dsa-array-insertion-preview.js';
import { DSA_INTRODUCTION_PREVIEW as introduction } from '../src/lib/content/dsa-introduction-preview.js';
import { DSA_ARRAY_GROWTH_PREVIEW as growth, nextCapacity, growthTrace, growthSummary } from '../src/lib/content/dsa-array-growth-preview.js';
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
check(/showDsaSequencePreview\s*=.*dsa-sequence-preview/.test(app) && !/showDsaSequencePreview\s*=.*workshop/.test(app), 'approved index sample is reachable by URL');
check(/showFactoryMode\s*=.*workshop/.test(app), 'factory remains workshop-gated');
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
check(/APPROVED.*AUTHORING ONLY/.test(insertion.status), 'second sample states its approval and authoring boundary');
check(insertion.objective.split(/[.!?]/).filter(Boolean).length === 1, 'second sample has one objective');
check(insertion.prerequisites.some(item => item.includes('DSA-SEQ-001')), 'second sample names the approved prerequisite');
check(insertion.initialItems.at(-1) === null, 'insertion model declares one spare slot');
check(occupiedCount === 6 && insertion.initialItems.length === occupiedCount + 1, 'spare-capacity model is six occupied slots plus one empty');
check(insertion.insertion.moveOrder.join(',') === '5,4,3,2', 'safe move order runs from occupied end to insertion index');
check(insertion.insertion.moveOrder.length === itemsMovedForInsert(occupiedCount, insertion.insertion.index), 'required moves match insertion cost at the requested index');
check(itemsMovedForInsert(occupiedCount, 0) === occupiedCount && itemsMovedForInsert(occupiedCount, 3) === 3 && itemsMovedForInsert(occupiedCount, occupiedCount) === 0, 'insertion cost follows the requested position');
check(itemsMovedForInsert(occupiedCount, occupiedCount + 1) === null, 'invalid insertion position is rejected');
check(insertion.comparisons.map(choice => choice.id).join(',') === 'start,middle,end', 'cost comparison covers beginning, middle and empty end');
check(insertion.comparisons.every(choice => insertion.comparisons.filter(other => other.index === choice.index).length === 1), 'each comparison position is unique');
check(insertion.comparisons.some(choice => choice.id === insertion.prediction.correct), 'growth prediction names a compared position');
check(itemsMovedForInsert(occupiedCount, insertion.comparisons[0].index) > itemsMovedForInsert(occupiedCount, insertion.comparisons[1].index), 'beginning costs more than the middle');
check(itemsMovedForInsert(occupiedCount, insertion.comparisons[1].index) > itemsMovedForInsert(occupiedCount, insertion.comparisons[2].index), 'middle costs more than the empty end');
check(/showDsaArrayInsertionPreview\s*=.*dsa-array-insertion-preview/.test(app) && !/showDsaArrayInsertionPreview\s*=.*workshop/.test(app), 'approved insertion sample is reachable by URL');
check(!/mission === ['"]dsa-array-insertion-preview/.test(app), 'second preview does not enter the learner mission roster');
const insertionView = fs.readFileSync(new URL('../src/views/DsaArrayInsertionPreview.svelte', import.meta.url), 'utf8');
const insertionLab = fs.readFileSync(new URL('../src/lib/components/ArrayInsertionLab.svelte', import.meta.url), 'utf8');
check(/opendatastructures\.org/.test(insertionView) && /opendsa-server\.cs\.vt\.edu/.test(insertionView) && /docs\.python\.org/.test(insertionView), 'second preview carries source links');
check(/OF 3/.test(insertionLab), 'insertion bench has a read-do-compare third step');
check(/would overwrite/.test(insertionLab) && /would be overwritten/.test(insertionLab), 'wrong-direction moves show the overwrite instead of only describing it');
check(/inspectCost/.test(insertionLab) && /allCompared/.test(insertionLab), 'learner must inspect every comparison position before the recall check');
check(/repeat\(7/.test(insertionLab) && !/repeat\(4/.test(insertionLab), 'the array stays one row of seven slots');
const insertionFigure = fs.readFileSync(new URL('../src/lib/components/ArrayInsertionFigure.svelte', import.meta.url), 'utf8');
check(/dsa-array-insertion-preview/.test(insertionFigure), 'array illustration is computed from the lesson, not a second set of labels');
check(/<svg[\s>]/.test(insertionFigure) && !/<img|\.png|\.jpe?g|\.webp/.test(insertionFigure), 'array illustration is deterministic SVG, not raster');
check(/prefers-reduced-motion/.test(insertionFigure) && /reducedMotion/.test(insertionFigure), 'array animation honours reduced-motion preference');
check(/Replay movement/.test(insertionFigure) && /on:click=\{play\}/.test(insertionFigure), 'array animation can be replayed');
check(/ArrayInsertionFigure/.test(insertionView), 'second reading includes the animated model');
check(/beginning, the middle and the empty end/.test(insertionView), 'reading prepares the three-position comparison');

const insertionApproval = approvals[insertion.id];
check(insertionApproval?.approvedBy === 'founder' && insertionApproval?.approvedOn === '2026-08-28', 'insertion founder approval is recorded with its date');
for (const [file, expected] of Object.entries(insertionApproval?.files || {})) {
  const source = fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
    .replace(/\r\n/g, '\n');
  const actual = crypto.createHash('sha256').update(source, 'utf8').digest('hex');
  check(actual === expected, `${file} is unchanged since founder approval`);
}

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
check(/showDsaIntroductionPreview\s*=.*dsa-introduction-preview/.test(app) && !/showDsaIntroductionPreview\s*=.*workshop/.test(app), 'approved orientation is reachable by URL');
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

/* ── DSA-ARR-003, an unreviewed draft ─────────────────────────────────────
   The approved samples above are checked for being approved. This one is
   checked for the opposite: that it does not claim an approval it has not
   been given, and that it stays off the production site until it has. The
   numeric checks matter just as much, because the whole lesson rests on two
   totals being wildly different for a reason the learner can reconstruct. */

const growthOne = growthSummary('one', growth.appendTarget, growth.startCapacity);
const growthDouble = growthSummary('double', growth.appendTarget, growth.startCapacity);

check(growth.id === 'DSA-ARR-003', 'growth sample has a stable curriculum identifier');
check(/APPROVED.*AUTHORING ONLY/.test(growth.status), 'growth sample states its approval and authoring boundary');
check(growth.objective.split(/[.!?]/).filter(Boolean).length === 1, 'growth sample has one objective');
check(growth.prerequisites.some(item => item.includes('DSA-ARR-002')), 'growth sample names the approved insertion lesson as its prerequisite');

check(nextCapacity('double', 4) === 8 && nextCapacity('one', 4) === 5, 'each strategy grows the capacity as described');
check(nextCapacity('halve', 4) === null && nextCapacity('double', 0) === null, 'an unknown strategy or empty array is refused rather than guessed');
check(growthTrace('double', 0, 4) === null && growthTrace('nope', 8, 4) === null, 'an impossible run is refused rather than drawn');

check(growthOne.finalCapacity === growthDouble.finalCapacity, 'both strategies finish in the same capacity, so the comparison is fair');
check(growthOne.wastedSlots === 0 && growthDouble.wastedSlots === 0, 'neither strategy wastes a slot at the end, so the difference is work and not memory');
check(growthDouble.totalCopies < growthOne.totalCopies, 'doubling copies less than growing one slot at a time');
check(growthOne.totalCopies / growthDouble.totalCopies > 10, 'the difference is an order of magnitude, not a rounding detail');
check(growthDouble.growEvents < growthOne.growEvents, 'doubling grows fewer times');
check(growthDouble.copiesPerAppend < 1, 'averaged over the run, doubling pays under one copy per append');
check(growthOne.copiesPerAppend > 10, 'averaged over the run, growing by one pays many copies per append');
check(growthDouble.worstAppend * 2 === growthDouble.finalCapacity, 'the worst single append under doubling copies half the final capacity');

check(growth.full.choices.filter(c => c.id === growth.full.correct).length === 1, 'the full-array moment has exactly one correct answer');
check(growth.full.correct === 'copy', 'the correct answer is to claim a larger array and copy');
check(growth.full.choices.every(c => c.cost && c.cost.length >= 45), 'every wrong answer states what it actually costs');
check(growth.prediction.answers.some(a => a.id === growth.prediction.correct), 'growth prediction has a valid correct answer');

const atSize = growthSummary('double', growth.transferAppends, growth.startCapacity);
check(growth.transfer.answers.some(a => a.id === growth.transfer.correct), 'transfer question has a valid correct answer');
check(atSize.growEvents === 8 && growth.transfer.correct === 'few', 'the transfer answer matches the computed number of growths at that size');
check(atSize.totalCopies < growth.transferAppends * 2, 'at a thousand items doubling still pays about one copy per item, which is the point of the lesson');

check(/showDsaArrayGrowthPreview\s*=.*dsa-array-growth-preview/.test(app) && !/showDsaArrayGrowthPreview\s*=.*workshop/.test(app), 'approved growth sample is reachable by URL');
check(!/mission === ['"]dsa-array-growth-preview/.test(app), 'growth sample does not enter the learner mission roster');

const growthView = fs.readFileSync(new URL('../src/views/DsaArrayGrowthPreview.svelte', import.meta.url), 'utf8');
const growthFigure = fs.readFileSync(new URL('../src/lib/components/ArrayGrowthFigure.svelte', import.meta.url), 'utf8');
const growthLab = fs.readFileSync(new URL('../src/lib/components/ArrayGrowthLab.svelte', import.meta.url), 'utf8');

check(/opendatastructures\.org/.test(growthView) && /opendsa-server\.cs\.vt\.edu/.test(growthView) && /docs\.python\.org/.test(growthView), 'growth sample carries source links');
check(/founder approved this sample/.test(growthView) && /not rostered/.test(growthView) && /not released/.test(growthView), 'growth reading states what the approval covered and what it did not');
check(/<svg[\s>]/.test(growthFigure) && !/<img|\.png|\.jpe?g|\.webp/.test(growthFigure + growthLab), 'growth visuals are deterministic SVG, not raster');
check(/dsa-array-growth-preview/.test(growthFigure) && /growthTrace/.test(growthFigure), 'the figure is computed from the lesson, not a second set of numbers');
check(/prefers-reduced-motion/.test(growthFigure) && /reducedMotion/.test(growthFigure), 'growth animation honours reduced-motion preference');
check(/Replay the appends/.test(growthFigure) && /on:click=\{play\}/.test(growthFigure), 'growth animation can be replayed');
check(/max-width: 700px/.test(growthFigure) && /font-size: 22px/.test(growthFigure),
  'the figure raises its own type on narrow screens, because a 640-wide viewBox scales an 11px label to about 6px on a phone and check-type reads declared sizes only');
check(/OF 3/.test(growthLab), 'growth bench has a read-do-compare third step');
check(/destroyed/.test(growthLab) && /refused/.test(growthLab), 'wrong answers at the full array are shown on the array, not only described');
check(/allInspected/.test(growthLab), 'learner must inspect both strategies before the transfer question');
check(/growthSummary/.test(growthLab) && !/490|15\.31/.test(growthLab), 'the bench derives its totals rather than hardcoding them');
check(!/490|15\.31/.test(growthView), 'the reading derives its totals rather than hardcoding them');

const growthApproval = approvals[growth.id];
check(growthApproval?.approvedBy === 'founder' && growthApproval?.approvedOn === '2026-08-29', 'growth founder approval is recorded with its date');
check(Object.keys(growthApproval?.files || {}).length === 4, 'all four approved source files are digest locked');
for (const [file, expected] of Object.entries(growthApproval?.files || {})) {
  const source = fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
    .replace(/\r\n/g, '\n');
  const actual = crypto.createHash('sha256').update(source, 'utf8').digest('hex');
  check(actual === expected, `${file} is unchanged since founder approval`);
}

if (failed) process.exit(1);
console.log('\nall checks pass, the DSA sample remains authoring-only and mechanically coherent');

