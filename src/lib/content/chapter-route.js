// Chapter one, as ten steps.
//
// The chapter used to report its own length two ways at once: the route header
// counted 12, because it added the applied exercises to the five briefings and
// five missions, and the footer counted 24, because the beginner path across
// the whole volume was also on screen. A learner saw "step 3 of 24" underneath
// "0 / 12 steps" and neither number described the chapter they were reading.
//
// So there is one number now, and it is ten: five briefings and five missions,
// alternating. An applied exercise sits inside a briefing and is a gate on
// finishing that step, not a step of its own. The completion spec is explicit
// on this, and every mission built from here numbers itself from this file
// rather than counting whatever happens to be on the page.
//
// `built: false` marks a mission the route promises and the app cannot yet
// serve. It is deliberately visible rather than hidden, because the route is
// the thing being built against, and check-route-steps.mjs fails the build if
// a step claims a slug the router does not implement.

/** The final name of each mission, whether or not it exists yet. */
export const CHAPTER_ONE_ROUTE = Object.freeze([
  Object.freeze({ step: 1, kind: 'briefing', id: 'representation',
    title: 'A sale is not its record',
    result: 'Separate the real event from observed, stored and calculated values.' }),
  Object.freeze({ step: 2, kind: 'mission', id: 'process-a-sale', mission: 'checkout',
    title: 'Process a Sale', built: true,
    result: 'Place each value under observed, stored or calculated.' }),

  Object.freeze({ step: 3, kind: 'briefing', id: 'observations-variables',
    title: 'Rows and columns',
    result: 'Describe one row, one column, an observation and a variable.' }),
  Object.freeze({ step: 4, kind: 'mission', id: 'read-the-table', mission: 'read-the-table',
    title: 'Read the Table', built: true,
    result: 'Complete "one row contains details about…" and name one variable.',
    replaces: 'The 24-field Classify Store Data mission, which teaches data types a chapter early.' }),

  Object.freeze({ step: 5, kind: 'briefing', id: 'rows-grain',
    title: 'What one row represents',
    result: 'State the grain before interpreting a row count.' }),
  Object.freeze({ step: 6, kind: 'mission', id: 'name-the-grain', mission: 'table-grain',
    title: 'Name the Grain', built: false,
    result: 'Write a precise grain statement before any row count appears.' }),

  Object.freeze({ step: 7, kind: 'briefing', id: 'context-quality',
    title: 'Zero, blank, or missing?',
    result: 'Use zero for a known none and NULL for an unknown value.' }),
  Object.freeze({ step: 8, kind: 'mission', id: 'zero-or-missing', mission: 'missing-data',
    title: 'Zero or Missing?', built: false,
    result: 'Choose 0, NULL or not applicable from the process, not the cell.' }),

  Object.freeze({ step: 9, kind: 'briefing', id: 'question-to-decision',
    title: 'From a request to an analysis',
    result: 'Write a purpose, question, boundary and outcome the data can support.' }),
  Object.freeze({ step: 10, kind: 'mission', id: 'build-the-brief', mission: 'analyst-desk',
    title: 'Build the Brief', built: false,
    result: 'Assemble the four parts, and reject the claim the records cannot support.' })
]);

export const ROUTE_LENGTH = CHAPTER_ONE_ROUTE.length;

/** The route for a chapter, or an empty list for one that has not been mapped. */
export const routeForChapter = n => (n === 1 ? CHAPTER_ONE_ROUTE : []);

export const briefingSteps = () => CHAPTER_ONE_ROUTE.filter(s => s.kind === 'briefing');
export const missionSteps = () => CHAPTER_ONE_ROUTE.filter(s => s.kind === 'mission');

export const stepForSession = sessionId =>
  CHAPTER_ONE_ROUTE.find(s => s.kind === 'briefing' && s.id === sessionId) || null;

export const stepForMission = slug =>
  CHAPTER_ONE_ROUTE.find(s => s.kind === 'mission' && s.mission === slug) || null;

/**
 * How far along the route a learner is.
 *
 * A briefing counts once its reading, its check and any applied exercise are
 * done, which is the same rule the page already enforced; the exercise simply
 * stops being counted separately. A mission counts when it is marked complete.
 */
export const routeProgress = (progress, sessions) => {
  const done = new Set();
  for (const step of CHAPTER_ONE_ROUTE) {
    if (step.kind === 'briefing') {
      const session = sessions.find(s => s.id === step.id);
      const exerciseReady = !session?.exercise || progress.exercises.includes(step.id);
      if (progress.study.includes(step.id) && exerciseReady) done.add(step.step);
      continue;
    }
    // Practice is recorded against the session that sends the learner to the
    // mission, so the mission step is found through its own slug rather than
    // by assuming it sits directly after its briefing.
    const owner = sessions.find(s => s.practice?.href?.includes(`mission=${step.mission}`));
    if (owner && progress.practice.includes(owner.id)) done.add(step.step);
  }
  return { done, count: done.size, total: ROUTE_LENGTH };
};

/** The one step to put in front of the learner next. */
export const nextRouteStep = doneSet =>
  CHAPTER_ONE_ROUTE.find(s => !doneSet.has(s.step)) || null;
