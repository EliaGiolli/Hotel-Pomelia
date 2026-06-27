import mongoose from "mongoose";
import Room from "../src/core/models/Room";
import Experience from "../src/core/models/Experience";
import Restaurant from "../src/core/models/Restaurant";

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error("❌ ERRORE: DATABASE_URL non trovata nell'ambiente.");
  process.exit(1);
}

async function main() {
  try {
    console.log("Connessione a MongoDB Atlas in corso...");
    await mongoose.connect(uri!);
    console.log("✅ Connesso con successo! Inizio popolamento database...");

    // 1. Popolamento Camere
    await Room.deleteMany({});
    await Room.create([
      {
        name: "Suite Pomelia",
        type: "suite",
        pricePerNight: 150,
        description: "Splendida vista sul giardino e massimo comfort.",
        capacity: 2,
        features: ["Wi-Fi", "Aria Condizionata", "Minibar", "Idromassaggio"],
        images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=75"],
      },
      {
        name: "Camera Deluxe",
        type: "deluxe",
        pricePerNight: 95,
        description: "Spaziosa e luminosa, ideale per il relax.",
        capacity: 2,
        features: ["Wi-Fi", "Aria Condizionata", "Smart TV"],
        images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=75"],
      },
    ]);
    console.log("🔮 Camere inserite.");

    // 2. Popolamento Esperienze
    await Experience.deleteMany({});
    await Experience.create([
      {
        title: "Trekking negli Iblei",
        subtitle: "Paesaggi ragusani off the beaten path",
        description: "Escursione guidata lungo i sentieri degli altipiani iblei tra ulivi secolari, cave e masserie abbandonate. Una camminata lenta nel paesaggio che ha ispirato Montalbano.",
        price: 35,
        duration: "4 ore",
        difficulty: "Facile",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=75",
        imageAlt: "Trekking nei paesaggi degli altipiani iblei ragusani",
        highlight: true,
        iconKey: "hiking",
        tags: ["Natura", "Accessibile", "Famiglie"],
        highlights: ["Guida naturalista locale", "Sosta a masseria biologica", "Adatto a sedie a rotelle"],
      },
      {
        title: "Degustazione Olio Tonda Iblea",
        subtitle: "L'oro verde di Chiaramonte Gulfi",
        description: "Visita a un frantoio biologico certificato DOP a Chiaramonte Gulfi. Raccolta delle olive (in stagione), frangitura, degustazione guidata con abbinamenti di pane casereccio e verdure di stagione.",
        price: 45,
        duration: "3 ore",
        difficulty: "Facile",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=75",
        imageAlt: "Degustazione olio extravergine Tonda Iblea DOP a Chiaramonte Gulfi",
        highlight: false,
        iconKey: "oil_barrel",
        tags: ["Enogastronomia", "Cultura", "DOP"],
        highlights: ["Frantoio biologico certificato", "Degustazione guidata", "Prodotti inclusi"],
      },
      {
        title: "Tour Barocco Ragusa Ibla",
        subtitle: "Patrimonio UNESCO a due passi",
        description: "Passeggiata privata nel centro storico di Ragusa Ibla con guida abilitata. Piazza Duomo, chiesa di San Giorgio, belvedere sul Vallone di Santo Spirito. Ragusa vista dai ragusani, non dai dépliant.",
        price: 40,
        duration: "2 ore",
        difficulty: "Facile",
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&auto=format&fit=crop&q=75",
        imageAlt: "Centro storico barocco di Ragusa Ibla patrimonio UNESCO",
        highlight: false,
        iconKey: "car",
        tags: ["Storia", "Arte", "UNESCO"],
        highlights: ["Guida turistica abilitata", "Massimo 8 persone", "Racconto dei palazzi nobiliari"],
      },
      {
        title: "Snorkeling alle Calette di Marina di Ragusa",
        subtitle: "Il Mediterraneo cristallino a 15 minuti",
        description: "Mezza giornata in barca a vela lungo la costa ragusana. Soste in calette accessibili solo via mare, snorkeling guidato tra Posidonia e fondali sabbiosi. Carrozzine anfibie disponibili a bordo.",
        price: 80,
        duration: "5 ore",
        difficulty: "Facile",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=75",
        imageAlt: "Calette cristalline del mar Mediterraneo a Marina di Ragusa",
        highlight: true,
        iconKey: "waves",
        tags: ["Mare", "Accessibile", "Avventura"],
        highlights: ["Carrozzine anfibie disponibili", "Attrezzatura snorkeling inclusa", "Pranzo a bordo"],
      },
    ]);
    console.log("🔮 Esperienze inserite.");

    // 3. Popolamento Ristorante
    await Restaurant.deleteMany({});
    await Restaurant.create([
      { name: "Cavatelli alla Pomelia", description: "Pasta fresca con datterino, basilico e ricotta salata.", price: 14, category: "primi" },
      { name: "Cannolo Siciliano Scomposto", description: "Cialda croccante, ricotta fresca e gocce di cioccolato.", price: 6, category: "dolci" },
    ]);
    console.log("🔮 Menu Ristorante inserito.");

    console.log("🎉 Seed completato con successo!");
  } catch (error) {
    console.error("❌ Errore durante il database seed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Connessione chiusa.");
  }
}

main();
