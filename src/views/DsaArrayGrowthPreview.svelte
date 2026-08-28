<script>
  import ArrayGrowthLab from '../lib/components/ArrayGrowthLab.svelte';
  import ArrayGrowthFigure from '../lib/components/ArrayGrowthFigure.svelte';
  import { DSA_ARRAY_GROWTH_PREVIEW as lesson, growthSummary } from '../lib/content/dsa-array-growth-preview.js';

  // Quoted in the prose below. Derived here so the reading cannot drift away
  // from what the bench and the figure actually do.
  const one = growthSummary('one', lesson.appendTarget, lesson.startCapacity);
  const double = growthSummary('double', lesson.appendTarget, lesson.startCapacity);
</script>

<svelte:head><title>Array growth sample · Qubix authoring</title></svelte:head>

<main class="page">
  <header class="topbar"><a href="?mode=dsa-array-insertion-preview">← Approved insertion lesson</a><span>{lesson.status}</span></header>
  <article>
    <section class="hero">
      <p class="code">{lesson.id} · DSA STEP 3 · 7 MIN READ · 9 MIN DO</p>
      <h1>{lesson.title}</h1>
      <p class="promise">{lesson.promise}</p>
      <div class="brief"><p><strong>Your objective</strong><br>{lesson.learnerObjective}</p><p><strong>Before this</strong><br>{lesson.prerequisites.join(' · ')}</p></div>
    </section>

    <section class="reading" aria-labelledby="purpose-heading">
      <p class="section-label">READ · THE PROBLEM</p>
      <h2 id="purpose-heading">The spare slot was a loan, not a gift</h2>
      <p class="lead">The insertion lesson gave the array one empty slot so that shifting could be studied on its own. That slot has now been used. Six items sit in six slots, a seventh is waiting, and there is nowhere to put it. An array does not stretch. It was handed a fixed block of positions when it was created, and the block is full.</p>

      <div class="problem">
        <span>THE ARRAY’S QUESTION</span>
        <h3>Where does the next item go when every slot is taken?</h3>
        <p>It cannot go on the end, because there is no end left. Claim a larger array, copy every existing item into it, and then add the new one. The old array is abandoned. Nothing is lost, and one append has just paid for a full copy.</p>
      </div>

      <p>That is the whole mechanism, and it raises the only interesting question in this lesson: <strong>how much larger should the new array be?</strong> Ask for one extra slot and you waste nothing, but you will be back here on the very next append. Ask for double and some slots sit empty for a while, but you will not be back for a long time.</p>

      <h2 class="subheading">Two strategies, the same destination</h2>
      <p>Both strategies below start at capacity {lesson.startCapacity} and finish holding {lesson.appendTarget} items. Both end in a capacity of exactly {double.finalCapacity}, with no slot wasted in either. The destination is identical. Only the route differs, and the route is what costs.</p>

      <ArrayGrowthFigure />

      <div class="contrast" aria-label="The two growth strategies compared">
        <section><span>GROW BY ONE SLOT</span><strong>{one.totalCopies} items copied</strong><p>It grew {one.growEvents} times, which is nearly every append. No space is ever wasted, and almost every append pays a copy.</p></section>
        <section><span>DOUBLE THE CAPACITY</span><strong>{double.totalCopies} items copied</strong><p>It grew {double.growEvents} times. Most appends cost nothing at all, and the expensive ones get further apart as the array grows.</p></section>
      </div>

      <p>The difference is not a rounding detail. Growing one slot at a time did {(one.totalCopies / double.totalCopies).toFixed(1)} times the copying to reach the same {lesson.appendTarget} items in the same {double.finalCapacity} slots. The reason is that growing by one makes the array full again immediately, so the next append copies everything again, and the one after that copies everything again.</p>

      <h2 class="subheading">Why the expensive appends stop mattering</h2>
      <p>Doubling does have expensive appends. One of them copied {double.worstAppend} items in a single step. What saves it is that each doubling buys twice as many free appends as the last one, so the costly steps become rarer exactly as fast as they become larger. Spread across all {lesson.appendTarget} appends, doubling paid {double.copiesPerAppend.toFixed(2)} copies per append. Growing by one paid {one.copiesPerAppend.toFixed(2)}.</p>
      <p>This is what people mean by <strong>amortised</strong> cost: not the cost of one operation, but the cost of one operation averaged over a long run of them. It is an honest description of a real program, because programs rarely append once.</p>

      <section class="uses" aria-labelledby="uses-heading">
        <p class="section-label">WHY SOFTWARE DOES THIS</p>
        <h2 id="uses-heading">Every growable list you have used does this</h2>
        <div>
          <article><b>Python list</b><p><code>append</code> is fast almost always, and occasionally copies.</p></article>
          <article><b>Shopping basket</b><p>Items keep arriving and nobody declared a maximum.</p></article>
          <article><b>Log file buffer</b><p>Events accumulate with no known final count.</p></article>
          <article><b>Search results</b><p>Matches are collected until the data runs out.</p></article>
        </div>
      </section>

      <aside><strong>Model boundary.</strong><p>This lesson counts item copies, not seconds, and it treats a copy as one unit of work. Real memory allocators, cache behaviour and reference copying all matter to real timings and none of them change the shape of the argument. The exact growth factor is also an implementation choice: CPython over-allocates by a good deal less than double. Doubling is used here because it makes the pattern legible, not because it is the only correct answer.</p></aside>
    </section>

    <ArrayGrowthLab />

    <section class="recall">
      <p class="section-label">RECALL · 30 SECONDS</p><h2>Explain the trade-off</h2>
      <p>A colleague says appending to a list is <code>O(1)</code>. Another says it is <code>O(n)</code> because it sometimes copies everything. Who is right?</p>
      <details><summary>Check a precise answer</summary><p>Both are describing something real. A single append is <code>O(n)</code> in the worst case, because that particular call may copy every item into a larger array. Averaged over a long run of appends, the cost is <code>O(1)</code> amortised, because doubling makes each resize buy twice as many free appends as the last. The two claims answer different questions: one is about the worst single call, the other is about the total divided by the number of calls.</p></details>
    </section>

    <footer>
      <p><strong>Review boundary:</strong> this sample is <code>AI_DRAFT</code>. It has not been reviewed or approved by the founder, it is not rostered, and it is not released. The approved index, insertion and orientation samples are unchanged and remain digest locked.</p>
      <p>Concept references: <a href="https://opendatastructures.org/versions/edition-0.1g/ods-python.pdf">Open Data Structures: Array-Based Lists and amortised analysis</a>, <a href="https://opendsa-server.cs.vt.edu/ODSA/StandaloneModules/20250903221625/html/ListIntro.html">OpenDSA List Introduction</a>, and the <a href="https://docs.python.org/3.14/tutorial/datastructures.html">Python data structures tutorial</a>. Qubix wording, cases, figures and interaction are original.</p>
    </footer>
  </article>
</main>

<style>
  :global(body) { margin:0; background:var(--qx-bg); color:var(--qx-text); position:static; }
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
  .contrast { display:grid; grid-template-columns:1fr 1fr; gap:2px; margin:28px 0 40px; border:2px solid #000; background:#000; }
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
