"use client";

import { useEffect, useMemo, useState } from "react";
import { events, EventCategory, LocalEvent } from "@/data/events";
import { trackEvent } from "@/lib/analytics";

type Filter = "all" | "free" | EventCategory | "food-drink" | "outdoors";

const filters: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "Best bets" },
  { id: "free", label: "Free" },
  { id: "live-music", label: "Live music" },
  { id: "family", label: "Family" },
  { id: "date-night", label: "Date night" },
  { id: "food-drink", label: "Food + drink" },
  { id: "outdoors", label: "Outdoors" }
];

const TZ = "America/Los_Angeles";

function dayKey(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

function timeLabel(iso: string) {
  return new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

function dateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "long", month: "long", day: "numeric" }).format(date);
}

function relativeGroup(event: LocalEvent, now: Date) {
  const deltaMinutes = (new Date(event.startsAt).getTime() - now.getTime()) / 60000;
  if (deltaMinutes <= 0 && deltaMinutes >= -180) return "happening";
  if (deltaMinutes > 0 && deltaMinutes <= 120) return "soon";
  if (deltaMinutes > 120) return "later";
  return "stale";
}

function passesFilter(event: LocalEvent, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "free") return event.cost === "free";
  return event.category.includes(filter as EventCategory);
}

function EventCard({ event, now }: { event: LocalEvent; now: Date }) {
  const group = relativeGroup(event, now);
  return (
    <article className={`event-card ${event.status === "sold-out" ? "sold-out" : ""}`}>
      <div className="event-time">
        <strong>{timeLabel(event.startsAt)}</strong>
        <span>{group === "happening" ? "Happening now" : group === "soon" ? "Starting soon" : "Tonight"}</span>
      </div>
      <div className="event-body">
        <div className="event-topline">
          <p className="category-line">{event.category.map((category) => category.replace("-", " ")).join(" · ")}</p>
          {event.status === "sold-out" && <span className="sold-out-pill">SOLD OUT</span>}
        </div>
        <h3>{event.title}</h3>
        <p className="venue">{event.venue}</p>
        {event.note && <p className="event-note">{event.note}</p>}
        <div className="event-actions">
          <a href={event.sourceUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("official_source_click", { event_id: event.id, source: event.sourceLabel })}>Official source ↗</a>
          <a href={event.directionsUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("directions_click", { event_id: event.id })}>Directions ↗</a>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [now, setNow] = useState(() => new Date());
  const [filter, setFilter] = useState<Filter>("all");
  const [showPlan, setShowPlan] = useState(false);

  useEffect(() => {
    trackEvent("journey_start", { surface: "tonight" });
    const id = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(id);
  }, []);

  const today = dayKey(now);
  const tonightEvents = useMemo(() => {
    return events
      .filter((event) => dayKey(new Date(event.startsAt)) === today)
      .filter((event) => relativeGroup(event, now) !== "stale")
      .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
  }, [today, now]);

  const visible = tonightEvents.filter((event) => passesFilter(event, filter));
  const happening = visible.filter((event) => relativeGroup(event, now) === "happening");
  const soon = visible.filter((event) => relativeGroup(event, now) === "soon");
  const later = visible.filter((event) => relativeGroup(event, now) === "later");
  const nextVerified = events.find((event) => new Date(event.startsAt).getTime() > now.getTime());
  const plan = visible.filter((event) => event.status !== "sold-out").slice(0, 3);

  const selectFilter = (next: Filter) => {
    setFilter(next);
    trackEvent("filter_select", { filter: next });
  };

  const createPlan = () => {
    setShowPlan(true);
    trackEvent("night_plan_create", { event_count: plan.length, filter });
  };

  const sharePlan = async () => {
    const summary = plan.length
      ? `My CDA Tonight plan: ${plan.map((event) => `${timeLabel(event.startsAt)} ${event.title}`).join(" → ")}`
      : "See what's happening tonight in Coeur d'Alene.";
    trackEvent("share_event", { share_type: "night_plan", event_count: plan.length });
    if (navigator.share) {
      try {
        await navigator.share({ title: "CDA Tonight", text: summary, url: window.location.origin });
        return;
      } catch {
        return;
      }
    }
    await navigator.clipboard.writeText(`${summary} ${window.location.origin}`);
    alert("CDA Tonight link copied.");
  };

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand-lockup"><div className="brand-mark">CT</div><div><strong>CDA Tonight</strong><span>Source-first local plans</span></div></div>
        <span className="date-chip">{dateLabel(now)}</span>
      </header>

      <section className="hero">
        <p className="eyebrow">AEROVISTA LOCAL · COEUR D&apos;ALENE</p>
        <h1>What&apos;s actually worth doing tonight?</h1>
        <p className="lede">A fast list of verified local options without digging through venue pages and social feeds. Every listing points back to its source.</p>
      </section>

      <nav className="filter-strip" aria-label="Event filters">
        {filters.map((item) => <button key={item.id} className={filter === item.id ? "active" : ""} onClick={() => selectFilter(item.id)}>{item.label}</button>)}
      </nav>

      {visible.length ? (
        <>
          <section className="best-bets">
            <div className="section-heading"><div><p className="eyebrow">TONIGHT&apos;S BEST BETS</p><h2>{visible.length} verified option{visible.length === 1 ? "" : "s"}</h2></div><button className="plan-button" onClick={createPlan}>Build My Night</button></div>
          </section>

          {happening.length > 0 && <section className="event-section"><div className="section-label"><span className="live-dot" />Happening now</div><div className="event-list">{happening.map((event) => <EventCard key={event.id} event={event} now={now} />)}</div></section>}
          {soon.length > 0 && <section className="event-section"><div className="section-label">Starting soon</div><div className="event-list">{soon.map((event) => <EventCard key={event.id} event={event} now={now} />)}</div></section>}
          {later.length > 0 && <section className="event-section"><div className="section-label">Later tonight</div><div className="event-list">{later.map((event) => <EventCard key={event.id} event={event} now={now} />)}</div></section>}
        </>
      ) : (
        <section className="empty-card">
          <p className="eyebrow">CURATED FEED</p>
          <h2>No verified match in this filter right now.</h2>
          <p>We&apos;d rather show a thin list than make up or surface stale events. More venue and community calendars are being connected.</p>
          {nextVerified && <div className="next-up"><span>Next verified listing</span><strong>{new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short", month: "short", day: "numeric" }).format(new Date(nextVerified.startsAt))} · {timeLabel(nextVerified.startsAt)}</strong><p>{nextVerified.title}</p></div>}
          {filter !== "all" && <button className="plan-button" onClick={() => selectFilter("all")}>Show all verified</button>}
        </section>
      )}

      {showPlan && (
        <section className="plan-card" id="my-night">
          <div className="section-heading"><div><p className="eyebrow">MY NIGHT</p><h2>{plan.length ? "Simple. Verified. In order." : "Nothing to plan yet."}</h2></div><button className="close-button" onClick={() => setShowPlan(false)}>Close</button></div>
          {plan.length > 0 ? <div className="plan-list">{plan.map((event, index) => <div className="plan-stop" key={event.id}><span>{index + 1}</span><div><strong>{timeLabel(event.startsAt)} · {event.title}</strong><small>{event.venue}</small></div></div>)}</div> : <p className="muted">The current filter has no available verified events to build from.</p>}
          <button className="primary-button" disabled={!plan.length} onClick={sharePlan}>Share My Night</button>
        </section>
      )}

      <section className="source-card">
        <div><p className="eyebrow">FEED STATUS</p><h2>Curated first. Broader next.</h2></div>
        <p>The initial inventory is anchored by official North Idaho State Fair listings. City, venue, arts and community calendars are the next ingestion layer. Events are hidden after they become stale, and sold-out state is only shown when the source says so.</p>
        <a href="https://www.nisfair.fun/events" target="_blank" rel="noreferrer" onClick={() => trackEvent("official_source_click", { source: "north_idaho_state_fair", placement: "feed_status" })}>Current primary source ↗</a>
      </section>

      <footer>CDA Tonight · An AeroVista Local utility · Coeur d&apos;Alene, Idaho</footer>
    </main>
  );
}
