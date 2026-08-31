import type { LocalEvent } from "./events";

const verifiedAt = "2026-08-31T10:08:00-07:00";
const liteFeetAddress = "4029 W Riverbend Ave, Post Falls, ID 83854";
const liteFeetDirections = "https://www.google.com/maps/search/?api=1&query=4029+W+Riverbend+Ave+Post+Falls+ID+83854";

export const weekAug31Sep4RecurringEvents: LocalEvent[] = [
  {
    id: "litefeet-fundamental-monday-aug31",
    title: "Fundamental Monday Dance Lessons + Social",
    startsAt: "2026-08-31T18:00:00-07:00",
    endsAt: "2026-08-31T22:00:00-07:00",
    venue: "LiteFeet Dance Hive Studio",
    address: liteFeetAddress,
    category: ["community", "date-night"],
    cost: "paid",
    priceLabel: "$15",
    status: "available",
    sourceId: "litefeet",
    sourceUrl: "https://mylitefeet.com/calendar/month/2026-08/",
    directionsUrl: liteFeetDirections,
    sourceLabel: "LiteFeet Dance",
    verifiedAt,
    note: "Monday dance lessons and social focused on dips, tricks and swing-dance concepts to rock music; official calendar lists 6-10 PM and $15."
  },
  {
    id: "idaho-labor-computer-job-search-sep1",
    title: "Basic Computer Skills + Maximize Your Job Search",
    startsAt: "2026-09-01T10:00:00-07:00",
    endsAt: "2026-09-01T11:00:00-07:00",
    venue: "Idaho Department of Labor · Post Falls",
    address: "600 N Thornton St, Post Falls, ID 83854",
    category: ["community"],
    cost: "unknown",
    status: "available",
    sourceId: "idaho-labor",
    sourceUrl: "https://www.labor.idaho.gov/event/basic-computer-skills-and-maximize-your-job-search-post-falls-10/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=600+N+Thornton+St+Post+Falls+ID+83854",
    sourceLabel: "Idaho Department of Labor",
    verifiedAt,
    note: "Public workshop covering basic computer skills, online applications, employment documents and practical job-search tools. No previous computer experience required."
  },
  {
    id: "litefeet-line-dance-sep1",
    title: "Line Dancing Lessons + Social",
    startsAt: "2026-09-01T18:00:00-07:00",
    endsAt: "2026-09-01T22:00:00-07:00",
    venue: "LiteFeet Dance Hive Studio",
    address: liteFeetAddress,
    category: ["community", "date-night"],
    cost: "paid",
    priceLabel: "$15",
    status: "available",
    sourceId: "litefeet",
    sourceUrl: "https://mylitefeet.com/classes/",
    directionsUrl: liteFeetDirections,
    sourceLabel: "LiteFeet Dance",
    verifiedAt,
    note: "Tuesday line-dancing lessons and social from 6-10 PM with beginner and intermediate instruction; official calendar lists $15."
  },
  {
    id: "cda-taphouse-trivia-sep1",
    title: "Tuesday Night Trivia",
    startsAt: "2026-09-01T18:00:00-07:00",
    endsAt: "2026-09-01T20:00:00-07:00",
    venue: "CDA Taphouse",
    address: "210 E Sherman Ave, Coeur d'Alene, ID 83814",
    category: ["nightlife", "food-drink", "community", "date-night"],
    cost: "free",
    status: "available",
    sourceId: "cda-taphouse",
    sourceUrl: "https://www.cdataphouse.com/events/",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=210+E+Sherman+Ave+Coeur+d%27Alene+ID+83814",
    sourceLabel: "CDA Taphouse",
    verifiedAt,
    note: "Free Tuesday trivia hosted by Third Degree Entertainment. Official venue page lists five rounds and prizes for the top two teams."
  },
  {
    id: "litefeet-west-coast-swing-sep2",
    title: "West Coast Swing Lessons + Social",
    startsAt: "2026-09-02T18:00:00-07:00",
    endsAt: "2026-09-02T22:00:00-07:00",
    venue: "LiteFeet Dance Hive Studio",
    address: liteFeetAddress,
    category: ["community", "date-night"],
    cost: "unknown",
    status: "available",
    sourceId: "litefeet",
    sourceUrl: "https://mylitefeet.com/calendar/",
    directionsUrl: liteFeetDirections,
    sourceLabel: "LiteFeet Dance",
    verifiedAt,
    note: "Wednesday West Coast Swing lessons and social. Official calendar lists a 6-10 PM block and describes it as suitable for beginners through improving dancers."
  }
];
