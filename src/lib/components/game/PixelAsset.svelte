<script>
  export let kind = 'monitor';
  export let label = '';
  export let state = 'idle';
</script>

<svg class:alert={state === 'alert'} class:resolved={state === 'resolved'} viewBox="0 0 64 64" role="img" aria-label={label || kind}>
  {#if kind === 'monitor'}
    <rect class="ink" x="8" y="8" width="48" height="36" rx="4" />
    <rect class="canvas" x="12" y="12" width="40" height="27" rx="1" />
    <rect class="clay" x="16" y="17" width="22" height="4" />
    <rect class="olive" x="16" y="25" width="31" height="3" />
    <rect class="ink" x="27" y="44" width="10" height="7" />
    <rect class="ink" x="20" y="51" width="24" height="5" rx="2" />
  {:else if kind === 'database'}
    <ellipse class="clay" cx="32" cy="14" rx="20" ry="8" />
    <rect class="clay" x="12" y="14" width="40" height="34" />
    <ellipse class="clay" cx="32" cy="48" rx="20" ry="8" />
    <path class="canvas-line" d="M12 25c0 4 9 8 20 8s20-4 20-8M12 37c0 4 9 8 20 8s20-4 20-8" />
  {:else if kind === 'folder'}
    <path class="clay" d="M7 18h21l5 6h24v28H7z" />
    <path class="canvas" d="M7 25h50v27H7z" />
    <rect class="ink" x="16" y="33" width="28" height="3" />
    <rect class="ink" x="16" y="40" width="20" height="3" />
  {:else if kind === 'branch'}
    <path class="clay" d="M8 25 32 9l24 16v31H8z" />
    <rect class="canvas" x="14" y="29" width="36" height="27" />
    <rect class="ink" x="27" y="36" width="10" height="20" />
    <rect class="olive" x="17" y="35" width="7" height="8" />
    <rect class="olive" x="40" y="35" width="7" height="8" />
  {:else if kind === 'feed'}
    <rect class="canvas" x="10" y="7" width="40" height="50" rx="3" />
    <path class="clay" d="M42 7h8v8z" />
    <rect class="ink" x="16" y="18" width="27" height="4" />
    <rect class="ink" x="16" y="28" width="32" height="3" />
    <rect class="ink" x="16" y="36" width="32" height="3" />
    <rect class="ink" x="16" y="44" width="22" height="3" />
    <circle class="red" cx="50" cy="50" r="8" />
    <path class="canvas-line thick" d="M50 45v6m0 3v1" />
  {:else if kind === 'alert'}
    <path class="red" d="M32 6 59 55H5z" />
    <rect class="canvas" x="29" y="21" width="6" height="19" rx="2" />
    <circle class="canvas" cx="32" cy="47" r="3" />
  {:else if kind === 'clipboard'}
    <rect class="canvas" x="11" y="10" width="42" height="48" rx="4" />
    <rect class="clay" x="23" y="6" width="18" height="10" rx="3" />
    <path class="olive-line thick" d="m19 29 5 5 9-11" />
    <rect class="ink" x="36" y="27" width="10" height="3" />
    <path class="olive-line thick" d="m19 45 5 5 9-11" />
    <rect class="ink" x="36" y="43" width="10" height="3" />
  {:else if kind === 'server'}
    <rect class="ink" x="11" y="6" width="42" height="52" rx="3" />
    {#each [12, 25, 38] as y}
      <rect class="canvas" x="16" {y} width="32" height="9" rx="2" />
      <circle class="olive" cx="21" cy={y + 4.5} r="2" />
      <rect class="clay" x="27" y={y + 3} width="16" height="3" />
    {/each}
  {/if}
</svg>

<style>
  svg{display:block;width:100%;height:100%;shape-rendering:crispEdges}.ink{fill:#20241f}.canvas{fill:#f7f3e9}.clay{fill:#b85530}.olive{fill:#315f48}.red{fill:#b34231}.canvas-line,.olive-line{fill:none;stroke:#f7f3e9;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.olive-line{stroke:#315f48}.thick{stroke-width:4}.alert{filter:drop-shadow(0 0 5px rgba(179,66,49,.32))}.resolved{filter:drop-shadow(0 0 5px rgba(49,95,72,.26))}
</style>
