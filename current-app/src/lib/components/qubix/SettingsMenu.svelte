<script>
  import { theme } from '../../stores/theme.js';
  import { textSize } from '../../stores/textSize.js';
  import { displayName, logOut, isAuthenticated } from '../../stores/auth.js';
  import IssueReportDialog from './IssueReportDialog.svelte';
  import AccountDataDialog from './AccountDataDialog.svelte';

  export let open = false;
  export let onClose = () => {};
  export let onNavigate = () => {};

  const SIZE_LABEL = { s: 'Small', m: 'Default', l: 'Large', xl: 'X-Large' };
  let reportOpen = false;
  let accountDataOpen = false;

  async function handleLogout() {
    try { await logOut(); } catch (_) {}
    onClose();
    onNavigate('auth');
  }

  // The Edge Function signs the user out once the account is gone; clear local
  // state and send them back to the auth screen.
  function handleDeleted() {
    accountDataOpen = false;
    try { localStorage.clear(); } catch (_) {}
    onClose();
    onNavigate('auth');
  }

  function handleSignIn() {
    onClose();
    onNavigate('auth');
  }

  function closeFromBackdrop(event) {
    if (event.target === event.currentTarget) onClose();
  }

  // Escape closes the innermost open dialog first, then the settings sheet.
  // Only acts when the settings sheet or a child dialog is open.
  function handleKeydown(e) {
    if (e.key !== 'Escape' || !open) return;
    if (accountDataOpen) { accountDataOpen = false; return; }
    if (reportOpen) { reportOpen = false; return; }
    onClose();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div class="menu-overlay" on:click={closeFromBackdrop} role="presentation">
    <div class="sheet" role="dialog" aria-modal="true" aria-label="Settings">
      <div class="handle"></div>
      <div class="sheet-title">Settings</div>

      <div class="group">Appearance</div>
      <div class="row">
        <span class="row-label">Theme</span>
        <button class="pill" on:click={() => theme.toggle()}>
          {$theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
      <div class="row">
        <span class="row-label">Text size</span>
        <div class="stepper">
          <button class="step" on:click={() => textSize.dec()} disabled={$textSize === 's'} aria-label="Smaller text">A−</button>
          <span class="step-val">{SIZE_LABEL[$textSize]}</span>
          <button class="step" on:click={() => textSize.inc()} disabled={$textSize === 'xl'} aria-label="Larger text">A+</button>
        </div>
      </div>

      <div class="group">Account</div>
      {#if $isAuthenticated}
        <div class="row">
          <span class="row-label">Signed in as</span>
          <span class="row-val">{$displayName}</span>
        </div>
      {:else}
        <button class="row link signin" on:click={handleSignIn}>
          Sign in or create account<span class="chev">›</span>
        </button>
        <div class="row-note">Save your progress across devices.</div>
      {/if}
      <a class="row link" href="/terms.html" target="_blank" rel="noopener">Terms and Conditions<span class="chev">›</span></a>
      <a class="row link" href="/privacy.html" target="_blank" rel="noopener">Privacy Policy<span class="chev">›</span></a>
      <button class="row link" on:click={() => reportOpen = true}>Report a problem<span class="chev">›</span></button>
      {#if $isAuthenticated}
        <button class="row link" on:click={() => accountDataOpen = true}>Your data<span class="chev">›</span></button>
        <button class="row link danger" on:click={handleLogout}>Log out</button>
      {/if}

      <div class="version">Qubix</div>
    </div>
  </div>
  <IssueReportDialog open={reportOpen} onClose={() => reportOpen = false} />
  <AccountDataDialog
    open={accountDataOpen}
    onClose={() => accountDataOpen = false}
    onDeleted={handleDeleted}
  />
{/if}

<style>
  .menu-overlay {
    position: fixed; inset: 0; z-index: 200; background: rgba(20,19,16,0.5);
    display: flex; align-items: flex-end; justify-content: center;
  }
  .sheet {
    width: 100%; max-width: 480px; background: var(--qx-surface); color: var(--qx-text);
    border-top-left-radius: 20px; border-top-right-radius: 20px;
    padding: 8px 18px calc(20px + env(safe-area-inset-bottom)); box-sizing: border-box;
    box-shadow: 0 -14px 40px -18px rgba(0,0,0,0.4);
    animation: sheetUp 0.22s cubic-bezier(0.22,1,0.36,1);
  }
  @keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
  .handle { width: 36px; height: 4px; border-radius: 999px; background: var(--qx-border-2); margin: 8px auto 12px; }
  .sheet-title { font-size: 17px; font-weight: 800; color: var(--qx-text); margin: 0 0 8px; }

  .group { font-size: 11px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: var(--qx-text-faint); margin: 16px 0 6px; }
  .row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 0; border-bottom: 1px solid var(--qx-border); min-height: 44px;
  }
  .row:last-of-type { border-bottom: none; }
  .row-label { font-size: 15px; font-weight: 600; color: var(--qx-text); }
  .row-val { font-size: 14px; font-weight: 600; color: var(--qx-text-dim); }

  .pill {
    font-family: var(--qx-font); font-size: 13px; font-weight: 700;
    color: var(--qx-accent-text); background: var(--qx-accent-soft);
    border: 1.5px solid var(--qx-accent); border-radius: var(--qx-radius-pill);
    padding: 6px 14px; cursor: pointer;
  }

  .stepper { display: flex; align-items: center; gap: 4px; }
  .step {
    width: 40px; height: 34px; border-radius: var(--qx-radius-sm); cursor: pointer;
    border: 1.5px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text);
    font-family: var(--qx-font); font-size: 15px; font-weight: 800;
  }
  .step:disabled { opacity: 0.4; cursor: default; }
  .step-val { min-width: 74px; text-align: center; font-size: 13px; font-weight: 700; color: var(--qx-text-dim); }

  .link {
    width: 100%; text-align: left; background: none; border: none; cursor: pointer;
    font-family: var(--qx-font); font-size: 15px; font-weight: 700; color: var(--qx-text);
    text-decoration: none;
  }
  .link .chev { float: right; color: var(--qx-text-faint); font-size: 18px; }
  .link.danger { color: var(--qx-danger-text); }
  .link.signin { color: var(--qx-accent-text); font-weight: 800; }
  .row-note { font-size: 12px; color: var(--qx-text-faint); padding: 2px 4px 6px; }

  .version { text-align: center; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; color: var(--qx-text-faintest); margin-top: 18px; }
</style>
