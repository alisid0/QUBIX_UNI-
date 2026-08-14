<script>
  import ChalkButton from '../lib/components/ChalkButton.svelte';
  import ChalkInput from '../lib/components/ChalkInput.svelte';

  export let onNavigate;

  let title = '';
  let subject = 'physics';
  let topic = '';
  let concept = '';
  let buildsOn = '';
  let floors = ['', '', '', '', ''];
  let imagePrompt = '';
  let submitting = false;
  let submitted = false;
  let error = '';

  function addFloor() {
    if (floors.length < 7) floors = [...floors, ''];
  }

  function removeFloor(idx) {
    if (floors.length <= 1) return;
    floors = floors.filter((_, i) => i !== idx);
  }

  function toJson() {
    return {
      title,
      subject,
      topic,
      concept,
      tier: 'g0',
      buildsOn: buildsOn ? buildsOn.split(',').map(s => s.trim()).filter(Boolean) : [],
      floors: floors.map(f => f.trim() || null),
      imagePrompt: imagePrompt.trim() || null
    };
  }

  async function submit() {
    if (!title.trim()) { error = 'Title is required'; return; }
    if (!floors[0].trim()) { error = 'Floor 0 (the swipe card) is required'; return; }

    submitting = true;
    error = '';

    try {
      const bb = toJson();
      // Submit to Supabase review table or local storage for now
      const key = 'strata-drafts';
      const drafts = JSON.parse(localStorage.getItem(key) || '[]');
      drafts.push({ ...bb, submittedAt: new Date().toISOString(), status: 'draft' });
      localStorage.setItem(key, JSON.stringify(drafts));

      submitted = true;
      // Reset
      title = ''; topic = ''; concept = ''; buildsOn = '';
      floors = ['', '', '', '', ''];
      imagePrompt = '';
    } catch (e) {
      error = e.message || 'Submission failed';
    } finally {
      submitting = false;
    }
  }
</script>

