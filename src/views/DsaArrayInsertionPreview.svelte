<script>
  import ArrayInsertionLab from '../lib/components/ArrayInsertionLab.svelte';
  import ArrayInsertionFigure from '../lib/components/ArrayInsertionFigure.svelte';
  import { DSA_ARRAY_INSERTION_PREVIEW as lesson } from '../lib/content/dsa-array-insertion-preview.js';
</script>

<svelte:head><title>Array insertion sample · Qubix authoring</title></svelte:head>

<main class="page">
  <header class="topbar"><a href="?mode=dsa-sequence-preview">← Approved index lesson</a><span>{lesson.status}</span></header>
  <article>
    <section class="hero">
      <p class="code">{lesson.id} · DSA STEP 2 · 7 MIN READ · 8 MIN DO</p>
      <h1>{lesson.title}</h1>
      <p class="promise">{lesson.promise}</p>
      <div class="brief"><p><strong>Your objective</strong><br>{lesson.learnerObjective}</p><p><strong>Before this</strong><br>{lesson.prerequisites.join(' · ')}</p></div>
    </section>

    <section class="reading" aria-labelledby="purpose-heading">
      <p class="section-label">READ · THE PROBLEM</p>
      <h2 id="purpose-heading">Order is useful—until something new arrives</h2>
      <p class="lead">Imagine six delivery jobs stored in time order. A delayed job arrives and belongs at position 2. Putting it at the end would be easy, but the order would be wrong. Putting it at position 2 preserves meaning—but something is already there.</p>

      <div class="problem">
        <span>THE ARRAY’S QUESTION</span>
        <h3>How do we make an empty position without losing an item?</h3>
        <p>Move the later items one position to the right. Start at the occupied end and work backwards, so every destination is empty before it receives an item.</p>
      </div>

      <ArrayInsertionFigure />

      <h2 class="subheading">An array gives positions a predictable layout</h2>
      <p>An array stores a sequence in numbered slots arranged together. That predictable layout is why a known index supports direct access. It also creates a trade-off: inserting in the middle means preserving the order by shifting later items.</p>

      <div class="contrast" aria-label="Direct access and insertion compared">
        <section><span>READ POSITION 2</span><strong>Go straight there</strong><p>No other item needs to move.</p></section>
        <section><span>INSERT AT POSITION 2</span><strong>Make room first</strong><p>Every later item may need a new position.</p></section>
      </div>

      <p>The cost is not the same for every insertion. After you make room once, the bench asks you to count the moves at the beginning, the middle and the empty end.</p>

      <section class="uses" aria-labelledby="uses-heading">
        <p class="section-label">WHY SOFTWARE DOES THIS</p>
        <h2 id="uses-heading">Insertion preserves an order people depend on</h2>
        <div>
          <article><b>Timeline</b><p>Place a late event at its correct time.</p></article>
          <article><b>Leaderboard</b><p>Insert a new score at its ranked position.</p></article>
          <article><b>Playlist</b><p>Add a song between two existing tracks.</p></article>
          <article><b>Schedule</b><p>Place an urgent job before later work.</p></article>
        </div>
      </section>

      <aside><strong>Model boundary.</strong><p>A Python list is a dynamic array of references. This lesson gives it one spare slot so we can isolate shifting. If capacity is full, resizing and copying introduce another cost; that deserves its own later model.</p></aside>
    </section>

    <ArrayInsertionLab />

    <section class="recall">
      <p class="section-label">RECALL · 30 SECONDS</p><h2>Explain the trade-off</h2>
      <p>Why can reading <code>items[2]</code> be direct while inserting a new value at position 2 can require several moves?</p>
      <details><summary>Check a precise answer</summary><p>The index identifies the existing slot directly. Insertion must also preserve order, so every item at or after that position may need to shift right before the new value can be placed.</p></details>
    </section>

    <footer>
      <p><strong>Review boundary:</strong> this is the second DSA sample only. It is not approved, rostered or deployed. The approved index lesson is unchanged.</p>
      <p>Concept references: <a href="https://opendatastructures.org/versions/edition-0.1g/ods-python.pdf">Open Data Structures: Array-Based Lists</a>, <a href="https://opendsa-server.cs.vt.edu/ODSA/StandaloneModules/20250903221625/html/ListIntro.html">OpenDSA List Introduction</a>, and the <a href="https://docs.python.org/3.14/tutorial/datastructures.html">Python data structures tutorial</a>. Qubix wording, cases and interaction are original.</p>
    </footer>
  </article>
