import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eventById, eventCatalog } from "@/lib/catalog";
import { sourceFor, sourceKindLabel } from "@/data/sources";
import ShareButton from "./ShareButton";

const TZ = "America/Los_Angeles";

type EventPageProps = { params: Promise<{ id: string }> };

function dateTimeLabel(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(iso));
}

function timeLabel(iso: string) {
  return new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

function categoryLabel(value: string) {
  return value.replace("-", " ");
}

export function generateStaticParams() {
  return eventCatalog.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = eventById(id);
  if (!event) return { title: "Event not found | CDA Tonight" };
  const description = `${dateTimeLabel(event.startsAt)} at ${event.venue}. Verified source attached on CDA Tonight.`;
  return {
    title: `${event.title} | CDA Tonight`,
    description,
    alternates: { canonical: `/event/${event.id}` },
    openGraph: {
      title: event.title,
      description,
      url: `/event/${event.id}`,
      type: "article",
      images: [{ url: "/cdanight2.png", alt: "Coeur d'Alene waterfront at night" }]
    },
    twitter: { card: "summary_large_image", title: event.title, description, images: ["/cdanight2.png"] }
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = eventById(id);
  if (!event) notFound();
  const source = sourceFor(event.sourceId);

  return (
    <main className="phase3-page">
      <header className="phase3-top">
        <Link className="phase3-brand" href="/"><img src="/cdatonight_logo.png" alt="CDA Tonight" /><div><strong>CDA Tonight</strong><span>Verified event</span></div></Link>
        <Link className="phase3-home" href="/weekend">Weekend mode</Link>
      </header>

      <section className="event-detail">
        <article className="event-detail-main">
          <p className="phase3-kicker">{event.category.slice(0, 4).map(categoryLabel).join(" · ")}</p>
          <h1>{event.title}</h1>
          <p className="venue-line">{event.venue}</p>
          <div className="detail-pills">
            <span>{dateTimeLabel(event.startsAt)}</span>
            {event.endsAt && <span>Ends {timeLabel(event.endsAt)}</span>}
            <span>{event.cost === "free" ? "Free" : event.cost === "paid" ? event.priceLabel || "Paid" : "Price not confirmed"}</span>
            <span>{event.status === "sold-out" ? "Sold out" : event.status === "available" ? "Listed / available" : "Availability not confirmed"}</span>
          </div>
          {event.note && <p className="detail-note">{event.note}</p>}
          <div className="detail-actions">
            <ShareButton eventId={event.id} title={event.title} />
            <a href={event.sourceUrl} target="_blank" rel="noreferrer">Verify at source ↗</a>
            <a href={event.directionsUrl} target="_blank" rel="noreferrer">Directions ↗</a>
          </div>
        </article>

        <aside className="event-detail-side">
          <h2>Why this is here</h2>
          <dl>
            <div><dt>Source</dt><dd><a href={source.url} target="_blank" rel="noreferrer">{source.name} ↗</a></dd></div>
            <div><dt>Source class</dt><dd>{sourceKindLabel(source.kind)}</dd></div>
            <div><dt>Last verified</dt><dd>{dateTimeLabel(event.verifiedAt)}</dd></div>
            <div><dt>Address</dt><dd>{event.address}</dd></div>
          </dl>
          <p className="detail-note">CDA Tonight does not invent event times, pricing or availability. If the source changes, the feed is expected to change with it.</p>
        </aside>
      </section>
    </main>
  );
}
