<script>
  export let variant = 'primary'; // primary | secondary | ghost
  export let fullWidth = false;
  export let disabled = false;
  export let type = 'button';
</script>

<button
  {type}
  class="chalk-btn {variant}"
  class:full-width={fullWidth}
  {disabled}
  on:click
>
  <slot />
</button>

<style>
  .chalk-btn {
    font-family: var(--print);
    font-size: 16px;
    letter-spacing: 0.02em;
    cursor: pointer;
    border-radius: 30px;
    padding: 13px 28px;
    transition: transform 0.25s, background 0.25s, color 0.25s, opacity 0.25s;
    transform: rotate(-0.6deg);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: var(--tap-target);
    border: none;
    text-decoration: none;
  }
  .chalk-btn:active:not(:disabled) {
    transform: rotate(-0.6deg) translateY(1px);
  }
  .chalk-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .chalk-btn.full-width { width: 100%; }

  .primary {
    background: var(--chalk-yellow);
    color: var(--board-1);
    box-shadow: 0 2px 0 rgba(0,0,0,0.28);
  }
  .primary:hover:not(:disabled) {
    background: #f5db99;
  }

  .secondary {
    background: transparent;
    color: var(--chalk);
    border: 2px dashed var(--chalk-yellow);
  }
  .secondary:hover:not(:disabled) {
    background: rgba(242, 213, 133, 0.1);
  }

  .ghost {
    background: transparent;
    color: var(--chalk-dim);
    border: 1.5px dashed var(--chalk-faint);
  }
  .ghost:hover:not(:disabled) {
    color: var(--chalk);
    border-color: var(--chalk-dim);
  }
</style>
