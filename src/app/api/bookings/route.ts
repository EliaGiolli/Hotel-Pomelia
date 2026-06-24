import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/bookings — receives a booking request and stores it in MongoDB
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { guestName, guestEmail, checkIn, checkOut, boardType, roomType, notes } = body;

    // ── Validation ──────────────────────────────────────────────────
    if (!guestName || !guestEmail || !checkIn || !checkOut || !boardType || !roomType) {
      return NextResponse.json({ error: "Tutti i campi obbligatori devono essere compilati." }, { status: 400 });
    }

    if (!/\S+@\S+\.\S+/.test(guestEmail)) {
      return NextResponse.json({ error: "Indirizzo email non valido." }, { status: 400 });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return NextResponse.json({ error: "Date non valide." }, { status: 400 });
    }

    if (checkInDate < now) {
      return NextResponse.json({ error: "La data di arrivo deve essere nel futuro." }, { status: 400 });
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json({ error: "La data di partenza deve essere successiva alla data di arrivo." }, { status: 400 });
    }

    const validBoardTypes = ["Pensione Completa", "Mezza Pensione", "Colazione"];
    if (!validBoardTypes.includes(boardType)) {
      return NextResponse.json({ error: "Tipo di pensione non valido." }, { status: 400 });
    }

    // ── Persist to MongoDB via Prisma ────────────────────────────────
    const booking = await prisma.bookingRequest.create({
      data: {
        guestName: guestName.trim(),
        guestEmail: guestEmail.trim().toLowerCase(),
        checkIn: checkInDate,
        checkOut: checkOutDate,
        boardType,
        roomType,
        notes: notes?.trim() || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, bookingId: booking.id }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/bookings] Error:", error);
    return NextResponse.json({ error: "Errore interno del server. Riprova tra qualche momento." }, { status: 500 });
  }
}
