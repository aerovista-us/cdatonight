import type { Metadata } from "next";
import Link from "next/link";
import { sourceKindLabel, sourceList } from "@/data/sources";
import sourceCandidates from "@/data/source-candidates.json";

export const metadata: Metadata = {
  title: "Source Network | CDA Tonight",
  description: "The trusted sources and discovery queue behind CDA Tonight's verified local event feed.",
  robots: { index: true, follow: true }
};

function clean(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#39;|&apos;/g, "'");
}

export default function SourcesPage() {
  const reviewReady = sourceCandidates.candidates.filter((candidate) => candidate.status === "review-ready").length;

  return (
    <main className="phase3-page source-network-page">
      <header className="phase3-top">
        <Link className="phase3-brand" href="/">
          <img src="/cdatonight_logo.png" alt="CDA Tonight" />
          <div><strong>CDA Tonight</strong><span>Source network</span></div>
        </Link>
        <Link className="phase3-home" href="/">Back to Tonight</Link>
      </header>

      <section className="source-network-hero">
        <p className="phase3-kicker">UNDER THE HOOD · SOURCE NETWORK</p>
        <h1>Where the feed<br />comes from.</h1>
        <p>This page is intentionally out of the main planning flow. It is here for anyone who wants to inspect how CDA Tonight verifies local events, separates trusted publishers from discovery leads, and keeps new-source promotion governed.</p>
        <div className="weekend-meta">
          <span><strong>{sourceList.length}</strong> trusted lanes</span>
          <span><strong>{sourceCandidates.candidates.length}</strong> discovery candidates</span>
          <span><strong>{reviewReady}</strong> ready for human review</span>
        </div>
      </section>

      <section className="source-network-section">
        <div className="source-network-heading">
          <div><p className="phase3-kicker">TRUSTED · PUBLISH</p><h2>Durable source lanes</h2></div>
          <p>These sources may support the public feed. Official organizers, venues and ticketing sources receive stronger ranking confidence than broad discovery calendars.</p>
        </div>
        <div className="source-network-grid">
          {sourceList.map((source) => (
            <a className="source-network-item" href={source.url} target="_blank" rel="noreferrer" key={source.id}>
              <span>{sourceKindLabel(source.kind)}</span>
              <strong>{source.name}</strong>
              <p>{source.coverage}</p>
              <small>{source.note}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="source-network-section discovery-section">
        <div className="source-network-heading">
          <div><p className="phase3-kicker">DISCOVERY · REVIEW FIRST</p><h2>New-source queue</h2></div>
          <p>The crawler can discover organizers and venues automatically, but discovery never grants publishing authority. Candidates remain here until a human promotes them into the trusted registry.</p>
        </div>
        {sourceCandidates.candidates.length ? (
          <div className="candidate-grid">
            {sourceCandidates.candidates.map((candidate) => (
              <a className="candidate-item" href={candidate.url} target="_blank" rel="noreferrer" key={candidate.domain}>
                <div><span className={candidate.status === "review-ready" ? "ready" : ""}>{candidate.status === "review-ready" ? "Review ready" : "Candidate"}</span><small>{candidate.score} evidence points</small></div>
                <strong>{clean(candidate.name)}</strong>
                <p>{candidate.domain}</p>
                <small>{candidate.evidence.length} evidence record{candidate.evidence.length === 1 ? "" : "s"}</small>
              </a>
            ))}
          </div>
        ) : (
          <div className="weekend-empty">No unreviewed source candidates right now.</div>
        )}
      </section>

      <section className="source-policy-note">
        <strong>Alias normalization is active.</strong>
        <p>Known parent domains and approved aliases are treated as the same source family, so a trusted organization is not rediscovered just because one page uses a different subdomain or canonical hostname.</p>
      </section>
    </main>
  );
}
