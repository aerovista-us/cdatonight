import { NextResponse } from "next/server";
import { ECHOVERSE_CDA_TRACKS, ECHOVERSE_SPONSOR_URL } from "@/data/echoverse-player";

export const revalidate = 3600;

export async function GET() {
  return NextResponse.json(
    {
      available: true,
      label: "CDA SwampHop",
      source: "local-assets",
      sponsor: { name: "EchoVerse Audio", url: ECHOVERSE_SPONSOR_URL },
      tracks: ECHOVERSE_CDA_TRACKS
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
      }
    }
  );
}
