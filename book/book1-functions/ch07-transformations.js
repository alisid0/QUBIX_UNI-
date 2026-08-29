// 7. Transforming a function
//
// Draft 1 called this "the largest missing textbook bridge in the current Qubix
// chapter" and then spent one page on it. The inside/outside distinction gets
// the full treatment here, because every later shift of a graph relies on it
// and because the minus sign inside the bracket is the single most reliable
// place for a reader to go wrong.

export default {
  id: 7,
  title: 'Transforming a function',
  standfirst: 'One rule, moved. Changes outside the function act on outputs; changes inside act on inputs, and act backwards.',

  blocks: [
    { t: 'p', text: 'Start with a familiar rule and call it the **parent function**. Everything in this chapter is that parent, relocated or restretched, with its shape intact. Recognising the parent inside a complicated formula is most of the skill.' },

    { t: 'table', head: ['Rule', 'Effect', 'From f(x) = x^2'],
      rows: [
        ['f(x) + k', 'shift up by k', 'x^2 + 3 sits three higher'],
        ['f(x − h)', 'shift right by h', '(x − 2)^2 sits two to the right'],
        ['a·f(x)', 'stretch vertically by a; flip if a is negative', '−2x^2 is flipped and twice as steep'],
        ['f(bx)', 'squeeze horizontally by 1/b; flip if b is negative', '(2x)^2 is half as wide']
      ] },

    { t: 'h', text: 'Outside is forwards, inside is backwards' },
    { t: 'p', text: 'A change written outside the brackets happens to the answer after the rule has run, so it does what it says: add 3 and the graph rises 3. A change written inside happens to the input before the rule runs, and that reverses its apparent sense.' },
    { t: 'p', text: 'Here is why, in one line. To draw y = f(x − 2) at the position x = 5, you must evaluate f at 3. So the height that the parent had at 3 now appears at 5. Every height has moved **two to the right**, even though the formula says minus two.' },

    { t: 'formula', text: 'f(x - 2) at x = 5   uses   f(3)   so the picture moves right' },

    { t: 'callout', title: 'The one sentence to keep',
      text: 'Inside the bracket, the graph moves opposite to the sign. Minus moves right, plus moves left. If you ever doubt it, put in one number and see which input the rule actually reaches for.' },

    { t: 'figures', items: [
      { kind: 'graph', f: x => x * x, second: { f: x => x * x }, title: 'PARENT', note: 'f(x)=x^2', x0: -5, x1: 5, y0: -3, y1: 9, w: 230, h: 180 },
      { kind: 'graph', f: x => x * x + 3, second: { f: x => x * x }, title: 'OUTSIDE: UP 3', note: 'f(x)+3', x0: -5, x1: 5, y0: -3, y1: 9, w: 230, h: 180 },
      { kind: 'graph', f: x => (x - 2) * (x - 2), second: { f: x => x * x }, title: 'INSIDE: RIGHT 2', note: 'f(x-2)', x0: -5, x1: 5, y0: -3, y1: 9, w: 230, h: 180 }
    ] },
    { t: 'p', text: 'The parent is drawn faintly behind each transformation. A transformation is always a comparison, never a shape to be memorised on its own.' },

    { t: 'figures', items: [
      { kind: 'graph', f: x => -2 * x * x, second: { f: x => x * x }, title: 'FLIPPED AND STRETCHED', note: '-2f(x)', x0: -4, x1: 4, y0: -8, y1: 6, w: 250, h: 190 },
      { kind: 'graph', f: x => (2 * x) * (2 * x), second: { f: x => x * x }, title: 'SQUEEZED', note: 'f(2x)', x0: -4, x1: 4, y0: -2, y1: 9, w: 250, h: 190 }
    ] },

    { t: 'example', n: 1,
      ask: 'Describe the change from x^2 to (x + 4)^2 − 1.',
      steps: [
        'Find the parent: it is x², with the whole thing squared, so nothing has been stretched.',
        'The + 4 is inside the bracket, so it moves horizontally and it moves against its sign: four to the left.',
        'The − 1 is outside, so it moves vertically and does what it says: one down.',
        'Check with a point. The parent has its low point at (0, 0). The new rule has its low point where the bracket is zero, at x = −4, with height −1.'
      ],
      answer: 'Left 4, and down 1. The low point moves from (0, 0) to (−4, −1).',
      show: { kind: 'graph', f: x => (x + 4) * (x + 4) - 1, second: { f: x => x * x }, title: 'LEFT 4, DOWN 1', note: '(x+4)^2-1', x0: -8, x1: 4, y0: -3, y1: 9, w: 290, h: 210, marks: [[-4, -1], [0, 0]],
        caption: 'The parent faint behind, and both low points marked. The feature moved from (0, 0) to (\u22124, \u22121) exactly as the two signs predicted.' },
      turn: { ask: 'Describe the change from x^2 to (x - 5)^2 + 3.', a: 'Right 5 and up 3; the low point moves to (5, 3).' } },

    { t: 'example', n: 2,
      ask: 'Write a square function shifted right 3 and up 5.',
      steps: [
        'Right 3 is horizontal, so it goes inside the bracket, against its sign: (x − 3).',
        'Up 5 is vertical, so it goes outside: + 5.',
        'Assemble: (x − 3)² + 5.',
        'Check: at x = 3 the bracket is 0 and the height is 5, so the low point sits at (3, 5), which is three right and five up from the origin.'
      ],
      answer: '(x − 3)² + 5.',
      show: { kind: 'graph', f: x => (x - 3) * (x - 3) + 5, second: { f: x => x * x }, title: 'RIGHT 3, UP 5', note: '(x-3)^2+5', x0: -4, x1: 8, y0: -1, y1: 13, w: 290, h: 210, marks: [[3, 5], [0, 0]],
        caption: 'Built rather than described. The bracket is zero at x = 3, which is where the low point lands.' },
      turn: { ask: 'Write a square function shifted left 2 and down 6.', a: '(x + 2)² − 6.' } },

    { t: 'callout', title: 'Where this returns',
      text: 'A transformation moves a graph without changing its shape, so it cannot change how steep the curve is at corresponding points. Shifting is the reason a derivative in chapter 13 never depends on where the curve sits, only on how it bends.' },

    { t: 'example', n: 3,
      ask: 'The graph of y = f(x) has a low point at (1, 2). Where is the low point of y = f(x + 3) - 4?',
      steps: [
        'Deal with the inside first: + 3 inside the bracket moves the picture three to the left, against its sign.',
        'The low point moves from x = 1 to x = 1 − 3 = −2.',
        'Now the outside: − 4 lowers every height by 4.',
        'The height moves from 2 to 2 − 4 = −2.'
      ],
      answer: '(−2, −2).',
      note: 'Notice that this was answered without knowing what f is. A transformation acts on the picture, so any named feature of the parent can be tracked without the formula.',
      show: { kind: 'frames', label: 'One move at a time',
        frames: [
          { kind: 'graph', f: x => (x - 1) * (x - 1) + 2, title: 'THE PARENT, WITH ITS LOW POINT', note: 'y=f(x)', x0: -5, x1: 5, y0: -4, y1: 8, w: 275, h: 200, marks: [[1, 2]], pick: 'start',
            say: 'A curve with a low point at (1, 2). What the rule is does not matter.' },
          { kind: 'graph', f: x => (x + 2) * (x + 2) + 2, second: { f: x => (x - 1) * (x - 1) + 2 }, title: 'INSIDE: LEFT 3', note: 'f(x+3)', x0: -5, x1: 5, y0: -4, y1: 8, w: 275, h: 200, marks: [[-2, 2]], pick: 'f(x+3)',
            say: 'Plus three inside moves the picture three to the left, against its sign. The low point is at x = \u22122.' },
          { kind: 'graph', f: x => (x + 2) * (x + 2) - 2, second: { f: x => (x + 2) * (x + 2) + 2 }, title: 'OUTSIDE: DOWN 4', note: 'f(x+3)-4', x0: -5, x1: 5, y0: -4, y1: 8, w: 275, h: 200, marks: [[-2, -2]], pick: 'then -4',
            say: 'Minus four outside lowers every height by four, and does what it says. The low point is at (\u22122, \u22122).' }
        ] },
      turn: { ask: 'The graph of y = f(x) has a high point at (4, 7). Where is the high point of y = f(x - 1) + 2?',
        a: '(5, 9).' } },

    { t: 'example', n: 4,
      ask: 'Write y = x^2 - 6x + 11 in the shifted form, and read off its low point.',
      steps: [
        'Aim for the shape (x − h)² + k, because that form states the low point directly.',
        'Take half the coefficient of x, which is −3, and square it to get 9.',
        'Write x² − 6x + 9 as (x − 3)², so the rule is (x − 3)² + 11 − 9.',
        'That is (x − 3)² + 2, a parent parabola moved right 3 and up 2.'
      ],
      answer: '(x − 3)² + 2, with its low point at (3, 2).',
      note: 'This is completing the square, arriving as a chapter 7 question rather than an algebra exercise. Its purpose here is to expose the shift that was hidden by the expansion.',
      show: { kind: 'graph', f: x => x * x - 6 * x + 11, second: { f: x => x * x }, title: 'THE HIDDEN SHIFT', note: '(x-3)^2+2', x0: -2, x1: 8, y0: -1, y1: 12, w: 290, h: 210, marks: [[3, 2], [0, 0]],
        caption: 'Expanded, the shift was invisible. Completing the square put it back: the same parabola, moved right 3 and up 2.' },
      turn: { ask: 'Write y = x^2 + 4x + 9 in shifted form and state its low point.',
        a: '(x + 2)² + 5, with its low point at (−2, 5).' } }
  ],

  drills: [
    { kind: 'transform', tier: 'Warm-up', cases: [
      { h: 0, k: 3, expr: 'x^2 + 3' },
      { h: 0, k: -2, expr: 'x^2 - 2' },
      { h: 2, k: 0, expr: '(x - 2)^2' },
      { h: -3, k: 0, expr: '(x + 3)^2' }
    ] },
    { kind: 'transform', cases: [
      { h: 1, k: -4, expr: '(x - 1)^2 - 4' },
      { h: -2, k: 5, expr: '(x + 2)^2 + 5' },
      { h: 4, k: 2, expr: '(x - 4)^2 + 2' },
      { h: -5, k: -1, expr: '(x + 5)^2 - 1' },
      { h: 3, k: 6, expr: '(x - 3)^2 + 6' },
      { h: -1, k: 4, expr: '(x + 1)^2 + 4' }
    ] }
  ],

  practice: [
    { q: 'Describe the change from x^2 to (x + 4)^2 − 1.', level: 'Transform',
      a: 'Left 4 and down 1; the low point moves to (−4, −1).',
      show: { kind: 'graph', f: x => (x + 4) * (x + 4) - 1, second: { f: x => x * x }, title: 'LEFT 4, DOWN 1', note: '(x+4)^2-1', x0: -8, x1: 4, y0: -3, y1: 9, w: 285, h: 210, marks: [[-4, -1], [0, 0]],
        caption: 'Parent faint behind, both low points marked. The + 4 inside moved it against its sign; the \u2212 1 outside did what it said.' } },
    { q: 'Write a transformed square function shifted right 3 and up 5.', level: 'Transform',
      a: '(x − 3)² + 5.',
      show: { kind: 'graph', f: x => (x - 3) * (x - 3) + 5, second: { f: x => x * x }, title: 'RIGHT 3, UP 5', note: '(x-3)^2+5', x0: -4, x1: 8, y0: -1, y1: 13, w: 285, h: 210, marks: [[3, 5], [0, 0]],
        caption: 'The bracket is zero at x = 3, which is where the low point lands, five above the axis.' } },
    { q: 'What does y = −f(x) do to a graph?', level: 'Transform',
      a: 'Reflects it across the horizontal axis. Every output changes sign; inputs are untouched.',
      show: { kind: 'graph', f: x => -(x * x), second: { f: x => x * x }, title: 'FLIPPED VERTICALLY', note: 'y=-f(x)', x0: -3.5, x1: 3.5, y0: -8, y1: 8, w: 275, h: 210, marks: [[2, -4], [-2, -4]],
        caption: 'Every output changed sign and no input moved. The curve is the parent reflected across the horizontal axis.' } },
    { q: 'What does y = f(−x) do to a graph?', level: 'Transform',
      a: 'Reflects it across the vertical axis, because the minus is inside and so acts on inputs.',
      show: { kind: 'graph', f: x => Math.sqrt(Math.max(0, -x)), second: { f: x => Math.sqrt(Math.max(0, x)) }, title: 'FLIPPED HORIZONTALLY', note: 'y=f(-x)', x0: -5, x1: 5, y0: -1, y1: 3, w: 275, h: 200,
        caption: 'A square root is used here because a parabola is symmetric and would hide the change. The minus is inside, so it acts on inputs and the reflection is across the vertical axis.' } },
    { q: 'Describe the change from x^2 to 3x^2, and to 0.5x^2.', level: 'Transform',
      a: 'Stretched vertically by 3, so it is three times as tall at every input and looks narrower. Then squashed to half height, so it looks wider. Neither moves.',
      show: { kind: 'frames', label: 'Stretch, then squash',
        frames: [
          { kind: 'graph', f: x => 3 * x * x, second: { f: x => x * x }, title: 'THREE TIMES AS TALL', note: '3x^2', x0: -3, x1: 3, y0: -1, y1: 10, w: 260, h: 195, marks: [[1, 3]], pick: '3x^2',
            say: 'Every height tripled, so it looks narrower. Nothing moved sideways.' },
          { kind: 'graph', f: x => 0.5 * x * x, second: { f: x => x * x }, title: 'HALF AS TALL', note: '0.5x^2', x0: -3, x1: 3, y0: -1, y1: 10, w: 260, h: 195, marks: [[1, 0.5]], pick: '0.5x^2',
            say: 'Every height halved, so it looks wider. Again nothing moved.' }
        ] } },
    { q: 'Starting from f(x) = x^2, write the rule shifted left 2 and reflected in the horizontal axis.', level: 'Transform',
      a: '−(x + 2)². The bracket comes first because the reflection is applied to the shifted rule; writing (−x + 2)² would reflect the input instead.',
      show: { kind: 'graph', f: x => -((x + 2) * (x + 2)), second: { f: x => x * x }, title: 'LEFT 2, THEN FLIPPED', note: '-(x+2)^2', x0: -6, x1: 3, y0: -8, y1: 6, w: 280, h: 210, marks: [[-2, 0]],
        caption: 'The bracket is built first and the minus applied to the whole of it. Writing (\u2212x + 2)\u00b2 would reflect the input instead and give a different curve.' } },
    { q: 'The point (2, 5) lies on y = f(x). Where does it move on y = f(x) + 3? On y = f(x − 1)?', level: 'Transform',
      a: 'To (2, 8), since only the height changed. Then to (3, 5), since the graph moves right by 1.',
      show: { kind: 'frames', label: 'Track one point',
        frames: [
          { kind: 'graph', f: x => 5 - 0.6 * (x - 2) * (x - 2), title: 'THE POINT (2, 5)', note: 'y=f(x)', x0: -1, x1: 6, y0: 0, y1: 10, w: 255, h: 195, marks: [[2, 5]], pick: 'start',
            say: 'A point on the parent, wherever the rest of the curve goes.' },
          { kind: 'graph', f: x => 8 - 0.6 * (x - 2) * (x - 2), second: { f: x => 5 - 0.6 * (x - 2) * (x - 2) }, title: 'f(x) + 3', note: 'up 3', x0: -1, x1: 6, y0: 0, y1: 10, w: 255, h: 195, marks: [[2, 8]], pick: 'f(x)+3',
            say: 'Only the height changed: (2, 8). The input is untouched by anything outside the bracket.' },
          { kind: 'graph', f: x => 5 - 0.6 * (x - 3) * (x - 3), second: { f: x => 5 - 0.6 * (x - 2) * (x - 2) }, title: 'f(x - 1)', note: 'right 1', x0: -1, x1: 6, y0: 0, y1: 10, w: 255, h: 195, marks: [[3, 5]], pick: 'f(x-1)',
            say: 'Only the position changed: (3, 5). The height is untouched by anything inside.' }
        ] } },
    { q: 'The parent has its low point at the origin. Where is the low point of y = (x − 6)^2 + 2?', level: 'Transform',
      a: '(6, 2).',
      show: { kind: 'graph', f: x => (x - 6) * (x - 6) + 2, second: { f: x => x * x }, title: 'LOW POINT AT (6, 2)', note: '(x-6)^2+2', x0: -2, x1: 10, y0: 0, y1: 14, w: 285, h: 210, marks: [[6, 2], [0, 0]],
        caption: 'Read it straight off the form: the bracket vanishes at 6, and the number outside is the height there.' } },
    { q: 'Explain, using one substituted number, why f(x − 2) moves the graph right rather than left.', level: 'Recognise', hard: true,
      a: 'At x = 5 the rule evaluates f(3), so whatever height the parent had at 3 now appears at 5. Heights land two further along, which is a shift right.',
      show: { kind: 'frames', label: 'Substitute one number',
        frames: [
          { kind: 'graph', f: x => x * x, title: 'THE PARENT AT x = 3', note: 'f(3)=9', x0: -1, x1: 8, y0: -1, y1: 12, w: 260, h: 195, marks: [[3, 9]], pick: 'the parent',
            say: 'The parent has height 9 at the input 3.' },
          { kind: 'graph', f: x => (x - 2) * (x - 2), second: { f: x => x * x }, title: 'f(x - 2) AT x = 5', note: 'reaches for f(3)', x0: -1, x1: 8, y0: -1, y1: 12, w: 260, h: 195, marks: [[5, 9]], pick: 'shifted',
            say: 'At x = 5 the rule evaluates f(3), so that height of 9 now appears at 5. The picture moved right, whatever the sign said.' }
        ] } },
    { q: 'Does y = f(x) + 3 change how steep the curve is anywhere? Does y = 3f(x)?', level: 'Transform', hard: true,
      a: 'The first does not: sliding a curve up leaves every slope untouched. The second does: tripling every height triples every slope. This is the distinction chapter 13 relies on.',
      show: { kind: 'frames', label: 'Which one changes the steepness?',
        frames: [
          { kind: 'graph', f: x => x * x + 3, second: { f: x => x * x }, title: 'f(x) + 3: NO', note: 'slides only', x0: -3, x1: 3, y0: -1, y1: 12, w: 260, h: 200, marks: [[1, 4]], pick: 'f(x)+3',
            say: 'Sliding a curve up leaves every slope exactly as it was.' },
          { kind: 'graph', f: x => 3 * x * x, second: { f: x => x * x }, title: '3f(x): YES', note: 'slopes triple', x0: -3, x1: 3, y0: -1, y1: 12, w: 260, h: 200, marks: [[1, 3]], pick: '3f(x)',
            say: 'Tripling every height triples every slope. This is the distinction chapter 13 relies on.' }
        ] } },
    { q: 'Write the rule for y = x^2 squeezed horizontally to half width and moved up 1. Then expand it.', level: 'Transform', hard: true,
      a: 'y = (2x)² + 1, which expands to 4x² + 1. Note that a horizontal squeeze on a parabola is indistinguishable from a vertical stretch, which is a peculiarity of this parent and not a general rule.',
      show: { kind: 'graph', f: x => 4 * x * x + 1, second: { f: x => x * x }, title: 'SQUEEZED AND RAISED', note: '(2x)^2+1 = 4x^2+1', x0: -3, x1: 3, y0: 0, y1: 12, w: 280, h: 210, marks: [[0, 1]],
        caption: 'A horizontal squeeze on a parabola is indistinguishable from a vertical stretch, which is a peculiarity of this parent rather than a general rule.' } },
    { q: 'A graph is shifted right 3, then reflected in the vertical axis. Is the result the same as reflecting first, then shifting right 3?', level: 'Transform', hard: true,
      a: 'No. Shifting then reflecting gives f(−x − 3), whose feature sits at x = −3. Reflecting then shifting gives f(−(x − 3)) = f(3 − x), whose feature sits at x = 3. Order matters, which is the same lesson chapter 8 draws about composition.',
      show: { kind: 'frames', label: 'Order matters',
        frames: [
          { kind: 'graph', f: x => Math.sqrt(Math.max(0, -(x + 3))), title: 'SHIFT, THEN REFLECT', note: 'f(-x-3)', x0: -7, x1: 7, y0: -1, y1: 3, w: 260, h: 195, marks: [[-3, 0]], pick: 'shift first',
            say: 'The feature ends up at x = \u22123.' },
          { kind: 'graph', f: x => Math.sqrt(Math.max(0, 3 - x)), title: 'REFLECT, THEN SHIFT', note: 'f(3-x)', x0: -7, x1: 7, y0: -1, y1: 3, w: 260, h: 195, marks: [[3, 0]], pick: 'reflect first',
            say: 'The feature ends up at x = 3. Same two operations, opposite results, which is chapter 8\'s lesson arriving early.' }
        ] } },
  ],

  misconception: {
    name: 'the minus inside moves the graph left',
    wrong: 'f(x − 2) contains a minus, so the graph must move two to the left.',
    why: 'The sign inside the bracket describes what happens to the input before the rule runs, not to the picture. Substituting settles it in one line: at x = 5 the rule reaches for f(3), so the parent height at 3 is now displayed at 5, and the picture has moved right. Outside the bracket there is no such reversal, which is why + 3 really does mean up 3.'
  },

  review: 'Chapter 5 asked you to read where a graph rises, falls and flattens. Every transformation here preserves those readings and merely relocates them, which is why question 10 can ask about steepness without any new machinery.'
};
