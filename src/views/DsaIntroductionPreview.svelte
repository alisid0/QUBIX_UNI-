<script>
  import DsaOrientationFigure from '../lib/components/DsaOrientationFigure.svelte';
  import DsaOrientationLab from '../lib/components/DsaOrientationLab.svelte';
  import { DSA_INTRODUCTION_PREVIEW as lesson } from '../lib/content/dsa-introduction-preview.js';
</script>

<svelte:head><title>Introduction to DSA · Qubix authoring</title></svelte:head>

<main class="page">
  <header class="topbar"><a href="?mode=factory">← Authoring</a><span>{lesson.status}</span></header>
  <article>
    <section class="hero">
      <div class="hero-meta"><p class="code">{lesson.id} · THE DSA FRONT DOOR</p><span>NO CODE REQUIRED · 13 MIN</span></div>
      <h1>{lesson.title}</h1><p class="promise">{lesson.promise}</p>
      <div class="verb-strip" aria-label="The five operations introduced in this lesson"><span>FIND</span><span>ADD</span><span>REMOVE</span><span>ORDER</span><span>CONNECT</span></div>
      <div class="brief"><p><strong>Your objective</strong><br>{lesson.learnerObjective}</p><p><strong>Before this</strong><br>{lesson.prerequisites.join(' · ')}</p></div>
    </section>

    <section class="reading" aria-labelledby="why-heading">
      <p class="section-label">READ · WHY DSA EXISTS</p>
      <h2 id="why-heading">Storing information is only the beginning</h2>
      <p class="lead">Software must also find, add, remove, order and connect information. How the information is organised changes how much work those operations require.</p>
      <div class="definition">
        <section><span>DATA STRUCTURE</span><h3>The shape we give information</h3><p>A numbered row, a top-only pile, a waiting line and a connected map each make different work natural.</p></section>
        <section><span>ALGORITHM</span><h3>The steps used to perform work</h3><p>Search, insert, remove, sort or follow connections using a clear procedure that eventually stops.</p></section>
      </div>

      <DsaOrientationFigure />

      <h2 class="subheading">There is no universally “best” structure</h2>
      <p>A structure is useful when it supports the operations a problem performs most often. A playlist needs order. Undo needs the newest action. A support desk needs arrival order. A route planner needs connections.</p>
      <div class="questions">
        <p><span>01</span><strong>What information exists?</strong>Items, events, people, places or relationships?</p>
        <p><span>02</span><strong>What work happens most?</strong>Finding, adding, removing, ordering or connecting?</p>
        <p><span>03</span><strong>What must remain true?</strong>Position, recency, fairness, ranking or reachability?</p>
        <p><span>04</span><strong>What grows?</strong>How does the work change when there are ten items—or ten million?</p>
      </div>
      <aside><strong>Big O comes later for a reason.</strong><p>First learn to see the work. Big O gives us language for how that work grows; it is not an exact stopwatch reading and it does not tell us every engineering trade-off.</p></aside>
    </section>

    <div class="handoff"><span>READING COMPLETE</span><strong>Stop naming structures. Start noticing operations.</strong><b>↓</b></div>
    <DsaOrientationLab />

    <section class="path">
      <p class="section-label">WHAT COMES NEXT</p><h2>One problem shape at a time</h2>
      <ol><li><b>Sequences and indices</b><span>Reach known positions and search for values.</span></li><li><b>Arrays and insertion</b><span>Preserve order while making room.</span></li><li><b>Stacks and queues</b><span>Control which item leaves next.</span></li><li><b>Trees, tables and graphs</b><span>Organise lookup, hierarchy and connections.</span></li></ol>
    </section>

    <footer>
      <p><strong>Review boundary:</strong> this proposed DSA front door is `AI_DRAFT`, authoring-only, unrostered and undeployed.</p>
      <p>Concept references: <a href="https://opendatastructures.org/">Open Data Structures</a>, <a href="https://opendsa-server.cs.vt.edu/ODSA/StandaloneModules/20250903221625/html/ListIntro.html">OpenDSA List Introduction</a>, and the <a href="https://docs.python.org/3.14/tutorial/datastructures.html">Python data structures tutorial</a>. Qubix wording, cases and visuals are original.</p>
    </footer>
  </article>
</main>

