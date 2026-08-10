<script>
  import { onMount } from 'svelte';
  import { supabase, supabaseConfigured } from '../supabase.js';

  let user = null;
  let loading = supabaseConfigured;
  let message = '';

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
    loading = true;
    const { error } = await supabase.auth.signOut();
    if (error) message = error.message;
    loading = false;
  }

  $: displayName = user?.user_metadata?.full_name || user?.email || 'Account';
</script>

<div class="auth-control">
  {#if user}
    <button class="account" on:click={signOut} disabled={loading} title={`Signed in as ${user.email || displayName}. Select to sign out.`}>
      <span class="avatar" aria-hidden="true">{displayName.slice(0, 1).toUpperCase()}</span>
      <span class="account-copy"><b>{displayName}</b><small>Sign out</small></span>
    </button>
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
  .auth-message { position: absolute; z-index: 60; top: calc(100% + 8px); right: 0; width: min(280px, calc(100vw - 32px)); padding: 9px 11px; border: 1px solid var(--qx-border); border-radius: 10px; background: var(--qx-surface); color: var(--qx-text-2); box-shadow: var(--qx-shadow-card); font-size: 10px; line-height: 1.4; }
  @media (max-width: 420px) {
    .google { padding: 0 10px; }
    .account-copy { display: none; }
    .account { padding-right: 4px; }
  }
</style>
