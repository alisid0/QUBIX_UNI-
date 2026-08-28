<script>
  import { onMount, onDestroy } from 'svelte';
  let frame = 0;
  let reducedMotion = false;
  let timers = [];

  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function play() {
    clearTimers();
    if (reducedMotion) { frame = 2; return; }
    frame = 0;
    timers = [setTimeout(() => { frame = 1; }, 1000), setTimeout(() => { frame = 2; }, 2200)];
  }
  onMount(() => { reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; play(); });
  onDestroy(clearTimers);
</script>

<figure aria-labelledby="orientation-caption">
  <header>
    <div><span>THE DSA IDEA</span><strong>{frame === 0 ? '1 · Information exists' : frame === 1 ? '2 · Give it a useful shape' : '3 · Perform the important operation'}</strong></div>
    <button on:click={play}>{frame === 2 ? 'Replay idea' : 'Restart'}</button>
  </header>
  <div class="canvas" role="img" aria-label="Unorganised information becomes four useful organisational shapes that support different operations">
    <section class="source" class:quiet={frame >= 1}>
      <p><span>01</span> Raw requests</p>
      <div class="loose-cards"><i>JOB</i><i>SEAT</i><i>STOP</i><i>EDIT</i></div>
      <small>Information exists, but it has no useful arrangement yet.</small>
    </section>

    <div class="connector" class:visible={frame >= 1}><span>ORGANISE</span><b>→</b></div>

    <section class="shape-board" class:visible={frame >= 1}>
      <p><span>02</span> Choose a shape</p>
      <div class="shape-grid">
        <article><div class="row-visual"><i>0</i><i>1</i><i>2</i><i>3</i></div><b>Numbered row</b><small>known position</small></article>
        <article><div class="pile-visual"><i></i><i></i><i></i></div><b>Top-only pile</b><small>most recent</small></article>
        <article><div class="line-visual"><i></i><i></i><i></i><em>OUT</em></div><b>Waiting line</b><small>arrival order</small></article>
        <article><div class="map-visual"><svg viewBox="0 0 120 58"><path d="M12 42L42 10L76 40L108 12"/><circle cx="12" cy="42" r="7"/><circle cx="42" cy="10" r="7"/><circle cx="76" cy="40" r="7"/><circle cx="108" cy="12" r="7"/></svg></div><b>Connected map</b><small>relationships</small></article>
      </div>
    </section>

    <section class="operation-rail" class:visible={frame >= 2}>
      <p><span>03</span> Perform the work</p>
      <div><b>FIND</b><b>ADD</b><b>REMOVE</b><b>ORDER</b><b>CONNECT</b></div>
    </section>
  </div>
  <figcaption id="orientation-caption">A data structure gives information a shape. An algorithm is a sequence of steps that performs work with that shape.</figcaption>
</figure>

