// Four first-class session intents. Never mix them in one room.
//
// User-facing labels are the jobs a learner would actually pick, not the
// internal names. The matcher treats intent as the first score field.

export const INTENTS = Object.freeze([
  Object.freeze({
    id: 'learn',
    label: 'Help me get this',
    job: 'Understand one idea enough to explain it',
    chair: 'socratic',
    skillMix: 'adjacent',
    success: 'teach-back',
    firstToAnswer: false,
    dumpAnswers: false
  }),
  Object.freeze({
    id: 'exam',
    label: 'Quiz me / exam soon',
    job: 'Speed and accuracy on known item types',
    chair: 'coach-timer',
    skillMix: 'same',
    success: 'score-miss-list',
    firstToAnswer: true,
    dumpAnswers: false
  }),
  Object.freeze({
    id: 'curious',
    label: "I'm just interested",
    job: 'Explore with no test',
    chair: 'host',
    skillMix: 'loose',
    success: 'three-new-things',
    firstToAnswer: false,
    dumpAnswers: false
  }),
  Object.freeze({
    id: 'research',
    label: "Let's figure something out",
    job: 'Answer a question with sources',
    chair: 'chair-skeptic',
    skillMix: 'medium',
    success: 'supported-disputed-unknown',
    firstToAnswer: false,
    dumpAnswers: false
  })
]);

export const intentById = id => INTENTS.find(item => item.id === id) || null;

export const ROLE_OPTIONS = Object.freeze([
  Object.freeze({ id: 'learner', label: 'Learner' }),
  Object.freeze({ id: 'explainer', label: 'I can explain this to others' }),
  Object.freeze({ id: 'drill', label: 'Drill partner' }),
  Object.freeze({ id: 'reviewer', label: 'Reviewer' })
]);
