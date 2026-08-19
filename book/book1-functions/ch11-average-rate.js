// 10. Average rate of change
//
// The last chapter of Part I, and the one the whole book has been walking
// toward. The difference quotient is written here in full, with h, so that
// chapter 13 has nothing left to introduce except the shrinking.

export default {
  id: 11,
  title: 'Average rate of change',
  standfirst: 'How much the output moved, per unit of input moved. The final chapter of Part I ends at the doorstep of limits.',

  blocks: [
    { t: 'p', text: 'Chapter 6 showed that a quadratic changes by 1 over one interval and by 7 over another of the same width, so no single number describes how fast it grows. The honest response is to stop asking for one number and start asking about a stated interval.' },
    { t: 'formula', text: 'average rate = [f(b) - f(a)] / (b - a)' },
    { t: 'p', text: 'The numerator is how far the output moved. The denominator is how far the input moved. The quotient is the output movement **per unit** of input movement, which is what a rate always means.' },
    { t: 'p', text: 'Chapter 10 has already given both of those a name, so the same formula can be written in four symbols instead of ten. It is the identical instruction: subtract, subtract, divide.' },
    { t: 'formula', text: 'average rate = Δy / Δx' },
    { t: 'callout', title: 'The word average is doing real work here',
      text: 'Chapter 10 shared a plant\'s 18 cm of growth evenly across nine days and admitted the sharing was a fiction. This is that fiction named: the average rate is the steady rate that would have produced the same change over the same interval, and the curve is under no obligation to have grown that way.' },

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
      note: 'The curve is not climbing at 7 anywhere near x = 2, and is climbing faster than 7 by x = 5. Seven is the steady rate that would have covered the same ground in the same interval.',
      show: { kind: 'secant', f: x => x * x, a: 2, b: 5, x0: 0, x1: 6, y0: 0, y1: 30,
        caption: 'The secant through (2, 4) and (5, 25). Its steepness is the 21 divided by 3, and the curve is shallower than it early on and steeper than it later.' },
      turn: { ask: 'Find the average rate of change of f(x) = x^2 from x = 1 to x = 4.', a: '(16 − 1)/3 = 5.' } },

    { t: 'example', n: 2,
      ask: 'Find the average rate of change of g(t) = 60t from t = 1 to t = 4, and interpret the units.',
      steps: [
        'g(1) = 60 and g(4) = 240.',
        'Output change 180, input change 3, so the rate is 60.',
        'If t is hours and g is miles, the answer is 60 miles per hour.',
        'Any other interval gives the same answer, because the rule is linear and chapter 6 showed its differences are constant.'
      ],
      answer: '60 distance-units per time-unit.',
      note: 'For a linear rule, the average rate over every interval is the same number: the m in mx + c. This is the one family where a single number really does describe the whole rule.',
      show: { kind: 'steps', f: x => 60 * x, from: 1, to: 4, title: 'A LINEAR RULE', note: 'g(t)=60t', x0: 0.4, x1: 4.6, y0: 0, y1: 270, w: 300, h: 215,
        caption: 'Every rise is 60, so every interval gives the same average. This is the one family where a single number describes the whole rule.' },
      turn: { ask: 'Find the average rate of change of g(t) = 25t from t = 2 to t = 6, and state the units if t is hours and g is kilometres.', a: '25 kilometres per hour, the same as over any other interval.' } },

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
      note: 'The answers are crowding around 4 as h shrinks, without ever being 4. That crowding is a limit, and 4 is the derivative of x² at x = 2. Book 2 makes the crowding precise; Book 3 makes it routine.',
      show: { kind: 'secants', f: x => x * x, a: 2, bs: [4, 3, 2.5, 2.2], x0: 0, x1: 5, y0: 0, y1: 20, w: 320, h: 230,
        caption: 'The quotient 4 + h, drawn. At h = 2 the slope is 6, at h = 1 it is 5, at h = 0.5 it is 4.5, at h = 0.2 it is 4.2. The dashed line is where they are going.' },
      turn: { ask: 'For f(x) = x^2, calculate [f(5 + h) - f(5)]/h and simplify. What is it approaching?', a: '10 + h, approaching 10.' } },

    { t: 'callout', title: 'Where Part I ends',
      text: 'Move B toward A and the interval shrinks. The secant pivots, and settles toward a line touching the curve at a single point. The average rate settles toward a local rate. That settling is a limit; the local rate is a derivative; and everything after this chapter is those two sentences made exact.' },

    { t: 'h', text: 'The average, and what it averages' },
    { t: 'p', text: 'Example 1 found an average rate of 7 for x² between 2 and 5. The staircase below shows what the curve actually did over those three unit steps.' },

    { t: 'figure', kind: 'steps', f: x => x * x, from: 2, to: 5, title: 'x^2 FROM 2 TO 5', note: 'rises 5, 7, 9',
      x0: 1.4, x1: 6, y0: 0, y1: 30, w: 300, h: 220,
      caption: 'The three rises are 5, 7 and 9, totalling 21 over three steps. The average of 7 is the middle one here, which happens because the rises grow evenly; for most curves the average matches no individual step at all.' },

    { t: 'h', text: 'Letting B close on A' },
    { t: 'p', text: 'Fix the left endpoint and bring the right one in. Each new interval gives a new secant and a new average rate, and the numbers do something worth watching.' },

    { t: 'figure', kind: 'secants', f: x => x * x, a: 2, bs: [5, 4, 3, 2.5],
      x0: 0, x1: 6, y0: 0, y1: 30, w: 330, h: 240,
      caption: 'Secants from x = 2 to x = 5, 4, 3 and 2.5, with the average rate written at each far endpoint: 7, 6, 5, then 4.5. The dashed line is where they are heading. Its steepness is 4, which is what the algebra of example 3 produces as h shrinks.' },

    { t: 'p', text: 'Nothing in this picture is new. Each line is an ordinary secant and each number an ordinary average rate. What is new is watching them as a sequence rather than one at a time, and noticing that the sequence has a destination.' },

    { t: 'example', n: 4,
      ask: 'A tank holds V(t) = t^2 litres after t minutes. Find the average filling rate over the first 3 minutes, and over the third minute alone.',
      steps: [
        'Over the first 3 minutes: V(0) = 0 and V(3) = 9, so the rate is (9 − 0)/3 = 3 litres per minute.',
        'Over the third minute alone the interval is from t = 2 to t = 3.',
        'V(2) = 4 and V(3) = 9, so the rate is (9 − 4)/1 = 5 litres per minute.',
        'The second figure is larger because the tank fills faster as time goes on, and the first has been diluted by the slow early minutes.'
      ],
      answer: '3 litres per minute overall; 5 litres per minute during the third.',
      note: 'Both are correct answers to different questions. Whenever an average rate is quoted, the interval is part of the answer, and an average rate with no interval attached means nothing.',
      show: { kind: 'frames', label: 'Two intervals, one tank',
        frames: [
          { kind: 'secant', f: x => x * x, a: 0, b: 3, x0: 0, x1: 4, y0: 0, y1: 12, pick: 'first 3 minutes',
            say: 'From 0 to 3 the average is 3 litres a minute, diluted by the slow early minutes.' },
          { kind: 'secant', f: x => x * x, a: 2, b: 3, x0: 0, x1: 4, y0: 0, y1: 12, pick: 'the third minute',
            say: 'From 2 to 3 alone the average is 5 litres a minute. Both are right; they answer different questions.' }
        ] },
      turn: { ask: 'For the same tank, find the average rate over the first minute and over the fifth minute.',
        a: '1 litre per minute for the first, and (25 − 16)/1 = 9 for the fifth.' } },

    { t: 'p', text: 'A linear rule makes the same picture boring, and the boredom is the point.' },

    { t: 'figure', kind: 'steps', f: x => 3 * x + 1, from: 0, to: 4, title: 'A LINEAR RULE, STEPPED', note: '3x+1',
      x0: -0.6, x1: 5.4, y0: -1, y1: 15, w: 300, h: 215,
      caption: 'Every rise is +3, so every average rate is 3 whichever interval is chosen. Compare the staircase above, where the rises were 5, 7 and 9 and the answer depended entirely on which interval was named.' }
  ],

  practice: [
    { q: 'Find the average rate of change of f(x) = x^2 from 2 to 5.', level: 'Analyse change',
      a: '(25 − 4)/(5 − 2) = 7.',
      show: { kind: 'secant', f: x => x * x, a: 2, b: 5, x0: 0, x1: 6, y0: 0, y1: 30,
        caption: 'The secant through (2, 4) and (5, 25). Its steepness is 21 divided by 3, and the curve is shallower than it early and steeper later.' } },
    { q: 'Find it for g(t) = 60t from t = 1 to t = 4. Interpret the units.', level: 'Analyse change',
      a: '60 distance-units per time-unit, for instance 60 miles per hour.',
      show: { kind: 'steps', f: t => 60 * t, from: 1, to: 4, title: 'EVERY RISE THE SAME', note: 'g(t)=60t', x0: 0.4, x1: 4.6, y0: 0, y1: 270, w: 295, h: 215,
        caption: '60 miles for every hour, over any interval you choose. Linear rules are the only family where one number does the whole job.' } },
    { q: 'For f(x) = x^2, calculate [f(2 + h) − f(2)]/h and simplify.', level: 'Analyse change',
      a: '4 + h.',
      show: { kind: 'secants', f: x => x * x, a: 2, bs: [4, 3, 2.5, 2.2], x0: 0, x1: 5, y0: 0, y1: 20, w: 320, h: 230,
        caption: 'The quotient 4 + h, drawn. At h = 2 the slope is 6, at h = 1 it is 5, at h = 0.5 it is 4.5, at h = 0.2 it is 4.2. The dashed line is where they are heading.' } },
    { q: 'Find the average rate of change of f(x) = 3x + 1 from x = 0 to x = 10, and from x = 100 to x = 110.', level: 'Analyse change',
      a: '3 in both cases. A linear rule has the same average rate over every interval.',
      show: { kind: 'frames', label: 'Two intervals, a hundred apart',
        frames: [
          { kind: 'secant', f: x => 3 * x + 1, a: 0, b: 10, x0: 0, x1: 12, y0: 0, y1: 40, pick: '0 to 10',
            say: 'Average rate 3.' },
          { kind: 'secant', f: x => 3 * x + 1, a: 100, b: 110, x0: 98, x1: 112, y0: 295, y1: 335, pick: '100 to 110',
            say: 'Average rate 3 again. On a straight line the secant is the line, wherever you put it.' }
        ] } },
    { q: 'A plant is 12 cm on day 4 and 30 cm on day 13. Find the average growth rate with units.', level: 'Analyse change',
      a: '(30 − 12)/(13 − 4) = 2 cm per day.',
      show: { kind: 'secant', f: d => d === 4 ? 12 : 12 + 2 * (d - 4), a: 4, b: 13, x0: 0, x1: 15, y0: 0, y1: 34,
        caption: '18 cm of growth over 9 days is 2 cm a day. The straight line is the steady growth that would have covered the same ground.' } },
    { q: 'Find the average rate of change of f(x) = x^2 from x = −2 to x = 2.', level: 'Analyse change',
      a: '(4 − 4)/(2 − (−2)) = 0. The output ends where it started, though it certainly moved in between.',
      show: { kind: 'secant', f: x => x * x, a: -2, b: 2, x0: -3, x1: 3, y0: 0, y1: 6,
        caption: 'The secant is flat, so the average rate is 0. The curve certainly moved: down to the origin and back up again. An average rate is blind to the route.' } },
    { q: 'For f(x) = x^2, calculate [f(3 + h) − f(3)]/h and simplify. What does it approach as h shrinks?', level: 'Analyse change', hard: true,
      a: '(9 + 6h + h² − 9)/h = 6 + h, which approaches 6.',
      show: { kind: 'secants', f: x => x * x, a: 3, bs: [5, 4.2, 3.6, 3.2], x0: 1, x1: 6, y0: 0, y1: 28, w: 320, h: 230,
        caption: 'Slopes of 8, 7.2, 6.6 and 6.2 over shrinking intervals from x = 3. They are closing on 6, which is what 6 + h approaches.' } },
    { q: 'For f(x) = 5x − 2, calculate [f(a + h) − f(a)]/h. Why does no h survive?', level: 'Analyse change', hard: true,
      a: 'It is 5. The h cancels completely because a linear rule adds the same amount per unit step regardless of where you start or how wide the step is, which chapter 6 recorded as a constant first difference.',
      show: { kind: 'steps', f: x => 5 * x - 2, from: 0, to: 4, title: 'NO h SURVIVES', note: 'f(x)=5x-2', x0: -0.6, x1: 5.2, y0: -3, y1: 20, w: 290, h: 210,
        caption: 'Each unit step raises the output by 5, wherever you start and however wide the step. The algebra cancels because the picture has nothing left to depend on.' } },
    { q: 'A car covers 120 miles in 2 hours. Must it have been doing 60 mph at some instant?', level: 'Analyse change', hard: true,
      a: 'Its average was 60 mph. Assuming the speed changed smoothly rather than jumping, it must have passed through 60 at some moment, since it cannot get from below to above without crossing. This is proved in Book 3; here it is worth noticing that the average alone does not tell you when.',
      show: { kind: 'graph', f: t => 60 * t + 18 * Math.sin(t * 2.4), title: 'ONE POSSIBLE JOURNEY', note: 'average 60 mph', x0: 0, x1: 2, y0: 0, y1: 130, w: 285, h: 210, marks: [[0, 0], [2, 120]],
        caption: 'Both journeys shown end at 120 miles after 2 hours, so both average 60. A speed that varies smoothly must pass through 60 somewhere, but the average alone never says when.' } },
    { q: 'Water fills a tank: 0 litres at t = 0, 50 at t = 5, 60 at t = 10 minutes. Find the average rate over each interval and over the whole time.', level: 'Analyse change',
      a: '10 litres per minute over the first, 2 over the second, and 6 over the whole ten minutes. The overall figure is not the average of 10 and 2 here only because both intervals happen to be equally long; in general it is not.',
      show: { kind: 'frames', label: 'Three intervals, three answers',
        frames: [
          { kind: 'secant', f: t => t <= 5 ? 10 * t : 50 + 2 * (t - 5), a: 0, b: 5, x0: 0, x1: 11, y0: 0, y1: 70, pick: 'first 5 min',
            say: '50 litres in 5 minutes: 10 litres a minute.' },
          { kind: 'secant', f: t => t <= 5 ? 10 * t : 50 + 2 * (t - 5), a: 5, b: 10, x0: 0, x1: 11, y0: 0, y1: 70, pick: 'second 5 min',
            say: '10 litres in 5 minutes: 2 a minute. The tap has slowed.' },
          { kind: 'secant', f: t => t <= 5 ? 10 * t : 50 + 2 * (t - 5), a: 0, b: 10, x0: 0, x1: 11, y0: 0, y1: 70, pick: 'the whole time',
            say: '60 litres in 10 minutes: 6 a minute. Here it is the average of 10 and 2 only because the two intervals happen to be equally long.' }
        ] } },
    { q: 'Sketch a curve where the average rate of change from a to b is 0 but the curve is never flat between them. Is that possible?', level: 'Analyse change', hard: true,
      a: 'Not for a smooth curve. To return to its starting height it must rise then fall, or fall then rise, and the turn between them is a flat point. Question 6 is an instance: x² from −2 to 2 averages 0 and is flat at x = 0.',
      show: { kind: 'secant', f: x => x * x - 4, a: -2, b: 2, x0: -3, x1: 3, y0: -5, y1: 3,
        caption: 'To return to its starting height a smooth curve must rise then fall, or fall then rise, and the turn between them is flat. So no: the marked low point is unavoidable.' } },
    { q: 'Explain why the difference quotient forbids h = 0, given that shrinking h is the whole point.', level: 'Recognise', hard: true,
      a: 'At h = 0 both the numerator and the denominator are 0, and 0/0 names no number. The limit asks what the quotient approaches as h gets close to 0, never what it equals there. That distinction is the subject of Book 2.',
      show: { kind: 'zoom', f: x => (x * x - 4) / (x - 2), at: 2, holeAt: 4, spans: [2, 0.5, 0.1],
        caption: 'The difference quotient has the same shape as this: perfectly well behaved near the point and undefined at it. At h = 0 both parts are zero, and 0/0 names no number, so the limit asks what is approached rather than what is reached.' } },
  ],

  misconception: {
    name: 'an average rate of zero means nothing changed',
    wrong: 'The average rate of change of x² from −2 to 2 works out to 0, so the function must have stayed still.',
    why: 'The formula compares only the two endpoints. Between them the output fell from 4 to 0 and climbed back to 4, and the average is 0 because those movements cancel, not because they did not happen. An average rate is a statement about net change over an interval, and it is deliberately blind to the route. This is precisely why a local rate is needed, and why the interval has to shrink.'
  },

  review: 'Chapter 3 asked for f(x + h) − f(x) and noted that every surviving term had an h in it. Example 3 divides by that h, which is only possible because of it. Chapter 6\'s comparison of the changes 1 and 7 is answered here: both are average rates, over different intervals, and neither was ever wrong.'
};
