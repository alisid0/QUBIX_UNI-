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

// Closed shapes, for stage 3.
const shape = (pts, o = {}) => ({ polys: [{ pts, ...o }] });
const outline = pts => ({ polys: [{ pts, fill: 'none' }] });
const TRI = [[-3, -2], [3, -2], [0, 3]];

// A bare canvas with no axes, for stage 4: the function idea is about pairing
// rather than position, so most of it is drawn as arrows between two columns.
const B = { grid: 'none', ticks: false, axes: false, arrowheads: false, x0: -5, x1: 5, y0: -4, y1: 4 };
const IN = '#e0813a', OUT = '#12897c', BAD = '#c0504d';
const FAINT = '#d8d3c7';
const sq = x => x * x;
// A curve, optionally with a fainter one behind it for comparison.
const cur = (f, behind) => ({ curves: behind ? [{ f: behind, c2: FAINT }, { f }] : [{ f }] });
// Arrows from a left column to a right one, given as [fromY, toY] pairs.
const arrows = (pairs, colour = '#16283f') => pairs.map(([a, b]) => [-2.2, a, 2.2, b, colour]);
const col = (ys, x, colour) => ys.map(y => [x, y, '', colour]);

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
  },

  /* --------------------------------------- 3. regions, shapes and systems -- */
  'polygon': {
    say: 'A closed shape made only of straight sides. Add a side and you have a new one; there is no upper limit.',
    frames: [
      { pick: '3 sides', ...P, ...shape(TRI) },
      { pick: '4', ...P, ...shape([[-3, -2], [3, -2], [2, 2], [-2, 3]]) },
      { pick: '5', ...P, ...shape([[-3, -2], [1, -3], [3, 1], [0, 3], [-3, 1]]) }
    ]
  },
  'vertex': {
    say: 'A corner, where two sides meet. A polygon has exactly as many corners as sides.',
    frames: [
      { pick: 'one corner', ...P, ...outline(TRI), pts: [[0, 3, '', '#e0813a']] },
      { pick: 'all three', ...P, ...outline(TRI), pts: TRI.map(p => [...p, '', '#e0813a']) }
    ]
  },
  'side': {
    say: 'One straight edge. Going round them all in order is what closes the shape.',
    frames: [
      { pick: 'one side', ...P, ...outline(TRI), segs: [[-3, -2, 3, -2, '#e0813a', false, 3.5]] },
      { pick: 'the next', ...P, ...outline(TRI), segs: [[3, -2, 0, 3, '#e0813a', false, 3.5]] },
      { pick: 'and the last', ...P, ...outline(TRI), segs: [[0, 3, -3, -2, '#e0813a', false, 3.5]] }
    ]
  },
  'triangle': {
    say: 'Three points not in a line, joined up. The simplest polygon, and the one every other polygon can be cut into.',
    frames: [
      { pick: 'a triangle', ...P, ...shape(TRI) },
      { pick: 'move a corner', ...P, ...shape([[-3, -2], [3, -2], [2.5, 3]]), note: 'still a triangle' },
      { pick: 'cutting a shape', ...P, ...outline([[-3, -2], [2, -3], [3, 1], [0, 3], [-3, 1]]), segs: [[-3, -2, 3, 1, '#e0813a', true, 1.6], [-3, -2, 0, 3, '#e0813a', true, 1.6]], note: 'three triangles' }
    ]
  },
  'right triangle': {
    say: 'One corner square. This is the shape Pythagoras applies to, which is why every distance on this sheet is one.',
    frames: [
      { pick: 'the square corner', ...P, ...shape([[-2, -2], [2, -2], [-2, 2]]), right: [-2, -2, 1, 1] },
      { pick: 'as a distance', ...P, ...shape([[-2, -2], [2, -2], [-2, 2]], { fill: 'none' }), segs: [[2, -2, -2, 2, '#e0813a', false, 3]], right: [-2, -2, 1, 1], note: 'the hypotenuse is a length' }
    ]
  },
  'isosceles triangle': {
    say: 'Two sides equal, and with them two equal angles. Symmetry about a line through the odd corner.',
    frames: [
      { pick: 'two equal', ...P, ...shape([[-2, -2], [2, -2], [0, 3]]), text: [[-1.5, 0.6, '='], [1.5, 0.6, '=']] },
      { pick: 'its mirror', ...P, ...shape([[-2, -2], [2, -2], [0, 3]], { fill: 'none' }), lines: [{ x: 0, dash: true, c2: '#e0813a' }] }
    ]
  },
  'equilateral triangle': {
    say: 'All three sides equal, so all three angles are sixty degrees. The most symmetric triangle there is.',
    frames: [
      { pick: 'the shape', ...P, ...shape([[-2, -1.7], [2, -1.7], [0, 1.76]]) },
      { pick: 'three mirrors', ...P, ...shape([[-2, -1.7], [2, -1.7], [0, 1.76]], { fill: 'none' }), lines: [{ x: 0, dash: true, c2: '#e0813a' }, { m: 1.73, c: 1.73 * 2 - 1.7, dash: true, c2: '#e0813a' }, { m: -1.73, c: 1.73 * 2 - 1.7, dash: true, c2: '#e0813a' }] }
    ]
  },
  'quadrilateral': {
    say: 'Four straight sides. Every rectangle, square, rhombus and trapezium below is one of these with something extra promised.',
    frames: [
      { pick: 'general', ...P, ...shape([[-3, -2], [3, -3], [2, 2], [-2, 3]]) },
      { pick: 'with a promise', ...P, ...shape([[-3, -2], [3, -2], [3, 2], [-3, 2]]), note: 'now a rectangle' }
    ]
  },
  'rectangle': {
    say: 'Four right angles. Opposite sides come out equal as a consequence, not as a second condition.',
    frames: [
      { pick: 'wide', ...P, ...shape([[-3, -1.5], [3, -1.5], [3, 1.5], [-3, 1.5]]), right: [-3, -1.5, 1, 1] },
      { pick: 'tall', ...P, ...shape([[-1.5, -3], [1.5, -3], [1.5, 3], [-1.5, 3]]), right: [-1.5, -3, 1, 1] }
    ]
  },
  'square': {
    say: 'A rectangle whose sides are all equal. It is the unit of area: everything else is measured in these.',
    frames: [
      { pick: 'a square', ...P, ...shape([[-2, -2], [2, -2], [2, 2], [-2, 2]]), right: [-2, -2, 1, 1] },
      { pick: 'as area', ...P, bands: [[-2, -2, -1, -1], [-1, -2, 0, -1], [0, -2, 1, -1], [1, -2, 2, -1]], ...outline([[-2, -2], [2, -2], [2, 2], [-2, 2]]), note: 'sixteen unit squares' }
    ]
  },
  'parallelogram': {
    say: 'Both pairs of opposite sides parallel. Push a rectangle sideways and you have one, with the same area.',
    frames: [
      { pick: 'a rectangle', ...P, ...shape([[-3, -2], [1, -2], [1, 2], [-3, 2]]) },
      { pick: 'pushed over', ...P, ...shape([[-3, -2], [1, -2], [3, 2], [-1, 2]]), note: 'same base, same height' }
    ]
  },
  'rhombus': {
    say: 'A parallelogram with all four sides equal. Its diagonals cross at right angles.',
    frames: [
      { pick: 'the shape', ...P, ...shape([[0, -3], [3, 0], [0, 3], [-3, 0]]) },
      { pick: 'its diagonals', ...P, ...shape([[0, -3], [3, 0], [0, 3], [-3, 0]], { fill: 'none' }), segs: [[-3, 0, 3, 0, '#e0813a', false, 2], [0, -3, 0, 3, '#e0813a', false, 2]], right: [0, 0, 1, 1] }
    ]
  },
  'trapezium': {
    say: 'Exactly one pair of parallel sides. Its area is the average of those two, times the distance between them.',
    frames: [
      { pick: 'the shape', ...P, ...shape([[-3, -2], [3, -2], [1.5, 2], [-1.5, 2]]) },
      { pick: 'the two sides', ...P, ...shape([[-3, -2], [3, -2], [1.5, 2], [-1.5, 2]], { fill: 'none' }), segs: [[-3, -2, 3, -2, '#e0813a', false, 3], [-1.5, 2, 1.5, 2, '#12897c', false, 3]], note: 'average them' }
    ]
  },
  'perimeter': {
    say: 'The distance all the way round. Add the sides; there is no formula beyond that.',
    frames: [
      { pick: 'one side', ...P, ...outline([[-3, -2], [3, -2], [3, 2], [-3, 2]]), segs: [[-3, -2, 3, -2, '#e0813a', false, 3.5]] },
      { pick: 'two', ...P, ...outline([[-3, -2], [3, -2], [3, 2], [-3, 2]]), segs: [[-3, -2, 3, -2, '#e0813a', false, 3.5], [3, -2, 3, 2, '#e0813a', false, 3.5]] },
      { pick: 'all the way', ...P, polys: [{ pts: [[-3, -2], [3, -2], [3, 2], [-3, 2]], fill: 'none', stroke: '#e0813a', wid: 3.5 }], note: '6 + 4 + 6 + 4 = 20' }
    ]
  },
  'area of a triangle': {
    say: 'Half the base times the height. Slide the top corner along a parallel line and the area never changes, because neither does.',
    frames: [
      { pick: 'base and height', ...P, ...shape([[-3, -2], [3, -2], [1, 2]]), segs: [[1, 2, 1, -2, '#e0813a', true, 1.6]], note: 'half of 6 × 4' },
      { pick: 'move the top', ...P, ...shape([[-3, -2], [3, -2], [-2, 2]]), segs: [[-2, 2, -2, -2, '#e0813a', true, 1.6]], lines: [{ y: 2, dash: true, c2: '#d8d3c7' }], note: 'same area' },
      { pick: 'and again', ...P, ...shape([[-3, -2], [3, -2], [3, 2]]), segs: [[3, 2, 3, -2, '#e0813a', true, 1.6]], lines: [{ y: 2, dash: true, c2: '#d8d3c7' }], note: 'still the same' }
    ]
  },
  'shoelace formula': {
    say: 'Area straight from the corner coordinates, with no height to find. Multiply crosswise round the shape and subtract.',
    frames: [
      { pick: 'the corners', ...P, ...outline([[-3, -2], [3, -1], [0, 3]]), pts: [[-3, -2, '(−3,−2)'], [3, -1, '(3,−1)'], [0, 3, '(0,3)']] },
      { pick: 'crosswise', ...P, ...shape([[-3, -2], [3, -1], [0, 3]]), segs: [[-3, -2, 3, -1, '#e0813a', true, 1.4], [3, -1, 0, 3, '#e0813a', true, 1.4], [0, 3, -3, -2, '#e0813a', true, 1.4]], note: 'no height needed' }
    ]
  },
  'determinant form': {
    say: 'The same computation written as a determinant. It is why area and determinants turn out to be the same idea.',
    frames: [
      { pick: 'two edges', ...P, ...shape([[0, 0], [4, 1], [1, 3]], { fill: 'none' }), segs: [[0, 0, 4, 1, '#e0813a', false, 2.6], [0, 0, 1, 3, '#12897c', false, 2.6]], pts: [[0, 0]] },
      { pick: 'the triangle', ...P, ...shape([[0, 0], [4, 1], [1, 3]]), note: 'half |4·3 − 1·1|' },
      { pick: 'the whole box', ...P, ...shape([[0, 0], [4, 1], [5, 4], [1, 3]]), note: 'the determinant itself' }
    ]
  },
  'area of a polygon': {
    say: 'Cut it into triangles from one corner and add them. Any polygon can be cut this way, so nothing else is needed.',
    frames: [
      { pick: 'the shape', ...P, ...shape([[-3, -2], [2, -3], [3, 1], [0, 3], [-3, 1]]) },
      { pick: 'first cut', ...P, ...shape([[-3, -2], [2, -3], [3, 1], [0, 3], [-3, 1]], { fill: 'none' }), segs: [[-3, -2, 3, 1, '#e0813a', false, 1.8]] },
      { pick: 'cut again', ...P, ...shape([[-3, -2], [2, -3], [3, 1], [0, 3], [-3, 1]], { fill: 'none' }), segs: [[-3, -2, 3, 1, '#e0813a', false, 1.8], [-3, -2, 0, 3, '#e0813a', false, 1.8]], note: 'three triangles' }
    ]
  },
  'region': {
    say: 'A part of the plane rather than a line through it. Regions are what inequalities describe.',
    frames: [
      { pick: 'a box', ...P, bands: [[-3, -1, 2, 3]] },
      { pick: 'a half', ...P, shade: { above: 0 } },
      { pick: 'a shape', ...P, ...shape([[-3, -2], [2, -3], [3, 1], [0, 3]]) }
    ]
  },
  'half-plane': {
    say: 'Everything on one side of a line. Two of them, and the line between, make up the whole plane.',
    frames: [
      { pick: 'above', ...P, lines: [{ m: 0.5, c: 0 }], shade: { above: 0 } },
      { pick: 'below', ...P, lines: [{ m: 0.5, c: 0 }], shade: { below: 0 } }
    ]
  },
  'inequality': {
    say: 'A condition met by a whole region rather than by a single answer. Its picture is shading, not a point.',
    frames: [
      { pick: 'y ≥ 1', ...P, lines: [{ y: 1 }], shade: { above: 1 } },
      { pick: 'y ≤ 1', ...P, lines: [{ y: 1 }], shade: { below: 1 } }
    ]
  },
  'linear inequality': {
    say: 'The boundary is a straight line, so the region is a half-plane. Test any single point to find out which side is wanted.',
    frames: [
      { pick: 'the boundary', ...P, lines: [{ m: -1, c: 2 }], note: 'x + y = 2' },
      { pick: 'test the origin', ...P, lines: [{ m: -1, c: 2 }], pts: [[0, 0, '0 ≤ 2 ✓', '#12897c']] },
      { pick: 'so shade that side', ...P, lines: [{ m: -1, c: 2 }], shade: { below: 0 }, note: 'x + y ≤ 2' }
    ]
  },
  'strict inequality': {
    say: 'The boundary itself is excluded, drawn dashed. The difference matters at the edge and nowhere else.',
    frames: [
      { pick: 'y > 1', ...P, lines: [{ y: 1, dash: true }], shade: { above: 1 }, note: 'edge excluded' },
      { pick: 'y ≥ 1', ...P, lines: [{ y: 1 }], shade: { above: 1 }, note: 'edge included' }
    ]
  },
  'boundary line': {
    say: 'The edge of a region. Solid when it belongs to the region, dashed when it does not.',
    frames: [
      { pick: 'belongs', ...P, lines: [{ m: -1, c: 2, c2: '#e0813a' }], shade: { below: 0 } },
      { pick: 'does not', ...P, lines: [{ m: -1, c: 2, c2: '#e0813a', dash: true }], shade: { below: 0 } }
    ]
  },
  'shaded region': {
    say: 'Where two or more conditions hold at once. Each one alone allows more; together they allow less.',
    frames: [
      { pick: 'first', ...P, lines: [{ m: 1, c: -1 }], shade: { above: 0 } },
      { pick: 'second', ...P, lines: [{ m: -1, c: 3, c2: '#e0813a' }], shade: { below: 0 } },
      { pick: 'both', ...P, lines: [{ m: 1, c: -1 }, { m: -1, c: 3, c2: '#e0813a' }], polys: [{ pts: [[-5, -5], [2, 1], [-5, 5]], fill: '#cfe6e1', stroke: 'none' }], note: 'the overlap' }
    ]
  },
  'feasible region': {
    say: 'Everything allowed by every constraint. Add a constraint and it can only shrink.',
    frames: [
      { pick: 'one rule', ...P, shade: { right: 0 }, lines: [{ x: 0 }] },
      { pick: 'two', ...P, bands: [[0, 0, 5, 5]], lines: [{ x: 0 }, { y: 0 }] },
      { pick: 'three', ...P, ...shape([[0, 0], [4, 0], [0, 4]]), lines: [{ m: -1, c: 4, c2: '#e0813a' }] },
      { pick: 'four', ...P, ...shape([[0, 0], [3.5, 0], [3, 2], [1, 3], [0, 2.5]]), note: 'smaller each time' }
    ]
  },
  'convex region': {
    say: 'Join any two of its points and the segment stays inside. Feasible regions from linear constraints are always like this.',
    frames: [
      { pick: 'convex', ...P, ...shape([[-3, -2], [3, -2], [2, 2], [-2, 2]]), segs: [[-3, -2, 2, 2, '#e0813a', true, 1.8]], note: 'stays inside' },
      { pick: 'not convex', ...P, ...shape([[-3, -2], [3, -2], [0, 0], [2, 3], [-3, 2]]), segs: [[3, -2, 2, 3, '#c0504d', true, 1.8]], note: 'the join leaves it' }
    ]
  },
  'bounded region': {
    say: 'It fits inside some box. A bounded region always has a highest and a lowest point of anything measured on it.',
    frames: [
      { pick: 'the region', ...P, ...shape([[-2, -2], [2, -2], [2, 2], [-2, 2]]) },
      { pick: 'boxed in', ...P, ...shape([[-2, -2], [2, -2], [2, 2], [-2, 2]]), ...{ polys: [{ pts: [[-2, -2], [2, -2], [2, 2], [-2, 2]], fill: '#cfe6e1' }, { pts: [[-3.5, -3.5], [3.5, -3.5], [3.5, 3.5], [-3.5, 3.5]], fill: 'none', stroke: '#e0813a', dash: true, wid: 1.6 }] } }
    ]
  },
  'unbounded region': {
    say: 'It runs on without limit. A quantity measured over one may have no largest value at all.',
    frames: [
      { pick: 'near view', ...P, lines: [{ m: 0.4, c: 1 }], shade: { above: 1 } },
      { pick: 'wider', ...P, x0: -14, x1: 14, y0: -10, y1: 10, lines: [{ m: 0.4, c: 1 }], shade: { above: 1 }, note: 'still going' }
    ]
  },
  'intersection of two lines': {
    say: 'Where both lines pass at once. Unless they are parallel, there is exactly one such place.',
    frames: [
      { pick: 'one line', ...P, lines: [{ m: 1, c: -1 }] },
      { pick: 'and another', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }] },
      { pick: 'they cross', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }], pts: [[2, 1]] }
    ]
  },
  'point of intersection': {
    say: 'The one point satisfying both equations. Reading off its coordinates is solving the pair.',
    frames: [
      { pick: 'the crossing', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }], pts: [[2, 1]] },
      { pick: 'read it off', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }], pts: [[2, 1, '(2, 1)']], guides: [[2, 1]] }
    ]
  },
  'simultaneous equations': {
    say: 'Two conditions to hold at the same time. Each is a line; the answer is where they meet.',
    frames: [
      { pick: 'first alone', ...P, lines: [{ m: 1, c: -1 }], note: 'many points fit' },
      { pick: 'second alone', ...P, lines: [{ m: -0.5, c: 2, c2: '#e0813a' }], note: 'many fit this too' },
      { pick: 'both at once', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }], pts: [[2, 1]], note: 'only one fits both' }
    ]
  },
  'system of equations': {
    say: 'Any number of equations considered together. More equations usually means fewer answers, and often none.',
    frames: [
      { pick: 'two', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }], pts: [[2, 1]] },
      { pick: 'a third that fits', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }, { m: 3, c: -5, c2: '#c0504d' }], pts: [[2, 1]] },
      { pick: 'one that does not', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }, { m: 3, c: -2, c2: '#c0504d' }], note: 'now nothing fits all three' }
    ]
  },
  'unique solution': {
    say: 'Different slopes, so the lines must cross, and can only cross once.',
    frames: [
      { pick: 'crossing', ...P, lines: [{ m: 1, c: 0 }, { m: -1, c: 2, c2: '#e0813a' }], pts: [[1, 1]] },
      { pick: 'still crossing', ...P, lines: [{ m: 1, c: 0 }, { m: 0.2, c: 2, c2: '#e0813a' }], pts: [[2.5, 2.5]], note: 'nearer parallel, still one point' }
    ]
  },
  'no solution': {
    say: 'Same slope, different intercept. Parallel lines never meet, so no pair of numbers satisfies both.',
    frames: [
      { pick: 'crossing', ...P, lines: [{ m: 0.8, c: 2 }, { m: 0.3, c: -2, c2: '#e0813a' }], pts: [[-8, -4.4]], note: 'meets somewhere' },
      { pick: 'nearly parallel', ...P, lines: [{ m: 0.8, c: 2 }, { m: 0.7, c: -2, c2: '#e0813a' }], note: 'meets far away' },
      { pick: 'parallel', ...P, lines: [{ m: 0.8, c: 2 }, { m: 0.8, c: -2, c2: '#e0813a' }], note: 'never' }
    ]
  },
  'infinitely many solutions': {
    say: 'The two equations describe the same line, so every point on it solves both. Usually one is a multiple of the other.',
    frames: [
      { pick: 'two lines', ...P, lines: [{ m: 0.8, c: 1 }, { m: 0.8, c: 0, c2: '#e0813a' }], note: 'no meeting' },
      { pick: 'the same line', ...P, lines: [{ m: 0.8, c: 0, c2: '#e0813a' }, { m: 0.8, c: 0, dash: true }], pts: [[-3, -2.4], [0, 0], [3, 2.4]], note: 'every point solves both' }
    ]
  },
  'consistent system': {
    say: 'It has at least one solution. Either the lines cross, or they coincide.',
    frames: [
      { pick: 'crossing', ...P, lines: [{ m: 1, c: 0 }, { m: -1, c: 2, c2: '#e0813a' }], pts: [[1, 1]] },
      { pick: 'coinciding', ...P, lines: [{ m: 1, c: 0, c2: '#e0813a' }, { m: 1, c: 0, dash: true }], note: 'also consistent' }
    ]
  },
  'inconsistent system': {
    say: 'No solution at all. The conditions contradict each other, and the algebra ends in something false like 0 = 5.',
    frames: [
      { pick: 'parallel', ...P, lines: [{ m: 0.8, c: 2 }, { m: 0.8, c: -2, c2: '#e0813a' }] },
      { pick: 'three that clash', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }, { m: 3, c: -2, c2: '#c0504d' }], note: 'no common point' }
    ]
  },
  'dependent equations': {
    say: 'One equation carries no new information, because it is a rescaling of another. Two equations, one condition.',
    frames: [
      { pick: 'as written', ...P, lines: [{ m: -0.6, c: 1, c2: '#e0813a' }], note: '3x + 5y = 5' },
      { pick: 'doubled', ...P, lines: [{ m: -0.6, c: 1, c2: '#e0813a' }, { m: -0.6, c: 1, dash: true }], note: '6x + 10y = 10, the same line' }
    ]
  },
  'graphical solution': {
    say: 'Draw both and look. It gives an answer you can see and trust to about a grid square, which is often enough.',
    frames: [
      { pick: 'draw them', ...P, lines: [{ m: 1.5, c: -2 }, { m: -0.5, c: 2, c2: '#e0813a' }] },
      { pick: 'find the crossing', ...P, lines: [{ m: 1.5, c: -2 }, { m: -0.5, c: 2, c2: '#e0813a' }], pts: [[2, 1]] },
      { pick: 'read it', ...P, lines: [{ m: 1.5, c: -2 }, { m: -0.5, c: 2, c2: '#e0813a' }], pts: [[2, 1, '(2, 1)']], guides: [[2, 1]] }
    ]
  },
  'substitution method': {
    say: 'Use one equation to express a letter, then put it into the other. Geometrically, you have fixed one coordinate first.',
    frames: [
      { pick: 'both lines', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }] },
      { pick: 'fix x', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }, { x: 2, c2: '#5d6b7d', dash: true }] },
      { pick: 'read y', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }], pts: [[2, 1, '(2, 1)']] }
    ]
  },
  'elimination method': {
    say: 'Add or subtract the equations so one letter cancels. The combination is a third line through the same crossing.',
    frames: [
      { pick: 'the two', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }], pts: [[2, 1]] },
      { pick: 'combine them', ...P, lines: [{ m: 1, c: -1, c2: '#d8d3c7' }, { m: -0.5, c: 2, c2: '#d8d3c7' }, { y: 1, c2: '#e0813a' }], pts: [[2, 1]], note: 'a horizontal line: x is gone' },
      { pick: 'so y = 1', ...P, lines: [{ y: 1, c2: '#e0813a' }], pts: [[2, 1, '(2, 1)']] }
    ]
  },
  'linear programming': {
    say: 'Find the best allowed value of something. Because the region is convex and the objective is straight, the answer is always at a corner.',
    frames: [
      { pick: 'the region', ...P, ...shape([[0, 0], [3.5, 0], [3, 2], [1, 3], [0, 2.5]]) },
      { pick: 'slide the value', ...P, ...shape([[0, 0], [3.5, 0], [3, 2], [1, 3], [0, 2.5]]), lines: [{ m: -0.8, c: 2, dash: true, c2: '#5d6b7d' }] },
      { pick: 'until it leaves', ...P, ...shape([[0, 0], [3.5, 0], [3, 2], [1, 3], [0, 2.5]]), lines: [{ m: -0.8, c: 4.4, c2: '#e0813a' }], pts: [[3, 2, 'best', '#e0813a']], note: 'at a corner' }
    ]
  },
  'objective function': {
    say: 'The quantity being maximised or minimised. Its lines of equal value are parallel, so sliding them across the region finds the best point.',
    frames: [
      { pick: 'value 1.5', ...P, ...shape([[0, 0], [3.5, 0], [3, 2], [1, 3], [0, 2.5]]), lines: [{ m: -0.8, c: 1.5, dash: true, c2: '#5d6b7d' }] },
      { pick: 'value 3', ...P, ...shape([[0, 0], [3.5, 0], [3, 2], [1, 3], [0, 2.5]]), lines: [{ m: -0.8, c: 3, dash: true, c2: '#5d6b7d' }] },
      { pick: 'value 4.4', ...P, ...shape([[0, 0], [3.5, 0], [3, 2], [1, 3], [0, 2.5]]), lines: [{ m: -0.8, c: 4.4, c2: '#e0813a' }], note: 'the last that still touches' }
    ]
  },
  'corner point': {
    say: 'A vertex of the feasible region. Checking only these is enough, which turns an infinite search into a short list.',
    frames: [
      { pick: 'the corners', ...P, ...shape([[0, 0], [3.5, 0], [3, 2], [1, 3], [0, 2.5]]), pts: [[0, 0], [3.5, 0], [3, 2], [1, 3], [0, 2.5]] },
      { pick: 'test each', ...P, ...shape([[0, 0], [3.5, 0], [3, 2], [1, 3], [0, 2.5]]), pts: [[3, 2, 'best', '#e0813a'], [0, 0, '', '#5d6b7d'], [3.5, 0, '', '#5d6b7d'], [1, 3, '', '#5d6b7d'], [0, 2.5, '', '#5d6b7d']], note: 'five to check, not infinitely many' }
    ]
  },
  'concurrency': {
    say: 'Three or more lines through one point. It is not automatic, which is why it is worth a name when it happens.',
    frames: [
      { pick: 'two lines', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }], pts: [[2, 1]] },
      { pick: 'a third, off', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }, { m: 3, c: -2, c2: '#c0504d' }], note: 'three crossings' },
      { pick: 'a third, through', ...P, lines: [{ m: 1, c: -1 }, { m: -0.5, c: 2, c2: '#e0813a' }, { m: 3, c: -5, c2: '#c0504d' }], pts: [[2, 1]], note: 'concurrent' }
    ]
  },
  'medians': {
    say: 'Each line from a corner to the midpoint of the opposite side. All three always pass through one point.',
    frames: [
      { pick: 'one', ...P, ...outline(TRI), segs: [[0, 3, 0, -2, '#e0813a', false, 1.8]], pts: [[0, -2, '', '#5d6b7d']] },
      { pick: 'two', ...P, ...outline(TRI), segs: [[0, 3, 0, -2, '#e0813a', false, 1.8], [-3, -2, 1.5, 0.5, '#e0813a', false, 1.8]] },
      { pick: 'all three', ...P, ...outline(TRI), segs: [[0, 3, 0, -2, '#e0813a', false, 1.8], [-3, -2, 1.5, 0.5, '#e0813a', false, 1.8], [3, -2, -1.5, 0.5, '#e0813a', false, 1.8]], pts: [[0, -0.33]], note: 'concurrent' }
    ]
  },
  'centroid': {
    say: 'Where the medians meet, and the average of the three corners. A cardboard triangle balances on it.',
    frames: [
      { pick: 'the medians', ...P, ...outline(TRI), segs: [[0, 3, 0, -2, '#d8d3c7', false, 1.4], [-3, -2, 1.5, 0.5, '#d8d3c7', false, 1.4], [3, -2, -1.5, 0.5, '#d8d3c7', false, 1.4]] },
      { pick: 'the point', ...P, ...outline(TRI), segs: [[0, 3, 0, -2, '#d8d3c7', false, 1.4], [-3, -2, 1.5, 0.5, '#d8d3c7', false, 1.4], [3, -2, -1.5, 0.5, '#d8d3c7', false, 1.4]], pts: [[0, -0.33, 'centroid', '#e0813a']], note: 'the average of the corners' }
    ]
  },
  'circumcentre': {
    say: 'The centre of the circle through all three corners. It is equally far from each, so it sits on every perpendicular bisector.',
    frames: [
      { pick: 'the point', ...P, ...outline(TRI), pts: [[0, -0.17, '', '#e0813a']] },
      { pick: 'equally far', ...P, ...outline(TRI), pts: [[0, -0.17, '', '#e0813a']], segs: TRI.map(p => [0, -0.17, p[0], p[1], '#5d6b7d', true, 1.3]) },
      { pick: 'the circle', ...P, ...outline(TRI), circles: [{ cx: 0, cy: -0.17, r: 3.005 }], pts: [[0, -0.17, '', '#e0813a']] }
    ]
  },
  'incentre': {
    say: 'The centre of the largest circle that fits inside. It is equally far from each side, rather than from each corner.',
    frames: [
      { pick: 'the point', ...P, ...outline(TRI), pts: [[0, -0.55, '', '#e0813a']] },
      { pick: 'the circle', ...P, ...outline(TRI), circles: [{ cx: 0, cy: -0.55, r: 1.45, stroke: '#e0813a' }], pts: [[0, -0.55, '', '#e0813a']], note: 'touching all three sides' }
    ]
  },
  'orthocentre': {
    say: 'Where the three altitudes meet. Unlike the others it can fall outside the triangle entirely.',
    frames: [
      { pick: 'inside', ...P, ...outline(TRI), segs: [[0, 3, 0, -2, '#d8d3c7', false, 1.4], [-3, -2, 1.8, 1.2, '#d8d3c7', false, 1.4], [3, -2, -1.8, 1.2, '#d8d3c7', false, 1.4]], pts: [[0, 0.6, '', '#e0813a']] },
      { pick: 'outside', ...P, ...outline([[-3, -2], [3, -2], [2.6, 2]]), pts: [[2.6, -3.7, '', '#c0504d']], note: 'an obtuse triangle pushes it out' }
    ]
  },
  'Euler line': {
    say: 'The circumcentre, centroid and orthocentre always lie on one line, in that order, whatever the triangle. A surprise that has no obvious reason to be true.',
    frames: [
      { pick: 'three centres', ...P, ...outline(TRI), pts: [[0, -0.17, '', '#12897c'], [0, -0.33, '', '#5d6b7d'], [0, 0.6, '', '#c0504d']] },
      { pick: 'one line', ...P, ...outline(TRI), pts: [[0, -0.17, '', '#12897c'], [0, -0.33, '', '#5d6b7d'], [0, 0.6, '', '#c0504d']], lines: [{ x: 0, c2: '#e0813a', dash: true }], note: 'always' }
    ]
  },

  /* ------------------------------------------------- 4. the function idea -- */
  'relation': {
    say: 'Any pairing at all between two sets. No promises: an input may have many partners, or none.',
    frames: [
      { pick: 'one each', ...B, pts: [...col([2, 0, -2], -2.5, IN), ...col([2, 0, -2], 2.5, OUT)], arrows: arrows([[2, 2], [0, 0], [-2, -2]]) },
      { pick: 'or several', ...B, pts: [...col([2, 0, -2], -2.5, IN), ...col([2, -1], 2.5, OUT)], arrows: arrows([[2, 2], [0, -1], [-2, 2], [-2, -1]]), note: 'still a relation' },
      { pick: 'or none', ...B, pts: [...col([2, 0, -2], -2.5, IN), ...col([2, -1], 2.5, OUT)], arrows: arrows([[2, 2], [-2, -1]]), note: 'the middle input has no partner' }
    ]
  },
  'function': {
    say: 'A relation that promises exactly one output for every allowed input. That single promise is the whole definition.',
    frames: [
      { pick: 'a relation', ...B, pts: [...col([2, 0, -2], -2.5, IN), ...col([2, 0, -2], 2.5, OUT)], arrows: arrows([[2, 2], [0, 0], [0, -2], [-2, -2]]), note: 'one input has two' },
      { pick: 'a function', ...B, pts: [...col([2, 0, -2], -2.5, IN), ...col([2, 0, -2], 2.5, OUT)], arrows: arrows([[2, 2], [0, 0], [-2, -2]]), note: 'one arrow each' }
    ]
  },
  'rule': {
    say: 'The instruction that turns an input into an output. It can be words, a formula, a table, or a machine.',
    frames: [
      { pick: 'double it', ...B, pts: [[-2.8, 0, '3', IN], [2.8, 0, '6', OUT]], arrows: [[-2.3, 0, 2.3, 0]], text: [[0, 0.9, 'double it']] },
      { pick: 'add one', ...B, pts: [[-2.8, 0, '3', IN], [2.8, 0, '4', OUT]], arrows: [[-2.3, 0, 2.3, 0]], text: [[0, 0.9, 'add one']], note: 'same input, new rule' }
    ]
  },
  'input': {
    say: 'What goes in. Choosing it is the one free act; everything after is decided by the rule.',
    frames: [
      { pick: '3', ...B, pts: [[-2.8, 0, '3', IN], [2.8, 0, '6', OUT]], arrows: [[-2.3, 0, 2.3, 0]], text: [[0, 0.9, 'double it']] },
      { pick: '5', ...B, pts: [[-2.8, 0, '5', IN], [2.8, 0, '10', OUT]], arrows: [[-2.3, 0, 2.3, 0]], text: [[0, 0.9, 'double it']] },
      { pick: '−2', ...B, pts: [[-2.8, 0, '−2', IN], [2.8, 0, '−4', OUT]], arrows: [[-2.3, 0, 2.3, 0]], text: [[0, 0.9, 'double it']] }
    ]
  },
  'output': {
    say: 'What comes out. You do not choose it; the input and the rule between them settle it.',
    frames: [
      { pick: 'from 3', ...B, pts: [[-2.8, 0, '3', '#d8d3c7'], [2.8, 0, '6', OUT]], arrows: [[-2.3, 0, 2.3, 0]] },
      { pick: 'from 5', ...B, pts: [[-2.8, 0, '5', '#d8d3c7'], [2.8, 0, '10', OUT]], arrows: [[-2.3, 0, 2.3, 0]], note: 'settled, not chosen' }
    ]
  },
  'domain': {
    say: 'Every input the rule will accept. Stating it is part of stating the function, not an afterthought.',
    frames: [
      { pick: 'all of it', line: true, spans: [[-5, 5]], note: 'every number allowed' },
      { pick: 'a restriction', line: true, spans: [[-5, -2, 'out'], [-2, 5]], marks: [{ x: -2 }], note: 'from −2 upward' },
      { pick: 'a hole', line: true, spans: [[-5, 2], [2, 5]], marks: [{ x: 2, open: true }], note: 'one value refused' }
    ]
  },
  'range': {
    say: 'Every output the rule actually produces. Not what it might produce: what it does.',
    frames: [
      { pick: 'the rule', ...P, curves: [{ f: x => x * x - 2 }], note: 'x² − 2' },
      { pick: 'its outputs', ...P, curves: [{ f: x => x * x - 2 }], shade: { above: -2 }, pts: [[0, -2, '', IN]], note: 'never below −2' },
      { pick: 'as a line', line: true, spans: [[-2, 5]], marks: [{ x: -2 }], note: 'the range' }
    ]
  },
  'codomain': {
    say: 'The set outputs are allowed to come from. It may be bigger than the range, and often is, because it is declared rather than computed.',
    frames: [
      { pick: 'what is reached', ...B, pts: [...col([1.5, -1.5], -2.5, IN), ...col([2.5, 0.5], 2.5, OUT)], arrows: arrows([[1.5, 2.5], [-1.5, 0.5]]), note: 'the range' },
      { pick: 'what is allowed', ...B, pts: [...col([1.5, -1.5], -2.5, IN), ...col([2.5, 0.5], 2.5, OUT), ...col([-1.5, -3], 2.5, '#d8d3c7')], arrows: arrows([[1.5, 2.5], [-1.5, 0.5]]), note: 'the codomain, larger' }
    ]
  },
  'image': {
    say: 'Where a particular input is sent. The image of 3 under squaring is 9.',
    frames: [
      { pick: 'of 3', ...B, pts: [[-2.5, 0, '3', IN], [2.5, 0, '9', OUT]], arrows: [[-2.1, 0, 2.1, 0]] },
      { pick: 'of 4', ...B, pts: [[-2.5, 0, '4', IN], [2.5, 0, '16', OUT]], arrows: [[-2.1, 0, 2.1, 0]] }
    ]
  },
  'preimage': {
    say: 'Which input produced a given output. Running the arrow backwards, which may find one answer, several, or none.',
    frames: [
      { pick: 'of 9', ...B, pts: [[-2.5, 0, '3', OUT], [2.5, 0, '9', '#d8d3c7']], arrows: [[2.1, 0, -2.1, 0, IN]], note: 'and −3 as well' },
      { pick: 'of −1', ...B, pts: [[2.5, 0, '−1', '#d8d3c7']], text: [[-2.2, 0, 'nothing', BAD, 12]], note: 'no square is negative' }
    ]
  },
  'mapping': {
    say: 'Another word for a function, used when the sets are not numbers. It emphasises the sending rather than the calculating.',
    frames: [
      { pick: 'numbers', ...B, pts: [...col([1.5, -1.5], -2.5, IN), ...col([1.5, -1.5], 2.5, OUT)], arrows: arrows([[1.5, 1.5], [-1.5, -1.5]]) },
      { pick: 'anything', ...B, pts: [[-2.5, 1.5, 'FR', IN], [-2.5, -1.5, 'JP', IN], [2.5, 1.5, 'Paris', OUT], [2.5, -1.5, 'Tokyo', OUT]], arrows: arrows([[1.5, 1.5], [-1.5, -1.5]]) }
    ]
  },
  'arrow diagram': {
    say: 'Two columns and arrows between them. The clearest way to see whether a rule keeps its promise.',
    frames: [
      { pick: 'keeps it', ...B, pts: [...col([2, 0, -2], -2.5, IN), ...col([2, 0, -2], 2.5, OUT)], arrows: arrows([[2, 2], [0, 0], [-2, -2]]) },
      { pick: 'breaks it', ...B, pts: [...col([2, 0, -2], -2.5, IN), ...col([2, 0, -2], 2.5, OUT)], arrows: [...arrows([[2, 2], [-2, -2]]), ...arrows([[0, 0], [0, 2]], BAD)], note: 'a fork' }
    ]
  },
  'set of ordered pairs': {
    say: 'A function written out as a list of what goes to what. Nothing is hidden: the list is the whole rule.',
    frames: [
      { pick: 'as a list', ...P, grid: 'dots', pts: [[-2, -1], [0, 1], [1, 2], [3, 0]], note: '{(−2,−1), (0,1), (1,2), (3,0)}' },
      { pick: 'as arrows', ...B, pts: [[-2.5, 2, '−2', IN], [-2.5, 0.7, '0', IN], [-2.5, -0.7, '1', IN], [-2.5, -2, '3', IN], [2.5, 2, '−1', OUT], [2.5, 0.7, '1', OUT], [2.5, -0.7, '2', OUT], [2.5, -2, '0', OUT]], arrows: arrows([[2, 2], [0.7, 0.7], [-0.7, -0.7], [-2, -2]]) }
    ]
  },
  'well-defined': {
    say: 'The rule settles on one answer, and the same answer every time. Without this, nothing built on top of it can be trusted.',
    frames: [
      { pick: 'well-defined', ...B, pts: [[-2.5, 0, '', IN], [2.5, 0, '', OUT]], arrows: arrows([[0, 0]]), text: [[0, 0.9, 'one arrow']] },
      { pick: 'not', ...B, pts: [[-2.5, 0, '', BAD], [2.5, 1.8, '', OUT], [2.5, -1.8, '', OUT]], arrows: arrows([[0, 1.8], [0, -1.8]], BAD), text: [[0, 0.2, 'which?', BAD]] }
    ]
  },
  'one input one output': {
    say: 'The promise, stated as plainly as it can be. Two inputs may share an output; one input may not split.',
    frames: [
      { pick: 'allowed', ...B, pts: [...col([1.5, -1.5], -2.5, IN), [2.5, 0, '', OUT]], arrows: arrows([[1.5, 0], [-1.5, 0]]), note: 'sharing is fine' },
      { pick: 'forbidden', ...B, pts: [[-2.5, 0, '', BAD], ...col([1.5, -1.5], 2.5, OUT)], arrows: arrows([[0, 1.5], [0, -1.5]], BAD), note: 'splitting is not' }
    ]
  },
  'the fork': {
    say: 'One input with two arrows. It is the only way a relation fails to be a function, and it is always fatal.',
    frames: [
      { pick: 'one arrow', ...B, pts: [[-2.5, 0, '2', IN], [2.5, 1.8, '4', OUT]], arrows: arrows([[0, 1.8]]) },
      { pick: 'add another', ...B, pts: [[-2.5, 0, '2', BAD], [2.5, 1.8, '4', OUT], [2.5, -1.8, '9', OUT]], arrows: arrows([[0, 1.8], [0, -1.8]], BAD), note: 'no longer a function' }
    ]
  },
  'vertical line test': {
    say: 'Sweep an upright line across a graph. It works because a vertical line collects every output at one input.',
    frames: [
      { pick: 'sweep left', ...P, curves: [{ f: x => 0.4 * x * x - 2 }], lines: [{ x: -2.5, dash: true, c2: IN }], pts: [[-2.5, 0.5]] },
      { pick: 'middle', ...P, curves: [{ f: x => 0.4 * x * x - 2 }], lines: [{ x: 0, dash: true, c2: IN }], pts: [[0, -2]] },
      { pick: 'right', ...P, curves: [{ f: x => 0.4 * x * x - 2 }], lines: [{ x: 2.5, dash: true, c2: IN }], pts: [[2.5, 0.5]], note: 'never more than one hit' }
    ]
  },
  'horizontal line test': {
    say: 'Sweep a flat line instead. Two hits means two inputs share an output, so the rule cannot be reversed.',
    frames: [
      { pick: 'high', ...P, curves: [{ f: x => 0.4 * x * x - 2 }], lines: [{ y: 1.6, dash: true, c2: IN }], pts: [[3, 1.6], [-3, 1.6]], note: 'two hits' },
      { pick: 'at the bottom', ...P, curves: [{ f: x => 0.4 * x * x - 2 }], lines: [{ y: -2, dash: true, c2: IN }], pts: [[0, -2]], note: 'one hit' },
      { pick: 'below', ...P, curves: [{ f: x => 0.4 * x * x - 2 }], lines: [{ y: -3.2, dash: true, c2: IN }], note: 'none' }
    ]
  },
  'one-to-one': {
    say: 'No output is used twice. It is the condition that lets a rule be run backwards.',
    frames: [
      { pick: 'one-to-one', ...B, pts: [...col([1.5, -1.5], -2.5, IN), ...col([1.5, -1.5], 2.5, OUT)], arrows: arrows([[1.5, 1.5], [-1.5, -1.5]]) },
      { pick: 'not', ...B, pts: [...col([1.5, -1.5], -2.5, IN), [2.5, 0, '', OUT]], arrows: arrows([[1.5, 0], [-1.5, 0]]), note: 'the output is shared' }
    ]
  },
  'injective': {
    say: 'The formal name for one-to-one. Every output is used at most once; some may go unused.',
    frames: [
      { pick: 'injective', ...B, pts: [...col([1.5, -1.5], -2.5, IN), ...col([2.5, 0], 2.5, OUT), [2.5, -2.5, '', '#d8d3c7']], arrows: arrows([[1.5, 2.5], [-1.5, 0]]), note: 'one spare, still injective' },
      { pick: 'not', ...B, pts: [...col([1.5, -1.5], -2.5, IN), [2.5, 1, '', OUT]], arrows: arrows([[1.5, 1], [-1.5, 1]]) }
    ]
  },
  'many-to-one': {
    say: 'Several inputs landing on the same output. Perfectly legal, and what squaring does to 3 and −3.',
    frames: [
      { pick: 'two into one', ...B, pts: [[-2.5, 1.5, '3', IN], [-2.5, -1.5, '−3', IN], [2.5, 0, '9', OUT]], arrows: arrows([[1.5, 0], [-1.5, 0]]) },
      { pick: 'three into one', ...B, pts: [...col([2, 0, -2], -2.5, IN), [2.5, 0, '', OUT]], arrows: arrows([[2, 0], [0, 0], [-2, 0]]) }
    ]
  },
  'onto': {
    say: 'Nothing in the target is left out. Every possible output is actually reached by something.',
    frames: [
      { pick: 'onto', ...B, pts: [...col([2, 0, -2], -2.5, IN), ...col([1.5, -1.5], 2.5, OUT)], arrows: arrows([[2, 1.5], [0, -1.5], [-2, -1.5]]) },
      { pick: 'not', ...B, pts: [...col([2, -2], -2.5, IN), ...col([1.5, -1.5], 2.5, OUT), [2.5, 3, '', '#d8d3c7']], arrows: arrows([[2, 1.5], [-2, -1.5]]), note: 'one output unreached' }
    ]
  },
  'surjective': {
    say: 'The formal name for onto. Nothing in the codomain is wasted.',
    frames: [
      { pick: 'surjective', ...B, pts: [...col([2, 0, -2], -2.5, IN), ...col([1.5, -1.5], 2.5, OUT)], arrows: arrows([[2, 1.5], [0, -1.5], [-2, -1.5]]) },
      { pick: 'not', ...B, pts: [...col([2, -2], -2.5, IN), ...col([1.5, -1.5], 2.5, OUT), [2.5, 3, '', '#d8d3c7']], arrows: arrows([[2, 1.5], [-2, -1.5]]) }
    ]
  },
  'bijective': {
    say: 'Both at once: nothing shared and nothing left out. A perfect pairing, and exactly what an inverse needs.',
    frames: [
      { pick: 'bijective', ...B, pts: [...col([1.5, -1.5], -2.5, IN), ...col([1.5, -1.5], 2.5, OUT)], arrows: arrows([[1.5, 1.5], [-1.5, -1.5]]) },
      { pick: 'reversed', ...B, pts: [...col([1.5, -1.5], -2.5, OUT), ...col([1.5, -1.5], 2.5, IN)], arrows: arrows([[1.5, 1.5], [-1.5, -1.5]], IN), note: 'still a function backwards' }
    ]
  },
  'function notation': {
    say: 'A compact way to name the output a rule gives an input. The brackets mean "apply", never "multiply".',
    frames: [
      { pick: 'the symbol', ...B, text: [[0, 0.8, 'f(x)', '#16283f', 22], [0, -1.2, 'the output f gives to x']] },
      { pick: 'not this', ...B, text: [[0, 0.8, 'f × x', BAD, 20], [0, -1.2, 'f is a rule, not a quantity', BAD]] }
    ]
  },
  'f(x)': {
    say: 'Read "f of x". The letter names the rule, the bracket holds whatever it is being applied to.',
    frames: [
      { pick: 'a rule', ...B, text: [[0, 0.8, 'f(x) = 2x + 1', '#16283f', 16]] },
      { pick: 'applied to 4', ...B, text: [[0, 1, 'f(4) = 2(4) + 1', '#16283f', 15], [0, -0.6, '= 9', OUT, 16]] }
    ]
  },
  'evaluating': {
    say: 'Input given, output wanted. Substitute and compute; there is only ever one answer.',
    frames: [
      { pick: 'f(4)', ...B, pts: [[-2.8, 0, '4', IN], [2.8, 0, '9', OUT]], arrows: [[-2.3, 0, 2.3, 0]], text: [[0, 0.9, '2x + 1']] },
      { pick: 'f(0)', ...B, pts: [[-2.8, 0, '0', IN], [2.8, 0, '1', OUT]], arrows: [[-2.3, 0, 2.3, 0]], text: [[0, 0.9, '2x + 1']] }
    ]
  },
  'solving for the input': {
    say: 'Output given, input wanted. The arrow runs backwards, and there may be more than one answer, or none.',
    frames: [
      { pick: 'one answer', ...B, pts: [[-2.8, 0, '4', OUT], [2.8, 0, '9', '#d8d3c7']], arrows: [[2.3, 0, -2.3, 0, IN]], text: [[0, 0.9, '2x + 1 = 9']] },
      { pick: 'two answers', ...B, pts: [[-2.8, 1.5, '3', OUT], [-2.8, -1.5, '−3', OUT], [2.8, 0, '9', '#d8d3c7']], arrows: [[2.3, 0, -2.3, 1.5, IN], [2.3, 0, -2.3, -1.5, IN]], text: [[0, 0.9, 'x² = 9']], note: 'legal: the plural is on the input side' }
    ]
  },
  'independent variable': {
    say: 'The one you set. It goes across, and nothing in the rule constrains it beyond the domain.',
    frames: [
      { pick: 'choose 1', ...P, curves: [{ f: x => 0.6 * x + 1 }], pts: [[1, 1.6]], guides: [[1, 1.6]], axisHi: 'x' },
      { pick: 'choose 3', ...P, curves: [{ f: x => 0.6 * x + 1 }], pts: [[3, 2.8]], guides: [[3, 2.8]], axisHi: 'x' },
      { pick: 'choose −2', ...P, curves: [{ f: x => 0.6 * x + 1 }], pts: [[-2, -0.2]], guides: [[-2, -0.2]], axisHi: 'x' }
    ]
  },
  'dependent variable': {
    say: 'The one that follows. It goes up, and you never choose it directly: the rule and your input decide it.',
    frames: [
      { pick: 'follows 1', ...P, curves: [{ f: x => 0.6 * x + 1 }], pts: [[1, 1.6]], guides: [[1, 1.6]], axisHi: 'y' },
      { pick: 'follows 3', ...P, curves: [{ f: x => 0.6 * x + 1 }], pts: [[3, 2.8]], guides: [[3, 2.8]], axisHi: 'y', note: 'you did not pick 2.8' }
    ]
  },
  'argument': {
    say: 'Whatever sits inside the brackets. It need not be a number: an expression works the same way.',
    frames: [
      { pick: 'a number', ...B, text: [[0, 0.6, 'f( 4 )', '#16283f', 20]] },
      { pick: 'a letter', ...B, text: [[0, 0.6, 'f( a )', '#16283f', 20]] },
      { pick: 'an expression', ...B, text: [[0, 0.6, 'f( x + h )', '#16283f', 19], [0, -1.3, 'the same procedure']] }
    ]
  },
  'value of a function': {
    say: 'The number that comes out at a stated input. One input, one value, always.',
    frames: [
      { pick: 'at 2', ...B, text: [[0, 0.8, 'f(2) = 5', '#16283f', 18]] },
      { pick: 'at 4', ...B, text: [[0, 0.8, 'f(4) = 9', '#16283f', 18]] }
    ]
  },
  'substituting into a rule': {
    say: 'Whatever arrives goes into every blank. Reading the rule with a blank in it makes the next step obvious.',
    frames: [
      { pick: 'the blank', ...B, text: [[0, 0.8, 'f(⬚) = 2⬚ + 1', '#16283f', 16]] },
      { pick: 'a number', ...B, text: [[0, 1, 'f(4) = 2(4) + 1', '#16283f', 15], [0, -0.6, '= 9', OUT, 15]] },
      { pick: 'an expression', ...B, text: [[0, 1, 'f(x+h) = 2(x+h) + 1', '#16283f', 14], [0, -0.7, 'the bracket holds it together', '#5d6b7d']] }
    ]
  },
  'table of values': {
    say: 'A few rows of the rule, written out. It cannot show every input, but it can show the pattern.',
    frames: [
      { pick: 'two rows', ...P, grid: 'dots', pts: [[0, 1], [1, 3]] },
      { pick: 'four', ...P, grid: 'dots', pts: [[0, 1], [1, 3], [2, 5], [3, 7]] },
      { pick: 'the pattern', ...P, grid: 'dots', pts: [[0, 1], [1, 3], [2, 5], [3, 7]], lines: [{ m: 2, c: 1, c2: IN }], note: '2x + 1' }
    ]
  },
  'graph of a function': {
    say: 'Every input-output pair plotted at once. The table is a sample of it; the graph is all of it.',
    frames: [
      { pick: 'a few pairs', ...P, grid: 'dots', pts: [[-1, -3], [0, -1], [1, 1], [2, 3]] },
      { pick: 'all of them', ...P, curves: [{ f: x => 2 * x - 1 }], pts: [[-1, -3], [0, -1], [1, 1], [2, 3]] }
    ]
  },
  'four representations': {
    say: 'Words, table, formula and graph. Fluency is moving between them in any direction, not reciting each in turn.',
    frames: [
      { pick: 'words', ...B, text: [[0, 0.4, 'double, then add one', '#16283f', 14]] },
      { pick: 'table', ...P, grid: 'dots', pts: [[0, 1], [1, 3], [2, 5]] },
      { pick: 'formula', ...B, text: [[0, 0.4, 'f(x) = 2x + 1', '#16283f', 17]] },
      { pick: 'graph', ...P, curves: [{ f: x => 2 * x + 1 }] }
    ]
  },
  'natural domain': {
    say: 'Everything the formula will take, before anyone restricts it further. Found by scanning for what would break.',
    frames: [
      { pick: 'a square root', line: true, spans: [[-5, 0, 'out'], [0, 5]], marks: [{ x: 0 }], note: 'nothing negative' },
      { pick: 'a fraction', line: true, spans: [[-5, 2], [2, 5]], marks: [{ x: 2, open: true }], note: 'nothing that divides by zero' }
    ]
  },
  'implied domain': {
    say: 'The domain a formula states without anyone writing it down. Silence is not permission: it is the formula speaking.',
    frames: [
      { pick: 'as written', ...B, text: [[0, 0.4, 'f(x) = 1 / (x − 2)', '#16283f', 15]] },
      { pick: 'what it implies', line: true, spans: [[-5, 2], [2, 5]], marks: [{ x: 2, open: true }], note: 'x cannot be 2' }
    ]
  },
  'contextual domain': {
    say: 'Narrowed by what the quantity means rather than by the algebra. A count cannot be negative even when the formula would allow it.',
    frames: [
      { pick: 'the algebra', line: true, from: -6, to: 14, spans: [[-6, 14]], note: 'x² takes anything' },
      { pick: 'a side length', line: true, from: -6, to: 14, spans: [[-6, 0, 'out'], [0, 14]], marks: [{ x: 0 }], note: 'no negative lengths' },
      { pick: 'and a limit', line: true, from: -6, to: 14, spans: [[-6, 0, 'out'], [0, 10], [10, 14, 'out']], marks: [{ x: 0 }, { x: 10 }], note: 'set by the situation' }
    ]
  },
  'restricted domain': {
    say: 'Inputs deliberately withheld. It is how a rule that cannot be reversed is made reversible.',
    frames: [
      { pick: 'the whole curve', ...P, curves: [{ f: x => 0.4 * x * x - 2 }], note: 'two inputs per height' },
      { pick: 'half of it', ...P, curves: [{ f: x => x >= 0 ? 0.4 * x * x - 2 : NaN }], pts: [[0, -2]], note: 'one input per height now' }
    ]
  },
  'excluded value': {
    say: 'A single input the rule refuses. Drawn as a hollow endpoint, or as a hole in a curve.',
    frames: [
      { pick: 'on a line', line: true, spans: [[-5, 3], [3, 5]], marks: [{ x: 3, open: true }] },
      { pick: 'on a curve', ...P, curves: [{ f: x => x === 1 ? NaN : x + 1 }], open: [[1, 2]], note: 'the same fact, drawn' }
    ]
  },
  'division by zero': {
    say: 'The commonest reason an input is refused. It is not that the answer is large: there is no answer.',
    frames: [
      { pick: 'near zero', ...P, curves: [{ f: x => 1 / x }], pts: [[0.5, 2], [-0.5, -2]], note: '1/0.5 = 2' },
      { pick: 'nearer', ...P, curves: [{ f: x => 1 / x }], pts: [[0.25, 4], [-0.25, -4]], note: '1/0.25 = 4' },
      { pick: 'at zero', ...P, curves: [{ f: x => 1 / x }], lines: [{ x: 0, dash: true, c2: BAD }], note: 'no value at all' }
    ]
  },
  'even root of a negative': {
    say: 'The other common refusal. No real number squares to something negative, so the root has nothing to return.',
    frames: [
      { pick: 'allowed', ...P, curves: [{ f: x => Math.sqrt(x) }], pts: [[4, 2], [1, 1]] },
      { pick: 'refused', ...P, curves: [{ f: x => Math.sqrt(x) }], shade: { left: 0 }, note: 'nothing to the left' }
    ]
  },
  'interval notation': {
    say: 'A stretch of the line written in brackets. Square includes the end, round excludes it.',
    frames: [
      { pick: '[−2, 3]', line: true, spans: [[-2, 3]], marks: [{ x: -2 }, { x: 3 }] },
      { pick: '(−2, 3)', line: true, spans: [[-2, 3]], marks: [{ x: -2, open: true }, { x: 3, open: true }] },
      { pick: '[−2, 3)', line: true, spans: [[-2, 3]], marks: [{ x: -2 }, { x: 3, open: true }] }
    ]
  },
  'open interval': {
    say: 'Neither end included. Every point in it has room on both sides, which is what makes it useful for limits.',
    frames: [
      { pick: 'the interval', line: true, spans: [[-2, 3]], marks: [{ x: -2, open: true }, { x: 3, open: true }], note: '(−2, 3)' },
      { pick: 'room either side', line: true, spans: [[-2, 3]], marks: [{ x: -2, open: true }, { x: 3, open: true }, { x: 2.6 }], note: 'even near the edge' }
    ]
  },
  'closed interval': {
    say: 'Both ends included. A continuous rule on one of these always attains a highest and a lowest value.',
    frames: [
      { pick: 'the interval', line: true, spans: [[-2, 3]], marks: [{ x: -2 }, { x: 3 }], note: '[−2, 3]' },
      { pick: 'why it matters', ...P, curves: [{ f: x => 0.4 * x * x - 2 }], bands: [[-2, -4.5, 3, 4.5]], pts: [[0, -2, 'lowest', IN], [3, 1.6, 'highest', IN]] }
    ]
  },
  'half-open interval': {
    say: 'One end in, one out. Common when a quantity starts somewhere definite and runs on without reaching a limit.',
    frames: [
      { pick: '[−2, 3)', line: true, spans: [[-2, 3]], marks: [{ x: -2 }, { x: 3, open: true }] },
      { pick: '(−2, 3]', line: true, spans: [[-2, 3]], marks: [{ x: -2, open: true }, { x: 3 }] }
    ]
  },
  'union of intervals': {
    say: 'Two or more stretches taken together. Removing a point from the line always produces one.',
    frames: [
      { pick: 'one stretch', line: true, spans: [[-5, 5]] },
      { pick: 'remove a point', line: true, spans: [[-5, 1], [1, 5]], marks: [{ x: 1, open: true }], note: 'now two pieces' },
      { pick: 'remove another', line: true, spans: [[-5, -2], [-2, 1], [1, 5]], marks: [{ x: -2, open: true }, { x: 1, open: true }], note: 'three' }
    ]
  },
  'unbounded interval': {
    say: 'One end and no other. Infinity always takes a round bracket, because it is a direction rather than a place you arrive at.',
    frames: [
      { pick: 'from 1 up', line: true, spans: [[1, 5]], marks: [{ x: 1 }], note: '[1, ∞)' },
      { pick: 'wider view', line: true, from: -10, to: 40, spans: [[1, 40]], marks: [{ x: 1 }], note: 'still going' }
    ]
  },
  'set-builder notation': {
    say: 'A set written as the condition its members satisfy, rather than as a list. It works when the list would be infinite.',
    frames: [
      { pick: 'the condition', ...B, text: [[0, 0.6, '{ x : x > 2 }', '#16283f', 16], [0, -1.2, 'every x more than 2']] },
      { pick: 'on the line', line: true, spans: [[2, 5]], marks: [{ x: 2, open: true }], note: 'the same set' }
    ]
  },

  /* ---------------------------------------------- 5. families of curves ---- */
  'constant function': {
    say: 'The same output whatever goes in. Flat, and the only rule whose graph a horizontal line test fails everywhere.',
    frames: [
      { pick: 'y = 2', ...P, ...cur(() => 2), pts: [[-3, 2], [0, 2], [3, 2]] },
      { pick: 'y = −1', ...P, ...cur(() => -1), note: 'still flat' }
    ]
  },
  'identity function': {
    say: 'Gives back exactly what it was handed. It is the diagonal, and the mirror every inverse is reflected in.',
    frames: [
      { pick: 'the line', ...P, ...cur(x => x), pts: [[2, 2], [-3, -3]] },
      { pick: 'as a mirror', ...P, ...cur(x => x), lines: [{ m: 2, c: 1, c2: OUT }, { m: 0.5, c: -0.5, c2: IN }], note: 'a rule and its inverse' }
    ]
  },
  'linear function': {
    say: 'One steepness, everywhere. Equal steps in give equal steps out, which is what makes it the simplest kind of change.',
    frames: [
      { pick: 'gentle', ...P, ...cur(x => 0.4 * x + 1) },
      { pick: 'steeper', ...P, ...cur(x => 1.4 * x + 1, x => 0.4 * x + 1) },
      { pick: 'falling', ...P, ...cur(x => -0.9 * x + 1, x => 0.4 * x + 1) }
    ]
  },
  'affine function': {
    say: 'A line that need not pass through the origin. Strictly, only lines through the origin are linear; the rest are affine.',
    frames: [
      { pick: 'through 0', ...P, ...cur(x => 0.8 * x), pts: [[0, 0]] },
      { pick: 'lifted', ...P, ...cur(x => 0.8 * x + 2, x => 0.8 * x), pts: [[0, 2]], note: 'same slope, new intercept' }
    ]
  },
  'quadratic function': {
    say: 'A squared term is enough to bend it. One turning point, and a mirror through it.',
    frames: [
      { pick: 'opening up', ...P, ...cur(x => 0.5 * sq(x) - 2) },
      { pick: 'opening down', ...P, ...cur(x => -0.5 * sq(x) + 2) },
      { pick: 'narrower', ...P, ...cur(x => 1.4 * sq(x) - 2, x => 0.5 * sq(x) - 2) }
    ]
  },
  'parabola': {
    say: 'The curve a quadratic draws. Every point on it is equally far from a fixed point and a fixed line, which is the other way to define it.',
    frames: [
      { pick: 'the curve', ...P, ...cur(x => 0.5 * sq(x) - 2) },
      { pick: 'its symmetry', ...P, ...cur(x => 0.5 * sq(x) - 2), lines: [{ x: 0, dash: true, c2: IN }], pts: [[2, 0], [-2, 0]] }
    ]
  },
  'vertex of a parabola': {
    say: 'The single turning point, and the only place the curve is flat. Everything about a quadratic is easiest to read from here.',
    frames: [
      { pick: 'at the origin', ...P, ...cur(x => 0.5 * sq(x)), pts: [[0, 0, '(0, 0)', IN]] },
      { pick: 'moved', ...P, ...cur(x => 0.5 * sq(x - 2) - 2, x => 0.5 * sq(x)), pts: [[2, -2, '(2, −2)', IN]] }
    ]
  },
  'axis of symmetry': {
    say: 'The vertical line the curve folds onto itself along. It always runs through the vertex.',
    frames: [
      { pick: 'at x = 0', ...P, ...cur(x => 0.5 * sq(x) - 2), lines: [{ x: 0, dash: true, c2: IN }] },
      { pick: 'at x = 2', ...P, ...cur(x => 0.5 * sq(x - 2) - 2), lines: [{ x: 2, dash: true, c2: IN }], note: 'it follows the vertex' }
    ]
  },
  'completing the square': {
    say: 'Rewriting a quadratic so the vertex can be read straight off. The curve does not change; only the way it is written does.',
    frames: [
      { pick: 'expanded', ...P, ...cur(x => sq(x) - 2 * x - 2), note: 'x² − 2x − 2' },
      { pick: 'completed', ...P, ...cur(x => sq(x - 1) - 3), pts: [[1, -3, '(1, −3)', IN]], note: '(x − 1)² − 3' }
    ]
  },
  'vertex form': {
    say: 'a(x − h)² + k. The two numbers h and k are exactly where the vertex is, so no work is needed to find it.',
    frames: [
      { pick: 'change h', ...P, ...cur(x => sq(x - 2) - 1, x => sq(x) - 1), pts: [[2, -1, '', IN]], note: 'slides sideways' },
      { pick: 'change k', ...P, ...cur(x => sq(x) + 2, x => sq(x) - 1), pts: [[0, 2, '', IN]], note: 'slides up' },
      { pick: 'change a', ...P, ...cur(x => -0.6 * sq(x) - 1, x => sq(x) - 1), pts: [[0, -1, '', IN]], note: 'flips and flattens' }
    ]
  },
  'factored form': {
    say: 'Written as a product, so the roots are visible. Each bracket vanishing gives one crossing.',
    frames: [
      { pick: 'the curve', ...P, ...cur(x => 0.6 * (x + 2) * (x - 3)) },
      { pick: 'its roots', ...P, ...cur(x => 0.6 * (x + 2) * (x - 3)), pts: [[-2, 0, '', IN], [3, 0, '', IN]], note: '0.6(x + 2)(x − 3)' }
    ]
  },
  'root': {
    say: 'An input that makes the output zero. On a graph it is a crossing of the horizontal axis.',
    frames: [
      { pick: 'two roots', ...P, ...cur(x => 0.6 * (x + 2) * (x - 3)), pts: [[-2, 0, '', IN], [3, 0, '', IN]] },
      { pick: 'one root', ...P, ...cur(x => 0.6 * sq(x - 1)), pts: [[1, 0, '', IN]] },
      { pick: 'none', ...P, ...cur(x => 0.6 * sq(x) + 1), note: 'never reaches zero' }
    ]
  },
  'zero of a function': {
    say: 'The same thing as a root, under the name used when the rule is not a polynomial.',
    frames: [
      { pick: 'a quadratic', ...P, ...cur(x => 0.6 * (x + 2) * (x - 3)), pts: [[-2, 0, '', IN], [3, 0, '', IN]] },
      { pick: 'a wave', ...P, x0: -6.5, x1: 6.5, y0: -2.5, y1: 2.5, ...cur(Math.sin), pts: [[0, 0, '', IN], [Math.PI, 0, '', IN], [-Math.PI, 0, '', IN]], note: 'infinitely many' }
    ]
  },
  'discriminant': {
    say: 'One number that says how many roots there are before you find any. Positive gives two, zero gives one, negative gives none.',
    frames: [
      { pick: 'two roots', ...P, ...cur(x => 0.5 * sq(x) - 2), pts: [[-2, 0, '', IN], [2, 0, '', IN]], note: 'b² − 4ac > 0' },
      { pick: 'one', ...P, ...cur(x => 0.5 * sq(x)), pts: [[0, 0, '', IN]], note: 'b² − 4ac = 0' },
      { pick: 'none', ...P, ...cur(x => 0.5 * sq(x) + 1.5), note: 'b² − 4ac < 0' }
    ]
  },
  'repeated root': {
    say: 'The curve touches the axis and turns back instead of crossing. Two roots that have landed on the same place.',
    frames: [
      { pick: 'two, apart', ...P, ...cur(x => 0.6 * (x + 1.5) * (x - 1.5)), pts: [[-1.5, 0, '', IN], [1.5, 0, '', IN]] },
      { pick: 'closer', ...P, ...cur(x => 0.6 * (x + 0.6) * (x - 0.6)), pts: [[-0.6, 0, '', IN], [0.6, 0, '', IN]] },
      { pick: 'together', ...P, ...cur(x => 0.6 * sq(x)), pts: [[0, 0, '', IN]], note: 'touches, does not cross' }
    ]
  },
  'cubic function': {
    say: 'A third power allows two turns. Both ends head opposite ways, so it always crosses the axis at least once.',
    frames: [
      { pick: 'two turns', ...P, ...cur(x => 0.12 * x * sq(x) - 0.9 * x) },
      { pick: 'none', ...P, ...cur(x => 0.12 * x * sq(x) + 0.6 * x), note: 'up to two, not always two' }
    ]
  },
  'quartic function': {
    say: 'A fourth power allows three turns, and both ends go the same way. That is why it can have a W shape.',
    frames: [
      { pick: 'a W', ...P, ...cur(x => 0.06 * sq(sq(x)) - 0.8 * sq(x) + 1) },
      { pick: 'a U', ...P, ...cur(x => 0.06 * sq(sq(x)) + 0.3 * sq(x) - 2), note: 'still quartic' }
    ]
  },
  'polynomial': {
    say: 'Sums of whole-number powers. Smooth everywhere, defined everywhere, and with no breaks or corners anywhere.',
    frames: [
      { pick: 'degree 1', ...P, ...cur(x => 0.8 * x) },
      { pick: 'degree 2', ...P, ...cur(x => 0.4 * sq(x) - 2) },
      { pick: 'degree 3', ...P, ...cur(x => 0.12 * x * sq(x) - 0.9 * x) }
    ]
  },
  'degree': {
    say: 'The highest power present. It caps the number of turns at one less, and decides what the ends do.',
    frames: [
      { pick: '1: no turns', ...P, ...cur(x => 0.8 * x) },
      { pick: '2: one turn', ...P, ...cur(x => 0.4 * sq(x) - 2) },
      { pick: '3: two turns', ...P, ...cur(x => 0.12 * x * sq(x) - 0.9 * x) },
      { pick: '4: three', ...P, ...cur(x => 0.06 * sq(sq(x)) - 0.8 * sq(x) + 1) }
    ]
  },
  'leading coefficient': {
    say: 'The number on the highest power. Its sign alone decides which way the far ends of the curve point.',
    frames: [
      { pick: 'positive', ...P, ...cur(x => 0.5 * sq(x) - 2), note: 'both ends up' },
      { pick: 'negative', ...P, ...cur(x => -0.5 * sq(x) + 2), note: 'both ends down' },
      { pick: 'odd degree', ...P, ...cur(x => 0.12 * x * sq(x)), note: 'ends disagree' }
    ]
  },
  'end behaviour': {
    say: 'What happens far from the origin, where the highest power drowns out everything else.',
    frames: [
      { pick: 'near', ...P, ...cur(x => 0.12 * x * sq(x) - 0.9 * x) },
      { pick: 'further out', ...P, x0: -12, x1: 12, y0: -10, y1: 10, ...cur(x => 0.12 * x * sq(x) - 0.9 * x), note: 'the turns become invisible' }
    ]
  },
  'turning point': {
    say: 'Where the curve stops rising and starts falling, or the reverse. Momentarily flat.',
    frames: [
      { pick: 'the curve', ...P, ...cur(x => 0.12 * x * sq(x) - 0.9 * x) },
      { pick: 'both turns', ...P, ...cur(x => 0.12 * x * sq(x) - 0.9 * x), pts: [[-1.58, 0.95, '', IN], [1.58, -0.95, '', IN]], lines: [{ y: 0.95, dash: true, c2: FAINT }, { y: -0.95, dash: true, c2: FAINT }] }
    ]
  },
  'local maximum': {
    say: 'Higher than everything immediately around it, though possibly not the highest anywhere.',
    frames: [
      { pick: 'the peak', ...P, ...cur(x => 0.12 * x * sq(x) - 0.9 * x), pts: [[-1.58, 0.95, '', IN]] },
      { pick: 'not the highest', ...P, x0: -5, x1: 5, y0: -5, y1: 8, ...cur(x => 0.12 * x * sq(x) - 0.9 * x), pts: [[-1.58, 0.95, 'local', IN], [4.5, 6.9, 'higher', BAD]] }
    ]
  },
  'local minimum': {
    say: 'Lower than everything immediately around it. The dip a ball would settle in, if the curve were a track.',
    frames: [
      { pick: 'the dip', ...P, ...cur(x => 0.12 * x * sq(x) - 0.9 * x), pts: [[1.58, -0.95, '', IN]] },
      { pick: 'not the lowest', ...P, x0: -5, x1: 5, y0: -8, y1: 5, ...cur(x => 0.12 * x * sq(x) - 0.9 * x), pts: [[1.58, -0.95, 'local', IN], [-4.5, -6.9, 'lower', BAD]] }
    ]
  },
  'global maximum': {
    say: 'The highest the rule ever gets, anywhere in its domain. A rule may have none at all.',
    frames: [
      { pick: 'it has one', ...P, ...cur(x => -0.4 * sq(x) + 3), pts: [[0, 3, '', IN]] },
      { pick: 'it has none', ...P, ...cur(x => 0.4 * sq(x) - 3), note: 'climbs without limit' }
    ]
  },
  'global minimum': {
    say: 'The lowest it ever gets. On a closed interval a continuous rule always has one; on an open one it may not.',
    frames: [
      { pick: 'it has one', ...P, ...cur(x => 0.4 * sq(x) - 3), pts: [[0, -3, '', IN]] },
      { pick: 'it has none', ...P, ...cur(x => -0.4 * sq(x) + 3), note: 'falls without limit' }
    ]
  },
  'rational function': {
    say: 'One polynomial divided by another. Wherever the bottom vanishes the rule has nothing to give, so the curve breaks.',
    frames: [
      { pick: 'the curve', ...P, ...cur(x => 1 / (x - 1)) },
      { pick: 'where it breaks', ...P, ...cur(x => 1 / (x - 1)), lines: [{ x: 1, dash: true, c2: BAD }], note: 'the denominator is zero at 1' }
    ]
  },
  'asymptote': {
    say: 'A line the curve gets arbitrarily close to and never reaches. It is a statement about forever, not about the visible part.',
    frames: [
      { pick: 'near', ...P, ...cur(x => 2 + 3 / x), lines: [{ y: 2, dash: true, c2: FAINT }] },
      { pick: 'further', ...P, x0: -4, x1: 20, y0: -2, y1: 8, ...cur(x => 2 + 3 / x), lines: [{ y: 2, dash: true, c2: FAINT }] },
      { pick: 'far out', ...P, x0: -10, x1: 120, y0: -2, y1: 8, ...cur(x => 2 + 3 / x), lines: [{ y: 2, dash: true, c2: BAD }], note: 'closer, never touching' }
    ]
  },
  'vertical asymptote': {
    say: 'An upright line the curve runs alongside without limit. It marks an input the rule refuses.',
    frames: [
      { pick: 'the break', ...P, ...cur(x => 1 / (x - 1)), lines: [{ x: 1, dash: true, c2: BAD }] },
      { pick: 'closer in', ...P, x0: 0.2, x1: 1.8, y0: -20, y1: 20, ...cur(x => 1 / (x - 1)), lines: [{ x: 1, dash: true, c2: BAD }], note: 'no bound either side' }
    ]
  },
  'horizontal asymptote': {
    say: 'A level the curve settles toward far out. It answers what happens in the long run.',
    frames: [
      { pick: 'near', ...P, ...cur(x => 2 + 3 / x), lines: [{ y: 2, dash: true, c2: FAINT }] },
      { pick: 'far out', ...P, x0: -10, x1: 120, y0: -2, y1: 8, ...cur(x => 2 + 3 / x), lines: [{ y: 2, dash: true, c2: BAD }], note: 'settles at 2' }
    ]
  },
  'oblique asymptote': {
    say: 'A slanted line approached at both ends. It appears when the top of a fraction outgrows the bottom by exactly one power.',
    frames: [
      { pick: 'near', ...P, ...cur(x => x + 1 / x), lines: [{ m: 1, c: 0, dash: true, c2: FAINT }] },
      { pick: 'further', ...P, x0: -12, x1: 12, y0: -12, y1: 12, ...cur(x => x + 1 / x), lines: [{ m: 1, c: 0, dash: true, c2: BAD }], note: 'the gap closes' }
    ]
  },
  'hole in a graph': {
    say: 'A single point missing from an otherwise unbroken curve. It happens when a factor cancels, which is illegal at exactly one input.',
    frames: [
      { pick: 'the curve', ...P, ...cur(x => x === 1 ? NaN : x + 1), open: [[1, 2]] },
      { pick: 'why', ...B, text: [[0, 1, '(x² − 1) ÷ (x − 1)', '#16283f', 14], [0, -0.3, '= x + 1, except at x = 1', OUT, 13]] }
    ]
  },
  'reciprocal function': {
    say: 'One over the input. Two branches, each hugging both axes, and nothing at all at zero.',
    frames: [
      { pick: 'the curve', ...P, ...cur(x => 1 / x) },
      { pick: 'both asymptotes', ...P, ...cur(x => 1 / x), lines: [{ x: 0, dash: true, c2: BAD }, { y: 0, dash: true, c2: BAD }] }
    ]
  },
  'hyperbola (rectangular)': {
    say: 'The curve whose two coordinates always multiply to the same number. Double one and the other halves.',
    frames: [
      { pick: 'xy = 2', ...P, ...cur(x => 2 / x), pts: [[1, 2], [2, 1]] },
      { pick: 'xy = 4', ...P, ...cur(x => 4 / x, x => 2 / x), pts: [[2, 2], [4, 1]] }
    ]
  },
  'square root function': {
    say: 'Undoes squaring, but only for inputs that are not negative. It starts at the origin and flattens as it climbs.',
    frames: [
      { pick: 'the curve', ...P, ...cur(x => 2 * Math.sqrt(x)), pts: [[0, 0], [1, 2], [4, 4]] },
      { pick: 'its parent', ...P, ...cur(x => 2 * Math.sqrt(x), x => x >= 0 ? sq(x) / 2 : NaN), lines: [{ m: 1, c: 0, dash: true, c2: FAINT }], note: 'squaring, mirrored' }
    ]
  },
  'radical function': {
    say: 'Any rule with a root in it. Shifting what is under the root moves where the curve is allowed to start.',
    frames: [
      { pick: 'from 0', ...P, ...cur(x => 2 * Math.sqrt(x)), pts: [[0, 0, '', IN]] },
      { pick: 'from −3', ...P, ...cur(x => 2 * Math.sqrt(x + 3) - 1), pts: [[-3, -1, '', IN]], note: 'the restriction moved with it' }
    ]
  },
  'cube root function': {
    say: 'Undoes cubing, and unlike the square root it accepts negatives, because cubing keeps the sign.',
    frames: [
      { pick: 'the curve', ...P, ...cur(x => 2 * Math.cbrt(x)), pts: [[-8, -4], [8, 4]] },
      { pick: 'against a square root', ...P, ...cur(x => 2 * Math.cbrt(x), x => 2 * Math.sqrt(x)), note: 'one accepts negatives, one does not' }
    ]
  },
  'absolute value function': {
    say: 'Distance from zero, so the sign is thrown away. Two straight pieces meeting at a corner.',
    frames: [
      { pick: 'the curve', ...P, ...cur(x => Math.abs(x) - 1), pts: [[0, -1, 'corner', IN]] },
      { pick: 'what it does', ...P, ...cur(x => Math.abs(x) - 1, x => x - 1), note: 'the negative half folded up' }
    ]
  },
  'piecewise function': {
    say: 'Different rules on different stretches. One function, described in parts, which is how most real quantities behave.',
    frames: [
      { pick: 'the pieces', ...P, ...cur(x => x < 0 ? -1 : 0.8 * x), open: [[0, -1]], pts: [[0, 0]] },
      { pick: 'joined up', ...P, ...cur(x => x < 0 ? 0 : 0.8 * x), pts: [[0, 0]], note: 'a join is possible, not required' }
    ]
  },
  'step function': {
    say: 'Constant, then it jumps, then constant again. Postage and parking charges work exactly like this.',
    frames: [
      { pick: 'the steps', ...P, ...cur(x => Math.floor(x)) },
      { pick: 'wider steps', ...P, ...cur(x => 2 * Math.floor(x / 2)), note: 'jumps every two' }
    ]
  },
  'floor function': {
    say: 'The whole number at or below the input. It rounds down, including for negatives, where that surprises people.',
    frames: [
      { pick: 'rounding down', ...P, ...cur(x => Math.floor(x)), pts: [[2.7, 2, '', IN]] },
      { pick: 'a negative', ...P, ...cur(x => Math.floor(x)), pts: [[-1.3, -2, '', IN]], note: '−1.3 goes to −2' }
    ]
  },
  'ceiling function': {
    say: 'The whole number at or above the input. It rounds up, always.',
    frames: [
      { pick: 'rounding up', ...P, ...cur(x => Math.ceil(x)), pts: [[2.2, 3, '', IN]] },
      { pick: 'against the floor', ...P, ...cur(x => Math.ceil(x), x => Math.floor(x)), note: 'one step apart, except at whole numbers' }
    ]
  },
  'signum function': {
    say: 'Reports only the sign: minus one, nothing, or one. It throws away everything except direction.',
    frames: [
      { pick: 'the three values', ...P, ...cur(x => Math.sign(x) * 2), open: [[0, 2], [0, -2]], pts: [[0, 0]] },
      { pick: 'what it keeps', ...P, ...cur(x => Math.sign(x) * 2, x => 0.6 * x), note: 'the size is gone, the sign remains' }
    ]
  },
  'exponential function': {
    say: 'Equal steps in multiply the output by a fixed factor. That is why it eventually outruns any power, however large.',
    frames: [
      { pick: 'the curve', ...P, ...cur(x => Math.pow(2, x) - 2) },
      { pick: 'against a square', ...P, x0: -1, x1: 6, y0: -2, y1: 34, ...cur(x => Math.pow(2, x), x => sq(x)), pts: [[4, 16, '', IN]], note: 'level at 4, then it pulls away' }
    ]
  },
  'base': {
    say: 'The factor each step multiplies by. Bigger than one and it grows; between zero and one and it decays.',
    frames: [
      { pick: 'base 2', ...P, ...cur(x => Math.pow(2, x) - 2) },
      { pick: 'base 3', ...P, ...cur(x => Math.pow(3, x) - 2, x => Math.pow(2, x) - 2), note: 'steeper' },
      { pick: 'base 0.5', ...P, ...cur(x => Math.pow(0.5, x) - 2, x => Math.pow(2, x) - 2), note: 'now decaying' }
    ]
  },
  'exponential growth': {
    say: 'The amount added depends on how much there already is. Slow at first, and then not.',
    frames: [
      { pick: 'early', ...P, x0: -0.5, x1: 5, y0: -0.5, y1: 9, ...cur(x => Math.pow(1.7, x)), note: 'looks gentle' },
      { pick: 'later', ...P, x0: -1, x1: 14, y0: -5, y1: 90, ...cur(x => Math.pow(1.7, x)), note: 'the same rule' }
    ]
  },
  'exponential decay': {
    say: 'A fixed fraction lost each step, so it approaches nothing without ever arriving.',
    frames: [
      { pick: 'the curve', ...P, x0: -0.5, x1: 8, y0: -0.5, y1: 9, ...cur(x => 8 * Math.pow(0.6, x)) },
      { pick: 'the floor it never meets', ...P, x0: -0.5, x1: 20, y0: -0.5, y1: 9, ...cur(x => 8 * Math.pow(0.6, x)), lines: [{ y: 0, dash: true, c2: BAD }] }
    ]
  },
  'doubling time': {
    say: 'How long growth takes to double. For an exponential it is the same however much there already is, which is the surprising part.',
    frames: [
      { pick: 'first double', ...P, x0: -1, x1: 10, y0: -1, y1: 10, ...cur(x => Math.pow(2, x / 3)), pts: [[0, 1], [3, 2, '', IN]] },
      { pick: 'and again', ...P, x0: -1, x1: 10, y0: -1, y1: 10, ...cur(x => Math.pow(2, x / 3)), pts: [[0, 1], [3, 2], [6, 4, '', IN]], note: 'another 3 units' },
      { pick: 'and again', ...P, x0: -1, x1: 10, y0: -1, y1: 10, ...cur(x => Math.pow(2, x / 3)), pts: [[0, 1], [3, 2], [6, 4], [9, 8, '', IN]], note: 'always 3' }
    ]
  },
  'half-life': {
    say: 'How long decay takes to halve. Like doubling time, it does not depend on where you start.',
    frames: [
      { pick: 'first half', ...P, x0: -1, x1: 10, y0: -1, y1: 10, ...cur(x => 8 * Math.pow(0.5, x / 3)), pts: [[0, 8], [3, 4, '', IN]] },
      { pick: 'and again', ...P, x0: -1, x1: 10, y0: -1, y1: 10, ...cur(x => 8 * Math.pow(0.5, x / 3)), pts: [[0, 8], [3, 4], [6, 2, '', IN]], note: 'always 3' }
    ]
  },
  'the number e': {
    say: 'The one base whose steepness equals its own height everywhere. About 2.718, and it is not a coincidence that calculus keeps finding it.',
    frames: [
      { pick: 'the curve', ...P, ...cur(x => Math.exp(x) - 2), note: 'e ≈ 2.718' },
      { pick: 'height and slope', ...P, ...cur(x => Math.exp(x) - 2), pts: [[1, Math.E - 2]], lines: [{ m: Math.E, c: Math.E - 2 - Math.E, c2: IN }], note: 'height 2.718, slope 2.718' }
    ]
  },
  'logarithm': {
    say: 'Asks what power gives this number. It is the exponential run backwards, so it undoes it.',
    frames: [
      { pick: 'the curve', ...P, ...cur(x => Math.log2(x)), pts: [[1, 0], [2, 1], [4, 2]] },
      { pick: 'as an inverse', ...P, ...cur(x => Math.log2(x), x => Math.pow(2, x)), lines: [{ m: 1, c: 0, dash: true, c2: FAINT }], note: 'mirrored in y = x' }
    ]
  },
  'logarithmic function': {
    say: 'Defined only for positive inputs, and it climbs ever more slowly. It never stops climbing, which is easy to miss.',
    frames: [
      { pick: 'near', ...P, ...cur(x => Math.log2(x)), lines: [{ x: 0, dash: true, c2: BAD }] },
      { pick: 'far out', ...P, x0: -2, x1: 70, y0: -4, y1: 8, ...cur(x => Math.log2(x)), note: 'still rising, very slowly' }
    ]
  },
  'natural logarithm': {
    say: 'The logarithm to base e. It is the one whose slope at x is exactly one over x, which is why calculus prefers it.',
    frames: [
      { pick: 'the curve', ...P, ...cur(x => Math.log(x)), pts: [[1, 0], [Math.E, 1, 'at e, 1']] },
      { pick: 'its slope', ...P, ...cur(x => Math.log(x), x => 1 / x), note: 'ln x above, 1/x below' }
    ]
  },
  'common logarithm': {
    say: 'The logarithm to base ten. It counts digits, which is why it is the one used for scales like pH and decibels.',
    frames: [
      { pick: 'the curve', ...P, x0: -2, x1: 12, y0: -2, y1: 3, ...cur(x => Math.log10(x)), pts: [[1, 0], [10, 1]] },
      { pick: 'counting digits', ...P, x0: -20, x1: 120, y0: -2, y1: 3, ...cur(x => Math.log10(x)), pts: [[1, 0], [10, 1], [100, 2]], note: 'each digit is one step' }
    ]
  },
  'log laws': {
    say: 'They turn multiplying into adding. That is what made logarithms worth inventing, three centuries before calculators.',
    frames: [
      { pick: 'products', ...B, text: [[0, 0.6, 'log(ab) = log a + log b', '#16283f', 14]] },
      { pick: 'quotients', ...B, text: [[0, 0.6, 'log(a/b) = log a − log b', '#16283f', 14]] },
      { pick: 'powers', ...B, text: [[0, 0.6, 'log(aⁿ) = n log a', '#16283f', 15]] }
    ]
  },
  'sine': {
    say: 'The height of a point going round a circle, plotted against the angle. It repeats forever because the circle does.',
    frames: [
      { pick: 'one cycle', ...P, x0: -0.5, x1: 6.8, y0: -2, y1: 2, ...cur(Math.sin) },
      { pick: 'and on', ...P, x0: -0.5, x1: 20, y0: -2, y1: 2, ...cur(Math.sin), note: 'repeating' }
    ]
  },
  'cosine': {
    say: 'The across-ness of the same circling point. The identical wave, started a quarter turn earlier.',
    frames: [
      { pick: 'cosine', ...P, x0: -6.5, x1: 6.5, y0: -2, y1: 2, ...cur(Math.cos) },
      { pick: 'against sine', ...P, x0: -6.5, x1: 6.5, y0: -2, y1: 2, ...cur(Math.cos, Math.sin), note: 'a quarter turn apart' }
    ]
  },
  'tangent function': {
    say: 'Sine divided by cosine. Wherever cosine is zero it has nothing to give, so it breaks and starts again.',
    frames: [
      { pick: 'one branch', ...P, x0: -1.4, x1: 1.4, y0: -5, y1: 5, ...cur(Math.tan) },
      { pick: 'repeating', ...P, x0: -4.7, x1: 4.7, y0: -4, y1: 4, ...cur(Math.tan), lines: [{ x: Math.PI / 2, dash: true, c2: BAD }, { x: -Math.PI / 2, dash: true, c2: BAD }] }
    ]
  },
  'amplitude': {
    say: 'How far the wave reaches from its centre line. It changes the height and nothing else.',
    frames: [
      { pick: '1', ...P, x0: -6.5, x1: 6.5, y0: -3.5, y1: 3.5, ...cur(Math.sin) },
      { pick: '2.5', ...P, x0: -6.5, x1: 6.5, y0: -3.5, y1: 3.5, ...cur(x => 2.5 * Math.sin(x), Math.sin), note: 'taller, same timing' }
    ]
  },
  'period': {
    say: 'The horizontal length of one full repeat. Changing it stretches the wave sideways without changing its height.',
    frames: [
      { pick: 'one repeat', ...P, x0: -0.5, x1: 13, y0: -2, y1: 2, ...cur(Math.sin), segs: [[0, -1.6, 2 * Math.PI, -1.6, IN, false, 3]] },
      { pick: 'half as long', ...P, x0: -0.5, x1: 13, y0: -2, y1: 2, ...cur(x => Math.sin(2 * x), Math.sin), segs: [[0, -1.6, Math.PI, -1.6, IN, false, 3]], note: 'twice as often' }
    ]
  },
  'phase shift': {
    say: 'The wave slid sideways. Nothing about its shape changes; only where it starts.',
    frames: [
      { pick: 'unshifted', ...P, x0: -6.5, x1: 6.5, y0: -2, y1: 2, ...cur(Math.sin) },
      { pick: 'shifted', ...P, x0: -6.5, x1: 6.5, y0: -2, y1: 2, ...cur(x => Math.sin(x - 1.2), Math.sin), note: 'same wave, later' }
    ]
  },
  'frequency (of a wave)': {
    say: 'How many repeats fit into a given stretch. It is the period turned upside down.',
    frames: [
      { pick: 'once', ...P, x0: -0.5, x1: 13, y0: -2, y1: 2, ...cur(Math.sin) },
      { pick: 'twice as often', ...P, x0: -0.5, x1: 13, y0: -2, y1: 2, ...cur(x => Math.sin(2 * x), Math.sin) },
      { pick: 'three times', ...P, x0: -0.5, x1: 13, y0: -2, y1: 2, ...cur(x => Math.sin(3 * x), Math.sin) }
    ]
  },
  'radian measure': {
    say: 'Angle measured by the arc it cuts, in units of the radius. It is the measure that makes calculus of waves come out clean.',
    frames: [
      { pick: 'one radian', ...P, x0: -2.2, x1: 2.2, y0: -2.2, y1: 2.2, circles: [{ cx: 0, cy: 0, r: 1.5 }], segs: [[0, 0, 1.5, 0, '#5d6b7d', false, 1.6], [0, 0, 0.81, 1.26, IN, false, 2]], note: 'arc = radius' },
      { pick: 'a half turn', ...P, x0: -2.2, x1: 2.2, y0: -2.2, y1: 2.2, circles: [{ cx: 0, cy: 0, r: 1.5 }], segs: [[0, 0, 1.5, 0, '#5d6b7d', false, 1.6], [0, 0, -1.5, 0, IN, false, 2]], note: 'π radians' }
    ]
  },
  'degree measure': {
    say: 'A full turn cut into 360 parts. Older, more familiar, and arbitrary: 360 was chosen because it divides neatly.',
    frames: [
      { pick: '90°', ...P, x0: -2.2, x1: 2.2, y0: -2.2, y1: 2.2, circles: [{ cx: 0, cy: 0, r: 1.5 }], segs: [[0, 0, 1.5, 0, '#5d6b7d', false, 1.6], [0, 0, 0, 1.5, IN, false, 2]] },
      { pick: '180°', ...P, x0: -2.2, x1: 2.2, y0: -2.2, y1: 2.2, circles: [{ cx: 0, cy: 0, r: 1.5 }], segs: [[0, 0, 1.5, 0, '#5d6b7d', false, 1.6], [0, 0, -1.5, 0, IN, false, 2]], note: 'the same as π radians' }
    ]
  },
  'unit circle': {
    say: 'The circle of radius one. Every point on it hands you a cosine and a sine at once, which is where both come from.',
    frames: [
      { pick: 'at 45°', ...P, x0: -2, x1: 2, y0: -2, y1: 2, circles: [{ cx: 0, cy: 0, r: 1 }], pts: [[0.707, 0.707, '(cos, sin)']], segs: [[0, 0, 0.707, 0.707, IN, false, 1.6]] },
      { pick: 'at 120°', ...P, x0: -2, x1: 2, y0: -2, y1: 2, circles: [{ cx: 0, cy: 0, r: 1 }], pts: [[-0.5, 0.866, '(cos, sin)']], segs: [[0, 0, -0.5, 0.866, IN, false, 1.6]], note: 'cosine has gone negative' }
    ]
  },
  'periodicity': {
    say: 'Repeating the same shape at fixed intervals, forever. Knowing one cycle is knowing all of them.',
    frames: [
      { pick: 'one cycle', ...P, x0: -0.5, x1: 7, y0: -2, y1: 2, ...cur(Math.sin) },
      { pick: 'three', ...P, x0: -0.5, x1: 20, y0: -2, y1: 2, ...cur(Math.sin), lines: [{ x: 2 * Math.PI, dash: true, c2: IN }, { x: 4 * Math.PI, dash: true, c2: IN }], note: 'identical each time' }
    ]
  },
  'sinusoid': {
    say: 'Any wave of this shape, whatever its height, length and starting point. Sound, light and alternating current are all made of these.',
    frames: [
      { pick: 'plain', ...P, x0: -6.5, x1: 6.5, y0: -3.5, y1: 3.5, ...cur(Math.sin) },
      { pick: 'taller', ...P, x0: -6.5, x1: 6.5, y0: -3.5, y1: 3.5, ...cur(x => 2.4 * Math.sin(x), Math.sin) },
      { pick: 'and faster', ...P, x0: -6.5, x1: 6.5, y0: -3.5, y1: 3.5, ...cur(x => 2.4 * Math.sin(1.8 * x), Math.sin) },
      { pick: 'and shifted', ...P, x0: -6.5, x1: 6.5, y0: -3.5, y1: 3.5, ...cur(x => 2.4 * Math.sin(1.8 * x + 1), Math.sin) }
    ]
  }
};
