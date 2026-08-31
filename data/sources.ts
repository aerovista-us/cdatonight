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
  | "idaho-veterans"
  | "veterans-club"
  | "pinots-cda"
  | "uidaho"
  | "cda-casino"
  | "idaho-sports"
  | "eats-post-falls";

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
  "idaho-veterans": {
    id: "idaho-veterans",
    name: "Idaho Division of Veterans Services",
    kind: "official-organizer",
    url: "https://veterans.idaho.gov/events/",
    coverage: "North Idaho veteran and first-responder community events",
    priority: 9,
    note: "State government calendar used for public veteran/community programming with exact local details."
  },
  "veterans-club": {
    id: "veterans-club",
    name: "The Veterans Club",
    kind: "official-organizer",
    url: "https://theveteransclub.org/events/",
    coverage: "Veteran and first-responder meetups, meals and special events",
    priority: 10,
    note: "Organizer-operated event calendar for local Patriot Pour and related programming."
  },
  "pinots-cda": {
    id: "pinots-cda",
    name: "Pinot's Palette Coeur d'Alene",
    kind: "official-venue",
    url: "https://www.pinotspalette.com/cda/events",
    coverage: "Paint-and-sip classes and open studio sessions",
    priority: 10,
    note: "Official local studio calendar with exact class times and prices."
  },
  uidaho: {
    id: "uidaho",
    name: "University of Idaho",
    kind: "official-organizer",
    url: "https://www.uidaho.edu/events",
    coverage: "University and alumni watch parties and regional community events",
    priority: 10,
    note: "Official university event source for North Idaho Vandal activities."
  },
  "cda-casino": {
    id: "cda-casino",
    name: "Coeur d'Alene Casino Resort Hotel",
    kind: "official-venue",
    url: "https://www.cdacasino.com/events/",
    coverage: "Regional concerts, entertainment and casino events",
    priority: 10,
    note: "Official venue calendar for ticketed entertainment in Worley."
  },
  "idaho-sports": {
    id: "idaho-sports",
    name: "IdahoSports.com",
    kind: "community-calendar",
    url: "https://www.idahosports.com/",
    coverage: "North Idaho high-school sports schedules and matchups",
    priority: 7,
    note: "Local sports discovery source; school and venue identity are cross-checked against official school/IHSAA information."
  },
  "eats-post-falls": {
    id: "eats-post-falls",
    name: "Eats on Spokane Street",
    kind: "official-venue",
    url: "https://www.eatsonspokanest.com/event-calendar",
    coverage: "Post Falls live music, community parties and outdoor events",
    priority: 10,
    note: "Official venue calendar for scheduled music and community programming."
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
