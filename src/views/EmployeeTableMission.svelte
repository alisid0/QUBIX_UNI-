<script>
  // Chapter 05.01's game. The first table, and the first query.
  //
  // The table stays on screen for every case, because the whole lesson is that
  // an answer is read off a table rather than recalled. When a case is about a
  // query, the result appears underneath the table so the learner can see which
  // columns and which rows survived, next to the ones that did not.
  //
  // Nothing here is typed out twice. The result tables are computed from
  // EMPLOYEE_ROWS by runQuery, so the figures under a query cannot drift from
  // the table above it.
  import { EMPLOYEE_TABLE_MISSION as M, EMPLOYEE_ROWS, COLUMNS, resultFor }
    from '../lib/game/employee-table-mission.js';
  import { recordCompletion } from '../lib/game/progress.js';
  import MissionMasthead from '../lib/components/game/MissionMasthead.svelte';

  let caseIndex = 0, selected = '', done = [];

  $: c = M.cases[caseIndex];
  $: chosen = selected ? c.options.find(([id]) => id === selected) : null;
  $: correct = selected === c?.answer;
  $: missionComplete = done.length === M.cases.length;
  $: percent = Math.round((done.length / M.cases.length) * 100);
  $: if (missionComplete) recordCompletion('employee-table');
  // Shown only once the learner has committed to an answer, so the result is a
  // consequence of their choice rather than a hint sitting next to the question.
  $: result = selected && correct ? resultFor(c) : null;

  function choose(id) {
    if (done.includes(c.id)) return;
    selected = id;
    if (id === c.answer) done = [...done, c.id];
  }

  function next() {
    if (caseIndex < M.cases.length - 1) { caseIndex += 1; selected = ''; }
  }
</script>

<svelte:head>
  <title>{M.title} · Qubix University</title>
</svelte:head>

