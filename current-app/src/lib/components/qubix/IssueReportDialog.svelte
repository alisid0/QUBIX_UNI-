<script>
  import { submitIssueReport } from '../../stores/issueReports.js';
  import QxButton from './QxButton.svelte';

  export let open = false;
  export let onClose = () => {};

  const CATEGORIES = [
    { id: 'bug', label: 'Bug' },
    { id: 'content', label: 'Content' },
    { id: 'workshop', label: 'Workshop' },
    { id: 'audio', label: 'Audio' },
    { id: 'visual', label: 'Visual' },
    { id: 'idea', label: 'Idea' }
  ];

  let category = 'bug';
  let message = '';
  let screenshotFile = null;
  let loading = false;
  let status = '';
  let error = '';

  function reset() {
    category = 'bug';
    message = '';
    screenshotFile = null;
    loading = false;
    status = '';
    error = '';
  }

  function close() {
    reset();
    onClose();
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) close();
  }

  function handleFile(event) {
    screenshotFile = event.target.files?.[0] || null;
  }

  async function submit() {
    if (message.trim().length < 3 || loading) return;
    loading = true;
    status = '';
    error = '';
    const result = await submitIssueReport({
      category,
      message: message.trim(),
      route: location.pathname + location.search,
      metadata: {
        title: document.title,
        sentFrom: 'settings'
      }
    }, screenshotFile);
    loading = false;

    if (result.requiresSignIn) {
      error = 'Sign in to send a report. Reports are linked to your account so we can follow up.';
    } else if (result.queued) {
      status = 'Saved locally. It will send when the connection improves.';
    } else {
      status = 'Sent. Thank you - this helps us fix Qubix faster.';
    }
  }
</script>

{#if open}
  <div class="issue-overlay" role="presentation" on:click={handleBackdropClick}>
    <div class="issue-sheet" role="dialog" aria-modal="true" aria-labelledby="issue-title">
      <button class="close" on:click={close} aria-label="Close">x</button>
      <div class="kicker">Support</div>
      <h2 id="issue-title">Report a problem</h2>
      <p>Send what went wrong. Screenshots are optional and only upload after you choose one.</p>

      <div class="cat-grid">
        {#each CATEGORIES as item}
          <button class="cat" class:active={category === item.id} on:click={() => category = item.id}>
            {item.label}
          </button>
        {/each}
      </div>

      <label class="field-label" for="issue-message">What happened?</label>
      <textarea
        id="issue-message"
        bind:value={message}
        rows="5"
        maxlength="4000"
        placeholder="Tell us what you expected and what actually happened."
      ></textarea>

      <label class="file-row" for="issue-shot">
        <span>{screenshotFile ? screenshotFile.name : 'Attach screenshot'}</span>
        <strong>{screenshotFile ? 'Change' : 'Optional'}</strong>
      </label>
      <input id="issue-shot" type="file" accept="image/png,image/jpeg,image/webp" on:change={handleFile} />

      {#if status}
        <div class="status">{status}</div>
      {/if}
      {#if error}
        <div class="error">{error}</div>
      {/if}

      <div class="actions">
        <QxButton variant="secondary" fullWidth={false} on:click={close}>Close</QxButton>
        <QxButton variant="primary" on:click={submit} disabled={loading || message.trim().length < 3}>
          {loading ? 'Sending...' : 'Send report'}
        </QxButton>
      </div>
    </div>
  </div>
{/if}

<style>
  .issue-overlay {
    position: fixed;
    inset: 0;
    z-index: 260;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background: rgba(20, 19, 16, 0.58);
  }

  .issue-sheet {
    width: 100%;
    max-width: 500px;
    max-height: 92vh;
    overflow-y: auto;
    position: relative;
    box-sizing: border-box;
    padding: 18px 18px calc(20px + env(safe-area-inset-bottom));
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    background: var(--qx-surface);
    color: var(--qx-text);
    box-shadow: 0 -18px 48px -20px rgba(0, 0, 0, 0.5);
  }

  .close {
    position: absolute;
    right: 14px;
    top: 14px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid var(--qx-border);
    background: var(--qx-surface-2);
    color: var(--qx-text);
    font: 900 15px/1 var(--qx-font);
    cursor: pointer;
  }

  .kicker {
    color: var(--qx-accent);
    font-size: 11px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 5px;
  }

  h2 {
    margin: 0;
    color: var(--qx-text);
    font-size: 22px;
    font-weight: 900;
  }

  p {
    margin: 6px 42px 14px 0;
    color: var(--qx-text-dim);
    font-size: 13px;
    line-height: 1.45;
  }

  .cat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 14px;
  }

  .cat {
    min-height: 38px;
    border-radius: 8px;
    border: 1.5px solid var(--qx-border);
    background: var(--qx-surface-2);
    color: var(--qx-text-dim);
    font: 800 13px/1 var(--qx-font);
    cursor: pointer;
  }

  .cat.active {
    border-color: var(--qx-accent);
    color: var(--qx-accent-text);
    background: var(--qx-accent-soft);
  }

  .field-label {
    display: block;
    margin: 0 0 7px;
    color: var(--qx-text-dim);
    font-size: 12px;
    font-weight: 850;
  }

  textarea {
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    min-height: 116px;
    border-radius: 8px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface-2);
    color: var(--qx-text);
    padding: 12px;
    font: 700 14px/1.45 var(--qx-font);
  }

  textarea::placeholder { color: var(--qx-text-faint); }

  .file-row {
    margin-top: 10px;
    min-height: 44px;
    border-radius: 8px;
    border: 1px solid var(--qx-border);
    background: var(--qx-surface-2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 0 12px;
    cursor: pointer;
  }

  .file-row span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--qx-text);
    font-size: 13px;
    font-weight: 750;
  }

  .file-row strong {
    color: var(--qx-accent);
    font-size: 12px;
    font-weight: 900;
    flex-shrink: 0;
  }

  input[type='file'] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .status,
  .error {
    margin-top: 10px;
    padding: 10px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 750;
    line-height: 1.4;
  }

  .status {
    background: var(--qx-green-soft);
    color: var(--qx-green-text);
  }

  .error {
    background: var(--qx-danger-soft);
    color: var(--qx-danger-text);
  }

  .actions {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 14px;
  }
</style>
