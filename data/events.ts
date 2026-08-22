import { SourceId } from "@/data/sources";

export type EventCategory =
  | "live-music"
  | "family"
  | "date-night"
  | "motorsports"
  | "rodeo"
  | "food-drink"
  | "outdoors"
  | "community"
  | "cruise"
  | "nightlife"
  | "market";

export type EventStatus = "available" | "sold-out" | "unknown";

export type LocalEvent = {
  id: string;
  title: string;
  startsAt: string;
  endsAt?: string;
  venue: string;
  address: string;
  category: EventCategory[];
  cost: "free" | "paid" | "unknown";
  priceLabel?: string;
  status: EventStatus;
  sourceId: SourceId;
  sourceUrl: string;
  directionsUrl: string;
  sourceLabel: string;
  verifiedAt: string;
  note?: string;
  featured?: boolean;
};

const fairVerifiedAt = "2026-08-21T19:08:00-07:00";
const phase2VerifiedAt = "2026-08-22T16:45:00-07:00";
const fairAddress = "4056 N Government Way, Coeur d'Alene, ID 83815";
const fairDirections = "https://www.google.com/maps/search/?api=1&query=4056+N+Government+Way+Coeur+d%27Alene+ID+83815";
const downtownDirections = "https://www.google.com/maps/search/?api=1&query=115+S+2nd+St+Coeur+d%27Alene+ID+83814";

