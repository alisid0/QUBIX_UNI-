<script>
  import { onMount } from 'svelte';
  import { theme } from '../lib/stores/theme.js';

  const reviewStages = [
    {
      id: 'promise',
      eyebrow: '01 · Learning objective',
      title: 'Is the learning objective clear?',
      prompt: 'After BB1, can the learner explain that x is a variable and that the value assigned to x may change?',
      options: ['Clear', 'Partly clear', 'Not yet'],
      placeholder: 'What should the learner be able to say or do instead?'
    },
    {
      id: 'prerequisites',
      eyebrow: '02 · Prerequisites',
      title: 'Are the prerequisites sufficient?',
      prompt: 'Is understanding that a letter may represent a number sufficient preparation for BB1?',
      options: ['Ready', 'Needs a bridge', 'Prerequisites unclear'],
      placeholder: 'Record the missing idea or prerequisite BB.'
    },
    {
      id: 'pacing',
      eyebrow: '03 · Attention and pacing',
      title: 'Is the pacing manageable?',
      prompt: 'Do the three explanation steps introduce symbol, variable and changing value at a manageable pace?',
      options: ['Comfortable', 'One step is rushed', 'Too much at once'],
      placeholder: 'Name the board or sentence where the pace accelerates.'
    },
    {
      id: 'interaction',
      eyebrow: '04 · Interaction',
      title: 'Does the interaction explain the mathematics?',
      prompt: 'Does the slider make it clear that x remains the same variable while its numerical value changes?',
      options: ['It teaches', 'Needs refinement', 'Interaction is ornamental'],
      placeholder: 'What should change visibly when the learner acts?'
    },
    {
      id: 'voice',
      eyebrow: '05 · Explanation',
      title: 'Is the explanation clear and accurate?',
      prompt: 'Is the explanation mathematically accurate, consistent with Wentworth’s source statement and clear to a present-day learner?',
      options: ['Balanced', 'Too compressed', 'Too historical'],
      placeholder: 'Paste or describe wording that needs another pass.'
    }
  ];

  const storageKey = 'qubix-university-curriculum-review-v1';
  let activeIndex = 0;
  let responses = {};
  let decision = '';
  let generalNote = '';
  let hydrated = false;
  let copied = false;

  $: activeStage = reviewStages[activeIndex];
  $: response = responses[activeStage.id] || { answer: '', note: '' };
  $: answeredCount = reviewStages.filter((stage) => responses[stage.id]?.answer).length;
  $: completion = Math.round((answeredCount / reviewStages.length) * 100);

  onMount(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (saved) {
        responses = saved.responses || {};
        decision = saved.decision || '';
        generalNote = saved.generalNote || '';
        activeIndex = Math.min(saved.activeIndex || 0, reviewStages.length - 1);
      }
    } catch (_) {}
    hydrated = true;
  });

  $: if (hydrated) {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ responses, decision, generalNote, activeIndex }));
    } catch (_) {}
  }

  function setAnswer(answer) {
    responses = { ...responses, [activeStage.id]: { ...response, answer } };
  }

  function setNote(note) {
    responses = { ...responses, [activeStage.id]: { ...response, note } };
  }

  function nextStage() {
    if (activeIndex < reviewStages.length - 1) activeIndex += 1;
  }

  function previousStage() {
    if (activeIndex > 0) activeIndex -= 1;
  }

  function buildReviewNote() {
    const lines = [
      '# Qubix curriculum review — A Letter for a Number',
      '',
      `Decision: ${decision || 'Not decided'}`,
      ''
    ];
    reviewStages.forEach((stage) => {
      const item = responses[stage.id] || {};
      lines.push(`## ${stage.title}`, `Answer: ${item.answer || 'Not answered'}`, `Note: ${item.note || '—'}`, '');
    });
    lines.push('## Overall note', generalNote || '—', '', 'Saved from production dummy mode; requires founder confirmation before any curriculum status changes.');
    return lines.join('\n');
  }

  async function copyReview() {
    try {
      await navigator.clipboard.writeText(buildReviewNote());
      copied = true;
      window.setTimeout(() => (copied = false), 1800);
    } catch (_) {
      copied = false;
    }
  }
</script>

