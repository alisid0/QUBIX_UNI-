# Qubix learning updates

Status: first public communications surface. This work does not approve or
release curriculum.

Public route: `https://qubix.university/updates`

## What is live without another provider

- a summary built from the learner's completed live Read/Play steps;
- the next real Qubix learning step and its absolute public URL;
- copy-to-clipboard;
- user-initiated WhatsApp sharing through WhatsApp's standard share URL;
- user-initiated email sharing through the learner's mail application;
- a permission-based app/browser test notification; and
- a notification click that returns to the intended Qubix step.

These actions do not collect an email address or telephone number. Nothing is
sent automatically. Progress remains governed by the existing learning stores;
this view only reads it.

## What is deliberately not claimed as live

The cadence and preferred time controls save a local preference. They do not
schedule background delivery. The screen labels this state `Prepared, not yet
sending`.

Qubix-initiated WhatsApp reminders require a verified WhatsApp Business sender,
explicit learner opt-in, a messaging provider, a validated inbound webhook,
template approval for provider-initiated messages where required, abuse limits,
delivery-status handling and an unsubscribe path.

Scheduled push requires a push provider, server-held credentials, a subscription
store, expiry/revocation handling, delivery scheduling and a settings/deletion
path. No credentials belong in a `VITE_*` variable or client bundle.

## Verification

`scripts/check-learning-updates.mjs` guards the summary, destination URL,
user-controlled sharing, honest connection state, permission request and
service-worker notification destination. It runs in `prebuild`.

Test the public route on a second browser or device. A different unsigned-in
device begins with its own local progress. Signed-in cross-device progress is a
separate existing capability and must be verified independently.

