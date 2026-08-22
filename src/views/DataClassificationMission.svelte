<script>
  import { CLASSIFICATION_MISSION, QUESTION_STEPS, answerFor, explanationFor, subtypeStep } from '../lib/game/data-classification-mission.js';

  import { recordCompletion } from '../lib/game/progress.js';
  const stepOrder = ['primary', 'subtype', 'scale'];
  const requestedVariation = new URLSearchParams(window.location.search).get('variation');
  const requestedIndex = CLASSIFICATION_MISSION.variations.findIndex(item => item.id === requestedVariation);
  let variationIndex = requestedIndex >= 0 ? requestedIndex : 0;
  let variableIndex = 0;
  let stepIndex = 0;
  let selected = '';
  let checked = false;
  let correct = false;
  let completed = [];
  let completedVariations = [];

  $: variation = CLASSIFICATION_MISSION.variations[variationIndex];
  $: variables = variation.variables;
  $: variable = variables[variableIndex];
  $: step = stepOrder[stepIndex];
  $: question = step === 'subtype' && variable ? subtypeStep(variable.primary) : QUESTION_STEPS[step];
  $: variationProgress = Math.round(((completed.length * stepOrder.length + stepIndex + (correct ? 1 : 0)) / (variables.length * stepOrder.length)) * 100);
  $: activeDecisions = completedVariations.includes(variation.id) ? 0 : completed.length * stepOrder.length + stepIndex + (correct ? 1 : 0);
  $: overallProgress = Math.round(((completedVariations.length * variables.length * stepOrder.length + activeDecisions) / (CLASSIFICATION_MISSION.variations.length * variables.length * stepOrder.length)) * 100);
  $: variationComplete = completed.length === variables.length;
  $: courseComplete = completedVariations.length === CLASSIFICATION_MISSION.variations.length;

  function choose(value) {
    if (correct) return;
    selected = value;
    checked = true;
    correct = value === answerFor(variable, step);
  }

  function continueMission() {
    if (!correct) return;
    if (stepIndex < stepOrder.length - 1) {
      stepIndex += 1;
    } else {
      completed = [...completed, variable.id];
      if (variableIndex === variables.length - 1 && !completedVariations.includes(variation.id)) {
        completedVariations = [...completedVariations, variation.id];
      }
      variableIndex += 1;
      stepIndex = 0;
    }
    selected = '';
    checked = false;
    correct = false;
  }

  function resetVariation() {
    variableIndex = 0;
    stepIndex = 0;
    selected = '';
    checked = false;
    correct = false;
    completed = [];
  }

  function openVariation(index) {
    variationIndex = index;
    resetVariation();
    const url = new URL(window.location.href);
    url.searchParams.set('variation', CLASSIFICATION_MISSION.variations[index].id);
    history.replaceState({}, '', url);
  }

  function openNextVariation() {
    const next = CLASSIFICATION_MISSION.variations.findIndex(item => !completedVariations.includes(item.id));
    if (next >= 0) openVariation(next);
  }

  // Remembered, so the hub knows and closing the tab does not undo it.
  $: if (courseComplete) recordCompletion('classify-data');
</script>

<svelte:head>
  <title>Classify Store Data | Qubix University</title>
  <meta name="description" content="Local AI draft of a Qubix Superstore data-classification mission." />
</svelte:head>