<div class="review-shell">
  <header class="review-header">
    <a class="identity" href="?mode=review" aria-label="Qubix curriculum staging home">
      <span class="identity-mark">Q</span>
      <span><b>QUBIX UNIVERSITY</b><small>Curriculum staging</small></span>
    </a>
    <div class="header-actions">
      <span class="dummy-badge"><i></i>DUMMY MODE</span>
      <button class="icon-button" aria-label="Toggle colour theme" on:click={() => theme.toggle()}>{$theme === 'dark' ? '☼' : '◐'}</button>
    </div>
  </header>

  <main class="review-main">
    <section class="intro">
      <div>
        <span class="kicker">FOUNDER REVIEW · NOT A RELEASED COURSE</span>
        <h1>Review the curriculum<br/><em>before release.</em></h1>
        <p>This production workspace is for reading, touching and questioning one small learning sequence at a time.</p>
      </div>
      <a class="preview-link" href="?prototype=variables-and-rates">
        <span><small>LEARNER PREVIEW</small><b>Open Variables and Rates of Change</b></span>
        <span aria-hidden="true">↗</span>
      </a>
    </section>

    <section class="workspace">
      <aside class="review-map" aria-label="Review stages">
        <div class="map-heading">
          <span>REVIEW MAP</span>
          <b>{completion}%</b>
        </div>
        <div class="map-progress"><span style={`width:${completion}%`}></span></div>
        <nav>
          {#each reviewStages as stage, index}
            <button class:active={index === activeIndex} class:done={responses[stage.id]?.answer} on:click={() => (activeIndex = index)}>
              <span>{responses[stage.id]?.answer ? '✓' : String(index + 1).padStart(2, '0')}</span>
              <span><b>{stage.title}</b><small>{responses[stage.id]?.answer || 'Awaiting review'}</small></span>
            </button>
          {/each}
        </nav>
        <div class="storage-note"><span aria-hidden="true">◌</span><p><b>Browser-only draft</b><br/>Nothing here changes the curriculum or writes to Supabase.</p></div>
      </aside>

      <article class="question-card">
        <div class="question-topline">
          <span>{activeStage.eyebrow}</span>
          <span>{activeIndex + 1} / {reviewStages.length}</span>
        </div>
        <h2>{activeStage.title}</h2>
        <p class="prompt">{activeStage.prompt}</p>

        <fieldset>
          <legend>Review response</legend>
          <div class="options">
            {#each activeStage.options as option}
              <label class:selected={response.answer === option}>
                <input type="radio" name={activeStage.id} value={option} checked={response.answer === option} on:change={() => setAnswer(option)}/>
                <span>{option}</span><i aria-hidden="true">{response.answer === option ? '✓' : ''}</i>
              </label>
            {/each}
          </div>
        </fieldset>

        <label class="note-field">
          <span>REVIEW NOTE <small>optional</small></span>
          <textarea rows="4" placeholder={activeStage.placeholder} value={response.note} on:input={(event) => setNote(event.currentTarget.value)}></textarea>
        </label>

        <div class="question-actions">
          <button class="back" disabled={activeIndex === 0} on:click={previousStage}>← Previous</button>
          {#if activeIndex < reviewStages.length - 1}
            <button class="next" on:click={nextStage}>Next question <span>→</span></button>
          {:else}
            <a class="next" href="#decision">Make a decision <span>↓</span></a>
          {/if}
        </div>
      </article>

      <aside class="sequence-card">
        <div class="sequence-top"><span>SEQUENCE UNDER REVIEW</span><b>AI_DRAFT</b></div>
        <h3>A Letter for a Number</h3>
        <p>One objective · three steps · one interaction</p>
        <ol>
          <li><span>01</span><div><b>A Letter for a Number</b><small>AI_DRAFT · under review</small></div></li>
          <li><span>02</span><div><b>The Gap Between Two Values</b><small>LOCKED</small></div></li>
          <li><span>03</span><div><b>A Second Letter, Tied to the First</b><small>LOCKED</small></div></li>
          <li><span>04</span><div><b>One Change Against Another</b><small>LOCKED</small></div></li>
          <li><span>05</span><div><b>Two Points, Almost Touching</b><small>LOCKED</small></div></li>
        </ol>
        <div class="source-note"><span>PRIMARY SOURCE</span><b>G. A. Wentworth</b><small>The First Steps in Algebra · Chapter I, §6, printed page 2</small></div>
      </aside>
    </section>

    <section class="decision-panel" id="decision">
      <div class="decision-copy"><span class="kicker">CURRICULUM GATE</span><h2>Record the review decision</h2><p>A dummy-mode choice records intent only. It never changes an AI draft to approved.</p></div>
      <div class="decision-work">
        <div class="decision-options">
          {#each [['APPROVE_CANDIDATE', 'Ready for formal approval'], ['AMENDMENTS_REQUIRED', 'Return for narrow amendments'], ['HOLD', 'Pause and investigate']] as item}
            <button class:selected={decision === item[0]} on:click={() => (decision = item[0])}><span>{decision === item[0] ? '●' : '○'}</span><b>{item[1]}</b><small>{item[0]}</small></button>
          {/each}
        </div>
        <textarea rows="3" bind:value={generalNote} placeholder="Overall decision note…"></textarea>
        <button class="copy-button" disabled={!decision} on:click={copyReview}>{copied ? 'Review note copied ✓' : 'Copy review note'}</button>
      </div>
    </section>
  </main>
</div>

<style>
  .review-shell { height: 100%; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; background: radial-gradient(circle at 15% 4%, var(--qx-bg-radial), transparent 35%), var(--qx-bg); color: var(--qx-text); font-family: var(--qx-font); }
  button, textarea { font: inherit; }
  .review-header { min-height: 76px; padding: 14px clamp(18px, 4vw, 56px); border-bottom: 1px solid var(--qx-border); display: flex; align-items: center; justify-content: space-between; background: color-mix(in srgb, var(--qx-bg) 88%, transparent); position: sticky; top: 0; z-index: 10; backdrop-filter: blur(14px); }
  .identity { display: flex; align-items: center; gap: 11px; color: var(--qx-text); text-decoration: none; }
  .identity-mark { width: 38px; height: 38px; border: 1px solid var(--qx-accent); border-radius: 50%; display: grid; place-items: center; color: var(--qx-accent-text); font: 800 19px/1 Georgia, serif; }
  .identity > span:last-child { display: flex; flex-direction: column; gap: 2px; }
  .identity b { font-size: 10px; letter-spacing: .17em; }
  .identity small { color: var(--qx-text-dim); font-size: 11px; }
  .header-actions { display: flex; align-items: center; gap: 10px; }
  .dummy-badge { display: flex; align-items: center; gap: 7px; border: 1px solid var(--qx-border-2); border-radius: 99px; padding: 7px 10px; color: var(--qx-text-dim); font-size: 9px; font-weight: 900; letter-spacing: .12em; }
  .dummy-badge i { width: 6px; height: 6px; border-radius: 50%; background: var(--qx-accent); box-shadow: 0 0 0 4px var(--qx-accent-soft); }
  .icon-button { width: 38px; height: 38px; border: 1px solid var(--qx-border); background: var(--qx-surface); color: var(--qx-text); border-radius: 50%; cursor: pointer; }
  .review-main { width: min(1180px, calc(100% - 36px)); margin: 0 auto; padding: 54px 0 80px; }
  .intro { display: grid; grid-template-columns: minmax(0, 1fr) 300px; align-items: end; gap: 40px; margin-bottom: 42px; }
  .kicker { color: var(--qx-accent-text); font-size: 10px; font-weight: 900; letter-spacing: .14em; }
  .intro h1 { margin: 12px 0 15px; font-size: clamp(38px, 5vw, 66px); line-height: .98; letter-spacing: -.052em; max-width: 780px; }
  .intro h1 em { color: var(--qx-text-dim); font-family: Georgia, serif; font-weight: 400; }
  .intro p { color: var(--qx-text-2); font-size: 16px; line-height: 1.6; max-width: 58ch; }
  .preview-link { display: flex; justify-content: space-between; align-items: center; gap: 16px; text-decoration: none; padding: 18px 20px; background: var(--qx-surface); border: 1px solid var(--qx-border); border-radius: 16px; color: var(--qx-text); box-shadow: var(--qx-shadow-card); }
  .preview-link > span:first-child { display: flex; flex-direction: column; gap: 5px; }
  .preview-link small { color: var(--qx-accent-text); font-size: 9px; font-weight: 900; letter-spacing: .12em; }
  .preview-link b { font-size: 14px; }
  .preview-link > span:last-child { font-size: 22px; color: var(--qx-accent); }
  .workspace { display: grid; grid-template-columns: 235px minmax(340px, 1fr) 270px; gap: 16px; align-items: start; }
  .review-map, .question-card, .sequence-card, .decision-panel { background: var(--qx-surface); border: 1px solid var(--qx-border); border-radius: 20px; box-shadow: var(--qx-shadow-card); }
  .review-map { padding: 18px 13px 13px; }
  .map-heading { display: flex; justify-content: space-between; color: var(--qx-text-faint); font-size: 9px; font-weight: 900; letter-spacing: .12em; padding: 0 4px; }
  .map-heading b { color: var(--qx-accent-text); }
  .map-progress { height: 3px; background: var(--qx-surface-3); border-radius: 9px; margin: 10px 4px 14px; overflow: hidden; }
  .map-progress span { display: block; height: 100%; background: var(--qx-accent); transition: width .2s; }
  .review-map nav { display: flex; flex-direction: column; gap: 4px; }
  .review-map nav button { width: 100%; text-align: left; display: grid; grid-template-columns: 29px 1fr; align-items: center; gap: 8px; padding: 10px 9px; border: 1px solid transparent; border-radius: 11px; background: transparent; color: var(--qx-text); cursor: pointer; }
  .review-map nav button.active { background: var(--qx-accent-soft-2); border-color: var(--qx-border); }
  .review-map nav button > span:first-child { color: var(--qx-text-faint); font-size: 9px; font-weight: 900; }
  .review-map nav button.done > span:first-child { color: var(--qx-green-text); }
  .review-map nav button > span:last-child { display: flex; flex-direction: column; min-width: 0; gap: 3px; }
  .review-map nav b { font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .review-map nav small { color: var(--qx-text-faint); font-size: 9px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .storage-note { display: grid; grid-template-columns: 22px 1fr; gap: 6px; margin-top: 15px; padding: 11px 9px; background: var(--qx-surface-2); border-radius: 11px; color: var(--qx-text-faint); font-size: 9px; line-height: 1.45; }
  .storage-note b { color: var(--qx-text-dim); }
  .question-card { padding: clamp(22px, 4vw, 36px); }
  .question-topline { display: flex; justify-content: space-between; color: var(--qx-accent-text); font-size: 9px; font-weight: 900; letter-spacing: .12em; }
  .question-topline span:last-child { color: var(--qx-text-faint); letter-spacing: 0; }
  .question-card h2 { font-size: clamp(27px, 3vw, 38px); line-height: 1.05; letter-spacing: -.035em; margin: 22px 0 12px; }
  .prompt { color: var(--qx-text-2); font-size: 16px; line-height: 1.62; min-height: 78px; }
  fieldset { border: 0; margin-top: 28px; }
  legend, .note-field > span { color: var(--qx-text-faint); font-size: 9px; font-weight: 900; letter-spacing: .12em; margin-bottom: 9px; }
  .options { display: grid; gap: 7px; }
  .options label { min-height: 48px; display: grid; grid-template-columns: 1fr 22px; align-items: center; padding: 0 14px; border: 1px solid var(--qx-border); border-radius: 12px; background: var(--qx-surface-2); cursor: pointer; color: var(--qx-text-2); font-size: 13px; font-weight: 750; }
  .options label.selected { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-text); }
  .options input { position: absolute; opacity: 0; pointer-events: none; }
  .options i { font-style: normal; color: var(--qx-accent-text); }
  .note-field { display: flex; flex-direction: column; margin-top: 22px; }
  .note-field small { font-weight: 600; letter-spacing: 0; text-transform: none; }
  textarea { resize: vertical; border: 1px solid var(--qx-border); border-radius: 12px; background: var(--qx-surface-2); color: var(--qx-text); padding: 12px 13px; line-height: 1.5; outline: none; }
  textarea:focus { border-color: var(--qx-accent); box-shadow: 0 0 0 3px var(--qx-accent-soft); }
  .question-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 24px; gap: 10px; }
  .question-actions button, .question-actions a { min-height: 44px; padding: 0 16px; border-radius: 11px; font-size: 12px; font-weight: 900; cursor: pointer; text-decoration: none; display: flex; align-items: center; justify-content: center; }
  .back { border: 0; background: transparent; color: var(--qx-text-dim); }
  .back:disabled { opacity: .3; cursor: default; }
  .next { border: 0; background: var(--qx-accent); color: #fffaf2; gap: 18px; }
  .sequence-card { padding: 20px; }
  .sequence-top { display: flex; justify-content: space-between; align-items: center; color: var(--qx-text-faint); font-size: 8px; font-weight: 900; letter-spacing: .11em; }
  .sequence-top b { padding: 5px 7px; border-radius: 6px; background: var(--qx-accent-soft); color: var(--qx-accent-text); font-size: 8px; }
  .sequence-card h3 { font-size: 21px; margin-top: 19px; }
  .sequence-card > p { color: var(--qx-text-faint); font-size: 11px; margin-top: 4px; }
  .sequence-card ol { list-style: none; margin: 20px 0; display: flex; flex-direction: column; }
  .sequence-card li { display: grid; grid-template-columns: 27px 1fr; gap: 8px; padding: 10px 0; border-top: 1px solid var(--qx-border); }
  .sequence-card li > span { color: var(--qx-accent-text); font-size: 9px; font-weight: 900; padding-top: 2px; }
  .sequence-card li div { display: flex; flex-direction: column; gap: 3px; }
  .sequence-card li b { font-size: 11px; }
  .sequence-card li small { color: var(--qx-text-faint); font-size: 9px; }
  .source-note { padding: 13px; background: var(--qx-surface-2); border-radius: 12px; display: flex; flex-direction: column; gap: 4px; }
  .source-note span { color: var(--qx-accent-text); font-size: 8px; font-weight: 900; letter-spacing: .12em; }
  .source-note b { font: 600 14px/1.3 Georgia, serif; }
  .source-note small { color: var(--qx-text-faint); font-size: 9px; line-height: 1.4; }
  .decision-panel { margin-top: 18px; padding: clamp(24px, 4vw, 40px); display: grid; grid-template-columns: minmax(240px, .75fr) 1.25fr; gap: 50px; }
  .decision-copy h2 { font-size: 30px; margin: 10px 0; }
  .decision-copy p { color: var(--qx-text-dim); line-height: 1.55; font-size: 13px; max-width: 38ch; }
  .decision-work { display: grid; gap: 10px; }
  .decision-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
  .decision-options button { min-height: 85px; text-align: left; border: 1px solid var(--qx-border); border-radius: 12px; background: var(--qx-surface-2); color: var(--qx-text); padding: 11px; display: flex; flex-direction: column; align-items: flex-start; cursor: pointer; }
  .decision-options button.selected { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .decision-options span { color: var(--qx-accent-text); }
  .decision-options b { font-size: 10px; line-height: 1.35; margin-top: auto; }
  .decision-options small { color: var(--qx-text-faint); font-size: 7px; letter-spacing: .07em; margin-top: 3px; }
  .copy-button { min-height: 43px; border: 0; border-radius: 11px; background: var(--qx-text); color: var(--qx-bg); font-weight: 900; font-size: 11px; cursor: pointer; }
  .copy-button:disabled { opacity: .35; cursor: default; }
  @media (max-width: 980px) {
    .workspace { grid-template-columns: 210px minmax(0, 1fr); }
    .sequence-card { grid-column: 1 / -1; }
    .sequence-card ol { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
    .sequence-card li { display: flex; flex-direction: column; border: 1px solid var(--qx-border); border-radius: 10px; padding: 10px; }
  }
  @media (max-width: 720px) {
    .review-header { min-height: 64px; padding: 11px 14px; }
    .identity small, .dummy-badge { display: none; }
    .review-main { width: min(100% - 24px, 620px); padding-top: 32px; }
    .intro { grid-template-columns: 1fr; gap: 22px; }
    .intro h1 { font-size: 42px; }
    .workspace { grid-template-columns: 1fr; }
    .review-map { order: 2; }
    .question-card { order: 1; }
    .sequence-card { order: 3; grid-column: auto; }
    .sequence-card ol { grid-template-columns: 1fr; }
    .sequence-card li { display: grid; grid-template-columns: 30px 1fr; border-width: 1px 0 0; border-radius: 0; }
    .decision-panel { grid-template-columns: 1fr; gap: 24px; }
    .decision-options { grid-template-columns: 1fr; }
    .decision-options button { min-height: 66px; }
  }
</style>
