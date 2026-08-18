// 6. Three families, three kinds of change
//
// Draft 1 named the three families and their signatures. What it did not give
// was a way to tell them apart from data, which is the difference table. That
// technique is added here because it is the first time a reader computes a
// change rather than describing one, and chapter 10 simply keeps doing it.

export default {
  id: 6,
  title: 'Three families, three kinds of change',
  standfirst: 'Three shapes, and three different answers to the question "what does a steady step do?"',

  blocks: [
    { t: 'figures', items: [
      { kind: 'graph', f: x => 0.8 * x + 1, title: 'LINEAR', note: 'f(x)=0.8x+1', x0: -4, x1: 4, y0: -3, y1: 5, w: 230, h: 175 },
      { kind: 'graph', f: x => x * x, title: 'QUADRATIC', note: 'g(x)=x^2', x0: -3, x1: 3, y0: -1, y1: 8, w: 230, h: 175 },
      { kind: 'graph', f: x => Math.pow(2, x), title: 'EXPONENTIAL', note: 'h(x)=2^x', x0: -3, x1: 3, y0: -1, y1: 8, w: 230, h: 175 }
    ] },

    { t: 'table', head: ['Family', 'Signature', 'What a steady input step does', 'The calculus question'],
      rows: [
        ['Linear', 'f(x) = mx + c', 'adds the same amount each time', 'why is the derivative constant?'],
        ['Quadratic', 'g(x) = ax^2 + bx + c', 'adds a steadily growing amount', 'where is the graph flat?'],
        ['Exponential', 'h(x) = a·b^x', 'multiplies by the same factor each time', 'why is growth tied to current size?']
      ] },

    { t: 'h', text: 'Telling them apart from a table' },
    { t: 'p', text: 'Given numbers rather than a formula, you can identify the family by taking differences. Walk along the outputs subtracting each from the next, and see what the resulting list does.' },

    { t: 'table', head: ['x', 'linear 3x + 1', 'difference', 'quadratic x^2', 'difference', 'second difference', 'exponential 2^x', 'ratio'],
      rows: [
        ['0', '1', '—', '0', '—', '—', '1', '—'],
        ['1', '4', '3', '1', '1', '—', '2', '×2'],
        ['2', '7', '3', '4', '3', '2', '4', '×2'],
        ['3', '10', '3', '9', '5', '2', '8', '×2'],
        ['4', '13', '3', '16', '7', '2', '16', '×2']
      ] },

    { t: 'list', items: [
      '**Linear**: the differences are constant. Equal steps in, equal steps out.',
      '**Quadratic**: the differences are not constant, but *their* differences are. The change is changing, steadily.',
      '**Exponential**: the differences are hopeless, but the ratios are constant. Ask what was multiplied, not what was added.'
    ] },

    { t: 'callout', title: 'Why this is worth the arithmetic',
      text: 'A constant second difference is the first evidence a reader ever meets that "the rate of change has its own rate of change". Chapter 12 gives that idea a symbol. The technique here is the whole thing in miniature, done with subtraction.' },

    { t: 'example', n: 1,
      ask: 'A table gives outputs 5, 8, 13, 20, 29 for inputs 0, 1, 2, 3, 4. Which family?',
      steps: [
        'First differences: 8 − 5 = 3, then 5, 7, 9. Not constant, so not linear.',
        'Second differences: 5 − 3 = 2, then 2, 2. Constant, so quadratic.',
        'Check the ratios in case it is exponential instead: 8/5 = 1.6, 13/8 = 1.625. Not constant, which confirms it.',
        'The constant second difference is 2, and for x² the second difference is also 2, so the rule is x² plus something linear. At x = 0 the output is 5, and the pattern fits x² + 2x + 5.'
      ],
      answer: 'Quadratic. The rule is x² + 2x + 5.',
      note: 'Check one row that was not used to build it: at x = 3, 9 + 6 + 5 = 20. It agrees.' },

    { t: 'example', n: 2,
      ask: 'For y = x^2, compare the output change from x = 0 to 1 with the change from x = 3 to 4.',
      steps: [
        'From 0 to 1: the outputs go 0 to 1, a change of 1.',
        'From 3 to 4: the outputs go 9 to 16, a change of 7.',
        'Both input steps had size 1, yet the output changes differ by a factor of seven.'
      ],
      answer: 'A change of 1, against a change of 7.',
      note: 'This is exactly why a single number cannot describe how fast x² grows. Chapter 10 answers by measuring over a stated interval; chapter 12 answers by shrinking the interval to nothing.' },

    { t: 'h', text: 'A warning about the word "exponential"' },
    { t: 'p', text: 'In ordinary speech "exponential" means dramatic. In mathematics it means multiplicative, and for small inputs it is often the slowest of the three. Compare 2^x with x^2:' },
    { t: 'table', head: ['x', '2', '3', '4', '5', '10'],
      rows: [['x^2', '4', '9', '16', '25', '100'], ['2^x', '4', '8', '16', '32', '1024']] },
    { t: 'p', text: 'At x = 3 the squaring rule is ahead. They tie at x = 4. After that the exponential pulls away and never looks back, and by x = 10 it is ten times larger. Exponential growth is not about being fast early; it is about the factor never letting up.' }
  ],

  practice: [
    { q: 'Classify: y = 4 − 3x, y = 3^x, y = x^2 − 4.', level: 'Recognise',
      a: 'Linear, exponential, quadratic.' },
    { q: 'For y = x^2, compare output changes from x = 0 to 1 and from x = 3 to 4.', level: 'Calculate',
      a: '1 and 7.' },
    { q: 'A population doubles every hour. Which family models it, and why?', level: 'Recognise',
      a: 'Exponential. Equal steps in time multiply the population by a constant factor of 2, rather than adding a constant amount.' },
    { q: 'Outputs 2, 5, 8, 11 for inputs 0, 1, 2, 3. Which family, and what is the rule?', level: 'Calculate',
      a: 'Differences are 3, 3, 3, so linear: y = 3x + 2.' },
    { q: 'Outputs 1, 3, 9, 27 for inputs 0, 1, 2, 3. Which family, and what is the rule?', level: 'Calculate',
      a: 'Ratios are 3, 3, 3, so exponential: y = 3^x.' },
    { q: 'Outputs 0, 1, 4, 9, 16. Take first and second differences and name the family.', level: 'Calculate',
      a: 'First differences 1, 3, 5, 7; second differences 2, 2, 2. Quadratic, and the rule is x².' },
    { q: 'Why can a linear rule be described by a single number for its steepness, when a quadratic cannot?', level: 'Recognise',
      a: 'Because the linear rule adds the same amount at every step, so one number covers every interval. The quadratic adds a different amount at each step, so any single number would have to name which interval it referred to.' },
    { q: 'Which is bigger at x = 3: x^2 or 2^x? Which at x = 10?', level: 'Calculate',
      a: 'At x = 3, x² = 9 beats 2^x = 8. At x = 10, 2^x = 1024 beats x² = 100. They are equal at x = 4.' },
    { q: 'A savings account adds a flat £50 a month. Another adds 5% of its balance a month. Name each family.', level: 'Recognise',
      a: 'The first is linear: the same amount added each step. The second is exponential: the amount added depends on the current size, which is multiplication in disguise.' },
    { q: 'Outputs 3, 3, 3, 3. Which family, and what are the differences?', level: 'Recognise', hard: true,
      a: 'Linear, with all differences 0. A constant rule is the linear family with m = 0; it is flat rather than absent.' },
    { q: 'Second differences of a table are all 6. What can you say about the x^2 coefficient?', level: 'Calculate', hard: true,
      a: 'For ax² with input steps of 1 the second difference is 2a, so a = 3. The rest of the rule cannot be recovered from the second differences alone, because adding any linear part leaves them unchanged.' },
    { q: 'A rule doubles every 3 hours. What factor applies over 1 hour? Is the family still exponential?', level: 'Calculate', hard: true,
      a: 'The cube of the hourly factor must be 2, so the factor is the cube root of 2, about 1.26. Yes, it is still exponential: changing the size of the time step changes the constant factor but never turns multiplying into adding.' }
  ],

  misconception: {
    name: '"exponential" means fast',
    wrong: 'Any steeply climbing curve gets called exponential, and a rule that starts slowly gets ruled out.',
    why: 'Exponential means the output is multiplied by a fixed factor for each fixed input step, which is a statement about mechanism rather than speed. As the table above shows, 2^x is behind x² at x = 3 and level with it at x = 4. Test by taking ratios, not by looking at the steepness.'
  },

  review: 'Chapter 3 asked you to show that f(x + h) − f(x) = 5h for f(x) = 5x, with no x surviving. The constant first difference in the linear column above is that fact tabulated, and question 7 is the reason it matters for everything after chapter 10.'
};
