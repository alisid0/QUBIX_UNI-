<script>
  // The first surface in Qubix where a learner's SQL actually runs.
  //
  // Everything before this was a simulation: the console scored multiple choice
  // against twelve hardcoded rows and the workshop moved four sales between two
  // branches. Here the query goes to SQLite, against 54 tables and 147,166 rows,
  // in the browser, and a mistake comes back as SQLite's own message.
  //
  // It is a tool rather than curriculum. It is not a lesson, it is not scored,
  // and it is not approved: it is the workbench the missions in
  // docs/CURRICULUM-MASTER-PLAN.md will be built on.

  import { onMount } from 'svelte';
  import { query, tables, columnsOf } from '../lib/data/superstore.js';

  const STARTERS = [
    {
      label: 'The taught sale',
      note: 'The twelve sales the SQL chapter teaches from are really in here.',
      sql: "SELECT sale_id, branch_id, business_date, basket_total\nFROM sale\nWHERE sale_id = 'S-1041';"
    },
    {
      label: 'One product, five prices',
      note: 'What a branch charges depends on its zone, so "the price" needs a branch.',
      sql: "SELECT z.zone_id, z.price, COUNT(b.branch_id) AS branches\nFROM zone_price z\nLEFT JOIN branch b USING (zone_id)\nWHERE z.sku = 'QX-CER-001'\nGROUP BY z.zone_id, z.price\nORDER BY z.price;"
    },
    {
      label: 'The join that multiplies rows',
      note: 'One sale becomes many rows. This is what changing the grain looks like.',
      sql: 'SELECT (SELECT COUNT(*) FROM sale) AS sales,\n       COUNT(*)                    AS after_join\nFROM sale JOIN sale_line USING (sale_id);'
    },
    {
      label: 'Counts that never happened',
      note: 'A blank stock count is an absence, not a zero, and IS NULL is what finds it.',
      sql: "SELECT COUNT(*) AS rows_total,\n       SUM(CASE WHEN closing_stock_units IS NULL THEN 1 ELSE 0 END) AS never_counted\nFROM inventory_snapshot;"
    },
    {
      label: 'Two answers for one question',
      note: 'Sales by region down the management path and down the geographic path.',
      sql: 'SELECT d.region_id AS by_management,\n       c.region_id AS by_geography,\n       COUNT(*)    AS branches\nFROM branch b\nJOIN district d USING (district_id)\nJOIN county   c USING (county_id)\nGROUP BY 1, 2\nHAVING by_management <> by_geography;'
    }
  ];

  let sql = STARTERS[0].sql;
  let note = STARTERS[0].note;
  let result = null;
  let running = false;
  let loadError = '';
  let schema = [];
  let openTable = '';
  let openColumns = [];

  onMount(async () => {
    try {
      schema = await tables();
      await run();
    } catch (error) {
      loadError = String(error.message || error);
    }
  });

  async function run() {
    running = true;
    result = await query(sql);
    running = false;
  }

  function use(starter) {
    sql = starter.sql;
    note = starter.note;
    run();
  }

  async function inspect(name) {
    if (openTable === name) { openTable = ''; return; }
    openTable = name;
    openColumns = await columnsOf(name);
  }

  function onKey(event) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') run();
  }

  const cell = value => (value === null ? null : String(value));
</script>

