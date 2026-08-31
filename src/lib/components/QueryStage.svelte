<script>
  // A table you watch change as clauses are applied to it.
  //
  // The rows are not illustrations. Every one is computed by runQuery, the same
  // function the SQL console mission runs, so the figure in the reading and the
  // thing the mission does are one computation with two renderings and cannot
  // drift apart.
  //
  // Two kinds of decision alternate on purpose. A clause decision changes the
  // query and the table visibly changes. A grain decision changes nothing and
  // asks what a row now represents, which is the question the whole chapter
  // turns on: WHERE changes which rows survive, GROUP BY changes what a row is.
  //
  // Twelve rows become six become three, and the count is shown as it moves,
  // because "the row count dropped" is the observation a learner makes first
  // and "the grain moved" is the one they have to be walked to.

  import { createEventDispatcher } from 'svelte';
  import { runQuery, queryText } from '../game/sql-console-mission.js';

  export let stages = [];
  export let completed = false;

  const dispatch = createEventDispatcher();

  let round = 0;
  let picked = null;
  let answered = false;
  let correct = false;
  let query = { where: null, groupBy: null, having: null };
  let busy = false;

  $: current = stages[round];
  $: last = round === stages.length - 1;
  $: result = runQuery(query);
  $: sql = queryText(query);
  $: previous = result.rows.length;

  let before = null;   // row count before the last applied clause

  function pick(index) {
    if (busy || answered || completed || !current) return;
    busy = true;
    picked = index;
    answered = true;
    correct = index === current.correct;
    // A clause decision changes the query. A grain decision changes nothing,
    // because the table is already showing what it is asking about.
    if (correct && current.apply) {
      before = result.rows.length;
      query = { ...query, ...current.apply };
    }
    busy = false;
  }

  function next() {
    if (!correct) return;
    picked = null; answered = false; correct = false;
    if (!last) { round += 1; return; }
    dispatch('complete');
  }

  function again() { picked = null; answered = false; correct = false; }
</script>

