# Current Qubix Application

## Purpose

`current-app/` contains the latest Qubix application and its creative work. The
product, planning documents, lessons, promotional material, tests, and animation
assets all live in this repository and can be checked out together on another
machine.

The governed pilot at the repository root remains available alongside the
current application. Keeping both here does not change what production serves
and does not constitute a deployment.

## Self-contained project boundary

The Qubix University repository is the canonical project. It has no Git
submodules, linked source directories, or runtime imports from another checkout.
All application code and authored assets are tracked here. Package dependencies
are declared in lockfiles and installed from their public registries.

Secrets, local environment files, generated dependencies, caches, and Vercel
link state are intentionally excluded. Production and staging integrations need
their own environment configuration. A credential-free standalone mode is
included for local development and builds using the bundled lesson fallbacks.

## Notable locations

| Location | Contents |
|---|---|
| `current-app/src/` | Latest web application source |
| `current-app/public/` | Learner-facing images, frames, and media |
| `current-app/shorts/functions/` | Functions Short, Aron assets, mascot studio, and Three.js animations |
| `current-app/promo-video/` | Advert source and exports |
| `current-app/docs/` | Product and technical documentation |
| `current-app/content-drafts/` | Draft learning content |
| `current-app/authoring-tools/` | Content creation tooling |
| `current-app/tests/` | Automated tests |

## Fresh-clone quick start

From the repository root:

```bash
npm ci
npm run app:install
npm run app:dev
```

The last command starts the latest app in standalone mode. It uses bundled
lessons and does not require Supabase credentials. Authentication, cloud
progress, dynamic content updates, and deployment require the environment files
described in `current-app/docs/ENVIRONMENTS.md`.

Build the standalone app from the root with:

```bash
npm run app:build
```

Never commit live credentials.
