// Volume 0, chapter 02. The same shape as part one, so the reader needs no
// special case and the contents page can list it without being told.
//
// The chapter answers the question a learner meets immediately after "what is
// a record": the values in the record are numbers, and a number on its own
// says almost nothing. What it needs is a unit, something to be compared with,
// and a rule connecting it to other numbers.

export const SHARED_FOUNDATIONS_PART_TWO = Object.freeze({
  id: 'SHARED-FOUNDATIONS-PART-TWO',
  status: 'AI_DRAFT · AUTHORING ONLY',
  title: 'Numbers, Ratios and Change',
  subtitle: 'Part Two of Volume 0',
  totalMinutes: 230,
  sessions: Object.freeze([
    Object.freeze({
      id: 'units', number: '01', title: 'A number needs a unit', studyMinutes: 30, playMinutes: 15,
      objective: 'State what a recorded number measures, in what unit, and what its zero means.',
      opening: 'A field holds 4. Four what? Four units on the shelf, four degrees, four pounds, four days late. The digit is the least informative part of the value.',
      sections: Object.freeze([
        Object.freeze({ heading: 'The quantity, the unit and the number', paragraphs: Object.freeze([
          'Every measurement has three parts: the quantity being measured, the unit it is measured in, and the number of those units. Temperature measured in degrees Celsius with the number 4 is a different fact from temperature measured in degrees Fahrenheit with the number 4. The column name usually carries the quantity, and the unit is often left in somebody’s memory instead of in the data.',
          'This is why unit columns and suffixes exist. A field called weight is ambiguous; weight_kg is not. When a system stores the unit alongside the number, later work does not have to guess, and a value arriving in the wrong unit can be caught rather than silently averaged with the rest.'
        ]) }),
        Object.freeze({ heading: 'What zero means', paragraphs: Object.freeze([
          'Zero is not one idea. On a ratio scale, such as mass, length or a count of units sold, zero means none of the quantity is present, and it is meaningful to say one value is twice another. On an interval scale, such as degrees Celsius, zero is a chosen point on the scale rather than an absence, so 20 °C is not twice as hot as 10 °C.',
          'The practical consequence is about which arithmetic is allowed. Adding two temperatures in Celsius produces a number with no physical meaning; averaging them does. Knowing the scale a column sits on tells you what you may compute from it before you compute anything.'
        ]) }),
        Object.freeze({ heading: 'Converting without losing the original', paragraphs: Object.freeze([
          'Converting a unit is multiplying by a ratio equal to one. Three thousand grams becomes three kilograms because one kilogram divided by one thousand grams equals one, and multiplying by one changes the size of nothing. Temperature is the exception a learner meets first: Celsius from Fahrenheit needs a shift as well as a scale, because the two scales do not share a zero.',
          'Keep the value as it arrived and record the converted value beside it. A pipeline that overwrites the source leaves nobody able to check whether the conversion was right, and a wrong conversion looks exactly like a real measurement.'
        ]) })
      ]),
      example: Object.freeze({ title: 'One reading, three representations', headers: Object.freeze(['Field', 'Value', 'What it commits you to']), rows: Object.freeze([
        Object.freeze(['reading_raw', '0', 'a number with no unit: unusable on its own']),
        Object.freeze(['reading_unit', '°F', 'now the 0 is a real temperature, not an absence']),
        Object.freeze(['reading_c', '−17.8', 'derived by (0 − 32) × 5 ÷ 9, source kept beside it'])
      ]) }),
      workbook: Object.freeze({ title: 'Ten-minute unit audit', prompt: 'Take any table you can see: a receipt, a nutrition label, a weather app.', steps: Object.freeze([
        'List every number on it.',
        'Write the unit next to each one, from the label or from your own knowledge.',
        'Mark which zeros would mean "none" and which are just a point on a scale.',
        'Circle any number whose unit you had to infer rather than read.'
      ]) }),
      check: Object.freeze({
        prompt: 'A freezer log stores 0 in a column named temperature, with no unit recorded. What is the safe reading?',
        answer: 'unknown-unit',
        options: Object.freeze([
          ['freezing', 'The freezer is at freezing point'],
          ['unknown-unit', 'The number cannot be interpreted until the unit is known'],
          ['missing', 'The value is missing and should be treated as null']
        ]),
        explanation: '0 is a real recorded value, so it is not missing. But 0 °C and 0 °F are different temperatures, and one of them is dangerous for frozen stock. The number is not usable until the unit is known.'
      }),
      practice: Object.freeze({ title: 'Units and Measurement', href: '?mode=game&mission=units-measurement', instruction: 'Decide what each recorded value measures, and convert it without losing the original.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'BIPM — The International System of Units', url: 'https://www.bipm.org/en/publications/si-brochure' }),
        Object.freeze({ label: 'NIST — SI units', url: 'https://www.nist.gov/pml/owm/metric-si/si-units' })
      ])
    }),

    Object.freeze({
      id: 'ratios', number: '02', title: 'Ratios, rates and percentages', studyMinutes: 35, playMinutes: 20,
      objective: 'Read any ratio by naming its numerator, its denominator and the population it covers.',
      opening: 'Two branches each report a 12% return rate. One sold forty items and returned five. The other sold twelve thousand and returned fourteen hundred. The percentages agree and the situations do not.',
      sections: Object.freeze([
        Object.freeze({ heading: 'A ratio is a division with a story', paragraphs: Object.freeze([
          'A ratio compares two quantities by dividing one by the other. The number it produces is meaningless until both quantities are named. Returns divided by sales is a return rate. Returns divided by staff is something else entirely, and the arithmetic cannot tell them apart.',
          'The denominator is the part people forget to state and the part that decides what the number means. When a figure is disputed, the disagreement is almost always about the denominator rather than the division.'
        ]) }),
        Object.freeze({ heading: 'Rates carry a unit too', paragraphs: Object.freeze([
          'A rate is a ratio where the denominator is a different quantity from the numerator, usually time or size. Sales per day, faults per thousand units, cost per kilogram. The unit of a rate is the unit of the top divided by the unit of the bottom, and writing it that way catches mistakes: pounds divided by kilograms is a price per kilogram, and can never be a total.',
          'Rates make different-sized things comparable, which is exactly why they are worth the care. A branch selling more in total may sell less per hour open, and the two statements are both true.'
        ]) }),
        Object.freeze({ heading: 'Percentages hide their base', paragraphs: Object.freeze([
          'A percentage is a ratio multiplied by a hundred, so it inherits every ambiguity of the ratio and then hides the numbers that produced it. Five out of forty and fourteen hundred out of twelve thousand both round to about 12%, but one is a handful of returns and the other is a warehouse full.',
          'The habit that fixes this is to quote the count alongside the percentage, and to be suspicious of any percentage whose base is not stated. A percentage of a small base moves violently for reasons that have nothing to do with the thing being measured.'
        ]) })
      ]),
      example: Object.freeze({ title: 'The same 12%', headers: Object.freeze(['Branch', 'Returns / sales', 'Rate', 'What it supports']), rows: Object.freeze([
        Object.freeze(['B-08', '5 / 40', '12.5%', 'almost nothing: one more return is 15%']),
        Object.freeze(['B-17', '1,400 / 12,000', '11.7%', 'a stable figure worth acting on']),
        Object.freeze(['Both', 'quoted as "12%"', 'identical', 'the reason counts travel with rates'])
      ]) }),
      figure: Object.freeze({
        kind: 'rates', case: 'complaints',
        caption: 'Figure 1 · Two branches, counted and then divided',
        note: 'Northgate has three times the complaints and a quarter of the complaint rate. The bars are computed from the same values the Rate Desk uses.'
      }),
      rehearsal: Object.freeze({
        mission: 'rate-desk',
        lead: 'The first figure in the mission at the end of this session is below. Decide the denominator here, and the mission becomes a check on your reasoning rather than a first meeting with it.',
        cases: Object.freeze([
          Object.freeze({
            caseId: 'complaints',
            facts: Object.freeze([
              Object.freeze(['What was asked', 'Which branch has the bigger complaints problem?']),
              Object.freeze(['Northgate complaints', '120']),
              Object.freeze(['Northgate transactions', '60,000']),
              Object.freeze(['Riverside complaints', '40']),
              Object.freeze(['Riverside transactions', '5,000'])
            ]),
            question: 'Northgate has three times the complaints. Which branch would you send help to first?',
            answer: 'Riverside, which has a third of the complaints.',
            why: 'Northgate is 120 over 60,000, which is 2.0 per 1,000 transactions. Riverside is 40 over 5,000, which is 8.0 per 1,000. Dividing by the population each count came from reverses the answer completely.'
          })
        ]),
        closing: 'This is the whole of this session in one pair of numbers. A count is not a rate, and until it is divided by the population it came from it cannot be compared with anything.'
      }),
      workbook: Object.freeze({ title: 'Fifteen-minute denominator hunt', prompt: 'Find three percentages in a news article, a report or an advert.', steps: Object.freeze([
        'For each one, write down what was divided by what.',
        'Find or estimate the size of the denominator.',
        'Mark any percentage whose base is not stated anywhere.',
        'Rewrite one of them as a plain sentence with both counts in it.'
      ]) }),
      check: Object.freeze({
        prompt: 'A dashboard shows "conversion 40%" for a new page with no other figures. What should you ask first?',
        answer: 'base',
        options: Object.freeze([
          ['trend', 'Whether 40% is higher than last week'],
          ['base', 'How many visits the 40% was calculated from'],
          ['target', 'What the target conversion rate is']
        ]),
        explanation: 'Forty per cent of five visits is two people. The trend and the target both depend on the base being large enough for the figure to mean anything, so the count comes first.'
      }),
      practice: Object.freeze({ title: 'The Rate Desk', href: '?mode=game&mission=rate-desk', instruction: 'Name the denominator under six figures, then compute the comparison each one actually allows.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Statistics Canada — statistical units', url: 'https://www150.statcan.gc.ca/n1/pub/11-634-x/2016001/section1/chap3-eng.htm' }),
        Object.freeze({ label: 'Government Analysis Function — data visualisation and charts', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/' })
      ])
    }),

    Object.freeze({
      id: 'change', number: '03', title: 'Absolute change, relative change and rate of change', studyMinutes: 30, playMinutes: 20,
      objective: 'Say which of the three kinds of change a figure describes, and why the choice changes the conclusion.',
      opening: 'Sales went up by 200. Sales went up by 4%. Sales are rising by 30 a day. All three can describe the same fortnight, and they answer different questions.',
      sections: Object.freeze([
        Object.freeze({ heading: 'The difference, written down', paragraphs: Object.freeze([
          'Absolute change is the later value minus the earlier one. It is written Δ, read "delta", and it keeps the unit of the thing being measured: 200 more units sold, three degrees colder, four days later. Because it keeps the unit, it can be added up and compared across periods without further thought.',
          'It answers "how much more", and it is the only one of the three that says anything about size. A 50% rise in a branch that sold two items is a rise of one item.'
        ]) }),
        Object.freeze({ heading: 'Relative change needs a starting point', paragraphs: Object.freeze([
          'Relative change divides the absolute change by the earlier value, and is usually written as a percentage. It answers "how much more, compared with what there was", which makes branches of different sizes comparable. It also inherits the denominator problem from the previous session: the earlier value is the base, and a small base produces large percentages from small movements.',
          'A rise of 50% followed by a fall of 50% does not return to the start, because the two percentages are taken of different bases. This is not a trick; it is what dividing by the earlier value means.'
        ]) }),
        Object.freeze({ heading: 'Rate of change brings back a unit', paragraphs: Object.freeze([
          'A rate of change divides the absolute change by the change in something else, almost always time: Δy divided by Δx. Thirty units per day. Two degrees per hour. It has a unit again, which is what lets it be compared across periods of different lengths.',
          'The same three numbers underlie everything later in this volume. An average rate over an interval is the whole of what a slope means on a graph, and the derivative met much later is only this same division taken over an interval allowed to become very small.'
        ]) })
      ]),
      example: Object.freeze({ title: 'One fortnight, three answers', headers: Object.freeze(['Question', 'Working', 'Answer']), rows: Object.freeze([
        Object.freeze(['How much more?', '5,200 − 5,000', 'Δ = 200 units']),
        Object.freeze(['Compared with what?', '200 ÷ 5,000', '4% relative change']),
        Object.freeze(['How fast?', '200 ÷ 14 days', '≈ 14.3 units per day'])
      ]) }),
      rehearsal: Object.freeze({
        mission: 'rate-desk',
        lead: 'Two of the six figures in the mission are movements rather than comparisons. Work them out here first.',
        cases: Object.freeze([
          Object.freeze({
            caseId: 'points',
            facts: Object.freeze([
              Object.freeze(['What was asked', 'Card payments were 40% of transactions in January and 44% in June. How much did they rise?'])
            ]),
            question: 'Is that a rise of 4, or a rise of 10? Both are defensible.',
            answer: 'Both, and they are different measurements.',
            why: 'The share rose by 4 percentage points, which is the gap between the two figures. Measured against where it started, 4 divided by 40 is a rise of 10%. Writing a 4% rise states the point difference in the language of relative change, which is a smaller and different claim.'
          }),
          Object.freeze({
            caseId: 'updown',
            facts: Object.freeze([
              Object.freeze(['What was asked', 'A price rose 10% in spring, then fell 10% in autumn. Is it back where it started?'])
            ]),
            question: 'Equal percentages, opposite directions. Where does it end?',
            answer: 'Below where it began.',
            why: 'The rise is taken from the original price and the fall is taken from the raised one, so the second change is the larger amount of money. A 10% rise followed by a 10% fall always lands 1% under the start, whatever the starting figure was.'
          })
        ]),
        closing: 'Both cases turn on the same question this session asks: what is the change measured against? Percentages that look like they cancel do not, because each one has a different base underneath it.'
      }),
      workbook: Object.freeze({ title: 'Fifteen-minute change triple', prompt: 'Take any quantity you can measure twice: steps walked, money spent, a battery percentage.', steps: Object.freeze([
        'Record the value at two moments and note the gap between them.',
        'Compute the absolute change, keeping the unit.',
        'Compute the relative change, and write down which value you divided by.',
        'Compute the rate of change per hour or per day, and write its unit as a division.'
      ]) }),
      check: Object.freeze({
        prompt: 'A price rises 50% in March and falls 50% in April. Where does it finish, compared with February?',
        answer: 'lower',
        options: Object.freeze([
          ['same', 'Back where it started'],
          ['lower', 'Below where it started'],
          ['higher', 'Above where it started']
        ]),
        explanation: '£100 rises to £150, and 50% of 150 is 75, so it finishes at £75. The two percentages are taken of different bases, so they do not cancel.'
      }),
      practice: Object.freeze({ title: 'The Rate Desk', href: '?mode=game&mission=rate-desk', instruction: 'Take the same movement three ways: absolute, relative, and per unit of time.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Government Analysis Function — data visualisation and charts', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/' }),
        Object.freeze({ label: 'NIST — SI units', url: 'https://www.nist.gov/pml/owm/metric-si/si-units' })
      ])
    }),

    Object.freeze({
      id: 'functions', number: '04', title: 'From table to rule to graph', studyMinutes: 45, playMinutes: 35,
      objective: 'Move the same relationship between a table, a rule and a graph without changing what it claims.',
      opening: 'A table of deliveries and cost, a formula, and a line on a pair of axes can all say the same thing. Being able to move between them is most of what algebra is for.',
      sections: Object.freeze([
        Object.freeze({ heading: 'A rule that gives one answer', paragraphs: Object.freeze([
          'A function is a rule that turns each input into exactly one output. Cost from number of deliveries, total from quantity, temperature in Celsius from temperature in Fahrenheit. The "exactly one" is the whole of the definition: a rule that could return two different totals for the same basket is not a function, and would make any calculation built on it unreliable.',
          'In a table, the input is one column and the output is another. In a formula, the input is the letter and the output is what the expression evaluates to. Nothing about the relationship changes when it is written a different way.'
        ]) }),
        Object.freeze({ heading: 'Letters stand for quantities that vary', paragraphs: Object.freeze([
          'Writing cost as 3.40q + 25 is shorter than a table with a thousand rows, and it works for values the table never listed. The 3.40 is a rate, in pounds per item, and it multiplies the quantity. The 25 is a fixed amount that does not depend on quantity at all, so it is added once.',
          'Reading a formula is largely reading the units. If 3.40 is pounds per item and q is items, then 3.40q is pounds, and only something in pounds can legitimately be added to it.'
        ]) }),
        Object.freeze({ heading: 'The graph is the same rule, drawn', paragraphs: Object.freeze([
          'Plotting the input across and the output up turns the rule into a picture. The fixed amount is where the line meets the vertical axis, because that is the output when the input is nothing. The rate is the steepness, because it is exactly the change in output divided by the change in input: the rate of change from the previous session.',
          'This is why a straight line means a constant rate. If the steepness never varies, each extra item costs the same as the last. A curve means the rate itself is changing, which is the question the rest of the volume, and eventually calculus, exists to answer.'
        ]) })
      ]),
      example: Object.freeze({ title: 'One relationship, three forms', headers: Object.freeze(['Form', 'How it appears', 'Where the rate is']), rows: Object.freeze([
        Object.freeze(['Table', '1 → £28.40, 2 → £31.80, 3 → £35.20', 'the £3.40 step between rows']),
        Object.freeze(['Rule', 'cost = 3.40q + 25', 'the number multiplying q']),
        Object.freeze(['Graph', 'a straight line crossing at 25', 'the steepness of the line'])
      ]) }),
      workbook: Object.freeze({ title: 'Twenty-minute three-form exercise', prompt: 'Invent a charge with a fixed part and a per-item part: a delivery fee, a taxi fare, a phone tariff.', steps: Object.freeze([
        'Write a table of five inputs and their outputs.',
        'Write the rule as a formula, and say what each number measures.',
        'Sketch the graph, marking where it crosses the vertical axis.',
        'Point at the same rate in all three, and check the units agree.'
      ]) }),
      check: Object.freeze({
        prompt: 'In cost = 3.40q + 25, what does the 25 measure?',
        answer: 'fixed',
        options: Object.freeze([
          ['rate', 'The cost of each additional item'],
          ['fixed', 'A cost that does not depend on how many items there are'],
          ['total', 'The total cost of the order']
        ]),
        explanation: '25 is added once regardless of q, so it is the output when q is nothing: the fixed part, and where the graph crosses the vertical axis. The 3.40 is the per-item rate.'
      }),
      practice: Object.freeze({ title: 'The Big Sheet of Graphs', href: '/library/big-sheet-of-graphs.html', instruction: 'See the same idea drawn: press a plate and watch the rule and its picture change together.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'OpenStax — College Algebra', url: 'https://openstax.org/details/books/college-algebra-2e' }),
        Object.freeze({ label: 'NIST — SI units', url: 'https://www.nist.gov/pml/owm/metric-si/si-units' })
      ])
    })
  ])
});
