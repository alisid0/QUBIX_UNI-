// First proposed motion board. Drafted 2026-08-11 under founder permission to
// expand physics. No candidate is selected, approved or released.

export const selections = {};
export const finalised = {};
export const rejected = {};
export const gated = 'Proposed motion prerequisite before Force and Acceleration. Every candidate is AI_DRAFT and awaits founder selection; prerequisites, placement and approval remain open. It must remain outside the learner build.';

export const motion = {
  id: 'PHY-MOTION-001',
  title: 'Speed and Velocity',
  objective: 'The learner distinguishes speed, which records how fast, from velocity, which records both speed and direction.',
  prerequisites: 'Provisional: divide whole numbers, read metres and seconds, and recognise left/right direction. Formal prerequisite mapping remains open.',
  misconception: 'Velocity is not merely a more scientific word for speed. Two objects can have equal speeds and different velocities, and a round trip can have positive average speed but zero average velocity.',
  fork: 'Calculate speed first, add direction without changing the magnitude, then expose the distinction with a round trip.',
  structure: 'Three sections: distance per time, direction, and average motion over a complete trip.',
  sourceMatrix: [{
    work: 'Paul Peter Urone and Roger Hinrichs, OpenStax Physics (2020), §2.2 Speed and Velocity',
    role: 'Defines speed as distance per time, velocity as speed with direction, and contrasts average speed with average velocity on a round trip.',
    treatment: 'Paraphrased with attribution under CC BY. Wording, numbers, controls and graphics are Qubix-original; no OpenStax exercise or artwork is reused.',
    url: 'https://openstax.org/books/physics/pages/2-2-speed-and-velocity'
  }],
  changeRecord: { date: '2026-08-11', authority: 'Founder instruction to create more physics', effect: 'Creates one unselected gated motion board, provisionally before Force and Acceleration. No approval, placement or release.' },
  sections: [
    {
      code: 'S1', name: 'Speed is distance per time', sources: [],
      readings: [
        { code: 'S1-A', text: 'Speed describes how fast an object moves. Measure the distance travelled and divide by the time taken. Forty metres in ten seconds is 4 metres per second.' },
        { code: 'S1-B', text: 'A speed of 4 m/s means four metres of distance are covered for every second of travel. Change either the distance or the time and the average speed may change.' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'motion-rate', note: 'Change distance and time independently. A segmented track and division readout update together.' },
        { code: 'S1-I2', kind: 'motion-race', note: 'Apply the same five-second interval to runners at 2, 4 and 6 m/s. Their travelled distances make the rate visible.' }
      ],
      exercises: [
        { code: 'S1-X1', kind: 'choice', prompt: 'A cyclist travels 30 m in 5 s. What is the average speed?', options: [{ label: '6 m/s', correct: true }, { label: '25 m/s', feedback: 'That subtracts time from distance instead of dividing.' }, { label: '150 m/s', feedback: 'That multiplies. Speed asks how much distance belongs to each second.' }], successNote: '30 ÷ 5 = 6 m/s.' },
        { code: 'S1-X2', kind: 'choice', prompt: 'Two runners cover the same distance. Which has the greater average speed?', options: [{ label: 'The runner who takes less time', correct: true }, { label: 'The runner who takes more time', feedback: 'The same distance spread over more time gives a smaller speed.' }, { label: 'They must have equal speed', feedback: 'Equal distance alone is not enough; time matters too.' }], successNote: 'For equal distance, less time means greater average speed.' }
      ]
    },
    {
      code: 'S2', name: 'Velocity includes direction', sources: [],
      readings: [
        { code: 'S2-A', text: 'Velocity describes both how fast and in which direction. Moving right at 4 m/s and moving left at 4 m/s have the same speed but different velocities.' },
        { code: 'S2-B', text: 'Speed gives a magnitude only. Add a direction and it becomes velocity. A change of direction is therefore a change of velocity even when the speedometer reading stays fixed.' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'velocity-direction', note: 'Hold speed at 4 m/s and reverse direction. The arrow and velocity label change while the speed card stays fixed.' },
        { code: 'S2-I2', kind: 'velocity-twins', note: 'Two movers travel at equal speed in opposite directions. A side-by-side comparison isolates direction as the only difference.' }
      ],
      exercises: [
        { code: 'S2-X1', kind: 'choice', prompt: 'Car A moves east at 5 m/s. Car B moves west at 5 m/s. What is the same?', options: [{ label: 'Their speed', correct: true }, { label: 'Their velocity', feedback: 'Velocity includes direction, and their directions differ.' }, { label: 'Their final position', feedback: 'Equal speed does not place them at the same position.' }], successNote: 'Both speeds are 5 m/s; the velocities point in opposite directions.' },
        { code: 'S2-X2', kind: 'choice', prompt: 'A car turns around while keeping its speed at 3 m/s. What changes?', options: [{ label: 'Its velocity', correct: true }, { label: 'Only its speed', feedback: 'The speed remains 3 m/s; the direction changes.' }, { label: 'Neither speed nor velocity', feedback: 'Changing direction changes velocity.' }], successNote: 'Velocity changes whenever direction changes.' }
      ]
    },
    {
      code: 'S3', name: 'A round trip separates them', sources: [],
      readings: [
        { code: 'S3-A', text: 'Distance counts the whole route. Displacement compares the finishing position with the starting position. Return to the start and displacement is zero, even though distance was travelled.' },
        { code: 'S3-B', text: 'Average speed uses total distance. Average velocity uses displacement. On an out-and-back trip, average speed is positive while average velocity is zero because the final position is the starting position.' }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'motion-round-trip', note: 'Run a fixed 20 m out-and-back journey. Distance reaches 40 m while displacement returns to zero.' },
        { code: 'S3-I2', kind: 'motion-trip-builder', note: 'Build a route in 10 m right/left steps. Distance, displacement, average speed and average velocity update after every one-second step.' }
      ],
      exercises: [
        { code: 'S3-X1', kind: 'choice', prompt: 'A walker goes 20 m east and returns 20 m west to the start. What distance was travelled?', options: [{ label: '40 m', correct: true }, { label: '0 m', feedback: 'Zero is the displacement. Distance counts both parts of the route.' }, { label: '20 m', feedback: 'That counts only one half of the trip.' }], successNote: '20 m out plus 20 m back gives 40 m of distance.' },
        { code: 'S3-X2', kind: 'choice', prompt: 'For that complete round trip, what is the average velocity?', options: [{ label: '0 m/s', correct: true }, { label: 'A positive value', feedback: 'The displacement is zero, so displacement divided by time is zero.' }, { label: 'The same as average speed', feedback: 'Average speed uses distance; average velocity uses displacement.' }], successNote: 'The final and starting positions match, so displacement and average velocity are zero.' }
      ]
    }
  ],
  closing: 'Next proposed physics board: Acceleration as Change in Velocity, connecting this motion language to Force and Acceleration.'
};
