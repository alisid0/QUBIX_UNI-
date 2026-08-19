// 6. Three families, three kinds of change
//
// Draft 1 named the three families and their signatures. What it did not give
// was a way to tell them apart from data, which is the difference table. That
// technique is added here because it is the first time a reader computes a
// change rather than describing one, and chapter 11 simply keeps doing it.

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
      text: 'A constant second difference is the first evidence a reader ever meets that "the rate of change has its own rate of change". Chapter 13 gives that idea a symbol. The technique here is the whole thing in miniature, done with subtraction.' },

    { t: 'example', n: 1,
      ask: 'A table gives outputs 5, 8, 13, 20, 29 for inputs 0, 1, 2, 3, 4. Which family?',
      steps: [
        'First differences: 8 − 5 = 3, then 5, 7, 9. Not constant, so not linear.',
        'Second differences: 5 − 3 = 2, then 2, 2. Constant, so quadratic.',
        'Check the ratios in case it is exponential instead: 8/5 = 1.6, 13/8 = 1.625. Not constant, which confirms it.',
        'The constant second difference is 2, and for x² the second difference is also 2, so the rule is x² plus something linear. At x = 0 the output is 5, and the pattern fits x² + 2x + 5.'
      ],
      answer: 'Quadratic. The rule is x² + 2x + 5.',
      note: 'Check one row that was not used to build it: at x = 3, 9 + 6 + 5 = 20. It agrees.',
      show: { kind: 'steps', f: x => x * x + 2 * x + 5, from: 0, to: 4, title: 'THE RECOVERED RULE', note: 'x^2+2x+5', x0: -0.6, x1: 5.4, y0: 0, y1: 32, w: 300, h: 220,
        caption: 'The rises are 3, 5, 7 and 9, each 2 more than the last. A constant second difference is what made this quadratic rather than exponential.' },
      turn: { ask: 'A table gives 3, 6, 11, 18, 27 for inputs 0 to 4. Which family, and what is the rule?', a: 'Second differences are all 2, so quadratic; the rule is x² + 2x + 3.' } },

    { t: 'example', n: 2,
      ask: 'For y = x^2, compare the output change from x = 0 to 1 with the change from x = 3 to 4.',
      steps: [
        'From 0 to 1: the outputs go 0 to 1, a change of 1.',
        'From 3 to 4: the outputs go 9 to 16, a change of 7.',
        'Both input steps had size 1, yet the output changes differ by a factor of seven.'
      ],
      answer: 'A change of 1, against a change of 7.',
      note: 'This is exactly why a single number cannot describe how fast x² grows. Chapter 11 answers by measuring over a stated interval; chapter 13 answers by shrinking the interval to nothing.',
      show: { kind: 'steps', f: x => x * x, from: 0, to: 4, title: 'THE SAME STEP, DIFFERENT RISE', note: 'x^2', x0: -0.6, x1: 5.4, y0: -1, y1: 18, w: 300, h: 220,
        caption: 'The first rise is 1 and the fourth is 7, from input steps of the same size. That is why no single number can describe how fast x\u00b2 grows.' },
      turn: { ask: 'For y = x^2, compare the output change from x = 1 to 2 with the change from x = 5 to 6.', a: '3 against 11. Same input step, very different output change.' } },

    { t: 'h', text: 'A warning about the word "exponential"' },
    { t: 'p', text: 'In ordinary speech "exponential" means dramatic. In mathematics it means multiplicative, and for small inputs it is often the slowest of the three. Compare 2^x with x^2:' },
    { t: 'table', head: ['x', '2', '3', '4', '5', '10'],
      rows: [['x^2', '4', '9', '16', '25', '100'], ['2^x', '4', '8', '16', '32', '1024']] },
    { t: 'p', text: 'At x = 3 the squaring rule is ahead. They tie at x = 4. After that the exponential pulls away and never looks back, and by x = 10 it is ten times larger. Exponential growth is not about being fast early; it is about the factor never letting up.' },

    { t: 'h', text: 'The three families, stepped' },
    { t: 'p', text: 'The difference table above is a list of numbers. Below it is a picture: each panel takes the same four steps of size one along the input and marks what the output did.' },

    { t: 'figures', items: [
      { kind: 'steps', f: x => 3 * x + 1, from: 0, to: 4, title: 'LINEAR', note: '3x+1',
        x0: -0.6, x1: 5.4, y0: -1, y1: 15, w: 245, h: 195,
        caption: 'Every rise is +3. The steps form a staircase with identical treads.' },
      { kind: 'steps', f: x => x * x, from: 0, to: 4, title: 'QUADRATIC', note: 'x^2',
        x0: -0.6, x1: 5.4, y0: -1, y1: 18, w: 245, h: 195,
        caption: 'The rises are +1, +3, +5, +7. They grow, and they grow by the same 2 each time.' },
      { kind: 'steps', f: x => Math.pow(2, x), from: 0, to: 4, title: 'EXPONENTIAL', note: '2^x',
        x0: -0.6, x1: 5.4, y0: -1, y1: 18, w: 245, h: 195,
        caption: 'The rises are +1, +2, +4, +8. Each is the whole height so far, which is what doubling means.' }
    ] },

    { t: 'p', text: 'The third caption is the one to keep. For an exponential rule the amount added *is* the amount already there, which is why growth of this kind is described as tied to current size, and why it cannot be slowed by starting small.' },

    { t: 'example', n: 3,
      ask: 'A table gives outputs 4, 12, 36, 108 for inputs 0, 1, 2, 3. Identify the family and the rule.',
      steps: [
        'First differences: 8, 24, 72. Not constant, so not linear.',
        'Second differences: 16, 48. Not constant either, so not quadratic.',
        'Ratios: 12/4 = 3, 36/12 = 3, 108/36 = 3. Constant, so exponential.',
        'The constant factor is 3 and the output at x = 0 is 4, so the rule is 4 × 3^x.'
      ],
      answer: 'Exponential, with the rule 4·3^x.',
      note: 'Check a row not used to build it: at x = 2, 4 × 9 = 36. It agrees. The value at x = 0 is always the multiplier, because 3 to the power 0 is 1.',
      show: { kind: 'steps', f: x => 4 * Math.pow(3, x), from: 0, to: 3, title: 'RATIOS, NOT DIFFERENCES', note: '4\u00b73^x', x0: -0.5, x1: 4, y0: -6, y1: 120, w: 300, h: 220,
        caption: 'The rises 8, 24 and 72 look hopeless until you divide instead of subtract: each output is three times the last.' },
      turn: { ask: 'Identify the family and rule for outputs 5, 10, 20, 40 at inputs 0, 1, 2, 3.',
        a: 'Exponential, ratio 2, so 5·2^x.' } },

    { t: 'example', n: 4,
      ask: 'Two rules are proposed for the same data: 2x + 1 and 2^x. Test both against the outputs 1, 2, 4, 8 at inputs 0, 1, 2, 3.',
      steps: [
        'Test 2x + 1: at x = 0 it gives 1, which matches. At x = 1 it gives 3, and the data says 2.',
        'One disagreement is enough to reject it.',
        'Test 2^x: 1, 2, 4, 8. All four match.',
        'Confirm by mechanism rather than by luck: the ratios of the data are 2, 2, 2, which is what an exponential rule with base 2 must produce.'
      ],
      answer: 'The data is 2^x. The linear rule fails at the second point.',
      note: 'Matching one point proves nothing, which is why the first test was abandoned as soon as a second point disagreed. Any rule can be made to pass through a single point.',
      show: { kind: 'frames', label: 'Test each candidate against the data',
        frames: [
          { kind: 'graph', f: x => Math.pow(2, x), title: 'THE DATA: 1, 2, 4, 8', note: '2^x', x0: -0.5, x1: 3.5, y0: -1, y1: 9, w: 265, h: 195, marks: [[0, 1], [1, 2], [2, 4], [3, 8]], pick: '2^x fits',
            say: 'All four points sit on the curve.' },
          { kind: 'graph', f: x => 2 * x + 1, title: 'THE LINEAR CANDIDATE', note: '2x+1', x0: -0.5, x1: 3.5, y0: -1, y1: 9, w: 265, h: 195, marks: [[0, 1], [1, 2], [2, 4], [3, 8]], pick: '2x+1 fails',
            say: 'It passes through the first point and misses the other three. One disagreement is enough to reject it.' }
        ] },
      turn: { ask: 'Do the outputs 1, 4, 9, 16 at inputs 1, 2, 3, 4 fit x^2 or 5x - 4? Test both.',
        a: 'x². The linear rule gives 1, 6, 11, 16, matching at the first and last inputs and failing in between, which is a good reminder that two agreements are not a proof either.' } }
  ],

  drills: [
    { kind: 'family', tier: 'Warm-up', series: [
      { f: x => 2 * x + 5, expr: '2x + 5', kind: 'linear' },
      { f: x => 4 * x - 1, expr: '4x - 1', kind: 'linear' },
      { f: x => x * x, expr: 'x^2', kind: 'quadratic' },
      { f: x => x * x + 3 * x, expr: 'x^2 + 3x', kind: 'quadratic' },
      { f: x => Math.pow(2, x), expr: '2^x', kind: 'exponential' },
      { f: x => 3 * Math.pow(2, x), expr: '3\u00b72^x', kind: 'exponential' },
      { f: x => Math.pow(3, x), expr: '3^x', kind: 'exponential', to: 3 },
      { f: x => 5 * x + 2, expr: '5x + 2', kind: 'linear', tier: 'Core' }
    ] }
  ],

  practice: [
    { q: 'Classify: y = 4 − 3x, y = 3^x, y = x^2 − 4.', level: 'Recognise',
      a: 'Linear, exponential, quadratic.',
      show: { items: [
        { kind: 'graph', f: x => 4 - 3 * x, title: 'LINEAR', note: 'y=4-3x', x0: -2, x1: 4, y0: -6, y1: 8, w: 235, h: 180,
          caption: 'A straight line, falling because the coefficient is negative.' },
        { kind: 'graph', f: x => Math.pow(3, x), title: 'EXPONENTIAL', note: 'y=3^x', x0: -2, x1: 2.5, y0: -1, y1: 10, w: 235, h: 180,
          caption: 'Equal steps multiply the output by 3.' },
        { kind: 'graph', f: x => x * x - 4, title: 'QUADRATIC', note: 'y=x^2-4', x0: -3.5, x1: 3.5, y0: -5, y1: 6, w: 235, h: 180,
          caption: 'One turning point, symmetric about the vertical axis.' }
      ] } },
    { q: 'For y = x^2, compare output changes from x = 0 to 1 and from x = 3 to 4.', level: 'Calculate',
      a: '1 and 7.',
      show: { kind: 'steps', f: x => x * x, from: 0, to: 4, title: 'THE SAME STEP, DIFFERENT RISE', note: 'x^2', x0: -0.6, x1: 5.4, y0: -1, y1: 18, w: 290, h: 215,
        caption: 'From 0 to 1 the rise is 1; from 3 to 4 it is 7. The input steps are identical, which is exactly why no single number describes the growth.' } },
    { q: 'A population doubles every hour. Which family models it, and why?', level: 'Recognise',
      a: 'Exponential. Equal steps in time multiply the population by a constant factor of 2, rather than adding a constant amount.',
      show: { kind: 'steps', f: x => Math.pow(2, x), from: 0, to: 4, title: 'EACH RISE IS THE HEIGHT SO FAR', note: 'doubling', x0: -0.6, x1: 5.4, y0: -1, y1: 18, w: 290, h: 215,
        caption: 'The rises 1, 2, 4, 8 are the running totals themselves. Equal steps in time multiply rather than add, which is what makes it exponential.' } },
    { q: 'Outputs 2, 5, 8, 11 for inputs 0, 1, 2, 3. Which family, and what is the rule?', level: 'Calculate',
      a: 'Differences are 3, 3, 3, so linear: y = 3x + 2.',
      show: { kind: 'steps', f: x => 3 * x + 2, from: 0, to: 3, title: 'CONSTANT FIRST DIFFERENCE', note: 'y=3x+2', x0: -0.5, x1: 4, y0: 0, y1: 14, w: 285, h: 210,
        caption: 'Every rise is 3 and the output at 0 is 2, which is the whole rule read off the staircase.' } },
    { q: 'Outputs 1, 3, 9, 27 for inputs 0, 1, 2, 3. Which family, and what is the rule?', level: 'Calculate',
      a: 'Ratios are 3, 3, 3, so exponential: y = 3^x.',
      show: { kind: 'steps', f: x => Math.pow(3, x), from: 0, to: 3, title: 'CONSTANT RATIO', note: 'y=3^x', x0: -0.5, x1: 4, y0: -2, y1: 32, w: 285, h: 210,
        caption: 'Subtracting gives 2, 6, 18, which settles nothing. Dividing gives 3, 3, 3, which settles everything.' } },
    { q: 'Outputs 0, 1, 4, 9, 16. Take first and second differences and name the family.', level: 'Calculate',
      a: 'First differences 1, 3, 5, 7; second differences 2, 2, 2. Quadratic, and the rule is x².',
      show: { kind: 'steps', f: x => x * x, from: 0, to: 4, title: 'DIFFERENCES OF THE DIFFERENCES', note: 'x^2', x0: -0.6, x1: 5.4, y0: -1, y1: 18, w: 290, h: 215,
        caption: 'The rises 1, 3, 5, 7 are not constant, but each is 2 more than the last. A constant second difference is the signature of a quadratic.' } },
    { q: 'Why can a linear rule be described by a single number for its steepness, when a quadratic cannot?', level: 'Recognise',
      a: 'Because the linear rule adds the same amount at every step, so one number covers every interval. The quadratic adds a different amount at each step, so any single number would have to name which interval it referred to.',
      show: { kind: 'frames', label: 'Why one number is enough, or is not',
        frames: [
          { kind: 'steps', f: x => 3 * x + 1, from: 0, to: 4, title: 'LINEAR: ONE NUMBER', note: '3x+1', x0: -0.6, x1: 5.4, y0: -1, y1: 15, w: 265, h: 200, pick: 'linear',
            say: 'Every rise is 3, so one number covers every interval.' },
          { kind: 'steps', f: x => x * x, from: 0, to: 4, title: 'QUADRATIC: WHICH INTERVAL?', note: 'x^2', x0: -0.6, x1: 5.4, y0: -1, y1: 18, w: 265, h: 200, pick: 'quadratic',
            say: 'The rises differ, so any single number would have to say which interval it meant. That question is chapter 11.' }
        ] } },
    { q: 'Which is bigger at x = 3: x^2 or 2^x? Which at x = 10?', level: 'Calculate',
      a: 'At x = 3, x² = 9 beats 2^x = 8. At x = 10, 2^x = 1024 beats x² = 100. They are equal at x = 4.',
      show: { kind: 'graph', f: x => Math.pow(2, x), second: { f: x => x * x }, title: 'THEY CROSS AT x = 4', note: '2^x against x^2', x0: 0, x1: 6, y0: 0, y1: 40, w: 285, h: 210,
        marks: [[3, 8], [4, 16]],
        caption: 'At x = 3 the faint squaring curve is ahead, at 8 against 9. They tie at 16 when x = 4, and after that the exponential pulls away for good.' } },
    { q: 'A savings account adds a flat £50 a month. Another adds 5% of its balance a month. Name each family.', level: 'Recognise',
      a: 'The first is linear: the same amount added each step. The second is exponential: the amount added depends on the current size, which is multiplication in disguise.',
      show: { kind: 'frames', label: 'Flat amount, or a share of the balance',
        frames: [
          { kind: 'steps', f: m => 1000 + 50 * m, from: 0, to: 4, title: 'FLAT 50 A MONTH', note: 'linear', x0: -0.5, x1: 5, y0: 950, y1: 1250, w: 265, h: 200, pick: 'flat 50',
            say: 'The same 50 is added whatever the balance, so the rises are identical.' },
          { kind: 'steps', f: m => 1000 * Math.pow(1.05, m), from: 0, to: 4, title: '5% A MONTH', note: 'exponential', x0: -0.5, x1: 5, y0: 950, y1: 1250, w: 265, h: 200, pick: '5%',
            say: 'The amount added grows because it depends on the balance. Multiplying in disguise.' }
        ] } },
    { q: 'Outputs 3, 3, 3, 3. Which family, and what are the differences?', level: 'Recognise', hard: true,
      a: 'Linear, with all differences 0. A constant rule is the linear family with m = 0; it is flat rather than absent.',
      show: { kind: 'steps', f: x => 3, from: 0, to: 4, title: 'A CONSTANT RULE', note: 'y=3', x0: -0.6, x1: 5.4, y0: 0, y1: 6, w: 285, h: 200,
        caption: 'Every rise is 0, which is constant, so this is the linear family with m = 0. Flat rather than absent.' } },
    { q: 'Second differences of a table are all 6. What can you say about the x^2 coefficient?', level: 'Calculate', hard: true,
      a: 'For ax² with input steps of 1 the second difference is 2a, so a = 3. The rest of the rule cannot be recovered from the second differences alone, because adding any linear part leaves them unchanged.',
      show: { kind: 'steps', f: x => 3 * x * x, from: 0, to: 4, title: 'SECOND DIFFERENCE 6', note: 'y=3x^2', x0: -0.6, x1: 5.4, y0: -2, y1: 52, w: 290, h: 215,
        caption: 'The rises are 3, 9, 15, 21, each 6 more than the last. For ax\u00b2 with unit steps the second difference is 2a, so a = 3. Any linear part added would leave this picture unchanged.' } },
    { q: 'A rule doubles every 3 hours. What factor applies over 1 hour? Is the family still exponential?', level: 'Calculate', hard: true,
      a: 'The cube of the hourly factor must be 2, so the factor is the cube root of 2, about 1.26. Yes, it is still exponential: changing the size of the time step changes the constant factor but never turns multiplying into adding.',
      show: { kind: 'graph', f: t => Math.pow(2, t / 3), title: 'DOUBLING EVERY 3 HOURS', note: 'factor 1.26 an hour', x0: 0, x1: 9, y0: 0, y1: 9, w: 285, h: 210,
        marks: [[0, 1], [3, 2], [6, 4], [9, 8]],
        caption: 'The marked points double every three hours. The hourly factor is the cube root of 2, about 1.26, and changing the step size never turns multiplying into adding.' } },
  ],

  misconception: {
    name: '"exponential" means fast',
    wrong: 'Any steeply climbing curve gets called exponential, and a rule that starts slowly gets ruled out.',
    why: 'Exponential means the output is multiplied by a fixed factor for each fixed input step, which is a statement about mechanism rather than speed. As the table above shows, 2^x is behind x² at x = 3 and level with it at x = 4. Test by taking ratios, not by looking at the steepness.'
  },

  review: 'Chapter 3 asked you to show that f(x + h) − f(x) = 5h for f(x) = 5x, with no x surviving. The constant first difference in the linear column above is that fact tabulated, and question 7 is the reason it matters for everything after chapter 11.'
};
