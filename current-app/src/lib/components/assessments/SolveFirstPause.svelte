<script>
  export let title = 'Pause and notice';
  export let message = 'Take a moment to read the result before moving on.';
  export let actionLabel = 'Continue when ready';
  export let onContinue = () => {};
</script>

<aside class="pause" aria-live="polite" aria-label="Stage complete">
  <div class="copy">
    <span>Stage complete · No timer</span>
    <strong>{title}</strong>
    <p>{message}</p>
  </div>
  <button type="button" on:click={onContinue}>
    {actionLabel}
    <i aria-hidden="true">›</i>
  </button>
</aside>

<style>
  .pause {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 14px;
    width: 100%;
    margin-top: 12px;
    padding: 13px;
    border: 2px solid var(--qx-green);
    border-radius: 4px;
    background:
      repeating-linear-gradient(0deg, transparent 0 5px, color-mix(in srgb, var(--qx-green) 5%, transparent) 5px 6px),
      color-mix(in srgb, var(--qx-green-soft) 74%, var(--qx-surface));
    box-shadow: var(--qx-shadow-card);
    box-sizing: border-box;
  }

  .copy {
    min-width: 0;
  }

  .copy span {
    display: block;
    margin-bottom: 3px;
    color: var(--qx-green-text);
    font-size: 8px;
    font-weight: 950;
    letter-spacing: .12em;
    line-height: 1.2;
    text-transform: uppercase;
  }

  .copy strong {
    display: block;
    color: var(--qx-text);
    font-size: 13px;
    font-weight: 950;
    line-height: 1.3;
  }

  .copy p {
    max-width: 60ch;
    margin: 4px 0 0;
    color: var(--qx-text-dim);
    font-size: 11px;
    font-weight: 650;
    line-height: 1.45;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 46px;
    padding: 0 15px;
    border: 2px solid var(--qx-green);
    border-radius: 3px;
    background: var(--qx-green);
    box-shadow: var(--qx-shadow-card);
    color: var(--qx-green-contrast, #10210d);
    cursor: pointer;
    font: inherit;
    font-size: 10px;
    font-weight: 950;
    letter-spacing: .035em;
    line-height: 1.15;
    text-transform: uppercase;
  }

  button:hover {
    filter: brightness(1.05);
  }

  button:focus-visible {
    outline: 3px solid var(--qx-focus, var(--qx-accent));
    outline-offset: 3px;
  }

  button:active {
    transform: translateY(1px);
    box-shadow: none;
  }

  button i {
    font-size: 18px;
    font-style: normal;
    line-height: 1;
  }

  @media (max-width: 520px) {
    .pause {
      grid-template-columns: 1fr;
      gap: 10px;
    }

    button {
      width: 100%;
    }
  }
</style>
