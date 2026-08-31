<script>
  // Read the Table. Eight decisions, four tables, two questions each.
  //
  // Every answer is a real <button>, so keyboard, touch and mouse all arrive
  // through one path rather than a drag being the only way through. Feedback
  // lands before the learner can move on, and a wrong answer never takes a
  // finished table away: `done` only ever grows.

  import { recordCompletion } from '../lib/game/progress.js';
  import { READ_THE_TABLE_MISSION, DECISION_COUNT, isCorrect } from '../lib/game/read-the-table-mission.js';
  import RowColumnTable from '../lib/components/RowColumnTable.svelte';
  import MissionMasthead from '../lib/components/game/MissionMasthead.svelte';

  const TABLES = READ_THE_TABLE_MISSION.tables;

  let index = 0;              // which table
  let part = 'row';           // 'row' then 'column'
  let picked = '';
  let checked = false;
  let correct = false;
  let done = [];              // decisions finished, as "tableId:part"

  $: table = TABLES[index];
  $: decision = table ? table[part] : null;
  $: key = table ? `${table.id}:${part}` : '';
  $: complete = done.length === DECISION_COUNT;
  $: percent = Math.round((done.length / DECISION_COUNT) * 100);
  $: tablesDone = new Set(done.map(d => d.split(':')[0]).filter(id =>
    done.includes(`${id}:row`) && done.includes(`${id}:column`)));
  $: if (complete) recordCompletion('read-the-table');

  function pick(value) {
    if (correct) return;                 // a settled decision stays settled
    picked = value;
    checked = true;
    correct = isCorrect(index, part, value);
  }

  function advance() {
    if (!correct) return;
    if (!done.includes(key)) done = [...done, key];
    picked = ''; checked = false; correct = false;
    if (part === 'row') { part = 'column'; return; }
    part = 'row';
    if (index < TABLES.length - 1) index += 1;
  }

  function restart() {
    index = 0; part = 'row'; picked = ''; checked = false; correct = false; done = [];
  }
</script>

<svelte:head>
  <title>Read the Table | Qubix University</title>
  <meta name="description" content="Say what one row contains and what one column contains, across four tables from the shop." />
</svelte:head>

