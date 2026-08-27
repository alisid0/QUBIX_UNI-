<script>
  // Why a 95% accurate alarm is wrong most of the times it sounds.
  //
  // Chapter 8 session 2 tells this with a two-by-two table, and a two-by-two
  // table is exactly where the intuition fails. The numbers are small, they look
  // reasonable, and the reader agrees without ever feeling the thing that makes
  // it true: the false-alarm rate is applied to a vastly larger group than the
  // catch rate is.
  //
  // So the population is drawn. Two hundred freezer-days as two hundred squares,
  // one of them a real failure. Then the alarm fires, eleven squares light, and
  // ten of them were fine. You can count them.
  //
  // The grid is computed from the rates rather than laid out by hand, and
  // check-motion asserts the counts it produces are the ones the chapter's own
  // example table prints. If either moves, the build fails rather than the
  // figure quietly disagreeing with the prose beside it.
  //
  // Deterministic SVG per docs/MEDIA-RULE.md.

  import { onMount, onDestroy } from 'svelte';

  /** The scenario, as the chapter states it. */
  export let days = 200;
  export let failureIn = 200;      // one real failure in this many days
  export let catchRate = 0.95;     // alarms when the freezer really is failing
  export let falseRate = 0.05;     // alarms when it is fine

  const failing = Math.round(days / failureIn);
  const fine = days - failing;
  const trueAlarms = Math.round(failing * catchRate);
  const falseAlarms = Math.round(fine * falseRate);
  const alarms = trueAlarms + falseAlarms;
  const precision = alarms ? trueAlarms / alarms : 0;

  // Failing days first, then the fine days that alarm, spread through the grid
  // so the false alarms are not a block in one corner.
  const cells = Array.from({ length: days }, (_, i) => {
    const isFailing = i < failing;
    const spacing = Math.floor(fine / Math.max(1, falseAlarms));
    const isFalse = !isFailing && (i - failing) % spacing === 0
      && Math.floor((i - failing) / spacing) < falseAlarms;
    return { i, isFailing, alarmed: isFailing ? i < trueAlarms : isFalse };
  });

  const STEPS = [
    { label: `${days} freezer-days`, note: `${failing} of them the freezer really is failing` },
    { label: 'The alarm sounds', note: `${alarms} days it went off` },
    { label: 'Of those alarms', note: `${trueAlarms} real, ${falseAlarms} false` }
  ];

  let step = 0, still = false, timer = null;
  function play() {
    clearTimeout(timer);
    if (still) { step = STEPS.length - 1; return; }
    step = 0;
    const advance = () => { if (step < STEPS.length - 1) { step += 1; timer = setTimeout(advance, 1700); } };
    timer = setTimeout(advance, 900);
  }
  onMount(() => {
    still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    play();
  });
  onDestroy(() => clearTimeout(timer));

  /* ── geometry ────────────────────────────────────────────────────────── */
  const COLS = 25, BOX = 18, GAP = 3, LEFT = 24, TOP = 58;
  const W = 640;
  const rows = Math.ceil(days / COLS);
  const H = TOP + rows * (BOX + GAP) + 66;
  const cx = i => LEFT + (i % COLS) * (BOX + GAP);
  const cy = i => TOP + Math.floor(i / COLS) * (BOX + GAP);

  const pct = v => Math.round(v * 100) + '%';

  $: description = `${days} freezer-days. The freezer really fails on ${failing}. `
    + `The alarm is ${pct(catchRate)} accurate and sounds on ${alarms} days: `
    + `${trueAlarms} real and ${falseAlarms} false. `
    + `So ${pct(precision)} of alarms are a real failure.`;
</script>

<figure class="alarm">
  <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={description}>
    <text x={LEFT} y="26" class="cap">{STEPS[step].label}</text>
    <text x={LEFT} y="44" class="sub">{STEPS[step].note}</text>

    {#each cells as cell}
      <rect
        class="day"
        class:failing={cell.isFailing}
        class:alarmed={step >= 1 && cell.alarmed}
        class:quiet={step >= 2 && !cell.alarmed}
        x={cx(cell.i)} y={cy(cell.i)} width={BOX} height={BOX} rx="3"
        style={`transition-delay:${still ? 0 : (cell.alarmed ? 0 : 200) + (cell.i % COLS) * 6}ms`}
      />
    {/each}

    <g class="verdict" class:on={step >= 2}>
      <text x={LEFT} y={H - 34} class="big">{trueAlarms} of {alarms}</text>
      <text x={LEFT + 96} y={H - 34} class="verdict-t">
        alarms were a real failure. The other {falseAlarms} sent somebody to a freezer that was fine.
      </text>
      <text x={LEFT} y={H - 14} class="sub">
        The alarm is {pct(catchRate)} accurate and {pct(precision)} right. Accuracy is not precision.
      </text>
    </g>
  </svg>

  <figcaption>
    <div class="state">
      <strong>1 day in {failureIn}</strong>
      <span>is a real failure, so {pct(falseRate)} of the other {fine} outnumber it</span>
    </div>
    <button on:click={play} aria-label="Run the freezer-days again">{still ? 'Show all' : 'Replay'}</button>
  </figcaption>
</figure>

<style>
  .alarm {
    margin: 0; padding: 14px 14px 10px;
    border: 1px solid var(--qx-border-2, #e4ddcd); border-radius: 14px;
    background: var(--qx-surface, #fff);
  }
  svg { display: block; width: 100%; height: auto; }

  .cap { font: 800 13px var(--qx-font); fill: var(--qx-text, #25231f); }
  .sub { font: 600 11.5px var(--qx-font); fill: var(--qx-text-dim, #8d8474); }

  .day {
    fill: var(--qx-surface-3, #ece7dc); stroke: var(--qx-border-2, #ded6c6); stroke-width: 1;
    transition: fill .4s ease, stroke .4s ease, opacity .4s ease;
  }
  /* A fine day that alarmed: the ten that cost somebody a drive. */
  .day.alarmed { fill: var(--qx-danger-soft, #f6e3df); stroke: var(--qx-danger, #b3402e); stroke-width: 1.4; }
  /* The one that was real. Marked differently, because it is the one that matters. */
  .day.failing { fill: var(--qx-accent, #a85a34); stroke: var(--qx-accent, #a85a34); }
  .day.failing.alarmed { fill: var(--qx-accent, #a85a34); stroke: var(--qx-text, #25231f); stroke-width: 2; }
  .day.quiet { opacity: .25; }

  .verdict { opacity: 0; transition: opacity .5s ease .3s; }
  .verdict.on { opacity: 1; }
  .big { font: 900 19px var(--qx-font); fill: var(--qx-accent-text, #8c4c2e); }
  .verdict-t { font: 650 12px var(--qx-font); fill: var(--qx-text, #25231f); }

  figcaption {
    display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 14px;
    margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--qx-border-2, #ece7dc);
    font: 650 12.5px/1.5 var(--qx-font); color: var(--qx-text-dim, #6b6152);
  }
  .state { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  .state strong { color: var(--qx-text, #25231f); font-weight: 800; }
  figcaption button {
    margin-left: auto; padding: 4px 12px;
    border: 1px solid var(--qx-border, #d8d0be); border-radius: 999px;
    background: none; color: var(--qx-text, #25231f); font: 800 11px var(--qx-font); cursor: pointer;
  }
  figcaption button:hover { border-color: var(--qx-text, #25231f); }
  figcaption button:focus-visible { outline: 2px solid var(--qx-accent, #a85a34); outline-offset: 2px; }

  @media (prefers-reduced-motion: reduce) {
    .day, .verdict { transition: none !important; }
  }
</style>
