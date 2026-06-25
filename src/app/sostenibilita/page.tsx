import { Metadata } from "next";
import SostenibilitaContent from "@/features/sostenibilita/components/SostenibilitaContent";

export const metadata: Metadata = {
  title: "Sostenibilità & Manifesto | Hotel Pomelia",
  description:
    "Il manifesto di Hotel Pomelia Ragusa: energia solare 100%, economia circolare, lenzuola bio.",
  keywords: [
    "hotel ecosostenibile Ragusa",
    "turismo responsabile Sicilia",
    "società benefit hotel Sicilia",
    "spiaggia accessibile disabili Ragusa",
  ],
  openGraph: {
    title: "Il Nostro Manifesto — Hotel Pomelia Ragusa",
    description:
      "100% energia rinnovabile, economia circolare, spiaggia barrier-free. Il lusso responsabile della Sicilia.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&auto=format&fit=crop",
        alt: "Pannelli solari dell'Hotel Pomelia al tramonto",
      },
    ],
  },
};

export default function SostenibilitaPage() {
  return <SostenibilitaContent />;
}
