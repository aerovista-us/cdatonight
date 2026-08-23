import { events } from "@/data/feed";
import { nightlifeEvents } from "@/data/nightlife";
import type { LocalEvent } from "@/data/events";

export const eventCatalog: LocalEvent[] = [...events, ...nightlifeEvents].sort(
  (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
);

export function eventById(id: string) {
  return eventCatalog.find((event) => event.id === id);
}

export function eventEnd(event: LocalEvent) {
  return event.endsAt
    ? new Date(event.endsAt)
    : new Date(new Date(event.startsAt).getTime() + 3 * 60 * 60 * 1000);
}