<style>
  figure { margin:30px 0 48px; border:3px solid #000; background:var(--qx-surface); box-shadow:7px 7px 0 #000; }
  header { display:flex; justify-content:space-between; align-items:center; gap:16px; padding:14px 16px; border-bottom:2px solid #000; }
  header div { display:grid; gap:3px; }
  header span { color:var(--qx-accent-text); font-size:11px; font-weight:900; letter-spacing:.13em; }
  header strong { font-size:16px; }
  button { min-height:38px; padding:7px 11px; border:2px solid #000; background:var(--qx-accent); color:#fff; font:900 12px var(--qx-font); cursor:pointer; box-shadow:3px 3px 0 #000; }
  .canvas { display:grid; grid-template-columns:180px 84px 1fr; gap:18px; align-items:center; padding:24px; background:var(--qx-ink); color:var(--qx-ink-text); }
  .canvas section > p { margin:0 0 12px; color:var(--qx-ink-text-2); font-size:11px; font-weight:900; letter-spacing:.12em; text-transform:uppercase; }
  .canvas section > p span { color:var(--qx-ink-accent); margin-right:6px; }
  .source,.shape-board,.operation-rail,.connector { transition:opacity .45s ease,transform .65s ease; }
  .source { padding:15px; border:1px solid var(--qx-ink-line-2); background:var(--qx-ink-panel); }
  .source.quiet { opacity:.48; transform:scale(.97); }
  .source small { display:block; margin-top:13px; color:var(--qx-ink-text-2); line-height:1.4; }
  .loose-cards { position:relative; height:118px; }
  .loose-cards i { position:absolute; display:grid; place-items:center; width:61px; height:33px; border:2px solid #000; background:var(--qx-slip); color:var(--qx-slip-ink); font:900 11px var(--qx-font); font-style:normal; box-shadow:3px 3px 0 #000; }
  .loose-cards i:nth-child(1){left:4px;top:5px;transform:rotate(-3deg)} .loose-cards i:nth-child(2){right:3px;top:29px;transform:rotate(4deg)} .loose-cards i:nth-child(3){left:18px;bottom:10px;transform:rotate(2deg)} .loose-cards i:nth-child(4){right:15px;bottom:0;transform:rotate(-5deg)}
  .connector { opacity:0; transform:translateX(-12px); color:var(--qx-ink-accent); text-align:center; }
  .connector.visible { opacity:1; transform:translateX(0); }
  .connector span { display:block; font-size:11px; font-weight:900; letter-spacing:.08em; }
  .connector b { display:block; font-size:42px; line-height:1; }
  .shape-board { opacity:.08; transform:translateX(-16px); }
  .shape-board.visible { opacity:1; transform:translateX(0); }
  .shape-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  .shape-grid article { min-width:0; padding:12px; border:1px solid var(--qx-ink-line-2); background:var(--qx-ink-panel); }
  .shape-grid article > b,.shape-grid article > small { display:block; }
  .shape-grid article > b { margin-top:9px; font-size:12px; }
  .shape-grid article > small { margin-top:2px; color:var(--qx-ink-text-2); font-size:11px; }
  .row-visual,.line-visual { display:flex; align-items:center; height:42px; gap:3px; }
  .row-visual i { display:grid; place-items:center; width:27px; height:27px; border:1px solid var(--qx-ink-text-2); color:var(--qx-ink-text); font:900 11px var(--qx-font); font-style:normal; }
  .row-visual i:nth-child(3) { border-color:var(--qx-ink-accent); background:var(--qx-ink-accent-soft); }
  .pile-visual { display:flex; height:42px; flex-direction:column-reverse; gap:2px; }
  .pile-visual i { display:block; width:76px; height:9px; border:1px solid var(--qx-ink-text-2); }
  .pile-visual i:last-child { border-color:var(--qx-ink-accent); background:var(--qx-ink-accent-soft); }
  .line-visual i { width:20px; height:20px; border:1px solid var(--qx-ink-text-2); border-radius:50%; }
  .line-visual i:first-child { border-color:var(--qx-ink-accent); background:var(--qx-ink-accent-soft); }
  .line-visual em { margin-left:4px; color:var(--qx-ink-accent); font:900 11px var(--qx-font); font-style:normal; }
  .map-visual { height:42px; }
  .map-visual svg { width:100%; height:42px; }
  .map-visual path { fill:none; stroke:var(--qx-ink-accent); stroke-width:3; }
  .map-visual circle { fill:var(--qx-ink-panel); stroke:var(--qx-ink-text); stroke-width:2; }
  .operation-rail { grid-column:1/-1; display:grid; grid-template-columns:170px 1fr; gap:18px; align-items:center; opacity:0; transform:translateY(10px); padding-top:16px; border-top:1px solid var(--qx-ink-line-2); }
  .operation-rail.visible { opacity:1; transform:translateY(0); }
  .operation-rail > p { margin:0 !important; }
  .operation-rail > div { display:flex; gap:6px; }
  .operation-rail b { flex:1; padding:7px 5px; border:1px solid var(--qx-ink-accent); color:var(--qx-ink-accent); text-align:center; font-size:11px; }
  figcaption { padding:13px 16px; border-top:1px solid var(--qx-border-2); color:var(--qx-text-2); font-size:14px; }
  @media(max-width:680px) { .canvas { grid-template-columns:1fr; } .connector { transform:rotate(90deg); } .connector.visible { transform:rotate(90deg); } .shape-board { transform:translateY(-10px); } .shape-board.visible { transform:translateY(0); } .operation-rail { grid-template-columns:1fr; gap:7px; } }
  @media(max-width:560px) { header { align-items:flex-start; } header strong { font-size:14px; } button { max-width:88px; } .canvas { padding:15px; } .shape-grid { gap:6px; } .operation-rail > div { flex-wrap:wrap; } .operation-rail b { min-width:56px; } }
  @media(prefers-reduced-motion:reduce) { .source,.shape-board,.operation-rail,.connector { transition:none; } }
</style>
