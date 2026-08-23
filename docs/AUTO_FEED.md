# CDA Tonight Autonomous Feed

## Goal

Keep CDA Tonight current without turning unverified web discovery into production event facts.

## Update loop

The GitHub Actions workflow `.github/workflows/feed-sync.yml` runs four times daily in `America/Los_Angeles` and can also be triggered manually.

1. Fetch configured source seeds.
2. Parse schema.org / JSON-LD `Event` records from source and event-detail pages.
3. Normalize events into the CDA Tonight event contract.
4. Preserve prior generated records if a source cannot be parsed safely during a run.
5. Write changed trusted-source events to `data/auto-events.json`.
6. Discover organizer, venue, performer and explicit official-site links.
7. Write unknown domains to `data/source-candidates.json` with evidence and a confidence score.
8. Run TypeScript validation.
9. Commit only when event inventory or discovery evidence actually changes.
10. Push to `main`, allowing the existing GitHub → Vercel integration to deploy the new feed.

## Source classes

### Trusted / publish

A source in `data/source-seeds.json` with `publish: true` may contribute structured events directly to `auto-events.json`.

A published automated event still requires:

- a parseable event title
- a parseable start time
- a date within the configured horizon
- a source already approved in `data/sources.ts`
- local relevance to the Coeur d'Alene area

Curated/manual records always win when an automated record overlaps one.

### Discovery only

A seed with `publish: false` may be crawled for source discovery but cannot place events into the public feed.

This is the default posture for aggregators and broad calendars.

## New-source discovery

The crawler looks for structured organizer, venue and performer URLs plus explicitly labeled official-site links.

Unknown domains are stored as candidates with unique evidence records. Evidence weights currently are:

- Organizer URL: +6
- Venue URL: +6
- Explicit official-site link: +4
- Performer URL: +3

At 10 points a candidate becomes `review-ready`. It is still **not automatically trusted**.

Promotion requires adding the source to both:

- `data/sources.ts`
- `data/source-seeds.json` with `publish: true`

This keeps discovery automatic while source authority remains governed.

## Failure behavior

A temporary HTTP error, blocked page, malformed JSON-LD or parser failure does not erase the last generated inventory for that source. The public app's normal stale-event logic still removes events once their time passes.

## Cost / infrastructure

The updater uses Node built-ins and GitHub Actions. It requires no paid scraping API or search API and no Vercel cron job.
