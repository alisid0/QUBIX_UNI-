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

  /* ── frequency table ──────────────────────────────────────────────────── */
  $: frequencyRows = spec.kind === 'frequency-table'
    ? [...new Set(spec.values)].sort((a, b) => a - b).map(value => {
        const frequency = spec.values.filter(item => item === value).length;
        const through = spec.values.filter(item => item <= value).length;
        return { value, frequency, relative: frequency / spec.values.length, cumulative: through / spec.values.length };
      })
    : [];
  $: frequencyPeak = frequencyRows.length ? Math.max(...frequencyRows.map(row => row.frequency)) : 1;

  /* ── five-number summary ─────────────────────────────────────────────── */
  const medianOf = values => {
    const middle = Math.floor(values.length / 2);
    return values.length % 2 ? values[middle] : (values[middle - 1] + values[middle]) / 2;
  };
  const summariseFive = values => {
    const sorted = [...values].sort((a, b) => a - b);
    const halfway = Math.floor(sorted.length / 2);
    const lower = sorted.slice(0, halfway);
    const upper = sorted.slice(Math.ceil(sorted.length / 2));
    const q1 = medianOf(lower), median = medianOf(sorted), q3 = medianOf(upper);
    return { sorted, min: sorted[0], q1, median, q3, max: sorted.at(-1), iqr: q3 - q1 };
  };
  $: five = spec.kind === 'five-number-summary' && spec.values?.length >= 4 ? summariseFive(spec.values) : null;
  $: fivePosition = value => five ? ((value - five.min) / (five.max - five.min || 1)) * 100 : 0;
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
  {:else if spec.kind === 'data-types'}
    <div class="type-map" role="img" aria-label="Data types map. A variable can be categorical or quantitative. Categorical variables can be nominal or ordinal. Quantitative variables can be discrete or continuous.">
      <div class="type-root"><span>START HERE</span><b>A variable</b><small>What does this column mean?</small></div>
      <div class="type-branches" aria-hidden="true"><i></i><i></i></div>
      <div class="type-family categorical">
        <header><span>GROUP OR LABEL</span><b>Categorical</b><p>Arithmetic does not describe the meaning.</p></header>
        <div class="type-leaves">
          <div><b>Nominal</b><span>No natural order</span><code>branch_id · B-08</code></div>
          <div><b>Ordinal</b><span>Ordered categories</span><code>satisfaction · Good</code></div>
        </div>
      </div>
      <div class="type-family quantitative">
        <header><span>COUNT OR MEASUREMENT</span><b>Quantitative</b><p>Arithmetic can describe the amount.</p></header>
        <div class="type-leaves">
          <div><b>Discrete</b><span>Counted values</span><code>items_in_basket · 6</code></div>
          <div><b>Continuous</b><span>Measured values</span><code>basket_weight_kg · 4.7</code></div>
        </div>
      </div>
    </div>
  {:else if spec.kind === 'record-chain'}
    <div class="record-chain" role="img" aria-label="A checkout event becomes an observed barcode, joins to a stored product price, and produces a derived line total.">
      <div><span>1 · WORLD</span><b>Sale happens</b><small>Two bottles reach checkout</small></div>
      <i aria-hidden="true">→</i>
      <div><span>2 · OBSERVE</span><b>Scan barcode</b><code>5012345678900</code></div>
      <i aria-hidden="true">+</i>
      <div><span>3 · LOOK UP</span><b>Stored price</b><code>£3.40 each</code></div>
      <i aria-hidden="true">→</i>
      <div class="result"><span>4 · DERIVE</span><b>Line total</b><code>2 × £3.40 = £6.80</code></div>
    </div>
  {:else if spec.kind === 'row-grain'}
    <div class="grain-map" role="img" aria-label="One completed sale has one sale row, three sale-line rows and one payment row.">
      <div class="grain-event"><span>ONE REAL EVENT</span><b>Sale S-1041</b><small>3 products · 1 payment</small></div>
      <div class="grain-arrow" aria-hidden="true">↓</div>
      <div class="grain-tables">
        <div><span>SALE TABLE</span><b>1 row</b><small>one completed sale</small><i></i></div>
        <div><span>SALE_LINE TABLE</span><b>3 rows</b><small>one product line in the sale</small><i></i><i></i><i></i></div>
        <div><span>PAYMENT TABLE</span><b>1 row</b><small>one payment attempt</small><i></i></div>
      </div>
    </div>
  {:else if spec.kind === 'decision-cycle'}
    <div class="decision-cycle" role="img" aria-label="An analytical lifecycle moving from decision and question through evidence, method, finding and communication, then back through monitoring to the next question.">
      <div><span>1</span><b>Decision</b><small>Who might act—and by when?</small></div><i aria-hidden="true">→</i>
      <div><span>2</span><b>Question</b><small>Population, outcome, comparison, period</small></div><i aria-hidden="true">→</i>
      <div><span>3</span><b>Evidence</b><small>What can the records support?</small></div><i aria-hidden="true">→</i>
      <div><span>4</span><b>Method</b><small>What comparison answers it?</small></div><i aria-hidden="true">→</i>
      <div><span>5</span><b>Finding</b><small>Result, uncertainty, limitation</small></div><i aria-hidden="true">→</i>
      <div><span>6</span><b>Communicate</b><small>Recommendation, not hidden judgement</small></div><i aria-hidden="true">→</i>
      <div class="cycle-end"><span>7</span><b>Monitor</b><small>Did the action work?</small></div>
    </div>
  {:else if spec.kind === 'frequency-table' && frequencyRows.length}
    <div class="frequency-figure" role="img" aria-label={frequencyRows.map(row => `${row.value} items occurs ${row.frequency} times; ${Math.round(row.cumulative * 100)} percent of baskets have ${row.value} items or fewer`).join('. ')}>
      <div class="frequency-raw"><span>RAW VALUES</span><b>{spec.values.join(' · ')}</b></div>
      <div class="frequency-head"><span>ITEMS</span><span>HOW OFTEN</span><span>SHARE</span><span>AT MOST</span></div>
      {#each frequencyRows as row}
        <div class="frequency-line">
          <b>{row.value}</b>
          <div><i style={`width:${(row.frequency / frequencyPeak) * 100}%`}></i><em>{row.frequency}</em></div>
          <span>{Math.round(row.relative * 100)}%</span>
          <span>{Math.round(row.cumulative * 100)}%</span>
        </div>
      {/each}
    </div>
  {:else if spec.kind === 'five-number-summary' && five}
    <div class="five-summary" role="img" aria-label={`Five-number summary. Minimum ${five.min}, first quartile ${five.q1}, median ${five.median}, third quartile ${five.q3}, maximum ${five.max}. The interquartile range is ${five.iqr}.`}>
      <div class="five-raw"><span>ORDER THE VALUES FIRST</span><b>{five.sorted.join(' · ')}</b></div>
      <div class="boxplot" aria-hidden="true">
        <i class="whisker" style={`left:${fivePosition(five.min)}%;width:${fivePosition(five.max) - fivePosition(five.min)}%`}></i>
        <i class="box" style={`left:${fivePosition(five.q1)}%;width:${fivePosition(five.q3) - fivePosition(five.q1)}%`}></i>
        {#each [['MIN', five.min], ['Q1', five.q1], ['MEDIAN', five.median], ['Q3', five.q3], ['MAX', five.max]] as point}
          <i class="point" style={`left:${fivePosition(point[1])}%`}><b>{point[0]}</b><span>{point[1]}</span></i>
        {/each}
      </div>
      <div class="iqr-line"><span>MIDDLE 50%</span><b>Q3 − Q1 = {five.q3} − {five.q1} = {five.iqr}</b></div>
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

  .type-map { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 14px; }
  .type-root { grid-column: 1 / -1; justify-self: center; min-width: 210px; padding: 12px 18px;
               display: grid; justify-items: center; border: 2px solid #241f16; border-radius: 9px;
               background: #fff; box-shadow: 4px 4px 0 #241f16; }
  .type-root span, .type-family header span { color: #8c4c2e; font: 900 11px var(--qx-font); letter-spacing: .12em; }
  .type-root b { font: 700 20px Georgia, serif; }
  .type-root small { color: #625a49; font: 650 11px var(--qx-font); }
  .type-branches { grid-column: 1 / -1; height: 30px; position: relative; }
  .type-branches::before { content: ''; position: absolute; top: 0; left: 50%; height: 15px; border-left: 2px solid #241f16; }
  .type-branches::after { content: ''; position: absolute; top: 15px; left: 25%; right: 25%; border-top: 2px solid #241f16; }
  .type-branches i { position: absolute; top: 15px; height: 15px; border-left: 2px solid #241f16; }
  .type-branches i:first-child { left: 25%; }
  .type-branches i:last-child { left: 75%; }
  .type-family { border: 2px solid #241f16; border-radius: 10px; background: #fff; overflow: hidden; box-shadow: 4px 4px 0 #241f16; }
  .type-family header { padding: 14px 15px; border-bottom: 1px solid #d8d0be; }
  .type-family header b { display: block; margin: 2px 0 3px; color: #241f16; font: 700 21px Georgia, serif; }
  .type-family header p { margin: 0; color: #625a49; font: 600 11.5px/1.4 var(--qx-font); }
  .type-family.quantitative header { background: #eef1e9; }
  .type-family.categorical header { background: #f4ede0; }
  .type-leaves { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .type-leaves > div { min-width: 0; padding: 13px 14px; display: grid; gap: 3px; }
  .type-leaves > div + div { border-left: 1px solid #d8d0be; }
  .type-leaves b { color: #241f16; font: 850 13px var(--qx-font); }
  .type-leaves span { color: #625a49; font: 600 11px var(--qx-font); }
  .type-leaves code { margin-top: 5px; color: #8c4c2e; font: 700 11px/1.35 ui-monospace, Menlo, Consolas, monospace; overflow-wrap: anywhere; }

  .record-chain { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr auto 1.15fr; gap: 9px; align-items: stretch; }
  .record-chain > div { min-width: 0; padding: 14px 12px; display: grid; align-content: center; gap: 4px;
                        border: 1px solid #cbbfa6; border-radius: 9px; background: #fff; }
  .record-chain > div.result { border: 2px solid #241f16; background: #eef1e9; box-shadow: 3px 3px 0 #241f16; }
  .record-chain span, .grain-map span { color: #8c4c2e; font: 900 11px var(--qx-font); letter-spacing: .1em; }
  .record-chain b { font: 700 15px Georgia, serif; }
  .record-chain small { color: #625a49; font: 650 11px/1.35 var(--qx-font); }
  .record-chain code { color: #4e6548; font: 750 11px/1.35 ui-monospace, Menlo, Consolas, monospace; overflow-wrap: anywhere; }
  .record-chain > i { align-self: center; color: #8c4c2e; font: 900 18px var(--qx-font); font-style: normal; }

  .grain-map { display: grid; justify-items: center; }
  .grain-event { min-width: 220px; padding: 12px 18px; display: grid; justify-items: center; gap: 2px;
                 border: 2px solid #241f16; border-radius: 9px; background: #f4ede0; box-shadow: 4px 4px 0 #241f16; }
  .grain-event b { font: 700 19px Georgia, serif; }
  .grain-event small, .grain-tables small { color: #625a49; font: 650 11.5px/1.35 var(--qx-font); }
  .grain-arrow { color: #241f16; font: 900 23px var(--qx-font); line-height: 34px; }
  .grain-tables { width: 100%; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  .grain-tables > div { min-width: 0; padding: 13px; display: grid; grid-template-columns: 1fr auto; gap: 4px 8px;
                       border: 1px solid #cbbfa6; border-radius: 9px; background: #fff; }
  .grain-tables span, .grain-tables small { grid-column: 1 / -1; }
  .grain-tables b { font: 800 16px var(--qx-font); }
  .grain-tables i { display: block; width: 23px; height: 9px; margin: 2px 0; border-radius: 2px; background: #c98c5e; }

  .decision-cycle { display: grid; grid-template-columns: repeat(7, minmax(74px, 1fr) auto); align-items: stretch; gap: 6px; overflow-x: auto; padding: 2px 3px 8px; }
  .decision-cycle > div { min-width: 96px; padding: 12px 10px; display: grid; align-content: start; gap: 4px; border: 1px solid #cbbfa6; border-radius: 9px; background: #fff; }
  .decision-cycle > div:first-child, .decision-cycle > div.cycle-end { border: 2px solid #241f16; background: #eef1e9; box-shadow: 3px 3px 0 #241f16; }
  .decision-cycle span { width: 24px; height: 24px; display: grid; place-items: center; border-radius: 50%; background: #8c4c2e; color: #fff; font: 900 11px var(--qx-font); }
  .decision-cycle b { font: 750 14px Georgia, serif; }
  .decision-cycle small { color: #625a49; font: 650 11px/1.35 var(--qx-font); }
  .decision-cycle > i { align-self: center; color: #8c4c2e; font: 900 16px var(--qx-font); font-style: normal; }

  .frequency-figure{display:grid;gap:1px;border:2px solid #241f16;background:#241f16}.frequency-raw{padding:13px 15px;background:#f4ede0}.frequency-raw span{display:block;color:#8c4c2e;font:900 11px var(--qx-font);letter-spacing:.12em}.frequency-raw b{display:block;margin-top:5px;font:800 13px ui-monospace,Menlo,Consolas,monospace;word-spacing:4px}.frequency-head,.frequency-line{display:grid;grid-template-columns:70px minmax(150px,1fr) 70px 70px;align-items:center;gap:10px;padding:8px 12px}.frequency-head{background:#241f16;color:#fff;font:900 11px var(--qx-font);letter-spacing:.06em}.frequency-line{background:#fff}.frequency-line>b,.frequency-line>span{font:800 12px var(--qx-font)}.frequency-line>div{height:22px;position:relative;background:#ece7dc;border-radius:3px;overflow:hidden}.frequency-line i{display:block;height:100%;background:#c98c5e}.frequency-line em{position:absolute;inset:0;display:grid;place-items:center;color:#241f16;font:900 11px var(--qx-font);font-style:normal}

  .five-summary{display:grid;gap:16px}.five-raw{padding:12px 14px;border:2px solid #241f16;background:#f4ede0}.five-raw span,.iqr-line span{display:block;color:#8c4c2e;font:900 11px var(--qx-font);letter-spacing:.11em}.five-raw b{display:block;margin-top:5px;font:800 13px ui-monospace,Menlo,Consolas,monospace;word-spacing:4px}.boxplot{height:118px;position:relative;margin:0 34px}.boxplot .whisker{position:absolute;top:52px;height:2px;background:#241f16}.boxplot .whisker::before,.boxplot .whisker::after{content:'';position:absolute;top:-12px;height:26px;border-left:2px solid #241f16}.boxplot .whisker::after{right:0}.boxplot .box{position:absolute;top:34px;height:38px;border:2px solid #241f16;background:#e5d6be;box-shadow:3px 3px 0 #241f16}.boxplot .point{position:absolute;top:22px;height:62px;border-left:2px solid #8c4c2e;font-style:normal}.boxplot .point b,.boxplot .point span{position:absolute;left:0;transform:translateX(-50%);white-space:nowrap;font-family:var(--qx-font)}.boxplot .point b{top:-18px;color:#8c4c2e;font-size:11px;letter-spacing:.07em}.boxplot .point span{top:66px;color:#241f16;font-size:12px;font-weight:850}.iqr-line{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 13px;background:#241f16;color:#fff}.iqr-line span{color:#e4a37c}.iqr-line b{font:800 12px ui-monospace,Menlo,Consolas,monospace}

  figcaption { margin-top: 14px; padding-top: 12px; border-top: 1px solid #e4ddce;
               display: flex; flex-direction: column; gap: 4px; }
  figcaption b { color: #241f16; font: 800 12px var(--qx-font); letter-spacing: .05em; text-transform: uppercase; }
  figcaption span { color: #625a49; font: 400 13.5px/1.55 var(--qx-font); }

  @media (max-width: 620px) {
    .qx-figure { padding: 16px 14px 14px; }
    .type-map { grid-template-columns: 1fr; gap: 12px; }
    .type-root { grid-column: auto; width: 100%; min-width: 0; }
    .type-branches { display: none; }
    .type-family { box-shadow: 3px 3px 0 #241f16; }
    .type-leaves { grid-template-columns: 1fr; }
    .type-leaves > div + div { border-left: 0; border-top: 1px solid #d8d0be; }
    .record-chain { grid-template-columns: 1fr; }
    .record-chain > i { justify-self: center; transform: rotate(90deg); }
    .grain-tables { grid-template-columns: 1fr; }
    .decision-cycle { grid-template-columns: 1fr; overflow: visible; }
    .decision-cycle > i { justify-self: center; transform: rotate(90deg); }
    .frequency-head,.frequency-line{grid-template-columns:42px minmax(90px,1fr) 48px 54px;gap:6px;padding:8px 7px}.frequency-head{font-size:11px;letter-spacing:0}
    .boxplot{margin:0 18px}.boxplot .point:nth-of-type(4) b{transform:translateX(-82%)}.boxplot .point:nth-of-type(5) b{transform:translateX(-28%)}.iqr-line{align-items:flex-start;flex-direction:column}.five-raw b{font-size:11px}
  }
</style>
