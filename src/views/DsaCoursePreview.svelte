<script>
  import { onMount, tick } from 'svelte';
  import { modules, COURSE_VERSION } from '../lib/content/dsa-course.js';
  import DsaReasoningLab from '../lib/components/DsaReasoningLab.svelte';
  import DsaCheckpoint from '../lib/components/DsaCheckpoint.svelte';
  let current = 0;
  let stage = 0;
  let records = {};
  let notes = {};
  let reviewed = {};
  let storageNotice = '';
  let ready = false;
  let heading;
  let practiceRound = 0;
  const storageKey = `qubix:dsa-opening:v${COURSE_VERSION}`;
  const stages = ['Read & reason','Experiment','Check & explain'];
  $: lesson = modules[current];
  $: completed = modules.filter(m => m.questions.every(q => records[q.id]?.solved) && reviewed[m.id]).length;
  $: checkedCount = lesson.questions.filter(q => records[q.id]?.solved).length;
  $: if (ready) save(records, notes, reviewed, current, stage);
  function save(records,notes,reviewed,current,stage) {
    try { localStorage.setItem(storageKey, JSON.stringify({records,notes,reviewed,current,stage})); }
    catch { storageNotice = 'This browser cannot save progress. You can still use the course; keep a copy of your notes before leaving.'; }
  }
  onMount(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (saved && typeof saved === 'object') {
        // Only current question ids and valid answers may restore checked state.
        for (const m of modules) {
          const text = saved.notes?.[m.id];
          if (typeof text === 'string') notes[m.id] = text.slice(0,12000);
          reviewed[m.id] = saved.reviewed?.[m.id] === true && !!notes[m.id]?.trim();
          for (const q of m.questions) {
            const r = saved.records?.[q.id];
            if (r && typeof r === 'object' && (typeof r.answer === 'number' || typeof r.answer === 'string')) {
              const valid = q.options ? Number.isInteger(r.answer) && r.answer >= 0 && r.answer < q.options.length : String(r.answer).trim() !== '' && Number.isFinite(Number(r.answer));
              if (valid) records[q.id] = {answer:r.answer,checked:r.checked === true,solved:r.solved === true && (q.options ? r.answer === q.correct : Number(r.answer) === q.answer),attempts:Number.isInteger(r.attempts) ? Math.max(0,r.attempts) : 0};
            }
          }
        }
        if (Number.isInteger(saved.current) && saved.current >= 0 && saved.current < modules.length) current = saved.current;
        if (Number.isInteger(saved.stage) && saved.stage >= 0 && saved.stage < stages.length) stage = saved.stage;
      }
    } catch { storageNotice = 'Saved progress could not be read. This session starts fresh.'; }
    ready = true;
  });
  async function navigate(index, nextStage = 0) {
    current = index; stage = nextStage;
    await tick(); heading?.focus(); heading?.scrollIntoView({block:'start'});
  }
  function record(event) { records = {...records,[event.detail.id]:event.detail}; }
  function editNote(event) {notes = {...notes,[lesson.id]:event.target.value}; reviewed = {...reviewed,[lesson.id]:false};}
  function retryChecks() {
    records = Object.fromEntries(Object.entries(records).filter(([id]) => !lesson.questions.some(q => q.id === id)));
    reviewed = {...reviewed,[lesson.id]:false}; practiceRound += 1;
  }
</script>

<svelte:head><title>Data Structures and Algorithms · Qubix University</title><meta name="robots" content="noindex,nofollow"/><meta name="description" content="Four opening DSA modules: contracts, linear search, array insertion and amortised analysis. Predict, trace and explain."/></svelte:head>