<div class="console">
  <header>
    <div>
      <p class="eyebrow">Qubix workbench · not a lesson, not scored</p>
      <h1>Superstore data console</h1>
      <p class="lede">
        54 tables and 147,166 rows of the Qubix Superstore group, running in your
        browser. Nothing you type leaves this page.
      </p>
    </div>
    <nav aria-label="Back to the course">
      <a href="?mode=game&amp;mission=sql-console">SQL console mission</a>
      <a href="?mode=game&amp;mission=shared-book&amp;chapter=5&amp;session=1">Chapter 5 reading</a>
      <a href="?mode=game">All missions</a>
      <!-- The console is where three missions send a learner to check the
           evidence. Every link here went further in, so leaving meant the back
           button. -->
      <a href="/">Qubix home</a>
    </nav>
  </header>

  {#if loadError}
    <p class="failure">The database did not load: {loadError}</p>
  {/if}

  <div class="layout">
    <aside aria-label="Tables">
      <h2>Tables <span>{schema.length}</span></h2>
      <ul>
        {#each schema as table}
          <li>
            <button
              class:open={openTable === table.name}
              on:click={() => inspect(table.name)}
              aria-expanded={openTable === table.name}
            >
              <span class="name">{table.name}</span>
              <span class="count">{table.rows.toLocaleString()}</span>
            </button>
            {#if openTable === table.name}
              <ul class="columns">
                {#each openColumns as column}
                  <li><b>{column.name}</b><i>{column.type}</i></li>
                {/each}
              </ul>
            {/if}
          </li>
        {/each}
      </ul>
    </aside>

    <main>
      <div class="starters" role="group" aria-label="Example queries">
        {#each STARTERS as starter}
          <button class:chosen={note === starter.note} on:click={() => use(starter)}>{starter.label}</button>
        {/each}
      </div>
      <p class="note">{note}</p>

      <label class="editor">
        <span class="visually-hidden">SQL</span>
        <textarea bind:value={sql} on:keydown={onKey} spellcheck="false" rows="9"></textarea>
      </label>

      <div class="bar">
        <button class="run" on:click={run} disabled={running}>{running ? 'Running…' : 'Run query'}</button>
        <span class="hint">Ctrl or Cmd + Enter</span>
        {#if result?.ok}
          <span class="stat">{result.rowCount.toLocaleString()} row{result.rowCount === 1 ? '' : 's'} · {result.ms} ms</span>
        {/if}
      </div>

      {#if result && !result.ok}
        <p class="failure">{result.error}</p>
      {:else if result?.ok && result.columns.length}
        <div class="results">
          <table>
            <thead>
              <tr>{#each result.columns as column}<th>{column}</th>{/each}</tr>
            </thead>
            <tbody>
              {#each result.rows.slice(0, 200) as row}
                <tr>
                  {#each result.columns as column}
                    <td class:null={row[column] === null}>
                      {cell(row[column]) ?? 'NULL'}
                    </td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        {#if result.rowCount > 200}
          <p class="note">Showing the first 200 of {result.rowCount.toLocaleString()} rows.</p>
        {/if}
      {:else if result?.ok}
        <p class="note">That statement returned no rows.</p>
      {/if}
    </main>
  </div>
</div>

<style>
  .console {
    background: var(--qx-ink);
    color: var(--qx-ink-text);
    min-height: 100vh;
    padding: 2rem 1.25rem 4rem;
    font-family: var(--qx-font);
  }
  header {
    max-width: 76rem; margin: 0 auto 1.75rem;
    display: flex; flex-wrap: wrap; gap: 1rem 2rem;
    align-items: flex-end; justify-content: space-between;
  }
  header nav { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  header nav a {
    color: var(--qx-ink-text-2); text-decoration: none;
    border: 1px solid var(--qx-ink-line); border-radius: var(--qx-radius-pill);
    padding: 0.3rem 0.8rem; font-size: 13px;
  }
  header nav a:hover { color: var(--qx-ink-text); border-color: var(--qx-ink-line-2); }
  header nav a:focus-visible { outline: 2px solid var(--qx-ink-accent); outline-offset: 2px; }
  .eyebrow {
    font-size: 12px; font-weight: 800; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--qx-ink-accent); margin: 0 0 0.4rem;
  }
  h1 { font-size: 1.9rem; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
  .lede { margin: 0; color: var(--qx-ink-text-2); max-width: 42rem; font-size: 15px; }

  .layout {
    max-width: 76rem; margin: 0 auto;
    display: grid; gap: 1.25rem;
    grid-template-columns: 1fr;
  }
  @media (min-width: 60rem) { .layout { grid-template-columns: 16rem 1fr; } }

  aside {
    background: var(--qx-ink-panel);
    border: 1px solid var(--qx-ink-line);
    border-radius: var(--qx-radius-md);
    padding: 0.9rem;
    max-height: 34rem; overflow-y: auto;
  }
  aside h2 {
    font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--qx-ink-text-dim); margin: 0 0 0.6rem;
    display: flex; justify-content: space-between;
  }
  aside ul { list-style: none; margin: 0; padding: 0; }
  aside > ul > li + li { margin-top: 2px; }
  aside button {
    width: 100%; display: flex; justify-content: space-between; gap: 0.5rem;
    background: none; border: 0; color: var(--qx-ink-text-2);
    font: inherit; font-size: 13px; text-align: left; cursor: pointer;
    padding: 0.3rem 0.45rem; border-radius: 6px;
  }
  aside button:hover, aside button.open { background: var(--qx-ink-well); color: var(--qx-ink-text); }
  aside .count { color: var(--qx-ink-text-dim); font-variant-numeric: tabular-nums; font-size: 12px; }
  .columns { padding: 0.2rem 0 0.4rem 0.55rem; }
  .columns li {
    display: flex; justify-content: space-between; gap: 0.6rem;
    font-size: 12px; padding: 0.12rem 0.45rem; color: var(--qx-ink-text-dim);
  }
  .columns b { font-weight: 600; color: var(--qx-ink-text-2); }
  .columns i { font-style: normal; }

  main { min-width: 0; display: flex; flex-direction: column; gap: 0.75rem; }

  .starters { display: flex; flex-wrap: wrap; gap: 0.45rem; }
  .starters button {
    background: var(--qx-ink-panel); color: var(--qx-ink-text-2);
    border: 1px solid var(--qx-ink-line); border-radius: var(--qx-radius-pill);
    padding: 0.32rem 0.8rem; font: inherit; font-size: 13px; cursor: pointer;
  }
  .starters button:hover { color: var(--qx-ink-text); border-color: var(--qx-ink-line-2); }
  .starters button.chosen {
    background: var(--qx-ink-accent-soft); color: var(--qx-ink-accent);
    border-color: var(--qx-ink-accent);
  }
  .note { margin: 0; color: var(--qx-ink-text-dim); font-size: 13px; }

  .editor { display: block; }
  textarea {
    width: 100%; display: block; resize: vertical;
    background: var(--qx-ink-well); color: var(--qx-ink-text);
    border: 1px solid var(--qx-ink-line); border-radius: var(--qx-radius-md);
    padding: 0.9rem 1rem; font-size: 14px; line-height: 1.6;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }
  textarea:focus-visible { outline: 2px solid var(--qx-ink-accent); outline-offset: 1px; }

  .bar { display: flex; align-items: center; gap: 0.85rem; flex-wrap: wrap; }
  .run {
    background: var(--qx-ink-accent); color: var(--qx-ink);
    border: 0; border-radius: var(--qx-radius-pill);
    padding: 0.45rem 1.15rem; font: inherit; font-weight: 800; font-size: 14px; cursor: pointer;
  }
  .run:disabled { opacity: 0.6; cursor: default; }
  .hint, .stat { font-size: 12px; color: var(--qx-ink-text-dim); }
  .stat { font-variant-numeric: tabular-nums; }

  .failure {
    margin: 0; padding: 0.7rem 0.9rem;
    background: var(--qx-ink-well); border: 1px solid var(--qx-ink-bad);
    border-radius: var(--qx-radius-md); color: var(--qx-ink-bad);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 13px;
  }

  .results {
    overflow-x: auto;
    border: 1px solid var(--qx-ink-line);
    border-radius: var(--qx-radius-md);
    background: var(--qx-ink-panel);
    max-height: 26rem; overflow-y: auto;
  }
  table { border-collapse: collapse; width: 100%; font-size: 13px; }
  th, td {
    text-align: left; padding: 0.45rem 0.75rem; white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  thead th {
    position: sticky; top: 0; background: var(--qx-ink-well);
    color: var(--qx-ink-text-dim); font-size: 12px; font-weight: 700;
    letter-spacing: 0.05em; text-transform: uppercase;
    border-bottom: 1px solid var(--qx-ink-line);
  }
  tbody tr + tr td { border-top: 1px solid var(--qx-ink-line); }
  td { color: var(--qx-ink-text-2); }
  td.null { color: var(--qx-ink-text-dim); font-style: italic; }

  .visually-hidden {
    position: absolute; width: 1px; height: 1px; overflow: hidden;
    clip: rect(0 0 0 0); white-space: nowrap;
  }
</style>
