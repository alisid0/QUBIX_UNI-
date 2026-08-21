// The course as a learner meets it: the declared boards and the boards built
// from Factory selections, in one list.
//
// This exists because there were three answers to "how many boards are there".
// ChangeLab built its own list, the progress store counted lesson.js, and Home
// had "five boards, twenty sections" written into the markup. Adding the pilot
// made all three disagree. Everything that needs to know now reads this.

import { boards as declaredBoards } from './lesson.js';
// Generated from the Factory selections by scripts/build-pilot.mjs, not imported
// from the option files. Importing those shipped every rejected variant and
// every authoring note into the learner bundle; see the header of that script.
import { pilotBoards } from './pilot.generated.js';

// Order follows the pilot proposal: functions and coordinate geometry sit after
// the three variable boards and before the two rate boards. The rate boards stay
// rather than being dropped, since the proposal moves them to a following course
// and that has not been approved.
export const boards = [
  ...declaredBoards.slice(0, 3),
  ...pilotBoards,
  ...declaredBoards.slice(3)
];

export { declaredBoards };

export const TOTAL_SECTIONS = boards.reduce((n, b) => n + b.floors.length, 0);
