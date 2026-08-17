<script>
  import { PATHS, PATH_GROUPS, pathsForCard } from '../lib/content/paths.js';
  import { getBoard } from '../lib/content/dynamicBoards.js';
  import { progress } from '../lib/stores/progress.js';
  import { displayName } from '../lib/stores/auth.js';
  import { getPathQuestions } from '../lib/content/questions.js';
  import QxIcon from '../lib/components/qubix/QxIcon.svelte';
  import SubjectMark from '../lib/components/SubjectMark.svelte';
  import SettingsMenu from '../lib/components/qubix/SettingsMenu.svelte';
  import CheckpointQuiz from '../lib/components/qubix/CheckpointQuiz.svelte';
  import QubixMascot from '../lib/components/qubix/QubixMascot.svelte';

  export let onNavigate; // (view, args?) => void
  let settingsOpen = false;

  const GATEWAY_META = {
    line: { icon: '/icons/gateways/line.png', tagline: 'Numbers, space & patterns' },
    bit:  { icon: '/icons/gateways/bit.png',  tagline: 'Code, logic & systems' },
    atom: { icon: '/icons/gateways/atom.png', tagline: 'Atoms, bonds & reactions' },
    unit: { icon: '/icons/gateways/unit.png', tagline: 'Forces, units & energy' }
  };

  $: overall = ($progress, progress.getOverall());
  $: streak = ($progress, progress.getStreak());
  $: ws = ($progress, progress.getWs());
  $: level = 1 + Math.floor(overall.read / 5);
  $: expansion = ($progress, progress.getExpansionSummary());
  $: routeProgress = expansion.routesTotal
    ? Math.round((expansion.routesDone / expansion.routesTotal) * 100)
    : 0;
  $: duePairedRecall = expansion.dueRecalls[0] || null;
  $: nextPairedRoute = expansion.partialPairs[0] || null;

  // ── Today's session (recall scheduler) ─────────────────────────────────────
  // Preferred: a real 3-question check from the board's topic bank. Fallback
  // (topics without bank questions yet): an Anki-style self-check — honest
  // self-report is the classic SRS pattern and works for every board.
  function recallQuestionsFor(cardNumber) {
    const pathId = pathsForCard(cardNumber)[0];
    if (!pathId) return null;
    const qs = (getPathQuestions(pathId, 24) || [])
      .filter(q => q.type === 'mcq' || q.type === 'truefalse')
      .slice(0, 3);
    return qs.length >= 2 ? qs : null;
  }

  $: dueCandidates = ($progress, progress.getDueBoards(20));
  $: dueMinutes = Math.max(1, Math.ceil(dueCandidates.length * 0.5));

  const SESSION_MAX = 3; // one tap reviews at most 3 boards — keeps it "~3 min"
  let recallQueue = [];
  let recallActive = null; // { cardNumber, questions } | { cardNumber, selfCheck, title }
  let pairedRecallActive = null;

  function startSession() {
    recallQueue = dueCandidates.slice(0, SESSION_MAX);
    nextRecall();
  }
  function nextRecall() {
    const item = recallQueue.shift();
    if (!item) { recallActive = null; return; }
    const questions = recallQuestionsFor(item.cardNumber);
    recallActive = questions
      ? { cardNumber: item.cardNumber, questions }
      : { cardNumber: item.cardNumber, selfCheck: true, title: getBoard(item.cardNumber)?.title || `Board ${item.cardNumber}` };
  }
  function finishRecall(score, total) {
    const passed = total > 0 && score / total >= 0.6;
    progress.recordRecallResult(recallActive.cardNumber, passed);
    nextRecall();
  }
  function selfCheckResult(passed) {
    const n = recallActive.cardNumber;
    progress.recordRecallResult(n, passed);
    if (!passed) {
      // "Show me again" — reread the board now; the 1-day reschedule stands.
      recallQueue = [];
      recallActive = null;
      onNavigate?.('reader', { numbers: [n], start: n });
      return;
    }
    nextRecall();
  }

  function startPairedRecall() {
    pairedRecallActive = duePairedRecall;
  }

  function finishPairedRecall(passed) {
    if (!pairedRecallActive) return;
    progress.recordPairedRecallResult(pairedRecallActive.moduleId, passed);
    pairedRecallActive = null;
  }

  function continuePairedJourney() {
    if (!nextPairedRoute) return;
    onNavigate?.('workshop', {
      moduleId: nextPairedRoute.moduleId,
      mode: nextPairedRoute.learnDone ? 'solve-first' : 'learn-first'
    });
  }

  $: continuePath = ($progress, Object.entries(PATHS)
    .map(([id, manifest]) => ({ id, manifest, state: progress.getPathState(id, manifest) }))
    .filter(p => p.state.boardsRead > 0 && p.state.boardsRead < p.state.boardsTotal)
    .sort((a, b) => b.state.boardsRead - a.state.boardsRead)[0]);

  $: continuePct = continuePath ? Math.round((continuePath.state.boardsRead / continuePath.state.boardsTotal) * 100) : 0;

  // ── One "Continue now" action ──────────────────────────────────────────────
  // The single Home card, in place of the old workout/session/continue trio.
  // Priority: boards due for review (time-sensitive for memory) -> resume the
  // in-progress topic -> the Daily Workout as the default coach pick. Progress
  // decides WHICH is shown, never buries the others: a persistent link keeps
  // the 5-minute mix reachable whenever it is not already the primary.
  $: primary = duePairedRecall
    ? {
        kind: 'pair-recall', icon: 'workshop', label: 'READY TO RECALL',
        title: `Recall ${duePairedRecall.conceptLabel}`,
        meta: '2 min · connect both workshop routes',
        cta: 'Recall', run: startPairedRecall
      }
    : dueCandidates.length
    ? {
        kind: 'review', icon: 'flame', label: 'CONTINUE NOW',
        title: `${dueCandidates.length} ${dueCandidates.length === 1 ? 'board' : 'boards'} due for review`,
        meta: `~${dueMinutes} min · keeps your streak`,
        cta: 'Review', run: startSession
      }
    : nextPairedRoute
      ? {
          kind: 'pair-next', icon: 'workshop', label: 'COMPLETE THE PAIR',
          title: nextPairedRoute.learnDone
            ? `Now solve ${nextPairedRoute.conceptLabel} backwards`
            : `Now build ${nextPairedRoute.conceptLabel} step by step`,
          meta: nextPairedRoute.learnDone
            ? 'Learn First complete · Solve First is next'
            : 'Solve First complete · Learn First is next',
          cta: 'Continue', run: continuePairedJourney
        }
      : continuePath
      ? {
          kind: 'continue', icon: 'chevronRight', label: 'CONTINUE NOW',
          title: `Continue ${continuePath.manifest.name}`,
          meta: `${continuePath.state.boardsRead} / ${continuePath.state.boardsTotal} boards · ${continuePct}%`,
          cta: 'Continue', run: () => onNavigate?.('topicDetail', continuePath.id)
        }
      : {
          kind: 'workout', icon: 'workshop',
          label: overall.read === 0 ? 'START HERE' : 'CONTINUE NOW',
          title: overall.read === 0 ? 'Start with a 5-minute mix' : 'Your 5-minute mix',
          meta: 'recall · weak spots · something new',
          cta: 'Start', run: () => onNavigate?.('workout')
        };

  $: primaryMascotIntent = primary.kind === 'review' || primary.kind === 'pair-recall'
    ? 'loading'
    : primary.kind === 'continue' || primary.kind === 'pair-next'
      ? 'guide'
      : 'welcome';

  // Home is for choosing a direction, not inspecting inventory. Keep each
  // subject door's useful description stable instead of replacing it with a
  // raw board count once the learner has started.
  const doors = Object.entries(PATH_GROUPS).map(([gid, g]) => ({
    gid,
    name: g.name,
    ...GATEWAY_META[gid]
  }));

  // Broad subjects get a topic chooser; the other doors remain quick starts.
  function openDoor(door) {
    // Mathematics and Physics have broad curricula, so their Home doors open
    // a subject hub where learners can choose a topic before starting boards.
    if (door.gid === 'line' || door.gid === 'unit') {
      onNavigate?.('subject', door.gid);
      return;
    }

    const firstPath = PATH_GROUPS[door.gid]?.firstTopic;
    const numbers = PATHS[firstPath]?.cards || [];
    if (numbers.length) onNavigate?.('reader', { numbers, start: numbers[0] });
  }