export const events: LocalEvent[] = [
  {
    id: "boots-pearls-aug22",
    title: "Boots & Pearls Hootenanny",
    startsAt: "2026-08-22T15:00:00-07:00",
    endsAt: "2026-08-22T22:00:00-07:00",
    venue: "Camp Lutherhaven · cruise departs downtown CDA",
    address: "3258 W Lutherhaven Rd, Coeur d'Alene, ID 83814",
    category: ["live-music", "food-drink", "date-night", "community", "cruise"],
    cost: "paid",
    status: "available",
    sourceId: "lutherhaven",
    sourceUrl: "https://www.lutherhaven.com/give/boots-pearls/",
    directionsUrl: downtownDirections,
    sourceLabel: "Lutherhaven Ministries",
    verifiedAt: phase2VerifiedAt,
    note: "Cruise-to-camp fundraiser with live music, dinner and tastings. Event check-in begins downtown before the boat departure.",
    featured: true
  },
  {
    id: "dinner-under-stars-aug22",
    title: "Dinner Under the Stars",
    startsAt: "2026-08-22T17:30:00-07:00",
    endsAt: "2026-08-22T19:30:00-07:00",
    venue: "Shared Harvest Community Garden",
    address: "10th St & E Foster Ave, Coeur d'Alene, ID 83814",
    category: ["live-music", "food-drink", "date-night", "community", "outdoors"],
    cost: "paid",
    status: "available",
    sourceId: "shared-harvest",
    sourceUrl: "https://sharedharvestgarden.org/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Shared+Harvest+Community+Garden+Coeur+d%27Alene+ID",
    sourceLabel: "Shared Harvest Community Garden",
    verifiedAt: phase2VerifiedAt,
    note: "Annual garden fundraiser with catered dinner, Robby French live music, and silent + live auction.",
    featured: true
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
    sourceId: "north-idaho-state-fair",
    sourceUrl: "https://www.nisfair.fun/events/arena-events",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt: fairVerifiedAt,
    note: "Arena ticket includes Fair admission.",
    featured: true
  },
  {
    id: "marina-cantina-live-aug22",
    title: "Marina Cantina Live Music",
    startsAt: "2026-08-22T19:00:00-07:00",
    endsAt: "2026-08-22T22:00:00-07:00",
    venue: "Marina Cantina",
    address: "115 S 2nd St, Coeur d'Alene, ID 83814",
    category: ["live-music", "food-drink", "nightlife", "date-night"],
    cost: "unknown",
    status: "available",
    sourceId: "marina-market",
    sourceUrl: "https://marinamarketfoodhall.com/events/",
    directionsUrl: downtownDirections,
    sourceLabel: "Marina Market & Food Hall",
    verifiedAt: phase2VerifiedAt,
    note: "Venue calendar lists Saturday live music from 7–10 PM."
  },
  {
    id: "salt-cracker-live-aug22",
    title: "Salt Cracker Live Music",
    startsAt: "2026-08-22T19:00:00-07:00",
    endsAt: "2026-08-22T22:00:00-07:00",
    venue: "Salt Cracker Fish Camp",
    address: "115 S 2nd St, Coeur d'Alene, ID 83814",
    category: ["live-music", "food-drink", "nightlife"],
    cost: "unknown",
    status: "available",
    sourceId: "marina-market",
    sourceUrl: "https://marinamarketfoodhall.com/events/",
    directionsUrl: downtownDirections,
    sourceLabel: "Marina Market & Food Hall",
    verifiedAt: phase2VerifiedAt,
    note: "Venue calendar lists Saturday live music from 7–10 PM."
  },
  {
    id: "bar-tiki-dj-aug22",
    title: "Bar Tiki Live DJ",
    startsAt: "2026-08-22T19:00:00-07:00",
    endsAt: "2026-08-22T23:00:00-07:00",
    venue: "Bar Tiki",
    address: "115 S 2nd St, Coeur d'Alene, ID 83814",
    category: ["nightlife", "food-drink", "date-night"],
    cost: "unknown",
    status: "available",
    sourceId: "marina-market",
    sourceUrl: "https://marinamarketfoodhall.com/events/",
    directionsUrl: downtownDirections,
    sourceLabel: "Marina Market & Food Hall",
    verifiedAt: phase2VerifiedAt,
    note: "Venue calendar lists DJ entertainment from 7–11 PM."
  },
  {
    id: "sunset-dinner-cruise-aug22",
    title: "Sunset Dinner Cruise",
    startsAt: "2026-08-22T19:30:00-07:00",
    endsAt: "2026-08-22T21:30:00-07:00",
    venue: "Lake Coeur d'Alene Cruises · Independence Point",
    address: "Independence Point, Coeur d'Alene, ID 83814",
    category: ["cruise", "food-drink", "date-night"],
    cost: "paid",
    status: "available",
    sourceId: "cda-cruises",
    sourceUrl: "https://tickets.cdacruises.com/?tab=calendar",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Independence+Point+Coeur+d%27Alene+ID+83814",
    sourceLabel: "Lake Coeur d'Alene Cruises",
    verifiedAt: phase2VerifiedAt,
    note: "Official cruise calendar lists the two-hour Saturday sunset dinner sailing.",
    featured: true
  },
  {
    id: "cda-flea-aug23",
    title: "CDA Flea Market",
    startsAt: "2026-08-23T10:00:00-07:00",
    endsAt: "2026-08-23T15:00:00-07:00",
    venue: "Museum of North Idaho",
    address: "720 E Young Ave, Coeur d'Alene, ID 83814",
    category: ["market", "family", "outdoors", "community"],
    cost: "unknown",
    status: "available",
    sourceId: "cda-flea",
    sourceUrl: "https://www.cdaflea.com/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=720+E+Young+Ave+Coeur+d%27Alene+ID+83814",
    sourceLabel: "CDA Flea",
    verifiedAt: phase2VerifiedAt,
    note: "55+ curated vendors, small-batch food and family-friendly live music."
  },
  {
    id: "sunday-brunch-cruise-aug23",
    title: "Sunday Brunch Cruise",
    startsAt: "2026-08-23T11:00:00-07:00",
    endsAt: "2026-08-23T12:30:00-07:00",
    venue: "Lake Coeur d'Alene Cruises · Independence Point",
    address: "Independence Point, Coeur d'Alene, ID 83814",
    category: ["cruise", "food-drink", "family", "date-night"],
    cost: "paid",
    status: "available",
    sourceId: "cda-cruises",
    sourceUrl: "https://tickets.cdacruises.com/?tab=calendar",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Independence+Point+Coeur+d%27Alene+ID+83814",
    sourceLabel: "Lake Coeur d'Alene Cruises",
    verifiedAt: phase2VerifiedAt,
    note: "Official cruise calendar lists the Sunday brunch sailing."
  },
  {
    id: "koep-city-park-aug23",
    title: "KOEP Concerts · City Park Show",
    startsAt: "2026-08-23T13:00:00-07:00",
    endsAt: "2026-08-23T16:00:00-07:00",
    venue: "Coeur d'Alene City Park",
    address: "415 W Mullan Rd, Coeur d'Alene, ID 83814",
    category: ["live-music", "family", "outdoors", "community"],
    cost: "free",
    status: "available",
    sourceId: "visit-cda",
    sourceUrl: "https://coeurdalene.org/events/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Coeur+d%27Alene+City+Park+ID",
    sourceLabel: "Visit Coeur d'Alene",
    verifiedAt: phase2VerifiedAt,
    note: "Free community concert listed on the local Convention & Visitor Bureau calendar."
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
    sourceId: "north-idaho-state-fair",
    sourceUrl: "https://www.nisfair.fun/p/tickets--deals",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt: fairVerifiedAt,
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
    sourceId: "north-idaho-state-fair",
    sourceUrl: "https://www.nisfair.fun/events/2026/concert",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt: fairVerifiedAt,
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
    sourceId: "north-idaho-state-fair",
    sourceUrl: "https://www.nisfair.fun/events/2026/concert",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt: fairVerifiedAt,
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
    sourceId: "north-idaho-state-fair",
    sourceUrl: "https://www.nisfair.fun/events/2026/prca-rodeo-friday",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt: fairVerifiedAt,
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
    sourceId: "north-idaho-state-fair",
    sourceUrl: "https://www.nisfair.fun/p/tickets--deals",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt: fairVerifiedAt,
    note: "Official Fair ticket page currently lists this performance as sold out."
  },
  {
    id: "bar-tiki-dj-aug28",
    title: "Bar Tiki Live DJ",
    startsAt: "2026-08-28T19:00:00-07:00",
    endsAt: "2026-08-28T23:00:00-07:00",
    venue: "Bar Tiki",
    address: "115 S 2nd St, Coeur d'Alene, ID 83814",
    category: ["nightlife", "food-drink", "date-night"],
    cost: "unknown",
    status: "available",
    sourceId: "marina-market",
    sourceUrl: "https://marinamarketfoodhall.com/events/",
    directionsUrl: downtownDirections,
    sourceLabel: "Marina Market & Food Hall",
    verifiedAt: phase2VerifiedAt,
    note: "Venue calendar lists Friday DJ entertainment from 7–11 PM."
  },
  {
    id: "salt-cracker-live-aug28",
    title: "Salt Cracker Live Music",
    startsAt: "2026-08-28T19:00:00-07:00",
    endsAt: "2026-08-28T22:00:00-07:00",
    venue: "Salt Cracker Fish Camp",
    address: "115 S 2nd St, Coeur d'Alene, ID 83814",
    category: ["live-music", "food-drink", "nightlife"],
    cost: "unknown",
    status: "available",
    sourceId: "marina-market",
    sourceUrl: "https://marinamarketfoodhall.com/events/",
    directionsUrl: downtownDirections,
    sourceLabel: "Marina Market & Food Hall",
    verifiedAt: phase2VerifiedAt,
    note: "Venue calendar lists Friday live music from 7–10 PM."
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
    sourceId: "north-idaho-state-fair",
    sourceUrl: "https://www.nisfair.fun/p/tickets--deals",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt: fairVerifiedAt,
    note: "Official Fair ticket page currently lists this performance as sold out."
  },
  {
    id: "marina-cantina-live-aug29",
    title: "Marina Cantina Live Music",
    startsAt: "2026-08-29T19:00:00-07:00",
    endsAt: "2026-08-29T22:00:00-07:00",
    venue: "Marina Cantina",
    address: "115 S 2nd St, Coeur d'Alene, ID 83814",
    category: ["live-music", "food-drink", "nightlife", "date-night"],
    cost: "unknown",
    status: "available",
    sourceId: "marina-market",
    sourceUrl: "https://marinamarketfoodhall.com/events/",
    directionsUrl: downtownDirections,
    sourceLabel: "Marina Market & Food Hall",
    verifiedAt: phase2VerifiedAt,
    note: "Venue calendar lists Saturday live music from 7–10 PM."
  },
  {
    id: "salt-cracker-live-aug29",
    title: "Salt Cracker Live Music",
    startsAt: "2026-08-29T19:00:00-07:00",
    endsAt: "2026-08-29T22:00:00-07:00",
    venue: "Salt Cracker Fish Camp",
    address: "115 S 2nd St, Coeur d'Alene, ID 83814",
    category: ["live-music", "food-drink", "nightlife"],
    cost: "unknown",
    status: "available",
    sourceId: "marina-market",
    sourceUrl: "https://marinamarketfoodhall.com/events/",
    directionsUrl: downtownDirections,
    sourceLabel: "Marina Market & Food Hall",
    verifiedAt: phase2VerifiedAt,
    note: "Venue calendar lists Saturday live music from 7–10 PM."
  },
  {
    id: "bar-tiki-dj-aug29",
    title: "Bar Tiki Live DJ",
    startsAt: "2026-08-29T19:00:00-07:00",
    endsAt: "2026-08-29T23:00:00-07:00",
    venue: "Bar Tiki",
    address: "115 S 2nd St, Coeur d'Alene, ID 83814",
    category: ["nightlife", "food-drink", "date-night"],
    cost: "unknown",
    status: "available",
    sourceId: "marina-market",
    sourceUrl: "https://marinamarketfoodhall.com/events/",
    directionsUrl: downtownDirections,
    sourceLabel: "Marina Market & Food Hall",
    verifiedAt: phase2VerifiedAt,
    note: "Venue calendar lists Saturday DJ entertainment from 7–11 PM."
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
    sourceId: "north-idaho-state-fair",
    sourceUrl: "https://www.nisfair.fun/p/tickets--deals",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt: fairVerifiedAt,
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
    sourceId: "north-idaho-state-fair",
    sourceUrl: "https://www.nisfair.fun/events/2026/prca-rodeo-friday",
    directionsUrl: fairDirections,
    sourceLabel: "North Idaho State Fair",
    verifiedAt: fairVerifiedAt,
    note: "Sunday matinee; official source lists tickets for this performance."
  }
];
