"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { eventCatalog, eventEnd } from "@/lib/catalog";
import type { EventCategory, LocalEvent } from "@/data/events";
import { trackEvent } from "@/lib/analytics";

const TZ = "America/Los_Angeles";
type WeekendFilter = "all" | "free" | "live-music" | "family" | "date-night" | "food-drink" | "outdoors" | "nightlife";

const filters: Array<{ id: WeekendFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "free", label: "Free" },
  { id: "live-music", label: "Live music" },
  { id: "family", label: "Family" },
  { id: "date-night", label: "Date night" },
  { id: "food-drink", label: "Food + drink" },
  { id: "outdoors", label: "Outdoors" },
  { id: "nightlife", label: "Nightlife" }
];

function dayKey(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

function addDays(key: string, days: number) {
  const [year, month, day] = key.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return date.toISOString().slice(0, 10);
}

function weekdayIndex(now: Date) {
  const label = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" }).format(now);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(label);
}

function weekendRange(now: Date) {
  const today = dayKey(now);
  const weekday = weekdayIndex(now);
  if (weekday === 5) return { start: today, end: addDays(today, 2), label: "This weekend" };
  if (weekday === 6) return { start: today, end: addDays(today, 1), label: "This weekend" };
  if (weekday === 0) return { start: today, end: today, label: "This weekend" };
  const daysUntilFriday = 5 - weekday;
  const start = addDays(today, daysUntilFriday);
  return { start, end: addDays(start, 2), label: "Next weekend" };
}

function localDateKey(iso: string) {
  return dayKey(new Date(iso));
}

function timeLabel(iso: string) {
  return new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

function dayLabel(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" }).format(new Date(Date.UTC(year, month - 1, day)));
}

function categoryLabel(category: EventCategory) {
  return category.replace("-", " ");
}

function matches(event: LocalEvent, filter: WeekendFilter) {
  if (filter === "all") return true;
  if (filter === "free") return event.cost === "free";
  return event.category.includes(filter);
}

export default function WeekendClient() {
  const [filter, setFilter] = useState<WeekendFilter>("all");
  const now = new Date();
  const range = weekendRange(now);
  const today = dayKey(now);

  const weekendEvents = useMemo(() => {
    return eventCatalog
      .filter((event) => {
        const key = localDateKey(event.startsAt);
        if (key < range.start || key > range.end) return false;
        if (key === today && eventEnd(event).getTime() <= now.getTime()) return false;
        return matches(event, filter);
      })
      .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
  }, [filter, range.start, range.end, today]);

  const days = useMemo(() => {
    const map = new Map<string, LocalEvent[]>();
    for (const event of weekendEvents) {
      const key = localDateKey(event.startsAt);
      map.set(key, [...(map.get(key) || []), event]);
    }
    return [...map.entries()];
  }, [weekendEvents]);

  const chooseFilter = (next: WeekendFilter) => {
    setFilter(next);
    trackEvent("weekend_filter_select", { filter: next });
  };

  const openLateEats = () => {
    trackEvent("late_eats_nav_click", { placement: "weekend_handoff" });
    window.dispatchEvent(new Event("cda:late-eats-open"));
  };

  return (
    <>
      <section className="phase3-hero">
        <p className="phase3-kicker">KEEP GOING · WEEKEND MODE</p>
        <h1>{range.label},<br />already sorted.</h1>
        <p>Tonight stays the default. Weekend mode carries the same verified, source-attached approach through Friday, Saturday and Sunday so planning does not reset at midnight.</p>
        <div className="weekend-meta">
          <span><strong>{weekendEvents.length}</strong> verified matches</span>
          <span>{dayLabel(range.start)} → {dayLabel(range.end)}</span>
          <span>Auto-refresh active</span>
        </div>
      </section>

      <nav className="weekend-filter" aria-label="Weekend filters">
        {filters.map((item) => (
          <button key={item.id} className={filter === item.id ? "active" : ""} onClick={() => chooseFilter(item.id)}>{item.label}</button>
        ))}
      </nav>

      {days.length ? (
        <div className="weekend-days">
          {days.map(([key, events]) => (
            <section className="weekend-day" key={key}>
              <div className="weekend-day-head"><h2>{dayLabel(key)}</h2><span>{events.length} verified</span></div>
              <div className="weekend-grid">
                {events.map((event) => (
                  <Link className="weekend-event" href={`/event/${event.id}`} key={event.id} onClick={() => trackEvent("event_deep_link_open", { event_id: event.id, placement: "weekend" })}>
                    <div className="weekend-event-time"><strong>{timeLabel(event.startsAt)}</strong><span>{event.cost === "free" ? "Free" : event.status === "sold-out" ? "Sold out" : "Verified"}</span></div>
                    <div className="weekend-event-body"><small>{event.category.slice(0, 3).map(categoryLabel).join(" · ")}</small><h3>{event.title}</h3><p>{event.venue}</p></div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="weekend-empty">No source-backed matches in this filter yet. The updater will keep checking durable sources; empty is better than invented.</div>
      )}

      <section className="weekend-after-dark">
        <div>
          <p className="phase3-kicker">KEEP GOING</p>
          <h2>Plans first. Food after.</h2>
          <p>Weekend mode handles what to do. Late Night Eats picks up when the kitchens start closing and everyone asks the next question.</p>
        </div>
        <button type="button" onClick={openLateEats}>Open Late Night Eats</button>
      </section>
    </>
  );
}
