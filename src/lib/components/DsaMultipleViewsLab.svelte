<script>
  import { DSA_INTRODUCTION_PREVIEW as lesson } from '../content/dsa-introduction-preview.js';

  const extension = lesson.extension;
  let taskIndex = 0;
  let choice = null;
  let solved = [];

  $: current = extension.tasks[taskIndex];
  $: correct = choice === current?.answer;
  $: complete = solved.length === extension.tasks.length;

  function choose(id) { choice = id; }
  function next() {
    if (!correct) return;
    solved = [...solved, current.id];
    if (taskIndex < extension.tasks.length - 1) {
      taskIndex += 1;
      choice = null;
    }
  }
  function reset() { taskIndex = 0; choice = null; solved = []; }
</script>

<section class="lab" aria-labelledby="multiple-views-heading">
  <header>
    <div><p>EXTENSION · MULTIPLE VIEWS</p><h3 id="multiple-views-heading">{extension.title}</h3></div>
    <strong>{complete ? '2 / 2' : `${taskIndex + 1} / 2`}</strong>
  </header>

  {#if !complete}
    <div class="task">
      <span>{current.desk}</span>
      <p>{current.prompt}</p>
      <small><strong>Operation that matters</strong>{current.operation}</small>
    </div>

    <p class="instruction">Choose the view this desk should keep ready.</p>
    <div class="views">
      <button type="button" aria-pressed={choice === 'row'} class:chosen={choice === 'row'} class:right={correct && choice === 'row'} on:click={() => choose('row')}>
        <span>VIEW A · NUMBERED ROW</span>
        <div class="row" aria-hidden="true">{#each extension.stations as station, index}<i><b>{index}</b>{station}</i>{/each}</div>
        <strong>One planned order</strong>
      </button>
      <button type="button" aria-pressed={choice === 'network'} class:chosen={choice === 'network'} class:right={correct && choice === 'network'} on:click={() => choose('network')}>
        <span>VIEW B · CONNECTED MAP</span>
        <svg viewBox="0 0 300 132" role="img" aria-label="ASH connects to BEECH and CEDAR; both connect onward to DOCK">
          <path d="M45 66L150 26M45 66L150 106M150 26L255 66M150 106L255 66" />
          <g><circle cx="45" cy="66" r="22"/><text x="45" y="70">ASH</text></g>
          <g><circle cx="150" cy="26" r="22"/><text x="150" y="30">BEECH</text></g>
          <g><circle cx="150" cy="106" r="22"/><text x="150" y="110">CEDAR</text></g>
          <g><circle cx="255" cy="66" r="22"/><text x="255" y="70">DOCK</text></g>
        </svg>
        <strong>Several possible paths</strong>
      </button>
    </div>

    {#if choice && !correct}<p class="feedback retry" aria-live="polite">That view contains the same station names, but it hides the relationship this desk uses most. Match the view to the operation—not merely to the data.</p>{/if}
    {#if correct}
      <div class="reveal" aria-live="polite"><p><strong>Why it fits</strong>{current.reveal}</p><p><strong>What it hides</strong>{current.limitation}</p></div>
      <button type="button" class="next" on:click={next}>{taskIndex === extension.tasks.length - 1 ? 'Combine the two views →' : 'Send the same data to the next desk →'}</button>
    {/if}
  {:else}
    <div class="combined">
      <p class="eyebrow">SYSTEM VIEW · BOTH JOBS SURVIVE</p>
      <h3>One railway. Two useful organisations.</h3>
      <p>The passenger display and route planner can share the same station facts while keeping different relationships ready. Real software often maintains several structures or indexes around the same underlying entities.</p>
      <div class="equation" aria-label="Shared station facts feed both an ordered schedule and a connection graph">
        <div><span>SHARED FACTS</span><strong>4 stations · 4 rail links</strong></div><b>→</b><div><span>DISPLAY VIEW</span><strong>Ordered sequence</strong></div><b>+</b><div><span>ROUTE VIEW</span><strong>Connection graph</strong></div>
      </div>
      <aside><strong>Precision note</strong>A stack or queue describes which item is available next; it can be implemented using an array, linked nodes or another mechanism. DSA names exist at different levels, so the useful question is always: what behaviour and cost does this design provide?</aside>
      <button type="button" class="next" on:click={reset}>Run both desks again</button>
    </div>
  {/if}
</section>

<style>
  .lab { padding:clamp(18px,4vw,32px); border:3px solid #000; background:var(--qx-ink); color:var(--qx-ink-text); box-shadow:8px 8px 0 #000; }
  header { display:flex; justify-content:space-between; align-items:flex-start; gap:18px; margin-bottom:20px; }
  header p,.eyebrow { margin:0 0 5px; color:var(--qx-ink-accent); font-size:11px; font-weight:900; letter-spacing:.13em; }
  h3 { margin:0; font-size:clamp(26px,5vw,40px); line-height:1.05; }
  header > strong { color:var(--qx-ink-accent); font-size:20px; white-space:nowrap; }
  .task { padding:18px; border:2px solid #000; background:var(--qx-slip); color:var(--qx-slip-ink); box-shadow:4px 4px 0 #000; }
  .task > span { color:var(--qx-accent-text); font-size:11px; font-weight:900; letter-spacing:.12em; text-transform:uppercase; }
  .task p { margin:9px 0 12px; font-size:19px; line-height:1.45; }
  .task small { display:block; padding:10px 12px; border-left:4px solid var(--qx-accent); background:var(--qx-accent-soft-2); color:var(--qx-slip-dim); font-size:13px; }
  .task small strong { display:block; margin-bottom:3px; color:var(--qx-slip-ink); font-size:11px; text-transform:uppercase; }
  .instruction { margin:22px 0 10px; color:var(--qx-ink-text-2); font-size:14px; }
  .views { display:grid; grid-template-columns:1fr 1fr; gap:9px; }
  .views button { min-width:0; padding:15px; border:1px solid var(--qx-ink-line-2); background:var(--qx-ink-panel); color:var(--qx-ink-text); text-align:left; cursor:pointer; }
  .views button:hover,.views button:focus-visible { border-color:var(--qx-ink-accent); outline:none; }
  .views button.chosen { border-color:var(--qx-ink-accent); background:var(--qx-ink-accent-soft); }
  .views button.right { border-color:var(--qx-ink-good); }
  .views button > span { display:block; color:var(--qx-ink-accent); font-size:11px; font-weight:900; letter-spacing:.09em; }
  .views button > strong { display:block; margin-top:11px; font-size:15px; }
  .row { display:grid; grid-template-columns:repeat(4,1fr); margin-top:24px; }
  .row i { min-width:0; padding:13px 3px 8px; border:1px solid var(--qx-ink-text-2); font:800 11px var(--qx-font); font-style:normal; text-align:center; }
  .row b { display:block; margin:-23px auto 6px; width:20px; padding:3px 0; background:var(--qx-ink-panel); color:var(--qx-ink-accent); font-size:11px; }
  svg { display:block; width:100%; height:132px; margin-top:7px; }
  svg path { fill:none; stroke:var(--qx-ink-accent); stroke-width:4; }
  svg circle { fill:var(--qx-ink-panel); stroke:var(--qx-ink-text-2); stroke-width:2; }
  svg text { fill:var(--qx-ink-text); font:900 11px var(--qx-font); text-anchor:middle; }
  .feedback { margin:14px 0 0; padding:11px 13px; border-left:4px solid currentColor; }
  .retry { color:var(--qx-ink-bad); }
  .reveal { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:16px; padding:16px; border:1px solid var(--qx-ink-good); background:rgba(159,208,180,.08); }
  .reveal p { margin:0; color:var(--qx-ink-text-2); line-height:1.5; }
  .reveal strong { display:block; margin-bottom:4px; color:var(--qx-ink-good); font-size:12px; text-transform:uppercase; }
  .next { min-height:46px; margin-top:14px; padding:10px 16px; border:2px solid #000; background:var(--qx-ink-accent); color:#171510; font:900 14px var(--qx-font); box-shadow:4px 4px 0 #000; cursor:pointer; }
  .combined > p:not(.eyebrow) { max-width:720px; color:var(--qx-ink-text-2); font-size:17px; line-height:1.55; }
  .equation { display:grid; grid-template-columns:1.2fr auto 1fr auto 1fr; gap:9px; align-items:stretch; margin:24px 0; }
  .equation div { padding:14px; border:1px solid var(--qx-ink-line-2); }
  .equation span,.equation strong { display:block; }
  .equation span { color:var(--qx-ink-accent); font-size:11px; font-weight:900; letter-spacing:.09em; }
  .equation strong { margin-top:5px; }
  .equation > b { align-self:center; color:var(--qx-ink-accent); font-size:23px; }
  aside { padding:14px 16px; border-left:4px solid var(--qx-ink-accent); background:var(--qx-ink-panel); color:var(--qx-ink-text-2); line-height:1.5; }
  aside strong { display:block; margin-bottom:4px; color:var(--qx-ink-text); font-size:12px; text-transform:uppercase; }
  @media(max-width:650px) { .views,.reveal { grid-template-columns:1fr; } .equation { grid-template-columns:1fr; } .equation > b { transform:rotate(90deg); justify-self:center; } }
</style>
