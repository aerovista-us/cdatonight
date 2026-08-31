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
  | "cda-flea"
  | "downtown-cda"
  | "koep-concerts"
  | "north-idaho-college"
  | "cda-library"
  | "ticketstripe"
  | "getoutgarage"
  | "stayhappening"
  | "bandsintown"
  | "pinots-palette"
  | "blue-shell"
  | "sunset-bowling"
  | "school-sports"
  | "cda-casino"
  | "eats-spokane";

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
  },
  "downtown-cda": {
    id: "downtown-cda",
    name: "Coeur d'Alene Downtown Association",
    kind: "official-organizer",
    url: "https://cdadowntown.com/event-calendar/",
    coverage: "Downtown festivals, markets, tastings, parades and community events",
    priority: 10,
    note: "Official Downtown Association calendar; added as a trusted source during the self-update build."
  },
  "koep-concerts": {
    id: "koep-concerts",
    name: "KOEP Concerts",
    kind: "official-organizer",
    url: "https://koepconcerts.com/concert-schedule/",
    coverage: "Free City Park, McEuen Park and Hayden summer concert series",
    priority: 10,
    note: "Official organizer schedule for KOEP's North Idaho community concert series."
  },
  "north-idaho-college": {
    id: "north-idaho-college",
    name: "North Idaho College",
    kind: "official-organizer",
    url: "https://nic.edu/fun-run/",
    coverage: "North Idaho College public events and campus activities",
    priority: 10,
    note: "Official NIC source for campus events such as the Color Fun Run."
  },
  "cda-library": {
    id: "cda-library",
    name: "Coeur d'Alene Public Library",
    kind: "official-organizer",
    url: "https://cdalibrary.org/",
    coverage: "Library programs, community activities and special events",
    priority: 10,
    note: "Official library source for public programs and registration-based events."
  },
  ticketstripe: {
    id: "ticketstripe",
    name: "Ticketstripe",
    kind: "official-ticketing",
    url: "https://ticketstripe.com/",
    coverage: "Ticketed independent venue events, including Black Lodge listings",
    priority: 9,
    note: "Ticketing source used when an event page is directly published for the local venue."
  },
  getoutgarage: {
    id: "getoutgarage",
    name: "GetOutGarage",
    kind: "community-calendar",
    url: "https://www.getoutgarage.com/",
    coverage: "Local automotive meetups and car events",
    priority: 6,
    note: "Community discovery source; listings are kept conservative and retain verification notes."
  },
  stayhappening: {
    id: "stayhappening",
    name: "StayHappening",
    kind: "community-calendar",
    url: "https://stayhappening.com/coeur%2Bd%2Balene",
    coverage: "Local nightlife, music and community event discovery",
    priority: 6,
    note: "Discovery source used for events with a named host and venue; details are cross-checked when possible."
  },
  bandsintown: {
    id: "bandsintown",
    name: "Bandsintown",
    kind: "community-calendar",
    url: "https://www.bandsintown.com/c/coeur-d%27alene-id",
    coverage: "Artist-listed and venue-listed concert discovery",
    priority: 7,
    note: "Discovery/cross-check lane for exact local show listings; venue identity is verified separately when possible."
  },
  "pinots-palette": {
    id: "pinots-palette",
    name: "Pinot's Palette Coeur d'Alene",
    kind: "official-venue",
    url: "https://www.pinotspalette.com/cda/events",
    coverage: "Scheduled paint-and-sip classes, open studio and creative workshops",
    priority: 10,
    note: "Official CDA studio calendar with exact class times, prices and booking state."
  },
  "blue-shell": {
    id: "blue-shell",
    name: "The Blue Shell",
    kind: "official-venue",
    url: "https://theblueshellcda.com/events",
    coverage: "Tabletop gaming, Magic events and bar/game nights",
    priority: 9,
    note: "Official venue event calendar for the East Sherman gaming bar."
  },
  "sunset-bowling": {
    id: "sunset-bowling",
    name: "Sunset Bowling Center",
    kind: "official-venue",
    url: "https://sunsetbowling.net/About",
    coverage: "Recurring late-night and special-price bowling sessions",
    priority: 9,
    note: "Official bowling center schedule and published special-event pricing."
  },
  "school-sports": {
    id: "school-sports",
    name: "North Idaho School Sports",
    kind: "community-calendar",
    url: "https://www.nfhsnetwork.com/",
    coverage: "Public high-school varsity sports in Coeur d'Alene",
    priority: 7,
    note: "Schedule discovery lane using NFHS Network and MaxPreps; exact matchup pages remain attached to each event."
  },
  "cda-casino": {
    id: "cda-casino",
    name: "Coeur d'Alene Casino Resort Hotel",
    kind: "official-venue",
    url: "https://www.cdacasino.com/events/",
    coverage: "Nearby Worley concerts and live entertainment",
    priority: 8,
    note: "Official venue calendar; nearby-region items are labeled in event notes rather than presented as downtown CDA."
  },
  "eats-spokane": {
    id: "eats-spokane",
    name: "Eats On Spokane Street",
    kind: "official-venue",
    url: "https://www.eatsonspokanest.com/event-calendar",
    coverage: "Post Falls live music and community activity weekends",
    priority: 8,
    note: "Official venue calendar used for nearby Post Falls options."
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
