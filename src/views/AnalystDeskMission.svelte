<script>
  // The Represent step draws the chart the learner chose, from the case's own
  // numbers. Picking the truncated axis draws the truncated axis, so the
  // misleading picture is something they see rather than something they are
  // warned about. Everything is computed SVG: no image is drawn by hand.
  import { ANALYST_DESK_MISSION as M, DESK_STEPS, answerFor, optionsFor, whyFor } from '../lib/game/analyst-desk-mission.js';
  import { recordCompletion } from '../lib/game/progress.js';
  import MissionMasthead from '../lib/components/game/MissionMasthead.svelte';

  let caseIndex = 0, stepIndex = 0, selected = '', checked = false, correct = false, done = [];

  $: c = M.cases[caseIndex];
  $: step = DESK_STEPS[stepIndex];
  $: options = optionsFor(c, step.key);
  $: missionComplete = done.length === M.cases.length;
  $: progress = Math.round(((done.length * DESK_STEPS.length + stepIndex + (correct ? 1 : 0)) / (M.cases.length * DESK_STEPS.length)) * 100);
  // Remembered, so the hub knows and closing the tab does not undo it.
  $: if (missionComplete) recordCompletion('analyst-desk');

  // Which chart to draw: the chosen one once a choice is made, otherwise the
  // plain count so the desk is never blank.
  $: drawn = !c ? 'bar-count'
    : step.key === 'chart' && selected ? selected
    : (correct && stepIndex > 2 ? c.chart : 'bar-count');

  const W = 520, H = 230, PAD = { l: 46, r: 14, t: 16, b: 34 };
  const iw = W - PAD.l - PAD.r, ih = H - PAD.t - PAD.b;

  // Each chart kind states what it plots and where its axis starts, so the
  // drawing and the label can never disagree.
  const KINDS = {
    'bar-count': { bars: true, of: p => p.count, zero: true, unit: '', name: 'count' },
    'bar-truncated': { bars: true, of: p => p.count, zero: false, unit: '', name: 'count, axis cut' },
    'bar-share': { bars: true, of: p => (100 * p.count) / p.sales, zero: true, unit: '%', name: 'share' },
    'bar-groups': { bars: true, of: p => p.count / p.sales, zero: true, unit: '', name: 'per branch' },
    'line-rate': { bars: false, of: p => (1000 * p.count) / p.sales, zero: true, unit: '', name: 'per 1,000' },
    'line-single': { bars: false, of: p => p.count, zero: true, unit: '', name: 'count' },
    'line-mean': { bars: false, of: p => p.count, zero: true, unit: '', name: 'mean' },
    'line-both': { bars: false, of: p => p.count, zero: true, unit: '', name: 'mean and median', second: p => p.median },
    'bar-value': { bars: true, of: p => p.count, zero: true, unit: '', name: 'mean basket, £' },
    'bar-truncated-value': { bars: true, of: p => p.count, zero: false, unit: '', name: 'mean basket, axis cut' }
  };
  $: kind = KINDS[drawn] || KINDS['bar-count'];
  $: series = c ? c.series : [];
  $: values = series.map(kind.of);
  $: lo = kind.zero || !values.length ? 0 : Math.min(...values) * 0.94;
  $: hi = (values.length ? Math.max(...values, ...(kind.second ? series.map(kind.second) : [])) : 1) * 1.08;
  $: y = v => PAD.t + ih - ((v - lo) / (hi - lo || 1)) * ih;
  $: bw = iw / (series.length || 1);
  $: fmt = v => (v >= 100 ? Math.round(v) : Math.round(v * 10) / 10) + kind.unit;

  function choose(value) {
    if (correct) return;
    selected = value;
    checked = true;
    correct = value === answerFor(c, step.key);
  }

  function advance() {
    if (!correct) return;
    if (stepIndex < DESK_STEPS.length - 1) { stepIndex += 1; }
    else { done = [...done, c.id]; caseIndex += 1; stepIndex = 0; }
    selected = ''; checked = false; correct = false;
  }

  function restart() {
    caseIndex = 0; stepIndex = 0; selected = ''; checked = false; correct = false; done = [];
  }