<section class="mission-shell qx-shell">
  <header>
    <div class="identity"><span class="role">PRE<br />INTERN</span><div><p>{CLASSIFICATION_MISSION.id} · {CLASSIFICATION_MISSION.status}</p><h1>{CLASSIFICATION_MISSION.title}</h1></div></div>
    <nav><a href="?mode=game&mission=foundations">Foundations</a><a href="?mode=game&mission=checkout-basics&fresh=1">Mission 001</a><a href="?mode=game&mission=missing-data">Mission 003</a><a href="?mode=wiki">Library</a></nav>
  </header>

  <div class="progress" aria-label={`Four-variation mission ${overallProgress}% complete`}><span style={`width:${overallProgress}%`}></span></div>

  <section class="variation-picker" aria-label="Mission variations">
    {#each CLASSIFICATION_MISSION.variations as item, index}
      <button class:active={index === variationIndex} class:done={completedVariations.includes(item.id)} on:click={() => openVariation(index)} aria-pressed={index === variationIndex}>
        <span>{completedVariations.includes(item.id) ? '✓' : index + 1}</span><b>{item.shortTitle}</b>
      </button>
    {/each}
  </section>

  <main>
    <aside class="theory-panel">
      <p class="eyebrow">CLASSIFICATION MAP</p>
      <h2>Meaning before format</h2>
      <div class="tree" aria-label="Data classification hierarchy">
        <div class="root">Store variable</div>
        <div class="branch categorical"><b>Categorical</b><span>names or groups</span><small>Nominal · Ordinal</small></div>
        <div class="branch quantitative"><b>Quantitative</b><span>counts or measurements</span><small>Discrete · Continuous</small></div>
      </div>
      <section class="scale-key">
        <h3>Measurement scales</h3>
        <ol><li><b>Nominal</b><span>names only</span></li><li><b>Ordinal</b><span>names + order</span></li><li><b>Interval</b><span>equal differences</span></li><li><b>Ratio</b><span>equal differences + true zero</span></li></ol>
      </section>
      <p class="warning"><b>Classic trap:</b> identifiers can contain digits while remaining categorical. Arithmetic must have meaning before a variable is quantitative.</p>
    </aside>

    <section class="workbench">
      {#if variationComplete}
        <div class="completion">
          <span class="seal">✓</span>
          <p class="eyebrow">VARIATION {variationIndex + 1} COMPLETE</p>
          <h2>{variation.title} classified</h2>
          <p>{courseComplete ? 'All four Superstore variations are complete. You have applied the full classification system across 24 variables.' : CLASSIFICATION_MISSION.competency}</p>
          <div class="summary" role="table" aria-label="Completed classifications">
            {#each variables as item}
              <div role="row"><b role="cell">{item.name}</b><span role="cell">{item.primary} · {item.subtype} · {item.scale}</span></div>
            {/each}
          </div>
          {#if courseComplete}<div class="mastery">✓ Data-types foundation complete</div>{:else}<button class="continue next-variation" on:click={openNextVariation}>Start next variation →</button>{/if}
          <button class="restart" on:click={resetVariation}>Run this variation again</button>
        </div>
      {:else}
        <div class="variation-intro"><p class="eyebrow">VARIATION {variationIndex + 1} OF {CLASSIFICATION_MISSION.variations.length}</p><h2>{variation.title}</h2><p>{variation.description}</p></div>
        <div class="round-meta"><span>VARIABLE {variableIndex + 1} OF {variables.length}</span><span>DECISION {stepIndex + 1} OF {stepOrder.length} · {variationProgress}%</span></div>
        <article class="data-card">
          <div><p class="eyebrow">SUPERSTORE DATA COLUMN</p><h2>{variable.name}</h2><code>{variable.field}</code></div>
          <div class="values">{#each variable.samples as sample}<span>{sample}</span>{/each}</div>
          <p>{variable.context}</p>
        </article>

        <section class="lesson-card">
          <p class="eyebrow">THEORY → PRACTICAL</p>
          <div class="step-label">{question.label}</div>
          <h2>{question.prompt}</h2>
          <p class="theory">{question.theory}</p>
          <div class="options">
            {#each question.options as option}
              <button class:selected={selected === option.value} class:correct={correct && selected === option.value} class:wrong={checked && !correct && selected === option.value} on:click={() => choose(option.value)} disabled={correct}>
                <b>{option.label}</b><span>{option.note}</span>
              </button>
            {/each}
          </div>

          {#if checked}
            <div class:right={correct} class:retry={!correct} class="feedback" role="status">
              {#if correct}<b>Correct.</b> {explanationFor(variable, step)}{:else}<b>Try again.</b> Classify what the values mean in this context—not merely how they look.{/if}
            </div>
          {/if}
          {#if correct}<button class="continue" on:click={continueMission}>{stepIndex === stepOrder.length - 1 ? 'Save variable and continue' : 'Continue to next decision'} →</button>{/if}
        </section>
      {/if}
    </section>
  </main>

  <footer><span>Source-informed learning draft · accessed 21 August 2026</span><span>{#each CLASSIFICATION_MISSION.sources as source, index}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>{index < CLASSIFICATION_MISSION.sources.length - 1 ? ' · ' : ''}{/each}</span></footer>
</section>

<style>
  :global(html),:global(body){overflow:auto;background:#171510}:global(body){position:static}.mission-shell{min-height:100vh;max-width:none;padding:18px clamp(14px,3vw,36px) 30px;background:radial-gradient(circle at 45% 0,#403326,#171510 58%);overflow:auto;color:#f2eee5}header{max-width:1260px;margin:0 auto 14px;display:flex;align-items:center;justify-content:space-between;gap:18px}.identity{display:flex;align-items:center;gap:13px}.role{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:#a85a34;color:white;font:900 9px/1.15 var(--qx-font);text-align:center}.identity p{margin:0 0 3px;color:#bcb19e;font:800 9px var(--qx-font);letter-spacing:.1em}.identity h1{margin:0;color:white;font:700 27px Georgia,serif}nav{display:flex;gap:15px}nav a,footer a{color:#e2c7b7;font:800 12px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}.progress{max-width:1260px;height:5px;margin:0 auto 13px;border-radius:9px;background:rgba(255,255,255,.1);overflow:hidden}.progress span{display:block;height:100%;background:#73c44a;transition:width .35s ease}.variation-picker{max-width:1260px;margin:0 auto 16px;display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.variation-picker button{min-height:48px;padding:7px 10px;border:1px solid rgba(255,255,255,.14);border-radius:11px;background:rgba(255,255,255,.07);color:#c8bfb0;display:flex;align-items:center;gap:9px;cursor:pointer;text-align:left}.variation-picker button span{display:grid;place-items:center;flex:0 0 25px;height:25px;border-radius:50%;background:#63584a;color:white;font:900 10px var(--qx-font)}.variation-picker button b{font:800 10.5px var(--qx-font)}.variation-picker button.active{border-color:#d19775;background:#4e3b2d;color:white}.variation-picker button.active span{background:#a85a34}.variation-picker button.done:not(.active){border-color:#66864f;color:#dcebd1}.variation-picker button.done span{background:#5a9838}.variation-picker button:focus-visible{outline:3px solid #d19775;outline-offset:2px}
  main{max-width:1260px;margin:0 auto;display:grid;grid-template-columns:330px minmax(0,1fr);gap:16px;align-items:start}.theory-panel,.workbench{border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#f1ede4;color:#241f16}.theory-panel{padding:22px;position:sticky;top:16px}.eyebrow{margin:0 0 6px;color:#8c4c2e;font:900 9.5px var(--qx-font);letter-spacing:.12em}.theory-panel h2,.completion h2{margin:0;font:700 25px Georgia,serif}.tree{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:20px 0}.root{grid-column:1/-1;padding:11px;border-radius:10px;background:#241f16;color:white;text-align:center;font:900 12px var(--qx-font)}.branch{position:relative;padding:13px 10px;border:1px solid #d8d0be;border-radius:11px;text-align:center}.branch:before{content:"";position:absolute;left:50%;top:-11px;width:1px;height:10px;background:#bcb19e}.branch b,.branch span,.branch small{display:block}.branch b{font:900 12px var(--qx-font)}.branch span{margin:4px 0 9px;color:#726a58;font:600 10px/1.25 var(--qx-font)}.branch small{padding-top:8px;border-top:1px solid #d8d0be;color:#8c4c2e;font:800 9px var(--qx-font)}.categorical{background:#f4e7dc}.quantitative{background:#e6eee0}.scale-key{padding-top:17px;border-top:1px solid #d8d0be}.scale-key h3{margin:0 0 8px;font:700 16px Georgia,serif}.scale-key ol{margin:0;padding:0;list-style:none}.scale-key li{display:flex;justify-content:space-between;gap:10px;padding:7px 0;border-bottom:1px solid #e0d9ca;font:700 10.5px var(--qx-font)}.scale-key li span{color:#726a58;font-weight:600}.warning{margin:17px 0 0;padding:12px;border-radius:10px;background:#f2dfd3;color:#744029;font:650 11.5px/1.45 var(--qx-font)}
  .workbench{min-height:660px;padding:clamp(18px,3vw,34px)}.variation-intro{margin-bottom:15px;padding-bottom:15px;border-bottom:1px solid #d8d0be}.variation-intro h2{margin:0;font:700 25px Georgia,serif}.variation-intro>p:last-child{margin:6px 0 0;color:#625a49;font:600 12px/1.4 var(--qx-font)}.round-meta{display:flex;justify-content:space-between;color:#7c725f;font:900 9px var(--qx-font);letter-spacing:.09em}.data-card{display:grid;grid-template-columns:minmax(190px,1fr) auto;gap:16px;margin-top:16px;padding:18px;border:1px solid #d8d0be;border-radius:14px;background:#fbf8f1}.data-card h2{margin:1px 0 7px;font:700 24px Georgia,serif}.data-card code{color:#8c4c2e;font:800 11px var(--qx-font)}.data-card>p{grid-column:1/-1;margin:0;padding-top:13px;border-top:1px solid #e1dacb;color:#625a49;font:600 12px/1.45 var(--qx-font)}.values{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:7px}.values span{padding:8px 10px;border-radius:8px;background:#e8e1d3;color:#40382c;font:800 11px var(--qx-font)}.lesson-card{margin-top:16px;padding:20px;border-radius:14px;background:white;box-shadow:0 8px 30px rgba(53,43,28,.08)}.step-label{display:inline-block;margin-bottom:10px;padding:6px 9px;border-radius:20px;background:#241f16;color:white;font:900 9px var(--qx-font);letter-spacing:.06em;text-transform:uppercase}.lesson-card h2{margin:0;font:700 23px Georgia,serif}.theory{margin:9px 0 17px;color:#625a49;font:600 12.5px/1.5 var(--qx-font)}.options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.options button{min-height:76px;padding:12px;border:2px solid #ded6c6;border-radius:12px;background:#fbf8f1;color:#241f16;text-align:left;cursor:pointer}.options button b,.options button span{display:block}.options button b{font:900 13px var(--qx-font)}.options button span{margin-top:5px;color:#726a58;font:600 10.5px/1.3 var(--qx-font)}.options button:hover,.options button.selected{border-color:#a85a34}.options button.correct{border-color:#5a9838;background:#e8f1df}.options button.wrong{border-color:#b43b28;background:#f7dfda}.options button:focus-visible,.continue:focus-visible,.restart:focus-visible{outline:3px solid #a85a34;outline-offset:2px}.options button:disabled{cursor:default}.feedback{margin-top:13px;padding:11px 13px;border-radius:10px;font:650 12px/1.45 var(--qx-font)}.feedback.right{background:#e8f1df;color:#3c6427}.feedback.retry{background:#f7dfda;color:#922c1d}.continue,.restart{width:100%;min-height:46px;margin-top:12px;border:0;border-radius:11px;background:#a85a34;color:white;font:900 12px var(--qx-font);cursor:pointer}.next-variation{background:#5a9838}.restart{background:white;color:#4f4738;border:1px solid #d8d0be}.completion{max-width:720px;margin:20px auto;text-align:center}.seal{display:grid;place-items:center;width:58px;height:58px;margin:0 auto 14px;border-radius:50%;background:#5a9838;color:white;font:900 27px var(--qx-font)}.completion>p:not(.eyebrow){color:#625a49;font:600 13px/1.5 var(--qx-font)}.summary{margin-top:22px;border:1px solid #d8d0be;border-radius:12px;overflow:hidden;text-align:left}.summary div{display:grid;grid-template-columns:1fr 1.25fr;gap:14px;padding:11px 13px;border-bottom:1px solid #e1dacb;font:700 11px var(--qx-font)}.summary div:last-child{border-bottom:0}.summary span{color:#716856;text-transform:capitalize}.mastery{margin-top:14px;padding:13px;border-radius:11px;background:#e8f1df;color:#3c6427;font:900 12px var(--qx-font)}footer{max-width:1260px;margin:14px auto 0;display:flex;justify-content:space-between;gap:16px;color:#9f9585;font:650 9.5px/1.5 var(--qx-font)}footer a{font-size:9.5px}
  @media(max-width:820px){main{grid-template-columns:1fr}.theory-panel{position:static}.workbench{min-height:0}.tree{grid-template-columns:1fr 1fr}footer{flex-direction:column}}
  @media(max-width:600px){.variation-picker{grid-template-columns:1fr 1fr}.variation-picker button{min-height:42px}.mission-shell{padding:13px 10px 25px}.identity h1{font-size:21px}.role{width:42px;height:42px}nav{flex-direction:column;gap:6px;align-items:flex-end}.theory-panel,.workbench{padding:16px}.data-card{grid-template-columns:1fr}.values{justify-content:flex-start}.options{grid-template-columns:1fr}.summary div{grid-template-columns:1fr;gap:4px}.workbench{min-height:0}}
  @media(prefers-reduced-motion:reduce){.progress span{transition:none}}
</style>
