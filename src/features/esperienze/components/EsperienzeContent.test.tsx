// =============================================================================
// TEST: EsperienzeContent — Rendering delle card esperienza dal database
//
// PERCHÉ È IMPORTANTE:
//   La pagina /esperienze racconta il territorio e differenzia l'hotel dai
//   competitor. Una lista vuota o un crash silenzioso svuota questa pagina
//   di valore editoriale e abbassa il tempo di permanenza degli utenti.
//   Il badge "Accessibile a tutti" è un elemento di marketing critico
//   per il segmento di clientela con disabilità motorie.
//
// COSA TESTIAMO:
//   1. Lista piena → ogni esperienza ha la sua card con titolo visibile
//   2. Lista vuota → struttura pagina integra, nessuna card, nessun crash
//   3. Resilienza → esperienza con tutti i campi opzionali assenti
//      (image, iconKey, subtitle, duration, difficulty, highlight)
//      non lancia errori di rendering
//   4. Badge highlight → esperienza con highlight=true mostra
//      il chip "Accessibile a tutti"
//
// NOTA SUI HEADING h3:
//   La pagina contiene un h3 statico ("Il turismo è per tutti") nella
//   sezione accessibilità. I test tengono conto di questo +1 fisso
//   quando contano i titoli dinamici delle esperienze.
// =============================================================================

import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

// --- Mocks ---

// next/image: stub minimo jsdom-compatibile
vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt?: string; src?: string }) => (
    <img alt={alt ?? ""} src={src ?? ""} />
  ),
}));

// next/link: passthrough con href per navigazione
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// dbConnect: nessuna connessione reale in fase di test
vi.mock("../../../core/database/mongoose", () => ({ default: vi.fn() }));

// Experience.find().lean(): valore controllato per ogni test
vi.mock("@/core/models/Experience", () => ({
  default: { find: vi.fn() },
}));

import EsperienzeContent from "./EsperienzeContent";
import Experience from "@/core/models/Experience";

// ---------------------------------------------------------------------------
// Fixture dati
// ---------------------------------------------------------------------------

const mockExperiences = [
  {
    _id: "exp-1",
    title: "Trekking agli Iblei",
    subtitle: "Natura e archeologia",
    description: "Un'escursione tra i carrubbi antichi e i templi rupestri.",
    duration: "4 ore",
    difficulty: "Facile",
    image: "https://example.com/trekking.jpg",
    imageAlt: "Sentiero tra i carrubbi ibrei",
    highlight: false,
    iconKey: "hiking",
    tags: ["Natura", "Storia"],
    highlights: [],
  },
  {
    _id: "exp-2",
    title: "Degustazione olio DOP Monti Iblei",
    subtitle: "Tradizione e sapori",
    description: "Visita al frantoio con degustazione di oli monocultivar.",
    duration: "2 ore",
    difficulty: "Tutti i livelli",
    image: "https://example.com/olio.jpg",
    imageAlt: "Bottiglie di olio DOP",
    highlight: true,
    iconKey: "oil_barrel",
    tags: ["Gastronomia", "Accessibile"],
    highlights: [],
  },
];

// Helper: configura Experience.find().lean()
function setExperiencesMock(data: typeof mockExperiences | []) {
  vi.mocked(Experience.find).mockReturnValue({
    lean: vi.fn().mockResolvedValue(data),
  } as any);
}

// ---------------------------------------------------------------------------
// Suite di test
// ---------------------------------------------------------------------------

describe("EsperienzeContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  // Scenario: Lista piena
  // Verifica che ogni esperienza restituita dal DB produca una card con
  // il titolo visibile. Il conteggio degli h3 esclude il "+1" statico
  // "Il turismo è per tutti" che è sempre presente in fondo alla pagina.
  // -------------------------------------------------------------------------
  it("renderizza una card per ogni esperienza presente nel mock", async () => {
    setExperiencesMock(mockExperiences);
    const ui = await EsperienzeContent();
    render(ui);

    // Ogni titolo esperienza deve comparire come heading
    expect(
      screen.getByRole("heading", { name: "Trekking agli Iblei", level: 3 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Degustazione olio DOP Monti Iblei", level: 3 })
    ).toBeInTheDocument();

    // Totale h3 = esperienze dinamiche + 1 heading statico accessibilità
    const allH3 = screen.getAllByRole("heading", { level: 3 });
    expect(allH3).toHaveLength(mockExperiences.length + 1);
  });

  // -------------------------------------------------------------------------
  // Scenario: Lista vuota
  // Verifica che il componente gestisca l'assenza di esperienze senza crash,
  // mantenendo integra la struttura statica della pagina (intro, sezione
  // accessibilità, CTA). Gli ospiti vedono comunque i contenuti editoriali.
  // -------------------------------------------------------------------------
  it("non crasha e non mostra card quando il DB restituisce lista vuota", async () => {
    setExperiencesMock([]);
    const ui = await EsperienzeContent();
    render(ui);

    // Heading di sezione deve rimanere visibile
    expect(
      screen.getByRole("heading", { name: /cosa ti aspetta/i, level: 2 })
    ).toBeInTheDocument();

    // Con 0 esperienze, l'unico h3 è quello statico dell'accessibilità
    const allH3 = screen.getAllByRole("heading", { level: 3 });
    expect(allH3).toHaveLength(1);
    expect(allH3[0]).toHaveTextContent(/turismo è per tutti/i);
  });

  // -------------------------------------------------------------------------
  // Scenario: Resilienza — campi opzionali tutti assenti
  // Verifica che un'esperienza con solo i campi minimi obbligatori (title,
  // description, tags: [], highlights: []) non produca TypeError.
  // Il componente accede a exp.image con ??, exp.iconKey con ?? null,
  // exp.tags.map() — quest'ultimo richiede tags come array anche se vuoto.
  // -------------------------------------------------------------------------
  it("non lancia errori se tutti i campi opzionali dell'esperienza sono assenti", async () => {
    const minimalExperience = {
      _id: "exp-minimal",
      title: "Esperienza Minima",
      description: "Una descrizione di base.",
      tags: [],       // richiesto dal .map() — array vuoto, non undefined
      highlights: [],
      // image, imageAlt, subtitle, duration, difficulty, highlight, iconKey: tutti assenti
    };

    setExperiencesMock([minimalExperience] as any);
    const ui = await EsperienzeContent();

    expect(() => render(ui)).not.toThrow();

    // La card deve apparire con il titolo
    expect(
      screen.getByRole("heading", { name: "Esperienza Minima", level: 3 })
    ).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Scenario: Badge "Accessibile a tutti" su esperienza in evidenza
  // Il chip highlight è un elemento di marketing critico: indica che
  // l'esperienza è fruibile anche da ospiti con disabilità motorie.
  // Una regressione qui renderebbe invisibile questa informazione.
  // -------------------------------------------------------------------------
  it("mostra il badge 'Accessibile a tutti' solo sulle esperienze con highlight=true", async () => {
    setExperiencesMock(mockExperiences);
    const ui = await EsperienzeContent();
    render(ui);

    // Il chip label è "Accessibile a tutti" (maiuscolo, testo intero).
    // La sezione statica contiene "accessibile a tutti, senza compromessi"
    // (minuscolo + testo aggiuntivo) — il match esatto li distingue.
    const badges = screen.getAllByText("Accessibile a tutti", { exact: true });
    expect(badges).toHaveLength(1);
  });
});
