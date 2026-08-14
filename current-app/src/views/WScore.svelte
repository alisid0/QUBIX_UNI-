<script>
  import { PATHS, totalBoards } from '../lib/content/paths.js';
  import { progress } from '../lib/stores/progress.js';
  import { displayName } from '../lib/stores/auth.js';
  import { getLeague } from '../lib/stores/league.js';
  import QxIcon from '../lib/components/qubix/QxIcon.svelte';

  export let onNavigate;

  const TOTAL_BOARDS = totalBoards();

  // All real, derived from local progress (referencing $progress to stay reactive).
  $: overall = ($progress, progress.getOverall());
  $: pct = TOTAL_BOARDS ? Math.round((overall.read / TOTAL_BOARDS) * 100) : 0;
  $: streak = ($progress, progress.getStreak());
  $: ws = ($progress, progress.getWs());
  $: weeklyPoints = ($progress, progress.getWeeklyPoints());
  $: league = ($progress, getLeague());
  $: yourRank = league.members.findIndex(m => m.isYou) + 1;
  $: activity = ($progress, progress.getActivity(7));
  $: activeDays = activity.filter(a => a.active).length;
  $: pace = ($progress, progress.getPace());
  $: medals = ($progress, progress.getMedals());
  $: earnedMedals = medals.filter(m => m.earned);
  $: started = ($progress, Object.values(PATHS).filter(m => m.cards.some(n => $progress.boards && $progress.boards[n] && $progress.boards[n].firstOpenedAt)).length);
  $: topicsTotal = Object.keys(PATHS).length;
  $: quizzesTaken = ($progress, Object.values($progress.quizzes || {}).reduce((a, arr) => a + (arr ? arr.length : 0), 0));
  $: expansion = ($progress, progress.getExpansionSummary());
  $: routeProgress = expansion.routesTotal
    ? Math.round((expansion.routesDone / expansion.routesTotal) * 100)
    : 0;

  function barH(count) {
    if (!count) return 6;
    return Math.min(100, 30 + count * 20);
  }
</script>

