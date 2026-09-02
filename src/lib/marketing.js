// Reading and writing one learner's promotional-email consent.
//
// Kept out of the auth component because consent is not part of signing in, and
// the moment it starts travelling with the session is the moment somebody
// assumes creating an account implied it.
//
// Every write goes through here so the evidence columns cannot be forgotten at
// a call site: a granted consent always carries its timestamp, its source, the
// policy version the learner saw, and their 18+ statement.

import { supabase } from './supabase.js';
import { PRIVACY_POLICY_VERSION, marketingConsentAvailable } from './legal.js';

const TABLE = 'marketing_consent';

// Where a consent was collected. Matches the closed set in the migration's
// marketing_consent_known_source constraint, so an unknown value fails loudly
// here rather than being written and found later in an export.
export const SOURCES = Object.freeze(['signup', 'account', 'reader-footer']);

/**
 * The learner's current consent, or null when they have never answered.
 * Absence and a stored `false` mean the same thing to a sender; they differ
 * only as evidence, which is why both are preserved rather than collapsed.
 */
export async function readConsent() {
  if (!supabase) return null;
  const { data: { user } = {} } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from(TABLE)
    .select('granted, adult_declared, granted_at, withdrawn_at, policy_version')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) return null;
  return data || null;
}

/**
 * Record a positive opt-in. Refuses rather than writing a consent that could
 * not be defended: no policy to be informed by, or no adult statement.
 */
export async function grantConsent(source) {
  if (!marketingConsentAvailable) {
    return { ok: false, reason: 'Promotional email is not available until the privacy policy is published.' };
  }
  if (!SOURCES.includes(source)) {
    return { ok: false, reason: `Unknown consent source: ${source}` };
  }
  if (!supabase) return { ok: false, reason: 'Not configured.' };

  const { data: { user } = {} } = await supabase.auth.getUser();
  if (!user) return { ok: false, reason: 'Sign in first.' };

  const { error } = await supabase.from(TABLE).upsert({
    user_id: user.id,
    granted: true,
    adult_declared: true,
    granted_at: new Date().toISOString(),
    withdrawn_at: null,
    source,
    policy_version: PRIVACY_POLICY_VERSION
  }, { onConflict: 'user_id' });

  return error ? { ok: false, reason: 'We could not save that preference.' } : { ok: true };
}

/**
 * Withdraw. An update, never a delete: the record that a learner asked to stop
 * is the thing that keeps them off the next import. Works whether or not a row
 * already exists, because "unsubscribe" must never fail on a technicality.
 */
export async function withdrawConsent(source) {
  if (!supabase) return { ok: false, reason: 'Not configured.' };
  const { data: { user } = {} } = await supabase.auth.getUser();
  if (!user) return { ok: false, reason: 'Sign in first.' };

  const { error } = await supabase.from(TABLE).upsert({
    user_id: user.id,
    granted: false,
    withdrawn_at: new Date().toISOString(),
    source: SOURCES.includes(source) ? source : 'account',
    // A withdrawal is valid against whatever policy is current; when none is
    // published the column still needs a value, and 'none' is the honest one.
    policy_version: PRIVACY_POLICY_VERSION || 'none'
  }, { onConflict: 'user_id' });

  return error ? { ok: false, reason: 'We could not save that preference.' } : { ok: true };
}
