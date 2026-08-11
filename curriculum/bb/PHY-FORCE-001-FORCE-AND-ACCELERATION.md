# Force and Acceleration

Status: `AI_DRAFT`, gated; founder-directed live pilot
Identifier: `PHY-FORCE-001`
Factory key: `force`
Course position: proposed physics strand, not placed
Drafted: 2026-08-11 on founder instruction

## One learning objective

By changing one quantity at a time, the learner predicts and observes how net
force and mass affect acceleration.

S1 and S2 change force while mass remains 2 kg. S3 changes mass while force
remains 6 N. Every push lasts one second. The board does not teach friction,
impulse, momentum, stopping distance or gravity.

## Provisional prerequisites

- read whole numbers and the unit labels N, kg and m/s²;
- compare distances;
- recognise that an object's velocity can change.

These are provisional statements, not approved prerequisite nodes. The board
cannot be placed or released until the prerequisite map is extended.

## Source record

- Authors: Paul Peter Urone and Roger Hinrichs
- Title: *Physics*
- Publisher: OpenStax, Houston, Texas
- Publication date: 26 March 2020
- Passage: §4.3, “Newton's Second Law of Motion”
- Stable record: https://openstax.org/books/physics/pages/4-3-newtons-second-law-of-motion
- Licence record: https://openstax.org/books/physics/pages/preface
- Licence: Creative Commons Attribution 4.0 International

Retained: net external force, mass and acceleration are related by `F = ma`; at
fixed mass, greater force produces proportionally greater acceleration, and at
fixed force, greater mass produces less acceleration.

Modern treatment: the relationship is isolated in a one-dimensional,
friction-free simulation. All learner wording, numerical examples, controls,
stick-figure artwork and motion graphics are Qubix-original. No OpenStax
exercise, example or artwork is copied.

## Interaction specification

- S1 and S2 block mass: 2 kg, fixed.
- S1 and S2 applied force choices: 2 N, 4 N and 6 N.
- Push duration: one second, fixed.
- S1 and S2 resulting acceleration: 1 m/s², 2 m/s² and 3 m/s² respectively.
- S3 applied force: 6 N, fixed.
- S3 mass choices: 2 kg, 4 kg and 6 kg.
- S3 resulting acceleration: 3 m/s², 1.5 m/s² and 1 m/s² respectively.
- Motion begins from rest with friction disabled.
- Distance shown during the force interval follows `d = ½at²`. It is evidence
  of the acceleration, not a second formula to memorise.
- S3 offers a single-block mass selector and a parallel three-block comparison.

The complete candidate readings, interactions, exercises and authoring notes
are in `src/factory/force-options.js`. The founder selected `S1-A`, `S1-I1`,
`S1-X1`, `S1-X2`, `S2-A`, `S2-I2`, `S2-X1`, `S2-X2`, `S3-B`, both S3
interactions and both S3 exercises.

## Misconception to watch

The same force does not produce the same acceleration for every mass. A
stronger push also does not give an object a permanently greater acceleration.
Acceleration is present while the net force acts; after this one-second force
interval the board stops the trial rather than pretending it continues.

## Amendment history

| Date | Change | Authority |
|---|---|---|
| 2026-08-11 | Founder supplied a proposal for a stickman force game and instructed that it be brought to life. | Founder |
| 2026-08-11 | Scope narrowed to fixed mass and fixed push duration; friction and stopping-target mechanics deferred. | AI, pedagogical safeguard |
| 2026-08-11 | OpenStax §4.3 and its CC BY 4.0 licence recorded; all interaction material written afresh. | AI |
| 2026-08-11 | Founder selected eight S1/S2 candidates and instructed that S3 be rebuilt around 2 kg, 4 kg and 6 kg masses under the same force. | Founder |
| 2026-08-11 | S3 target-force game replaced by fixed 6 N single-mass and parallel-mass experiments. | AI, implementing founder direction |
| 2026-08-11 | Founder selected `S3-B`, `S3-I1`, `S3-I2`, `S3-X1` and `S3-X2`. | Founder |
| 2026-08-11 | Founder instructed that the complete kept sheet be added to the learner app and deployed live. This is publication for testing, not `APPROVED` or `RELEASED`. | Founder |

## Founder review

- [ ] The learning objective is small enough.
- [ ] The provisional prerequisites are correct.
- [ ] The source and attribution record are acceptable.
- [x] S1 and S2 readings, interactions and exercises are selected.
- [x] The S3 reading, both interactions and both exercises are selected.
- [ ] The board is given an approved curriculum position.
- [ ] Founder marks the board `APPROVED`.

Until those decisions are explicit, this board remains `AI_DRAFT` and gated. It
is present in the learner pilot only under the founder's explicit testing
instruction; it is not `APPROVED` or `RELEASED` curriculum.