</script>

<svelte:head><title>{M.title} | Qubix University</title>
<meta name="description" content="Playable Volume I companion mission: turn an unclear question into a defensible answer." /></svelte:head>

<section class="desk mission-shell qx-shell">
  <MissionMasthead eyebrow={`${M.id} · BOARDROOM ASSIGNMENT`} title={M.title}
    roomId="boardroom" roomName="Boardroom · Meeting table" progress={progress}
    meta={`${missionComplete ? M.cases.length : caseIndex + 1} OF ${M.cases.length} REQUESTS · ${M.role}`} />

  <main>
    <section class="stage m1-workarea">
      {#if missionComplete}
        <div class="done-panel">
          <span>✓</span><h2>{M.cases.length} questions answered</h2>
          <p>{M.competency}</p>
          <ol>{#each M.cases as item}<li><b>{item.asked}</b><em>{optionsFor(item, 'sentence').find(o => o[0] === item.sentence)[1]}</em></li>{/each}</ol>
          <button on:click={restart}>Work the desk again</button>
        </div>
      {:else}
        <div class="ticket">
          <div><p class="eyebrow">REQUEST {caseIndex + 1} OF {M.cases.length} · {c.from}</p><h2>{c.asked}</h2></div>
          <span>{c.note}</span>
        </div>

        <figure class="chart">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" width="100%"
            aria-label={`${kind.name} for ${c.series.map(p => p.label).join(', ')}, axis starting at ${kind.zero ? 'zero' : 'a cut value'}`}>
            <rect width={W} height={H} fill="#fbf8f1"/>
            {#each [0, 0.25, 0.5, 0.75, 1] as g}
              <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + ih * g} y2={PAD.t + ih * g} stroke="#e4ddce" stroke-width="1"/>
            {/each}
            <line x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={PAD.t + ih} stroke="#241f16" stroke-width="1.4"/>
            <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + ih} y2={PAD.t + ih} stroke="#241f16" stroke-width="1.4"/>
            <text x="6" y={PAD.t + 9} font-size="11" fill="#756c5c">{fmt(hi)}</text>
            <text x="6" y={PAD.t + ih} font-size="11" fill={kind.zero ? '#756c5c' : '#b8483f'}>{kind.zero ? '0' : fmt(lo)}</text>

            {#if kind.bars}
              {#each series as p, i}
                <rect x={PAD.l + i * bw + bw * 0.22} y={y(kind.of(p))} width={bw * 0.56}
                  height={PAD.t + ih - y(kind.of(p))} fill="#a85a34"/>
                <text x={PAD.l + i * bw + bw / 2} y={y(kind.of(p)) - 6} font-size="11.5" text-anchor="middle" fill="#241f16">{fmt(kind.of(p))}</text>
              {/each}
            {:else}
              <polyline fill="none" stroke="#a85a34" stroke-width="2.6" stroke-linejoin="round"
                points={series.map((p, i) => `${PAD.l + i * bw + bw / 2},${y(kind.of(p))}`).join(' ')}/>
              {#each series as p, i}
                <circle cx={PAD.l + i * bw + bw / 2} cy={y(kind.of(p))} r="4" fill="#a85a34"/>
                <text x={PAD.l + i * bw + bw / 2} y={y(kind.of(p)) - 10} font-size="11.5" text-anchor="middle" fill="#241f16">{fmt(kind.of(p))}</text>
              {/each}
              {#if kind.second}
                <polyline fill="none" stroke="#397f86" stroke-width="2.4" stroke-dasharray="5 4"
                  points={series.map((p, i) => `${PAD.l + i * bw + bw / 2},${y(kind.second(p))}`).join(' ')}/>
                {#each series as p, i}
                  <circle cx={PAD.l + i * bw + bw / 2} cy={y(kind.second(p))} r="3.4" fill="#397f86"/>
                  <text x={PAD.l + i * bw + bw / 2} y={y(kind.second(p)) + 16} font-size="11.5" text-anchor="middle" fill="#397f86">{fmt(kind.second(p))}</text>
                {/each}
              {/if}
            {/if}

            {#each series as p, i}
              <text x={PAD.l + i * bw + bw / 2} y={H - 12} font-size="11.5" text-anchor="middle" fill="#625a49">{p.label}</text>
            {/each}
          </svg>
          <figcaption>
            <b>{kind.name}</b>
            {#if kind.second}
              <span class="key"><i class="solid"></i>mean</span>
              <span class="key"><i class="dash"></i>median</span>
            {/if}
            {#if !kind.zero}<em class="warn">axis does not start at zero</em>{/if}
          </figcaption>
        </figure>
      {/if}
    </section>

    {#if !missionComplete}
    <aside>
        <div class="steps" role="list">
          {#each DESK_STEPS as s, i}
            <span role="listitem" class:on={i === stepIndex} class:past={i < stepIndex}>{s.label}</span>
          {/each}
        </div>
        <p class="eyebrow">STEP {stepIndex + 1} OF {DESK_STEPS.length}</p>
        <h2>{step.question}</h2>
        <p class="theory">{step.theory}</p>
        <div class="options">
          {#each options as [value, label, hint]}
            <button class:sel={selected === value} class:right={correct && selected === value}
              class:wrong={checked && !correct && selected === value}
              on:click={() => choose(value)} disabled={correct}>
              <b>{label}</b><span>{hint}</span>
            </button>
          {/each}
        </div>
        {#if checked}
          <div class="feedback" class:good={correct} class:bad={!correct} role="status">
            {#if correct}<b>Correct.</b> {whyFor(c, step.key)}
            {:else}<b>Not yet.</b> {step.key === 'chart' ? 'Look at what you just drew, then choose again.' : 'Ask what the answer would look like if the opposite were true.'}{/if}
          </div>
        {/if}
        {#if correct}
          <button class="next" on:click={advance}>
            {stepIndex < DESK_STEPS.length - 1 ? DESK_STEPS[stepIndex + 1].label.toLowerCase() : (caseIndex === M.cases.length - 1 ? 'finish the shift' : 'next request')} →
          </button>
        {/if}
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
  .desk{min-height:100vh;max-width:none;padding:18px clamp(12px,3vw,34px) 30px;color:#f1ede4;background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%);overflow:auto}
  header{max-width:1320px;margin:0 auto 14px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
  .identity{display:flex;align-items:center;gap:12px}
  .role{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:#a85a34;color:#fff;font:900 12px/1.15 var(--qx-font);text-align:center}
  .identity p{margin:0 0 3px;color:#bcb19e;font:800 12px var(--qx-font);letter-spacing:.1em}
  .identity h1{margin:0;color:#fff;font:700 26px Georgia,serif}
  nav{display:flex;gap:14px}
  nav a,footer a{color:#e2c7b7;font:800 13px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}
  .progress{max-width:1320px;height:5px;margin:0 auto 16px;border-radius:8px;background:rgba(255,255,255,.1);overflow:hidden}
  .progress span{display:block;height:100%;background:#63b13b;transition:width .35s ease}
  main{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(340px,.85fr);gap:16px;align-items:start}
  .stage,aside{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#f1ede4;color:#25231f;overflow:hidden}
  .ticket{padding:18px 20px;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;background:#25231f;color:#f1ede4}
  .ticket h2{margin:0;font:700 24px Georgia,serif;color:#fff;text-wrap:balance}
  .ticket>span{max-width:34ch;color:#bcb19e;font:650 13px/1.45 var(--qx-font)}
  .eyebrow{margin:0 0 5px;color:#8c4c2e;font:900 12px var(--qx-font);letter-spacing:.12em}
  .ticket .eyebrow{color:#e4a17b}
  .chart{margin:0;padding:16px 18px 12px;background:#fbf8f1}
  .chart svg{display:block;border-radius:10px}
  figcaption{margin-top:9px;display:flex;align-items:center;gap:11px;flex-wrap:wrap}
  figcaption b{font:850 13px var(--qx-font);color:#4e473b;text-transform:capitalize}
  .warn{padding:3px 9px;border-radius:14px;background:#f6ddd8;color:#912c1e;font:850 12px var(--qx-font);font-style:normal}
  .key{display:inline-flex;align-items:center;gap:6px;color:#625a49;font:700 12px var(--qx-font)}
  .key i{width:18px;height:0;border-top:2.4px solid #a85a34}
  .key i.dash{border-top-style:dashed;border-color:#866239}
  aside{padding:clamp(18px,2.4vw,26px)}
  .steps{display:flex;gap:6px;margin-bottom:16px;flex-wrap:wrap}
  .steps span{padding:5px 10px;border-radius:14px;background:#e6dfd0;color:#8a8172;font:900 11px var(--qx-font);letter-spacing:.06em}
  .steps span.past{background:#dbe7d3;color:#4a6b3c}
  .steps span.on{background:#a85a34;color:#fff}
  aside h2{margin:0;font:700 23px Georgia,serif;text-wrap:balance}
  .theory{margin:9px 0 16px;color:#625a49;font:650 13.5px/1.55 var(--qx-font)}
  .options{display:grid;gap:8px}
  .options button{padding:12px 14px;border:2px solid #ded6c6;border-radius:11px;background:#fff;color:#25231f;text-align:left;cursor:pointer;display:grid;gap:3px}
  .options button b{font:850 13.5px/1.35 var(--qx-font)}
  .options button span{color:#756c5c;font:650 12.5px/1.4 var(--qx-font)}
  .options button:hover,.options button.sel{border-color:#a85a34}
  .options button.right{border-color:#559535;background:#e7f0df}
  .options button.wrong{border-color:#b83a29;background:#f6ddd8}
  .options button:disabled{cursor:default}
  .options button:focus-visible,.next:focus-visible,.done-panel button:focus-visible{outline:3px solid #a85a34;outline-offset:2px}
  .feedback{margin-top:11px;padding:11px 13px;border-radius:10px;font:650 13px/1.5 var(--qx-font)}
  .feedback.good{background:#e7f0df;color:#3d6529}
  .feedback.bad{background:#f6ddd8;color:#912c1e}
  .next,.done-panel button{width:100%;min-height:46px;margin-top:11px;border:0;border-radius:11px;background:#a85a34;color:#fff;font:900 13.5px var(--qx-font);cursor:pointer;text-transform:capitalize}
  .done-panel{padding:28px 24px;text-align:center}
  .done-panel>span{display:grid;place-items:center;width:58px;height:58px;margin:0 auto 14px;border-radius:50%;background:#559535;color:#fff;font:900 26px var(--qx-font)}
  .done-panel h2{margin:0;font:700 25px Georgia,serif}
  .done-panel>p{margin:9px 0 0;color:#625a49;font:650 13.5px/1.5 var(--qx-font)}
  .done-panel ol{list-style:none;margin:20px 0 0;padding:0;border:1px solid #d8d0be;border-radius:11px;overflow:hidden;text-align:left}
  .done-panel li{padding:11px 13px;border-bottom:1px solid #e1dacb;display:grid;gap:3px}
  .done-panel li:last-child{border-bottom:0}
  .done-panel li b{font:800 13px var(--qx-font)}
  .done-panel li em{color:#706856;font:650 12.5px/1.4 var(--qx-font);font-style:normal}
  footer{max-width:1320px;margin:14px auto 0;display:flex;justify-content:space-between;gap:14px;color:#9f9585;font:650 12px/1.5 var(--qx-font);flex-wrap:wrap}
  @media(max-width:940px){main{grid-template-columns:1fr}}
  @media(max-width:600px){.desk{padding:13px 10px 25px}.identity h1{font-size:20px}.ticket{padding:14px}aside{padding:16px}}
  @media(prefers-reduced-motion:reduce){.progress span{transition:none}}
</style>
