<script>
  // The query is assembled clause by clause and run against the rows below it,
  // live. Choosing a clause rewrites the SQL and recomputes the result, so a
  // learner watches twelve sales become three branches instead of reading that
  // they would. Nothing here is a canned answer.
  import { SQL_CONSOLE_MISSION as M, SALES, runQuery, queryText, answerForSql, optionsForSql, whyForSql } from '../lib/game/sql-console-mission.js';
  import { recordCompletion } from '../lib/game/progress.js';

  const STEPS = [
    { key: 'clause', label: 'WRITE', question: 'Which clause does this need?',
      theory: 'Rows are filtered before grouping and groups are filtered after. Where a condition belongs is decided by whether the thing it tests exists yet.' },
    { key: 'grain', label: 'READ', question: 'What does one row of the result represent?',
      theory: 'A result is a table with a grain, exactly like a stored one. Until that sentence can be written, the row count means nothing.' }
  ];

  let caseIndex = 0, stepIndex = 0, selected = '', checked = false, correct = false, done = [];

  $: c = M.cases[caseIndex];
  $: step = STEPS[stepIndex];
  $: options = c ? optionsForSql(c, step.key) : [];
  $: missionComplete = done.length === M.cases.length;
  $: progress = Math.round(((done.length * STEPS.length + stepIndex + (correct ? 1 : 0)) / (M.cases.length * STEPS.length)) * 100);
  // Remembered, so the hub knows and closing the tab does not undo it.
  $: if (missionComplete) recordCompletion('sql-console');

  // The query as it currently stands: the case's target, with whatever the
  // learner has picked substituted into the slot this case is about.
  // Nothing until they choose. The first version fell back to the correct
  // clause, so the console arrived with the answer already applied and the
  // starting row count was never seen.
  $: picked = step.key === 'clause' ? (selected || null) : (c ? c.clause : null);
  $: query = c ? { ...c.target, [c.slot]: picked === 'none' ? null : picked } : { where: null, groupBy: null, having: null };
  // COUNT(*) in WHERE is not a slower query, it is a refused one.
  $: rejected = c?.slot === 'having' && picked === 'where';
  $: sql = c ? (rejected ? queryText({ ...c.target, having: null }).replace('FROM sale', 'FROM sale\nWHERE COUNT(*) > 3') : queryText(query)) : '';
  $: result = c && !rejected ? runQuery(query) : null;

  function choose(v) { if (correct) return; selected = v; checked = true; correct = v === answerForSql(c, step.key); }
  function advance() {
    if (!correct) return;
    if (stepIndex < STEPS.length - 1) stepIndex += 1;
    else { done = [...done, c.id]; caseIndex += 1; stepIndex = 0; }
    selected = ''; checked = false; correct = false;
  }
  function restart() { caseIndex = 0; stepIndex = 0; selected = ''; checked = false; correct = false; done = []; }
</script>

<svelte:head><title>{M.title} | Qubix University</title>
<meta name="description" content="Playable SQL console: assemble a query clause by clause and watch the grain change." /></svelte:head>

