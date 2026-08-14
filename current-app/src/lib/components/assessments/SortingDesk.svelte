<script>
  // SortingDesk — sort items into category boxes.
  // Works two ways: drag-and-drop (desktop mouse) AND tap-to-place (tap an
  // item, then tap a box) so it's fully usable on touch screens, where HTML5
  // drag events never fire.
  import { fly } from 'svelte/transition';

  export let boxes = [];   // [{ id, label }]
  export let items = [];   // [{ id, label, box: correct_box_id }]
  export let onDone = () => {}; // (score, total) => void

  let placed = {};         // itemId → boxId
  let dragging = null;
  let selected = null;     // itemId picked by tap, waiting for a box tap
  let submitted = false;
  let score = 0;
  let shuffledBoxes = [];
  let shuffledItems = [];
  let shuffleKey = '';

  function shuffle(list = []) {
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function resetForPrompt() {
    placed = {};
    dragging = null;
    selected = null;
    submitted = false;
    score = 0;
    shuffledBoxes = shuffle(boxes);
    shuffledItems = shuffle(items);
  }

  function handleDragStart(e, itemId) {
    dragging = itemId;
    selected = null;
    e.dataTransfer.setData('text/plain', itemId);
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDrop(e, boxId) {
    e.preventDefault();
    if (dragging) {
      placed[dragging] = boxId;
      placed = { ...placed };
      dragging = null;
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  // Tap flow: select an item from the pile…
  function tapItem(itemId) {
    if (submitted) return;
    selected = selected === itemId ? null : itemId;
  }

  // …then tap a box to place it there.
  function tapBox(boxId) {
    if (submitted || !selected) return;
    placed[selected] = boxId;
    placed = { ...placed };
    selected = null;
  }

  // Tapping a placed item (before submitting) sends it back to the pile.
  function tapPlaced(itemId) {
    if (submitted) return;
    delete placed[itemId];
    placed = { ...placed };
  }

  function submit() {
    let correct = 0;
    for (const item of items) {
      if (placed[item.id] === item.box) correct++;
    }
    score = correct;
    submitted = true;
    selected = null;
  }

  function finish() {
    onDone(score, items.length);
  }

  $: {
    const nextKey = `${boxes.map((box) => box.id).join('|')}::${items.map((item) => item.id).join('|')}`;
    if (nextKey !== shuffleKey) {
      shuffleKey = nextKey;
      resetForPrompt();
    }
  }
  $: allPlaced = items.every(i => placed[i.id]);
</script>

<div class="sorting-desk">
  <div class="prompt">Sort each item into the box that describes it best.</div>
  {#if !submitted}
    <div class="hint">{selected ? 'Now tap a box to place it' : 'Tap an item, then tap a box — or drag it in'}</div>
  {/if}

  <div class="boxes">
    {#each shuffledBoxes as box}
      <div
        class="box"
        class:over={dragging !== null || selected !== null}
        class:correct={submitted}
        role="button"
        tabindex="0"
        on:click={() => tapBox(box.id)}
        on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && tapBox(box.id)}
        on:drop={(e) => handleDrop(e, box.id)}
        on:dragover={handleDragOver}
      >
        <div class="box-label">{box.label}</div>
        <div class="box-items">
          {#each shuffledItems.filter(i => placed[i.id] === box.id) as item (item.id)}
            <button
              class="placed-item"
              class:right={submitted && item.box === box.id}
              class:wrong={submitted && item.box !== box.id}
              disabled={submitted}
              title={submitted ? '' : 'Tap to take back'}
              on:click|stopPropagation={() => tapPlaced(item.id)}
            >
              {item.label}
              {#if submitted}
                <span class="check">{item.box === box.id ? '✓' : '✗'}</span>
              {/if}
            </button>
          {/each}
          {#if !shuffledItems.some(i => placed[i.id] === box.id)}
            <div class="box-empty">{selected ? 'Tap to place here' : 'Drop here'}</div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <div class="item-pile">
    {#each shuffledItems.filter(i => !placed[i.id]) as item (item.id)}
      <button
        class="draggable-item"
        class:picked={selected === item.id}
        draggable="true"
        on:dragstart={(e) => handleDragStart(e, item.id)}
        on:click={() => tapItem(item.id)}
        in:fly={{ y: 10, duration: 200 }}
      >
        {item.label}
      </button>
    {/each}
  </div>

  {#if !submitted && allPlaced}
    <button class="submit-btn" on:click={submit}>Check answers</button>
  {/if}

  {#if submitted}
    <div class="result">{score}/{items.length} correct</div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .sorting-desk {
    display: flex; flex-direction: column; gap: 14px; align-items: center;
    width: 100%; max-width: 360px; margin: 0 auto;
  }
  .prompt {
    font-size: 15px; font-weight: 700; color: var(--qx-text);
    text-align: center;
  }
  .hint {
    font-size: 12px; font-weight: 600; color: var(--qx-text-faint);
    text-align: center; margin-top: -6px;
  }
  .boxes {
    display: flex; gap: 10px; width: 100%;
  }
  .box {
    flex: 1; min-height: 120px;
    border: 2px dashed var(--qx-border-2); border-radius: 12px;
    padding: 10px; display: flex; flex-direction: column;
    transition: border-color 0.2s; cursor: pointer;
  }
  .box.over { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .box.correct { border-style: solid; cursor: default; }
  .box-label {
    font-size: 12px; font-weight: 800; color: var(--qx-text-dim);
    text-align: center; margin-bottom: 8px; text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .box-items { display: flex; flex-direction: column; gap: 4px; flex: 1; }
  .box-empty {
    font-size: 11px; color: var(--qx-text-faint); text-align: center;
    padding: 12px 0; font-style: italic;
  }
  .placed-item {
    font-size: 12px; font-weight: 700; padding: 6px 8px;
    background: var(--qx-surface-2); border-radius: 6px; border: none;
    display: flex; justify-content: space-between; align-items: center;
    font-family: var(--qx-font); color: var(--qx-text); cursor: pointer;
    text-align: left; width: 100%;
  }
  .placed-item:disabled { cursor: default; }
  .placed-item.right { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .placed-item.wrong { background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .check { font-size: 13px; }
  .item-pile {
    display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
    min-height: 40px;
  }
  .draggable-item {
    padding: 10px 16px; background: var(--qx-surface);
    border: 1.5px solid var(--qx-border-2); border-radius: 20px;
    font-size: 13px; font-weight: 700; color: var(--qx-text);
    cursor: grab; user-select: none; font-family: var(--qx-font);
  }
  .draggable-item:active { cursor: grabbing; }
  .draggable-item.picked {
    border-color: var(--qx-accent); background: var(--qx-accent-soft);
    color: var(--qx-accent-text);
  }
  .submit-btn, .continue-btn {
    padding: 12px 32px; border-radius: 24px; border: none;
    font-family: var(--qx-font); font-size: 14px; font-weight: 800;
    cursor: pointer;
  }
  .submit-btn { background: var(--qx-accent); color: #fff; }
  .continue-btn { background: var(--qx-accent); color: #fff; }
  .result {
    font-size: 18px; font-weight: 800; color: var(--qx-accent);
    text-align: center;
  }
</style>