</script>

<div class="qx-shell home-view">
  <!-- Header: brand-first studio chrome -->
  <div class="header">
    <button class="avatar" on:click={() => onNavigate?.('wscore')} aria-label="Your W Score">{$displayName.charAt(0).toUpperCase()}</button>
    <div class="greeting">
      <div class="brand-mark qx-display">QUBIX</div>
      <div class="hi">Good to see you, {$displayName}</div>
      <div class="level">
        <span class="level-badge">Level {level}</span>
      </div>
    </div>
    <div class="w-chip" title="Ws earned">W {ws}</div>
    <div class="streak-chip">
      <QxIcon name="flame" size={14} />{streak}
    </div>
    <button class="menu-btn icon-btn" on:click={() => onNavigate?.('snippetMode')} aria-label="Did you know" title="Bite-sized curiosities from across STEM">
      <QxIcon name="snippets" size={15} />
    </button>
    <button class="menu-btn" on:click={() => settingsOpen = true} aria-label="Settings">⋯</button>
  </div>

  <SettingsMenu open={settingsOpen} onClose={() => settingsOpen = false} onNavigate={onNavigate} />

  <!-- One state-aware "Continue now" card: due review -> resume the in-progress
       topic -> the Daily Workout default. Replaces the old always-on trio so
       Home answers "what now?" with a single confident action. -->
  <div class="focus-card">
    <button class="focus-main" on:click={primary.run}>
      <span class="focus-mascot"><QubixMascot intent={primaryMascotIntent} size="md" decorative eager /></span>
      <span class="focus-copy">
        <span class="focus-label">{primary.label}</span>
        <span class="focus-title qx-display">{primary.title}</span>
        <span class="focus-meta">{primary.meta}</span>
      </span>
      <span class="focus-cta">{primary.cta}</span>
    </button>
    {#if primary.kind !== 'workout'}
      <button class="focus-alt" on:click={() => onNavigate?.('workout')}>or do your 5-minute mix ›</button>
    {/if}
  </div>

  <section class="learning-loop" aria-labelledby="learning-loop-title">
    <div class="loop-head">
      <div>
        <span class="loop-kicker">Your workshop loop</span>
        <strong id="learning-loop-title">Learn First <b>→</b> Solve First <b>→</b> Recall</strong>
        <small>Build the idea, reverse it, then prove it stayed with you.</small>
      </div>
      <button on:click={() => onNavigate?.('workshop')}>Open workshops</button>
    </div>
    <div class="loop-progress" aria-label={`${expansion.routesDone} of ${expansion.routesTotal} workshop routes complete`}>
      <span style={`width:${routeProgress}%`}></span>
    </div>
    <div class="loop-stats">
      <span><b>{expansion.routesDone}/{expansion.routesTotal}</b> routes</span>
      <span><b>{expansion.pairsComplete}/{expansion.totalPairs}</b> paired concepts</span>
      <span><b>{expansion.recallsThisWeek}</b> recalls this week</span>
    </div>
  </section>

  {#if pairedRecallActive}
    <div class="recall-overlay" role="dialog" aria-modal="true" aria-labelledby="paired-recall-title">
      <div class="recall-sheet paired-recall-sheet">
        <div class="recall-kicker">TWO-WAY RECALL</div>
        <div class="recall-title" id="paired-recall-title">{pairedRecallActive.conceptLabel}</div>
        <div class="recall-q">Without reopening either workshop, can you reconstruct the idea from both directions?</div>
        <div class="paired-prompts">
          <span><b>1</b> Explain the core rule in one sentence.</span>
          <span><b>2</b> Name the evidence or result that proves it.</span>
        </div>
        <div class="recall-actions">
          <button class="recall-yes" on:click={() => finishPairedRecall(true)}>I can explain both</button>
          <button class="recall-no" on:click={() => finishPairedRecall(false)}>I need another run</button>
          <button class="recall-later" on:click={() => pairedRecallActive = null}>Not now</button>
        </div>
        <div class="recall-note">An honest retry returns tomorrow. A clear recall moves to the next interval.</div>
      </div>
    </div>
  {/if}

  {#if recallActive}
    {#key recallActive.cardNumber}
      {#if recallActive.selfCheck}
        <div class="recall-overlay" role="dialog" aria-modal="true">
          <div class="recall-sheet">
            <div class="recall-kicker">RECALL CHECK</div>
            <div class="recall-title">{recallActive.title}</div>
            <div class="recall-q">Without looking — can you still explain this board's core idea?</div>
            <div class="recall-actions">
              <button class="recall-yes" on:click={() => selfCheckResult(true)}>Still got it</button>
              <button class="recall-no" on:click={() => selfCheckResult(false)}>Fuzzy — show me again</button>
            </div>
            <div class="recall-note">Honest answers train the schedule. "Fuzzy" reopens the board and brings it back tomorrow.</div>
          </div>
        </div>
      {:else}
        <CheckpointQuiz questions={recallActive.questions} title="Recall check" onDone={finishRecall} boardIndex={recallActive.cardNumber} />
      {/if}
    {/key}
  {/if}

  <!-- The four doors -->
  <div class="doors-label">{continuePath ? 'Or start somewhere new' : 'Where would you like to start?'}</div>
  <div class="doors-grid">
    {#each doors as door (door.gid)}
      <button class="door" on:click={() => openDoor(door)}>
        <span class="door-icon"><SubjectMark subject={door.gid} size={52} /></span>
        <span class="door-name">{door.name}</span>
        <span class="door-sub">{door.tagline}</span>
        <span class="door-cta">Start learning ›</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .home-view {
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: clamp(20px, 4vw, 34px) var(--qx-page-pad) 12px;
    box-sizing: border-box;
  }

  /* Header */
  .header {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto auto auto auto;
    align-items: center;
    gap: 10px;
    margin-bottom: clamp(24px, 5vw, 40px);
  }
  .avatar {
    width: 46px; height: 46px; border-radius: 15px;
    background: linear-gradient(150deg, color-mix(in srgb, #fff 16%, var(--qx-accent)), color-mix(in srgb, var(--qx-accent) 58%, var(--qx-text)));
    color: #fff;
    font-family: var(--qx-font-display); font-weight: 800; font-size: 19px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    cursor: pointer;
    border: 1px solid color-mix(in srgb, #fff 22%, transparent);
    box-shadow: var(--qx-shadow-card), inset 0 1px 0 color-mix(in srgb, #fff 30%, transparent);
    transition: transform var(--qx-duration-fast) var(--qx-ease-out);
  }
  .avatar:hover { transform: translateY(-1px); }
  .greeting { flex: 1; min-width: 0; }
  .brand-mark {
    margin-bottom: 4px;
    color: var(--qx-accent-text);
    font-size: clamp(22px, 4.2vw, 28px);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.05;
  }
  .hi {
    font-family: var(--qx-font);
    font-size: clamp(14px, 2.4vw, 16px);
    font-weight: 700;
    color: var(--qx-text-2);
    line-height: 1.3;
    letter-spacing: 0;
  }
  .level { font-size: 12px; font-weight: 600; color: var(--qx-text-dim); margin-top: 2px; }
  .level-badge { color: var(--qx-text-faint); }
  .streak-chip {
    min-height: 36px; display: flex; align-items: center; gap: 5px; background: transparent;
    border: 0; padding: 4px 7px; color: var(--qx-accent-text); font-size: 13px; font-weight: 850;
  }
  .w-chip {
    min-height: 36px; display: grid; place-items: center; background: transparent; border: 0;
    padding: 4px 7px; color: var(--qx-green-text);
    font-size: 13px; font-weight: 900; white-space: nowrap;
  }

  /* One "Continue now" card — warm green accent, book-like feel */
  .focus-card { margin-bottom: clamp(16px, 3vw, 22px); }
  .focus-main {
    width: 100%; min-height: 118px; display: flex; align-items: center; gap: 15px; text-align: left;
    padding: clamp(18px, 4vw, 25px); border-radius: var(--qx-radius-lg);
    border: 1px solid var(--qx-border);
    background:
      radial-gradient(circle at 92% 0%, color-mix(in srgb, var(--qx-accent) 14%, transparent), transparent 46%),
      linear-gradient(165deg, var(--qx-surface), var(--qx-surface-2));
    cursor: pointer;
    font-family: var(--qx-font); box-sizing: border-box;
    box-shadow: var(--qx-shadow-card);
    transition: transform var(--qx-duration-fast) var(--qx-ease-out), border-color var(--qx-duration-fast);
  }
  .focus-main:hover { border-color: var(--qx-accent); transform: translateY(-2px); }

  .learning-loop {
    margin: 0 0 clamp(28px, 5vw, 42px);
    padding: clamp(16px, 3vw, 20px);
    border: 1px solid var(--qx-border);
    border-radius: 20px;
    background:
      linear-gradient(115deg, color-mix(in srgb, var(--qx-green-soft) 48%, var(--qx-surface)), var(--qx-surface) 58%);
    box-shadow: var(--qx-shadow-card);
  }
  .loop-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
  }
  .loop-head > div { min-width: 0; display: flex; flex-direction: column; gap: 3px; }
  .loop-kicker {
    color: var(--qx-green-text);
    font-size: 8px;
    font-weight: 950;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
  .loop-head strong {
    color: var(--qx-text);
    font-size: clamp(14px, 2.5vw, 17px);
    line-height: 1.25;
  }
  .loop-head strong b { color: var(--qx-accent-text); padding: 0 2px; }
  .loop-head small { color: var(--qx-text-faint); font-size: 10px; line-height: 1.4; }
  .loop-head button {
    min-height: 36px;
    flex: 0 0 auto;
    padding: 0 13px;
    border: 1px solid var(--qx-accent-strong);
    border-radius: var(--qx-radius-md);
    background: var(--qx-accent-strong);
    color: var(--qx-on-accent);
    font: 900 10px var(--qx-font);
    cursor: pointer;
  }
  .loop-progress {
    height: 6px;
    overflow: hidden;
    margin: 15px 0 10px;
    border-radius: 999px;
    background: var(--qx-surface-2);
  }
  .loop-progress span {
    display: block;
    height: 100%;
    min-width: 3px;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--qx-accent), var(--qx-green));
    transition: width .25s ease;
  }
  .loop-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 7px;
  }
  .loop-stats span {
    min-width: 0;
    color: var(--qx-text-faint);
    font-size: 9px;
    line-height: 1.3;
  }
  .loop-stats b {
    display: block;
    color: var(--qx-text);
    font-size: 11px;
    font-variant-numeric: tabular-nums;
  }
  .focus-mascot {
    width: 68px; height: 72px; flex: 0 0 68px;
    display: grid; place-items: center;
    margin: -5px 0;
  }
  .focus-copy { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
  .focus-label { font-size: 9px; font-weight: 900; letter-spacing: 0.11em; color: var(--qx-accent); }
  .focus-title { font-size: clamp(17px, 3vw, 21px); font-weight: 900; color: var(--qx-text); line-height: 1.2; letter-spacing: -.02em; }
  .focus-meta { font-size: 12px; font-weight: 650; color: var(--qx-text-dim); }
  .focus-cta {
    flex-shrink: 0; padding: 10px 17px; border-radius: var(--qx-radius-md);
    background: var(--qx-accent-strong); color: var(--qx-on-accent); font-size: 12px; font-weight: 900;
    box-shadow: 0 2px 10px color-mix(in srgb, var(--qx-accent) 28%, transparent);
  }
  .focus-alt {
    display: block; width: 100%; text-align: center; margin-top: 8px; padding: 6px;
    background: none; border: none; cursor: pointer; font-family: var(--qx-font);
    font-size: 11.5px; font-weight: 800; color: var(--qx-text-faint);
  }
  .focus-alt:hover { color: var(--qx-accent-text); }

  /* Recall self-check overlay */
  .recall-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(61,46,31,0.35);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; padding: 22px;
  }
  .recall-sheet {
    width: min(380px, 100%); box-sizing: border-box;
    background: var(--qx-surface); border: 1.5px solid var(--qx-border);
    border-radius: var(--qx-radius-lg); padding: 22px 20px;
    display: flex; flex-direction: column; gap: 12px; text-align: center;
  }
  .recall-kicker { font-size: 10px; font-weight: 850; letter-spacing: 0.1em; color: var(--qx-accent-text); }
  .recall-title { font-size: 18px; font-weight: 850; color: var(--qx-text); line-height: 1.3; }
  .recall-q { font-size: 14px; font-weight: 650; color: var(--qx-text-dim); line-height: 1.45; }
  .recall-actions { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
  .recall-yes {
    min-height: 44px; border-radius: 999px; border: none; cursor: pointer;
    background: var(--qx-green); color: #fff; font-family: var(--qx-font);
    font-size: 14px; font-weight: 850;
  }
  .recall-no {
    min-height: 44px; border-radius: 999px; cursor: pointer;
    border: 1.5px solid var(--qx-border-2); background: var(--qx-surface);
    color: var(--qx-text-dim); font-family: var(--qx-font);
    font-size: 14px; font-weight: 800;
  }
  .recall-note { font-size: 11.5px; font-weight: 600; color: var(--qx-text-faint); line-height: 1.4; }
  .paired-prompts {
    display: grid;
    gap: 7px;
    text-align: left;
  }
  .paired-prompts span {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 10px;
    border: 1px solid var(--qx-border);
    border-radius: 12px;
    background: var(--qx-surface-2);
    color: var(--qx-text-dim);
    font-size: 12px;
    font-weight: 700;
    line-height: 1.35;
  }
  .paired-prompts b {
    width: 21px;
    height: 21px;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    border-radius: 7px;
    background: var(--qx-text);
    color: var(--qx-bg);
    font-size: 9px;
  }
  .recall-later {
    min-height: 34px;
    border: 0;
    background: transparent;
    color: var(--qx-text-faint);
    font: 800 12px var(--qx-font);
    cursor: pointer;
  }
  .menu-btn {
    width: 36px; height: 36px; border-radius: 11px; border: 1px solid var(--qx-border);
    background: var(--qx-surface); color: var(--qx-text-dim); font-size: 20px; line-height: 1;
    cursor: pointer; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
    font-family: var(--qx-font); padding: 0 0 6px;
  }
  .menu-btn.icon-btn { padding: 0; }

  /* The four doors — warm topic cards */
  .doors-label { font-size: 11px; font-weight: 900; color: var(--qx-text-faint); letter-spacing: 0.09em; margin-bottom: 14px; text-transform: uppercase; }
  .doors-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding-bottom: 18px; }
  .door {
    min-height: 154px; display: flex; flex-direction: column; align-items: flex-start; gap: 5px;
    padding: 20px; border-radius: var(--qx-radius-lg); border: 1px solid var(--qx-border);
    background: var(--qx-surface); cursor: pointer; font-family: var(--qx-font);
    box-shadow: var(--qx-shadow-card);
    text-align: left;
    transition: transform var(--qx-duration-fast) var(--qx-ease-out), border-color var(--qx-duration-fast) var(--qx-ease-out), box-shadow var(--qx-duration-fast) var(--qx-ease-out);
  }
  .door:hover {
    border-color: var(--qx-accent);
    transform: translateY(-3px);
    box-shadow: 0 8px 22px -14px color-mix(in srgb, var(--qx-accent) 45%, transparent);
  }
  .door-icon { display: block; margin-bottom: 4px; }
  .door-name { font-size: 15px; font-weight: 900; color: var(--qx-text); line-height: 1.18; letter-spacing: -.015em; }
  .door-sub { font-size: 11px; font-weight: 650; color: var(--qx-text-faint); line-height: 1.3; }
  .door-cta { margin-top: auto; padding-top: 8px; font-size: 11px; font-weight: 850; color: var(--qx-accent); }

  @media (min-width: 720px) {
    .doors-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
    .door { min-height: 174px; }
  }

  /* ── Desktop: wider layout, side-by-side sections ── */
  @media (min-width: 900px) {
    .home-view {
      padding: 40px 48px 20px;
      max-width: 1100px;
      margin: 0 auto;
    }
    .header {
      margin-bottom: 44px;
    }
    .hi { font-size: 26px; }
    .focus-card {
      max-width: 720px;
    }
    .focus-main {
      min-height: 130px;
      padding: 28px 32px;
    }
    .focus-title { font-size: 24px; }
    .focus-meta { font-size: 13px; }
    .focus-cta { padding: 12px 24px; font-size: 14px; }
    .learning-loop {
      max-width: 720px;
    }
    .loop-head strong { font-size: 19px; }
    .loop-stats span { font-size: 12px; }
    .loop-stats b { font-size: 15px; }
    .doors-label { font-size: 12px; }
    .doors-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px;
      max-width: 900px;
    }
    .door {
      min-height: 200px;
      padding: 24px;
    }
    .door-name { font-size: 17px; }
    .door-sub { font-size: 13px; }
  }

  @media (max-width: 410px) {
    .home-view { padding-top: 16px; }
    .header {
      grid-template-columns: auto minmax(0, 1fr) auto auto;
      grid-template-areas: "avatar greeting snippets menu";
      gap: 8px;
      margin-bottom: 18px;
    }
    .avatar { grid-area: avatar; }
    .greeting { grid-area: greeting; }
    .w-chip { position: absolute; top: 70px; right: 54px; min-height: 28px; padding: 2px 5px; font-size: 11px; }
    .streak-chip { position: absolute; top: 70px; right: 16px; min-height: 28px; padding: 2px 5px; font-size: 11px; }
    .menu-btn.icon-btn { grid-area: snippets; }
    .menu-btn:not(.icon-btn) { grid-area: menu; }
    .focus-main { min-height: 100px; padding: 16px; border-radius: 22px; }
    .focus-mascot { width: 54px; height: 60px; flex-basis: 54px; margin-left: -7px; }
    .focus-mascot :global(.mascot) { --mascot-size: 58px; }
    .focus-cta { padding: 9px 12px; }
    .learning-loop { padding: 13px 14px; margin-bottom: 24px; border-radius: 16px; }
    .loop-head { align-items: center; gap: 10px; }
    .loop-head small { display: none; }
    .loop-head button { min-height: 32px; padding-inline: 10px; }
    .loop-progress { margin: 10px 0 8px; height: 4px; }
    .loop-stats { gap: 5px; }
    .door { min-height: 138px; padding: 14px; }
    .door-icon :global(img) { width: 44px; height: 44px; }
  }

  @media (max-width: 340px) {
    .home-view { padding-inline: 14px; }
    .doors-grid { gap: 9px; }
    .door { padding-inline: 8px; }
  }
</style>
