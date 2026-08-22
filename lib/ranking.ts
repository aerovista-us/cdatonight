import { LocalEvent } from "@/data/events";
import { sourceFor } from "@/data/sources";

function hoursBetween(a: Date, b: Date) {
  return (a.getTime() - b.getTime()) / 3_600_000;
}

function freshnessPoints(event: LocalEvent, now: Date) {
  const ageHours = Math.max(0, hoursBetween(now, new Date(event.verifiedAt)));
  if (ageHours <= 24) return 10;
  if (ageHours <= 72) return 7;
  if (ageHours <= 168) return 4;
  return 0;
}

function timingPoints(event: LocalEvent, now: Date) {
  const startHours = hoursBetween(new Date(event.startsAt), now);
  const end = event.endsAt ? new Date(event.endsAt) : new Date(new Date(event.startsAt).getTime() + 3 * 3_600_000);
  const isHappening = startHours <= 0 && end.getTime() > now.getTime();

  if (isHappening) return 18;
  if (startHours > 0 && startHours <= 1.5) return 15;
  if (startHours > 1.5 && startHours <= 4) return 11;
  if (startHours > 4) return 5;
  return 0;
}

export function baseEventScore(event: LocalEvent, now: Date) {
  const source = sourceFor(event.sourceId);
  let score = source.priority * 5 + freshnessPoints(event, now) + timingPoints(event, now);

  if (event.status === "available") score += 8;
  if (event.status === "sold-out") score -= 24;
  if (event.featured) score += 6;
  if (event.cost === "free") score += 3;

  return score;
}

export function rankEvents(input: LocalEvent[], now: Date) {
  const remaining = [...input];
  const ranked: LocalEvent[] = [];
  const sourceCounts = new Map<string, number>();
  const venueCounts = new Map<string, number>();

  while (remaining.length) {
    let bestIndex = 0;
    let bestScore = Number.NEGATIVE_INFINITY;

    for (let index = 0; index < remaining.length; index += 1) {
      const event = remaining[index];
      const repeatedSourcePenalty = (sourceCounts.get(event.sourceId) || 0) * 7;
      const repeatedVenuePenalty = (venueCounts.get(event.venue) || 0) * 9;
      const score = baseEventScore(event, now) - repeatedSourcePenalty - repeatedVenuePenalty;

      if (score > bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    }

    const [selected] = remaining.splice(bestIndex, 1);
    ranked.push(selected);
    sourceCounts.set(selected.sourceId, (sourceCounts.get(selected.sourceId) || 0) + 1);
    venueCounts.set(selected.venue, (venueCounts.get(selected.venue) || 0) + 1);
  }

  return ranked;
}

export function rankingReason(event: LocalEvent, now: Date) {
  const source = sourceFor(event.sourceId);
  const startHours = hoursBetween(new Date(event.startsAt), now);
  const end = event.endsAt ? new Date(event.endsAt) : undefined;

  if (startHours <= 0 && end && end.getTime() > now.getTime()) return "Happening now · high-confidence source";
  if (startHours > 0 && startHours <= 1.5) return "Starting soon · high-confidence source";
  if (event.cost === "free") return "Free · verified source";
  if (source.priority >= 10) return "Primary source · recently verified";
  return "Curated source · recently verified";
}