<div class="query-stage">
  <p class="progress" aria-live="polite">
    {completed ? 'The query is built' : `Step ${round + 1} of ${stages.length}`}
  </p>

  <div class="board">
    <pre class="sql" aria-label={`The query so far: ${sql.replace(/\n/g, ', ')}`}>{sql}</pre>

    <div class="counts" aria-live="polite">
      <span class="rows"><b>{result.rows.length}</b> {result.rows.length === 1 ? 'row' : 'rows'}</span>
      {#if before !== null && before !== result.rows.length}
        <span class="was">was {before}</span>
      {/if}
      <span class="grain">one row = {result.grain.replace(/^one /, '')}</span>
    </div>

    <div class="scroll">
      <table>
        <thead>
          <tr>{#each result.columns as col}<th>{col}</th>{/each}</tr>
        </thead>
        <tbody>
          {#each result.rows as row}
            <tr>{#each result.columns as col}<td>{row[col]}</td>{/each}</tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  {#if current && !completed}
    <p class="question" id="query-question">{current.prompt}</p>

    <div class="choices" role="group" aria-labelledby="query-question">
      {#each current.options as label, i}
        <button
          class="choice"
          class:mono={current.apply}
          class:picked={picked === i}
          class:right={answered && correct && picked === i}
          class:wrong={answered && !correct && picked === i}
          class:answer={answered && !correct && i === current.correct}
          aria-pressed={picked === i}
          disabled={answered}
          on:click={() => pick(i)}>{label}</button>
      {/each}
    </div>

    <div class="feedback" role="status" aria-live="polite">
      {#if answered && correct}
        <p class="good"><b>Yes.</b> {current.why}</p>
      {:else if answered}
        <p class="not-yet"><b>Not that one.</b> {current.why}</p>
      {:else}
        <p class="waiting">{current.apply ? 'Choose a clause and watch what happens to the table.' : 'Read the table above, then answer.'}</p>
      {/if}
    </div>

    {#if answered && correct}
      <button class="advance" on:click={next}>{last ? 'Finish' : 'Next step'}</button>
    {:else if answered}
      <button class="advance retry" on:click={again}>Try this one again</button>
    {/if}
  {:else}
    <p class="all-done">Twelve rows became six, then three. The first change removed rows and left
      each survivor as one completed sale. The second changed what a row is, and after it a row
      count counts branches.</p>
  {/if}
</div>

<style>
  .query-stage { display: grid; gap: 13px; }

  .progress { margin: 0; color: #6d6558; font: 800 11px var(--qx-font, system-ui);
              letter-spacing: .1em; text-transform: uppercase; }

  .board { border: 2px solid #20241f; border-radius: 10px; background: #fffdf7; overflow: hidden; }

  .sql { margin: 0; padding: 13px 15px; background: #20241f; color: #f1ede4;
         font: 700 13px/1.55 ui-monospace, Consolas, monospace; white-space: pre-wrap; }

  .counts { display: flex; flex-wrap: wrap; gap: 9px; align-items: baseline;
            padding: 10px 15px; border-bottom: 1px solid #e0d8c8; background: #f6e6db; }
  .rows { color: #20241f; font: 700 13px var(--qx-font, system-ui); }
  .rows b { font: 800 21px var(--qx-font, system-ui); }
  /* The previous count stays visible, because the change is the information. */
  .was { color: #8c4c2e; font: 700 12px var(--qx-font, system-ui); text-decoration: line-through; }
  .grain { margin-left: auto; color: #6d6558; font: 700 12.5px var(--qx-font, system-ui); }

  .scroll { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font: 650 13.5px var(--qx-font, system-ui); }
  th, td { padding: 7px 13px; text-align: left; white-space: nowrap; color: #20241f;
           border-bottom: 1px solid #ece5d8; }
  th { font: 800 11px var(--qx-font, system-ui); letter-spacing: .06em; text-transform: uppercase;
       color: #6d6558; border-bottom: 2px solid #20241f; background: #fffdf7; }
  tbody tr:last-child td { border-bottom: 0; }

  .question { margin: 0; font: 700 18px/1.35 Georgia, serif; color: #20241f; }

  .choices { display: grid; gap: 8px; }
  .choice { width: 100%; min-height: 46px; padding: 11px 15px; text-align: left; cursor: pointer;
            border: 2px solid #cbbfa6; border-radius: 10px; background: #fff; color: #20241f;
            font: 650 15px/1.35 var(--qx-font, system-ui); }
  .choice.mono { font-family: ui-monospace, Consolas, monospace; font-size: 13.5px; font-weight: 700; }
  .choice:hover:not(:disabled) { border-color: #a85a34; }
  .choice:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }
  .choice.picked { border-color: #20241f; }
  .choice.right { border-color: #3e9e2a; background: #e7f1e2; color: #2c6b1c; }
  .choice.right::after { content: ' — correct'; font-weight: 800; font-family: var(--qx-font, system-ui); }
  .choice.wrong { border-color: #b3402e; background: #f7e7e3; }
  .choice.wrong::after { content: ' — not this one'; font-weight: 800; color: #8c3a2a; font-family: var(--qx-font, system-ui); }
  .choice.answer { border-color: #3e9e2a; }
  .choice.answer::after { content: ' — this one'; font-weight: 800; color: #2c6b1c; font-family: var(--qx-font, system-ui); }
  .choice:disabled { cursor: default; }

  .feedback { min-height: 44px; }
  .feedback p { margin: 0; font: 600 14px/1.5 var(--qx-font, system-ui); }
  .good { color: #2c6b1c; }
  .not-yet { color: #8c3a2a; }
  .waiting { color: #8b8375; }

  .advance { min-height: 46px; padding: 0 20px; border: 0; border-radius: 11px; cursor: pointer;
             background: #20241f; color: #fff; font: 800 15px var(--qx-font, system-ui); }
  .advance.retry { background: #fffdf7; color: #20241f; border: 2px solid #20241f; }
  .advance:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }

  .all-done { margin: 0; color: #4a4436; font: 600 15px/1.6 var(--qx-font, system-ui); max-width: 62ch; }

  @media (max-width: 620px) {
    .question { font-size: 16.5px; }
    .grain { margin-left: 0; flex-basis: 100%; }
    .sql { font-size: 12px; }
  }

  @media (forced-colors: active) {
    .choice.right, .choice.answer, .choice.wrong { border-color: CanvasText; }
  }
</style>
