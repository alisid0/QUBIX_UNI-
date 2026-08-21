import assert from 'node:assert/strict';
import { buildExpansionSummary, buildPairedJourneyStates } from '../src/lib/content/expansion.js';

const pairs = [{
  id: 'solve-network',
  moduleId: 'networks-cloud',
  conceptLabel: 'Computer networks'
}];

const completedData = {
  discoveries: {},
  activity: {
    '2026-07-27': 2,
    '2026-07-28': 1
  },
  ws: {
    events: [
      { type: 'workshop', ref: 'networks-cloud', amount: 8, t: '2026-07-27T10:00:00.000Z' },
      { type: 'discovery', ref: 'solve-network', amount: 12, t: '2026-07-27T11:00:00.000Z' }
    ]
  }
};

const due = buildPairedJourneyStates(
  pairs,
  completedData,
  new Date('2026-07-28T12:00:00.000Z').getTime()
)[0];

assert.equal(due.routesDone, 2);
assert.equal(due.completed, true);
assert.equal(due.recallStage, 0);
assert.equal(due.recallDue, true);
assert.equal(due.recallDueAt, '2026-07-28T11:00:00.000Z');

const recalledData = structuredClone(completedData);
recalledData.ws.events.push({
  type: 'pair_recall_pass',
  ref: 'networks-cloud|1|1785232800000',
  amount: 5,
  t: '2026-07-28T12:00:00.000Z'
});

const recalled = buildPairedJourneyStates(
  pairs,
  recalledData,
  new Date('2026-07-29T12:00:00.000Z').getTime()
)[0];

assert.equal(recalled.recallStage, 1);
assert.equal(recalled.recallDue, false);
assert.equal(recalled.recallDueAt, '2026-08-04T12:00:00.000Z');

const summary = buildExpansionSummary(
  pairs,
  recalledData,
  new Date('2026-07-28T13:00:00.000Z').getTime()
);

assert.equal(summary.routesDone, 2);
assert.equal(summary.routesTotal, 2);
assert.equal(summary.pairsComplete, 1);
assert.equal(summary.routesThisWeek, 2);
assert.equal(summary.pairsThisWeek, 1);
assert.equal(summary.recallsThisWeek, 1);
assert.equal(summary.activeDays, 2);

console.log('Phase 1.1 expansion scheduling and summary checks passed.');
