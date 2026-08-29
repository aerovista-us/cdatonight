import { LocalEvent } from "@/data/events";

export type NightlifeSpot = {
  id: string;
  name: string;
  date: string;
  address: string;
  hoursLabel: string;
  vibe: string;
  bestFor: string;
  sourceUrl: string;
  directionsUrl: string;
  sourceLabel: string;
  verifiedAt: string;
};

const verifiedAt = "2026-08-22T17:05:00-07:00";
const weekendVerifiedAt = "2026-08-28T22:32:00-07:00";

export const nightlifeEvents: LocalEvent[] = [
  {
    id: "black-lodge-when-she-dreams-ravish-aug22",
    title: "When She Dreams + Ravish",
    startsAt: "2026-08-22T19:00:00-07:00",
    venue: "Black Lodge",
    address: "206 N 3rd St, Coeur d'Alene, ID 83814",
    category: ["live-music", "nightlife"],
    cost: "unknown",
    status: "unknown",
    sourceId: "bandsintown",
    sourceUrl: "https://www.bandsintown.com/e/1040024121-when-she-dreams-at-black-lodge-brewing-co.?came_from=242",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=206+N+3rd+St+Coeur+d%27Alene+ID+83814",
    sourceLabel: "Bandsintown · venue cross-check: Black Lodge",
    verifiedAt,
    note: "Bandsintown lists both When She Dreams and Ravish at Black Lodge tonight at 7 PM. Black Lodge's official site confirms the downtown music venue and Saturday hours to 1 AM."
  }
];

