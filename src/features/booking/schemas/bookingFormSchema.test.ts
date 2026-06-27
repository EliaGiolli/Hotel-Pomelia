// =============================================================================
// TEST: bookingFormSchema — Validazione del form di prenotazione
//
// PERCHÉ È IMPORTANTE:
//   Lo schema Zod è il guardiano dei dati che entrano nel database.
//   Un errore di validazione non rilevato qui può portare a prenotazioni
//   con date impossibili (check-out prima del check-in), email malformate
//   o campi obbligatori mancanti — tutti scenari che rompono il flusso
//   di business e richiedono intervento manuale.
//
// COSA TESTIAMO:
//   1. Dati validi → lo schema li accetta senza errori
//   2. Email malformata → errore sul campo guestEmail
//   3. Nome troppo corto → errore sul campo guestName
//   4. Check-in nel passato → errore sul campo checkIn
//   5. Check-out uguale o precedente al check-in → errore sul campo checkOut
//   6. boardType non valido → errore sul campo boardType
// =============================================================================

import { describe, it, expect } from "vitest";
import { bookingFormSchema } from "./bookingFormSchema";

// Costruisce una data futura a partire da oggi + N giorni (UTC),
// così i test non diventano obsoleti col passare del tempo.
function futureDate(daysFromNow: number): Date {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + daysFromNow));
}

// Dati base sempre validi: riutilizzati e sovrascritti in ogni caso di test
// per ridurre il boilerplate e rendere evidente cosa cambia in ogni scenario.
const validBase = {
  guestName: "Mario Rossi",
  guestEmail: "mario@example.com",
  checkIn: futureDate(3),
  checkOut: futureDate(5),
  roomType: "Deluxe",
  boardType: "Colazione" as const,
  notes: "",
};

describe("bookingFormSchema", () => {
  // ----- CASO FELICE --------------------------------------------------------

  it("accetta una prenotazione completamente valida", () => {
    // Se questo test fallisce, nulla funziona: il form non può mai essere inviato.
    const result = bookingFormSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });

  // ----- VALIDAZIONE OSPITE -------------------------------------------------

  it("rifiuta un'email malformata", () => {
    // Un'email non valida impedisce di contattare il cliente per la conferma.
    const result = bookingFormSchema.safeParse({ ...validBase, guestEmail: "non-una-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain("guestEmail");
    }
  });

  it("rifiuta un nome con meno di 2 caratteri", () => {
    // Un nome di un solo carattere è quasi certamente un errore di digitazione.
    const result = bookingFormSchema.safeParse({ ...validBase, guestName: "A" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain("guestName");
    }
  });

  // ----- VALIDAZIONE DATE ---------------------------------------------------

  it("rifiuta un check-in nel passato", () => {
    // Accettare prenotazioni retroattive creerebbe dati inconsistenti
    // con la disponibilità reale delle camere.
    const result = bookingFormSchema.safeParse({ ...validBase, checkIn: futureDate(-1) });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain("checkIn");
    }
  });

  it("rifiuta un check-out uguale al check-in", () => {
    // Soggiorno di zero notti: non ha senso operativamente.
    const sameDay = futureDate(3);
    const result = bookingFormSchema.safeParse({
      ...validBase,
      checkIn: sameDay,
      checkOut: sameDay,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain("checkOut");
    }
  });

  it("rifiuta un check-out precedente al check-in", () => {
    // Date invertite: impossibile da gestire per il reparto camere.
    const result = bookingFormSchema.safeParse({
      ...validBase,
      checkIn: futureDate(5),
      checkOut: futureDate(3),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain("checkOut");
    }
  });

  // ----- VALIDAZIONE REGIME DI PENSIONE -------------------------------------

  it("rifiuta un boardType non presente nell'enum", () => {
    // Solo i regimi offerti dall'hotel sono validi; un valore arbitrario
    // potrebbe essere il risultato di una manomissione del payload HTTP.
    const result = bookingFormSchema.safeParse({ ...validBase, boardType: "All Inclusive" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain("boardType");
    }
  });
});
