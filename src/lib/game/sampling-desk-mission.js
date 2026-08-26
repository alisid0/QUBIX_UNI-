const options = rows => Object.freeze(rows.map(row => Object.freeze(row)));
const freezeCase = value => Object.freeze({
  ...value,
  facts: options(value.facts),
  diagnosisOptions: options(value.diagnosisOptions),
  repairOptions: options(value.repairOptions),
  releaseOptions: options(value.releaseOptions)
});

export const SAMPLING_DESK_MISSION = Object.freeze({
  id: 'MISSION 106', status: 'AI_DRAFT', role: 'ANALYST', title: 'The Sampling Desk',
  competency: 'Set the boundary of a claim from its population, frame, invitation and response process, then repair the sampling plan.',
  summaryKey: 'release',
  steps: Object.freeze([
    Object.freeze({ key: 'diagnosis', label: 'Diagnose', question: 'What is the decisive sampling problem?', theory: 'Start with who could enter the data. A large sample does not repair a frame that excludes the group the claim names.' }),
    Object.freeze({ key: 'repair', label: 'Repair', question: 'What is the smallest useful repair?', theory: 'Change the route into the sample, not the arithmetic after it. The repair must give the missing group a route to selection.' }),
    Object.freeze({ key: 'release', label: 'Release', question: 'What is the strongest sentence you can release now?', theory: 'The claim may be narrowed, qualified or blocked. Do not borrow a population the sample never observed.' })
  ]),
  sources: Object.freeze([
    Object.freeze({ label: 'OpenStax — Data, Sampling, and Variation', url: 'https://openstax.org/books/introductory-statistics/pages/1-2-data-sampling-and-variation-in-data-and-sampling', licence: 'CC BY 4.0' }),
    Object.freeze({ label: 'Government Analysis Function — Communicating quality and uncertainty', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/', licence: 'Open Government Licence 3.0' })
  ]),
  cases: Object.freeze([
    freezeCase({
      id: 'web-ease', title: 'The successful-checkout survey',
      brief: 'A board slide turns a voluntary survey shown after web payment into a statement about every customer.',
      facts: [
        ['Claim', '92% of all customers found checkout easy.'],
        ['Population claimed', 'All Qubix customers'],
        ['Sample frame', 'Completed web checkouts that accepted the survey invitation'],
        ['Missing from the frame', 'Failed web checkouts, store shoppers and non-responders']
      ],
      diagnosis: 'undercoverage',
      diagnosisOptions: [
        ['undercoverage', 'Undercoverage and self-selection', 'the least successful journeys have no route into the result'],
        ['small', 'The sample is simply too small', 'size is not the primary fault described here'],
        ['rounding', 'The percentage was rounded too heavily', 'rounding cannot add missing customers']
      ],
      diagnosisWhy: 'Only completed web journeys could be invited, and response was voluntary. The missing groups are systematic, not random noise.',
      repair: 'multi-channel',
      repairOptions: [
        ['weight', 'Add more decimal places to the percentage', 'more precision does not change the frame'],
        ['multi-channel', 'Randomly invite from store, successful-web and failed-web contact routes', 'give each named group a path into the sample'],
        ['repeat', 'Run the same web survey for another month', 'more of the same respondents preserves the bias']
      ],
      repairWhy: 'A channel-aware invitation frame addresses the excluded journeys and can record non-response by channel.',
      release: 'narrow',
      releaseOptions: [
        ['all', '92% of all customers found checkout easy.', 'still claims people who were never in the frame'],
        ['none', 'The survey tells us nothing at all.', 'it does describe the people who answered'],
        ['narrow', '92% of respondents after a completed web checkout rated it easy; failed and non-web journeys were not sampled.', 'states the respondent group and limitation']
      ],
      releaseWhy: 'The narrowed sentence is faithful to the respondents and leaves the missing population visible.'
    }),
    freezeCase({
      id: 'midday-queue', title: 'The two-hour queue audit',
      brief: 'A team observes waiting times at one flagship branch between noon and two, then calls the result a national daily figure.',
      facts: [
        ['Claim', 'Qubix shoppers wait 4.2 minutes on average.'],
        ['Population claimed', 'All shoppers at all branches and times'],
        ['Sample frame', 'Till arrivals at Branch B-01 from 12:00 to 14:00 on Tuesday'],
        ['Observed', '120 waits, mean 4.2 minutes']
      ],
      diagnosis: 'time-place',
      diagnosisOptions: [
        ['measurement', 'Waiting time cannot be measured numerically', 'it is a measurable duration'],
        ['time-place', 'The frame covers one place and one time window', 'the national daily population is mostly outside it'],
        ['duplicate', 'Each shopper must have been counted twice', 'the evidence does not establish duplication']
      ],
      diagnosisWhy: 'Tuesday lunchtime at a flagship branch may have a different queue process from evenings, weekends and other branches.',
      repair: 'stratify',
      repairOptions: [
        ['bigger-one', 'Observe 1,200 lunchtime waits at B-01', 'more rows do not widen the frame'],
        ['median', 'Replace the mean with a median', 'a different summary does not repair selection'],
        ['stratify', 'Sample planned branch and time strata, including evenings and weekends', 'make the frame cover the variation named by the claim']
      ],
      repairWhy: 'A planned branch-by-time design gives the named population a route into the sample and makes coverage auditable.',
      release: 'local',
      releaseOptions: [
        ['local', 'At B-01 on Tuesday from 12:00–14:00, the 120 observed waits averaged 4.2 minutes.', 'matches the observed frame exactly'],
        ['national', 'The national average wait is 4.2 minutes.', 'the sample cannot support that reach'],
        ['causal', 'Staffing caused the 4.2-minute wait.', 'no comparison establishes a cause']
      ],
      releaseWhy: 'This is a useful local measurement once its place, period and observation count are kept in the sentence.'
    }),
    freezeCase({
      id: 'member-collect', title: 'The active-member draw',
      brief: 'A random sample is drawn from a complete list of active loyalty members. The draft claim quietly drops the word member.',
      facts: [
        ['Claim', '38% of shoppers use click-and-collect.'],
        ['Population intended', 'Active loyalty members'],
        ['Sample frame', 'Complete active-member register'],
        ['Selection', '600 members selected by random identifier']
      ],
      diagnosis: 'wording',
      diagnosisOptions: [
        ['self-selection', 'The sample is voluntary', 'selection came from random identifiers'],
        ['no-frame', 'There is no sampling frame', 'the active-member register is the frame'],
        ['wording', 'The sample is sound for members, but the claim says all shoppers', 'the sentence outruns the intended population']
      ],
      diagnosisWhy: 'The method gives active members a known selection route. It provides no evidence about shoppers without membership.',
      repair: 'keep-frame',
      repairOptions: [
        ['keep-frame', 'Keep the random member sample and restore “active loyalty members” to the claim', 'align the sentence to the design'],
        ['web-poll', 'Replace it with an open web poll', 'that would introduce self-selection'],
        ['delete', 'Delete members who did not use click-and-collect', 'removing the comparison destroys the rate']
      ],
      repairWhy: 'No redesign is needed for the intended member population. The correction is to keep the population boundary visible.',
      release: 'member-rate',
      releaseOptions: [
        ['exact', 'Exactly 38% of active members use click-and-collect.', 'a sample estimate is not an exact population value'],
        ['member-rate', 'In the random sample, 38% of active loyalty members used click-and-collect; report sampling uncertainty with the estimate.', 'population and uncertainty are explicit'],
        ['all-shoppers', '38% of all shoppers use click-and-collect.', 'non-members were not sampled']
      ],
      releaseWhy: 'The sentence identifies the population and treats 38% as an estimate rather than a census fact.'
    }),
    freezeCase({
      id: 'call-in', title: 'The receipt call-in poll',
      brief: 'A receipt asks shoppers to call a free number if they have strong views. The response count is large and the invitation is self-selected.',
      facts: [
        ['Claim', 'Customers want later Sunday opening.'],
        ['Invitation', 'Call the number printed on your receipt'],
        ['Responses', '4,806 calls; 81% favour later opening'],
        ['Non-response', 'No information about shoppers who did not call']
      ],
      diagnosis: 'self-selection',
      diagnosisOptions: [
        ['self-selection', 'Self-selection', 'strength of opinion affects entry into the data'],
        ['random-error', 'Only ordinary sampling variability', 'the entry mechanism is systematically selective'],
        ['unit-error', 'Opening hours use the wrong unit', 'the issue is selection, not measurement units']
      ],
      diagnosisWhy: 'Callers choose themselves into the sample. A large response count makes the respondent percentage precise, not representative.',
      repair: 'invite',
      repairOptions: [
        ['publish', 'Publish because 4,806 is a large number', 'volume does not remove self-selection'],
        ['duplicate', 'Count every caller twice to increase power', 'that creates false precision'],
        ['invite', 'Randomly invite receipt holders and follow up a planned subset of non-responders', 'selection begins from a defined frame']
      ],
      repairWhy: 'Random invitation separates the analyst’s selection process from the shopper’s strength of feeling; follow-up makes non-response visible.',
      release: 'respondents',
      releaseOptions: [
        ['majority', 'A majority of all customers want later opening.', 'the result does not represent all customers'],
        ['respondents', 'Among 4,806 self-selected callers, 81% favoured later opening; this cannot estimate the customer-wide share.', 'reports the result without generalising it'],
        ['discard', 'No caller expressed a valid preference.', 'their preferences are real, just not representative']
      ],
      releaseWhy: 'The response is useful as feedback and invalid as a population estimate. The release sentence makes both facts clear.'
    })
  ])
});

