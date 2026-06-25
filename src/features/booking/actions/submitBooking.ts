"use server";

import dbConnect from "@/lib/mongoose";
import Booking from "@/core/models/Booking";
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

  const { guestName, guestEmail, checkIn, checkOut, roomType, totalPrice } = parsed.data as typeof parsed.data & { totalPrice?: number };

  try {
    await dbConnect();

    await Booking.create({
      roomId: roomType, // TODO: aggiornare bookingFormSchema per passare un ObjectId reale
      guestName,
      guestEmail,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      totalPrice: totalPrice ?? 0, // TODO: calcolare il prezzo reale lato server
      status: "pending",
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
