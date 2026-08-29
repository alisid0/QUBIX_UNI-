<script>
  // Mission 006, rebuilt around its data.
  //
  // It used to draw the fan-out as a 3D bridge with one span per match. That
  // was an abstraction of the thing. Two real tables and the result of actually
  // joining them is the thing itself: a learner watches S-1041 appear twice
  // because it has two lines, and S-1042 disappear because it has no return.
  //
  // Same shape as missions 003 and 004, which were both rebuilt this way.
  import { JOIN_GRAIN_MISSION, answerForJoinCase, joinChangesGrain, joinSample } from '../lib/game/join-grain-mission.js';
  import { recordCompletion } from '../lib/game/progress.js';
  import MissionMasthead from '../lib/components/game/MissionMasthead.svelte';

  let caseIndex = 0, step = 'matches', selected = '', checked = false, correct = false, completed = [];

  $: caseRecord = JOIN_GRAIN_MISSION.cases[caseIndex];
  $: missionComplete = completed.length === JOIN_GRAIN_MISSION.cases.length;
  $: options = caseRecord ? (step === 'matches' ? caseRecord.matchOptions : caseRecord.grainOptions) : [];
  $: joined = caseRecord ? joinSample(caseRecord) : null;
  // The result is withheld until the cardinality has been answered, so a
  // prediction is a prediction. Showing it first would answer the question.
  $: showResult = step === 'grain' || (step === 'matches' && correct);
  $: question = step === 'matches'
    ? `How many ${caseRecord?.right} rows can match one ${caseRecord?.left} row?`
    : 'After the join, what does one row represent?';
  $: theory = step === 'matches'
    ? 'This is a question about the data, not about SQL. Ask whether the key you are joining on repeats in the table on the right.'
    : 'A join that matches more than once multiplies rows. Every total computed afterwards is computed at the new grain, whether or not anyone noticed it moved.';
  $: progress = Math.round(((completed.length * 2 + (step === 'grain' ? 1 : 0) + (correct ? 1 : 0)) / (JOIN_GRAIN_MISSION.cases.length * 2)) * 100);
  // Remembered, so the hub knows and closing the tab does not undo it.
  $: if (missionComplete) recordCompletion('join-grain');

  function choose(value) {
    if (correct) return;
    selected = value;
    checked = true;
    correct = value === answerForJoinCase(caseRecord, step);
  }

  function continueMission() {
    if (!correct) return;
    if (step === 'matches') { step = 'grain'; selected = ''; checked = false; correct = false; return; }
    completed = [...completed, caseRecord.id];
    caseIndex += 1;
    step = 'matches'; selected = ''; checked = false; correct = false;
  }

  function resetMission() {
    caseIndex = 0; step = 'matches'; selected = ''; checked = false; correct = false; completed = [];
  }
</script>

<svelte:head><title>Join Without Changing the Grain | Qubix University</title>
<meta name="description" content="Predict what a join does to the row count, then watch it happen to real rows." /></svelte:head>

