import type { Metadata, Viewport } from "next";
import AeroVistaLocalBadge from "@/components/AeroVistaLocalBadge";
import EchoVerseSponsoredPlayer from "@/components/EchoVerseSponsoredPlayer";
import LateNightEats from "@/components/LateNightEats";
import Phase3Nav from "@/components/Phase3Nav";
import UmamiAnalytics from "@/components/UmamiAnalytics";
import "./globals.css";
import "./nightlife.css";
import "./late-eats.css";
import "./wide-layout.css";
import "./hero-real.css";
import "./phase3.css";
import "./keep-going.css";
import "./echoverse-player.css";
import "./hydration.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cdatonight.aerovista.us";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CDA Tonight | What to Do in Coeur d'Alene Tonight",
  description: "A fast, source-first guide to verified things worth doing tonight in Coeur d'Alene.",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/cdatonight_logo.png", type: "image/png" }],
    shortcut: "/cdatonight_logo.png",
    apple: "/cdatonight_logo.png"
  },
  openGraph: {
    title: "What's actually worth doing in CDA tonight?",
    description: "Verified local events ranked by source quality, freshness, timing and variety — with official sources and directions one tap away.",
    url: "/",
    siteName: "CDA Tonight",
    type: "website",
    locale: "en_US",
    images: [{ url: "/cdanight2.png", alt: "Coeur d'Alene waterfront at night" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "CDA Tonight",
    description: "Verified picks for what to do tonight in Coeur d'Alene.",
    images: ["/cdanight2.png"]
  }
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#090a0d"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Phase3Nav />
        <EchoVerseSponsoredPlayer />
        <LateNightEats />
        <AeroVistaLocalBadge />
        <UmamiAnalytics />
      </body>
    </html>
  );
}
