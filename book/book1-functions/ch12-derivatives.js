// 12. Derivatives: how fast
//
// Everything needed for this chapter was built earlier: f(x+h) in chapter 3,
// the difference quotient in chapter 10, and the limit in chapter 11. The
// derivation of 2x is done in full rather than quoted, because a reader who
// has watched the h cancel once will believe the power rule later.

export default {
  id: 12,
  part: 'PART II - THE NEXT BOOKS',
  title: 'Derivatives: how fast',
  standfirst: 'The average rate, with the interval shrunk to nothing.',

  blocks: [
    { t: 'figure', kind: 'secant',
      caption: 'Hold A still and slide B toward it. The secant pivots about A, and settles toward the line that touches the curve at A alone: the tangent. Its steepness is the derivative.' },

    { t: 'p', text: 'The **derivative** of f at x is the limit of the difference quotient as the step shrinks to nothing. It measures the instantaneous rate of change, and equally the steepness of the tangent line.' },
    { t: 'formula', text: "f'(x) = limit as h -> 0 of [f(x + h) - f(x)]/h" },
    { t: 'p', text: 'Every symbol in that line has already appeared. Chapter 3 built f(x + h); chapter 10 assembled the quotient; chapter 11 explained what the limit is asking. The only new thing is the name.' },

    { t: 'example', n: 1,
      ask: "Derive f'(x) for f(x) = x^2 from the definition.",
      steps: [
        'Expand the shifted rule: f(x + h) = (x + h)² = x² + 2xh + h².',
        'Subtract: f(x + h) − f(x) = 2xh + h². The x² terms cancel, as they did in chapter 3.',
        'Divide by h: (2xh + h²)/h = 2x + h. This is legal because h is near 0 but never equal to it.',
        'Take the limit as h shrinks: the term 2x does not involve h and stays; the lone h vanishes.'
      ],
      answer: "f'(x) = 2x.",
      note: 'Check against chapter 10. At x = 2 the difference quotient simplified to 4 + h and approached 4; here 2x gives 2(2) = 4. At x = 3 it gave 6 + h approaching 6, and 2(3) = 6. The general result agrees with both particular ones.' },

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
      note: 'Chapter 6 predicted this: a linear rule has constant first differences, so its steepness cannot depend on where you measure. Chapter 10 question 8 found the same 3 without taking any limit, because none was needed.' },

    { t: 'h', text: 'What Book 3 does with this' },
    { t: 'p', text: 'Doing every derivative from the definition would be unbearable, so Book 3 establishes rules: the power rule, then constants and sums, then products, quotients and chains. After that come exponential and trigonometric derivatives, motion, and optimisation, which is the business of finding the flat points this chapter learned to recognise.' }
  ],

  practice: [
    { q: "Derive f'(x) for f(x) = x^2 from the definition, showing the h cancel.", level: 'Analyse change',
      a: "The quotient simplifies to 2x + h, which approaches 2x. So f'(x) = 2x." },
    { q: "For f(x) = x^2, find f'(1), f'(0), and f'(−3).", level: 'Calculate',
      a: '2, 0, and −6. The middle one is zero because the parabola is flat at the origin; the last is negative because the curve is falling there.' },
    { q: "Derive f'(x) for f(x) = 5x − 2 from the definition.", level: 'Analyse change',
      a: "5. The quotient is exactly 5 with no h remaining, so the limit is 5." },
    { q: "Derive f'(x) for the constant rule f(x) = 7.", level: 'Analyse change',
      a: '0. The numerator is 7 − 7 = 0 for every h, so the quotient is 0 throughout and the limit is 0. A flat graph has no steepness anywhere.' },
    { q: 'A car\'s position is s(t) = t^2 metres after t seconds. Find its velocity at t = 3, with units.', level: 'Calculate',
      a: "s'(t) = 2t, so s'(3) = 6 metres per second." },
    { q: "Explain why f'(x) = 2x is a function and 4 is not the derivative of x^2.", level: 'Recognise',
      a: "Because the steepness of x² differs from place to place, so the answer must be a rule rather than a number. 4 is f'(2), the derivative at one particular input." },
    { q: 'From the graph of a derivative, how would you spot where the original curve is flat?', level: 'Analyse change',
      a: 'Where the derivative crosses or touches zero. A flat point on the parent is a zero of its derivative.' },
    { q: "Derive f'(x) for f(x) = x^2 + 5 and compare with f(x) = x^2.", level: 'Analyse change', hard: true,
      a: "Both give 2x. The constant cancels in the subtraction, so shifting a curve up leaves every slope unchanged, exactly as chapter 7 question 10 argued." },
    { q: "Derive f'(x) for f(x) = 3x^2 from the definition.", level: 'Analyse change', hard: true,
      a: '6x. The quotient becomes (6xh + 3h²)/h = 6x + 3h, approaching 6x. Tripling the heights triples the slopes.' },
    { q: 'A tank holds V(t) = 4t litres. What is the flow rate? Now the tank holds V(t) = t^2. Is the flow rate still constant?', level: 'Analyse change',
      a: "4 litres per unit time, constant. For t², the rate is 2t, which grows, so the tank fills faster and faster." },
    { q: "For f(x) = x^2, at which input is f'(x) = 10?", level: 'Calculate', hard: true,
      a: 'Solve 2x = 10, giving x = 5. This is chapter 3\'s distinction again: evaluating asks for the slope at a stated input, solving asks which input has a stated slope.' },
    { q: 'Why must the difference quotient be simplified before the limit is taken?', level: 'Recognise', hard: true,
      a: 'Because before simplifying, setting h to 0 gives 0/0, which names no number. Cancelling the h is what turns the expression into one that survives the limit, and it is legal precisely because h is never actually 0.' }
  ],

  misconception: {
    name: 'the derivative is a number',
    wrong: "Asked for the derivative of x², a reader answers 4, having worked at x = 2 in an earlier example.",
    why: "The steepness of x² is different at every input, so no single number can be the answer. The derivative is the rule f'(x) = 2x, and 4 is what that rule returns at the one input 2. The habit of writing f'(2) rather than f' whenever a particular place is meant prevents the error entirely."
  },

  review: 'Chapter 10 left the difference quotient of x² at 4 + h and observed the answers crowding around 4 without reaching it. Chapter 11 named that crowding. This chapter does it once with a general x and gets a rule that reproduces every particular answer computed so far.'
};
