<script>
  import SequenceAccessLab from '../lib/components/SequenceAccessLab.svelte';
  import { DSA_SEQUENCE_PREVIEW as lesson } from '../lib/content/dsa-sequence-preview.js';
</script>

<svelte:head><title>DSA sample · Qubix authoring</title></svelte:head>

<main class="page">
  <header class="topbar"><a href="?mode=factory">← Authoring</a><span>{lesson.status}</span></header>
  <article>
    <section class="hero">
      <p class="code">{lesson.id} · 6 MIN READ · 7 MIN DO</p>
      <h1>{lesson.title}</h1>
      <p class="promise">{lesson.promise}</p>
      <div class="brief"><p><strong>Your objective</strong><br>{lesson.learnerObjective}</p><p><strong>Before this</strong><br>{lesson.prerequisites.join(' · ')}</p></div>
    </section>

    <section class="reading" aria-labelledby="read-heading">
      <p class="section-label">READ · WHY THIS MATTERS</p>
      <h2 id="read-heading">Computers need a way to answer “where?”</h2>
      <p class="lead">A playlist, a row of cinema seats, one day’s sensor readings and the pixels across a screen all have something in common: their order matters. In computing, an ordered collection of items is called a <strong>sequence</strong>.</p>

      <div class="purpose">
        <p class="purpose-question">The problem</p>
        <h3>How can a program reach one item without checking everything before it?</h3>
        <p>Give each position a number. That position number is an <strong>index</strong>. If the program knows the index, it knows where to look.</p>
      </div>

      <h2 class="subheading">An index is a position, not the item itself</h2>
      <p>Imagine a workshop shelf with one item in each numbered slot. Slot 0 comes first, then 1, then 2. The number belongs to the <em>position</em>; the item stored there can change.</p>
      <div class="diagram" aria-label="Four shelf positions from zero to three">
        {#each ['TIN', 'LAMP', 'PAD', 'BAG'] as item, index}<div><span>position {index}</span><strong>{item}</strong></div>{/each}
      </div>

      <div class="zero-note">
        <strong>Why does counting begin at 0?</strong>
        <p>In many programming languages, including Python, the first index is 0. You can think of it as an offset: the first item is zero steps from the beginning, the next is one step away. This is a convention to learn—not a rule of ordinary counting.</p>
      </div>

      <div class="two-questions">
        <section><span class="stamp">ADDRESS QUESTION</span><h3>“What is at position 2?”</h3><p>The position tells us where to go. We can jump straight to that slot.</p><code>items[2] → "PAD"</code></section>
        <section><span class="stamp">IDENTITY QUESTION</span><h3>“Where is PAD?”</h3><p>The value does not tell us its position. With no index of our own, we compare labels until one matches.</p><code>TIN? LAMP? PAD? → position 2</code></section>
      </div>

      <section class="real-world" aria-labelledby="world-heading">
        <p class="section-label">THE REAL-WORLD PAYOFF</p>
        <h2 id="world-heading">The question determines the work</h2>
        <div class="uses">
          <article><span>01</span><h3>Play a video frame</h3><p>Jump to a known frame or time position instead of replaying from the beginning.</p></article>
          <article><span>02</span><h3>Update a game inventory</h3><p>Replace the item in a known slot when a player equips something new.</p></article>
          <article><span>03</span><h3>Read sensor history</h3><p>Retrieve the 60th measurement when readings are stored in time order.</p></article>
          <article><span>04</span><h3>Design faster software</h3><p>Recognise when repeated searching will become expensive as the collection grows.</p></article>
        </div>
        <p class="point"><strong>The whole point:</strong> an index turns a position you know into direct access. If you know only an item’s identity, you need a search method—or another structure that records where values live.</p>
      </section>

      <aside><strong>Do not let the analogy overreach.</strong><p>A Python list behaves like a dynamic array, not a physical shelf. Real speed depends on memory, hardware and implementation. The model here isolates one useful question: how does the amount of work grow?</p></aside>
      <aside class="not-database"><strong>This is not yet a database index.</strong><p>Here, <em>index</em> means an item’s numbered position in a sequence. A database index is a separate lookup structure built to find rows by selected values. Both help answer “where?”, but they work differently.</p></aside>
    </section>

    <SequenceAccessLab />

    <section class="recall">
      <p class="section-label">RECALL · 30 SECONDS</p><h2>Say the difference without notation</h2>
      <p>Complete this aloud: “When I know the position, I can ______. When I know only the value, I may need to ______.”</p>
      <details><summary>Check a precise answer</summary><p>Jump directly to the indexed position; inspect values in sequence until one matches. The first is constant-time indexed access. The second is linear search.</p></details>
    </section>

    <footer>
      <p><strong>Review boundary:</strong> this is one sample lesson-and-mission pair. It is not rostered, approved or deployed.</p>
      <p>Concept references: <a href="https://opendatastructures.org/">Open Data Structures</a>, <a href="https://opendsa-server.cs.vt.edu/ODSA/StandaloneModules/20250903221625/html/ListIntro.html">OpenDSA List Introduction</a>, and the <a href="https://docs.python.org/3.14/tutorial/datastructures.html">Python data structures tutorial</a>. All Qubix wording, examples and interaction design are original.</p>
    </footer>
  </article>
</main>

<style>
  :global(body) { margin: 0; background: var(--qx-bg); color: var(--qx-text); }
  .page { height: 100vh; overflow-y: auto; overscroll-behavior-y: contain; background: radial-gradient(circle at 80% 0%, var(--qx-bg-radial), var(--qx-bg) 42%); font-family: var(--qx-font); }
  .topbar { position: sticky; top: 0; z-index: 2; display: flex; justify-content: space-between; gap: 16px; padding: 12px clamp(16px, 4vw, 42px); background: var(--qx-bg); border-bottom: 2px solid #000; font-size: 12px; font-weight: 900; letter-spacing: .08em; }
  .topbar a { color: var(--qx-text); }
  article { width: min(920px, calc(100% - 32px)); margin: 0 auto; padding: clamp(38px, 7vw, 78px) 0 80px; }
  .hero { border: 3px solid #000; box-shadow: 10px 10px 0 #000; background: var(--qx-surface); padding: clamp(22px, 5vw, 48px); margin-bottom: 52px; }
  .code, .section-label { margin: 0 0 14px; color: var(--qx-accent-text); font-size: 12px; font-weight: 900; letter-spacing: .14em; }
  h1 { max-width: 720px; margin: 0; font-size: clamp(42px, 9vw, 88px); line-height: .92; letter-spacing: -.055em; }
  .promise { max-width: 610px; margin: 24px 0; font-size: clamp(21px, 3vw, 29px); line-height: 1.25; }
  .brief { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding-top: 18px; border-top: 2px solid #000; color: var(--qx-text-2); }
  .brief p { margin: 0; }
  .reading, .recall { margin: 0 auto 48px; max-width: 780px; }
  .reading > h2, .recall h2 { margin: 0; font-size: clamp(30px, 5vw, 48px); line-height: 1.05; letter-spacing: -.03em; }
  .lead { font-size: 21px; line-height: 1.6; }
  .purpose { margin: 28px 0 42px; padding: clamp(20px, 4vw, 34px); border: 3px solid #000; background: var(--qx-accent-soft-2); box-shadow: 7px 7px 0 #000; }
  .purpose-question { margin: 0; color: var(--qx-accent-text); font-size: 12px; font-weight: 900; letter-spacing: .14em; text-transform: uppercase; }
  .purpose h3 { margin: 8px 0 12px; font-size: clamp(24px, 4vw, 35px); line-height: 1.12; }
  .purpose p:last-child { margin-bottom: 0; font-size: 18px; line-height: 1.55; }
  .subheading { margin-top: 46px !important; }
  .diagram { display: grid; grid-template-columns: repeat(4, 1fr); border: 3px solid #000; box-shadow: 7px 7px 0 #000; margin: 28px 0 36px; background: #000; gap: 2px; }
  .diagram div { min-width: 0; background: var(--qx-surface); padding: 16px 12px; }
  .diagram span { display: block; color: var(--qx-text-dim); font-size: 12px; }
  .diagram strong { display: block; margin-top: 18px; font-size: clamp(14px, 3vw, 21px); overflow: hidden; }
  .zero-note { margin: 0 0 30px; padding: 17px 19px; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); }
  .zero-note p { margin: 5px 0 0; color: var(--qx-text-2); }
  .two-questions { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .two-questions section { border: 2px solid #000; background: var(--qx-surface); padding: 20px; }
  .two-questions section:first-child { box-shadow: 6px 6px 0 var(--qx-accent); }
  .two-questions h3 { font-size: 22px; }
  .stamp { color: var(--qx-accent-text); font-size: 11px; font-weight: 900; letter-spacing: .12em; }
  .real-world { margin-top: 48px; }
  .real-world > h2 { margin: 0 0 22px; font-size: clamp(28px, 5vw, 44px); line-height: 1.08; }
  .uses { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; border: 2px solid #000; background: #000; }
  .uses article { background: var(--qx-surface); padding: 20px; }
  .uses span { color: var(--qx-accent-text); font-size: 12px; font-weight: 900; }
  .uses h3 { margin: 8px 0 5px; }
  .uses p { margin: 0; color: var(--qx-text-2); line-height: 1.5; }
  .point { margin: 22px 0 0; padding: 18px 20px; border: 2px solid #000; font-size: 18px; line-height: 1.55; }
  code { display: block; padding: 11px; background: var(--qx-surface-3); border: 1px solid var(--qx-border-2); white-space: normal; }
  aside { margin-top: 30px; padding: 18px 20px; border-left: 5px solid var(--qx-accent); background: var(--qx-accent-soft-2); }
  aside p { margin-bottom: 0; }
  .not-database { margin-top: 12px; border-left-color: var(--qx-text); background: var(--qx-surface-2); }
  .recall { margin-top: 58px; border: 3px solid #000; box-shadow: 7px 7px 0 #000; padding: clamp(20px, 4vw, 34px); background: var(--qx-surface); }
  details { border-top: 1px solid var(--qx-border-2); padding-top: 14px; }
  summary { cursor: pointer; font-weight: 900; }
  footer { margin-top: 54px; padding-top: 22px; border-top: 2px solid #000; color: var(--qx-text-dim); font-size: 14px; }
  footer a { color: var(--qx-accent-text); }
  @media (max-width: 640px) { .topbar { align-items: flex-start; } .topbar span { text-align: right; } .brief, .two-questions, .uses { grid-template-columns: 1fr; } article { width: min(100% - 24px, 920px); } .hero { box-shadow: 6px 6px 0 #000; } }
</style>
