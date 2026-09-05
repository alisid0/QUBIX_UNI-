<script>
  // A still, deterministic figure. It reads the sequence, the direct-access
  // index and the search target from the lesson itself and recomputes the
  // number of inspections a value search costs, so the two operations can be
  // compared rather than described. No motion, so it needs no replay control
  // and reduced motion is satisfied by construction.
  import { DSA_SEQUENCE_PREVIEW as lesson, inspectionsToFind } from '../content/dsa-sequence-preview.js';

  const items = lesson.items;
  const readIndex = lesson.direct.targetIndex;
  const readItem = items[readIndex];
  const target = lesson.search.target;
  const foundAt = items.indexOf(target);
  const inspections = inspectionsToFind(items, target);

  const margin = 14;
  const tileW = 40;
  const innerW = 34;
  const rowY = 66;
  const tileH = 34;
  const viewW = margin * 2 + items.length * tileW;
  const cx = i => margin + i * tileW + innerW / 2;
</script>

<figure aria-labelledby="sequence-contrast-caption">
  <div class="figure-head">
    <div>
      <span>STILL MODEL · ONE SHELF, TWO REQUESTS</span>
      <strong>Why a known position beats a search</strong>
    </div>
  </div>

  <div class="panels">
    <section class="panel">
      <header><b>Read <code>items[{readIndex}]</code></b><span class="cost cost-free">1 step</span></header>
      <svg viewBox={`0 0 ${viewW} 112`} role="img"
           aria-label={`Reading position ${readIndex} jumps straight to ${readItem} in a single step.`}>
        <defs>
          <marker id="seq-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        <text class="lab" x={cx(readIndex)} y="26" text-anchor="middle">{readItem}</text>
        <path class="pointer" d={`M ${cx(readIndex)} 40 V ${rowY - 4}`} marker-end="url(#seq-arrow)" />
        {#each items as _, i}
          <g class="tile" class:target={i === readIndex}>
            <rect x={margin + i * tileW} y={rowY} width={innerW} height={tileH} rx="2" />
            <text class="idx" x={cx(i)} y={rowY + 22} text-anchor="middle">{i}</text>
          </g>
        {/each}
      </svg>
    </section>

    <section class="panel">
      <header><b>Search for <code>{target}</code></b><span class="cost cost-work">{inspections} inspections</span></header>
      <svg viewBox={`0 0 ${viewW} 112`} role="img"
           aria-label={`Searching for ${target} by value inspects ${inspections} items from the start before it matches at position ${foundAt}.`}>
        <text class="lab" x={cx(foundAt)} y="26" text-anchor="middle">{target} found</text>
        <path class="sweep" d={`M ${cx(0)} 44 H ${cx(foundAt)}`} marker-end="url(#seq-arrow)" />
        {#each items as _, i}
          <g class="tile" class:seen={i <= foundAt} class:found={i === foundAt}>
            <rect x={margin + i * tileW} y={rowY} width={innerW} height={tileH} rx="2" />
            <text class="idx" x={cx(i)} y={rowY + 22} text-anchor="middle">{i}</text>
          </g>
        {/each}
      </svg>
    </section>
  </div>

  <figcaption id="sequence-contrast-caption">
    A known index reaches its item in one jump. Finding {target} by value inspects {inspections} of {items.length} items before it matches — the work of a search grows with the sequence, the work of indexed access does not.
  </figcaption>
</figure>

<style>
  figure { margin:30px 0 48px; border:3px solid #000; background:var(--qx-surface); box-shadow:7px 7px 0 #000; }
  .figure-head { padding:14px 16px; border-bottom:2px solid #000; }
  .figure-head div { display:grid; gap:3px; }
  .figure-head span { color:var(--qx-accent-text); font-size:11px; font-weight:900; letter-spacing:.13em; }
  .figure-head strong { font-size:16px; }
  .panels { display:grid; gap:2px; background:#000; }
  .panel { padding:14px 16px 18px; background:var(--qx-surface); }
  .panel header { display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:6px; }
  .panel header b { font-size:14px; }
  .panel code { padding:1px 4px; background:var(--qx-surface-3); font-size:13px; }
  .cost { padding:4px 8px; border:2px solid #000; font-size:11px; font-weight:900; letter-spacing:.04em; white-space:nowrap; }
  .cost-free { background:var(--qx-green-soft); color:var(--qx-green-text); }
  .cost-work { background:var(--qx-accent-soft); color:var(--qx-accent-text); }
  svg { display:block; width:100%; height:auto; overflow:visible; }
  .tile rect { fill:var(--qx-surface-2); stroke:var(--qx-text); stroke-width:2; }
  .tile .idx { fill:var(--qx-text-dim); font-family:var(--qx-font); font-weight:800; font-size:13px; }
  .tile.seen rect { fill:var(--qx-accent-soft); }
  .tile.target rect,.tile.found rect { fill:var(--qx-green-soft); }
  .tile.target .idx,.tile.found .idx { fill:var(--qx-green-text); }
  .lab { fill:var(--qx-text); font-family:var(--qx-font); font-weight:900; font-size:15px; }
  .pointer,.sweep { fill:none; stroke:var(--qx-accent); stroke-width:3; }
  :global(#seq-arrow path) { fill:var(--qx-accent); }
  figcaption { padding:13px 16px; border-top:1px solid var(--qx-border-2); color:var(--qx-text-2); font-size:14px; }
  /* A 668-wide viewBox scales to roughly half on a phone, which would drop a
     13px label to about 6px. Raise the in-figure type on narrow screens so it
     renders near the 11px floor, matching the array-growth figure's approach. */
  @media(max-width:640px) {
    .tile .idx { font-size:24px; }
    .lab { font-size:26px; }
  }
</style>
