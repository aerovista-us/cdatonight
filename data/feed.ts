import generatedFeed from "@/data/auto-events.json";
import { events as curatedEvents } from "./events";
import type { EventCategory, LocalEvent } from "./events";

export type { EventCategory, EventStatus, LocalEvent } from "./events";

function eventKey(event: LocalEvent) {
  return [event.title.trim().toLowerCase(), event.startsAt, event.venue.trim().toLowerCase()].join("|");
}

const generatedEvents = generatedFeed.events as unknown as LocalEvent[];
const merged = new Map<string, LocalEvent>();

// Curated records always win when an automated record overlaps one.
for (const event of curatedEvents) merged.set(eventKey(event), event);
for (const event of generatedEvents) {
  const key = eventKey(event);
  if (!merged.has(key)) merged.set(key, event);
}

export const events: LocalEvent[] = [...merged.values()].sort(
  (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
);

export const automatedEventCount = generatedEvents.length;
