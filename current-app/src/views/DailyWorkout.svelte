<script>
  // Daily Workout — the coach. A composed ~6-item session: recall-due topics,
  // your weakest tested topic, and one taste of something new. Runs in the
  // normal teaching Workshop (feedback on), rewards once per day, and grades
  // the included recall boards coarsely from the overall result.
  import Workshop from '../lib/components/assessments/Workshop.svelte';
  import { composeWorkout } from '../lib/content/workout.js';
  import { progress } from '../lib/stores/progress.js';

  export let onNavigate;

  let session = composeWorkout(progress);
  let runId = 0;
  let finished = false;
  let score = 0;
  let total = 0;

  function finish(finalScore, finalTotal) {
    score = finalScore;
    total = finalTotal;
    finished = true;
    progress.recordWorkoutComplete(finalScore, finalTotal);
    // Coarse recall grading: the workout included one item per due board's
    // topic; a solid overall run counts those recalls as passed.
    const passed = finalTotal > 0 && finalScore / finalTotal >= 0.67;
    session.recallBoards.forEach((n) => progress.recordRecallResult(n, passed));
  }

  function anotherRound() {
    session = composeWorkout(progress);
    runId += 1;
    finished = false;
    score = 0;
    total = 0;
  }

  $: streak = ($progress, progress.getStreak());
  $: pct = total ? Math.round((score / total) * 100) : 0;
  $: mixLine = [
    session.parts.recall ? `${session.parts.recall} recall` : null,
    session.parts.weak ? `${session.parts.weak} weak-spot${session.weakName ? ` (${session.weakName})` : ''}` : null,
    session.parts.fresh ? `${session.parts.fresh} new` : null,
    (session.items.length - session.parts.recall - session.parts.weak - session.parts.fresh) > 0
      ? `${session.items.length - session.parts.recall - session.parts.weak - session.parts.fresh} mixed` : null
  ].filter(Boolean).join(' · ');
</script>

<div class="qx-shell workout-view">
  <div class="topbar">
    <button class="back-chev" on:click={() => onNavigate?.('home')}>‹</button>
    <div class="topbar-info">
      <div class="topbar-kicker">Daily workout</div>
      <div class="topbar-mix">{mixLine}</div>
    </div>
    <span class="streak-pill">🔥 {streak}</span>
  </div>

  <div class="workout-card">
    {#if finished}
      <div class="done-state">
        <div class="score-ring" class:good={pct >= 67}>{pct}%</div>
        <h2>{score}/{total} — workout done</h2>
        <div class="reward-line">+{score + 5} W · 🔥 streak {streak}</div>
        <p>
          {#if pct >= 80}Sharp. Today's mix is handled — recall marked, weak spot worked, streak fed.
          {:else if pct >= 50}Good work. The misses show tomorrow's mix where to aim.
          {:else}That was a hard mix — exactly the point. Another round pulls fresh questions.
          {/if}
        </p>
        <div class="done-actions">
          <button class="primary-btn" on:click={anotherRound}>Another round</button>
          <button class="ghost-btn" on:click={() => onNavigate?.('home')}>Done for today</button>
        </div>
      </div>
    {:else if session.items.length}
      {#key runId}
        <Workshop interactions={session.items} onDone={finish} />
      {/key}
    {:else}
      <div class="done-state">
        <p>Couldn't compose a workout — no workshop banks reachable.</p>
        <button class="ghost-btn" on:click={() => onNavigate?.('home')}>Back home</button>
      </div>
    {/if}
  </div>
</div>

<style>
  .workout-view { height: 100%; overflow-y: auto; padding: 16px 18px 24px; box-sizing: border-box; }

  .topbar { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .back-chev {
    width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--qx-border);
    background: var(--qx-surface); color: var(--qx-text); font-size: 20px; cursor: pointer;
    display: grid; place-items: center; flex-shrink: 0; font-family: var(--qx-font);
  }
  .topbar-info { flex: 1; min-width: 0; }
  .topbar-kicker {
    font-size: 11px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--qx-accent);
  }
  .topbar-mix { font-size: 12px; font-weight: 650; color: var(--qx-text-dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .streak-pill {
    flex-shrink: 0; font-size: 12px; font-weight: 850;
    border: 1px solid var(--qx-border); border-radius: 999px; padding: 5px 11px;
    background: var(--qx-surface-2); color: var(--qx-text);
  }

  .workout-card {
    border: 1.5px solid var(--qx-border); border-radius: 10px;
    background: var(--qx-surface); padding: 16px 14px;
  }

  .done-state { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; padding: 22px 4px; }
  .score-ring {
    width: 84px; height: 84px; border-radius: 50%; display: grid; place-items: center;
    border: 4px solid var(--qx-danger); color: var(--qx-danger-text);
    font-size: 20px; font-weight: 900; background: var(--qx-surface-2);
  }
  .score-ring.good { border-color: var(--qx-green); color: var(--qx-green-text); }
  .done-state h2 { font-size: 18px; font-weight: 900; color: var(--qx-text); margin: 0; }
  .reward-line {
    font-size: 13px; font-weight: 850; color: var(--qx-yellow-text);
    background: var(--qx-yellow-soft); border: 1px solid var(--qx-yellow);
    border-radius: 999px; padding: 6px 14px;
  }
  .done-state p { font-size: 13.5px; font-weight: 650; color: var(--qx-text-dim); line-height: 1.5; max-width: 36ch; margin: 0; }

  .done-actions { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
  .primary-btn {
    min-height: 42px; border-radius: 999px; border: none; padding: 0 22px;
    background: var(--qx-accent); color: #fff; font-family: var(--qx-font);
    font-size: 14px; font-weight: 850; cursor: pointer;
  }
  .ghost-btn {
    min-height: 42px; border-radius: 999px; border: 1.5px solid var(--qx-border-2); padding: 0 18px;
    background: var(--qx-surface); color: var(--qx-text-dim); font-family: var(--qx-font);
    font-size: 14px; font-weight: 800; cursor: pointer;
  }
</style>
