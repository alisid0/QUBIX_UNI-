<script>
  import { onMount } from 'svelte';
  import SiteNav from '../lib/components/SiteNav.svelte';
  import SiteFooter from '../lib/components/SiteFooter.svelte';
  import { supabase, supabaseConfigured } from '../lib/supabase.js';
  import { grantConsent } from '../lib/marketing.js';
  import { FREE_ITEMS } from '../lib/access.js';
  import {
    MARKETING_MINIMUM_AGE,
    MINIMUM_AGE,
    PRIVACY_POLICY_PATH,
    marketingConsentAvailable
  } from '../lib/legal.js';

  // 'signin' | 'signup' | 'forgot' | 'recover'
  export let mode = 'signin';

  let email = '';
  let password = '';
  let loading = false;
  let message = '';
  let notice = '';
  let user = null;

  // Founder decision, 2026-08-12. Asked here, immediately before the account is
  // created, rather than recorded in a document nobody reads. Not verification,
  // and it does not pretend to be.
  let ageConfirmed = false;
  // Separate, unticked, and not a condition of creating the account. Making it
  // a condition would mean the consent was not freely given, which is the whole
  // reason it is a second question and not a line in the terms.
  let wantsEmail = false;
  let adultConfirmed = false;

  const origin = () => window.location.origin;

  onMount(() => {
    if (!supabase) return;
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) user = data?.session?.user || null;
    });

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      user = session?.user || null;
      // A reset link lands here with a live session. Without catching this the
      // learner is quietly signed in and never sets the password they came for.
      if (event === 'PASSWORD_RECOVERY') {
        mode = 'recover';
        password = '';
        message = '';
        notice = 'Choose a new password for your account.';
      }
    });

    return () => { mounted = false; data.subscription.unsubscribe(); };
  });

  function plain(error) {
    const text = String(error?.message || '').toLowerCase();
    if (text.includes('invalid login credentials')) {
      return 'That email and password do not match an account. Check both, or create an account.';
    }
    if (text.includes('email not confirmed')) {
      return 'Confirm your email first. The link is in the message we sent when you created the account.';
    }
    if (text.includes('already registered') || text.includes('already been registered')) {
      return 'An account with that email already exists. Sign in instead, or reset the password.';
    }
    if (text.includes('password should be') || text.includes('weak password')) {
      return `Use a password of at least 8 characters.`;
    }
    if (text.includes('rate limit') || text.includes('too many')) {
      return 'Too many attempts. Wait a few minutes and try again.';
    }
    if (text.includes('provider is not enabled')) {
      return 'Google sign-in is not switched on for this site yet. Use an email and password instead.';
    }
    return error?.message || 'Something went wrong. Please try again.';
  }

  function switchTo(next) {
    mode = next;
    message = '';
    notice = '';
  }

  async function withGoogle() {
    if (!supabase) return;
    message = '';
    loading = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${origin()}/start` }
    });
    if (error) { message = plain(error); loading = false; }
  }

  async function submit() {
    if (!supabase) {
      message = 'Sign-in is not configured in this environment.';
      return;
    }
    message = '';
    notice = '';

    const address = email.trim();
    if (mode !== 'recover' && !address) {
      message = 'Enter your email address.';
      return;
    }

    if (mode === 'forgot') {
      loading = true;
      const { error } = await supabase.auth.resetPasswordForEmail(address, {
        redirectTo: `${origin()}/signin`
      });
      loading = false;
      // The same answer either way. "No account found" would let anyone test
      // which addresses are registered here.
      notice = 'If that email has an account, a reset link is on its way. Open it on this device.';
      if (error && !String(error.message).toLowerCase().includes('rate')) return;
      if (error) message = plain(error);
      return;
    }

    if (password.length < 8) {
      message = 'Use a password of at least 8 characters.';
      return;
    }

    if (mode === 'recover') {
      loading = true;
      const { error } = await supabase.auth.updateUser({ password });
      loading = false;
      if (error) { message = plain(error); return; }
      password = '';
      mode = 'signin';
      notice = 'Your password has been changed and you are signed in.';
      return;
    }

    if (mode === 'signup') {
      if (!ageConfirmed) {
        message = `Confirm you are ${MINIMUM_AGE} or over to create an account.`;
        return;
      }
      loading = true;
      const { data, error } = await supabase.auth.signUp({
        email: address,
        password,
        options: { emailRedirectTo: `${origin()}/start` }
      });
      loading = false;
      if (error) { message = plain(error); return; }
      password = '';

      // Only ever after the account exists, and only when both boxes were
      // ticked. A failure to record the preference must not read as a failure
      // to create the account, so it is reported separately.
      if (wantsEmail && adultConfirmed) {
        const result = await grantConsent('signup');
        if (!result.ok) {
          notice = 'Account created, but we could not save your email preference. You can set it again from your account menu.';
        }
      }

      // With confirmation required, signUp returns a user and no session.
      // Saying "you are signed in" there is a lie found one click later.
      if (data?.session) {
        window.location.href = '/start';
        return;
      }
      notice = notice || `Account created. Open the confirmation link we sent to ${address}, then sign in.`;
      mode = 'signin';
      return;
    }

    loading = true;
    const { error } = await supabase.auth.signInWithPassword({ email: address, password });
    loading = false;
    if (error) { message = plain(error); return; }
    window.location.href = '/start';
  }

  $: heading = mode === 'signup' ? 'Create your account'
    : mode === 'forgot' ? 'Reset your password'
    : mode === 'recover' ? 'Set a new password'
    : 'Sign in';
  $: action = mode === 'signup' ? 'Create account'
    : mode === 'forgot' ? 'Send reset link'
    : mode === 'recover' ? 'Save new password'
    : 'Sign in';
</script>

<svelte:head>
  <title>{heading} · Qubix University</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="signin-page">
  <div class="wrap">
    <SiteNav current="" subjects={false} />

    <main>
      <section class="form-col">
        <p class="eyebrow">Qubix University</p>
        <h1>{heading}</h1>

        {#if user && mode !== 'recover'}
          <p class="lede">You are signed in as <b>{user.email}</b>.</p>
          <a class="primary as-link" href="/start">Continue learning</a>
        {:else}
          {#if !supabaseConfigured}
            <p class="alert">Sign-in is not configured in this environment.</p>
          {/if}

          {#if mode !== 'recover'}
            <button class="google" on:click={withGoogle} disabled={loading || !supabaseConfigured}>
              <span aria-hidden="true">G</span>Continue with Google
            </button>
            <div class="or"><span>or</span></div>
          {/if}

          <form on:submit|preventDefault={submit}>
            {#if mode !== 'recover'}
              <label>
                <span>Email</span>
                <input type="email" bind:value={email} autocomplete="email" required
                       disabled={loading} placeholder="you@example.com" />
              </label>
            {/if}

            {#if mode !== 'forgot'}
              <label>
                <span>{mode === 'recover' ? 'New password' : 'Password'}</span>
                <input type="password" bind:value={password} minlength="8" required
                       disabled={loading}
                       autocomplete={mode === 'signin' ? 'current-password' : 'new-password'}
                       placeholder="At least 8 characters" />
              </label>
            {/if}

            {#if mode === 'signup'}
              <label class="check">
                <input type="checkbox" bind:checked={ageConfirmed} disabled={loading} />
                <span>I am {MINIMUM_AGE} or over.</span>
              </label>

              {#if marketingConsentAvailable}
                <label class="check">
                  <input type="checkbox" bind:checked={wantsEmail} disabled={loading} />
                  <span>Email me occasionally about new courses and features. Optional, and you
                        can stop at any time.</span>
                </label>
                {#if wantsEmail}
                  <label class="check nested">
                    <input type="checkbox" bind:checked={adultConfirmed} disabled={loading} />
                    <span>I am {MARKETING_MINIMUM_AGE} or over. Promotional email is for adults
                          only.</span>
                  </label>
                  <p class="fine">What we do with your address is set out in our
                    <a href={PRIVACY_POLICY_PATH}>privacy policy</a>.</p>
                {/if}
              {/if}
            {/if}

            <button class="primary" type="submit" disabled={loading || !supabaseConfigured}>
              {loading ? 'Working…' : action}
            </button>
          </form>

          {#if notice}<p class="notice" role="status">{notice}</p>{/if}
          {#if message}<p class="alert" role="alert">{message}</p>{/if}

          <div class="switches">
            {#if mode === 'signin'}
              <button class="link" on:click={() => switchTo('signup')}>Create an account</button>
              <button class="link" on:click={() => switchTo('forgot')}>Forgot your password?</button>
            {:else if mode === 'signup'}
              <button class="link" on:click={() => switchTo('signin')}>I already have an account</button>
            {:else if mode === 'forgot'}
              <button class="link" on:click={() => switchTo('signin')}>Back to sign in</button>
            {/if}
          </div>
        {/if}
      </section>

      <aside class="why">
        <p class="label">What an account is for</p>
        <h2>Free to learn. Free to join.</h2>
        <p>Anyone can open {FREE_ITEMS} lessons without an account, so you can see what Qubix is
           before deciding anything. After that, learning needs an account.</p>
        <p>It costs nothing. It exists because the tutor answers questions for a learner rather
           than for a browser, and because progress is worth keeping.</p>
        <ul>
          <li>Every chapter, mission and workshop, with no further limit</li>
          <li>Ask Qubix, the tutor that answers questions about the lesson</li>
          <li>Progress that follows you between devices, readable by nobody but you</li>
          <li>Delete the account, and everything in it, from the account menu</li>
        </ul>
        <p class="fine">Qubix is for learners aged {MINIMUM_AGE} and over.</p>
      </aside>
    </main>

    <SiteFooter />
  </div>
</div>

<style>
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%!important;overflow:visible!important}
  :global(body){position:static!important;overscroll-behavior:auto!important}

  .signin-page{--ink:#241f16;--soft:#6d6558;--rule:#cfc5b0;--paper:#f6f1e8;--card:#fffdf8;--green:#315f48;--clay:#b65c32;min-height:100vh;background:var(--paper);color:var(--ink);font-family:var(--qx-font)}
  .wrap{width:min(1180px,calc(100% - 36px));margin:0 auto;padding-bottom:58px}

  main{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.85fr);gap:20px;align-items:start;margin-top:30px}

  .form-col,.why{padding:34px;border:3px solid var(--ink);background:var(--card);box-shadow:6px 6px 0 rgba(36,31,22,.12)}
  .why{background:#efeadf}

  .eyebrow,.label{margin:0 0 9px;color:var(--clay);font-weight:900;font-size:11px;letter-spacing:.13em;text-transform:uppercase}
  h1{margin:0 0 22px;font:500 clamp(34px,4.6vw,50px)/1 Georgia,serif;letter-spacing:-.035em}
  h2{margin:0 0 14px;font:500 clamp(23px,2.8vw,30px)/1.06 Georgia,serif;letter-spacing:-.02em}
  .lede{margin:0 0 18px;font:19px/1.5 Georgia,serif}
  .why p{margin:0 0 13px;color:var(--soft);font-size:15px;line-height:1.55}
  .why ul{margin:0 0 13px;padding-left:19px;display:grid;gap:7px;color:var(--soft);font-size:15px;line-height:1.5}
  .fine{font-size:13px!important;color:var(--soft)}
  .fine a{color:var(--green)}

  form{display:grid;gap:14px}
  label{display:grid;gap:6px;font-weight:800;font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:var(--soft)}
  input[type=email],input[type=password]{min-height:46px;padding:10px 13px;border:2px solid var(--rule);background:#fff;color:var(--ink);font:inherit;font-size:16px;text-transform:none;letter-spacing:0}
  input[type=email]:focus-visible,input[type=password]:focus-visible{outline:3px solid var(--clay);outline-offset:1px;border-color:var(--ink)}

  label.check{display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;font:400 14px/1.45 var(--qx-font);text-transform:none;letter-spacing:0;color:var(--ink)}
  label.check input{width:19px;height:19px;margin:1px 0 0;accent-color:var(--green)}
  label.check.nested{margin-left:29px}

  button{font:inherit;cursor:pointer}
  .primary{min-height:50px;padding:12px 18px;border:3px solid var(--ink);background:var(--green);color:#fff;font-weight:900;font-size:15px;box-shadow:4px 4px 0 rgba(36,31,22,.2)}
  .primary:hover:not(:disabled){transform:translate(1px,1px);box-shadow:3px 3px 0 rgba(36,31,22,.2)}
  .primary:disabled{opacity:.6;cursor:wait}
  .as-link{display:inline-block;text-align:center;text-decoration:none}

  .google{width:100%;min-height:48px;display:flex;align-items:center;justify-content:center;gap:10px;padding:10px;border:2px solid var(--ink);background:#fff;font-weight:800;font-size:15px}
  /* A plain letterform in the page's own ink, not Google's blue. The brand
     palette guard rejects that hue, and a hand-drawn single-colour "G" is not
     Google's mark anyway, so borrowing its colour would be the wrong kind of
     accurate. */
  .google span{display:grid;place-items:center;width:22px;height:22px;border:2px solid var(--ink);border-radius:50%;background:#fff;color:var(--ink);font-weight:900;font-size:13px}
  .google:hover:not(:disabled){background:#f4f0e6}

  .or{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:11px;margin:16px 0}
  .or::before,.or::after{content:'';height:2px;background:var(--rule)}
  .or span{color:var(--soft);font-weight:900;font-size:11px;letter-spacing:.13em;text-transform:uppercase}

  .notice,.alert{margin:16px 0 0;padding:12px 14px;font-size:14px;line-height:1.5}
  .notice{border-left:4px solid var(--green);background:#e7efe1}
  .alert{border-left:4px solid var(--clay);background:#f6e4dc}

  .switches{display:flex;flex-wrap:wrap;gap:16px;margin-top:20px;padding-top:18px;border-top:2px solid var(--rule)}
  .link{padding:0;border:0;background:none;color:var(--green);font-weight:800;font-size:14px;text-decoration:underline;text-underline-offset:3px}
  .link:hover{color:var(--clay)}
  button:focus-visible,a:focus-visible{outline:3px solid var(--clay);outline-offset:3px}

  @media(max-width:860px){main{grid-template-columns:1fr}.why{order:-1}}
  @media(max-width:540px){.wrap{width:min(100% - 20px,1180px)}.form-col,.why{padding:22px 18px;border-width:2px}}
</style>
