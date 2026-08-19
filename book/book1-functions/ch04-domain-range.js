// 4. Domain and range
//
// The benchmark table in Draft 1 marked this "Introduced -> Expand", against a
// textbook standard of intervals, restrictions and graphs. Interval notation is
// added here because every later chapter states an answer in it, and because a
// composite domain in chapter 8 is unwritable without it.

export default {
  id: 4,
  title: 'Domain and range',
  standfirst: 'A machine may be perfectly reliable while refusing some inputs.',

  blocks: [
    { t: 'p', text: 'The **domain** is the set of allowed inputs. The **range** is the set of outputs the function actually produces. Chapter 2 established that refusing an input is not a fault; this chapter says which inputs get refused, and why.' },

    { t: 'h', text: 'Three reasons an input is refused' },
    { t: 'p', text: 'Over the real numbers, almost every exclusion you will meet comes from one of three causes. Learning to scan a formula for these three is the whole technique.' },

    { t: 'table', head: ['Cause', 'What to look for', 'Example', 'Excluded'],
      rows: [
        ['Division by zero', 'any denominator containing x', '1/(x − 3)', 'x = 3'],
        ['Even root of a negative', 'sqrt, fourth root, and so on', 'sqrt(x + 2)', 'everything below x = −2'],
        ['The situation itself', 'what the quantity means', 'a length, a count, a time since start', 'negatives, and often fractions']
      ] },

    { t: 'p', text: 'The third cause is the one textbooks under-teach and applications depend on. If x is the number of people in a lift, then x = 2.5 is arithmetically harmless and physically meaningless. The domain is set by the situation, not only by the algebra.' },

    { t: 'h', text: 'Writing a set of numbers down' },
    { t: 'p', text: 'Describing a domain in words gets unwieldy fast. Interval notation says the same thing in a few characters. A square bracket includes the endpoint; a round bracket excludes it. Infinity always takes a round bracket, because it is a direction rather than a number you could reach.' },

    { t: 'table', head: ['In words', 'Interval', 'Reads as'],
      rows: [
        ['x is between 0 and 5, both included', '[0, 5]', 'closed at both ends'],
        ['x is between 0 and 5, neither included', '(0, 5)', 'open at both ends'],
        ['x is at least −2', '[-2, infinity)', 'closed at −2, running upward'],
        ['x is more than 3', '(3, infinity)', 'open at 3'],
        ['every real number', '(-infinity, infinity)', 'unbounded both ways'],
        ['every real number except 3', '(-infinity, 3) and (3, infinity)', 'two pieces, joined by "or"']
      ] },

    { t: 'callout', title: 'Why the last row is written in two pieces',
      text: 'A single interval has no holes in it. Removing one point from the line leaves two separate stretches, so the notation has to name both. Chapter 11 returns to this point: a function can approach a value at a place its domain does not contain.' },

    { t: 'h', text: 'Four rules, examined' },
    { t: 'table', head: ['Function', 'Domain', 'Range'],
      rows: [
        ['f(x) = 2x + 1', 'all real x', 'all real outputs'],
        ['g(x) = 1/x', 'x not equal to 0', 'every output except 0'],
        ['h(x) = sqrt(x)', 'x at least 0', 'outputs at least 0'],
        ['p(x) = x^2', 'all real x', 'outputs at least 0']
      ] },

    { t: 'p', text: 'The last two rows are worth comparing. Squaring accepts everything and produces only non-negatives; the square root accepts only non-negatives and produces only non-negatives. The restriction has moved from the output side to the input side, and chapter 9 shows that this is exactly what running a function backwards does.' },

    { t: 'figures', items: [
      { kind: 'graph', f: x => 1 / x, title: 'g(x)=1/x', note: 'no value at x=0', x0: -4, x1: 4, y0: -4, y1: 4, w: 235, h: 180,
        caption: 'A gap in the domain, drawn. The curve never crosses the vertical axis.' },
      { kind: 'graph', f: x => Math.sqrt(x), title: 'h(x)=sqrt(x)', note: 'starts at x=0', x0: -4, x1: 4, y0: -2, y1: 4, w: 235, h: 180, marks: [[0, 0]],
        caption: 'The domain begins at 0 and the curve begins with it. Nothing is drawn to the left because nothing is allowed there.' }
    ] },

    { t: 'example', n: 1,
      ask: 'State the domain of q(x) = 1/(x − 3).',
      steps: [
        'Scan for the three causes. There is a denominator containing x, and no even root.',
        'Set the denominator to zero and solve: x − 3 = 0, so x = 3.',
        'That input, and only that input, must go.'
      ],
      answer: 'All real numbers except 3, written (−infinity, 3) and (3, infinity).',
      note: 'The numerator plays no part. A common slip is to answer "x is not 0", which is where the denominator would vanish if it read x rather than x − 3.',
      turn: { ask: 'State the domain of f(x) = 1/(x + 6).', a: 'All real x except −6.' } },

    { t: 'example', n: 2,
      ask: 'State the real domain and range of r(x) = sqrt(x + 2).',
      steps: [
        'The cause here is the even root, so demand that the whole expression under it is not negative: x + 2 at least 0.',
        'Solve: x at least −2. The condition lands on x + 2, not on x alone.',
        'For the range, the square root returns non-negative values only, and as x runs upward from −2 the inside runs upward from 0.',
        'So the outputs start at sqrt(0) = 0 and rise without bound.'
      ],
      answer: 'Domain [−2, infinity). Range [0, infinity).',
      turn: { ask: 'State the real domain and range of r(x) = sqrt(x - 5).', a: 'Domain [5, infinity); range [0, infinity).' } },

    { t: 'callout', title: 'Why calculus cares',
      text: 'Limits examine what a function does *near* a point, often one its domain excludes. The expression in chapter 11 has a hole at x = 1 and a perfectly definite limit there. Knowing precisely which inputs are missing is what makes that question askable.' },

    { t: 'h', text: 'Domains, drawn' },
    { t: 'p', text: 'Interval notation is a compressed picture, and it is worth decompressing at least once. The line below is every real number; the shaded stretch is what a rule accepts.' },

    { t: 'figure', kind: 'numberline', from: -6, to: 6,
      spans: [{ a: -2, b: 6, label: 'accepted' }, { a: -6, b: -2, tone: 'out', label: 'refused' }],
      marks: [{ x: -2, label: 'included' }],
      caption: 'The domain of sqrt(x + 2), which is [−2, infinity). The endpoint is filled because −2 is accepted: the square root of 0 is 0, which is a perfectly good output.' },

    { t: 'figure', kind: 'numberline', from: -6, to: 6,
      spans: [{ a: -6, b: 3 }, { a: 3, b: 6 }],
      marks: [{ x: 3, open: true, label: 'removed' }],
      caption: 'The domain of 1/(x − 3). One point is punched out and the line falls into two stretches, which is why the notation needs two brackets joined by "or".' },

    { t: 'p', text: 'Compare the two endpoints. The first is drawn filled, the second hollow, and that is the whole difference between a square bracket and a round one. A hollow endpoint is also exactly the hole that chapter 11 takes a limit at.' },

    { t: 'example', n: 3,
      ask: 'State the domain of f(x) = sqrt(x)/(x - 4).',
      steps: [
        'Two causes are present at once, so check both rather than stopping at the first.',
        'The square root demands x at least 0.',
        'The denominator forbids x − 4 = 0, so x = 4 must go.',
        'Combine: start from [0, infinity) and remove the single point 4.'
      ],
      answer: '[0, 4) and (4, infinity).',
      note: 'The endpoint 0 survives because the root accepts it and the denominator there is −4, which is harmless. Each cause has to be checked against the whole expression, not against the letter x.',
      turn: { ask: 'State the domain of f(x) = sqrt(x + 1)/(x - 2).', a: '[−1, 2) and (2, infinity).' } },

    { t: 'example', n: 4,
      ask: 'Find the range of f(x) = 1/x.',
      steps: [
        'Ask which outputs are actually produced. Try to hit the output 5: solve 1/x = 5, giving x = 1/5, which is allowed.',
        'The same works for any non-zero target y, because x = 1/y is then an allowed input.',
        'Now try to hit 0: solve 1/x = 0. Nothing divided into 1 gives nothing.',
        'So every output except 0 is produced, and 0 is not.'
      ],
      answer: '(−infinity, 0) and (0, infinity).',
      note: 'Notice the method. To find a range, set the rule equal to a general output and ask which targets can be solved for. That is a chapter 3 solving question, asked once for every possible answer at the same time.',
      turn: { ask: 'Find the range of f(x) = x^2 + 1.', a: '[1, infinity). Solving x² + 1 = y needs x² = y − 1, which has a real solution exactly when y is at least 1.' } }
  ],

  practice: [
    { q: 'State the domain of q(x) = 1/(x − 3).', level: 'Calculate',
      a: 'All real x except 3: (−infinity, 3) and (3, infinity).' },
    { q: 'State the real domain and range of r(x) = sqrt(x + 2).', level: 'Calculate',
      a: 'Domain [−2, infinity); range [0, infinity).' },
    { q: 'The input is time from 0 to 60 seconds. Write that contextual domain in words and as an interval.', level: 'Represent',
      a: 'Every moment from the start up to and including sixty seconds: [0, 60].' },
    { q: 'State the domain of f(x) = 1/(x + 5).', level: 'Calculate',
      a: 'All real x except −5, since x + 5 = 0 at x = −5.' },
    { q: 'State the domain of f(x) = sqrt(5 − x).', level: 'Calculate',
      a: '5 − x must be at least 0, so x is at most 5: (−infinity, 5]. Note the inequality reverses when you move x across.' },
    { q: 'State the domain of f(x) = x^2 + 4x − 7.', level: 'Calculate',
      a: 'All real numbers. There is no denominator and no even root, so nothing is refused.' },
    { q: 'Write "every real number except 0 and 2" in interval notation.', level: 'Represent',
      a: '(−infinity, 0), (0, 2), and (2, infinity): three pieces, because two points have been removed from the line.' },
    { q: 'What is the range of f(x) = x^2 + 3?', level: 'Calculate',
      a: '[3, infinity). Squaring never returns less than 0, so adding 3 never returns less than 3, and 3 itself is reached at x = 0.' },
    { q: 'A square has side x. Write the domain of its area function in context, and say why it differs from the algebraic domain.', level: 'Recognise',
      a: 'Contextually (0, infinity), or [0, infinity) if a square of side zero is allowed. Algebraically x² accepts negatives quite happily; a side length cannot be negative, so the situation refuses inputs the algebra would take.' },
    { q: 'State the domain of f(x) = sqrt(x)/(x − 4).', level: 'Calculate', hard: true,
      a: 'Two causes at once. The root needs x at least 0; the denominator forbids x = 4. Together: [0, 4) and (4, infinity).' },
    { q: 'State the domain of f(x) = 1/sqrt(x − 1).', level: 'Calculate', hard: true,
      a: 'x − 1 must be at least 0 for the root, and non-zero because it is underneath. So x − 1 is strictly positive: (1, infinity). When a root sits in a denominator, the endpoint is lost as well.' },
    { q: 'Two functions have the same formula but domains [0, 3] and all real numbers. Are they the same function?', level: 'Recognise', hard: true,
      a: 'No. A function is a rule together with the inputs it accepts. The first refuses 5 and the second does not, so they behave differently and are different functions. This is exactly the manoeuvre chapter 9 uses to give x² an inverse.' }
  ],

  misconception: {
    name: 'applying the restriction to x instead of to the whole expression',
    wrong: 'Asked for the domain of sqrt(x + 2), a reader writes x at least 0, because square roots need non-negative inputs and x is the input.',
    why: 'The square root does need a non-negative input, but its input is x + 2, not x. The condition belongs to whatever sits under the sign. Reading the rule with a blank helps: sqrt(⬚) needs ⬚ at least 0, and here ⬚ is x + 2, giving x at least −2. The same care settles question 5, where the inequality reverses.'
  },

  review: 'Chapter 2 argued that 1/x is a function despite having no value at 0. This chapter gives that missing point a name and a notation, and the graph above draws it. Question 12 revisits chapter 1\'s claim that a function is a rule plus its allowed inputs, and shows the claim has teeth.'
};
