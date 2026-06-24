import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry";
import Navbar from "@/shared/components/ui/Navbar";
import Footer from "@/shared/components/ui/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hotel Pomelia | Turismo Responsabile a Ragusa, Sicilia",
    template: "%s | Hotel Pomelia Ragusa",
  },
  description:
    "Hotel ecosostenibile a Ragusa, Sicilia. Società Benefit dedicata al turismo responsabile: energia 100% rinnovabile, cucina biologica 0 km, design artigianale locale.",
  keywords: [
    "hotel ecosostenibile Ragusa",
    "turismo responsabile Sicilia",
    "hotel biologico Ragusa",
    "vacanze sostenibili Sicilia",
    "società benefit hotel",
    "spiaggia accessibile disabili Ragusa",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Hotel Pomelia",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        {/* Fonts via Google Fonts runtime — avoids SSL issues at build time */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/*
          ThemeRegistry is a "use client" boundary — it wraps MUI ThemeProvider
          (which contains non-serialisable functions) so it never crosses the RSC boundary.
          Theme colours: primary #F4C430 (saffron gold) · secondary #00A896 (teal)
        */}
        <ThemeRegistry>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
