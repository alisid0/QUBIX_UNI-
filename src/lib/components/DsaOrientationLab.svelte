<script>
  import { DSA_INTRODUCTION_PREVIEW as lesson } from '../content/dsa-introduction-preview.js';
  let caseIndex = 0;
  let choice = null;
  let solved = [];
  let complete = false;

  $: current = lesson.cases[caseIndex];
  $: correct = choice === current?.answer;
  $: structure = lesson.structures.find(item => item.id === current?.answer);

  function choose(id) { choice = id; }
  function next() {
    if (!correct) return;
    solved = [...solved, current.id];
    if (caseIndex === lesson.cases.length - 1) complete = true;
    else { caseIndex += 1; choice = null; }
  }
  function reset() { caseIndex = 0; choice = null; solved = []; complete = false; }
</script>

<section class="lab" aria-labelledby="orientation-lab-heading">
  <div class="lab-head">
    <div><p class="eyebrow">PLAY · PROBLEM SHAPES</p><h2 id="orientation-lab-heading">Choose the organisation</h2></div>
    <strong class="score">{String(complete ? 4 : caseIndex + 1).padStart(2,'0')} / 04</strong>
  </div>
  <div class="progress" aria-label={`${complete ? 4 : caseIndex + 1} of 4 requests`}>
    {#each lesson.cases as item, index}<span class:done={complete || index < caseIndex} class:current={!complete && index === caseIndex}></span>{/each}
  </div>

  {#if !complete}
    <div class="case-card"><div><span>REQUEST {String(caseIndex + 1).padStart(2,'0')}</span><em>OPERATION LENS</em></div><p>{current.prompt}</p><strong>{current.question}</strong></div>
    <div class="choices">
      {#each lesson.structures as option}
        <button class:chosen={choice === option.id} class:right={correct && choice === option.id} on:click={() => choose(option.id)}>
          <span class="choice-top" aria-hidden="true"><b>{String(lesson.structures.indexOf(option) + 1).padStart(2,'0')}</b><span class={`glyph ${option.id}`}>
            {#if option.id === 'row'}<i>0</i><i>1</i><i>2</i><i>3</i>
            {:else if option.id === 'pile'}<i></i><i></i><i></i>
            {:else if option.id === 'line'}<i></i><i></i><i></i><em>→</em>
            {:else}<svg viewBox="0 0 82 34"><path d="M7 27L29 6L52 25L75 7"/><circle cx="7" cy="27" r="4"/><circle cx="29" cy="6" r="4"/><circle cx="52" cy="25" r="4"/><circle cx="75" cy="7" r="4"/></svg>{/if}
          </span></span>
          <strong>{option.informal}</strong>
          <small>{option.operation}</small>
        </button>
      {/each}
    </div>
    {#if choice && !correct}<p class="feedback retry" aria-live="polite">That shape supports different work. Return to the request and underline the operation that matters most.</p>{/if}
    {#if correct}
      <div class={`reveal ${structure.id}`} aria-live="polite">
        <div class="motion" aria-hidden="true">
          {#if structure.id === 'row'}<i>0</i><i>1</i><i class="focus">2</i><i>3</i>
          {:else if structure.id === 'pile'}<i></i><i></i><i class="focus">TOP</i>
          {:else if structure.id === 'line'}<i>A</i><i>B</i><i>C</i><b>DESK</b>
          {:else}<i>A</i><i>B</i><i>C</i><i>D</i><svg viewBox="0 0 220 70"><path d="M20 50L80 18L140 46L200 14"/></svg>{/if}
        </div>
        <p><span>Formal name</span><strong>{structure.formal}</strong>{current.reveal}</p>
      </div>
      <button class="next" on:click={next}>{caseIndex === lesson.cases.length - 1 ? 'Show the toolkit' : 'Next request →'}</button>
    {/if}
  {:else}
    <div class="complete">
      <p class="eyebrow">PATTERN FOUND</p><h3>Four problems. Four useful shapes.</h3>
      <p>You did not choose by fashion or familiarity. You identified the important operation, then selected an organisation that supports it. That decision is the beginning of DSA.</p>
      <div class="toolkit">{#each lesson.structures as item}<div><span>{item.informal}</span><strong>{item.formal}</strong><small>{item.operation}</small></div>{/each}</div>
      <button class="next" on:click={reset}>Play the four requests again</button>
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
  .case-card em { color:var(--qx-slip-dim); font-size:10px; font-weight:900; letter-spacing:.12em; font-style:normal; }
  .case-card p { margin:9px 0; font-size:19px; line-height:1.45; }
  .case-card > strong { display:block; padding-top:10px; border-top:1px solid var(--qx-slip-line); }
  .choices { display:grid; grid-template-columns:1fr 1fr; gap:9px; }
  .choices button { min-height:142px; padding:14px; border:1px solid var(--qx-ink-line-2); background:var(--qx-ink-panel); color:var(--qx-ink-text); text-align:left; cursor:pointer; transition:transform .16s ease,border-color .16s ease,background .16s ease; }
  .choices button:hover,.choices button:focus-visible { border-color:var(--qx-ink-accent); outline:none; transform:translateY(-2px); }
  .choices button.chosen { border-color:var(--qx-ink-accent); background:var(--qx-ink-accent-soft); }
  .choices button.right { border-color:var(--qx-ink-good); color:var(--qx-ink-good); }
  .choices strong,.choices small { display:block; }
  .choices small { margin-top:4px; color:var(--qx-ink-text-2); }
  .choice-top { display:flex; justify-content:space-between; align-items:flex-start; min-height:53px; margin-bottom:10px; }
  .choice-top > b { color:var(--qx-ink-text-dim); font-size:10px; }
  .glyph { display:flex; align-items:center; justify-content:flex-end; width:104px; min-height:42px; color:var(--qx-ink-accent); }
  .glyph i { display:block; font-style:normal; }
  .glyph.row i { display:grid; place-items:center; width:22px; height:22px; border:1px solid var(--qx-ink-text-2); font:900 8px var(--qx-font); }
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
  .reveal { display:grid; grid-template-columns:1fr 1fr; gap:18px; align-items:center; margin-top:16px; padding:16px; border:1px solid var(--qx-ink-good); background:rgba(159,208,180,.08); }
  .reveal p { margin:0; color:var(--qx-ink-text-2); }
  .reveal p span,.reveal p strong { display:block; }
  .reveal p span { font-size:11px; font-weight:900; letter-spacing:.12em; }
  .reveal p strong { margin:3px 0 8px; color:var(--qx-ink-good); font-size:22px; }
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
  .toolkit { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:20px; }
  .toolkit div { padding:14px; border:1px solid var(--qx-ink-line-2); }
  .toolkit span,.toolkit strong,.toolkit small { display:block; }
  .toolkit span,.toolkit small { color:var(--qx-ink-text-2); }
  .toolkit strong { margin:3px 0; color:var(--qx-ink-accent); }
  @keyframes pulse { to { transform:scale(1.1); } }
  @keyframes lift { to { transform:translateY(-10px); } }
  @keyframes flow { 50% { transform:translateX(6px); } }
  @keyframes route { from { stroke-dashoffset:250; } to { stroke-dashoffset:0; } }
  @media(max-width:620px) { .choices,.toolkit,.reveal { grid-template-columns:1fr; } .choices button { min-height:124px; } }
  @media(prefers-reduced-motion:reduce) { .choices button { transition:none; } .motion .focus,.reveal.pile .motion .focus,.reveal.line .motion i,.reveal.network path { animation:none; } }
</style>
