"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export default function Phase3Nav() {
  const pathname = usePathname();
  const onWeekend = pathname === "/weekend";
  const onSubmit = pathname === "/submit";
  const onSources = pathname === "/sources";

  const openLateEats = () => {
    trackEvent("late_eats_nav_click", { placement: "keep_going_dock" });
    window.dispatchEvent(new Event("cda:late-eats-open"));
  };

  return (
    <nav className="phase3-dock" aria-label="Keep the night going">
      <span className="phase3-dock-label">Keep going</span>
      <div className="phase3-dock-primary">
        <Link
          className={onWeekend ? "active" : ""}
          href="/weekend"
          onClick={() => trackEvent("weekend_mode_open", { placement: "keep_going_dock" })}
        >
          <small>Plan ahead</small>
          <strong>Weekend</strong>
        </Link>
        <button type="button" onClick={openLateEats}>
          <small>Still out?</small>
          <strong>Late eats</strong>
        </button>
      </div>
      <div className="phase3-dock-quiet">
        <Link
          className={onSubmit ? "active" : ""}
          href="/submit"
          onClick={() => trackEvent("submit_event_open", { placement: "keep_going_dock" })}
        >
          Submit
        </Link>
        <span aria-hidden="true">·</span>
        <Link
          className={onSources ? "active" : ""}
          href="/sources"
          onClick={() => trackEvent("source_network_open", { placement: "keep_going_dock" })}
        >
          Sources
        </Link>
      </div>
    </nav>
  );
}
