<script>
  // Chapter 06's game. The listing and the trace come from the same program
  // object: sourceOf renders it as Python, runProgram executes it. A learner
  // predicts, then steps through and watches each name change, and the code on
  // screen cannot drift from the behaviour beside it because there is only one
  // program.
  import { PYTHON_TRACE_MISSION as M, TRACE_STEPS, sourceOf, runProgram,
    answerForTrace, optionsForTrace, whyForTrace } from '../lib/game/python-trace-mission.js';
  import { recordCompletion } from '../lib/game/progress.js';

  let caseIndex = 0, stepIndex = 0, selected = '', checked = false, correct = false, done = [];
  let at = 0;

  $: c = M.cases[caseIndex];
  $: step = TRACE_STEPS[stepIndex];
  $: options = c ? optionsForTrace(c, step.key) : [];
  $: missionComplete = done.length === M.cases.length;
  $: progress = Math.round(((done.length * TRACE_STEPS.length + stepIndex + (correct ? 1 : 0)) / (M.cases.length * TRACE_STEPS.length)) * 100);
  // Remembered, so the hub knows and closing the tab does not undo it.
  $: if (missionComplete) recordCompletion('python-trace');

  $: lines = c ? sourceOf(c.program) : [];
  $: run = c ? runProgram(c.program, c.data) : null;
  // Withheld until the prediction is committed, for the same reason the SQL
  // console withholds its result: otherwise the answer is on the screen.
  $: revealed = stepIndex > 0 || correct;
  $: shown = revealed ? run.trace.slice(0, at) : [];
  $: current = shown.length ? shown[shown.length - 1] : null;
  $: names = current ? Object.keys(current.env).filter(k => !Array.isArray(current.env[k])) : [];
  $: activeNode = current?.node ?? null;

  const show = v => (v === null ? 'None' : typeof v === 'string' ? `"${v}"` : Array.isArray(v) ? `[${v.length} items]`
    : typeof v === 'object' ? '{…}' : String(v));

  function choose(value) {
    if (correct) return;
    selected = value;
    checked = true;
    correct = value === answerForTrace(c, step.key);
    if (correct && stepIndex === 0) at = 1;
  }

  function advance() {
    if (!correct) return;
    if (stepIndex < TRACE_STEPS.length - 1) stepIndex += 1;
    else { done = [...done, c.id]; caseIndex += 1; stepIndex = 0; at = 0; }
    selected = ''; checked = false; correct = false;
  }

  function restart() {
    caseIndex = 0; stepIndex = 0; selected = ''; checked = false; correct = false; done = []; at = 0;
  }
</script>

<svelte:head><title>Read the Program | Qubix University</title>
<meta name="description" content="Predict what a small Python program leaves in each name, then step through it." /></svelte:head>

