"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export default function Phase3Nav() {
  const pathname = usePathname();
  const onWeekend = pathname === "/weekend";
  const onSubmit = pathname === "/submit";

  return (
    <nav className="phase3-dock" aria-label="CDA Tonight utilities">
      <Link
        className={onWeekend ? "active" : ""}
        href="/weekend"
        onClick={() => trackEvent("weekend_mode_open", { placement: "utility_dock" })}
      >
        Weekend
      </Link>
      <Link
        className={onSubmit ? "active secondary" : "secondary"}
        href="/submit"
        onClick={() => trackEvent("submit_event_open", { placement: "utility_dock" })}
      >
        Submit event
      </Link>
    </nav>
  );
}
