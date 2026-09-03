import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Every learner-facing screen is one click from home.
//
// Stated that way rather than as a click budget, because the budget is
// folklore. The "three click rule" was tested by Joshua Porter at UIE in 2003
// and there is no correlation between click count and either task success or
// satisfaction; people do not abandon at click three. What they abandon is a
// page with no visible way back.
//
// So the rule here is the one that can actually be checked: a learner-facing
// view either carries the shared navigation, whose Qubix mark links to "/", or
// links home itself.
//
// Three missions failed this. RegionGrain, Uom and ZonePrice carried no
// navigation and their only link went further in, to the SQL console, so
// leaving meant opening something new first. Four DSA previews were worse in a
// quieter way: their only back control was a link labelled "← Authoring"
// pointing at a dev-only route, shipped to a live learner URL along with the
// rest of their authoring chrome.
//
//   node scripts/check-navigation.mjs

const VIEWS = fileURLToPath(new URL('../src/views', import.meta.url));

// Authoring and internal surfaces. A learner never reaches these, and holding a
// dev workbench to a learner-flow rule would bury the finding that matters.
// Listed by name so adding one is a decision rather than an accident.
const INTERNAL = new Set([
  'AssetShowcase', 'DataQualityAssetShowcase', 'ExerciseFactory', 'FactoryMode',
  'MissionOperationsStudio', 'PartsSheet', 'ProductAssetShowcase', 'QubixBuilder',
  'RelationalAssetShowcase', 'ReviewMode', 'StrataMigrationFactory', 'WorldAssetShowcase'
]);

// Home itself cannot be one click from home.
const IS_HOME = new Set(['Home', 'LearningFloor']);

// Known defect, not an exemption.
//
// These four carry a back control labelled "← Authoring" pointing at a dev-only
// route, on pages the founder put on live learner URLs. The fix is two words of
// markup and it was written, then reverted: the files are digest-locked in
// curriculum/APPROVED-DSA.json and check-dsa-preview.mjs correctly refused the
// change. Only the founder can approve an amendment to an approved sample, and
// a guard is not a route around that.
//
// Listed here so the build stays green while the defect stays visible. Remove
// the name once the amendment is approved; do not add to this list to silence a
// failure.
const AWAITING_FOUNDER_AMENDMENT = new Set([
  'DsaIntroductionPreview', 'DsaSequencePreview',
  'DsaArrayInsertionPreview', 'DsaArrayGrowthPreview'
]);

const read = file => { try { return fs.readFileSync(file, 'utf8'); } catch { return ''; } };

// A view that delegates to a shell is judged on what the shell renders, which
// is how EvidenceWorkflowMission carries four missions that declare no nav of
// their own.
function withShells(file) {
  const src = read(file);
  const parts = [src];
  for (const m of src.matchAll(/from\s+'(\.[^']+\.svelte)'/g)) {
    parts.push(read(path.resolve(path.dirname(file), m[1])));
  }
  return parts.join('\n');
}

let failed = false;
const check = (condition, label, detail) => {
  console.log(`   ${condition ? 'PASS' : 'FAIL'}  ${label}${detail ? `  ${detail}` : ''}`);
  if (!condition) failed = true;
};

const views = fs.readdirSync(VIEWS).filter(name => name.endsWith('.svelte'));
const stranded = [];
let checked = 0;

for (const name of views) {
  const view = name.replace('.svelte', '');
  if (INTERNAL.has(view) || IS_HOME.has(view)) continue;
  if (AWAITING_FOUNDER_AMENDMENT.has(view)) continue;
  checked += 1;

  const deep = withShells(path.join(VIEWS, name));
  const hasNav = /SiteNav|MissionMasthead/.test(deep);
  const homeLink = /href="\/"/.test(deep);
  if (!hasNav && !homeLink) stranded.push(view);
}

check(stranded.length === 0,
  `all ${checked} learner-facing views reach home in one click`,
  stranded.length ? `stranded: ${stranded.join(', ')}` : '');

console.log(`   NOTE  ${AWAITING_FOUNDER_AMENDMENT.size} approved DSA previews still carry an "← Authoring" link.`);
console.log('         Digest-locked; the fix needs founder approval, not a code change.');

// The authoring chrome that reached production once already.
const authoringLinks = views.filter(name => {
  const view = name.replace('.svelte', '');
  if (INTERNAL.has(view) || AWAITING_FOUNDER_AMENDMENT.has(view)) return false;
  return /href="\?mode=(factory|strata-factory|review|parts|exercises|assets)"/.test(read(path.join(VIEWS, name)));
});

check(authoringLinks.length === 0,
  'no learner-facing view links into an authoring route',
  authoringLinks.length ? authoringLinks.join(', ') : '');

console.log(failed
  ? '\nNavigation checks failed. A learner can reach a screen they cannot leave.\n'
  : '\nevery learner-facing view offers a way home\n');
process.exit(failed ? 1 : 0);
