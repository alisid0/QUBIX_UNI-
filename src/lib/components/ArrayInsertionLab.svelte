<script>
  import { DSA_ARRAY_INSERTION_PREVIEW as lesson, itemsMovedForInsert } from '../content/dsa-array-insertion-preview.js';

  let stage = 0;
  let working = [...lesson.initialItems];
  let moved = [];
  let feedback = '';
  let placed = false;
  let prediction = null;

  $: nextSource = lesson.insertion.moveOrder[moved.length];
  $: movingDone = moved.length === lesson.insertion.moveOrder.length;

  function moveItem(source) {
    if (movingDone || placed) return;
    if (source !== nextSource) {
      feedback = source < nextSource
        ? `Not yet. Moving position ${source} now would overwrite the item at ${source + 1}. Start with the occupied item furthest to the right.`
        : `Position ${source} is not the next occupied source. Follow the items from right to left.`;
      return;
    }
    const updated = [...working];
    updated[source + 1] = updated[source];
    updated[source] = null;
    working = updated;
    const completesShift = moved.length + 1 === lesson.insertion.moveOrder.length;
    moved = [...moved, source];
    feedback = completesShift
      ? `Position ${lesson.insertion.index} is now empty. The order has survived.`
      : `Safe move: ${source} → ${source + 1}. Continue from right to left.`;
  }

  function placeNewItem() {
    if (!movingDone) return;
    const updated = [...working];
    updated[lesson.insertion.index] = lesson.insertion.item;
    working = updated;
    placed = true;
    feedback = `${lesson.insertion.item} now owns position ${lesson.insertion.index}; every original item remains in order.`;
  }

  function reset() {
    stage = 0;
    working = [...lesson.initialItems];
    moved = [];
    feedback = '';
    placed = false;
    prediction = null;
  }
</script>

