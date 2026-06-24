import type { Metadata } from "next";
import CamereContent from "@/features/camere/components/CamereContent";

export const metadata: Metadata = {
  title: "Camere & Suite",
  description:
    "Camere e suite dell'Hotel Pomelia a Ragusa: Suite Gelsomino, Camera Mandorlo, Familiare Carruba, Junior Suite Zagara. Arredi artigianali siciliani, lenzuola GOTS in cotone biologico e canapa.",
  keywords: [
    "camere hotel ecosostenibile Ragusa",
    "suite hotel biologico Sicilia",
    "lenzuola GOTS cotone biologico",
    "camera artigianale cotto ibleo",
    "hotel artigianale Ragusa",
    "suite terrazzo panoramico Sicilia",
    "camera accessibile disabili hotel Ragusa",
  ],
  openGraph: {
    title: "Camere & Suite — Hotel Pomelia Ragusa",
    description:
      "Arredi artigianali di maestri siciliani e lenzuola biologiche GOTS. Suite Gelsomino, Camera Mandorlo, Familiare Carruba, Junior Suite Zagara.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&auto=format&fit=crop",
        alt: "Suite Gelsomino con arredi artigianali siciliani e lenzuola certificate GOTS",
      },
    ],
  },
};

export default function CamerePage() {
  return <CamereContent />;
}
