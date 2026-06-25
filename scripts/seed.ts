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
        images: [],
      },
      {
        name: "Camera Deluxe",
        type: "deluxe",
        pricePerNight: 95,
        description: "Spaziosa e luminosa, ideale per il relax.",
        capacity: 2,
        features: ["Wi-Fi", "Aria Condizionata", "Smart TV"],
        images: [],
      },
    ]);
    console.log("🔮 Camere inserite.");

    // 2. Popolamento Esperienze
    await Experience.deleteMany({});
    await Experience.create([
      {
        title: "Tour delle Cantine",
        subtitle: "I sapori del Val di Noto",
        description: "Degustazione di vini locali e prodotti tipici.",
        price: 45,
        duration: "3 ore",
        iconKey: "wine",
        tags: ["Enogastronomia", "Cultura"],
        highlights: ["Guida esperta", "Degustazione di 4 vini", "Tagliere incluso"],
      },
      {
        title: "Escursione in Barca",
        subtitle: "Le calette di Marina di Ragusa",
        description: "Giornata alla scoperta delle calette nascoste.",
        price: 80,
        duration: "1 giorno",
        iconKey: "boat",
        tags: ["Avventura", "Mare"],
        highlights: ["Pranzo a bordo", "Attrezzatura snorkeling", "Soste bagno"],
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