<section class="mission-shell qx-shell">
  <MissionMasthead eyebrow={`${JOIN_GRAIN_MISSION.id} · DATA OFFICE ASSIGNMENT`} title={JOIN_GRAIN_MISSION.title}
    roomId="data-office" roomName="Data Office · Back desk" progress={progress}
    meta={`${missionComplete ? JOIN_GRAIN_MISSION.cases.length : caseIndex + 1} OF ${JOIN_GRAIN_MISSION.cases.length} JOINS`} />

  <main>
    <section class="workbench-card m1-workarea">
      <div class="stage-heading">
        <div><p class="eyebrow">CORPORATE HQ · JOIN WORKBENCH</p>
          <h2>{missionComplete ? 'Join review complete' : `${caseRecord.left} ⋈ ${caseRecord.right}`}</h2></div>
        <span>{missionComplete ? '6 / 6' : `${caseIndex + 1} / ${JOIN_GRAIN_MISSION.cases.length}`}</span>
      </div>

      {#if missionComplete}
        <div class="completion">
          <span class="completion-mark">✓</span>
          <p class="eyebrow">COMPETENCY DEMONSTRATED</p>
          <h2>Six joins predicted</h2>
          <p>{JOIN_GRAIN_MISSION.competency}</p>
          <ul>{#each JOIN_GRAIN_MISSION.cases as item}
            <li><b>{item.left} ⋈ {item.right}</b><span>{item.leftRows.toLocaleString()} → {item.resultRows.toLocaleString()}</span></li>
          {/each}</ul>
          <a class="next-mission" href="?mode=game&mission=data-lineage">Next mission →</a>
          <button class="restart" on:click={resetMission}>Restart practice</button>
        </div>
      {:else}
        <p class="context">{caseRecord.context}</p>

        <div class="tables">
          <div class="table-block">
            <p class="table-name">{caseRecord.left}<em>{caseRecord.leftTable.rows.length} sample rows</em></p>
            <div class="table-wrap"><table>
              <caption class="sr-only">Sample rows from {caseRecord.left}</caption>
              <thead><tr>{#each caseRecord.leftTable.columns as col}<th scope="col" class:keycol={col === caseRecord.key}>{col}</th>{/each}</tr></thead>
              <tbody>{#each caseRecord.leftTable.rows as row, i}
                <tr class:fanned={showResult && joined.fanned.has(i)}
                    class:dropped={showResult && !joined.rows.some(r => r.from === i)}>
                  {#each row as cell, ci}<td class:keycol={caseRecord.leftTable.columns[ci] === caseRecord.key}>{cell}</td>{/each}
                </tr>
              {/each}</tbody>
            </table></div>
          </div>

          <div class="join-mark" aria-hidden="true"><span>⋈</span><em>on {caseRecord.key}</em></div>

          <div class="table-block">
            <p class="table-name">{caseRecord.right}<em>{caseRecord.rightTable.rows.length} sample rows</em></p>
            <div class="table-wrap"><table>
              <caption class="sr-only">Sample rows from {caseRecord.right}</caption>
              <thead><tr>{#each caseRecord.rightTable.columns as col}<th scope="col" class:keycol={col === caseRecord.key}>{col}</th>{/each}</tr></thead>
              <tbody>{#each caseRecord.rightTable.rows as row}
                <tr>{#each row as cell, ci}<td class:keycol={caseRecord.rightTable.columns[ci] === caseRecord.key}>{cell}</td>{/each}</tr>
              {/each}</tbody>
            </table></div>
          </div>
        </div>

        <div class="result">
          <p class="table-name">result
            {#if showResult}<em>{joined.rows.length} rows from {caseRecord.leftTable.rows.length}</em>{:else}<em>predict first</em>{/if}
          </p>
          {#if showResult}
            <div class="table-wrap"><table>
              <caption class="sr-only">The rows this join actually returns</caption>
              <thead><tr>{#each joined.columns as col}<th scope="col" class:keycol={col === caseRecord.key}>{col}</th>{/each}</tr></thead>
              <tbody>{#each joined.rows as row}
                <tr class:fanned={joined.fanned.has(row.from)}>
                  {#each row.cells as cell, ci}<td class:keycol={joined.columns[ci] === caseRecord.key}>{cell}</td>{/each}
                </tr>
              {/each}</tbody>
            </table></div>
            <p class="verdict" class:moved={joinChangesGrain(caseRecord)}>
              {#if joined.dropped}<b>{joined.dropped} left row{joined.dropped === 1 ? '' : 's'} vanished for having no match.</b>{/if}
              {#if joined.fanned.size}<b>{joined.fanned.size} left row{joined.fanned.size === 1 ? '' : 's'} appeared more than once.</b>{/if}
              {#if !joined.dropped && !joined.fanned.size}<b>Every left row appeared exactly once.</b>{/if}
              At full size: {caseRecord.leftRows.toLocaleString()} rows in, {caseRecord.resultRows.toLocaleString()} out.
            </p>
          {:else}
            <p class="hidden-note">Answer the question first. The result is withheld so that a prediction is a prediction.</p>
          {/if}
        </div>
      {/if}
    </section>

    {#if !missionComplete}
      <aside class="decision-card">
        <div class="theory"><p class="eyebrow">THEORY → PRACTICAL · {step === 'matches' ? 'CARDINALITY' : 'RESULT GRAIN'}</p><h2>{question}</h2><p>{theory}</p></div>
        <article class="evidence">
          <p>{caseRecord.left} is {caseRecord.leftGrain}.</p>
          <code>joining on {caseRecord.key} · {caseRecord.leftRows.toLocaleString()} rows meet {caseRecord.rightRows.toLocaleString()}</code>
        </article>
        <div class="options">
          {#each options as option}
            <button class:selected={selected === option} class:right={correct && selected === option}
              class:wrong={checked && !correct && selected === option}
              on:click={() => choose(option)} disabled={correct}><b>{option}</b></button>
          {/each}
        </div>
        {#if checked}
          <div class:success={correct} class:retry={!correct} class="feedback" role="status">
            {#if correct}<b>Correct.</b> {step === 'matches' ? caseRecord.matchExplanation : caseRecord.grainExplanation}
            {:else}<b>Try again.</b> {step === 'matches' ? `Ask whether ${caseRecord.key} can repeat in ${caseRecord.right}.` : 'Name what changes from one row of the result to the next.'}{/if}
          </div>
        {/if}
        {#if correct}
          <button class="continue" on:click={continueMission}>
            {step === 'matches' ? 'Read the result grain' : caseIndex === JOIN_GRAIN_MISSION.cases.length - 1 ? 'Complete mission' : 'Next join'} →
          </button>
        {/if}
      </aside>
    {/if}
  </main>

  <footer>
    <span>Source-informed learning draft · accessed 24 August 2026</span>
    <span>{#each JOIN_GRAIN_MISSION.sources as source, index}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>{index < JOIN_GRAIN_MISSION.sources.length - 1 ? ' · ' : ''}{/each}</span>
  </footer>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#171510}
  :global(body){position:static}
  .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}

  .mission-shell{min-height:100vh;max-width:none;padding:18px clamp(12px,3vw,34px) 40px;color:#f1ede4;
                 background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%)}
  header{max-width:1320px;margin:0 auto 14px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
  .identity{display:flex;align-items:center;gap:12px}
  .role{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:#a85a34;color:#fff;font:900 12px/1.15 var(--qx-font);text-align:center}
  .identity p{margin:0 0 3px;color:#bcb19e;font:800 12px var(--qx-font);letter-spacing:.1em}
  .identity h1{margin:0;color:#fff;font:700 26px Georgia,serif}
  nav{display:flex;gap:14px;flex-wrap:wrap}
  nav a,footer a{color:#e2c7b7;font:800 13px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}
  .progress{max-width:1320px;height:5px;margin:0 auto 16px;border-radius:8px;background:rgba(255,255,255,.1);overflow:hidden}
  .progress span{display:block;height:100%;background:#63b13b;transition:width .35s ease}

  main{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.25fr) minmax(340px,.75fr);gap:16px;align-items:start}
  .workbench-card,.decision-card{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#f1ede4;color:#25231f;overflow:hidden}
  .stage-heading{min-height:76px;padding:15px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px}
  .stage-heading h2{margin:1px 0 0;font:700 22px Georgia,serif;overflow-wrap:anywhere}
  .stage-heading>span{display:grid;place-items:center;min-width:52px;height:34px;border-radius:20px;background:#25231f;color:#fff;font:900 13px var(--qx-font)}
  .eyebrow{margin:0 0 5px;color:#8c4c2e;font:900 12px var(--qx-font);letter-spacing:.12em}
  .context{margin:0;padding:0 18px 16px;color:#5e574a;font:650 14px/1.5 var(--qx-font)}

  .tables{padding:0 18px;display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:14px;align-items:start}
  .join-mark{align-self:center;display:grid;place-items:center;gap:4px;color:#8c4c2e}
  .join-mark span{font:400 26px Georgia,serif}
  .join-mark em{color:#7a7160;font:800 11px var(--qx-font);font-style:normal;white-space:nowrap}
  .table-name{margin:0 0 7px;display:flex;align-items:baseline;justify-content:space-between;gap:10px;
              color:#25231f;font:800 13px ui-monospace,monospace}
  .table-name em{color:#7a7160;font:700 12px var(--qx-font);font-style:normal}
  .table-wrap{overflow-x:auto;border:1px solid #cfc6b5;border-radius:11px;background:#fbf8f1}
  table{width:100%;border-collapse:collapse;white-space:nowrap}
  th,td{padding:9px 11px;border-bottom:1px solid #e2dac9;text-align:left;font:700 12.5px ui-monospace,monospace}
  th{background:#28251f;color:#e7ded0;font-size:11.5px}
  td{color:#4e473b}
  tbody tr:last-child td{border-bottom:0}
  .keycol{background:rgba(140,76,46,.09)}
  th.keycol{background:#3a2f26;color:#f0c9a8}
  tbody tr.fanned td{background:#f7e6d5}
  tbody tr.fanned td:first-child{box-shadow:inset 3px 0 #a85a34}
  tbody tr.dropped td{opacity:.45;text-decoration:line-through}

  .result{padding:16px 18px 18px}
  .verdict{margin:11px 0 0;padding:11px 13px;border-radius:10px;background:#e9eddf;color:#3f5233;font:650 13px/1.5 var(--qx-font)}
  .verdict.moved{background:#f7e6d5;color:#8c4c2e}
  .verdict b{display:block}
  .hidden-note{margin:0;padding:16px;border:1px dashed #cfc6b5;border-radius:11px;color:#7a7160;font:650 13px/1.5 var(--qx-font)}

  .decision-card{padding:clamp(18px,2.5vw,28px)}
  .theory{padding-bottom:16px;border-bottom:1px solid #d8d0be}
  .theory h2,.completion h2{margin:0;font:700 23px Georgia,serif;text-wrap:balance}
  .theory>p:last-child,.completion>p{margin:8px 0 0;color:#625a49;font:600 13.5px/1.5 var(--qx-font)}
  .evidence{margin:14px 0;padding:13px;border-radius:11px;background:#fbf8f1;border:1px solid #ddd5c5}
  .evidence p{margin:0 0 8px;font:650 13.5px/1.45 var(--qx-font)}
  .evidence code{color:#8c4c2e;font:800 12px ui-monospace,monospace;overflow-wrap:anywhere}
  .options{display:grid;gap:8px}
  .options button{min-height:54px;padding:11px 13px;border:2px solid #ded6c6;border-radius:11px;background:#fff;color:#25231f;text-align:left;cursor:pointer}
  .options button b{font:850 13.5px/1.35 var(--qx-font)}
  .options button:hover,.options button.selected{border-color:#a85a34}
  .options button.right{border-color:#559535;background:#e7f0df}
  .options button.wrong{border-color:#b83a29;background:#f6ddd8}
  .options button:disabled{cursor:default}
  .options button:focus-visible,.continue:focus-visible,.restart:focus-visible,.next-mission:focus-visible,a:focus-visible{outline:3px solid #a85a34;outline-offset:2px}
  .feedback{margin-top:11px;padding:11px 12px;border-radius:10px;font:650 13px/1.45 var(--qx-font)}
  .feedback.success{background:#e7f0df;color:#3d6529}
  .feedback.retry{background:#f6ddd8;color:#912c1e}
  .continue,.restart,.next-mission{width:100%;min-height:46px;margin-top:11px;border:0;border-radius:11px;background:#a85a34;color:#fff;font:900 13.5px var(--qx-font);cursor:pointer}
  .next-mission{display:grid;place-items:center;box-sizing:border-box;background:#25231f;text-decoration:none}

  .completion{padding:24px 20px 28px;text-align:center}
  .completion-mark{display:grid;place-items:center;width:58px;height:58px;margin:0 auto 14px;border-radius:50%;background:#559535;color:#fff;font:900 26px var(--qx-font)}
  .completion ul{list-style:none;margin:20px 0 0;padding:0;border:1px solid #d8d0be;border-radius:11px;overflow:hidden;text-align:left}
  .completion li{display:flex;justify-content:space-between;gap:12px;padding:10px 12px;border-bottom:1px solid #ddd5c5;font:700 12.5px var(--qx-font)}
  .completion li:last-child{border-bottom:0}
  .completion li span{color:#706856;font-variant-numeric:tabular-nums}

  footer{max-width:1320px;margin:14px auto 0;display:flex;justify-content:space-between;gap:14px;color:#9f9585;font:650 12px/1.5 var(--qx-font);flex-wrap:wrap}

  @media(max-width:980px){main{grid-template-columns:1fr}}
  @media(max-width:720px){
    .tables{grid-template-columns:1fr}
    .join-mark{justify-self:start;display:flex;align-items:center;gap:8px}
  }
  @media(max-width:600px){.mission-shell{padding:13px 10px 30px}.identity h1{font-size:20px}.decision-card{padding:16px}}
  @media(prefers-reduced-motion:reduce){.progress span{transition:none}}
</style>