<section class="mission-shell qx-shell">
  <header>
    <div class="identity">
      <span class="role">PY</span>
      <div><p>{M.id} · {M.status} · CHAPTER 06</p><h1>{M.title}</h1></div>
    </div>
    <nav aria-label="Mission navigation">
      <a href="?mode=game">Academy</a>
      <a href="?mode=game&mission=shared-book&chapter=6&session=1">Chapter 06</a>
      <a href="?mode=game&mission=sql-console">SQL console</a>
    </nav>
  </header>

  <div class="progress" aria-label={`Mission ${progress}% complete`}><span style={`width:${progress}%`}></span></div>

  <main>
    <section class="workbench-card">
      <div class="stage-heading">
        <div><p class="eyebrow">CORPORATE HQ · NOTEBOOK</p>
          <h2>{missionComplete ? 'Six programs read' : c.brief}</h2></div>
        <span>{missionComplete ? `${M.cases.length} / ${M.cases.length}` : `${caseIndex + 1} / ${M.cases.length}`}</span>
      </div>

      {#if missionComplete}
        <div class="completion">
          <span class="completion-mark">✓</span>
          <p class="eyebrow">COMPETENCY DEMONSTRATED</p>
          <h2>Six programs traced</h2>
          <p>{M.competency}</p>
          <ul>{#each M.cases as item}
            <li><b>{item.brief}</b><span>{optionsForTrace(item, 'answer').find(o => o[0] === item.answer)[1]}</span></li>
          {/each}</ul>
          <a class="next-mission" href="?mode=game">Back to the academy →</a>
          <button class="restart" on:click={restart}>Restart practice</button>
        </div>
      {:else}
        <p class="context">{c.note}</p>

        <div class="editor">
          <div class="bar"><span class="dot r"></span><span class="dot a"></span><span class="dot g"></span><b>notebook.py</b></div>
          <ol class="code">
            {#each lines as line, i}
              <li class:active={revealed && activeNode && line.node === activeNode}><span class="ln">{i + 1}</span><code>{line.text}</code></li>
            {/each}
          </ol>
          {#if Object.keys(c.data).length}
            <p class="given">given: {#each Object.entries(c.data) as [k, v], i}<code>{k} = {JSON.stringify(v)}</code>{i ? '' : ''}{/each}</p>
          {/if}
        </div>

        <div class="runner">
          {#if !revealed}
            <p class="hidden-note">Predict first. The trace is withheld so that a prediction is a prediction.</p>
          {:else}
            <div class="runner-head">
              <div class="controls">
                <button on:click={() => (at = Math.max(1, at - 1))} disabled={at <= 1}>← back</button>
                <button on:click={() => (at = Math.min(run.trace.length, at + 1))} disabled={at >= run.trace.length}>step →</button>
                <button class="ghost" on:click={() => (at = run.trace.length)} disabled={at >= run.trace.length}>run to end</button>
              </div>
              <span class="counter">step {at} of {run.trace.length}</span>
            </div>

            <div class="state">
              {#each names as n}
                <span class="cell"><b>{n}</b><em>{show(current.env[n])}</em></span>
              {/each}
              {#if !names.length}<span class="cell empty">nothing assigned yet</span>{/if}
            </div>

            <p class="said" class:err={run.error && at === run.trace.length}>{current ? current.label : ''}</p>

            {#if at === run.trace.length}
              {#if run.error}
                <p class="outcome err"><b>{run.error}</b>The program stopped on that line.</p>
              {:else}
                <p class="outcome"><b>Output: {run.output.join(', ') || 'nothing printed'}</b>{run.trace.length} lines executed.</p>
              {/if}
            {/if}
          {/if}
        </div>
      {/if}
    </section>

    {#if !missionComplete}
      <aside class="decision-card">
        <div class="steps" role="list">
          {#each TRACE_STEPS as s, i}<span role="listitem" class:on={i === stepIndex} class:past={i < stepIndex}>{s.label}</span>{/each}
        </div>
        <div class="theory"><p class="eyebrow">STEP {stepIndex + 1} OF {TRACE_STEPS.length}</p><h2>{step.question}</h2><p>{step.theory}</p></div>
        <div class="options">
          {#each options as [value, label, hint]}
            <button class:selected={selected === value} class:right={correct && selected === value}
              class:wrong={checked && !correct && selected === value}
              on:click={() => choose(value)} disabled={correct}><b>{label}</b><span>{hint}</span></button>
          {/each}
        </div>
        {#if checked}
          <div class:success={correct} class:retry={!correct} class="feedback" role="status">
            {#if correct}<b>Correct.</b> {whyForTrace(c, step.key)}
            {:else}<b>Not yet.</b> {stepIndex === 0 ? 'Follow it one line at a time, keeping track of what each name holds.' : 'The output is the symptom; name the rule underneath it.'}{/if}
          </div>
        {/if}
        {#if correct}
          <button class="continue" on:click={advance}>
            {stepIndex < TRACE_STEPS.length - 1 ? 'explain it' : (caseIndex === M.cases.length - 1 ? 'complete mission' : 'next program')} →
          </button>
        {/if}
      </aside>
    {/if}
  </main>

  <footer>
    <span>Source-informed learning draft · accessed 25 August 2026</span>
    <span>{#each M.sources as s, i}<a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>{i < M.sources.length - 1 ? ' · ' : ''}{/each}</span>
  </footer>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#171510}
  :global(body){position:static}

  .mission-shell{min-height:100vh;max-width:none;padding:18px clamp(12px,3vw,34px) 40px;color:#f2ede8;
                 background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%)}
  header{max-width:1320px;margin:0 auto 14px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
  .identity{display:flex;align-items:center;gap:12px}
  .role{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:#a5743b;color:#fff;font:900 14px var(--qx-font)}
  .identity p{margin:0 0 3px;color:#aea08f;font:800 12px var(--qx-font);letter-spacing:.1em}
  .identity h1{margin:0;color:#fff;font:700 26px Georgia,serif}
  nav{display:flex;gap:14px;flex-wrap:wrap}
  nav a,footer a{color:#e0ba8f;font:800 13px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}
  .progress{max-width:1320px;height:5px;margin:0 auto 16px;border-radius:8px;background:rgba(255,255,255,.1);overflow:hidden}
  .progress span{display:block;height:100%;background:#c08b4f;transition:width .35s ease}

  main{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(340px,.8fr);gap:16px;align-items:start}
  .workbench-card{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#211b15;overflow:hidden}
  .decision-card{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#f1ede4;color:#25231f;padding:clamp(18px,2.5vw,28px)}
  .stage-heading{min-height:76px;padding:15px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;background:#31281d}
  .stage-heading h2{margin:1px 0 0;font:700 22px Georgia,serif;color:#fff;text-wrap:balance}
  .stage-heading>span{display:grid;place-items:center;min-width:52px;height:34px;border-radius:20px;background:#16120d;color:#e0ba8f;font:900 13px var(--qx-font)}
  .eyebrow{margin:0 0 5px;color:#c99f6f;font:900 12px var(--qx-font);letter-spacing:.12em}
  .context{margin:0;padding:14px 18px;color:#aea08f;font:650 13.5px/1.5 var(--qx-font)}

  .editor{background:#16120d;border-block:1px solid rgba(255,255,255,.1)}
  .bar{padding:9px 14px;display:flex;align-items:center;gap:7px;border-bottom:1px solid rgba(255,255,255,.1)}
  .dot{width:10px;height:10px;border-radius:50%}.dot.r{background:#e05c4a}.dot.a{background:#dfa63a}.dot.g{background:#4fc08d}
  .bar b{margin-left:7px;color:#6f8794;font:800 12px ui-monospace,monospace}
  ol.code{list-style:none;margin:0;padding:12px 0;counter-reset:none}
  ol.code li{display:flex;gap:14px;padding:3px 18px;border-left:3px solid transparent}
  ol.code li.active{background:rgba(79,163,192,.16);border-left-color:#c08b4f}
  .ln{color:#685a4a;font:600 13px ui-monospace,monospace;min-width:14px;text-align:right}
  ol.code code{color:#eaddcf;font:600 14px/1.6 ui-monospace,"SF Mono",Menlo,Consolas,monospace;white-space:pre}
  .given{margin:0;padding:10px 18px 14px;border-top:1px solid rgba(255,255,255,.08);color:#6f8794;font:700 12.5px var(--qx-font)}
  .given code{color:#e0ba8f;font:600 12.5px ui-monospace,monospace}

  .runner{padding:14px 18px 18px}
  .runner-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px}
  .controls{display:flex;gap:8px;flex-wrap:wrap}
  .controls button{min-height:38px;padding:0 15px;border:1px solid rgba(255,255,255,.18);border-radius:9px;background:#31281d;color:#f2ede8;font:800 12.5px var(--qx-font);cursor:pointer}
  .controls button:hover:not(:disabled){border-color:#c08b4f}
  .controls button:disabled{opacity:.4;cursor:default}
  .controls .ghost{background:transparent}
  .counter{color:#6f8794;font:700 12.5px var(--qx-font);font-variant-numeric:tabular-nums}
  .state{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:11px}
  .cell{display:inline-flex;align-items:baseline;gap:8px;padding:8px 12px;border-radius:9px;background:#31281d;border:1px solid rgba(255,255,255,.1)}
  .cell b{color:#e0ba8f;font:800 12.5px ui-monospace,monospace}
  .cell em{color:#f2ede8;font:700 13px ui-monospace,monospace;font-style:normal}
  .cell.empty{color:#6f8794;font:650 12.5px var(--qx-font)}
  .said{margin:0;padding:10px 13px;border-radius:9px;background:#16120d;color:#9fd0b4;font:700 13px ui-monospace,monospace;overflow-wrap:anywhere}
  .said.err{color:#f0a99e}
  .outcome{margin:11px 0 0;padding:12px 14px;border-radius:10px;background:#163023;color:#9fd0b4;font:650 13px/1.5 var(--qx-font)}
  .outcome b{display:block;margin-bottom:3px;font:800 14px var(--qx-font)}
  .outcome.err{background:#3a1d1a;color:#f0a99e}
  .hidden-note{margin:0;padding:16px;border:1px dashed rgba(255,255,255,.18);border-radius:11px;color:#aea08f;font:650 13px/1.5 var(--qx-font)}

  .steps{display:flex;gap:6px;margin-bottom:15px;flex-wrap:wrap}
  .steps span{padding:5px 11px;border-radius:14px;background:#e6dfd0;color:#8a8172;font:900 11px var(--qx-font);letter-spacing:.06em}
  .steps span.past{background:#ece1d5;color:#7d592f}
  .steps span.on{background:#a5743b;color:#fff}
  .decision-card .eyebrow{color:#7d592f}
  .theory{padding-bottom:16px;border-bottom:1px solid #d8d0be}
  .theory h2,.completion h2{margin:0;font:700 23px Georgia,serif;text-wrap:balance}
  .theory>p:last-child,.completion>p{margin:8px 0 0;color:#625a49;font:600 13.5px/1.55 var(--qx-font)}
  .options{display:grid;gap:8px;margin-top:15px}
  .options button{padding:12px 14px;border:2px solid #ded6c6;border-radius:11px;background:#fff;color:#25231f;text-align:left;cursor:pointer;display:grid;gap:3px}
  .options button b{font:850 13.5px/1.35 ui-monospace,monospace}
  .options button span{color:#756c5c;font:650 12.5px/1.4 var(--qx-font)}
  .options button:hover,.options button.selected{border-color:#a5743b}
  .options button.right{border-color:#559535;background:#e7f0df}
  .options button.wrong{border-color:#b83a29;background:#f6ddd8}
  .options button:disabled{cursor:default}
  .options button:focus-visible,.continue:focus-visible,.restart:focus-visible,.next-mission:focus-visible,.controls button:focus-visible,a:focus-visible{outline:3px solid #c08b4f;outline-offset:2px}
  .feedback{margin-top:11px;padding:11px 13px;border-radius:10px;font:650 13px/1.5 var(--qx-font)}
  .feedback.success{background:#e7f0df;color:#3d6529}
  .feedback.retry{background:#f6ddd8;color:#912c1e}
  .continue,.restart,.next-mission{width:100%;min-height:46px;margin-top:11px;border:0;border-radius:11px;background:#a5743b;color:#fff;font:900 13.5px var(--qx-font);cursor:pointer}
  .next-mission{display:grid;place-items:center;box-sizing:border-box;background:#25231f;text-decoration:none}

  .completion{padding:24px 20px 28px;text-align:center;background:#f1ede4;color:#25231f}
  .completion-mark{display:grid;place-items:center;width:58px;height:58px;margin:0 auto 14px;border-radius:50%;background:#559535;color:#fff;font:900 26px var(--qx-font)}
  .completion ul{list-style:none;margin:20px 0 0;padding:0;border:1px solid #d8d0be;border-radius:11px;overflow:hidden;text-align:left}
  .completion li{padding:11px 13px;border-bottom:1px solid #ddd5c5;display:grid;gap:3px}
  .completion li:last-child{border-bottom:0}
  .completion li b{font:800 13px var(--qx-font)}
  .completion li span{color:#706856;font:650 12.5px var(--qx-font)}

  footer{max-width:1320px;margin:14px auto 0;display:flex;justify-content:space-between;gap:14px;color:#6f8794;font:650 12px/1.5 var(--qx-font);flex-wrap:wrap}

  @media(max-width:980px){main{grid-template-columns:1fr}}
  @media(max-width:600px){.mission-shell{padding:13px 10px 30px}.identity h1{font-size:20px}.decision-card{padding:16px}}
  @media(prefers-reduced-motion:reduce){.progress span{transition:none}}
</style>
