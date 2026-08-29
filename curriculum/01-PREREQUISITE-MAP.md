# Prerequisite Map

Status: **Draft for founder review**

This map defines what a learner should know before entering each part of *Variables and Rates of Change*. A prerequisite is included only when the lesson genuinely depends on it.

## Dependency map

```mermaid
flowchart TD
  N0[Whole numbers] --> N1[Arithmetic operations]
  N1 --> N2[Negative numbers]
  N1 --> N3[Fractions and decimal numbers]
  N1 --> G0[Length and square area]
  N1 --> B1["A Letter for a Number"]
  G0 --> B1
  B1 --> A0[Letters can stand for numbers]
  B1 --> B2
  A0 --> A1[Substitution]
  A1 --> A2[Simple expressions and x squared]
  N2 --> C0[Directed change]
  N3 --> R0[Ratios and division]
  G0 --> F0[Input and dependent output]
  A2 --> F0
  C0 --> B2["The Gap Between Two Values"]
  F0 --> B3["A Second Letter, Tied to the First"]
  R0 --> B4["One Change Against Another"]
  B2 --> B3
  B3 --> B4
  B4 --> B5["Two Points, Almost Touching"]
```

## Entry nodes

| ID | Learner can… | Evidence check | Needed before |
|---|---|---|---|
| P-01 | read a number written in figures | read 1, 7 and 340 aloud | A Letter for a Number |
| P-02 | recognise negative numbers as direction or loss | place −2, 0 and 3 on a line | The Gap Between Two Values |
| P-03 | use decimals such as 0.5 and 2.5 | compare and subtract two decimals | A Letter for a Number, The Gap Between Two Values |
| P-04 | understand that a letter may hold a number | evaluate `x + 1` when `x = 2` | The Gap Between Two Values |
| P-05 | substitute a value into a simple expression | evaluate `x²` for `x = 3` | A Second Letter, Tied to the First |
| P-06 | connect side length with square area | explain why side 3 gives area 9 | A Second Letter, Tied to the First |
| P-07 | read a ratio as division | interpret `6 ÷ 2 = 3 per unit` | One Change Against Another |
| P-08 | read a length in centimetres | say which of 2 cm and 3.5 cm is longer | A Letter for a Number |

`P-04` moved from the first board to the second on 2026-08-09. Under fork F-2,
*A Letter for a Number* is where a learner first meets a letter standing for a
number, so it cannot also be assumed beforehand. `P-01` narrowed at the same time:
that board performs no arithmetic, it only requires that a figure can be read.
`P-08` was added because its section 4 puts a centimetre measurement on screen, a
requirement the map previously carried only as the unnumbered `G0` node.

Boards are referred to by name here rather than by number, since the running
order is not settled. See the naming note in
[`02-MAIN-CURRICULUM-MAP.md`](./02-MAIN-CURRICULUM-MAP.md).

## Diagnostic policy

The learner should receive a short diagnostic before the lesson. A missed prerequisite should open a short repair BB, not block the learner with a long preliminary course.

No repair BB will be written until this map is approved.

## Founder decision

- [ ] Prerequisite nodes are sufficient.
- [ ] Some nodes should be added, removed or reordered.
