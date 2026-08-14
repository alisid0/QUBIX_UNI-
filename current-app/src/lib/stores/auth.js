import { writable, derived } from 'svelte/store';
import { supabase } from '../supabase.js';

export const user = writable(null);
export const session = writable(null);
export const authLoading = writable(true);

// Derived: whether user is authenticated
export const isAuthenticated = derived(user, $user => $user !== null);

// Derived: user display name or fallback
export const displayName = derived(user, $user =>
  $user?.user_metadata?.display_name || $user?.email?.split('@')[0] || 'Learner'
);

/**
 * Initialize auth state from Supabase session.
 */
export async function initAuth() {
  authLoading.set(true);

  const { data: { session: currentSession } } = await supabase.auth.getSession();
  session.set(currentSession);
  user.set(currentSession?.user ?? null);

  // Listen for auth changes
  supabase.auth.onAuthStateChange((_event, newSession) => {
    session.set(newSession);
    user.set(newSession?.user ?? null);
  });

  authLoading.set(false);
}

/**
 * Sign up with email + password.
 */
export async function signUp(email, password, displayName) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: { display_name: displayName.trim() },
      emailRedirectTo: `${window.location.origin}/?auth=confirmed`
    }
  });
  if (error) throw error;
  return data;
}

/**
 * Log in with email + password.
 */
export async function logIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password
  });
  if (error) throw error;
  return data;
}

/**
 * Log out.
 */
export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  user.set(null);
  session.set(null);
  sessionStorage.removeItem('qubix_guest');
}

/**
 * Sign in with Google (OAuth).
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/?auth=oauth` }
  });
  if (error) throw error;
  return data;
}

/**
 * Sign in with phone (send OTP).
 */
export async function signInWithPhone(phone, shouldCreateUser = false) {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone,
    options: { shouldCreateUser }
  });
  if (error) throw error;
  return data;
}

/**
 * Verify phone OTP.
 */
export async function verifyPhoneOtp(phone, token) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms'
  });
  if (error) throw error;
  return data;
}

/** Send an email recovery link. The link returns to the password form in-app. */
export async function requestPasswordReset(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase(),
    { redirectTo: `${window.location.origin}/?auth=reset` }
  );
  if (error) throw error;
  return data;
}

/** Set a new password after Supabase has established a recovery session. */
export async function updatePassword(password) {
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
  return data;
}

/** Resend the email-confirmation link without creating another account. */
export async function resendConfirmation(email) {
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email: email.trim().toLowerCase(),
    options: { emailRedirectTo: `${window.location.origin}/?auth=confirmed` }
  });
  if (error) throw error;
  return data;
}
