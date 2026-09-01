<script>
  // Chapter 06.03's game. The learner does not type code: they choose what the
  // function does with the one input that has no sensible answer, and then the
  // workshop runs their choice across the whole batch and shows the reported
  // figure move. Getting it wrong does not produce a red cross, it produces a
  // number — which is the point, because that is exactly how this mistake
  // survives in real work.
  //
  // The listing, the per-row results and the summary all come from one program
  // object executed by the chapter 06 runner, so the Python on screen cannot
  // disagree with the figures beside it.
  import { FUNCTION_WORKSHOP_MISSION as M, sourceFor, runBatch, truthFor }
    from '../lib/game/function-workshop-mission.js';
  import { recordCompletion } from '../lib/game/progress.js';
  import MissionMasthead from '../lib/components/game/MissionMasthead.svelte';

  let caseIndex = 0, selected = '', correct = false, done = [], tried = [];

  $: c = M.cases[caseIndex];
  $: missionComplete = done.length === M.cases.length;
  $: progress = Math.round((done.length / M.cases.length) * 100);
  $: if (missionComplete) recordCompletion('function-workshop');

  // The contract on screen is whichever one the learner is currently looking
  // at, so the code and the results always describe the same decision.
  $: shown = selected || c?.answer;
  $: lines = c ? sourceFor(c, shown) : [];
  $: result = c ? runBatch(c, shown) : null;
  $: truth = c ? truthFor(c) : null;
  $: showResults = Boolean(selected);

  const fmt = (v, unit) => (v === null || v === undefined ? 'None' : `${v}${unit}`);
  const labelOf = key => c.options.find(o => o[0] === key)?.[1] || '';

  function choose(key) {
    if (correct) return;
    selected = key;
    correct = key === c.answer;
    if (!tried.includes(key)) tried = [...tried, key];
  }

  function advance() {
    if (!correct) return;
    done = [...done, c.id];
    caseIndex += 1;
    selected = ''; correct = false; tried = [];
  }

  function restart() {
    caseIndex = 0; selected = ''; correct = false; done = []; tried = [];
  }
</script>

<svelte:head><title>The Function Workshop | Qubix University</title>
<meta name="description" content="Choose what a function does with a missing input, then watch the reported figure change." /></svelte:head>

