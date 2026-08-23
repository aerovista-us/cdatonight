export type EchoVerseTrackPreference = {
  label: string;
  aliases: string[];
};

export const ECHOVERSE_CDA_TRACKS: EchoVerseTrackPreference[] = [
  { label: "CDA Don't Sleep", aliases: ["cda don't sleep", "cda dont sleep"] },
  { label: "Docklight Drip", aliases: ["docklight drip", "docklife drip"] },
  { label: "Thirty-Two Grand", aliases: ["thirty-two grand", "thirty two grand"] },
  {
    label: "SwampHop Worldwide (CDA Midnight)",
    aliases: ["swamphop worldwide (cda midnight)", "swamphop worldwide"]
  },
  { label: "Bass Don't Lie", aliases: ["bass don't lie", "bass dont lie"] },
  { label: "SwampHop Megahits", aliases: ["swamphop megahits"] }
];

export const ECHOVERSE_SPONSOR_URL =
  "https://aerovista.us/art_localized/booths/echoverse?utm_source=cdatonight&utm_medium=sponsored_audio&utm_campaign=cda_swamphop";
