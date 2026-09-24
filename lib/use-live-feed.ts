"use client";

import { useEffect, useMemo, useState } from "react";
import {
  automatedEventCount as fallbackAutomatedEventCount,
  events as fallbackEvents,
  mergeGeneratedEvents,
  type LocalEvent
} from "@/data/feed";
import { nightlifeEvents } from "@/data/nightlife";

type LiveFeedPayload = {
  generatedAt: string | null;
  events: LocalEvent[];
};

export function useLiveEventFeed() {
  const [generatedEvents, setGeneratedEvents] = useState<LocalEvent[] | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let active = true;

    const refresh = async () => {
      try {
        const response = await fetch("/api/feed", { cache: "no-store" });
        if (!response.ok) throw new Error(`feed request failed: ${response.status}`);
        const payload = (await response.json()) as LiveFeedPayload;
        if (!Array.isArray(payload.events)) throw new Error("feed payload is missing events");
        if (!active) return;
        setGeneratedEvents(payload.events);
        setIsLive(true);
      } catch (error) {
        console.warn("Using bundled CDA Tonight feed fallback", error);
        if (active) setIsLive(false);
      }
    };

    void refresh();
    const interval = window.setInterval(refresh, 5 * 60 * 1000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const events = useMemo(
    () => (generatedEvents ? mergeGeneratedEvents(generatedEvents) : fallbackEvents),
    [generatedEvents]
  );

  const eventCatalog = useMemo(
    () =>
      [...events, ...nightlifeEvents].sort(
        (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
      ),
    [events]
  );

  return {
    events,
    eventCatalog,
    automatedEventCount: generatedEvents?.length ?? fallbackAutomatedEventCount,
    isLive
  };
}
