import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const rooms = [
  {
    name: "Suite Gelsomino",
    description:
      "La nostra suite più esclusiva: ampio terrazzo privato con vista sugli ulivi e il mare all'orizzonte. Letto king-size con baldacchino artigianale, vasca freestanding in terracotta locale, arredi di recupero firmati da maestro Salvatore Cagliostro di Ragusa.",
    capacity: 2,
    features: [
      "Terrazzo privato con vista panoramica",
      "Letto king-size con baldacchino",
      "Vasca freestanding in terracotta locale",
      "Arredi di recupero artigianali",
      "Lenzuola in cotone biologico GOTS",
      "Minibar con prodotti biologici locali",
      "Wi-Fi ad alta velocità",
      'Smart TV 55" con streaming',
    ],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80",
    ],
  },
  {
    name: "Camera Mandorlo",
    description:
      "Camera doppia con vista sul giardino di mandorli. Atmosfera intima e naturale con pareti in calce bianca, pavimento in cotto ibleo fatto a mano e lenzuola in canapa certificata GOTS. Perfetta per coppie che cercano autenticità.",
    capacity: 2,
    features: [
      "Vista giardino di mandorli",
      "Pavimento in cotto ibleo artigianale",
      "Pareti in calce naturale bianca",
      "Lenzuola in canapa biologica GOTS",
      "Arredi di recupero",
      "Doccia walk-in con pietra di Comiso",
      "Wi-Fi gratuito",
    ],
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80",
    ],
  },
  {
    name: "Familiare Carruba",
    description:
      "Soluzione ideale per famiglie: due camere comunicanti, due bagni completi, un angolo salotto con divano letto per bambini. Pavimenti in graniglia di Ragusa, soffitto a volta originale, colori della terra siciliana. Baby kit biologico incluso.",
    capacity: 4,
    features: [
      "Due camere comunicanti",
      "Due bagni completi",
      "Angolo salotto con divano letto",
      "Pavimento in graniglia di Ragusa",
      "Soffitto a volta originale",
      "Baby kit biologico incluso",
      "Lenzuola in cotone biologico GOTS",
      "Frigorifero con snack biologici",
    ],
    images: [
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&auto=format&fit=crop&q=80",
    ],
  },
  {
    name: "Junior Suite Zagara",
    description:
      "Junior suite per coppie con patio privato fiorito di zagare. Ampio letto queen, scrittoio artigianale in legno di carrubo recuperato, vasca doppia. L'aroma degli agrumi al mattino è incluso nel prezzo.",
    capacity: 2,
    features: [
      "Patio privato fiorito",
      "Letto queen con testiera in legno carrubo",
      "Vasca doppia",
      "Scrittoio in legno di recupero",
      "Lenzuola in cotone biologico GOTS",
      "Prodotti da bagno biologici",
      "Accappatoi in cotone equo-solidale",
      "Wi-Fi gratuito",
    ],
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80",
    ],
  },
];

const experiences = [
  {
    iconKey: "hiking",
    title: "Trekking negli Iblei",
    subtitle: "Natura guidata",
    description:
      "Alessandro vi accompagna lungo sentieri inediti degli altipiani iblei: carrubbeti centenari, cave di pietra abbandonata, panorami sul mare di Donnalucata. Difficoltà bassa-media, adatto a famiglie. Durata 3–4 ore.",
    tags: ["Natura", "Famiglia", "Guidato"],
    difficulty: "Facile–Media",
    duration: "3–4 ore",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Trekking negli altipiani iblei con carrubeti centenari e paesaggi siciliani",
    highlight: false,
  },
  {
    iconKey: "oil_barrel",
    title: "Olio DOP a Chiaramonte Gulfi",
    subtitle: "Degustazione guidata",
    description:
      'Chiaramonte Gulfi, la "Milano del Sud", è il cuore della produzione di olio Tonda Iblea DOP. Vi portiamo nel migliore frantoio familiare per vedere la molitura, degustare in purezza e acquistare direttamente dal produttore.',
    tags: ["Enogastronomia", "Cultura", "Shopping"],
    difficulty: "Nessuna",
    duration: "Mezza giornata",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Degustazione di olio extravergine Tonda Iblea DOP a Chiaramonte Gulfi",
    highlight: false,
  },
  {
    iconKey: "car",
    title: "Giornata ad Agrigento",
    subtitle: "Patrimonio UNESCO",
    description:
      "La Valle dei Templi è patrimonio dell'UNESCO e dista 90 km. Vi organizziamo il transfer condiviso in van elettrico, la guida certificata e l'ingresso. Un'esperienza che unisce grandezza greca e Sicilia profonda.",
    tags: ["Cultura", "Patrimonio UNESCO", "Transfer"],
    difficulty: "Nessuna",
    duration: "Giornata intera",
    image: "https://images.unsplash.com/photo-1601465747956-a85bf0b21ce7?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Tempio della Concordia nella Valle dei Templi ad Agrigento, patrimonio UNESCO",
    highlight: false,
  },
  {
    iconKey: "waves",
    title: "Spiaggia Privata Accessibile",
    subtitle: "Barrier-free certificata",
    description:
      "La nostra spiaggia privata sul Mediterraneo è certificata per l'accessibilità totale: pedane, carrozzine anfibie, assistenti formati e ombrelloni regolabili. Il mare è un diritto, non un privilegio.",
    tags: ["Accessibilità", "Mare", "Certificata"],
    difficulty: "Accessibile a tutti",
    duration: "Libero",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Spiaggia barrier-free accessibile con pedane sul mare cristallino siciliano",
    highlight: true,
  },
];

