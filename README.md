# CDA Tonight

AeroVista Local utility for answering: **What is actually worth doing tonight in Coeur d'Alene?**

The product is intentionally source-first. It should prefer a smaller verified feed over a large stale or speculative one.

## Current build

**Phase 2 — source expansion + ranking**

- Next.js 16 + TypeScript
- Automatic Coeur d'Alene local-date handling
- Automatic stale-event suppression
- Explicit end-time support for robust `Happening now` state
- `Happening now` / `Starting soon` / `Later tonight` grouping
- Filters for Best Bets / Free / Live Music / Family / Date Night / Food + Drink / Outdoors / Nightlife
- Durable source registry with source-type transparency
- Ranking based on source quality, freshness, timing, availability and variety
- Duplicate-source / duplicate-venue penalties so one calendar cannot dominate Best Bets
- Official-source and directions actions
- Sold-out state only when the authoritative source says so
- Conflict-aware `Build My Night` planner + share flow
- AeroVista Local attribution
- Separate Umami environment contract
- Uploaded CDA Tonight logo + social preview artwork
- Production domain: `https://cdatonight.aerovista.us`

## Source registry

Phase 2 expands beyond the original Fair-only seed with durable lanes for:

1. North Idaho State Fair / Findlay Arena
2. Shared Harvest Community Garden
3. Lutherhaven Ministries
4. Lake Coeur d'Alene Cruises
5. Marina Market & Food Hall
6. Visit Coeur d'Alene community calendar
7. CDA Flea

Official organizers, official venues and official ticketing sources receive the strongest ranking confidence. Community calendars are useful discovery/cross-check lanes, not a license to invent missing details.

## Product rules

- Every event must have a named source and source URL.
- Every event must have a verification timestamp.
- Stale events must disappear automatically.
- Never invent price, ticket inventory, availability, start time, end time, or sold-out status.
- Prefer explicit end times when the source provides them.
- Thin-but-verified is better than full-but-wrong.
- Ranking must stay explainable to the user.

## Local development

```bash
npm install
npm run dev
```

## Production environment

```env
NEXT_PUBLIC_SITE_URL=https://cdatonight.aerovista.us
NEXT_PUBLIC_UMAMI_URL=https://stats.aerocoreos.com
NEXT_PUBLIC_UMAMI_WEBSITE_ID=<cda-tonight-specific-id>
NEXT_PUBLIC_UMAMI_DOMAINS=cdatonight.aerovista.us,.vercel.app
```

## Analytics baseline

- `journey_start`
- `filter_select`
- `best_bet_click`
- `official_source_click`
- `directions_click`
- `night_plan_create`
- `share_event`
- `brand_click`

## Next build slices

- Add weekend mode without weakening the Tonight-first UX.
- Add per-event deep-link/share routes.
- Add submit-an-event intake with moderation.
- Add automated adapters/checkers for durable source lanes where allowed.
- Add dedicated Umami website ID if production still lacks one.
- Continue expanding normal Friday/Saturday coverage outside seasonal Fair inventory.

---

**AeroVista Local** · Useful local tools built in Coeur d'Alene.
