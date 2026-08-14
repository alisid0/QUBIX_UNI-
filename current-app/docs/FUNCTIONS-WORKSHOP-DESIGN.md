# Functions Workshop Design

## Purpose

The Functions workshop should turn the idea of a function into something the learner can operate, break, repair, graph, and reverse.

The current Functions BBs already frame functions well:

- Functions 1.0: a function is a rule machine
- Functions 1.1: one input must give one output
- Functions 1.2: function notation, `f(x)`
- Functions 1.3: domain and range
- Functions 1.4: vertical line test
- Functions 1.5: linear functions
- Functions 1.6: exponential functions
- Functions 1.7: quadratic functions
- Functions 1.8: inverse functions
- Functions 1.9: composite functions

The workshop should make those ideas usable. The learner should leave able to say:

"A function is a reliable input-output rule. I can test whether a relation is a function, read and use `f(x)`, understand safe inputs, recognize basic function shapes, reverse a rule when possible, and chain two rules together."

## Product Goal

This workshop should feel like a small machine shop, not a quiz.

It should sit beside Bit Machine, Unit Forge, and Bond Lab as one of the app's signature interactive labs. The user should touch the rule, see the output, and understand why the rule behaves that way.

The design should avoid school-exam dryness. It should feel like:

- a vending machine
- a rule box
- a graphing panel
- a broken machine diagnostic bench
- a two-machine conveyor belt

## Recommended Name

Primary name:

**Function Machine**

Alternatives:

- Rule Machine
- Function Forge
- Input Output Lab
- Machine of Rules

Recommendation: use **Function Machine**. It is clear, beginner-friendly, and fits the existing BB framing.

## Placement

Subject:

Mathematics

Module:

Functions

Path:

`MATH_FUNCTIONS`

Suggested module title:

**Function Machine**

Suggested module subtitle:

**Feed inputs, repair broken rules, read graphs, and chain machines together.**

Baby-step companion module (shipped):

**Functions basics** (`functions-basics`) — short MC/sorting practice that mirrors
BBs 1219–1228 before the learner enters the signature Function Machine lab.
Recommended order: read BBs → Functions basics → Function Machine → Transformation lab.

## Workshop Structure

The workshop should be one rich lab followed by shorter reinforcement steps.

Recommended order:

1. Function Machine Lab
2. One input, one output check
3. Function notation step
4. Domain and range step
5. Vertical line test step
6. Linear vs exponential vs quadratic recognition
7. Inverse function step
8. Composition step
9. Final challenge

The first step should be a custom Svelte component, similar in importance to `BitMachineLab`, `UnitForgeLab`, and `BondLab`.

Suggested component name:

`FunctionMachineLab.svelte`

Suggested interaction type:

`functionmachine`

## Core Lab Concept

The user sees a machine with:

- an input tray
- a rule card
- an output tray
- a small output table
- a graph panel
- a "broken machine" warning state

The learner can feed input numbers into the machine and watch outputs appear.

Example rule cards:

- `f(x) = x + 3`
- `f(x) = 2x`
- `f(x) = x^2`
- `f(x) = 2^x`
- `f(x) = x - 4`

The lab should not start with heavy algebra. It should start with "put a number in, see what comes out."

## Stage 1: Feed The Machine

Goal:

Understand that a function maps an input to an output.

Interaction:

The user taps input chips: `0`, `1`, `2`, `3`, `4`.

The current rule is:

`f(x) = x + 3`

The machine animates:

`2 -> machine -> 5`

The output table fills:

| x | f(x) |
|---|------|
| 0 | 3 |
| 1 | 4 |
| 2 | 5 |

Completion condition:

The user must feed three inputs and correctly predict one output.

Prompt:

"The machine adds 3 to every input. Feed it 2, then predict what comes out."

Correct feedback:

"Yes. The rule is reliable: the same input travels through the same rule and gives the same output."

Wrong feedback:

"Follow the rule inside the machine. Add 3 to the input before reading the output."

## Stage 2: Broken Machine

