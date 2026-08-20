// Explanations, and motion, laid over the atlas figures.
//
// A plate with a name under it is a label. A plate that says what the idea is,
// and lets you move the thing it is about, is a lesson. This file adds both,
// merged over the figure specs so a concept can gain prose without losing its
// picture, or gain frames without losing its prose.
//
//   say     one or two sentences: what it is, and what it is for. Written to be
//           read cold, by someone who has not read the stage above it.
//   frames  the same figure at several settings. Each frame inherits the base
//           spec, so only what changes is written.
//
// Built in batches, one stage at a time. Anything not here keeps the figure and
// caption it already had.

const P = { grid: 'lines', ticks: true };

// A point at several positions: the commonest kind of motion in stage 1.
const at = (pts, extra = {}) => pts.map(([x, y, pick, note]) => ({
  pick, pts: [[x, y, `(${x}, ${y})`]], guides: [[x, y]], note, ...extra
}));

export const EXPLAIN = {
  /* ------------------------------------------------ 1. the plane itself ---- */
  'point': {
    say: 'A single place, with no width and no height. Everything else on this sheet is built from these.',
    frames: at([[2, 2, 'here'], [-3, 1, 'or here'], [1, -3, 'or here']])
  },
  'position': {
    say: 'Where something is. On a plane it takes two measurements to pin down, and neither alone is enough.',
    frames: [
      { pick: 'across only', ...P, pts: [[3, 1]], segs: [[3, -5, 3, 5, '#e0813a', true, 1.6]], note: 'still free to slide' },
      { pick: 'up only', ...P, pts: [[3, 1]], segs: [[-5, 1, 5, 1, '#12897c', true, 1.6]], note: 'still free to slide' },
      { pick: 'both', ...P, pts: [[3, 1, '(3, 1)']], guides: [[3, 1]], note: 'pinned' }
    ]
  },
  'location': {
    say: 'The pair of numbers that names a position. Give them to anyone with the same axes and they will find the same spot.',
    frames: at([[3, 1, '(3, 1)'], [-2, 4, '(−2, 4)'], [-4, -2, '(−4, −2)']])
  },
  'number line': {
    say: 'A line with the numbers laid along it in order. One measurement fixes a place, because there is only one way to move.',
    frames: [
      { pick: '2', line: true, marks: [{ x: 2 }] },
      { pick: '−4', line: true, marks: [{ x: -4 }] },
      { pick: 'both', line: true, marks: [{ x: 2 }, { x: -4 }], note: 'order is all it has' }
    ]
  },
  'one dimension': {
    say: 'Only one way to move: forward or back. That is why a single number is enough to say where you are.',
    frames: [
      { pick: 'a place', line: true, marks: [{ x: 1 }] },
      { pick: 'move right', line: true, marks: [{ x: 3 }], note: 'one number changed' },
      { pick: 'move left', line: true, marks: [{ x: -2 }], note: 'the same one number' }
    ]
  },
  'two dimensions': {
    say: 'Two independent ways to move, so it takes two numbers. Change one and the point slides; change both and it goes anywhere.',
    frames: [
      { pick: 'start', ...P, pts: [[1, 1, '(1, 1)']], guides: [[1, 1]] },
      { pick: 'change x', ...P, pts: [[4, 1, '(4, 1)']], guides: [[4, 1]], note: 'moved across only' },
      { pick: 'change y', ...P, pts: [[4, -2, '(4, −2)']], guides: [[4, -2]], note: 'now down as well' }
    ]
  },
  'origin': {
    say: 'The point both measurements are taken from, written (0, 0). Nothing about it is special except that everyone agrees on it.',
    frames: [
      { pick: 'the origin', ...P, pts: [[0, 0, '(0, 0)']] },
      { pick: 'measured from', ...P, pts: [[0, 0], [3, 2, '(3, 2)']], arrows: [[0, 0, 3, 2, '#e0813a']] },
      { pick: 'and again', ...P, pts: [[0, 0], [-2, -3, '(−2, −3)']], arrows: [[0, 0, -2, -3, '#e0813a']] }
    ]
  },
  'axis': {
    say: 'One of the two lines everything is measured against. Each carries its own number line.',
    frames: [
      { pick: 'across', ...P, axisHi: 'x' },
      { pick: 'up', ...P, axisHi: 'y' },
      { pick: 'both', ...P, axisHi: 'both' }
    ]
  },
  'x-axis': {
    say: 'The line running across, where the second measurement is zero. Every point on it has the form (something, 0).',
    frames: [
      { pick: 'the line', ...P, axisHi: 'x' },
      { pick: 'points on it', ...P, axisHi: 'x', pts: [[-3, 0, '(−3, 0)'], [2, 0, '(2, 0)']], note: 'y is always 0' }
    ]
  },
  'y-axis': {
    say: 'The line running up, where the first measurement is zero. Every point on it has the form (0, something).',
    frames: [
      { pick: 'the line', ...P, axisHi: 'y' },
      { pick: 'points on it', ...P, axisHi: 'y', pts: [[0, 3, '(0, 3)'], [0, -2, '(0, −2)']], note: 'x is always 0' }
    ]
  },
  'axes': {
    say: 'The two lines together. They cross at the origin and cut the plane into four regions.',
    frames: [
      { pick: 'across', ...P, axisHi: 'x' },
      { pick: 'up', ...P, axisHi: 'y' },
      { pick: 'together', ...P, axisHi: 'both', pts: [[0, 0]] }
    ]
  },
  'coordinate plane': {
    say: 'The whole flat sheet, with axes and a grid, on which any pair of numbers has a home.',
    frames: [
      { pick: 'empty', ...P },
      { pick: 'one point', ...P, pts: [[2, 3, '(2, 3)']], guides: [[2, 3]] },
      { pick: 'many', ...P, pts: [[2, 3], [-3, 1], [0, -2], [4, -4], [-1, 4]] }
    ]
  },
  'Cartesian plane': {
    say: 'The same sheet, named after Descartes, who joined algebra to geometry by giving every point a pair of numbers.',
    frames: [
      { pick: 'quadrants', ...P, text: [[2.6, 2.6, 'I'], [-2.6, 2.6, 'II'], [-2.6, -2.6, 'III'], [2.6, -2.6, 'IV']] },
      { pick: 'a shape on it', ...P, polys: [{ pts: [[-2, -1], [3, -1], [1, 3]] }], note: 'geometry, as numbers' }
    ]
  },
  'ordered pair': {
    say: 'Two numbers in a fixed order, written in brackets. The order is the whole point: swap them and you have a different place.',
    frames: [
      { pick: '(3, 1)', ...P, pts: [[3, 1, '(3, 1)', '#12897c']], guides: [[3, 1]] },
      { pick: '(1, 3)', ...P, pts: [[1, 3, '(1, 3)', '#e0813a']], guides: [[1, 3]] },
      { pick: 'both', ...P, pts: [[3, 1, '(3, 1)', '#12897c'], [1, 3, '(1, 3)', '#e0813a']], note: 'not the same point' }
    ]
  },
  'coordinate': {
    say: 'One of the two numbers. On its own it narrows a point to a line, not to a place.',
    frames: [
      { pick: 'x = 3', ...P, lines: [{ x: 3, c2: '#e0813a' }], note: 'a whole line of points' },
      { pick: 'y = 1', ...P, lines: [{ y: 1, c2: '#12897c' }], note: 'another whole line' },
      { pick: 'both', ...P, lines: [{ x: 3, c2: '#e0813a' }, { y: 1, c2: '#12897c' }], pts: [[3, 1, '(3, 1)']], note: 'one point' }
    ]
  },
  'x-coordinate': {
    say: 'How far across, measured from the y-axis. Positive to the right, negative to the left.',
    frames: [
      { pick: '3', ...P, pts: [[3, 1]], segs: [[0, 0, 3, 0, '#e0813a', false, 3]], text: [[1.5, -0.9, '3', '#a25d2a']] },
      { pick: '−4', ...P, pts: [[-4, 1]], segs: [[0, 0, -4, 0, '#e0813a', false, 3]], text: [[-2, -0.9, '−4', '#a25d2a']] }
    ]
  },
  'y-coordinate': {
    say: 'How far up, measured from the x-axis. Positive above, negative below.',
    frames: [
      { pick: '2', ...P, pts: [[1, 2]], segs: [[0, 0, 0, 2, '#12897c', false, 3]], text: [[-0.7, 1, '2', '#10796e']] },
      { pick: '−3', ...P, pts: [[1, -3]], segs: [[0, 0, 0, -3, '#12897c', false, 3]], text: [[-0.8, -1.6, '−3', '#10796e']] }
    ]
  },
  'abscissa': {
    say: 'The older name for the x-coordinate. You will meet it in books rather than in classrooms.',
    frames: [
      { pick: 'at (3, 1)', ...P, pts: [[3, 1]], segs: [[0, 0, 3, 0, '#e0813a', false, 3]], note: 'abscissa 3' },
      { pick: 'at (−2, 1)', ...P, pts: [[-2, 1]], segs: [[0, 0, -2, 0, '#e0813a', false, 3]], note: 'abscissa −2' }
    ]
  },
  'ordinate': {
    say: 'The older name for the y-coordinate, and the one that gave "ordered pair" its name.',
    frames: [
      { pick: 'at (1, 2)', ...P, pts: [[1, 2]], segs: [[0, 0, 0, 2, '#12897c', false, 3]], note: 'ordinate 2' },
      { pick: 'at (1, −3)', ...P, pts: [[1, -3]], segs: [[0, 0, 0, -3, '#12897c', false, 3]], note: 'ordinate −3' }
    ]
  },
  'plotting a point': {
    say: 'Turning a pair of numbers into a place: go across by the first, then up by the second. Always in that order.',
    frames: [
      { pick: 'start', ...P, pts: [[0, 0]] },
      { pick: 'across 3', ...P, arrows: [[0, 0, 3, 0, '#e0813a']], pts: [[3, 0]] },
      { pick: 'then up 2', ...P, arrows: [[0, 0, 3, 0, '#e0813a'], [3, 0, 3, 2, '#12897c']], pts: [[3, 2, '(3, 2)']] }
    ]
  },
  'reading a point': {
    say: 'The reverse: drop from a marked place to each axis and read the two numbers off.',
    frames: [
      { pick: 'a point', ...P, pts: [[3, 2]] },
      { pick: 'drop down', ...P, pts: [[3, 2]], arrows: [[3, 2, 3, 0, '#e0813a']], text: [[3.6, -0.9, 'x = 3']] },
      { pick: 'and across', ...P, pts: [[3, 2]], arrows: [[3, 2, 3, 0, '#e0813a'], [3, 2, 0, 2, '#12897c']], note: '(3, 2)' }
    ]
  },
  'quadrant': {
    say: 'One of the four regions the axes cut the plane into. Which one a point is in is decided entirely by the signs of its two numbers.',
    frames: [1, 2, 3, 4].map(q => ({ pick: `${q}`, ...P, quads: [q] }))
  },
  'first quadrant': {
    say: 'Top right, where both numbers are positive. Most graphs of real quantities live here, because lengths and times are rarely negative.',
    frames: [
      { pick: 'the region', ...P, quads: [1] },
      { pick: 'a point in it', ...P, quads: [1], pts: [[2.5, 3, '(2.5, 3)']], note: 'both positive' }
    ]
  },
  'second quadrant': {
    say: 'Top left: x negative, y positive.',
    frames: [
      { pick: 'the region', ...P, quads: [2] },
      { pick: 'a point in it', ...P, quads: [2], pts: [[-2.5, 3, '(−2.5, 3)']], note: 'x negative' }
    ]
  },
  'third quadrant': {
    say: 'Bottom left, where both numbers are negative.',
    frames: [
      { pick: 'the region', ...P, quads: [3] },
      { pick: 'a point in it', ...P, quads: [3], pts: [[-2.5, -3, '(−2.5, −3)']], note: 'both negative' }
    ]
  },
  'fourth quadrant': {
    say: 'Bottom right: x positive, y negative.',
    frames: [
      { pick: 'the region', ...P, quads: [4] },
      { pick: 'a point in it', ...P, quads: [4], pts: [[2.5, -3, '(2.5, −3)']], note: 'y negative' }
    ]
  },
  'sign of a coordinate': {
    say: 'Whether each number is positive or negative. The two signs together say which quadrant you are in, without measuring anything.',
    frames: [
      { pick: '+ +', ...P, quads: [1], pts: [[2.6, 2.6]] },
      { pick: '− +', ...P, quads: [2], pts: [[-2.6, 2.6]] },
      { pick: '− −', ...P, quads: [3], pts: [[-2.6, -2.6]] },
      { pick: '+ −', ...P, quads: [4], pts: [[2.6, -2.6]] }
    ]
  },
  'positive direction': {
    say: 'Right along the x-axis and up the y-axis. A convention, agreed rather than discovered, but agreed everywhere.',
    frames: [
      { pick: 'across', ...P, arrows: [[0, 0, 4, 0, '#12897c']] },
      { pick: 'up', ...P, arrows: [[0, 0, 0, 4, '#12897c']] },
      { pick: 'both', ...P, arrows: [[0, 0, 4, 0, '#12897c'], [0, 0, 0, 4, '#12897c']] }
    ]
  },
  'negative direction': {
    say: 'Left and down. Not smaller or lesser, just the opposite way.',
    frames: [
      { pick: 'left', ...P, arrows: [[0, 0, -4, 0, '#c0504d']] },
      { pick: 'down', ...P, arrows: [[0, 0, 0, -4, '#c0504d']] },
      { pick: 'both', ...P, arrows: [[0, 0, -4, 0, '#c0504d'], [0, 0, 0, -4, '#c0504d']] }
    ]
  },
  'gridline': {
    say: 'A line of the grid. Every point on a vertical one shares an x-coordinate, which is what makes it useful for reading a graph.',
    frames: [
      { pick: 'x = 2', ...P, hiGrid: 2, pts: [[2, 3], [2, -1]], note: 'same x, different y' },
      { pick: 'x = −3', ...P, hiGrid: -3, pts: [[-3, 4], [-3, 0]] }
    ]
  },
  'lattice point': {
    say: 'A point where both numbers are whole. Easy to plot exactly, which is why tables of values tend to use them.',
    frames: [
      { pick: 'the lattice', ...P, grid: 'dots' },
      { pick: 'some of them', ...P, grid: 'dots', pts: [[2, 3], [-3, 1], [0, -2]] },
      { pick: 'not one', ...P, grid: 'dots', pts: [[1.5, 2.5, '(1.5, 2.5)', '#c0504d']], note: 'between the dots' }
    ]
  },
  'tick mark': {
    say: 'The small strokes counting units along an axis. Without them the picture has shape but no size.',
    frames: [
      { pick: 'no ticks', ...P, ticks: false, curves: [{ f: x => 0.5 * x }], note: 'shape only' },
      { pick: 'with ticks', ...P, ticks: true, curves: [{ f: x => 0.5 * x }], note: 'now it has size' }
    ]
  },
  'scale': {
    say: 'How much one step of the grid is worth. Change it and the same relationship can look steep or nearly flat.',
    frames: [
      { pick: 'small', ...P, curves: [{ f: x => 0.8 * x }], note: '1 per square' },
      { pick: 'large', ...P, x0: -50, x1: 50, y0: -50, y1: 50, grid: 'none', ticks: false, curves: [{ f: x => 0.8 * x }], note: '10 per square, same rule' }
    ]
  },
  'unit': {
    say: 'One step. Everything measured on the plane is counted in these, and the answer means nothing until you say what one is.',
    frames: [
      { pick: 'one square', ...P, bands: [[0, 0, 1, 1]] },
      { pick: 'four squares', ...P, bands: [[0, 0, 2, 2]], note: '2 by 2' }
    ]
  },
  'equal scaling': {
    say: 'Both axes using the same size of step. Only then does a square look square and an angle look like itself.',
    frames: [
      { pick: 'a square', ...P, bands: [[1, 1, 3, 3]], note: 'looks square' },
      { pick: 'a circle', ...P, circles: [{ cx: 0, cy: 0, r: 3 }], note: 'looks round' }
    ]
  },
  'distorted scaling': {
    say: 'Axes with different steps. Legal and often useful, but shape can no longer be trusted: circles turn into ovals and steepness lies.',
    frames: [
      { pick: 'the square', ...P, y0: -12, y1: 12, bands: [[1, 1, 3, 3]], note: 'now a strip' },
      { pick: 'the circle', ...P, y0: -12, y1: 12, circles: [{ cx: 0, cy: 0, r: 3 }], note: 'now an oval' }
    ]
  },
  'axis label': {
    say: 'The name of what each axis measures. Without it a graph is a shape with no subject.',
    frames: [
      { pick: 'unlabelled', ...P, curves: [{ f: x => 0.6 * x + 1 }], note: 'of what?' },
      { pick: 'labelled', ...P, curves: [{ f: x => 0.6 * x + 1 }], text: [[3.6, -0.9, 'time', '#a25d2a', 10], [1.4, 4, 'distance', '#a25d2a', 10]] }
    ]
  },
  'the point (0, 0)': {
    say: 'The origin written as a pair. It is an ordinary point that happens to be where both measurements read nothing.',
    frames: [
      { pick: 'the point', ...P, pts: [[0, 0, '(0, 0)']] },
      { pick: 'among others', ...P, pts: [[0, 0, '(0, 0)', '#e0813a'], [2, 2], [-3, 1], [1, -2]], note: 'nothing special about it' }
    ]
  },
  'distance from an axis': {
    say: 'The shortest way to an axis, which is straight at it. That distance is exactly what the other coordinate measures.',
    frames: [
      { pick: 'to the x-axis', ...P, pts: [[3, 2]], segs: [[3, 2, 3, 0, '#e0813a', false, 2.6]], right: [3, 0, -1, 1], note: 'that is y = 2' },
      { pick: 'to the y-axis', ...P, pts: [[3, 2]], segs: [[3, 2, 0, 2, '#12897c', false, 2.6]], right: [0, 2, 1, -1], note: 'that is x = 3' }
    ]
  },
  'above and below': {
    say: 'Which side of the x-axis a point is on, which is just the sign of its second number.',
    frames: [
      { pick: 'above', ...P, shade: { above: 0 }, pts: [[2, 3, 'y > 0']] },
      { pick: 'below', ...P, shade: { below: 0 }, pts: [[2, -3, 'y < 0']] }
    ]
  },
  'left and right': {
    say: 'Which side of the y-axis a point is on, which is just the sign of its first number.',
    frames: [
      { pick: 'right', ...P, shade: { right: 0 }, pts: [[3, 2, 'x > 0']] },
      { pick: 'left', ...P, shade: { left: 0 }, pts: [[-3, 2, 'x < 0']] }
    ]
  },
  'reference frame': {
    say: 'The origin and axes you have agreed to measure from. Move them and every coordinate changes, though nothing has actually moved.',
    frames: [
      { pick: 'from here', ...P, pts: [[0, 0, 'origin'], [3, 2, '(3, 2)']], arrows: [[0, 0, 3, 2, '#e0813a']] },
      { pick: 'from there', ...P, pts: [[-2, -1, 'origin'], [3, 2, '(5, 3)']], arrows: [[-2, -1, 3, 2, '#e0813a']], note: 'same point, new numbers' }
    ]
  },
  'convention (input first)': {
    say: 'The agreement that the first number is measured across. Nothing forces it; everyone simply does the same thing so the numbers travel.',
    frames: [
      { pick: 'as agreed', ...P, arrows: [[0, 0, 3, 0, '#e0813a'], [3, 0, 3, 1, '#12897c']], pts: [[3, 1, '(3, 1)']] },
      { pick: 'if reversed', ...P, arrows: [[0, 0, 0, 3, '#12897c'], [0, 3, 1, 3, '#e0813a']], pts: [[1, 3, '(3, 1)?', '#c0504d']], note: 'the same pair, elsewhere' }
    ]
  },
  'the pair (3, 1) against (1, 3)': {
    say: 'Two different points from the same two numbers. This is the clearest reason the order has to be fixed.',
    frames: [
      { pick: '(3, 1)', ...P, pts: [[3, 1, '(3, 1)', '#12897c']], guides: [[3, 1]] },
      { pick: '(1, 3)', ...P, pts: [[1, 3, '(1, 3)', '#e0813a']], guides: [[1, 3]] },
      { pick: 'together', ...P, pts: [[3, 1, '(3, 1)', '#12897c'], [1, 3, '(1, 3)', '#e0813a']], segs: [[1, 3, 3, 1, '#5d6b7d', true, 1.4]], note: 'mirrored in y = x' }
    ]
  }
};