<div class="qx-shell stats-view">
  <div class="top-row">
    <div class="top-left">
      <h1>W Score</h1>
    </div>
    <div class="avatar">{$displayName.charAt(0).toUpperCase()}</div>
  </div>

  <!-- W hero: the primary metric -->
  <div class="w-hero">
    <div class="w-hero-number qx-display">W {ws}</div>
    <div class="w-hero-sub">
      {#if ws === 0}Your journey starts here{:else}this week: {weeklyPoints} pts{/if}
    </div>
  </div>

  <!-- Boards read + Streak -->
  <div class="top-cards">
    <div class="tc-card">
      <div class="tc-label">Boards read</div>
      <div class="tc-value">{overall.read}/{TOTAL_BOARDS}</div>
    </div>
    <div class="tc-card streak-card">
      <div class="tc-label">Streak</div>
      <div class="tc-value streak-value"><QxIcon name="flame" size={17} /> {streak} <span class="tc-unit">{streak === 1 ? 'day' : 'days'}</span></div>
    </div>
  </div>

  <!-- Consistency (last 7 days) -->
  <div class="section-label">This week</div>
  <div class="consistency-row">
    {#each activity as d}
      <div class="bar-col">
        <div class="bar-track"><div class="bar-fill" class:on={d.active} style="height:{barH(d.count)}%"></div></div>
        <span class="bar-day">{d.weekday}</span>
      </div>
    {/each}
    <span class="consistency-summary">{activeDays} of 7 days</span>
  </div>

  <section class="loop-summary" aria-labelledby="loop-summary-title">
    <div class="loop-summary-head">
      <div>
        <span>Workshop progress</span>
        <strong id="loop-summary-title">Learn → Solve → Recall</strong>
      </div>
      <b>{expansion.pairsComplete}/{expansion.totalPairs} pairs</b>
    </div>
    <div class="loop-summary-progress" aria-label={`${routeProgress}% of paired workshop routes complete`}>
      <span style={`width:${routeProgress}%`}></span>
    </div>
    <div class="loop-summary-grid">
      <div><b>{expansion.routesThisWeek}</b><span>routes this week</span></div>
      <div><b>{expansion.pairsThisWeek}</b><span>pairs completed</span></div>
      <div><b>{expansion.recallsThisWeek}</b><span>recalls completed</span></div>
    </div>
    <button on:click={() => onNavigate?.('workshop')}>Continue the workshop loop</button>
  </section>

  <!-- League (local-first preview) -->
  <div class="league-head">
    <span class="section-label">{league.name} · you're #{yourRank}</span>
    <span class="league-reset">Resets Monday</span>
  </div>
  <div class="league-card">
    {#each league.members.slice(0, Math.max(8, yourRank + 1)) as m, i}
      <div class="league-row" class:you={m.isYou}>
        <span class="league-rank">{i + 1}</span>
        <span class="league-avatar">{m.name.charAt(0)}</span>
        <span class="league-name">{m.name}</span>
        <span class="league-pts">{m.points} pts</span>
      </div>
    {/each}
    <div class="league-note">Preview league — goes live with accounts.</div>
  </div>

  <!-- Metrics -->
  <div class="metrics-row">
    <div class="metric">
      <div class="metric-label">This week</div>
      <div class="metric-value">{pace}</div>
    </div>
    <div class="metric">
      <div class="metric-label">Checks</div>
      <div class="metric-value">{quizzesTaken}</div>
    </div>
    <div class="metric">
      <div class="metric-label">Topics</div>
      <div class="metric-value">{started}/{topicsTotal}</div>
    </div>
  </div>

  <!-- Medals -->
  <div class="section-label">Medals &middot; {earnedMedals.length} earned</div>
  {#if earnedMedals.length}
    <div class="medal-row">
      {#each earnedMedals as m}
        <div class="medal-chip"><span aria-hidden="true">M</span>{m.label}</div>
      {/each}
    </div>
  {:else}
    <div class="medal-empty">Read a board or pass a check to earn your first medal.</div>
  {/if}
</div>

<style>
  .stats-view { height: 100%; overflow-y: auto; padding: clamp(20px, 4vw, 34px) var(--qx-page-pad) 32px; box-sizing: border-box; }
  .top-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .top-left { display: flex; align-items: center; gap: 10px; }
  h1 { font-size: clamp(26px, 4vw, 34px); font-weight: 900; color: var(--qx-text); margin: 0; letter-spacing: -.035em; }
  .avatar {
    width: 40px; height: 40px; border-radius: 13px;
    background: linear-gradient(150deg, color-mix(in srgb, #fff 16%, var(--qx-accent)), color-mix(in srgb, var(--qx-accent) 58%, var(--qx-text)));
    color: #fff;
    font-family: var(--qx-font-display); font-weight: 800; font-size: 16px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    border: 1px solid color-mix(in srgb, #fff 22%, transparent);
    box-shadow: var(--qx-shadow-card), inset 0 1px 0 color-mix(in srgb, #fff 30%, transparent);
  }

  /* W hero */
  .w-hero {
    text-align: left;
    padding: clamp(22px, 5vw, 34px);
    margin-bottom: 12px;
    border-radius: 26px;
    background:
      radial-gradient(circle at 92% 5%, color-mix(in srgb, var(--qx-green) 18%, transparent), transparent 35%),
      var(--qx-surface-elevated);
    box-shadow: 0 24px 54px -34px rgba(0,0,0,.75);
  }
  .w-hero-number {
    font-size: clamp(42px, 8vw, 64px); font-weight: 950; color: var(--qx-green); line-height: 1;
    font-variant-numeric: tabular-nums;
    letter-spacing: -.055em;
  }
  .w-hero-sub { font-size: 12px; font-weight: 750; color: #B9AF9D; margin-top: 7px; }

  /* League */
  .league-head { display: flex; justify-content: space-between; align-items: baseline; }
  .league-reset { font-size: 11px; font-weight: 700; color: var(--qx-text-faint); }
  .league-card {
    border: 1px solid var(--qx-border); background: var(--qx-surface);
    border-radius: 20px; padding: 7px 0 0; margin-bottom: 24px;
    box-shadow: var(--qx-shadow-card);
  }
  .league-row {
    display: flex; align-items: center; gap: 10px; padding: 8px 14px;
    font-size: 13px; font-weight: 700; color: var(--qx-text);
  }
  .league-row.you { background: var(--qx-accent-soft); }
  .league-rank { width: 20px; text-align: right; color: var(--qx-text-faint); font-variant-numeric: tabular-nums; }
  .league-avatar {
    width: 26px; height: 26px; border-radius: 50%; background: var(--qx-surface-2);
    color: var(--qx-text-dim); font-size: 12px; font-weight: 800;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .league-row.you .league-avatar { background: var(--qx-accent); color: #fff; }
  .league-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .league-pts { color: var(--qx-text-dim); font-variant-numeric: tabular-nums; }
  .league-note {
    padding: 8px 14px 10px; font-size: 11px; font-weight: 600; color: var(--qx-text-faint);
    border-top: 1px solid var(--qx-border);
  }

  .top-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 28px; }
  .tc-card { border: 1px solid var(--qx-border); background: var(--qx-surface); border-radius: 17px; padding: 15px; box-shadow: var(--qx-shadow-card); }
  .tc-label { font-size: 11px; font-weight: 700; color: var(--qx-text-faint); margin-bottom: 4px; }
  .tc-value { font-size: 20px; font-weight: 800; color: var(--qx-text); }
  .streak-value { display: flex; align-items: center; gap: 4px; color: var(--qx-accent-text); }
  .tc-unit { font-size: 13px; font-weight: 600; color: var(--qx-text-dim); }

  .section-label { font-size: 10px; font-weight: 900; letter-spacing: .09em; text-transform: uppercase; color: var(--qx-text-faint); margin-bottom: 10px; }

  /* Consistency */
  .consistency-row { display: flex; gap: 6px; align-items: flex-end; height: 70px; margin-bottom: 30px; position: relative; }
  .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; gap: 4px; }
  .bar-track { flex: 1; width: 100%; display: flex; align-items: flex-end; border-radius: 5px; overflow: hidden; background: var(--qx-surface-2); }
  .bar-fill { width: 100%; background: var(--qx-border-2); border-radius: 5px 5px 0 0; transition: height 0.3s; }
  .bar-fill.on { background: var(--qx-accent); }
  .bar-day { font-size: 10px; font-weight: 600; color: var(--qx-text-faint); }
  .consistency-summary { font-size: 12px; font-weight: 600; color: var(--qx-text-faint); position: absolute; bottom: -20px; right: 0; }

  .loop-summary {
    margin: 0 0 28px;
    padding: 18px;
    border: 1px solid var(--qx-border);
    border-radius: 20px;
    background:
      linear-gradient(120deg, color-mix(in srgb, var(--qx-green-soft) 52%, var(--qx-surface)), var(--qx-surface) 62%);
    box-shadow: var(--qx-shadow-card);
  }
  .loop-summary-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }
  .loop-summary-head > div { display: flex; flex-direction: column; gap: 2px; }
  .loop-summary-head span {
    color: var(--qx-green-text);
    font-size: 8px;
    font-weight: 950;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
  .loop-summary-head strong { color: var(--qx-text); font-size: 16px; }
  .loop-summary-head > b {
    color: var(--qx-text-dim);
    font-size: 11px;
    font-variant-numeric: tabular-nums;
  }
  .loop-summary-progress {
    height: 7px;
    overflow: hidden;
    margin: 15px 0 12px;
    border-radius: 999px;
    background: var(--qx-surface-2);
  }
  .loop-summary-progress span {
    display: block;
    min-width: 3px;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--qx-accent), var(--qx-green));
  }
  .loop-summary-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
  .loop-summary-grid div {
    min-width: 0;
    padding: 9px;
    border: 1px solid color-mix(in srgb, var(--qx-border) 72%, transparent);
    border-radius: 12px;
    background: color-mix(in srgb, var(--qx-surface) 74%, transparent);
  }
  .loop-summary-grid b {
    display: block;
    color: var(--qx-text);
    font-size: 15px;
    font-variant-numeric: tabular-nums;
  }
  .loop-summary-grid span {
    display: block;
    margin-top: 2px;
    color: var(--qx-text-faint);
    font-size: 9px;
    line-height: 1.25;
  }
  .loop-summary button {
    width: 100%;
    min-height: 40px;
    margin-top: 12px;
    border: 1px solid var(--qx-accent);
    border-radius: 12px;
    background: var(--qx-accent);
    color: #fff;
    font: 900 11px var(--qx-font);
    cursor: pointer;
  }

  /* Metrics */
  .metrics-row { display: flex; gap: 10px; margin-bottom: 20px; }
  .metric { flex: 1; border: 1px solid var(--qx-border); background: var(--qx-surface); border-radius: 16px; padding: 13px; text-align: left; box-shadow: var(--qx-shadow-card); }
  .metric-label { font-size: 11px; font-weight: 700; color: var(--qx-text-faint); margin-bottom: 3px; }
  .metric-value { font-size: 17px; font-weight: 800; color: var(--qx-text); }

  /* Medals */
  .medal-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
  .medal-chip { display: flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 800; color: var(--qx-yellow-text); background: var(--qx-yellow-soft); border-radius: 13px; padding: 7px 10px; }
  .medal-chip > span { width: 22px; height: 22px; display: grid; place-items: center; border-radius: 7px; background: var(--qx-yellow); color: #fff; font-size: 9px; font-weight: 950; }
  .medal-empty { font-size: 13px; color: var(--qx-text-faint); margin-bottom: 20px; }

  /* ── Desktop ── */
  @media (min-width: 900px) {
    .stats-view { padding: 40px 48px 32px; max-width: 1000px; margin: 0 auto; }
    h1 { font-size: 34px; }
    .top-cards { gap: 16px; }
    .league-card { max-width: 700px; }
    .metrics-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
    .metric-value { font-size: 20px; }
  }
</style>