Goal:

Understand the one-input-one-output rule.

Interaction:

The user sees two machines:

Machine A:

`2 -> 5`

`3 -> 6`

`2 -> 5`

Machine B:

`2 -> 5`

`3 -> 6`

`2 -> 9`

The user must choose which one is broken.

Completion condition:

Choose Machine B.

Prompt:

"One machine is not a function. Find the broken one."

Correct feedback:

"Correct. Input 2 cannot sometimes give 5 and sometimes give 9. A function must be reliable for each input."

Wrong feedback:

"Look for the same input appearing twice with different outputs."

Design note:

This should be visual, not only text. The repeated input should glow when the user taps the broken machine.

## Stage 3: Function Notation

Goal:

Make `f(4)` feel like "feed 4 into machine f."

Interaction:

The machine is named `f`.

Rule:

`f(x) = 2x + 1`

The app shows cards:

- `f(0)`
- `f(2)`
- `f(4)`

The learner drags or taps the correct output:

- `1`
- `5`
- `9`

Completion condition:

Match three notation cards to outputs.

Prompt:

"Read `f(4)` as: put 4 into machine f."

Correct feedback:

"Good. `f(4)` means the output of machine f when the input is 4."

Wrong feedback:

"The number inside the brackets is the input. Put it into the rule first."

## Stage 4: Domain And Range Gate

Goal:

Understand domain as allowed inputs and range as possible outputs.

Interaction:

The machine has a safety sign:

Allowed inputs:

`0, 1, 2, 3, 4`

Rule:

`f(x) = x^2`

The user receives input chips:

`-1`, `0`, `2`, `4`, `6`

They must sort:

- allowed through the gate
- rejected by the domain

Then the app shows the outputs produced:

`0`, `4`, `16`

Completion condition:

Correctly sort the input chips, then identify the range from the accepted outputs.

Prompt:

"The domain is the safe input list. Only accepted inputs can enter the machine."

Correct feedback:

"Correct. The domain controls what may go in. The range is what actually comes out."

Wrong feedback:

"Check the allowed input sign before feeding the machine."

## Stage 5: Graph Scanner

Goal:

Understand that a function's input-output pairs can be drawn on a graph.

Interaction:

The user sees a coordinate grid with plotted points from `f(x) = x + 1`.

The table and graph are linked:

Tap row `(2, 3)` and the point glows.

Tap point `(4, 5)` and the row glows.

Completion condition:

Match three table rows to their graph points.

Prompt:

"Every input-output pair can become a point: `(x, f(x))`."

Correct feedback:

"Yes. A graph is the machine's table drawn as a picture."

Wrong feedback:

"The input is the horizontal coordinate. The output is the vertical coordinate."

## Stage 6: Vertical Line Test

Goal:

Identify whether a graph represents a function.

Interaction:

The user drags a vertical scan line across a graph.

Graphs:

- straight line: function
- parabola: function
- sideways circle/loop: not a function

If the scan line touches the graph more than once at the same x-position, red warning lights appear.

Completion condition:

The user correctly labels three graphs.

Prompt:

"A graph is a function only if each x-position has one output."

Correct feedback:

"Correct. If a vertical line hits twice, one input has two outputs."

Wrong feedback:

"Watch the vertical scanner. One x-position cannot split into two y-values."

## Stage 7: Shape Sorter

Goal:

Recognize linear, exponential, and quadratic behavior.

Interaction:

Three live mini-machines produce values:

Linear:

`x -> x + 2`

Exponential:

`x -> 2^x`

Quadratic:

`x -> x^2`

The user sorts output tables or graph cards into:

- steady add
- repeated multiply
- U-shaped square rule

Completion condition:

Sort all cards correctly.

Prompt:

"Different rules leave different fingerprints."

Correct feedback:

"Good. Linear adds steadily, exponential multiplies, and quadratic grows from squaring."

Wrong feedback:

"Compare the jumps between outputs. Are they steady, multiplying, or shaped by squaring?"

