<script>
  // Subject hub — the consistent destination for a subject door. A door ALWAYS
  // opens this view for its subject; progress only decides which action is
  // emphasized (Continue), never where the door leads. Browse-all stays on the
  // Path tab; this is the focused single-subject home.
  import { PATHS, PATH_GROUPS, ROADMAP, pathsForCard } from '../lib/content/paths.js';
  import { progress } from '../lib/stores/progress.js';
  import SubjectMark from '../lib/components/SubjectMark.svelte';

  export let gid = 'line';
  export let onNavigate; // (view, args?) => void

  const GATEWAY_META = {
    line: { icon: '/icons/gateways/line.png', tagline: 'Numbers, space & patterns' },
    bit:  { icon: '/icons/gateways/bit.png',  tagline: 'Code, logic & systems' },
    atom: { icon: '/icons/gateways/atom.png', tagline: 'Atoms, bonds & reactions' },
    unit: { icon: '/icons/gateways/unit.png', tagline: 'Forces, units & energy' }
  };

  $: group = PATH_GROUPS[gid] || null;
  $: meta = GATEWAY_META[gid] || {};
  $: roadmap = ROADMAP[gid] || [];

  $: topics = ($progress, group
    ? group.paths.filter((id) => PATHS[id]).map((id) => ({ id, manifest: PATHS[id], state: progress.getPathState(id, PATHS[id]) }))
    : []);
  $: read = topics.reduce((a, t) => a + (t.state.boardsRead || 0), 0);
  $: total = topics.reduce((a, t) => a + (t.state.boardsTotal || 0), 0);
  $: pct = total ? Math.round((read / total) * 100) : 0;

  // Continue: resume the most-progressed in-flight topic; else the first
  // unstarted; else the first topic. Progress picks WHICH, never WHERE.
  $: inProgress = topics
    .filter((t) => t.state.boardsRead > 0 && t.state.boardsRead < t.state.boardsTotal)
    .sort((a, b) => b.state.boardsRead - a.state.boardsRead)[0];
  $: nextTopic = inProgress || topics.find((t) => !(t.state.boardsRead > 0)) || topics[0];
  $: continueLabel = inProgress ? 'Continue learning' : read > 0 ? 'Keep going' : 'Start learning';

  // Review: boards due today that belong to this subject.
  $: pathSet = new Set(group ? group.paths : []);
  $: dueForSubject = ($progress, progress
    .getDueBoards(60)
    .filter((d) => pathsForCard(d.cardNumber).some((p) => pathSet.has(p))));

  function goContinue() { if (nextTopic) onNavigate?.('topicDetail', nextTopic.id); }
  function goPractise() { onNavigate?.('workshop'); }
  function goReview() {
    if (!dueForSubject.length) return;
    const nums = dueForSubject.map((d) => d.cardNumber);
    onNavigate?.('reader', { numbers: nums, start: nums[0] });
  }

  const topicLabel = (s) =>
    !s.boardsRead
      ? 'Not started'
      : s.boardsTotal && s.boardsRead >= s.boardsTotal
        ? 'Done ✓'
        : `${s.boardsRead}/${s.boardsTotal}`;
</script>

