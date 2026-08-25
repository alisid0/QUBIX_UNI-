<script>
  // Chapter 02's game. Every bar is drawn from readingsFor(), the same function
  // check-rates verifies the prose against, so the chart and the sentence beside
  // it cannot disagree.
  //
  // The comparison cases draw twice: the raw counts, then the same data over its
  // denominator. Watching the taller bar change sides is the whole lesson, and it
  // lands harder than reading that it would.
  import { RATE_DESK_MISSION as M, DESK_STEPS, readingsFor, round,
    answerForRate, optionsForRate, whyForRate } from '../lib/game/rate-desk-mission.js';
  import { recordCompletion } from '../lib/game/progress.js';

  let caseIndex = 0, stepIndex = 0, selected = '', checked = false, correct = false, done = [];

  $: c = M.cases[caseIndex];
  $: step = DESK_STEPS[stepIndex];
  $: options = c ? optionsForRate(c, step.key) : [];
  $: r = c ? readingsFor(c) : null;
  $: missionComplete = done.length === M.cases.length;
  $: progress = Math.round(((done.length * DESK_STEPS.length + stepIndex + (correct ? 1 : 0)) / (M.cases.length * DESK_STEPS.length)) * 100);
  $: if (missionComplete) recordCompletion('rate-desk');

  // The divided figure is withheld until the denominator has been named, because
  // naming it is the step people skip and the one this mission is about.
  $: divided = stepIndex > 0 || (correct && stepIndex === 0);

  const fmt = v => (v === null || v === undefined ? '—'
    : Number.isInteger(v) ? String(v) : String(round(v, 2)));
  const money = v => `£${v.toFixed(2)}`;

  // Bars are scaled inside their own group, so raw counts and rates each use the
  // full width. Comparing bar lengths across the two groups would be meaningless.
  const widths = vals => { const m = Math.max(...vals.map(Math.abs), 1); return vals.map(v => (Math.abs(v) / m) * 100); };

  function choose(value) {
    if (correct) return;
    selected = value;
    checked = true;
    correct = value === answerForRate(c, step.key);
  }

  function advance() {
    if (!correct) return;
    if (stepIndex < DESK_STEPS.length - 1) stepIndex += 1;
    else { done = [...done, c.id]; caseIndex += 1; stepIndex = 0; }
    selected = ''; checked = false; correct = false;
  }

  function restart() { caseIndex = 0; stepIndex = 0; selected = ''; checked = false; correct = false; done = []; }
</script>

<svelte:head><title>The Rate Desk | Qubix University</title>
<meta name="description" content="Name the denominator under a figure, compute the comparison it allows, and state only the claim it supports." /></svelte:head>