<section class="mission-shell">
  <MissionMasthead eyebrow={`${M.id} · DATA OFFICE ASSIGNMENT`} title={M.title}
    roomId="data-office" roomName="Data Office · First query" chapter="05" />

  <div class="progress" aria-label={`${done.length} of ${M.cases.length} tasks complete`}>
    <span style={`width:${percent}%`}></span>
  </div>

  <main>
    <div class="table-side">
      <h2>employee</h2>
      <p class="grain">Six of the 84 people who work at Northgate. Real rows from the Superstore.</p>
      <div class="scroll">
        <table>
          <thead><tr>{#each COLUMNS as column}<th>{column}</th>{/each}</tr></thead>
          <tbody>
            {#each EMPLOYEE_ROWS as row}
              <tr>{#each COLUMNS as column}<td>{row[column]}</td>{/each}</tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if result}
        <h3>What that query returns</h3>
        <div class="scroll">
          <table class="result">
            <thead><tr>{#each result.headers as header}<th>{header}</th>{/each}</tr></thead>
            <tbody>
              {#each result.rows as row}<tr>{#each row as cell}<td>{cell}</td>{/each}</tr>{/each}
            </tbody>
          </table>
        </div>
        <p class="grain">{result.rows.length} of {EMPLOYEE_ROWS.length} rows, {result.headers.length} of {COLUMNS.length} columns. The employee table itself has not changed.</p>
      {/if}
    </div>

    <div class="task">
      <p class="step">Task {caseIndex + 1} of {M.cases.length}</p>
      <h2>{c.brief}</h2>
      <p class="hint">{c.hint}</p>

      <div class="options" role="group" aria-label="Answers">
        {#each c.options as [id, label, why]}
          <button class:picked={selected === id}
                  class:right={selected === id && id === c.answer}
                  class:wrong={selected === id && id !== c.answer}
                  disabled={done.includes(c.id) && id !== c.answer}
                  on:click={() => choose(id)}>
            <b>{label}</b>
            {#if selected === id}<span>{why}</span>{/if}
          </button>
        {/each}
      </div>

      {#if selected}
        <p class="feedback" class:success={correct} class:retry={!correct} role="status">
          {correct ? c.why : 'Not that one. Read the reason under your answer and try again.'}
        </p>
      {/if}

      {#if correct && caseIndex < M.cases.length - 1}
        <button class="next" on:click={next}>Next task</button>
      {/if}

      {#if missionComplete}
        <div class="complete">
          <h3>All five done</h3>
          <p>You can say what a row and a column mean, name the column that identifies a row, and ask a table for the columns and rows you want.</p>
          <a href="?mode=game&mission=sql-console">Take it into the SQL Console →</a>
        </div>
      {/if}
    </div>
  </main>

  <footer>
    <span class="source-links">{#each M.sources as source, index}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>{index < M.sources.length - 1 ? ' · ' : ''}{/each}</span>
  </footer>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%!important;overflow:visible!important;background:#e6e0d2}
  :global(body){position:static!important;overscroll-behavior:auto!important}

  .mission-shell{min-height:100vh;padding:18px clamp(12px,3vw,34px) 40px;color:#20241f;font-family:var(--qx-font)}
  .progress{max-width:1340px;height:5px;margin:0 auto 18px;border-radius:8px;background:rgba(32,36,31,.12);overflow:hidden}
  .progress span{display:block;height:100%;background:#315f48;transition:width .35s ease}

  main{max-width:1340px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(340px,.9fr);gap:18px;align-items:start}
  .table-side,.task{padding:22px;border:2px solid #20241f;background:#fffdf7;box-shadow:4px 4px 0 rgba(32,36,31,.12)}

  h2{margin:0 0 6px;font:700 22px Georgia,serif}
  h3{margin:20px 0 8px;font:700 17px Georgia,serif}
  .grain{margin:0 0 12px;color:#5b6158;font:650 13px/1.5 var(--qx-font)}
  .step{margin:0 0 6px;color:#8c4c2e;font:900 11px var(--qx-font);letter-spacing:.12em;text-transform:uppercase}
  .hint{margin:0 0 16px;color:#5b6158;font:650 14px/1.55 var(--qx-font)}

  .scroll{overflow-x:auto;border:1px solid #c9c0ae}
  table{border-collapse:collapse;width:100%;min-width:520px;background:#fff;font-variant-numeric:tabular-nums}
  th,td{padding:8px 11px;border-bottom:1px solid #ddd6c6;text-align:left;font:600 13px var(--qx-font);white-space:nowrap}
  th{background:#efe9dd;font-weight:900;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:#5b6158}
  tbody tr:last-child td{border-bottom:0}
  table.result th{background:#e0e8df;color:#284c3b}

  .options{display:grid;gap:9px}
  .options button{padding:12px 14px;border:2px solid #c9c0ae;background:#fff;color:#20241f;text-align:left;font:inherit;cursor:pointer}
  .options button b{display:block;font:800 14px/1.4 var(--qx-font);overflow-wrap:anywhere}
  .options button span{display:block;margin-top:6px;color:#5b6158;font:650 12.5px/1.5 var(--qx-font)}
  .options button:hover:not(:disabled){border-color:#20241f}
  .options button.right{border-color:#315f48;background:#e0e8df}
  .options button.wrong{border-color:#9d4426;background:#f6e4dc}
  .options button:disabled{opacity:.55;cursor:default}
  .options button:focus-visible,.next:focus-visible,a:focus-visible{outline:3px solid #b85530;outline-offset:2px}

  .feedback{margin:14px 0 0;padding:11px 13px;font:650 13.5px/1.5 var(--qx-font)}
  .feedback.success{border-left:4px solid #315f48;background:#e0e8df;color:#284c3b}
  .feedback.retry{border-left:4px solid #b85530;background:#f6e4dc;color:#8c3d22}

  .next{margin-top:14px;min-height:44px;padding:10px 18px;border:2px solid #20241f;background:#315f48;color:#fff;font:900 13.5px var(--qx-font);cursor:pointer}

  .complete{margin-top:18px;padding:16px;border:2px solid #315f48;background:#e0e8df}
  .complete h3{margin:0 0 6px}
  .complete p{margin:0 0 10px;font:650 13.5px/1.55 var(--qx-font)}
  .complete a{color:#284c3b;font:800 13.5px var(--qx-font)}

  footer{max-width:1340px;margin:18px auto 0;color:#5b6158;font:650 12px var(--qx-font)}
  footer a{color:#284c3b}

  @media (max-width:900px){main{grid-template-columns:1fr}}
  @media (prefers-reduced-motion:reduce){.progress span{transition:none}}
</style>
