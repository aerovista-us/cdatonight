export type EventCategory = "live-music" | "family" | "date-night" | "motorsports" | "rodeo";
export type EventStatus = "available" | "sold-out" | "unknown";

export type LocalEvent = {
  id: string;
  title: string;
  startsAt: string;
  venue: string;
  address: string;
  category: EventCategory[];
  cost: "free" | "paid" | "unknown";
  status: EventStatus;
  sourceUrl: string;
  directionsUrl: string;
  sourceLabel: string;
  verifiedAt: string;
  note?: string;
};

const verifiedAt = "2026-08-21T19:08:00-07:00";
const fairAddress = "4056 N Government Way, Coeur d'Alene, ID 83815";
const fairDirections = "https://www.google.com/maps/search/?api=1&query=4056+N+Government+Way+Coeur+d%27Alene+ID+83815";

export const events: LocalEvent[] = [
  {
    id: "fair-motocross-aug21",
    title: "North Idaho State Fair Motocross",
    startsAt: "2026-08-21T18:30:00-07:00",
    venue: "Findlay Arena · North Idaho State Fair",
    address: fairAddress,
    category: ["motorsports", "family"],
    cost: "paid",
    status: "available",
    sourceUrl: "https://www.nisfair.fun/events/arena-events",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt,
    note: "Arena ticket includes Fair admission."
  },
  {
    id: "fair-motocross-aug22",
    title: "North Idaho State Fair Motocross",
    startsAt: "2026-08-22T18:30:00-07:00",
    venue: "Findlay Arena · North Idaho State Fair",
    address: fairAddress,
    category: ["motorsports", "family"],
    cost: "paid",
    status: "available",
    sourceUrl: "https://www.nisfair.fun/events/arena-events",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt,
    note: "Arena ticket includes Fair admission."
  },
  {
    id: "fair-demo-derby-aug23",
    title: "Demo Derby",
    startsAt: "2026-08-23T16:00:00-07:00",
    venue: "Findlay Arena · North Idaho State Fair",
    address: fairAddress,
    category: ["motorsports", "family"],
    cost: "paid",
    status: "available",
    sourceUrl: "https://www.nisfair.fun/p/tickets--deals",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt,
    note: "Ticket includes Fair admission."
  },
  {
    id: "fair-lee-brice-aug24",
    title: "Lee Brice · Party in the Dirt",
    startsAt: "2026-08-24T19:30:00-07:00",
    venue: "Findlay Arena · North Idaho State Fair",
    address: fairAddress,
    category: ["live-music", "date-night"],
    cost: "paid",
    status: "available",
    sourceUrl: "https://www.nisfair.fun/events/2026/concert",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt,
    note: "Concert series performance; check official source for current ticket inventory."
  },
  {
    id: "fair-walker-hayes-aug25",
    title: "Walker Hayes · Party in the Dirt",
    startsAt: "2026-08-25T19:30:00-07:00",
    venue: "Findlay Arena · North Idaho State Fair",
    address: fairAddress,
    category: ["live-music", "date-night"],
    cost: "paid",
    status: "available",
    sourceUrl: "https://www.nisfair.fun/events/2026/concert",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt,
    note: "Concert series performance; check official source for current ticket inventory."
  },
  {
    id: "fair-rodeo-aug26",
    title: "Gem State Stampede PRCA Rodeo",
    startsAt: "2026-08-26T18:30:00-07:00",
    venue: "Findlay Arena · North Idaho State Fair",
    address: fairAddress,
    category: ["rodeo", "family", "date-night"],
    cost: "paid",
    status: "available",
    sourceUrl: "https://www.nisfair.fun/events/2026/prca-rodeo-friday",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt,
    note: "Arena ticket includes same-day Fair admission."
  },
  {
    id: "fair-xtreme-bulls-aug27",
    title: "Gem State Stampede · Xtreme Bulls",
    startsAt: "2026-08-27T18:30:00-07:00",
    venue: "Findlay Arena · North Idaho State Fair",
    address: fairAddress,
    category: ["rodeo", "date-night"],
    cost: "paid",
    status: "sold-out",
    sourceUrl: "https://www.nisfair.fun/p/tickets--deals",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt,
    note: "Official Fair ticket page currently lists this performance as sold out."
  },
  {
    id: "fair-rodeo-aug28",
    title: "Gem State Stampede PRCA Rodeo · Tough Enough to Wear Pink",
    startsAt: "2026-08-28T18:30:00-07:00",
    venue: "Findlay Arena · North Idaho State Fair",
    address: fairAddress,
    category: ["rodeo", "family", "date-night"],
    cost: "paid",
    status: "sold-out",
    sourceUrl: "https://www.nisfair.fun/p/tickets--deals",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt,
    note: "Official Fair ticket page currently lists this performance as sold out."
  },
  {
    id: "fair-rodeo-aug29",
    title: "Gem State Stampede PRCA Rodeo · Patriot Night",
    startsAt: "2026-08-29T18:30:00-07:00",
    venue: "Findlay Arena · North Idaho State Fair",
    address: fairAddress,
    category: ["rodeo", "family", "date-night"],
    cost: "paid",
    status: "sold-out",
    sourceUrl: "https://www.nisfair.fun/p/tickets--deals",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt,
    note: "Official Fair ticket page currently lists this performance as sold out."
  },
  {
    id: "fair-rodeo-aug30",
    title: "Gem State Stampede PRCA Rodeo · Family Day",
    startsAt: "2026-08-30T15:00:00-07:00",
    venue: "Findlay Arena · North Idaho State Fair",
    address: fairAddress,
    category: ["rodeo", "family"],
    cost: "paid",
    status: "available",
    sourceUrl: "https://www.nisfair.fun/events/2026/prca-rodeo-friday",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt,
    note: "Sunday matinee; official source lists tickets for this performance."
  }
];
