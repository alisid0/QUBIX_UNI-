<script>
  // Centre is a choice, demonstrated by making one.
  //
  // The session says a mean is dragged by extreme values and a median is not.
  // Shown statically that is two numbers in a table, and a reader has to take
  // the claim on trust. Shown as a change it is a causal demonstration: one
  // basket arrives, and you watch which marker moves.
  //
  // Thirty-nine baskets, then a fortieth of £210. The mean walks £4.46 to the
  // right. The median does not move at all. Nothing else about the data changed.
  //
  // Values and both statistics come from the Distribution Desk, so the reading
  // and the mission are one computation. check-motion asserts the mean really
  // does shift and the median really does not, because a figure whose whole
  // subject is a difference is worthless if the difference ever disappears.
  //
  // Deterministic SVG per docs/MEDIA-RULE.md.

  import { onMount, onDestroy } from 'svelte';
  import { DISTRIBUTION_DESK_MISSION, summarise } from '../game/distribution-desk-mission.js';

  export let caseId = 'baskets';

  const all = DISTRIBUTION_DESK_MISSION.cases.find(c => c.id === caseId).values;
  const outlier = all[all.length - 1];
  const base = all.slice(0, -1);

  const before = summarise(base);
  const after = summarise(all);
  const meanShift = after.mean - before.mean;
  const medianShift = after.median - before.median;

  const STEPS = [
    { label: `${base.length} baskets`, note: `mean £${before.mean.toFixed(2)} · median £${before.median.toFixed(2)}` },
    { label: 'One more basket', note: `£${outlier.toFixed(2)}, and nothing else changes` },
    { label: 'One marker moved', note: `mean £${after.mean.toFixed(2)} · median £${after.median.toFixed(2)}` }
  ];

  let step = 0, still = false, timer = null;
  function play() {
    clearTimeout(timer);
    if (still) { step = STEPS.length - 1; return; }
    step = 0;
    const advance = () => { if (step < STEPS.length - 1) { step += 1; timer = setTimeout(advance, 1600); } };
    timer = setTimeout(advance, 900);
  }
  onMount(() => {
    still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    play();
  });
  onDestroy(() => clearTimeout(timer));

  /* ── geometry ────────────────────────────────────────────────────────── */
  const W = 640, H = 208, L = 30, R = 30, AXIS = 132;
  const lo = 0, hi = Math.ceil(outlier * 1.06);
  const x = v => L + ((v - lo) / (hi - lo)) * (W - L - R);

  // Stack repeats so the shape of the data is visible rather than one flat line.
  const stack = values => {
    const used = [];
    return values.map(v => {
      const px = x(v);
      const tier = used.filter(u => Math.abs(u - px) < 7).length;
      used.push(px);
      return { v, px, tier: Math.min(tier, 6) };
    });
  };
  const dots = stack(base);
  const arriving = { v: outlier, px: x(outlier) };

  const money = v => '£' + v.toFixed(2);
  $: meanNow = step >= 2 ? after.mean : before.mean;
  $: medianNow = step >= 2 ? after.median : before.median;

  $: description = `${base.length} basket totals, then one more of ${money(outlier)}. `
    + `The mean moves from ${money(before.mean)} to ${money(after.mean)}, a shift of ${money(meanShift)}. `
    + `The median stays at ${money(after.median)}. One extreme value moved one summary and not the other.`;
</script>

