<script>
  // The join, as the thing it does to the rows.
  //
  // Chapter 5 teaches that joining sale to sale_line stops one row meaning one
  // sale, and it teaches it in prose next to a static table. The static table
  // is the problem: the reader sees a result and has to imagine the step. What
  // is hard to grasp is not that the count went up. It is that one row's values
  // were *copied*, so the same basket total is now sitting on two rows and any
  // sum over it double-counts.
  //
  // So the motion is built around the copy rather than the arrival. The left
  // row lifts, its value is drawn twice, and the two copies are marked. That is
  // the whole lesson, and it is over in about three seconds.
  //
  // Deterministic SVG per docs/MEDIA-RULE.md. Every figure and every row comes
  // from the join-grain mission, so the reading and the mission cannot disagree,
  // and check-motion asserts the counts still match.

  import { onMount, onDestroy } from 'svelte';
  import { JOIN_GRAIN_MISSION } from '../game/join-grain-mission.js';

  /** Which case of the mission to draw. Defaults to the fan-out one. */
  export let caseId = 'sale-line';

  const source = JOIN_GRAIN_MISSION.cases.find(c => c.id === caseId);

  // One entry per result row, tagged with the left row it was copied from.
  const left = source.leftTable.rows;
  const keyAt = source.leftTable.columns.indexOf(source.key);
  const results = source.rows.map(row => ({
    cells: row,
    from: left.findIndex(l => l[keyAt] === row[0])
  }));
  // A left row that produced more than one result row is the one to point at.
  const copies = left.map((_, i) => results.filter(r => r.from === i).length);
  const duplicated = copies.findIndex(n => n > 1);

  const STEPS = [
    { label: 'One table', note: `${left.length} rows · one row is ${source.leftGrain}` },
    { label: 'Matching rows', note: `each ${source.left} finds its ${source.right} rows` },
    { label: 'After the join', note: `${results.length} rows · one row is ${source.grain}` }
  ];

  let step = 0;
  let still = false;          // reduced motion: show the finished state, no timeline
  let timer = null;

  function play() {
    clearTimeout(timer);
    if (still) { step = STEPS.length - 1; return; }
    step = 0;
    const advance = () => {
      if (step < STEPS.length - 1) {
        step += 1;
        timer = setTimeout(advance, 1400);
      }
    };
    timer = setTimeout(advance, 700);
  }

  onMount(() => {
    still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    play();
  });
  onDestroy(() => clearTimeout(timer));

  /* ── geometry, computed ──────────────────────────────────────────────── */
  const W = 640;
  const ROW_H = 34, GAP = 8;
  const LEFT_X = 24, LEFT_W = 196;
  const RIGHT_X = 388, RIGHT_W = 228;
  const TOP = 56;

  const leftY = i => TOP + i * (ROW_H + GAP) * 1.6;
  const rightY = i => TOP + i * (ROW_H + GAP);
  const H = Math.max(leftY(left.length - 1), rightY(results.length - 1)) + ROW_H + 52;

  // A curve from the left row to each row it became.
  const link = (li, ri) => {
    const y1 = leftY(li) + ROW_H / 2;
    const y2 = rightY(ri) + ROW_H / 2;
    const x1 = LEFT_X + LEFT_W;
    const x2 = RIGHT_X;
    const mid = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
  };

  const money = value => (/^\d+\.\d{2}$/.test(value) ? `£${value}` : value);

  $: caption = STEPS[step];
  $: description = `${source.left} joined to ${source.right} on ${source.key}: `
    + `${left.length} rows become ${results.length}, and one row stops meaning `
    + `${source.leftGrain}. It means ${source.grain}. `
    + `${source.leftTable.rows[duplicated]?.[0]} appears ${copies[duplicated]} times.`;
</script>

