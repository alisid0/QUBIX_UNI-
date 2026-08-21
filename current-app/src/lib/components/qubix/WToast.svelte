<script>
  // Floating "+N W" reward toast. Mounted once in App.svelte; listens to the
  // wtoast store and plays the reward chime. Olive (green) family per the
  // design spec — green = wins earned. Animation respects reduced motion;
  // the sound plays either way (muted via the 'qubix-sound' pref).
  import { onDestroy } from 'svelte';
  import { wtoast } from '../../stores/wtoast.js';
  import { playAward, playBonus } from '../../sfx.js';

  let visible = null;   // { id, amount, bonus }
  let playedId = null;  // last toast id we chimed for — tracked SEPARATELY from
                        // `visible` so hiding the toast can't retrigger the sound
  let hideTimer = null;

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fire once per NEW toast id. Guarding on `playedId` (not `visible?.id`) is
  // deliberate: the hide-timer sets `visible = null`, and if the condition read
  // `visible?.id` that reset would re-satisfy it and loop the chime
  // forever. `playedId` only changes here, so a hidden toast never replays.
  $: if ($wtoast && $wtoast.id !== playedId) {
    playedId = $wtoast.id;
    visible = $wtoast;
    ($wtoast.bonus ? playBonus : playAward)();
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { visible = null; }, $wtoast.bonus ? 4000 : 3200);
  }

  onDestroy(() => {
    if (hideTimer) clearTimeout(hideTimer);
  });
</script>

{#if visible}
  {#key visible.id}
    <div class="w-toast-slot" role="status" aria-live="polite">
      <div
        class="w-toast"
        class:bonus={visible.bonus}
        class:still={reduceMotion}
        style={`--w-life:${visible.bonus ? 4000 : 3200}ms`}
      >
        <span class="w-burst" aria-hidden="true">
          <i></i><i></i><i></i><i></i>
        </span>
        <span class="w-medallion" aria-hidden="true">W</span>
        <span class="w-copy">
          <small>{visible.bonus ? 'Achievement reward' : 'Progress earned'}</small>
          <strong>+{visible.amount} W</strong>
        </span>
      </div>
    </div>
  {/key}
{/if}

<style>
  .w-toast-slot {
    position: fixed;
    left: 50%;
    bottom: 104px; /* clears the bottom nav */
    z-index: 1200;
    transform: translateX(-50%);
    pointer-events: none;
  }

  .w-toast {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 154px;
    box-sizing: border-box;
    padding: 9px 16px 9px 10px;
    border-radius: 16px;
    background: var(--qx-green-soft);
    border: 2px solid var(--qx-green);
    color: var(--qx-green-text);
    font-family: var(--qx-font);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18), 0 0 0 4px color-mix(in srgb, var(--qx-green) 12%, transparent);
    animation: wCelebrate var(--w-life) cubic-bezier(0.22, 0.8, 0.24, 1) forwards;
  }

  .w-medallion {
    width: 38px;
    height: 38px;
    flex: 0 0 38px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: #fff;
    background: var(--qx-green);
    border: 2px solid var(--qx-surface);
    box-shadow: 0 2px 8px color-mix(in srgb, var(--qx-green) 45%, transparent);
    font-size: 17px;
    font-weight: 950;
  }

  .w-copy {
    display: flex;
    flex-direction: column;
    line-height: 1.05;
  }

  .w-copy small {
    color: var(--qx-text-dim);
    font-size: 9px;
    font-weight: 850;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .w-copy strong {
    margin-top: 3px;
    color: var(--qx-green-text);
    font-size: 19px;
    font-weight: 950;
    font-variant-numeric: tabular-nums;
  }

  .w-toast.bonus {
    min-width: 190px;
    padding: 11px 20px 11px 12px;
    border-color: var(--qx-yellow);
    background: linear-gradient(135deg, var(--qx-green-soft), var(--qx-surface));
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.22), 0 0 0 5px color-mix(in srgb, var(--qx-yellow) 16%, transparent);
  }

  .w-toast.bonus .w-medallion {
    width: 44px;
    height: 44px;
    flex-basis: 44px;
    background: var(--qx-yellow);
    color: var(--qx-yellow-text);
    animation: medallionPulse 900ms ease-out 1;
  }

  .w-toast.bonus .w-copy strong {
    font-size: 23px;
  }

  .w-toast.still {
    animation: wFade var(--w-life) ease-out forwards;
  }

  .w-burst {
    position: absolute;
    inset: -9px;
    pointer-events: none;
  }

  .w-burst i {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--qx-yellow);
    opacity: 0;
    animation: spark 900ms ease-out forwards;
  }
  .w-burst i:nth-child(1) { left: 12%; top: 4%; }
  .w-burst i:nth-child(2) { right: 12%; top: 1%; animation-delay: 80ms; }
  .w-burst i:nth-child(3) { left: 4%; bottom: 14%; animation-delay: 140ms; }
  .w-burst i:nth-child(4) { right: 4%; bottom: 12%; animation-delay: 210ms; }
  .w-toast:not(.bonus) .w-burst { display: none; }

  .w-toast.still .w-burst,
  .w-toast.still .w-medallion {
    animation: none;
  }

  @keyframes wCelebrate {
    0%   { opacity: 0; transform: translateY(20px) scale(0.82); }
    9%   { opacity: 1; transform: translateY(-3px) scale(1.06); }
    15%  { transform: translateY(0) scale(1); }
    82%  { opacity: 1; transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(-10px) scale(0.98); }
  }

  @keyframes wFade {
    0%   { opacity: 0; }
    8%   { opacity: 1; }
    88%  { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes medallionPulse {
    0% { transform: scale(0.65) rotate(-12deg); }
    55% { transform: scale(1.16) rotate(5deg); }
    100% { transform: scale(1) rotate(0); }
  }

  @keyframes spark {
    0% { opacity: 0; transform: scale(0.2); }
    35% { opacity: 1; transform: scale(1.2); }
    100% { opacity: 0; transform: scale(0.5) translateY(-10px); }
  }

  @media (max-width: 520px) {
    .w-toast-slot { bottom: 92px; }
    .w-toast { max-width: calc(100vw - 28px); padding-block: 7px; border-radius: 13px; }
    .w-toast.bonus { min-width: 174px; padding: 8px 14px 8px 9px; }
    .w-toast.bonus .w-medallion { width: 36px; height: 36px; flex-basis: 36px; }
    .w-toast.bonus .w-copy strong { font-size: 19px; }
    .w-copy small { font-size: 8px; line-height: 1.05; }
  }
</style>
