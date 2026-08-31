import type { LocalEvent } from "./events";

const verifiedAt = "2026-08-31T10:00:00-07:00";

export const tonightAug31DeepEvents: LocalEvent[] = [
  {
    id: "monday-night-dinner-agape-aug31",
    title: "Monday Night Dinner · Agape Live Music",
    startsAt: "2026-08-31T17:30:00-07:00",
    endsAt: "2026-08-31T21:30:00-07:00",
    venue: "Monday Night Dinner · Backyard Gathering",
    address: "1037 N 3rd St, Coeur d'Alene, ID 83814",
    category: ["live-music", "food-drink", "community", "family"],
    cost: "paid",
    priceLabel: "$10 + bring a dish",
    status: "available",
    sourceId: "stayhappening",
    sourceUrl: "https://stayhappening.com/e/our-110th-monday-night-dinner-featuring-agape-for-the-music-E2ISYTPK9DG",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=1037+N+3rd+St+Coeur+d%27Alene+ID+83814",
    sourceLabel: "StayHappening",
    verifiedAt,
    note: "Community backyard dinner with Agape live music. Listing says everyone is welcome and it is kid/family friendly; attendees bring a dish plus a $10 donation."
  },
  {
    id: "austin-carruthers-stellas-aug31",
    title: "Austin Carruthers Duo Live",
    startsAt: "2026-08-31T17:30:00-07:00",
    endsAt: "2026-08-31T19:30:00-07:00",
    venue: "Stella's on the Hill",
    address: "4176 E Potlatch Hill Rd, Coeur d'Alene, ID 83814",
    category: ["live-music", "food-drink", "date-night", "outdoors"],
    cost: "unknown",
    status: "available",
    sourceId: "stayhappening",
    sourceUrl: "https://stayhappening.com/e/austin-carruthers-duo-live-at-stellas-on-the-hill-E2ISYMCJOVI",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=4176+E+Potlatch+Hill+Rd+Coeur+d%27Alene+ID+83814",
    sourceLabel: "StayHappening",
    verifiedAt,
    note: "Monday patio-style live music listing from 5:30-7:30 PM; event description says all ages are welcome."
  }
];
