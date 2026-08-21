<script>
  import { onMount } from 'svelte';
  import { supabase, supabaseConfigured } from '../supabase.js';

  let user = null;
  let loading = supabaseConfigured;
  let message = '';
  let menuOpen = false;
  let deleteConfirm = false;

  onMount(() => {
    if (!supabase) return;

    let mounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      user = data?.session?.user || null;
      message = error?.message || '';
      loading = false;
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      user = session?.user || null;
      loading = false;
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
  let ageConfirmed = false;

  async function signIn() {
    message = '';
    // The age statement comes first. It is a question about the learner, not
    // about the backend, so it must not depend on whether auth happens to be
    // configured: putting the supabase check above it meant the statement never
    // appeared in any environment without credentials.
    if (!ageConfirmed) {
      ageConfirmed = true;
      return;
    }
    if (!supabase) {
      message = 'Google sign-in is not configured in this environment.';
      ageConfirmed = false;
      return;
    }

    loading = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` }
    });
    if (error) {
      message = error.message;
      loading = false;
    }
  }

  async function signOut() {
    message = '';
    menuOpen = false;
    deleteConfirm = false;
    loading = true;
    const { error } = await supabase.auth.signOut();
    if (error) message = error.message;
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
</script>

<div class="auth-control">
  {#if user}
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
    <button class="google" on:click={signIn} disabled={loading}>
      <span aria-hidden="true">G</span>{loading ? 'Connecting…' : 'Sign in'}
    </button>
    {#if ageConfirmed && !loading}
      <div class="age-gate" role="dialog" aria-label="Age confirmation">
        <p>Qubix is for learners aged <b>13 or over</b>. Signing in creates an
           account and saves your progress.</p>
        <div class="age-actions">
          <button class="age-yes" on:click={signIn}>I am 13 or over · continue</button>
          <button class="age-no" on:click={() => (ageConfirmed = false)}>Cancel</button>
        </div>
        <small>You can keep learning without an account. Only saving across
               devices needs one.</small>
      </div>
    {/if}
  {/if}
  {#if message}<span class="auth-message" role="status">{message}</span>{/if}
</div>

<style>
  .auth-control { position: relative; }
  button { min-height: 36px; border: 1px solid var(--qx-border-2); border-radius: 999px; background: var(--qx-surface); color: var(--qx-text); font: inherit; cursor: pointer; }
  button:focus-visible { outline: 2px solid var(--qx-accent); outline-offset: 2px; }
  button:disabled { cursor: wait; opacity: .65; }
  .google { padding: 0 13px; display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 900; }
  .google span { width: 20px; height: 20px; display: grid; place-items: center; border-radius: 50%; background: #fff; color: #4285f4; box-shadow: inset 0 0 0 1px rgba(0,0,0,.1); font-weight: 900; }
  .account { max-width: 210px; padding: 3px 10px 3px 4px; display: flex; align-items: center; gap: 7px; text-align: left; }
  .avatar { flex: 0 0 28px; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; background: var(--qx-accent-soft); color: var(--qx-accent-text); font-size: 11px; font-weight: 900; }
  .account-copy { min-width: 0; display: flex; flex-direction: column; }
  .account-copy b { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 10px; }
  .account-copy small { color: var(--qx-text-faint); font-size: 8px; font-weight: 800; }
  .account-menu { position: absolute; z-index: 61; top: calc(100% + 8px); right: 0; width: 190px; display: grid; gap: 4px; padding: 6px; border: 1px solid var(--qx-border); border-radius: 12px; background: var(--qx-surface); box-shadow: var(--qx-shadow-card); }
  .account-menu button { width: 100%; min-height: 38px; padding: 8px 10px; border: 0; border-radius: 8px; text-align: left; font-size: 10px; font-weight: 800; }
  .account-menu button:hover { background: var(--qx-surface-2); }
  .account-menu button.confirming { color: var(--qx-danger, #a83232); }
  .auth-message { position: absolute; z-index: 60; top: calc(100% + 8px); right: 0; width: min(280px, calc(100vw - 32px)); padding: 9px 11px; border: 1px solid var(--qx-border); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text-2); box-shadow: var(--qx-shadow-card); font-size: 10px; line-height: 1.4; }
  .age-gate { position: absolute; z-index: 62; top: calc(100% + 8px); right: 0; width: min(290px, calc(100vw - 32px)); padding: 13px; border: 1px solid var(--qx-border); border-radius: 12px; background: var(--qx-surface); box-shadow: var(--qx-shadow-card); display: grid; gap: 9px; }
  .age-gate p { margin: 0; font-size: 11.5px; line-height: 1.5; color: var(--qx-text); }
  .age-gate small { font-size: 9.5px; line-height: 1.45; color: var(--qx-text-faint); }
  .age-actions { display: grid; gap: 5px; }
  .age-actions button { min-height: 36px; padding: 8px 11px; font-size: 10.5px; font-weight: 800; border-radius: 9px; }
  .age-yes { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  @media (max-width: 420px) {
    .google { padding: 0 10px; }
    .account-copy { display: none; }
    .account { padding-right: 4px; }
  }
</style>
