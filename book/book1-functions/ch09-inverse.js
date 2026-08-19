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
      answer: 'f⁻¹(x) = (x + 5)/3.',
      show: { kind: 'reflect', f: x => 3 * x - 5, finv: x => (x + 5) / 3, pair: [3, 4], note: 'f and f-1', x0: -7, x1: 8, y0: -7, y1: 8, w: 300, h: 265,
        caption: 'f sends 3 to 4, so the inverse sends 4 back to 3. The two marked points sit either side of the dashed diagonal at equal distance, which is what swapping coordinates does.' },
      turn: { ask: 'Find the inverse of f(x) = 4x + 8.', a: 'f⁻¹(x) = (x − 8)/4.' } },

    { t: 'example', n: 2,
      ask: 'Verify that inverse by composition, in both directions.',
      steps: [
        'f⁻¹(f(x)): the inner rule gives 3x − 5, and the outer adds 5 then divides by 3.',
        'That is ((3x − 5) + 5)/3 = 3x/3 = x.',
        'f(f⁻¹(x)): the inner rule gives (x + 5)/3, and the outer triples it then subtracts 5.',
        'That is 3·(x + 5)/3 − 5 = (x + 5) − 5 = x.'
      ],
      answer: 'Both compositions return x, so the inverse is correct.',
      note: 'Chapter 8 question 11 predicted this: a pair of rules composing to x in both directions is precisely a function and its inverse.',
      show: { kind: 'chain', stages: ['f(x)=3x-5', 'f-1(x)=(x+5)/3'], input: '4', values: [7, 4],
        caption: 'Composed in one direction: 4 goes in, 4 comes out. The pair returns you to where you started, which is the entire specification.' },
      turn: { ask: 'Verify that f(x) = 4x + 8 and your inverse from the previous turn compose to x both ways.',
        a: 'f⁻¹(f(x)) = (4x + 8 − 8)/4 = x, and f(f⁻¹(x)) = 4(x − 8)/4 + 8 = x.' } },

    { t: 'h', text: 'What it looks like' },
    { t: 'p', text: 'Swapping input and output swaps the two coordinates of every point, and swapping coordinates reflects a point across the diagonal line y = x. So the graph of an inverse is the mirror image of the original in that diagonal.' },

    { t: 'figure', kind: 'reflect', f: x => 2 * x + 4, finv: x => (x - 4) / 2, pair: [1, 6],
      note: 'f and f-1', x0: -7, x1: 8, y0: -7, y1: 8, w: 320, h: 280,
      caption: 'f(x) = 2x + 4 in teal, f⁻¹(x) = (x − 4)/2 in orange, and the dashed diagonal y = x they mirror in. The marked pair shows the swap: f sends 1 to 6, so f⁻¹ sends 6 back to 1, and the two points sit either side of the diagonal at equal distance.' },

    { t: 'p', text: 'That reflection is exactly the mistake chapter 5 warned about. Plotting (5, 2) instead of (2, 5) draws the inverse by accident. Done deliberately it is a technique; done accidentally it is a wrong graph.' },

    { t: 'example', n: 3,
      ask: 'Find the inverse of f(x) = (2x + 1)/5.',
      steps: [
        'Write y = (2x + 1)/5.',
        'Swap the letters: x = (2y + 1)/5.',
        'Multiply both sides by 5: 5x = 2y + 1.',
        'Subtract 1 and divide by 2: y = (5x − 1)/2.'
      ],
      answer: 'f⁻¹(x) = (5x − 1)/2.',
      note: 'Check with one value rather than trusting the algebra. f(2) = 5/5 = 1, and f⁻¹(1) = (5 − 1)/2 = 2. It returns.',
      show: { kind: 'reflect', f: x => (2 * x + 1) / 5, finv: x => (5 * x - 1) / 2, pair: [2, 1], note: 'mirrors in y = x', x0: -4, x1: 6, y0: -4, y1: 6, w: 300, h: 265,
        caption: 'The check value drawn: f sends 2 to 1, and the inverse sends 1 back to 2.' },
      turn: { ask: 'Find the inverse of f(x) = (3x - 6)/4 and check one value.',
        a: 'f⁻¹(x) = (4x + 6)/3. Check: f(2) = 0 and f⁻¹(0) = 2.' } },

    { t: 'example', n: 4,
      ask: 'Does f(x) = x^2 - 4x have an inverse over all real numbers? If not, restrict it.',
      steps: [
        'Test one-to-one by looking for two inputs sharing an output. Try f(0) = 0 and f(4) = 16 − 16 = 0.',
        'Two inputs give 0, so the horizontal line at height 0 meets the graph twice and there is no inverse.',
        'Find the turning point, because that is where the two halves meet: writing it as (x − 2)² − 4 shows the low point at x = 2.',
        'Restrict to x at least 2, keeping the rising half only. On that half no output is shared.'
      ],
      answer: 'No inverse over all real numbers. Restricted to [2, infinity) it has one.',
      note: 'The turning point is always where to cut, because it is the only place a smooth curve turns from falling to rising and so starts repeating outputs. Chapter 13 gives a way to find it without completing the square.',
      show: { kind: 'frames', label: 'Why it needs cutting, and where',
        frames: [
          { kind: 'linetest', f: x => x * x - 4 * x, at: [0], dir: 'h', title: 'THE WHOLE CURVE', note: 'x^2-4x', x0: -2, x1: 6, y0: -5, y1: 6, w: 275, h: 205, pick: 'as given',
            say: 'The height 0 is reached at x = 0 and again at x = 4, so the reverse direction cannot choose.' },
          { kind: 'graph', f: x => x >= 2 ? x * x - 4 * x : NaN, title: 'RESTRICTED TO x AT LEAST 2', note: 'domain [2, infinity)', x0: -2, x1: 6, y0: -5, y1: 6, w: 275, h: 205, marks: [[2, -4]], pick: 'restricted',
            say: 'Cut at the turning point and only the rising half survives. No output is shared, so an inverse exists.' }
        ] },
      turn: { ask: 'Where would you restrict f(x) = x^2 + 6x so that it has an inverse?',
        a: 'The rule is (x + 3)² − 9 with its low point at x = −3, so restrict to [−3, infinity), or to (−infinity, −3] if you prefer the falling half.' } }
  ],

  drills: [
    { kind: 'inverse', tier: 'Warm-up', cases: [
      { m: 1, c: 7, expr: 'x + 7', invExpr: 'x - 7' },
      { m: 1, c: -4, expr: 'x - 4', invExpr: 'x + 4' },
      { m: 2, c: 0, expr: '2x', invExpr: 'x/2' },
      { m: 5, c: 0, expr: '5x', invExpr: 'x/5' }
    ] },
    { kind: 'inverse', cases: [
      { m: 3, c: -5, expr: '3x - 5', invExpr: '(x + 5)/3' },
      { m: 4, c: 8, expr: '4x + 8', invExpr: '(x - 8)/4' },
      { m: 0.5, c: 3, expr: '0.5x + 3', invExpr: '2x - 6' },
      { m: -2, c: 6, expr: '-2x + 6', invExpr: '(6 - x)/2' },
      { m: 6, c: -1, expr: '6x - 1', invExpr: '(x + 1)/6' },
      { m: -1, c: 9, expr: '9 - x', invExpr: '9 - x' }
    ] }
  ],

  practice: [
    { q: 'Find the inverse of f(x) = 3x − 5.', level: 'Combine',
      a: 'f⁻¹(x) = (x + 5)/3.',
      show: { kind: 'reflect', f: x => 3 * x - 5, finv: x => (x + 5) / 3, pair: [3, 4], note: 'f and f-1', x0: -7, x1: 8, y0: -7, y1: 8, w: 300, h: 265,
        caption: 'f sends 3 to 4, so the inverse sends 4 back to 3. The two marked points sit either side of the dashed diagonal at equal distance.' } },
    { q: 'Why does x^2 need a restricted domain before it has an inverse function?', level: 'Recognise',
      a: 'Because 2 and −2 both give 4, so reversing the rule at 4 has two candidate answers and is not a function. Restricting to x at least 0 removes one of them.',
      show: { kind: 'frames', label: 'Why it must be cut',
        frames: [
          { kind: 'linetest', f: x => x * x, at: [4], dir: 'h', title: 'TWO INPUTS AT HEIGHT 4', note: 'not one-to-one', x0: -4, x1: 4, y0: -1, y1: 9, w: 265, h: 200, pick: 'as given',
            say: 'Both 2 and \u22122 produce 4, so reversing at 4 cannot choose.' },
          { kind: 'graph', f: x => x >= 0 ? x * x : NaN, title: 'RESTRICTED TO x AT LEAST 0', note: 'inverse is sqrt(x)', x0: -4, x1: 4, y0: -1, y1: 9, w: 265, h: 200, marks: [[2, 4]], pick: 'restricted',
            say: 'Half discarded, one arrow per height restored, and the square root becomes its inverse.' }
        ] } },
    { q: 'Verify your inverse from question 1 by composition, in both directions.', level: 'Combine',
      a: 'f⁻¹(f(x)) = ((3x − 5) + 5)/3 = x, and f(f⁻¹(x)) = 3(x + 5)/3 − 5 = x.',
      show: { kind: 'chain', stages: ['f(x)=3x-5', 'f-1(x)=(x+5)/3'], input: '4', values: [7, 4],
        caption: 'Composed one way: 4 in, 4 out. The other direction does the same, which is what verifying an inverse means.' } },
    { q: 'Find the inverse of f(x) = x + 7.', level: 'Combine',
      a: 'f⁻¹(x) = x − 7.',
      show: { kind: 'reflect', f: x => x + 7, finv: x => x - 7, pair: [0, 7], note: 'add 7, subtract 7', x0: -9, x1: 10, y0: -9, y1: 10, w: 300, h: 265,
        caption: 'The simplest pair there is. Both lines are parallel to the diagonal and sit either side of it.' } },
    { q: 'Find the inverse of f(x) = x/4.', level: 'Combine',
      a: 'f⁻¹(x) = 4x.',
      show: { kind: 'reflect', f: x => x / 4, finv: x => 4 * x, pair: [4, 1], note: 'divide by 4, multiply by 4', x0: -6, x1: 7, y0: -6, y1: 7, w: 300, h: 265,
        caption: 'A shallow line and a steep one, mirrored. Dividing by 4 is undone by multiplying by 4, and the picture says so.' } },
    { q: 'Does f(x) = 5 have an inverse? Explain using the horizontal line test.', level: 'Recognise',
      a: 'No. Every input produces 5, so the horizontal line at height 5 lies along the whole graph and meets it infinitely often. Reversing it could not choose an input.',
      show: { kind: 'linetest', f: x => 5, at: [5], dir: 'h', title: 'THE LINE LIES ALONG IT', note: 'f(x)=5', x0: -4, x1: 4, y0: 0, y1: 9, w: 275, h: 200,
        caption: 'Every input produces 5, so the horizontal line at that height meets the graph everywhere at once. Reversing it could not pick an input.' } },
    { q: 'f(x) = 2x + 4 has f⁻¹(x) = (x − 4)/2. Is f⁻¹(x) the same as 1/f(x)?', level: 'Recognise',
      a: 'No. At x = 10, f⁻¹(10) = 3 while 1/f(10) = 1/24. The superscript names an inverse, not a reciprocal.',
      show: { kind: 'frames', label: 'Inverse against reciprocal',
        frames: [
          { kind: 'machine', rule: 'f-1(x)=(x-4)/2', input: '10', output: '3', pick: 'the inverse',
            say: 'It returns the input that f sent to 10.' },
          { kind: 'machine', rule: '1/f(x)', input: '10', output: '1/24', pick: 'the reciprocal',
            say: 'Something else entirely: one divided by f(10) = 24. The superscript names an inverse, not an exponent.' }
        ] } },
    { q: 'The point (2, 9) lies on y = f(x). Which point must lie on y = f⁻¹(x)?', level: 'Represent',
      a: '(9, 2). Inverting swaps the coordinates.',
      show: { kind: 'reflect', f: x => 4.5 * x, finv: x => x / 4.5, pair: [2, 9], note: 'the pair swaps', x0: -3, x1: 11, y0: -3, y1: 11, w: 300, h: 265,
        caption: '(2, 9) on the rule becomes (9, 2) on its inverse. Inverting swaps the coordinates, which reflects the point across the diagonal.' } },
    { q: 'Find the inverse of f(x) = x^3, and say why no restriction is needed.', level: 'Combine', hard: true,
      a: 'f⁻¹(x) is the cube root of x. No restriction is needed because cubing preserves sign, so no two inputs share an output and the horizontal line test passes everywhere.',
      show: { kind: 'reflect', f: x => x * x * x, finv: x => Math.cbrt(x), pair: [1.6, 4.1], note: 'no restriction needed', x0: -5, x1: 5, y0: -5, y1: 5, w: 300, h: 265,
        caption: 'Cubing preserves sign, so no horizontal line meets it twice and no half has to be discarded. Compare the parabola, which needs cutting.' } },
    { q: 'Find the inverse of f(x) = (x − 1)/2 and check one numerical value.', level: 'Combine', hard: true,
      a: 'f⁻¹(x) = 2x + 1. Check: f(7) = 3, and f⁻¹(3) = 7.',
      show: { kind: 'reflect', f: x => (x - 1) / 2, finv: x => 2 * x + 1, pair: [7, 3], note: 'f(7)=3', x0: -5, x1: 9, y0: -5, y1: 9, w: 300, h: 265,
        caption: 'The check value drawn: f sends 7 to 3, and the inverse sends 3 back to 7.' } },
    { q: 'p(x) = x^2 is restricted to x at most 0 instead of x at least 0. What is its inverse now?', level: 'Combine', hard: true,
      a: 'f⁻¹(x) = −sqrt(x). On that half the outputs are still every non-negative number, but each came from a negative input, so the inverse must return the negative root. Which half you keep changes the answer, which is why the restriction is part of the function.',
      show: { kind: 'frames', label: 'Which half you keep changes the answer',
        frames: [
          { kind: 'graph', f: x => x >= 0 ? x * x : NaN, title: 'KEEP x AT LEAST 0', note: 'inverse +sqrt(x)', x0: -4, x1: 4, y0: -1, y1: 9, w: 260, h: 200, marks: [[3, 9]], pick: 'right half',
            say: 'Every output came from a positive input, so the inverse returns the positive root.' },
          { kind: 'graph', f: x => x <= 0 ? x * x : NaN, title: 'KEEP x AT MOST 0', note: 'inverse -sqrt(x)', x0: -4, x1: 4, y0: -1, y1: 9, w: 260, h: 200, marks: [[-3, 9]], pick: 'left half',
            say: 'Same outputs, but each came from a negative input, so the inverse must return the negative root.' }
        ] } },
    { q: 'A function converts Celsius to Fahrenheit: F = 1.8C + 32. Find the inverse and state what it does.', level: 'Combine',
      a: 'C = (F − 32)/1.8. It converts Fahrenheit back to Celsius. Checking: 100°C gives 212°F, and (212 − 32)/1.8 = 100.',
      show: { kind: 'reflect', f: c => 1.8 * c + 32, finv: f => (f - 32) / 1.8, pair: [100, 212], note: 'C to F, and back', x0: -50, x1: 250, y0: -50, y1: 250, w: 300, h: 265,
        caption: '100 degrees Celsius is 212 Fahrenheit, and the inverse sends 212 back to 100. The two lines cross on the diagonal at the one temperature that reads the same in both scales.' } },
  ],

  misconception: {
    name: 'f⁻¹ means one over f',
    wrong: 'The superscript −1 means reciprocal everywhere else in algebra, so f⁻¹(x) is read as 1/f(x).',
    why: 'They are different functions and rarely even close. For f(x) = 2x + 4, f⁻¹(10) = 3 while 1/f(10) = 1/24. The −1 here is borrowed from the language of undoing an operation, not from exponents. When both meanings are in play, write the reciprocal as [f(x)]⁻¹ or simply 1/f(x) and reserve the bare f⁻¹ for the inverse.'
  },

  review: 'Chapter 5\'s misconception was plotting (input, output) in the wrong order, and warned that doing so draws a different relation. This chapter names that relation and puts it to work: the accidental error of chapter 5 is the deliberate method here.'
};
