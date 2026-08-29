<script>
  // GROUP BY, as the thing it does to the rows.
  //
  // Deliberately the mirror of JoinFanOut, which sits on the facing session.
  // Same grammar, opposite direction: the join spreads two rows into three, and
  // this folds twelve into three. A learner who has read one should be able to
  // read this without being told how.
  //
  // The mistake it exists for is treating GROUP BY as a filter. WHERE removes
  // rows and every survivor still means what it meant. GROUP BY removes nothing:
  // the twelve sales are all still in the answer, folded, and the row now means
  // a branch. Counting rows after it counts branches, and the number looks
  // perfectly reasonable either way.
  //
  // Both states come from runQuery, so the reading and the SQL Console are one
  // computation with two renderings. Deterministic SVG per docs/MEDIA-RULE.md.

  import { onMount, onDestroy } from 'svelte';
  import { runQuery } from '../game/sql-console-mission.js';

  const before = runQuery({ where: null, groupBy: null, having: null });
  const after = runQuery({ where: null, groupBy: 'branch_id', having: null });

  const sales = before.rows;
  const groups = after.rows;
  const indexOfGroup = branch => groups.findIndex(g => g.branch_id === branch);

  const STEPS = [
    { label: 'Twelve sales', note: `${sales.length} rows · one row is ${before.grain}` },
    { label: 'Gathered by branch', note: 'nothing has been removed, only sorted' },
    { label: 'After GROUP BY', note: `${groups.length} rows · one row is ${after.grain}` }
  ];

  let step = 0;
  let still = false;
  let timer = null;

  function play() {
    clearTimeout(timer);
    if (still) { step = STEPS.length - 1; return; }
    step = 0;
    const advance = () => {
      if (step < STEPS.length - 1) { step += 1; timer = setTimeout(advance, 1500); }
    };
    timer = setTimeout(advance, 800);
  }

  onMount(() => {
    still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    play();
  });
  onDestroy(() => clearTimeout(timer));

  /* ── geometry ────────────────────────────────────────────────────────── */
  const W = 640, ROW_H = 20, GAP = 4;
  const LEFT_X = 24, LEFT_W = 188, RIGHT_X = 392, RIGHT_W = 224;
  const TOP = 54;

  // Sorted by branch, so step 1 can gather without reordering the eye.
  const ordered = sales
    .map((row, i) => ({ ...row, origin: i, group: indexOfGroup(row.branch_id) }))
    .sort((a, b) => a.group - b.group || a.origin - b.origin);

  const scattered = i => TOP + i * (ROW_H + GAP);
  // Gathered adds a gap between branches, so the three clusters are visible.
  const gathered = (i, g) => TOP + i * (ROW_H + GAP) + g * 12;
  const groupY = g => TOP + 18 + g * 76;

  const H = TOP + sales.length * (ROW_H + GAP) + 2 * 12 + 8;
  const money = v => '£' + Number(v).toFixed(2);

  $: description = `Twelve sales grouped by branch. Before, ${sales.length} rows and one row is `
    + `${before.grain}. After, ${groups.length} rows and one row is ${after.grain}. `
    + groups.map(g => `${g.branch_id} holds ${g.sales} sales totalling ${money(g.total)}`).join('. ') + '.';
</script>

