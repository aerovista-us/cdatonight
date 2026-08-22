# CDA Tonight

AeroVista Local utility for answering: **What is actually worth doing tonight in Coeur d'Alene?**

The product is intentionally source-first. It should prefer a smaller verified feed over a large stale or speculative one.

## Current build

The first MVP slice is in source:

- Next.js 16 + TypeScript
- Automatic Coeur d'Alene local-date handling
- Automatic stale-event suppression
- `Happening now` / `Starting soon` / `Later tonight` grouping
- Filters for Best Bets / Free / Live Music / Family / Date Night / Food + Drink / Outdoors
- Official-source and directions actions
- Sold-out state only when the authoritative source says so
- Basic `Build My Night` planner + share flow
- AeroVista Local attribution
- Separate Umami environment contract
- OpenGraph / Facebook share card
- Production domain target: `https://tonight.aerovista.us`

## Initial verified inventory

The seed feed currently uses official North Idaho State Fair / Findlay Arena event listings through August 30, 2026. This is deliberately only the first source lane.

Next source lanes:

1. Downtown / city and community calendars
2. Local live-music venue calendars
3. Arts organizations and theaters
4. Restaurant / brewery event calendars where the venue is authoritative
5. Carefully moderated direct AeroVista Local records

## Product rules

- Every event must have an authoritative source URL.
- Every event must have a verification timestamp.
- Stale events must disappear automatically.
- Never invent price, ticket inventory, availability, start time, or sold-out status.
- Thin-but-verified is better than full-but-wrong.

## Local development

```bash
npm install
npm run dev
```

## Production environment

```env
NEXT_PUBLIC_SITE_URL=https://tonight.aerovista.us
NEXT_PUBLIC_UMAMI_URL=https://stats.aerocoreos.com
NEXT_PUBLIC_UMAMI_WEBSITE_ID=<cda-tonight-specific-id>
NEXT_PUBLIC_UMAMI_DOMAINS=tonight.aerovista.us,.vercel.app
```

## Analytics baseline

- `journey_start`
- `filter_select`
- `official_source_click`
- `directions_click`
- `night_plan_create`
- `share_event`
- `brand_click`

## Next build slices

- Add 4–6 durable local source adapters / curation lanes.
- Add richer event detail and cost-state handling.
- Add weekend mode.
- Add per-event share URLs.
- Add `happening now` support for events with explicit end times.
- Add submit-an-event intake with moderation.

---

**AeroVista Local** · Useful local tools built in Coeur d'Alene.
