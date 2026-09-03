<script>
  import { onMount } from 'svelte';
  import { supabase, supabaseConfigured } from '../supabase.js';
  import { marketingConsentAvailable } from '../legal.js';
  import { grantConsent, readConsent, withdrawConsent } from '../marketing.js';

  // The account control in the navigation. Deliberately not a sign-in form:
  // the form lives on /signin, where there is room to say what an account is
  // for, and keeping it in one place means the two copies cannot drift.

  let user = null;
  let loading = supabaseConfigured;
  let message = '';
  let menuOpen = false;
  let deleteConfirm = false;
  let consent = null;
  let consentBusy = false;

  onMount(() => {
    if (!supabase) return;

    let mounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      user = data?.session?.user || null;
      message = error?.message || '';
      loading = false;
      if (user) refreshConsent();
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      user = session?.user || null;
      loading = false;
      consent = null;
      if (user) refreshConsent();
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  });

  async function refreshConsent() {
    if (!marketingConsentAvailable) return;
    consent = await readConsent();
  }

  // Withdrawing has to be at least as easy as opting in, so it is one press in
  // the same menu, with no confirmation step in front of it.
  async function toggleEmail() {
    consentBusy = true;
    message = '';
    const result = consent?.granted
      ? await withdrawConsent('account')
      : await grantConsent('account');
    consentBusy = false;
    if (!result.ok) { message = result.reason; return; }
    await refreshConsent();
    message = consent?.granted
      ? 'You will get occasional email about new courses.'
      : 'You are unsubscribed. We will not email you about new courses.';
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
        {#if marketingConsentAvailable}
          <button on:click={toggleEmail} disabled={consentBusy} role="menuitem">
            {consent?.granted ? 'Unsubscribe from emails' : 'Email me about new courses'}
          </button>
        {/if}
        <button on:click={signOut} disabled={loading} role="menuitem">Sign out</button>
        <button class:confirming={deleteConfirm} on:click={requestDeletion} disabled={loading} role="menuitem">
          {deleteConfirm ? 'Yes, delete permanently' : 'Delete account'}
        </button>
      </div>
    {/if}
  {:else}
    <a class="signin" href="/signin">{loading ? 'Connecting…' : 'Sign in'}</a>
  {/if}
  {#if message}<span class="auth-message" role="status">{message}</span>{/if}
</div>

<style>
  .auth-control { position: relative; }
  button { min-height: 36px; border: 1px solid var(--qx-border-2); border-radius: 999px; background: var(--qx-surface); color: var(--qx-text); font: inherit; cursor: pointer; }
  button:focus-visible, a:focus-visible { outline: 2px solid var(--qx-accent); outline-offset: 2px; }
  button:disabled { cursor: wait; opacity: .65; }
  .signin { display: inline-flex; align-items: center; min-height: 36px; padding: 0 14px; border: 1px solid var(--qx-border-2); border-radius: 999px; background: var(--qx-surface); color: var(--qx-text); font-size: 13.5px; font-weight: 900; text-decoration: none; }
  .signin:hover { background: var(--qx-surface-2); }
  .account { max-width: 210px; padding: 3px 10px 3px 4px; display: flex; align-items: center; gap: 7px; text-align: left; }
  .avatar { flex: 0 0 28px; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; background: var(--qx-accent-soft); color: var(--qx-accent-text); font-size: 13.5px; font-weight: 900; }
  .account-copy { min-width: 0; display: flex; flex-direction: column; }
  .account-copy b { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; }
  .account-copy small { color: var(--qx-text-faint); font-size: 11.5px; font-weight: 800; }
  .account-menu { position: absolute; z-index: 61; top: calc(100% + 8px); right: 0; width: 224px; display: grid; gap: 4px; padding: 6px; border: 1px solid var(--qx-border); border-radius: 12px; background: var(--qx-surface); box-shadow: var(--qx-shadow-card); }
  .account-menu button { width: 100%; min-height: 38px; padding: 8px 10px; border: 0; border-radius: 8px; text-align: left; font-size: 13px; font-weight: 800; }
  .account-menu button:hover { background: var(--qx-surface-2); }
  /* -text, not the graphic hue. --qx-danger is 4.31:1 on paper, which is right
     for a border at 3:1 and short of the 4.5:1 this word needs. */
  .account-menu button.confirming { color: var(--qx-danger-text, #A02D1D); }
  .auth-message { position: absolute; z-index: 60; top: calc(100% + 8px); right: 0; width: min(280px, calc(100vw - 32px)); padding: 9px 11px; border: 1px solid var(--qx-border); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text-2); box-shadow: var(--qx-shadow-card); font-size: 13px; line-height: 1.4; }
  @media (max-width: 420px) {
    .signin { padding: 0 11px; }
    .account-copy { display: none; }
    .account { padding-right: 4px; }
  }
</style>
