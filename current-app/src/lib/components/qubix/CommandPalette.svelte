<script>
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { PATHS, SUBJECT_LABELS } from '../../content/paths.js';
  import { fetchBoardsByNumbers, getBoard } from '../../content/dynamicBoards.js';

  export let open = false;
  export let onClose = () => {};
  export let onNavigate = () => {};

  let query = '';
  let results = [];
  let selectedIdx = 0;
  let inputEl;
  let indexVersion = 0;
  let hydratePromise;

  // Build flat index of every board from the live path manifest.
  const boardIndex = [];
  for (const [pathId, path] of Object.entries(PATHS)) {
    for (const cardNumber of path.cards) {
      boardIndex.push({
        cardNumber,
        pathId,
        pathName: path.name,
        subject: path.subject,
        subjectLabel: SUBJECT_LABELS[path.subject] || path.subject,
      });
    }
  }

  // Deduplicate (a board can appear in multiple paths — keep first).
  const seen = new Set();
  const uniqueIndex = boardIndex.filter(b => {
    if (seen.has(b.cardNumber)) return false;
    seen.add(b.cardNumber);
    return true;
  });

  function hydrateIndex() {
    hydratePromise ||= fetchBoardsByNumbers(uniqueIndex.map((board) => board.cardNumber))
      .then(() => { indexVersion += 1; })
      .catch(() => {});
    return hydratePromise;
  }

  $: if (open) hydrateIndex();

  function fuzzyMatch(needle, haystack) {
    needle = needle.toLowerCase();
    haystack = haystack.toLowerCase();
    let ni = 0;
    for (let hi = 0; hi < haystack.length && ni < needle.length; hi++) {
      if (haystack[hi] === needle[ni]) ni++;
    }
    return ni === needle.length;
  }

  $: if (query.trim()) {
    indexVersion;
    const q = query.trim();
    results = uniqueIndex
      .filter(b => {
        const board = getBoard(b.cardNumber);
        const title = board?.title || `Board ${b.cardNumber}`;
        return fuzzyMatch(q, title) || fuzzyMatch(q, b.pathName) || fuzzyMatch(q, b.subjectLabel);
      })
      .slice(0, 12)
      .map(b => {
        const board = getBoard(b.cardNumber);
        return { ...b, title: board?.title || `Board ${b.cardNumber}` };
      });
    selectedIdx = 0;
  } else {
    results = [];
  }

  function select(result) {
    if (!result) return;
    onNavigate('topicDetail', result.pathId);
    close();
  }

  function close() {
    query = '';
    results = [];
    selectedIdx = 0;
    onClose();
  }

  function closeFromBackdrop(event) {
    if (event.target === event.currentTarget) close();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIdx = Math.min(selectedIdx + 1, results.length - 1);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIdx = Math.max(selectedIdx - 1, 0);
      return;
    }
    if (e.key === 'Enter' && results[selectedIdx]) {
      select(results[selectedIdx]);
      return;
    }
  }

  onMount(() => {
    if (inputEl) inputEl.focus();
  });
</script>

{#if open}
  <div class="overlay" on:click={closeFromBackdrop} role="presentation" transition:fade={{ duration: 120 }}>
    <div class="palette" role="dialog" aria-modal="true" aria-label="Search boards" transition:fly={{ y: -12, duration: 180 }}>
      <div class="search-row">
        <span class="search-icon">⌘</span>
        <input
          bind:this={inputEl}
          bind:value={query}
          on:keydown={handleKeydown}
          type="text"
          placeholder="Search 429 boards..."
          autocomplete="off"
          spellcheck="false"
        />
        <button class="close-btn" on:click={close} aria-label="Close">×</button>
      </div>

      {#if results.length}
        <div class="results">
          {#each results as result, i (result.cardNumber)}
            <button
              class="result-row"
              class:selected={i === selectedIdx}
              on:click={() => select(result)}
              on:mouseenter={() => selectedIdx = i}
            >
              <span class="result-subject">{result.subjectLabel}</span>
              <span class="result-path">{result.pathName}</span>
              <span class="result-arrow">›</span>
              <span class="result-title">{result.title}</span>
            </button>
          {/each}
        </div>
      {:else if query.trim()}
        <div class="empty">No boards match "{query}"</div>
      {:else}
        <div class="hint">Type to search all boards and topics</div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(20, 19, 16, 0.55);
    display: flex; align-items: flex-start; justify-content: center;
    padding-top: 18vh;
  }
  .palette {
    width: min(580px, calc(100% - 32px));
    background: var(--qx-surface);
    border: 1.5px solid var(--qx-border);
    border-radius: 18px;
    box-shadow: 0 28px 70px -30px rgba(0,0,0,0.5);
    overflow: hidden;
  }
  .search-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--qx-border);
  }
  .search-icon {
    font-size: 16px;
    color: var(--qx-text-faint);
    flex-shrink: 0;
  }
  input {
    flex: 1;
    border: none;
    background: transparent;
    font-family: var(--qx-font);
    font-size: 17px;
    font-weight: 700;
    color: var(--qx-text);
    outline: none;
  }
  input::placeholder { color: var(--qx-text-faintest); }
  .close-btn {
    width: 28px; height: 28px; border-radius: 50%;
    border: none; background: var(--qx-surface-2);
    color: var(--qx-text-dim); font-size: 16px;
    cursor: pointer; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .results {
    max-height: 420px;
    overflow-y: auto;
    padding: 6px;
  }
  .result-row {
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    align-items: center;
    column-gap: 10px;
    row-gap: 1px;
    padding: 10px 12px;
    border: none;
    border-radius: 10px;
    background: transparent;
    cursor: pointer;
    font-family: var(--qx-font);
    text-align: left;
  }
  .result-row:hover, .result-row.selected {
    background: var(--qx-accent-soft);
  }
  .result-subject {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--qx-text-faint);
  }
  .result-path {
    grid-column: 2;
    font-size: 10px;
    font-weight: 700;
    color: var(--qx-text-faint);
  }
  .result-arrow {
    grid-row: 1 / -1;
    font-size: 18px;
    color: var(--qx-text-faintest);
  }
  .result-title {
    grid-column: 2;
    font-size: 14px;
    font-weight: 700;
    color: var(--qx-text);
  }
  .empty, .hint {
    padding: 28px 20px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: var(--qx-text-faint);
  }
</style>
