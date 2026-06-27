import React from "react";
import { render } from "@testing-library/react";
import { axe, type AxeResults } from "jest-axe";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormProvider, useForm } from "react-hook-form";
import { describe, it, vi } from "vitest";
import type { BookingFormValues } from "@/features/booking/schemas/bookingFormSchema";
import { BOARD_TYPES } from "@/features/booking/schemas/bookingFormSchema";

// Lancia un errore descrittivo con nodo HTML per ogni violazione trovata.
// Più utile di toHaveNoViolations() perché mostra l'elemento esatto da correggere.
async function assertNoA11yViolations(container: Element): Promise<void> {
  const results: AxeResults = await axe(container);
  if (results.violations.length === 0) return;

  const details = results.violations
    .map(
      (v) =>
        `[${(v.impact ?? "unknown").toUpperCase()}] ${v.id}: ${v.description}\n` +
        `  Regola WCAG: ${v.tags.filter((t) => t.startsWith("wcag")).join(", ")}\n` +
        `  Nodi coinvolti:\n${v.nodes.map((n) => `    ${n.html}`).join("\n")}`,
    )
    .join("\n\n");

  throw new Error(
    `axe-core ha trovato ${results.violations.length} violazione/i WCAG:\n\n${details}`,
  );
}

// =============================================================================
// MOCKS — devono precedere l'import dei moduli sotto test
// =============================================================================

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt ?? ""} />
  ),
}));

vi.mock("@/core/store/useBookingStore", () => ({
  useBookingStore: (selector: (s: { preSelectRoom: () => void }) => unknown) =>
    selector({ preSelectRoom: vi.fn() }),
}));

// =============================================================================
// IMPORT COMPONENTI (dopo i mock)
// =============================================================================

import Navbar from "@/shared/components/ui/Navbar";
import { BookingTriggerButton } from "@/features/camere/components/BookingTriggerButton";
import { DateStep } from "@/features/booking/components/steps/DateStep";
import { RoomStep } from "@/features/booking/components/steps/RoomStep";
import { BoardStep } from "@/features/booking/components/steps/BoardStep";
import { SummaryStep } from "@/features/booking/components/steps/SummaryStep";

// =============================================================================
// WRAPPER DI PROVIDER
// =============================================================================

const muiTheme = createTheme();

function MuiProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

// Avvolge gli step del form con FormProvider e react-hook-form.
// Non usa zodResolver perché il test verifica accessibilità, non validazione.
function BookingStepWrapper({ children }: { children: React.ReactNode }) {
  const tomorrow = new Date(Date.now() + 86_400_000);
  const dayAfter = new Date(Date.now() + 2 * 86_400_000);

  const methods = useForm<BookingFormValues>({
    defaultValues: {
      guestName: "",
      guestEmail: "",
      roomType: "",
      boardType: BOARD_TYPES[0],
      notes: "",
      checkIn: tomorrow,
      checkOut: dayAfter,
    },
    mode: "onSubmit",
  });

  return (
    <MuiProviders>
      <FormProvider {...methods}>
        <form aria-label="Form prenotazione">{children}</form>
      </FormProvider>
    </MuiProviders>
  );
}

// =============================================================================
// 1. NAVBAR
//
// VIOLAZIONE ATTESA (WCAG 4.1.2 — Name, Role, Value):
//   Il bottone hamburger (IconButton) ha aria-controls="mobile-nav-drawer".
//   Quando drawerOpen=false il Drawer non è montato nel DOM (keepMounted omesso
//   → default false), quindi l'IDREF "mobile-nav-drawer" è invalido.
//   axe-core regola: aria-valid-attr-value
//
//   FIX → src/shared/components/ui/Navbar.tsx riga ~93:
//     PRIMA:  aria-controls="mobile-nav-drawer"
//     DOPO:   aria-controls={drawerOpen ? "mobile-nav-drawer" : undefined}
// =============================================================================
describe("A11Y: Navbar", () => {
  it("non deve avere violazioni WCAG", async () => {
    const { container } = render(<Navbar />, { wrapper: MuiProviders });
    await assertNoA11yViolations(container);
  });
});

// =============================================================================
// 2. ROOM CARD — BookingTriggerButton
// =============================================================================
describe("A11Y: Room Card — BookingTriggerButton", () => {
  it("il bottone di prenotazione deve essere accessibile e avere aria-label", async () => {
    const { container } = render(
      <BookingTriggerButton roomName="Suite Gelsomino" />,
      { wrapper: MuiProviders },
    );
    await assertNoA11yViolations(container);
  });
});

// =============================================================================
// 3. ROOM CARD — struttura card completa
//
// Testa la struttura HTML semantica di una card camera come viene resa
// da CamereContent (server component, non importabile direttamente).
// =============================================================================
describe("A11Y: Room Card — struttura completa", () => {
  it("la card di una camera deve avere heading, alt text e bottone accessibili", async () => {
    const { container } = render(
      <MuiProviders>
        <article aria-label="Camera: Suite Gelsomino">
          <img
            src="https://example.com/suite.jpg"
            alt="Suite Gelsomino con arredi in legno naturale e vista giardino"
          />
          <div>
            <h3>Suite Gelsomino</h3>
            <p>Una camera accogliente con vista sul giardino.</p>
            <ul aria-label="Dotazioni principali">
              <li>Wi-Fi</li>
              <li>Aria condizionata</li>
              <li>Vasca idromassaggio</li>
            </ul>
            <BookingTriggerButton roomName="Suite Gelsomino" />
          </div>
        </article>
      </MuiProviders>,
    );
    await assertNoA11yViolations(container);
  });
});

// =============================================================================
// 4. BOOKING FORM — DateStep
//
// I DatePicker MUI devono avere label associata tramite slotProps.textField.
// =============================================================================
describe("A11Y: BookingForm — DateStep", () => {
  it("i date picker devono avere label associata e required correttamente impostato", async () => {
    const { container } = render(<DateStep />, { wrapper: BookingStepWrapper });
    await assertNoA11yViolations(container);
  });
});

// =============================================================================
// 5. BOOKING FORM — RoomStep
//
// Il RadioGroup deve essere avvolto in FormControl+FormLabel per garantire
// che il gruppo abbia un nome accessibile (aria-labelledby implicito di MUI).
// =============================================================================
describe("A11Y: BookingForm — RoomStep", () => {
  it("il gruppo radio deve avere FormLabel e ogni opzione deve essere selezionabile", async () => {
    const { container } = render(
      <RoomStep roomNames={["Suite Gelsomino", "Camera Arancio", "Junior Suite"]} />,
      { wrapper: BookingStepWrapper },
    );
    await assertNoA11yViolations(container);
  });
});

// =============================================================================
// 6. BOOKING FORM — BoardStep
// =============================================================================
describe("A11Y: BookingForm — BoardStep", () => {
  it("la selezione del regime di pensione deve essere accessibile", async () => {
    const { container } = render(<BoardStep />, { wrapper: BookingStepWrapper });
    await assertNoA11yViolations(container);
  });
});

// =============================================================================
// 7. BOOKING FORM — SummaryStep
//
// I TextField devono avere label, helperText non ambiguo e autoComplete valido.
// =============================================================================
describe("A11Y: BookingForm — SummaryStep", () => {
  it("i campi dati ospite devono avere label visibile e autoComplete corretto", async () => {
    const { container } = render(<SummaryStep />, { wrapper: BookingStepWrapper });
    await assertNoA11yViolations(container);
  });
});
