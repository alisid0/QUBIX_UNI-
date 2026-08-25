<script>
  // A figure in the reading, drawn by the same functions the missions draw with.
  //
  // Chapter 04 taught distributions, centre and spread with no picture of one.
  // Chapter 02 taught rates and change with no chart. The reader rendered no
  // svg, no canvas and no img in twenty-eight sessions, which is a strange way
  // to teach the shape of data.
  //
  // The figures could have been drawn once and pasted in. They are computed
  // instead, from histogram(), summarise() and readingsFor() — the functions the
  // Distribution Desk and the Rate Desk already use. So a histogram in the
  // reading and the one in the mission are one computation with two renderings,
  // and check-rates already guards the numbers underneath them.
  //
  // Deterministic SVG per the media rule: quantities, axes and labels never go
  // into a raster frame.
  import { histogram, summarise } from '../game/distribution-desk-mission.js';
  import { readingsFor, round } from '../game/rate-desk-mission.js';
  import { DISTRIBUTION_DESK_MISSION } from '../game/distribution-desk-mission.js';
  import { RATE_DESK_MISSION } from '../game/rate-desk-mission.js';

  export let spec;

  const W = 640, H = 260, L = 44, R = 14, T = 16, B = 34;

  const caseOf = (mission, id) => mission.cases.find(c => c.id === id);

  $: source = spec.kind === 'histogram' ? caseOf(DISTRIBUTION_DESK_MISSION, spec.case)
    : spec.kind === 'rates' ? caseOf(RATE_DESK_MISSION, spec.case)
    : null;

  // ── histogram ──────────────────────────────────────────────────────────────
  $: bins = spec.kind === 'histogram' && source ? histogram(source.values, spec.width ?? source.width) : [];
  $: stats = spec.kind === 'histogram' && source ? summarise(source.values) : null;
  $: peak = bins.length ? Math.max(...bins.map(b => b.count)) : 1;
  $: lo = bins.length ? bins[0].start : 0;
  $: hi = bins.length ? bins[bins.length - 1].end : 1;
  $: xOf = v => L + ((v - lo) / (hi - lo || 1)) * (W - L - R);
  $: money = source?.unit === '£';
  $: tick = v => (money ? `£${v}` : `${v}${source?.unit ?? ''}`);

  // ── rates ──────────────────────────────────────────────────────────────────
  $: reading = spec.kind === 'rates' && source ? readingsFor(source) : null;
  $: rawMax = reading?.rows ? Math.max(...reading.rows.map(r => r.numerator)) : 1;
  $: rateMax = reading?.rows ? Math.max(...reading.rows.map(r => r.value)) : 1;
  // Height follows the number of rows, so two branches do not leave the space
  // three would have taken.
  $: rateH = reading?.rows ? 34 + reading.rows.length * 54 : 200;
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

      <!-- The two summaries the prose argues about, drawn where they fall. -->
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
         aria-label={`${reading.rows.map(r => `${r.label}: ${r.numerator} of ${r.denominator}, which is ${round(r.value, 1)}`).join('. ')}`}>
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
  .mark-label { font: 800 10px var(--qx-font); letter-spacing: .04em; }
  .mark-label.median { fill: #4e6548; }
  .mark-label.mean { fill: #8c4c2e; }

  .tick { fill: #8a7f6a; font: 600 10.5px var(--qx-font); }
  .panel-label { fill: #8c4c2e; font: 900 9.5px var(--qx-font); letter-spacing: .12em; }
  .row-label { fill: #241f16; font: 700 11.5px var(--qx-font); }
  .value { fill: #241f16; font: 800 11.5px var(--qx-font); font-variant-numeric: tabular-nums; }

  figcaption { margin-top: 14px; padding-top: 12px; border-top: 1px solid #e4ddce;
               display: flex; flex-direction: column; gap: 4px; }
  figcaption b { color: #241f16; font: 800 12px var(--qx-font); letter-spacing: .05em; text-transform: uppercase; }
  figcaption span { color: #625a49; font: 400 13.5px/1.55 var(--qx-font); }
</style>
