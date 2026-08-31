import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const feedPath = path.join(root, "data", "auto-events.json");
const seedsPath = path.join(root, "data", "source-seeds.json");
const dryRun = process.argv.includes("--dry-run");

const feed = JSON.parse(await fs.readFile(feedPath, "utf8"));
const seeds = JSON.parse(await fs.readFile(seedsPath, "utf8"));
const now = new Date();
const verifiedAt = now.toISOString();
const horizonStart = new Date(now.getTime() - 6 * 60 * 60 * 1000);
const horizonEnd = new Date(now.getTime() + seeds.horizonDays * 24 * 60 * 60 * 1000);
const baseUrl = "https://coeurdalene.org";

function cleanText(value = "") {
  return String(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slug(value) {
  return cleanText(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 58);
}

function stableId(title, startsAt) {
  const hash = crypto.createHash("sha1").update(`visit-cda|${title}|${startsAt}`).digest("hex").slice(0, 8);
  return `auto-visit-cda-${slug(title)}-${hash}`;
}

function flattenJsonLd(value, output = []) {
  if (!value) return output;
  if (Array.isArray(value)) {
    for (const item of value) flattenJsonLd(item, output);
    return output;
  }
  if (typeof value !== "object") return output;
  output.push(value);
  if (Array.isArray(value["@graph"])) flattenJsonLd(value["@graph"], output);
  return output;
}

function extractJsonLd(html) {
  const nodes = [];
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html))) {
    const raw = match[1].trim();
    if (!raw) continue;
    try {
      flattenJsonLd(JSON.parse(raw), nodes);
    } catch {
      // Ignore malformed JSON-LD on an otherwise useful page.
    }
  }
  return nodes;
}

function isEvent(node) {
  const raw = node?.["@type"];
  const types = Array.isArray(raw) ? raw : [raw];
  return types.some((type) => String(type || "").toLowerCase() === "event");
}

function postalAddress(location) {
  if (!location) return "";
  if (typeof location === "string") return cleanText(location);
  const address = location.address;
  if (typeof address === "string") return cleanText(address);
  if (!address || typeof address !== "object") return cleanText(location.name || "");
  return [address.streetAddress, address.addressLocality, address.addressRegion, address.postalCode]
    .filter(Boolean)
    .map(cleanText)
    .join(", ");
}

function categoryGuess(title, description = "") {
  const text = `${title} ${description}`.toLowerCase();
  const categories = new Set();
  if (/(concert|live music|band|dj|music|singer|songwriter)/.test(text)) categories.add("live-music");
  if (/(bar|cocktail|dj|nightlife|lounge|club|after party|afterparty)/.test(text)) categories.add("nightlife");
  if (/(dinner|brunch|wine|beer|brew|food|tasting|cocktail|restaurant)/.test(text)) categories.add("food-drink");
  if (/(family|kids|children|all ages|fair|parade)/.test(text)) categories.add("family");
  if (/(outdoor|park|lake|garden|patio|trail|beach|cemetery|walking tour)/.test(text)) categories.add("outdoors");
  if (/(market|flea|vendor|street fair)/.test(text)) categories.add("market");
  if (/(rodeo|bull|stampede)/.test(text)) categories.add("rodeo");
  if (/(motocross|derby|motor|race)/.test(text)) categories.add("motorsports");
  if (/(cruise|boat|sailing)/.test(text)) categories.add("cruise");
  if (/(fundraiser|community|association|benefit|festival|parade|tour|history|museum)/.test(text)) categories.add("community");
  if (/(dinner|concert|cocktail|cruise|wine|music|date)/.test(text)) categories.add("date-night");
  if (!categories.size) categories.add("community");
  return [...categories];
}

function offerState(node) {
  const offers = Array.isArray(node.offers) ? node.offers : node.offers ? [node.offers] : [];
  const offer = offers.find((item) => item && typeof item === "object") || null;
  if (!offer) return { cost: "unknown", status: "unknown" };
  const price = Number(offer.price);
  const availability = String(offer.availability || "").toLowerCase();
  const status = availability.includes("soldout")
    ? "sold-out"
    : /(instock|limitedavailability|preorder)/.test(availability)
      ? "available"
      : "unknown";
  if (Number.isFinite(price)) {
    return { cost: price === 0 ? "free" : "paid", status, priceLabel: price > 0 ? `$${price}` : undefined };
  }
  return { cost: "unknown", status };
}

