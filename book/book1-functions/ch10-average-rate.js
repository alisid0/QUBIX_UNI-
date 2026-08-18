// 10. Average rate of change
//
// The last chapter of Part I, and the one the whole book has been walking
// toward. The difference quotient is written here in full, with h, so that
// chapter 12 has nothing left to introduce except the shrinking.

export default {
  id: 10,
  title: 'Average rate of change',
  standfirst: 'How much the output moved, per unit of input moved. The final chapter of Part I ends at the doorstep of limits.',

  blocks: [
    { t: 'p', text: 'Chapter 6 showed that a quadratic changes by 1 over one interval and by 7 over another of the same width, so no single number describes how fast it grows. The honest response is to stop asking for one number and start asking about a stated interval.' },
    { t: 'formula', text: 'average rate = [f(b) - f(a)] / (b - a)' },
    { t: 'p', text: 'The numerator is how far the output moved. The denominator is how far the input moved. The quotient is the output movement **per unit** of input movement, which is what a rate always means.' },

    { t: 'p', text: 'For f(x) = x² from x = 1 to x = 3, the output goes from 1 to 9 while the input goes up by 2. The average rate is (9 − 1)/(3 − 1) = 4. On the graph this is the steepness of the straight line drawn through the two points, called the **secant** line.' },

    { t: 'figure', kind: 'secant', caption: 'A secant through two points of a curve. Its steepness is the average rate of change between them, and it is a genuine average: the curve is steeper than the secant in some places and shallower in others.' },

    { t: 'h', text: 'Units carry the meaning' },
    { t: 'p', text: 'Strip the units and a rate becomes a number with no claim on the world. Keep them and the arithmetic tells you what it is about.' },
    { t: 'table', head: ['Input', 'Output', 'Average rate is measured in', 'Called'],
      rows: [
        ['time in seconds', 'distance in metres', 'metres per second', 'average speed'],
        ['quantity produced', 'cost in pounds', 'pounds per unit', 'average cost per extra unit'],
        ['time in months', 'height in inches', 'inches per month', 'average growth rate'],
        ['horizontal distance', 'height', 'rise per run', 'gradient']
      ] },

    { t: 'example', n: 1,
      ask: 'Find the average rate of change of f(x) = x^2 from x = 2 to x = 5.',
      steps: [
        'Evaluate at both ends: f(2) = 4 and f(5) = 25.',
        'Output change: 25 − 4 = 21.',
        'Input change: 5 − 2 = 3.',
        'Divide: 21/3 = 7.'
      ],
      answer: '7.',
      note: 'The curve is not climbing at 7 anywhere near x = 2, and is climbing faster than 7 by x = 5. Seven is the steady rate that would have covered the same ground in the same interval.' },

    { t: 'example', n: 2,
      ask: 'Find the average rate of change of g(t) = 60t from t = 1 to t = 4, and interpret the units.',
      steps: [
        'g(1) = 60 and g(4) = 240.',
        'Output change 180, input change 3, so the rate is 60.',
        'If t is hours and g is miles, the answer is 60 miles per hour.',
        'Any other interval gives the same answer, because the rule is linear and chapter 6 showed its differences are constant.'
      ],
      answer: '60 distance-units per time-unit.',
      note: 'For a linear rule, the average rate over every interval is the same number: the m in mx + c. This is the one family where a single number really does describe the whole rule.' },

    { t: 'h', text: 'The same question, written with h' },
    { t: 'p', text: 'Instead of naming two endpoints, name one endpoint and the width of the step. Put a at the start and let the interval have width h, so the far end is a + h. The formula becomes:' },
    { t: 'formula', text: '[f(a + h) - f(a)] / h' },
    { t: 'p', text: 'This is the **difference quotient**, and it is the same rate written so that the interval can be made small on purpose. Chapter 3 already built the hard part, f(x + h), which is why the algebra below should feel familiar rather than new.' },

    { t: 'example', n: 3,
      ask: 'For f(x) = x^2, calculate [f(2 + h) - f(2)]/h and simplify.',
      steps: [
        'f(2 + h) = (2 + h)² = 4 + 4h + h². The middle term is the one that matters.',
        'Subtract f(2) = 4: the difference is 4h + h².',
        'Divide by h: (4h + h²)/h = 4 + h, valid for every h except 0, where the division is not allowed.',
        'Read the result. At h = 1 the average rate is 5; at h = 0.1 it is 4.1; at h = 0.01 it is 4.01.'
      ],
      answer: '4 + h.',
      note: 'The answers are crowding around 4 as h shrinks, without ever being 4. That crowding is a limit, and 4 is the derivative of x² at x = 2. Book 2 makes the crowding precise; Book 3 makes it routine.' },

    { t: 'callout', title: 'Where Part I ends',
      text: 'Move B toward A and the interval shrinks. The secant pivots, and settles toward a line touching the curve at a single point. The average rate settles toward a local rate. That settling is a limit; the local rate is a derivative; and everything after this chapter is those two sentences made exact.' }
  ],

  practice: [
    { q: 'Find the average rate of change of f(x) = x^2 from 2 to 5.', level: 'Analyse change',
      a: '(25 − 4)/(5 − 2) = 7.' },
    { q: 'Find it for g(t) = 60t from t = 1 to t = 4. Interpret the units.', level: 'Analyse change',
      a: '60 distance-units per time-unit, for instance 60 miles per hour.' },
    { q: 'For f(x) = x^2, calculate [f(2 + h) − f(2)]/h and simplify.', level: 'Analyse change',
      a: '4 + h.' },
    { q: 'Find the average rate of change of f(x) = 3x + 1 from x = 0 to x = 10, and from x = 100 to x = 110.', level: 'Analyse change',
      a: '3 in both cases. A linear rule has the same average rate over every interval.' },
    { q: 'A plant is 12 cm on day 4 and 30 cm on day 13. Find the average growth rate with units.', level: 'Analyse change',
      a: '(30 − 12)/(13 − 4) = 2 cm per day.' },
    { q: 'Find the average rate of change of f(x) = x^2 from x = −2 to x = 2.', level: 'Analyse change',
      a: '(4 − 4)/(2 − (−2)) = 0. The output ends where it started, though it certainly moved in between.' },
    { q: 'For f(x) = x^2, calculate [f(3 + h) − f(3)]/h and simplify. What does it approach as h shrinks?', level: 'Analyse change', hard: true,
      a: '(9 + 6h + h² − 9)/h = 6 + h, which approaches 6.' },
    { q: 'For f(x) = 5x − 2, calculate [f(a + h) − f(a)]/h. Why does no h survive?', level: 'Analyse change', hard: true,
      a: 'It is 5. The h cancels completely because a linear rule adds the same amount per unit step regardless of where you start or how wide the step is, which chapter 6 recorded as a constant first difference.' },
    { q: 'A car covers 120 miles in 2 hours. Must it have been doing 60 mph at some instant?', level: 'Analyse change', hard: true,
      a: 'Its average was 60 mph. Assuming the speed changed smoothly rather than jumping, it must have passed through 60 at some moment, since it cannot get from below to above without crossing. This is proved in Book 3; here it is worth noticing that the average alone does not tell you when.' },
    { q: 'Water fills a tank: 0 litres at t = 0, 50 at t = 5, 60 at t = 10 minutes. Find the average rate over each interval and over the whole time.', level: 'Analyse change',
      a: '10 litres per minute over the first, 2 over the second, and 6 over the whole ten minutes. The overall figure is not the average of 10 and 2 here only because both intervals happen to be equally long; in general it is not.' },
    { q: 'Sketch a curve where the average rate of change from a to b is 0 but the curve is never flat between them. Is that possible?', level: 'Analyse change', hard: true,
      a: 'Not for a smooth curve. To return to its starting height it must rise then fall, or fall then rise, and the turn between them is a flat point. Question 6 is an instance: x² from −2 to 2 averages 0 and is flat at x = 0.' },
    { q: 'Explain why the difference quotient forbids h = 0, given that shrinking h is the whole point.', level: 'Recognise', hard: true,
      a: 'At h = 0 both the numerator and the denominator are 0, and 0/0 names no number. The limit asks what the quotient approaches as h gets close to 0, never what it equals there. That distinction is the subject of Book 2.' }
  ],

  misconception: {
    name: 'an average rate of zero means nothing changed',
    wrong: 'The average rate of change of x² from −2 to 2 works out to 0, so the function must have stayed still.',
    why: 'The formula compares only the two endpoints. Between them the output fell from 4 to 0 and climbed back to 4, and the average is 0 because those movements cancel, not because they did not happen. An average rate is a statement about net change over an interval, and it is deliberately blind to the route. This is precisely why a local rate is needed, and why the interval has to shrink.'
  },

  review: 'Chapter 3 asked for f(x + h) − f(x) and noted that every surviving term had an h in it. Example 3 divides by that h, which is only possible because of it. Chapter 6\'s comparison of the changes 1 and 7 is answered here: both are average rates, over different intervals, and neither was ever wrong.'
};
