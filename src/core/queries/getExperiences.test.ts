// @vitest-environment node
// =============================================================================
// TEST DI INTEGRAZIONE: getExperiences — Query sulle esperienze del territorio
//
// PERCHÉ È IMPORTANTE:
//   getExperiences() alimenta la pagina /esperienze, vetrina del territorio
//   ibleo che differenzia l'hotel dai competitor. Dati mancanti o mal
//   restituiti riducono il valore editoriale della pagina e abbassano
//   il tasso di conversione degli ospiti interessati al territorio.
//
// COSA TESTIAMO:
//   1. DB vuoto → array vuoto senza crash
//   2. Dati popolati → tutte le esperienze vengono restituite
//   3. Correttezza dei dati → i campi corrispondono a quelli salvati
//   4. Campi opzionali assenti → la funzione non crasha, li omette o usa i default
//   5. Proprietà lean → plain objects pronti per la serializzazione Next.js
//
// AMBIENTE:
//   MongoDB in-memory (MongoMemoryServer) isolato per questa suite.
//   Ogni test parte da un DB vuoto grazie a clearDB() in afterEach.
// =============================================================================

import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import Experience from "@/core/models/Experience";
import { getExperiences } from "./getExperiences";
import { connectDB, closeDB, clearDB } from "@/core/lib/test-db";

// ---------------------------------------------------------------------------
// Setup del DB in-memory
// ---------------------------------------------------------------------------

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await closeDB();
});

// ---------------------------------------------------------------------------
// Fixture helper
// ---------------------------------------------------------------------------

const baseExperience = {
  title: "Trekking agli Iblei",
  subtitle: "Natura e archeologia",
  description: "Escursione tra carrubbi e templi rupestri.",
  duration: "4 ore",
  difficulty: "Facile",
  image: "https://example.com/trekking.jpg",
  imageAlt: "Sentiero ibleo",
  highlight: false,
  iconKey: "hiking",
  tags: ["Natura", "Storia"],
  highlights: [],
};

// ---------------------------------------------------------------------------
// Suite di test
// ---------------------------------------------------------------------------

describe("getExperiences", () => {

  // -------------------------------------------------------------------------
  // Scenario: DB vuoto
  // La pagina /esperienze deve reggere anche durante la prima configurazione
  // dell'hotel, quando il DB non è ancora stato popolato.
  // -------------------------------------------------------------------------
  it("restituisce un array vuoto se il database non contiene esperienze", async () => {
    const result = await getExperiences();
    expect(result).toEqual([]);
  });

  // -------------------------------------------------------------------------
  // Scenario: Lista popolata
  // Con N esperienze nel DB, la funzione deve restituirle tutte.
  // A differenza di getRooms, getExperiences non filtra: mostra tutto.
  // -------------------------------------------------------------------------
  it("restituisce tutte le esperienze presenti nel database", async () => {
    await Experience.create([
      { ...baseExperience, title: "Trekking agli Iblei" },
      { ...baseExperience, title: "Degustazione olio DOP" },
      { ...baseExperience, title: "Tour del barocco siciliano" },
    ]);

    const result = await getExperiences();

    expect(result).toHaveLength(3);
    const titoli = result.map((e) => e.title);
    expect(titoli).toContain("Trekking agli Iblei");
    expect(titoli).toContain("Degustazione olio DOP");
    expect(titoli).toContain("Tour del barocco siciliano");
  });

  // -------------------------------------------------------------------------
  // Scenario: Correttezza dei dati
  // Ogni campo salvato deve essere letto identicamente.
  // Include la verifica di campi booleani (highlight) e array (tags).
  // -------------------------------------------------------------------------
  it("restituisce i dati esattamente come sono stati salvati nel DB", async () => {
    const seed = {
      ...baseExperience,
      title: "Degustazione olio DOP Monti Iblei",
      highlight: true,
      tags: ["Gastronomia", "Accessibile"],
      duration: "2 ore",
      difficulty: "Tutti i livelli",
    };
    await Experience.create(seed);

    const [exp] = await getExperiences();

    expect(exp.title).toBe(seed.title);
    expect(exp.highlight).toBe(true);
    expect(exp.tags).toEqual(seed.tags);
    expect(exp.duration).toBe(seed.duration);
    expect(exp.difficulty).toBe(seed.difficulty);
  });

  // -------------------------------------------------------------------------
  // Scenario: Campi opzionali assenti
  // IExperience ha molti campi opzionali (image, iconKey, subtitle, ecc.).
  // Se un documento nel DB ne è privo, la funzione non deve crashare:
  // Mongoose usa i valori di default definiti nello Schema ("", false, []).
  // -------------------------------------------------------------------------
  it("gestisce correttamente esperienze con soli i campi obbligatori", async () => {
    await Experience.create({
      title: "Esperienza Minima",
      description: "Una descrizione base.",
      tags: [],
      highlights: [],
      // Tutti i campi opzionali omessi — Mongoose applica i default dello Schema
    });

    const result = await getExperiences();

    expect(result).toHaveLength(1);
    // I default dello Schema per i campi opzionali sono stringa vuota / false
    expect(result[0].title).toBe("Esperienza Minima");
    expect(result[0].highlight).toBe(false);
    expect(result[0].tags).toEqual([]);
  });

  // -------------------------------------------------------------------------
  // Scenario: Risultati lean (plain objects)
  // Next.js non può serializzare Mongoose Documents (proprietà non serializzabili).
  // I risultati devono essere POJO per essere passati dai server components
  // ai client components senza errori "Objects are not valid as a React child".
  // -------------------------------------------------------------------------
  it("restituisce plain objects, non istanze Mongoose Document", async () => {
    await Experience.create(baseExperience);

    const [exp] = await getExperiences();

    expect(typeof (exp as any).save).toBe("undefined");
    expect(exp._id).toBeDefined();
  });
});
