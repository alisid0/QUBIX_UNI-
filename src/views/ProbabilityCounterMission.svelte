<script>
  import MissionMasthead from '../lib/components/game/MissionMasthead.svelte';
  import { recordCompletion } from '../lib/game/progress.js';
  import { PROBABILITY_COUNTER_MISSION as mission, includedInCoffeeEvent } from '../lib/game/probability-counter-mission.js';

  const labels = { coffee: 'Coffee only', food: 'Food only', both: 'Both', neither: 'Neither' };
  const numeratorOptions = [6, 9, 20];
  const denominatorOptions = [9, 11, 20];
  const percentOptions = [30, 45, 55];
  const decimalOptions = [0.045, 0.45, 4.5];

  let selected = [];
  let stage = 0;
  let choice = null;
  let feedback = '';
  let complete = false;

  $: progress = complete ? 100 : Math.round((stage / 5) * 100);
  $: if (complete) recordCompletion('probability-counter');

  function toggle(id) {
    if (stage !== 0) return;
    selected = selected.includes(id) ? selected.filter(value => value !== id) : [...selected, id];
    feedback = '';
  }

  function checkCards() {
    const expected = mission.visits.filter(([, outcome]) => includedInCoffeeEvent(outcome)).map(([id]) => id);
    const right = selected.length === expected.length && expected.every(id => selected.includes(id));
    feedback = right
      ? 'Exactly. Coffee only and both belong to this event. You have selected 9 visits.'
      : 'Not yet. Ask one question of every card: did this visit include coffee? “Both” still includes coffee.';
    if (right) stage = 1;
  }

  function answer(value, expected, success) {
    choice = value;
    if (value !== expected) {
      feedback = stage === 1
        ? 'Count only the selected visits. That count is the numerator.'
        : stage === 2
          ? 'The denominator is the complete relevant set—all recorded visits, not only the selected ones.'
          : 'Use the same value in a different notation; do not change the evidence.';
      return;
    }
    feedback = success;
    stage += 1;
    choice = null;
    if (stage === 5) complete = true;
  }

  function restart() {
    selected = [];
    stage = 0;
    choice = null;
    feedback = '';
    complete = false;
  }
</script>

<svelte:head>
  <title>{mission.title} | Qubix University</title>
  <meta name="description" content={mission.competency} />
</svelte:head>

