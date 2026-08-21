<script>
  import { onMount } from 'svelte';
  import { MASCOT_POSTER, resolveMascotAnimation } from '../mascot.js';

  export let animation = '';
  export let intent = 'rest';
  export let size = 'md';
  export let decorative = true;
  export let label = '';
  export let still = false;
  export let eager = false;

  let reducedMotion = false;
  let videoFailed = false;

  $: resolved = resolveMascotAnimation({ animation, intent });
  $: accessibleLabel = label || resolved.label;
  $: showStill = still || reducedMotion || videoFailed;

  onMount(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => reducedMotion = media.matches;
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  });
</script>

<span
  class="mascot"
  class:wide={resolved.framing === 'wide'}
  class:still={showStill}
  data-size={size}
  aria-hidden={decorative ? 'true' : undefined}
  role={decorative ? undefined : 'img'}
  aria-label={decorative ? undefined : accessibleLabel}
>
  {#if showStill}
    <img src={MASCOT_POSTER} alt="" loading={eager ? 'eager' : 'lazy'} draggable="false" />
  {:else}
    {#key resolved.name}
      <video
        src={resolved.src}
        poster={MASCOT_POSTER}
        autoplay
        muted
        playsinline
        loop={resolved.loop}
        preload={eager ? 'auto' : 'metadata'}
        on:error={() => videoFailed = true}
      ></video>
    {/key}
  {/if}
</span>

<style>
  .mascot {
    --mascot-size: 72px;
    position: relative;
    display: inline-grid;
    place-items: center;
    width: var(--mascot-size);
    height: var(--mascot-size);
    overflow: hidden;
    flex: none;
    pointer-events: none;
    user-select: none;
    contain: layout paint;
  }

  .mascot[data-size='xs'] { --mascot-size: 40px; }
  .mascot[data-size='sm'] { --mascot-size: 56px; }
  .mascot[data-size='lg'] { --mascot-size: 104px; }
  .mascot[data-size='xl'] { --mascot-size: 144px; }

  video,
  img {
    position: absolute;
    width: 118%;
    height: 215%;
    max-width: none;
    object-fit: contain;
    transform: translateY(0);
  }

  .wide video,
  .wide img {
    width: 100%;
    height: 178%;
  }

  .still img { width: 118%; height: 215%; }

  @media (prefers-reduced-motion: reduce) {
    video { display: none; }
  }
</style>