const dishes = [
  {
    name: "Maccu di Favi Ragusano",
    description:
      "La zuppa della tradizione iblea: fave secche di produzione propria, finocchietto selvatico raccolto nei campi circostanti, olio extravergine di oliva locale. Una ricetta tramandata da generazioni che racconta il territorio.",
    origin: "Tradizione Iblea",
    season: "Autunno · Inverno",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Maccu di favi ragusano con finocchietto e olio extravergine ibleo",
  },
  {
    name: "Schiaccia Ragusana",
    description:
      "Focaccia ricca e saporita ripiena con tuma fresca, acciughe e cipolla caramellata. La nostra versione utilizza farina di grano antico Tumminia macinata a pietra da mulino locale, lievitazione naturale di 48 ore.",
    origin: "Ragusa Ibla",
    season: "Tutto l'anno",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Schiaccia ragusana con tuma fresca e acciughe locali su grano Tumminia",
  },
  {
    name: "'Mpanatigghi",
    description:
      "Il dolce più misterioso e amato di Ragusa: pasta frolla con ripieno di carne di manzo macinata, cioccolato fondente, mandorle di Avola e cannella. Un incontro arabo-normanno sopravvissuto intatto nei secoli.",
    origin: "Modica · Ragusa",
    season: "Dicembre · Pasqua",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80",
    imageAlt: "'Mpanatigghi: dolci tipici ragusani con cioccolato e mandorle di Avola",
  },
];

const workshops = [
  {
    iconKey: "chef",
    title: "Workshop di Cucina Siciliana",
    description:
      "Tre ore con la chef Chiara tra i profumi dell'orto. Si impara a fare la pasta fresca iblea, il pane di casa e almeno uno dei nostri dolci tradizionali. Incluse degustazione e ricette da portare a casa.",
    duration: "3 ore",
    maxGuests: 8,
  },
  {
    iconKey: "garden",
    title: "Tour dell'Orto in Permacultura",
    description:
      "Alessandro vi guida nella scoperta dell'orto sinergico: le piante compagne, il compostaggio, i sistemi di raccolta dell'acqua piovana. Un modo diverso di guardare il cibo e la terra.",
    duration: "1,5 ore",
    maxGuests: 12,
  },
  {
    iconKey: "wine",
    title: "Degustazione di Oli e Vini Iblei",
    description:
      "Serata di abbinamento con produttori locali: olio monocultivar Tonda Iblea DOP, vini Cerasuolo di Vittoria DOCG e Nero d'Avola. Ogni prodotto ha una storia e un territorio da raccontare.",
    duration: "2 ore",
    maxGuests: 16,
  },
];

async function main() {
  console.log("Seeding rooms...");

  await prisma.room.deleteMany({});

  const result = await prisma.room.createMany({ data: rooms });

  console.log(`Seeded ${result.count} rooms.`);

  console.log("Seeding experiences...");

  for (const exp of experiences) {
    await prisma.experience.upsert({
      where: { title: exp.title },
      update: exp,
      create: exp,
    });
  }

  console.log(`Seeded ${experiences.length} experiences.`);

  console.log("Seeding dishes...");

  for (const dish of dishes) {
    await prisma.dish.upsert({
      where: { name: dish.name },
      update: dish,
      create: dish,
    });
  }

  console.log(`Seeded ${dishes.length} dishes.`);

  console.log("Seeding workshops...");

  for (const ws of workshops) {
    await prisma.workshop.upsert({
      where: { title: ws.title },
      update: ws,
      create: ws,
    });
  }

  console.log(`Seeded ${workshops.length} workshops.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