<figure class="fanout" class:still>
  <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={description}>
    <!-- table headings -->
    <text x={LEFT_X} y="26" class="cap">{source.left}</text>
    <text x={LEFT_X} y="42" class="sub">{left.length} rows</text>
    <text x={RIGHT_X} y="26" class="cap">{source.left} JOIN {source.right}</text>
    <text x={RIGHT_X} y="42" class="sub">{step >= 2 ? `${results.length} rows` : ' '}</text>

    <!-- the copies, drawn before the rows so rows sit on top -->
    {#each results as r, ri}
      <path
        d={link(r.from, ri)}
        class="link"
        class:on={step >= 1}
        style={`transition-delay:${still ? 0 : 120 + ri * 90}ms`}
      />
    {/each}

    <!-- the source rows -->
    {#each left as row, i}
      <g class="row src" class:lifted={step >= 1 && i === duplicated}>
        <rect x={LEFT_X} y={leftY(i)} width={LEFT_W} height={ROW_H} rx="6" />
        <text x={LEFT_X + 11} y={leftY(i) + 22}>
          {row[0]}<tspan class="val" dx="12">{money(row[1])}</tspan>
        </text>
        {#if i === duplicated}
          <text x={LEFT_X} y={leftY(i) + ROW_H + 15} class="tag" class:on={step >= 2}>
            copied onto {copies[i]} rows
          </text>
        {/if}
      </g>
    {/each}

    <!-- the joined rows -->
    {#each results as r, ri}
      <g
        class="row out"
        class:on={step >= 2}
        class:dup={r.from === duplicated}
        style={`transition-delay:${still ? 0 : ri * 140}ms`}
      >
        <rect x={RIGHT_X} y={rightY(ri)} width={RIGHT_W} height={ROW_H} rx="6" />
        <text x={RIGHT_X + 11} y={rightY(ri) + 22}>
          {r.cells[0]}<tspan class="val" dx="10">{money(r.cells[1])}</tspan><tspan class="rest" dx="10">{r.cells.slice(2).join('  ')}</tspan>
        </text>
      </g>
    {/each}
  </svg>

  <figcaption>
    <div class="state">
      <strong>{caption.label}</strong>
      <span>{caption.note}</span>
    </div>
    <div class="scale">
      At full size: <b>{source.leftRows.toLocaleString()}</b> becomes
      <b>{source.resultRows.toLocaleString()}</b>.
    </div>
    <button on:click={play} aria-label="Replay the join">{still ? 'Show steps' : 'Replay'}</button>
  </figcaption>
</figure>

<style>
  .fanout {
    margin: 0; padding: 14px 14px 10px;
    border: 1px solid var(--qx-border-2, #e4ddcd); border-radius: 14px;
    background: var(--qx-surface, #fff);
  }
  svg { display: block; width: 100%; height: auto; }

  .cap { font: 800 12px var(--qx-font); fill: var(--qx-text, #25231f); letter-spacing: .02em; }
  .sub { font: 650 11px var(--qx-font); fill: var(--qx-text-dim, #8d8474); }

  .row rect {
    fill: var(--qx-surface-2, #f4f0e7);
    stroke: var(--qx-border-2, #ded6c6); stroke-width: 1.2;
  }
  .row text { font: 650 12px var(--qx-font); fill: var(--qx-text, #25231f); }
  .row .val { font-weight: 800; }
  .row .rest { font: 600 11px ui-monospace, SFMono-Regular, Menlo, monospace; fill: var(--qx-text-dim, #8d8474); }

  /* The source row that gets copied lifts, so the eye follows it. */
  .src { transition: transform .5s cubic-bezier(.2,.7,.3,1); }
  .src.lifted { transform: translateX(-6px); }
  .src.lifted rect { stroke: var(--qx-accent, #a85a34); stroke-width: 2; }

  .out { opacity: 0; transform: translateX(14px); transition: opacity .45s ease, transform .45s cubic-bezier(.2,.7,.3,1); }
  .out.on { opacity: 1; transform: none; }
  /* The duplicated value is the lesson, so it is the only thing marked. */
  .out.dup rect { fill: var(--qx-accent-soft, #f2e4da); stroke: var(--qx-accent, #a85a34); }
  .out.dup .val { fill: var(--qx-accent-text, #8c4c2e); }

  .link {
    fill: none; stroke: var(--qx-border, #d8d0be); stroke-width: 1.6;
    opacity: 0; transition: opacity .4s ease;
  }
  .link.on { opacity: 1; }

  .tag { font: 800 11px var(--qx-font); fill: var(--qx-accent-text, #8c4c2e); opacity: 0; transition: opacity .4s ease .2s; }
  .tag.on { opacity: 1; }

  figcaption {
    display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 14px;
    margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--qx-border-2, #ece7dc);
    font: 650 12.5px/1.5 var(--qx-font); color: var(--qx-text-dim, #6b6152);
  }
  .state { display: flex; align-items: baseline; gap: 8px; }
  .state strong { color: var(--qx-text, #25231f); font-weight: 800; }
  .scale { margin-left: auto; }
  .scale b { color: var(--qx-text, #25231f); font-variant-numeric: tabular-nums; }
  figcaption button {
    padding: 4px 12px; border: 1px solid var(--qx-border, #d8d0be); border-radius: 999px;
    background: none; color: var(--qx-text, #25231f);
    font: 800 11px var(--qx-font); cursor: pointer;
  }
  figcaption button:hover { border-color: var(--qx-text, #25231f); }
  figcaption button:focus-visible { outline: 2px solid var(--qx-accent, #a85a34); outline-offset: 2px; }

  /* Nothing moves. The finished state is drawn immediately and stays readable. */
  @media (prefers-reduced-motion: reduce) {
    .src, .out, .link, .tag { transition: none !important; }
  }
</style>
