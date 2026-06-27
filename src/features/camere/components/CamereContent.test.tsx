// =============================================================================
// TEST: CamereContent — Rendering delle card camera dal database
//
// PERCHÉ È IMPORTANTE:
//   La pagina /camere è il principale punto di conversione dell'hotel.
//   Se il componente crasha (lista undefined, campi mancanti) o non mostra
//   le camere restituite dal DB, i potenziali clienti vedono una pagina vuota
//   e non possono avviare la prenotazione.
//
// COSA TESTIAMO:
//   1. Lista piena → ogni camera ha la sua card e il suo bottone "Prenota"
//   2. Lista vuota → pagina integra, nessuna card, nessun crash
//   3. Resilienza → camera con campi opzionali assenti (description, images)
//      non provoca errori di rendering
//
// STRATEGIA DI MOCKING:
//   - dbConnect: stub no-op (non esiste connessione reale nei test)
//   - Room.find().lean(): restituisce array controllato da ogni test
//   - next/image e next/link: stub minimi compatibili con jsdom
//   - BookingTriggerButton: stub statico per isolare da Zustand/router
// =============================================================================

import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

// --- Mocks dichiarati prima degli import dei moduli sotto test ---
// next/image non funziona in jsdom (require canvas); lo rimpiazziamo
// con un <img> semplice che preserva alt e src per le asserzioni.
vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt?: string; src?: string }) => (
    <img alt={alt ?? ""} src={src ?? ""} />
  ),
}));

// next/link: manteniamo il comportamento di navigazione passando href al tag <a>
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// dbConnect: nei test non vogliamo connessioni reali a MongoDB
vi.mock("@/core/database/mongoose", () => ({ default: vi.fn() }));

// BookingTriggerButton usa useRouter e Zustand; isoliamo CamereContent
// dai layer client-side rendendo il mock abbastanza realistico da testare
// che il bottone "Prenota <roomName>" compaia per ogni camera.
vi.mock("@/features/camere/components/BookingTriggerButton", () => ({
  BookingTriggerButton: ({ roomName }: { roomName: string }) => (
    <button aria-label={`Prenota ${roomName}`}>Prenota questa camera</button>
  ),
}));

// Room.find().lean() è la chiamata che porta i dati reali;
// controlliamo il suo valore di ritorno in ogni singolo test.
vi.mock("@/core/models/Room", () => ({
  default: { find: vi.fn() },
}));

import CamereContent from "./CamereContent";
import Room from "@/core/models/Room";

// ---------------------------------------------------------------------------
// Fixture dati
// ---------------------------------------------------------------------------

const mockRooms = [
  {
    _id: "room-1",
    name: "Suite Gelsomino",
    description: "Suite con arredi artigianali siciliani e vista giardino.",
    images: ["https://example.com/suite.jpg"],
    capacity: 2,
    features: ["Wi-Fi", "Aria condizionata", "Vasca idromassaggio"],
    available: true,
  },
  {
    _id: "room-2",
    name: "Camera Arancio",
    description: "Stanza luminosa al primo piano, ideale per coppie.",
    images: ["https://example.com/arancio.jpg"],
    capacity: 2,
    features: ["Bagno privato"],
    available: true,
  },
];

// Helper: configura Room.find().lean() con il valore fornito
function setRoomsMock(data: typeof mockRooms | []) {
  vi.mocked(Room.find).mockReturnValue({
    lean: vi.fn().mockResolvedValue(data),
  } as any);
}

// ---------------------------------------------------------------------------
// Suite di test
// ---------------------------------------------------------------------------

describe("CamereContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  // Scenario: Lista piena
  // Verifica che ogni camera restituita dal DB produca una card visibile
  // con il suo nome e un bottone di prenotazione dedicato.
  // Senza questo test, una regressione nel .map() potrebbe silenziare
  // tutte le camere senza errori evidenti in console.
  // -------------------------------------------------------------------------
  it("renderizza una card per ogni camera disponibile nel mock", async () => {
    setRoomsMock(mockRooms);
    const ui = await CamereContent();
    render(ui);

    // Ogni nome camera deve essere visibile come heading di terzo livello
    expect(
      screen.getByRole("heading", { name: "Suite Gelsomino", level: 3 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Camera Arancio", level: 3 })
    ).toBeInTheDocument();

    // Il numero di bottoni "Prenota" deve corrispondere esattamente
    // al numero di camere — ni più, ni meno
    const prenota = screen.getAllByRole("button", { name: /^Prenota/i });
    expect(prenota).toHaveLength(mockRooms.length);
  });

  // -------------------------------------------------------------------------
  // Scenario: Lista vuota
  // Verifica che il componente gestisca l'assenza di camere evitando
  // errori di runtime e mantenendo integra la struttura della pagina
  // (heading di sezione, sezione CTA in fondo).
  // -------------------------------------------------------------------------
  it("non crasha e non mostra card quando il DB restituisce lista vuota", async () => {
    setRoomsMock([]);
    const ui = await CamereContent();
    render(ui);

    // La sezione deve esistere anche senza camere
    expect(
      screen.getByRole("heading", { name: /soluzioni di soggiorno/i, level: 2 })
    ).toBeInTheDocument();

    // Nessun bottone di prenotazione deve comparire
    expect(
      screen.queryAllByRole("button", { name: /^Prenota/i })
    ).toHaveLength(0);
  });

  // -------------------------------------------------------------------------
  // Scenario: Resilienza — campi opzionali assenti
  // Verifica che una camera con solo i campi minimi obbligatori (name,
  // capacity, features come array vuoto, images come array vuoto) non
  // produca errori. description è undefined: JSX deve gestirlo senza crash.
  // -------------------------------------------------------------------------
  it("non lancia errori se i campi opzionali della camera sono assenti", async () => {
    const minimalRoom = {
      _id: "room-minimal",
      name: "Camera Base",
      capacity: 2,
      features: [],  // array vuoto: .map() non crasha
      images: [],    // array vuoto: images?.[0] è undefined, Image non viene reso
      available: true,
      // description: assente (campo opzionale nel modello)
    };

    setRoomsMock([minimalRoom] as any);
    const ui = await CamereContent();

    expect(() => render(ui)).not.toThrow();

    // La card deve comunque apparire con il nome camera
    expect(
      screen.getByRole("heading", { name: "Camera Base", level: 3 })
    ).toBeInTheDocument();
  });
});
