<script>
  import { onMount } from 'svelte';
  import { SHARED_FOUNDATIONS_PART_ONE as book } from '../lib/content/shared-foundations-part-one.js';

  const storageKey = 'qubix-shared-foundations-part-one-v1';
  let activeIndex = 0;
  let selectedAnswers = {};
  let checkedAnswers = {};
  let progress = { study: [], practice: [], notes: {} };
  let hydrated = false;
  let resetting = false;

  $: session = book.sessions[activeIndex];
  $: completedItems = progress.study.length + progress.practice.length;
  $: progressPercent = Math.round((completedItems / (book.sessions.length * 2)) * 100);
  $: partComplete = progress.study.length === book.sessions.length && progress.practice.length === book.sessions.length;

  onMount(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved && Array.isArray(saved.study) && Array.isArray(saved.practice) && saved.notes) progress = saved;
    } catch (error) {
      console.warn('Could not restore book progress.', error);
    }
    hydrated = true;
  });

  function save(next) {
    progress = next;
    if (hydrated) localStorage.setItem(storageKey, JSON.stringify(progress));
  }

  function chooseAnswer(value) {
    selectedAnswers = { ...selectedAnswers, [session.id]: value };
    checkedAnswers = { ...checkedAnswers, [session.id]: false };
  }

  function checkAnswer() {
    if (selectedAnswers[session.id]) checkedAnswers = { ...checkedAnswers, [session.id]: true };
  }

  function completeStudy() {
    if (selectedAnswers[session.id] !== session.check.answer || progress.study.includes(session.id)) return;
    save({ ...progress, study: [...progress.study, session.id] });
  }

  function completePractice() {
    if (progress.practice.includes(session.id)) return;
    save({ ...progress, practice: [...progress.practice, session.id] });
  }

  function updateNotes(value) {
    save({ ...progress, notes: { ...progress.notes, [session.id]: value } });
  }

  function openSession(index) {
    activeIndex = index;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function formatTime(minutes) {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    return remainder ? `${hours} h ${remainder} min` : `${hours} h`;
  }

  function resetProgress() {
    if (!resetting) {
      resetting = true;
      return;
    }
    progress = { study: [], practice: [], notes: {} };
    selectedAnswers = {};
    checkedAnswers = {};
    localStorage.removeItem(storageKey);
    resetting = false;
  }
</script>

<svelte:head>
  <title>{book.title} | Qubix University</title>
  <meta name="description" content="The first guided study block of Qubix University Shared Foundations." />
</svelte:head>

<div class="reader qx-shell">
  <header class="topbar">
    <a class="back" href="?mode=game&mission=foundations">← Foundations</a>
    <div class="identity"><b>QUBIX UNIVERSITY</b><span>{book.status}</span></div>
    <div class="overall" aria-label={`${progressPercent}% complete`}><span>{progressPercent}%</span><i><em style={`width:${progressPercent}%`}></em></i></div>
  </header>

  <div class="layout">
    <aside class="toc">
      <p>VOLUME 0 · PART ONE</p>
      <h1>{book.title}</h1>
      <span>{book.subtitle}</span>
      <div class="time"><small>EXPECTED TIME FOR PART ONE</small><b>3 h 55 min</b><small>Your pace may vary</small></div>
      <nav aria-label="Book sessions">
        {#each book.sessions as item, index}
          <button class:active={activeIndex === index} on:click={() => openSession(index)}>
            <span>{item.number}</span>
            <div><b>{item.title}</b><small>Expected time · {formatTime(item.studyMinutes + item.playMinutes)}</small></div>
            <em class:done={progress.study.includes(item.id) && progress.practice.includes(item.id)}>{progress.study.includes(item.id) && progress.practice.includes(item.id) ? '✓' : '○'}</em>
          </button>
        {/each}
      </nav>
      <div class="progress-copy"><b>{completedItems} of {book.sessions.length * 2} steps complete</b><span>Each session has one study step and one practice step.</span>{#if completedItems || Object.keys(progress.notes).length}<button class:confirm={resetting} on:click={resetProgress}>{resetting ? 'Confirm reset' : 'Reset saved progress'}</button>{/if}</div>
    </aside>

    <main>
      {#if partComplete}
        <section class="complete-banner"><span>PART ONE COMPLETE</span><b>You have finished the first four sessions.</b><p>This is saved progress in an authoring draft. It is not a certificate or a released qualification.</p></section>
      {/if}

      <article>
        <header class="chapter-head">
          <div><p>SESSION {session.number} · EXPECTED TIME {formatTime(session.studyMinutes + session.playMinutes).toUpperCase()}</p><h2>{session.title}</h2></div>
          <span>{progress.study.includes(session.id) ? 'STUDY COMPLETE ✓' : 'STUDY'}</span>
        </header>

        <section class="objective"><b>BY THE END, YOU CAN</b><p>{session.objective}</p></section>
        <p class="opening">{session.opening}</p>

        {#each session.sections as section}
          <section class="reading-section">
            <h3>{section.heading}</h3>
            {#each section.paragraphs as paragraph}<p>{paragraph}</p>{/each}
          </section>
        {/each}

        <section class="example">
          <div class="section-label"><span>WORKED EXAMPLE</span><b>{session.example.title}</b></div>
          <div class="table-wrap"><table><thead><tr>{#each session.example.headers as header}<th>{header}</th>{/each}</tr></thead><tbody>{#each session.example.rows as row}<tr>{#each row as cell}<td>{cell}</td>{/each}</tr>{/each}</tbody></table></div>
        </section>

        <section class="workbook">
          <div class="section-label"><span>WORKBOOK</span><b>{session.workbook.title}</b></div>
          <p>{session.workbook.prompt}</p>
          <ol>{#each session.workbook.steps as step}<li>{step}</li>{/each}</ol>
          <label for={`notes-${session.id}`}>Your notes</label>
          <textarea id={`notes-${session.id}`} value={progress.notes[session.id] || ''} on:input={(event) => updateNotes(event.currentTarget.value)} placeholder="Write your observations here. They stay on this device."></textarea>
        </section>

        <section class="check">
          <div class="section-label"><span>FOCUSED CHECK</span><b>Answer without looking back</b></div>
          <h3>{session.check.prompt}</h3>
          <div class="options">
            {#each session.check.options as option}
              <button class:selected={selectedAnswers[session.id] === option[0]} on:click={() => chooseAnswer(option[0])}><span>{option[1]}</span><em>{selectedAnswers[session.id] === option[0] ? '●' : '○'}</em></button>
            {/each}
          </div>
          {#if checkedAnswers[session.id]}
            <div class:correct={selectedAnswers[session.id] === session.check.answer} class="feedback" role="status">
              <b>{selectedAnswers[session.id] === session.check.answer ? 'Correct.' : 'Not yet.'}</b>
              <span>{selectedAnswers[session.id] === session.check.answer ? session.check.explanation : 'Use the meaning of the field, not only how the value looks. Try again.'}</span>
            </div>
          {/if}
          {#if progress.study.includes(session.id)}
            <div class="done-message">Study step saved ✓</div>
          {:else if checkedAnswers[session.id] && selectedAnswers[session.id] === session.check.answer}
            <button class="primary" on:click={completeStudy}>Save study step</button>
          {:else}
            <button class="primary" disabled={!selectedAnswers[session.id]} on:click={checkAnswer}>Check answer</button>
          {/if}
        </section>

        <section class="practice">
          <div><span>FOUNDATIONAL PRACTICE</span><h3>{session.practice.title}</h3><p>{session.practice.instruction}</p></div>
          <a href={session.practice.href}>Open focused mission →</a>
          <button class:complete={progress.practice.includes(session.id)} on:click={completePractice}>{progress.practice.includes(session.id) ? 'Practice saved ✓' : 'I completed the practice'}</button>
        </section>

        <section class="sources"><b>Sources used for this draft</b>{#each session.sources as source}<a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>{/each}</section>

        <footer class="chapter-nav">
          {#if activeIndex > 0}<button on:click={() => openSession(activeIndex - 1)}>← Previous session</button>{:else}<span></span>{/if}
          {#if activeIndex < book.sessions.length - 1}<button class="next" on:click={() => openSession(activeIndex + 1)}>Next session →</button>{:else}<a class="next" href="?mode=game&mission=foundations">Return to Foundations →</a>{/if}
        </footer>
      </article>
    </main>
  </div>
</div>

<style>
</style>
