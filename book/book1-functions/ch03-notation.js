// 3. Function notation
//
// The chapter that pays for chapter 12. If a reader cannot substitute x+h into
// a rule without hesitating, the difference quotient is unreachable, so the
// substitution drill is placed here rather than deferred to the derivative.

export default {
  id: 3,
  title: 'Function notation',
  standfirst: 'The notation is a compact record of the machine.',

  blocks: [
    { t: 'figure', kind: 'machine', rule: 'f(x)=2x+1', input: '4', output: '9' },

    { t: 'p', text: 'Call the rule f and the input x. Then **f(x)** names the output produced when the rule f receives x. It is read "f of x", and it does not mean f multiplied by x. The brackets are doing the work of the arrow in the diagram above.' },
    { t: 'formula', text: 'f(x) = 2x + 1' },
    { t: 'p', text: 'The letter x is a placeholder and nothing more. The same rule could be written f(t) = 2t + 1 or f(⬚) = 2⬚ + 1 without changing a single output. It is often worth reading a rule that way the first time, because the blank makes the next step obvious: whatever arrives, put it in every blank.' },

    { t: 'h', text: 'Evaluating, and solving' },
    { t: 'p', text: 'Two different questions get asked of the same rule, and confusing them is the commonest source of a lost mark.' },

    { t: 'table', head: ['Question', 'What is given', 'What is wanted', 'Method'],
      rows: [
        ['Find f(4)', 'the input', 'the output', 'substitute 4 for every x and compute'],
        ['Solve f(x) = 9', 'the output', 'the input', 'set the rule equal to 9 and solve the equation']
      ] },

    { t: 'p', text: 'For f(x) = 2x + 1, evaluating gives f(4) = 2(4) + 1 = 9. Solving f(x) = 9 means asking which input makes 2x + 1 equal 9, and the answer is again x = 4. The two questions met at the same pair because they are the two ways of reading one row of the table.' },

    { t: 'example', n: 1,
      ask: 'For g(x) = x^2 − 3, find g(0), g(2), and g(−2).',
      steps: [
        'Read the rule as: square the blank, then subtract 3.',
        'g(0) = 0² − 3 = 0 − 3 = −3.',
        'g(2) = 2² − 3 = 4 − 3 = 1.',
        'g(−2) = (−2)² − 3 = 4 − 3 = 1. The brackets matter: it is the input that is squared, so the minus is squared with it.'
      ],
      answer: 'g(0) = −3, g(2) = 1, g(−2) = 1.',
      note: 'Written without brackets, −2² means −(2²) = −4 and the answer would come out as −7. The brackets are not decoration.',
      turn: { ask: 'For g(x) = x^2 - 3, find g(1), g(-1), and g(4).', a: 'g(1) = −2, g(−1) = −2, g(4) = 13.' } },

    { t: 'example', n: 2,
      ask: 'For h(t) = 5 − 2t, solve h(t) = −1.',
      steps: [
        'This gives the output, so write the rule equal to it: 5 − 2t = −1.',
        'Subtract 5 from both sides: −2t = −6.',
        'Divide both sides by −2: t = 3.',
        'Check by evaluating forwards: h(3) = 5 − 2(3) = 5 − 6 = −1. It agrees.'
      ],
      answer: 't = 3.',
      note: 'Checking an inverse question by running the rule forwards costs one line and catches nearly every sign error.',
      turn: { ask: 'For h(t) = 5 - 2t, solve h(t) = 11.', a: 't = −3, since 5 − 2t = 11 gives −2t = 6. Check: 5 − 2(−3) = 11.' } },

    { t: 'h', text: 'Substituting something that is not a number' },
    { t: 'p', text: 'Nothing in the notation requires the input to be a bare number. It can be an expression, and the procedure does not change: whatever arrives goes into every blank.' },

    { t: 'figures', items: [
      { kind: 'blanks', rule: 'f(⬚) = 2⬚ + 1', sub: 'the input is the number 4', result: 'f(4) = 2(4) + 1 = 9',
        caption: 'A number in the blank.' },
      { kind: 'blanks', rule: 'f(⬚) = 2⬚ + 1', sub: 'the input is the expression x + h', result: 'f(x+h) = 2(x+h) + 1',
        caption: 'An expression in the blank. Identical procedure, and the brackets are what carry it.' }
    ] },

    { t: 'formula', text: 'f(x) = 2x + 1     so     f(a) = 2a + 1     and     f(x + h) = 2(x + h) + 1' },
    { t: 'p', text: 'That last one is the single most useful substitution in this book. Chapter 10 divides by it, and chapter 12 takes a limit of the result. A reader who can produce f(x + h) without pausing has already done the hard part of the derivative.' },
    { t: 'callout', title: 'The brackets are not optional',
      text: 'Writing f(x + h) = 2x + h + 1 loses the bracket and doubles only part of the input. The blank swallowed the whole expression, so the whole expression must be doubled: 2(x + h). Almost every error in chapter 12 traces back to this one line.' },

    { t: 'example', n: 3,
      ask: 'For f(x) = x^2, write f(x + h) and simplify f(x + h) − f(x).',
      steps: [
        'Put x + h into every blank: f(x + h) = (x + h)².',
        'Expand: (x + h)² = x² + 2xh + h². The middle term is the one that is always forgotten.',
        'Subtract f(x), which is x²: (x² + 2xh + h²) − x².',
        'The x² terms cancel, leaving 2xh + h².'
      ],
      answer: 'f(x + h) = x² + 2xh + h², and f(x + h) − f(x) = 2xh + h².',
      note: 'Every term that survives has an h in it. That is not a coincidence, and chapter 12 depends on it.',
      turn: { ask: 'For f(x) = x^2 + 1, write f(x + h) and simplify f(x + h) - f(x).', a: 'f(x + h) = x² + 2xh + h² + 1, and the difference is 2xh + h². The constant cancels, so the answer matches the plain square.' } },

    { t: 'h', text: 'Four ways to hold the same function' },
    { t: 'p', text: 'One rule, four representations. Fluency means moving between them in any direction, not merely recognising each in turn.' },

    { t: 'table', head: ['Words', 'Table', 'Formula', 'Graph'],
      rows: [['double, then add one', '0→1, 1→3, 2→5', 'f(x) = 2x + 1', 'the plotted pairs form a line']] },

    { t: 'figure', kind: 'graph', f: x => 2 * x + 1, title: 'THE SAME RULE, PLOTTED', note: 'f(x)=2x+1',
      x0: -3, x1: 3, y0: -4, y1: 8, marks: [[0, 1], [1, 3], [2, 5]],
      caption: 'The three table rows are marked. The line is what the other inputs would have given, drawn all at once.' },

    { t: 'example', n: 4,
      ask: 'A table gives f(0) = 1, f(1) = 3, f(2) = 5. Write the rule as a formula, in words, and as three points.',
      steps: [
        'Look at what the outputs do between rows: 1 to 3 to 5, rising by 2 each time the input rises by 1.',
        'A constant rise per step means the rule has the shape 2x plus something fixed.',
        'Use one row to pin the fixed part: at x = 0 the output is 1, and 2(0) = 0, so the fixed part is 1.',
        'Check the rule against a row not used to build it: f(2) = 2(2) + 1 = 5. It agrees.'
      ],
      answer: 'f(x) = 2x + 1; "double the input, then add one"; the points (0, 1), (1, 3), (2, 5).',
      note: 'Three representations of one rule, and the fourth is the graph beside them. The table was the given form and the formula was recovered, which is the direction textbooks drill least and applications need most.',
      turn: { ask: 'A table gives f(0) = 4, f(1) = 7, f(2) = 10. Write the formula and check it on a row you did not use.',
        a: 'f(x) = 3x + 4. Check at x = 2: 6 + 4 = 10.' } }
  ],

  practice: [
    { q: 'For g(x) = x^2 − 3, find g(0), g(2), and g(−2).', level: 'Calculate',
      a: 'g(0) = −3, g(2) = 1, g(−2) = 1.' },
    { q: 'For h(t) = 5 − 2t, solve h(t) = −1.', level: 'Calculate',
      a: 't = 3, since 5 − 2t = −1 gives −2t = −6.' },
    { q: 'Write a formula for "triple the input, then subtract 4".', level: 'Represent',
      a: 'f(x) = 3x − 4.' },
    { q: 'For f(x) = 2x + 1, find f(0), f(−3), and f(0.5).', level: 'Calculate',
      a: '1, −5, and 2.' },
    { q: 'For f(x) = 2x + 1, solve f(x) = 0.', level: 'Calculate',
      a: '2x + 1 = 0 gives x = −1/2.' },
    { q: 'Explain in one sentence why f(x) does not mean f times x.', level: 'Recognise',
      a: 'Because f is the name of a rule rather than a quantity, so there is nothing to multiply by; the brackets say "apply f to what is inside".' },
    { q: 'For p(x) = 4 − x^2, find p(1), p(−1), and p(3).', level: 'Calculate',
      a: '3, 3, and −5.' },
    { q: 'For f(x) = 3x − 4, write f(a), f(2a), and f(x + 1) in simplest form.', level: 'Represent',
      a: 'f(a) = 3a − 4; f(2a) = 6a − 4; f(x + 1) = 3(x + 1) − 4 = 3x − 1.' },
    { q: 'For f(x) = x^2, expand f(x + h) and simplify f(x + h) − f(x).', level: 'Calculate', hard: true,
      a: 'f(x + h) = x² + 2xh + h²; the difference is 2xh + h².' },
    { q: 'For f(x) = 5x, show that f(x + h) − f(x) does not depend on x.', level: 'Calculate', hard: true,
      a: 'f(x + h) = 5x + 5h, so the difference is 5h. No x survives, which is why a straight line has the same steepness everywhere. Chapter 6 names this family.' },
    { q: 'A table gives f(1) = 4, f(2) = 7, f(3) = 10. Write a formula that fits, and say what it assumes.', level: 'Represent', hard: true,
      a: 'f(x) = 3x + 1. It assumes the pattern continues between and beyond the three rows given, which the table alone cannot prove; infinitely many other rules pass through the same three points.' },
    { q: 'If f(2) = 9, write that fact as an ordered pair, as a sentence, and as a point on a graph.', level: 'Represent',
      a: 'The pair (2, 9); "the input 2 produces the output 9"; the point two across and nine up. All three are the same fact, which is the whole content of chapter 5.' }
  ],

  misconception: {
    name: 'f(x + h) = f(x) + f(h)',
    wrong: 'The brackets look like multiplication, so the rule looks like it should distribute across the sum.',
    why: 'Test it once and it dies. For f(x) = x², f(3 + 4) = f(7) = 49, while f(3) + f(4) = 9 + 16 = 25. Applying a rule to a sum is not the same as applying it to each part and adding. Only a very restricted family of functions behaves that way, and stumbling on one of them is what makes the error survive so long.'
  },

  review: 'Chapter 2 distinguished evaluating from solving using x² = 4. The table above is that distinction turned into a method, and question 5 is the first time you are asked to solve rather than evaluate since then.'
};
