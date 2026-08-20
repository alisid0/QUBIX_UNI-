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
  },

  /* --------------------------------------- 2. straight lines and segments -- */
  'straight line': {
    say: 'The path that never turns. It carries on past the edge of any picture of it, which is why a drawn line is always a sample of one.',
    frames: [
      { pick: 'near', ...P, lines: [{ m: 0.7, c: 0.5 }] },
      { pick: 'wider view', ...P, x0: -14, x1: 14, y0: -10, y1: 10, lines: [{ m: 0.7, c: 0.5 }], note: 'still going' }
    ]
  },
  'line segment': {
    say: 'A piece of a line with two ends. Unlike a line it has a length you can measure.',
    frames: [
      { pick: 'the segment', ...P, segs: [[-2, -1, 3, 2]], pts: [[-2, -1], [3, 2]] },
      { pick: 'a shorter one', ...P, segs: [[0, 0, 2, 1.2]], pts: [[0, 0], [2, 1.2]], note: 'same direction, less of it' }
    ]
  },
  'ray': {
    say: 'Half a line: one end, and no other. A beam of light is the usual picture.',
    frames: [
      { pick: 'one way', ...P, rays: [[-2, -1, 3, 2]], pts: [[-2, -1]] },
      { pick: 'the other', ...P, rays: [[-2, -1, -6, -4]], pts: [[-2, -1]], note: 'same start, opposite direction' }
    ]
  },
  'endpoint': {
    say: 'Where a segment stops. Two of them, and between them everything belongs to the segment.',
    frames: [
      { pick: 'both ends', ...P, segs: [[-2, -1, 3, 2]], pts: [[-2, -1, 'end'], [3, 2, 'end']] },
      { pick: 'move one', ...P, segs: [[-2, -1, 1, 4]], pts: [[-2, -1, 'end'], [1, 4, 'end']], note: 'the other stays' }
    ]
  },
  'interior point': {
    say: 'A point on a segment that is not an end. Between, strictly.',
    frames: [
      { pick: 'inside', ...P, segs: [[-2, -1, 3, 2]], pts: [[-2, -1, '', '#5d6b7d'], [3, 2, '', '#5d6b7d'], [0.5, 0.5, 'inside', '#e0813a']] },
      { pick: 'at an end', ...P, segs: [[-2, -1, 3, 2]], pts: [[3, 2, 'not inside', '#c0504d']], note: 'an endpoint is not interior' }
    ]
  },
  'betweenness': {
    say: 'One point lying on the segment joining two others. It is the idea that lets a line be ordered.',
    frames: [
      { pick: 'B between', ...P, segs: [[-3, 0, 3, 0]], pts: [[-3, 0, 'A'], [0, 0, 'B'], [3, 0, 'C']] },
      { pick: 'B outside', ...P, segs: [[-3, 0, 3, 0]], pts: [[-3, 0, 'A'], [4.4, 0, 'B', '#c0504d'], [3, 0, 'C']], note: 'no longer between' }
    ]
  },
  'length of a segment': {
    say: 'How far apart the two ends are. Drop the horizontal and vertical legs and it is the hypotenuse of a right triangle.',
    frames: [
      { pick: 'the legs', ...P, tri: [-1, -1, 3, 2], pts: [[-1, -1], [3, 2]], note: '4 across, 3 up' },
      { pick: 'the length', ...P, segs: [[-1, -1, 3, 2, '#e0813a', false, 3]], pts: [[-1, -1], [3, 2]], note: '5' }
    ]
  },
  'distance formula': {
    say: 'Pythagoras written for two coordinate pairs: square the two differences, add, take the root.',
    frames: [
      { pick: 'the differences', ...P, tri: [-1, -1, 3, 2], pts: [[-1, -1], [3, 2]], text: [[1, -1.9, 'Δx = 4'], [3.9, 0.5, 'Δy = 3']] },
      { pick: 'the answer', ...P, segs: [[-1, -1, 3, 2, '#e0813a', false, 3]], pts: [[-1, -1], [3, 2]], note: '√(16 + 9) = 5' }
    ]
  },
  'Pythagoras in the plane': {
    say: 'The rule that makes distance measurable at all. Every length on this sheet is an application of it.',
    frames: [
      { pick: '3 and 4', ...P, tri: [0, 0, 4, 3], pts: [[0, 0], [4, 3]], right: [4, 0, -1, 1], note: 'gives 5' },
      { pick: '5 and 12', ...P, x0: -2, x1: 14, y0: -2, y1: 14, tri: [0, 0, 12, 5], pts: [[0, 0], [12, 5]], right: [12, 0, -1, 1], note: 'gives 13' }
    ]
  },
  'midpoint': {
    say: 'The point exactly halfway. Its two coordinates are the averages of the two ends.',
    frames: [
      { pick: 'halfway', ...P, segs: [[-3, -2, 3, 2]], pts: [[-3, -2], [3, 2], [0, 0, 'midpoint', '#e0813a']] },
      { pick: 'move an end', ...P, segs: [[-3, -2, 1, 4]], pts: [[-3, -2], [1, 4], [-1, 1, 'midpoint', '#e0813a']], note: 'it follows' }
    ]
  },
  'midpoint formula': {
    say: 'Average each coordinate separately. There is nothing more to it than that.',
    frames: [
      { pick: 'average x', ...P, segs: [[-3, -2, 3, 2]], pts: [[-3, -2], [3, 2]], segs2: null, text: [[0, -3.4, '(−3 + 3) ÷ 2 = 0', '#a25d2a']] },
      { pick: 'average y', ...P, segs: [[-3, -2, 3, 2]], pts: [[-3, -2], [3, 2]], text: [[0, -3.4, '(−2 + 2) ÷ 2 = 0', '#10796e']] },
      { pick: 'the point', ...P, segs: [[-3, -2, 3, 2]], pts: [[-3, -2], [3, 2], [0, 0, '(0, 0)', '#e0813a']] }
    ]
  },
  'section formula': {
    say: 'The midpoint generalised: a point dividing a segment in any stated ratio, not just in half.',
    frames: [
      { pick: '1 : 1', ...P, segs: [[-4, -2, 4, 2]], pts: [[-4, -2], [4, 2], [0, 0, '', '#e0813a']] },
      { pick: '3 : 1', ...P, segs: [[-4, -2, 4, 2]], pts: [[-4, -2], [4, 2], [2, 1, '', '#e0813a']] },
      { pick: '1 : 3', ...P, segs: [[-4, -2, 4, 2]], pts: [[-4, -2], [4, 2], [-2, -1, '', '#e0813a']] }
    ]
  },
  'internal division': {
    say: 'A dividing point that lies inside the segment. Both parts point the same way.',
    frames: [
      { pick: 'inside', ...P, segs: [[-3, 0, 3, 0]], pts: [[-3, 0, 'A'], [3, 0, 'B'], [1, 0, 'P', '#e0813a']] },
      { pick: 'nearer A', ...P, segs: [[-3, 0, 3, 0]], pts: [[-3, 0, 'A'], [3, 0, 'B'], [-2, 0, 'P', '#e0813a']] }
    ]
  },
  'external division': {
    say: 'A dividing point beyond one end. The ratio is signed, and one part now runs backwards.',
    frames: [
      { pick: 'beyond B', ...P, segs: [[-3, 0, 3, 0]], pts: [[-3, 0, 'A'], [3, 0, 'B'], [4.4, 0, 'P', '#c0504d']] },
      { pick: 'beyond A', ...P, segs: [[-3, 0, 3, 0]], pts: [[-3, 0, 'A'], [3, 0, 'B'], [-4.4, 0, 'P', '#c0504d']] }
    ]
  },
  'ratio along a segment': {
    say: 'How the two parts compare. It fixes a point without ever mentioning a length.',
    frames: [
      { pick: '1 : 1', ...P, segs: [[-4, -2, 0, 0, '#e0813a', false, 3], [0, 0, 4, 2, '#12897c', false, 3]], pts: [[-4, -2], [4, 2], [0, 0]] },
      { pick: '3 : 1', ...P, segs: [[-4, -2, 2, 1, '#e0813a', false, 3], [2, 1, 4, 2, '#12897c', false, 3]], pts: [[-4, -2], [4, 2], [2, 1]] }
    ]
  },
  'collinear points': {
    say: 'Points that all sit on one line. Three points are collinear when the slope between any two of them is the same.',
    frames: [
      { pick: 'collinear', ...P, lines: [{ m: 0.5, c: 0 }], pts: [[-4, -2], [0, 0], [3, 1.5]] },
      { pick: 'not', ...P, lines: [{ m: 0.5, c: 0, c2: '#d8d3c7' }], pts: [[-4, -2], [0, 0], [3, 3, '', '#c0504d']], note: 'the third is off it' }
    ]
  },
  'horizontal line': {
    say: 'A line of constant height. Its equation names only y, because x is free to be anything.',
    frames: [
      { pick: 'y = 2', ...P, lines: [{ y: 2 }], pts: [[-3, 2], [1, 2], [4, 2]], note: 'y is always 2' },
      { pick: 'y = −3', ...P, lines: [{ y: -3 }], pts: [[-3, -3], [1, -3], [4, -3]] }
    ]
  },
  'vertical line': {
    say: 'A line of constant position across. Its equation names only x, and it is the one kind of line that is not a function.',
    frames: [
      { pick: 'x = 2', ...P, lines: [{ x: 2 }], pts: [[2, -3], [2, 0], [2, 3]], note: 'x is always 2' },
      { pick: 'x = −3', ...P, lines: [{ x: -3 }], pts: [[-3, -3], [-3, 0], [-3, 3]] }
    ]
  },
  'oblique line': {
    say: 'Any line that is neither flat nor upright. Both coordinates change as you move along it.',
    frames: [
      { pick: 'gentle', ...P, lines: [{ m: 0.4, c: 0 }] },
      { pick: 'steeper', ...P, lines: [{ m: 1.6, c: 0 }] },
      { pick: 'falling', ...P, lines: [{ m: -0.9, c: 0 }] }
    ]
  },
  'slope': {
    say: 'How much the line climbs for each step across. One number that describes the whole line, because a line never changes its mind.',
    frames: [
      { pick: '0.5', ...P, lines: [{ m: 0.5, c: 0 }], tri: [0, 0, 4, 2], note: '2 up per 4 across' },
      { pick: '1', ...P, lines: [{ m: 1, c: 0 }], tri: [0, 0, 4, 4], note: '4 up per 4 across' },
      { pick: '2', ...P, lines: [{ m: 2, c: 0 }], tri: [0, 0, 2, 4], note: '4 up per 2 across' }
    ]
  },
  'gradient': {
    say: 'The same number as slope, under the name used in British schools and in physics.',
    frames: [
      { pick: 'gentle', ...P, lines: [{ m: 0.4, c: 0 }], tri: [0, 0, 4, 1.6] },
      { pick: 'steep', ...P, lines: [{ m: 1.8, c: 0 }], tri: [0, 0, 2, 3.6] }
    ]
  },
  'rise': {
    say: 'The vertical part of a step along the line. Negative if the line is going down.',
    frames: [
      { pick: 'rising', ...P, lines: [{ m: 0.75, c: 0 }], segs: [[4, 0, 4, 3, '#12897c', false, 3]], text: [[4.6, 1.5, '+3', '#10796e']] },
      { pick: 'falling', ...P, lines: [{ m: -0.75, c: 0 }], segs: [[4, 0, 4, -3, '#12897c', false, 3]], text: [[4.6, -1.5, '−3', '#10796e']] }
    ]
  },
  'run': {
    say: 'The horizontal part of the same step. Usually taken as positive, so the sign of the answer comes from the rise.',
    frames: [
      { pick: 'run 4', ...P, lines: [{ m: 0.75, c: 0 }], segs: [[0, 0, 4, 0, '#e0813a', false, 3]], text: [[2, -0.9, '4', '#a25d2a']] },
      { pick: 'run 2', ...P, lines: [{ m: 0.75, c: 0 }], segs: [[0, 0, 2, 0, '#e0813a', false, 3]], text: [[1, -0.9, '2', '#a25d2a']], note: 'same line, smaller step' }
    ]
  },
  'rise over run': {
    say: 'Divide one by the other and the size of the step drops out. That is why any two points on a line give the same slope.',
    frames: [
      { pick: 'big step', ...P, lines: [{ m: 0.75, c: 0 }], tri: [0, 0, 4, 3], note: '3 ÷ 4 = 0.75' },
      { pick: 'small step', ...P, lines: [{ m: 0.75, c: 0 }], tri: [0, 0, 2, 1.5], note: '1.5 ÷ 2 = 0.75' }
    ]
  },
  'steepness': {
    say: 'How sharply a line climbs. The bigger the slope in size, the steeper, whichever way it leans.',
    frames: [
      { pick: 'shallow', ...P, lines: [{ m: 0.3, c: 0 }], note: 'slope 0.3' },
      { pick: 'steep', ...P, lines: [{ m: 2.5, c: 0 }], note: 'slope 2.5' },
      { pick: 'steep, falling', ...P, lines: [{ m: -2.5, c: 0 }], note: 'slope −2.5, just as steep' }
    ]
  },
  'positive slope': {
    say: 'The line climbs left to right. As the input grows, so does the output.',
    frames: [
      { pick: 'gentle', ...P, lines: [{ m: 0.4, c: 0 }], arrows: [[-3, -1.2, 3, 1.2, '#12897c']] },
      { pick: 'steep', ...P, lines: [{ m: 1.6, c: 0 }], arrows: [[-2, -3.2, 2, 3.2, '#12897c']] }
    ]
  },
  'negative slope': {
    say: 'The line falls left to right. As the input grows, the output shrinks.',
    frames: [
      { pick: 'gentle', ...P, lines: [{ m: -0.4, c: 0 }], arrows: [[-3, 1.2, 3, -1.2, '#c0504d']] },
      { pick: 'steep', ...P, lines: [{ m: -1.6, c: 0 }], arrows: [[-2, 3.2, 2, -3.2, '#c0504d']] }
    ]
  },
  'zero slope': {
    say: 'No climb at all. Move as far across as you like and the height never changes.',
    frames: [
      { pick: 'flat', ...P, lines: [{ y: 1.5 }], tri: [-3, 1.5, 2, 1.5], note: 'rise 0' },
      { pick: 'still flat', ...P, lines: [{ y: -2 }], tri: [-3, -2, 2, -2], note: '0 ÷ anything = 0' }
    ]
  },
  'undefined slope': {
    say: 'An upright line has no run to divide by, and dividing by nothing is not an answer. That is why it is undefined rather than infinite.',
    frames: [
      { pick: 'nearly upright', ...P, lines: [{ m: 8, c: 0 }], note: 'slope 8' },
      { pick: 'more so', ...P, lines: [{ m: 40, c: 0 }], note: 'slope 40' },
      { pick: 'upright', ...P, lines: [{ x: 0, c2: '#c0504d' }], note: 'no run: undefined' }
    ]
  },
  'angle of inclination': {
    say: 'The angle the line makes with the horizontal. Slope and angle carry the same information in different units.',
    frames: [
      { pick: '45°', ...P, lines: [{ m: 1, c: 0 }], segs: [[0, 0, 3.4, 0, '#e0813a', false, 2]], text: [[1.7, 0.5, '45°', '#a25d2a']], note: 'slope 1' },
      { pick: '27°', ...P, lines: [{ m: 0.5, c: 0 }], segs: [[0, 0, 3.4, 0, '#e0813a', false, 2]], text: [[1.9, 0.35, '27°', '#a25d2a']], note: 'slope 0.5' },
      { pick: '63°', ...P, lines: [{ m: 2, c: 0 }], segs: [[0, 0, 2, 0, '#e0813a', false, 2]], text: [[1.3, 0.6, '63°', '#a25d2a']], note: 'slope 2' }
    ]
  },
  'parallel lines': {
    say: 'Same slope, different position. They never meet, however far either is extended.',
    frames: [
      { pick: 'far apart', ...P, lines: [{ m: 0.8, c: 3 }, { m: 0.8, c: -3 }] },
      { pick: 'closer', ...P, lines: [{ m: 0.8, c: 1 }, { m: 0.8, c: -1 }], note: 'still never meeting' }
    ]
  },
  'perpendicular lines': {
    say: 'Crossing at a right angle. Their slopes multiply to −1, which is the algebraic form of that fact.',
    frames: [
      { pick: '1 and −1', ...P, lines: [{ m: 1, c: 0 }, { m: -1, c: 0, c2: '#e0813a' }], right: [0, 0, 1, 1] },
      { pick: '2 and −0.5', ...P, lines: [{ m: 2, c: 0 }, { m: -0.5, c: 0, c2: '#e0813a' }], note: '2 × −0.5 = −1' }
    ]
  },
  'negative reciprocal': {
    say: 'Flip the fraction and change the sign. Doing that to a slope turns a line through a right angle.',
    frames: [
      { pick: 'from 2', ...P, lines: [{ m: 2, c: 0 }, { m: -0.5, c: 0, c2: '#e0813a' }], note: '2 → −1/2' },
      { pick: 'from 1/3', ...P, lines: [{ m: 1 / 3, c: 0 }, { m: -3, c: 0, c2: '#e0813a' }], note: '1/3 → −3' }
    ]
  },
  'x-intercept': {
    say: 'Where the line crosses the horizontal axis, so the output is zero. Solving a linear equation is exactly finding this.',
    frames: [
      { pick: 'at 2', ...P, lines: [{ m: 0.8, c: -1.6 }], pts: [[2, 0, '(2, 0)', '#e0813a']] },
      { pick: 'at −3', ...P, lines: [{ m: 0.8, c: 2.4 }], pts: [[-3, 0, '(−3, 0)', '#e0813a']] }
    ]
  },
  'y-intercept': {
    say: 'Where the line crosses the vertical axis, so the input is zero. It is the starting value before anything happens.',
    frames: [
      { pick: 'at 2', ...P, lines: [{ m: 0.6, c: 2 }], pts: [[0, 2, '(0, 2)', '#12897c']] },
      { pick: 'at −3', ...P, lines: [{ m: 0.6, c: -3 }], pts: [[0, -3, '(0, −3)', '#12897c']], note: 'same slope, moved down' }
    ]
  },
  'equation of a line': {
    say: 'The condition every point on the line satisfies, and no other point does. The line and the equation are the same object.',
    frames: [
      { pick: 'the line', ...P, lines: [{ m: 0.5, c: 1 }], note: 'y = 0.5x + 1' },
      { pick: 'test a point', ...P, lines: [{ m: 0.5, c: 1 }], pts: [[2, 2, 'fits', '#12897c']], note: '0.5(2) + 1 = 2' },
      { pick: 'test another', ...P, lines: [{ m: 0.5, c: 1 }], pts: [[2, -2, 'does not', '#c0504d']], note: 'so it is off the line' }
    ]
  },
  'linear equation': {
    say: 'An equation where the letters appear only to the first power. That restriction is exactly what makes the graph straight.',
    frames: [
      { pick: 'first power', ...P, curves: [{ f: x => -0.6 * x + 2 }], note: 'straight' },
      { pick: 'squared', ...P, curves: [{ f: x => 0.4 * (x * x) - 2, c2: '#c0504d' }], note: 'no longer linear' }
    ]
  },
  'slope-intercept form': {
    say: 'y = mx + c. The two numbers you can read straight off a graph: how steep, and where it starts.',
    frames: [
      { pick: 'change c', ...P, lines: [{ m: 0.75, c: 1.5 }, { m: 0.75, c: -2, c2: '#e0813a' }], note: 'slides up and down' },
      { pick: 'change m', ...P, lines: [{ m: 0.75, c: 1.5 }, { m: -0.5, c: 1.5, c2: '#e0813a' }], pts: [[0, 1.5]], note: 'pivots about the intercept' }
    ]
  },
  'point-slope form': {
    say: 'Built from one point and a slope. Useful when you know where a line goes and how steep it is, but not where it crosses.',
    frames: [
      { pick: 'the point', ...P, pts: [[1, 0.5, '(1, 0.5)', '#e0813a']] },
      { pick: 'add a slope', ...P, lines: [{ m: 0.75, c: -0.25 }], pts: [[1, 0.5, '', '#e0813a']], tri: [1, 0.5, 3, 2] },
      { pick: 'a different slope', ...P, lines: [{ m: -1, c: 1.5 }], pts: [[1, 0.5, '', '#e0813a']], note: 'same point, new line' }
    ]
  },
  'two-point form': {
    say: 'Two points are enough to fix a line, because they fix both the slope and the position.',
    frames: [
      { pick: 'two points', ...P, pts: [[-3, -2.5], [3, 2]] },
      { pick: 'the line', ...P, lines: [{ m: 0.75, c: -0.25 }], pts: [[-3, -2.5], [3, 2]], note: 'only one fits both' }
    ]
  },
  'standard form': {
    say: 'Both letters on one side, as Ax + By = C. It treats x and y evenly, which suits solving pairs of equations.',
    frames: [
      { pick: 'the line', ...P, lines: [{ m: -0.75, c: 3 }], note: '3x + 4y = 12' },
      { pick: 'its intercepts', ...P, lines: [{ m: -0.75, c: 3 }], pts: [[4, 0, '(4, 0)'], [0, 3, '(0, 3)']], note: 'both fall out easily' }
    ]
  },
  'general form': {
    say: 'Everything moved to one side, equal to zero. It is the form a computer prefers, because there is nothing to rearrange.',
    frames: [
      { pick: 'standard', ...P, lines: [{ m: -0.75, c: 3 }], note: '3x + 4y = 12' },
      { pick: 'general', ...P, lines: [{ m: -0.75, c: 3 }], note: '3x + 4y − 12 = 0' }
    ]
  },
  'intercept form': {
    say: 'Written from the two lengths the line cuts off the axes. It says at a glance where the line meets each one.',
    frames: [
      { pick: 'the cuts', ...P, segs: [[0, 0, 4, 0, '#e0813a', false, 3], [0, 0, 0, 3, '#12897c', false, 3]], pts: [[4, 0], [0, 3]] },
      { pick: 'the line', ...P, lines: [{ m: -0.75, c: 3 }], pts: [[4, 0], [0, 3]], note: 'x/4 + y/3 = 1' }
    ]
  },
  'distance from a point to a line': {
    say: 'The shortest route, which is always the perpendicular one. Any other path to the line is longer.',
    frames: [
      { pick: 'perpendicular', ...P, lines: [{ m: 0.5, c: -1 }], pts: [[-1, 3, 'P']], segs: [[-1, 3, 0.6, -0.7, '#e0813a', false, 2.4]], right: [0.6, -0.7, -0.7, 1], note: 'shortest' },
      { pick: 'any other way', ...P, lines: [{ m: 0.5, c: -1 }], pts: [[-1, 3, 'P']], segs: [[-1, 3, 0.6, -0.7, '#d8d3c7', true, 1.6], [-1, 3, 3, 0.5, '#c0504d', false, 2]], note: 'longer' }
    ]
  },
  'foot of the perpendicular': {
    say: 'Where that shortest route lands. It is the point on the line closest to P.',
    frames: [
      { pick: 'the foot', ...P, lines: [{ m: 0.5, c: -1 }], pts: [[-1, 3, 'P'], [0.6, -0.7, 'foot', '#e0813a']], segs: [[-1, 3, 0.6, -0.7, '#e0813a', true, 2]] },
      { pick: 'move P', ...P, lines: [{ m: 0.5, c: -1 }], pts: [[3, 3, 'P'], [2.6, 0.3, 'foot', '#e0813a']], segs: [[3, 3, 2.6, 0.3, '#e0813a', true, 2]], note: 'the foot moves too' }
    ]
  },
  'angle between two lines': {
    say: 'How far one must turn to lie along the other. It depends only on their slopes, not on where they cross.',
    frames: [
      { pick: 'a small angle', ...P, lines: [{ m: 0.3, c: 0 }, { m: 0.8, c: 0, c2: '#e0813a' }] },
      { pick: 'a larger one', ...P, lines: [{ m: 0.3, c: 0 }, { m: 2.6, c: 0, c2: '#e0813a' }] },
      { pick: 'a right angle', ...P, lines: [{ m: 0.3, c: 0 }, { m: -1 / 0.3, c: 0, c2: '#e0813a' }], note: 'slopes multiply to −1' }
    ]
  },
  'perpendicular bisector': {
    say: 'The line cutting a segment in half at a right angle. Every point on it is the same distance from both ends.',
    frames: [
      { pick: 'the segment', ...P, segs: [[-3, -1, 3, 1]], pts: [[-3, -1, 'A'], [3, 1, 'B'], [0, 0, '', '#e0813a']] },
      { pick: 'the bisector', ...P, segs: [[-3, -1, 3, 1, '#d8d3c7', false, 2]], pts: [[-3, -1, 'A'], [3, 1, 'B']], lines: [{ m: -3, c: 0, c2: '#e0813a' }], right: [0, 0, 1, 3] }
    ]
  },
  'locus of equidistant points': {
    say: 'The set of all points equally far from two others. It turns out to be exactly that perpendicular bisector.',
    frames: [
      { pick: 'one such point', ...P, pts: [[-3, 0, 'A'], [3, 0, 'B'], [0, 2.5, '', '#e0813a']], segs: [[-3, 0, 0, 2.5, '#5d6b7d', true, 1.3], [3, 0, 0, 2.5, '#5d6b7d', true, 1.3]] },
      { pick: 'another', ...P, pts: [[-3, 0, 'A'], [3, 0, 'B'], [0, -1.5, '', '#e0813a']], segs: [[-3, 0, 0, -1.5, '#5d6b7d', true, 1.3], [3, 0, 0, -1.5, '#5d6b7d', true, 1.3]] },
      { pick: 'all of them', ...P, pts: [[-3, 0, 'A'], [3, 0, 'B']], lines: [{ x: 0, c2: '#e0813a' }], note: 'a whole line' }
    ]
  },
  'direction of travel': {
    say: 'A segment with an arrow on it. Adding direction turns a length into the beginning of a vector.',
    frames: [
      { pick: 'this way', ...P, arrows: [[-3, -2, 3, 2, '#12897c']], pts: [[-3, -2, 'from'], [3, 2, 'to']] },
      { pick: 'the other', ...P, arrows: [[3, 2, -3, -2, '#c0504d']], pts: [[3, 2, 'from'], [-3, -2, 'to']], note: 'same segment, opposite journey' }
    ]
  },
  'a line as a set of points': {
    say: 'Not a stroke of ink, but every point whose coordinates satisfy the equation. The drawn line is just the ones that fit on the page.',
    frames: [
      { pick: 'a few', ...P, pts: [[-4, -1.5], [0, 0.5], [4, 2.5]] },
      { pick: 'more', ...P, pts: [[-4, -1.5], [-2, -0.5], [0, 0.5], [2, 1.5], [4, 2.5]] },
      { pick: 'all of them', ...P, lines: [{ m: 0.5, c: 0.5 }], note: 'the line is the set' }
    ]
  }
};
