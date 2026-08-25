<script>
  import PixelAsset from '../lib/components/game/PixelAsset.svelte';
  import { DATA_LINEAGE_MISSION, completedLineage } from '../lib/game/data-lineage-mission.js';

  import { recordCompletion } from '../lib/game/progress.js';
  let stepIndex = 0;
  let selected = '';
  let checked = false;
  let correct = false;
  let missionComplete = false;

  $: step = DATA_LINEAGE_MISSION.steps[stepIndex];
  $: progress = missionComplete ? 100 : Math.round(((stepIndex + (correct ? 1 : 0)) / DATA_LINEAGE_MISSION.steps.length) * 100);
  $: path = completedLineage(missionComplete ? 3 : stepIndex + (correct ? 1 : 0));

  function choose(value) {
    if (correct) return;
    selected = value;
    checked = true;
    correct = value === step.answer;
  }

  function advance() {
    if (!correct) return;
    if (stepIndex === DATA_LINEAGE_MISSION.steps.length - 1) {
      missionComplete = true;
      return;
    }
    stepIndex += 1;
    selected = '';
    checked = false;
    correct = false;
  }

  function resetMission() {
    stepIndex = 0;
    selected = '';
    checked = false;
    correct = false;
    missionComplete = false;
  }

  // Remembered, so the hub knows and closing the tab does not undo it.
  $: if (missionComplete) recordCompletion('data-lineage');
</script>

<svelte:head><title>Trace the Number | Qubix University</title><meta name="description" content="Authoring-only Qubix data-lineage mission prototype." /></svelte:head>

