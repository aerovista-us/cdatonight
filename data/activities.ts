export type ActivityDay = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export type ActivityOption = {
  id: string;
  name: string;
  address: string;
  areaLabel: string;
  schedule: Partial<Record<ActivityDay, string>>;
  priceLabel: string;
  vibe: string;
  bestFor: string;
  sourceUrl: string;
  directionsUrl: string;
  sourceLabel: string;
  verifiedAt: string;
};

const verifiedAt = "2026-08-31T06:40:00-07:00";

export const activityOptions: ActivityOption[] = [
  {
    id: "locked-in-escape-rooms",
    name: "Locked In Escape Rooms",
    address: "2504 N 4th St, Coeur d'Alene, ID 83815",
    areaLabel: "Coeur d'Alene",
    schedule: {
      Sun: "By booking · last booking 8:30 PM",
      Mon: "By booking · last booking 8:30 PM",
      Tue: "By booking · last booking 8:30 PM",
      Wed: "By booking · last booking 8:30 PM",
      Thu: "By booking · last booking 8:30 PM",
      Fri: "By booking · last booking 8:30 PM",
      Sat: "11 AM–9:30 PM · walk-ins subject to availability"
    },
    priceLabel: "Book a room",
    vibe: "Immersive 60–75 minute puzzle adventures with private-group bookings.",
    bestFor: "Date night, families, small groups and a weather-proof plan.",
    sourceUrl: "https://www.escapelockedin.com/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=2504+N+4th+St+Coeur+d%27Alene+ID+83815",
    sourceLabel: "Locked In Escape Rooms",
    verifiedAt
  },
  {
    id: "sunset-bowling",
    name: "Sunset Bowling Center",
    address: "202 W Sunset Ave, Coeur d'Alene, ID 83815",
    areaLabel: "Coeur d'Alene",
    schedule: {
      Mon: "Noon–midnight · Night Madness 9 PM",
      Tue: "Noon–midnight · Night Madness 9 PM",
      Wed: "Noon–midnight · Thunder Extreme 10 PM",
      Thu: "Noon–midnight · Night Madness 9 PM",
      Fri: "Noon–1 AM · Thunder Extreme 3:30 PM + 10 PM",
      Sat: "Noon–1 AM · Thunder Extreme 10 PM"
    },
    priceLabel: "From $0.99/game specials",
    vibe: "24-lane local bowling center with late-night black-light and discount sessions.",
    bestFor: "A low-planning group activity, families or something to do late.",
    sourceUrl: "https://sunsetbowling.net/About",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=202+W+Sunset+Ave+Coeur+d%27Alene+ID+83815",
    sourceLabel: "Sunset Bowling Center",
    verifiedAt
  },
  {
    id: "blue-shell",
    name: "The Blue Shell",
    address: "1903 E Sherman Ave, Coeur d'Alene, ID 83814",
    areaLabel: "Coeur d'Alene",
    schedule: {
      Sun: "1 PM–midnight",
      Mon: "4 PM–midnight",
      Tue: "4 PM–midnight",
      Wed: "4 PM–midnight",
      Thu: "4 PM–midnight",
      Fri: "4 PM–2 AM",
      Sat: "1 PM–2 AM"
    },
    priceLabel: "Games + drinks",
    vibe: "Gaming bar with tabletop play, Magic events and a relaxed nerd-culture hangout.",
    bestFor: "Board/card games, casual groups and an alternative to a standard bar night.",
    sourceUrl: "https://theblueshellcda.com/events",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=1903+E+Sherman+Ave+Coeur+d%27Alene+ID+83814",
    sourceLabel: "The Blue Shell",
    verifiedAt
  },
  {
    id: "axe-force-one",
    name: "Axe Force One",
    address: "1207 N 4th St, Coeur d'Alene, ID 83814",
    areaLabel: "Coeur d'Alene",
    schedule: {
      Sun: "1–6 PM",
      Mon: "Groups of 6+ by online booking",
      Tue: "Groups of 6+ by online booking",
      Wed: "4–9 PM",
      Thu: "4–9 PM",
      Fri: "4–10 PM",
      Sat: "1–11 PM"
    },
    priceLabel: "$25 first hour",
    vibe: "Coached axe throwing plus stars, cards, knives and structured throwing games.",
    bestFor: "Something active, competitive and different from dinner or drinks.",
    sourceUrl: "https://www.axeforceone.com/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=1207+N+4th+St+Coeur+d%27Alene+ID+83814",
    sourceLabel: "Axe Force One",
    verifiedAt
  },
  {
    id: "coeur-climbing",
    name: "Coeur Climbing Company",
    address: "764 S Clearwater Loop, Suite 101, Post Falls, ID 83854",
    areaLabel: "Post Falls · nearby",
    schedule: {
      Sun: "11 AM–7 PM",
      Mon: "10 AM–10 PM public hours",
      Tue: "10 AM–10 PM",
      Wed: "10 AM–10 PM public hours",
      Thu: "10 AM–10 PM",
      Fri: "10 AM–10 PM",
      Sat: "10 AM–7 PM"
    },
    priceLabel: "Day passes available",
    vibe: "Full-service indoor climbing with bouldering, ropes, auto belays, fitness and a kids area.",
    bestFor: "An active all-ages option; especially useful when weather kills outdoor plans.",
    sourceUrl: "https://coeurclimbing.com/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=764+S+Clearwater+Loop+Post+Falls+ID+83854",
    sourceLabel: "Coeur Climbing Company",
    verifiedAt
  },
  {
    id: "triple-play-hayden",
    name: "Triple Play Family Fun Park + Raptor Reef",
    address: "175 W Orchard Ave, Hayden, ID 83835",
    areaLabel: "Hayden · nearby",
    schedule: {
      Sun: "10 AM–10 PM",
      Mon: "10 AM–10 PM",
      Tue: "10 AM–10 PM",
      Wed: "10 AM–10 PM",
      Thu: "10 AM–10 PM",
      Fri: "Fun Park 10 AM–11 PM · waterpark to 10 PM",
      Sat: "Fun Park 10 AM–11 PM · waterpark to 10 PM"
    },
    priceLabel: "Passes + à la carte",
    vibe: "Bowling, laser tag, mini golf, go-karts, ropes course, arcade and an indoor waterpark in one stop.",
    bestFor: "Families, mixed-age groups and an easy all-day or late-afternoon fallback about 15 minutes north of CDA.",
    sourceUrl: "https://www.3play.com/visit/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=175+W+Orchard+Ave+Hayden+ID+83835",
    sourceLabel: "Triple Play Family Fun Park",
    verifiedAt
  }
];

export function activitiesForDay(day: ActivityDay) {
  return activityOptions.filter((activity) => activity.schedule[day]);
}
