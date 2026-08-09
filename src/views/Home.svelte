<script>
  import { theme } from '../lib/stores/theme.js';
  import { progress, summary } from '../lib/stores/progress.js';
  import { view } from '../lib/stores/view.js';

  function resume() {
    view.set('lesson');
  }

  function startOver() {
    progress.reset();
    view.set('lesson');
  }
</script>

<div class="home-shell">
  <header class="home-header">
    <div class="identity">
      <span class="mark">Q</span>
      <span class="stack">
        <b>QUBIX UNIVERSITY</b>
        <small>Variables and rates of change</small>
      </span>
    </div>
    <button class="icon-btn" aria-label="Toggle colour theme" on:click={() => theme.toggle()}>
      {#if $theme === 'dark'}◑{:else}◐{/if}
    </button>
  </header>

  <main class="home-body">
    <section class="resume-card">
      <span class="micro">{$summary.started ? 'CONTINUE' : 'BEGIN'}</span>

      {#if $summary.started}
        <h1>{$summary.boardTitle}</h1>
        <p class="where">
          Board {$summary.boardNumber} of {$summary.boardCount} ·
          section {$summary.sectionNumber} of {$summary.sectionCount}
        </p>
      {:else}
        <h1>Variables and Rates of Change</h1>
        <p class="where">Five boards, twenty sections, from a letter standing for a number to the rate at a single point.</p>
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

    <section class="board-list" aria-label="Boards">
      {#each $summary.perBoard as b, i}
        <div class="board-row" class:current={i === $summary.boardIndex} class:done={b.complete}>
          <span class="num">{String(i + 1).padStart(2, '0')}</span>
          <span class="names">
            <b>{b.title}</b>
            <small>{b.marker}</small>
          </span>
          <span class="dots" aria-label={`${b.done} of ${b.total} sections`}>
            {#each Array(b.total) as _, f}
              <i class:on={f < b.done}></i>
            {/each}
          </span>
        </div>
      {/each}
    </section>

    <p class="draft-note">
      Curriculum in draft. Nothing here is approved, and every board is
      adapted from public-domain sources with its provenance on record.
    </p>
  </main>
</div>

<style>
  .home-shell { height: 100%; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; background: var(--qx-bg); color: var(--qx-text); font-family: var(--qx-font); }
  .home-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px clamp(16px, 4vw, 40px); border-bottom: 1px solid var(--qx-border); }
  .identity { display: flex; align-items: center; gap: 11px; }
  .mark { width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--qx-accent); display: grid; place-items: center; color: var(--qx-accent-text); font: 800 19px/1 Georgia, serif; }
  .stack { display: flex; flex-direction: column; gap: 2px; }
  .stack b { font-size: 10px; letter-spacing: .17em; }
  .stack small { color: var(--qx-text-dim); font-size: 11px; }
  .icon-btn { width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text); cursor: pointer; }

  .home-body { max-width: 620px; margin: 0 auto; padding: 22px clamp(16px, 4vw, 40px) 60px; display: flex; flex-direction: column; gap: 22px; }

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

  .board-list { display: flex; flex-direction: column; gap: 7px; }
  .board-row { display: flex; align-items: center; gap: 12px; border: 1px solid var(--qx-border); border-radius: 13px; padding: 11px 13px; background: var(--qx-surface); }
  .board-row.current { border-color: var(--qx-accent); background: var(--qx-accent-soft); }
  .board-row.done .num { color: var(--qx-green-text); }
  .num { font-size: 11px; font-weight: 900; letter-spacing: .06em; color: var(--qx-text-faint); }
  .names { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
  .names b { font-size: 14px; }
  .names small { font-size: 10px; letter-spacing: .09em; text-transform: uppercase; color: var(--qx-text-faint); font-weight: 800; }
  .dots { display: flex; gap: 4px; }
  .dots i { width: 6px; height: 6px; border-radius: 50%; background: var(--qx-surface-3); display: block; }
  .dots i.on { background: var(--qx-green); }

  .draft-note { color: var(--qx-text-faint); font-size: 11.5px; line-height: 1.55; border-top: 1px solid var(--qx-border); padding-top: 14px; }
</style>