<div class="qx-shell subject-view">
  <div class="topbar">
    <button class="back-chev" on:click={() => onNavigate?.('home')} aria-label="Back to home">‹</button>
    <span class="topbar-subject">{group?.name || 'Subject'}</span>
  </div>

  {#if group}
    <!-- Identity + aggregate progress -->
    <div class="hero">
      <span class="hero-icon"><SubjectMark subject={meta.icon} size={58} /></span>
      <div class="hero-info">
        <h1>{group.name}</h1>
        <p>{meta.tagline}</p>
        <div class="meter"><div class="meter-fill" style="width:{pct}%"></div></div>
        <div class="hero-meta">{read} / {total} boards · {pct}%</div>
      </div>
    </div>

    <!-- Actions. Progress decides which is emphasized, not where the door led. -->
    <button class="act act-primary" on:click={goContinue}>
      <span class="act-copy">
        <span class="act-label">{continueLabel}</span>
        {#if nextTopic}<span class="act-sub">{nextTopic.manifest.name}</span>{/if}
      </span>
      <span class="act-go">›</span>
    </button>

    <div class="act-row">
      <button class="act act-sec" on:click={goPractise}>
        <span class="act-label">Practise</span>
        <span class="act-sub">Hands-on drills</span>
      </button>
      <!-- Review (spaced repetition) is not shipped yet — gated as "Coming soon".
           goReview/dueForSubject are kept so re-enabling is a small revert. -->
      <button class="act act-sec muted" disabled>
        <span class="act-label">Review</span>
        <span class="act-sub">Coming soon</span>
      </button>
    </div>

    <!-- Topics -->
    <div class="section-label">Topics</div>
    <div class="topic-list">
      {#each topics as t (t.id)}
        <button class="topic-tile" on:click={() => onNavigate?.('topicDetail', t.id)}>
          <span class="topic-name">{t.manifest.name}</span>
          <span
            class="topic-state"
            class:started={t.state.boardsRead > 0}
            class:done={t.state.boardsTotal > 0 && t.state.boardsRead >= t.state.boardsTotal}
          >{topicLabel(t.state)}</span>
        </button>
      {/each}
    </div>

    {#if roadmap.length}
      <div class="section-label">Coming soon</div>
      <div class="roadmap">
        {#each roadmap as name}<span class="road-chip">{name}</span>{/each}
      </div>
    {/if}
  {:else}
    <div class="empty">Subject not found.</div>
  {/if}
</div>

<style>
  .subject-view { height: 100%; overflow-y: auto; padding: clamp(18px, 4vw, 32px) var(--qx-page-pad) 32px; box-sizing: border-box; }

  /* Topbar */
  .topbar { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; }
  .back-chev {
    width: 38px; height: 38px; border-radius: 12px; border: 1px solid var(--qx-border);
    background: var(--qx-surface); color: var(--qx-text); font-size: 22px; line-height: 1;
    cursor: pointer; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
    font-family: var(--qx-font);
  }
  .topbar-subject { font-size: 13px; font-weight: 800; letter-spacing: 0.04em; color: var(--qx-text-dim); text-transform: uppercase; }

  /* Hero */
  .hero { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 14px; padding: clamp(17px, 4vw, 24px); border: 1px solid var(--qx-border); border-radius: 24px; background: var(--qx-surface); box-shadow: var(--qx-shadow-card); }
  .hero-icon { flex-shrink: 0; display: block; }
  .hero-info { flex: 1; min-width: 0; }
  .hero-info h1 { font-size: clamp(22px, 4vw, 30px); font-weight: 900; color: var(--qx-text); margin: 0; line-height: 1.12; letter-spacing: -.035em; }
  .hero-info p { font-size: 13px; font-weight: 600; color: var(--qx-text-dim); margin: 3px 0 10px; }
  .meter { height: 6px; border-radius: 3px; background: var(--qx-border-2); overflow: hidden; }
  .meter-fill { height: 100%; background: var(--qx-accent); border-radius: 3px; transition: width 0.3s ease; }
  .hero-meta { font-size: 12px; font-weight: 700; color: var(--qx-text-faint); margin-top: 6px; }

  /* Actions */
  .act {
    width: 100%; display: flex; align-items: center; gap: 12px; text-align: left;
    border-radius: 18px; font-family: var(--qx-font); cursor: pointer;
    box-sizing: border-box; border: 1px solid var(--qx-border);
  }
  .act-copy { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .act-label { font-size: 15px; font-weight: 850; line-height: 1.2; }
  .act-sub { font-size: 12px; font-weight: 600; opacity: 0.85; }
  .act-primary {
    background: var(--qx-accent); border-color: transparent; color: #fff;
    min-height: 68px; padding: 15px 18px; margin-bottom: 9px;
  }
  .act-go { font-size: 22px; font-weight: 900; flex-shrink: 0; }
  .act-row { display: flex; gap: 9px; margin-bottom: 30px; }
  .act-sec {
    flex: 1; flex-direction: column; align-items: flex-start; gap: 3px;
    background: var(--qx-surface); color: var(--qx-text); padding: 14px 15px; box-shadow: var(--qx-shadow-card);
  }
  .act-sec .act-sub { color: var(--qx-text-dim); }
  .act-sec.muted { opacity: 0.6; cursor: default; }

  /* Topics */
  .section-label { font-size: 10px; font-weight: 900; letter-spacing: 0.1em; color: var(--qx-text-faint); text-transform: uppercase; margin-bottom: 10px; }
  .topic-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 28px; }
  .topic-tile {
    width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 10px;
    min-height: 58px; padding: 12px 14px; border-radius: 15px; border: 1px solid transparent;
    background: var(--qx-surface); cursor: pointer; font-family: var(--qx-font); text-align: left;
    box-shadow: 0 1px 0 color-mix(in srgb, var(--qx-border) 72%, transparent);
  }
  .topic-tile:hover { border-color: var(--qx-accent); background: var(--qx-accent-soft-2); }
  .topic-name { font-size: 13px; font-weight: 800; color: var(--qx-text); min-width: 0; }
  .topic-state { font-size: 12px; font-weight: 800; color: var(--qx-text-faint); flex-shrink: 0; }
  .topic-state.started { color: var(--qx-accent-text); }
  .topic-state.done { color: var(--qx-green-text); }

  /* Roadmap */
  .roadmap { display: flex; flex-wrap: wrap; gap: 8px; }
  .road-chip {
    font-size: 12px; font-weight: 700; color: var(--qx-text-dim);
    background: var(--qx-surface-2); border: 1px solid var(--qx-border);
    border-radius: var(--qx-radius-pill); padding: 6px 12px;
  }

  .empty { color: var(--qx-text-dim); font-weight: 700; padding: 40px 0; text-align: center; }

  /* ── Desktop ── */
  @media (min-width: 900px) {
    .subject-view { padding: 40px 48px 32px; max-width: 1100px; margin: 0 auto; }
    .hero { padding: 28px 32px; }
    .hero-info h1 { font-size: 34px; }
    .hero-info p { font-size: 15px; }
    .act-primary { min-height: 78px; padding: 20px 24px; }
    .act-label { font-size: 17px; }
    .topic-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
    .topic-tile { min-height: 64px; }
    .topic-name { font-size: 14px; }
  }
</style>