</main>

<style>
  :global(body) { margin:0; background:var(--qx-bg); color:var(--qx-text); }
  :global(.qubix-university) { height:auto!important; overflow:visible!important; }
  :global(html),:global(body),:global(#app) { height:auto!important; min-height:100%; overflow:visible!important; }
  .page { min-height:100vh; background:radial-gradient(circle at 80% 0%,var(--qx-bg-radial),var(--qx-bg) 42%); font-family:var(--qx-font); }
  .topbar { position:sticky; top:0; z-index:2; display:flex; justify-content:space-between; gap:16px; padding:12px clamp(16px,4vw,42px); border-bottom:2px solid #000; background:var(--qx-bg); font-size:12px; font-weight:900; letter-spacing:.08em; }
  .topbar a { color:var(--qx-text); }
  article { width:min(920px,calc(100% - 32px)); margin:0 auto; padding:clamp(38px,7vw,78px) 0 80px; }
  .hero { margin-bottom:52px; padding:clamp(22px,5vw,48px); border:3px solid #000; background:var(--qx-surface); box-shadow:10px 10px 0 #000; }
  .code,.section-label { margin:0 0 14px; color:var(--qx-accent-text); font-size:12px; font-weight:900; letter-spacing:.14em; }
  h1 { max-width:760px; margin:0; font-size:clamp(42px,9vw,88px); line-height:.92; letter-spacing:-.055em; }
  .promise { max-width:640px; margin:24px 0; font-size:clamp(21px,3vw,29px); line-height:1.25; }
  .brief { display:grid; grid-template-columns:1fr 1fr; gap:20px; padding-top:18px; border-top:2px solid #000; color:var(--qx-text-2); }
  .brief p { margin:0; }
  .reading,.recall { max-width:780px; margin:0 auto 48px; }
  .reading > h2,.recall h2,.uses h2 { margin:0; font-size:clamp(30px,5vw,48px); line-height:1.05; letter-spacing:-.03em; }
  .lead { font-size:21px; line-height:1.6; }
  .problem { margin:28px 0 44px; padding:clamp(20px,4vw,34px); border:3px solid #000; background:var(--qx-accent-soft-2); box-shadow:7px 7px 0 #000; }
  .problem span,.contrast span { color:var(--qx-accent-text); font-size:11px; font-weight:900; letter-spacing:.13em; }
  .problem h3 { margin:8px 0 12px; font-size:clamp(24px,4vw,35px); line-height:1.12; }
  .problem p { margin-bottom:0; font-size:18px; line-height:1.55; }
  .subheading { margin-top:42px !important; }
  .contrast { display:grid; grid-template-columns:1fr 1fr; gap:2px; margin:28px 0 48px; border:2px solid #000; background:#000; }
  .contrast section { padding:22px; background:var(--qx-surface); }
  .contrast strong { display:block; margin:9px 0 4px; font-size:22px; }
  .contrast p { margin:0; color:var(--qx-text-2); }
  .uses { margin-top:44px; }
  .uses > div { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .uses article { padding:18px; border:2px solid #000; background:var(--qx-surface); }
  .uses b { font-size:19px; }
  .uses p { margin:5px 0 0; color:var(--qx-text-2); }
  aside { margin-top:30px; padding:18px 20px; border-left:5px solid var(--qx-accent); background:var(--qx-accent-soft-2); }
  aside p { margin-bottom:0; }
  .recall { margin-top:58px; padding:clamp(20px,4vw,34px); border:3px solid #000; background:var(--qx-surface); box-shadow:7px 7px 0 #000; }
  code { padding:2px 5px; background:var(--qx-surface-3); }
  details { padding-top:14px; border-top:1px solid var(--qx-border-2); }
  summary { cursor:pointer; font-weight:900; }
  footer { margin-top:54px; padding-top:22px; border-top:2px solid #000; color:var(--qx-text-dim); font-size:14px; }
  footer a { color:var(--qx-accent-text); }
  @media(max-width:640px) { .topbar { align-items:flex-start; } .topbar span { text-align:right; } .brief,.contrast,.uses > div { grid-template-columns:1fr; } article { width:min(100% - 24px,920px); } .hero { box-shadow:6px 6px 0 #000; } }
</style>
