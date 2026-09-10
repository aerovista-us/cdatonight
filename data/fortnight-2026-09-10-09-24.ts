import type { LocalEvent } from "./events";

const verifiedAt = "2026-09-10T13:09:00-07:00";
const dates = ["2026-09-10", "2026-09-11", "2026-09-12", "2026-09-13", "2026-09-14", "2026-09-15", "2026-09-16", "2026-09-17", "2026-09-18", "2026-09-19", "2026-09-20", "2026-09-21", "2026-09-22", "2026-09-23", "2026-09-24"];
const dinnerDates = ["2026-09-10", "2026-09-14", "2026-09-15", "2026-09-16", "2026-09-17", "2026-09-18", "2026-09-19", "2026-09-20", "2026-09-21", "2026-09-22", "2026-09-23", "2026-09-24"];

type SourceDef = {
  sourceId: LocalEvent["sourceId"];
  sourceUrl: string;
  sourceLabel: string;
  venue: string;
  address: string;
};

const sources = {
  pinot: {
    sourceId: "pinots-cda",
    sourceUrl: "https://www.pinotspalette.com/cda/events",
    sourceLabel: "Pinot's Palette Coeur d'Alene",
    venue: "Pinot's Palette Coeur d'Alene",
    address: "728 N 4th St, Coeur d'Alene, ID 83814"
  },
  cruise: {
    sourceId: "cda-cruises",
    sourceUrl: "https://tickets.cdacruises.com/?tab=list",
    sourceLabel: "Lake Coeur d'Alene Cruises",
    venue: "Lake Coeur d'Alene Cruises",
    address: "115 S 2nd St, Coeur d'Alene, ID 83814"
  },
  litefeet: {
    sourceId: "litefeet",
    sourceUrl: "https://mylitefeet.com/calendar/",
    sourceLabel: "LiteFeet Dance",
    venue: "LiteFeet Dance Hive Studio",
    address: "4029 W Riverbend Ave, Post Falls, ID 83854"
  },
  taphouse: {
    sourceId: "cda-taphouse",
    sourceUrl: "https://www.cdataphouse.com/events/",
    sourceLabel: "CDA Taphouse",
    venue: "CDA Taphouse",
    address: "210 E Sherman Ave, Coeur d'Alene, ID 83814"
  },
  visit: {
    sourceId: "visit-cda",
    sourceUrl: "https://coeurdalene.org/events/",
    sourceLabel: "Visit Coeur d'Alene",
    venue: "Coeur d'Alene",
    address: "Coeur d'Alene, ID 83814"
  },
  casino: {
    sourceId: "cda-casino",
    sourceUrl: "https://www.cdacasino.com/events/",
    sourceLabel: "Coeur d'Alene Casino Resort Hotel",
    venue: "Coeur d'Alene Casino Resort Hotel",
    address: "37914 S Nukwalqw Rd, Worley, ID 83876"
  },
  farmers: {
    sourceId: "kootenai-farmers",
    sourceUrl: "https://kootenaifarmersmarkets.org/events-2/",
    sourceLabel: "Kootenai County Farmers' Markets",
    venue: "Kootenai County Farmers' Market",
    address: "Coeur d'Alene, ID"
  },
  recovery: {
    sourceId: "recovery-208",
    sourceUrl: "https://208recovery.org/events",
    sourceLabel: "208 Recovery",
    venue: "Coeur d'Alene City Park",
    address: "415 W Mullan Rd, Coeur d'Alene, ID 83814"
  },
  downtown: {
    sourceId: "downtown-cda",
    sourceUrl: "https://cdadowntown.com/cda-events/oktoberfest/",
    sourceLabel: "Coeur d'Alene Downtown Association",
    venue: "Downtown Coeur d'Alene",
    address: "210 E Sherman Ave, Coeur d'Alene, ID 83814"
  }
} satisfies Record<string, SourceDef>;

