export interface Highlight {
  iconKey: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
}

export interface Generation {
  year: string;
  name: string;
  role: string;
  text: string;
}

export interface BenefitPillar {
  iconKey: string;
  label: string;
  detail: string;
}

export const highlights: Highlight[] = [
  {
    iconKey: "bed",
    title: "Camere Artigianali",
    description:
      "Suite e camere con arredi di recupero realizzati da maestri artigiani siciliani. Lenzuola certificate GOTS in canapa e cotone biologico. Zero plastica monouso.",
    href: "/camere",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Suite Gelsomino con arredi artigianali in legno recuperato e lenzuola GOTS",
  },
  {
    iconKey: "restaurant",
    title: "Cucina 0 km",
    description:
      "Maccu di favi ragusano, Schiaccia ragusana, 'Mpanatigghi: sapori autentici dall'orto biologico di proprietà. Workshop di cucina siciliana e permacultura con la chef Chiara.",
    href: "/ristorazione",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Piatti della cucina siciliana biologica 0 km dell'Hotel Pomelia",
  },
  {
    iconKey: "hiking",
    title: "Territorio & Esperienze",
    description:
      "Trekking negli Iblei, degustazione di olio Tonda Iblea DOP a Chiaramonte Gulfi, escursioni alla Valle dei Templi di Agrigento. La Sicilia più autentica a portata di mano.",
    href: "/esperienze",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Trekking nei paesaggi degli altipiani iblei siciliani",
  },
  {
    iconKey: "solar",
    title: "100% Rinnovabile",
    description:
      "Energia solare al 130% del fabbisogno, 87% dei rifiuti in compost. Spiaggia privata certificata barrier-free. Lusso responsabile che rispetta persone e pianeta.",
    href: "/sostenibilita",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Pannelli solari sul tetto dell'Hotel Pomelia per energia 100% rinnovabile",
  },
];

export const generations: Generation[] = [
  {
    year: "1958",
    name: "Salvatore Pomelia",
    role: "Fondatore",
    text: "Salvatore trasforma la masseria di famiglia in una locanda per i viaggiatori di passaggio tra Ragusa e il mare. Quattro camere, un tavolo comune, il vino di casa. L'ospitalità come dono, non come commercio.",
  },
  {
    year: "1985",
    name: "Laura Pomelia",
    role: "Seconda generazione",
    text: "Laura introduce l'orto biologico, avvia i rapporti con i produttori locali e ottiene la prima certificazione ambientale. «Mio padre accoglieva le persone. Io ho imparato ad accogliere anche il territorio».",
  },
  {
    year: "Oggi",
    name: "Chiara, Laura & Alessandro",
    role: "Terza generazione",
    text: "Chiara in cucina, Laura alla direzione, Alessandro fuori — tra gli Iblei e la spiaggia. Nel 2021 diventano Società Benefit certificata. La missione non è cambiata: fare del bene ospitando bene.",
  },
];

export const benefitPillars: BenefitPillar[] = [
  {
    iconKey: "solar",
    label: "Energia solare 130%",
    detail: "Produciamo il 30% in più del nostro fabbisogno",
  },
  {
    iconKey: "recycling",
    label: "87% rifiuti recuperati",
    detail: "Compost, riciclo, economia circolare",
  },
  {
    iconKey: "water",
    label: "−40% consumo idrico",
    detail: "Sotto la media nazionale con raccolta piovana",
  },
  {
    iconKey: "accessible",
    label: "100% barrier-free",
    detail: "Ogni spazio accessibile, spiaggia inclusa",
  },
];