<section class="mission-shell qx-shell">
  <header>
    <div class="identity">
      <span class="role">%</span>
      <div><p>{M.id} · {M.status} · CHAPTER 02</p><h1>{M.title}</h1></div>
    </div>
    <nav aria-label="Mission navigation">
      <a href="?mode=game">Academy</a>
      <a href="?mode=game&mission=shared-book&chapter=2&session=2">Chapter 02</a>
      <a href="?mode=game&mission=units-measurement">Units and measurement</a>
    </nav>
  </header>

  <div class="progress" aria-label={`Mission ${progress}% complete`}><span style={`width:${progress}%`}></span></div>

  <main>
    <section class="workbench-card">
      <div class="stage-heading">
        <div><p class="eyebrow">CORPORATE HQ · REPORTING</p>
          <h2>{missionComplete ? 'Six figures put over their denominators' : c.asked}</h2></div>
        <span>{missionComplete ? `${M.cases.length} / ${M.cases.length}` : `${caseIndex + 1} / ${M.cases.length}`}</span>
      </div>

      {#if missionComplete}
        <div class="completion">
          <span class="completion-mark">✓</span>
          <p class="eyebrow">COMPETENCY DEMONSTRATED</p>
          <h2>Six figures, six denominators</h2>
          <p>{M.competency}</p>
          <ul>{#each M.cases as item}
            <li><b>{item.asked}</b><span>{optionsForRate(item, 'claim').find(o => o[0] === item.claim)[1]}</span></li>
          {/each}</ul>
          <a class="next-mission" href="?mode=game">Back to the academy →</a>
          <button class="restart" on:click={restart}>Restart practice</button>
        </div>
      {:else}
        <p class="context">{c.note}</p>

        <div class="desk">
          {#if r.kind === 'compare'}
            <div class="panel">
              <p class="panel-label">AS COUNTED</p>
              {#each r.rows as row, i}
                <div class="bar-row">
                  <b>{row.label}</b>
                  <i><em class="raw" style={`width:${widths(r.rows.map(x => x.numerator))[i]}%`}></em></i>
                  <span>{fmt(row.numerator)} {c.unit}</span>
                </div>
              {/each}
              <p class="foot">Different sizes underneath, so these cannot be compared yet.</p>
            </div>

            <div class="panel" class:hidden={!divided}>
              <p class="panel-label">{divided ? `OVER ${c.groups[0] ? 'ITS DENOMINATOR' : ''}`.trim() : 'OVER ITS DENOMINATOR'}</p>
              {#if divided}
                {#each r.rows as row, i}
                  <div class="bar-row">
                    <b>{row.label}</b>
                    <i><em class="rate" style={`width:${widths(r.rows.map(x => x.value))[i]}%`}></em></i>
                    <span>{fmt(row.value)}{c.asPercent ? '%' : ''}</span>
                  </div>
                  <p class="working">{row.numerator.toLocaleString()} / {row.denominator.toLocaleString()}{c.per && c.per !== 1 ? ` × ${c.per.toLocaleString()}` : ''}{c.asPercent ? ' × 100' : ''}</p>
                {/each}
                {#if r.whole}
                  <div class="whole">
                    <span><b>All together</b><em>{fmt(r.whole.value)}%</em></span>
                    <span class="naive"><b>Mean of the two rates</b><em>{fmt(r.whole.naive)}%</em></span>
                  </div>
                {/if}
                <p class="foot">{c.perLabel || 'A share of the population each came from'}.</p>
              {:else}
                <p class="withheld">Name the denominator first.</p>
              {/if}
            </div>

          {:else if r.kind === 'sequence'}
            <div class="panel wide">
              <p class="panel-label">THE PRICE, STEP BY STEP</p>
              <ol class="steps">
                {#each r.steps as s, i}
                  <li class:last={i === r.steps.length - 1}>
                    <span class="s-label">{s.label}</span>
                    <b>{money(s.value)}</b>
                    {#if i > 0}<em>{s.value > r.steps[i - 1].value ? '+' : '−'}{money(Math.abs(s.value - r.steps[i - 1].value)).slice(1)}</em>{/if}
                  </li>
                {/each}
              </ol>
              {#if divided}
                <p class="foot">Started at {money(c.start)}, ended at {money(r.end)}: {fmt(r.net)}% against where it began.</p>
              {:else}
                <p class="withheld">Each change is a percentage of something. Say what, first.</p>
              {/if}
            </div>

          {:else}
            <div class="panel wide">
              <p class="panel-label">MEASURED TWICE</p>
              <div class="two-up">
                <span><b>Before</b><em>{fmt(r.from)}{c.isShare ? '%' : ` ${c.unit}`}</em></span>
                <span><b>After</b><em>{fmt(r.to)}{c.isShare ? '%' : ` ${c.unit}`}</em></span>
              </div>
              {#if divided}
                <dl class="readings">
                  {#if c.isShare}
                    <div><dt>Percentage points</dt><dd>{fmt(r.points)} points</dd></div>
                  {:else}
                    <div><dt>Absolute change</dt><dd>{fmt(r.absolute)} {c.unit}</dd></div>
                  {/if}
                  <div><dt>Relative change</dt><dd>{fmt(r.relative)}%</dd></div>
                </dl>
                <p class="foot">Two readings of one movement. Both are true and they are not interchangeable.</p>
              {:else}
                <p class="withheld">There is more than one reading here. Say what the change is measured against.</p>
              {/if}
            </div>
          {/if}
        </div>
      {/if}
    </section>

    {#if !missionComplete}
      <aside class="decision-card">
        <div class="steps-rail" role="list">
          {#each DESK_STEPS as s, i}<span role="listitem" class:on={i === stepIndex} class:past={i < stepIndex}>{s.label}</span>{/each}
        </div>
        <div class="theory"><p class="eyebrow">STEP {stepIndex + 1} OF {DESK_STEPS.length}</p><h2>{step.question}</h2><p>{step.theory}</p></div>
        <div class="options">
          {#each options as [value, label, hint]}
            <button class:selected={selected === value} class:right={correct && selected === value}
              class:wrong={checked && !correct && selected === value}
              on:click={() => choose(value)} disabled={correct}><b>{label}</b><span>{hint}</span></button>
          {/each}
        </div>
        {#if checked}
          <div class:success={correct} class:retry={!correct} class="feedback" role="status">
            {#if correct}<b>Correct.</b> {whyForRate(c, step.key)}
            {:else}<b>Not yet.</b> {stepIndex === 0 ? 'Ask what population the number was drawn out of.' : stepIndex === 1 ? 'Do the division, and check it against the panel.' : 'Read each sentence as somebody who saw only that sentence.'}{/if}
          </div>
        {/if}
        {#if correct}
          <button class="continue" on:click={advance}>
            {stepIndex < DESK_STEPS.length - 1 ? DESK_STEPS[stepIndex + 1].label.toLowerCase() : (caseIndex === M.cases.length - 1 ? 'complete mission' : 'next figure')} →
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
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#0f1216}
  :global(body){position:static}

  .mission-shell{min-height:100vh;max-width:none;padding:18px clamp(12px,3vw,34px) 40px;color:#e8eef2;
                 background:radial-gradient(circle at 42% 0,#26232f,#0f1216 58%)}
  header{max-width:1320px;margin:0 auto 14px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
  .identity{display:flex;align-items:center;gap:12px}
  .role{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:#8b5e9b;color:#fff;font:900 20px var(--qx-font)}
  .identity p{margin:0 0 3px;color:#a396ad;font:800 12px var(--qx-font);letter-spacing:.1em}
  .identity h1{margin:0;color:#fff;font:700 26px Georgia,serif}
  nav{display:flex;gap:14px;flex-wrap:wrap}
  nav a,footer a{color:#c3a8cd;font:800 13px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}
  .progress{max-width:1320px;height:5px;margin:0 auto 16px;border-radius:8px;background:rgba(255,255,255,.1);overflow:hidden}
  .progress span{display:block;height:100%;background:#a06fb4;transition:width .35s ease}

  main{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(340px,.8fr);gap:16px;align-items:start}
  .workbench-card{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#191722;overflow:hidden}
  .decision-card{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#f1ede4;color:#25231f;padding:clamp(18px,2.5vw,28px)}
  .stage-heading{min-height:76px;padding:15px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;background:#26232f}
  .stage-heading h2{margin:1px 0 0;font:700 21px Georgia,serif;color:#fff;text-wrap:balance}
  .stage-heading>span{display:grid;place-items:center;min-width:52px;height:34px;border-radius:20px;background:#12101a;color:#c3a8cd;font:900 13px var(--qx-font)}
  .eyebrow{margin:0 0 5px;color:#a983bb;font:900 12px var(--qx-font);letter-spacing:.12em}
  .context{margin:0;padding:14px 18px;color:#a396ad;font:650 13.5px/1.5 var(--qx-font)}

  .desk{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:0 18px 18px}
  .panel{padding:15px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:#12101a}
  .panel.wide{grid-column:1 / -1}
  .panel-label{margin:0 0 12px;color:#a983bb;font:900 11px var(--qx-font);letter-spacing:.12em}
  .panel.hidden{opacity:.55}
  .withheld{margin:0;color:#8a7f93;font:650 12.5px/1.5 var(--qx-font)}

  .bar-row{display:grid;grid-template-columns:88px 1fr auto;align-items:center;gap:10px;margin-bottom:7px}
  .bar-row b{color:#e8eef2;font:800 12.5px var(--qx-font);overflow-wrap:anywhere}
  .bar-row i{display:block;height:16px;border-radius:4px;background:rgba(255,255,255,.07)}
  .bar-row em{display:block;height:100%;border-radius:4px}
  .bar-row .raw{background:#5c5470}
  .bar-row .rate{background:#a06fb4}
  .bar-row span{color:#e8eef2;font:800 12.5px var(--qx-font);font-variant-numeric:tabular-nums;white-space:nowrap}
  .working{margin:0 0 11px 98px;color:#8a7f93;font:600 11.5px ui-monospace,monospace}
  .foot{margin:11px 0 0;color:#8a7f93;font:650 12px/1.5 var(--qx-font)}

  .whole{display:grid;gap:7px;margin-top:12px;padding-top:11px;border-top:1px solid rgba(255,255,255,.1)}
  .whole span{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
  .whole b{color:#e8eef2;font:800 12.5px var(--qx-font)}
  .whole em{color:#9fd0b4;font:800 15px var(--qx-font);font-style:normal;font-variant-numeric:tabular-nums}
  .whole .naive em{color:#f0a99e}
  .whole .naive b{color:#8a7f93}

  .steps{list-style:none;display:flex;align-items:flex-end;gap:10px;margin:0;padding:0;flex-wrap:wrap}
  .steps li{flex:1;min-width:96px;padding:12px;border-radius:9px;background:#191722;border:1px solid rgba(255,255,255,.1)}
  .steps li.last{border-color:#a06fb4}
  .s-label{display:block;color:#a983bb;font:800 11px var(--qx-font);letter-spacing:.08em}
  .steps b{display:block;margin-top:6px;color:#fff;font:800 19px var(--qx-font);font-variant-numeric:tabular-nums}
  .steps em{display:block;margin-top:3px;color:#8a7f93;font:700 12px var(--qx-font);font-style:normal}

  .two-up{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
  .two-up span{display:block;padding:12px;border-radius:9px;background:#191722;border:1px solid rgba(255,255,255,.1)}
  .two-up b{display:block;color:#a983bb;font:800 11px var(--qx-font);letter-spacing:.08em}
  .two-up em{display:block;margin-top:5px;color:#fff;font:800 22px var(--qx-font);font-style:normal;font-variant-numeric:tabular-nums}
  .readings{display:grid;gap:8px;margin:13px 0 0}
  .readings div{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:10px 12px;border-radius:8px;background:#191722}
  .readings dt{color:#a396ad;font:700 12.5px var(--qx-font)}
  .readings dd{margin:0;color:#fff;font:800 14px var(--qx-font);font-variant-numeric:tabular-nums}

  .steps-rail{display:flex;gap:6px;margin-bottom:15px;flex-wrap:wrap}
  .steps-rail span{padding:5px 11px;border-radius:14px;background:#e6dfd0;color:#8a8172;font:900 11px var(--qx-font);letter-spacing:.06em}
  .steps-rail span.past{background:#e5dcea;color:#6b4a79}
  .steps-rail span.on{background:#7d5490;color:#fff}
  .decision-card .eyebrow{color:#6b4a79}
  .theory{padding-bottom:16px;border-bottom:1px solid #d8d0be}
  .theory h2,.completion h2{margin:0;font:700 23px Georgia,serif;text-wrap:balance}
  .theory>p:last-child,.completion>p{margin:8px 0 0;color:#625a49;font:600 13.5px/1.55 var(--qx-font)}
  .options{display:grid;gap:8px;margin-top:15px}
  .options button{padding:12px 14px;border:2px solid #ded6c6;border-radius:11px;background:#fff;color:#25231f;text-align:left;cursor:pointer;display:grid;gap:3px}
  .options button b{font:850 13.5px/1.35 var(--qx-font)}
  .options button span{color:#756c5c;font:650 12.5px/1.4 var(--qx-font)}
  .options button:hover,.options button.selected{border-color:#7d5490}
  .options button.right{border-color:#559535;background:#e7f0df}
  .options button.wrong{border-color:#b83a29;background:#f6ddd8}
  .options button:disabled{cursor:default}
  .options button:focus-visible,.continue:focus-visible,.restart:focus-visible,.next-mission:focus-visible,a:focus-visible{outline:3px solid #a06fb4;outline-offset:2px}
  .feedback{margin-top:11px;padding:11px 13px;border-radius:10px;font:650 13px/1.5 var(--qx-font)}
  .feedback.success{background:#e7f0df;color:#3d6529}
  .feedback.retry{background:#f6ddd8;color:#912c1e}
  .continue,.restart,.next-mission{width:100%;min-height:46px;margin-top:11px;border:0;border-radius:11px;background:#7d5490;color:#fff;font:900 13.5px var(--qx-font);cursor:pointer}
  .next-mission{display:grid;place-items:center;box-sizing:border-box;background:#25231f;text-decoration:none}

  .completion{padding:24px 20px 28px;text-align:center;background:#f1ede4;color:#25231f}
  .completion-mark{display:grid;place-items:center;width:58px;height:58px;margin:0 auto 14px;border-radius:50%;background:#559535;color:#fff;font:900 26px var(--qx-font)}
  .completion ul{list-style:none;margin:20px 0 0;padding:0;border:1px solid #d8d0be;border-radius:11px;overflow:hidden;text-align:left}
  .completion li{padding:11px 13px;border-bottom:1px solid #ddd5c5;display:grid;gap:3px}
  .completion li:last-child{border-bottom:0}
  .completion li b{font:800 13px var(--qx-font)}
  .completion li span{color:#706856;font:650 12.5px var(--qx-font)}

  footer{max-width:1320px;margin:14px auto 0;display:flex;justify-content:space-between;gap:14px;color:#8a7f93;font:650 12px/1.5 var(--qx-font);flex-wrap:wrap}

  @media(max-width:980px){main{grid-template-columns:1fr}}
  @media(max-width:620px){.desk{grid-template-columns:1fr}.two-up{grid-template-columns:1fr}}
  @media(max-width:600px){.mission-shell{padding:13px 10px 30px}.identity h1{font-size:20px}.decision-card{padding:16px}}
  @media(prefers-reduced-motion:reduce){.progress span{transition:none}}
</style>