function normalizeEvent(node, pageUrl) {
  const title = cleanText(node.name || node.headline || "");
  const starts = node.startDate ? new Date(node.startDate) : null;
  if (!title || !starts || Number.isNaN(starts.getTime())) return null;
  if (starts < horizonStart || starts > horizonEnd) return null;

  const location = node.location || {};
  const address = postalAddress(location);
  const venue = cleanText(location.name || "Visit Coeur d'Alene");
  const localityText = `${address} ${venue}`;
  if (localityText.trim() && !/(coeur d['’]?alene|cda\b|hayden|post falls)/i.test(localityText)) return null;

  const description = cleanText(node.description || "");
  const end = node.endDate ? new Date(node.endDate) : null;
  const offer = offerState(node);
  let sourceUrl = pageUrl;
  if (typeof node.url === "string") {
    try { sourceUrl = new URL(node.url, pageUrl).toString(); } catch { /* use detail URL */ }
  }
  const startsAt = starts.toISOString();

  return {
    id: stableId(title, startsAt),
    title,
    startsAt,
    ...(end && !Number.isNaN(end.getTime()) ? { endsAt: end.toISOString() } : {}),
    venue,
    address,
    category: categoryGuess(title, description),
    cost: offer.cost,
    ...(offer.priceLabel ? { priceLabel: offer.priceLabel } : {}),
    status: offer.status,
    sourceId: "visit-cda",
    sourceUrl,
    directionsUrl: address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue} Coeur d'Alene Idaho`)}`,
    sourceLabel: "Visit Coeur d'Alene",
    verifiedAt,
    note: description ? description.slice(0, 220) : "Auto-refreshed from Visit Coeur d'Alene."
  };
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent": "AeroVista-CDA-Tonight/1.0 (+https://cdatonight.aerovista.us)",
      accept: "text/html,application/xhtml+xml"
    },
    signal: AbortSignal.timeout(15000)
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} ${url}`);
  return response.text();
}

function localDateParam(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function extractEventLinks(html) {
  const links = new Set();
  const regex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(html))) {
    let url;
    try { url = new URL(match[1], baseUrl); } catch { continue; }
    if (url.hostname !== "coeurdalene.org" && url.hostname !== "www.coeurdalene.org") continue;
    if (!url.pathname.startsWith("/events/")) continue;
    if (/^\/events\/(?:$|list|month|category|tag|venue|organizer|photo|today)/i.test(url.pathname)) continue;
    links.add(`${url.origin}${url.pathname}`);
  }
  return [...links];
}

const listOffsets = [0, 6, 12, 18];
const detailLinks = new Set();
const errors = [];

for (const offsetDays of listOffsets) {
  const date = new Date(now.getTime() + offsetDays * 24 * 60 * 60 * 1000);
  const dateParam = localDateParam(date);
  const listUrl = `${baseUrl}/events/list/?hide_subsequent_recurrences=1&tribe-bar-date=${dateParam}`;
  try {
    const html = await fetchHtml(listUrl);
    for (const link of extractEventLinks(html)) detailLinks.add(link);
  } catch (error) {
    errors.push(error.message);
  }
}

const extracted = [];
for (const detailUrl of [...detailLinks].slice(0, 60)) {
  try {
    const html = await fetchHtml(detailUrl);
    for (const node of extractJsonLd(html).filter(isEvent)) {
      const event = normalizeEvent(node, detailUrl);
      if (event) extracted.push(event);
    }
  } catch (error) {
    errors.push(error.message);
  }
}

if (!extracted.length) {
  console.error(`Visit CDA supplement found no publishable events. ${errors.slice(0, 5).join(" | ")}`);
  process.exitCode = 1;
} else {
  const unique = new Map(extracted.map((event) => [`${event.title.toLowerCase()}|${event.startsAt}`, event]));
  const freshVisitCda = [...unique.values()].sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
  const otherSources = (feed.events || []).filter((event) => event.sourceId !== "visit-cda");
  const nextEvents = [...otherSources, ...freshVisitCda].sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));

  const changed = JSON.stringify(feed.events || []) !== JSON.stringify(nextEvents);
  console.log(`Visit CDA supplement: ${freshVisitCda.length} events from ${detailLinks.size} detail links${dryRun ? " (dry run)" : ""}.`);
  if (errors.length) console.warn(errors.slice(0, 10).join("\n"));

  if (changed && !dryRun) {
    await fs.writeFile(feedPath, `${JSON.stringify({ generatedAt: verifiedAt, events: nextEvents }, null, 2)}\n`);
  }
}
