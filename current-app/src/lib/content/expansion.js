const DAY_MS = 24 * 60 * 60 * 1000;

export const PAIR_RECALL_INTERVALS_DAYS = [1, 7, 21];

function timeOf(value) {
  const time = value ? new Date(value).getTime() : 0;
  return Number.isFinite(time) ? time : 0;
}

function latestEvent(events, type, ref) {
  return events
    .filter((event) => event.type === type && String(event.ref) === String(ref))
    .sort((a, b) => timeOf(b.t) - timeOf(a.t))[0] || null;
}

function latestRecallEvent(events, moduleId) {
  return events
    .filter((event) =>
      (event.type === 'pair_recall_pass' || event.type === 'pair_recall_retry') &&
      String(event.ref).startsWith(`${moduleId}|`)
    )
    .sort((a, b) => timeOf(b.t) - timeOf(a.t))[0] || null;
}

function recallStage(event) {
  if (!event) return 0;
  const stage = Number(String(event.ref).split('|')[1]);
  return Number.isInteger(stage) && stage >= 0
    ? Math.min(stage, PAIR_RECALL_INTERVALS_DAYS.length - 1)
    : 0;
}

function mondayStart(now) {
  const date = new Date(now);
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayFromMonday = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - dayFromMonday);
  return start.getTime();
}

/**
 * Build the learner-facing state of each Learn First / Solve First pair.
 *
 * Completion and recall are derived from W events because those already sync
 * through the signed-in progress pipeline. The local discovery record remains
 * a fallback for progress created before the event is hydrated from Supabase.
 */
export function buildPairedJourneyStates(pairs, data, now = Date.now()) {
  const events = data?.ws?.events || [];
  const discoveries = data?.discoveries || {};

  return pairs.map((pair) => {
    const learnEvent = latestEvent(events, 'workshop', pair.moduleId);
    const solveEvent = latestEvent(events, 'discovery', pair.id);
    const localDiscoveryAt = discoveries[pair.id]?.lastCompletedAt || discoveries[pair.id]?.firstCompletedAt;
    const learnAt = learnEvent?.t || null;
    const solveAt = solveEvent?.t || localDiscoveryAt || null;
    const learnDone = !!learnAt;
    const solveDone = !!solveAt;
    const completed = learnDone && solveDone;
    const completedAt = completed
      ? new Date(Math.max(timeOf(learnAt), timeOf(solveAt))).toISOString()
      : null;
    const lastRouteAt = [learnAt, solveAt].filter(Boolean).sort().at(-1) || null;
    const recallEvent = completed ? latestRecallEvent(events, pair.moduleId) : null;
    const stage = recallStage(recallEvent);
    const recallAnchor = recallEvent?.t || completedAt;
    const dueAt = completed && recallAnchor
      ? new Date(timeOf(recallAnchor) + PAIR_RECALL_INTERVALS_DAYS[stage] * DAY_MS).toISOString()
      : null;

    return {
      ...pair,
      learnDone,
      solveDone,
      routesDone: Number(learnDone) + Number(solveDone),
      completed,
      learnAt,
      solveAt,
      completedAt,
      lastRouteAt,
      recallStage: stage,
      recallAttempts: events.filter((event) =>
        (event.type === 'pair_recall_pass' || event.type === 'pair_recall_retry') &&
        String(event.ref).startsWith(`${pair.moduleId}|`)
      ).length,
      recallPassed: recallEvent?.type === 'pair_recall_pass',
      recallDueAt: dueAt,
      recallDue: !!dueAt && timeOf(dueAt) <= now
    };
  });
}

export function buildExpansionSummary(pairs, data, now = Date.now()) {
  const journeys = buildPairedJourneyStates(pairs, data, now);
  const weekStartsAt = mondayStart(now);
  const events = data?.ws?.events || [];
  const activity = data?.activity || {};
  const today = new Date(now);
  let activeDays = 0;

  for (let offset = 0; offset < 7; offset++) {
    const date = new Date(weekStartsAt);
    date.setDate(date.getDate() + offset);
    if (date > today) break;
    const key = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
    ].join('-');
    if (activity[key]) activeDays += 1;
  }

  const recallRefsThisWeek = new Set(
    events
      .filter((event) =>
        (event.type === 'pair_recall_pass' || event.type === 'pair_recall_retry') &&
        timeOf(event.t) >= weekStartsAt
      )
      .map((event) => `${event.type}:${event.ref}:${event.t}`)
  );

  return {
    journeys,
    totalPairs: journeys.length,
    pairsComplete: journeys.filter((journey) => journey.completed).length,
    routesDone: journeys.reduce((sum, journey) => sum + journey.routesDone, 0),
    routesTotal: journeys.length * 2,
    routesThisWeek: journeys.reduce((sum, journey) =>
      sum +
      Number(timeOf(journey.learnAt) >= weekStartsAt) +
      Number(timeOf(journey.solveAt) >= weekStartsAt), 0),
    pairsThisWeek: journeys.filter((journey) => timeOf(journey.completedAt) >= weekStartsAt).length,
    recallsThisWeek: recallRefsThisWeek.size,
    activeDays,
    dueRecalls: journeys
      .filter((journey) => journey.recallDue)
      .sort((a, b) => timeOf(a.recallDueAt) - timeOf(b.recallDueAt)),
    partialPairs: journeys
      .filter((journey) => journey.routesDone === 1)
      .sort((a, b) => timeOf(b.lastRouteAt) - timeOf(a.lastRouteAt))
  };
}
