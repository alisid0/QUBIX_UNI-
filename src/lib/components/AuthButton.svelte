<script>
  import { onMount } from 'svelte';
  import { supabase, supabaseConfigured } from '../supabase.js';

  let user = null;
  let loading = supabaseConfigured;
  let message = '';
  let menuOpen = false;
  let deleteConfirm = false;

  // The sign-in panel. Closed until asked for, because the nav is a navigation
  // bar first: a learner who does not want an account should never have a form
  // in front of them.
  let panelOpen = false;
  // 'signin' | 'signup' | 'forgot' | 'recover'. One panel, four jobs, so a
  // learner who came to sign in and discovers they need an account does not
  // lose the email they already typed.
  let mode = 'signin';
  let email = '';
  let password = '';
  let notice = '';

  onMount(() => {
    if (!supabase) return;

    let mounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      user = data?.session?.user || null;
      message = error?.message || '';
      loading = false;
    });

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      user = session?.user || null;
      loading = false;

      // A reset link lands back here with a live session. Supabase treats that
      // session as valid, so without this the learner is silently signed in and
      // never gets to set the password they asked to change.
      if (event === 'PASSWORD_RECOVERY') {
        mode = 'recover';
        panelOpen = true;
        ageConfirmed = true;
        password = '';
        notice = 'Choose a new password for your account.';
        message = '';
      }
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  });

  // Founder decision, 2026-08-12: Qubix is for learners aged 13 and over. An
  // age recorded only in a document is not a policy, so it is stated here,
  // before an account is created, and confirmed rather than assumed. This is
  // not verification and does not pretend to be; it is the declaration both
  // stores expect and the point at which a learner is actually told.
  //
  // Deliberately not persisted. A stored "yes" would mean the statement is made
  // once and never seen again on a shared or borrowed device.
  let ageConfirmed = false;

  const REDIRECT = () => `${window.location.origin}/`;

  // Supabase speaks in API terms. A learner who mistypes a password should not
  // have to read "Invalid login credentials" to work out what happened.
  function plain(error) {
    const text = String(error?.message || '').toLowerCase();
    if (text.includes('invalid login credentials')) {
      return 'That email and password do not match an account. Check both, or create an account.';
    }
    if (text.includes('email not confirmed')) {
      return 'Confirm your email first. The link is in the message we sent when you created the account.';
    }
    if (text.includes('user already registered') || text.includes('already been registered')) {
      return 'An account with that email already exists. Sign in instead, or reset the password.';
    }
    if (text.includes('password should be') || text.includes('weak password')) {
      return 'Use a password of at least 8 characters.';
    }
    if (text.includes('rate limit') || text.includes('too many')) {
      return 'Too many attempts. Wait a few minutes and try again.';
    }
    if (text.includes('provider is not enabled')) {
      return 'Google sign-in is not switched on for this site yet.';
    }
    return error?.message || 'Something went wrong. Please try again.';
  }

  function openPanel() {
    message = '';
    notice = '';
    // The age statement comes first. It is a question about the learner, not
    // about the backend, so it must not depend on whether auth happens to be
    // configured: putting the supabase check above it meant the statement never
    // appeared in any environment without credentials.
    if (!ageConfirmed) {
      ageConfirmed = true;
      return;
    }
    if (!supabase) {
      message = 'Sign-in is not configured in this environment.';
      ageConfirmed = false;
      return;
    }
    panelOpen = true;
  }

  function closePanel() {
    panelOpen = false;
    ageConfirmed = false;
    mode = 'signin';
    password = '';
    message = '';
    notice = '';
  }

  function switchTo(next) {
    mode = next;
    message = '';
    notice = '';
  }

  async function signInWithGoogle() {
    if (!supabase) return;
    message = '';
    loading = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: REDIRECT() }
    });
    if (error) {
      message = plain(error);
      loading = false;
    }
  }

  async function submitEmail() {
    if (!supabase) return;
    message = '';
    notice = '';

    const address = email.trim();
    if (!address) {
      message = 'Enter your email address.';
      return;
    }

    // Sending a reset link needs an address and nothing else, so it is checked
    // before the password rules below.
    if (mode === 'forgot') {
      loading = true;
      const { error } = await supabase.auth.resetPasswordForEmail(address, { redirectTo: REDIRECT() });
      loading = false;
      // Deliberately the same answer whether or not the address has an account.
      // Saying "no account found" would let anyone test which emails are
      // registered here.
      notice = 'If that email has an account, a reset link is on its way. Open it on this device.';
      if (error && !String(error.message).toLowerCase().includes('rate')) return;
      if (error) message = plain(error);
      return;
    }

    if (password.length < 8) {
      message = 'Use a password of at least 8 characters.';
      return;
    }

    loading = true;

    if (mode === 'recover') {
      const { error } = await supabase.auth.updateUser({ password });
      loading = false;
      if (error) {
        message = plain(error);
        return;
      }
      password = '';
      panelOpen = false;
      mode = 'signin';
      notice = '';
      message = 'Your password has been changed and you are signed in.';
      return;
    }

    if (mode === 'signup') {
      const { data, error } = await supabase.auth.signUp({
        email: address,
        password,
        options: { emailRedirectTo: REDIRECT() }
      });
      loading = false;
      if (error) {
        message = plain(error);
        return;
      }
      password = '';
      // With email confirmation switched on, signUp returns a user but no
      // session. Saying "you are signed in" there would be a lie the learner
      // discovers one click later.
      if (data?.session) {
        panelOpen = false;
        return;
      }
      notice = `Account created. Open the confirmation link we sent to ${address}, then sign in.`;
      mode = 'signin';
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email: address, password });
    loading = false;
    if (error) {
      message = plain(error);
      return;
    }
    password = '';
    panelOpen = false;
  }

  async function signOut() {
    message = '';
    menuOpen = false;
    deleteConfirm = false;
    loading = true;
    const { error } = await supabase.auth.signOut();
    if (error) message = plain(error);
    loading = false;
  }

  async function requestDeletion() {
    if (!user || !supabase) return;
    if (!deleteConfirm) {
      deleteConfirm = true;
      message = 'This permanently deletes your account and all saved progress, and cannot be undone. Select again to confirm.';
      return;
    }

    loading = true;
    // Erases the account rather than queueing a request nobody processes.
    // The function acts only on auth.uid(), so there is no account to name and
    // nothing to tamper with. See supabase/qubix/0003_fulfil_account_deletion.sql.
    const { error } = await supabase.rpc('fulfil_my_account_deletion');

    if (error) {
      message = 'We could not delete the account. Nothing has been removed. Please try again.';
      deleteConfirm = false;
      loading = false;
      return;
    }

    // The auth user is gone; end the session so the interface cannot keep
    // showing a signed-in account that no longer exists.
    await supabase.auth.signOut();
    message = 'Your account and saved progress have been deleted.';
    menuOpen = false;
    deleteConfirm = false;
    loading = false;
  }

  $: displayName = user?.user_metadata?.full_name || user?.email || 'Account';
  $: heading = mode === 'signup' ? 'Create your account'
    : mode === 'forgot' ? 'Reset your password'
    : mode === 'recover' ? 'Set a new password'
    : 'Sign in to Qubix';
  $: submitLabel = mode === 'signup' ? 'Create account'
    : mode === 'forgot' ? 'Send reset link'
    : mode === 'recover' ? 'Save new password'
    : 'Sign in';
