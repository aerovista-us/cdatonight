export type EchoVerseLocalTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  src: string;
};

export const ECHOVERSE_CDA_TRACKS: EchoVerseLocalTrack[] = [
  {
    id: "docklight-drip",
    title: "Docklight Drip",
    artist: "EchoVerse Audio",
    album: "CDA SwampHop",
    src: "/audio/echoverse/docklight-drip.mp3"
  },
  {
    id: "swamphop-megahits",
    title: "SwampHop Megahits",
    artist: "EchoVerse Audio",
    album: "CDA SwampHop",
    src: "/audio/echoverse/swamphop-megahits.mp3"
  },
  {
    id: "swamphop-worldwide-cda-midnight",
    title: "SwampHop Worldwide (CDA Midnight)",
    artist: "EchoVerse Audio",
    album: "CDA SwampHop",
    src: "/audio/echoverse/swamphop-worldwide-cda-midnight.mp3"
  },
  {
    id: "bass-dont-lie",
    title: "Bass Don't Lie",
    artist: "EchoVerse Audio",
    album: "CDA SwampHop",
    src: "/audio/echoverse/bass-dont-lie.mp3"
  },
  {
    id: "thirty-two-grand",
    title: "Thirty-Two Grand",
    artist: "EchoVerse Audio",
    album: "CDA SwampHop",
    src: "/audio/echoverse/thirty-two-grand.mp3"
  }
];

export const ECHOVERSE_SPONSOR_URL =
  "https://aerovista.us/art_localized/booths/echoverse?utm_source=cdatonight&utm_medium=sponsored_audio&utm_campaign=cda_swamphop";