type SourceKey = keyof typeof sources;
type Row = [
  title: string,
  day: string,
  start: string,
  end: string,
  source: SourceKey,
  category: LocalEvent["category"],
  cost: LocalEvent["cost"],
  priceLabel?: string,
  note?: string,
  venue?: string,
  address?: string,
  sourceUrl?: string
];

function slug(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 64);
}

function make(row: Row): LocalEvent {
  const [title, day, start, end, key, category, cost, priceLabel, note, venue, address, sourceUrl] = row;
  const source = sources[key];
  const finalAddress = address || source.address;
  return {
    id: `f14-${day}-${slug(title)}`,
    title,
    startsAt: `${day}T${start}:00-07:00`,
    endsAt: `${day}T${end}:00-07:00`,
    venue: venue || source.venue,
    address: finalAddress,
    category,
    cost,
    ...(priceLabel ? { priceLabel } : {}),
    status: "available",
    sourceId: source.sourceId,
    sourceUrl: sourceUrl || source.sourceUrl,
    directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(finalAddress)}`,
    sourceLabel: source.sourceLabel,
    verifiedAt,
    note: note || `Verified from ${source.sourceLabel} on September 10.`
  };
}

const pinotSchedule: Array<[string, string, string, string, string]> = [
  ["2026-09-10", "Paint Night · Moonlit Marigolds", "19:00", "21:15", "$39"],
  ["2026-09-11", "Paint Night · Follow the Yellow Brick Road · Themed Night", "19:30", "21:30", "$39"],
  ["2026-09-12", "Paint Night · Klimt Style Dragonfly", "19:00", "21:30", "$41"],
  ["2026-09-13", "Paint Night · An Enchanted Lotus", "15:00", "17:15", "$39"],
  ["2026-09-14", "Open Studio Painting", "13:00", "16:00", "$21"],
  ["2026-09-15", "Paint Night · Sunset Stream", "18:30", "20:30", "$37"],
  ["2026-09-16", "Paint Night · Lavender Moonlight", "19:30", "21:45", "$39"],
  ["2026-09-17", "Paint Night · Glow River", "19:00", "21:00", "$37"],
  ["2026-09-18", "Paint Night · Monet's Water Lilies at Sunset · Partner Painting", "19:00", "21:30", "$41"],
  ["2026-09-19", "Paint Night · Exclusive Verity Experience · Secrets on Still Water", "19:00", "21:15", "$41"],
  ["2026-09-20", "Paint Night · Monet's Misty Meadow", "16:00", "18:30", "$41"],
  ["2026-09-21", "Open Studio Painting", "13:00", "16:00", "$21"],
  ["2026-09-22", "Paint Night · Firefly Friends", "18:30", "20:30", "$37"],
  ["2026-09-23", "Paint Night · Autumn Moonlight Delight", "18:30", "20:30", "$37"],
  ["2026-09-24", "Paint Night · Rhinestone Queen · Dolly Celebration", "19:00", "21:30", "$41"]
];

const liteFeetSchedule: Array<[string, string, string, string, string | undefined]> = [
  ["2026-09-10", "No Limits Dance", "18:00", "23:00", undefined],
  ["2026-09-11", "Wanderlust College Nights", "18:00", "22:00", "$15 · $5 with student ID"],
  ["2026-09-12", "Drop in Like It's Hot · Dance Lesson + Social", "19:00", "23:00", undefined],
  ["2026-09-14", "Fundamental Monday Dance Lessons + Social", "18:00", "22:00", "$15"],
  ["2026-09-15", "Adrenaline + Dance Uplifted · Line Dancing", "18:00", "22:00", undefined],
  ["2026-09-16", "West Coast Swing Lessons + Social", "18:00", "22:00", undefined],
  ["2026-09-17", "No Limits Dance", "18:00", "23:00", undefined],
  ["2026-09-18", "Wanderlust College Nights", "18:00", "22:00", "$15 · $5 with student ID"],
  ["2026-09-19", "Drop in Like It's Hot · Dance Lesson + Social", "19:00", "23:00", undefined],
  ["2026-09-21", "Fundamental Monday Dance Lessons + Social", "18:00", "22:00", "$15"],
  ["2026-09-22", "Adrenaline + Dance Uplifted · Line Dancing", "18:00", "22:00", undefined],
  ["2026-09-23", "West Coast Swing Lessons + Social", "18:00", "22:00", undefined],
  ["2026-09-24", "No Limits Dance", "18:00", "23:00", undefined]
];

const pinotEvents = pinotSchedule.map(([day, title, start, end, price]) =>
  make([title, day, start, end, "pinot", ["community", "date-night"], "paid", price, "Current official studio calendar listing; booking is open on the source page."])
);

const scenicCruises = dates.map((day) =>
  make(["Daily 90-Minute Scenic Cruise · 2:30 PM", day, "14:30", "16:00", "cruise", ["cruise", "outdoors", "family", "date-night"], "paid", undefined, "Official ticket calendar lists the 2:30 PM narrated 90-minute scenic cruise as available."])
);

const dinnerCruises = dinnerDates.map((day) =>
  make(["Sunset Dinner Cruise", day, "18:00", "20:00", "cruise", ["cruise", "food-drink", "date-night"], "paid", undefined, "Official ticket calendar lists this two-hour dinner cruise; Sep. 11–13 sold-out calendar sailings are intentionally excluded.", "Lake Coeur d'Alene Cruises · Independence Point", "Independence Point, Coeur d'Alene, ID 83814"])
);

const liteFeetEvents = liteFeetSchedule.map(([day, title, start, end, price]) =>
  make([title, day, start, end, "litefeet", ["community", "date-night"], price ? "paid" : "unknown", price, "Current official LiteFeet September calendar listing."])
);

const hoppyHour = dates.map((day) =>
  make(["Hoppy Hour · Daily Food + Drink Special", day, "15:00", "17:00", "taphouse", ["food-drink", "nightlife", "date-night"], "paid", "50% off small plates · drinks from $3", "Official daily special: 50% off small plates, $3 domestic drafts, $5 craft drafts, $14 pitchers and $7 well cocktails."])
);

const trivia = ["2026-09-15", "2026-09-22"].map((day) =>
  make(["Tuesday Night Trivia", day, "18:00", "20:00", "taphouse", ["nightlife", "food-drink", "community", "date-night"], "free", "Free", "Free five-round Tuesday trivia with Third Degree Entertainment; prizes for the top two teams."])
);

const researchedExtras: Row[] = [
  ["Fort Sherman Chapel · Explore the Artifacts", "2026-09-10", "11:00", "15:00", "visit", ["family", "community"], "unknown", undefined, "Artifacts and stories from Fort Sherman's past.", "Fort Sherman Chapel", "332 Hubbard St, Coeur d'Alene, ID 83814", "https://coeurdalene.org/events/fort-sherman-chapel-explore-the-artifacts-of-fort-shermans-past/2026-09-10/"],
  ["Spokane River Cruise", "2026-09-10", "11:00", "14:00", "cruise", ["cruise", "outdoors", "date-night"], "paid", undefined, "Official ticket list shows this three-hour round-trip Spokane River cruise as available."],
  ["Touchdown Thursday · Game-Day Specials + Karaoke", "2026-09-10", "17:00", "23:59", "casino", ["food-drink", "nightlife"], "unknown", undefined, "Game-day offers run 5–9 PM; Night Hawk Lounge karaoke follows 9 PM–midnight. 18+ casino property; alcohol service is 21+.", undefined, undefined, "https://www.cdacasino.com/events/category/casino-promo/"],
  ["2nd Friday ArtWalk", "2026-09-11", "17:00", "20:00", "visit", ["community", "live-music", "date-night"], "free", "Free", "Free downtown ArtWalk with gallery openings, pop-up art, live music, shopping and local hospitality.", "Downtown Coeur d'Alene", "Downtown Coeur d'Alene, ID 83814", "https://coeurdalene.org/events/2nd-friday-artwalk/2026-09-11/"],
  ["Nick Wiebe · Live at Chinook Lounge", "2026-09-11", "18:00", "21:00", "casino", ["live-music", "nightlife", "date-night"], "unknown", undefined, "Official venue listing for North Idaho solo acoustic act Nick Wiebe.", "Coeur d'Alene Casino Resort Hotel · Chinook Lounge", undefined, "https://www.cdacasino.com/event/nick-wiebe-7/2026-09-11/"],
  ["Kootenai County Farmers' Market · Rusty Jackson Live", "2026-09-12", "09:00", "13:30", "farmers", ["market", "family", "outdoors", "live-music"], "free", "Free", "Official Saturday market schedule; the 2026 music calendar lists Rusty Jackson.", "Saturday Market at Prairie & Hwy 95", "Prairie Ave & US-95, Hayden, ID 83835"],
  ["2nd Annual 208 Recovery Celebration", "2026-09-12", "12:00", "16:00", "recovery", ["community", "family", "live-music", "outdoors"], "free", "Free", "Community celebration with food, music, resources, connection and remembrance."],
  ["Riverstone Block Party & Brewfest", "2026-09-12", "13:00", "18:00", "visit", ["community", "family", "live-music", "food-drink", "outdoors"], "free", "Free · brewfest extra", "Free family street fair with 50+ local vendors, live music, food trucks and kids' activities; brewfest tickets are separate.", "Main Street in Riverstone", "2151 N Main St, Coeur d'Alene, ID 83814"],
  ["Nick Wiebe · Live at Chinook Lounge", "2026-09-12", "18:00", "21:00", "casino", ["live-music", "nightlife", "date-night"], "unknown", undefined, "Official venue listing for North Idaho solo acoustic act Nick Wiebe.", "Coeur d'Alene Casino Resort Hotel · Chinook Lounge", undefined, "https://www.cdacasino.com/event/nick-wiebe-7/2026-09-12/"],
  ["CDA Flea Market", "2026-09-13", "10:00", "15:00", "visit", ["market", "family", "outdoors", "community", "live-music"], "unknown", undefined, "55+ curated vendors, vintage finds, handmade goods, small-batch eats and family-friendly live music.", "Museum of North Idaho", "720 E Young Ave, Coeur d'Alene, ID 83814", "https://coeurdalene.org/events/%E2%8B%86%CB%9A%EA%A9%9C%EF%BD%A1cda-flea-market-2026%E2%8B%86%CB%9A%EA%A9%9C%EF%BD%A1/2026-09-13/"],
  ["Kootenai County Farmers' Market · Dallas Kay Live", "2026-09-16", "16:00", "19:00", "farmers", ["market", "family", "outdoors", "live-music"], "free", "Free", "Official market schedule; the 2026 music calendar lists Dallas Kay.", "Wednesday Market at Riverstone", "Riverstone, Coeur d'Alene, ID 83814"],
  ["Gems & Jeans 2026", "2026-09-17", "16:30", "20:00", "visit", ["community", "food-drink", "live-music"], "paid", "$75", "Specialized Needs Recreation fundraiser with live music, dinner, live and silent auctions and raffles.", "Cherry Hill Park", "1718 N 15th St, Coeur d'Alene, ID 83814", "https://coeurdalene.org/events/gems-and-jeans-fundraiser-to-benefit-specialized-needs-recreation/"],
  ["Touchdown Thursday · Game-Day Specials + Karaoke", "2026-09-17", "17:00", "23:59", "casino", ["food-drink", "nightlife"], "unknown", undefined, "Recurring Thursday game-day offers 5–9 PM, followed by karaoke 9 PM–midnight. 18+ casino property; alcohol service is 21+.", undefined, undefined, "https://www.cdacasino.com/events/category/casino-promo/"],
  ["Whiskey Barrel Weekend 2026 · Opening Day", "2026-09-18", "15:00", "23:59", "visit", ["food-drink", "date-night"], "paid", undefined, "Opening day of the Sep. 18–20 lakeside whiskey weekend with culinary experiences, masterclasses and tastings; 21+ for alcohol events.", "The Coeur d'Alene Resort", "115 S 2nd St, Coeur d'Alene, ID 83814", "https://coeurdalene.org/events/whiskey-barrel-weekend-2026/"],
  ["Downtown Coeur d'Alene Oktoberfest · Friday", "2026-09-18", "16:00", "20:00", "downtown", ["food-drink", "live-music", "nightlife", "date-night"], "paid", "$40+", "Friday tasting session with 30+ beer/cider options, German-inspired food specials and live music. 21+ for tasting tickets."],
  ["Oktoberfest Beer & Dinner Cruise · 4:30 PM", "2026-09-18", "16:30", "18:00", "cruise", ["cruise", "food-drink", "nightlife", "date-night"], "paid", undefined, "Official ticket list shows this German buffet and beer-themed cruise as available. 21+ only; ID required."],
  ["Kosh · Live at Chinook Lounge", "2026-09-18", "18:00", "21:30", "casino", ["live-music", "nightlife", "date-night"], "unknown", undefined, "Official Chinook Lounge calendar lists Kosh from 6–9:30 PM.", "Coeur d'Alene Casino Resort Hotel · Chinook Lounge", undefined, "https://www.cdacasino.com/events/category/dining/chinook/"],
  ["Kootenai County Farmers' Market · Bill Bozly Live", "2026-09-19", "09:00", "13:30", "farmers", ["market", "family", "outdoors", "live-music"], "free", "Free", "Official market schedule; the 2026 music calendar lists Bill Bozly.", "Saturday Market at Prairie & Hwy 95", "Prairie Ave & US-95, Hayden, ID 83835"],
  ["Downtown Coeur d'Alene Oktoberfest · Saturday", "2026-09-19", "12:00", "20:00", "downtown", ["food-drink", "live-music", "nightlife", "date-night"], "paid", "$40+", "Saturday runs noon–8 PM with tastings, live music, stein-holding competitions and a best-dressed contest. 21+ for tasting tickets."],
  ["Greg Warren · Comedy", "2026-09-19", "18:00", "20:00", "visit", ["community", "date-night"], "paid", undefined, "Stand-up comedian Greg Warren at the Kroc from 6–8 PM.", "Midge & Pepper Smock Family Theatre at the Kroc", "1765 W Golf Course Rd, Coeur d'Alene, ID 83815"],
  ["St Joe River Cruise", "2026-09-20", "11:30", "17:30", "cruise", ["cruise", "outdoors", "date-night"], "paid", undefined, "Six-hour round trip across Lake Coeur d'Alene and about 10 miles up the St. Joe River; official ticket list shows available."],
  ["Kootenai County Farmers' Market · Daniel Hall Live", "2026-09-23", "16:00", "19:00", "farmers", ["market", "family", "outdoors", "live-music"], "free", "Free", "Official market schedule; the 2026 music calendar lists Daniel Hall.", "Wednesday Market at Riverstone", "Riverstone, Coeur d'Alene, ID 83814"],
  ["Walk Circling Raven + Learn Coeur d'Alene Tribal History", "2026-09-24", "07:00", "08:00", "casino", ["outdoors", "community"], "unknown", undefined, "Official venue calendar lists a one-hour Circling Raven walk focused on Coeur d'Alene Tribal history.", undefined, undefined, "https://www.cdacasino.com/events/month/"],
  ["Touchdown Thursday · Game-Day Specials + Karaoke", "2026-09-24", "17:00", "23:59", "casino", ["food-drink", "nightlife"], "unknown", undefined, "Recurring Thursday game-day offers 5–9 PM, followed by karaoke 9 PM–midnight. 18+ casino property; alcohol service is 21+.", undefined, undefined, "https://www.cdacasino.com/events/category/casino-promo/"]
];

export const fortnightSep10Sep24Events: LocalEvent[] = [
  ...pinotEvents,
  ...scenicCruises,
  ...dinnerCruises,
  ...liteFeetEvents,
  ...hoppyHour,
  ...trivia,
  ...researchedExtras.map(make)
].sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
