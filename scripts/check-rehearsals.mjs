// A rehearsal shows a learner one real case from the mission a session points
// at, so the mission is a second look rather than a first.
//
// That only works while the two agree. The reading quotes evidence strings and
// field names out of the mission, and nothing stops somebody editing the
// mission afterwards, at which point the reading is teaching a case that no
// longer exists in the form it describes. The learner would meet the mission
// expecting the rehearsal and find something else, which is worse than no
// rehearsal at all.
//
// So every fact a rehearsal states must still be findable in the case it names,
// and the mission it rehearses must be the mission the session sends you to.
//
//   npm run check:rehearsals

import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { MISSIONS } from '../src/lib/game/progress.js';
import { sourceOf } from '../src/lib/game/python-trace-mission.js';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const bySlug = new Map(MISSIONS.map(m => [m.slug, m.mission]));
const casesOf = m => m.cases || m.tasks || m.requests || [];

// A fact may compose several mission values ("Checkout · sale_line"), so each
// part is checked separately rather than the joined string.
const parts = value => String(value).split(' · ').map(s => s.trim()).filter(Boolean);

let rehearsed = 0, quoted = 0;

for (const { chapter, book } of SHARED_FOUNDATIONS) {
  for (const session of book.sessions) {
    const r = session.rehearsal;
    if (!r) continue;
    rehearsed += 1;
    const where = `ch${String(chapter).padStart(2, '0')}.${session.number} ${session.id}`;

    const mission = bySlug.get(r.mission);
    ok(`${where} rehearses a mission that exists`, !!mission, r.mission);
    if (!mission) continue;

    // Rehearsing one mission while sending the learner to another would be a
    // rehearsal for something they never play.
    const goesTo = (session.practice?.href || '').split('mission=')[1] || '';
    ok(`${where} rehearses the mission it sends you to`, goesTo === r.mission, `practice → ${goesTo || 'nowhere'}`);

    for (const rc of r.cases) {
      const found = casesOf(mission).find(c => c.id === rc.caseId);
      ok(`${where} · ${rc.caseId} is a real case`, !!found,
        found ? '' : `known: ${casesOf(mission).map(c => c.id).join(', ')}`);
      if (!found) continue;

      const blob = JSON.stringify(found);
      const missing = [];
      for (const [label, value] of rc.facts) {
        for (const part of parts(value)) {
          quoted += 1;
          if (!blob.includes(part)) missing.push(`${label}: "${part}"`);
        }
      }
      ok(`${where} · ${rc.caseId} states only what the case says`, !missing.length,
        missing.length ? missing.join('; ') : `${rc.facts.length} facts`);

      // A quoted program is checked against the one the mission executes, not
      // merely against the case object, because the listing is generated.
      if (rc.code) {
        const real = found.program ? sourceOf(found.program).map(l => l.text) : null;
        const same = real && real.join('\n') === rc.code.join('\n');
        ok(`${where} · ${rc.caseId} lists the program the mission runs`, !!same,
          same ? `${rc.code.length} lines` : `mission runs:\n        ${(real || ['no program']).join('\n        ')}`);
      }

      ok(`${where} · ${rc.caseId} answers its own question`,
        !!(rc.question && rc.answer && rc.why), rc.question ? '' : 'incomplete');
    }
  }
}

console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}, ${quoted} quoted values across ${rehearsed} rehearsal(s)`);
process.exit(bad ? 1 : 0);
