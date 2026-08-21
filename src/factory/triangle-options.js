// Second proposed board in the plane-geometry prerequisite sequence.
// Drafted 2026-08-11 under the founder's explicit permission to plan and create
// the next lesson. No candidate is selected, approved or released.

export const selections = {
  'S1-A': '2026-08-11',
  'S1-I1': '2026-08-11',
  'S1-I2': '2026-08-11',
  'S1-X1': '2026-08-11',
  'S1-X2': '2026-08-11',
  'S2-B': '2026-08-11',
  'S2-I3': '2026-08-11',
  'S2-X1': '2026-08-11',
  'S2-X2': '2026-08-11',
  'S3-A': '2026-08-11',
  'S3-I1': '2026-08-11',
  'S3-I2': '2026-08-11'
};
export const finalised = {};
export const rejected = {
  'S2-I1': 'Founder, 2026-08-11: combine with S2-I2 rather than keep as a separate stage. Superseded by S2-I3.',
  'S2-I2': 'Founder, 2026-08-11: combine with S2-I1 rather than keep as a separate stage. Superseded by S2-I3.'
};
export const gated = 'Proposed prerequisite after Angles and Turns and before circles or trigonometry. Founder selections are recorded, but the requested S3-X3 does not exist and the exercise slot remains open; prerequisites, edition review, placement and approval also remain open. It must remain outside the learner build.';

