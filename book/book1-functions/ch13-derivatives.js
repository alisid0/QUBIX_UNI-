// 12. Derivatives: how fast
//
// Everything needed for this chapter was built earlier: f(x+h) in chapter 3,
// the difference quotient in chapter 11, and the limit in chapter 12. The
// derivation of 2x is done in full rather than quoted, because a reader who
// has watched the h cancel once will believe the power rule later.

export default {
  id: 13,
  part: 'PART II - THE NEXT BOOKS',
  title: 'Derivatives: how fast',
  standfirst: 'The average rate, with the interval shrunk to nothing.',

  blocks: [
    { t: 'figure', kind: 'secant',
      caption: 'Hold A still and slide B toward it. The secant pivots about A, and settles toward the line that touches the curve at A alone: the tangent. Its steepness is the derivative.' },

    { t: 'p', text: 'The **derivative** of f at x is the limit of the difference quotient as the step shrinks to nothing. It measures the instantaneous rate of change, and equally the steepness of the tangent line.' },
    { t: 'formula', text: "f'(x) = limit as h -> 0 of [f(x + h) - f(x)]/h" },
    { t: 'p', text: 'Every symbol in that line has already appeared. Chapter 3 built f(x + h); chapter 11 assembled the quotient; chapter 12 explained what the limit is asking. The only new thing is the name.' },

    { t: 'example', n: 1,
      ask: "Derive f'(x) for f(x) = x^2 from the definition.",
      steps: [
        'Expand the shifted rule: f(x + h) = (x + h)² = x² + 2xh + h².',
        'Subtract: f(x + h) − f(x) = 2xh + h². The x² terms cancel, as they did in chapter 3.',
        'Divide by h: (2xh + h²)/h = 2x + h. This is legal because h is near 0 but never equal to it.',
        'Take the limit as h shrinks: the term 2x does not involve h and stays; the lone h vanishes.'
      ],
      answer: "f'(x) = 2x.",
      note: 'Check against chapter 11. At x = 2 the difference quotient simplified to 4 + h and approached 4; here 2x gives 2(2) = 4. At x = 3 it gave 6 + h approaching 6, and 2(3) = 6. The general result agrees with both particular ones.',
      show: { kind: 'frames', label: 'The rule, and its steepness',
        frames: [
          { kind: 'secants', f: x => x * x, a: 2, bs: [4, 3, 2.5, 2.2], x0: 0, x1: 5, y0: 0, y1: 20, w: 300, h: 220, pick: 'at x = 2',
            say: 'The secants close on a tangent of steepness 4, and 2x gives 4 at x = 2.' },
          { kind: 'secants', f: x => x * x, a: 3, bs: [5, 4.2, 3.6, 3.2], x0: 0, x1: 6, y0: 0, y1: 28, w: 300, h: 220, pick: 'at x = 3',
            say: 'Move the point and the answer moves with it: the tangent here has steepness 6, and 2x gives 6. The derivative is a rule, not a number.' }
        ] },
      turn: { ask: "Use f'(x) = 2x to find the steepness of x^2 at x = 5, then check it against the difference quotient 10 + h.", a: '10, and the quotient approaches 10 as h shrinks. They agree.' } },

    { t: 'callout', title: 'The derivative is a function, not a number',
      text: "f'(x) = 2x is a rule: hand it an input and it returns the steepness there. The number 4 is not the derivative of x²; it is the derivative of x² *at x = 2*, written f'(2). Keeping that distinction is what makes the rest of Book 3 readable." },

    { t: 'figures', items: [
      { kind: 'graph', f: x => x * x, title: 'f(x) = x^2', note: 'the rule', x0: -3, x1: 3, y0: -2, y1: 8, w: 250, h: 190, marks: [[2, 4]],
        caption: 'Steep on the right, flat at the origin, steep the other way on the left.' },
      { kind: 'graph', f: x => 2 * x, title: "f'(x) = 2x", note: 'its steepness', x0: -3, x1: 3, y0: -6, y1: 6, w: 250, h: 190, marks: [[2, 4]],
        caption: 'The steepness, plotted as a rule in its own right. It is negative where the parent falls, zero where the parent is flat, and positive where it rises.' }
    ] },

    { t: 'p', text: 'Read the two pictures together. Where the left curve is falling, the right one is below the axis. Where the left curve is flat, at the origin, the right one crosses zero. That correspondence is the reason derivatives answer questions about high points and low points.' },

    { t: 'h', text: 'What it means, depending on what the letters mean' },
    { t: 'table', head: ['Function', 'Derivative', 'What it measures'],
      rows: [
        ['position s(t)', "velocity s'(t)", 'change in position per unit time'],
        ['height h(x)', "slope h'(x)", 'local steepness of the ground'],
        ['cost C(q)', "marginal cost C'(q)", 'the cost of one more unit, near output q'],
        ['volume V(t)', "flow rate V'(t)", 'how fast the tank is filling right now']
      ] },

    { t: 'example', n: 2,
      ask: "Derive f'(x) for f(x) = 3x + 1 from the definition, and explain the answer.",
      steps: [
        'f(x + h) = 3(x + h) + 1 = 3x + 3h + 1.',
        'Subtract f(x) = 3x + 1: the difference is 3h.',
        'Divide by h: exactly 3, with no h left at all.',
        'The limit of a constant is that constant, so the answer is 3 for every x.'
      ],
      answer: "f'(x) = 3.",
      note: 'Chapter 6 predicted this: a linear rule has constant first differences, so its steepness cannot depend on where you measure. Chapter 11 question 8 found the same 3 without taking any limit, because none was needed.',
      show: { kind: 'graph', f: x => 3 * x + 1, title: 'THE SAME EVERYWHERE', note: 'f(x)=3x+1', x0: -3, x1: 3, y0: -8, y1: 10, w: 275, h: 200, marks: [[-2, -5], [0, 1], [2, 7]],
        caption: 'A straight line has one steepness, and the three marked points are on the same slope. The h cancelled completely because there was nothing for it to depend on.' },
      turn: { ask: "Derive f'(x) for f(x) = 7x - 2 from the definition.", a: '7. The quotient is exactly 7 with no h left, so the limit is 7.' } },

    { t: 'h', text: 'What Book 3 does with this' },
    { t: 'p', text: 'Doing every derivative from the definition would be unbearable, so Book 3 establishes rules: the power rule, then constants and sums, then products, quotients and chains. After that come exponential and trigonometric derivatives, motion, and optimisation, which is the business of finding the flat points this chapter learned to recognise.' },

    { t: 'h', text: 'Where the number comes from' },
    { t: 'p', text: 'Chapter 11 watched secants close on a tangent. The same picture now has a name for its destination.' },

    { t: 'figure', kind: 'secants', f: x => x * x, a: 2, bs: [5, 4, 3, 2.5],
      x0: 0, x1: 6, y0: 0, y1: 30, w: 330, h: 240,
      caption: 'Average rates of 7, 6, 5 and 4.5 over shrinking intervals from x = 2. The dashed tangent has steepness 4, and the rule 2x returns 4 at x = 2. The picture and the algebra produce the same number by different routes.' },

    { t: 'example', n: 3,
      ask: "For f(x) = x^2, find where f'(x) = 0, and say what is happening on the graph there.",
      steps: [
        "The derivative is 2x, so solve 2x = 0.",
        'The only solution is x = 0.',
        'At x = 0 the tangent has steepness 0, which is a horizontal line.',
        'On the graph that is the low point of the parabola, the one place it is flat.'
      ],
      answer: "f'(x) = 0 only at x = 0, the lowest point of the curve.",
      note: 'This is the beginning of optimisation. Highest and lowest points are flat, so they are found by setting the derivative to zero, which turns a question about shape into an equation.',
      show: { items: [
        { kind: 'graph', f: x => x * x, title: 'THE CURVE IS FLAT AT 0', note: 'f(x)=x^2', x0: -3, x1: 3, y0: -2, y1: 8, w: 245, h: 185, marks: [[0, 0]] },
        { kind: 'graph', f: x => 2 * x, title: 'THE DERIVATIVE CROSSES 0', note: "f'(x)=2x", x0: -3, x1: 3, y0: -6, y1: 6, w: 245, h: 185, marks: [[0, 0]] }
      ],
        caption: 'A flat point on the rule is a zero of its derivative. Reading the two together is how optimisation works.' },
      turn: { ask: "For f(x) = x^2 - 6x, the derivative is 2x - 6. Where is the curve flat?",
        a: 'At x = 3. That matches chapter 9 example 4, where completing the square put the low point of x² − 4x at x = 2 by the same logic.' } },

    { t: 'example', n: 4,
      ask: "A ball's height is h(t) = 20t - 5t^2 metres after t seconds, and its derivative is h'(t) = 20 - 10t. When is the ball at its highest, and how high?",
      steps: [
        'At the highest point the ball is momentarily neither rising nor falling, so its rate of change of height is 0.',
        'Solve 20 − 10t = 0, giving t = 2 seconds.',
        'Find the height there: h(2) = 40 − 20 = 20 metres.',
        'Check the sign either side: at t = 1 the rate is +10, rising; at t = 3 it is −10, falling. So t = 2 really is the top.'
      ],
      answer: 'Highest at 2 seconds, at a height of 20 metres.',
      note: 'The check either side matters. Setting a derivative to zero finds flat points, and a flat point can be a maximum, a minimum, or neither, so the sign on both sides is what decides which.',
      show: { kind: 'graph', f: t => 20 * t - 5 * t * t, title: 'THE FLIGHT', note: 'h(t)=20t-5t^2', x0: 0, x1: 4.4, y0: 0, y1: 24, w: 290, h: 210, marks: [[2, 20], [1, 15], [3, 15]],
        caption: 'The top is marked, with a point either side at equal height. Rising before it and falling after, so the flat point really is a maximum.' },
      turn: { ask: "For h(t) = 30t - 5t^2 with h'(t) = 30 - 10t, when is the ball highest and how high?",
        a: 'At t = 3 seconds, at a height of 90 − 45 = 45 metres.' } }
  ],

  practice: [
    { q: "Derive f'(x) for f(x) = x^2 from the definition, showing the h cancel.", level: 'Analyse change',
      a: "The quotient simplifies to 2x + h, which approaches 2x. So f'(x) = 2x.",
      show: { kind: 'secants', f: x => x * x, a: 2, bs: [4, 3, 2.5, 2.2], x0: 0, x1: 5, y0: 0, y1: 20, w: 320, h: 230,
        caption: 'The quotient 2x + h, drawn at x = 2. The slopes 6, 5, 4.5, 4.2 close on 4, and the lone h is what vanishes.' } },
    { q: "For f(x) = x^2, find f'(1), f'(0), and f'(−3).", level: 'Calculate',
      a: '2, 0, and −6. The middle one is zero because the parabola is flat at the origin; the last is negative because the curve is falling there.',
      show: { kind: 'graph', f: x => 2 * x, title: 'THE DERIVATIVE, PLOTTED', note: "f'(x)=2x", x0: -4, x1: 4, y0: -8, y1: 8, w: 280, h: 210,
        marks: [[1, 2], [0, 0], [-3, -6]],
        caption: 'Read the three answers straight off the line. It is negative where the parent falls, zero where the parent is flat, and positive where it rises.' } },
    { q: "Derive f'(x) for f(x) = 5x − 2 from the definition.", level: 'Analyse change',
      a: "5. The quotient is exactly 5 with no h remaining, so the limit is 5.",
      show: { kind: 'steps', f: x => 5 * x - 2, from: 0, to: 4, title: 'ONE STEEPNESS EVERYWHERE', note: 'f(x)=5x-2', x0: -0.6, x1: 5.2, y0: -3, y1: 20, w: 290, h: 210,
        caption: 'Every rise is 5, so the quotient is exactly 5 before any limit is taken. There was nothing for h to depend on.' } },
    { q: "Derive f'(x) for the constant rule f(x) = 7.", level: 'Analyse change',
      a: '0. The numerator is 7 − 7 = 0 for every h, so the quotient is 0 throughout and the limit is 0. A flat graph has no steepness anywhere.',
      show: { kind: 'graph', f: x => 7, title: 'A FLAT RULE', note: 'f(x)=7', x0: -4, x1: 4, y0: 0, y1: 10, w: 280, h: 195, marks: [[-2, 7], [0, 7], [2, 7]],
        caption: 'The numerator is 7 \u2212 7 = 0 for every h, so the quotient is 0 throughout. A flat graph has no steepness anywhere.' } },
    { q: 'A car\'s position is s(t) = t^2 metres after t seconds. Find its velocity at t = 3, with units.', level: 'Calculate',
      a: "s'(t) = 2t, so s'(3) = 6 metres per second.",
      show: { kind: 'secants', f: t => t * t, a: 3, bs: [5, 4.2, 3.6, 3.2], x0: 1, x1: 6, y0: 0, y1: 28, w: 320, h: 230,
        caption: 'Position against time, so the steepness is a speed. The secants close on 6, and the units are metres per second.' } },
    { q: "Explain why f'(x) = 2x is a function and 4 is not the derivative of x^2.", level: 'Recognise',
      a: "Because the steepness of x² differs from place to place, so the answer must be a rule rather than a number. 4 is f'(2), the derivative at one particular input.",
      show: { kind: 'frames', label: 'A rule, not a number',
        frames: [
          { kind: 'secants', f: x => x * x, a: 1, bs: [3, 2.4, 1.8, 1.4], x0: 0, x1: 4, y0: 0, y1: 10, w: 285, h: 210, pick: "f'(1)=2",
            say: 'At x = 1 the tangent has steepness 2.' },
          { kind: 'secants', f: x => x * x, a: 2, bs: [4, 3.2, 2.6, 2.2], x0: 0, x1: 5, y0: 0, y1: 18, w: 285, h: 210, pick: "f'(2)=4",
            say: 'At x = 2 it is 4. The answer moves with the input, so it has to be a rule. 4 is the derivative at 2, not the derivative.' }
        ] } },
    { q: 'From the graph of a derivative, how would you spot where the original curve is flat?', level: 'Analyse change',
      a: 'Where the derivative crosses or touches zero. A flat point on the parent is a zero of its derivative.',
      show: { items: [
        { kind: 'graph', f: x => x * x * x / 3 - x, title: 'THE CURVE', note: 'flat twice', x0: -2.6, x1: 2.6, y0: -2, y1: 2, w: 245, h: 185, marks: [[-1, 0.667], [1, -0.667]],
          caption: 'A high point and a low point, both flat.' },
        { kind: 'graph', f: x => x * x - 1, title: 'ITS DERIVATIVE', note: 'crosses zero twice', x0: -2.6, x1: 2.6, y0: -2, y1: 3, w: 245, h: 185, marks: [[-1, 0], [1, 0]],
          caption: 'The derivative crosses zero at exactly those two inputs.' }
      ] } },
    { q: "Derive f'(x) for f(x) = x^2 + 5 and compare with f(x) = x^2.", level: 'Analyse change', hard: true,
      a: "Both give 2x. The constant cancels in the subtraction, so shifting a curve up leaves every slope unchanged, exactly as chapter 7 question 10 argued.",
      show: { kind: 'graph', f: x => x * x + 5, second: { f: x => x * x }, title: 'SHIFTED, NOT RESHAPED', note: 'x^2+5 and x^2', x0: -3, x1: 3, y0: -1, y1: 14, w: 280, h: 210, marks: [[1, 6], [1, 1]],
        caption: 'The constant cancels in the subtraction, so both give 2x. At the two marked points the curves are equally steep, which is chapter 7 question 10 restated.' } },
    { q: "Derive f'(x) for f(x) = 3x^2 from the definition.", level: 'Analyse change', hard: true,
      a: '6x. The quotient becomes (6xh + 3h²)/h = 6x + 3h, approaching 6x. Tripling the heights triples the slopes.',
      show: { kind: 'secants', f: x => 3 * x * x, a: 2, bs: [4, 3, 2.5, 2.2], x0: 0, x1: 5, y0: 0, y1: 50, w: 320, h: 230,
        caption: 'Tripling the heights triples the slopes. The secants close on 12, and 6x gives 12 at x = 2.' } },
    { q: 'A tank holds V(t) = 4t litres. What is the flow rate? Now the tank holds V(t) = t^2. Is the flow rate still constant?', level: 'Analyse change',
      a: "4 litres per unit time, constant. For t², the rate is 2t, which grows, so the tank fills faster and faster.",
      show: { kind: 'frames', label: 'Constant flow, or growing flow',
        frames: [
          { kind: 'steps', f: t => 4 * t, from: 0, to: 4, title: 'V(t)=4t', note: 'flow 4', x0: -0.5, x1: 5, y0: 0, y1: 20, w: 265, h: 200, pick: '4t',
            say: 'Every minute adds the same 4 litres, so the flow rate is constant.' },
          { kind: 'steps', f: t => t * t, from: 0, to: 4, title: 'V(t)=t^2', note: 'flow 2t', x0: -0.5, x1: 5, y0: 0, y1: 20, w: 265, h: 200, pick: 't^2',
            say: 'The rises grow, so the tank fills faster and faster. The rate is 2t, which is not constant.' }
        ] } },
    { q: "For f(x) = x^2, at which input is f'(x) = 10?", level: 'Calculate', hard: true,
      a: 'Solve 2x = 10, giving x = 5. This is chapter 3\'s distinction again: evaluating asks for the slope at a stated input, solving asks which input has a stated slope.',
      show: { kind: 'graph', f: x => 2 * x, title: 'SOLVING ON THE DERIVATIVE', note: "f'(x)=10 at x=5", x0: -1, x1: 7, y0: -2, y1: 14, w: 280, h: 205, marks: [[5, 10]],
        caption: 'Evaluating asks for the slope at a stated input; solving asks which input has a stated slope. This is chapter 3\'s distinction, applied to the derivative instead of the rule.' } },
    { q: 'Why must the difference quotient be simplified before the limit is taken?', level: 'Recognise', hard: true,
      a: 'Because before simplifying, setting h to 0 gives 0/0, which names no number. Cancelling the h is what turns the expression into one that survives the limit, and it is legal precisely because h is never actually 0.',
      show: { kind: 'zoom', f: x => (x * x - 4) / (x - 2), at: 2, holeAt: 4, spans: [2, 0.5, 0.1],
        caption: 'Before simplifying, setting h to 0 gives 0/0, which names no number. Cancelling turns it into an expression that survives the limit, and that is legal precisely because h is never actually 0.' } },
  ],

  misconception: {
    name: 'the derivative is a number',
    wrong: "Asked for the derivative of x², a reader answers 4, having worked at x = 2 in an earlier example.",
    why: "The steepness of x² is different at every input, so no single number can be the answer. The derivative is the rule f'(x) = 2x, and 4 is what that rule returns at the one input 2. The habit of writing f'(2) rather than f' whenever a particular place is meant prevents the error entirely."
  },

  review: 'Chapter 11 left the difference quotient of x² at 4 + h and observed the answers crowding around 4 without reaching it. Chapter 12 named that crowding. This chapter does it once with a general x and gets a rule that reproduces every particular answer computed so far.'
};
