<script>
  import { onDestroy } from 'svelte';
  import {
    signUp,
    logIn,
    signInWithGoogle,
    signInWithPhone,
    verifyPhoneOtp,
    requestPasswordReset,
    updatePassword,
    resendConfirmation
  } from '../lib/stores/auth.js';
  import QxButton from '../lib/components/qubix/QxButton.svelte';

  const PHONE_AUTH_ENABLED = import.meta.env.VITE_ENABLE_PHONE_AUTH === 'true';

  export let onSkip = () => {};
  export let onAuthed = () => {};
  export let initialMode = 'welcome';

  let mode = initialMode;
  let authTab = 'login';
  let method = 'email';
  let email = '';
  let password = '';
  let name = '';
  let phone = '';
  let newPassword = '';
  let confirmPassword = '';
  let codeDigits = ['', '', '', '', '', ''];
  let loading = false;
  let error = '';
  let notice = '';
  let resendTimer = 30;
  let interval;
  let showPassword = false;

  $: emailValid = validEmail(email);
  $: phoneValid = validPhone();
  $: emailAuthValid = emailValid
    && password.length >= (authTab === 'signup' ? 8 : 1)
    && (authTab === 'login' || name.trim().length >= 2);

  $: if (mode === 'verify') {
    if (interval) clearInterval(interval);
    if (resendTimer > 0) {
      interval = setInterval(() => {
        if (resendTimer > 0) resendTimer--;
      }, 1000);
    }
  }

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });

  function goBack() {
    mode = 'welcome';
    error = '';
    notice = '';
    codeDigits = ['', '', '', '', '', ''];
  }

  function changeAuthTab(tab) {
    authTab = tab;
    error = '';
    notice = '';
  }

  function changeMethod(next) {
    method = next;
    error = '';
    notice = '';
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function normalizedPhone() {
    return phone.replace(/[\s()-]/g, '');
  }

  function validPhone() {
    return /^\+[1-9]\d{7,14}$/.test(normalizedPhone());
  }

  function friendlyError(e, fallback) {
    const message = e?.message || fallback;
    if (/invalid login credentials/i.test(message)) return 'Email or password is incorrect.';
    if (/email not confirmed/i.test(message)) return 'Confirm your email before logging in.';
    if (/user already registered/i.test(message)) return 'An account already exists for this email. Try logging in.';
    if (/rate limit|too many requests/i.test(message)) return 'Too many attempts. Please wait a moment and try again.';
    if (/auth session missing|session.*missing/i.test(message)) return 'This recovery link is invalid or expired. Request a new one.';
    return message;
  }

  function handleCodeInput(e, idx) {
    const val = e.target.value.replace(/[^0-9]/g, '');
    codeDigits[idx] = val.charAt(0) || '';
    codeDigits = [...codeDigits];
    if (val && idx < 5) {
      const next = document.querySelector(`.code-box[data-idx="${idx + 1}"]`);
      if (next) setTimeout(() => next.focus(), 10);
    }
    if (codeDigits.every(d => d !== '')) handleVerify();
  }

  async function handleSignUp() {
    loading = true;
    error = '';
    try {
      const data = await signUp(email, password, name);
      if (data.session) onAuthed(true);
      else mode = 'confirm-email';
    } catch (e) {
      error = friendlyError(e, 'Could not create your account.');
    } finally {
      loading = false;
    }
  }

  async function handleLogin() {
    loading = true;
    error = '';
    try {
      await logIn(email, password);
      onAuthed(false);
    } catch (e) {
      error = friendlyError(e, 'Could not log in.');
    } finally {
      loading = false;
    }
  }

  async function handleGoogle() {
    loading = true;
    error = '';
    try {
      await signInWithGoogle();
    } catch (e) {
      error = friendlyError(e, 'Google sign-in could not start.');
      loading = false;
    }
  }

  async function handlePhone() {
    loading = true;
    error = '';
    try {
      phone = normalizedPhone();
      await signInWithPhone(phone, authTab === 'signup');
      mode = 'verify';
      resendTimer = 30;
      codeDigits = ['', '', '', '', '', ''];
    } catch (e) {
      error = friendlyError(e, 'Could not send a verification code.');
    } finally {
      loading = false;
    }
  }

  async function handleVerify() {
    const code = codeDigits.join('');
    if (code.length < 6) return;
    loading = true;
    error = '';
    try {
      await verifyPhoneOtp(phone, code);
      onAuthed(authTab === 'signup');
    } catch (e) {
      error = friendlyError(e, 'That code is invalid or has expired.');
    } finally {
      loading = false;
    }
  }

  async function handlePasswordReset() {
    if (!validEmail(email)) return;
    loading = true;
    error = '';
    notice = '';
    try {
      await requestPasswordReset(email);
      notice = 'If an account exists for that email, a reset link is on its way.';
    } catch (e) {
      error = friendlyError(e, 'Could not send the reset link.');
    } finally {
      loading = false;
    }
  }

  async function handleNewPassword() {
    if (newPassword.length < 8 || newPassword !== confirmPassword) return;
    loading = true;
    error = '';
    notice = '';
    try {
      await updatePassword(newPassword);
      notice = 'Password updated. Taking you back to Qubix...';
      setTimeout(() => onAuthed(false), 500);
    } catch (e) {
      error = friendlyError(e, 'This recovery link may have expired. Request a new one.');
    } finally {
      loading = false;
    }
  }

  async function handleResendConfirmation() {
    loading = true;
    error = '';
    notice = '';
    try {
      await resendConfirmation(email);
      notice = 'A fresh confirmation link has been sent.';
    } catch (e) {
      error = friendlyError(e, 'Could not resend the confirmation email.');
    } finally {
      loading = false;
    }
  }
</script>

<div class="qx-shell auth-view">
  {#if mode === 'welcome'}
    <div class="screen welcome">
      <div class="brand">QUB<span class="acc">I</span>X</div>
      <h1 class="sr-only">Log in or sign up to Qubix</h1>
      <div class="tagline">
        <strong class="qx-display">Learn forwards. Solve backwards.</strong>
        <span>Two routes through difficult ideas.</span>
      </div>

      <div class="tab-row">
        <button class="tab" class:active={authTab === 'login'} aria-pressed={authTab === 'login'} on:click={() => changeAuthTab('login')}>Log in</button>
        <button class="tab" class:active={authTab === 'signup'} aria-pressed={authTab === 'signup'} on:click={() => changeAuthTab('signup')}>Sign up</button>
      </div>

      {#if PHONE_AUTH_ENABLED}
        <div class="method-row" aria-label="Authentication method">
          <button class:active={method === 'email'} aria-pressed={method === 'email'} on:click={() => changeMethod('email')}>Email</button>
          <button class:active={method === 'phone'} aria-pressed={method === 'phone'} on:click={() => changeMethod('phone')}>Phone</button>
        </div>
      {/if}

      {#if method === 'email'}
        {#if authTab === 'signup'}
          <label class="fl" for="su-name">Name</label>
          <input id="su-name" class="field" type="text" placeholder="Ada" autocomplete="name" bind:value={name} />
        {/if}

        <label class="fl" for="auth-email">Email</label>
        <input id="auth-email" class="field" type="email" inputmode="email" placeholder="ada@qubix.app" autocomplete="email" bind:value={email} />

        <label class="fl" for="auth-pw">Password</label>
        <div class="pw-row">
          {#if showPassword}
            <input id="auth-pw" class="field" type="text" placeholder="8 characters or more" autocomplete="off" bind:value={password} on:keydown={(e) => e.key === 'Enter' && emailAuthValid && (authTab === 'login' ? handleLogin() : handleSignUp())} />
          {:else}
            <input id="auth-pw" class="field" type="password" placeholder="8 characters or more" autocomplete={authTab === 'signup' ? 'new-password' : 'current-password'} bind:value={password} on:keydown={(e) => e.key === 'Enter' && emailAuthValid && (authTab === 'login' ? handleLogin() : handleSignUp())} />
          {/if}
          <button class="show-btn" on:click={() => showPassword = !showPassword} type="button" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
        </div>

        {#if authTab === 'login'}
          <button class="link forgot" on:click={() => { mode = 'forgot'; error = ''; notice = ''; }}>Forgot password?</button>
        {:else}
          <div class="field-hint">Use at least 8 characters.</div>
        {/if}
      {:else}
        <label class="fl" for="auth-phone">Mobile number</label>
        <input id="auth-phone" class="field" type="tel" inputmode="tel" placeholder="+44 7700 900000" autocomplete="tel" bind:value={phone} on:keydown={(e) => e.key === 'Enter' && phoneValid && handlePhone()} />
        <div class="field-hint">Include your country code. Standard SMS rates may apply.</div>
      {/if}

      {#if error}<div class="error" role="alert">{error}</div>{/if}
      {#if notice}<div class="notice" role="status">{notice}</div>{/if}

      {#if method === 'phone'}
        <QxButton variant="primary" on:click={handlePhone} disabled={loading || !phoneValid}>{loading ? 'Sending...' : authTab === 'signup' ? 'Send sign-up code' : 'Send login code'}</QxButton>
      {:else if authTab === 'login'}
        <QxButton variant="primary" on:click={handleLogin} disabled={loading || !emailAuthValid}>{loading ? 'Logging in...' : 'Log in'}</QxButton>
      {:else}
        <QxButton variant="primary" on:click={handleSignUp} disabled={loading || !emailAuthValid}>{loading ? 'Creating account...' : 'Create account'}</QxButton>
      {/if}

      <div class="divider"><span>or</span></div>
      <button class="social-btn google-btn" on:click={handleGoogle} disabled={loading}>
        <span class="g-dot" aria-hidden="true">G</span>Continue with Google
      </button>

      <button class="link skip-link" on:click={onSkip}>Continue as guest</button>
      <div class="legal-note">By continuing, you agree to our <a href="/terms.html" target="_blank" rel="noopener">Terms</a> and acknowledge our <a href="/privacy.html" target="_blank" rel="noopener">Privacy Policy</a>.</div>
    </div>

  {:else if mode === 'forgot'}
    <div class="screen form-screen">
      <button class="back-chev" on:click={goBack} aria-label="Back to login">‹</button>
      <div class="verify-glyph" aria-hidden="true">✉</div>
      <h2>Reset your password</h2>
      <p>Enter your account email and we will send you a secure recovery link.</p>
      <label class="fl" for="reset-email">Email</label>
      <input id="reset-email" class="field" type="email" inputmode="email" autocomplete="email" placeholder="ada@qubix.app" bind:value={email} on:keydown={(e) => e.key === 'Enter' && emailValid && handlePasswordReset()} />
      {#if error}<div class="error" role="alert">{error}</div>{/if}
      {#if notice}<div class="notice" role="status">{notice}</div>{/if}
      <QxButton variant="primary" on:click={handlePasswordReset} disabled={loading || !emailValid}>{loading ? 'Sending...' : 'Send reset link'}</QxButton>
    </div>

  {:else if mode === 'reset-password'}
    <div class="screen form-screen">
      <div class="verify-glyph" aria-hidden="true">PW</div>
      <h2>Choose a new password</h2>
      <p>Use at least 8 characters and avoid a password you use elsewhere.</p>
      <label class="fl" for="new-password">New password</label>
      <input id="new-password" class="field" type="password" autocomplete="new-password" bind:value={newPassword} />
      <label class="fl" for="confirm-password">Confirm password</label>
      <input id="confirm-password" class="field" type="password" autocomplete="new-password" bind:value={confirmPassword} on:keydown={(e) => e.key === 'Enter' && newPassword.length >= 8 && newPassword === confirmPassword && handleNewPassword()} />
      {#if confirmPassword && newPassword !== confirmPassword}<div class="error" role="alert">Passwords do not match.</div>{/if}
      {#if error}<div class="error" role="alert">{error}</div>{/if}
      {#if notice}<div class="notice" role="status">{notice}</div>{/if}
      <QxButton variant="primary" on:click={handleNewPassword} disabled={loading || newPassword.length < 8 || newPassword !== confirmPassword}>{loading ? 'Updating...' : 'Update password'}</QxButton>
      <button class="link recovery-link" on:click={() => { mode = 'forgot'; error = ''; notice = ''; }}>Request a new recovery link</button>
    </div>

  {:else if mode === 'confirm-email'}
    <div class="screen form-screen">
      <button class="back-chev" on:click={goBack} aria-label="Back to login">‹</button>
      <div class="verify-glyph" aria-hidden="true">✉</div>
      <h2>Confirm your email</h2>
      <p>We sent a confirmation link to <strong>{email}</strong>. Open it on this device to finish creating your account.</p>
      {#if error}<div class="error" role="alert">{error}</div>{/if}
      {#if notice}<div class="notice" role="status">{notice}</div>{/if}
      <QxButton variant="secondary" on:click={handleResendConfirmation} disabled={loading}>{loading ? 'Sending...' : 'Resend confirmation'}</QxButton>
      <button class="link recovery-link" on:click={() => { authTab = 'login'; goBack(); }}>Back to login</button>
    </div>

  {:else if mode === 'verify'}
    <div class="screen form-screen">
      <button class="back-chev" on:click={goBack} aria-label="Back to login">‹</button>
      <div class="verify-glyph" aria-hidden="true">✉</div>
      <h2>Check your phone</h2>
      <p>We sent a 6-digit code to <strong>{phone || 'your number'}</strong></p>
      <div class="code-inputs" aria-label="Verification code">
        {#each codeDigits as digit, i}
          <input class="code-box" data-idx={i} aria-label={`Digit ${i + 1}`} type="text" inputmode="numeric" autocomplete={i === 0 ? 'one-time-code' : 'off'} maxlength="1" value={digit} on:input={(e) => handleCodeInput(e, i)} />
        {/each}
      </div>
      {#if error}<div class="error" role="alert">{error}</div>{/if}
      <div class="resend">Didn't get it? {#if resendTimer > 0}Resend in <strong>0:{String(resendTimer).padStart(2, '0')}</strong>{:else}<button class="link" on:click={handlePhone}>Resend</button>{/if}</div>
      <QxButton variant="primary" on:click={handleVerify} disabled={loading || codeDigits.some(d => d === '')}>{loading ? 'Verifying...' : 'Verify & continue'}</QxButton>
    </div>
  {/if}
</div>

<style>
  .auth-view {
    min-height: 100%; display: flex; flex-direction: column; align-items: center;
    padding: clamp(20px, 5vw, 44px); box-sizing: border-box;
  }
  .screen {
    display: flex; flex-direction: column; align-items: center; text-align: center;
    width: 100%; max-width: 390px; margin: auto 0;
    padding: clamp(22px, 5vw, 34px);
    border: 1px solid var(--qx-border);
    border-radius: 26px;
    background: color-mix(in srgb, var(--qx-surface) 84%, transparent);
    box-shadow: var(--qx-shadow-soft);
  }
  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }
  .brand { font-size: 25px; font-weight: 950; letter-spacing: 0.16em; color: var(--qx-text); margin-bottom: 5px; }
  .acc { color: var(--qx-accent); }
  .tagline {
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin-bottom: 28px;
    color: var(--qx-text-dim);
  }
  .tagline strong { color: var(--qx-text); font-size: 13px; font-weight: 900; }
  .tagline span { font-size: 10.5px; font-weight: 650; }
  .tab-row {
    display: flex; width: 100%; background: var(--qx-surface-2); border-radius: 15px;
    border: 1px solid var(--qx-border); margin-bottom: 12px; padding: 4px;
  }
  .tab {
    flex: 1; min-height: 42px; padding: 9px; border-radius: 11px; border: 1px solid transparent; background: transparent;
    font-family: var(--qx-font); font-size: 13px; font-weight: 800; color: var(--qx-text-dim); cursor: pointer;
    transition: all 0.15s;
  }
  .tab.active { border-color: var(--qx-border); background: var(--qx-surface); color: var(--qx-text); box-shadow: var(--qx-shadow-card); }
  .method-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: 6px; width: 100%; margin-bottom: 10px;
  }
  .method-row button {
    min-height: 44px; border: 1.5px solid var(--qx-border-2); border-radius: var(--qx-radius-sm);
    background: transparent; color: var(--qx-text-dim); font: 700 13px var(--qx-font); cursor: pointer;
  }
  .method-row button.active { border-color: var(--qx-accent); color: var(--qx-accent-text); background: var(--qx-accent-soft); }
  .fl {
    align-self: flex-start; font-size: 10px; font-weight: 850; color: var(--qx-text-dim);
    text-transform: uppercase; letter-spacing: 0.08em; margin: 10px 0 6px 2px;
  }
  .field {
    width: 100%; min-height: 50px; padding: 13px 14px; border-radius: 13px;
    border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text);
    font-family: var(--qx-font); font-size: 15px; box-sizing: border-box; margin-bottom: 10px;
    transition: border 0.15s;
  }
  .field:focus { outline: 2px solid transparent; border-color: var(--qx-accent); }
  .pw-row { position: relative; width: 100%; }
  .pw-row .field { padding-right: 64px; }
  .show-btn {
    position: absolute; right: 4px; top: 2px; min-width: 52px; min-height: 44px;
    border: none; background: none; color: var(--qx-text-dim); font-size: 13px; font-weight: 700;
    cursor: pointer; font-family: var(--qx-font);
  }
  .forgot { align-self: flex-end; min-height: 44px; margin: -6px 0 2px; padding: 10px 4px; font-size: 13px; }
  .field-hint { align-self: flex-start; margin: -4px 4px 10px; color: var(--qx-text-faint); font-size: 12px; line-height: 1.4; text-align: left; }
  .link { background: none; border: none; color: var(--qx-accent); font-weight: 700; font-size: inherit; cursor: pointer; }
  .error, .notice { width: 100%; box-sizing: border-box; border-radius: var(--qx-radius-sm); padding: 10px 12px; margin: 7px 0; font-size: 13px; font-weight: 650; line-height: 1.4; }
  .error { color: var(--qx-pink); background: color-mix(in srgb, var(--qx-pink) 10%, transparent); }
  .notice { color: var(--qx-green); background: var(--qx-green-soft); }
  .divider { display: flex; align-items: center; gap: 12px; width: 100%; margin: 16px 0; color: var(--qx-text-faint); font-size: 13px; font-weight: 600; }
  .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--qx-border-2); }
  .social-btn {
    width: 100%; min-height: 50px; padding: 13px; border-radius: 13px;
    border: 1px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text);
    font-family: var(--qx-font); font-size: 15px; font-weight: 700; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .social-btn:disabled { opacity: 0.5; }
  .google-btn { background: #fff; color: #1a1a1a; }
  .g-dot { width: 22px; height: 22px; border-radius: 50%; background: #eef1f5; color: #4e97be; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 13px; }
  .skip-link { min-height: 44px; margin-top: 8px; padding: 12px 8px; font-size: 14px; color: var(--qx-text-dim); }
  .legal-note { margin-top: 6px; font-size: 11.5px; color: var(--qx-text-faint); text-align: center; line-height: 1.45; }
  .legal-note a { color: var(--qx-text-dim); text-decoration: underline; }
  h2 { font-weight: 800; font-size: 25px; color: var(--qx-text); margin: 8px 0 6px; letter-spacing: -0.01em; }
  p { font-size: 14px; font-weight: 400; color: var(--qx-text-dim); margin: 0 0 18px; max-width: 30ch; line-height: 1.5; }
  p strong { color: var(--qx-text); overflow-wrap: anywhere; }
  .back-chev {
    position: absolute; top: 0; left: 0; width: 44px; height: 44px; border-radius: 50%;
    border: 1.5px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text-dim);
    font-size: 21px; cursor: pointer; display: flex; align-items: center; justify-content: center;
  }
  .form-screen { position: relative; padding-top: 54px; }
  .verify-glyph { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 14px; background: var(--qx-accent-soft); color: var(--qx-accent-text); font-size: 12px; font-weight: 950; margin-bottom: 10px; }
  .code-inputs { display: flex; gap: 6px; margin-bottom: 14px; }
  .code-box {
    width: 44px; height: 52px; border-radius: var(--qx-radius-md); border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface); color: var(--qx-text); font-size: 22px; text-align: center; outline: none;
  }
  .code-box:focus { border-color: var(--qx-accent); }
  .resend { font-size: 13px; color: var(--qx-text-faint); margin-bottom: 16px; }
  .recovery-link { min-height: 44px; margin-top: 10px; padding: 12px 8px; }

  @media (max-width: 460px) {
    .auth-view { padding: 18px; }
    .screen {
      max-width: 350px;
      padding: 12px 0;
      border: 0;
      border-radius: 0;
      background: transparent;
      box-shadow: none;
    }
  }

  /* ── Desktop ── */
  @media (min-width: 900px) {
    .auth-view { padding: 60px 80px; }
    .screen { max-width: 460px; padding: 40px 36px; }
    .brand { font-size: 28px; }
    .tagline strong { font-size: 22px; }
    .field { min-height: 50px; font-size: 16px; }
  }
</style>
