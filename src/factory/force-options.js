// Factory options for the first proposed physics board.
// Drafted on founder instruction, 2026-08-11. S1 and S2 selections were made
// by the founder later that day. The founder then selected the replacement S3
// reading, both interactions and both exercises. Nothing is approved or
// released.
//
// SOURCE TREATMENT
// - OpenStax supplies the modern statement of Newton's second law and the
//   fixed-mass force/acceleration proportionality.
// - The wording, numbers, stick figure, block, motion trace and game controls
//   are Qubix-original. No OpenStax exercise, example or artwork is copied.
// - The founder-supplied stickman target-game proposal is design context, not a
//   source of physics claims, and none of its damaged starter code is reused.

export const selections = {
  'S1-A': '2026-08-11',
  'S1-I1': '2026-08-11',
  'S1-X1': '2026-08-11',
  'S1-X2': '2026-08-11',
  'S2-A': '2026-08-11',
  'S2-I2': '2026-08-11',
  'S2-X1': '2026-08-11',
  'S2-X2': '2026-08-11',
  'S3-B': '2026-08-11',
  'S3-I1': '2026-08-11',
  'S3-I2': '2026-08-11',
  'S3-X1': '2026-08-11',
  'S3-X2': '2026-08-11'
};
export const finalised = {};
export const rejected = {};
export const gated = 'Proposed physics introduction. The founder has selected the content for all three sections, but its curriculum position, prerequisites and formal approval remain open. It must remain outside the learner build.';

