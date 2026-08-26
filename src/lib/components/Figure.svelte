<script>
  // A figure in the reading, drawn by the same functions the missions draw with.
  //
  // The reader rendered no svg, no canvas and no img across twenty-eight
  // sessions. Chapter 04 taught distributions with no picture of one; chapter 05
  // taught what a clause does to a row without ever showing rows leaving.
  //
  // Every figure here is computed, not drawn once and pasted. histogram() and
  // summarise() come from the Distribution Desk, readingsFor() from the Rate
  // Desk, runQuery() from the SQL Console, runProgram() from Read the Program,
  // and the absence panel reads mission 003's own cases. So a figure in the
  // reading and the thing the mission does are one computation with two
  // renderings, and they cannot drift apart.
  //
  // Deterministic SVG per the media rule: quantities, axes and labels never go
  // into a raster frame.
  import { histogram, summarise, DISTRIBUTION_DESK_MISSION } from '../game/distribution-desk-mission.js';
  import { readingsFor, round, RATE_DESK_MISSION } from '../game/rate-desk-mission.js';
  import { runQuery } from '../game/sql-console-mission.js';
  import { runProgram, PYTHON_TRACE_MISSION } from '../game/python-trace-mission.js';
  import { MISSING_DATA_MISSION } from '../game/missing-data-mission.js';

  export let spec;

  const W = 640, H = 260, L = 44, R = 14, T = 16, B = 34;
  const caseOf = (mission, id) => mission.cases.find(c => c.id === id);

  $: source = spec.kind === 'histogram' ? caseOf(DISTRIBUTION_DESK_MISSION, spec.case)
    : spec.kind === 'rates' ? caseOf(RATE_DESK_MISSION, spec.case)
    : spec.kind === 'trace' ? caseOf(PYTHON_TRACE_MISSION, spec.case)
    : null;

  /* ── histogram ──────────────────────────────────────────────────────────── */
  $: bins = spec.kind === 'histogram' && source ? histogram(source.values, spec.width ?? source.width) : [];
  $: stats = spec.kind === 'histogram' && source ? summarise(source.values) : null;
  $: peak = bins.length ? Math.max(...bins.map(b => b.count)) : 1;
  $: lo = bins.length ? bins[0].start : 0;
  $: hi = bins.length ? bins[bins.length - 1].end : 1;
  $: xOf = v => L + ((v - lo) / (hi - lo || 1)) * (W - L - R);
  $: money = source?.unit === '£';
  $: tick = v => (money ? `£${v}` : `${v}${source?.unit ?? ''}`);

  /* ── rates ──────────────────────────────────────────────────────────────── */
  $: reading = spec.kind === 'rates' && source ? readingsFor(source) : null;
  $: rawMax = reading?.rows ? Math.max(...reading.rows.map(r => r.numerator)) : 1;
  $: rateMax = reading?.rows ? Math.max(...reading.rows.map(r => r.value)) : 1;
  $: rateH = reading?.rows ? 34 + reading.rows.length * 54 : 200;

  /* ── query ──────────────────────────────────────────────────────────────── */
  // Each stage is really run, so the counts are what the console returns.
  $: stages = spec.kind === 'query'
    ? spec.stages.map(st => {
        const r = runQuery({ where: st.where ?? null, groupBy: st.groupBy ?? null, having: st.having ?? null });
        return { ...st, rows: r.rows.length, grain: r.grain };
      })
    : [];

  /* ── trace ──────────────────────────────────────────────────────────────── */
  // What the accumulator held after each pass, taken from the executed program.
  $: run = spec.kind === 'trace' && source ? runProgram(source.program, source.data) : null;
  $: steps = run
    ? run.trace.filter(t => t.label.startsWith(`${spec.name} =`)).map(t => t.env[spec.name])
    : [];
  $: traceMax = steps.length ? Math.max(...steps, 1) : 1;

  /* ── absence ────────────────────────────────────────────────────────────── */
  $: cells = spec.kind === 'absence'
    ? spec.cases.map(id => MISSING_DATA_MISSION.cases.find(c => c.id === id)).filter(Boolean)
    : [];
</script>

