<script>
  // Chapter 06.01's game.
  //
  // The receipt stays on screen throughout, because the answer to the third
  // case is visible in it: one line is sold by weight and the other three are
  // not. When that case is answered the mission runs both conversions over the
  // real lines and puts the two baskets side by side, so a wrong choice
  // produces a number rather than a cross. The till recorded 18.70 and the
  // learner can check against it.
  import { TYPE_DESK_MISSION as M, RECEIPT, TILL_TOTAL, runBatch } from '../lib/game/type-desk-mission.js';
  import { recordCompletion } from '../lib/game/progress.js';
  import MissionMasthead from '../lib/components/game/MissionMasthead.svelte';

  let caseIndex = 0, selected = '', done = [];

  $: c = M.cases[caseIndex];
  $: correct = selected === c?.answer;
  $: missionComplete = done.length === M.cases.length;
  $: percent = Math.round((done.length / M.cases.length) * 100);
  $: if (missionComplete) recordCompletion('type-desk');
  $: showRuns = Boolean(selected) && c?.run === 'both';
  $: withFloat = showRuns ? runBatch('float') : null;
  $: withInt = showRuns ? runBatch('int') : null;

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
    roomId="data-office" roomName="Data Office · Reading a receipt in" chapter="06" />

  <div class="progress" aria-label={`${done.length} of ${M.cases.length} tasks complete`}>
    <span style={`width:${percent}%`}></span>
  </div>

  <main>
    <div class="left">
      <h2>sale_line, as the file hands it over</h2>
      <p class="note">Sale S-1041, four real lines. Every value is text, quotes included.</p>
      <div class="scroll">
        <table>
          <thead><tr><th>sku</th><th>quantity</th><th>uom</th><th>unit_price</th><th>promotion_id</th></tr></thead>
          <tbody>
            {#each RECEIPT as row}
              <tr class:weighed={row.uom === 'kg'}>
                <td>"{row.sku}"</td><td>"{row.quantity}"</td><td>"{row.uom}"</td>
                <td>"{row.unit_price}"</td><td>"{row.promotion_id}"</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <p class="note">The till recorded this basket as <b>£{TILL_TOTAL.toFixed(2)}</b>.</p>

      {#if showRuns}
        <h3>Both conversions, over the real lines</h3>
        <div class="runs">
          {#each [['float(quantity)', withFloat], ['int(quantity)', withInt]] as [label, run]}
            <div class="run" class:right={run.matchesTill} class:wrong={!run.matchesTill}>
              <b>{label}</b>
              <ul>
                {#each run.lines as line}
                  <li><span>{line.sku}</span><em>{line.used} × {line.unit_price}</em><i>£{line.lineTotal.toFixed(2)}</i></li>
                {/each}
              </ul>
              <p class="total">£{run.total.toFixed(2)}
                {#if run.matchesTill}<span class="tick">matches the till</span>
                {:else}<span class="miss">£{run.shortBy.toFixed(2)} short</span>{/if}</p>
            </div>
          {/each}
        </div>
        <p class="note">No error was raised either way. One of them is simply wrong,
          and the whole difference sits on the line sold by weight.</p>
      {/if}
    </div>

    <div class="task">
      <p class="step">Task {caseIndex + 1} of {M.cases.length}</p>
      <h2>{c.brief}</h2>
      <p class="hint">{c.hint}</p>

      <div class="options" role="group" aria-label="Answers">
        {#each c.options as [id, label, why]}
          <button class:right={selected === id && id === c.answer}
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
          <p>You can say what a value is once it has been read from a file, choose
            the conversion that keeps a total right, and recognise the kind of
            type mistake that returns a number instead of an error.</p>
          <a href="?mode=game&mission=python-trace">Next: read the program →</a>
        </div>
      {/if}
    </div>
  </main>

  <footer>
    <span>{#each M.sources as source, index}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>{index < M.sources.length - 1 ? ' · ' : ''}{/each}</span>
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
  .left,.task{padding:22px;border:2px solid #20241f;background:#fffdf7;box-shadow:4px 4px 0 rgba(32,36,31,.12)}

  h2{margin:0 0 6px;font:700 21px Georgia,serif}
  h3{margin:20px 0 8px;font:700 16px Georgia,serif}
  .note{margin:0 0 12px;color:#5b6158;font:650 13px/1.55 var(--qx-font)}
  .note b{color:#20241f}
  .step{margin:0 0 6px;color:#8c4c2e;font:900 11px var(--qx-font);letter-spacing:.12em;text-transform:uppercase}
  .hint{margin:0 0 16px;color:#5b6158;font:650 14px/1.55 var(--qx-font)}

  .scroll{overflow-x:auto;border:1px solid #c9c0ae}
  table{border-collapse:collapse;width:100%;min-width:520px;background:#fff}
  th,td{padding:8px 11px;border-bottom:1px solid #ddd6c6;text-align:left;white-space:nowrap;
        font:600 13px ui-monospace,Consolas,monospace}
  th{background:#efe9dd;font:900 11px var(--qx-font);letter-spacing:.06em;text-transform:uppercase;color:#5b6158}
  tbody tr:last-child td{border-bottom:0}
  tr.weighed td{background:#fbf3e6}

  .runs{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .run{padding:13px;border:2px solid #c9c0ae;background:#fff}
  .run.right{border-color:#315f48;background:#e9f1e6}
  .run.wrong{border-color:#b85530;background:#f9ece4}
  .run b{display:block;margin-bottom:8px;font:800 13px ui-monospace,Consolas,monospace}
  .run ul{list-style:none;margin:0;padding:0;display:grid;gap:4px}
  .run li{display:grid;grid-template-columns:1fr auto auto;gap:8px;font:650 11.5px var(--qx-font);color:#5b6158}
  .run li em{font-style:normal;font-family:ui-monospace,Consolas,monospace}
  .run li i{font-style:normal;font-weight:800;color:#20241f;font-variant-numeric:tabular-nums}
  .total{margin:9px 0 0;padding-top:8px;border-top:1px solid #ddd6c6;font:900 17px var(--qx-font);font-variant-numeric:tabular-nums}
  .tick,.miss{display:block;font:800 11.5px var(--qx-font);letter-spacing:.04em}
  .tick{color:#2c6b1c}.miss{color:#96392b}

  .options{display:grid;gap:9px}
  .options button{padding:12px 14px;border:2px solid #c9c0ae;background:#fff;color:#20241f;text-align:left;font:inherit;cursor:pointer}
  .options button b{display:block;font:800 13.5px/1.4 ui-monospace,Consolas,monospace;overflow-wrap:anywhere}
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

  @media (max-width:900px){main{grid-template-columns:1fr}.runs{grid-template-columns:1fr}}
  @media (prefers-reduced-motion:reduce){.progress span{transition:none}}
</style>
