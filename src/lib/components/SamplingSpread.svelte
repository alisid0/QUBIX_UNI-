<script>
  // What a sample can and cannot say, as the thing it does.
  //
  // Chapter 8 session 3 asserts that an estimate would have come out differently
  // had a different sample been drawn, and that the spread narrows with the
  // square root of the sample size. Both are true and neither is visible in a
  // table: a still figure can only show many samples at once, which teaches
  // something weaker, or one sample, which teaches nothing about variation.
  //
  // So this draws the samples. Each dot is one sample's mean, landing where it
  // lands. Three rows, three sample sizes, the same population underneath, and
  // the clouds tighten as n grows.
  //
  // Seeded, because a figure that draws differently on every render cannot be
  // checked and cannot be quoted in prose. Same mulberry32 the dataset generator
  // uses, so the picture is the same picture every time and check-sampling
  // asserts the spreads it produces.
  //
  // Deterministic SVG per docs/MEDIA-RULE.md.

  import { onMount, onDestroy } from 'svelte';
  import { DISTRIBUTION_DESK_MISSION, mean } from '../game/distribution-desk-mission.js';

  export let caseId = 'baskets';

  const source = DISTRIBUTION_DESK_MISSION.cases.find(c => c.id === caseId);
  const population = source.values;
  const truth = mean(population);

  /** Drawn with replacement: these are the samples you did not take, not a
      re-shuffle of the ones you did. */
  const SIZES = [4, 10, 25];
  const DRAWS = 24;

  function seeded(seed) {
    return () => {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const rows = SIZES.map((n, r) => {
    const rnd = seeded(0x9e3779b9 + r * 7919);
    const means = [];
    for (let d = 0; d < DRAWS; d++) {
      let total = 0;
      for (let i = 0; i < n; i++) total += population[Math.floor(rnd() * population.length)];
      means.push(total / n);
    }
    const lo = Math.min(...means), hi = Math.max(...means);
    return { n, means, lo, hi, spread: hi - lo };
  });

  /* ── geometry ────────────────────────────────────────────────────────── */
  const W = 640, ROW_H = 74, TOP = 44, PAD_L = 92, PAD_R = 26;
  const H = TOP + rows.length * ROW_H + 34;
  const plotW = W - PAD_L - PAD_R;

  // One scale for every row, or the tightening is invisible.
  const lo = Math.min(...rows.flatMap(r => r.means)) * 0.94;
  const hi = Math.max(...rows.flatMap(r => r.means)) * 1.04;
  const x = v => PAD_L + ((v - lo) / (hi - lo)) * plotW;
  const rowY = r => TOP + r * ROW_H + 30;

  // Dots stack when they land close together, so the shape is readable.
  const placed = rows.map(row => {
    const used = [];
    return row.means.map(m => {
      const px = x(m);
      const near = used.filter(u => Math.abs(u.px - px) < 7).length;
      used.push({ px });
      return { m, px, tier: near % 4 };
    });
  });

  let shown = 0;
  let still = false;
  let timer = null;

  function play() {
    clearInterval(timer);
    if (still) { shown = DRAWS; return; }
    shown = 0;
    timer = setInterval(() => {
      shown += 1;
      if (shown >= DRAWS) clearInterval(timer);
    }, 110);
  }

  onMount(() => {
    still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    play();
  });
  onDestroy(() => clearInterval(timer));

  const money = v => '£' + v.toFixed(2);

  // Derived, not asserted. The first draft's caption read "four times the
  // data, half the spread", which is the textbook line and not what these
  // sample sizes produce: 4 to 25 is six times the data and the spread falls
  // by about two and a half, which is what the square-root law predicts.
  const times = Math.round(SIZES[SIZES.length - 1] / SIZES[0] * 10) / 10;
  const narrower = Math.round(rows[0].spread / rows[rows.length - 1].spread * 10) / 10;
  const label = r => `n = ${r.n}`;

  $: description = `${DRAWS} samples drawn from the same ${population.length} baskets, `
    + `at three sample sizes. The true mean is ${money(truth)}. `
    + rows.map(r => `At n of ${r.n} the sample means span ${money(r.lo)} to ${money(r.hi)}, `
      + `a range of ${money(r.spread)}`).join('. ') + '.';
</script>

<figure class="spread">
  <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={description}>
    <!-- the value the samples are trying to find -->
    <line class="truth" x1={x(truth)} y1="30" x2={x(truth)} y2={H - 30} />
    <text class="truth-t" x={x(truth)} y="22" text-anchor="middle">true mean {money(truth)}</text>

    {#each rows as row, r}
      <text class="n" x={PAD_L - 14} y={rowY(r) + 4} text-anchor="end">{label(row)}</text>
      <text class="n sub" x={PAD_L - 14} y={rowY(r) + 19} text-anchor="end">
        {shown >= DRAWS ? `spans ${money(row.spread)}` : ' '}
      </text>
      <line class="rule" x1={PAD_L} y1={rowY(r)} x2={W - PAD_R} y2={rowY(r)} />

      {#each placed[r] as dot, i}
        <circle
          class="dot"
          class:on={i < shown}
          cx={dot.px}
          cy={rowY(r) - 3 - dot.tier * 7}
          r="4.2"
        />
      {/each}
    {/each}

    <text class="axis" x={PAD_L} y={H - 12}>{money(lo)}</text>
    <text class="axis" x={W - PAD_R} y={H - 12} text-anchor="end">{money(hi)}</text>
  </svg>

  <figcaption>
    <div class="state">
      <strong>{shown} of {DRAWS} samples</strong>
      <span>each dot is one sample's mean, from the same {population.length} baskets</span>
    </div>
    <div class="scale">
      {times}&times; the data, <b>{narrower}&times;</b> narrower.
    </div>
    <button on:click={play} aria-label="Draw the samples again">{still ? 'Show all' : 'Draw again'}</button>
  </figcaption>
</figure>

<style>
  .spread {
    margin: 0; padding: 14px 14px 10px;
    border: 1px solid var(--qx-border-2, #e4ddcd); border-radius: 14px;
    background: var(--qx-surface, #fff);
  }
  svg { display: block; width: 100%; height: auto; }

  .truth { stroke: var(--qx-accent, #a85a34); stroke-width: 1.6; stroke-dasharray: 4 4; }
  .truth-t { font: 800 11px var(--qx-font); fill: var(--qx-accent-text, #8c4c2e); }

  .n { font: 800 12px var(--qx-font); fill: var(--qx-text, #25231f); }
  .n.sub { font: 600 11px var(--qx-font); fill: var(--qx-text-dim, #8d8474); }
  .rule { stroke: var(--qx-border-2, #ded6c6); stroke-width: 1; }
  .axis { font: 600 11px var(--qx-font); fill: var(--qx-text-dim, #8d8474); }

  .dot {
    fill: var(--qx-text, #25231f); opacity: 0;
    transform: scale(.4); transform-origin: center; transform-box: fill-box;
    transition: opacity .28s ease, transform .28s cubic-bezier(.2,.8,.3,1);
  }
  .dot.on { opacity: .82; transform: scale(1); }

  figcaption {
    display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 14px;
    margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--qx-border-2, #ece7dc);
    font: 650 12.5px/1.5 var(--qx-font); color: var(--qx-text-dim, #6b6152);
  }
  .state { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  .state strong { color: var(--qx-text, #25231f); font-weight: 800; font-variant-numeric: tabular-nums; }
  .scale { margin-left: auto; }
  .scale b { color: var(--qx-text, #25231f); }
  figcaption button {
    padding: 4px 12px; border: 1px solid var(--qx-border, #d8d0be); border-radius: 999px;
    background: none; color: var(--qx-text, #25231f);
    font: 800 11px var(--qx-font); cursor: pointer;
  }
  figcaption button:hover { border-color: var(--qx-text, #25231f); }
  figcaption button:focus-visible { outline: 2px solid var(--qx-accent, #a85a34); outline-offset: 2px; }

  @media (prefers-reduced-motion: reduce) {
    .dot { transition: none !important; }
  }
</style>
