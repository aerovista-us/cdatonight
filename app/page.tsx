"use client";

import { useEffect, useState } from "react";
import { automatedEventCount, events, EventCategory, LocalEvent } from "@/data/feed";
import { nightlifeEvents, nightlifeSpots } from "@/data/nightlife";
import { sourceFor, sourceKindLabel, sourceList } from "@/data/sources";
import { trackEvent } from "@/lib/analytics";
import { rankEvents, rankingReason } from "@/lib/ranking";

type Filter = "best" | "all" | "free" | EventCategory;

const filters: Array<{ id: Filter; label: string }> = [
  { id: "best", label: "Best bets" },
  { id: "free", label: "Free" },
  { id: "live-music", label: "Live music" },
  { id: "family", label: "Family" },
  { id: "date-night", label: "Date night" },
  { id: "food-drink", label: "Food + drink" },
  { id: "outdoors", label: "Outdoors" },
  { id: "nightlife", label: "Nightlife" },
  { id: "all", label: "All" }
];

const TZ = "America/Los_Angeles";
const allEvents = [...events, ...nightlifeEvents];

function dayKey(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

function timeLabel(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(iso));
}

function dateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "long",
    month: "long",
    day: "numeric"
  }).format(date);
}

function shortDateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(date);
}

function eventEnd(event: LocalEvent) {
  return event.endsAt
    ? new Date(event.endsAt)
    : new Date(new Date(event.startsAt).getTime() + 3 * 60 * 60 * 1000);
}

function relativeGroup(event: LocalEvent, now: Date) {
  const start = new Date(event.startsAt);
  const end = eventEnd(event);
  const deltaMinutes = (start.getTime() - now.getTime()) / 60000;

  if (start.getTime() <= now.getTime() && end.getTime() > now.getTime()) return "happening";
  if (deltaMinutes > 0 && deltaMinutes <= 120) return "soon";
  if (deltaMinutes > 120) return "later";
  return "stale";
}

function passesFilter(event: LocalEvent, filter: Filter) {
  if (filter === "best" || filter === "all") return true;
  if (filter === "free") return event.cost === "free";
  return event.category.includes(filter);
}

function categoryLabel(category: EventCategory) {
  return category.replace("-", " ");
}

function verificationLabel(event: LocalEvent, now: Date) {
  const hours = Math.max(0, (now.getTime() - new Date(event.verifiedAt).getTime()) / 3_600_000);
  if (hours < 1) return "Verified this hour";
  if (hours < 24) return "Verified today";
  if (hours < 48) return "Verified yesterday";
  return `Verified ${Math.floor(hours / 24)}d ago`;
}

function overlaps(a: LocalEvent, b: LocalEvent) {
  return new Date(a.startsAt).getTime() < eventEnd(b).getTime() && new Date(b.startsAt).getTime() < eventEnd(a).getTime();
}

function buildNonOverlappingPlan(candidates: LocalEvent[]) {
  const selected: LocalEvent[] = [];
  for (const event of candidates) {
    if (event.status === "sold-out") continue;
    if (selected.every((chosen) => !overlaps(event, chosen))) selected.push(event);
    if (selected.length === 3) break;
  }
  return selected.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
}

