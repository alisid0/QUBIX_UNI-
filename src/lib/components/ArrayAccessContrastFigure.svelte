<script>
  // A still, deterministic figure. It computes its own counts from the same
  // array and insertion index the reading uses, so the two operations can be
  // compared side by side rather than described. No motion, so nothing needs a
  // replay control and reduced-motion is satisfied by construction.
  const items = ['TIN', 'LAMP', 'PAD', 'BAG', 'PEN', 'CUP'];
  const readAt = 2;
  const newItem = 'MAP';

  const margin = 16;
  const slotW = 46;
  const slotH = 38;
  const rowY = 74;

  // The read panel touches one slot; the insert panel moves every item from the
  // target position to the end. Both numbers are derived, not written by hand.
  const readMoves = 0;
  const insertMoves = items.length - readAt;
  const inserted = [...items.slice(0, readAt), newItem, ...items.slice(readAt)];

  const x = i => margin + i * slotW;
  const readWidth = margin * 2 + items.length * slotW;
  const insertWidth = margin * 2 + inserted.length * slotW;
  const viewW = Math.max(readWidth, insertWidth);
</script>

<figure aria-labelledby="access-contrast-caption">
  <div class="figure-head">
    <div>
      <span>STILL MODEL · SAME ARRAY, TWO OPERATIONS</span>
      <strong>Why one position is direct and the other is work</strong>
    </div>
  </div>

  <div class="panels">
    <section class="panel">
      <header><b>Read <code>items[{readAt}]</code></b><span class="cost cost-free">{readMoves} items move</span></header>
      <svg viewBox={`0 0 ${viewW} 128`} role="img"
           aria-label={`Reading position ${readAt} jumps straight to ${items[readAt]}. No other item moves.`}>
        <defs>
          <marker id="access-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        {#each items as item, i}
          <g class="slot" class:target={i === readAt}>
            <rect x={x(i)} y={rowY} width={slotW - 6} height={slotH} rx="2" />
            <text class="index" x={x(i) + 5} y={rowY + 14}>{i}</text>
            <text class="item" x={x(i) + (slotW - 6) / 2} y={rowY + 30} text-anchor="middle">{item}</text>
          </g>
        {/each}
        <g class="pointer">
          <path d={`M ${x(readAt) + (slotW - 6) / 2} 40 V ${rowY - 6}`} marker-end="url(#access-arrow)" />
          <text x={x(readAt) + (slotW - 6) / 2} y="30" text-anchor="middle">jump</text>
        </g>
      </svg>
    </section>

    <section class="panel">
      <header><b>Insert <code>{newItem}</code> at {readAt}</b><span class="cost cost-work">{insertMoves} items move</span></header>
      <svg viewBox={`0 0 ${viewW} 128`} role="img"
           aria-label={`Inserting ${newItem} at position ${readAt} shifts ${insertMoves} later items one place to the right to open the slot.`}>
        {#each inserted as item, i}
          <g class="slot" class:fresh={i === readAt} class:moved={i > readAt}>
            <rect x={x(i)} y={rowY} width={slotW - 6} height={slotH} rx="2" />
            <text class="index" x={x(i) + 5} y={rowY + 14}>{i}</text>
            <text class="item" x={x(i) + (slotW - 6) / 2} y={rowY + 30} text-anchor="middle">{item}</text>
          </g>
        {/each}
        {#each inserted as _, i}
          {#if i > readAt}
            <path class="shift" d={`M ${x(i) - 12} ${rowY - 10} H ${x(i) + 8}`} marker-end="url(#access-arrow)" />
          {/if}
        {/each}
      </svg>
    </section>
  </div>

  <figcaption id="access-contrast-caption">
    A known index reaches its slot directly. Inserting in the middle must first move every later item, so the same array answers one request for free and pays for the other.
  </figcaption>
</figure>

<style>
  figure { margin:30px 0 48px; border:3px solid #000; background:var(--qx-surface); box-shadow:7px 7px 0 #000; }
  .figure-head { padding:14px 16px; border-bottom:2px solid #000; }
  .figure-head div { display:grid; gap:3px; }
  .figure-head span { color:var(--qx-accent-text); font-size:11px; font-weight:900; letter-spacing:.13em; }
  .figure-head strong { font-size:16px; }
  .panels { display:grid; grid-template-columns:1fr 1fr; gap:2px; background:#000; }
  .panel { padding:14px 16px 18px; background:var(--qx-surface); }
  .panel header { display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:6px; }
  .panel header b { font-size:14px; }
  .panel code { padding:1px 4px; background:var(--qx-surface-3); font-size:13px; }
  .cost { padding:4px 8px; border:2px solid #000; font-size:11px; font-weight:900; letter-spacing:.04em; white-space:nowrap; }
  .cost-free { background:var(--qx-green-soft); color:var(--qx-green-text); }
  .cost-work { background:var(--qx-accent-soft); color:var(--qx-accent-text); }
  svg { display:block; width:100%; height:auto; overflow:visible; }
  .slot rect { fill:var(--qx-surface-2); stroke:var(--qx-text); stroke-width:2; }
  .slot .index { fill:var(--qx-text-dim); font:800 11px var(--qx-font); }
  .slot .item { fill:var(--qx-text); font:900 12px var(--qx-font); }
  .slot.target rect { fill:var(--qx-green-soft); }
  .slot.target .item { fill:var(--qx-green-text); }
  .slot.fresh rect { fill:var(--qx-green-soft); stroke:var(--qx-text); }
  .slot.fresh .item { fill:var(--qx-green-text); }
  .slot.moved rect { fill:var(--qx-accent-soft); }
  .slot.moved .item { fill:var(--qx-accent-text); }
  .pointer path,.shift { fill:none; stroke:var(--qx-accent); stroke-width:3; }
  .pointer text { fill:var(--qx-accent-text); font:900 11px var(--qx-font); }
  :global(#access-arrow path) { fill:var(--qx-accent); }
  figcaption { padding:13px 16px; border-top:1px solid var(--qx-border-2); color:var(--qx-text-2); font-size:14px; }
  @media(max-width:560px) { .panels { grid-template-columns:1fr; } }
</style>
