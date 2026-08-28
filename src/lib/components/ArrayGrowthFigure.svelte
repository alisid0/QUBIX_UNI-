<script>
  // Two growth strategies, drawn as the work they actually do.
  //
  // The lesson is hard to carry in a sentence because the two totals sound
  // comparable until you see them: both runs end holding 32 items in a capacity
  // of 32, with no slot wasted either way. Only the path differs, and the path
  // is what costs. Drawn as one bar per append, growing by one slot is a dense
  // rising wall and doubling is three lonely spikes.
  //
  // Every bar is computed from the lesson's own trace, so the picture and the
  // bench cannot disagree. check-dsa-preview asserts the totals it draws.
  //
  // Deterministic SVG per docs/MEDIA-RULE.md.

  import { onMount, onDestroy } from 'svelte';
  import { DSA_ARRAY_GROWTH_PREVIEW as lesson, growthTrace, growthSummary } from '../content/dsa-array-growth-preview.js';

  const N = lesson.appendTarget;
  const lanes = lesson.strategies.map(strategy => ({
    ...strategy,
    steps: growthTrace(strategy.id, N, lesson.startCapacity),
    summary: growthSummary(strategy.id, N, lesson.startCapacity)
  }));

  const worst = Math.max(...lanes.map(lane => lane.summary.worstAppend));

  /* ── geometry ────────────────────────────────────────────────────────── */
  // The lane name sits above its lane rather than beside it. Beside it, a
  // left gutter wide enough for "Double the capacity" would have eaten a
  // fifth of the plot, and a gutter narrow enough to avoid that clipped the
  // labels mid-word. Above, they cost one text line and nothing else.
  const W = 640, LEFT = 26, PAD_R = 92, TOP = 34;
  const LANE_H = 82, LABEL_H = 22, LANE_GAP = 30;
  const plotW = W - LEFT - PAD_R;
  const colW = plotW / N;
  const H = TOP + lanes.length * (LABEL_H + LANE_H) + (lanes.length - 1) * LANE_GAP + 44;

  const laneTop = i => TOP + i * (LABEL_H + LANE_H + LANE_GAP);
  const baseline = i => laneTop(i) + LABEL_H + LANE_H;
  const barX = n => LEFT + (n - 1) * colW;
  const barH = copied => (copied / worst) * LANE_H;
  const barW = Math.max(6, colW - 4.4);

  let shown = 0;
  let reducedMotion = false;
  let timer = null;

  function play() {
    clearInterval(timer);
    if (reducedMotion) { shown = N; return; }
    shown = 0;
    timer = setInterval(() => {
      shown += 1;
      if (shown >= N) clearInterval(timer);
    }, 55);
  }

  onMount(() => {
    reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    play();
  });
  onDestroy(() => clearInterval(timer));

  // The running total is the number the reader is meant to leave with.
  $: running = lanes.map(lane => lane.steps[Math.max(0, Math.min(shown, N) - 1)]?.totalCopies ?? 0);

  const description = lanes
    .map(lane => `${lane.label} copies ${lane.summary.totalCopies} items across ${N} appends, `
      + `growing ${lane.summary.growEvents} times, with a worst single append of ${lane.summary.worstAppend}`)
    .join('. ') + `. Both finish holding ${N} items in a capacity of ${lanes[0].summary.finalCapacity}.`;
</script>

