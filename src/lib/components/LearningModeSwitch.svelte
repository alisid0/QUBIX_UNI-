<script>
  export let current = '';
  export let readHref = '?mode=game&mission=shared-book&chapter=1&session=1';
  export let doHref = '?mode=game';
  export let compact = false;
</script>

<nav class:compact class="learning-modes" aria-label="Learning mode">
  <a href={readHref} class:active={current === 'read'} aria-current={current === 'read' ? 'page' : undefined}>
    <span aria-hidden="true">01</span> Reading{compact ? '' : ' mode'}
  </a>
  <a href={doHref} class:active={current === 'do'} aria-current={current === 'do' ? 'page' : undefined}>
    <span aria-hidden="true">02</span> Learn by doing
  </a>
</nav>

<style>
  .learning-modes {
    display: inline-flex;
    align-items: stretch;
    padding: 3px;
    border: 1px solid var(--mode-rule, #d8d0be);
    border-radius: 9px;
    background: var(--mode-surface, rgba(255,255,255,.54));
  }
  a {
    min-height: 38px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 7px;
    border-radius: 6px;
    color: var(--mode-soft, #6d6558);
    font: 700 12px var(--qx-font);
    text-decoration: none;
    white-space: nowrap;
  }
  a:hover { color: var(--mode-ink, #241f16); }
  a.active {
    background: var(--mode-active, #5f7355);
    color: var(--mode-active-ink, #fff);
  }
  a:focus-visible { outline: 2px solid var(--mode-focus, #8c4c2e); outline-offset: 2px; }
  span { font-size: 11.5px; letter-spacing: .08em; opacity: .72; }
  .compact a { min-height: 34px; padding: 6px 9px; font-size: 11px; }

  @media (max-width: 460px) {
    .learning-modes { width: 100%; }
    a { flex: 1; justify-content: center; white-space: normal; text-align: center; }
    .compact span { display: none; }
  }
</style>
