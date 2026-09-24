const UPSTREAM_FEED =
  "https://raw.githubusercontent.com/aerovista-us/cdatonight/main/data/auto-events.json";

export const revalidate = 300;

export async function GET() {
  try {
    const upstream = await fetch(UPSTREAM_FEED, {
      next: { revalidate: 300 }
    });

    if (!upstream.ok) {
      return Response.json(
        { error: "feed_unavailable", status: upstream.status },
        { status: 502 }
      );
    }

    const payload = await upstream.json();
    if (!payload || !Array.isArray(payload.events)) {
      return Response.json({ error: "invalid_feed" }, { status: 502 });
    }

    return Response.json(
      {
        generatedAt: typeof payload.generatedAt === "string" ? payload.generatedAt : null,
        events: payload.events
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900"
        }
      }
    );
  } catch (error) {
    console.error("CDA Tonight live feed fetch failed", error);
    return Response.json({ error: "feed_unavailable" }, { status: 502 });
  }
}
