import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
        {/* Google Fonts loaded at runtime — avoids SSL issues that block next/font/google at build time */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* ThemeRegistry is a client component — keeps the MUI theme (which has functions) off the RSC boundary */}
        <ThemeRegistry>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