<div class="game-shell">
  <MissionMasthead
    eyebrow="STEP 4 OF 10"
    title="Read the Table"
    roomId="aisles"
    roomName="Aisles"
    progress={percent}
    meta={`${done.length} of ${DECISION_COUNT} decisions`} />

  <main>
    {#if complete}
      <section class="done-card">
        <p class="eyebrow">STEP 4 OF 10 COMPLETE</p>
        <h2>Four tables, eight answers</h2>
        <p>A row contains details about one case, and that case is called an observation.
          A column contains the same kind of detail in every row, and that is called a variable.
          The row is always a row; what changes is the case recorded in it.</p>
        <div class="done-actions">
          <a class="next" href="/learn/data-foundations/chapter/1/session/3">Next: What one row represents →</a>
          <button on:click={restart}>Do it again</button>
        </div>
      </section>
    {:else}
      <section class="brief">
        <div>
          <p class="eyebrow">TABLE {index + 1} OF {TABLES.length}{#if table.recap} · RECAP{/if}</p>
          <h2>{table.name}</h2>
          <p class="lead">{table.lead}</p>
        </div>
        <ol class="pips" aria-label={`${tablesDone.size} of ${TABLES.length} tables finished`}>
          {#each TABLES as t, i}
            <li class:now={i === index} class:finished={tablesDone.has(t.id)}>
              <span class="sr">{t.name}{tablesDone.has(t.id) ? ' finished' : i === index ? ' in progress' : ''}</span>
              <i aria-hidden="true">{tablesDone.has(t.id) ? '✓' : i + 1}</i>
            </li>
          {/each}
        </ol>
      </section>

      <section class="table-card">
        <RowColumnTable
          headers={table.headers}
          rows={table.rows}
          highlightRow={part === 'row' ? table.row.index : (correct || checked ? table.row.index : null)}
          highlightColumn={part === 'column' ? table.column.index : null}
          caption={`The ${table.name} table.`} />
      </section>

      <section class="ask">
        <h3 id="prompt">{decision.prompt}</h3>
        <div class="options" role="group" aria-labelledby="prompt">
          {#each decision.options as [value, label]}
            <button
              class="option"
              class:picked={picked === value}
              class:right={checked && correct && picked === value}
              class:wrong={checked && !correct && picked === value}
              aria-pressed={picked === value}
              disabled={correct}
              on:click={() => pick(value)}>{label}</button>
          {/each}
        </div>

        <div class="feedback" role="status" aria-live="polite">
          {#if checked && correct}
            <p class="good"><b>Yes.</b> {decision.why}</p>
          {:else if checked}
            <p class="not-yet"><b>Not that one.</b> {decision.retry}</p>
          {:else}
            <p class="waiting">Choose an answer to see why it works.</p>
          {/if}
        </div>

        <button class="advance" disabled={!correct} on:click={advance}>
          {part === 'row' ? 'Now the column →' : index === TABLES.length - 1 ? 'Finish →' : 'Next table →'}
        </button>
      </section>
    {/if}
  </main>
</div>

<style>
  :global(.qubix-university) { height: auto !important; overflow: visible !important; }
  :global(html), :global(body), :global(#app) {
    height: auto !important;
    min-height: 100%;
    overflow: visible !important;
    background: #f7f3e9;
  }
  :global(body) { position: static; }

  .game-shell { min-height: 100vh; background: #f7f3e9; padding-bottom: 44px; }
  main { max-width: 780px; margin: 0 auto; padding: 22px 20px 0; display: grid; gap: 18px; }

  .eyebrow { margin: 0 0 6px; color: #a85a34; font: 900 11px var(--qx-font, system-ui);
             letter-spacing: .13em; }
  h2 { margin: 0; font: 700 27px Georgia, serif; color: #241f16; }
  h3 { margin: 0 0 13px; font: 700 19px Georgia, serif; color: #241f16; }
  .lead { margin: 7px 0 0; color: #6d6558; font: 600 14.5px/1.45 var(--qx-font, system-ui); }

  .brief { display: flex; justify-content: space-between; align-items: flex-start; gap: 18px; flex-wrap: wrap; }

  .pips { display: flex; gap: 7px; list-style: none; margin: 0; padding: 0; }
  .pips li { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%;
             border: 2px solid #ded6c6; background: #fffdf7;
             font: 800 13px var(--qx-font, system-ui); color: #8b8375; }
  .pips li.now { border-color: #a85a34; color: #a85a34; }
  .pips li.finished { border-color: #3e9e2a; background: #e7f1e2; color: #2c6b1c; }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

  .brief, .table-card, .ask, .done-card { min-width: 0; }
  .table-card, .ask, .done-card { padding: 20px; border: 3px solid #241f16; background: #fffdf7;
                                  box-shadow: 6px 6px 0 rgba(32, 36, 31, .12); }
  .table-card { padding: 14px; }

  .options { display: grid; gap: 9px; }
  .option { width: 100%; min-height: 46px; padding: 12px 15px; text-align: left;
            border: 2px solid #ded6c6; border-radius: 10px; background: #fff; cursor: pointer;
            font: 650 15px/1.4 var(--qx-font, system-ui); color: #241f16; }
  .option:hover:not(:disabled) { border-color: #a85a34; }
  .option:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }
  .option.picked { border-color: #241f16; }
  .option.right { border-color: #3e9e2a; background: #e7f1e2; color: #2c6b1c; }
  .option.wrong { border-color: #b3402e; background: #f7e7e3; }
  .option:disabled { cursor: default; opacity: 1; }

  .feedback { min-height: 58px; margin: 13px 0 0; }
  .feedback p { margin: 0; font: 600 14px/1.5 var(--qx-font, system-ui); }
  .good { color: #2c6b1c; }
  .not-yet { color: #8c3a2a; }
  .waiting { color: #8b8375; }

  .advance { width: 100%; min-height: 46px; margin-top: 6px; border: 0; border-radius: 11px;
             background: #241f16; color: #fff; cursor: pointer;
             font: 800 15px var(--qx-font, system-ui); }
  .advance:disabled { background: #ded6c6; color: #8b8375; cursor: not-allowed; }
  .advance:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }

  .done-card p { color: #4a4436; font: 600 15px/1.6 var(--qx-font, system-ui); max-width: 60ch; }
  .done-actions { display: flex; gap: 11px; margin-top: 17px; flex-wrap: wrap; }
  .next { display: grid; place-items: center; min-height: 46px; padding: 0 20px; border-radius: 11px;
          background: #241f16; color: #fff; text-decoration: none;
          font: 800 15px var(--qx-font, system-ui); }
  .next:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }
  .done-actions button { min-height: 46px; padding: 0 20px; border: 2px solid #241f16;
                         border-radius: 11px; background: #fffdf7; cursor: pointer;
                         font: 800 15px var(--qx-font, system-ui); color: #241f16; }

  @media (max-width: 620px) {
    main { padding: 16px 14px 0; gap: 14px; }
    h2 { font-size: 23px; }
    .brief { flex-direction: column; }
    .table-card, .ask, .done-card { padding: 15px; border-width: 3px; box-shadow: 5px 5px 0 rgba(32, 36, 31, .12); }
    .option { font-size: 14.5px; }
  }
</style>