</script>

<div class="auth-control">
  {#if user && mode !== 'recover'}
    <button class="account" on:click={() => menuOpen = !menuOpen} disabled={loading} aria-expanded={menuOpen} title={`Signed in as ${user.email || displayName}. Select for account options.`}>
      <span class="avatar" aria-hidden="true">{displayName.slice(0, 1).toUpperCase()}</span>
      <span class="account-copy"><b>{displayName}</b><small>Account</small></span>
    </button>
    {#if menuOpen}
      <div class="account-menu" role="menu">
        <button on:click={signOut} disabled={loading} role="menuitem">Sign out</button>
        <button class:confirming={deleteConfirm} on:click={requestDeletion} disabled={loading} role="menuitem">
          {deleteConfirm ? 'Yes, delete permanently' : 'Delete account'}
        </button>
      </div>
    {/if}
  {:else}
    <button class="signin" on:click={openPanel} disabled={loading}>
      {loading ? 'Connecting…' : 'Sign in'}
    </button>

    {#if ageConfirmed && !panelOpen && !loading}
      <div class="panel" role="dialog" aria-label="Age confirmation">
        <p>Qubix is for learners aged <b>13 or over</b>. Signing in creates an
           account and saves your progress.</p>
        <div class="stack">
          <button class="primary" on:click={openPanel}>I am 13 or over · continue</button>
          <button on:click={closePanel}>Cancel</button>
        </div>
        <small>You can keep learning without an account. Only saving across
               devices needs one.</small>
      </div>
    {/if}

    {#if panelOpen}
      <div class="panel wide" role="dialog" aria-label={heading}>
        <h2>{heading}</h2>

        {#if mode !== 'recover'}
          <button class="google" on:click={signInWithGoogle} disabled={loading}>
            <span aria-hidden="true">G</span>Continue with Google
          </button>
          <div class="or"><span>or</span></div>
        {/if}

        <form on:submit|preventDefault={submitEmail} class="stack">
          {#if mode !== 'recover'}
            <label>
              <span>Email</span>
              <input type="email" bind:value={email} autocomplete="email"
                     required disabled={loading} placeholder="you@example.com" />
            </label>
          {/if}

          {#if mode !== 'forgot'}
            <label>
              <span>{mode === 'recover' ? 'New password' : 'Password'}</span>
              <input type="password" bind:value={password} disabled={loading}
                     minlength="8" required
                     autocomplete={mode === 'signin' ? 'current-password' : 'new-password'}
                     placeholder="At least 8 characters" />
            </label>
          {/if}

          <button class="primary" type="submit" disabled={loading}>
            {loading ? 'Working…' : submitLabel}
          </button>
        </form>

        {#if notice}<p class="notice" role="status">{notice}</p>{/if}
        {#if message}<p class="error" role="alert">{message}</p>{/if}

        <div class="switches">
          {#if mode === 'signin'}
            <button class="link" on:click={() => switchTo('signup')}>Create an account</button>
            <button class="link" on:click={() => switchTo('forgot')}>Forgot password?</button>
          {:else if mode === 'signup'}
            <button class="link" on:click={() => switchTo('signin')}>I already have an account</button>
          {:else if mode === 'forgot'}
            <button class="link" on:click={() => switchTo('signin')}>Back to sign in</button>
          {/if}
        </div>

        {#if mode !== 'recover'}
          <button class="link close" on:click={closePanel}>Close</button>
        {/if}
      </div>
    {/if}
  {/if}

  {#if message && !panelOpen}<span class="auth-message" role="status">{message}</span>{/if}
</div>

<style>
  .auth-control { position: relative; }
  button { min-height: 36px; border: 1px solid var(--qx-border-2); border-radius: 999px; background: var(--qx-surface); color: var(--qx-text); font: inherit; cursor: pointer; }
  button:focus-visible { outline: 2px solid var(--qx-accent); outline-offset: 2px; }
  button:disabled { cursor: wait; opacity: .65; }
  .signin { padding: 0 14px; font-size: 13.5px; font-weight: 900; }
  .account { max-width: 210px; padding: 3px 10px 3px 4px; display: flex; align-items: center; gap: 7px; text-align: left; }
  .avatar { flex: 0 0 28px; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; background: var(--qx-accent-soft); color: var(--qx-accent-text); font-size: 13.5px; font-weight: 900; }
  .account-copy { min-width: 0; display: flex; flex-direction: column; }
  .account-copy b { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; }
  .account-copy small { color: var(--qx-text-faint); font-size: 11.5px; font-weight: 800; }
  .account-menu { position: absolute; z-index: 61; top: calc(100% + 8px); right: 0; width: 190px; display: grid; gap: 4px; padding: 6px; border: 1px solid var(--qx-border); border-radius: 12px; background: var(--qx-surface); box-shadow: var(--qx-shadow-card); }
  .account-menu button { width: 100%; min-height: 38px; padding: 8px 10px; border: 0; border-radius: 8px; text-align: left; font-size: 13px; font-weight: 800; }
  .account-menu button:hover { background: var(--qx-surface-2); }
  .account-menu button.confirming { color: var(--qx-danger, #a83232); }
  .auth-message { position: absolute; z-index: 60; top: calc(100% + 8px); right: 0; width: min(280px, calc(100vw - 32px)); padding: 9px 11px; border: 1px solid var(--qx-border); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text-2); box-shadow: var(--qx-shadow-card); font-size: 13px; line-height: 1.4; }

  .panel { position: absolute; z-index: 62; top: calc(100% + 8px); right: 0; width: min(290px, calc(100vw - 32px)); padding: 13px; border: 1px solid var(--qx-border); border-radius: 12px; background: var(--qx-surface); box-shadow: var(--qx-shadow-card); display: grid; gap: 9px; }
  .panel.wide { width: min(320px, calc(100vw - 32px)); }
  .panel p { margin: 0; font-size: 13.5px; line-height: 1.5; color: var(--qx-text); }
  .panel small { font-size: 12px; line-height: 1.45; color: var(--qx-text-faint); }
  .panel h2 { margin: 0; font-size: 15px; font-weight: 900; color: var(--qx-text); }
  .stack { display: grid; gap: 7px; }
  .stack button, .panel .primary { min-height: 38px; padding: 8px 11px; font-size: 13px; font-weight: 800; border-radius: 9px; }
  .primary { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }

  label { display: grid; gap: 4px; font-size: 12px; font-weight: 800; color: var(--qx-text-2); }
  input { min-height: 38px; padding: 8px 11px; border: 1px solid var(--qx-border-2); border-radius: 9px; background: var(--qx-surface); color: var(--qx-text); font: inherit; font-size: 13.5px; }
  input:focus-visible { outline: 2px solid var(--qx-accent); outline-offset: 1px; }

  .google { display: flex; align-items: center; justify-content: center; gap: 8px; min-height: 38px; padding: 8px 11px; font-size: 13px; font-weight: 800; border-radius: 9px; }
  .google span { width: 20px; height: 20px; display: grid; place-items: center; border-radius: 50%; background: #fff; color: #4285f4; box-shadow: inset 0 0 0 1px rgba(0,0,0,.1); font-weight: 900; }

  .or { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 8px; }
  .or::before, .or::after { content: ''; height: 1px; background: var(--qx-border); }
  .or span { font-size: 11.5px; font-weight: 800; color: var(--qx-text-faint); text-transform: uppercase; letter-spacing: .06em; }

  .notice { font-size: 12.5px; line-height: 1.45; color: var(--qx-text-2); }
  .error { font-size: 12.5px; line-height: 1.45; color: var(--qx-danger, #a83232); }

  .switches { display: flex; flex-wrap: wrap; gap: 10px; }
  .link { min-height: 0; padding: 0; border: 0; background: none; color: var(--qx-accent-text, var(--qx-text-2)); font-size: 12.5px; font-weight: 800; text-decoration: underline; }
  .close { justify-self: start; color: var(--qx-text-faint); }

  @media (max-width: 420px) {
    .signin { padding: 0 11px; }
    .account-copy { display: none; }
    .account { padding-right: 4px; }
  }
</style>
