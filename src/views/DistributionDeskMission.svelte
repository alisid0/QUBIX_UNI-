<script>
  // Chapter 04's game. The histogram is computed SVG drawn from the case's own
  // values at whichever bin width the learner picks, so "try more than one
  // width" is something they do rather than something they read. Every figure
  // in the panel comes from the same functions that draw the bars.
  import { DISTRIBUTION_DESK_MISSION as M, DESK_STEPS, histogram, summarise,
    answerForShape, optionsForShape, whyForShape } from '../lib/game/distribution-desk-mission.js';
  import { recordCompletion } from '../lib/game/progress.js';
  import MissionMasthead from '../lib/components/game/MissionMasthead.svelte';

  let caseIndex = 0, stepIndex = 0, selected = '', checked = false, correct = false, done = [];
  let width = null;

  $: c = M.cases[caseIndex];
  $: step = DESK_STEPS[stepIndex];
  $: options = c ? optionsForShape(c, step.key) : [];
  $: missionComplete = done.length === M.cases.length;
  $: progress = Math.round(((done.length * DESK_STEPS.length + stepIndex + (correct ? 1 : 0)) / (M.cases.length * DESK_STEPS.length)) * 100);
  // Remembered, so the hub knows and closing the tab does not undo it.
  $: if (missionComplete) recordCompletion('distribution-desk');

  $: binWidth = width ?? c?.width;
  $: bins = c ? histogram(c.values, binWidth) : [];
  $: stats = c ? summarise(c.values) : null;
  $: tallest = Math.max(1, ...bins.map(b => b.count));

  const W = 560, H = 210, PAD = { l: 34, r: 12, t: 12, b: 30 };
  $: iw = W - PAD.l - PAD.r;
  $: ih = H - PAD.t - PAD.b;
  $: bw = iw / (bins.length || 1);
  // Marks are placed on the same value axis the bars use.
  $: lo = bins.length ? bins[0].start : 0;
  $: hi = bins.length ? bins[bins.length - 1].end : 1;
  $: xOf = v => PAD.l + ((v - lo) / (hi - lo || 1)) * iw;
  $: fmt = v => (Number.isInteger(v) ? v : Math.round(v * 10) / 10);
  // £ is a prefix; g, min and " shoppers" are suffixes.
  $: money = c?.unit === '£';
  $: show = v => (money ? `£${fmt(v)}` : `${fmt(v)}${c?.unit ?? ''}`);

  function choose(value) {
    if (correct) return;
    selected = value;
    checked = true;
    correct = value === answerForShape(c, step.key);
  }

  function advance() {
    if (!correct) return;
    if (stepIndex < DESK_STEPS.length - 1) stepIndex += 1;
    else { done = [...done, c.id]; caseIndex += 1; stepIndex = 0; width = null; }
    selected = ''; checked = false; correct = false;
  }

  function restart() {
    caseIndex = 0; stepIndex = 0; selected = ''; checked = false; correct = false; done = []; width = null;
  }
</script>

<svelte:head><title>The Distribution Desk | Qubix University</title>
<meta name="description" content="Look at the shape of a set of values before summarising it." /></svelte:head>

