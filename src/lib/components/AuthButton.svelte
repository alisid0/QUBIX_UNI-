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

  async function signIn() {
    message = '';
    if (!supabase) {
      message = 'Google sign-in is not configured in this environment.';
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
      message = 'Select Delete account again to confirm your request.';
      return;
    }

    loading = true;
    const { error } = await supabase
      .from('account_deletion_requests')
      .insert({ user_id: user.id });

    if (error?.code === '23505') {
      message = 'An account deletion request is already pending.';
    } else if (error) {
      message = 'We could not submit the deletion request. Please try again.';
    } else {
      message = 'Account deletion requested. Your request is now pending.';
      menuOpen = false;
    }
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
          {deleteConfirm ? 'Confirm deletion request' : 'Delete account'}
        </button>
      </div>
    {/if}
  {:else}
    <button class="google" on:click={signIn} disabled={loading}>
      <span aria-hidden="true">G</span>{loading ? 'Connecting…' : 'Sign in'}
    </button>
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
  @media (max-width: 420px) {
    .google { padding: 0 10px; }
    .account-copy { display: none; }
    .account { padding-right: 4px; }
  }
</style>
