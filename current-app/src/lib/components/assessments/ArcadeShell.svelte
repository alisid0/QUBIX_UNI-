<script>
  export let eyebrow = 'Qubix arcade';
  export let title = 'STEM mission';
  export let level = 0;
  export let totalLevels = 4;
  export let score = 0;
  export let streak = 0;
  export let onExit = () => {};

  $: progress = Math.max(0, Math.min(100, (level / totalLevels) * 100));
</script>

<div class="arcade-shell">
  <header class="arcade-hud">
    <button class="exit" on:click={onExit} aria-label="Return to all workshops">←</button>
    <div class="identity">
      <span>{eyebrow}</span>
      <strong>{title}</strong>
    </div>
    <div class="stat">
      <span>Score</span>
      <strong>{score.toLocaleString()}</strong>
    </div>
    <div class="stat combo" class:hot={streak > 1}>
      <span>Combo</span>
      <strong>×{Math.max(1, streak)}</strong>
    </div>
  </header>

  <div class="mission-progress">
    <div class="mission-meta">
      <span>{level === 0 ? 'Mission briefing' : level >= totalLevels ? 'Concept unlocked' : `Mission ${level} of ${totalLevels}`}</span>
      <b>{Math.round(progress)}%</b>
    </div>
    <div class="progress-track" aria-label={`Arcade mission progress ${Math.round(progress)}%`}>
      <i style={`width:${progress}%`}></i>
    </div>
  </div>

  <slot></slot>
</div>

<style>
  .arcade-shell {
    width: 100%;
    color: var(--qx-text);
    border-radius: 22px;
  }

  .arcade-hud {
    display: grid;
    grid-template-columns: 38px minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 9px;
    margin-bottom: 10px;
  }

  .exit {
    width: 36px;
    height: 36px;
    border-radius: 12px;
    border: 1px solid var(--qx-border);
    background: var(--qx-surface);
    color: var(--qx-text);
    font: 900 17px/1 var(--qx-font);
    cursor: pointer;
  }

  .identity {
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .identity span,
  .stat span,
  .mission-meta span {
    color: var(--qx-text-faint);
    font-size: 8px;
    font-weight: 900;
    letter-spacing: .1em;
    text-transform: uppercase;
  }

  .identity strong {
    overflow: hidden;
    color: var(--qx-text);
    font-size: 15px;
    font-weight: 950;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .stat {
    min-width: 54px;
    border: 0;
    padding: 5px 4px;
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .stat strong {
    color: var(--qx-text);
    font-size: 13px;
    font-weight: 950;
    font-variant-numeric: tabular-nums;
  }

  .combo {
    min-width: 42px;
  }

  .combo.hot {
    border-color: var(--qx-yellow);
    background: var(--qx-yellow-soft);
  }

  .combo.hot strong {
    color: var(--qx-yellow-text);
  }

  .mission-progress {
    margin-bottom: 14px;
  }

  .mission-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  .mission-meta b {
    color: var(--qx-accent-text);
    font-size: 9px;
    font-variant-numeric: tabular-nums;
  }

  .progress-track {
    height: 5px;
    overflow: hidden;
    border-radius: 999px;
    background: var(--qx-surface-3);
  }

  .progress-track i {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--qx-accent), var(--qx-green));
    box-shadow: 0 0 12px color-mix(in srgb, var(--qx-accent) 65%, transparent);
    transition: width .35s ease;
  }

  @media (max-width: 430px) {
    .arcade-hud {
      grid-template-columns: 36px minmax(0, 1fr) auto;
    }

    .combo {
      display: none;
    }
  }
</style>
