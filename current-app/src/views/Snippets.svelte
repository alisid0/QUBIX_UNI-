<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { DECK } from '../lib/content/deck.js';
  import { fetchSnippets } from '../lib/content/dynamicBoards.js';
  // F-01: snippet bodies come from Supabase and are rendered raw.
  import { sanitizeBoardHtml } from '../lib/content/sanitizeHtml.js';
  import QxIcon from '../lib/components/qubix/QxIcon.svelte';

  export const onNavigate = undefined;
  export let onClose = null;   // set when opened as full-screen Snippet Mode (✕ returns Home)

  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const staticSnippets = DECK.filter(c => c.tags?.kind === 'snippet');
  let allSnippets = [];
  let snippets = [];
  let index = 0;
  let liked = new Set();
  let saved = new Set();

  let mode = 'shuffle'; // shuffle | topic
  let topicFilter = 'all'; // all | physics | maths | chemistry

  $: current = snippets[index];

  $: if (allSnippets.length) rebuildSnippets(mode, topicFilter);

  function rebuildSnippets(m, filter) {
    let pool = [...allSnippets];
    if (m === 'topic' && filter !== 'all') {
      pool = pool.filter(s => s.tags?.subject === filter);
    }
    if (m === 'shuffle') {
      snippets = shuffleArray(pool);
    } else {
      snippets = pool;
    }
    index = 0;
  }

  onMount(async () => {
    try {
      const dynamic = await fetchSnippets();
      allSnippets = [...staticSnippets, ...(dynamic || [])];
      snippets = shuffleArray([...allSnippets]);
      index = 0;
    } catch (_) {
      allSnippets = [...staticSnippets];
      snippets = shuffleArray([...allSnippets]);
    }
  });

  function nextSnippet() {
    if (snippets.length < 2) return;
    if (mode === 'shuffle') {
      let next = index;
      while (next === index) next = Math.floor(Math.random() * snippets.length);
      index = next;
    } else {
      index = (index + 1) % snippets.length;
    }
  }

  function toggleMode(m) {
    mode = m;
  }

  function setFilter(f) {
    topicFilter = f;
  }

  function toggleLike() {
    if (!current) return;
    const id = current.kicker + current.title;
    if (liked.has(id)) liked.delete(id); else liked.add(id);
    liked = new Set(liked);
  }

  function toggleSave() {
    if (!current) return;
    const id = current.kicker + current.title;
    if (saved.has(id)) saved.delete(id); else saved.add(id);
    saved = new Set(saved);
  }

  $: isLiked = current ? liked.has(current.kicker + current.title) : false;
  $: isSaved = current ? saved.has(current.kicker + current.title) : false;

  $: subjectTag = current?.tags?.subject
    ? (current.tags.subject === 'physics' ? 'PHYSICS' : current.tags.subject === 'maths' ? 'MATHS' : 'CHEMISTRY')
    : 'PHYSICS';
  $: categoryTag = current?.tags?.concept || 'DID YOU KNOW';

  const FILTERS = ['all', 'physics', 'maths', 'chemistry'];
  const FILTER_LABELS = { all: 'All', physics: 'Physics', maths: 'Maths', chemistry: 'Chem' };
</script>

