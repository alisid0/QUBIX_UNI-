// First proposed board in the plane-geometry prerequisite sequence.
// Drafted 2026-08-11 from an exact reading of Wentworth's Gutenberg
// transcription. No candidate has been selected, approved or released.

export const selections = {
  'S1-B': '2026-08-11',
  'S1-I1': '2026-08-11',
  'S1-I2': '2026-08-11',
  'S1-X1': '2026-08-11',
  'S1-X2': '2026-08-11',
  'S2-B': '2026-08-11',
  'S2-I1': '2026-08-11',
  'S2-X1': '2026-08-11',
  'S2-X2': '2026-08-11',
  'S3-I1': '2026-08-11',
  'S3-X1': '2026-08-11',
  'S3-X2': '2026-08-11'
};
export const finalised = {};
export const rejected = {};
export const gated = 'Proposed prerequisite for triangles, circles and trigonometry. Founder selections are recorded, but S3 still needs a reading; curriculum placement, edition review and approval remain open. It must remain outside the learner build.';

export const angles = {
  id: 'GEO-ANGLE-001',
  title: 'Angles and Turns',
  objective: 'The learner predicts and observes that an angle measures the amount of turn between two rays, independently of their length, then compares angles with a right angle.',
  prerequisites: 'Provisional: recognise a point and a straight line; read and compare whole numbers to 180. Formal prerequisite mapping remains open.',
  misconception: 'Longer arms do not make a larger angle. The opening, or amount of turn, determines its size.',
  fork: 'Begin with physical rotation, isolate arm length as irrelevant, then use the right angle as the first benchmark.',
  structure: 'Three sections: make a turn, hold the turn while length changes, then compare with 90°.',
  sourceMatrix: [
    {
      work: 'George Wentworth, Plane Geometry, Project Gutenberg 33063, scans 018–022',
      role: 'Defines a plane angle by its opening, separates angle size from side length, treats angle as rotation, and introduces degrees.',
      treatment: 'Short quotations are recorded in the source shelf; board prose, diagrams, controls and checks are Qubix-original. Historical-edition review remains a release gate.',
      url: 'https://www.gutenberg.org/ebooks/33063'
    }
  ],
  changeRecord: {
    date: '2026-08-11',
    authority: 'Founder instruction to begin the expansion and founder candidate selections',
    effect: 'Creates one gated Factory board and records twelve selected candidates. Both S1 interaction variants are retained. No approval, curriculum placement or release.'
  },
  sections: [
    {
      code: 'S1', name: 'An angle is a turn', sources: ['G6', 'G7'],
      readings: [
        { code: 'S1-A', text: 'Keep one ray still and turn the other around their shared point. The angle records how far the moving ray has turned. A quarter-turn is 90°, and a half-turn is 180°.' },
        { code: 'S1-B', text: 'An angle begins with two rays meeting at one point, the vertex. Imagine one ray rotating away from the other: the amount of rotation is the size of the angle, measured in degrees.' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'angle-turn', note: 'Selected. Change the angle in 15° steps. At 90°, the curved arc is replaced by the perpendicular square.' },
        { code: 'S1-I2', kind: 'angle-benchmarks', note: 'Selected alongside I1. Change between 30°, 60°, 90°, 120° and 180°; 90° uses the perpendicular square.' }
      ],
      exercises: [
        { code: 'S1-X1', kind: 'choice', prompt: 'Which description tells the size of an angle?', options: [
          { label: 'How far one ray turns from the other', correct: true },
          { label: 'How long its rays are', feedback: 'Ray length can change while the turn stays fixed.' },
          { label: 'Where the vertex sits on the page', feedback: 'Moving the whole figure does not change its opening.' }
        ], successNote: 'The angle measures the turn between the rays.' },
        { code: 'S1-X2', kind: 'choice', prompt: 'A quarter of a complete turn measures:', options: [
          { label: '90°', correct: true }, { label: '45°', feedback: '45° is one eighth of a complete turn.' }, { label: '180°', feedback: '180° is a half-turn.' }
        ], successNote: 'Four quarter-turns make 360°, so each one is 90°.' }
      ]
    },
    {
      code: 'S2', name: 'Length does not change the angle', sources: ['G5'],
      readings: [
        { code: 'S2-A', text: 'Stretch or shorten either ray without turning it. The rays look different, but their opening is unchanged. Angle size depends on the opening, not on the length of the sides.' },
        { code: 'S2-B', text: 'The arms of an angle only show its direction. Making them longer can make the drawing look larger, but it does not add any turn and therefore does not add any degrees.' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'angle-length', note: 'The angle stays at 60° while both arm lengths change. The invariant degree readout directly challenges the longer-means-larger misconception.' },
        { code: 'S2-I2', kind: 'angle-length-compare', note: 'Two angles deliberately conflict in visual footprint: a short 100° angle and a long 50° angle. Reveal which is mathematically larger.' }
      ],
      exercises: [
        { code: 'S2-X1', kind: 'choice', prompt: 'A 60° angle has both arms doubled in length. What is its new size?', options: [
          { label: '60°', correct: true }, { label: '120°', feedback: 'The arms doubled, but the turn did not.' }, { label: '30°', feedback: 'Shortening or lengthening the arms does not divide the turn.' }
        ], successNote: 'Same opening, same angle: 60°.' },
        { code: 'S2-X2', kind: 'choice', prompt: 'One angle has long arms and measures 50°. Another has short arms and measures 100°. Which is larger?', options: [
          { label: 'The short-armed 100° angle', correct: true }, { label: 'The long-armed 50° angle', feedback: 'Its drawing reaches farther, but its opening is smaller.' }, { label: 'They are equal', feedback: '100° is twice the turn of 50°.' }
        ], successNote: 'Compare the turns, not the arm lengths.' }
      ]
    },
    {
      code: 'S3', name: 'Use a right angle as a benchmark', sources: ['G7'],
      readings: [
        { code: 'S3-A', text: 'A right angle is a quarter-turn: 90°. An angle smaller than 90° is acute. An angle larger than 90° but smaller than 180° is obtuse.' },
        { code: 'S3-B', text: 'Use the square corner as a benchmark. If the opening fits inside 90°, call it acute. If it opens beyond 90° but has not reached a straight 180°, call it obtuse.' }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'angle-right-compare', note: 'Move a ray in 15° steps while a dashed 90° reference remains fixed. The name updates only after the comparison is visible.' },
        { code: 'S3-I2', kind: 'angle-sort', note: 'Cycle through six angles and classify each as acute, right or obtuse before revealing the answer.' }
      ],
      exercises: [
        { code: 'S3-X1', kind: 'choice', prompt: 'Which angle is obtuse?', options: [
          { label: '120°', correct: true }, { label: '90°', feedback: '90° is exactly a right angle.' }, { label: '45°', feedback: '45° is smaller than a right angle, so it is acute.' }
        ], successNote: '120° is greater than 90° and less than 180°.' },
        { code: 'S3-X2', kind: 'choice', prompt: 'An angle fits entirely inside a right angle. What can you conclude?', options: [
          { label: 'It is acute', correct: true }, { label: 'It is obtuse', feedback: 'An obtuse angle opens beyond the right-angle benchmark.' }, { label: 'Its arms must be short', feedback: 'The classification says nothing about arm length.' }
        ], successNote: 'Less than 90° means acute.' }
      ]
    }
  ],
  closing: 'Next proposed board: triangles, where angles become properties of a whole shape rather than isolated turns.'
};
