import { NextResponse } from "next/server";
import { ECHOVERSE_CDA_TRACKS, ECHOVERSE_SPONSOR_URL } from "@/data/echoverse-player";

export const runtime = "nodejs";
export const revalidate = 900;

type CatalogTrack = {
  track_id?: string;
  track?: string;
  title?: string;
  artist?: string;
  album?: string;
  media_url?: string;
};

type CatalogPayload = {
  tracks?: CatalogTrack[];
};

function normalize(value = "") {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[’‘]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9']+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function publicTrack(track: CatalogTrack, apiUrl: string) {
  const title = track.track || track.title || "Untitled";
  const mediaPath = track.media_url || (track.track_id ? `/api/audio/${track.track_id}` : "");
  if (!track.track_id || !mediaPath) return null;

  return {
    id: track.track_id,
    title,
    artist: track.artist || "EchoVerse Audio",
    album: track.album || "CDA SwampHop",
    src: new URL(mediaPath, new URL(apiUrl).origin).toString()
  };
}

export async function GET() {
  const apiUrl = process.env.ECHOVERSE_MUSIC_API || "https://music.aerovista.us/api/catalog";

  try {
    const response = await fetch(apiUrl, {
      headers: { accept: "application/json" },
      next: { revalidate: 900 }
    });

    if (!response.ok) throw new Error(`EchoVerse catalog HTTP ${response.status}`);

    const payload = (await response.json()) as CatalogPayload;
    const catalog = Array.isArray(payload.tracks) ? payload.tracks : [];
    const selected: CatalogTrack[] = [];
    const usedIds = new Set<string>();

    for (const preference of ECHOVERSE_CDA_TRACKS) {
      const aliases = preference.aliases.map(normalize);
      const match = catalog.find((track) => {
        if (!track.track_id || usedIds.has(track.track_id)) return false;
        const title = normalize(track.track || track.title || "");
        return aliases.some((alias) => title === alias || title.includes(alias));
      });
      if (match?.track_id) {
        selected.push(match);
        usedIds.add(match.track_id);
      }
    }

    if (selected.length < 4) {
      for (const track of catalog) {
        if (!track.track_id || usedIds.has(track.track_id)) continue;
        const haystack = normalize(`${track.track || track.title || ""} ${track.artist || ""} ${track.album || ""}`);
        if (!/(swamphop|swamp hop|cda|coeur d alene)/.test(haystack)) continue;
        selected.push(track);
        usedIds.add(track.track_id);
        if (selected.length >= 6) break;
      }
    }

    const tracks = selected
      .map((track) => publicTrack(track, apiUrl))
      .filter((track): track is NonNullable<typeof track> => Boolean(track))
      .slice(0, 6);

    return NextResponse.json(
      {
        available: tracks.length > 0,
        label: "CDA SwampHop",
        sponsor: { name: "EchoVerse Audio", url: ECHOVERSE_SPONSOR_URL },
        tracks
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=86400"
        }
      }
    );
  } catch (error) {
    console.error("EchoVerse sponsored player catalog fetch failed", error);
    return NextResponse.json(
      {
        available: false,
        label: "CDA SwampHop",
        sponsor: { name: "EchoVerse Audio", url: ECHOVERSE_SPONSOR_URL },
        tracks: []
      },
      {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600" }
      }
    );
  }
}
