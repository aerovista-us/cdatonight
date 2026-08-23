import type { Metadata } from "next";
import Link from "next/link";
import SubmitEventForm from "./SubmitEventForm";

export const metadata: Metadata = {
  title: "Submit an Event | CDA Tonight",
  description: "Submit a Coeur d'Alene event for source verification and moderation before publication.",
  robots: { index: true, follow: true }
};

export default function SubmitPage() {
  return (
    <main className="phase3-page">
      <header className="phase3-top">
        <Link className="phase3-brand" href="/"><img src="/cdatonight_logo.png" alt="CDA Tonight" /><div><strong>CDA Tonight</strong><span>Source-first intake</span></div></Link>
        <Link className="phase3-home" href="/weekend">Weekend mode</Link>
      </header>
      <section className="phase3-hero">
        <p className="phase3-kicker">SUBMIT AN EVENT</p>
        <h1>Know something<br />we missed?</h1>
        <p>Send the facts and the source. We review submissions before they enter the feed, so the public list stays useful instead of becoming an unverified community bulletin board.</p>
      </section>
      <SubmitEventForm />
    </main>
  );
}
