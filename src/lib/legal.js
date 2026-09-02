// What the learner has actually been told, and therefore what may be asked of
// them.
//
// Consent under UK GDPR has to be informed. A checkbox offering promotional
// email, on a site with no published privacy policy, collects a tick and no
// consent: the learner has not been told who is processing their address, why,
// for how long, or how to stop it. So the offer is gated on the policy
// existing, and this file is the gate.
//
// To switch promotional email on:
//   1. publish the privacy policy at PRIVACY_POLICY_PATH
//   2. set PRIVACY_POLICY_VERSION to the date it was published
//   3. run `npm run check:auth`, which refuses the build if 2 happened without 1
//
// The version is stamped onto every consent record. When the policy changes in
// a way that affects what people agreed to, raise it, and the stored value then
// tells you whose consent predates the change.

export const PRIVACY_POLICY_PATH = '/privacy';
export const TERMS_PATH = '/terms';

// null until the policy is actually published. Set to an ISO date, e.g.
// '2026-09-15'.
export const PRIVACY_POLICY_VERSION = null;

// The single question the interface should ask before offering the opt-in.
export const marketingConsentAvailable = Boolean(PRIVACY_POLICY_VERSION);

// Founder decision, 2026-08-12: Qubix is for learners aged 13 and over.
// Extended 2026-09-03: promotional email is for adults only, so the opt-in
// carries its own 18+ statement. Both are declarations, not verification.
export const MINIMUM_AGE = 13;
export const MARKETING_MINIMUM_AGE = 18;