export const force = {
  id: 'PHY-FORCE-001',
  title: 'Force and Acceleration',
  objective: 'By changing one quantity at a time, the learner predicts and observes how net force and mass affect acceleration.',
  prerequisites: 'Provisional: read whole numbers, compare distances, and recognise that speed can change. Formal prerequisite mapping remains open.',
  misconception: 'The same force does not produce the same acceleration for every mass, and acceleration is present only while the net force acts.',
  fork: 'S1 and S2 hold mass fixed while force changes. S3 holds force fixed while mass changes. Push duration stays fixed throughout; friction and stopping distance are withheld.',
  structure: 'Three short sections: observe one push, compare forces at fixed mass, then compare masses at fixed force.',
  sourceMatrix: [
    {
      work: 'Paul Peter Urone and Roger Hinrichs, OpenStax Physics, 2020, §4.3 Newton’s Second Law of Motion',
      role: 'States the relationship among net external force, mass and acceleration, including how acceleration changes with force and mass.',
      treatment: 'Paraphrased with attribution under CC BY 4.0. Interaction, examples and artwork are original.',
      url: 'https://openstax.org/books/physics/pages/4-3-newtons-second-law-of-motion'
    }
  ],
  changeRecord: {
    date: '2026-08-11',
    authority: 'Founder selection of S1/S2, instruction to replace S3, and selection of the replacement S3 candidates',
    effect: 'Records thirteen selected candidates across all three sections; no curriculum placement, approval or release.'
  },
  sections: [
    {
      code: 'S1',
      name: 'One fixed-time push',
      sources: [],
      readings: [
        {
          code: 'S1-A',
          text: 'The block has a mass of 2 kg. Every push lasts exactly one second. Choose a force, predict what will happen, then watch how quickly the block gains speed while the force acts.'
        },
        {
          code: 'S1-B',
          text: 'A force changes velocity. The rate of that change is acceleration. Here the block and the push time never change, so differences in motion come from the force you chose.'
        }
      ],
      interactions: [
        {
          code: 'S1-I1', kind: 'force-push',
          note: 'The simplest pusher. Choose 2 N, 4 N or 6 N, then apply the force for one fixed second. The force arrow, acceleration and travelled distance change together.'
        },
        {
          code: 'S1-I2', kind: 'force-vector',
          note: 'The same experiment with a stronger visual emphasis on the force arrow. Better if the direction and size of the applied force need to be read before the motion.'
        }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'The same 2 kg block receives each push for one second. Which force gives it the greatest acceleration?',
          options: [
            { label: '6 N', correct: true },
            { label: '4 N', feedback: 'That accelerates the block, but a greater force is available.' },
            { label: '2 N', feedback: 'With the same mass, the smallest force gives the smallest acceleration.' }
          ],
          successNote: 'With mass fixed, greater force gives greater acceleration.'
        },
        {
          code: 'S1-X2', kind: 'choice',
          prompt: 'Why do these trials make a fair comparison of force?',
          options: [
            { label: 'Mass and push time stay fixed', correct: true },
            { label: 'Every block travels the same distance', feedback: 'Distance is an outcome here, not something held fixed.' },
            { label: 'The force stays fixed', feedback: 'Force is the quantity deliberately changed.' }
          ],
          successNote: 'Only the force changes between trials.'
        }
      ]
    },
    {
      code: 'S2',
      name: 'Greater force, greater acceleration',
      sources: [],
      readings: [
        {
          code: 'S2-A',
          text: 'For a 2 kg block, a 2 N force produces 1 m/s² of acceleration. Doubling the force to 4 N doubles the acceleration to 2 m/s². The mass has not changed.'
        },
        {
          code: 'S2-B',
          text: 'Compare the trials rather than memorising one result. When the same mass receives twice the force, its velocity changes twice as quickly during the push.'
        }
      ],
      interactions: [
        {
          code: 'S2-I1', kind: 'force-compare',
          note: 'Each completed push stays in a trial strip, so 2 N, 4 N and 6 N can be compared without relying on memory.'
        },
        {
          code: 'S2-I2', kind: 'force-bars',
          note: 'Adds proportional force and acceleration bars beside the moving block. The numerical relationship is clearer, at the cost of a busier stage.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'A 2 N force gives this block an acceleration of 1 m/s². What acceleration should a 4 N force give the same block?',
          options: [
            { label: '2 m/s²', correct: true },
            { label: '4 m/s²', feedback: 'That copies the force value instead of comparing it with the fixed 2 kg mass.' },
            { label: '1 m/s²', feedback: 'The mass stayed fixed, but the force doubled.' }
          ],
          successNote: 'Double the force on the same mass and the acceleration doubles.'
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'During the same one-second push, which trial should travel farthest from rest?',
          options: [
            { label: 'The 6 N trial', correct: true },
            { label: 'The 2 N trial', feedback: 'That trial gains speed most slowly.' },
            { label: 'They all travel equally far', feedback: 'The push time matches, but their accelerations do not.' }
          ],
          successNote: 'The greatest acceleration produces the greatest change of velocity during the fixed time.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'Same force, different masses',
      sources: [],
      readings: [
        {
          code: 'S3-A',
          text: 'Now keep the force fixed at 6 N and change the block instead. Apply the same one-second push to masses of 2 kg, 4 kg and 6 kg, then compare how quickly each block gains speed.'
        },
        {
          code: 'S3-B',
          text: 'The same force has less effect on a greater mass. With 6 N applied, the 2 kg block accelerates at 3 m/s², the 4 kg block at 1.5 m/s² and the 6 kg block at 1 m/s².'
        }
      ],
      interactions: [
        {
          code: 'S3-I1', kind: 'mass-push',
          note: 'Choose a 2 kg, 4 kg or 6 kg block, then apply the same 6 N force for one second. The acceleration and travelled distance reveal the effect of changing mass.'
        },
        {
          code: 'S3-I2', kind: 'mass-race',
          note: 'Apply 6 N to all three masses together. Parallel tracks make the fair comparison visible without requiring the learner to remember separate trials.'
        }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'The same 6 N force is applied to all three blocks. Which mass has the greatest acceleration?',
          options: [
            { label: '2 kg', correct: true },
            { label: '4 kg', feedback: 'The 4 kg block accelerates, but less than the lighter block.' },
            { label: '6 kg', feedback: 'The greatest mass has the smallest acceleration under the same force.' }
          ],
          successNote: 'With force fixed, the smallest mass has the greatest acceleration.'
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'A 6 N force acts on the 6 kg block. What acceleration does it produce?',
          options: [
            { label: '1 m/s²', correct: true },
            { label: '6 m/s²', feedback: 'That copies the force value and ignores the mass.' },
            { label: '3 m/s²', feedback: 'That is the acceleration of the lighter 2 kg block.' }
          ],
          successNote: 'a = F ÷ m = 6 N ÷ 6 kg = 1 m/s².'
        }
      ]
    }
  ]
};
