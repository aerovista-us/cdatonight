"use client";

import { useEffect, useMemo, useState } from "react";
import { lateNightEats, LateNightDay } from "@/data/late-night-eats";
import { trackEvent } from "@/lib/analytics";

const TZ = "America/Los_Angeles";

function currentDay(): LateNightDay {
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" }).format(new Date()).toLowerCase();
  return weekday.slice(0, 3) as LateNightDay;
}

export default function LateNightEats() {
  const [open, setOpen] = useState(false);
  const day = currentDay();

  const tonight = useMemo(
    () => lateNightEats
      .filter((spot) => spot.hours[day] && spot.closeOrder[day] >= 1440)
      .sort((a, b) => b.closeOrder[day] - a.closeOrder[day]),
    [day]
  );

  useEffect(() => {
    const show = () => {
      setOpen(true);
      trackEvent("late_eats_open", { count: tonight.length, day, placement: "keep_going_dock" });
    };
    window.addEventListener("cda:late-eats-open", show);
    return () => window.removeEventListener("cda:late-eats-open", show);
  }, [day, tonight.length]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div className="late-eats-overlay" role="presentation" onMouseDown={() => setOpen(false)}>
      <section
        className="late-eats-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="late-eats-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="late-eats-panel-head">
          <div>
            <p>KEEP GOING · LATE NIGHT EATS</p>
            <h2 id="late-eats-title">Okay, but where are we eating?</h2>
            <span>Current late-closing options with the source attached. Sorted by who keeps feeding people the longest tonight.</span>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close late night eats">Close</button>
        </div>

        <div className="late-eats-grid">
          {tonight.map((spot, index) => (
            <article className="late-eats-card" key={spot.id}>
              <div className="late-eats-card-top">
                <span className="late-eats-rank">0{index + 1}</span>
                <span className="late-eats-hours">{spot.hours[day]}</span>
              </div>
              <h3>{spot.name}</h3>
              <p className="late-eats-food">{spot.food}</p>
              <p className="late-eats-best">{spot.bestFor}</p>
              <div className="late-eats-meta">
                <span>{spot.serviceMode}</span>
                <span>Checked Aug 22</span>
              </div>
              {spot.note && <small className="late-eats-note">{spot.note}</small>}
              <div className="late-eats-actions">
                <a
                  href={spot.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("late_eats_source_click", { spot_id: spot.id, source: spot.sourceLabel })}
                >
                  Check hours ↗
                </a>
                <a
                  href={spot.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("late_eats_directions_click", { spot_id: spot.id })}
                >
                  Directions ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="late-eats-footnote">Late-night kitchen cutoffs can change before posted venue close. If you are arriving in the last 30 minutes, use the source link first.</p>
      </section>
    </div>
  );
}
