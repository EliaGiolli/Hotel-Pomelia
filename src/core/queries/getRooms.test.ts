// @vitest-environment node
// =============================================================================
// TEST DI INTEGRAZIONE: getRooms — Query sulle camere disponibili
//
// PERCHÉ È IMPORTANTE:
//   getRooms() è il punto di ingresso dei dati per la pagina /camere.
//   Un filtro errato (es. restituisce camere non disponibili) o una regressione
//   nel mapping dei campi espone al pubblico dati inconsistenti, impattando
//   direttamente le conversioni e la reputazione dell'hotel.
//
// COSA TESTIAMO:
//   1. DB vuoto → array vuoto (nessun crash, nessuna eccezione)
//   2. Solo camere available:true → restituisce esattamente quelle
//   3. Mix available true/false → filtra correttamente, esclude le non disponibili
//   4. Correttezza dei dati → i campi del documento corrispondono a quelli inseriti
//   5. Proprietà lean → i risultati sono plain objects, non istanze Mongoose
//
// AMBIENTE:
//   MongoDB in-memory (MongoMemoryServer) isolato per questa suite.
//   Ogni test parte da un DB vuoto grazie a clearDB() in afterEach.
// =============================================================================

import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import Room from "@/core/models/Room";
import { getRooms } from "./getRooms";
import { connectDB, closeDB, clearDB } from "@/core/lib/test-db";

// ---------------------------------------------------------------------------
// Setup del DB in-memory — ciclo di vita della suite
// ---------------------------------------------------------------------------

beforeAll(async () => {
  // Avvia mongod in-memory e connette Mongoose: tutti i model del worker
  // useranno automaticamente questa connessione per l'intera suite.
  await connectDB();
});

afterEach(async () => {
  // Pulisce le collection dopo ogni test per garantire isolamento completo
  // tra i casi d'uso senza dover riavviare il server.
  await clearDB();
});

afterAll(async () => {
  // Disconnette Mongoose e termina il processo mongod.
  await closeDB();
});

// ---------------------------------------------------------------------------
// Fixture helper — dati riutilizzabili
// ---------------------------------------------------------------------------

const baseRoom = {
  name: "Suite Gelsomino",
  type: "suite",
  pricePerNight: 200,
  description: "Suite con arredi artigianali siciliani.",
  images: ["https://example.com/suite.jpg"],
  capacity: 2,
  features: ["Wi-Fi", "Aria condizionata"],
  available: true,
};

// ---------------------------------------------------------------------------
// Suite di test
// ---------------------------------------------------------------------------

describe("getRooms", () => {

  // -------------------------------------------------------------------------
  // Scenario: DB vuoto
  // Il sito deve funzionare anche se non ci sono camere nel database
  // (es. manutenzione, migrazione). Un crash qui azzera la pagina /camere.
  // -------------------------------------------------------------------------
  it("restituisce un array vuoto se il database non contiene camere", async () => {
    const result = await getRooms();
    expect(result).toEqual([]);
  });

  // -------------------------------------------------------------------------
  // Scenario: Filtraggio available
  // La query deve rispettare il flag available:true. Una camera in manutenzione
  // (available:false) non deve mai comparire nella lista pubblica.
  // -------------------------------------------------------------------------
  it("restituisce solo le camere con available:true", async () => {
    await Room.create([
      { ...baseRoom, name: "Camera Disponibile", available: true },
      { ...baseRoom, name: "Camera in Manutenzione", available: false },
    ]);

    const result = await getRooms();

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Camera Disponibile");
  });

  // -------------------------------------------------------------------------
  // Scenario: Mix di camere disponibili e non
  // Con N camere available:true e M available:false, la funzione
  // deve restituire esattamente N risultati.
  // -------------------------------------------------------------------------
  it("restituisce tutte e sole le camere disponibili in presenza di mix", async () => {
    await Room.create([
      { ...baseRoom, name: "Deluxe", available: true },
      { ...baseRoom, name: "Standard", available: true },
      { ...baseRoom, name: "Chiusa per rinnovo", available: false },
    ]);

    const result = await getRooms();

    expect(result).toHaveLength(2);
    const nomi = result.map((r) => r.name);
    expect(nomi).toContain("Deluxe");
    expect(nomi).toContain("Standard");
    expect(nomi).not.toContain("Chiusa per rinnovo");
  });

  // -------------------------------------------------------------------------
  // Scenario: Correttezza dei dati restituiti
  // I campi del documento salvato devono corrispondere esattamente a quelli
  // letti. Una discrepanza qui indica un problema nel model o nello schema.
  // -------------------------------------------------------------------------
  it("restituisce i dati esattamente come sono stati salvati nel DB", async () => {
    const seed = {
      ...baseRoom,
      name: "Camera Arancio",
      pricePerNight: 150,
      capacity: 3,
      features: ["Balcone", "Vasca", "Wi-Fi"],
      images: ["https://example.com/arancio.jpg"],
    };
    await Room.create(seed);

    const [room] = await getRooms();

    expect(room.name).toBe(seed.name);
    expect(room.pricePerNight).toBe(seed.pricePerNight);
    expect(room.capacity).toBe(seed.capacity);
    expect(room.features).toEqual(seed.features);
    expect(room.images).toEqual(seed.images);
  });

  // -------------------------------------------------------------------------
  // Scenario: Risultati lean (plain objects)
  // .lean() restituisce POJO invece di istanze Mongoose Document.
  // I server components e i client components lavorano con plain objects:
  // passare un Mongoose Document causa errori di serializzazione in Next.js.
  // -------------------------------------------------------------------------
  it("restituisce plain objects, non istanze Mongoose Document", async () => {
    await Room.create(baseRoom);

    const [room] = await getRooms();

    // Un Document Mongoose avrebbe save(), $isNew, ecc.
    // Un plain object non ha il metodo save().
    expect(typeof (room as any).save).toBe("undefined");
    // Deve però avere _id come campo normale
    expect(room._id).toBeDefined();
  });
});
