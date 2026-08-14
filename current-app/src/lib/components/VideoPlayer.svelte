<script>
  export let src = '';
  export let poster = '';
  export let aspectRatio = '16/9';
  export let caption = '';

  let playing = false;
  let videoEl;

  function togglePlay() {
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.play();
      playing = true;
    } else {
      videoEl.pause();
      playing = false;
    }
  }
</script>

{#if src}
  <div class="video-container" style="aspect-ratio:{aspectRatio}">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
      bind:this={videoEl}
      src={src}
      poster={poster}
      on:ended={() => playing = false}
      on:play={() => playing = true}
      on:pause={() => playing = false}
      playsinline
      preload="metadata"
    ></video>
    <button class="play-overlay" class:playing on:click={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
      {playing ? '❚❚' : '▶'}
    </button>
  </div>
  {#if caption}
    <p class="video-caption">{caption}</p>
  {/if}
{/if}

<style>
  .video-container {
    position: relative;
    width: 100%;
    border-radius: var(--radius-sm);
    overflow: hidden;
    background: #000;
    border: 1.5px dashed var(--chalk-faint);
    margin: 12px 0;
  }
  .video-container video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
  .play-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    border: none;
    color: var(--chalk);
    font-size: 32px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    transition: opacity 0.25s, background 0.25s;
  }
  .play-overlay:hover { opacity: 1; background: rgba(0,0,0,0.2); }
  .play-overlay.playing { opacity: 0; }
  .play-overlay.playing:hover { opacity: 0.8; }
  .video-caption {
    font-family: var(--print);
    font-size: 12px;
    color: var(--chalk-faint);
    text-align: center;
    margin-top: 4px;
  }
</style>
