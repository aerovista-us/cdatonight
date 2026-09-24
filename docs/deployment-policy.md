# Deployment policy

CDA Tonight separates application deploys from routine feed refreshes.

The scheduled feed sync may update `data/auto-events.json` and `data/source-candidates.json` on `main` without requiring a new Vercel build. The deployed app reads the generated event feed through `/api/feed`, which refreshes the public GitHub feed on a short cache window and falls back to the bundled feed if the live fetch is unavailable.

Vercel uses `scripts/vercel-ignore-build.mjs` through `vercel.json`. Application code, runtime TypeScript/JavaScript data, public assets, package/config changes, and the guard itself still build. Generated JSON, documentation, and feed-automation-only changes are skipped.

The GitHub App smoke workflow uses the same runtime-oriented path boundary so generated JSON does not consume a full Next.js CI build.

The Vercel guard is fail-open: if it cannot establish a safe Git comparison baseline, it builds rather than risking a stale application.
