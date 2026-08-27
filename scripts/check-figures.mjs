// A figure in the reading is drawn from a mission's own data. This checks the
// two still agree.
//
// Every figure names something: a case in the Distribution Desk, a case in the
// Rate Desk, a program in Read the Program, cells in mission 003, a clause the
// SQL Console understands. Rename or remove any of those and the figure does not
// error — it renders empty, and an empty figure looks exactly like a chapter
// that never had one. That is the failure this catches, because no build step
// and no play test reads a chart.
//
// It bit twice while these were being written. histogram() returns bins keyed
// start and end, not from and to, so the first histogram was twenty-one
// zero-height bars and an axis reading "£undefined" at both ends, and it passed
// every guard that existed. Then the absence figure ran its explanations past
// the SVG viewBox and was clipped mid sentence. Both were found by looking.
//
//   npm run check:figures

import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { histogram, summarise, DISTRIBUTION_DESK_MISSION } from '../src/lib/game/distribution-desk-mission.js';
import { readingsFor, RATE_DESK_MISSION } from '../src/lib/game/rate-desk-mission.js';
import { runQuery } from '../src/lib/game/sql-console-mission.js';
import { runProgram, PYTHON_TRACE_MISSION } from '../src/lib/game/python-trace-mission.js';
import { MISSING_DATA_MISSION } from '../src/lib/game/missing-data-mission.js';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const find = (mission, id) => mission.cases.find(c => c.id === id);

let drawn = 0;

for (const { chapter, book } of SHARED_FOUNDATIONS) {
  for (const session of book.sessions) {
    const f = session.figure;
    if (!f) continue;
    drawn += 1;
    const where = `ch${String(chapter).padStart(2, '0')}.${session.number} ${f.kind}`;

    ok(`${where} has a caption`, Boolean(f.caption), f.caption || 'none');

    if (['data-types', 'record-chain', 'row-grain', 'decision-cycle', 'frequency-table', 'five-number-summary'].includes(f.kind)) {
      ok(`${where} has an explanatory note`, Boolean(f.note), f.note || 'none');
    }

    if (f.kind === 'frequency-table') {
      ok(`${where} has raw values to count`, Array.isArray(f.values) && f.values.length >= 5,
        `${f.values?.length || 0} values`);
      ok(`${where} raw values are finite`, f.values.every(Number.isFinite));
    }

    if (f.kind === 'five-number-summary') {
      ok(`${where} has enough values to split into halves`, Array.isArray(f.values) && f.values.length >= 4,
        `${f.values?.length || 0} values`);
      ok(`${where} raw values are finite`, f.values.every(Number.isFinite));
    }

    if (f.kind === 'histogram') {
      const c = find(DISTRIBUTION_DESK_MISSION, f.case);
      ok(`${where} names a real case`, Boolean(c), c ? f.case : `no case "${f.case}"`);
      if (!c) continue;
      const bins = histogram(c.values, f.width ?? c.width);
      const s = summarise(c.values);
      // The bug that shipped: bins whose keys the figure cannot read draw nothing.
      ok(`${where} produces bins with usable bounds`,
        bins.length > 0 && Number.isFinite(bins[0].start) && Number.isFinite(bins[bins.length - 1].end),
        `${bins.length} bins, ${bins[0]?.start} to ${bins[bins.length - 1]?.end}`);
      ok(`${where} has something to draw`, bins.some(b => b.count > 0), `tallest ${Math.max(...bins.map(b => b.count))}`);
      ok(`${where} can place its mean and median`, Number.isFinite(s.mean) && Number.isFinite(s.median),
        `mean ${Math.round(s.mean * 10) / 10}, median ${s.median}`);
    }

    if (f.kind === 'rates') {
      const c = find(RATE_DESK_MISSION, f.case);
      ok(`${where} names a real case`, Boolean(c), c ? f.case : `no case "${f.case}"`);
      if (!c) continue;
      const r = readingsFor(c);
      ok(`${where} has rows to draw`, Boolean(r?.rows?.length), `${r?.rows?.length ?? 0} rows`);
      ok(`${where} every bar has a length`, (r?.rows || []).every(x => Number.isFinite(x.value) && x.value > 0),
        (r?.rows || []).map(x => Math.round(x.value * 10) / 10).join(' / '));
    }

    if (f.kind === 'query') {
      let lastGrain = null, moved = false;
      for (const st of f.stages) {
        const res = runQuery({ where: st.where ?? null, groupBy: st.groupBy ?? null, having: st.having ?? null });
        ok(`${where} · ${st.clause} runs`, Boolean(res?.grain), `${res?.rows?.length ?? 0} rows, one row = ${res?.grain}`);
        if (lastGrain && res.grain !== lastGrain) moved = true;
        lastGrain = res?.grain;
      }
      // The figure exists to show the grain moving. If it never does, it is
      // illustrating nothing.
      ok(`${where} shows the grain actually moving`, moved, moved ? '' : 'every stage has the same grain');
    }

    if (f.kind === 'trace') {
      const c = find(PYTHON_TRACE_MISSION, f.case);
      ok(`${where} names a real program`, Boolean(c), c ? f.case : `no case "${f.case}"`);
      if (!c) continue;
      const run = runProgram(c.program, c.data);
      const steps = run.trace.filter(t => t.label.startsWith(`${f.name} =`)).map(t => t.env[f.name]);
      ok(`${where} the traced name exists in the program`, steps.length > 0,
        steps.length ? `${steps.length} values: ${steps.join(', ')}` : `nothing named "${f.name}" is assigned`);
      ok(`${where} every value is a number`, steps.every(Number.isFinite));
    }

    if (f.kind === 'absence') {
      const found = f.cases.map(id => find(MISSING_DATA_MISSION, id));
      const missing = f.cases.filter((id, i) => !found[i]);
      ok(`${where} names real cells`, missing.length === 0,
        missing.length ? `unknown: ${missing.join(', ')}` : `${f.cases.length} cells`);
      ok(`${where} every cell explains itself`, found.every(c => c && c.explanation && c.displayValue !== undefined));
      // The point of the figure is the contrast, so it needs both kinds.
      const states = new Set(found.filter(Boolean).map(c => c.valueState));
      ok(`${where} contrasts a value with an absence`, states.size > 1, [...states].join(' and '));
    }
  }
}

console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}, ${drawn} figure(s) across the volume`);
process.exit(bad ? 1 : 0);
