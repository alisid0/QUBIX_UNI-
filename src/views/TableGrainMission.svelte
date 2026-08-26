<script>
  import { recordCompletion } from '../lib/game/progress.js';
  import { TABLE_GRAIN_MISSION, answerForGrainCase } from '../lib/game/table-grain-mission.js';

  let caseIndex = 0, step = 'grain', selected = '', selectedRow = 0;
  let checked = false, correct = false, completed = [];

  $: caseRecord = TABLE_GRAIN_MISSION.cases[caseIndex];
  $: missionComplete = completed.length === TABLE_GRAIN_MISSION.cases.length;
  $: options = caseRecord ? (step === 'grain' ? caseRecord.grainOptions : caseRecord.countOptions) : [];
  $: question = step === 'grain' ? 'What does one row represent?' : 'What does counting these rows count?';
  $: progress = Math.round(((completed.length * 2 + (step === 'count' ? 1 : 0) + (correct ? 1 : 0)) / (TABLE_GRAIN_MISSION.cases.length * 2)) * 100);
  $: if (missionComplete) recordCompletion('table-grain');

  function choose(value) {
    if (correct) return;
    selected = value;
    checked = true;
    correct = value === answerForGrainCase(caseRecord, step);
  }

  function continueMission() {
    if (!correct) return;
    if (step === 'grain') {
      step = 'count'; selected = ''; checked = false; correct = false;
      return;
    }
    completed = [...completed, caseRecord.id];
    caseIndex += 1; step = 'grain'; selected = ''; selectedRow = 0; checked = false; correct = false;
  }

  function resetMission() {
    caseIndex = 0; step = 'grain'; selected = ''; selectedRow = 0; checked = false; correct = false; completed = [];
  }
</script>

<svelte:head>
  <title>What Does One Row Represent? | Qubix University</title>
  <meta name="description" content="Local AI draft of the Qubix Superstore table-grain mission." />
</svelte:head>

