import type { LocalEvent } from "./events";

const phase3VerifiedAt = "2026-08-22T18:55:00-07:00";
const weekendVerifiedAt = "2026-08-28T22:32:00-07:00";
const downtownDirections = "https://www.google.com/maps/search/?api=1&query=Downtown+Coeur+d%27Alene+ID";

export const phase3Events: LocalEvent[] = [
  {
    id: "koep-mceuen-gigawatt-aug26",
    title: "KOEP Music at McEuen · Gigawatt",
    startsAt: "2026-08-26T17:30:00-07:00",
    endsAt: "2026-08-26T20:30:00-07:00",
    venue: "McEuen Park",
    address: "420 E Front Ave, Coeur d'Alene, ID 83814",
    category: ["live-music", "family", "outdoors", "community"],
    cost: "free",
    status: "unknown",
    sourceId: "koep-concerts",
    sourceUrl: "https://koepconcerts.com/concert-schedule/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=McEuen+Park+Coeur+d%27Alene+ID",
    sourceLabel: "KOEP Concerts",
    verifiedAt: phase3VerifiedAt,
    note: "Official KOEP schedule lists Gigawatt at McEuen Park from 5:30–8:30 PM; gates open at 4 PM. Free community concert."
  },
  {
    id: "museum-cemetery-walking-tour-aug28",
    title: "Cemetery Walking Tours · Final Evening Tour",
    startsAt: "2026-08-28T18:30:00-07:00",
    endsAt: "2026-08-28T21:30:00-07:00",
    venue: "Museum of North Idaho",
    address: "720 E Young Ave, Coeur d'Alene, ID 83814",
    category: ["community", "outdoors", "date-night"],
    cost: "paid",
    priceLabel: "$25",
    status: "unknown",
    sourceId: "visit-cda",
    sourceUrl: "https://coeurdalene.org/events/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Museum+of+North+Idaho+720+E+Young+Ave+Coeur+d%27Alene",
    sourceLabel: "Visit Coeur d'Alene",
    verifiedAt: phase3VerifiedAt,
    note: "Visit CDA lists the Aug. 28 evening Cemetery Walking Tour from 6:30–9:30 PM and links to Museum of North Idaho ticket information. Ticket availability was not independently confirmed."
  },
  {
    id: "jimmy-buffett-day-cruise-aug29-early",
    title: "National Jimmy Buffett Day Cruise · Early Sailing",
    startsAt: "2026-08-29T16:30:00-07:00",
    endsAt: "2026-08-29T18:30:00-07:00",
    venue: "Lake Coeur d'Alene Cruises · Independence Point",
    address: "115 S 2nd St, Coeur d'Alene, ID 83814",
    category: ["cruise", "live-music", "food-drink", "date-night"],
    cost: "paid",
    priceLabel: "$79.50",
    status: "sold-out",
    sourceId: "cda-cruises",
    sourceUrl: "https://tickets.cdacruises.com/",
    directionsUrl: downtownDirections,
    sourceLabel: "Lake Coeur d'Alene Cruises",
    verifiedAt: weekendVerifiedAt,
    note: "The Nobody Famous Band performs Jimmy Buffett favorites on the 4:30–6:30 PM dinner cruise. The official ticket calendar currently lists this sailing as sold out."
  },
  {
    id: "jimmy-buffett-day-cruise-aug29-late",
    title: "National Jimmy Buffett Day Cruise · Sunset Sailing",
    startsAt: "2026-08-29T19:30:00-07:00",
    endsAt: "2026-08-29T21:30:00-07:00",
    venue: "Lake Coeur d'Alene Cruises · Independence Point",
    address: "115 S 2nd St, Coeur d'Alene, ID 83814",
    category: ["cruise", "live-music", "food-drink", "date-night"],
    cost: "paid",
    priceLabel: "$79.50",
    status: "sold-out",
    sourceId: "cda-cruises",
    sourceUrl: "https://tickets.cdacruises.com/",
    directionsUrl: downtownDirections,
    sourceLabel: "Lake Coeur d'Alene Cruises",
    verifiedAt: weekendVerifiedAt,
    note: "The Nobody Famous Band performs Jimmy Buffett favorites on the 7:30–9:30 PM sunset dinner cruise. The official ticket calendar currently lists this sailing as sold out."
  },
  {
    id: "koep-city-park-soul-proprietor-aug30",
    title: "KOEP City Park · Soul Proprietor",
    startsAt: "2026-08-30T13:00:00-07:00",
    endsAt: "2026-08-30T16:00:00-07:00",
    venue: "Coeur d'Alene City Park · Rotary Bandshell",
    address: "415 W Fort Grounds Dr, Coeur d'Alene, ID 83814",
    category: ["live-music", "family", "outdoors", "community"],
    cost: "free",
    status: "available",
    sourceId: "koep-concerts",
    sourceUrl: "https://koepconcerts.com/concert-schedule/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Coeur+d%27Alene+City+Park+Rotary+Bandshell",
    sourceLabel: "KOEP Concerts",
    verifiedAt: weekendVerifiedAt,
    note: "Free all-ages season finale from 1–4 PM. Soul Proprietor brings a horn-heavy mix of soul, blues, Motown, R&B and classic rock."
  }
];
