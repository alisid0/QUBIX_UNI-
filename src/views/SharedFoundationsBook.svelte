<script>
  import { onMount } from 'svelte';
  import { bookForChapter } from '../lib/content/shared-foundations.js';
  import LearningModeSwitch from '../lib/components/LearningModeSwitch.svelte';
  import SiteNav from '../lib/components/SiteNav.svelte';
  import Figure from '../lib/components/Figure.svelte';
  import { roomForChapter } from '../lib/game/store-map.js';
  import { MISSIONS } from '../lib/game/progress.js';

  // Which chapter of Volume 0 to read. The contents page links here with both
  // numbers; asking for a chapter that is not written yet falls back to the
  // first, so a stale link opens something rather than nothing.
  const askedChapter = Number(new URLSearchParams(window.location.search).get('chapter'));
  const chapterNumber = Number.isInteger(askedChapter) && bookForChapter(askedChapter) ? askedChapter : 1;
  const book = bookForChapter(chapterNumber);

  // The room this chapter is set in, worked out from where its missions stand
  // on the floor plan. No second list to keep in step.
  const room = roomForChapter(chapterNumber, MISSIONS);
  const roomSpot = room
    ? room.spots.find(sp => MISSIONS.some(m => m.slug === sp.slug && m.reading?.chapter === chapterNumber))
    : null;

  // Progress is kept per chapter, so finishing chapter 1 does not mark chapter 2.
  const storageKey = `qubix-shared-foundations-${book.id}-v1`;
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

  // The contents page links to a session directly, so a chapter button can open
  // the part it names rather than always landing on the first one.
  {
    const asked = Number(new URLSearchParams(window.location.search).get('session'));
    if (Number.isInteger(asked) && asked >= 1 && asked <= book.sessions.length) activeIndex = asked - 1;
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
  <meta name="description" content={`${book.subtitle} of Qubix University Shared Foundations.`} />
</svelte:head>

<div class="reader qx-shell">
  <div class="sticky-head">
  <header class="topbar">
    <a class="back" href="?mode=game&mission=foundations">← Foundations</a>
    <div class="mode-centre">
      <div class="identity"><b>QUBIX UNIVERSITY</b><span>{book.status}</span></div>
      <LearningModeSwitch compact current="read" readHref={`?mode=game&mission=shared-book&chapter=${chapterNumber}&session=${activeIndex + 1}`} doHref={session.practice.href} />
    </div>
    <div class="overall" aria-label={`${progressPercent}% complete`}><span>{progressPercent}%</span><i><em style={`width:${progressPercent}%`}></em></i></div>
  </header>

  <!-- Every other chapter, one click away, from inside the one you are reading.
       Before this, changing subject meant going back to the landing page. -->
  <div class="subject-rail"><SiteNav links={false} chapter={chapterNumber} /></div>
  </div>

  {#if room}
    <!-- The chapter opens on the place it is practised, so reading and playing
         are visibly the same building rather than two products. -->
    <header class="chapter-hero">
      <div class="hero-text">
        <p class="hero-eyebrow">CHAPTER {String(chapterNumber).padStart(2, '0')} · {book.subtitle.toUpperCase()}</p>
        <h1>{book.title}</h1>
        <p class="hero-sub">{book.subtitle}</p>
        {#if roomSpot}
          <p class="hero-where">You practise this at <b>{roomSpot.at}</b> in the <b>{room.name}</b>.
            <a href={`?mode=game&mission=store`}>See it on the floor →</a></p>
        {/if}
      </div>
      <div class="hero-art">
        <img src={`/rooms/${room.id}.webp`} alt="" loading="lazy" />
      </div>
    </header>
  {/if}
  <div class="layout">
    <aside class="toc">
      {#if !room}<p>{book.subtitle.toUpperCase()}</p><h1>{book.title}</h1><span>{book.subtitle}</span>{/if}
      <div class="time"><small>EXPECTED TIME FOR THIS PART</small><b>{formatTime(book.totalMinutes)}</b><small>Your pace may vary</small></div>
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
        <section class="complete-banner"><span>{book.subtitle.toUpperCase()} COMPLETE</span><b>You have finished all {book.sessions.length} sessions of this part.</b><p>This is saved progress in an authoring draft. It is not a certificate or a released qualification.</p></section>
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

        {#if session.figure}<Figure spec={session.figure} />{/if}

        <section class="example">
          <div class="section-label"><span>WORKED EXAMPLE</span><b>{session.example.title}</b></div>
          <div class="table-wrap"><table><thead><tr>{#each session.example.headers as header}<th>{header}</th>{/each}</tr></thead><tbody>{#each session.example.rows as row}<tr>{#each row as cell}<td>{cell}</td>{/each}</tr>{/each}</tbody></table></div>
        </section>

        {#if session.rehearsal}
          <!-- The cases here are lifted out of the mission this session points
               at, so the mission is a second look rather than a first.
               check-rehearsals holds the two in agreement. -->
          <section class="rehearsal">
            <div class="section-label"><span>YOU WILL MEET THIS</span><b>{session.practice.title}</b></div>
            <p class="lead">{session.rehearsal.lead}</p>
            {#each session.rehearsal.cases as item, i}
              <article>
                {#if item.code}<pre>{item.code.join('\n')}</pre>{/if}
                <dl>{#each item.facts as [label, value]}<div><dt>{label}</dt><dd>{value}</dd></div>{/each}</dl>
                <p class="ask"><b>{i + 1}.</b> {item.question}</p>
                <details>
                  <summary>Work it out, then check</summary>
                  <p class="answer">{item.answer}</p>
                  <p>{item.why}</p>
                </details>
              </article>
            {/each}
            <p class="closing">{session.rehearsal.closing}</p>
          </section>
        {/if}

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
  :global(.qubix-university) { height: auto !important; overflow: visible !important; }
  /* The chapter opener. Rich furniture, but it sits above the prose rather
     than inside it, so the reading column is untouched. */
  .chapter-hero { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, .92fr);
                  gap: clamp(16px, 3vw, 40px); align-items: center;
                  max-width: 1240px; margin: 0 auto; padding: clamp(20px, 3vw, 40px) clamp(16px, 4vw, 52px) 0; }
  .hero-text { display: flex; flex-direction: column; gap: 10px; }
  .hero-eyebrow { margin: 0; color: #8c4c2e; font: 900 11.5px var(--qx-font); letter-spacing: .14em; }
  .chapter-hero h1 { margin: 0; font: 400 clamp(30px, 4.6vw, 46px)/1.06 Georgia, serif;
                     letter-spacing: -.02em; color: #241f16; text-wrap: balance; }
  .hero-sub { margin: 0; max-width: 46ch; color: #625a49; font: 400 16px/1.55 var(--qx-font); }
  .hero-where { margin: 6px 0 0; max-width: 46ch; color: #625a49; font: 400 14.5px/1.6 var(--qx-font); }
  .hero-where b { color: #241f16; font-weight: 700; }
  .hero-where a { color: #8c4c2e; text-decoration: none; border-bottom: 1px solid currentColor;
                  white-space: nowrap; padding-bottom: 1px; }
  .hero-art { position: relative; }
  .hero-art img { display: block; width: 100%; height: auto; }

  @media (max-width: 860px) {
    .chapter-hero { grid-template-columns: 1fr; gap: 4px; padding-bottom: 4px; }
    .hero-art { order: -1; max-width: 460px; }
  }
  :global(html), :global(body) { overflow: auto; background: #f1ede4; }
  :global(body) { position: static; }

  .reader { width: 100%; max-width: none; min-height: 100vh; background: #f1ede4; color: #241f16; }
  .sticky-head { position: sticky; top: 0; z-index: 20; }
  .subject-rail { padding: 0 clamp(16px, 4vw, 52px);
                  background: rgba(241, 237, 228, .96); backdrop-filter: blur(12px);
                  --nav-rule: #d8d0be; --nav-ink: #241f16; --nav-soft: #6d6558; --nav-accent: #8c4c2e; }
  .topbar { min-height: 62px; padding: 12px clamp(16px, 4vw, 52px); display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 18px; border-bottom: 1px solid #d8d0be; background: rgba(241, 237, 228, .96); backdrop-filter: blur(12px); }
  .back { justify-self: start; color: #8c4c2e; font: 850 13px var(--qx-font); text-decoration: none; border-bottom: 1px solid currentColor; }
  .identity { display: flex; align-items: center; gap: 9px; }
  .identity b { color: #8c4c2e; font: 900 12px var(--qx-font); letter-spacing: .13em; }
  .identity span { color: #746c5e; font: 800 11.5px var(--qx-font); letter-spacing: .08em; }
  .mode-centre { --mode-active: #5f7355; --mode-focus: #8c4c2e; display: grid; justify-items: center; gap: 6px; }
  .overall { justify-self: end; display: flex; align-items: center; gap: 9px; }
  .overall span { font: 900 12px var(--qx-font); }
  .overall i { width: 90px; height: 6px; overflow: hidden; border-radius: 99px; background: #d8d0be; }
  .overall em { display: block; height: 100%; border-radius: inherit; background: #5f7355; transition: width .25s ease; }

  .layout { width: min(100%, 1240px); margin: 0 auto; padding: 28px clamp(14px, 3vw, 34px) 54px; display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 22px; align-items: start; }
  .toc { min-width: 0; position: sticky; top: 88px; padding: 21px; border: 1px solid #d8d0be; border-radius: 16px; background: #fff; }
  .toc > p { margin: 0 0 7px; color: #8c4c2e; font: 900 11.5px var(--qx-font); letter-spacing: .12em; }
  .toc h1 { margin: 0; font: 700 31px/1.05 Georgia, serif; letter-spacing: -.02em; }
  .toc > span { display: block; margin-top: 7px; color: #625a49; font: 700 13px var(--qx-font); }
  .time { margin: 17px 0; padding: 13px 14px; display: grid; grid-template-columns: 1fr auto; gap: 3px 10px; border-left: 4px solid #5f7355; background: #eef1e9; }
  .time small { color: #756c5c; font: 800 11px var(--qx-font); letter-spacing: .08em; }
  .time small:last-child { grid-column: 1 / -1; }
  .time b { color: #4e6548; font: 900 15px var(--qx-font); }
  .toc nav { display: grid; gap: 7px; }
  .toc nav button { width: 100%; min-height: 62px; padding: 9px; display: grid; grid-template-columns: 30px 1fr 18px; align-items: center; gap: 9px; border: 1px solid #ded7c8; border-radius: 10px; background: #fbf9f4; color: #241f16; text-align: left; cursor: pointer; }
  .toc nav button:hover { border-color: #a99d88; }
  .toc nav button.active { border: 2px solid #5f7355; background: #f4f6f1; }
  .toc nav button > span { display: grid; place-items: center; height: 30px; border-radius: 7px; background: #ece7dc; font: 900 11.5px var(--qx-font); }
  .toc nav button.active > span { background: #5f7355; color: #fff; }
  .toc nav button div { display: grid; gap: 3px; }
  .toc nav button b { font: 850 12px var(--qx-font); }
  .toc nav button small { color: #756c5c; font: 650 11px var(--qx-font); }
  .toc nav button em { color: #9c927f; font: 900 13px var(--qx-font); font-style: normal; }
  .toc nav button em.done { color: #5f7355; }
  .progress-copy { margin-top: 16px; display: grid; gap: 5px; }
  .progress-copy b { font: 850 12px var(--qx-font); }
  .progress-copy span { color: #756c5c; font: 650 11.5px/1.45 var(--qx-font); }
  .progress-copy button { justify-self: start; margin-top: 5px; padding: 6px 0; border: 0; border-bottom: 1px solid currentColor; background: none; color: #8c4c2e; font: 800 11px var(--qx-font); cursor: pointer; }
  .progress-copy button.confirm { color: #b43f2d; }

  .layout > main { min-width: 0; }
  article { overflow: hidden; border: 1px solid #d8d0be; border-radius: 18px; background: #fff; box-shadow: 0 18px 50px rgba(70, 57, 38, .08); }
  article > section, .chapter-head, .chapter-nav { margin-left: clamp(20px, 5vw, 64px); margin-right: clamp(20px, 5vw, 64px); }
  .chapter-head { padding: 46px 0 24px; display: flex; align-items: end; justify-content: space-between; gap: 20px; border-bottom: 1px solid #d8d0be; }
  .chapter-head p { margin: 0 0 8px; color: #8c4c2e; font: 900 11.5px var(--qx-font); letter-spacing: .12em; }
  .chapter-head h2 { margin: 0; max-width: 680px; font: 700 clamp(31px, 5vw, 52px)/1.02 Georgia, serif; letter-spacing: -.035em; }
  .chapter-head > span { padding: 8px 10px; border-radius: 7px; background: #eef1e9; color: #4e6548; font: 900 11px var(--qx-font); letter-spacing: .08em; white-space: nowrap; }
  .objective { margin-top: 24px; padding: 17px 19px; border-left: 4px solid #5f7355; background: #f2f4ee; }
  .objective b { color: #4e6548; font: 900 11.5px var(--qx-font); letter-spacing: .1em; }
  .objective p { margin: 6px 0 0; font: 700 15px/1.45 Georgia, serif; }
  .opening { margin: 29px clamp(20px, 5vw, 64px) 0; color: #4f493e; font: 700 18px/1.55 Georgia, serif; }
  .reading-section { margin-top: 27px; }
  .reading-section h3 { margin: 0 0 9px; font: 700 24px Georgia, serif; }
  .reading-section p { margin: 0 0 14px; color: #4f493e; font: 500 15px/1.75 var(--qx-font); }
  .section-label { display: flex; align-items: baseline; gap: 10px; margin-bottom: 14px; }
  .section-label span { color: #8c4c2e; font: 900 11.5px var(--qx-font); letter-spacing: .1em; }
  .section-label b { font: 700 18px Georgia, serif; }
  .example, .workbook, .check, .rehearsal { margin-top: 32px; padding: 22px; border: 1px solid #ded7c8; border-radius: 13px; background: #fbf9f4; }

  /* The rehearsal reads as the mission it previews rather than as more prose,
     so the facts sit in a panel the way the mission shows them. */
  .rehearsal { border-color: #cbbfa6; background: #f6f1e5; }
  .rehearsal .lead, .rehearsal .closing { color: #4f493e; font: 600 13.5px/1.55 var(--qx-font); margin: 0; }
  .rehearsal .closing { margin-top: 16px; padding-top: 14px; border-top: 1px solid #ddd4c0; }
  .rehearsal article { margin-top: 14px; padding: 14px 15px; border: 1px solid #ddd4c0; border-radius: 10px; background: #fffdf8; }
  .rehearsal pre { margin: 0 0 12px; padding: 12px 14px; border-radius: 9px; background: #16120d; color: #eaddcf;
                   font: 600 13px/1.65 ui-monospace, "SF Mono", Menlo, Consolas, monospace; overflow-x: auto; }
  .rehearsal dl { display: grid; gap: 6px; margin: 0 0 12px; }
  .rehearsal dl div { display: grid; grid-template-columns: minmax(120px, 34%) 1fr; gap: 10px; align-items: baseline; }
  .rehearsal dt { color: #8a7f6a; font: 800 11.5px var(--qx-font); letter-spacing: .04em; }
  .rehearsal dd { margin: 0; font: 700 13px ui-monospace, "SF Mono", Menlo, Consolas, monospace; overflow-wrap: anywhere; }
  .rehearsal .ask { margin: 0; font: 700 14px/1.5 Georgia, serif; }
  .rehearsal .ask b { color: #8c4c2e; }
  .rehearsal details { margin-top: 10px; }
  .rehearsal summary { cursor: pointer; color: #8c4c2e; font: 850 12px var(--qx-font); letter-spacing: .04em; }
  .rehearsal details p { margin: 9px 0 0; color: #4f493e; font: 600 13.5px/1.55 var(--qx-font); }
  .rehearsal .answer { color: #25231f; font-weight: 850; }
  @media (max-width: 520px) { .rehearsal dl div { grid-template-columns: 1fr; gap: 2px; } }
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font: 650 13px/1.45 var(--qx-font); }
  th, td { padding: 10px 11px; border-bottom: 1px solid #ded7c8; text-align: left; vertical-align: top; }
  th { color: #756c5c; font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; }
  .workbook > p, .workbook li { color: #4f493e; font: 600 13.5px/1.55 var(--qx-font); }
  .workbook ol { padding-left: 20px; }
  .workbook label { display: block; margin: 16px 0 6px; font: 850 12px var(--qx-font); }
  textarea { width: 100%; min-height: 120px; resize: vertical; padding: 13px; border: 1px solid #cfc6b5; border-radius: 9px; background: #fff; color: #241f16; font: 600 13.5px/1.55 var(--qx-font); }
  textarea:focus { outline: 3px solid rgba(95, 115, 85, .2); border-color: #5f7355; }
  .check > h3 { margin: 0 0 15px; font: 700 20px/1.35 Georgia, serif; }
  .options { display: grid; gap: 8px; }
  .options button { min-height: 48px; padding: 11px 13px; display: flex; align-items: center; justify-content: space-between; gap: 12px; border: 1px solid #d8d0be; border-radius: 9px; background: #fff; color: #241f16; text-align: left; cursor: pointer; }
  .options button span { font: 700 13px/1.4 var(--qx-font); }
  .options button em { color: #9c927f; font-style: normal; }
  .options button.selected { border: 2px solid #5f7355; background: #f4f6f1; }
  .options button.selected em { color: #5f7355; }
  .primary, .done-message { width: 100%; min-height: 44px; margin-top: 12px; display: grid; place-items: center; border: 0; border-radius: 9px; background: #5f7355; color: #fff; font: 900 12px var(--qx-font); }
  .primary { cursor: pointer; }
  .primary:disabled { background: #d1c8b8; cursor: not-allowed; }
  .done-message { background: #eef1e9; color: #4e6548; }
  .feedback { margin-top: 12px; padding: 13px; display: grid; gap: 4px; border-radius: 9px; background: #f5e7df; color: #8c4c2e; }
  .feedback.correct { background: #e9eee6; color: #4e6548; }
  .feedback b { font: 900 13px var(--qx-font); }
  .feedback span { font: 650 12px/1.45 var(--qx-font); }
  .practice { margin-top: 32px; padding: 23px; display: grid; grid-template-columns: 1fr auto; gap: 12px 20px; border-radius: 13px; background: #241f16; color: #f1ede4; }
  .practice span { color: #e4a17b; font: 900 11.5px var(--qx-font); letter-spacing: .1em; }
  .practice h3 { margin: 7px 0 5px; font: 700 24px Georgia, serif; }
  .practice p { margin: 0; max-width: 56ch; color: #c8c0b2; font: 650 12px/1.5 var(--qx-font); }
  .practice a, .practice button { min-width: 170px; min-height: 42px; padding: 10px 13px; display: grid; place-items: center; border: 1px solid #5a5145; border-radius: 8px; color: #fff; font: 850 11.5px var(--qx-font); text-decoration: none; }
  .practice a { align-self: end; background: #8c4c2e; }
  .practice button { grid-column: 2; border-color: #777064; background: transparent; cursor: pointer; }
  .practice button.complete { border-color: #7f9b76; color: #c0d0b9; }
  .sources { margin-top: 25px; padding: 15px 0; display: flex; flex-wrap: wrap; gap: 8px 14px; border-top: 1px solid #ded7c8; border-bottom: 1px solid #ded7c8; }
  .sources b { color: #756c5c; font: 850 11.5px var(--qx-font); }
  .sources a { color: #8c4c2e; font: 750 11.5px var(--qx-font); }
  .chapter-nav { padding: 24px 0 38px; display: flex; justify-content: space-between; gap: 12px; }
  .chapter-nav button, .chapter-nav a { min-height: 42px; padding: 11px 16px; border: 1px solid #d8d0be; border-radius: 8px; background: #fff; color: #241f16; font: 850 12px var(--qx-font); text-decoration: none; cursor: pointer; }
  .chapter-nav .next { border-color: #5f7355; background: #5f7355; color: #fff; }
  .complete-banner { margin-top: 22px; padding: 18px 20px; border-radius: 12px; background: #e9eee6; }
  .complete-banner span { color: #4e6548; font: 900 11.5px var(--qx-font); letter-spacing: .1em; }
  .complete-banner b { display: block; margin-top: 5px; font: 700 18px Georgia, serif; }
  .complete-banner p { margin: 5px 0 0; color: #52624d; font: 650 11.5px/1.5 var(--qx-font); }

  @media (max-width: 900px) {
    .topbar { grid-template-columns: 1fr auto; }
    .mode-centre { grid-column: 1 / -1; grid-row: 2; width: 100%; }
    .identity { display: none; }
    .layout { grid-template-columns: 1fr; }
    .toc { position: static; }
    .toc nav { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 600px) {
    .topbar { padding: 10px 12px; }
    .overall i { width: 56px; }
    .layout { padding: 12px 8px 30px; gap: 10px; }
    .toc { padding: 16px; border-radius: 12px; }
    .toc h1 { font-size: 27px; }
    .toc nav { width: 100%; min-width: 0; display: flex; overflow-x: auto; padding-bottom: 4px; }
    .toc nav button { flex: 0 0 215px; }
    article { border-radius: 12px; }
    .chapter-head { padding-top: 30px; align-items: flex-start; flex-direction: column; }
    .chapter-head h2 { font-size: 34px; }
    .opening { font-size: 16px; }
    .reading-section p { font-size: 14px; }
    .example, .workbook, .check { padding: 15px; }
    .practice { grid-template-columns: 1fr; }
    .practice a, .practice button { grid-column: 1; min-width: 0; width: 100%; }
    .chapter-nav { align-items: stretch; flex-direction: column; }
    .chapter-nav button, .chapter-nav a { width: 100%; text-align: center; }
  }
</style>
