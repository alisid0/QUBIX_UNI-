<script>
  import { onMount, onDestroy } from 'svelte';

  const items = ['TIN', 'LAMP', 'PAD', 'BAG', 'PEN', 'CUP'];
  const slotWidth = 92;
  let frame = 0;
  let reducedMotion = false;
  let timers = [];

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function play() {
    clearTimers();
    if (reducedMotion) {
      frame = 2;
      return;
    }
    frame = 0;
    timers = [
      setTimeout(() => { frame = 1; }, 900),
      setTimeout(() => { frame = 2; }, 2100)
    ];
  }

  onMount(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    play();
  });

  onDestroy(clearTimers);
</script>

<figure aria-labelledby="array-figure-caption">
  <div class="figure-head">
    <div><span>ANIMATED MODEL</span><strong>{frame === 0 ? '1 · The target is occupied' : frame === 1 ? '2 · Shift later items right' : '3 · Place the new item'}</strong></div>
    <button on:click={play}>{frame === 2 ? 'Replay movement' : 'Restart'}</button>
  </div>

  <svg viewBox="0 0 704 210" role="img" aria-label="Six array items shift right to open position two, where a new map item is inserted">
    <defs>
      <marker id="shift-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    </defs>

    {#each Array(7) as _, index}
      <g class="slot">
        <rect x={20 + index * slotWidth} y="78" width="78" height="70" rx="2" />
        <text x={28 + index * slotWidth} y="98" class="index">{index}</text>
      </g>
    {/each}

    {#if frame === 1}
      {#each [2, 3, 4, 5] as index}
        <path class="arrow" d={`M ${72 + index * slotWidth} 58 H ${104 + index * slotWidth}`} marker-end="url(#shift-arrow)" />
      {/each}
    {/if}

    {#each items as item, index}
      <g class="item" class:moving={frame === 1 && index >= 2} transform={`translate(${frame >= 1 && index >= 2 ? slotWidth : 0} 0)`}>
        <rect x={25 + index * slotWidth} y="105" width="68" height="35" rx="2" />
        <text x={59 + index * slotWidth} y="128" text-anchor="middle">{item}</text>
      </g>
    {/each}

    <g class="new-item" class:visible={frame === 2}>
      <path d="M 249 35 V 94" marker-end="url(#shift-arrow)" />
      <rect x={209} y="4" width="68" height="32" rx="2" />
      <text x="243" y="25" text-anchor="middle">MAP</text>
    </g>

    <text x="20" y="181" class="explanation">
      {frame === 0 ? 'Position 2 already holds PAD.' : frame === 1 ? 'Four safe moves are compressed here; the mission makes you perform them end-to-start.' : 'MAP takes position 2. Original order remains PAD, BAG, PEN, CUP.'}
    </text>
  </svg>
  <figcaption id="array-figure-caption">Making room preserves order. Movement is the cost that direct indexed reading does not pay.</figcaption>
</figure>

<style>
  figure { margin:30px 0 48px; border:3px solid #000; background:var(--qx-surface); box-shadow:7px 7px 0 #000; }
  .figure-head { display:flex; justify-content:space-between; align-items:center; gap:16px; padding:14px 16px; border-bottom:2px solid #000; }
  .figure-head div { display:grid; gap:3px; }
  .figure-head span { color:var(--qx-accent-text); font-size:11px; font-weight:900; letter-spacing:.13em; }
  .figure-head strong { font-size:16px; }
  button { min-height:38px; padding:7px 11px; border:2px solid #000; background:var(--qx-accent); color:#fff; font:900 12px var(--qx-font); cursor:pointer; box-shadow:3px 3px 0 #000; }
  button:focus-visible { outline:3px solid var(--qx-text); outline-offset:3px; }
  svg { display:block; width:100%; height:auto; overflow:hidden; }
  .slot rect { fill:var(--qx-surface-2); stroke:var(--qx-text); stroke-width:2; }
  .slot .index { fill:var(--qx-text-dim); font:800 11px var(--qx-font); }
  .item { transition:transform .75s cubic-bezier(.2,.8,.2,1); }
  .item rect { fill:var(--qx-text); stroke:#000; stroke-width:2; }
  .item text { fill:var(--qx-bg); font:900 12px var(--qx-font); }
  .item.moving rect { fill:var(--qx-accent); }
  .arrow,.new-item path { fill:none; stroke:var(--qx-accent); stroke-width:3; }
  :global(#shift-arrow path) { fill:var(--qx-accent); }
  .new-item { opacity:0; transform:translateY(-12px); transition:opacity .35s ease,transform .55s ease; }
  .new-item.visible { opacity:1; transform:translateY(0); }
  .new-item rect { fill:var(--qx-green-soft); stroke:var(--qx-text); stroke-width:2; }
  .new-item text { fill:var(--qx-green-text); font:900 12px var(--qx-font); }
  .explanation { fill:var(--qx-text-2); font:700 12px var(--qx-font); }
  figcaption { padding:13px 16px; border-top:1px solid var(--qx-border-2); color:var(--qx-text-2); font-size:14px; }
  @media(max-width:560px) { .figure-head { align-items:flex-start; } .figure-head strong { font-size:14px; } button { max-width:92px; } }
  @media(prefers-reduced-motion:reduce) { .item,.new-item { transition:none; } }
</style>

