// 5. Tables become graphs
//
// The vertical line test is chapter 2's definition made visible. It is worth
// deriving rather than announcing, because a reader who sees why it works can
// reconstruct it, and a reader who memorised it cannot say what it tests.

export default {
  id: 5,
  title: 'Tables become graphs',
  standfirst: 'An ordered pair records one input and its output. Enough pairs reveal the rule.',

  blocks: [
    { t: 'p', text: 'Write the input first and the output second: the pair (x, y). Plot the first number across and the second up. Each row of a table becomes one point, and the shape that emerges is the **graph** of the rule.' },
    { t: 'p', text: 'The order is a convention, but it is not optional. (3, 1) and (1, 3) are different points, and swapping them silently is the most expensive habit a reader can carry into chapter 9, where swapping is the actual operation being performed.' },

    { t: 'figures', items: [
      { kind: 'graph', f: x => 0.8 * x + 1, title: 'LINEAR', note: 'f(x)=0.8x+1', x0: -4, x1: 4, y0: -3, y1: 5, w: 230, h: 175 },
      { kind: 'graph', f: x => x * x, title: 'QUADRATIC', note: 'g(x)=x^2', x0: -3, x1: 3, y0: -1, y1: 8, w: 230, h: 175 },
      { kind: 'graph', f: x => Math.pow(2, x), title: 'EXPONENTIAL', note: 'h(x)=2^x', x0: -3, x1: 3, y0: -1, y1: 8, w: 230, h: 175 }
    ] },

    { t: 'h', text: 'The vertical line test, and why it works' },
    { t: 'p', text: 'A vertical line is the set of all points sharing one x. So the points where a vertical line meets a graph are exactly the outputs that graph assigns to that one input. If the line crosses twice, some input has two outputs, which chapter 2 ruled out.' },
    { t: 'callout', title: 'The test, stated as a consequence',
      text: 'A graph represents a function exactly when no vertical line meets it more than once. This is not a new rule. It is the definition of a function, read off the picture.' },

    { t: 'figure', kind: 'graph', f: x => Math.sqrt(Math.max(0, 9 - x * x)), second: { f: x => -Math.sqrt(Math.max(0, 9 - x * x)) },
      title: 'A CIRCLE FAILS', note: 'x^2 + y^2 = 9', x0: -4, x1: 4, y0: -4, y1: 4, w: 250, h: 200, marks: [[0, 3], [0, -3]],
      caption: 'The vertical line through x = 0 meets the circle at both marked points, so the circle assigns 3 and −3 to the same input. It is a perfectly good curve and not a function.' },

    { t: 'example', n: 1,
      ask: 'Plot y = 2x − 1 for x = −2, −1, 0, 1, 2.',
      steps: [
        'Evaluate at each input in turn: 2(−2) − 1 = −5, then −3, −1, 1, 3.',
        'Write each as a pair, input first: (−2, −5), (−1, −3), (0, −1), (1, 1), (2, 3).',
        'Plot each point, going across by the first number and up by the second. Negative outputs go below the horizontal axis.',
        'The five points lie on a straight line, which is what the family in chapter 6 predicts.'
      ],
      answer: '(−2, −5), (−1, −3), (0, −1), (1, 1), (2, 3).',
      show: { kind: 'graph', f: x => 2 * x - 1, title: 'THE FIVE PAIRS', note: 'y=2x-1', x0: -3, x1: 3, y0: -6, y1: 4, w: 270, h: 200,
        marks: [[-2, -5], [-1, -3], [0, -1], [1, 1], [2, 3]],
        caption: 'Input across, output up, in that order. The line is what every other input would have given.' },
      turn: { ask: 'Plot y = 3x + 2 for x = -2, 0, 2.', a: '(−2, −4), (0, 2), (2, 8), lying on a straight line.' } },

    { t: 'figure', kind: 'graph', f: x => 2 * x - 1, title: 'THE FIVE POINTS', note: 'y=2x-1', x0: -3, x1: 3, y0: -6, y1: 4, w: 250, h: 195,
      marks: [[-2, -5], [-1, -3], [0, -1], [1, 1], [2, 3]],
      caption: 'The plotted table, with the line the rule would have drawn through every other input as well.' },

    { t: 'h', text: 'Reading behaviour, not just shape' },
    { t: 'p', text: 'Naming a curve "a parabola" is the least a graph will tell you. The habits below are the ones that make limits and derivatives intelligible when they arrive, and they are worth practising now while the curves are still simple.' },

    { t: 'table', head: ['Question', 'What to look for', 'Where it leads'],
      rows: [
        ['Where does it rise or fall?', 'sections climbing or dropping left to right', 'the sign of the derivative'],
        ['Where is it flat?', 'a high point, a low point, a level stretch', 'where the derivative is zero'],
        ['Where does it cross an axis?', 'the value at x = 0, and the inputs giving output 0', 'roots and intercepts'],
        ['What happens far out?', 'whether it settles, climbs, or plunges', 'limits at infinity'],
        ['Are there gaps?', 'a break, a hole, a jump', 'continuity, in Book 2']
      ] },

    { t: 'example', n: 2,
      ask: 'Read the behaviour of g(x) = x^2 from its graph.',
      steps: [
        'Falling for negative inputs, rising for positive inputs.',
        'Flat at exactly one place, the low point at (0, 0).',
        'It crosses both axes at that same point and never goes below the horizontal axis.',
        'Far out in either direction it climbs without bound, and symmetrically, because (−x)² = x².'
      ],
      answer: 'A single lowest point at the origin, symmetric about the vertical axis, unbounded above and bounded below by 0.',
      note: 'That last sentence is the range from chapter 4, read off the picture instead of argued from the formula.',
      show: { kind: 'graph', f: x => x * x, title: 'FALLS, FLATTENS, RISES', note: 'g(x)=x^2', x0: -3, x1: 3, y0: -1, y1: 8, w: 270, h: 200, marks: [[0, 0]],
        caption: 'The single flat point is marked. Everything to its left falls and everything to its right rises, which is the whole reading in one picture.' },
      turn: { ask: 'Read the behaviour of f(x) = 2x - 1 the same way: where does it rise, where is it flat, where does it cross the axes?',
        a: 'It rises everywhere and is flat nowhere. It crosses the vertical axis at (0, −1) and the horizontal axis at (0.5, 0).' } },

    { t: 'h', text: 'The test, performed' },
    { t: 'p', text: 'Rather than take the vertical line test on trust, sweep it. Below, three lines cross a rule that passes and a curve that fails, with every hit marked.' },

    { t: 'figures', items: [
      { kind: 'linetest', f: x => 0.6 * x * x - 1, at: [-2, 0, 2], title: 'PASSES', note: 'one hit per line',
        x0: -3.5, x1: 3.5, y0: -3, y1: 5, w: 245, h: 190,
        caption: 'Each line meets the curve once, so each input has exactly one output.' },
      { kind: 'linetest', f: x => Math.sqrt(Math.max(0, 9 - x * x)), second: x => -Math.sqrt(Math.max(0, 9 - x * x)),
        at: [-2, 0, 2], title: 'FAILS', note: 'two hits per line', x0: -4, x1: 4, y0: -4, y1: 4, w: 245, h: 190,
        caption: 'Each line meets the circle twice, and the marks turn red where an input has been handed two outputs.' }
    ] },

    { t: 'example', n: 3,
      ask: 'A graph passes through (1, 4) and (1, 7). What can you conclude without seeing the rest of it?',
      steps: [
        'Both points share the first coordinate 1, so both describe the same input.',
        'They give that input the outputs 4 and 7.',
        'The vertical line at x = 1 therefore meets the graph at least twice.',
        'That is the fork chapter 2 ruled out, and nothing elsewhere on the graph can undo it.'
      ],
      answer: 'It cannot be the graph of a function.',
      note: 'One pair of points settles it. Proving a graph is a function needs every vertical line; proving it is not needs only one.',
      show: { kind: 'frames', label: 'Sweep the line',
        frames: [
          { kind: 'linetest', f: x => 2 * x - 1, at: [1], title: 'ONE HIT: A FUNCTION', x0: -2, x1: 4, y0: -4, y1: 8, w: 265, h: 200, pick: 'one output',
            say: 'The line at x = 1 meets the graph once. That input has one output, as required.' },
          { kind: 'linetest', f: x => Math.sqrt(Math.max(0, 9 - (x - 1) * (x - 1))) + 4, second: x => -Math.sqrt(Math.max(0, 9 - (x - 1) * (x - 1))) + 6, at: [1], title: 'TWO HITS: NOT A FUNCTION', x0: -2, x1: 4, y0: -4, y1: 8, w: 265, h: 200, pick: 'two outputs',
            say: 'The line at x = 1 meets it twice, at heights 4 and 7. One pair of points is enough to settle it.' }
        ] },
      turn: { ask: 'A graph passes through (2, 5) and (4, 5). What can you conclude?',
        a: 'Nothing against it: two inputs sharing an output is allowed. It does show the rule is not one-to-one, which chapter 9 will care about.' } },

    { t: 'example', n: 4,
      ask: 'From the graph of y = x^2 - 4, state the intercepts and the lowest point.',
      steps: [
        'The vertical intercept is the output at x = 0, which is 0 − 4 = −4, giving the point (0, −4).',
        'The horizontal intercepts are the inputs giving output 0: x² − 4 = 0, so x² = 4 and x is 2 or −2.',
        'That is two crossings, at (−2, 0) and (2, 0). Two inputs sharing the output 0 is permitted.',
        'The lowest point is where the parent x² was flat, moved down 4: (0, −4).'
      ],
      answer: 'Intercepts (0, −4), (−2, 0) and (2, 0); lowest point (0, −4).',
      note: 'Here the vertical intercept and the lowest point happen to coincide. That is a feature of this rule, not a general fact.',
      show: { kind: 'graph', f: x => x * x - 4, title: 'THREE CROSSINGS', note: 'y=x^2-4', x0: -4, x1: 4, y0: -6, y1: 6, w: 270, h: 210,
        marks: [[0, -4], [-2, 0], [2, 0]],
        caption: 'Two inputs share the output 0, which is permitted, and the vertical intercept happens to coincide with the lowest point.' },
      turn: { ask: 'State the intercepts of y = x^2 - 9.',
        a: '(0, −9) on the vertical axis, and (−3, 0) and (3, 0) on the horizontal.' } }
  ],

  practice: [
    { q: 'Plot y = 2x − 1 for x = −2, −1, 0, 1, 2.', level: 'Represent',
      a: '(−2, −5), (−1, −3), (0, −1), (1, 1), (2, 3), lying on a straight line.',
      show: { kind: 'graph', f: x => 2 * x - 1, title: 'FIVE PAIRS ON A LINE', note: 'y=2x-1', x0: -3, x1: 3, y0: -6, y1: 5, w: 270, h: 200,
        marks: [[-2, -5], [-1, -3], [0, -1], [1, 1], [2, 3]],
        caption: 'Input across, output up. The line shows what every input between them would have given.' } },
    { q: 'Why does a circle fail the vertical line test?', level: 'Recognise',
      a: 'Because a vertical line through its interior meets it twice, so one input is assigned two outputs. For x² + y² = 9 at x = 0 those outputs are 3 and −3.',
      show: { kind: 'linetest', f: x => Math.sqrt(Math.max(0, 9 - x * x)), second: x => -Math.sqrt(Math.max(0, 9 - x * x)),
        at: [-2, 0, 2], title: 'TWO HITS EVERY TIME', note: 'x^2+y^2=9', x0: -4, x1: 4, y0: -4, y1: 4, w: 265, h: 205,
        caption: 'Every line drawn meets the circle twice, and the marks turn red where an input has been given two outputs.' } },
    { q: 'Give an example of a graph that has a local minimum.', level: 'Recognise',
      a: 'y = x² has one at (0, 0). Any upward parabola will do, as will a curve that dips and recovers.',
      show: { kind: 'graph', f: x => x * x - 2, title: 'A LOCAL MINIMUM', note: 'y=x^2-2', x0: -3, x1: 3, y0: -3, y1: 6, w: 265, h: 195, marks: [[0, -2]],
        caption: 'The marked point is the one place the curve is flat, with the graph falling to its left and rising to its right.' } },
    { q: 'Plot y = 3 − x for x = −1, 0, 2, 4.', level: 'Represent',
      a: '(−1, 4), (0, 3), (2, 1), (4, −1). The line falls from left to right because the coefficient of x is negative.',
      show: { kind: 'graph', f: x => 3 - x, title: 'A FALLING LINE', note: 'y=3-x', x0: -2, x1: 5, y0: -2, y1: 5, w: 265, h: 195,
        marks: [[-1, 4], [0, 3], [2, 1], [4, -1]],
        caption: 'The coefficient of x is negative, so the line falls from left to right and the outputs go from 4 down to \u22121.' } },
    { q: 'A point is plotted at 1 across and 3 up. Write it as an ordered pair and say what it means about the function.', level: 'Represent',
      a: '(1, 3): the input 1 produces the output 3, that is f(1) = 3.',
      show: { kind: 'frames', label: 'One point, two readings',
        frames: [
          { kind: 'graph', f: x => 3 * x, title: 'THE POINT (1, 3)', note: 'f(1)=3', x0: -2, x1: 4, y0: -2, y1: 6, w: 255, h: 190, marks: [[1, 3]], pick: 'as a point',
            say: 'One across, three up.' },
          { kind: 'machine', rule: 'f', input: '1', output: '3', pick: 'as a machine',
            say: 'The same fact: the input 1 produces the output 3.' }
        ] } },
    { q: 'From the graph of y = x² − 4, state where it crosses each axis.', level: 'Calculate',
      a: 'It crosses the vertical axis at (0, −4), and the horizontal axis where x² = 4, at (−2, 0) and (2, 0).',
      show: { kind: 'graph', f: x => x * x - 4, title: 'THREE CROSSINGS', note: 'y=x^2-4', x0: -4, x1: 4, y0: -6, y1: 6, w: 270, h: 205,
        marks: [[0, -4], [-2, 0], [2, 0]],
        caption: 'The vertical axis is crossed once, at the height the rule gives to 0. The horizontal axis is crossed twice, at the two inputs that produce 0.' } },
    { q: 'Sketch a graph that rises, then falls, then rises again. How many flat points does it have at least?', level: 'Recognise',
      a: 'At least two: one high point where rising turns to falling, and one low point where falling turns to rising.',
      show: { kind: 'graph', f: x => 0.35 * (x * x * x / 3 - 3 * x), title: 'RISE, FALL, RISE', note: 'two flat points', x0: -4, x1: 4, y0: -3, y1: 3, w: 275, h: 200,
        marks: [[-1.732, 1.212], [1.732, -1.212]],
        caption: 'A high point where rising turns to falling, and a low point where falling turns to rising. A smooth curve cannot change direction without flattening.' } },
    { q: 'Does the graph of x = y² represent y as a function of x? Explain using a vertical line.', level: 'Recognise',
      a: 'No. It is a parabola opening sideways, and the vertical line at x = 4 meets it at y = 2 and y = −2.',
      show: { kind: 'linetest', f: x => Math.sqrt(Math.max(0, x)), second: x => -Math.sqrt(Math.max(0, x)),
        at: [4], title: 'SIDEWAYS PARABOLA', note: 'x=y^2', x0: -1, x1: 6, y0: -3, y1: 3, w: 270, h: 200,
        caption: 'The line at x = 4 meets it at y = 2 and y = \u22122. It opens sideways, so a vertical line catches both halves at once.' } },
    { q: 'A graph passes the vertical line test but a horizontal line meets it twice. What does each fact tell you?', level: 'Recognise', hard: true,
      a: 'The vertical test passing means it is a function. The horizontal line meeting twice means two different inputs share an output, so it is not one-to-one and chapter 9 will refuse it an inverse until its domain is restricted.',
      show: { kind: 'frames', label: 'The two tests ask different questions',
        frames: [
          { kind: 'linetest', f: x => x * x, at: [-1.5, 1.5], title: 'VERTICAL: PASSES', note: 'it is a function', x0: -3, x1: 3, y0: -1, y1: 8, w: 260, h: 195, pick: 'vertical',
            say: 'One hit per line, so every input has one output. It is a function.' },
          { kind: 'linetest', f: x => x * x, at: [4], dir: 'h', title: 'HORIZONTAL: FAILS', note: 'not one-to-one', x0: -3, x1: 3, y0: -1, y1: 8, w: 260, h: 195, pick: 'horizontal',
            say: 'Two hits, at \u22122 and 2. Two inputs share an output, so chapter 9 will refuse it an inverse until the domain is cut.' }
        ] } },
    { q: 'Two students plot f(2) = 5. One marks (2, 5), the other (5, 2). Which is right, and what has the other one actually drawn?', level: 'Represent',
      a: 'The first. The second has plotted the inverse relation, sending 5 back to 2, which is exactly the reflection chapter 9 uses.',
      show: { kind: 'frames', label: 'Which point is f(2) = 5?',
        frames: [
          { kind: 'graph', f: x => 2.5 * x, title: 'CORRECT: (2, 5)', note: 'input first', x0: -1, x1: 7, y0: -1, y1: 7, w: 255, h: 195, marks: [[2, 5]], pick: '(2, 5)',
            say: 'Two across, five up. Input first, output second.' },
          { kind: 'graph', f: x => 0.4 * x, title: 'THE OTHER RELATION', note: 'the inverse', x0: -1, x1: 7, y0: -1, y1: 7, w: 255, h: 195, marks: [[5, 2]], pick: '(5, 2)',
            say: 'Not merely wrong: this plots the rule that sends 5 back to 2, which is the reflection chapter 9 uses on purpose.' }
        ] } },
    { q: 'A table gives (0, 1), (1, 2), (2, 4), (3, 8). Plot it and say which family of chapter 6 it belongs to.', level: 'Represent', hard: true,
      a: 'The outputs double at each step, so it is exponential: y = 2^x. The points curve upward increasingly steeply rather than lying on a line.',
      show: { kind: 'graph', f: x => Math.pow(2, x), title: 'DOUBLING OUTPUTS', note: 'y=2^x', x0: -0.5, x1: 3.5, y0: -1, y1: 9, w: 265, h: 195,
        marks: [[0, 1], [1, 2], [2, 4], [3, 8]],
        caption: 'The four points curve upward increasingly steeply rather than lying on a line, because each output is twice the last.' } },
    { q: 'Can a graph cross the horizontal axis three times and still be a function?', level: 'Recognise', hard: true,
      a: 'Yes. Crossing the horizontal axis three times means three different inputs give the output 0, which is inputs sharing an output and is permitted. Only a vertical line meeting the graph twice would break it.',
      show: { kind: 'linetest', f: x => 0.5 * x * (x - 2) * (x + 2), at: [0], dir: 'h', title: 'THREE ROOTS, STILL A FUNCTION', note: 'y=0 three times', x0: -3, x1: 3, y0: -4, y1: 4, w: 275, h: 205,
        caption: 'Three inputs share the output 0, which is sharing and therefore permitted. Only a vertical line meeting the curve twice would break it.' } },
  ],

  misconception: {
    name: 'reading the pair in the wrong order',
    wrong: 'Told that f(3) = 1, a reader plots the point 1 across and 3 up, because the 1 was the answer and the answer feels like it should come first.',
    why: 'The convention is (input, output), so f(3) = 1 is the point (3, 1). Plotting it backwards reflects the whole graph across the diagonal, which does not merely look wrong, it draws a different relation. Question 10 shows what it actually draws, and chapter 9 shows that the reflection is a real operation with a real name.'
  },

  review: 'Chapter 2 ruled out one input having two outputs, using a mapping diagram and the circle equation. The vertical line test is that same ruling applied to a picture, and question 2 is the same circle again, now settled by eye in a second rather than by algebra.'
};
