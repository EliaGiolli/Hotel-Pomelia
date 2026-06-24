import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/rooms — returns all rooms from MongoDB
// Falls back to static seed data if the database is empty or unavailable
export async function GET() {
  try {
    const rooms = await prisma.room.findMany();

    // Return seed data if no rooms have been added to the database yet
    if (rooms.length === 0) {
      return NextResponse.json(SEED_ROOMS);
    }

    return NextResponse.json(rooms);
  } catch (error) {
    console.error("[GET /api/rooms] DB error, returning seed data:", error);
    // Graceful fallback so the UI still works before a DB connection is configured
    return NextResponse.json(SEED_ROOMS);
  }
}

const SEED_ROOMS = [
  {
    id: "seed-1",
    name: "Suite Gelsomino",
    description: "Suite con terrazzo privato panoramico, letto king-size e vasca in terracotta locale.",
    capacity: 2,
    features: ["Terrazzo panoramico", "Letto king-size", "Vasca in terracotta", "Arredi di recupero", "Lenzuola GOTS"],
    images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80"],
  },
  {
    id: "seed-2",
    name: "Camera Mandorlo",
    description: "Camera doppia con vista sul giardino di mandorli, cotto ibleo e lenzuola in canapa GOTS.",
    capacity: 2,
    features: ["Vista giardino", "Cotto ibleo artigianale", "Lenzuola in canapa GOTS", "Arredi di recupero"],
    images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80"],
  },
  {
    id: "seed-3",
    name: "Familiare Carruba",
    description: "Due camere comunicanti con due bagni, pavimento in graniglia di Ragusa. Baby kit biologico incluso.",
    capacity: 4,
    features: ["2 camere comunicanti", "2 bagni completi", "Graniglia di Ragusa", "Baby kit biologico", "Lenzuola GOTS"],
    images: ["https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&auto=format&fit=crop&q=80"],
  },
  {
    id: "seed-4",
    name: "Junior Suite Zagara",
    description: "Junior suite con patio privato fiorito, letto queen in legno di carrubo recuperato e vasca doppia.",
    capacity: 2,
    features: ["Patio privato fiorito", "Letto queen in carrubo", "Vasca doppia", "Lenzuola GOTS", "Prodotti biologici"],
    images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80"],
  },
];
