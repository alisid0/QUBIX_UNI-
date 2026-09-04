const freeze = rows => Object.freeze(rows.map(row => Object.freeze(row)));

export const PROBABILITY_VISITS = freeze([
  ['V01', 'coffee'], ['V02', 'food'], ['V03', 'both'], ['V04', 'neither'],
  ['V05', 'food'], ['V06', 'coffee'], ['V07', 'food'], ['V08', 'both'],
  ['V09', 'neither'], ['V10', 'coffee'], ['V11', 'food'], ['V12', 'coffee'],
  ['V13', 'neither'], ['V14', 'food'], ['V15', 'both'], ['V16', 'coffee'],
  ['V17', 'food'], ['V18', 'neither'], ['V19', 'coffee'], ['V20', 'food']
]);

export const PROBABILITY_COUNTER_MISSION = Object.freeze({
  id: 'MISSION 121',
  status: 'AI_DRAFT · FOUNDER-APPROVED CONCEPT',
  role: 'DATA EXPLORER',
  title: 'The Probability Counter',
  competency: 'Define an event, identify its sample space and calculate an observed probability as a fraction, percentage and decimal.',
  steps: Object.freeze([
    Object.freeze({ key: 'event', label: 'Define the event' }),
    Object.freeze({ key: 'numerator', label: 'Count the event' }),
    Object.freeze({ key: 'denominator', label: 'Name the sample space' }),
    Object.freeze({ key: 'percent', label: 'Calculate the percentage' }),
    Object.freeze({ key: 'decimal', label: 'Match the decimal' })
  ]),
  question: 'What is the observed probability that a recorded visit included coffee?',
  event: Object.freeze(['coffee', 'both']),
  numerator: 9,
  denominator: 20,
  percent: 45,
  decimal: 0.45,
  visits: PROBABILITY_VISITS,
  sources: Object.freeze([
    Object.freeze({ label: 'OpenStax — Introduction to Probability', url: 'https://openstax.org/books/introductory-statistics-2e/pages/3-introduction', licence: 'CC BY 4.0' }),
    Object.freeze({ label: 'NIST/SEMATECH — What is probability?', url: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda36.htm', licence: 'US Government work' })
  ])
});

export const includedInCoffeeEvent = outcome => PROBABILITY_COUNTER_MISSION.event.includes(outcome);