<div class="qx-shell snippets-view">
  <div class="snippets-header">
    <div>
      <h1>Quick reads</h1>
      <p class="header-sub">Bite-sized curiosities from across STEM</p>
    </div>
    {#if onClose}
      <button class="mode-close" on:click={onClose} aria-label="Exit quick reads">✕</button>
    {/if}
  </div>

  <!-- Mode toggle -->
  <div class="mode-row">
    <button class="mode-btn" class:active={mode === 'shuffle'} on:click={() => toggleMode('shuffle')}>Shuffle</button>
    <button class="mode-btn" class:active={mode === 'topic'} on:click={() => toggleMode('topic')}>Topic</button>
  </div>

  <!-- Topic filter (only in topic mode) -->
  {#if mode === 'topic'}
    <div class="filter-row">
      {#each FILTERS as f}
        <button class="filter-pill" class:active={topicFilter === f} on:click={() => setFilter(f)}>
          {FILTER_LABELS[f]}
        </button>
      {/each}
    </div>
  {/if}

  {#if snippets.length === 0}
    <div class="empty">
      <div class="empty-icon">📚</div>
      {#if mode === 'topic' && topicFilter !== 'all'}
        <p>No {FILTER_LABELS[topicFilter]} snippets yet.</p>
      {:else if allSnippets.length === 0}
        <p>No snippets yet — check back soon.</p>
      {:else}
        <p>No snippets match this filter.</p>
      {/if}
    </div>
  {:else if current}
    <div class="snippet-card" in:fly={{ x: 60, duration: 300, easing: t => t<.5 ? 2*t*t : -1+(4-2*t)*t }} out:fly={{ x: -40, duration: 200, easing: t => t<.5 ? 2*t*t : -1+(4-2*t)*t }}>
      <div class="card-category">
        <span class="cat-tag">{subjectTag} &middot; {categoryTag.toUpperCase()}</span>
      </div>
      <div class="card-visual">
        {#if current.img}
          <img src={current.img} alt="" class="card-img" />
        {:else}
          <div class="card-placeholder">
            <QxIcon name="snippets" size={48} />
          </div>
        {/if}
      </div>
      <div class="card-body">
        {#if current.layers?.[0]}
          {@html sanitizeBoardHtml(current.layers[0])}
        {/if}
      </div>
      <div class="card-actions">
        <button class="action-btn" class:active={isLiked} on:click={toggleLike}>
          <QxIcon name={isLiked ? 'check' : 'like'} size={16} />
        </button>
        <button class="action-btn" class:active={isSaved} on:click={toggleSave}>
          <QxIcon name={isSaved ? 'check' : 'save'} size={16} />
        </button>
        <button class="action-btn next-btn" on:click={nextSnippet}>
          Next snippet
        </button>
      </div>
    </div>
    {#if snippets.length > 1}
      <div class="pager">{index + 1} / {snippets.length}{#if mode === 'topic' && topicFilter !== 'all'} · {FILTER_LABELS[topicFilter]}{/if}</div>
    {/if}
  {:else}
    <div class="empty">
      <div class="empty-icon">📚</div>
      <p>No snippets yet — check back soon.</p>
    </div>
  {/if}
</div>

<style>
  .snippets-view { height: 100%; overflow-y: auto; padding: 16px 18px 24px; box-sizing: border-box; }

  .snippets-header { margin-bottom: 14px; display: flex; align-items: flex-start; justify-content: space-between; }
  .mode-close {
    width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface); color: var(--qx-text-dim); font-size: 15px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  h1 { font-size: 23px; font-weight: 800; color: var(--qx-text); margin: 0; }
  .header-sub { font-size: 13px; color: var(--qx-text-dim); margin: 2px 0 0; }

  /* Mode toggle */
  .mode-row {
    display: flex; background: var(--qx-surface); border-radius: var(--qx-radius-md);
    border: 1.5px solid var(--qx-border-2); margin-bottom: 10px; padding: 3px;
  }
  .mode-btn {
    flex: 1; padding: 8px; border-radius: 10px; border: none; background: transparent;
    font-family: var(--qx-font); font-size: 13px; font-weight: 700; color: var(--qx-text-dim);
    cursor: pointer; transition: all 0.15s;
  }
  .mode-btn.active { background: var(--qx-accent); color: #fff; }

  /* Topic filter */
  .filter-row { display: flex; gap: 6px; margin-bottom: 14px; overflow-x: auto; }
  .filter-pill {
    font-size: 12px; font-weight: 700; color: var(--qx-text-2); background: var(--qx-surface);
    border: 1.5px solid var(--qx-border-2); border-radius: var(--qx-radius-pill); padding: 6px 12px;
    cursor: pointer; font-family: var(--qx-font); white-space: nowrap; flex-shrink: 0;
    transition: all 0.15s;
  }
  .filter-pill.active { color: var(--qx-accent); background: var(--qx-accent-soft); border-color: var(--qx-accent); }

  .snippet-card {
    border: 1.5px solid var(--qx-pink); background: var(--qx-surface); border-radius: var(--qx-radius-lg);
    overflow: hidden; margin-bottom: 12px;
  }
  .card-category { padding: 14px 16px 0; }
  .cat-tag {
    font-size: 11px; font-weight: 700; color: var(--qx-accent); letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .card-visual {
    width: 100%; aspect-ratio: 2 / 1.3; background: var(--qx-surface-2);
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .card-img { width: 100%; height: 100%; object-fit: cover; }
  .card-placeholder { opacity: 0.2; }

  .card-body {
    padding: 18px 16px; font-size: 16px; color: var(--qx-text); line-height: 1.65;
  }
  .card-body :global(p) { margin-bottom: 10px; }
  .card-body :global(strong) { font-weight: 800; color: var(--qx-text); }

  .card-actions {
    display: flex; align-items: center; gap: 6px; padding: 0 12px 14px;
  }
  .action-btn {
    width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface); cursor: pointer; display: flex; align-items: center; justify-content: center;
    color: var(--qx-text-faint); transition: all 0.15s;
  }
  .action-btn.active { background: var(--qx-accent-soft); border-color: var(--qx-accent); color: var(--qx-accent); }
  .next-btn {
    width: auto; border-radius: var(--qx-radius-pill); padding: 0 16px; margin-left: auto;
    font-family: var(--qx-font); font-size: 13px; font-weight: 700; color: var(--qx-text-dim);
  }
  .next-btn:hover { background: var(--qx-surface-2); }

  .pager { text-align: center; font-size: 12px; font-weight: 600; color: var(--qx-text-faint); }
  .empty { text-align: center; color: var(--qx-text-dim); padding: 40px 0; }
  .empty-icon { font-size: 40px; margin-bottom: 10px; }
  .empty p { font-size: 14px; }

  /* ── Desktop ── */
  @media (min-width: 900px) {
    .snippets-view { padding: 32px 48px; max-width: 800px; margin: 0 auto; }
    h1 { font-size: 30px; }
    .snippet-card { border-radius: 24px; }
    .card-body { padding: 24px 26px; font-size: 17px; line-height: 1.75; }
    .card-category { padding: 18px 26px 0; }
    .card-actions { padding: 0 22px 22px; }
  }
</style>
