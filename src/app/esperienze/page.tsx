import type { Metadata } from "next";
import EsperienzeContent from "@/features/esperienze/components/EsperienzeContent";

export const metadata: Metadata = {
  title: "Esperienze & Territorio",
  description:
    "Esperienze autentiche in Sicilia da Hotel Pomelia a Ragusa: trekking negli Iblei, degustazione olio Tonda Iblea DOP a Chiaramonte Gulfi, Valle dei Templi Agrigento, spiaggia barrier-free certificata.",
  keywords: [
    "trekking Iblei Ragusa",
    "olio Tonda Iblea DOP Chiaramonte Gulfi",
    "Valle dei Templi Agrigento tour",
    "spiaggia accessibile disabili Sicilia",
    "spiaggia barrier-free Ragusa",
    "esperienze turismo responsabile Sicilia",
  ],
  openGraph: {
    title: "Esperienze & Territorio — Hotel Pomelia Ragusa",
    description:
      "Trekking ibleo, olio DOP a Chiaramonte Gulfi, Valle dei Templi UNESCO e spiaggia barrier-free: la Sicilia autentica da Hotel Pomelia.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&auto=format&fit=crop",
        alt: "Trekking nei paesaggi degli altipiani iblei ragusani",
      },
    ],
  },
};

export default function EsperienzePage() {
  return <EsperienzeContent />;
}
