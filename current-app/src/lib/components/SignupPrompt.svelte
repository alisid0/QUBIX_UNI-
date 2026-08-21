<script>
  // Gentle, dismissible sign-up nudge shown to guests after they have explored
  // a little. Offers Google and email, or "Not now".
  export let onEmail = () => {};
  export let onGoogle = () => {};
  export let onDismiss = () => {};

  function onKeydown(e) {
    if (e.key === 'Escape') onDismiss();
  }
</script>

<svelte:window on:keydown={onKeydown} />

<div class="sp-overlay" on:click={onDismiss} role="presentation">
  <div
    class="sp-card qx-shell"
    on:click|stopPropagation
    role="dialog"
    aria-modal="true"
    aria-label="Save your progress"
  >
    <div class="sp-eyebrow">Nice work so far</div>
    <h2 class="sp-title">Save your progress</h2>
    <p class="sp-sub">
      Create a free account to keep your streak, W score, and where you left off,
      on any device. It takes a few seconds.
    </p>

    <button class="sp-btn sp-google" on:click={onGoogle}>
      <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.9 2.6 13.8l7.9 6.1C12.4 13.7 17.7 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.1 5.4-4.6 7.1l7.1 5.5c4.2-3.9 6.6-9.6 6.6-16.1z"/>
        <path fill="#FBBC05" d="M10.5 28.1c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16 0 19.9 0 24s1 8 2.6 11.2l7.9-6.1z"/>
        <path fill="#34A853" d="M24 47.5c6.2 0 11.5-2 15.3-5.5l-7.1-5.5c-2 1.3-4.5 2.1-8.2 2.1-6.3 0-11.6-4.2-13.5-9.9l-7.9 6.1C6.5 42.1 14.6 47.5 24 47.5z"/>
      </svg>
      Continue with Google
    </button>

    <button class="sp-btn sp-email" on:click={onEmail}>Sign up with email</button>

    <button class="sp-later" on:click={onDismiss}>Not now</button>
  </div>
</div>

<style>
  .sp-overlay {
    position: fixed;
    inset: 0;
    z-index: 9000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: color-mix(in srgb, #17130e 52%, transparent);
    backdrop-filter: blur(3px);
    animation: sp-fade 0.18s ease-out;
  }
  .sp-card {
    width: 100%;
    max-width: 380px;
    box-sizing: border-box;
    padding: 28px 26px 22px;
    text-align: center;
    background: var(--qx-surface);
    border: 1px solid var(--qx-border);
    border-radius: 24px;
    box-shadow: var(--qx-shadow-soft);
    animation: sp-rise 0.22s var(--qx-ease-out, cubic-bezier(.2,.7,.3,1));
  }
  .sp-eyebrow {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--qx-accent-text);
  }
  .sp-title {
    font-family: var(--qx-font-display, var(--qx-font));
    font-size: 23px;
    font-weight: 800;
    color: var(--qx-text);
    margin: 6px 0 8px;
    letter-spacing: -0.02em;
  }
  .sp-sub {
    font-size: 14px;
    line-height: 1.5;
    color: var(--qx-text-dim);
    margin: 0 0 20px;
  }
  .sp-btn {
    width: 100%;
    min-height: 50px;
    padding: 12px 14px;
    border-radius: 13px;
    font-family: var(--qx-font);
    font-size: 15px;
    font-weight: 800;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
    transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
  }
  .sp-btn:active { transform: translateY(1px); }
  .sp-google {
    background: var(--qx-surface);
    color: var(--qx-text);
    border: 1.5px solid var(--qx-border-2);
    box-shadow: var(--qx-shadow-card);
  }
  .sp-google:hover { border-color: var(--qx-accent); }
  .sp-email {
    background: var(--qx-accent);
    color: #fff;
    border: none;
    box-shadow: var(--qx-shadow-card);
  }
  .sp-email:hover { box-shadow: var(--qx-shadow-soft); }
  .sp-later {
    width: 100%;
    min-height: 40px;
    background: none;
    border: none;
    color: var(--qx-text-faint);
    font-family: var(--qx-font);
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    padding: 6px;
  }
  .sp-later:hover { color: var(--qx-text-dim); }

  @keyframes sp-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes sp-rise { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: none; } }
</style>