<figure class="collapse">
  <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={description}>
    <text x={LEFT_X} y="26" class="cap">sale</text>
    <text x={LEFT_X} y="42" class="sub">{sales.length} rows · one sale each</text>
    <text x={RIGHT_X} y="26" class="cap">GROUP BY branch_id</text>
    <text x={RIGHT_X} y="42" class="sub">{step >= 2 ? `${groups.length} rows · one branch each` : ' '}</text>

    <!-- every sale converges on the branch it belongs to; nothing is discarded -->
    {#each ordered as row, i}
      <path
        class="link" class:on={step >= 2}
        style={`transition-delay:${still ? 0 : i * 55}ms`}
        d={`M ${LEFT_X + LEFT_W} ${gathered(i, row.group) + ROW_H / 2}
            C ${LEFT_X + LEFT_W + 70} ${gathered(i, row.group) + ROW_H / 2},
              ${RIGHT_X - 70} ${groupY(row.group) + 17},
              ${RIGHT_X} ${groupY(row.group) + 17}`}
      />
    {/each}

    {#each ordered as row, i}
      <g class="row src g{row.group}" class:sorted={step >= 1}
         style={`transform:translateY(${still || step >= 1 ? gathered(i, row.group) - scattered(i) : 0}px);
                 transition-delay:${still ? 0 : i * 40}ms`}>
        <rect x={LEFT_X} y={scattered(i)} width={LEFT_W} height={ROW_H} rx="4" />
        <text x={LEFT_X + 9} y={scattered(i) + 14}>
          {row.sale_id}<tspan class="br" dx="10">{row.branch_id}</tspan><tspan class="val" dx="10">{money(row.basket_total)}</tspan>
        </text>
      </g>
    {/each}

    {#each groups as group, g}
      <g class="row out g{g}" class:on={step >= 2}
         style={`transition-delay:${still ? 0 : 260 + g * 150}ms`}>
        <rect x={RIGHT_X} y={groupY(g)} width={RIGHT_W} height={34} rx="6" />
        <text x={RIGHT_X + 11} y={groupY(g) + 22}>
          {group.branch_id}<tspan class="val" dx="12">{group.sales} sales</tspan><tspan class="val" dx="12">{money(group.total)}</tspan>
        </text>
      </g>
    {/each}
  </svg>

  <figcaption>
    <div class="state">
      <strong>{STEPS[step].label}</strong>
      <span>{STEPS[step].note}</span>
    </div>
    <div class="scale">Nothing was removed. <b>{sales.length}</b> rows became <b>{groups.length}</b>.</div>
    <button on:click={play} aria-label="Replay the grouping">{still ? 'Show steps' : 'Replay'}</button>
  </figcaption>
</figure>

<style>
  .collapse {
    margin: 0; padding: 14px 14px 10px;
    border: 1px solid var(--qx-border-2, #e4ddcd); border-radius: 14px;
    background: var(--qx-surface, #fff);
  }
  svg { display: block; width: 100%; height: auto; }

  .cap { font: 800 12px var(--qx-font); fill: var(--qx-text, #25231f); }
  .sub { font: 600 11px var(--qx-font); fill: var(--qx-text-dim, #8d8474); }

  .row rect { fill: var(--qx-surface-2, #f4f0e7); stroke: var(--qx-border-2, #ded6c6); stroke-width: 1; }
  .row text { font: 600 11px var(--qx-font); fill: var(--qx-text, #25231f); }
  .row .br { font: 700 11px ui-monospace, SFMono-Regular, Menlo, monospace; fill: var(--qx-text-dim, #8d8474); }
  .row .val { font-weight: 800; }

  /* One tint per branch, so gathering is legible before anything merges. */
  .src.sorted.g0 rect { fill: var(--qx-accent-soft, #f2e4da); stroke: var(--qx-accent, #a85a34); }
  .src.sorted.g1 rect { fill: var(--qx-green-soft, #e7efdc); stroke: var(--qx-pink, #3e9e2a); }
  .src.sorted.g2 rect { fill: var(--qx-surface-3, #ece7dc); stroke: var(--qx-text-dim, #8d8474); }

  .src { transition: transform .65s cubic-bezier(.25,.75,.3,1); }

  .out { opacity: 0; transform: translateX(12px);
    transition: opacity .5s ease, transform .5s cubic-bezier(.2,.8,.3,1); }
  .out.on { opacity: 1; transform: none; }
  .out.g0 rect { fill: var(--qx-accent-soft, #f2e4da); stroke: var(--qx-accent, #a85a34); stroke-width: 1.6; }
  .out.g1 rect { fill: var(--qx-green-soft, #e7efdc); stroke: var(--qx-pink, #3e9e2a); stroke-width: 1.6; }
  .out.g2 rect { fill: var(--qx-surface-3, #ece7dc); stroke: var(--qx-text-dim, #8d8474); stroke-width: 1.6; }

  .link { fill: none; stroke: var(--qx-border, #d8d0be); stroke-width: 1.1;
    opacity: 0; transition: opacity .4s ease; }
  .link.on { opacity: .8; }

  figcaption {
    display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 14px;
    margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--qx-border-2, #ece7dc);
    font: 650 12.5px/1.5 var(--qx-font); color: var(--qx-text-dim, #6b6152);
  }
  .state { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  .state strong { color: var(--qx-text, #25231f); font-weight: 800; }
  .scale { margin-left: auto; }
  .scale b { color: var(--qx-text, #25231f); font-variant-numeric: tabular-nums; }
  figcaption button {
    padding: 4px 12px; border: 1px solid var(--qx-border, #d8d0be); border-radius: 999px;
    background: none; color: var(--qx-text, #25231f); font: 800 11px var(--qx-font); cursor: pointer;
  }
  figcaption button:hover { border-color: var(--qx-text, #25231f); }
  figcaption button:focus-visible { outline: 2px solid var(--qx-accent, #a85a34); outline-offset: 2px; }

  @media (prefers-reduced-motion: reduce) {
    .src, .out, .link { transition: none !important; }
  }
  /* Same reason as the fan-out figure: at about 0.45 scale an 11px label
     renders near 5px. Headings sit on free canvas; the fifteen row labels
     sit inside fixed rects and are left alone. The right-hand labels start at x=392,
     so 248 units of viewBox remain and 23px is the largest that fits. */
  @media (max-width: 700px) {
    .cap { font-size: 23px; }
    .sub { font-size: 21px; }
  }
</style>
