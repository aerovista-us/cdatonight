export type SourceKind =
  | "official-organizer"
  | "official-venue"
  | "official-ticketing"
  | "community-calendar";

export type SourceId =
  | "north-idaho-state-fair"
  | "shared-harvest"
  | "lutherhaven"
  | "cda-cruises"
  | "marina-market"
  | "visit-cda"
  | "cda-flea";

export type EventSource = {
  id: SourceId;
  name: string;
  kind: SourceKind;
  url: string;
  coverage: string;
  priority: number;
  note: string;
};

export const sources: Record<SourceId, EventSource> = {
  "north-idaho-state-fair": {
    id: "north-idaho-state-fair",
    name: "North Idaho State Fair",
    kind: "official-organizer",
    url: "https://www.nisfair.fun/events",
    coverage: "Fair, arena, concerts and rodeo",
    priority: 10,
    note: "Primary organizer source for Fair and Findlay Arena inventory."
  },
  "shared-harvest": {
    id: "shared-harvest",
    name: "Shared Harvest Community Garden",
    kind: "official-organizer",
    url: "https://sharedharvestgarden.org/",
    coverage: "Community garden events and fundraisers",
    priority: 10,
    note: "Primary organizer source for Shared Harvest events."
  },
  lutherhaven: {
    id: "lutherhaven",
    name: "Lutherhaven Ministries",
    kind: "official-organizer",
    url: "https://www.lutherhaven.com/give/boots-pearls/",
    coverage: "Lake events and community fundraisers",
    priority: 10,
    note: "Primary organizer source for Lutherhaven events."
  },
  "cda-cruises": {
    id: "cda-cruises",
    name: "Lake Coeur d'Alene Cruises",
    kind: "official-ticketing",
    url: "https://tickets.cdacruises.com/?tab=calendar",
    coverage: "Public cruises, dinner cruises and lake experiences",
    priority: 10,
    note: "Official schedule and ticket-status source for CDA Cruises."
  },
  "marina-market": {
    id: "marina-market",
    name: "Marina Market & Food Hall",
    kind: "official-venue",
    url: "https://marinamarketfoodhall.com/events/",
    coverage: "Marina Cantina, Salt Cracker and Bar Tiki entertainment",
    priority: 9,
    note: "Venue-operated calendar for recurring waterfront entertainment."
  },
  "visit-cda": {
    id: "visit-cda",
    name: "Visit Coeur d'Alene",
    kind: "community-calendar",
    url: "https://coeurdalene.org/events/",
    coverage: "Regional community, arts, recreation and visitor events",
    priority: 8,
    note: "Convention & Visitor Bureau calendar used as a discovery and cross-check lane."
  },
  "cda-flea": {
    id: "cda-flea",
    name: "CDA Flea",
    kind: "official-organizer",
    url: "https://www.cdaflea.com/",
    coverage: "CDA Flea markets and organizer events",
    priority: 9,
    note: "Primary organizer source for CDA Flea events."
  }
};

export const sourceList = Object.values(sources);

export function sourceFor(id: SourceId) {
  return sources[id];
}

export function sourceKindLabel(kind: SourceKind) {
  switch (kind) {
    case "official-organizer":
      return "Official organizer";
    case "official-venue":
      return "Official venue";
    case "official-ticketing":
      return "Official tickets";
    case "community-calendar":
      return "Community calendar";
  }
}