function EventCard({ event, now }: { event: LocalEvent; now: Date }) {
  const group = relativeGroup(event, now);
  const source = sourceFor(event.sourceId);

  return (
    <article className={`event-card ${event.status === "sold-out" ? "sold-out" : ""}`}>
      <div className="event-time">
        <strong>{timeLabel(event.startsAt)}</strong>
        {event.endsAt && <small>to {timeLabel(event.endsAt)}</small>}
        <span>{group === "happening" ? "Happening now" : group === "soon" ? "Starting soon" : "Tonight"}</span>
      </div>
      <div className="event-body">
        <div className="event-topline">
          <p className="category-line">{event.category.slice(0, 4).map(categoryLabel).join(" · ")}</p>
          {event.status === "sold-out" && <span className="sold-out-pill">SOLD OUT</span>}
        </div>
        <h3>{event.title}</h3>
        <p className="venue">{event.venue}</p>
        <div className="trust-row">
          <span>{sourceKindLabel(source.kind)}</span>
          <span>{verificationLabel(event, now)}</span>
          {event.cost !== "unknown" && <span>{event.cost === "free" ? "Free" : event.priceLabel || "Paid"}</span>}
        </div>
        {event.note && <p className="event-note">{event.note}</p>}
        <div className="event-actions">
          <a href={event.sourceUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("official_source_click", { event_id: event.id, source: event.sourceLabel })}>Verify at source ↗</a>
          <a href={event.directionsUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("directions_click", { event_id: event.id })}>Directions ↗</a>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [now, setNow] = useState<Date | null>(null);
  const [filter, setFilter] = useState<Filter>("best");
  const [showPlan, setShowPlan] = useState(false);

  useEffect(() => {
    const updateNow = () => setNow(new Date());
    updateNow();
    trackEvent("journey_start", { surface: "tonight", phase: "post_phase3_ux" });
    const id = window.setInterval(updateNow, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return (
      <main className="shell app-boot" aria-busy="true" aria-label="Loading CDA Tonight">
        <div className="app-boot-mark" aria-hidden="true" />
        <span>Loading tonight…</span>
      </main>
    );
  }

  const today = dayKey(now);
  const tonightEvents = allEvents
    .filter((event) => dayKey(new Date(event.startsAt)) === today)
    .filter((event) => relativeGroup(event, now) !== "stale");
  const tonightNightlife = nightlifeSpots.filter((spot) => spot.date === today);
  const ranked = rankEvents(tonightEvents.filter((event) => passesFilter(event, filter)), now);
  const visible = filter === "best" ? ranked.slice(0, 3) : ranked;

  const bestBets = visible.slice(0, 3);
  const happening = visible.filter((event) => relativeGroup(event, now) === "happening");
  const soon = visible.filter((event) => relativeGroup(event, now) === "soon");
  const later = visible.filter((event) => relativeGroup(event, now) === "later");
  const nextVerified = allEvents
    .filter((event) => new Date(event.startsAt).getTime() > now.getTime())
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())[0];
  const plan = buildNonOverlappingPlan(visible);
  const activeSourceIds = new Set(tonightEvents.map((event) => event.sourceId));
  const activeSources = sourceList.filter((source) => activeSourceIds.has(source.id));
  const newestVerification = tonightEvents.length
    ? new Date(Math.max(...tonightEvents.map((event) => new Date(event.verifiedAt).getTime())))
    : null;
  const activeFilterLabel = filters.find((item) => item.id === filter)?.label || "All";

  const selectFilter = (next: Filter) => {
    setFilter(next);
    trackEvent("filter_select", { filter: next });
  };

  const jumpToPicks = () => {
    selectFilter("best");
    document.getElementById("best-bets")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const revealNightlifeEvents = (placement: "hero" | "nightlife_radar") => {
    selectFilter("nightlife");
    trackEvent("nightlife_filter_reveal", { placement });
    window.setTimeout(() => {
      document.getElementById("event-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
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
        <a className="brand-lockup" href="#top" aria-label="CDA Tonight home">
          <img className="brand-logo" src="/cdatonight_logo.png" alt="CDA Tonight" />
          <div><strong>CDA Tonight</strong><span>by AeroVista Local</span></div>
        </a>
        <div className="topbar-status">
          <span className="sync-chip"><i />Auto-refresh active</span>
          <span className="date-chip">{dateLabel(now)}</span>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">AEROVISTA LOCAL · COEUR D&apos;ALENE</p>
          <h1>Tonight,<br /><span>handled.</span></h1>
          <p className="lede">Verified local events, nightlife and after-dark options without digging through venue pages and social feeds.</p>
          <div className="hero-actions">
            <button className="hero-primary" onClick={jumpToPicks}>See tonight&apos;s picks</button>
            <button className="hero-secondary" onClick={() => revealNightlifeEvents("hero")}>Find nightlife</button>
          </div>
          <div className="feed-pulse" aria-label="Live feed status">
            <span><strong>{tonightEvents.length}</strong> verified tonight</span>
            <span><strong>{activeSources.length}</strong> active sources</span>
            <span><strong>{automatedEventCount}</strong> auto-fed</span>
            <span>{newestVerification ? `Latest check ${timeLabel(newestVerification.toISOString())}` : "Feed checking"}</span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img className="hero-preview" src="/cdatonight_prevew.png" alt="" />
          <div className="hero-preview-shade" />
          <img className="hero-mark" src="/cdatonight_logo.png" alt="" />
          <div className="hero-visual-caption">
            <span>COEUR D&apos;ALENE · TONIGHT</span>
            <strong>Local plans with the source attached.</strong>
          </div>
        </div>
      </section>

      <div className="content-stage">
        <nav className="filter-strip" id="event-filters" aria-label="Event filters">
          {filters.map((item) => (
            <button key={item.id} className={filter === item.id ? "active" : ""} onClick={() => selectFilter(item.id)}>{item.label}</button>
          ))}
        </nav>

        <div id="event-results" className="event-results-anchor">
          {visible.length ? (
            <>
              <section className="best-bets" id="best-bets">
                <div className="section-heading" aria-live="polite">
                  <div>
                    <p className="eyebrow">{filter === "best" ? "TONIGHT'S BEST BETS" : `${activeFilterLabel.toUpperCase()} · TONIGHT`}</p>
                    <h2>{filter === "best" ? `${visible.length} top pick${visible.length === 1 ? "" : "s"}` : filter === "nightlife" ? `${visible.length} nightlife event${visible.length === 1 ? "" : "s"}` : `${visible.length} verified option${visible.length === 1 ? "" : "s"}`}</h2>
                  </div>
                  <button className="plan-button" onClick={createPlan}>Build My Night</button>
                </div>
                <div className="best-bet-grid">
                  {bestBets.map((event, index) => (
                    <a className="best-bet-card" key={event.id} href={`#event-${event.id}`} onClick={() => trackEvent("best_bet_click", { event_id: event.id, rank: index + 1 })}>
                      <div className="best-bet-topline"><span className="rank-number">0{index + 1}</span><span className="best-bet-category">{categoryLabel(event.category[0])}</span></div>
                      <span className="best-bet-clock">{timeLabel(event.startsAt)}</span>
                      <strong>{event.title}</strong>
                      <small>{event.venue}</small>
                      <em>{rankingReason(event, now)}</em>
                    </a>
                  ))}
                </div>
              </section>

              {happening.length > 0 && <section className="event-section"><div className="section-label"><span className="live-dot" />Happening now</div><div className="event-list">{happening.map((event) => <div id={`event-${event.id}`} key={event.id}><EventCard event={event} now={now} /></div>)}</div></section>}
              {soon.length > 0 && <section className="event-section"><div className="section-label">Starting soon</div><div className="event-list">{soon.map((event) => <div id={`event-${event.id}`} key={event.id}><EventCard event={event} now={now} /></div>)}</div></section>}
              {later.length > 0 && <section className="event-section"><div className="section-label">Later tonight</div><div className="event-list">{later.map((event) => <div id={`event-${event.id}`} key={event.id}><EventCard event={event} now={now} /></div>)}</div></section>}
            </>
          ) : (
            <section className="empty-card">
              <p className="eyebrow">{filter === "nightlife" ? "NIGHTLIFE · TONIGHT" : "CURATED FEED"}</p>
              <h2>No verified match in this filter right now.</h2>
              <p>We&apos;d rather show a thin list than make up or surface stale events. Try all verified picks, or use the next confirmed listing below.</p>
              {nextVerified && <div className="next-up"><span>Next verified listing</span><strong>{shortDateLabel(new Date(nextVerified.startsAt))} · {timeLabel(nextVerified.startsAt)}</strong><p>{nextVerified.title}</p></div>}
              {filter !== "all" && <button className="plan-button" onClick={() => selectFilter("all")}>Show all verified</button>}
            </section>
          )}
        </div>

        {showPlan && (
          <section className="plan-card" id="my-night">
            <div className="section-heading"><div><p className="eyebrow">MY NIGHT</p><h2>{plan.length ? "Top picks without time conflicts." : "Nothing to plan yet."}</h2></div><button className="close-button" onClick={() => setShowPlan(false)}>Close</button></div>
            {plan.length > 0 ? <div className="plan-list">{plan.map((event, index) => <div className="plan-stop" key={event.id}><span>{index + 1}</span><div><strong>{timeLabel(event.startsAt)} · {event.title}</strong><small>{event.venue}</small></div></div>)}</div> : <p className="muted">The current filter has no available verified events to build from.</p>}
            <button className="primary-button" disabled={!plan.length} onClick={sharePlan}>Share My Night</button>
          </section>
        )}

        {tonightNightlife.length > 0 && (
          <section className="nightlife-card">
            <div className="nightlife-heading">
              <div><p className="eyebrow">NIGHTLIFE RADAR · TONIGHT</p><h2>Where to go after the event list ends.</h2><p>These are venue options, not invented events. Hours and venue identity were checked for tonight; use the source link before heading out if plans are time-sensitive.</p></div>
              <button className="nightlife-filter-button" onClick={() => revealNightlifeEvents("nightlife_radar")}>{filter === "nightlife" ? "Nightlife events shown ↑" : "Show nightlife events ↑"}</button>
            </div>
            <div className="nightlife-grid">
              {tonightNightlife.map((spot) => (
                <article className="nightlife-spot" key={spot.id}>
                  <div className="nightlife-spot-topline"><strong>{spot.name}</strong><span>{spot.hoursLabel}</span></div>
                  <p>{spot.vibe}</p><small>{spot.bestFor}</small>
                  <div className="nightlife-actions">
                    <a href={spot.sourceUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("nightlife_source_click", { spot_id: spot.id, source: spot.sourceLabel })}>Check venue ↗</a>
                    <a href={spot.directionsUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("nightlife_directions_click", { spot_id: spot.id })}>Directions ↗</a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <footer><img src="/cdatonight_logo.png" alt="" aria-hidden="true" /><span>CDA Tonight · An AeroVista Local utility · Coeur d&apos;Alene, Idaho</span></footer>
    </main>
  );
}
