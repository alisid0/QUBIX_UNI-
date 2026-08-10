<script>
  import { theme } from '../lib/stores/theme.js';
  import { progress, summary } from '../lib/stores/progress.js';
  import { view } from '../lib/stores/view.js';
  import { boards, TOTAL_SECTIONS } from '../lib/content/course.js';
  import AuthButton from '../lib/components/AuthButton.svelte';

  // Counted, not written down. The line here used to say "five boards, twenty
  // sections" in the markup, which stopped being true the moment the pilot
  // boards were added.
  const words = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
  const count = n => words[n] || String(n);
  const topics = [
    { title: 'Variables', description: 'Letters, values and quantities that change.', boardIndices: [0, 1, 2] },
    { title: 'Functions', description: 'Inputs, outputs and rules that give one answer.', boardIndices: [3, 4] },
    { title: 'Coordinate Geometry', description: 'Area, position and the coordinate plane.', boardIndices: [5, 6] },
    { title: 'Rates and Derivatives', description: 'Comparing changes and approaching a local rate.', boardIndices: [7, 8] }
  ];
  let selectedTopic = null;

  const topicProgress = (topic, completed) => {
    const total = topic.boardIndices.reduce((sum, boardIndex) => sum + boards[boardIndex].floors.length, 0);
    const done = topic.boardIndices.reduce((sum, boardIndex) => sum + boards[boardIndex].floors.filter((_, floorIndex) => completed[`${boardIndex}:${floorIndex}`]).length, 0);
    return { total, done, complete: done === total };
  };

  function resume() {
    view.set('lesson');
  }

  function startOver() {
    progress.reset();
    view.set('lesson');
  }

  function chooseTopic(index) {
    selectedTopic = index;
  }

  function closeTopic() {
    selectedTopic = null;
  }

  function openBoard(boardIndex) {
    const board = boards[boardIndex];
    const firstOpen = board.floors.findIndex((_, index) => !$progress.completed[`${boardIndex}:${index}`]);
    progress.setPosition(boardIndex, firstOpen < 0 ? 0 : firstOpen);
    selectedTopic = null;
    view.set('lesson');
  }

  function openTopic() {
    if (selectedTopic === null) return;
    const topic = topics[selectedTopic];
    const nextBoard = topic.boardIndices.find(boardIndex => boards[boardIndex].floors.some((_, floorIndex) => !$progress.completed[`${boardIndex}:${floorIndex}`]));
    openBoard(nextBoard === undefined ? topic.boardIndices[0] : nextBoard);
  }

  function handleKeydown(event) {
    if (event.key === 'Escape' && selectedTopic !== null) closeTopic();
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="home-shell">
  <header class="home-header">
    <div class="identity">
      <span class="mark">Q</span>
      <span class="stack">
        <b>QUBIX UNIVERSITY</b>
        <small>Variables and rates of change</small>
      </span>
    </div>
    <div class="header-actions">
      <AuthButton />
      <button class="icon-btn" aria-label="Toggle colour theme" on:click={() => theme.toggle()}>
        {#if $theme === 'dark'}◑{:else}◐{/if}
      </button>
    </div>
  </header>

  <main class="home-body">
    <section class="resume-card">
      <span class="micro">{$summary.started ? 'CONTINUE' : 'BEGIN'}</span>

      {#if $summary.started}
        <h1>{$summary.boardTitle}</h1>
        <p class="where">
          Subtopic {$summary.boardNumber} of {$summary.boardCount} ·
          section {$summary.sectionNumber} of {$summary.sectionCount}
        </p>
      {:else}
        <h1>Variables and Rates of Change</h1>
        <p class="where">{count(boards.length).replace(/^\w/, c => c.toUpperCase())} subtopics, {TOTAL_SECTIONS} sections, from a letter standing for a number to the rate at a single point.</p>
      {/if}

      <div class="track" aria-label={`${$summary.doneCount} of ${$summary.totalSections} sections done`}>
        <span style={`width:${($summary.doneCount / $summary.totalSections) * 100}%`}></span>
      </div>
      <p class="count">{$summary.doneCount} of {$summary.totalSections} sections</p>

      <button class="primary" on:click={resume}>
        {$summary.started ? 'Resume' : 'Start'}
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {#if $summary.started}
        <button class="quiet" on:click={startOver}>Start over from the beginning</button>
      {/if}
    </section>

    <div class="board-list-head">
      <span>CHOOSE A TOPIC</span>
      <small>Open any topic directly</small>
    </div>
    <section class="topic-grid" aria-label="Choose a topic">
      {#each topics as topic, topicIndex}
        {@const topicState = topicProgress(topic, $progress.completed)}
        <button class="topic-card" class:current={topic.boardIndices.includes($summary.boardIndex)} class:done={topicState.complete} on:click={() => chooseTopic(topicIndex)} aria-label={`View topic ${topicIndex + 1}: ${topic.title}`}>
          <span class="topic-top"><span class="num">{String(topicIndex + 1).padStart(2, '0')}</span><small>{topic.boardIndices.length} subtopics</small></span>
          <span class="names">
            <b>{topic.title}</b>
            <small class="topic-description">{topic.description}</small>
          </span>
          <span class="card-progress" aria-label={`${topicState.done} of ${topicState.total} sections complete`}>
            <i style={`width:${(topicState.done / topicState.total) * 100}%`}></i>
          </span>
          <span class="card-foot"><small>{topicState.done} / {topicState.total} sections</small><span aria-hidden="true">Subtopics →</span></span>
        </button>
      {/each}
    </section>

    <p class="draft-note">
      Curriculum in draft. Nothing here is approved, and every subtopic is
      adapted from public-domain sources with its provenance on record.
    </p>
  </main>

  {#if selectedTopic !== null}
    {@const selected = topics[selectedTopic]}
    {@const selectedProgress = topicProgress(selected, $progress.completed)}
    <div class="topic-modal" role="presentation">
      <button class="modal-scrim" aria-label="Close topic details" on:click={closeTopic}></button>
      <section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="topic-dialog-title">
        <header class="modal-head">
          <span class="modal-number">{String(selectedTopic + 1).padStart(2, '0')}</span>
          <div><small>TOPIC · {selected.boardIndices.length} SUBTOPICS</small><h2 id="topic-dialog-title">{selected.title}</h2></div>
          <button class="modal-close" aria-label="Close topic details" on:click={closeTopic}>×</button>
        </header>
        <div class="modal-progress"><span style={`width:${(selectedProgress.done / selectedProgress.total) * 100}%`}></span></div>
        <p class="modal-count">{selectedProgress.done} of {selectedProgress.total} sections complete</p>
        <p class="modal-description">{selected.description}</p>
        <div class="section-list" aria-label={`Subtopics in ${selected.title}`}>
          {#each selected.boardIndices as boardIndex, subtopicIndex}
            {@const subtopic = boards[boardIndex]}
            {@const subtopicProgress = $summary.perBoard[boardIndex]}
            <button class:done={subtopicProgress.complete} on:click={() => openBoard(boardIndex)}>
              <span class="section-number">{subtopicProgress.complete ? '✓' : subtopicIndex + 1}</span>
              <span><b>{subtopic.title}</b><small>{subtopicProgress.done} of {subtopicProgress.total} sections complete · {subtopic.marker}</small></span>
              <i aria-hidden="true">→</i>
            </button>
          {/each}
        </div>
        <button class="modal-primary" on:click={openTopic}>
          {selectedProgress.complete ? 'Review topic' : selectedProgress.done ? 'Continue topic' : 'Start topic'} <span aria-hidden="true">→</span>
        </button>
      </section>
    </div>
  {/if}
</div>

<style>
  .home-shell { height: 100%; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; background: var(--qx-bg); color: var(--qx-text); font-family: var(--qx-font); }
  .home-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px clamp(16px, 4vw, 40px); border-bottom: 1px solid var(--qx-border); }
  .identity { display: flex; align-items: center; gap: 11px; }
  .header-actions { display: flex; align-items: center; gap: 8px; }
  .mark { width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--qx-accent); display: grid; place-items: center; color: var(--qx-accent-text); font: 800 19px/1 Georgia, serif; }
  .stack { display: flex; flex-direction: column; gap: 2px; }
  .stack b { font-size: 10px; letter-spacing: .17em; }
  .stack small { color: var(--qx-text-dim); font-size: 11px; }
  .icon-btn { width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); cursor: pointer; }

  .home-body { max-width: 900px; margin: 0 auto; padding: 22px clamp(16px, 4vw, 40px) 60px; display: flex; flex-direction: column; gap: 22px; }

  .resume-card { background: var(--qx-surface); border: 1px solid var(--qx-border); border-radius: 22px; box-shadow: var(--qx-shadow-card); padding: 22px 20px; display: flex; flex-direction: column; gap: 11px; }
  .micro { color: var(--qx-accent-text); font-size: 10px; letter-spacing: .14em; font-weight: 900; }
  .resume-card h1 { font-size: clamp(24px, 5vw, 32px); line-height: 1.15; }
  .where { color: var(--qx-text-2); font-size: 14px; line-height: 1.5; }
  .track { height: 6px; border-radius: 9px; background: var(--qx-surface-3); overflow: hidden; margin-top: 4px; }
  .track span { display: block; height: 100%; background: var(--qx-accent); transition: width .25s; }
  .count { color: var(--qx-text-faint); font-size: 11px; font-weight: 800; letter-spacing: .05em; }
  .primary { margin-top: 6px; min-height: 50px; border: 0; border-radius: 14px; background: var(--qx-accent); color: #fffaf2; font-weight: 900; font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; }
  .primary svg { width: 18px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
  .quiet { border: 0; background: none; color: var(--qx-text-faint); font-size: 12px; font-weight: 700; cursor: pointer; padding: 4px; }

  .board-list-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: -12px; }
  .board-list-head span { color: var(--qx-accent-text); font-size: 10px; letter-spacing: .14em; font-weight: 900; }
  .board-list-head small { color: var(--qx-text-faint); font-size: 10px; }
  .topic-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 11px; }
  .topic-card { min-height: 176px; display: flex; flex-direction: column; gap: 13px; border: 1px solid var(--qx-border); border-radius: 17px; padding: 15px; background: var(--qx-surface); color: var(--qx-text); text-align: left; cursor: pointer; font: inherit; }
  .topic-card:hover, .topic-card:focus-visible { border-color: var(--qx-accent); background: var(--qx-accent-soft); outline: none; transform: translateY(-1px); }
  .topic-card.current { border-color: var(--qx-accent); }
  .topic-card.done .num { color: var(--qx-green-text); }
  .topic-top, .card-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .topic-top small { color: var(--qx-accent-text); font-size: 9px; letter-spacing: .1em; text-transform: uppercase; font-weight: 900; }
  .num { font-size: 11px; font-weight: 900; letter-spacing: .06em; color: var(--qx-text-faint); }
  .names { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
  .names b { font-size: 14px; }
  .names small { font-size: 10px; letter-spacing: .09em; text-transform: uppercase; color: var(--qx-text-faint); font-weight: 800; }
  .names small.topic-description { letter-spacing: 0; text-transform: none; line-height: 1.35; font-weight: 600; }
  .card-progress { height: 5px; border-radius: 8px; background: var(--qx-surface-3); overflow: hidden; margin-top: auto; }
  .card-progress i { display: block; height: 100%; background: var(--qx-green); }
  .card-foot small { color: var(--qx-text-faint); font-size: 9px; }
  .card-foot span { color: var(--qx-accent-text); font-size: 10px; font-weight: 900; }

  .topic-modal { position: fixed; inset: 0; z-index: 50; display: grid; place-items: center; padding: 18px; }
  .modal-scrim { position: absolute; inset: 0; border: 0; background: rgba(22, 17, 12, .58); backdrop-filter: blur(4px); cursor: default; }
  .modal-card { position: relative; width: min(100%, 590px); max-height: min(760px, calc(100vh - 36px)); overflow-y: auto; border: 1px solid var(--qx-border-2); border-radius: 22px; background: var(--qx-bg); box-shadow: 0 24px 70px rgba(0,0,0,.28); padding: 20px; }
  .modal-head { display: grid; grid-template-columns: 42px 1fr 38px; align-items: start; gap: 12px; }
  .modal-number { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; background: var(--qx-accent-soft); color: var(--qx-accent-text); font-size: 12px; font-weight: 900; }
  .modal-head small { color: var(--qx-accent-text); font-size: 9px; letter-spacing: .12em; text-transform: uppercase; font-weight: 900; }
  .modal-head h2 { margin-top: 4px; color: var(--qx-text); font-size: 23px; line-height: 1.12; }
  .modal-close { width: 36px; height: 36px; border: 1px solid var(--qx-border); border-radius: 50%; background: var(--qx-surface); color: var(--qx-text); font-size: 22px; cursor: pointer; }
  .modal-progress { height: 6px; margin-top: 18px; border-radius: 8px; background: var(--qx-surface-3); overflow: hidden; }
  .modal-progress span { display: block; height: 100%; background: var(--qx-green); }
  .modal-count { margin: 7px 0 15px; color: var(--qx-text-faint); font-size: 10px; font-weight: 800; }
  .modal-description { margin: -4px 0 14px; color: var(--qx-text-2); font-size: 13px; line-height: 1.45; }
  .section-list { display: flex; flex-direction: column; gap: 7px; }
  .section-list button { width: 100%; display: grid; grid-template-columns: 34px 1fr 18px; align-items: center; gap: 10px; border: 1px solid var(--qx-border); border-radius: 13px; background: var(--qx-surface); color: var(--qx-text); padding: 10px; text-align: left; cursor: pointer; }
  .section-list button:hover, .section-list button:focus-visible { border-color: var(--qx-accent); background: var(--qx-accent-soft); outline: none; }
  .section-list button.done .section-number { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .section-number { width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; background: var(--qx-surface-3); color: var(--qx-text-dim); font-size: 11px; font-weight: 900; }
  .section-list button > span:nth-child(2) { min-width: 0; display: flex; flex-direction: column; gap: 3px; }
  .section-list b { font-size: 13px; }
  .section-list small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--qx-text-faint); font-size: 10px; }
  .section-list i { color: var(--qx-accent-text); font-style: normal; font-weight: 900; }
  .modal-primary { width: 100%; min-height: 50px; margin-top: 16px; border: 0; border-radius: 14px; background: var(--qx-accent); color: #fffaf2; font-size: 15px; font-weight: 900; cursor: pointer; }

  .draft-note { color: var(--qx-text-faint); font-size: 11.5px; line-height: 1.55; border-top: 1px solid var(--qx-border); padding-top: 14px; }
  @media (max-width: 600px) {
    .topic-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .topic-card { min-height: 164px; padding: 13px; }
    .modal-card { padding: 16px; border-radius: 18px; }
  }
  @media (max-width: 350px) { .topic-grid { grid-template-columns: 1fr; } }
</style>