<style>
  :global(body) { margin:0; background:var(--qx-bg); color:var(--qx-text); }
  .page { height:100vh; overflow-y:auto; overscroll-behavior-y:contain; background:radial-gradient(circle at 80% 0%,var(--qx-bg-radial),var(--qx-bg) 42%); font-family:var(--qx-font); }
  .topbar { position:sticky; top:0; z-index:2; display:flex; justify-content:space-between; gap:16px; padding:12px clamp(16px,4vw,42px); border-bottom:2px solid #000; background:var(--qx-bg); font-size:12px; font-weight:900; letter-spacing:.08em; }
  .topbar a { color:var(--qx-text); }
  article { width:min(920px,calc(100% - 32px)); margin:0 auto; padding:clamp(38px,7vw,78px) 0 80px; }
  .hero { margin-bottom:58px; padding:clamp(22px,5vw,48px); border:3px solid #000; background-color:var(--qx-surface); background-image:linear-gradient(rgba(36,31,22,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(36,31,22,.035) 1px,transparent 1px); background-size:24px 24px; box-shadow:10px 10px 0 #000; }
  .hero-meta { display:flex; justify-content:space-between; align-items:center; gap:16px; margin-bottom:19px; }
  .hero-meta .code { margin:0; }
  .hero-meta > span { padding:6px 9px; border:1px solid var(--qx-text); background:var(--qx-surface); font-size:10px; font-weight:900; letter-spacing:.1em; white-space:nowrap; }
  .code,.section-label { margin:0 0 14px; color:var(--qx-accent-text); font-size:12px; font-weight:900; letter-spacing:.14em; }
  h1 { max-width:800px; margin:0; font-size:clamp(42px,9vw,88px); line-height:.92; letter-spacing:-.055em; }
  .promise { max-width:650px; margin:24px 0; font-size:clamp(21px,3vw,29px); line-height:1.25; }
  .verb-strip { display:grid; grid-template-columns:repeat(5,1fr); margin:26px 0 21px; border:2px solid #000; background:#000; gap:2px; }
  .verb-strip span { padding:9px 5px; background:var(--qx-surface-2); color:var(--qx-accent-text); text-align:center; font-size:10px; font-weight:900; letter-spacing:.09em; }
  .brief { display:grid; grid-template-columns:1fr 1fr; gap:20px; padding-top:18px; border-top:2px solid #000; color:var(--qx-text-2); }
  .brief p { margin:0; }
  .reading,.path { max-width:780px; margin:0 auto 48px; }
  .reading > h2,.path h2 { margin:0; font-size:clamp(30px,5vw,48px); line-height:1.05; letter-spacing:-.03em; }
  .lead { font-size:21px; line-height:1.6; }
  .definition { display:grid; grid-template-columns:1fr 1fr; gap:2px; margin:28px 0 42px; border:2px solid #000; background:#000; }
  .definition section { padding:22px; background:var(--qx-surface); }
  .definition span { color:var(--qx-accent-text); font-size:11px; font-weight:900; letter-spacing:.13em; }
  .definition h3 { margin:8px 0; font-size:23px; }
  .definition p { margin:0; color:var(--qx-text-2); line-height:1.5; }
  .subheading { margin-top:44px !important; }
  .questions { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:28px; }
  .questions p { margin:0; padding:18px; border:2px solid #000; background:var(--qx-surface); color:var(--qx-text-2); }
  .questions span,.questions strong { display:block; }
  .questions span { color:var(--qx-accent-text); font-size:11px; font-weight:900; }
  .questions strong { margin:6px 0; color:var(--qx-text); font-size:18px; }
  aside { margin-top:28px; padding:18px 20px; border-left:5px solid var(--qx-accent); background:var(--qx-accent-soft-2); }
  aside p { margin-bottom:0; }
  .handoff { max-width:780px; margin:58px auto 20px; padding:16px 20px; border:2px solid #000; background:var(--qx-text); color:var(--qx-bg); display:grid; grid-template-columns:auto 1fr auto; align-items:center; gap:18px; box-shadow:5px 5px 0 var(--qx-accent); }
  .handoff span { color:var(--qx-ink-accent); font-size:10px; font-weight:900; letter-spacing:.12em; }
  .handoff strong { font-size:17px; }
  .handoff b { color:var(--qx-ink-accent); font-size:24px; }
  .path { margin-top:58px; padding:clamp(20px,4vw,34px); border:3px solid #000; background:var(--qx-surface); box-shadow:7px 7px 0 #000; }
  .path ol { margin:20px 0 0; padding:0; list-style:none; }
  .path li { display:grid; grid-template-columns:1fr 1.4fr; gap:14px; padding:13px 0; border-top:1px solid var(--qx-border-2); }
  .path span { color:var(--qx-text-2); }
  footer { margin-top:54px; padding-top:22px; border-top:2px solid #000; color:var(--qx-text-dim); font-size:14px; }
  footer a { color:var(--qx-accent-text); }
  @media(max-width:640px) { .topbar { align-items:flex-start; } .topbar span { text-align:right; } .hero-meta { align-items:flex-start; } .hero-meta > span { white-space:normal; text-align:right; } .brief,.definition,.questions { grid-template-columns:1fr; } .handoff { grid-template-columns:1fr auto; } .handoff span { grid-column:1/-1; } .path li { grid-template-columns:1fr; gap:4px; } article { width:min(100% - 24px,920px); } .hero { box-shadow:6px 6px 0 #000; } }
</style>
