<script>
  // A cross-board sheet for interactions and exercises alone.
  //
  // Why it exists. The Factory shows one board at a time, which is right for
  // authoring but makes two things invisible. First, the standing rule that
  // interactions must not repeat cannot be checked from inside a board: with
  // 29 boards and several hundred variants, a kind used on four boards looks
  // exactly like a kind used once. Second, exercises are spread so thinly that
  // it is impossible to see how heavily any one form is leaned on.
  //
  // This sheet answers both by grouping across every board rather than within
  // one, and it makes no decisions: it selects nothing, changes nothing, and is
  // authoring-only, like the Factory.
  import { theme } from '../lib/stores/theme.js';
  import { registry, UNITS } from '../factory/index.js';

  let tab = new URLSearchParams(window.location.search).get('parts') === 'exercises' ? 'exercises' : 'interactions';
  function setTab(t) {
    tab = t;
    const url = new URL(window.location.href);
    url.searchParams.set('parts', t);
    history.replaceState({}, '', url);
  }

  const stateOf = (entry, code) =>
    entry.selections?.[code] ? 'selected'
    : entry.finalised?.[code] ? 'finalised'
    : entry.rejected?.[code] ? 'rejected'
    : 'open';

  // Every interaction and every exercise, flattened with its board.
  function collect(slot) {
    const out = [];
    for (const entry of registry) {
      for (const section of entry.bb.sections) {
        for (const v of section[slot] || []) {
          out.push({
            kind: v.kind || v.prompt ? (v.kind || 'choice') : 'unknown',
            code: v.code,
            board: entry.bb.title,
            key: entry.key,
            unit: entry.unit,
            section: section.code,
            state: stateOf(entry, v.code),
            prompt: v.prompt || '',
            note: v.note || ''
          });
        }
      }
    }
    return out;
  }

  const interactions = collect('interactions');
  const exercises = collect('exercises');

  // Grouped by kind, commonest first, so reuse is the first thing visible.
  function byKind(list) {
    const map = new Map();
    for (const v of list) {
      if (!map.has(v.kind)) map.set(v.kind, []);
      map.get(v.kind).push(v);
    }
    return [...map.entries()]
      .map(([kind, uses]) => ({
        kind,
        uses,
        boards: [...new Set(uses.map(u => u.key))],
        selected: uses.filter(u => u.state === 'selected').length
      }))
      .sort((a, b) => b.boards.length - a.boards.length || b.uses.length - a.uses.length);
  }

  $: rows = byKind(tab === 'interactions' ? interactions : exercises);
  $: total = tab === 'interactions' ? interactions.length : exercises.length;
  // A kind used on more than one board is where the no-repeat rule is at risk.
  $: shared = rows.filter(r => r.boards.length > 1);
  $: onceOnly = rows.filter(r => r.boards.length === 1).length;
  $: selectedShared = shared.filter(r => r.uses.filter(u => u.state === 'selected').length > 1);

  let open = null;
  const unitName = k => UNITS.find(u => u.key === k)?.name || k;
</script>

