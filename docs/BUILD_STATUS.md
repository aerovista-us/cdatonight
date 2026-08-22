# CDA Tonight — Build Status

Updated: 2026-08-22

## Status

**ACTIVE BUILD · PHASE 2 SOURCE EXPANSION + RANKING COMPLETE IN SOURCE**

## Working now

- Next.js 16 / React 19 / TypeScript foundation
- AeroVista Local branding and analytics foundation
- Coeur d'Alene local-time/date handling
- Source-first event schema
- Durable source registry with source classifications
- Verification timestamp per event
- Automatic same-day filtering
- Automatic stale-event suppression
- Explicit end-time support for robust `Happening now`
- Happening now / Starting soon / Later tonight grouping
- Filters for Best Bets / Free / Live Music / Family / Date Night / Food + Drink / Outdoors / Nightlife
- Explainable ranking using source confidence, freshness, timing, availability and variety
- Duplicate-source and duplicate-venue penalties in ranked Best Bets
- Official-source links and directions
- Sold-out state only when the official source currently says so
- Conflict-aware Build My Night planner
- Share flow
- Uploaded CDA Tonight logo and social preview artwork
- Correct production canonical: `https://cdatonight.aerovista.us`
- Separate-Umami environment contract

## Phase 2 source inventory

Durable lanes now include:

1. North Idaho State Fair / Findlay Arena
2. Shared Harvest Community Garden
3. Lutherhaven Ministries
4. Lake Coeur d'Alene Cruises
5. Marina Market & Food Hall
6. Visit Coeur d'Alene community calendar
7. CDA Flea

The August 22 feed now includes multiple organizer/venue/ticketing sources instead of a Fair-only inventory. The recurring Marina Market lane also extends normal Friday/Saturday coverage into the following weekend.

## Ranking behavior

Ranking is intentionally transparent rather than opaque personalization.

- Official organizer / venue / ticketing sources receive higher confidence weight.
- Recently verified records score higher.
- Happening-now and starting-soon events receive timing weight.
- Available events score above sold-out events.
- Repeated venues and repeated sources receive diversity penalties so one complex/calendar does not consume every Best Bet slot.
- Free events receive a small utility boost, not enough to override source quality.

## Still incomplete

- Broader year-round live-music inventory outside the current durable lanes
- More food + drink sources beyond the Marina complex
- More outdoor evening-event sources
- Weekend mode
- Per-event detail/deep-link routes
- Submit-an-event moderation flow
- Automated source adapters/checkers
- Dedicated Umami website ID if production does not already have one

## Next slice

**Phase 3 — continuity + shareability**

1. Add weekend mode without diluting Tonight-first behavior.
2. Add per-event deep links and stronger social sharing.
3. Add moderated submit-an-event intake.
4. Add safe automated refresh/check paths for durable sources.
5. Keep expanding normal non-Fair Friday/Saturday coverage.

## Release checks

- TypeScript / production build must pass.
- Confirm custom domain still resolves after merge.
- Confirm uploaded social preview renders on the production domain.
- Confirm Umami domain allowlist uses `cdatonight.aerovista.us`.
- Re-check stale-event behavior after the Aug. 22 events end.

## Product integrity rule

Thin-but-verified beats full-but-wrong. CDA Tonight must never fabricate start time, end time, price, availability, sold-out state, or event existence.
