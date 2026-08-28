<script>
  import { DSA_INTRODUCTION_PREVIEW as lesson } from '../content/dsa-introduction-preview.js';
  let caseIndex = 0;
  let stage = 'cases';
  let lensChoice = null;
  let choice = null;
  let solved = [];
  let transferChoice = null;

  $: current = lesson.cases[caseIndex];
  $: lensCorrect = lensChoice === current?.operation;
  $: correct = choice === current?.answer;
  $: structure = lesson.structures.find(item => item.id === current?.answer);
  $: transferCorrect = transferChoice === lesson.transfer.correct;

  function chooseLens(id) { lensChoice = id; choice = null; }
  function choose(id) { if (lensCorrect) choice = id; }
  function next() {
    if (!correct) return;
    solved = [...solved, current.id];
    if (caseIndex === lesson.cases.length - 1) stage = 'transfer';
    else { caseIndex += 1; lensChoice = null; choice = null; }
  }
  function finish() { if (transferCorrect) stage = 'complete'; }
  function reset() { caseIndex = 0; stage = 'cases'; lensChoice = null; choice = null; solved = []; transferChoice = null; }
</script>

<section class="lab" aria-labelledby="orientation-lab-heading">
  <div class="lab-head">
    <div><p class="eyebrow">PLAY · PROBLEM SHAPES</p><h2 id="orientation-lab-heading">Choose the organisation</h2></div>
    <strong class="score">{stage === 'complete' ? 'DONE' : stage === 'transfer' ? 'CHECK' : `${String(caseIndex + 1).padStart(2,'0')} / 04`}</strong>
  </div>
  <div class="progress" aria-label={`${stage === 'cases' ? caseIndex + 1 : 4} of 4 requests`}>
    {#each lesson.cases as item, index}<span class:done={stage !== 'cases' || index < caseIndex} class:current={stage === 'cases' && index === caseIndex}></span>{/each}
  </div>

  {#if stage === 'cases'}
    <div class="case-card">
      <div><span>REQUEST {String(caseIndex + 1).padStart(2,'0')}</span><em>OPERATION LENS</em></div>
      <p>{current.prompt}</p>
      <small><strong>Constraint</strong>{current.constraint}</small>
      <strong>{current.question}</strong>
    </div>

    <p class="step-label"><span>STEP 1</span> Identify the work that controls the decision</p>
    <div class="lens-options">
      {#each lesson.operationLenses as lens}
        <button type="button" aria-pressed={lensChoice === lens.id} class:chosen={lensChoice === lens.id} class:right={lensCorrect && lensChoice === lens.id} on:click={() => chooseLens(lens.id)}>
          <span>{lens.verb}</span><strong>{lens.label}</strong>
        </button>
      {/each}
    </div>
    {#if lensChoice && !lensCorrect}<p class="feedback retry" aria-live="polite">That operation is present in some systems, but it does not preserve the stated constraint. Read the constraint once more.</p>{/if}

    {#if lensCorrect}
      <p class="step-label earned"><span>STEP 2</span> Now choose a shape that supports that work</p>
      <div class="choices">
        {#each lesson.structures as option}
          <button type="button" aria-pressed={choice === option.id} class:chosen={choice === option.id} class:right={correct && choice === option.id} on:click={() => choose(option.id)}>
            <span class="choice-top" aria-hidden="true"><b>{String(lesson.structures.indexOf(option) + 1).padStart(2,'0')}</b><span class={`glyph ${option.id}`}>
              {#if option.id === 'row'}<i>0</i><i>1</i><i>2</i><i>3</i>
              {:else if option.id === 'pile'}<i></i><i></i><i></i>
              {:else if option.id === 'line'}<i></i><i></i><i></i><em>→</em>
              {:else}<svg viewBox="0 0 82 34"><path d="M7 27L29 6L52 25L75 7"/><circle cx="7" cy="27" r="4"/><circle cx="29" cy="6" r="4"/><circle cx="52" cy="25" r="4"/><circle cx="75" cy="7" r="4"/></svg>{/if}
            </span></span>
            <strong>{option.informal}</strong>
            <small>Choose from the shape, not its formal name.</small>
          </button>
        {/each}
      </div>
      {#if choice && !correct}<p class="feedback retry" aria-live="polite">The operation is right, but this shape does not keep the required item or relationship ready. Trace what would leave or be reached first.</p>{/if}
      {#if correct}
        <div class={`reveal ${structure.id}`} aria-live="polite">
          <div class="motion" aria-hidden="true">
            {#if structure.id === 'row'}<i>0</i><i>1</i><i class="focus">2</i><i>3</i>
            {:else if structure.id === 'pile'}<i></i><i></i><i class="focus">TOP</i>
            {:else if structure.id === 'line'}<i>A</i><i>B</i><i>C</i><b>DESK</b>
            {:else}<i>A</i><i>B</i><i>C</i><i>D</i><svg viewBox="0 0 220 70"><path d="M20 50L80 18L140 46L200 14"/></svg>{/if}
          </div>
          <p><span>Formal name</span><strong>{structure.formal}</strong>{current.reveal}<small><b>Honest trade-off:</b> {structure.tradeoff}</small></p>
        </div>
        <button type="button" class="next" on:click={next}>{caseIndex === lesson.cases.length - 1 ? 'Take the principle check →' : 'Next request →'}</button>
      {/if}
    {/if}
  {:else if stage === 'transfer'}
    <div class="transfer">
      <p class="eyebrow">TRANSFER CHECK · NO NEW TERMINOLOGY</p>
      <h3>{lesson.transfer.prompt}</h3>
      <p>The examples are finished. Choose the principle that should still work when the problem is unfamiliar.</p>
      <div class="transfer-options">
        {#each lesson.transfer.answers as answer}
          <button type="button" aria-pressed={transferChoice === answer.id} class:chosen={transferChoice === answer.id} class:right={transferCorrect && transferChoice === answer.id} on:click={() => transferChoice = answer.id}>{answer.label}</button>
        {/each}
      </div>
      {#if transferChoice && !transferCorrect}<p class="feedback retry" aria-live="polite">Familiarity is useful, but it cannot make one structure fit every job. Return to the operation and its trade-offs.</p>{/if}
      {#if transferCorrect}<p class="feedback success" aria-live="polite">Exactly. The problem supplies the operation and constraints; the structure is a reasoned choice.</p><button type="button" class="next" on:click={finish}>Build my DSA toolkit →</button>{/if}
    </div>
  {:else}
    <div class="complete">
      <p class="eyebrow">PATTERN FOUND</p><h3>Four problems. Four useful shapes.</h3>
      <p>You identified the important operation, protected the constraint, selected a useful shape and acknowledged its trade-off. That four-part decision is the beginning of DSA.</p>
      <div class="toolkit">{#each lesson.structures as item}<div><span>{item.informal}</span><strong>{item.formal}</strong><small>{item.operation}</small></div>{/each}</div>
      <button type="button" class="next" on:click={reset}>Play the four requests again</button>
    </div>
  {/if}
</section>

<style>
  .lab { padding:clamp(18px,4vw,32px); border:3px solid #000; background:var(--qx-ink); color:var(--qx-ink-text); box-shadow:8px 8px 0 #000; }
  .lab-head { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; }
  .eyebrow { margin:0 0 4px; color:var(--qx-ink-accent); font-size:12px; font-weight:900; letter-spacing:.14em; }
  h2 { margin:0; font-size:clamp(25px,5vw,38px); }
  .score { color:var(--qx-ink-accent); font-size:22px; }
  .progress { display:grid; grid-template-columns:repeat(4,1fr); gap:5px; margin:18px 0 22px; }
  .progress span { height:5px; background:var(--qx-ink-line-2); }
  .progress span.done { background:var(--qx-ink-good); }
  .progress span.current { background:var(--qx-ink-accent); }
  .case-card { margin:0 0 16px; padding:19px; border:2px solid #000; background:var(--qx-slip); color:var(--qx-slip-ink); box-shadow:4px 4px 0 #000; }
  .case-card > div { display:flex; justify-content:space-between; gap:12px; }
  .case-card span { color:var(--qx-accent-text); font-size:11px; font-weight:900; letter-spacing:.13em; }
  .case-card em { color:var(--qx-slip-dim); font-size:11px; font-weight:900; letter-spacing:.12em; font-style:normal; }
  .case-card p { margin:9px 0; font-size:19px; line-height:1.45; }
  .case-card > small { display:block; margin:10px 0; padding:10px 12px; border-left:4px solid var(--qx-accent); background:var(--qx-accent-soft-2); color:var(--qx-slip-dim); font-size:13px; line-height:1.45; }
  .case-card > small strong { display:block; margin-bottom:2px; color:var(--qx-slip-ink); font-size:11px; letter-spacing:.1em; text-transform:uppercase; }
  .case-card > strong { display:block; padding-top:10px; border-top:1px solid var(--qx-slip-line); }
  .step-label { display:flex; gap:9px; align-items:center; margin:18px 0 9px; color:var(--qx-ink-text-2); font-size:13px; }
  .step-label span { padding:4px 6px; border:1px solid var(--qx-ink-accent); color:var(--qx-ink-accent); font-size:11px; font-weight:900; letter-spacing:.1em; }
  .step-label.earned { color:var(--qx-ink-text); }
  .lens-options { display:grid; grid-template-columns:1fr 1fr; gap:7px; }
  .lens-options button { min-height:70px; padding:12px; border:1px solid var(--qx-ink-line-2); background:var(--qx-ink-panel); color:var(--qx-ink-text); text-align:left; cursor:pointer; }
  .lens-options button:hover,.lens-options button:focus-visible,.transfer-options button:hover,.transfer-options button:focus-visible { border-color:var(--qx-ink-accent); outline:none; }
  .lens-options button.chosen,.transfer-options button.chosen { border-color:var(--qx-ink-accent); background:var(--qx-ink-accent-soft); }
  .lens-options button.right,.transfer-options button.right { border-color:var(--qx-ink-good); }
  .lens-options span,.lens-options strong { display:block; }
  .lens-options span { margin-bottom:4px; color:var(--qx-ink-accent); font-size:11px; font-weight:900; letter-spacing:.11em; }
  .choices { display:grid; grid-template-columns:1fr 1fr; gap:9px; }
  .choices button { min-height:142px; padding:14px; border:1px solid var(--qx-ink-line-2); background:var(--qx-ink-panel); color:var(--qx-ink-text); text-align:left; cursor:pointer; transition:transform .16s ease,border-color .16s ease,background .16s ease; }
  .choices button:hover,.choices button:focus-visible { border-color:var(--qx-ink-accent); outline:none; transform:translateY(-2px); }
  .choices button.chosen { border-color:var(--qx-ink-accent); background:var(--qx-ink-accent-soft); }
  .choices button.right { border-color:var(--qx-ink-good); color:var(--qx-ink-good); }
  .choices strong,.choices small { display:block; }
  .choices small { margin-top:4px; color:var(--qx-ink-text-2); }
  .choice-top { display:flex; justify-content:space-between; align-items:flex-start; min-height:53px; margin-bottom:10px; }
  .choice-top > b { color:var(--qx-ink-text-dim); font-size:11px; }
  .glyph { display:flex; align-items:center; justify-content:flex-end; width:104px; min-height:42px; color:var(--qx-ink-accent); }
  .glyph i { display:block; font-style:normal; }
  .glyph.row i { display:grid; place-items:center; width:22px; height:22px; border:1px solid var(--qx-ink-text-2); font:900 11px var(--qx-font); }
  .glyph.row i:nth-child(3) { border-color:var(--qx-ink-accent); background:var(--qx-ink-accent-soft); }
  .glyph.pile { flex-direction:column-reverse; gap:2px; }
  .glyph.pile i { width:68px; height:8px; border:1px solid var(--qx-ink-text-2); }
  .glyph.pile i:last-child { border-color:var(--qx-ink-accent); }
  .glyph.line { gap:4px; }
  .glyph.line i { width:18px; height:18px; border:1px solid var(--qx-ink-text-2); border-radius:50%; }
  .glyph.line em { margin-left:3px; color:var(--qx-ink-accent); font-size:22px; font-style:normal; }
  .glyph.network svg { width:82px; height:34px; }
  .glyph.network path { fill:none; stroke:var(--qx-ink-accent); stroke-width:2; }
  .glyph.network circle { fill:var(--qx-ink-panel); stroke:var(--qx-ink-text); stroke-width:1.5; }
  .feedback { margin:14px 0 0; padding:10px 12px; border-left:4px solid currentColor; }
  .retry { color:var(--qx-ink-bad); }
  .success { color:var(--qx-ink-good); }
  .reveal { display:grid; grid-template-columns:1fr 1fr; gap:18px; align-items:center; margin-top:16px; padding:16px; border:1px solid var(--qx-ink-good); background:rgba(159,208,180,.08); }
  .reveal p { margin:0; color:var(--qx-ink-text-2); }
  .reveal p span,.reveal p strong { display:block; }
  .reveal p span { font-size:11px; font-weight:900; letter-spacing:.12em; }
  .reveal p strong { margin:3px 0 8px; color:var(--qx-ink-good); font-size:22px; }
  .reveal p small { display:block; margin-top:9px; padding-top:9px; border-top:1px solid var(--qx-ink-line-2); color:var(--qx-ink-text-2); line-height:1.4; }
  .motion { position:relative; min-height:75px; display:flex; align-items:center; justify-content:center; gap:4px; }
  .motion i,.motion b { display:grid; place-items:center; width:38px; height:38px; border:2px solid var(--qx-ink-text-2); color:var(--qx-ink-text); font:900 11px var(--qx-font); font-style:normal; }
  .motion .focus { border-color:var(--qx-ink-accent); background:var(--qx-ink-accent-soft); animation:pulse 1.1s ease-in-out infinite alternate; }
  .reveal.pile .motion { flex-direction:column-reverse; gap:2px; }
  .reveal.pile .motion i { width:95px; height:25px; }
  .reveal.pile .motion .focus { animation:lift 1.2s ease-in-out infinite alternate; }
  .reveal.line .motion i { border-radius:50%; animation:flow 1.5s ease-in-out infinite; }
  .reveal.line .motion b { width:48px; border-color:var(--qx-ink-accent); }
  .reveal.network .motion { justify-content:space-around; }
  .reveal.network .motion i { position:relative; z-index:1; border-radius:50%; background:var(--qx-ink-panel); }
  .reveal.network .motion svg { position:absolute; inset:0; width:100%; height:100%; }
  .reveal.network path { fill:none; stroke:var(--qx-ink-accent); stroke-width:4; stroke-dasharray:250; animation:route 1.8s linear infinite; }
  .next { min-height:46px; margin-top:14px; padding:10px 16px; border:2px solid #000; background:var(--qx-ink-accent); color:#171510; font:900 14px var(--qx-font); box-shadow:4px 4px 0 #000; cursor:pointer; }
  .complete h3 { margin:8px 0; font-size:clamp(27px,5vw,42px); }
  .complete > p:not(.eyebrow) { max-width:680px; color:var(--qx-ink-text-2); font-size:18px; line-height:1.55; }
  .transfer { padding:clamp(18px,4vw,30px); border:1px solid var(--qx-ink-line-2); background:var(--qx-ink-panel); }
  .transfer h3 { max-width:650px; margin:8px 0; font-size:clamp(25px,5vw,38px); }
  .transfer > p:not(.eyebrow):not(.feedback) { color:var(--qx-ink-text-2); line-height:1.55; }
  .transfer-options { display:grid; gap:8px; margin-top:20px; }
  .transfer-options button { min-height:54px; padding:12px 14px; border:1px solid var(--qx-ink-line-2); background:var(--qx-ink-well); color:var(--qx-ink-text); text-align:left; font:700 14px var(--qx-font); cursor:pointer; }
  .toolkit { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:20px; }
  .toolkit div { padding:14px; border:1px solid var(--qx-ink-line-2); }
  .toolkit span,.toolkit strong,.toolkit small { display:block; }
  .toolkit span,.toolkit small { color:var(--qx-ink-text-2); }
  .toolkit strong { margin:3px 0; color:var(--qx-ink-accent); }
  @keyframes pulse { to { transform:scale(1.1); } }
  @keyframes lift { to { transform:translateY(-10px); } }
  @keyframes flow { 50% { transform:translateX(6px); } }
  @keyframes route { from { stroke-dashoffset:250; } to { stroke-dashoffset:0; } }
  @media(max-width:620px) { .lens-options,.choices,.toolkit,.reveal { grid-template-columns:1fr; } .choices button { min-height:124px; } }
  @media(prefers-reduced-motion:reduce) { .choices button { transition:none; } .motion .focus,.reveal.pile .motion .focus,.reveal.line .motion i,.reveal.network path { animation:none; } }
</style>
