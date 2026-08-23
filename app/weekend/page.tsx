import type { Metadata } from "next";
import Link from "next/link";
import WeekendClient from "./WeekendClient";

export const metadata: Metadata = {
  title: "CDA Weekend | CDA Tonight",
  description: "Verified Coeur d'Alene events for the rest of the weekend, with source links attached.",
  openGraph: {
    title: "CDA Weekend — verified plans through Sunday",
    description: "Source-backed Coeur d'Alene plans for Friday, Saturday and Sunday.",
    images: ["/cdanight2.png"]
  }
};

export default function WeekendPage() {
  return (
    <main className="phase3-page">
      <header className="phase3-top">
        <Link className="phase3-brand" href="/"><img src="/cdatonight_logo.png" alt="CDA Tonight" /><div><strong>CDA Tonight</strong><span>Weekend mode</span></div></Link>
        <Link className="phase3-home" href="/">Tonight first</Link>
      </header>
      <WeekendClient />
    </main>
  );
}
