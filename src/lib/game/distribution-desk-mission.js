// Chapter 04 had no game. Its four sessions borrowed missions written for
// units, grain and absence, which is not practice at statistics.
//
// The chapter's first instruction is "look at the shape before the summary".
// This makes that literal: every case is a real set of values, the histogram is
// computed from them at a bin width the learner chooses, and every statistic
// quoted anywhere is computed by the same functions the page draws with. A
// learner who doubts a median can sort the numbers themselves.
//
// The bin-width control is the lesson rather than a decoration. Wide bins
// smooth a second peak out of existence; narrow bins scatter it into noise.
// A feature that survives all three widths is probably real.

/* ------------------------------------------------------------- statistics -- */

export const mean = xs => xs.reduce((a, b) => a + b, 0) / xs.length;

export function median(xs) {
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/** Lower and upper quartile by the same halving rule as the median. */
export function quartiles(xs) {
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  const lower = s.slice(0, mid);
  const upper = s.length % 2 ? s.slice(mid + 1) : s.slice(mid);
  return { q1: median(lower), q3: median(upper) };
}

/** Bins of a fixed width, starting at a round number at or below the minimum. */
export function histogram(xs, width) {
  const lo = Math.floor(Math.min(...xs) / width) * width;
  const hi = Math.ceil(Math.max(...xs) / width) * width;
  const bins = [];
  for (let start = lo; start < hi; start += width) {
    bins.push({ start, end: start + width, count: xs.filter(v => v >= start && v < start + width).length });
  }
  // The largest value belongs in the last bin rather than falling off the end.
  if (bins.length) bins[bins.length - 1].count += xs.filter(v => v === hi).length;
  return bins;
}

/** How many separate humps the histogram shows at this width. */
export function peaks(bins) {
  let n = 0;
  for (let i = 0; i < bins.length; i++) {
    const before = i === 0 ? 0 : bins[i - 1].count;
    const after = i === bins.length - 1 ? 0 : bins[i + 1].count;
    if (bins[i].count > 0 && bins[i].count >= before && bins[i].count > after) n += 1;
  }
  return n;
}

export const summarise = xs => {
  const { q1, q3 } = quartiles(xs);
  return { n: xs.length, mean: mean(xs), median: median(xs), q1, q3,
    min: Math.min(...xs), max: Math.max(...xs) };
};

/* ----------------------------------------------------------------- cases -- */

export const DISTRIBUTION_DESK_MISSION = Object.freeze({
  id: 'MISSION 103', status: 'AI_DRAFT', role: 'ANALYST', title: 'The Distribution Desk',
  competency: 'Read the shape of a set of values before summarising it, and choose a summary the shape can support.',
  sources: Object.freeze([
    Object.freeze({ label: 'Government Analysis Function — data visualisation and charts', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/' }),
    Object.freeze({ label: 'Government Analysis Function — communicating uncertainty', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/' }),
    Object.freeze({ label: 'Statistics Canada — statistical units', url: 'https://www150.statcan.gc.ca/n1/pub/11-634-x/2016001/section1/chap3-eng.htm' })
  ]),
  cases: Object.freeze([
    Object.freeze({
      id: 'baskets', unit: '£', widths: Object.freeze([5, 10, 25]), width: 10,
      asked: 'What is a typical basket at Northgate?',
      note: 'Forty baskets from one Saturday afternoon.',
      values: Object.freeze([
        6, 7, 8, 9, 9, 11, 12, 12, 13, 14, 14, 15, 16, 16, 17, 18, 18, 19, 20, 21,
        21, 22, 23, 24, 26, 27, 29, 31, 33, 36, 39, 43, 48, 55, 64, 78, 96, 121, 154, 210
      ]),
      shape: 'right-tail',
      shapeOptions: Object.freeze([
        ['two-peaks', 'Two separate humps', 'that would mean two kinds of shopper'],
        ['symmetric', 'Symmetric around one centre', 'the two sides would mirror each other'],
        ['right-tail', 'One hump with a long tail to the right', 'most baskets small, a few very large']
      ]),
      shapeWhy: 'Most baskets sit under £30 and a handful stretch to £210. The tail is long and it is all on one side.',
      summary: 'median',
      summaryOptions: Object.freeze([
        ['median', 'The median, with the quartiles', 'unmoved by the few very large baskets'],
        ['mean', 'The mean', 'dragged upward by the tail'],
        ['max', 'The largest basket', 'describes one customer']
      ]),
      summaryWhy: 'The mean is £36 against a median of £21, pulled up by the tail until it sits near the top of the middle half. The median lands where the baskets actually are.',
      claim: 'typical',
      claimOptions: Object.freeze([
        ['average', 'The average basket is about £36.', 'true of the mean, and no basket near it is typical'],
        ['typical', 'Half of baskets fall between the quartiles, with a few very large ones above.', 'the middle and the tail, both stated'],
        ['none', 'Basket values are too varied to summarise.', 'gives up on a distribution that has a clear middle']
      ]),
      claimWhy: 'A skewed distribution still has a typical value. It just is not the mean, and the tail deserves its own sentence rather than being averaged into one.'
    }),

    Object.freeze({
      id: 'footfall', unit: ' shoppers', widths: Object.freeze([10, 25, 60]), width: 25,
      asked: 'How busy is a typical hour?',
      note: 'Shoppers per hour across one trading week.',
      values: Object.freeze([
        18, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
        96, 98, 101, 104, 106, 108, 110, 112, 115, 118, 120, 124, 128, 131, 136
      ]),
      shape: 'two-peaks',
      shapeOptions: Object.freeze([
        ['two-peaks', 'Two separate humps with a gap between', 'quiet hours and busy hours, and little in between'],
        ['right-tail', 'One hump with a long tail', 'that would fill the gap'],
        ['flat', 'Roughly even across the range', 'no hour would be more common than another']
      ]),
      shapeWhy: 'One cluster near 30 and another near 110, with almost nothing between 40 and 90. Those are two different kinds of hour.',
      summary: 'split',
      summaryOptions: Object.freeze([
        ['mean', 'The mean of all thirty hours', 'lands in the empty gap'],
        ['split', 'Two summaries, one per group', 'describes hours that actually occur'],
        ['range', 'The range from lowest to highest', 'says nothing about where hours cluster']
      ]),
      summaryWhy: 'The mean falls in the gap between the two clusters, describing an hour the shop never has. Two groups need two summaries, and the reason they differ is the finding.',
      claim: 'groups',
      claimOptions: Object.freeze([
        ['single', 'A typical hour sees about seventy shoppers.', 'a value that occurs in none of the thirty hours'],
        ['spread', 'Footfall varies widely from hour to hour.', 'true, and it hides the structure'],
        ['groups', 'Hours fall into two kinds, quiet and busy, and staffing should follow which is which.', 'the shape, and what it is for']
      ]),
      claimWhy: 'Two peaks are an instruction, not a nuisance. The useful question becomes what separates the two groups, which here is the time of day.'
    }),

    Object.freeze({
      id: 'weights', unit: 'g', widths: Object.freeze([2, 5, 10]), width: 5,
      asked: 'Is the filling machine drifting?',
      note: 'Net weight of thirty packs, target 500g.',
      values: Object.freeze([
        489, 491, 492, 493, 494, 495, 495, 496, 497, 497, 498, 498, 499, 499, 500,
        500, 501, 501, 502, 502, 503, 503, 504, 505, 505, 506, 507, 508, 509, 511
      ]),
      shape: 'symmetric',
      shapeOptions: Object.freeze([
        ['right-tail', 'A long tail to the right', 'the two sides are the same length here'],
        ['symmetric', 'Symmetric, tightly around one centre', 'a machine doing the same thing repeatedly'],
        ['two-peaks', 'Two humps', 'that would suggest two settings']
      ]),
      shapeWhy: 'The values sit close together and fall away evenly either side of 500. This is what a stable process looks like.',
      summary: 'mean-sd',
      summaryOptions: Object.freeze([
        ['minmax', 'The lightest and heaviest pack', 'two values out of thirty'],
        ['median', 'The median alone', 'correct, and it wastes a symmetric distribution'],
        ['mean-sd', 'The mean, with the spread', 'both are meaningful when the shape is symmetric']
      ]),
      summaryWhy: 'When the shape is symmetric the mean and median agree, and the mean is the one later mathematics is built on. The spread is what says whether the process is tight.',
      claim: 'stable',
      claimOptions: Object.freeze([
        ['stable', 'The process is centred on target, with packs varying by a few grams either side.', 'the centre and the spread'],
        ['perfect', 'Every pack is 500g.', 'no pack is exactly 500g except by chance'],
        ['under', 'Packs are underweight and the machine needs recalibrating.', 'the centre is at target; individual packs vary']
      ]),
      claimWhy: 'Variation is not error. A process centred on target with a small spread is working, and the question worth asking next is whether the spread is inside tolerance.'
    }),

    Object.freeze({
      id: 'complaints', unit: ' per week', widths: Object.freeze([1, 2, 5]), width: 2,
      asked: 'Are complaints rising?',
      note: 'Complaints per week at one branch, eight weeks.',
      values: Object.freeze([3, 4, 2, 5, 3, 6, 4, 9]),
      shape: 'too-few',
      shapeOptions: Object.freeze([
        ['symmetric', 'Symmetric', 'eight values cannot establish symmetry either'],
        ['too-few', 'Too few values to call a shape', 'eight numbers, and one of them is nine'],
        ['right-tail', 'A long right tail', 'eight values cannot establish a tail']
      ]),
      shapeWhy: 'Eight values is not enough to see a shape. Reading one from this histogram would be reading the bin width rather than the data.',
      summary: 'plot',
      summaryOptions: Object.freeze([
        ['trend', 'The trend line through the eight points', 'fits a line to noise'],
        ['mean', 'The mean, 4.5 per week', 'a summary of eight numbers, quoted as a rate'],
        ['plot', 'The eight values themselves, in order', 'small enough to show rather than summarise']
      ]),
      summaryWhy: 'With eight values there is nothing a summary can say that the values do not say better. Showing them also shows that the last week is the highest, which a mean hides.',
      claim: 'watch',
      claimOptions: Object.freeze([
        ['watch', 'The last week is the highest of eight, which is worth watching and is not yet a trend.', 'what eight values can support'],
        ['rising', 'Complaints are rising.', 'nine follows four, and four followed six'],
        ['flat', 'Complaints are stable at about four per week.', 'ignores the nine entirely']
      ]),
      claimWhy: 'A single high week in eight is exactly what random variation looks like. It is also what the start of a real rise looks like, and only more weeks separate them.'
    }),

    Object.freeze({
      id: 'delivery', unit: ' min', widths: Object.freeze([5, 15, 30]), width: 15,
      asked: 'How long does a delivery take?',
      note: 'Thirty-two deliveries from one distribution hub.',
      values: Object.freeze([
        22, 24, 25, 26, 27, 28, 28, 29, 30, 31, 31, 32, 33, 34, 35, 36,
        37, 38, 39, 41, 42, 44, 46, 48, 51, 55, 58, 62, 67, 74, 186, 212
      ]),
      shape: 'outliers',
      shapeOptions: Object.freeze([
        ['flat', 'Evenly spread from 22 to 212', 'nothing sits between 74 and 186'],
        ['symmetric', 'Symmetric around the middle', 'the two far values have no partners below'],
        ['outliers', 'One cluster, with two values far away from it', 'thirty deliveries under 75, then 186 and 212']
      ]),
      shapeWhy: 'Thirty deliveries finish inside 75 minutes and two take over three hours. Those two are a different story from the other thirty.',
      summary: 'median-flag',
      summaryOptions: Object.freeze([
        ['drop', 'The mean, with the two long ones removed', 'quietly reports a different population'],
        ['median-flag', 'The median, with the two long deliveries reported separately', 'the typical case and the exceptions, both kept'],
        ['mean', 'The mean of all thirty-two', 'the two long deliveries move it by thirteen minutes']
      ]),
      summaryWhy: 'Removing inconvenient values without saying so reports on a population the reader does not know about. Reporting them separately keeps both facts.',
      claim: 'both',
      claimOptions: Object.freeze([
        ['average', 'Deliveries average 49 minutes.', 'a figure no single delivery is near'],
        ['bad', 'Delivery times are unacceptable.', 'a judgement, and it rests on two deliveries'],
        ['both', 'A typical delivery takes about 36 minutes; two of thirty-two took over three hours and need investigating.', 'the distribution and the exceptions']
      ]),
      claimWhy: 'An outlier is a question, not a verdict. Those two deliveries may be the most important rows in the table, and they are not evidence about the other thirty.'
    }),

    Object.freeze({
      id: 'ratings', unit: '', widths: Object.freeze([1, 2, 3]), width: 1,
      asked: 'How satisfied are customers?',
      note: 'Sixty ratings on a one-to-five scale.',
      values: Object.freeze([
        1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3,
        3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5,
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
      ]),
      shape: 'ends',
      shapeOptions: Object.freeze([
        ['ends', 'Piled up at the top, with a smaller group at the bottom', 'most people content, a minority unhappy'],
        ['symmetric', 'Symmetric around the middle rating', 'the middle is not where the mass is'],
        ['flat', 'Even across all five ratings', 'five is far more common than two']
      ]),
      shapeWhy: 'Twenty-four fives and eight ones. The mass sits at the top with a real group at the bottom, which no single number describes.',
      summary: 'shares',
      summaryOptions: Object.freeze([
        ['shares', 'The share at each rating', 'the whole distribution, in five numbers'],
        ['median', 'The median rating', 'legitimate, and it hides the group at the bottom'],
        ['mean', 'The mean rating', 'the gaps between ratings were never measured']
      ]),
      summaryWhy: 'Ratings are ordinal, so a mean assumes the step from one to two equals the step from four to five. Five shares fit in a sentence and assume nothing.',
      claim: 'split',
      claimOptions: Object.freeze([
        ['good', 'Customers rate us 3.6 out of 5.', 'an average of labels, quoted as a measurement'],
        ['split', 'Two thirds rate four or five, and one in seven rates one, which is the group worth understanding.', 'both ends, with their sizes'],
        ['great', 'Most customers are satisfied.', 'true, and it drops the unhappy group entirely']
      ]),
      claimWhy: 'The unhappy minority is the actionable part, and any summary that averages it away removes the reason to look.'
    })
  ])
});

export const DESK_STEPS = Object.freeze([
  Object.freeze({ key: 'shape', label: 'LOOK', question: 'What shape is this?',
    theory: 'Draw the values before computing anything. Try more than one bin width: a feature that survives all of them is probably real, and one that appears at a single width probably is not.' }),
  Object.freeze({ key: 'summary', label: 'CHOOSE', question: 'Which summary can this shape support?',
    theory: 'Every summary is a deliberate loss of information traded for a sentence. That is a good trade only when you know what was discarded.' }),
  Object.freeze({ key: 'claim', label: 'SAY', question: 'Which sentence does the distribution support?',
    theory: 'A centre without a spread is half a description, and a summary that averages away the interesting group removes the reason to look.' })
]);

export const answerForShape = (c, key) => c?.[key];
export const optionsForShape = (c, key) => c?.[`${key}Options`] || [];
export const whyForShape = (c, key) => c?.[`${key}Why`] || '';