<section class="mission-shell qx-shell probability-mission">
  <MissionMasthead eyebrow={`${mission.id} · COUNTER ASSIGNMENT`} title={mission.title}
    roomId="reporting" roomName="Reporting · Probability counter" {progress}
    meta={`${complete ? 'SIGNED OFF' : `STEP ${stage + 1} OF 5`} · CHAPTER 08`} />

  <main>
    <section class="workbench">
      <p class="eyebrow">THE QUESTION</p>
      <h2>{mission.question}</h2>
      <p class="instruction">{stage === 0 ? 'Select every visit that belongs to the event.' : 'Your event is now fixed: coffee only and both count.'}</p>

      <div class="legend" aria-label="Visit outcome legend">
        {#each Object.entries(labels) as [key, label]}
          <span class={key}><i></i>{label}</span>
        {/each}
      </div>

      <div class="visits" aria-label="Twenty recorded shop visits">
        {#each mission.visits as [id, outcome]}
          <button class:selected={selected.includes(id)} class:locked={stage > 0} on:click={() => toggle(id)}
            aria-pressed={selected.includes(id)} disabled={stage > 0}>
            <small>{id}</small><b>{labels[outcome]}</b><span class={outcome}></span>
          </button>
        {/each}
      </div>

      {#if stage === 0}
        <button class="check-cards" on:click={checkCards} disabled={!selected.length}>Check {selected.length || ''} selected visit{selected.length === 1 ? '' : 's'}</button>
      {:else}
        <div class="equation" aria-label="Observed probability calculation">
          <div><span>EVENT COUNT</span><b>{stage > 1 ? mission.numerator : '?'}</b><small>numerator</small></div>
          <strong>÷</strong>
          <div><span>SAMPLE SPACE</span><b>{stage > 2 ? mission.denominator : '?'}</b><small>complete relevant set</small></div>
          <strong>=</strong>
          <div><span>OBSERVED PROBABILITY</span><b>{stage > 3 ? `${mission.percent}%` : '?'}</b><small>{stage > 4 ? mission.decimal.toFixed(2) : 'as a decimal?'}</small></div>
        </div>
      {/if}
    </section>

    <aside class="decision">
      {#if complete}
        <p class="eyebrow">COMPETENCY DEMONSTRATED</p>
        <h2>9 out of 20 is 45%</h2>
        <p>You defined the event, used all twenty visits as the sample space and wrote the same observed probability as <b>9/20</b>, <b>45%</b> and <b>0.45</b>.</p>
        <div class="boundary"><b>What this does not say</b><span>It describes these twenty visits. It does not guarantee what the next visitor will buy.</span></div>
        <a href="?mode=game&mission=shared-book&chapter=8&session=2">Next reading: Given what? →</a>
        <button class="restart" on:click={restart}>Restart practice</button>
      {:else if stage === 0}
        <p class="eyebrow">STEP 1 · DEFINE THE EVENT</p>
        <h2>Which outcomes count?</h2>
        <p>An event is the outcome—or group of outcomes—named by the question. Classify first; calculate later.</p>
      {:else if stage === 1}
        <p class="eyebrow">STEP 2 · COUNT THE EVENT</p><h2>What is the numerator?</h2>
        <div class="choices">{#each numeratorOptions as value}<button on:click={() => answer(value, mission.numerator, 'Yes. Nine visits included coffee: six coffee-only visits plus three visits with both.')} class:chosen={choice === value}>{value}</button>{/each}</div>
      {:else if stage === 2}
        <p class="eyebrow">STEP 3 · NAME THE WHOLE SET</p><h2>What is the denominator?</h2>
        <p class="term"><b>New term: sample space</b><span>The complete relevant set of possible observed outcomes—in this case, all recorded visits.</span></p>
        <div class="choices">{#each denominatorOptions as value}<button on:click={() => answer(value, mission.denominator, 'Correct. The sample space contains all twenty recorded visits.')} class:chosen={choice === value}>{value}</button>{/each}</div>
      {:else if stage === 3}
        <p class="eyebrow">STEP 4 · MAKE IT A PERCENTAGE</p><h2>9 ÷ 20 is…</h2>
        <div class="choices">{#each percentOptions as value}<button on:click={() => answer(value, mission.percent, 'Correct. Nine out of twenty is forty-five out of one hundred: 45%.')} class:chosen={choice === value}>{value}%</button>{/each}</div>
      {:else}
        <p class="eyebrow">STEP 5 · MATCH THE DECIMAL</p><h2>Which decimal is the same value as 45%?</h2>
        <div class="choices">{#each decimalOptions as value}<button on:click={() => answer(value, mission.decimal, 'Exactly. 45% and 0.45 are two ways to write the same proportion.')} class:chosen={choice === value}>{value}</button>{/each}</div>
      {/if}

      {#if feedback && !complete}<div class:success={stage > 0 && choice === null} class="feedback" role="status">{feedback}</div>{/if}
    </aside>
  </main>

  <footer>Original Qubix fictional shop data · AI_DRAFT for founder review · conditional probability and independence follow in later pairs</footer>
</section>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#e7e0d2}
  main{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(310px,.65fr);gap:22px;align-items:start}
  .workbench,.decision{background:#f8f4ea;border:2px solid #24241e;box-shadow:6px 6px 0 rgba(36,36,30,.12)}
  .workbench{padding:26px}.decision{padding:26px;position:sticky;top:18px}
  .eyebrow{margin:0 0 8px;color:#b5532f;font:900 11px var(--qx-font);letter-spacing:.14em}
  h2{margin:0;font:400 29px/1.08 Georgia,serif;text-wrap:balance}.instruction,.decision>p{color:#5d6259;font:650 13px/1.55 var(--qx-font)}
  .legend{display:flex;flex-wrap:wrap;gap:8px;margin:20px 0 14px}.legend span{display:flex;align-items:center;gap:6px;padding:7px 11px;border:1px solid #bbb3a4;border-radius:999px;font:800 11px var(--qx-font);text-transform:uppercase;letter-spacing:.04em}.legend i,.visits button>span{width:9px;height:9px;border-radius:50%;background:#b5532f}.legend .food i,.visits button>span.food{background:#315f48}.legend .both i,.visits button>span.both{background:#bf7a17}.legend .neither i,.visits button>span.neither{background:#7b7d75}
  .visits{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}.visits button{min-height:86px;padding:10px;display:grid;grid-template-columns:1fr auto;gap:5px;text-align:left;border:1px solid #aaa497;background:#fff;color:#24241e;cursor:pointer}.visits button:hover{border-color:#b5532f}.visits button.selected{outline:3px solid #b5532f;background:#f4e3d8}.visits button.locked:not(.selected){opacity:.45}.visits small{font:800 11px var(--qx-font);color:#75786f}.visits b{grid-column:1/-1;font:800 12px/1.2 var(--qx-font)}
  .check-cards,.decision>a,.restart{width:100%;min-height:46px;margin-top:18px;border:0;border-radius:999px;background:#b5532f;color:#fff;font:900 11px var(--qx-font);letter-spacing:.06em;text-transform:uppercase;cursor:pointer}.check-cards:disabled{opacity:.4;cursor:not-allowed}
  .equation{margin-top:20px;padding:18px;display:grid;grid-template-columns:1fr auto 1fr auto 1.35fr;align-items:center;gap:12px;background:#e4eadf;border-left:5px solid #315f48}.equation>div{display:grid;gap:3px}.equation span,.equation small{font:850 11px/1.3 var(--qx-font);letter-spacing:.08em;color:#566057}.equation b{font:400 28px Georgia,serif}.equation strong{font:400 25px Georgia,serif}
  .choices{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:20px}.choices button{min-height:64px;border:1px solid #8f8c82;background:#fff;color:#24241e;font:800 18px Georgia,serif;cursor:pointer}.choices button:hover,.choices button.chosen{border:2px solid #b5532f;background:#f4e3d8}
  .term,.boundary{display:grid;gap:5px;margin:18px 0 0;padding:14px 15px;border-left:5px solid #315f48;background:#e4eadf}.term b,.boundary b{color:#315f48;font:900 11px var(--qx-font);letter-spacing:.08em;text-transform:uppercase}.term span,.boundary span{font:650 12px/1.5 var(--qx-font)}
  .feedback{margin-top:14px;padding:13px 14px;border-left:5px solid #b5532f;background:#f4e0d7;color:#773c2a;font:700 12px/1.5 var(--qx-font)}.feedback.success{border-color:#315f48;background:#e4eadf;color:#315f48}
  .decision>a{display:grid;place-items:center;box-sizing:border-box;text-decoration:none;background:#315f48}.restart{background:transparent;color:#315f48;border:1px solid #315f48;margin-top:9px}.decision>b{font-family:var(--qx-font)}
  footer{padding:22px 0;color:#6b6e65;font:700 11px/1.5 var(--qx-font);letter-spacing:.04em}
  @media(max-width:860px){main{grid-template-columns:1fr}.decision{position:static}.visits{grid-template-columns:repeat(4,minmax(0,1fr))}.equation{grid-template-columns:1fr auto 1fr}.equation>strong:nth-of-type(2),.equation>div:last-child{grid-column:auto}.equation>div:last-child{grid-column:1/-1}}
  @media(max-width:520px){.workbench,.decision{padding:18px}.visits{grid-template-columns:repeat(2,minmax(0,1fr))}.visits button{min-height:72px}.choices{grid-template-columns:1fr}.equation{grid-template-columns:1fr auto 1fr;gap:8px}}
</style>
