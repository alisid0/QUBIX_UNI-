<script>
  import { onMount } from 'svelte';
  import { buildHandoffPrompt, draftDocument, safeDraftFilename, selectRecentMessages, targetOptions, validateDraft } from '../lib/draft-workshop.js';

  const STORAGE_KEY = 'qx.draft-workshop.v1';
  const targets = targetOptions();
  let transcript = '';
  let title = '';
  let target = 'pair';
  let limit = 20;
  let selectedMessages = [];
  let prompt = '';
  let draft = '';
  let includeTranscript = false;
  let copied = '';
  let restored = false;

  onMount(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
      if (saved && typeof saved === 'object') {
        transcript = saved.transcript || '';
        title = saved.title || '';
        target = targets.some(option => option.value === saved.target) ? saved.target : 'pair';
        limit = Number(saved.limit) || 20;
        prompt = saved.prompt || '';
        draft = saved.draft || '';
        includeTranscript = Boolean(saved.includeTranscript);
        selectedMessages = selectRecentMessages(transcript, limit);
      }
    } catch (_) { /* A blocked session store simply starts a clean workshop. */ }
    restored = true;
  });

  function save() {
    if (!restored) return;
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ transcript, title, target, limit, prompt, draft, includeTranscript })); }
    catch (_) { /* The workshop still works without persistence. */ }
  }

  function prepare() {
    selectedMessages = selectRecentMessages(transcript, limit);
    prompt = buildHandoffPrompt({ transcript, target, title, limit });
    save();
    document.getElementById('handoff-prompt')?.focus();
  }

  async function copy(value, name) {
    try {
      await navigator.clipboard.writeText(value);
      copied = name;
      setTimeout(() => { if (copied === name) copied = ''; }, 1600);
    } catch (_) { copied = 'blocked'; }
  }

  function download() {
    const source = selectedMessages.map(message => `${message.speaker.toUpperCase()}:\n${message.text}`).join('\n\n');
    const body = draftDocument({ draft, title, target, sourceCount: selectedMessages.length, includeTranscript, transcript: source });
    const url = URL.createObjectURL(new Blob([body], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = safeDraftFilename(title);
    link.click();
    URL.revokeObjectURL(url);
  }

  function clearWorkshop() {
    transcript = ''; title = ''; target = 'pair'; limit = 20; selectedMessages = [];
    prompt = ''; draft = ''; includeTranscript = false; copied = '';
    try { sessionStorage.removeItem(STORAGE_KEY); } catch (_) {}
  }

  $: detectedCount = selectRecentMessages(transcript, limit).length;
  $: validation = validateDraft(draft, target);
</script>

<svelte:head>
  <title>Qubix Draft Workshop · Founder workspace</title>
  <meta name="robots" content="noindex,nofollow" />
</svelte:head>

<main class="workshop-page">
  <header class="masthead">
    <a class="identity" href="/"><span>QX</span><b>QUBIX UNIVERSITY</b></a>
    <div class="local"><i></i> ZERO API CREDITS · LOCAL PREPARATION</div>
    <button class="clear" type="button" on:click={clearWorkshop}>Clear this session</button>
  </header>

  <section class="intro">
    <p class="eyebrow">FOUNDER WORKSPACE · AI_DRAFT ONLY</p>
    <h1>Qubix Draft Workshop</h1>
    <p>Turn the useful part of a ChatGPT, Codex or Claude conversation into one controlled content draft. Qubix prepares the handoff and checks the returned work; your existing chat does the writing.</p>
    <div class="flow" aria-label="Draft workflow">
      <span>Conversation</span><b>→</b><span>Prepared prompt</span><b>→</b><span>AI response</span><b>→</b><span>Qubix checks</span><b>→</b><span>Founder review</span>
    </div>
  </section>

  <div class="workspace">
    <section class="panel source" aria-labelledby="source-heading">
      <header><span>01</span><div><small>SOURCE</small><h2 id="source-heading">Bring the conversation</h2></div></header>
      <p>Paste the relevant chat. Speaker labels such as <code>User:</code>, <code>Assistant:</code> or <code>Claude:</code> give the cleanest message count. Unlabelled text is split at blank lines.</p>
      <label for="transcript">Conversation transcript</label>
      <textarea id="transcript" rows="14" bind:value={transcript} on:input={save} placeholder="User: We should teach probability before inference…&#10;&#10;Assistant: Then the first pair should…"></textarea>
      <div class="source-controls">
        <label for="message-limit">Messages to use
          <select id="message-limit" bind:value={limit} on:change={save}>
            <option value={10}>Last 10</option><option value={20}>Last 20</option><option value={30}>Last 30</option><option value={50}>Last 50</option>
          </select>
        </label>
        <output>{detectedCount} messages detected</output>
      </div>
      <p class="privacy"><b>Private by design:</b> this transcript stays in this browser tab and is never sent by Qubix.</p>
    </section>

    <section class="panel brief" aria-labelledby="brief-heading">
      <header><span>02</span><div><small>PREPARE</small><h2 id="brief-heading">Frame one draft</h2></div></header>
      <div class="fields">
        <label for="draft-title">Working title<input id="draft-title" bind:value={title} on:input={save} placeholder="Probability: events and outcomes" /></label>
        <label for="draft-target">Draft type<select id="draft-target" bind:value={target} on:change={save}>{#each targets as option}<option value={option.value}>{option.label}</option>{/each}</select></label>
      </div>
      <button class="primary" type="button" disabled={!transcript.trim()} on:click={prepare}>Prepare handoff from the last {limit} messages</button>
      {#if prompt}
        <label for="handoff-prompt">Handoff prompt</label>
        <textarea id="handoff-prompt" class="prompt" rows="18" readonly value={prompt}></textarea>
        <div class="actions"><button type="button" on:click={() => copy(prompt, 'prompt')}>{copied === 'prompt' ? 'Copied' : 'Copy for ChatGPT, Codex or Claude'}</button></div>
        <p class="instruction">Paste this prompt into the AI chat you already use. When it replies, bring the complete response back below.</p>
      {/if}
    </section>

    <section class="panel returned" aria-labelledby="returned-heading">
      <header><span>03</span><div><small>RETURN</small><h2 id="returned-heading">Bring back the draft</h2></div></header>
      <label for="returned-draft">AI response</label>
      <textarea id="returned-draft" rows="20" bind:value={draft} on:input={save} placeholder="# Your title&#10;Status: AI_DRAFT&#10;&#10;## Conversation decisions captured…"></textarea>
      <div class="actions">
        <button type="button" disabled={!draft.trim()} on:click={() => copy(draft, 'draft')}>{copied === 'draft' ? 'Copied' : 'Copy draft'}</button>
        <button type="button" disabled={!draft.trim()} on:click={download}>Download AI_DRAFT.md</button>
      </div>
      <label class="include"><input type="checkbox" bind:checked={includeTranscript} on:change={save} /> Include the selected conversation as an appendix in the download</label>
      {#if copied === 'blocked'}<p class="error" role="status">Clipboard access was blocked. Select the text manually.</p>{/if}
    </section>

    <aside class="panel checks" aria-labelledby="checks-heading">
      <header><span>04</span><div><small>CHECK</small><h2 id="checks-heading">Review readiness</h2></div></header>
      <div class:ready={validation.ready} class="score"><strong>{validation.passed}/{validation.total}</strong><span>{validation.ready ? 'Ready for founder review' : 'Checks passed'}</span></div>
      <ul>{#each validation.checks as check}<li class:pass={check.pass}><b>{check.pass ? '✓' : '○'}</b><span>{check.label}</span></li>{/each}</ul>
      <div class="boundary"><b>This workshop cannot approve or publish.</b><span>A complete result remains <code>AI_DRAFT</code> until you conduct a separate founder review.</span></div>
    </aside>
  </div>
</main>

<style>
  :global(html),:global(body),:global(#app),:global(.qubix-university){height:auto!important;min-height:100%!important;overflow:visible!important}
  :global(body){position:static!important;overscroll-behavior:auto!important;background:#eee7d8;color:#25231f}
  .workshop-page{--ink:#25231f;--paper:#f8f4eb;--cream:#eee7d8;--clay:#a64e29;--green:#38682c;min-height:100vh;padding:18px clamp(14px,3vw,42px) 60px;background:var(--cream);color:var(--ink);font-family:var(--qx-font,Arial,sans-serif);box-sizing:border-box}
  .masthead{display:flex;align-items:center;gap:18px;max-width:1320px;margin:0 auto 24px;padding-bottom:14px;border-bottom:2px solid var(--ink)}
  .identity{display:flex;align-items:center;gap:10px;color:inherit;text-decoration:none}.identity span{display:grid;place-items:center;width:38px;height:38px;background:var(--clay);color:#fff;font:900 12px ui-monospace,monospace}.identity b{font-size:13px;letter-spacing:.12em}.local{display:flex;align-items:center;gap:7px;color:#4f493e;font-size:11px;font-weight:850;letter-spacing:.1em}.local i{width:8px;height:8px;border-radius:50%;background:var(--green)}
  button{font-family:inherit}.clear{margin-left:auto;padding:9px 13px;border:1px solid var(--ink);border-radius:999px;background:var(--paper);font-weight:800;cursor:pointer}
  .intro{max-width:1320px;margin:0 auto 22px;padding:32px clamp(24px,5vw,58px);border:3px solid var(--ink);border-radius:28px 5px 28px 5px;background:var(--paper);box-shadow:9px 9px 0 #cabda6}.eyebrow{margin:0 0 10px;color:var(--clay);font-size:11px;font-weight:900;letter-spacing:.13em}.intro h1{margin:0;font:500 clamp(42px,6vw,72px)/.98 Georgia,serif;letter-spacing:-.04em}.intro>p:not(.eyebrow){max-width:860px;margin:18px 0 0;color:#5f574a;font:17px/1.55 Georgia,serif}
  .flow{display:flex;align-items:center;flex-wrap:wrap;gap:9px;margin-top:24px}.flow span{padding:8px 13px;border:1px solid #b9ae9b;border-radius:999px;background:#fff;font-size:12px;font-weight:800}.flow b{color:var(--clay)}
  .workspace{display:grid;grid-template-columns:1fr 1fr;gap:18px;max-width:1320px;margin:auto}.panel{padding:24px;border:2px solid var(--ink);background:var(--paper);box-shadow:5px 5px 0 rgba(37,35,31,.12)}.panel>header{display:flex;gap:13px;align-items:flex-start;margin-bottom:18px}.panel>header>span{display:grid;place-items:center;flex:0 0 42px;height:34px;border-radius:999px;background:var(--ink);color:#fff;font-size:11px;font-weight:900}.panel header small{display:block;margin-bottom:3px;color:var(--clay);font-size:11px;font-weight:900;letter-spacing:.1em}.panel h2{margin:0;font:700 29px/1.08 Georgia,serif}.panel>p{color:#655d50;font-size:13px;line-height:1.5}
  label{display:grid;gap:7px;margin-top:14px;color:#514b41;font-size:11px;font-weight:900;letter-spacing:.07em;text-transform:uppercase}textarea,input,select{box-sizing:border-box;width:100%;padding:11px 12px;border:2px solid var(--ink);border-radius:4px;background:#fffdf8;color:var(--ink);font:650 14px/1.5 var(--qx-font,Arial,sans-serif)}textarea{resize:vertical}.prompt{background:#f1eadc;font:600 12.5px/1.55 ui-monospace,monospace}.fields{display:grid;grid-template-columns:1fr 1fr;gap:12px}.source-controls{display:flex;align-items:end;justify-content:space-between;gap:12px}.source-controls label{width:160px}.source-controls output{padding-bottom:11px;color:#655d50;font-size:12px;font-weight:800}.privacy{padding:12px 14px;border-left:4px solid var(--green);background:#e1eadb}.privacy b{color:var(--ink)}
  .primary,.actions button{min-height:44px;padding:9px 16px;border:2px solid var(--ink);border-radius:999px;background:#fff;color:var(--ink);font-size:12px;font-weight:900;cursor:pointer}.primary{width:100%;margin-top:18px;background:var(--clay);border-color:var(--clay);color:#fff}.primary:disabled,.actions button:disabled{opacity:.45;cursor:default}.actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:12px}.instruction{padding:12px 14px;background:#e1eadb;border-left:4px solid var(--green)}
  .include{display:flex;align-items:center;gap:9px;text-transform:none;letter-spacing:0}.include input{width:18px;height:18px;margin:0}.error{color:#8c2e20!important;font-weight:800}
  .score{display:flex;align-items:baseline;gap:10px;margin-bottom:14px;padding:15px;border-left:4px solid var(--clay);background:#f1eadc}.score.ready{border-color:var(--green);background:#e1eadb}.score strong{font:700 34px Georgia,serif}.score span{font-size:12px;font-weight:850}.checks ul{display:grid;gap:7px;margin:0;padding:0;list-style:none}.checks li{display:flex;gap:9px;align-items:flex-start;padding:8px 10px;background:#eee7d8;color:#6a6255;font-size:12px}.checks li.pass{background:#e1eadb;color:#294d21}.checks li b{font-size:15px}.boundary{display:grid;gap:7px;margin-top:18px;padding:14px;border:2px solid var(--ink);background:#fff}.boundary span{color:#655d50;font-size:12px;line-height:1.45}code{font-family:ui-monospace,monospace}
  button:focus-visible,textarea:focus-visible,input:focus-visible,select:focus-visible,a:focus-visible{outline:3px solid var(--clay);outline-offset:3px}
  @media(max-width:860px){.workspace{grid-template-columns:1fr}.intro{padding:27px 22px}.local{display:none}}
  @media(max-width:540px){.workshop-page{padding:12px 10px 42px}.masthead{gap:10px}.identity b{display:none}.clear{margin-left:auto;font-size:11px}.intro h1{font-size:43px}.flow b{display:none}.flow span{width:100%;box-sizing:border-box}.panel{padding:19px 15px}.fields{grid-template-columns:1fr}.source-controls{align-items:flex-start;flex-direction:column}.source-controls output{padding:0}.actions{display:grid}.actions button{width:100%}}
</style>
