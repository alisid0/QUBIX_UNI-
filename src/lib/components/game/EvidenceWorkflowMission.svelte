<script>
  import MissionMasthead from './MissionMasthead.svelte';
  import { recordCompletion } from '../../game/progress.js';

  export let mission;
  export let slug;
  export let roomId;
  export let roomName;
  export let locationLabel = '';
  export let chapter = '';

  let caseIndex = 0;
  let stepIndex = 0;
  let selected = '';
  let checked = false;
  let correct = false;
  let done = [];

  $: missionComplete = done.length === mission.cases.length;
  $: currentCase = missionComplete ? null : mission.cases[caseIndex];
  $: step = mission.steps[stepIndex];
  $: answer = currentCase?.[step.key];
  $: options = currentCase?.[`${step.key}Options`] || [];
  $: explanation = currentCase?.[`${step.key}Why`] || '';
  $: progress = missionComplete ? 100 : Math.round(((done.length * mission.steps.length + stepIndex + (correct ? 1 : 0))
    / (mission.cases.length * mission.steps.length)) * 100);
  $: if (missionComplete) recordCompletion(slug);

  function choose(value) {
    if (correct) return;
    selected = value;
    checked = true;
    correct = value === answer;
  }

  function advance() {
    if (!correct) return;
    if (stepIndex < mission.steps.length - 1) stepIndex += 1;
    else {
      done = [...done, currentCase.id];
      caseIndex += 1;
      stepIndex = 0;
    }
    selected = '';
    checked = false;
    correct = false;
  }

  function restart() {
    caseIndex = 0;
    stepIndex = 0;
    selected = '';
    checked = false;
    correct = false;
    done = [];
  }

  const labelFor = (item, key) => item[`${key}Options`].find(option => option[0] === item[key])?.[1] || item[key];
</script>

<svelte:head>
  <title>{mission.title} | Qubix University</title>
  <meta name="description" content={mission.competency} />
</svelte:head>