<div class="parts-shell">
  <header class="parts-header">
    <div class="identity">
      <span class="mark">P</span>
      <span class="stack"><b>PARTS SHEET</b><small>Interactions and exercises across every board</small></span>
    </div>
    <div class="head-right">
      <span class="warn-pill">AUTHORING ONLY · SELECTS NOTHING</span>
      <button class="icon-btn" aria-label="Toggle colour theme" on:click={() => theme.toggle()}>
        {#if $theme === 'dark'}◑{:else}◐{/if}
      </button>
    </div>
  </header>

  <main class="parts-body">
    <nav class="tabs" aria-label="Choose what to list">
      <button class:on={tab === 'interactions'} on:click={() => setTab('interactions')}>
        Interactions<em>{interactions.length} across {registry.length} boards</em>
      </button>
      <button class:on={tab === 'exercises'} on:click={() => setTab('exercises')}>
        Exercises<em>{exercises.length} across {registry.length} boards</em>
      </button>
    </nav>

    <section class="summary">
      <div class="stat"><b>{total}</b><small>total</small></div>
      <div class="stat"><b>{rows.length}</b><small>distinct kinds</small></div>
      <div class="stat"><b>{onceOnly}</b><small>used on one board only</small></div>
      <div class="stat" class:flag={shared.length > 0}><b>{shared.length}</b><small>used on more than one</small></div>
      <div class="stat" class:flag={selectedShared.length > 0}><b>{selectedShared.length}</b><small>reused <em>and selected</em> more than once</small></div>
    </section>

    <p class="lede">
      {#if tab === 'interactions'}
        The standing rule is that interactions must not repeat. A kind appearing on
        more than one board is not automatically a breach, since some are meant to
        return, but it is the only place a breach can be. The last figure is the one
        to watch: those are kinds the founder has selected on two or more boards, so
        a learner would actually meet them twice.
      {:else}
        Exercises reuse a small set of forms by design, so a high count here is
        expected. What is worth reading is the balance: a board leaning entirely on
        one form is asking every question the same way.
      {/if}
    </p>

    <div class="kind-list">
      {#each rows as row}
        <article class="kind" class:multi={row.boards.length > 1} class:hot={row.uses.filter(u => u.state === 'selected').length > 1}>
          <button class="kind-head" on:click={() => (open = open === row.kind ? null : row.kind)}
            aria-expanded={open === row.kind}>
            <span class="kind-name">{row.kind}</span>
            <span class="kind-counts">
              <em>{row.uses.length} {row.uses.length === 1 ? 'use' : 'uses'}</em>
              <em class:flag={row.boards.length > 1}>{row.boards.length} {row.boards.length === 1 ? 'board' : 'boards'}</em>
              <em class:sel={row.selected > 0}>{row.selected} selected</em>
            </span>
          </button>
          {#if open === row.kind}
            <ul class="uses">
              {#each row.uses as u}
                <li>
                  <code class={u.state}>{u.code}</code>
                  <a href={`?mode=factory&bb=${u.key}`}>{u.board}</a>
                  <small>{unitName(u.unit)} · {u.section}</small>
                  <span class="state {u.state}">{u.state}</span>
                  {#if u.prompt}<p class="prompt">{u.prompt}</p>{/if}
                </li>
              {/each}
            </ul>
          {/if}
        </article>
      {/each}
    </div>
  </main>
</div>

<style>
  .parts-shell { height: 100%; overflow-y: auto; background: var(--qx-bg); color: var(--qx-text); }
  .parts-header { position: sticky; top: 0; z-index: 5; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 20px; background: var(--qx-bg); border-bottom: 1px solid var(--qx-border-2); }
  .identity { display: flex; align-items: center; gap: 10px; }
  .mark { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; border: 1px solid var(--qx-accent); color: var(--qx-accent-text); font-weight: 900; }
  .stack { display: flex; flex-direction: column; }
  .stack b { font-size: 11px; letter-spacing: .1em; }
  .stack small { font-size: 10px; color: var(--qx-text-faint); }
  .head-right { display: flex; align-items: center; gap: 9px; }
  .warn-pill { font-size: 9px; font-weight: 900; letter-spacing: .07em; padding: 5px 9px; border-radius: 999px; border: 1px dashed var(--qx-accent); color: var(--qx-accent-text); }
  .icon-btn { width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--qx-border-2); background: transparent; color: var(--qx-text); cursor: pointer; }

  .parts-body { max-width: 900px; margin: 0 auto; padding: 18px 20px 60px; display: flex; flex-direction: column; gap: 16px; }
  .tabs { display: flex; gap: 8px; }
  .tabs button { flex: 1; display: flex; flex-direction: column; gap: 3px; align-items: flex-start; padding: 10px 14px; border: 1px solid var(--qx-border-2); border-radius: 12px; background: var(--qx-surface); color: var(--qx-text); font-weight: 900; font-size: 12px; cursor: pointer; }
  .tabs button em { font-style: normal; font-size: 10.5px; font-weight: 700; color: var(--qx-text-faint); }
  .tabs button.on { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }

  .summary { display: flex; gap: 9px; flex-wrap: wrap; }
  .stat { flex: 1; min-width: 110px; border: 1px solid var(--qx-border-2); border-radius: 12px; padding: 10px 12px; }
  .stat b { display: block; font-size: 22px; color: var(--qx-accent-text); }
  .stat small { font-size: 10px; color: var(--qx-text-faint); line-height: 1.35; }
  .stat small em { font-style: normal; font-weight: 800; }
  .stat.flag { border-color: var(--qx-accent); background: var(--qx-accent-soft); }

  .lede { margin: 0; font-size: 12.5px; line-height: 1.6; color: var(--qx-text-dim); }

  .kind-list { display: flex; flex-direction: column; gap: 7px; }
  .kind { border: 1px solid var(--qx-border-2); border-radius: 11px; overflow: hidden; background: var(--qx-surface); }
  .kind.multi { border-color: var(--qx-border); }
  .kind.hot { border-color: var(--qx-accent); }
  .kind-head { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 13px; border: 0; background: transparent; color: var(--qx-text); cursor: pointer; text-align: left; }
  .kind-name { font-size: 12.5px; font-weight: 800; font-family: ui-monospace, Menlo, Consolas, monospace; }
  .kind-counts { display: flex; gap: 7px; flex-wrap: wrap; }
  .kind-counts em { font-style: normal; font-size: 10px; font-weight: 800; color: var(--qx-text-faint); border: 1px solid var(--qx-border-2); border-radius: 999px; padding: 2px 8px; }
  .kind-counts em.flag { color: var(--qx-accent-text); border-color: var(--qx-accent); }
  .kind-counts em.sel { color: var(--qx-green-text); border-color: var(--qx-green); }

  .uses { list-style: none; margin: 0; padding: 0 13px 12px; display: flex; flex-direction: column; gap: 8px; }
  .uses li { display: flex; align-items: center; gap: 9px; flex-wrap: wrap; font-size: 11.5px; }
  .uses code { font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 5px; background: var(--qx-surface-2); }
  .uses code.selected { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .uses code.rejected { background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .uses a { color: var(--qx-accent-text); font-weight: 800; text-decoration: none; }
  .uses a:hover { text-decoration: underline; }
  .uses small { color: var(--qx-text-faint); font-size: 10px; }
  .state { font-size: 9px; font-weight: 900; letter-spacing: .05em; text-transform: uppercase; color: var(--qx-text-faint); }
  .state.selected { color: var(--qx-green-text); }
  .state.rejected { color: var(--qx-accent-text); }
  .prompt { flex-basis: 100%; margin: 0; font-size: 11px; color: var(--qx-text-dim); line-height: 1.45; }
</style>