## Stage 8: Reverse Machine

Goal:

Understand inverse functions as running the rule backward.

Interaction:

Machine:

`f(x) = x + 5`

Forward:

`3 -> 8`

Reverse:

`8 -> ?`

The user chooses the reverse operation:

- subtract 5
- add 5
- multiply by 5

Second example:

`f(x) = 2x`

Reverse:

divide by 2

Completion condition:

Run two machines backward.

Prompt:

"An inverse undoes the machine."

Correct feedback:

"Correct. To reverse `add 5`, subtract 5. The inverse walks the output back to the input."

Wrong feedback:

"Ask what operation would undo the original rule."

Design note:

Do not introduce formal inverse notation too early. Show the action first, then reveal:

`f^-1(x)`

## Stage 9: Conveyor Belt Composition

Goal:

Understand composite functions.

Interaction:

Two machines sit in a row:

Machine `g`:

`g(x) = x + 2`

Machine `f`:

`f(x) = 3x`

The input enters `g` first, then `f`.

Example:

`2 -> g -> 4 -> f -> 12`

The user must predict the final output for a new input.

Completion condition:

Correctly run two chained examples.

Prompt:

"In `f(g(x))`, machine g runs first. Its output becomes f's input."

Correct feedback:

"Correct. The middle number matters: one machine hands its output to the next."

Wrong feedback:

"Run the inside machine first. `g(x)` happens before `f(...)`."

## Final Challenge

Goal:

Combine all the workshop ideas.

Format:

One compact challenge sequence:

1. Feed a value through a rule
2. Detect a broken input-output table
3. Pick the domain-safe input
4. Use the vertical line test
5. Reverse a simple machine
6. Chain two machines

Scoring:

Each correct answer gives the standard W reward flow through the Workshop system.

Suggested final prompt:

"Repair the function factory. Make every machine reliable before launch."

Completion message:

"Function Machine complete. You can now read a rule, test whether it behaves like a function, graph its outputs, reverse simple machines, and chain machines together."

## Visual Design

The workshop should use the existing Qubix visual language:

- dark/light theme support
- `var(--qx-*)` design tokens
- compact mobile-first cards
- 8px card radius or existing workshop radius
- no nested cards inside cards
- no oversized hero sections

Visual motifs:

- input chips sliding into a machine
- output tray lighting up
- graph panel filling point by point
- warning light for a broken relation
- conveyor belt for composition
- reverse arrow for inverse functions

Avoid:

- too many equations on screen at once
- abstract graph-only teaching at the start
- long explanatory paragraphs
- making every stage multiple choice

## Interaction Style

The learner should actively do these things:

- feed inputs
- predict outputs
- sort valid and invalid tables
- drag or tap graph points
- scan a graph with a vertical line
- choose an inverse operation
- chain two machines

The workshop should mix:

- one rich custom lab component
- a few existing scenario/sorting interactions
- one challenge-style randomized drill later

## Technical Design

### New Component

Create:

`src/lib/components/assessments/FunctionMachineLab.svelte`

Props:

```js
export let prompt = 'Run the function machine.';
export let onDone = () => {};
```

Internal stages:

```js
const stages = [
  { id: 'feed', label: 'Feed' },
  { id: 'broken', label: 'Repair' },
  { id: 'domain', label: 'Domain' },
  { id: 'graph', label: 'Graph' },
  { id: 'reverse', label: 'Reverse' },
  { id: 'compose', label: 'Chain' }
];
```

Completion:

Call:

```js
onDone(1, 1);
```

once the lab is complete.

### Workshop Runner

Add to:

`src/lib/components/assessments/Workshop.svelte`

Import:

```js
import FunctionMachineLab from './FunctionMachineLab.svelte';
```

Render branch:

```svelte
{:else if current.type === 'functionmachine'}
  <FunctionMachineLab
    prompt={current.prompt}
    onDone={handleInteractionDone}
  />
```

### Workshop Data

Add a new exported workshop in:

`src/lib/content/workshops.js`