<section class="mission-shell qx-shell evidence-mission">
  <MissionMasthead eyebrow={`${mission.id} · ${locationLabel}`} title={mission.title}
    {roomId} {roomName} {progress}
    meta={`${missionComplete ? mission.cases.length : caseIndex + 1} OF ${mission.cases.length} CASE FILES · CHAPTER ${chapter}`} />

  <main>
    <section class="case-file m1-workarea">
      {#if missionComplete}
        <div class="completion">
          <span class="stamp">SIGNED OFF</span>
          <p class="eyebrow">COMPETENCY DEMONSTRATED</p>
          <h2>{mission.cases.length} case files cleared</h2>
          <p>{mission.competency}</p>
          <ol>
            {#each mission.cases as item}
              <li><span>{item.title}</span><b>{labelFor(item, mission.summaryKey)}</b></li>
            {/each}
          </ol>
          <a href="?mode=game">Return to the Superstore shift →</a>
          <button on:click={restart}>Restart practice</button>
        </div>
      {:else}
        <header class="file-head">
          <div><p class="eyebrow">CASE FILE {String(caseIndex + 1).padStart(2, '0')}</p><h2>{currentCase.title}</h2></div>
          <span>{caseIndex + 1} / {mission.cases.length}</span>
        </header>
        <p class="brief">{currentCase.brief}</p>
        <div class="evidence-table" role="table" aria-label={`${currentCase.title} evidence`}>
          {#each currentCase.facts as [label, value]}
            <div role="row"><b role="rowheader">{label}</b><span role="cell">{value}</span></div>
          {/each}
        </div>
        <aside class="case-rule">
          <b>WORKING RULE</b>
          <span>{step.theory}</span>
        </aside>
      {/if}
    </section>

    {#if !missionComplete}
      <aside class="decision-card">
        <nav aria-label="Case stages">
          {#each mission.steps as item, index}
            <span class:on={index === stepIndex} class:past={index < stepIndex}><b>{index + 1}</b>{item.label}</span>
          {/each}
        </nav>
        <div class="question"><p class="eyebrow">{step.label.toUpperCase()} · STEP {stepIndex + 1} OF {mission.steps.length}</p><h2>{step.question}</h2></div>
        <div class="options">
          {#each options as [value, label, hint]}
            <button class:selected={selected === value} class:right={correct && selected === value}
              class:wrong={checked && !correct && selected === value} on:click={() => choose(value)} disabled={correct}>
              <b>{label}</b><span>{hint}</span>
            </button>
          {/each}
        </div>
        {#if checked}
          <div class="feedback" class:success={correct} role="status">
            <b>{correct ? 'Decision holds.' : 'Not yet.'}</b>
            <span>{correct ? explanation : 'Use the case evidence and working rule; choose the option that changes or qualifies the process, not merely the presentation.'}</span>
          </div>
        {/if}
        {#if correct}
          <button class="continue" on:click={advance}>
            {stepIndex < mission.steps.length - 1 ? mission.steps[stepIndex + 1].label : (caseIndex === mission.cases.length - 1 ? 'Complete mission' : 'Next case file')} →
          </button>
        {/if}
      </aside>
    {/if}
  </main>

  <footer>
    <span>Original Qubix cases · source-informed learning draft · accessed 26 August 2026</span>
    <span class="source-links">{#each mission.sources as source, index}<a href={source.url} target="_blank" rel="noreferrer">{source.label}<small>{source.licence}</small></a>{index < mission.sources.length - 1 ? ' · ' : ''}{/each}</span>
  </footer>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#e6e0d2}
  :global(body){position:static}
  main{display:grid;grid-template-columns:minmax(0,1.14fr) minmax(330px,.86fr);gap:24px;align-items:start}
  .case-file,.decision-card{background:#f7f3e9;color:#20241f}.case-file{min-height:520px;overflow:hidden}.decision-card{padding:24px;border:1px solid #9c998d;box-shadow:5px 5px 0 rgba(32,36,31,.12)}
  .file-head{padding:22px 24px 18px;display:flex;justify-content:space-between;align-items:start;gap:18px;border-bottom:2px solid #20241f}
  .eyebrow{margin:0 0 6px;color:#b85530;font:900 11px var(--qx-font);letter-spacing:.14em}.file-head h2,.question h2,.completion h2{margin:0;font:400 27px/1.08 Georgia,serif;text-wrap:balance}
  .file-head>span{display:grid;place-items:center;min-width:50px;height:34px;background:#20241f;color:#fff;font:900 11.5px var(--qx-font)}
  .brief{margin:0;padding:20px 24px;color:#51584f;font:650 14px/1.6 var(--qx-font)}
  .evidence-table{margin:0 24px;border:2px solid #20241f}.evidence-table>div{display:grid;grid-template-columns:minmax(125px,34%) 1fr;border-bottom:1px solid #9c998d}.evidence-table>div:last-child{border-bottom:0}.evidence-table b,.evidence-table span{padding:12px 13px}.evidence-table b{background:#e1dacd;font:900 11.5px/1.4 var(--qx-font);letter-spacing:.04em}.evidence-table span{font:700 12.5px/1.45 ui-monospace,"SF Mono",Consolas,monospace;overflow-wrap:anywhere}
  .case-rule{margin:22px 24px 26px;padding:14px 16px;display:grid;gap:5px;border-left:5px solid #315f48;background:#e3e9df}.case-rule b{color:#315f48;font:900 11px var(--qx-font);letter-spacing:.12em}.case-rule span{font:650 12.5px/1.5 var(--qx-font)}
  .decision-card nav{display:flex;gap:1px;margin-bottom:22px;background:#c8c1b1}.decision-card nav span{flex:1;min-width:0;padding:8px 7px;display:flex;align-items:center;gap:6px;background:#e7e1d5;color:#6f756b;font:850 11px var(--qx-font);letter-spacing:.04em}.decision-card nav span b{display:grid;place-items:center;width:20px;height:20px;background:#c8c1b1;color:#20241f}.decision-card nav span.past{background:#dce5d7;color:#315f48}.decision-card nav span.on{background:#20241f;color:#fff}.decision-card nav span.on b{background:#b85530;color:#fff}
  .question{padding-bottom:18px;border-bottom:2px solid #20241f}.question h2{font-size:24px}
  .options{display:grid;gap:9px;margin-top:18px}.options button{padding:13px 14px;display:grid;gap:4px;border:1px solid #9c998d;background:#fff;color:#20241f;text-align:left;cursor:pointer}.options button:hover,.options button.selected{border:2px solid #315f48}.options button.right{border:2px solid #315f48;background:#e3e9df}.options button.wrong{border:2px solid #b85530;background:#f4e0d7}.options button:disabled{cursor:default}.options button b{font:850 13px/1.35 var(--qx-font)}.options button span{color:#686d64;font:650 11.5px/1.45 var(--qx-font)}
  .feedback{margin-top:12px;padding:12px 14px;display:grid;gap:4px;border-left:5px solid #b85530;background:#f4e0d7;color:#813d2b;font:650 12px/1.5 var(--qx-font)}.feedback.success{border-color:#315f48;background:#e3e9df;color:#315f48}.feedback b{font-weight:900}
  .continue,.completion>a,.completion>button{width:100%;min-height:45px;margin-top:12px;border:0;background:#315f48;color:#fff;font:900 11px var(--qx-font);letter-spacing:.06em;text-transform:uppercase;cursor:pointer}.continue{text-align:center}.completion>a{display:grid;place-items:center;box-sizing:border-box;background:#20241f;text-decoration:none}.completion>button{background:transparent;color:#315f48;border:1px solid #315f48}
  .completion{padding:42px clamp(22px,5vw,52px);text-align:center}.stamp{display:inline-block;margin-bottom:22px;padding:10px 14px;border:4px double #315f48;color:#315f48;font:900 12px var(--qx-font);letter-spacing:.14em;transform:rotate(-2deg)}.completion>p:not(.eyebrow){max-width:54ch;margin:12px auto;color:#555b53;font:650 13.5px/1.55 var(--qx-font)}.completion ol{margin:24px 0 0;padding:0;list-style:none;border:2px solid #20241f;text-align:left}.completion li{padding:12px 14px;display:grid;grid-template-columns:1fr 1fr;gap:12px;border-bottom:1px solid #9c998d}.completion li:last-child{border-bottom:0}.completion li span{font:800 12px var(--qx-font)}.completion li b{color:#315f48;font:800 11px/1.4 var(--qx-font)}
  footer{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font:650 11.5px/1.5 var(--qx-font)}.source-links{display:flex;align-items:center;gap:5px;flex-wrap:wrap}.source-links a{display:inline-flex;align-items:center;gap:5px}.source-links small{padding:2px 4px;border:1px solid currentColor;font:850 11px var(--qx-font);text-decoration:none}
  button:focus-visible,a:focus-visible{outline:3px solid #b85530;outline-offset:3px}
  @media(max-width:900px){main{grid-template-columns:1fr}.case-file{min-height:0}}
  @media(max-width:560px){.decision-card{padding:17px}.file-head,.brief{padding-left:17px;padding-right:17px}.evidence-table,.case-rule{margin-left:17px;margin-right:17px}.evidence-table>div{grid-template-columns:1fr}.evidence-table b{padding-bottom:5px}.evidence-table span{padding-top:5px}.completion li{grid-template-columns:1fr}.decision-card nav span{justify-content:center}.decision-card nav span:not(.on) {font-size:0}.decision-card nav span b{font-size:11px}}
</style>

