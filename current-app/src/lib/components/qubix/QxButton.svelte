<script>
  export let variant = 'primary'; // primary | secondary | ghost
  export let fullWidth = true;
  export let disabled = false;
</script>

<button
  class="qx-btn {variant}"
  class:full={fullWidth}
  {disabled}
  on:click
>
  <slot />
</button>

<style>
  .qx-btn {
    font-family: var(--qx-font);
    font-size: 14px;
    font-weight: 850;
    border-radius: 13px;
    border: none;
    cursor: pointer;
    min-height: 50px;
    padding: 0 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    max-width: 100%;
    line-height: 1.2;
    text-align: center;
    box-shadow: var(--qx-shadow-card);
    transition: transform var(--qx-duration-fast) var(--qx-ease-out), box-shadow var(--qx-duration-fast) ease;
  }
  .qx-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 22px -14px color-mix(in srgb, var(--qx-accent) 70%, transparent), var(--qx-shadow-card); }
  .qx-btn:active:not(:disabled) { transform: translateY(1px) scale(.985); box-shadow: none; }
  .qx-btn:focus-visible { outline: 3px solid color-mix(in srgb, var(--qx-accent) 55%, transparent); outline-offset: 2px; }
  .qx-btn.full { width: 100%; }
  /* Disabled reads as intentionally inert, not a faded brand button. */
  .qx-btn:disabled { cursor: not-allowed; box-shadow: none; transform: none; }
  .primary:disabled { background: var(--qx-surface-3); color: var(--qx-text-faintest); }
  .secondary:disabled, .ghost:disabled { opacity: .5; }

  .primary { background: linear-gradient(180deg, color-mix(in srgb, #fff 12%, var(--qx-accent)), var(--qx-accent)); color: #ffffff; }
  .secondary {
    background: var(--qx-surface);
    color: var(--qx-text);
    border: 1px solid var(--qx-border-2);
  }
  .ghost {
    background: transparent;
    color: var(--qx-text-dim);
    border: 1px solid var(--qx-border-2);
  }
</style>
