<script>
  import { onMount } from 'svelte';
  import SiteNav from '../lib/components/SiteNav.svelte';
  import SiteFooter from '../lib/components/SiteFooter.svelte';
  import { completedAssetIds, nextStep } from '../lib/content/learning-progress.js';
  import { liveCompletion } from '../lib/content/learning-flow.js';
  import {
    buildLearningSummary,
    emailShareUrl,
    normalizeUpdatePreferences,
    whatsAppShareUrl
  } from '../lib/updates/learning-updates.js';

  const PREFS_KEY = 'qubix.learning-updates.v1';
  const DOOR_KEY = 'qubix.learning-floor.door.v1';

  let hydrated = false;
  let completion = { done: 0, total: 0, percent: 0 };
  let next = null;
  let summaryText = '';
  let copied = false;
  let notificationState = 'unknown';
  let notificationMessage = '';
  let preferences = normalizeUpdatePreferences();

  function restore() {
    const done = completedAssetIds();
    let door = 'concepts';
    try {
      door = localStorage.getItem(DOOR_KEY) || door;
      preferences = normalizeUpdatePreferences(JSON.parse(localStorage.getItem(PREFS_KEY) || 'null'));
    } catch (_) { /* blocked storage keeps safe defaults */ }
    completion = liveCompletion(done);
    next = nextStep(done, door);
    summaryText = buildLearningSummary({ completion, next, origin: window.location.origin });
    notificationState = 'Notification' in window ? Notification.permission : 'unsupported';
    hydrated = true;
  }

  onMount(restore);

  function savePreferences() {
    preferences = normalizeUpdatePreferences(preferences);
    try { localStorage.setItem(PREFS_KEY, JSON.stringify(preferences)); } catch (_) { /* local only */ }
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summaryText);
      copied = true;
      setTimeout(() => { copied = false; }, 1800);
    } catch (_) {
      notificationMessage = 'Copy was blocked by this browser. Select the summary text instead.';
    }
  }

  async function testNotification() {
    notificationMessage = '';
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      notificationState = 'unsupported';
      notificationMessage = 'This browser does not support installable Qubix notifications.';
      return;
    }

    const permission = Notification.permission === 'default'
      ? await Notification.requestPermission()
      : Notification.permission;
    notificationState = permission;
    if (permission !== 'granted') {
      notificationMessage = permission === 'denied'
        ? 'Notifications are blocked in this browser’s site settings.'
        : 'Notification permission was not granted.';
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification('Your Qubix next step', {
        body: next?.asset?.label
          ? `${next.kind === 'play' ? 'Play' : 'Read'}: ${next.asset.label}`
          : 'Every currently available learning step is complete.',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        tag: 'qubix-learning-update',
        data: { url: next?.asset?.href || '/updates' }
      });
      notificationMessage = 'Test notification sent to this device.';
    } catch (_) {
      notificationMessage = 'The notification could not be delivered on this device.';
    }
  }

  $: whatsappHref = whatsAppShareUrl(summaryText);
  $: emailHref = emailShareUrl(summaryText);
</script>

<svelte:head>
  <title>Learning updates · Qubix University</title>
  <meta name="description" content="Review your Qubix progress, share a lesson summary, and prepare learning reminders on this device." />
</svelte:head>