<figure class="pull">
  <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={description}>
    <line class="axis" x1={L} y1={AXIS} x2={W - R} y2={AXIS} />
    <text class="tick" x={L} y={AXIS + 18}>£0</text>
    <text class="tick" x={W - R} y={AXIS + 18} text-anchor="end">{money(hi)}</text>

    {#each dots as d}
      <circle class="dot" cx={d.px} cy={AXIS - 6 - d.tier * 8} r="3.6" />
    {/each}

    <!-- the fortieth basket, arriving -->
    <circle
      class="dot incoming" class:on={step >= 1}
      cx={step >= 1 ? arriving.px : W + 20} cy={AXIS - 6} r="5.4"
    />
    <text class="incoming-t" class:on={step >= 1} x={arriving.px} y={AXIS - 24} text-anchor="middle">
      {money(outlier)}
    </text>

    <!-- the median: pinned, and the point is that it stays -->
    <g class="marker median" style={`transform:translateX(${x(medianNow) - x(before.median)}px)`}>
      <line x1={x(before.median)} y1={AXIS - 74} x2={x(before.median)} y2={AXIS + 6} />
      <text x={x(before.median)} y={AXIS - 80} text-anchor="middle">median {money(medianNow)}</text>
    </g>

    <!-- the mean: walks right when the outlier lands -->
    <g class="marker mean" style={`transform:translateX(${x(meanNow) - x(before.mean)}px)`}>
      <line x1={x(before.mean)} y1={AXIS - 56} x2={x(before.mean)} y2={AXIS + 6} />
      <text x={x(before.mean)} y={AXIS - 62} text-anchor="middle">mean {money(meanNow)}</text>
    </g>

    <g class="shift" class:on={step >= 2}>
      <line x1={x(before.mean)} y1={AXIS + 26} x2={x(after.mean)} y2={AXIS + 26} />
      <text x={(x(before.mean) + x(after.mean)) / 2} y={AXIS + 44} text-anchor="middle">
        the mean moved {money(meanShift)}
      </text>
    </g>
  </svg>

  <figcaption>
    <div class="state">
      <strong>{STEPS[step].label}</strong>
      <span>{STEPS[step].note}</span>
    </div>
    <div class="scale">
      Median moved <b>{money(medianShift)}</b>.
    </div>
    <button on:click={play} aria-label="Add the basket again">{still ? 'Show both' : 'Replay'}</button>
  </figcaption>
</figure>

<style>
  .pull {
    margin: 0; padding: 14px 14px 10px;
    border: 1px solid var(--qx-border-2, #e4ddcd); border-radius: 14px;
    background: var(--qx-surface, #fff);
  }
  svg { display: block; width: 100%; height: auto; }

  .axis { stroke: var(--qx-border, #d8d0be); stroke-width: 1.2; }
  .tick { font: 600 11px var(--qx-font); fill: var(--qx-text-dim, #8d8474); }
  .dot { fill: var(--qx-text, #25231f); opacity: .55; }

  .incoming {
    fill: var(--qx-accent, #a85a34); opacity: 0;
    transition: cx .8s cubic-bezier(.2,.75,.3,1), opacity .3s ease;
  }
  .incoming.on { opacity: 1; }
  .incoming-t {
    font: 800 11px var(--qx-font); fill: var(--qx-accent-text, #8c4c2e);
    opacity: 0; transition: opacity .4s ease .5s;
  }
  .incoming-t.on { opacity: 1; }

  .marker { transition: transform .9s cubic-bezier(.3,.7,.3,1); }
  .marker line { stroke-width: 2; }
  .marker text { font: 800 11px var(--qx-font); }
  .marker.mean line { stroke: var(--qx-accent, #a85a34); }
  .marker.mean text { fill: var(--qx-accent-text, #8c4c2e); }
  .marker.median line { stroke: var(--qx-pink, #3e9e2a); stroke-dasharray: 4 3; }
  .marker.median text { fill: var(--qx-pink-text, #3c6427); }

  .shift { opacity: 0; transition: opacity .5s ease .6s; }
  .shift.on { opacity: 1; }
  .shift line { stroke: var(--qx-accent, #a85a34); stroke-width: 1.4; }
  .shift text { font: 700 11px var(--qx-font); fill: var(--qx-accent-text, #8c4c2e); }

  figcaption {
    display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 14px;
    margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--qx-border-2, #ece7dc);
    font: 650 12.5px/1.5 var(--qx-font); color: var(--qx-text-dim, #6b6152);
  }
  .state { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  .state strong { color: var(--qx-text, #25231f); font-weight: 800; }
  .scale { margin-left: auto; }
  .scale b { color: var(--qx-pink-text, #3c6427); font-variant-numeric: tabular-nums; }
  figcaption button {
    padding: 4px 12px; border: 1px solid var(--qx-border, #d8d0be); border-radius: 999px;
    background: none; color: var(--qx-text, #25231f); font: 800 11px var(--qx-font); cursor: pointer;
  }
  figcaption button:hover { border-color: var(--qx-text, #25231f); }
  figcaption button:focus-visible { outline: 2px solid var(--qx-accent, #a85a34); outline-offset: 2px; }

  @media (prefers-reduced-motion: reduce) {
    .incoming, .incoming-t, .marker, .shift { transition: none !important; }
  }
</style>
