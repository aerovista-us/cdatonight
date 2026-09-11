import { fortnightSep10Sep24Events } from "./fortnight-2026-09-10-09-24";
import type { LocalEvent } from "./events";

// Editorially elevated events: monthly/annual/special-run happenings that
// deserve more visual weight than recurring classes, specials, or routine
// nightlife. The override keeps the original source/time data intact while
// giving the UI a durable featured marker and a predictable featured ID.
const featuredTitles = new Set([
  "2nd Friday ArtWalk",
  "2nd Annual 208 Recovery Celebration",
  "Riverstone Block Party & Brewfest",
  "CDA Flea Market",
  "Gems & Jeans 2026",
  "Whiskey Barrel Weekend 2026 · Opening Day",
  "Downtown Coeur d'Alene Oktoberfest · Friday",
  "Downtown Coeur d'Alene Oktoberfest · Saturday",
  "St Joe River Cruise"
]);

export const featuredFortnightEvents: LocalEvent[] = fortnightSep10Sep24Events
  .filter((event) => featuredTitles.has(event.title))
  .map((event) => ({
    ...event,
    id: `featured-${event.id}`,
    featured: true
  }));