<section class="mission qx-shell">
  <header class="mission-header">
    <div class="identity"><span class="role">PRE<br />INTERN</span><div><p>{DATA_LINEAGE_MISSION.id} · {DATA_LINEAGE_MISSION.status}</p><h1>{DATA_LINEAGE_MISSION.title}</h1></div></div>
    <nav><a href="?mode=game&mission=foundations">Foundations</a><a href="?mode=game&mission=units-measurement">Mission 006</a><a href="?mode=assets&asset=computer-screen">Operations studio</a></nav>
  </header>
  <div class="progress" aria-label={`Mission ${progress}% complete`}><span style={`width:${progress}%`}></span></div>

  <main>
    <section class="terminal">
      <div class="system-bar"><div><i></i><i></i><i></i><b>QUBIX LINEAGE VIEWER</b></div><em>{missionComplete ? 'TRACE SAVED' : `STEP ${stepIndex + 1} OF 3`}</em></div>
      <div class="case-bar"><span>QUALITY EVENT · BRANCH B-08</span><b>Why does the morning report show −17.8 °C?</b></div>

      <div class="path" aria-label="Value lineage from source record through transformation to report">
        <article class:active={!missionComplete && step.id === 'source'} class:done={path.source}>
          <div class="asset"><PixelAsset kind="feed" state={path.source ? 'resolved' : 'idle'} /></div>
          <small>ENTITY · SOURCE</small><strong>{DATA_LINEAGE_MISSION.record.sourceValue}</strong><code>{DATA_LINEAGE_MISSION.record.sourceKey}</code><span>{DATA_LINEAGE_MISSION.record.sourceSystem}</span>
        </article>
        <div class:lit={path.source} class="connector"><span>USED BY</span><b>→</b></div>
        <article class:active={!missionComplete && step.id === 'activity'} class:done={path.activity}>
          <div class="asset"><PixelAsset kind="server" state={path.activity ? 'resolved' : 'idle'} /></div>
          <small>ACTIVITY · CHANGE</small><strong>{DATA_LINEAGE_MISSION.record.activity}</strong><code>{DATA_LINEAGE_MISSION.record.rule}</code><span>versioned conversion rule</span>
        </article>
        <div class:lit={path.activity} class="connector"><span>GENERATED</span><b>→</b></div>
        <article class:active={!missionComplete && step.id === 'derivation'} class:done={path.output}>
          <div class="asset"><PixelAsset kind="monitor" state={path.output ? 'resolved' : 'idle'} /></div>
          <small>ENTITY · REPORT</small><strong>{DATA_LINEAGE_MISSION.record.outputValue}</strong><code>{DATA_LINEAGE_MISSION.record.reportCell}</code><span>{DATA_LINEAGE_MISSION.record.destination}</span>
        </article>
      </div>

      <section class="evidence">
        <div><small>SOURCE KEY</small><code>{path.source ? DATA_LINEAGE_MISSION.record.sourceKey : 'waiting for identification'}</code></div>
        <div><small>ACTIVITY</small><code>{path.activity ? DATA_LINEAGE_MISSION.record.activity : 'waiting for identification'}</code></div>
        <div><small>DERIVATION</small><code>{path.output ? 'report wasDerivedFrom source' : 'trace incomplete'}</code></div>
      </section>
      {#if missionComplete}<div class="saved" role="status"><span>✓</span><div><b>Lineage trace documented</b><p>The report value remains connected to the source record and the versioned activity that changed it.</p></div></div>{/if}
    </section>

    <aside>
      {#if missionComplete}
        <div class="completion"><span class="seal">✓</span><p class="eyebrow">COMPETENCY DEMONSTRATED</p><h2>You found the history behind the number.</h2><p>{DATA_LINEAGE_MISSION.competency}</p><dl><div><dt>Entity</dt><dd>{DATA_LINEAGE_MISSION.record.sourceKey}</dd></div><div><dt>Activity</dt><dd>{DATA_LINEAGE_MISSION.record.activity}</dd></div><div><dt>Derived entity</dt><dd>{DATA_LINEAGE_MISSION.record.reportCell}</dd></div></dl><a class="campaign-ending" href="?mode=game&mission=campaign&screen=complete">Finish the rotation</a><button on:click={resetMission}>Run the trace again</button></div>
      {:else}
        <div class="step-meta"><span>{step.label} CHECK</span><span>{step.number} / 03</span></div><p class="eyebrow">FOLLOW THE EVIDENCE</p><h2>{step.prompt}</h2><p class="theory">{step.theory}</p>
        <div class="options">{#each step.options as option}<button class:selected={selected === option.value} class:right={correct && selected === option.value} class:wrong={checked && !correct && selected === option.value} on:click={() => choose(option.value)} disabled={correct}><b>{option.label}</b><span>{option.note}</span></button>{/each}</div>
        {#if checked}<div class:success={correct} class:retry={!correct} class="feedback" role="status">{#if correct}<b>{step.explanation}</b>{:else}<b>Try again.</b> Follow the identity of the record, the activity, and then the output.{/if}</div>{/if}
        {#if correct}<button class="continue" on:click={advance}>{stepIndex === 2 ? 'Save the complete trace' : 'Follow the trace'} →</button>{/if}
      {/if}
    </aside>
  </main>

  <footer><span>{DATA_LINEAGE_MISSION.provenance}</span><span>{#each DATA_LINEAGE_MISSION.sources as source,index}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>{index < DATA_LINEAGE_MISSION.sources.length - 1 ? ' · ' : ''}{/each}</span></footer>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}:global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#171510}:global(body){position:static}.mission{min-height:100vh;max-width:none;padding:18px clamp(11px,3vw,34px) 30px;background:radial-gradient(circle at 42% 0,#3f3428,#171510 58%);color:#f1ede4;overflow:auto}.mission-header{max-width:1360px;margin:0 auto 14px;display:flex;align-items:center;justify-content:space-between;gap:16px}.identity{display:flex;align-items:center;gap:12px}.role{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:#a85a34;color:#fff;font:900 12px/1.15 var(--qx-font);text-align:center}.identity p{margin:0 0 3px;color:#aebbbb;font:800 12px var(--qx-font);letter-spacing:.09em}.identity h1{margin:0;color:#fff;font:700 27px Georgia,serif}nav{display:flex;gap:14px}nav a,footer a{color:#dfc1b3;font:800 13px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}.progress{max-width:1360px;height:5px;margin:0 auto 16px;border-radius:8px;background:rgba(255,255,255,.1);overflow:hidden}.progress span{display:block;height:100%;background:#3e9e2a;transition:width .3s ease}main{max-width:1360px;margin:auto;display:grid;grid-template-columns:minmax(0,1.35fr) minmax(350px,.65fr);gap:16px;align-items:start}.terminal,aside{border:1px solid rgba(255,255,255,.14);border-radius:17px;overflow:hidden}.terminal{min-height:690px;background:#e9eee9;color:#202727}.system-bar{height:43px;padding:0 13px;display:flex;align-items:center;justify-content:space-between;background:#202a2b;color:#e4e9e6}.system-bar>div{display:flex;align-items:center;gap:6px}.system-bar i{width:8px;height:8px;border-radius:50%;background:#a85a34}.system-bar i:nth-child(2){background:#d39a35}.system-bar i:nth-child(3){background:#3e9e2a}.system-bar b,.system-bar em{margin-left:6px;font:850 11.5px var(--qx-font);letter-spacing:.08em}.system-bar em{color:#99aaa7}.case-bar{padding:18px 22px;border-bottom:1px solid #c9d3cd;background:#f6f7f3}.case-bar span,.case-bar b{display:block}.case-bar span{margin-bottom:5px;color:#8c4c2e;font:900 11.5px var(--qx-font);letter-spacing:.11em}.case-bar b{font:700 22px Georgia,serif}.path{display:grid;grid-template-columns:1fr 58px 1fr 58px 1fr;align-items:center;padding:32px 20px 24px}.path article{position:relative;min-height:230px;padding:15px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px solid #c6d0ca;border-radius:14px;background:#fff;text-align:center;transition:border-color .2s,box-shadow .2s}.path article.active{border-color:#a85a34;box-shadow:0 0 0 4px rgba(168,90,52,.11)}.path article.done{border-color:#3e9e2a}.asset{width:57px;height:57px;margin-bottom:10px}.path small,.evidence small{color:#6b7a76;font:900 11px var(--qx-font);letter-spacing:.11em}.path strong{margin:9px 0 5px;color:#263432;font:850 15px var(--qx-font);overflow-wrap:anywhere}.path code{padding:5px;border-radius:4px;background:#edf1ed;color:#8c4c2e;font:750 11.5px Consolas,monospace}.path article>span{margin-top:8px;color:#6c7875;font:650 11.5px var(--qx-font)}.connector{display:grid;justify-items:center;color:#9aa7a3}.connector span{font:850 11px var(--qx-font);letter-spacing:.08em}.connector b{font:900 24px var(--qx-font)}.connector.lit{color:#3e9e2a}.evidence{margin:0 20px;padding:13px;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;border:1px solid #c9d3cd;border-radius:11px;background:#dfe7e2}.evidence div{display:grid;gap:5px}.evidence code{font:700 11.5px/1.4 Consolas,monospace;overflow-wrap:anywhere}.saved{display:flex;align-items:center;gap:12px;margin:18px 20px;padding:14px;border-radius:11px;background:#dfead9;color:#365d28}.saved>span,.seal{display:grid;place-items:center;width:42px;height:42px;flex:0 0 42px;border-radius:50%;background:#3e9e2a;color:#fff;font:900 20px var(--qx-font)}.saved b{font:850 13.5px var(--qx-font)}.saved p{margin:3px 0 0;font:650 12px/1.4 var(--qx-font)}aside{padding:clamp(18px,2.4vw,28px);background:#f1ede4;color:#25231f}.step-meta{display:flex;justify-content:space-between;margin-bottom:15px;color:#706858;font:900 11.5px var(--qx-font);letter-spacing:.09em}.eyebrow{margin:0 0 7px;color:#8c4c2e;font:900 12px var(--qx-font);letter-spacing:.12em}aside h2{margin:0;font:700 23px Georgia,serif}.theory,.completion>p{margin:9px 0 15px;color:#625a49;font:600 14.5px/1.55 var(--qx-font)}.options{display:grid;gap:8px}.options button{min-height:62px;padding:10px 12px;border:2px solid #ded6c6;border-radius:11px;background:#fff;color:#25231f;text-align:left;cursor:pointer}.options button b,.options button span{display:block}.options button b{font:850 13.5px/1.3 var(--qx-font)}.options button span{margin-top:4px;color:#736a59;font:600 12px/1.3 var(--qx-font)}.options button:hover,.options button.selected{border-color:#a85a34}.options button.right{border-color:#3e9e2a;background:#e7f0df}.options button.wrong{border-color:#b83a29;background:#f6ddd8}.options button:disabled{cursor:default}.options button:focus-visible,.continue:focus-visible,.completion button:focus-visible{outline:3px solid #a85a34;outline-offset:2px}.feedback{margin-top:11px;padding:11px 12px;border-radius:10px;font:650 13.5px/1.45 var(--qx-font)}.feedback.success{background:#e7f0df;color:#3d6529}.feedback.retry{background:#f6ddd8;color:#912c1e}.continue,.completion button{width:100%;min-height:46px;margin-top:11px;border:0;border-radius:11px;background:#a85a34;color:#fff;font:900 13.5px var(--qx-font);cursor:pointer}.completion{text-align:center}.completion .seal{margin:8px auto 14px}.completion dl{margin:18px 0 0;border:1px solid #d8d0be;border-radius:11px;overflow:hidden;text-align:left}.completion dl div{display:grid;grid-template-columns:95px 1fr;gap:8px;padding:10px;border-bottom:1px solid #ddd5c5;font:700 12px var(--qx-font)}.completion dl div:last-child{border-bottom:0}.completion dt{color:#756b5a}.completion dd{margin:0;overflow-wrap:anywhere}footer{max-width:1360px;margin:14px auto 0;display:flex;justify-content:space-between;gap:16px;color:#91a09d;font:650 11.5px/1.5 var(--qx-font)}footer>span:first-child{max-width:650px}footer a{font-size:11.5px}@media(max-width:1050px){main{grid-template-columns:1fr}.terminal{min-height:0}footer{flex-direction:column}}@media(max-width:700px){.mission{padding:12px 9px 25px}.mission-header{align-items:flex-start}.identity h1{font-size:20px}.role{width:42px;height:42px}nav{flex-direction:column;align-items:flex-end;gap:6px}.path{grid-template-columns:1fr;padding:18px}.connector{padding:4px}.connector b{transform:rotate(90deg)}.path article{min-height:190px}.evidence{grid-template-columns:1fr;margin:0 18px}.saved{margin:16px 18px}aside{padding:16px}.completion dl div{grid-template-columns:1fr}footer{font-size:11.5px}}@media(prefers-reduced-motion:reduce){.progress span,.path article{transition:none}}
  .campaign-ending{display:grid;place-items:center;width:100%;min-height:46px;margin-top:11px;border-radius:11px;background:#25231f;color:#fff;font:900 13.5px var(--qx-font);text-decoration:none}.campaign-ending:focus-visible{outline:3px solid #a85a34;outline-offset:2px}
</style>