<div class="updates-page">
  <div class="wrap">
    <SiteNav current="updates" subjects={false} />

    <header class="masthead">
      <div>
        <p class="eyebrow">Your learning, brought back at the right moment</p>
        <h1>Learning updates</h1>
        <p class="lede">Take a compact progress summary with you, send it through WhatsApp or email, and test how Qubix will remind you on this device.</p>
      </div>
      <div class="score" aria-label={`${completion.done} of ${completion.total} live steps complete`}>
        <strong>{completion.percent}%</strong>
        <span>{completion.done} of {completion.total} live steps</span>
        <i><b style={`width:${completion.percent}%`}></b></i>
      </div>
    </header>

    {#if hydrated}
      <main>
        <section class="summary-card" aria-labelledby="summary-heading">
          <div class="section-heading">
            <span class="number">01</span>
            <div><p class="label">Live now</p><h2 id="summary-heading">Your portable summary</h2></div>
          </div>
          <pre>{summaryText}</pre>
          <div class="actions">
            <button type="button" on:click={copySummary}>{copied ? 'Copied' : 'Copy summary'}</button>
            <a class="whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">Send through WhatsApp</a>
            <a href={emailHref}>Send by email</a>
          </div>
          <p class="privacy">Nothing is sent automatically. You choose the recipient in WhatsApp or your email app.</p>
        </section>

        <section class="notification-card" aria-labelledby="notification-heading">
          <div class="section-heading">
            <span class="number">02</span>
            <div><p class="label">Works on supported devices</p><h2 id="notification-heading">App and browser notification</h2></div>
          </div>
          <p>Send one safe test alert containing only your next learning step. Qubix asks for permission only when you press the button.</p>
          <button class="primary" type="button" on:click={testNotification}>
            {notificationState === 'granted' ? 'Send another test notification' : 'Enable and test notifications'}
          </button>
          {#if notificationMessage}<p class="status" role="status">{notificationMessage}</p>{/if}
        </section>

        <section class="schedule-card" aria-labelledby="schedule-heading">
          <div class="section-heading">
            <span class="number">03</span>
            <div><p class="label pending">Prepared, not yet sending</p><h2 id="schedule-heading">Automatic learning reminders</h2></div>
          </div>
          <div class="fields">
            <label>Rhythm
              <select bind:value={preferences.cadence} on:change={savePreferences}>
                <option value="daily">Every day</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekly">Once a week</option>
              </select>
            </label>
            <label>Preferred time
              <input type="time" bind:value={preferences.reminderTime} on:change={savePreferences} />
            </label>
          </div>
          <p class="notice"><b>Your preference is saved on this device.</b> Automatic WhatsApp and background push delivery need the Qubix messaging sender and push service to be connected. Until then, Qubix will not claim that a reminder has been scheduled.</p>
        </section>

        <aside class="channel-map" aria-label="Channel availability">
          <div><b>Summary</b><span class="live">Live</span><small>Copy, WhatsApp share and email share</small></div>
          <div><b>Device alert</b><span class="live">Live</span><small>Permission-based test notification</small></div>
          <div><b>WhatsApp bot</b><span class="waiting">Connection needed</span><small>Verified sender, opt-in and messaging provider</small></div>
          <div><b>Scheduled push</b><span class="waiting">Connection needed</span><small>Push credentials and delivery scheduler</small></div>
        </aside>
      </main>
    {:else}
      <p class="loading">Reading your progress on this device…</p>
    {/if}
  </div>
  <SiteFooter />
</div>

<style>
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%!important;overflow:visible!important}
  :global(body){position:static!important;overscroll-behavior:auto!important}
  .updates-page{--ink:#241f16;--soft:#6d6558;--rule:#cfc5b0;--paper:#f6f1e8;--card:#fffdf8;--green:#315f48;--clay:#b65c32;min-height:100vh;background:var(--paper);color:var(--ink);font-family:var(--qx-font)}
  .wrap{width:min(1180px,calc(100% - 36px));margin:0 auto;padding-bottom:58px}
  .masthead{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:38px;align-items:end;padding:54px 36px 36px;border:4px solid var(--ink);background:#fbf8f1;box-shadow:8px 8px 0 rgba(36,31,22,.15)}
  .eyebrow,.label{margin:0 0 9px;color:var(--clay);font-weight:900;font-size:11px;letter-spacing:.13em;text-transform:uppercase}
  h1,h2{font-family:Georgia,serif}h1{margin:0;font-size:clamp(46px,7vw,78px);line-height:.95;font-weight:500;letter-spacing:-.045em}h2{margin:0;font-size:clamp(25px,3.4vw,38px);line-height:1.04}
  .lede{max-width:720px;margin:20px 0 0;font:20px/1.5 Georgia,serif}
  .score{padding:22px;border-left:4px solid var(--green);background:#e7efe1}.score strong,.score span{display:block}.score strong{font:700 38px Georgia,serif}.score span{margin-top:3px;color:var(--soft);font-size:13px}.score i{display:block;height:7px;margin-top:18px;overflow:hidden;border-radius:999px;background:#cad7c4}.score b{display:block;height:100%;background:var(--green)}
  main{display:grid;grid-template-columns:1.15fr .85fr;gap:20px;margin-top:30px}.summary-card{grid-row:span 2}.summary-card,.notification-card,.schedule-card{padding:28px;border:3px solid var(--ink);background:var(--card);box-shadow:6px 6px 0 rgba(36,31,22,.12)}
  .section-heading{display:flex;align-items:flex-start;gap:15px;margin-bottom:22px}.number{display:grid;place-items:center;flex:0 0 44px;height:36px;border-radius:999px;background:var(--ink);color:white;font-weight:900;font-size:12px}.pending{color:var(--soft)}
  pre{min-height:210px;margin:0;padding:22px;border:2px solid var(--rule);background:#f1eadc;color:var(--ink);font:600 15px/1.65 var(--qx-font);white-space:pre-wrap;word-break:break-word}
  .actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}button,a{min-height:46px;box-sizing:border-box}.actions button,.actions a,.primary{display:inline-flex;align-items:center;justify-content:center;padding:10px 17px;border:2px solid var(--ink);border-radius:999px;background:transparent;color:var(--ink);font:850 13px var(--qx-font);text-decoration:none;cursor:pointer}.actions .whatsapp,.primary{background:var(--green);border-color:var(--green);color:white}.actions button:hover,.actions a:hover,.primary:hover{transform:translateY(-1px)}
  .privacy,.notice,.status,.notification-card>p{color:var(--soft);font-size:13.5px;line-height:1.55}.privacy{margin:15px 0 0}.status{color:var(--green);font-weight:800}
  .schedule-card{grid-column:1/-1}.fields{display:grid;grid-template-columns:1fr 1fr;gap:16px}label{display:grid;gap:8px;color:var(--soft);font-size:12px;font-weight:900;letter-spacing:.06em;text-transform:uppercase}select,input{width:100%;min-height:48px;padding:10px 14px;border:2px solid var(--ink);border-radius:16px;background:#fffdf8;color:var(--ink);font:750 15px var(--qx-font)}.notice{margin:18px 0 0;padding:14px 16px;border-left:4px solid var(--clay);background:#f3e4d8}.notice b{color:var(--ink)}
  .channel-map{grid-column:1/-1;display:grid;grid-template-columns:repeat(4,1fr);border:2px solid var(--ink);background:var(--ink);gap:2px}.channel-map>div{display:grid;gap:6px;padding:17px;background:#fbf8f1}.channel-map span{width:max-content;padding:5px 9px;border-radius:999px;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.06em}.channel-map .live{background:#e7efe1;color:var(--green)}.channel-map .waiting{background:#f1eadc;color:var(--soft)}.channel-map small{color:var(--soft);line-height:1.4}.loading{padding:80px 0;text-align:center}
  button:focus-visible,a:focus-visible,select:focus-visible,input:focus-visible{outline:3px solid var(--clay);outline-offset:3px}
  @media(max-width:820px){.masthead{grid-template-columns:1fr;padding:35px 24px}.score{max-width:340px}main{grid-template-columns:1fr}.summary-card{grid-row:auto}.schedule-card,.channel-map{grid-column:auto}.channel-map{grid-template-columns:1fr 1fr}}
  @media(max-width:540px){.wrap{width:min(100% - 20px,1180px)}.masthead{padding:27px 18px;border-width:3px;box-shadow:5px 5px 0 rgba(36,31,22,.15)}h1{font-size:46px}.lede{font-size:17px}.summary-card,.notification-card,.schedule-card{padding:20px 16px}.actions{display:grid}.actions>*{width:100%}.fields,.channel-map{grid-template-columns:1fr}pre{min-height:0;font-size:13px}}
</style>
