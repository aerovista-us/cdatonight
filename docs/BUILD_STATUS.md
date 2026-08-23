# CDA Tonight — Build Status

Updated: 2026-08-22

## Status

**ACTIVE BUILD · PHASE 3 CONTINUITY + SHAREABILITY COMPLETE IN SOURCE**

## Working now

- Next.js 16 / React 19 / TypeScript foundation
- AeroVista Local branding and Umami analytics foundation
- Coeur d'Alene local-time/date handling
- Source-first event schema and durable source registry
- Verification timestamp per event
- Automatic same-day filtering and stale-event suppression
- Explicit end-time support for robust `Happening now`
- Happening now / Starting soon / Later tonight grouping
- Best Bets + category filters, including final `All` filter
- Explainable source/freshness/timing/availability/variety ranking
- Duplicate-source and duplicate-venue penalties in ranked Best Bets
- Official-source links and directions
- Conflict-aware Build My Night planner + sharing
- Nightlife Radar for late venues without inventing events
- Late Night Eats utility with checked hours/source links
- Autonomous source refresh 4x daily through GitHub Actions
- Automatic new-source discovery with governed promotion
- Real CDA hero artwork displayed without crop/zoom
- Correct production canonical: `https://cdatonight.aerovista.us`

## Phase 3 — continuity + shareability

### 1. Weekend mode

`/weekend` keeps Tonight as the default product while adding a Friday–Sunday continuity view. On Friday/Saturday/Sunday it shows the remainder of the current weekend; earlier in the week it points to the upcoming weekend. Past events from the current day are suppressed.

Weekend mode keeps the same source-first filters and links every listing to its event detail route.

### 2. Per-event deep links + stronger sharing

Every catalog event now has a stable `/event/[id]` route with:

- event-specific title and social metadata
- date/time, venue, price/status language and categories
- source classification and last verification time
- official/source link and directions
- native Web Share when available, clipboard fallback otherwise

Social previews use the new real-CDA night artwork rather than the older poster-style preview.

### 3. Moderated submit-an-event intake

`/submit` adds a structured event-intake form. A source URL is mandatory. Submissions open a prefilled review email or can be copied manually.

**No submission auto-publishes.** The same product-integrity rule still applies: event existence, timing, price and availability must be verified before a listing enters the feed.

### 4. Safe automated refresh/check paths

The existing autonomous feed is now part of the Phase 3 user-facing continuity model:

- four checks per day
- trusted sources may publish only structured, parseable events
- unknown domains remain candidates
- candidates require human promotion before becoming trusted
- temporary source failures preserve prior generated records rather than erasing the feed
- Weekend mode exposes lightweight feed-health counts so source discovery is visible without turning the app into an admin dashboard

### 5. Broader non-Fair continuity

Phase 3 adds/promotes:

- **KOEP Concerts** as an official organizer source
- KOEP Music at McEuen · Gigawatt — Aug. 26
- Cemetery Walking Tours · Final Evening Tour — Aug. 28
- National Jimmy Buffett Day Cruise — two distinct Aug. 29 sailings
- KOEP City Park · Soul Proprietor season finale — Aug. 30

Existing Marina Market Friday/Saturday DJ/live-music coverage remains in the feed and continues through the autonomous source lane.

## Trusted source network

Durable lanes include:

1. North Idaho State Fair / Findlay Arena
2. Shared Harvest Community Garden
3. Lutherhaven Ministries
4. Lake Coeur d'Alene Cruises
5. Marina Market & Food Hall
6. Visit Coeur d'Alene
7. CDA Flea
8. Coeur d'Alene Downtown Association
9. KOEP Concerts
10. Bandsintown (discovery/cross-check only)

Additional discovery-only seeds include North Idaho College Events. New unknown domains are scored and queued rather than auto-trusted.

## Still incomplete / future candidates

- deeper year-round independent live-music coverage
- more restaurant/food-event sources beyond Marina Market
- direct server-side event submission queue (current Phase 3 intake is moderated email handoff)
- richer per-event image assets when an authoritative organizer image is available
- source alias normalization inside the crawler (manual known-domain cleanup currently handles discovered aliases)
- dedicated Umami website ID if production does not already have one

## Release checks

- TypeScript / production build must pass.
- Vercel preview must be green before merge.
- Confirm `/weekend`, `/submit` and at least one `/event/[id]` route render.
- Confirm custom domain still resolves after merge.
- Confirm `cdanight2.png` renders in social metadata on production.
- Confirm Umami domain allowlist uses `cdatonight.aerovista.us`.
- Confirm autonomous feed dry-run still passes with KOEP promoted to trusted source.

## Product integrity rule

Thin-but-verified beats full-but-wrong. CDA Tonight must never fabricate start time, end time, price, availability, sold-out state, or event existence.
