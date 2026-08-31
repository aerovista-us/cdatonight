import generatedFeed from "@/data/auto-events.json";
import { events as curatedEvents } from "./events";
import { phase3Events } from "./phase3-events";
import { tonightAug28Events } from "./tonight-2026-08-28";
import { weekendAug29Aug30Events } from "./weekend-2026-08-29-30";
import { weekAug31Sep4Events } from "./week-2026-08-31-09-04";
import { weekAug31Sep4DeepEvents } from "./week-2026-08-31-09-04-deep";
import type { EventCategory, LocalEvent } from "./events";

export type { EventCategory, EventStatus, LocalEvent } from "./events";

function eventKey(event: LocalEvent) {
  return [event.title.trim().toLowerCase(), event.startsAt].join("|");
}

const generatedEvents = generatedFeed.events as unknown as LocalEvent[];
const merged = new Map<string, LocalEvent>();
const supersededPhase3Ids = new Set(["museum-cemetery-walking-tour-aug28"]);
const activePhase3Events = phase3Events.filter((event) => !supersededPhase3Ids.has(event.id));

// Curated records always win when an automated record overlaps one. Automated
// calendars often omit or rename venue fields, so title + exact start time is
// the safer identity boundary than title + time + venue.
for (const event of [
  ...curatedEvents,
  ...tonightAug28Events,
  ...weekendAug29Aug30Events,
  ...weekAug31Sep4Events,
  ...weekAug31Sep4DeepEvents,
  ...activePhase3Events
]) {
  merged.set(eventKey(event), event);
}
for (const event of generatedEvents) {
  const key = eventKey(event);
  if (!merged.has(key)) merged.set(key, event);
}

export const events: LocalEvent[] = [...merged.values()].sort(
  (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
);

export const automatedEventCount = generatedEvents.length;