<section class="console qx-shell">
  <header>
    <div class="identity"><span class="role">SQL</span><div><p>{M.id} · {M.status} · CHAPTER 05</p><h1>{M.title}</h1></div></div>
    <nav><a href="?mode=game">Academy</a><a href="?mode=game&mission=shared-book&chapter=5&session=1">Chapter 05</a></nav>
  </header>
  <div class="progress" aria-label={`${progress}% complete`}><span style={`width:${progress}%`}></span></div>

  <main>
    <section class="stage">
      {#if missionComplete}
        <div class="done-panel">
          <span>✓</span><h2>{M.cases.length} queries assembled</h2>
          <p>{M.competency}</p>
          <ol>{#each M.cases as item}<li><b>{item.brief}</b><em>{item.expectRows} row{item.expectRows === 1 ? '' : 's'} · {runQuery(item.target).grain}</em></li>{/each}</ol>
          <button on:click={restart}>Run the console again</button>
        </div>
      {:else}
        <div class="brief"><p class="eyebrow">TASK {caseIndex + 1} OF {M.cases.length}</p><h2>{c.brief}</h2><span>{c.hint}</span></div>

        <div class="editor">
          <div class="bar"><span class="dot r"></span><span class="dot a"></span><span class="dot g"></span><b>qubix=#</b></div>
          <pre>{sql}</pre>
        </div>

        <div class="result">
          {#if rejected}
            <p class="rejected"><b>ERROR:</b> aggregate functions are not allowed in WHERE</p>
          {:else}
            <div class="result-head">
              <span><b>{result.rows.length}</b> row{result.rows.length === 1 ? '' : 's'}</span>
              <em>one row is {result.grain}</em>
            </div>
            <div class="table-wrap">
              <table>
                <thead><tr>{#each result.columns as col}<th>{col}</th>{/each}</tr></thead>
                <tbody>
                  {#each result.rows.slice(0, 8) as row}
                    <tr>{#each result.columns as col}<td>{row[col]}</td>{/each}</tr>
                  {/each}
                  {#if !result.rows.length}<tr><td colspan={result.columns.length} class="empty">no rows, which is an answer</td></tr>{/if}
                </tbody>
              </table>
            </div>
            {#if result.rows.length > 8}<p class="more">showing 8 of {result.rows.length}</p>{/if}
          {/if}
        </div>

        <details class="source"><summary>sale · {SALES.length} rows</summary>
          <div class="table-wrap"><table>
            <thead><tr><th>sale_id</th><th>branch_id</th><th>business_date</th><th>basket_total</th></tr></thead>
            <tbody>{#each SALES as r}<tr><td>{r.sale_id}</td><td>{r.branch_id}</td><td>{r.business_date}</td><td>{r.basket_total.toFixed(2)}</td></tr>{/each}</tbody>
          </table></div>
        </details>
      {/if}
    </section>

    {#if !missionComplete}
      <aside>
        <div class="steps" role="list">{#each STEPS as s, i}<span role="listitem" class:on={i === stepIndex} class:past={i < stepIndex}>{s.label}</span>{/each}</div>
        <p class="eyebrow">STEP {stepIndex + 1} OF {STEPS.length}</p>
        <h2>{step.question}</h2>
        <p class="theory">{step.theory}</p>
        <div class="options">
          {#each options as [value, label, hint]}
            <button class:sel={selected === value} class:right={correct && selected === value}
              class:wrong={checked && !correct && selected === value}
              on:click={() => choose(value)} disabled={correct}><b>{label}</b><span>{hint}</span></button>
          {/each}
        </div>
        {#if checked}
          <div class="feedback" class:good={correct} class:bad={!correct} role="status">
            {#if correct}<b>Correct.</b> {whyForSql(c, step.key)}
            {:else}<b>Not yet.</b> {step.key === 'clause' ? 'Look at the row count your clause produced, then choose again.' : 'Say what changes from one row of the result to the next.'}{/if}
          </div>
        {/if}
        {#if correct}<button class="next" on:click={advance}>{stepIndex < STEPS.length - 1 ? 'read the result' : (caseIndex === M.cases.length - 1 ? 'finish' : 'next task')} →</button>{/if}
      </aside>
    {/if}
  </main>

  <footer>
    <span>Source-informed learning draft · accessed 24 August 2026</span>
    <span>{#each M.sources as s, i}<a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>{i < M.sources.length - 1 ? ' · ' : ''}{/each}</span>
  </footer>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}:global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#171510}:global(body){position:static}
  .console{min-height:100vh;max-width:none;padding:18px clamp(12px,3vw,34px) 30px;color:#f2ede8;background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%);overflow:auto}
  header{max-width:1320px;margin:0 auto 14px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
  .identity{display:flex;align-items:center;gap:12px}
  .role{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:#2f7d6a;color:#fff;font:900 13px var(--qx-font)}
  .identity p{margin:0 0 3px;color:#aea08f;font:800 12px var(--qx-font);letter-spacing:.1em}
  .identity h1{margin:0;color:#fff;font:700 26px Georgia,serif}
  nav{display:flex;gap:14px}
  nav a,footer a{color:#8fd0bc;font:800 13px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}
  .progress{max-width:1320px;height:5px;margin:0 auto 16px;border-radius:8px;background:rgba(255,255,255,.1);overflow:hidden}
  .progress span{display:block;height:100%;background:#4fc08d;transition:width .35s ease}
  main{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(340px,.8fr);gap:16px;align-items:start}
  .stage,aside{border:1px solid rgba(255,255,255,.12);border-radius:18px;overflow:hidden}
  .stage{background:#211b15}
  .brief{padding:18px 20px;background:#31281d}
  .brief h2{margin:0;font:700 23px Georgia,serif;color:#fff;text-wrap:balance}
  .brief>span{display:block;margin-top:7px;color:#aea08f;font:650 13px/1.45 var(--qx-font)}
  .eyebrow{margin:0 0 5px;color:#6fbfa6;font:900 12px var(--qx-font);letter-spacing:.12em}
  .editor{margin:0;background:#16120d}
  .bar{padding:9px 14px;display:flex;align-items:center;gap:7px;border-bottom:1px solid rgba(255,255,255,.1)}
  .dot{width:10px;height:10px;border-radius:50%}.dot.r{background:#e05c4a}.dot.a{background:#dfa63a}.dot.g{background:#4fc08d}
  .bar b{margin-left:7px;color:#6f8794;font:800 12px ui-monospace,monospace}
  .editor pre{margin:0;padding:16px 18px;color:#cfe6dc;font:600 14px/1.7 ui-monospace,"SF Mono",Menlo,Consolas,monospace;white-space:pre-wrap;overflow-x:auto}
  .result{padding:14px 18px;border-top:1px solid rgba(255,255,255,.1)}
  .result-head{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:10px}
  .result-head span{color:#aea08f;font:700 13px var(--qx-font)}
  .result-head b{color:#4fc08d;font:900 21px var(--qx-font);font-variant-numeric:tabular-nums}
  .result-head em{color:#dfa63a;font:800 13px var(--qx-font);font-style:normal}
  .rejected{margin:0;padding:12px 14px;border-radius:9px;background:#3a1d1a;color:#f0a99e;font:700 13.5px ui-monospace,monospace}
  .rejected b{color:#e05c4a}
  .table-wrap{overflow-x:auto;border-radius:9px;border:1px solid rgba(255,255,255,.1)}
  table{width:100%;border-collapse:collapse;white-space:nowrap}
  th,td{padding:8px 12px;text-align:left;font:700 12.5px ui-monospace,monospace;border-bottom:1px solid rgba(255,255,255,.07)}
  th{background:#16120d;color:#6fbfa6;font-size:12px}
  td{color:#dacfc3}
  td.empty{color:#6f8794;font-style:italic;text-align:center}
  .more{margin:8px 0 0;color:#6f8794;font:700 12px var(--qx-font)}
  .source{margin:0;padding:12px 18px 16px;border-top:1px solid rgba(255,255,255,.1)}
  .source summary{color:#aea08f;font:800 12.5px var(--qx-font);cursor:pointer;min-height:24px}
  .source .table-wrap{margin-top:11px}
  aside{padding:clamp(18px,2.4vw,26px);background:#f1ede4;color:#25231f}
  .steps{display:flex;gap:6px;margin-bottom:16px}
  .steps span{padding:5px 11px;border-radius:14px;background:#e6dfd0;color:#8a8172;font:900 11px var(--qx-font);letter-spacing:.06em}
  .steps span.past{background:#d5e8de;color:#2f6b55}
  .steps span.on{background:#2f7d6a;color:#fff}
  aside .eyebrow{color:#2f7d6a}
  aside h2{margin:0;font:700 23px Georgia,serif;text-wrap:balance}
  .theory{margin:9px 0 16px;color:#625a49;font:650 13.5px/1.55 var(--qx-font)}
  .options{display:grid;gap:8px}
  .options button{padding:12px 14px;border:2px solid #ded6c6;border-radius:11px;background:#fff;color:#25231f;text-align:left;cursor:pointer;display:grid;gap:3px}
  .options button b{font:850 13.5px/1.35 ui-monospace,monospace}
  .options button span{color:#756c5c;font:650 12.5px/1.4 var(--qx-font)}
  .options button:hover,.options button.sel{border-color:#2f7d6a}
  .options button.right{border-color:#3f9a6d;background:#e4f1e9}
  .options button.wrong{border-color:#b83a29;background:#f6ddd8}
  .options button:disabled{cursor:default}
  .options button:focus-visible,.next:focus-visible,.done-panel button:focus-visible{outline:3px solid #2f7d6a;outline-offset:2px}
  .feedback{margin-top:11px;padding:11px 13px;border-radius:10px;font:650 13px/1.5 var(--qx-font)}
  .feedback.good{background:#e4f1e9;color:#2f6b55}
  .feedback.bad{background:#f6ddd8;color:#912c1e}
  .next,.done-panel button{width:100%;min-height:46px;margin-top:11px;border:0;border-radius:11px;background:#2f7d6a;color:#fff;font:900 13.5px var(--qx-font);cursor:pointer;text-transform:capitalize}
  .done-panel{padding:28px 24px;text-align:center;background:#f1ede4;color:#25231f}
  .done-panel>span{display:grid;place-items:center;width:58px;height:58px;margin:0 auto 14px;border-radius:50%;background:#3f9a6d;color:#fff;font:900 26px var(--qx-font)}
  .done-panel h2{margin:0;font:700 25px Georgia,serif}
  .done-panel>p{margin:9px 0 0;color:#625a49;font:650 13.5px/1.5 var(--qx-font)}
  .done-panel ol{list-style:none;margin:20px 0 0;padding:0;border:1px solid #d8d0be;border-radius:11px;overflow:hidden;text-align:left}
  .done-panel li{padding:11px 13px;border-bottom:1px solid #e1dacb;display:grid;gap:3px}
  .done-panel li:last-child{border-bottom:0}
  .done-panel li b{font:800 13px var(--qx-font)}
  .done-panel li em{color:#706856;font:650 12.5px var(--qx-font);font-style:normal}
  footer{max-width:1320px;margin:14px auto 0;display:flex;justify-content:space-between;gap:14px;color:#6f8794;font:650 12px/1.5 var(--qx-font);flex-wrap:wrap}
  @media(max-width:940px){main{grid-template-columns:1fr}}
  @media(max-width:600px){.console{padding:13px 10px 25px}.identity h1{font-size:20px}aside{padding:16px}}
  @media(prefers-reduced-motion:reduce){.progress span{transition:none}}
</style>