<section class="mission-shell qx-shell">
  <header>
    <div class="identity">
      <span class="role">PRE<br />INTERN</span>
      <div><p>{TABLE_GRAIN_MISSION.id} · {TABLE_GRAIN_MISSION.status}</p><h1>{TABLE_GRAIN_MISSION.title}</h1></div>
    </div>
    <nav aria-label="Mission navigation">
      <a href="?mode=game&mission=foundations">Foundations</a>
      <a href="?mode=game&mission=duplicate-records">Mission 005</a>
      <a href="?mode=wiki">Wiki</a>
    </nav>
  </header>

  <div class="progress" aria-label={`Mission ${progress}% complete`}><span style={`width:${progress}%`}></span></div>

  <main>
    <section class="workbench-card">
      <div class="stage-heading">
        <div><p class="eyebrow">CORPORATE HQ · RELATIONAL DESK</p><h2>{missionComplete ? 'Table review complete' : caseRecord.table}</h2></div>
        <span>{missionComplete ? '6 / 6' : `${caseIndex + 1} / ${TABLE_GRAIN_MISSION.cases.length}`}</span>
      </div>

      {#if missionComplete}
        <div class="completion">
          <span class="completion-mark">✓</span>
          <p class="eyebrow">COMPETENCY DEMONSTRATED</p>
          <h2>Six table grains identified</h2>
          <p>{TABLE_GRAIN_MISSION.competency}</p>
          <a class="next-mission" href="?mode=game&mission=duplicate-records">Next mission →</a>
          <button class="restart" on:click={resetMission}>Restart practice</button>
        </div>
      {:else}
        <div class="workbench-grid">
          <section class="data-panel" aria-labelledby="data-preview-heading">
            <div class="table-toolbar">
              <div><p class="eyebrow" id="data-preview-heading">DATA PREVIEW</p><strong>{caseRecord.table}</strong></div>
              <span>Row {selectedRow + 1} selected</span>
            </div>

            <div class="table-wrap">
              <table>
                <caption class="sr-only">Three sample rows from the {caseRecord.table} table</caption>
                <thead><tr><th class="inspect-heading" scope="col">Inspect</th>{#each caseRecord.columns as column}<th scope="col">{column}</th>{/each}</tr></thead>
                <tbody>
                  {#each caseRecord.rows as row, rowIndex}
                    <tr class:selected-row={selectedRow === rowIndex}>
                      <th scope="row"><button class="row-select" aria-label={`Inspect row ${rowIndex + 1}`} aria-pressed={selectedRow === rowIndex} on:click={() => (selectedRow = rowIndex)}>{rowIndex + 1}</button></th>
                      {#each row as value}<td>{value}</td>{/each}
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </section>

          <section class="decision-card">
            <p class="eyebrow">STEP {step === 'grain' ? '1' : '2'} · {step === 'grain' ? 'GRAIN' : 'ROW COUNT'}</p>
            <h2>{question}</h2>
            <div class="options">
              {#each options as option}
                <button class:selected={selected === option} class:right={correct && selected === option} class:wrong={checked && !correct && selected === option} on:click={() => choose(option)} disabled={correct}><b>{option}</b></button>
              {/each}
            </div>
            {#if checked}
              <div class:success={correct} class:retry={!correct} class="feedback" role="status">
                {#if correct}<b>Correct.</b> {step === 'grain' ? caseRecord.explanation : caseRecord.countExplanation}{:else}<b>Try again.</b> Compare what each row records.{/if}
              </div>
            {/if}
            {#if correct}
              <button class="continue" on:click={continueMission}>{step === 'grain' ? 'Count the rows' : caseIndex === TABLE_GRAIN_MISSION.cases.length - 1 ? 'Complete mission' : 'Next table'} →</button>
            {/if}
          </section>
        </div>
      {/if}
    </section>
  </main>

  <footer>
    <span>Source-informed learning draft · accessed 21 August 2026</span>
    <span>{#each TABLE_GRAIN_MISSION.sources as source, index}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>{index < TABLE_GRAIN_MISSION.sources.length - 1 ? ' · ' : ''}{/each}</span>
  </footer>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#171510}
  :global(body){position:static}
  .mission-shell{min-height:100vh;max-width:none;padding:18px clamp(12px,3vw,34px) 30px;background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%);color:#f1ede4}
  header,.progress,main,footer{width:min(1320px,100%);margin-inline:auto}
  header{margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;gap:16px}
  .identity{display:flex;align-items:center;gap:12px}.role{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:#a85a34;color:white;font:900 12px/1.15 var(--qx-font);text-align:center}
  .identity p{margin:0 0 3px;color:#bcb19e;font:800 12px var(--qx-font);letter-spacing:.1em}.identity h1{margin:0;color:white;font:700 26px Georgia,serif}
  nav{display:flex;gap:14px}nav a,footer a{color:#e2c7b7;font:800 13.5px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}
  .progress{height:5px;margin-bottom:16px;border-radius:8px;background:rgba(255,255,255,.1);overflow:hidden}.progress span{display:block;height:100%;background:#63b13b;transition:width .35s ease}
  .workbench-card{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#f1ede4;color:#25231f;overflow:hidden}
  .stage-heading{min-height:76px;padding:15px 18px;display:flex;align-items:center;justify-content:space-between;gap:16px;border-bottom:1px solid #d8d0be}
  .stage-heading h2,.decision-card h2,.completion h2{margin:1px 0 0;font:700 24px/1.1 Georgia,serif}.stage-heading>span{display:grid;place-items:center;min-width:52px;height:34px;border-radius:20px;background:#25231f;color:white;font:900 13px var(--qx-font)}
  .eyebrow{margin:0 0 5px;color:#8c4c2e;font:900 12px var(--qx-font);letter-spacing:.12em}
  .workbench-grid{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(340px,.8fr);min-height:570px}
  .data-panel{min-width:0;padding:clamp(18px,3vw,34px);background:linear-gradient(rgba(255,255,255,.68),rgba(255,255,255,.68)),repeating-linear-gradient(0deg,transparent,transparent 31px,#ded7c8 32px)}
  .table-toolbar{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:14px}.table-toolbar strong{font:700 20px Georgia,serif}.table-toolbar>span{color:#706856;font:800 12px var(--qx-font)}
  .table-wrap{overflow-x:auto;border:1px solid #cfc6b5;border-radius:12px;background:#fbf8f1;box-shadow:0 16px 30px rgba(60,48,35,.12)}table{width:100%;border-collapse:collapse;white-space:nowrap}
  th,td{padding:14px 13px;border-right:1px solid #d8d0be;border-bottom:1px solid #d8d0be;text-align:left;font:700 13px var(--qx-font)}th:last-child,td:last-child{border-right:0}tbody tr:last-child th,tbody tr:last-child td{border-bottom:0}thead th{background:#28251f;color:white;font-size:12px}.inspect-heading{width:58px;text-align:center}
  tbody tr{transition:background .15s ease,box-shadow .15s ease}tbody tr.selected-row{background:#e5f0dc;box-shadow:inset 4px 0 #5a9938}tbody th{text-align:center}
  .row-select{width:32px;height:32px;border:2px solid #aaa18f;border-radius:50%;background:white;color:#25231f;font:900 12px var(--qx-font);cursor:pointer}.row-select[aria-pressed='true']{border-color:#4f882f;background:#4f882f;color:white}
  .decision-card{padding:clamp(22px,3vw,38px);border-left:1px solid #d8d0be;background:#f7f3eb}.decision-card h2{margin-bottom:22px}.options{display:grid;gap:9px}
  .options button{min-height:58px;padding:12px 14px;border:2px solid #ded6c6;border-radius:11px;background:white;color:#25231f;text-align:left;cursor:pointer}.options button b{font:850 14px/1.35 var(--qx-font)}.options button:hover,.options button.selected{border-color:#a85a34}.options button.right{border-color:#559535;background:#e7f0df}.options button.wrong{border-color:#b83a29;background:#f6ddd8}.options button:disabled{cursor:default}
  .row-select:focus-visible,.options button:focus-visible,.continue:focus-visible,.restart:focus-visible,.next-mission:focus-visible{outline:3px solid #a85a34;outline-offset:2px}
  .feedback{margin-top:12px;padding:12px 13px;border-radius:10px;font:650 13.5px/1.45 var(--qx-font)}.feedback.success{background:#e7f0df;color:#3d6529}.feedback.retry{background:#f6ddd8;color:#912c1e}
  .continue,.restart,.next-mission{width:100%;min-height:48px;margin-top:12px;border:0;border-radius:11px;background:#a85a34;color:white;font:900 13.5px var(--qx-font);cursor:pointer}
  .completion{width:min(520px,calc(100% - 36px));margin:0 auto;padding:clamp(46px,8vw,90px) 0;text-align:center}.completion>p:not(.eyebrow){margin:10px 0 22px;color:#625a49;font:650 14.5px/1.5 var(--qx-font)}.completion-mark{display:grid;place-items:center;width:58px;height:58px;margin:0 auto 16px;border-radius:50%;background:#559535;color:white;font:900 26px var(--qx-font)}
  .next-mission{display:grid;place-items:center;box-sizing:border-box;background:#25231f;text-decoration:none}.restart{background:transparent;color:#6e6655;border:1px solid #bdb4a3}
  footer{margin-top:14px;display:flex;justify-content:space-between;gap:14px;color:#9f9585;font:650 12px/1.5 var(--qx-font)}footer a{font-size:12px}
  .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
  @media(max-width:940px){.workbench-grid{grid-template-columns:1fr}.decision-card{border-top:1px solid #d8d0be;border-left:0}footer{flex-direction:column}}
  @media(max-width:600px){.mission-shell{padding:13px 10px 25px}header{align-items:flex-start}.identity h1{font-size:20px}.role{width:42px;height:42px}nav{flex-direction:column;align-items:flex-end;gap:6px}.data-panel,.decision-card{padding:16px}.table-toolbar{align-items:flex-start;flex-direction:column;gap:6px}th,td{padding:11px 10px}}
  @media(prefers-reduced-motion:reduce){.progress span,tbody tr{transition:none}}
</style>
