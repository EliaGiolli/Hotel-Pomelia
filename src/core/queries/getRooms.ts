import Room from "@/core/models/Room";

/**
 * Ritorna tutte le camere disponibili come plain objects (lean).
 * Non chiama dbConnect(): la connessione è responsabilità del chiamante
 * (server component o test setup).
 */
export async function getRooms() {
  return Room.find({ available: true }).lean();
}
