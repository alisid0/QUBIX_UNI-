# Current Qubix Application Snapshot

## Purpose

`current-app/` is the consolidated snapshot of the latest Qubix application and
the creative work around it. It lives in this repository so the product,
planning documents, lessons, promotional material, and animation assets can be
checked out together on another machine.

The existing application at the repository root has deliberately not been
overwritten. It remains the governed pilot described by the curriculum and
review documents. Consolidation therefore does not change what production
serves and does not constitute a deployment.

## Snapshot source

- Source repository: `alisid0/strata`
- Source commit: `2bf2aa8` (`Add QUBIX Shorts mascot animation studio`)
- Destination: `current-app/`

The snapshot contains only tracked source material. The tracked
`.env.production` file was explicitly excluded. Dependencies, build outputs,
local browser sessions, logs, caches, and Vercel project state are also excluded.

## Notable locations

| Location | Contents |
|---|---|
| `current-app/src/` | Latest web application source |
| `current-app/public/` | Learner-facing images, frames, and media |
| `current-app/shorts/functions/` | Functions Short, Aron assets, mascot studio, and Three.js animations |
| `current-app/promo-video/` | Advert source and exports |
| `current-app/docs/` | Product and technical documentation from the current app |
| `current-app/content-drafts/` | Draft learning content |
| `current-app/authoring-tools/` | Content creation tooling |
| `current-app/tests/` | Automated tests |

## Running the current app

From `current-app/`:

```bash
npm install
npm run dev
```

Use a local environment file based on the included examples. Never commit live
credentials.
