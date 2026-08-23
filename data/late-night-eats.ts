export type LateNightDay = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type LateNightEat = {
  id: string;
  name: string;
  address: string;
  food: string;
  bestFor: string;
  serviceMode: string;
  sourceUrl: string;
  sourceLabel: string;
  directionsUrl: string;
  verifiedAt: string;
  hours: Record<LateNightDay, string | null>;
  closeOrder: Record<LateNightDay, number>;
  note?: string;
};

const verifiedAt = "2026-08-22T17:52:00-07:00";

export const lateNightEats: LateNightEat[] = [
  {
    id: "jack-in-the-box-ironwood",
    name: "Jack in the Box · Ironwood",
    address: "196 Ironwood Dr, Coeur d'Alene, ID 83814",
    food: "Burgers · tacos · fries · late-night combos",
    bestFor: "The fallback when almost everything else is done for the night.",
    serviceMode: "24-hour drive-thru",
    sourceUrl: "https://locations.jackinthebox.com/us/id/coeur-d-alene/196-ironwood-dr",
    sourceLabel: "Jack in the Box · official location",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=196+Ironwood+Dr+Coeur+d%27Alene+ID+83814",
    verifiedAt,
    hours: {
      sun: "Drive-thru 24 hours",
      mon: "Drive-thru 24 hours",
      tue: "Drive-thru 24 hours",
      wed: "Drive-thru 24 hours",
      thu: "Drive-thru 24 hours",
      fri: "Drive-thru 24 hours",
      sat: "Drive-thru 24 hours"
    },
    closeOrder: { sun: 2880, mon: 2880, tue: 2880, wed: 2880, thu: 2880, fri: 2880, sat: 2880 },
    note: "Lobby closes earlier; this lane is specifically the drive-thru."
  },
  {
    id: "atilanos-appleway",
    name: "Atilano's Mexican Food",
    address: "218 E Appleway Ave, Coeur d'Alene, ID 83814",
    food: "Burritos · tacos · carne asada fries · breakfast burritos",
    bestFor: "Big post-bar burrito energy without pretending it is fine dining.",
    serviceMode: "Drive-thru + takeout",
    sourceUrl: "https://www.atilanosmexicanfood.com/",
    sourceLabel: "Atilano's · official site / current location hours",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=218+E+Appleway+Ave+Coeur+d%27Alene+ID+83814",
    verifiedAt,
    hours: {
      sun: "7 AM–3 AM",
      mon: "6 AM–3 AM",
      tue: "6 AM–3 AM",
      wed: "6 AM–3 AM",
      thu: "6 AM–4 AM",
      fri: "6 AM–4 AM",
      sat: "6 AM–4 AM"
    },
    closeOrder: { sun: 1620, mon: 1620, tue: 1620, wed: 1620, thu: 1680, fri: 1680, sat: 1680 }
  },
  {
    id: "pita-pit-sherman",
    name: "Pita Pit · Downtown",
    address: "320 Sherman Ave, Coeur d'Alene, ID 83814",
    food: "Pitas · bowls · falafel · grilled chicken",
    bestFor: "A lighter downtown option when pizza and burgers feel like too much.",
    serviceMode: "Walk-in + takeout",
    sourceUrl: "https://locations.pitapitusa.com/locations/id/coeur-d%27alene/320-sherman-ave",
    sourceLabel: "Pita Pit · official location",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=320+Sherman+Ave+Coeur+d%27Alene+ID+83814",
    verifiedAt,
    hours: {
      sun: "10 AM–9 PM",
      mon: "10 AM–10 PM",
      tue: "10 AM–10 PM",
      wed: "10 AM–10 PM",
      thu: "10 AM–10 PM",
      fri: "10 AM–3 AM",
      sat: "10 AM–3 AM"
    },
    closeOrder: { sun: 1260, mon: 1320, tue: 1320, wed: 1320, thu: 1320, fri: 1620, sat: 1620 }
  },
  {
    id: "paddys-sports-bar",
    name: "Paddy's Sports Bar",
    address: "601 W Appleway Ave, Coeur d'Alene, ID 83814",
    food: "Pub food · burgers · sandwiches · game-night food",
    bestFor: "Sit-down food, screens and a less downtown-crowded late stop.",
    serviceMode: "Bar + restaurant",
    sourceUrl: "https://www.paddyssportsbar.com/",
    sourceLabel: "Paddy's Sports Bar · official site",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=601+W+Appleway+Ave+Coeur+d%27Alene+ID+83814",
    verifiedAt,
    hours: {
      sun: "9 AM–12 AM",
      mon: "11 AM–12 AM",
      tue: "11 AM–12 AM",
      wed: "11 AM–12 AM",
      thu: "11 AM–12 AM",
      fri: "11 AM–2 AM",
      sat: "11 AM–2 AM"
    },
    closeOrder: { sun: 1440, mon: 1440, tue: 1440, wed: 1440, thu: 1440, fri: 1560, sat: 1560 },
    note: "Venue hours are confirmed; late kitchen cutoff can vary, so verify if arriving near close."
  },
  {
    id: "raising-canes-neider",
    name: "Raising Cane's",
    address: "163 W Neider Ave, Coeur d'Alene, ID 83815",
    food: "Chicken fingers · fries · toast · drive-thru",
    bestFor: "Fast, predictable and easy for a group that just wants food now.",
    serviceMode: "Dine-in + drive-thru",
    sourceUrl: "https://locations.raisingcanes.com/id/coeur-dalene/163-w.-neider-avenue",
    sourceLabel: "Raising Cane's · official location",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=163+W+Neider+Ave+Coeur+d%27Alene+ID+83815",
    verifiedAt,
    hours: {
      sun: "10 AM–1 AM",
      mon: "10 AM–1 AM",
      tue: "10 AM–1 AM",
      wed: "10 AM–1 AM",
      thu: "10 AM–1 AM",
      fri: "10 AM–2 AM",
      sat: "10 AM–2 AM"
    },
    closeOrder: { sun: 1500, mon: 1500, tue: 1500, wed: 1500, thu: 1500, fri: 1560, sat: 1560 }
  },
  {
    id: "treehouse-cda",
    name: "TreeHouse CDA",
    address: "314 N 4th St, Coeur d'Alene, ID 83814",
    food: "Smash burgers · wings · fries · shareables",
    bestFor: "Keep the night going downtown without switching to fast food yet.",
    serviceMode: "Bar + grill",
    sourceUrl: "https://www.thetreehousecda.com/contacts.html",
    sourceLabel: "TreeHouse CDA · official site",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=314+N+4th+St+Coeur+d%27Alene+ID+83814",
    verifiedAt,
    hours: {
      sun: "10 AM–10 PM",
      mon: "11 AM–10 PM",
      tue: null,
      wed: "11 AM–11 PM",
      thu: "11 AM–11 PM",
      fri: "11 AM–1:30 AM",
      sat: "10 AM–1:30 AM"
    },
    closeOrder: { sun: 1320, mon: 1320, tue: 0, wed: 1380, thu: 1380, fri: 1530, sat: 1530 },
    note: "Venue and food menu are confirmed; kitchen cutoff can be earlier than bar close."
  }
];
