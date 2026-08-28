<script>
  // Centre is a choice, shown as a comparison rather than a sequence.
  //
  // This was built as an animation first: a fortieth basket arrived and the mean
  // marker walked while the median stayed. It worked, and a still is better.
  // The subject is a difference between two positions, and an animation asks the
  // reader to hold the first one in memory while the second appears. Drawn as a
  // still, both are on the page at once and the gap between them is the figure.
  //
  // Thirty-nine baskets, then the fortieth at £210. The mean sits in two places,
  // £4.45 apart. The median sits in one, because it did not move.
  //
  // Values and both summaries come from the Distribution Desk, so the reading
  // and the mission compute the same thing. check-motion asserts the mean is
  // dragged and the median is not, and that this figure carries no motion.
  //
  // Deterministic SVG per docs/MEDIA-RULE.md.

  import { DISTRIBUTION_DESK_MISSION, summarise } from '../game/distribution-desk-mission.js';

  export let caseId = 'baskets';

  const all = DISTRIBUTION_DESK_MISSION.cases.find(c => c.id === caseId).values;
  const outlier = all[all.length - 1];
  const base = all.slice(0, -1);

  const before = summarise(base);
  const after = summarise(all);
  const meanShift = after.mean - before.mean;
  const medianShift = after.median - before.median;

  /* ── geometry ────────────────────────────────────────────────────────── */
  // Height trimmed to the content. The first pass left sixty pixels of empty
  // canvas under the axis, which on a wide figure reads as a mistake.
  const W = 640, H = 186, L = 30, R = 30, AXIS = 150;
  const hi = Math.ceil(outlier * 1.06);
  const x = v => L + (v / hi) * (W - L - R);

  // Stack repeats, so the crowding at the low end is visible: that crowding is
  // why the median sits where it does.
  const used = [];
  const dots = base.map(v => {
    const px = x(v);
    const tier = used.filter(u => Math.abs(u - px) < 7).length;
    used.push(px);
    return { v, px, tier: Math.min(tier, 7) };
  });

  const money = v => '£' + v.toFixed(2);
  const description = `${base.length} basket totals with one more of ${money(outlier)} added. `
    + `Without it the mean is ${money(before.mean)}; with it the mean is ${money(after.mean)}, `
    + `a shift of ${money(meanShift)}. The median is ${money(after.median)} either way. `
    + `One extreme value moved one summary and left the other where it was.`;
</script>

<figure class="pull">
  <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={description}>
    <!-- the two mean positions, and the distance between them -->
    <line class="span" x1={x(before.mean)} y1="34" x2={x(after.mean)} y2="34" />
    <line class="span cap" x1={x(before.mean)} y1="29" x2={x(before.mean)} y2="39" />
    <line class="span cap" x1={x(after.mean)} y1="29" x2={x(after.mean)} y2="39" />
    <text class="span-t" x={(x(before.mean) + x(after.mean)) / 2} y="24" text-anchor="middle">
      one basket moved the mean {money(meanShift)}
    </text>

    <line class="mark mean ghost" x1={x(before.mean)} y1="44" x2={x(before.mean)} y2={AXIS + 6} />
    <line class="mark mean" x1={x(after.mean)} y1="44" x2={x(after.mean)} y2={AXIS + 6} />
    <text class="t mean ghost" x={x(before.mean) - 6} y="58" text-anchor="end">without · {money(before.mean)}</text>
    <text class="t mean" x={x(after.mean) + 6} y="58">with · {money(after.mean)}</text>

    <!-- the median, in one place, because it has only one -->
    <line class="mark median" x1={x(after.median)} y1="76" x2={x(after.median)} y2={AXIS + 6} />
    <text class="t median" x={x(after.median) - 6} y="90" text-anchor="end">median {money(after.median)}</text>
    <text class="t median sub" x={x(after.median) - 6} y="104" text-anchor="end">unmoved</text>

    <line class="axis" x1={L} y1={AXIS} x2={W - R} y2={AXIS} />
    {#each dots as d}
      <circle class="dot" cx={d.px} cy={AXIS - 6 - d.tier * 8} r="3.6" />
    {/each}
    <circle class="dot added" cx={x(outlier)} cy={AXIS - 6} r="5.6" />
    <text class="added-t" x={x(outlier)} y={AXIS - 22} text-anchor="middle">{money(outlier)}</text>
    <text class="added-t sub" x={x(outlier)} y={AXIS + 18} text-anchor="middle">the fortieth basket</text>

    <text class="tick" x={L} y={AXIS + 18}>£0</text>
  </svg>

  <figcaption>
    <span><b>{base.length}</b> baskets, then one more.</span>
    <span>Mean moved <b class="clay">{money(meanShift)}</b>.</span>
    <span>Median moved <b class="olive">{money(medianShift)}</b>.</span>
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
  .dot { fill: var(--qx-text, #25231f); opacity: .5; }
  .dot.added { fill: var(--qx-accent, #a85a34); opacity: 1; }
  .added-t { font: 800 11px var(--qx-font); fill: var(--qx-accent-text, #8c4c2e); }
  .added-t.sub { font: 600 11px var(--qx-font); fill: var(--qx-text-dim, #8d8474); }

  .mark { stroke-width: 2; }
  .mark.mean { stroke: var(--qx-accent, #a85a34); }
  .mark.mean.ghost { stroke-width: 1.4; stroke-dasharray: 3 3; opacity: .55; }
  .mark.median { stroke: var(--qx-pink, #3e9e2a); stroke-dasharray: 5 3; }

  .t { font: 800 11px var(--qx-font); }
  .t.mean { fill: var(--qx-accent-text, #8c4c2e); }
  .t.mean.ghost { font-weight: 650; opacity: .75; }
  .t.median { fill: var(--qx-pink-text, #3c6427); }
  .t.median.sub { font: 650 11px var(--qx-font); }

  .span { stroke: var(--qx-accent, #a85a34); stroke-width: 1.3; }
  .span.cap { stroke-width: 1.6; }
  .span-t { font: 800 11px var(--qx-font); fill: var(--qx-accent-text, #8c4c2e); }

  figcaption {
    display: flex; flex-wrap: wrap; gap: 6px 20px;
    margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--qx-border-2, #ece7dc);
    font: 650 12.5px/1.5 var(--qx-font); color: var(--qx-text-dim, #6b6152);
  }
  figcaption b { font-variant-numeric: tabular-nums; color: var(--qx-text, #25231f); }
  figcaption b.clay { color: var(--qx-accent-text, #8c4c2e); }
  figcaption b.olive { color: var(--qx-pink-text, #3c6427); }
</style>
