import { z } from "zod";

export const BOARD_TYPES = ["Colazione", "Mezza Pensione", "Pensione Completa"] as const;

const today = () => new Date(new Date().toDateString());

export const bookingFormSchema = z
  .object({
    guestName: z
      .string()
      .min(2, "Il nome deve contenere almeno 2 caratteri")
      .max(100, "Nome troppo lungo"),
    guestEmail: z.string().email("Inserisci un indirizzo email valido"),
    checkIn: z.date({ error: "La data di arrivo è obbligatoria" }),
    checkOut: z.date({ error: "La data di partenza è obbligatoria" }),
    roomType: z.string().min(1, "Seleziona una tipologia di camera"),
    boardType: z.enum(BOARD_TYPES, { error: "Seleziona un regime di pensione" }),
    notes: z.string().max(1000, "Le note non possono superare i 1000 caratteri").optional(),
  })
  .refine((d) => d.checkIn >= today(), {
    message: "La data di arrivo non può essere nel passato",
    path: ["checkIn"],
  })
  .refine((d) => d.checkOut > d.checkIn, {
    message: "La data di partenza deve essere successiva alla data di arrivo",
    path: ["checkOut"],
  });

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