<section class="mission-shell qx-shell">
  <MissionMasthead eyebrow={`${M.id} · DATA OFFICE ASSIGNMENT`} title={M.title}
    roomId="data-office" roomName="Data Office · Dual-monitor desk" progress={progress}
    meta={`${missionComplete ? M.cases.length : caseIndex + 1} OF ${M.cases.length} RULES · CHAPTER 06`} />

  <main>
    <section class="workbench-card m1-workarea">
      {#if missionComplete}
        <div class="completion">
          <span class="completion-mark">✓</span>
          <p class="eyebrow">COMPETENCY DEMONSTRATED</p>
          <h2>Three rules packaged</h2>
          <p>{M.competency}</p>
          <ul>{#each M.cases as item}
            <li><b>{item.brief}</b><span>{item.why[item.answer]}</span></li>
          {/each}</ul>
          <a class="next-mission" href="/floor/python">Back to the Python floor →</a>
          <button class="restart" on:click={restart}>Restart practice</button>
        </div>
      {:else}
        <div class="stage-heading">
          <div>
            <p class="eyebrow">STOCKROOM · WEEKLY REPORT</p>
            <h2>{c.brief}</h2>
          </div>
          <span>{caseIndex + 1} / {M.cases.length}</span>
        </div>

        <p class="context">{c.rule}</p>
        <p class="snag"><b>The snag.</b> {c.note}</p>

        <div class="editor">
          <div class="bar"><span class="dot r"></span><span class="dot a"></span><span class="dot g"></span>
            <b>report.py</b>
            {#if showResults}<em>{labelOf(shown)}</em>{/if}</div>
          <ol class="code">
            {#each lines as line, i}
              <li class:guard={line.text.trim().startsWith('if') || line.text.trim().startsWith('return None')
                || line.text.trim().startsWith('return 0') || line.text.trim().startsWith('raise')}>
                <span class="ln">{i + 1}</span><code>{line.text}</code>
              </li>
            {/each}
          </ol>
        </div>

        {#if !showResults}
          <p class="hidden-note">Choose a contract for the missing input. The batch runs on your choice, not before it.</p>
        {/if}
      {/if}
    </section>

    {#if !missionComplete && showResults}
      <section class="results-card m1-workarea">
          <div class="batch" aria-live="polite">
            <table>
              <caption>What the function gave back for each row</caption>
              <thead>
                <tr><th scope="col">Row</th><th scope="col">Input</th><th scope="col">Returned</th></tr>
              </thead>
              <tbody>
                {#each result.rows as row}
                  <tr class:absent={row.input === null || row.second === 0}>
                    <td>{row.label}</td>
                    <td class="mono">{row.input === null ? 'empty' : row.input}{#if row.second !== undefined}<span class="second">, {row.second}</span>{/if}</td>
                    <td class="mono out">{row.error ? '—' : fmt(row.out, '')}</td>
                  </tr>
                {/each}
              </tbody>
            </table>

            <div class="summary" class:wrong={shown !== c.answer && !result.error} class:stopped={Boolean(result.error)}>
              {#if result.error}
                <p class="figure">No figure at all</p>
                <p class="under">{result.error} — {result.note}</p>
              {:else}
                <p class="under">{c.summaryLabel}</p>
                <p class="figure">{fmt(result.summary, c.unit)}</p>
                <p class="under">over {result.count} of {c.batch.length} rows</p>
              {/if}
              {#if shown !== c.answer && !result.error}
                <p class="against">The honest figure is {fmt(truth.summary, c.unit)} over {truth.count} of {truth.of}.</p>
              {/if}
            </div>
          </div>

          <p class="verdict" class:right={correct}>
            <b>{correct ? 'That is the contract.' : labelOf(shown)}</b>
            {c.why[shown]}
          </p>
      </section>
    {/if}

    {#if !missionComplete}
      <aside class="decision-card">
        <p class="eyebrow">THE DECISION</p>
        <h3>What should <code>{c.fn}</code> do with it?</h3>
        <p class="ask">{c.note}</p>

        <div class="options" role="group" aria-label="Contract for the missing input">
          {#each c.options as [key, label, effect]}
            <button class="option"
                    class:picked={selected === key}
                    class:isright={correct && key === c.answer}
                    class:iswrong={selected === key && !correct}
                    aria-pressed={selected === key}
                    disabled={correct && key !== c.answer}
                    on:click={() => choose(key)}>
              <b>{label}</b>
              <span>{effect}</span>
            </button>
          {/each}
        </div>

        {#if selected && !correct}
          <p class="again">Look at the figure it produced, then choose again.</p>
        {/if}
        {#if correct}
          <button class="advance" on:click={advance}>
            {caseIndex === M.cases.length - 1 ? 'Finish the workshop →' : 'Next rule →'}
          </button>
        {/if}
      </aside>
    {/if}
  </main>
</section>

<style>
  /* The whole mission is "change the contract, watch the figure move", so the
     buttons and the figure have to be on screen together. Stacked, a learner
     picks a contract and then scrolls up to find out what it did, which breaks
     the only feedback loop this mission has. */
  main { display: grid; gap: 20px; align-items: start; }
  @media (min-width: 1040px) {
    main {
      grid-template-columns: minmax(0, 1fr) 296px;
      grid-template-areas: 'rule decide' 'results decide';
    }
    .workbench-card { grid-area: rule; }
    .decision-card { grid-area: decide; position: sticky; top: 16px; }
    .results-card { grid-area: results; }
  }
  /* On a phone the three stack in the order the learner works in: read the
     rule, choose the contract, see what it did. Ordering it any other way
     means tapping a button and then scrolling back up to find the consequence,
     which is the one thing this mission cannot afford to make hard. */
  @media (max-width: 1039px) {
    .workbench-card { order: 1; }
    .decision-card { order: 2; }
    .results-card { order: 3; }
  }
  .results-card { padding: 20px; background: #f7f3e9; }

  .context { margin: 0 0 10px; }
  .snag { margin: 0 0 18px; padding: 11px 14px; border-left: 3px solid var(--qx-clay, #a85a34);
          background: rgba(168, 90, 52, .07); font-size: 14px; }
  .snag b { font-weight: 800; }

  .editor { border: 1px solid #d8d0be; border-radius: 12px; overflow: hidden; background: #fffdf7; }
  .bar { display: flex; align-items: center; gap: 7px; padding: 8px 12px;
         background: #ece6d9; border-bottom: 1px solid #d8d0be; }
  .bar b { font: 700 12px var(--qx-font, system-ui); }
  .bar em { margin-left: auto; font: 600 11.5px var(--qx-font, system-ui); font-style: normal; color: #6f675a; }
  .dot { width: 9px; height: 9px; border-radius: 50%; }
  .dot.r { background: #d2604a; } .dot.a { background: #d9a441; } .dot.g { background: #5f9e46; }

  .code { list-style: none; margin: 0; padding: 12px 0; display: grid; }
  .code li { display: grid; grid-template-columns: 34px 1fr; gap: 10px; padding: 2px 12px; }
  .code li.guard { background: rgba(168, 90, 52, .08); }
  .ln { color: #a99d88; font: 500 12px ui-monospace, Consolas, monospace; text-align: right; }
  .code code { font: 500 13.5px/1.55 ui-monospace, Consolas, monospace; white-space: pre; }

  .hidden-note { margin: 16px 0 0; color: #6f675a; font-size: 13.5px; }

  .batch { display: grid; gap: 14px; margin-top: 18px; }
  @media (min-width: 780px) { .batch { grid-template-columns: minmax(0, 1fr) 240px; align-items: start; } }
  .batch table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  .batch caption { text-align: left; padding-bottom: 7px; color: #6f675a;
                   font: 700 11px var(--qx-font, system-ui); letter-spacing: .09em; text-transform: uppercase; }
  .batch th { text-align: left; padding: 6px 10px 6px 0; border-bottom: 1px solid #241f16;
              font: 700 11px var(--qx-font, system-ui); letter-spacing: .07em; text-transform: uppercase; }
  .batch td { padding: 7px 10px 7px 0; border-bottom: 1px solid #e5dfd2; }
  .batch tr.absent td { background: rgba(168, 90, 52, .07); }
  .mono { font: 500 13px ui-monospace, Consolas, monospace; font-variant-numeric: tabular-nums; }
  .mono .second { color: #8b8272; }
  .out { font-weight: 700; }

  .summary { padding: 15px; border: 1px solid #d8d0be; border-radius: 12px; background: #fffdf7; }
  .summary.wrong { border-color: #b3402e; background: rgba(179, 64, 46, .06); }
  .summary.stopped { border-color: #a99d88; background: #f2efe7; }
  .figure { margin: 3px 0; font: 800 27px var(--qx-font, system-ui); font-variant-numeric: tabular-nums; }
  .under { margin: 0; color: #6f675a; font-size: 12.5px; }
  .against { margin: 10px 0 0; padding-top: 9px; border-top: 1px solid #ddd5c4;
             color: #b3402e; font: 700 12.5px var(--qx-font, system-ui); }

  .verdict { margin: 16px 0 0; padding: 13px 15px; border-radius: 11px;
             background: #f2efe7; font-size: 13.5px; line-height: 1.6; }
  .verdict.right { background: rgba(62, 158, 42, .1); }
  .verdict b { display: block; font-weight: 800; margin-bottom: 3px; }

  .decision-card h3 { margin: 6px 0 4px; font: 800 17px var(--qx-font, system-ui); }
  .decision-card h3 code { font: 700 15px ui-monospace, Consolas, monospace; }
  .ask { margin: 0 0 14px; color: #6f675a; font-size: 13px; }

  .options { display: grid; gap: 9px; }
  .option { display: grid; gap: 3px; padding: 13px 15px; text-align: left; cursor: pointer;
            border: 1px solid #d8d0be; border-radius: 12px; background: #fffdf7; color: #241f16; }
  .option:hover:not(:disabled) { border-color: #241f16; }
  .option:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }
  .option b { font: 800 14px var(--qx-font, system-ui); }
  .option span { color: #6f675a; font-size: 12.5px; line-height: 1.45; }
  .option.picked { border-width: 2px; }
  .option.isright { border-color: #3e9e2a; background: rgba(62, 158, 42, .1); }
  .option.iswrong { border-color: #b3402e; background: rgba(179, 64, 46, .07); }
  .option:disabled { opacity: .5; cursor: default; }

  .again { margin: 12px 0 0; color: #b3402e; font: 700 12.5px var(--qx-font, system-ui); }
  .advance { width: 100%; margin-top: 14px; min-height: 46px; border: 0; border-radius: 999px;
             background: #241f16; color: #f7f3e9; cursor: pointer;
             font: 800 14px var(--qx-font, system-ui); }
  .advance:hover { background: #3c342a; }
  .advance:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }

  @media (prefers-reduced-motion: reduce) { .option { transition: none; } }
</style>
