<script>
  // Match-the-following: place each item into the group it belongs to.
  //
  // Built select-then-place first, with dragging added on top. That order
  // matters. A drag-only version needs a separate keyboard mode bolted beside
  // it, which is a second implementation to keep correct and the one that rots.
  // Here the items and the groups are real buttons: tab to an item, press it to
  // pick it up, tab to a group, press it to place. Keyboard, touch and mouse all
  // work through that one path, and the HTML5 drag handlers call exactly the
  // same two functions.
  //
  // A wrong placement is not punished. The item returns and the reason it did
  // not belong is shown, because the reason is the thing worth learning.

  import { createEventDispatcher } from 'svelte';

  /** [{ id, label, hint, answer }] where answer is a target id. */
  export let items = [];
  /** [{ id, label, blurb }] */
  export let targets = [];
  /** Called for a wrong placement: (item, targetId) => string */
  export let explain = () => '';
  export let instruction = 'Pick an item, then choose the group it belongs to.';

  const dispatch = createEventDispatcher();

  let held = null;        // the item currently picked up
  let placed = {};        // item id -> target id, correct answers only
  let miss = null;        // { itemId, targetId, why } for the last wrong try
  let announce = '';      // read out by the live region
  let attempts = 0;

  $: waiting = items.filter(item => !placed[item.id]);
  $: done = items.length > 0 && waiting.length === 0;
  $: inTarget = id => items.filter(item => placed[item.id] === id);

  function pick(item) {
    if (placed[item.id]) return;
    miss = null;
    if (held?.id === item.id) {
      held = null;
      announce = `Put ${item.label} back down.`;
      return;
    }
    held = item;
    announce = `${item.label} picked up. Now choose a group.`;
  }

  function place(target) {
    if (!held) {
      announce = 'Pick an item first, then choose a group.';
      return;
    }
    const item = held;
    attempts += 1;

    if (item.answer === target.id) {
      placed = { ...placed, [item.id]: target.id };
      held = null;
      miss = null;
      announce = `${item.label} is ${target.label}. Correct.`;
      if (items.every(x => placed[x.id])) {
        announce = `All ${items.length} placed. ${attempts} attempt${attempts === 1 ? '' : 's'}.`;
        dispatch('complete', { attempts });
      }
      return;
    }

    miss = { itemId: item.id, targetId: target.id, why: explain(item, target.id) };
    held = null;
    announce = `${item.label} is not ${target.label}. ${miss.why}`;
  }

  function reset() {
    held = null; placed = {}; miss = null; attempts = 0;
    announce = 'Board cleared.';
  }

  /* Dragging is the same two calls, reached a different way. */
  function onDragStart(event, item) {
    if (placed[item.id]) { event.preventDefault(); return; }
    held = item;
    miss = null;
    event.dataTransfer.effectAllowed = 'move';
    try { event.dataTransfer.setData('text/plain', item.id); } catch (e) { /* older browsers */ }
  }
  function onDrop(event, target) {
    event.preventDefault();
    place(target);
  }
</script>

