# CDA Tonight — Build Status

Updated: 2026-08-21

## Status

**ACTIVE BUILD · MVP SLICE 1 IN SOURCE**

## Working now

- Next.js 16 / React 19 / TypeScript foundation
- AeroVista Local branding and analytics foundation
- Coeur d'Alene local-time/date handling
- Source-first event schema
- Verification timestamp per event
- Automatic same-day filtering
- Automatic stale-event suppression
- Happening now / Starting soon / Later tonight grouping
- Filters for Best Bets / Free / Live Music / Family / Date Night / Food + Drink / Outdoors
- Official-source links and directions
- Sold-out state only when the official source currently says so
- Basic Build My Night planner
- Share flow
- 1200×630 OpenGraph image
- Production-domain + separate-Umami environment contract

## Initial source inventory

The seed feed contains verified North Idaho State Fair / Findlay Arena listings through Aug. 30, 2026. This gives the app real data during development without pretending the feed is comprehensive.

## Intentionally incomplete

- Broader downtown / city events
- Venue calendar adapters
- Local live-music inventory outside the Fair
- Food + drink event inventory
- Outdoor evening events
- Explicit event end times for robust “happening now” state
- Event detail routes / deep links
- Weekend mode
- Submit-an-event moderation flow
- Dedicated Umami website ID
- Vercel project / custom domain connection

## Next slice

**Source expansion + ranking**

1. Define a durable source registry.
2. Add city/community calendar source.
3. Add several high-value venue / live-music sources.
4. Add explicit event end times where authoritative sources provide them.
5. Add ranking that favors proximity, freshness, availability and variety without hiding the source logic.
6. Add richer empty-state / next-up behavior when a night is genuinely thin.

## Launch blockers

- Normal Friday/Saturday needs enough verified inventory to be useful.
- Must create separate Umami site ID.
- Must deploy to Vercel and connect `tonight.aerovista.us`.
- Must pass stale-event QA and Meta Sharing Debugger.

## Product integrity rule

Thin-but-verified beats full-but-wrong. CDA Tonight must never fabricate start time, price, availability, sold-out state, or event existence.
