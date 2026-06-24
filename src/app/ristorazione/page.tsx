import type { Metadata } from "next";
import RistorazioneContent from "@/features/ristorazione/components/RistorazioneContent";

export const metadata: Metadata = {
  title: "Ristorazione & Orto Biologico",
  description:
    "Ristorante biologico 0 km dell'Hotel Pomelia a Ragusa. Maccu di favi ragusano, Schiaccia ragusana con grano Tumminia, 'Mpanatigghi e workshop di cucina siciliana con la chef Chiara.",
  keywords: [
    "maccu di favi ragusano",
    "schiaccia ragusana",
    "mpanatigghi dolci Ragusa",
    "cucina biologica 0 km Ragusa",
    "ristorante biologico Sicilia",
    "grano antico tumminia",
    "olio Tonda Iblea DOP",
    "workshop cucina siciliana",
  ],
  openGraph: {
    title: "Ristorazione & Orto Biologico — Hotel Pomelia Ragusa",
    description:
      "Cucina siciliana autentica dall'orto biologico di proprietà. Maccu di favi, Schiaccia ragusana con grano Tumminia, 'Mpanatigghi. Workshop con la chef Chiara.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop",
        alt: "Piatti della tradizione siciliana al ristorante biologico di Hotel Pomelia",
      },
    ],
  },
};

export default function RistorazionePage() {
  return <RistorazioneContent />;
}
