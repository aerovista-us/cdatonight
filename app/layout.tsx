import type { Metadata } from "next";
import AeroVistaLocalBadge from "@/components/AeroVistaLocalBadge";
import UmamiAnalytics from "@/components/UmamiAnalytics";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cdatonight.aerovista.us";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CDA Tonight | What to Do in Coeur d'Alene Tonight",
  description: "A fast, source-first guide to verified things worth doing tonight in Coeur d'Alene.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "What's actually worth doing in CDA tonight?",
    description: "Verified local events ranked by source quality, freshness, timing and variety — with official sources and directions one tap away.",
    url: "/",
    siteName: "CDA Tonight",
    type: "website",
    locale: "en_US",
    images: [{ url: "/cdatonight_prevew.png", alt: "CDA Tonight by AeroVista Local" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "CDA Tonight",
    description: "Verified picks for what to do tonight in Coeur d'Alene.",
    images: ["/cdatonight_prevew.png"]
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
