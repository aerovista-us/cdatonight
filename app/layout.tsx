import type { Metadata } from "next";
import AeroVistaLocalBadge from "@/components/AeroVistaLocalBadge";
import UmamiAnalytics from "@/components/UmamiAnalytics";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tonight.aerovista.us";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CDA Tonight | What to Do in Coeur d'Alene Tonight",
  description: "A fast, source-first guide to verified things worth doing tonight in Coeur d'Alene.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "What's actually worth doing in CDA tonight?",
    description: "Verified local events, starting-soon picks, official sources, directions and a quick My Night plan.",
    url: "/",
    siteName: "CDA Tonight",
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CDA Tonight by AeroVista Local" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "CDA Tonight",
    description: "Find something worth doing tonight in Coeur d'Alene.",
    images: ["/opengraph-image"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <AeroVistaLocalBadge />
        <UmamiAnalytics />
      </body>
    </html>
  );
}