<figure class="growth">
  <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={description}>
    <text class="scale wide" x={LEFT} y="16">one bar per append · bar height is items copied by that append</text>
    <text class="scale narrow" x={LEFT} y="16">one bar per append</text>

    {#each lanes as lane, i}
      <text class="lane-t" x={LEFT} y={laneTop(i) + 14}>{lane.label}<tspan class="sub" dx="10">grew {lane.summary.growEvents}&times;</tspan></text>

      <line class="rule" x1={LEFT} y1={baseline(i)} x2={W - PAD_R} y2={baseline(i)} />

      {#each lane.steps as step}
        {#if step.copied > 0}
          <rect
            class="bar"
            class:on={step.n <= shown}
            class:big={step.copied === lane.summary.worstAppend}
            x={barX(step.n)}
            y={baseline(i) - barH(step.copied)}
            width={barW}
            height={barH(step.copied)}
          />
        {/if}
      {/each}

      <text class="total" x={W - PAD_R + 10} y={baseline(i) - 16}>{running[i]}</text>
      <text class="total sub" x={W - PAD_R + 10} y={baseline(i) - 2}>copied</text>
    {/each}

    <text class="axis" x={LEFT} y={H - 14}>append 1</text>
    <text class="axis" x={W - PAD_R} y={H - 14} text-anchor="end">append {N}</text>
  </svg>

  <figcaption>
    <div class="state">
      <strong>{Math.min(shown, N)} of {N} appends</strong>
      <span>both runs end holding {N} items in a capacity of {lanes[0].summary.finalCapacity}, with no slot wasted</span>
    </div>
    <button on:click={play} aria-label="Replay the appends">{reducedMotion ? 'Show all' : 'Replay the appends'}</button>
  </figcaption>
</figure>

<style>
  .growth {
    margin: 26px 0 40px; padding: 16px 16px 12px;
    border: 3px solid #000; background: var(--qx-surface); box-shadow: 7px 7px 0 #000;
  }
  svg { display: block; width: 100%; height: auto; }

  .scale { font: 650 11px var(--qx-font); fill: var(--qx-text-dim); }
  .lane-t { font: 900 12px var(--qx-font); fill: var(--qx-text); }
  .lane-t .sub { font: 650 11px var(--qx-font); fill: var(--qx-text-dim); }
  .rule { stroke: var(--qx-border-2); stroke-width: 1.4; }
  .axis { font: 650 11px var(--qx-font); fill: var(--qx-text-dim); }

  .bar {
    fill: var(--qx-accent); opacity: 0;
    transition: opacity .16s ease;
  }
  .bar.on { opacity: .92; }
  /* The single most expensive append in each lane, which is the one people
     expect to matter and mostly does not. */
  .bar.big { fill: var(--qx-accent-strong, #8c4c2e); }

  .total { font: 900 19px var(--qx-font); fill: var(--qx-accent-text); font-variant-numeric: tabular-nums; }
  .total.sub { font: 650 11px var(--qx-font); fill: var(--qx-text-dim); }

  figcaption {
    display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 14px;
    margin-top: 12px; padding-top: 11px; border-top: 2px solid #000;
    font: 650 12.5px/1.5 var(--qx-font); color: var(--qx-text-2);
  }
  .state { display: flex; align-items: baseline; gap: 9px; flex-wrap: wrap; }
  .state strong { color: var(--qx-text); font-weight: 900; font-variant-numeric: tabular-nums; }
  figcaption button {
    margin-left: auto; padding: 5px 13px; border: 2px solid #000; border-radius: 0;
    background: var(--qx-surface); color: var(--qx-text);
    font: 900 11px var(--qx-font); cursor: pointer;
  }
  figcaption button:hover { background: var(--qx-accent-soft-2); }
  figcaption button:focus-visible { outline: 3px solid var(--qx-accent); outline-offset: 2px; }

  .scale.narrow { display: none; }

  /* The viewBox is 640 wide and scales to the container, so on a phone every
     size inside it is multiplied by about 0.56: an 11px label renders at",
     roughly 6px. check-type reads declared sizes and cannot see that. These
     sizes are chosen so the rendered result clears the 11px floor. */
  @media (max-width: 700px) {
    .scale.wide { display: none; }
    .scale.narrow { display: block; }
    .scale, .axis, .lane-t .sub, .total.sub { font-size: 22px; }
    .lane-t { font-size: 24px; }
    .total { font-size: 34px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .bar { transition: none; }
  }
</style>
