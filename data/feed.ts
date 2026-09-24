import generatedFeed from "@/data/auto-events.json";
import { events as curatedEvents } from "./events";
import { phase3Events } from "./phase3-events";
import { tonightAug28Events } from "./tonight-2026-08-28";
import { tonightAug31DeepEvents } from "./tonight-2026-08-31-deep";
import { weekendAug29Aug30Events } from "./weekend-2026-08-29-30";
import { weekAug31Sep4Events } from "./week-2026-08-31-09-04";
import { weekAug31Sep4DeepEvents } from "./week-2026-08-31-09-04-deep";
import { weekAug31Sep4ThirdPassEvents } from "./week-2026-08-31-09-04-third-pass";
import { weekAug31Sep4SportsEvents } from "./week-2026-08-31-09-04-sports";
import { weekAug31Sep4RecurringEvents } from "./week-2026-08-31-09-04-recurring";
import { fortnightSep10Sep24Events } from "./fortnight-2026-09-10-09-24";
import { featuredFortnightEvents } from "./featured-overrides";
import type { EventCategory, LocalEvent } from "./events";

export type { EventCategory, EventStatus, LocalEvent } from "./events";

function eventKey(event: LocalEvent) {
  const normalizedStart = new Date(event.startsAt).toISOString();
  return [event.title.trim().toLowerCase(), normalizedStart].join("|");
}

const curatedFeedEvents: LocalEvent[] = [
  ...curatedEvents,
  ...tonightAug28Events,
  ...tonightAug31DeepEvents,
  ...weekendAug29Aug30Events,
  ...weekAug31Sep4Events,
  ...weekAug31Sep4DeepEvents,
  ...weekAug31Sep4ThirdPassEvents,
  ...weekAug31Sep4SportsEvents,
  ...weekAug31Sep4RecurringEvents,
  ...fortnightSep10Sep24Events,
  ...featuredFortnightEvents,
  ...phase3Events.filter((event) => event.id !== "museum-cemetery-walking-tour-aug28")
];

export function mergeGeneratedEvents(generatedEvents: LocalEvent[]) {
  const merged = new Map<string, LocalEvent>();

  for (const event of curatedFeedEvents) {
    merged.set(eventKey(event), event);
  }
  for (const event of generatedEvents) {
    const key = eventKey(event);
    if (!merged.has(key)) merged.set(key, event);
  }

  return [...merged.values()].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
  );
}

const bundledGeneratedEvents = generatedFeed.events as unknown as LocalEvent[];

// Bundled data is a safe fallback. The client refreshes generated events through
// /api/feed, so routine feed-sync commits no longer require a Vercel deployment.
export const events: LocalEvent[] = mergeGeneratedEvents(bundledGeneratedEvents);
export const automatedEventCount = bundledGeneratedEvents.length;
