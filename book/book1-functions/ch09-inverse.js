// 9. Running a function backward
//
// The superscript is a genuine trap: f^-1 looks exactly like a reciprocal and
// is not one. That confusion gets the misconception slot. The chapter also
// carries the method for finding an inverse, which Draft 1 stated only as a
// finished result.

export default {
  id: 9,
  title: 'Running a function backward',
  standfirst: 'An inverse function returns the original input. If f sends 3 to 7, then its inverse sends 7 back to 3.',

  blocks: [
    { t: 'p', text: 'The inverse of f is written **f⁻¹**, read "f inverse". The superscript names an inverse; it does not mean reciprocal. This is a genuinely bad piece of notation that mathematics is stuck with, and the only defence is to read it as a word rather than as an exponent.' },
    { t: 'formula', text: 'f(x) = 2x + 4     f-1(x) = (x - 4)/2' },
    { t: 'p', text: 'Test it. f(3) = 10, and f⁻¹(10) = (10 − 4)/2 = 3. The pair returns you to where you started, which is the entire specification.' },

    { t: 'figure', kind: 'mapping', pairs: [['3', '10'], ['5', '14'], ['0', '4']],
      caption: 'f sends each input right. Its inverse is the same diagram read right to left, which is only possible because no output has two arrows arriving.' },

    { t: 'h', text: 'Which functions have one' },
    { t: 'p', text: 'Reading a mapping diagram backwards works only if no output receives two arrows. If two inputs share an output, the reverse direction forks, and chapter 2 ruled forks out. A function whose outputs are never shared is called **one-to-one**.' },
    { t: 'callout', title: 'The horizontal line test',
      text: 'Sweep a horizontal line across a graph. If it ever meets the graph twice, two inputs share that output and the function is not one-to-one. Compare with chapter 5: the vertical test asks whether it is a function at all; the horizontal test asks whether its reverse is one too.' },

    { t: 'p', text: 'Squaring fails, and fails visibly: 2 and −2 both produce 4, so the horizontal line at height 4 meets the parabola twice. The repair is to refuse half the inputs. Restrict the domain to x at least 0 and squaring becomes one-to-one, with inverse sqrt(x).' },

    { t: 'figures', items: [
      { kind: 'graph', f: x => x * x, title: 'FAILS: TWO INPUTS AT HEIGHT 4', note: 'p(x)=x^2', x0: -4, x1: 4, y0: -1, y1: 9, w: 250, h: 190, marks: [[-2, 4], [2, 4]],
        caption: 'Both marked points sit at height 4, so the reverse direction cannot choose.' },
      { kind: 'graph', f: x => x >= 0 ? x * x : NaN, title: 'REPAIRED: x AT LEAST 0', note: 'domain [0, infinity)', x0: -4, x1: 4, y0: -1, y1: 9, w: 250, h: 190, marks: [[2, 4]],
        caption: 'Half the parabola discarded, one arrow per height restored, and sqrt(x) becomes its inverse.' }
    ] },

    { t: 'h', text: 'Finding an inverse' },
    { t: 'p', text: 'The procedure is three lines and always the same: write the rule with y, swap the letters, then solve for y. Swapping the letters is the algebraic form of reading the diagram backwards.' },

    { t: 'example', n: 1,
      ask: 'Find the inverse of f(x) = 3x − 5.',
      steps: [
        'Write it as y = 3x − 5.',
        'Swap x and y: x = 3y − 5. The input and output have exchanged roles, which is the whole idea.',
        'Solve for y: add 5 to get x + 5 = 3y, then divide by 3.',
        'So y = (x + 5)/3.'
      ],
      answer: 'f⁻¹(x) = (x + 5)/3.' },

    { t: 'example', n: 2,
      ask: 'Verify that inverse by composition, in both directions.',
      steps: [
        'f⁻¹(f(x)): the inner rule gives 3x − 5, and the outer adds 5 then divides by 3.',
        'That is ((3x − 5) + 5)/3 = 3x/3 = x.',
        'f(f⁻¹(x)): the inner rule gives (x + 5)/3, and the outer triples it then subtracts 5.',
        'That is 3·(x + 5)/3 − 5 = (x + 5) − 5 = x.'
      ],
      answer: 'Both compositions return x, so the inverse is correct.',
      note: 'Chapter 8 question 11 predicted this: a pair of rules composing to x in both directions is precisely a function and its inverse.' },

    { t: 'h', text: 'What it looks like' },
    { t: 'p', text: 'Swapping input and output swaps the two coordinates of every point, and swapping coordinates reflects a point across the diagonal line y = x. So the graph of an inverse is the mirror image of the original in that diagonal.' },

    { t: 'figure', kind: 'graph', f: x => 2 * x + 4, second: { f: x => (x - 4) / 2 },
      title: 'f AND ITS INVERSE', note: 'mirrors in y = x', x0: -6, x1: 6, y0: -6, y1: 8, w: 280, h: 210,
      caption: 'f(x) = 2x + 4 in full, and f⁻¹(x) = (x − 4)/2 behind it. Fold the page along the diagonal from bottom left to top right and the two lines land on each other.' },

    { t: 'p', text: 'That reflection is exactly the mistake chapter 5 warned about. Plotting (5, 2) instead of (2, 5) draws the inverse by accident. Done deliberately it is a technique; done accidentally it is a wrong graph.' }
  ],

  practice: [
    { q: 'Find the inverse of f(x) = 3x − 5.', level: 'Combine',
      a: 'f⁻¹(x) = (x + 5)/3.' },
    { q: 'Why does x^2 need a restricted domain before it has an inverse function?', level: 'Recognise',
      a: 'Because 2 and −2 both give 4, so reversing the rule at 4 has two candidate answers and is not a function. Restricting to x at least 0 removes one of them.' },
    { q: 'Verify your inverse from question 1 by composition, in both directions.', level: 'Combine',
      a: 'f⁻¹(f(x)) = ((3x − 5) + 5)/3 = x, and f(f⁻¹(x)) = 3(x + 5)/3 − 5 = x.' },
    { q: 'Find the inverse of f(x) = x + 7.', level: 'Combine',
      a: 'f⁻¹(x) = x − 7.' },
    { q: 'Find the inverse of f(x) = x/4.', level: 'Combine',
      a: 'f⁻¹(x) = 4x.' },
    { q: 'Does f(x) = 5 have an inverse? Explain using the horizontal line test.', level: 'Recognise',
      a: 'No. Every input produces 5, so the horizontal line at height 5 lies along the whole graph and meets it infinitely often. Reversing it could not choose an input.' },
    { q: 'f(x) = 2x + 4 has f⁻¹(x) = (x − 4)/2. Is f⁻¹(x) the same as 1/f(x)?', level: 'Recognise',
      a: 'No. At x = 10, f⁻¹(10) = 3 while 1/f(10) = 1/24. The superscript names an inverse, not a reciprocal.' },
    { q: 'The point (2, 9) lies on y = f(x). Which point must lie on y = f⁻¹(x)?', level: 'Represent',
      a: '(9, 2). Inverting swaps the coordinates.' },
    { q: 'Find the inverse of f(x) = x^3, and say why no restriction is needed.', level: 'Combine', hard: true,
      a: 'f⁻¹(x) is the cube root of x. No restriction is needed because cubing preserves sign, so no two inputs share an output and the horizontal line test passes everywhere.' },
    { q: 'Find the inverse of f(x) = (x − 1)/2 and check one numerical value.', level: 'Combine', hard: true,
      a: 'f⁻¹(x) = 2x + 1. Check: f(7) = 3, and f⁻¹(3) = 7.' },
    { q: 'p(x) = x^2 is restricted to x at most 0 instead of x at least 0. What is its inverse now?', level: 'Combine', hard: true,
      a: 'f⁻¹(x) = −sqrt(x). On that half the outputs are still every non-negative number, but each came from a negative input, so the inverse must return the negative root. Which half you keep changes the answer, which is why the restriction is part of the function.' },
    { q: 'A function converts Celsius to Fahrenheit: F = 1.8C + 32. Find the inverse and state what it does.', level: 'Combine',
      a: 'C = (F − 32)/1.8. It converts Fahrenheit back to Celsius. Checking: 100°C gives 212°F, and (212 − 32)/1.8 = 100.' }
  ],

  misconception: {
    name: 'f⁻¹ means one over f',
    wrong: 'The superscript −1 means reciprocal everywhere else in algebra, so f⁻¹(x) is read as 1/f(x).',
    why: 'They are different functions and rarely even close. For f(x) = 2x + 4, f⁻¹(10) = 3 while 1/f(10) = 1/24. The −1 here is borrowed from the language of undoing an operation, not from exponents. When both meanings are in play, write the reciprocal as [f(x)]⁻¹ or simply 1/f(x) and reserve the bare f⁻¹ for the inverse.'
  },

  review: 'Chapter 5\'s misconception was plotting (input, output) in the wrong order, and warned that doing so draws a different relation. This chapter names that relation and puts it to work: the accidental error of chapter 5 is the deliberate method here.'
};
