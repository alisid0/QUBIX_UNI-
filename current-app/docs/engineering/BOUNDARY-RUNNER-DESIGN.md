# Boundary Runner — Design Document v3

**Date:** 2026-07-28
**Files:** `boundaryRunner.js`, `BoundaryRunner.svelte`, `harness.mjs`

## Learning objectives

Six arcade missions teach limits through probe-ship discovery:
1. Shared two-sided limit
2. Limit ≠ function value (exact point only)
3. Left/right disagreement (genuine piecewise jump)
4. Infinite limits vs large finite peaks (3 sequential checks)
5. Limits at infinity (2 stages: exponential + rational)
6. Intuitive epsilon–delta control (3 tightening rounds)

## Level progression

| # | Name | Kind | Stages | Key mechanics |
|---|---|---|---|---|
| 1 | Convergence Run | `converge` | 1 | Sample both sides, predict shared L |
| 2 | Ghost Platform | `ghost` | 1 | Exact point ≠ nearby limit |
| 3 | Split Gate | `split` | 1 | Piecewise jump, refuse single value |
| 4 | Reactor Wall | `reactor` | 3 sequential | Classify each: bothPosInf / opposite / finite |
| 5 | Far Horizon | `farHorizon` | 2 sequential | Stage 1: exponential, Stage 2: rational |
| 6 | Safety Corridor | `safetyCorridor` | 3 rounds | Choose δ, test 80 challenge probes |

## Evidence gates

- Each level requires **≥2 samples from each side** before prediction
- At least **one close sample (<0.6 from boundary)** per side
- Probes **cannot cross the boundary** (`left < a`, `right > a`)
- Step sizes: 0.5 (coarse), decreasing with distance

## Boundary enforcement

- West probe: clamped to `x < a - 0.001`
- East probe: clamped to `x > a + 0.001`
- Sampling the exact boundary is impossible — probes stop at the boundary edge

## Scenario families (seeded replay)

| Family | Example | Used in |
|---|---|---|
| Quadratic above | `L + (x-a)²` | Convergence, Ghost |
| Quadratic below | `L - (x-a)²` | Convergence, Ghost |
| Linear approach | `L + k(x-a)` | Convergence |
| Both-side infinite | `1/(x-a)²` | Reactor |
| Opposite infinite | `1/(x-a)` | Reactor |
| Large finite peak | `1000/(1+80(x-a)²)` | Reactor |
| Exponential settling | `L + (T₀-L)e^(-kt)` | Far Horizon |
| Rational asymptote | `(Lx+3)/(x+1)` | Far Horizon |

## Hints

- One tap reveals a level-specific contextual hint
- Hints appear only after activation
- Screen-reader accessible via `role="note"`
- `hintUsed` affects the Independent distinction and reward once
- Repeated taps do not create repeated penalties

## Accessibility

- **Keyboard:** Playfield is focusable (`tabindex="0"`). Arrow keys move probes; Space samples. Tab navigation preserved (no global hijack).
- **Live region:** `aria-live="polite"` announces mission changes and results.
- **Labels:** All form controls have associated `<label>` elements or `aria-label`.
- **Touch targets:** ≥44×44 px on all interactive elements.
- **Reduced-motion:** CSS `@media (prefers-reduced-motion: reduce)` disables pulse animations. JS transitions use `reduceMotion` flag.
- **Colour:** Correct/incorrect states include text feedback alongside colour.

## Epistemic language

All reveal text uses evidence/discovery language:
- "You gathered evidence" not "you proved"
- "Readings supported" not "the function proves"
- "Challenge probes passed" not "every point guaranteed"
- "Evidence for the pattern" not "formal proof"

Far Horizon uses two outward-moving probes rather than left/right boundary
probes. A prediction unlocks after at least three readings, including one at
input 15 or beyond. Stage 1 uses the exponential model and must be completed
before Stage 2 switches to the rational model.

Each Reactor function is constructed from the same generated coordinate shown
as its forbidden boundary. A stage requires balanced near-boundary evidence
before its classification controls unlock.

## Reward

- Base performance reward: 4 Ws + 1 per cleared level + 1 per two
  perfect levels, capped at 13 Ws
- Independent completion adds 2 Ws, so hint use remains visible even on a
  perfect run
- Total reward is capped at 15 Ws
- `onDone` fires exactly once per completed run
- Replay resets all state cleanly

## Test coverage

1. Both sides approach L, closer = tighter
2. Ghost exact point = M, nearby = L
3. Split piecewise: left=Lleft, right=Lright, at-a=midpoint
4. Reactor: each function is centred on its declared boundary
5. Far Horizon: Stage 1 is wired to `fn1`, Stage 2 to `fn2`, and evidence gates prediction
6. Safety Corridor: selectable strict pass deltas and wide-delta failure
7. All 6 levels generatable
8. Multiple converge scenario families
9. Reward: hint reduces, deterministic, capped
10. Same seed = same level
11. Component wiring regression checks
12. No NaN coordinates in any generated level

## Remaining limitations

- **No browser component tests yet:** The harness covers mathematics and critical
  source wiring, but a full pointer/keyboard playthrough still requires browser
  automation.
- **Browser verification:** Visual playtesting remains required before release.
- **SolveFirstLimits.svelte still exists:** The old `limit-probe` component is a fallback.