<section class="match" aria-labelledby="match-title">
  <div class="head">
    <div>
      <p class="eyebrow">MATCH · {items.length - waiting.length} OF {items.length}</p>
      <h3 id="match-title">Put each field in its group</h3>
    </div>
    <div class="bar" aria-hidden="true">
      <i style={`width:${items.length ? ((items.length - waiting.length) / items.length) * 100 : 0}%`}></i>
    </div>
  </div>

  <p class="how">{instruction}</p>
  <p class="live" aria-live="polite">{announce}</p>

  {#if waiting.length}
    <ul class="tray">
      {#each waiting as item (item.id)}
        <li>
          <button
            class="chip"
            class:held={held?.id === item.id}
            class:missed={miss?.itemId === item.id}
            aria-pressed={held?.id === item.id}
            draggable="true"
            on:dragstart={e => onDragStart(e, item)}
            on:dragend={() => { held = null; }}
            on:click={() => pick(item)}
          >
            <b>{item.label}</b>
            {#if item.hint}<small>{item.hint}</small>{/if}
          </button>
        </li>
      {/each}
    </ul>
  {/if}

  {#if miss}
    <p class="why" aria-hidden="true">{miss.why}</p>
  {/if}

  <div class="groups">
    {#each targets as target (target.id)}
      <button
        class="group"
        class:armed={Boolean(held)}
        class:rejecting={miss?.targetId === target.id}
        on:dragover={e => e.preventDefault()}
        on:drop={e => onDrop(e, target)}
        on:click={() => place(target)}
      >
        <span class="g-name">{target.label}</span>
        {#if target.blurb}<span class="g-blurb">{target.blurb}</span>{/if}
        <span class="g-slot">
          {#each inTarget(target.id) as item (item.id)}
            <em>{item.label}</em>
          {/each}
        </span>
      </button>
    {/each}
  </div>

  {#if done}
    <p class="done">All {items.length} placed in {attempts} attempt{attempts === 1 ? '' : 's'}.</p>
  {/if}
  <button class="reset" on:click={reset} disabled={!attempts}>Clear the board</button>
</section>

<style>
  .match { padding: clamp(16px,3vw,26px); border: 3px solid #000; background: var(--qx-ink); color: var(--qx-ink-text); box-shadow: 8px 8px 0 #000; }
  .head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
  .eyebrow { margin: 0 0 4px; color: var(--qx-ink-accent); font: 900 12px var(--qx-font); letter-spacing: .14em; }
  h3 { margin: 0; font: 800 clamp(21px,4vw,30px)/1.1 var(--qx-font); }
  .bar { flex: 1 1 140px; min-width: 120px; height: 8px; margin-top: 12px; background: var(--qx-ink-line-2); }
  .bar i { display: block; height: 100%; background: var(--qx-ink-accent); transition: width .2s ease; }
  .how { margin: 14px 0 0; color: var(--qx-ink-text-2); font-size: 14px; }
  .live { margin: 6px 0 0; min-height: 20px; color: var(--qx-ink-accent); font: 700 13px var(--qx-font); }

  .tray { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0 0; padding: 0; list-style: none; }
  .chip {
    display: block; padding: 10px 13px; border: 2px solid var(--qx-ink-line-2);
    background: var(--qx-ink-panel); color: var(--qx-ink-text); text-align: left; cursor: grab;
  }
  .chip b { display: block; font: 800 13.5px var(--qx-font); }
  .chip small { display: block; margin-top: 3px; color: var(--qx-ink-text-2); font: 600 11.5px var(--qx-font); }
  .chip:hover { border-color: var(--qx-ink-accent); }
  .chip.held { border-color: var(--qx-ink-accent); background: var(--qx-ink-accent); color: #171510; cursor: grabbing; }
  .chip.held small { color: #3b2a20; }
  .chip.missed { border-color: var(--qx-ink-bad); }
  .chip:focus-visible { outline: 3px solid var(--qx-ink-accent); outline-offset: 2px; }

  .why { margin: 12px 0 0; padding: 10px 12px; border-left: 4px solid var(--qx-ink-bad); color: var(--qx-ink-bad); font-size: 13.5px; }

  /* auto-fit left the fourth group stranded on a row of its own. A viewport
     media query cannot fix it either: the mission column is about 520px wide on
     a 1280px screen, and four groups across that is 131px each, too narrow for
     the descriptions. Four groups sit as two by two at every width. */
  .groups { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 16px; }
  .group {
    display: flex; flex-direction: column; gap: 4px; min-height: 108px; padding: 13px;
    border: 2px dashed var(--qx-ink-line-2); background: transparent; color: var(--qx-ink-text);
    text-align: left; cursor: pointer;
  }
  .group.armed { border-style: solid; border-color: var(--qx-ink-accent); }
  .group.rejecting { border-color: var(--qx-ink-bad); }
  .group:focus-visible { outline: 3px solid var(--qx-ink-accent); outline-offset: 2px; }
  .g-name { font: 800 14px var(--qx-font); }
  .g-blurb { color: var(--qx-ink-text-2); font: 600 11.5px/1.4 var(--qx-font); }
  .g-slot { display: flex; flex-wrap: wrap; gap: 5px; margin-top: auto; padding-top: 8px; }
  .g-slot em {
    padding: 4px 8px; background: var(--qx-ink-good); color: #14201a;
    font: 800 11.5px var(--qx-font); font-style: normal;
  }

  .done { margin: 16px 0 0; padding: 11px 13px; border-left: 4px solid var(--qx-ink-good); color: var(--qx-ink-good); font: 800 14px var(--qx-font); }
  .reset {
    min-height: 42px; margin-top: 14px; padding: 9px 15px;
    border: 2px solid var(--qx-ink-line-2); background: transparent; color: var(--qx-ink-text);
    font: 900 11.5px var(--qx-font); cursor: pointer;
  }
  .reset:disabled { opacity: .35; cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) { .bar i { transition: none; } }
</style>