<figure class="qx-figure">
  {#if spec.kind === 'histogram' && bins.length}
    <svg viewBox={`0 0 ${W} ${H}`} role="img"
         aria-label={`Histogram of ${source.values.length} values from ${tick(stats.min)} to ${tick(stats.max)}. The mean is ${tick(round(stats.mean, 1))} and the median ${tick(stats.median)}.`}>
      <line class="axis" x1={L} y1={H - B} x2={W - R} y2={H - B} />
      {#each bins as bin}
        {@const x = xOf(bin.start)}
        {@const w = Math.max(1, xOf(bin.end) - xOf(bin.start) - 1.5)}
        {@const h = (bin.count / peak) * (H - T - B)}
        <rect class="bar" x={x} y={H - B - h} width={w} height={h} />
      {/each}
      <line class="mark median" x1={xOf(stats.median)} y1={T - 4} x2={xOf(stats.median)} y2={H - B} />
      <line class="mark mean" x1={xOf(stats.mean)} y1={T - 4} x2={xOf(stats.mean)} y2={H - B} />
      <text class="mark-label median" x={xOf(stats.median)} y={T + 6} text-anchor="middle">median {tick(stats.median)}</text>
      <text class="mark-label mean" x={xOf(stats.mean)} y={T - 4} text-anchor="middle">mean {tick(round(stats.mean, 1))}</text>
      <text class="tick" x={L} y={H - B + 15}>{tick(lo)}</text>
      <text class="tick" x={W - R} y={H - B + 15} text-anchor="end">{tick(hi)}</text>
      <text class="tick" x={L - 8} y={H - B} text-anchor="end">0</text>
      <text class="tick" x={L - 8} y={T + 8} text-anchor="end">{peak}</text>
    </svg>

  {:else if spec.kind === 'rates' && reading?.rows}
    <svg viewBox={`0 0 ${W} ${rateH}`} role="img"
         aria-label={reading.rows.map(r => `${r.label}: ${r.numerator} of ${r.denominator}, which is ${round(r.value, 1)}`).join('. ')}>
      <text class="panel-label" x="0" y="14">AS COUNTED</text>
      <text class="panel-label" x={W / 2 + 12} y="14">OVER ITS DENOMINATOR</text>
      {#each reading.rows as row, i}
        {@const y = 40 + i * 54}
        <text class="row-label" x="0" y={y - 6}>{row.label}</text>
        <rect class="track" x="0" y={y} width={W / 2 - 30} height="16" rx="3" />
        <rect class="bar raw" x="0" y={y} width={(row.numerator / rawMax) * (W / 2 - 30)} height="16" rx="3" />
        <text class="value" x={W / 2 - 24} y={y + 13}>{row.numerator.toLocaleString()}</text>
        <rect class="track" x={W / 2 + 12} y={y} width={W / 2 - 42} height="16" rx="3" />
        <rect class="bar rate" x={W / 2 + 12} y={y} width={(row.value / rateMax) * (W / 2 - 42)} height="16" rx="3" />
        <text class="value" x={W - 12} y={y + 13} text-anchor="end">{round(row.value, 1)}{source.asPercent ? '%' : ''}</text>
      {/each}
    </svg>

  {:else if spec.kind === 'query' && stages.length}
    <!-- Rows leaving, and the moment one row stops meaning one sale. -->
    <svg viewBox={`0 0 ${W} 246`} role="img"
         aria-label={stages.map(s => `${s.clause}: ${s.rows} rows, one row is ${s.grain}`).join('. ')}>
      {#each stages as st, i}
        {@const cw = (W - (stages.length - 1) * 30) / stages.length}
        {@const x = i * (cw + 30)}
        {@const changed = i > 0 && st.grain !== stages[i - 1].grain}
        <text class="panel-label" x={x} y="11">{st.clause}</text>
        <rect class="stage-box" class:changed x={x} y="18" width={cw} height="140" rx="6" />
        {#each Array(st.rows) as _, r}
          <rect class="row-chip" class:changed
                x={x + 13 + Math.floor(r / 6) * 21} y={28 + (r % 6) * 20} width="15" height="12" rx="2" />
        {/each}
        <text class="stage-count" x={x + cw / 2} y="180" text-anchor="middle">{st.rows} rows</text>
        <text class="stage-grain" class:changed x={x + cw / 2} y="199" text-anchor="middle">one row = {st.grain}</text>
        {#if changed}<text class="stage-flag" x={x + cw / 2} y="219" text-anchor="middle">THE GRAIN MOVED</text>{/if}
        {#if i < stages.length - 1}<text class="arrow" x={x + cw + 15} y="93" text-anchor="middle">→</text>{/if}
      {/each}
    </svg>

  {:else if spec.kind === 'trace' && steps.length}
    <!-- What the accumulator actually held, pass by pass. -->
    <svg viewBox={`0 0 ${W} 196`} role="img"
         aria-label={`${spec.name} holds ${steps.join(', then ')} as the loop runs.`}>
      <text class="row-label" x={L} y="14">{spec.name}</text>
      <line class="axis" x1={L} y1="156" x2={W - R} y2="156" />
      {#each steps as v, i}
        {@const bw = (W - L - R) / steps.length}
        {@const x = L + i * bw}
        {@const h = (v / traceMax) * 110}
        <rect class="bar" x={x + 7} y={156 - h} width={bw - 16} height={h} rx="2" />
        <text class="value" x={x + bw / 2} y={149 - h} text-anchor="middle">{v}</text>
        <text class="tick" x={x + bw / 2} y="172" text-anchor="middle">{i === 0 ? 'before' : `pass ${i}`}</text>
      {/each}
    </svg>

  {:else if spec.kind === 'absence' && cells.length}
    <!-- Cells that look alike and must be treated differently.
         Built as a table rather than SVG: this figure is words, not geometry, and
         in SVG the explanations ran past the viewBox and were clipped mid
         sentence. HTML wraps them and a screen reader gets the columns. -->
    <div class="table-wrap">
      <table class="absence">
        <thead>
          <tr><th scope="col">The cell</th><th scope="col">The field</th><th scope="col">What it actually is</th></tr>
        </thead>
        <tbody>
          {#each cells as c}
            <tr>
              <td><span class="chip" class:present={c.valueState === 'present'}>{c.displayValue}</span></td>
              <td><code>{c.field}</code></td>
              <td class:good={c.valueState === 'present'}>{c.explanation}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  <figcaption>
    <b>{spec.caption}</b>
    {#if spec.note}<span>{spec.note}</span>{/if}
  </figcaption>
</figure>

<style>
  .qx-figure { margin: 30px 0 0; padding: 20px 20px 16px; border: 1px solid #ded7c8;
               border-radius: 13px; background: #fbf9f4; }
  svg { display: block; width: 100%; height: auto; overflow: visible; }

  .axis { stroke: #cbbfa6; stroke-width: 1; }
  .bar { fill: #c98c5e; }
  .bar.raw { fill: #cbbfa6; }
  .bar.rate { fill: #a85a34; }
  .track { fill: #ece7dc; }

  .mark { stroke-width: 1.5; stroke-dasharray: 4 3; }
  .mark.median { stroke: #5f7355; }
  .mark.mean { stroke: #a85a34; }
  .mark-label { font: 800 11.5px var(--qx-font); letter-spacing: .04em; }
  .mark-label.median { fill: #4e6548; }
  .mark-label.mean { fill: #8c4c2e; }

  .tick { fill: #8a7f6a; font: 600 11.5px var(--qx-font); }
  .panel-label { fill: #8c4c2e; font: 900 11px var(--qx-font); letter-spacing: .12em; }
  .row-label { fill: #241f16; font: 700 11.5px var(--qx-font); }
  .value { fill: #241f16; font: 800 11.5px var(--qx-font); font-variant-numeric: tabular-nums; }

  .stage-box { fill: #f4f0e7; stroke: #ded7c8; }
  .stage-box.changed { stroke: #a85a34; }
  .row-chip { fill: #cbbfa6; }
  .row-chip.changed { fill: #a85a34; }
  .stage-count { fill: #241f16; font: 800 12.5px var(--qx-font); font-variant-numeric: tabular-nums; }
  .stage-grain { fill: #625a49; font: 600 11.5px var(--qx-font); }
  .stage-grain.changed { fill: #8c4c2e; font-weight: 800; }
  .stage-flag { fill: #8c4c2e; font: 900 11px var(--qx-font); letter-spacing: .1em; }
  .arrow { fill: #a99d88; font: 400 17px var(--qx-font); }

  .table-wrap { overflow-x: auto; }
  table.absence { width: 100%; border-collapse: collapse; }
  table.absence th { padding: 0 12px 9px 0; text-align: left; color: #8c4c2e;
                     font: 900 11px var(--qx-font); letter-spacing: .12em; text-transform: uppercase; }
  table.absence td { padding: 9px 12px 9px 0; vertical-align: top;
                     border-top: 1px solid #ece7dc; color: #625a49;
                     font: 400 13px/1.5 var(--qx-font); }
  table.absence td.good { color: #3c6427; }
  table.absence code { color: #241f16; font: 600 12.5px ui-monospace, Menlo, Consolas, monospace; }
  .chip { display: inline-block; min-width: 74px; padding: 5px 12px; border-radius: 5px;
          background: #f2e4da; border: 1px solid #dcc3b3; color: #8c4c2e;
          font: 800 12.5px ui-monospace, Menlo, Consolas, monospace; text-align: center; }
  .chip.present { background: #e7efdc; border-color: #bcd3a8; color: #3c6427; }

  figcaption { margin-top: 14px; padding-top: 12px; border-top: 1px solid #e4ddce;
               display: flex; flex-direction: column; gap: 4px; }
  figcaption b { color: #241f16; font: 800 12px var(--qx-font); letter-spacing: .05em; text-transform: uppercase; }
  figcaption span { color: #625a49; font: 400 13.5px/1.55 var(--qx-font); }
</style>