<section class="lab" aria-labelledby="array-lab-heading">
  <div class="lab-head">
    <div><p class="eyebrow">DO · {stage + 1} OF 2</p><h2 id="array-lab-heading">The insertion bench</h2></div>
    <div class="steps" aria-label={`Step ${stage + 1} of 2`}><span class:active={stage >= 0}></span><span class:active={stage >= 1}></span></div>
  </div>

  {#if stage === 0}
    <p class="ticket">Insert <strong>{lesson.insertion.item}</strong> at position <strong>{lesson.insertion.index}</strong>. Keep every existing item in the same relative order.</p>
    <p class="instruction">Click the item that should move first. Each item moves one position to the right.</p>
    <div class="array" aria-label="Seven array positions, including one empty position">
      {#each working as item, index}
        <button class:empty={!item} class:target={!item && index === lesson.insertion.index} on:click={() => item && moveItem(index)} disabled={!item || placed} aria-label={item ? `Move ${item} from position ${index}` : `Position ${index}, empty`}>
          <span>{index}</span><strong>{item || 'EMPTY'}</strong>
        </button>
      {/each}
    </div>
    <div class="movement" aria-label="Required movement progress">
      <span>Safe moves</span><strong>{moved.length} / {lesson.insertion.moveOrder.length}</strong>
      <div><i style={`width:${(moved.length / lesson.insertion.moveOrder.length) * 100}%`}></i></div>
    </div>
    {#if feedback}<p class:good={placed || movingDone} class:retry={!placed && !movingDone} class="feedback" aria-live="polite">{feedback}</p>{/if}
    {#if movingDone && !placed}<button class="primary" on:click={placeNewItem}>Place {lesson.insertion.item} at position {lesson.insertion.index}</button>{/if}
    <button class="secondary" disabled={!placed} on:click={() => stage = 1}>Compare insertion costs →</button>
  {:else}
    <p class="ticket">{lesson.prediction.prompt}</p>
    <div class="answers">
      {#each lesson.prediction.answers as answer}
        <button class:chosen={prediction === answer.id} class:correct={prediction === lesson.prediction.correct && answer.id === prediction} on:click={() => prediction = answer.id}>{answer.label}</button>
      {/each}
    </div>
    {#if prediction}
      <p class:good={prediction === lesson.prediction.correct} class:retry={prediction !== lesson.prediction.correct} class="feedback" aria-live="polite">
        {prediction === lesson.prediction.correct
          ? `Correct. Inserting at position 0 can move all ${itemsMovedForInsert(6, 0)} existing items. Inserting at the empty end moves none.`
          : 'Count the items at and after the insertion position. Each one needs a new home.'}
      </p>
    {/if}
    {#if prediction === lesson.prediction.correct}
      <div class="costs">
        <div><span>Read by known index</span><strong>O(1)</strong><small>go directly to a position</small></div>
        <div><span>Insert in an array</span><strong>O(n)</strong><small>in the worst case, move every item</small></div>
      </div>
      <p class="precision"><strong>Precision note:</strong> Appending to a dynamic array is often cheap when spare capacity exists. When it is full, the program may allocate a larger block and copy items. We will model that resize separately.</p>
      <button class="secondary replay" on:click={reset}>Replay the insertion</button>
    {/if}
  {/if}
</section>

<style>
  .lab { padding: clamp(18px,4vw,32px); border: 3px solid #000; background: var(--qx-ink); color: var(--qx-ink-text); box-shadow: 8px 8px 0 #000; }
  .lab-head { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; }
  .eyebrow { margin:0 0 4px; color:var(--qx-ink-accent); font-size:12px; font-weight:900; letter-spacing:.14em; }
  h2 { margin:0; font-size:clamp(25px,5vw,38px); line-height:1.05; }
  .steps { display:flex; gap:5px; padding-top:7px; }
  .steps span { width:32px; height:6px; background:var(--qx-ink-line-2); }
  .steps span.active { background:var(--qx-ink-accent); }
  .ticket { margin:24px 0 8px; padding:14px 16px; border:2px solid #000; background:var(--qx-slip); color:var(--qx-slip-ink); box-shadow:4px 4px 0 #000; }
  .instruction { color:var(--qx-ink-text-2); }
  .array { display:grid; grid-template-columns:repeat(7,minmax(0,1fr)); gap:2px; border:2px solid #000; background:#000; }
  .array button { min-width:0; min-height:82px; padding:8px; border:0; background:var(--qx-slip); color:var(--qx-slip-ink); display:flex; flex-direction:column; justify-content:space-between; text-align:left; cursor:pointer; }
  .array button:hover:not(:disabled), .array button:focus-visible { outline:3px solid var(--qx-ink-accent); outline-offset:-3px; }
  .array button.empty { background:var(--qx-ink-well); color:var(--qx-ink-text-dim); }
  .array button.target { outline:2px dashed var(--qx-ink-accent); outline-offset:-5px; }
  .array button:disabled { cursor:default; }
  .array span { font-size:11px; font-weight:900; opacity:.65; }
  .array strong { font-size:11px; overflow:hidden; }
  .movement { display:grid; grid-template-columns:auto auto; align-items:center; gap:5px 12px; margin-top:18px; }
  .movement span { color:var(--qx-ink-text-2); }
  .movement strong { font-size:21px; }
  .movement div { grid-column:1/-1; height:8px; background:var(--qx-ink-line-2); }
  .movement i { display:block; height:100%; background:var(--qx-ink-accent); transition:width .18s ease; }
  .feedback { margin:16px 0 0; padding:10px 12px; border-left:4px solid currentColor; }
  .good { color:var(--qx-ink-good); }
  .retry { color:var(--qx-ink-bad); }
  button { font:inherit; }
  .primary,.secondary { min-height:46px; margin-top:16px; padding:10px 16px; border:2px solid #000; font-weight:900; cursor:pointer; }
  .primary { background:var(--qx-ink-accent); color:#171510; box-shadow:4px 4px 0 #000; }
  .secondary { margin-left:10px; border-color:var(--qx-ink-line-2); background:transparent; color:var(--qx-ink-text); }
  .secondary:disabled { opacity:.38; cursor:not-allowed; }
  .answers { display:grid; gap:9px; margin-top:18px; }
  .answers button { padding:13px 15px; border:1px solid var(--qx-ink-line-2); background:var(--qx-ink-panel); color:var(--qx-ink-text); text-align:left; cursor:pointer; }
  .answers button.chosen { border-color:var(--qx-ink-accent); }
  .answers button.correct { border-color:var(--qx-ink-good); color:var(--qx-ink-good); }
  .costs { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:20px; }
  .costs div { padding:16px; border:1px solid var(--qx-ink-line-2); }
  .costs span,.costs small { display:block; color:var(--qx-ink-text-2); }
  .costs strong { display:block; margin:5px 0; color:var(--qx-ink-accent); font-size:32px; }
  .precision { color:var(--qx-ink-text-2); font-size:14px; }
  .replay { margin-left:0; }
  @media(max-width:680px) { .array { grid-template-columns:repeat(4,minmax(0,1fr)); } .array button { min-height:68px; } .costs { grid-template-columns:1fr; } .secondary { margin-left:0; } }
  @media(prefers-reduced-motion:reduce) { .movement i { transition:none; } }
</style>