export const triangleAngles = {
  id: 'GEO-TRIANGLE-001',
  title: 'Angle Sum of a Triangle',
  objective: 'The learner changes a triangle, observes that its three interior angles still total 180°, and uses that invariant to find one missing angle.',
  prerequisites: 'Provisional: recognise rays, vertices, degrees, right angles and straight angles; add and subtract whole numbers to 180. The preceding Angles and Turns board is not yet complete or approved.',
  misconception: 'Changing the shape of a triangle changes its individual angles, but not their total. The 180° rule applies to the three interior angles, not to any three angles near the figure.',
  fork: 'Observe three changing angles first, physically line their corner turns into a straight angle, then use the invariant as a calculation tool.',
  structure: 'Three sections, one triangle relationship: identify its interior angles, see why their sum is 180°, then find a missing angle.',
  sourceMatrix: [
    {
      work: 'G. A. Wentworth, Plane Geometry, revised edition, Ginn & Company, 1899, Book I, scans 039–041',
      role: 'Defines the angles of a triangle, states their sum as two right angles, and derives the missing-angle rule.',
      treatment: 'Three short exact passages are recorded in the source shelf. Learner prose, numerical examples, diagrams, controls and exercises are Qubix-original. Gutenberg establishes US public-domain availability; UK and launch-territory edition review remains a release gate.',
      url: 'https://www.gutenberg.org/ebooks/33063'
    }
  ],
  changeRecord: {
    date: '2026-08-11',
    authority: 'Founder permission to create the board, followed by founder candidate selections and an instruction to combine S2-I1 with S2-I2',
    effect: 'Records twelve selected candidates and replaces the two S2 interaction variants with selected S2-I3. S3 exercise selection remains unresolved because S3-X3 does not exist. No approval, curriculum placement or learner release.'
  },
  sections: [
    {
      code: 'S1', name: 'The three interior angles', sources: ['G8'],
      readings: [
        { code: 'S1-A', text: 'A triangle has three sides meeting at three vertices. At each vertex, the two sides enclose an interior angle. Move one vertex and all three angles may change, but they remain the three angles inside the triangle.' },
        { code: 'S1-B', text: 'Look inside the triangle at each corner. Those three openings are its interior angles. Stretching or leaning the triangle changes their sizes without changing the fact that there are exactly three.' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'triangle-shape', note: 'Change the apex position and height with two accessible sliders. All three labelled angle measures update from the actual geometry.' },
        { code: 'S1-I2', kind: 'triangle-presets', note: 'Switch among wide, tall, leaning and right-angled triangles. Faster comparison with less continuous control.' }
      ],
      exercises: [
        { code: 'S1-X1', kind: 'choice', prompt: 'Which angles are the interior angles of a triangle?', options: [
          { label: 'The three openings inside its three vertices', correct: true },
          { label: 'Any three angles drawn near it', feedback: 'They must be formed inside the triangle by its own sides.' },
          { label: 'Only the largest angle', feedback: 'Every vertex contributes one interior angle.' }
        ], successNote: 'One interior angle sits at each of the triangle’s three vertices.' },
        { code: 'S1-X2', kind: 'choice', prompt: 'When the top vertex moves sideways, what can change?', options: [
          { label: 'The sizes of all three interior angles', correct: true },
          { label: 'The triangle gains a fourth interior angle', feedback: 'It still has three vertices and three interior angles.' },
          { label: 'Angles stop being measured in degrees', feedback: 'The unit stays degrees even when the shape changes.' }
        ], successNote: 'The individual angles can change as the triangle changes shape.' }
      ]
    },
    {
      code: 'S2', name: 'Three corners make a straight angle', sources: ['G9'],
      readings: [
        { code: 'S2-A', text: 'Take the three corner turns from the triangle and place them side by side. Together they fill one side of a straight line: 180°. Change the triangle and the pieces change, but they still complete the same straight angle.' },
        { code: 'S2-B', text: 'The triangle’s angles do not keep the same individual sizes. Their total is what stays fixed. The three interior angles always add to two right angles, which is 180°.' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'triangle-corners', note: 'A single action moves three colour-and-letter-coded corner wedges from the triangle onto a straight baseline. The visual argument precedes the equation.' },
        { code: 'S2-I2', kind: 'triangle-sum-strip', note: 'A 180° strip is partitioned live into A, B and C. Change the triangle above and the three widths redistribute without leaving a gap.' },
        { code: 'S2-I3', kind: 'triangle-corners-sum', note: 'Founder-directed combination. First line up the three corners to make 180°. Then switch among triangle shapes and watch the same straight-angle partition redistribute without a gap.' }
      ],
      exercises: [
        { code: 'S2-X1', kind: 'choice', prompt: 'A triangle changes from tall and narrow to low and wide. What happens to the sum of its interior angles?', options: [
          { label: 'It remains 180°', correct: true }, { label: 'It becomes larger', feedback: 'Some angles grow while others shrink; their total stays fixed.' }, { label: 'It depends on the side lengths', feedback: 'Every ordinary plane triangle has the same interior-angle total.' }
        ], successNote: 'Shape changes redistribute the 180°; they do not change it.' },
        { code: 'S2-X2', kind: 'choice', prompt: 'Why does lining up the three corner turns matter?', options: [
          { label: 'They exactly form a straight angle', correct: true }, { label: 'They become three right angles', feedback: 'Their total is two right angles, not three.' }, { label: 'It makes all three angles equal', feedback: 'They keep their different sizes while filling the straight angle.' }
        ], successNote: 'A straight angle measures 180°, so the three pieces total 180°.' }
      ]
    },
    {
      code: 'S3', name: 'Find the missing angle', sources: ['G10'],
      readings: [
        { code: 'S3-A', text: 'If two angles are known, add them and subtract their sum from 180°. The remainder must be the third angle because all three have to complete the straight angle.' },
        { code: 'S3-B', text: 'Think of 180° as the whole. Two angles occupy part of it; the missing angle fills the gap. So C = 180° − A − B.' }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'triangle-missing', note: 'Change two known angles in 5° steps. The third stays hidden until requested, then appears as the exact remainder to 180°.' },
        { code: 'S3-I2', kind: 'triangle-target', note: 'A small goal round: choose a target for the missing angle and adjust A and B until the uncovered remainder hits it.' }
      ],
      exercises: [
        { code: 'S3-X1', kind: 'choice', prompt: 'A triangle has angles of 50° and 60°. What is the third angle?', options: [
          { label: '70°', correct: true }, { label: '110°', feedback: 'That is the sum of the two known angles. Subtract it from 180°.' }, { label: '80°', feedback: '50 + 60 + 80 is 190, which is too much.' }
        ], successNote: '180° − 50° − 60° = 70°.' },
        { code: 'S3-X2', kind: 'choice', prompt: 'A right triangle has one other angle of 35°. What is its remaining angle?', options: [
          { label: '55°', correct: true }, { label: '65°', feedback: '90 + 35 + 65 is 190, not 180.' }, { label: '145°', feedback: 'That subtracts only 35°. The 90° angle must also be removed from the whole.' }
        ], successNote: '180° − 90° − 35° = 55°.' }
      ]
    }
  ],
  closing: 'Next proposed board: Triangles by Sides and Angles, before circles and right-triangle trigonometry.'
};
