<script>
  import { deleteAccount, exportMyData } from '../../supabase.js';

  export let open = false;
  export let onClose = () => {};
  export let onDeleted = () => {};

  const CONFIRM_PHRASE = 'DELETE MY ACCOUNT';

  let mode = 'menu';        // menu | confirmDelete
  let typed = '';
  let busy = false;
  let status = '';
  let error = '';

  $: canDelete = typed.trim() === CONFIRM_PHRASE && !busy;

  function reset() {
    mode = 'menu';
    typed = '';
    busy = false;
    status = '';
    error = '';
  }

  function close() {
    if (busy) return;
    reset();
    onClose();
  }

  function handleBackdrop(event) {
    if (event.target === event.currentTarget) close();
  }

  async function handleExport() {
    busy = true;
    status = '';
    error = '';
    try {
      const data = await exportMyData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const stamp = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `qubix-my-data-${stamp}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      status = 'Downloaded.';
    } catch (e) {
      error = e?.message || 'Could not export your data. Try again later.';
    } finally {
      busy = false;
    }
  }

  async function handleDelete() {
    if (!canDelete) return;
    busy = true;
    status = '';
    error = '';
    try {
      await deleteAccount(CONFIRM_PHRASE);
      onDeleted();
    } catch (e) {
      error = e?.message || 'Could not delete your account. Try again later.';
      busy = false;
    }
  }
</script>

{#if open}
  <div class="overlay" role="presentation" on:click={handleBackdrop}>
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="acct-title">
      <button class="close" on:click={close} aria-label="Close" disabled={busy}>×</button>
      <div class="kicker">Your data</div>

      {#if mode === 'menu'}
        <h2 id="acct-title">Your data</h2>

        <div class="block">
          <div class="block-title">Download a copy</div>
          <p class="block-body">
            Everything Qubix stores about your account, as a JSON file: your profile,
            progress, quiz and workshop attempts, streaks, and any problems you have
            reported.
          </p>
          <button class="btn" on:click={handleExport} disabled={busy}>
            {busy ? 'Preparing…' : 'Download my data'}
          </button>
        </div>

        <div class="block danger-block">
          <div class="block-title">Delete your account</div>
          <p class="block-body">
            Permanently removes your login, profile, and all learning progress.
            This cannot be undone and there is no recovery period.
          </p>
          <button class="btn btn-danger" on:click={() => { mode = 'confirmDelete'; status = ''; error = ''; }} disabled={busy}>
            Delete my account
          </button>
        </div>
      {:else}
        <h2 id="acct-title">Delete your account?</h2>

        <p class="block-body">This permanently deletes:</p>
        <ul class="list">
          <li>your login and profile</li>
          <li>all board, path, quiz and workshop progress</li>
          <li>your streaks, rewards and activity history</li>
          <li>any screenshots you attached to problem reports</li>
        </ul>

        <p class="block-body retain">
          Problem reports you sent are kept so we can still fix the bugs, but they
          are stripped of anything linking them to you.
        </p>

        <label class="confirm-label" for="confirm-input">
          Type <strong>{CONFIRM_PHRASE}</strong> to confirm
        </label>
        <input
          id="confirm-input"
          class="confirm-input"
          bind:value={typed}
          placeholder={CONFIRM_PHRASE}
          autocomplete="off"
          autocapitalize="characters"
          spellcheck="false"
          disabled={busy}
        />

        <div class="actions">
          <button class="btn btn-ghost" on:click={() => { mode = 'menu'; typed = ''; error = ''; }} disabled={busy}>
            Cancel
          </button>
          <button class="btn btn-danger" on:click={handleDelete} disabled={!canDelete}>
            {busy ? 'Deleting…' : 'Delete permanently'}
          </button>
        </div>
      {/if}

      {#if status}<p class="msg ok">{status}</p>{/if}
      {#if error}<p class="msg err">{error}</p>{/if}
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed; inset: 0; z-index: 300; background: rgba(20,19,16,0.55);
    display: flex; align-items: center; justify-content: center; padding: 18px;
  }
  .sheet {
    position: relative; width: 100%; max-width: 440px; max-height: 88vh; overflow-y: auto;
    background: var(--qx-surface); color: var(--qx-text);
    border-radius: 18px; padding: 22px 20px 20px; box-sizing: border-box;
    box-shadow: 0 18px 50px -20px rgba(0,0,0,0.5);
  }
  .close {
    position: absolute; top: 12px; right: 12px; width: 32px; height: 32px;
    border: none; background: none; cursor: pointer; font-size: 22px; line-height: 1;
    color: var(--qx-text-faint); font-family: var(--qx-font);
  }
  .close:disabled { opacity: 0.4; cursor: default; }

  .kicker {
    font-size: 11px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--qx-text-faint); margin-bottom: 6px;
  }
  h2 { font-size: 20px; font-weight: 800; margin: 0 0 14px; color: var(--qx-text); }

  .block { padding: 14px 0; border-top: 1px solid var(--qx-border); }
  .block-title { font-size: 15px; font-weight: 800; margin-bottom: 5px; }
  .block-body { font-size: 14px; line-height: 1.55; color: var(--qx-text-dim); margin: 0 0 12px; }
  .block-body.retain { font-size: 13px; }

  .list { margin: 0 0 12px 20px; padding: 0; }
  .list li { font-size: 14px; line-height: 1.5; color: var(--qx-text-dim); margin-bottom: 4px; }

  .btn {
    font-family: var(--qx-font); font-size: 14px; font-weight: 700; cursor: pointer;
    border-radius: var(--qx-radius-pill); padding: 9px 18px;
    border: 1.5px solid var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text);
  }
  .btn:disabled { opacity: 0.45; cursor: default; }
  .btn-danger { border-color: var(--qx-danger); background: transparent; color: var(--qx-danger-text); }
  .btn-ghost { border-color: var(--qx-border-2); background: transparent; color: var(--qx-text-dim); }

  .confirm-label { display: block; font-size: 13px; color: var(--qx-text-dim); margin: 4px 0 6px; }
  .confirm-input {
    width: 100%; box-sizing: border-box; font-family: var(--qx-font);
    font-size: 15px; font-weight: 700; letter-spacing: 0.04em;
    padding: 10px 12px; border-radius: var(--qx-radius-sm);
    border: 1.5px solid var(--qx-border-2); background: var(--qx-surface-2); color: var(--qx-text);
  }
  .confirm-input:disabled { opacity: 0.5; }

  .actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 16px; }

  .msg { font-size: 13px; margin: 12px 0 0; line-height: 1.5; }
  .msg.ok { color: var(--qx-accent-text); }
  .msg.err { color: var(--qx-danger-text); }
</style>
