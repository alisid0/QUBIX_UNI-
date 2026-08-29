<script>
  import { onMount, onDestroy } from 'svelte';

  export let text = '';
  export let duration = 'about 1 minute';

  let supported = false;
  let speaking = false;
  let activeText = text;
  let utterance;

  onMount(() => {
    supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  });

  function stop() {
    if (typeof window !== 'undefined' && supported) window.speechSynthesis.cancel();
    speaking = false;
  }

  function toggle() {
    if (!supported) return;
    if (speaking) {
      stop();
      return;
    }

    window.speechSynthesis.cancel();
    utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.94;
    utterance.pitch = 1;
    utterance.onend = () => { speaking = false; };
    utterance.onerror = () => { speaking = false; };
    speaking = true;
    window.speechSynthesis.speak(utterance);
  }

  $: if (activeText !== text) {
    activeText = text;
    stop();
  }

  onDestroy(stop);
</script>

<aside class="audio-briefing" aria-label="Audio summary">
  <div class="audio-mark" aria-hidden="true">◖))</div>
  <div class="audio-copy">
    <span>AUDIO SUMMARY · {duration.toUpperCase()}</span>
    <b>Listen before you read</b>
    <p>This short briefing introduces the learning point. The complete transcript is always available.</p>
    <details>
      <summary>Read transcript</summary>
      <p>{text}</p>
    </details>
  </div>
  {#if supported}
    <button type="button" on:click={toggle} aria-pressed={speaking} aria-label={speaking ? 'Stop audio summary' : 'Play audio summary'}>
      <i aria-hidden="true">{speaking ? '■' : '▶'}</i>
      <span>{speaking ? 'Stop' : 'Listen'}</span>
    </button>
  {:else}
    <span class="unavailable">Audio is unavailable in this browser</span>
  {/if}
</aside>

<style>
  .audio-briefing { margin: 24px clamp(20px, 5vw, 64px) 0; padding: 18px 20px; display: grid;
                    grid-template-columns: auto minmax(0, 1fr) auto; gap: 16px; align-items: center;
                    border: 2px solid #241f16; border-radius: 12px; background: #f4ede0;
                    box-shadow: 6px 6px 0 #241f16; }
  .audio-mark { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 50%;
                background: #5f7355; color: #fff; font: 900 13px var(--qx-font); letter-spacing: -2px; }
  .audio-copy { min-width: 0; display: grid; gap: 3px; }
  .audio-copy > span { color: #8c4c2e; font: 900 11px var(--qx-font); letter-spacing: .12em; }
  .audio-copy > b { color: #241f16; font: 700 18px Georgia, serif; }
  .audio-copy > p { margin: 1px 0 0; color: #625a49; font: 600 12.5px/1.45 var(--qx-font); }
  button { min-width: 96px; padding: 11px 15px; display: flex; justify-content: center; align-items: center; gap: 8px;
           border: 2px solid #241f16; border-radius: 8px; background: #fff; color: #241f16;
           box-shadow: 3px 3px 0 #241f16; font: 900 12px var(--qx-font); cursor: pointer; }
  button:hover { background: #eef1e9; }
  button:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0 #241f16; }
  button:focus-visible, summary:focus-visible { outline: 3px solid #c98c5e; outline-offset: 3px; }
  button i { color: #8c4c2e; font-style: normal; }
  details { margin-top: 5px; }
  summary { width: fit-content; color: #8c4c2e; font: 850 11.5px var(--qx-font); cursor: pointer; }
  details p { margin: 8px 0 2px; max-width: 65ch; color: #4f493e; font: 500 13px/1.6 var(--qx-font); }
  .unavailable { max-width: 130px; color: #756c5c; font: 750 11px/1.35 var(--qx-font); text-align: right; }

  @media (max-width: 620px) {
    .audio-briefing { grid-template-columns: auto 1fr; box-shadow: 4px 4px 0 #241f16; }
    .audio-mark { align-self: start; }
    button, .unavailable { grid-column: 1 / -1; width: 100%; max-width: none; }
  }
</style>
