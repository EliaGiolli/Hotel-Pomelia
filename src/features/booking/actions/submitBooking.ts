"use server";

import { prisma } from "@/core/database/prisma";
import { bookingFormSchema } from "@/features/booking/schemas/bookingFormSchema";

export type BookingActionState =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Partial<Record<string, string[]>> };

export async function submitBooking(data: unknown): Promise<BookingActionState> {
  const parsed = bookingFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Dati non validi. Controlla i campi e riprova.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { guestName, guestEmail, checkIn, checkOut, roomType, boardType, notes } = parsed.data;

  try {
    await prisma.bookingRequest.create({
      data: { guestName, guestEmail, checkIn, checkOut, roomType, boardType, notes },
    });

    return { success: true };
  } catch (err) {
    console.error("[submitBooking]", err);
    return {
      success: false,
      error: "Errore interno del server. Riprova più tardi o contattaci via email.",
    };
  }
}
