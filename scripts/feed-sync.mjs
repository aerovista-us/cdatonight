import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const seedsPath = path.join(root, "data", "source-seeds.json");
const eventsPath = path.join(root, "data", "auto-events.json");
const candidatesPath = path.join(root, "data", "source-candidates.json");
const dryRun = process.argv.includes("--dry-run");

const seeds = JSON.parse(await fs.readFile(seedsPath, "utf8"));
const existingFeed = JSON.parse(await fs.readFile(eventsPath, "utf8"));
const existingCandidates = JSON.parse(await fs.readFile(candidatesPath, "utf8"));
const now = new Date();
const horizonStart = new Date(now.getTime() - 6 * 60 * 60 * 1000);
const horizonEnd = new Date(now.getTime() + seeds.horizonDays * 24 * 60 * 60 * 1000);
const verifiedAt = now.toISOString();

function normalizeHost(value = "") {
  return String(value).trim().toLowerCase().replace(/^www\./, "").replace(/\.$/, "");
}

function hostFromValue(value) {
  if (!value) return "";
  try {
    return normalizeHost(value.includes("://") ? new URL(value).hostname : value);
  } catch {
    return "";
  }
}

const knownHosts = new Set(
  seeds.sources
    .flatMap((source) => [source.url, ...(source.aliases || [])])
    .map(hostFromValue)
    .filter(Boolean)
);

function isKnownHost(host) {
  const clean = normalizeHost(host);
  if (!clean) return false;
  for (const known of knownHosts) {
    if (clean === known || clean.endsWith(`.${known}`)) return true;
  }
  return false;
}

const blockedCandidateHosts = [
  "facebook.com", "instagram.com", "twitter.com", "x.com", "tiktok.com", "youtube.com",
  "google.com", "googleusercontent.com", "yelp.com", "tripadvisor.com", "eventbrite.com",
  "ticketmaster.com", "bandsintown.com", "spotify.com", "apple.com", "linktr.ee"
];

const weightByEvidence = {
  organizer: 6,
  venue: 6,
  performer: 3,
  "official-link": 4
};

function cleanText(value = "") {
  return String(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
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

function stableId(sourceId, title, startsAt) {
  const hash = crypto.createHash("sha1").update(`${sourceId}|${title}|${startsAt}`).digest("hex").slice(0, 8);
  return `auto-${slug(sourceId)}-${slug(title)}-${hash}`;
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
      const parsed = JSON.parse(raw);
      flattenJsonLd(parsed, nodes);
    } catch {
      // Invalid JSON-LD is ignored rather than poisoning the whole source refresh.
    }
  }
  return nodes;
}

function isType(node, type) {
  const raw = node?.["@type"];
  const types = Array.isArray(raw) ? raw : [raw];
  return types.filter(Boolean).some((item) => String(item).toLowerCase() === type.toLowerCase());
}

function absoluteUrl(base, value) {
  if (!value || typeof value !== "string") return null;
  try { return new URL(value, base).toString(); } catch { return null; }
}

function extractDetailLinks(html, baseUrl) {
  const base = new URL(baseUrl);
  const found = [];
  const regex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = regex.exec(html))) {
    const url = absoluteUrl(baseUrl, match[1]);
    if (!url) continue;
    const parsed = new URL(url);
    if (parsed.hostname !== base.hostname) continue;
    const text = cleanText(match[2]).toLowerCase();
    const haystack = `${parsed.pathname} ${text}`;
    if (!/(event|calendar|concert|music|show|performance|festival|market|rodeo|cruise)/i.test(haystack)) continue;
    if (!found.includes(url)) found.push(url);
  }
  return found.slice(0, seeds.detailLimitPerSource);
}

function extractOfficialLinks(html, baseUrl) {
  const found = [];
  const regex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = regex.exec(html))) {
    const text = cleanText(match[2]).toLowerCase();
    if (!/(official site|website|organizer|venue|presented by|hosted by)/i.test(text)) continue;
    const url = absoluteUrl(baseUrl, match[1]);
    if (url) found.push({ url, name: cleanText(match[2]) || null, kind: "official-link" });
  }
  return found;
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
  if (/(outdoor|park|lake|garden|patio|trail|beach)/.test(text)) categories.add("outdoors");
  if (/(market|flea|vendor|street fair)/.test(text)) categories.add("market");
  if (/(rodeo|bull|stampede)/.test(text)) categories.add("rodeo");
  if (/(motocross|derby|motor|race)/.test(text)) categories.add("motorsports");
  if (/(cruise|boat|sailing)/.test(text)) categories.add("cruise");
  if (/(fundraiser|community|association|benefit|festival|parade)/.test(text)) categories.add("community");
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

