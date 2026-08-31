import type { LocalEvent } from "./events";

const verifiedAt = "2026-08-31T07:20:00-07:00";
const cdaHighAddress = "5530 N 4th St, Coeur d'Alene, ID 83815";
const cdaHighDirections = "https://www.google.com/maps/search/?api=1&query=5530+N+4th+St+Coeur+d%27Alene+ID+83815";
const lakeCityAddress = "6101 N Ramsey Rd, Coeur d'Alene, ID 83815";
const lakeCityDirections = "https://www.google.com/maps/search/?api=1&query=6101+N+Ramsey+Rd+Coeur+d%27Alene+ID+83815";

export const deepDiveCommunityEvents: LocalEvent[] = [
  {
    id: "vfw-coffee-donuts-sep1",
    title: "VFW 889 Coffee & Donuts",
    startsAt: "2026-09-01T08:00:00-07:00",
    endsAt: "2026-09-01T10:00:00-07:00",
    venue: "VFW Post 889",
    address: "406 N 4th St, Coeur d'Alene, ID 83814",
    category: ["community", "food-drink"],
    cost: "free",
    status: "available",
    sourceId: "idaho-veterans",
    sourceUrl: "https://veterans.idaho.gov/event/coeur-dalene-vfw-889-coffee-donuts-30/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=406+N+4th+St+Coeur+d%27Alene+ID+83814",
    sourceLabel: "Idaho Division of Veterans Services",
    verifiedAt,
    note: "Open to all veterans. The official Idaho veterans calendar lists social time with coffee and breakfast treats from 8-10 AM."
  },
  {
    id: "cda-girls-soccer-sandpoint-sep1",
    title: "Coeur d'Alene Girls Soccer vs. Sandpoint",
    startsAt: "2026-09-01T16:30:00-07:00",
    venue: "Coeur d'Alene High School",
    address: cdaHighAddress,
    category: ["family", "community"],
    cost: "unknown",
    status: "unknown",
    sourceId: "school-sports",
    sourceUrl: "https://www.idahosports.com/Schools/schoolsportinfo.aspx?sid=75&sportid=16",
    directionsUrl: cdaHighDirections,
    sourceLabel: "IdahoSports · Coeur d'Alene girls soccer",
    verifiedAt,
    note: "Varsity girls soccer home match; current IdahoSports schedule lists Sandpoint at Coeur d'Alene at 4:30 PM."
  },
  {
    id: "cda-volleyball-post-falls-sep1",
    title: "Coeur d'Alene Volleyball vs. Post Falls",
    startsAt: "2026-09-01T19:00:00-07:00",
    venue: "Coeur d'Alene High School",
    address: cdaHighAddress,
    category: ["family", "community"],
    cost: "unknown",
    status: "unknown",
    sourceId: "school-sports",
    sourceUrl: "https://www.idahosports.com/schools/schoolsportinfo.aspx?sid=75&sportid=2",
    directionsUrl: cdaHighDirections,
    sourceLabel: "IdahoSports · Coeur d'Alene volleyball",
    verifiedAt,
    note: "Varsity volleyball home match; current IdahoSports schedule lists Post Falls at Coeur d'Alene at 7 PM."
  },
  {
    id: "kootenai-market-riverstone-sep2",
    title: "Kootenai County Farmers' Market · Riverstone",
    startsAt: "2026-09-02T16:00:00-07:00",
    endsAt: "2026-09-02T19:00:00-07:00",
    venue: "Main Street in Riverstone",
    address: "2151 N Main St, Coeur d'Alene, ID 83814",
    category: ["market", "family", "food-drink", "outdoors"],
    cost: "free",
    status: "available",
    sourceId: "kootenai-farmers-market",
    sourceUrl: "https://kootenaifarmersmarkets.org/events-2/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=2151+N+Main+St+Coeur+d%27Alene+ID+83814",
    sourceLabel: "Kootenai County Farmers' Markets",
    verifiedAt,
    note: "Producer-only Wednesday market with local food, artisans and live music. Official organizer calendar lists Riverstone from 4-7 PM."
  },
  {
    id: "cda-boys-soccer-lewiston-sep3",
    title: "Coeur d'Alene Boys Soccer vs. Lewiston",
    startsAt: "2026-09-03T15:30:00-07:00",
    venue: "Coeur d'Alene High School",
    address: cdaHighAddress,
    category: ["family", "community"],
    cost: "unknown",
    status: "unknown",
    sourceId: "school-sports",
    sourceUrl: "https://www.idahosports.com/Schools/schoolsportinfo.aspx?sid=75&sportid=15",
    directionsUrl: cdaHighDirections,
    sourceLabel: "IdahoSports · Coeur d'Alene boys soccer",
    verifiedAt,
    note: "Varsity boys soccer home match; current IdahoSports schedule lists Lewiston at Coeur d'Alene at 3:30 PM."
  },
  {
    id: "lake-city-girls-soccer-ridgeline-sep3",
    title: "Lake City Girls Soccer vs. Ridgeline",
    startsAt: "2026-09-03T16:30:00-07:00",
    venue: "Lake City High School",
    address: lakeCityAddress,
    category: ["family", "community"],
    cost: "unknown",
    status: "unknown",
    sourceId: "school-sports",
    sourceUrl: "https://www.idahosports.com/Schools/SchoolSportInfo.aspx?sid=76&sportid=16",
    directionsUrl: lakeCityDirections,
    sourceLabel: "IdahoSports · Lake City girls soccer",
    verifiedAt,
    note: "Varsity girls soccer home match; current IdahoSports schedule lists Ridgeline at Lake City at 4:30 PM."
  },
  {
    id: "museum-legends-leaders-sep4",
    title: "Legends and Leaders Cemetery Tour",
    startsAt: "2026-09-04T18:30:00-07:00",
    endsAt: "2026-09-04T20:00:00-07:00",
    venue: "Forest Cemetery",
    address: "1011 Government Way, Coeur d'Alene, ID 83814",
    category: ["community", "outdoors", "date-night"],
    cost: "paid",
    status: "available",
    sourceId: "museum-north-idaho",
    sourceUrl: "https://museumni.org/events/month/2026-09/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=1011+Government+Way+Coeur+d%27Alene+ID+83814",
    sourceLabel: "Museum of North Idaho",
    verifiedAt,
    note: "Official Museum of North Idaho calendar lists the Friday Legends and Leaders walking tour at Forest Cemetery from 6:30-8 PM."
  }
];
