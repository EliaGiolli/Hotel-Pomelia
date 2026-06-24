import type { Metadata } from "next";
import HomeContent from "@/features/home/components/HomeContent";

export const metadata: Metadata = {
  title: "Hotel Pomelia | Turismo Responsabile a Ragusa, Sicilia",
  description:
    "Hotel ecosostenibile a Ragusa, Sicilia, fondato nel 1958. Tre generazioni della famiglia Pomelia. Società Benefit con energia 100% rinnovabile, cucina biologica 0 km, lenzuola GOTS e spiaggia barrier-free.",
  keywords: [
    "hotel ecosostenibile Ragusa",
    "turismo responsabile Sicilia",
    "hotel biologico Ragusa Ibla",
    "vacanze sostenibili Sicilia",
    "società benefit hotel Sicilia",
    "spiaggia accessibile disabili Ragusa",
    "maccu di favi ragusano",
    "trekking Iblei Ragusa",
  ],
  openGraph: {
    title: "Hotel Pomelia — Dove la Sicilia incontra il turismo responsabile",
    description:
      "Boutique hotel eco-sostenibile nel cuore degli Iblei, Ragusa. Tre generazioni di ospitalità autentica dal 1958. Società Benefit certificata.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Panorama della Sicilia ragusana al tramonto — Hotel Pomelia",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Hotel", "LocalBusiness"],
  name: "Hotel Pomelia",
  description:
    "Hotel ecosostenibile fondato nel 1958 a Ragusa, Sicilia. Tre generazioni della famiglia Pomelia. Società Benefit certificata dedicata al turismo responsabile: energia 100% rinnovabile, cucina biologica 0 km, lenzuola GOTS, spiaggia barrier-free.",
  foundingDate: "1958",
  url: "https://www.hotelpomelia.it",
  telephone: "+390932000000",
  email: "info@hotelpomelia.it",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Contrada Pomelia, S.P. 25",
    addressLocality: "Ragusa",
    addressRegion: "RG",
    postalCode: "97100",
    addressCountry: "IT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "36.9269",
    longitude: "14.7251",
  },
  starRating: { "@type": "Rating", ratingValue: "4" },
  numberOfRooms: "4",
  priceRange: "€€€",
  checkinTime: "15:00",
  checkoutTime: "11:00",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Spiaggia privata accessibile barrier-free", value: true },
    { "@type": "LocationFeatureSpecification", name: "Energia solare 100% rinnovabile", value: true },
    { "@type": "LocationFeatureSpecification", name: "Cucina biologica 0 km", value: true },
    { "@type": "LocationFeatureSpecification", name: "Lenzuola certificate GOTS", value: true },
    { "@type": "LocationFeatureSpecification", name: "Orto biologico di proprietà", value: true },
    { "@type": "LocationFeatureSpecification", name: "Wi-Fi gratuito", value: true },
    { "@type": "LocationFeatureSpecification", name: "Parcheggio gratuito", value: true },
    { "@type": "LocationFeatureSpecification", name: "Zero plastica monouso", value: true },
  ],
  knowsAbout: [
    "turismo responsabile",
    "cucina siciliana biologica",
    "sostenibilità ambientale",
    "accessibilità turistica",
    "Società Benefit",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  );
}