<div class="author-view">
  <button class="back-link" on:click={() => onNavigate?.('stats')}>‹ back</button>

  <h1>Author a new BB</h1>
  <p class="sub">Fill the template. Submit. We'll review, number, and slot it into the deck.</p>

  {#if !submitted}
    <div class="form">
      <ChalkInput bind:value={title} label="Title" placeholder="The second big rule" />

      <div class="row">
        <div class="field">
          <label class="lbl" for="author-subject">Subject</label>
          <select id="author-subject" bind:value={subject} class="chalk-select">
            <option value="physics">Physics</option>
            <option value="maths">Mathematics</option>
            <option value="chemistry">Chemistry</option>
          </select>
        </div>
        <div class="field">
          <ChalkInput bind:value={topic} label="Topic" placeholder="mechanics" />
        </div>
      </div>

      <ChalkInput bind:value={concept} label="Concepts (semicolons)" placeholder="inertia; newtons-first-law" />
      <ChalkInput bind:value={buildsOn} label="buildsOn (comma-separated kicker names)" placeholder="Mechanics 3.5, Vectors 3.0" />

      <div class="floors-section">
        <div class="lbl" id="author-floors-label">Floors (depth layers)</div>
        {#each floors as floor, i}
          <div class="floor-row">
            <span class="floor-num">F{i}</span>
            <textarea
              bind:value={floors[i]}
              class="floor-input"
              aria-label={`Floor ${i}`}
              placeholder={`Floor ${i}`}
              rows="3"
            ></textarea>
            <button class="floor-remove" on:click={() => removeFloor(i)} title="Remove floor">×</button>
          </div>
        {/each}
        <button class="add-floor-btn" on:click={addFloor}>+ Add floor</button>
      </div>

      <div class="field">
        <label class="lbl" for="author-image-prompt">Image prompt (optional)</label>
        <textarea
          id="author-image-prompt"
          bind:value={imagePrompt}
          class="image-input"
          placeholder="Describe the chalkboard illustration: scene, labels, colours..."
          rows="2"
        ></textarea>
      </div>

      <div class="preview">
        <div class="lbl">Preview (JSON)</div>
        <pre class="preview-block">{JSON.stringify(toJson(), null, 2)}</pre>
      </div>

      {#if error}
        <p class="error">{error}</p>
      {/if}

      <ChalkButton fullWidth on:click={submit} disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit for review'}
      </ChalkButton>
    </div>

  {:else}
    <div class="success-card">
      <h2>Submitted ✓</h2>
      <p>Your BB draft has been saved. A reviewer will check it, number it, and slot it into the deck.</p>
      <ChalkButton fullWidth on:click={() => submitted = false}>Write another</ChalkButton>
    </div>
  {/if}
</div>

<style>
  .author-view {
    height: 100%;
    overflow-y: auto;
    padding: 24px 18px 100px;
    background: var(--board-1);
    border: 12px solid var(--frame);
    border-radius: 6px;
    box-shadow: 0 0 0 2px var(--frame-dark), 0 30px 70px -28px rgba(0,0,0,0.85), inset 0 0 80px rgba(0,0,0,0.35);
  }
  .back-link {
    font-family: var(--print); font-size: 13px; color: var(--chalk-faint);
    text-decoration: none; margin-bottom: 16px; display: inline-block;
    cursor: pointer; background: none; border: none;
  }
  h1 {
    font-family: var(--hand-display); font-weight: 400;
    font-size: 28px; margin-bottom: 4px;
    text-shadow: 0 1px 0 rgba(0,0,0,0.25);
  }
  .sub {
    font-family: var(--print); color: var(--chalk-faint); font-size: 14px; margin-bottom: 24px;
  }
  .form {
    display: flex; flex-direction: column; gap: 16px;
  }
  .row {
    display: flex; gap: 12px;
  }
  .field { flex: 1; }
  .lbl {
    font-family: var(--print); font-size: 12px; letter-spacing: 0.04em;
    color: var(--chalk-green); text-transform: uppercase; display: block; margin-bottom: 4px;
  }
  .chalk-select {
    width: 100%;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1.5px dashed var(--chalk-faint);
    background: rgba(0,0,0,0.22);
    color: var(--chalk);
    font-family: var(--hand);
    font-size: 16px;
    min-height: var(--tap-target);
    outline: none;
  }
  .chalk-select:focus { border-color: var(--chalk-yellow); }
  .floors-section {
    border: 1.5px dashed rgba(244,241,233,0.12);
    border-radius: 12px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .floor-row {
    display: flex; gap: 8px; align-items: flex-start;
  }
  .floor-num {
    font-family: var(--print); font-size: 13px; color: var(--chalk-yellow);
    min-width: 24px; padding-top: 10px;
  }
  .floor-input {
    flex: 1;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1.5px dashed rgba(244,241,233,0.2);
    background: rgba(0,0,0,0.18);
    color: var(--chalk);
    font-family: var(--hand);
    font-size: 14px;
    resize: vertical;
    outline: none;
  }
  .floor-input:focus { border-color: var(--chalk-green); }
  .floor-remove {
    background: none; border: 1.5px dashed rgba(244,241,233,0.2);
    color: var(--chalk-faint);
    font-size: 16px; cursor: pointer;
    width: 28px; height: 28px; border-radius: 50%;
    margin-top: 8px; display: flex; align-items: center; justify-content: center;
  }
  .add-floor-btn {
    font-family: var(--print); font-size: 13px;
    color: var(--chalk-green);
    background: rgba(169,214,160,0.08);
    border: 1.5px dashed var(--chalk-green);
    border-radius: 8px; padding: 8px; cursor: pointer;
  }
  .image-input {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1.5px dashed rgba(244,241,233,0.2);
    background: rgba(0,0,0,0.18);
    color: var(--chalk);
    font-family: var(--hand);
    font-size: 14px;
    resize: vertical;
    outline: none;
  }
  .preview { margin-top: 4px; }
  .preview-block {
    font-family: monospace; font-size: 12px;
    color: var(--chalk-dim);
    background: rgba(0,0,0,0.25);
    border: 1.5px dashed rgba(244,241,233,0.15);
    border-radius: 8px;
    padding: 12px;
    max-height: 200px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .error {
    font-family: var(--print); font-size: 13px; color: #e07a5f;
    padding: 8px 12px; background: rgba(224,122,95,0.12);
    border-radius: 8px; border: 1px dashed #e07a5f;
  }
  .success-card {
    text-align: center; padding: 32px 20px;
  }
  .success-card h2 {
    font-family: var(--hand-display); font-size: 26px; margin-bottom: 12px;
  }
  .success-card p {
    font-family: var(--print); font-size: 14px; color: var(--chalk-dim); margin-bottom: 20px;
    max-width: 40ch; margin-inline: auto;
  }
</style>