function localEnough(node, seed) {
  if (!seed.localOnly) return true;
  const location = node.location;
  const address = postalAddress(location).toLowerCase();
  const venue = cleanText(location?.name || "").toLowerCase();
  const text = `${address} ${venue}`;
  if (!text.trim()) return true; // trusted local source, but no structured location field
  return /(coeur d['’]?alene|cda\b|hayden|post falls)/i.test(text);
}

function normalizeEvent(node, seed, pageUrl, oldById) {
  const title = cleanText(node.name || node.headline || "");
  const startsAt = node.startDate ? new Date(node.startDate) : null;
  if (!title || !startsAt || Number.isNaN(startsAt.getTime())) return null;
  if (startsAt < horizonStart || startsAt > horizonEnd) return null;
  if (!localEnough(node, seed)) return null;

  const location = node.location || {};
  const venue = cleanText(location.name || seed.name);
  const address = postalAddress(location);
  const description = cleanText(node.description || "");
  const end = node.endDate ? new Date(node.endDate) : null;
  const sourceUrl = absoluteUrl(pageUrl, node.url) || pageUrl;
  const offer = offerState(node);
  const id = stableId(seed.sourceId, title, startsAt.toISOString());
  const event = {
    id,
    title,
    startsAt: startsAt.toISOString(),
    ...(end && !Number.isNaN(end.getTime()) ? { endsAt: end.toISOString() } : {}),
    venue,
    address,
    category: categoryGuess(title, description),
    cost: offer.cost,
    ...(offer.priceLabel ? { priceLabel: offer.priceLabel } : {}),
    status: offer.status,
    sourceId: seed.sourceId,
    sourceUrl,
    directionsUrl: address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue + " Coeur d'Alene Idaho")}`,
    sourceLabel: seed.name,
    verifiedAt,
    note: description ? description.slice(0, 220) : `Auto-refreshed from ${seed.name}.`
  };

  const previous = oldById.get(id);
  if (previous) {
    const a = { ...previous, verifiedAt: null };
    const b = { ...event, verifiedAt: null };
    if (JSON.stringify(a) === JSON.stringify(b)) event.verifiedAt = previous.verifiedAt;
  }
  return event;
}

function semanticCandidatesFromNode(node) {
  const output = [];
  const pushPerson = (value, kind) => {
    const values = Array.isArray(value) ? value : value ? [value] : [];
    for (const item of values) {
      if (!item || typeof item !== "object") continue;
      const url = item.url || item.sameAs;
      const urls = Array.isArray(url) ? url : url ? [url] : [];
      for (const candidateUrl of urls) {
        output.push({ url: candidateUrl, name: cleanText(item.name || "") || null, kind });
      }
    }
  };
  pushPerson(node.organizer, "organizer");
  pushPerson(node.location, "venue");
  pushPerson(node.performer, "performer");
  return output;
}

function blockedHost(host) {
  const clean = normalizeHost(host);
  return blockedCandidateHosts.some((blocked) => clean === blocked || clean.endsWith(`.${blocked}`));
}

function candidateFromUrl(rawUrl, evidence, seed, eventTitle = null) {
  const url = absoluteUrl(seed.url, rawUrl);
  if (!url) return null;
  const parsed = new URL(url);
  if (!/^https?:$/.test(parsed.protocol)) return null;
  const host = normalizeHost(parsed.hostname);
  if (!host || isKnownHost(host) || blockedHost(host)) return null;
  const normalizedUrl = `${parsed.protocol}//${parsed.host}${parsed.pathname === "/" ? "/" : parsed.pathname}`;
  const signature = [seed.sourceId, evidence.kind, normalizedUrl, eventTitle || ""].join("|");
  return {
    domain: host,
    url: normalizedUrl,
    name: evidence.name || host,
    evidence: {
      signature,
      fromSourceId: seed.sourceId,
      fromSourceName: seed.name,
      kind: evidence.kind,
      url: normalizedUrl,
      ...(eventTitle ? { eventTitle } : {})
    }
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
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html") && !type.includes("application/xhtml+xml")) throw new Error(`unsupported content-type ${type}`);
  return response.text();
}

const oldById = new Map((existingFeed.events || []).map((event) => [event.id, event]));
const existingBySource = new Map();
for (const event of existingFeed.events || []) {
  const list = existingBySource.get(event.sourceId) || [];
  list.push(event);
  existingBySource.set(event.sourceId, list);
}

const refreshedBySource = new Map();
const candidateObservations = [];
let sourcesSucceeded = 0;
let pagesFetched = 0;
const errors = [];

for (const seed of seeds.sources) {
  const pages = [];
  try {
    const html = await fetchHtml(seed.url);
    sourcesSucceeded += 1;
    pagesFetched += 1;
    pages.push({ url: seed.url, html });

    if (seed.crawlDetails) {
      const details = extractDetailLinks(html, seed.url);
      for (const detailUrl of details) {
        try {
          const detailHtml = await fetchHtml(detailUrl);
          pagesFetched += 1;
          pages.push({ url: detailUrl, html: detailHtml });
        } catch (error) {
          errors.push(`${seed.sourceId} detail ${detailUrl}: ${error.message}`);
        }
      }
    }

    const extracted = [];
    for (const page of pages) {
      const nodes = extractJsonLd(page.html);
      const eventNodes = nodes.filter((node) => isType(node, "Event"));
      for (const node of eventNodes) {
        const event = normalizeEvent(node, seed, page.url, oldById);
        if (event && seed.publish) extracted.push(event);
        if (seed.discover) {
          for (const semantic of semanticCandidatesFromNode(node)) {
            const candidate = candidateFromUrl(semantic.url, semantic, seed, cleanText(node.name || ""));
            if (candidate) candidateObservations.push(candidate);
          }
        }
      }
      if (seed.discover) {
        for (const link of extractOfficialLinks(page.html, page.url)) {
          const candidate = candidateFromUrl(link.url, link, seed);
          if (candidate) candidateObservations.push(candidate);
        }
      }
    }

    if (seed.publish && extracted.length) {
      const unique = new Map(extracted.map((event) => [event.id, event]));
      refreshedBySource.set(seed.sourceId, [...unique.values()]);
    }
  } catch (error) {
    errors.push(`${seed.sourceId}: ${error.message}`);
  }
}

if (sourcesSucceeded === 0) {
  console.error("Feed sync failed: no sources could be fetched.");
  process.exitCode = 1;
} else {
  const outputEvents = [];
  const sourceIds = new Set([
    ...existingBySource.keys(),
    ...seeds.sources.filter((source) => source.publish).map((source) => source.sourceId)
  ]);

  for (const sourceId of sourceIds) {
    if (refreshedBySource.has(sourceId)) outputEvents.push(...refreshedBySource.get(sourceId));
    else outputEvents.push(...(existingBySource.get(sourceId) || []));
  }

  const eventMap = new Map(outputEvents.map((event) => [event.id, event]));
  const nextEvents = [...eventMap.values()].sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
  const currentEventPayload = JSON.stringify(existingFeed.events || []);
  const nextEventPayload = JSON.stringify(nextEvents);
  const feedChanged = currentEventPayload !== nextEventPayload;

  if (feedChanged && !dryRun) {
    await fs.writeFile(eventsPath, `${JSON.stringify({ generatedAt: verifiedAt, events: nextEvents }, null, 2)}\n`);
  }

  const existingCandidateList = existingCandidates.candidates || [];
  const retainedCandidates = existingCandidateList.filter((candidate) => !isKnownHost(candidate.domain));
  const candidateMap = new Map(retainedCandidates.map((candidate) => [normalizeHost(candidate.domain), structuredClone(candidate)]));
  let candidatesChanged = retainedCandidates.length !== existingCandidateList.length;

  for (const observation of candidateObservations) {
    const current = candidateMap.get(observation.domain) || {
      domain: observation.domain,
      name: observation.name,
      url: observation.url,
      status: "candidate",
      score: 0,
      firstSeen: verifiedAt,
      lastSeen: verifiedAt,
      evidence: []
    };
    const signatures = new Set(current.evidence.map((item) => item.signature));
    if (signatures.has(observation.evidence.signature)) continue;
    current.evidence.push(observation.evidence);
    current.lastSeen = verifiedAt;
    current.name = current.name || observation.name;
    current.url = current.url || observation.url;
    current.score = current.evidence.reduce((sum, item) => sum + (weightByEvidence[item.kind] || 1), 0);
    current.status = current.score >= 10 ? "review-ready" : "candidate";
    candidateMap.set(observation.domain, current);
    candidatesChanged = true;
  }

  const nextCandidates = [...candidateMap.values()].sort((a, b) => b.score - a.score || a.domain.localeCompare(b.domain));
  if (candidatesChanged && !dryRun) {
    await fs.writeFile(candidatesPath, `${JSON.stringify({ generatedAt: verifiedAt, candidates: nextCandidates }, null, 2)}\n`);
  }

  console.log(JSON.stringify({
    checkedAt: verifiedAt,
    sourcesConfigured: seeds.sources.length,
    knownSourceDomains: knownHosts.size,
    sourcesSucceeded,
    pagesFetched,
    refreshedSources: [...refreshedBySource.keys()],
    autoEvents: nextEvents.length,
    feedChanged,
    candidates: nextCandidates.length,
    reviewReadyCandidates: nextCandidates.filter((item) => item.status === "review-ready").length,
    candidatesChanged,
    errors
  }, null, 2));
}
