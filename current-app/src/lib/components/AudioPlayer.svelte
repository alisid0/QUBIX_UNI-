<script>
  export let src = '';
  export let title = '';

  let playing = false;
  let audioEl;
  let currentTime = 0;
  let duration = 0;

  function togglePlay() {
    if (!audioEl) return;
    if (audioEl.paused) {
      audioEl.play();
      playing = true;
    } else {
      audioEl.pause();
      playing = false;
    }
  }

  function timeFormat(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, '0')}`;
  }
</script>

{#if src}
  <div class="audio-player">
    <audio
      bind:this={audioEl}
      src={src}
      on:ended={() => playing = false}
      on:timeupdate={() => { currentTime = audioEl.currentTime; duration = audioEl.duration || 0; }}
      preload="metadata"
    ></audio>
    <button class="play-btn" on:click={togglePlay}>
      {playing ? '❚❚' : '▶'}
    </button>
    <div class="audio-info">
      <span class="audio-title">{title || 'Audio'}</span>
      <div class="seek-bar">
        <div class="seek-track">
          <div class="seek-fill" style="width:{(duration > 0 ? currentTime / duration : 0) * 100}%"></div>
        </div>
        <span class="time">{timeFormat(currentTime)} / {timeFormat(duration)}</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .audio-player {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(0,0,0,0.18);
    border: 1.5px dashed var(--chalk-faint);
    border-radius: var(--radius-md);
    padding: 10px 14px;
    margin: 10px 0;
  }
  .play-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1.5px dashed var(--chalk-green);
    background: rgba(0,0,0,0.2);
    color: var(--chalk-green);
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .play-btn:hover { background: rgba(169, 214, 160, 0.14); }
  .audio-info { flex: 1; min-width: 0; }
  .audio-title {
    font-family: var(--print);
    font-size: 13px;
    color: var(--chalk-dim);
    display: block;
    margin-bottom: 4px;
  }
  .seek-bar {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .seek-track {
    flex: 1;
    height: 5px;
    background: rgba(244,241,233,0.12);
    border-radius: 3px;
    overflow: hidden;
  }
  .seek-fill {
    height: 100%;
    background: var(--chalk-yellow);
    border-radius: 3px;
    transition: width 0.3s;
  }
  .time {
    font-family: var(--print);
    font-size: 11px;
    color: var(--chalk-faint);
    white-space: nowrap;
  }
</style>