<section class="mission-shell qx-shell">
  <MissionMasthead eyebrow={`${M.id} · REPORTING ASSIGNMENT`} title={M.title}
    roomId="reporting" roomName="Reporting · Collation table" progress={progress}
    meta={`${missionComplete ? M.cases.length : caseIndex + 1} OF ${M.cases.length} DISTRIBUTIONS · CHAPTER 04`} />

  <main>
    <section class="workbench-card m1-workarea">
      <div class="stage-heading">
        <div><p class="eyebrow">CORPORATE HQ · DISTRIBUTION DESK</p>
          <h2>{missionComplete ? 'Six distributions read' : c.asked}</h2></div>
        <span>{missionComplete ? `${M.cases.length} / ${M.cases.length}` : `${caseIndex + 1} / ${M.cases.length}`}</span>
      </div>

      {#if missionComplete}
        <div class="completion">
          <span class="completion-mark">✓</span>
          <p class="eyebrow">COMPETENCY DEMONSTRATED</p>
          <h2>Six shapes read before summarising</h2>
          <p>{M.competency}</p>
          <ul>{#each M.cases as item}
            <li><b>{item.asked}</b><span>{optionsForShape(item, 'shape').find(o => o[0] === item.shape)[1]}</span></li>
          {/each}</ul>
          <a class="next-mission" href="?mode=game">Back to the academy →</a>
          <button class="restart" on:click={restart}>Restart practice</button>
        </div>
      {:else}
        <p class="context">{c.note} <b>{stats.n} values.</b></p>

        <figure class="chart">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" width="100%"
            aria-label={`Histogram of ${stats.n} values in bins of ${binWidth}, from ${fmt(lo)} to ${fmt(hi)}, tallest bin holding ${tallest}`}>
            <rect width={W} height={H} fill="#fbf8f1"/>
            {#each bins as b, i}
              <rect x={PAD.l + i * bw + 1} y={PAD.t + ih - (b.count / tallest) * ih}
                width={Math.max(1, bw - 2)} height={(b.count / tallest) * ih} fill="#5f7355"/>
            {/each}
            <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + ih} y2={PAD.t + ih} stroke="#241f16" stroke-width="1.4"/>
            <!-- Mean and median on the value axis, so the gap between them is
                 something to look at rather than a pair of numbers to compare. -->
            <line x1={xOf(stats.median)} x2={xOf(stats.median)} y1={PAD.t} y2={PAD.t + ih} stroke="#2f6b55" stroke-width="2"/>
            <line x1={xOf(stats.mean)} x2={xOf(stats.mean)} y1={PAD.t} y2={PAD.t + ih} stroke="#a85a34" stroke-width="2" stroke-dasharray="5 4"/>
            <text x="4" y={PAD.t + 9} font-size="11" fill="#756c5c">{tallest}</text>
            <text x="4" y={PAD.t + ih} font-size="11" fill="#756c5c">0</text>
            <text x={PAD.l} y={H - 10} font-size="11" fill="#625a49">{show(lo)}</text>
            <text x={W - PAD.r} y={H - 10} font-size="11" text-anchor="end" fill="#625a49">{show(hi)}</text>
          </svg>
          <figcaption>
            <span class="key"><i class="dash"></i>mean {show(stats.mean)}</span>
            <span class="key"><i class="solid"></i>median {show(stats.median)}</span>
            <span class="key plain">middle half {show(stats.q1)} to {show(stats.q3)}</span>
          </figcaption>
        </figure>

        <div class="widths">
          <span>BIN WIDTH</span>
          {#each c.widths as w}
            <button class:on={binWidth === w} on:click={() => (width = w)}
              aria-pressed={binWidth === w}>{money ? `£${w}` : `${w}${c.unit}`}</button>
          {/each}
          <em>{bins.length} bins</em>
        </div>

        <details class="values">
          <summary>The {stats.n} values, sorted</summary>
          <p>{[...c.values].sort((a, b) => a - b).join(' · ')}</p>
        </details>
      {/if}
    </section>

    {#if !missionComplete}
      <aside class="decision-card">
        <div class="steps" role="list">
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
            {#if correct}<b>Correct.</b> {whyForShape(c, step.key)}
            {:else}<b>Not yet.</b> {stepIndex === 0 ? 'Try the other bin widths before deciding.' : 'Look at the gap between the mean and the median.'}{/if}
          </div>
        {/if}
        {#if correct}
          <button class="continue" on:click={advance}>
            {stepIndex < DESK_STEPS.length - 1 ? DESK_STEPS[stepIndex + 1].label.toLowerCase() : (caseIndex === M.cases.length - 1 ? 'complete mission' : 'next distribution')} →
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

  .mission-shell{min-height:100vh;max-width:none;padding:18px clamp(12px,3vw,34px) 40px;color:#f1ede4;
                 background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%)}
  header{max-width:1320px;margin:0 auto 14px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
  .identity{display:flex;align-items:center;gap:12px}
  .role{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:#5f7355;color:#fff;font:900 12px var(--qx-font)}
  .identity p{margin:0 0 3px;color:#bcb19e;font:800 12px var(--qx-font);letter-spacing:.1em}
  .identity h1{margin:0;color:#fff;font:700 26px Georgia,serif}
  nav{display:flex;gap:14px;flex-wrap:wrap}
  nav a,footer a{color:#c3d6b6;font:800 13px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}
  .progress{max-width:1320px;height:5px;margin:0 auto 16px;border-radius:8px;background:rgba(255,255,255,.1);overflow:hidden}
  .progress span{display:block;height:100%;background:#8fc978;transition:width .35s ease}

  main{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(340px,.8fr);gap:16px;align-items:start}
  .workbench-card,.decision-card{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#f1ede4;color:#25231f;overflow:hidden}
  .stage-heading{min-height:76px;padding:15px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px}
  .stage-heading h2{margin:1px 0 0;font:700 22px Georgia,serif;text-wrap:balance}
  .stage-heading>span{display:grid;place-items:center;min-width:52px;height:34px;border-radius:20px;background:#25231f;color:#fff;font:900 13px var(--qx-font)}
  .eyebrow{margin:0 0 5px;color:#4a6b3c;font:900 12px var(--qx-font);letter-spacing:.12em}
  .context{margin:0;padding:0 18px 14px;color:#5e574a;font:650 14px/1.5 var(--qx-font)}
  .context b{color:#25231f}

  .chart{margin:0;padding:0 18px}
  .chart svg{display:block;border-radius:11px;border:1px solid #cfc6b5}
  figcaption{margin-top:10px;display:flex;gap:16px;flex-wrap:wrap}
  .key{display:inline-flex;align-items:center;gap:7px;color:#5e574a;font:700 12.5px var(--qx-font)}
  .key i{width:18px;height:0;border-top:2px solid #2f6b55}
  .key i.dash{border-top-style:dashed;border-color:#a85a34}
  .key.plain{color:#7a7160}

  .widths{padding:14px 18px 4px;display:flex;align-items:center;gap:9px;flex-wrap:wrap}
  .widths>span{color:#7a7160;font:900 11px var(--qx-font);letter-spacing:.1em}
  .widths button{min-height:36px;padding:0 15px;border:2px solid #ded6c6;border-radius:9px;background:#fff;color:#25231f;font:800 13px var(--qx-font);cursor:pointer}
  .widths button.on{border-color:#5f7355;background:#e7f0df}
  .widths em{color:#7a7160;font:700 12.5px var(--qx-font);font-style:normal}

  .values{padding:12px 18px 18px}
  .values summary{color:#5e574a;font:700 13px var(--qx-font);cursor:pointer;min-height:24px}
  .values p{margin:10px 0 0;padding:12px;border-radius:10px;background:#fbf8f1;border:1px solid #ddd5c5;
            color:#4e473b;font:600 12.5px/1.7 ui-monospace,monospace;overflow-wrap:anywhere}

  .decision-card{padding:clamp(18px,2.5vw,28px)}
  .steps{display:flex;gap:6px;margin-bottom:15px;flex-wrap:wrap}
  .steps span{padding:5px 11px;border-radius:14px;background:#e6dfd0;color:#8a8172;font:900 11px var(--qx-font);letter-spacing:.06em}
  .steps span.past{background:#dbe7d3;color:#4a6b3c}
  .steps span.on{background:#5f7355;color:#fff}
  .theory{padding-bottom:16px;border-bottom:1px solid #d8d0be}
  .theory h2,.completion h2{margin:0;font:700 23px Georgia,serif;text-wrap:balance}
  .theory>p:last-child,.completion>p{margin:8px 0 0;color:#625a49;font:600 13.5px/1.55 var(--qx-font)}
  .options{display:grid;gap:8px;margin-top:15px}
  .options button{padding:12px 14px;border:2px solid #ded6c6;border-radius:11px;background:#fff;color:#25231f;text-align:left;cursor:pointer;display:grid;gap:3px}
  .options button b{font:850 13.5px/1.35 var(--qx-font)}
  .options button span{color:#756c5c;font:650 12.5px/1.4 var(--qx-font)}
  .options button:hover,.options button.selected{border-color:#5f7355}
  .options button.right{border-color:#559535;background:#e7f0df}
  .options button.wrong{border-color:#b83a29;background:#f6ddd8}
  .options button:disabled{cursor:default}
  .options button:focus-visible,.continue:focus-visible,.restart:focus-visible,.next-mission:focus-visible,.widths button:focus-visible,summary:focus-visible,a:focus-visible{outline:3px solid #5f7355;outline-offset:2px}
  .feedback{margin-top:11px;padding:11px 13px;border-radius:10px;font:650 13px/1.5 var(--qx-font)}
  .feedback.success{background:#e7f0df;color:#3d6529}
  .feedback.retry{background:#f6ddd8;color:#912c1e}
  .continue,.restart,.next-mission{width:100%;min-height:46px;margin-top:11px;border:0;border-radius:11px;background:#5f7355;color:#fff;font:900 13.5px var(--qx-font);cursor:pointer}
  .next-mission{display:grid;place-items:center;box-sizing:border-box;background:#25231f;text-decoration:none}

  .completion{padding:24px 20px 28px;text-align:center}
  .completion-mark{display:grid;place-items:center;width:58px;height:58px;margin:0 auto 14px;border-radius:50%;background:#559535;color:#fff;font:900 26px var(--qx-font)}
  .completion ul{list-style:none;margin:20px 0 0;padding:0;border:1px solid #d8d0be;border-radius:11px;overflow:hidden;text-align:left}
  .completion li{padding:11px 13px;border-bottom:1px solid #ddd5c5;display:grid;gap:3px}
  .completion li:last-child{border-bottom:0}
  .completion li b{font:800 13px var(--qx-font)}
  .completion li span{color:#706856;font:650 12.5px var(--qx-font)}

  footer{max-width:1320px;margin:14px auto 0;display:flex;justify-content:space-between;gap:14px;color:#9f9585;font:650 12px/1.5 var(--qx-font);flex-wrap:wrap}

  @media(max-width:980px){main{grid-template-columns:1fr}}
  @media(max-width:600px){.mission-shell{padding:13px 10px 30px}.identity h1{font-size:20px}.decision-card{padding:16px}}
  @media(prefers-reduced-motion:reduce){.progress span{transition:none}}
</style>