export const nightlifeSpots: NightlifeSpot[] = [
  {
    id: "iron-horse-aug28",
    name: "Iron Horse",
    date: "2026-08-28",
    address: "407 E Sherman Ave, Coeur d'Alene, ID 83814",
    hoursLabel: "Friday · The Hipsters 9 PM–1 AM",
    vibe: "Classic Sherman bar · high-energy live dance rock tonight",
    bestFor: "A band-first downtown stop that is still going late",
    sourceUrl: "https://stayhappening.com/e/the-hipsters-at-the-iron-horse-in-coeur-dalene-id-E2ISYPF8HEQ",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=407+E+Sherman+Ave+Coeur+d%27Alene+ID+83814",
    sourceLabel: "The Hipsters · Iron Horse listing",
    verifiedAt: weekendVerifiedAt
  },
  {
    id: "moose-lounge-aug28",
    name: "Moose Lounge",
    date: "2026-08-28",
    address: "401 E Sherman Ave, Coeur d'Alene, ID 83814",
    hoursLabel: "Friday · set time not published",
    vibe: "The Inlander lists All Panic No Disco here tonight; exact set time was not published",
    bestFor: "A Sherman bar lead when you want another live-band option",
    sourceUrl: "https://fliphtml5.com/ajffv/08-20-2026-Inlander/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=401+E+Sherman+Ave+Coeur+d%27Alene+ID+83814",
    sourceLabel: "The Inlander weekly music listings",
    verifiedAt: weekendVerifiedAt
  },
  {
    id: "treehouse-cda-aug28",
    name: "TreeHouse CDA",
    date: "2026-08-28",
    address: "314 N 4th St, Coeur d'Alene, ID 83814",
    hoursLabel: "Friday · Luau 10 PM–2 AM",
    vibe: "Late-night downtown summer-sendoff party hosted by The Brad & Tad Show",
    bestFor: "Keeping the night going after the earlier concerts end",
    sourceUrl: "https://stayhappening.com/e/beach-please-end-of-summer-luau-E2ISYTTJKQM",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=314+N+4th+St+Coeur+d%27Alene+ID+83814",
    sourceLabel: "TreeHouse CDA event listing",
    verifiedAt: weekendVerifiedAt
  },
  {
    id: "iron-horse-aug29",
    name: "Iron Horse",
    date: "2026-08-29",
    address: "407 E Sherman Ave, Coeur d'Alene, ID 83814",
    hoursLabel: "Saturday · The Hipsters 9 PM–1 AM",
    vibe: "Second night of the high-energy dance-rock weekend run",
    bestFor: "A late live-band finish after the Fair or downtown dinner",
    sourceUrl: "https://stayhappening.com/e/the-hipsters-at-the-iron-horse-in-coeur-dalene-id-E2ISYPF8HEQ",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=407+E+Sherman+Ave+Coeur+d%27Alene+ID+83814",
    sourceLabel: "The Hipsters · Iron Horse listing",
    verifiedAt: weekendVerifiedAt
  },
  {
    id: "moose-lounge-aug29",
    name: "Moose Lounge",
    date: "2026-08-29",
    address: "401 E Sherman Ave, Coeur d'Alene, ID 83814",
    hoursLabel: "Saturday · set time not published",
    vibe: "The Inlander lists All Panic No Disco for a second night; exact set time was not published",
    bestFor: "A second Sherman live-music lead without pretending we know the clock time",
    sourceUrl: "https://fliphtml5.com/ajffv/08-20-2026-Inlander/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=401+E+Sherman+Ave+Coeur+d%27Alene+ID+83814",
    sourceLabel: "The Inlander weekly music listings",
    verifiedAt: weekendVerifiedAt
  },
  {
    id: "black-lodge-aug29",
    name: "Black Lodge",
    date: "2026-08-29",
    address: "206 N 3rd St, Coeur d'Alene, ID 83814",
    hoursLabel: "Saturday · doors 6 PM · show 7 PM",
    vibe: "Fat Lady + J. Graves + Carson Floyd · garage rock, dance punk and roots songwriting",
    bestFor: "Independent live music with pizza and a smaller-room crowd",
    sourceUrl: "https://ticketstripe.com/events/4605109284821762",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=206+N+3rd+St+Coeur+d%27Alene+ID+83814",
    sourceLabel: "Black Lodge · Ticketstripe",
    verifiedAt: weekendVerifiedAt
  },
  {
    id: "black-lodge",
    name: "Black Lodge",
    date: "2026-08-22",
    address: "206 N 3rd St, Coeur d'Alene, ID 83814",
    hoursLabel: "Saturday · 4 PM–1 AM",
    vibe: "Independent music venue · pizza · bar · creative crowd",
    bestFor: "Live music and a less-polished, more local scene",
    sourceUrl: "https://www.blacklodgerocks.com/about",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=206+N+3rd+St+Coeur+d%27Alene+ID+83814",
    sourceLabel: "Black Lodge",
    verifiedAt
  },
  {
    id: "treehouse-cda",
    name: "TreeHouse CDA",
    date: "2026-08-22",
    address: "314 N 4th St, Coeur d'Alene, ID 83814",
    hoursLabel: "Saturday · 10 AM–1:30 AM",
    vibe: "Late-night bar · sports · patio · entertainment",
    bestFor: "A late downtown stop with a younger, higher-energy feel",
    sourceUrl: "https://www.thetreehousecda.com/contacts.html",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=314+N+4th+St+Coeur+d%27Alene+ID+83814",
    sourceLabel: "TreeHouse CDA",
    verifiedAt
  },
  {
    id: "iron-horse",
    name: "Iron Horse",
    date: "2026-08-22",
    address: "407 E Sherman Ave, Coeur d'Alene, ID 83814",
    hoursLabel: "Saturday · open to about 1:30 AM",
    vibe: "Classic Sherman bar · live-music reputation · locals + visitors",
    bestFor: "A traditional downtown CDA bar night",
    sourceUrl: "https://www.ironhorsecda.com/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=407+E+Sherman+Ave+Coeur+d%27Alene+ID+83814",
    sourceLabel: "Iron Horse / North Idaho tourism cross-check",
    verifiedAt
  },
  {
    id: "moose-lounge",
    name: "Moose Lounge",
    date: "2026-08-22",
    address: "401 E Sherman Ave, Coeur d'Alene, ID 83814",
    hoursLabel: "Saturday · open to about 1 AM",
    vibe: "Casual pub · pool/darts · live-music reputation · lively",
    bestFor: "Groups, games and an unfussy Sherman stop",
    sourceUrl: "https://cdadowntown.com/places/united-states/idaho/coeur-dalene/dine-casual/17394/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=401+E+Sherman+Ave+Coeur+d%27Alene+ID+83814",
    sourceLabel: "Downtown Coeur d'Alene",
    verifiedAt
  },
  {
    id: "la-condesa",
    name: "La Condesa",
    date: "2026-08-22",
    address: "117 N 2nd St, Coeur d'Alene, ID 83814",
    hoursLabel: "Saturday · 3 PM–midnight",
    vibe: "Speakeasy-leaning craft cocktails · intimate · polished",
    bestFor: "Date night or a quieter cocktail-first stop",
    sourceUrl: "https://lacondesacda.com/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=117+N+2nd+St+Coeur+d%27Alene+ID+83814",
    sourceLabel: "La Condesa",
    verifiedAt
  },
  {
    id: "river-and-rye",
    name: "River & Rye",
    date: "2026-08-22",
    address: "422 E Sherman Ave, Coeur d'Alene, ID 83814",
    hoursLabel: "Saturday · 3 PM–midnight",
    vibe: "Craft cocktails · rye whiskey · late-night menu",
    bestFor: "An upscale drink or date-night landing spot",
    sourceUrl: "https://river-rye.com/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=422+E+Sherman+Ave+Coeur+d%27Alene+ID+83814",
    sourceLabel: "River & Rye",
    verifiedAt
  },
  {
    id: "goat-lounge",
    name: "The Goat Lounge",
    date: "2026-08-22",
    address: "108 N 4th St, Coeur d'Alene, ID 83814",
    hoursLabel: "Saturday · 3 PM–midnight",
    vibe: "21+ cocktail lounge · tapas · tucked behind the Moose",
    bestFor: "Small groups and a more lounge-like stop",
    sourceUrl: "https://cdapress.com/news/2022/apr/03/bits/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=108+N+4th+St+Coeur+d%27Alene+ID+83814",
    sourceLabel: "Coeur d'Alene Press + current business listing",
    verifiedAt
  }
];