Suggested:

```js
export const MATHS_FUNCTIONS_WORKSHOP = [
  {
    type: 'functionmachine',
    prompt: 'Feed inputs, repair broken rules, graph outputs, reverse machines, and chain functions.'
  },
  // shorter reinforcement steps after the lab
];

export function getMathsFunctionsWorkshop() {
  return cloneInteractions(MATHS_FUNCTIONS_WORKSHOP);
}
```

Then wire the module into:

`src/views/WorkshopLab.svelte`

Mathematics modules:

```js
{
  id: 'functions',
  label: 'Functions',
  title: 'Function Machine',
  sub: 'Feed inputs, repair rules, read graphs, and chain machines.',
  pathId: 'MATH_FUNCTIONS',
  getWorkshop: getMathsFunctionsWorkshop
}
```

## Randomized Challenge Ideas

Later, add a challenge generator in:

`src/lib/content/challenges.js`

Possible generated challenges:

1. Given `f(x) = ax + b`, find `f(n)`.
2. Given input-output pairs, decide if relation is a function.
3. Given domain list and rule, find the range.
4. Given two simple functions, compute `f(g(n))`.
5. Given a forward rule, choose the inverse operation.
6. Given a small point set, decide if it passes the vertical line test.

Example generator:

```js
function genFunctionValue() {
  const a = ri(2, 5);
  const b = ri(1, 9);
  const x = ri(0, 6);
  const answer = a * x + b;
  return {
    type: 'scenario',
    prompt: `Machine f uses f(x) = ${a}x + ${b}. What is f(${x})?`,
    options: shuffle([
      { id: 'correct', label: String(answer), correct: true },
      { id: 'plus', label: String(x + b), correct: false },
      { id: 'times', label: String(a * x), correct: false },
      { id: 'swap', label: String(a + b + x), correct: false }
    ]),
    correctFeedback: 'Correct. Put the input into the rule and calculate the output.',
    incorrectFeedback: `Use ${a} x ${x} + ${b}.`
  };
}
```

## Content Tone

Use clean, human language:

- "Feed the input."
- "The machine follows one rule."
- "Same input, same output."
- "The graph is the machine's output table drawn as a picture."
- "The inverse walks the output back to the input."
- "Composition is a conveyor belt: one machine hands its result to the next."

Avoid:

- "Don't let notation scare you."
- too much direct "you" language
- vague AI-ish motivational language
- long paragraphs explaining before the learner acts

## Implementation Priority

### Phase 1: Launchable Lab

Build `FunctionMachineLab.svelte` with:

- feed stage
- broken machine stage
- domain gate stage
- graph/table matching stage
- inverse stage
- composition stage

Add it as the first interaction in a new Functions workshop module.

### Phase 2: Reinforcement

Add 6-8 normal interactions after the lab:

- one-input-one-output scenario
- notation scenario
- domain/range sorting
- shape recognition
- inverse scenario
- composition scenario

### Phase 3: Challenge Mode

Add randomized challenge generator:

- function value calculation
- broken table detection
- range from domain
- composition
- inverse operation

### Phase 4: Polish

Add:

- tiny animation when input enters machine
- warning flash for broken relation
- graph point glow
- reverse arrow animation
- conveyor belt motion
- optional sound feedback later

## Definition Of Done

The workshop is launch-ready when:

- it appears under Mathematics as "Functions"
- the custom lab runs inside the Workshop screen
- it records score through the existing Workshop system
- it works on mobile and desktop widths
- it uses Qubix theme tokens only
- no text overlaps in narrow mobile view
- build passes
- it is pushed to GitHub and deployed to Vercel

## Tomorrow Starting Point

Start by creating:

`src/lib/components/assessments/FunctionMachineLab.svelte`

Then wire:

- `Workshop.svelte`
- `workshops.js`
- `WorkshopLab.svelte`

First implementation target:

One complete lab with six internal stages and one final `Continue` button. Keep the first version simple, then add randomized challenge mode after the core lab feels good.