<div class="course-page">
  <a class="skip" href="#lesson-title">Skip to lesson</a>
  <header class="masthead"><a href="/">Qubix University</a><span>COURSE EDITION · AI DRAFT FOR REVIEW</span></header>
  <div class="course-layout">
    <aside class="course-nav" aria-label="Course outline">
      <p class="eyebrow">Computer science / opening sequence</p><h1>Data Structures<br>and Algorithms</h1>
      <p class="intro">Understand the problem.<br>Trace the work.<br>Defend the result.</p>
      <nav aria-label="Modules">{#each modules as m,i}<button aria-current={current === i ? 'page' : undefined} on:click={() => navigate(i)}><span class="number">{String(i+1).padStart(2,'0')}</span><span>{m.title}<small>{m.questions.every(q => records[q.id]?.solved) && reviewed[m.id] ? 'Checkpoints complete' : m.time}</small></span></button>{/each}</nav>
      <div class="progress"><label for="course-progress">{completed} of {modules.length} module checkpoints complete</label><progress id="course-progress" max={modules.length} value={completed}></progress><p>Progress and written notes stay in this browser. Completion records practice, not certified mastery.</p></div>
      <details><summary>How to use this course</summary><p>Take one module at a time. Predict before running a trace. Try a changed input. Write an explanation before comparing with the answer guide. Return tomorrow and reconstruct the idea from memory.</p><p>Use AI for a hint after an attempt, then test its claims. A polished answer is not evidence that you understand it.</p></details>
    </aside>
    <main class="lesson">
      {#if storageNotice}<p class="notice" role="status">{storageNotice}</p>{/if}
      <div class="lesson-top"><span>MODULE {String(current + 1).padStart(2,'0')} / 04</span><a href={`https://qubix.university${lesson.original}`}>Original sample ↗</a></div>
      <h2 id="lesson-title" tabindex="-1" bind:this={heading}>{lesson.title}</h2><p class="subtitle">{lesson.subtitle}</p>
      <nav class="stages" aria-label="Lesson sections">{#each stages as label,i}<button aria-current={stage === i ? 'step' : undefined} on:click={() => navigate(current,i)}>{i+1}. {label}</button>{/each}</nav>
      {#key `${lesson.id}-${stage}-${practiceRound}`}
        {#if stage === 0}
          <div class="objective"><p><strong>By the end</strong>{lesson.objective}</p><p><strong>Before you start</strong>{lesson.prerequisite}</p></div>
          <p class="opening">{lesson.opening}</p>
          {#each lesson.sections as section,i}<section class="reading"><p class="eyebrow">{String(i + 1).padStart(2,'0')} / THINK IT THROUGH</p><h3>{section.title}</h3>{#each section.paragraphs as paragraph}<p>{paragraph}</p>{/each}</section>{/each}
          <section class="worked"><p class="eyebrow">Worked example</p><h3>{lesson.worked.title}</h3><pre><code>{lesson.worked.code}</code></pre><p>{lesson.worked.explanation}</p></section>
          <button class="primary" on:click={() => navigate(current,1)}>Test the idea →</button>
        {:else if stage === 1}
          <DsaReasoningLab kind={lesson.lab}/>
          <section class="reading"><h3>Before you move on</h3><p>Change one input or rule and run again. Explain which result changed, which stayed the same, and why. A trace is useful only when you can connect its steps to the contract.</p></section>
          <button class="primary" on:click={() => navigate(current,2)}>Check understanding →</button>
        {:else}
          <p>Answer without reopening the reading first. Hints are available after you have tried. Wrong answers explain the missing idea; you can revise them.</p>
          <p class="check-count" aria-live="polite">{checkedCount} / {lesson.questions.length} checks answered correctly</p>
          {#if lesson.questions.some(q => records[q.id]?.checked)}<button class="primary" on:click={retryChecks}>Retry this module’s checks</button><p class="local-note">Starts a fresh attempt. Your written explanation is kept.</p>{/if}
          {#each lesson.questions as question}<DsaCheckpoint {question} restored={records[question.id]} on:record={record}/>{/each}
          <section class="reflection"><p class="eyebrow">Explain it yourself</p><h3>{lesson.reflection}</h3><label for="reasoning">Your reasoning</label><textarea id="reasoning" maxlength="12000" rows="6" value={notes[lesson.id] || ''} on:input={editNote} placeholder="Give a concrete input, trace the relevant steps, and state what they establish."></textarea><p class="local-note">Saved in this browser when storage is available. Written explanations are self-reviewed; they are not automatically graded.</p>
            <details><summary>Compare with the reasoning guide</summary><ul>{#each lesson.rubric as point}<li>{point}</li>{/each}</ul><p>A different example can be correct. Check whether your reasoning establishes the same requirements, rather than matching the wording.</p></details>
            <label class="reviewed"><input type="checkbox" checked={!!reviewed[lesson.id]} disabled={!notes[lesson.id]?.trim()} on:change={event => reviewed = {...reviewed,[lesson.id]:event.target.checked}}/> I compared my explanation with the guide and can justify each step.</label>
          </section>
          <aside class="return"><h3>Come back tomorrow</h3><p>{lesson.transfer}</p></aside>
          {#if current === 3}<section class="capstone"><p class="eyebrow">Synthesis / a design review</p><h3>Review a proposed event recorder</h3><p>A sensor recorder receives readings at the end of a sequence. A dashboard retrieves known positions. An alert handler repeatedly searches for an unknown value. An AI proposes a dynamic array and claims that “everything is O(1)”. Write a short review: define each operation, name its cost and assumptions, and identify the claim that fails.</p><details><summary>Review criteria and a worked response</summary><p>Known-position access is Θ(1) in the array model. Append is Θ(1) amortised with geometric growth, but a resizing append is Θ(n). An unknown-value search in an unsorted array is Θ(n) worst case. Repeating it q times can require Θ(qn) comparisons if the length stays n. The proposal has not made every operation constant-time.</p><p>Ask about search frequency, maximum size, ordering requirements, memory limits and deadlines. A separate lookup structure might help repeated searches, but it consumes memory and must remain consistent as data changes. Choosing that structure requires further study; do not invent a universal winner.</p><p>Evidence to request: traces for absence and duplicates, a resize boundary test, a defined workload, and measured latency on the target system. Testing complements the reasoning; it does not replace the contract.</p></details></section>{/if}
          {#if checkedCount === lesson.questions.length && reviewed[lesson.id]}<p class="complete" role="status">Module checkpoints complete. Test your recall again after a break.</p>{/if}
          {#if current < modules.length - 1}<button class="primary" on:click={() => navigate(current + 1)}>Next: {modules[current + 1].title} →</button>{:else}<button class="primary" on:click={() => navigate(0)}>Return to the introduction</button>{/if}
        {/if}
      {/key}
      <footer><p>Original Qubix explanations, examples and exercises. This expanded edition is an AI draft for founder review. The earlier approved samples keep their existing status.</p><details><summary>Concept references</summary><p>Cross-checks: Pat Morin, <a href="https://opendatastructures.org/ods-python/2_Array_Based_Lists.html">Open Data Structures, chapter 2</a>, and the <a href="https://docs.python.org/3/tutorial/datastructures.html">Python data structures tutorial</a>. No source text or diagrams are reproduced. The doubling model is an explicit teaching policy, not a Python implementation guarantee.</p></details><p>Next topics after this opening: linked lists, stacks and queues, binary search, hashing, trees, graphs and algorithm design. Those modules are outside this edition.</p></footer>
    </main>
  </div>
</div>

<style>
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important}:global(.qubix-university){height:auto!important;overflow:visible!important}.course-page{font-family:var(--qx-font);background:var(--qx-bg);color:var(--qx-text);min-height:100vh;font-size:1rem;line-height:1.7}.skip{position:absolute;left:16px;top:-100px;padding:12px;background:var(--qx-surface);z-index:20}.skip:focus{top:8px}.masthead{display:flex;justify-content:space-between;gap:20px;padding:18px clamp(18px,4vw,60px);border-bottom:1px solid var(--qx-border-2);align-items:center}.masthead a{font-weight:900;text-decoration:none;font-size:1.1rem}.masthead span{font-size:.875rem;color:var(--qx-text-2)}a{color:var(--qx-accent-text);text-underline-offset:4px}.course-layout{display:grid;grid-template-columns:290px minmax(0,790px);gap:clamp(32px,6vw,90px);max-width:1250px;margin:auto;padding:42px 24px 80px}.course-nav h1{font-size:1.65rem;line-height:1.25;letter-spacing:-.035em;margin:16px 0}.intro{color:var(--qx-text-2)}.eyebrow{font-size:.875rem;font-weight:800;color:var(--qx-accent-text);line-height:1.5}.course-nav nav{display:grid;margin:30px 0;gap:8px}.course-nav nav button{display:flex;gap:14px;text-align:left;background:transparent;border:1px solid transparent;border-radius:6px;color:var(--qx-text);padding:14px 12px;font:inherit;line-height:1.4;cursor:pointer}.course-nav nav button[aria-current=page]{border-color:var(--qx-border-2);background:var(--qx-surface)}.number{font-variant-numeric:tabular-nums;color:var(--qx-accent-text);font-weight:900}small{display:block;font-size:.875rem;color:var(--qx-text-2);margin-top:6px}.progress{font-size:.875rem;border-top:1px solid var(--qx-border-2);padding-top:20px}.progress progress{width:100%;accent-color:var(--qx-accent);height:9px}.course-nav details{font-size:.875rem}.lesson{min-width:0}.lesson-top{display:flex;justify-content:space-between;gap:20px;font-size:.875rem;color:var(--qx-text-2)}.lesson h2{font-size:clamp(2rem,4vw,3.25rem);line-height:1.12;letter-spacing:-.04em;margin:20px 0;scroll-margin-top:24px}.subtitle{font-size:1.25rem;color:var(--qx-text-2);line-height:1.5}.stages{display:flex;gap:6px;border-bottom:1px solid var(--qx-border-2);margin:28px 0;flex-wrap:wrap}.stages button{border:0;background:transparent;font:inherit;color:var(--qx-text-2);padding:12px 10px;cursor:pointer;border-bottom:3px solid transparent;min-height:44px}.stages button[aria-current=step]{color:var(--qx-text);border-bottom-color:var(--qx-accent);font-weight:800}.objective{padding:18px 24px;background:var(--qx-surface);border-left:3px solid var(--qx-accent);font-size:.95rem}.objective strong{display:block;margin-bottom:5px}.opening{font-size:1.2rem;line-height:1.75;margin:34px 0}.reading{padding:24px 0;border-top:1px solid var(--qx-border-2)}h3{font-size:1.5rem;line-height:1.3;letter-spacing:-.015em}.reading p{margin:18px 0}.worked{padding:24px;background:var(--qx-surface);border:1px solid var(--qx-border-2);margin:24px 0}pre{overflow-x:auto;font-size:.95rem;line-height:1.7;padding:20px;background:var(--qx-bg);border-radius:6px;tab-size:4}code{font-family:ui-monospace,Consolas,monospace}.primary{font:inherit;font-weight:800;border:0;background:var(--qx-text);color:var(--qx-bg);padding:14px 20px;border-radius:6px;cursor:pointer;min-height:48px;margin:18px 0;text-align:left}.reflection,.capstone{border-top:2px solid var(--qx-accent);margin:24px 0;padding:20px 0}.reflection label{display:block;font-weight:700}.reflection textarea{display:block;width:100%;box-sizing:border-box;margin-top:12px;background:var(--qx-surface);color:var(--qx-text);border:1px solid var(--qx-border-2);border-radius:6px;font:inherit;line-height:1.6;padding:16px;resize:vertical}.local-note{font-size:.875rem;color:var(--qx-text-2)}details{margin:20px 0}summary{cursor:pointer;font-weight:700;min-height:44px;line-height:1.6;display:list-item;padding:6px 0}.reflection .reviewed{display:flex;gap:12px;font-weight:400;line-height:1.6}.reviewed input{min-width:20px;min-height:20px;align-self:flex-start;margin-top:4px;accent-color:var(--qx-accent)}.return{background:var(--qx-surface-2);padding:20px 24px;border-left:3px solid var(--qx-accent)}.complete{font-weight:800;color:var(--qx-green-text)}.check-count{font-size:.875rem;font-weight:800}.notice{padding:16px;border:1px solid var(--qx-accent)}footer{border-top:1px solid var(--qx-border-2);font-size:.875rem;color:var(--qx-text-2);margin-top:48px;padding-top:20px}:is(button,a,input,textarea,summary):focus-visible{outline:3px solid var(--qx-accent);outline-offset:3px}li{margin:12px 0}@media(max-width:900px){.course-layout{grid-template-columns:1fr;padding:24px 18px;gap:30px}.course-nav nav{grid-template-columns:repeat(2,minmax(0,1fr));margin:20px 0}.intro{display:none}.course-nav h1 br{display:none}.course-nav .progress p,.course-nav>details{display:none}.masthead{align-items:flex-start;flex-wrap:wrap}.masthead span{font-size:.875rem}.lesson-top{flex-wrap:wrap}.lesson h2{font-size:2.25rem}}@media(max-width:420px){.course-nav nav{grid-template-columns:1fr}.stages button{font-size:.875rem;padding:12px 6px}.worked{padding:16px}pre{padding:12px}.lesson h2{font-size:2rem}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}
</style>
