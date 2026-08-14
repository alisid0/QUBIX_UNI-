<script>
  // Interactive coordinate-geometry drill — one shell, four modes, all built on
  // CoordinatePlane.svelte's existing drag-a-point / draw-a-line engine.
  //
  // Data flow: `spec` is a single mutable object, bound two-way to CoordinatePlane.
  // Drag-based modes (plotPoint/distance/midpoint) let CoordinatePlane mutate it
  // directly via bind:spec. buildLine never drags (interactive is unset), so its
  // spec is only ever written imperatively by bumpM/bumpC — the two writers never
  // touch the same mode at once.
  import CoordinatePlane from '../media/CoordinatePlane.svelte';

  export let mode = 'plotPoint'; // 'plotPoint' | 'buildLine' | 'distance' | 'midpoint'
  export let prompt = 'Match the target.';
  export let correctFeedback = 'Correct.';
  export let incorrectFeedback = 'Not quite. Try again next time.';
  export let onDone = () => {};

  // plotPoint
  export let targetX = 3;
  export let targetY = 2;

  // buildLine
  export let targetM = 1;
  export let targetC = 0;

  // distance
  export let fixedPoint = null;
  export let targetDistance = 5;
  export let distanceTolerance = 0.4;

  // midpoint
  export let pointA = null;
  export let pointB = null;

  export let xRange = null;
  export let yRange = null;

  // Svelte only applies `export let x = default` at initial mount, not on every
  // prop update — and Workshop.svelte reuses this component instance across
  // consecutive coorddrill steps, passing `undefined` for props a given mode
  // doesn't set (e.g. buildLine never sets pointA/pointB). Re-derive safe
  // fallbacks on every update instead of trusting the export-let default.
  $: safeXRange = xRange || [-6, 6];
  $: safeYRange = yRange || [-6, 6];
  $: safeFixedPoint = fixedPoint || { x: 0, y: 0 };
  $: safePointA = pointA || { x: -2, y: -1 };
  $: safePointB = pointB || { x: 4, y: 3 };

  let submitted = false;
  let correct = false;
  let m = 1, c = 0; // buildLine only

  function initSpec() {
    if (mode === 'buildLine') {
      return {
        xRange: safeXRange, yRange: safeYRange, gridStep: 1,
        lines: [
          { m: targetM, c: targetC, color: 'var(--qx-text-faintest)', dashed: true },
          { m, c, color: 'var(--qx-accent)' },
        ],
      };
    }
    if (mode === 'distance') {
      return {
        xRange: safeXRange, yRange: safeYRange, gridStep: 1, interactive: true,
        points: [
          { ...safeFixedPoint, locked: true, label: 'A' },
          { x: safeFixedPoint.x + 2, y: safeFixedPoint.y + 2, label: 'B' },
        ],
      };
    }
    if (mode === 'midpoint') {
      return {
        xRange: safeXRange, yRange: safeYRange, gridStep: 1, interactive: true,
        points: [
          { ...safePointA, locked: true, label: 'A' },
          { ...safePointB, locked: true, label: 'B' },
          { x: safePointA.x, y: safePointA.y, label: 'M' },
        ],
        segments: [{ x1: safePointA.x, y1: safePointA.y, x2: safePointB.x, y2: safePointB.y, color: 'var(--qx-text-faintest)', dashed: true }],
      };
    }
    // plotPoint
    return {
      xRange: safeXRange, yRange: safeYRange, gridStep: 1, interactive: true,
      points: [{ x: 0, y: 0 }],
    };
  }

  let spec;

  // Workshop.svelte reuses this component instance across consecutive
  // coorddrill steps (same {:else if} branch, different props) — a one-time
  // `let spec = initSpec()` would go stale on the second step. Rebuild
  // whenever any target-defining prop changes, keyed by a signature so it
  // also resets across two same-mode steps back to back.
  $: instanceKey = JSON.stringify({ mode, targetX, targetY, targetM, targetC, safeFixedPoint, targetDistance, safePointA, safePointB, safeXRange, safeYRange });

  // Explicit value comparison (not just "did this block get invalidated") —
  // spec's own drag mutations flow back through bind:spec and can re-trigger
  // this block; without the !== guard that would reset the point mid-drag.
  let lastInstanceKey = null;
  $: if (instanceKey !== lastInstanceKey) {
    lastInstanceKey = instanceKey;
    m = 1; c = 0;
    submitted = false;
    correct = false;
    spec = initSpec();
  }

  $: liveDistance = mode === 'distance' && spec?.points?.[1]
    ? Math.hypot(spec.points[1].x - safeFixedPoint.x, spec.points[1].y - safeFixedPoint.y)
    : 0;

  $: targetMidpoint = { x: (safePointA.x + safePointB.x) / 2, y: (safePointA.y + safePointB.y) / 2 };

  $: targetLabel =
    mode === 'plotPoint' ? `Plot the point (${targetX}, ${targetY})` :
    mode === 'buildLine' ? `Match the dashed line: y = ${targetM}x ${targetC >= 0 ? '+' : '-'} ${Math.abs(targetC)}` :
    mode === 'distance'  ? `Drag B until it is ${targetDistance} units from A` :
    `Drag M to the midpoint of A and B`;

  function bumpM(d) {
    if (submitted) return;
    m = Math.max(-4, Math.min(4, m + d));
    spec = { ...spec, lines: [spec.lines[0], { m, c, color: 'var(--qx-accent)' }] };
  }
  function bumpC(d) {
    if (submitted) return;
    c = Math.max(-5, Math.min(5, c + d));
    spec = { ...spec, lines: [spec.lines[0], { m, c, color: 'var(--qx-accent)' }] };
  }

  function submit() {
    if (mode === 'plotPoint') {
      const p = spec.points?.[0];
      correct = !!p && Math.round(p.x) === targetX && Math.round(p.y) === targetY;
    } else if (mode === 'buildLine') {
      correct = m === targetM && c === targetC;
    } else if (mode === 'distance') {
      correct = Math.abs(liveDistance - targetDistance) <= distanceTolerance;
    } else if (mode === 'midpoint') {
      const p = spec.points?.[2];
      correct = !!p && Math.round(p.x) === Math.round(targetMidpoint.x)
                     && Math.round(p.y) === Math.round(targetMidpoint.y);
    }
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="coord-drill">
  <div class="prompt">{prompt}</div>
  <div class="target">{targetLabel}</div>

  <div class="stage">
    <CoordinatePlane bind:spec />
  </div>

  {#if mode === 'distance'}
    <div class="readout">Live distance: <strong>{liveDistance.toFixed(1)}</strong></div>
  {/if}

  {#if mode === 'buildLine'}
    <div class="controls">
      <div class="counter">
        <span>Slope (m)</span>
        <strong>{m}</strong>
        <div>
          <button on:click={() => bumpM(-1)} aria-label="Decrease slope">-</button>
          <button on:click={() => bumpM(1)} aria-label="Increase slope">+</button>
        </div>
      </div>
      <div class="counter">
        <span>Intercept (c)</span>
        <strong>{c}</strong>
        <div>
          <button on:click={() => bumpC(-1)} aria-label="Decrease intercept">-</button>
          <button on:click={() => bumpC(1)} aria-label="Increase intercept">+</button>
        </div>
      </div>
    </div>
  {/if}

  {#if !submitted}
    <button class="submit-btn" on:click={submit}>Check</button>
  {:else}
    <div class="feedback" class:correct class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .coord-drill {
    width: 100%;
    max-width: 390px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 13px;
  }

  .prompt {
    color: var(--qx-text);
    font-size: 15px;
    font-weight: 780;
    line-height: 1.42;
    text-align: center;
  }

  .target {
    width: 100%;
    box-sizing: border-box;
    padding: 9px 11px;
    border: 1px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface-2);
    color: var(--qx-text-dim);
    font-size: 12px;
    font-weight: 750;
    text-align: center;
  }

  .stage {
    width: 100%;
    aspect-ratio: 1;
  }

  .readout {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 11px;
    border-radius: 999px;
    background: var(--qx-surface-2);
    border: 1px solid var(--qx-border);
    color: var(--qx-text-dim);
    font-size: 12px;
    font-weight: 800;
    text-align: center;
  }

  .readout strong { color: var(--qx-text); }

  .controls {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .counter {
    border: 1px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface);
    padding: 9px 7px;
    display: grid;
    gap: 6px;
    justify-items: center;
  }

  .counter span {
    font-size: 10px;
    font-weight: 850;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--qx-text-faint);
  }

  .counter strong {
    font-size: 23px;
    font-weight: 900;
    color: var(--qx-text);
  }

  .counter div {
    display: flex;
    gap: 6px;
  }

  .counter button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--qx-border-2);
    background: var(--qx-surface-2);
    color: var(--qx-text);
    font: 900 17px/1 var(--qx-font);
    cursor: pointer;
  }

  .submit-btn,
  .continue-btn {
    min-height: 42px;
    width: 100%;
    border-radius: 999px;
    border: none;
    background: var(--qx-accent);
    color: #fff;
    font-family: var(--qx-font);
    font-size: 14px;
    font-weight: 850;
    cursor: pointer;
  }

  .feedback {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 720;
    line-height: 1.45;
    text-align: center;
  }

  .feedback.correct {
    background: var(--qx-green-soft);
    color: var(--qx-green-text);
  }

  .feedback.incorrect {
    background: var(--qx-danger-soft);
    color: var(--qx-danger-text);
  }
</style>
