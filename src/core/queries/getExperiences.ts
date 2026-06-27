import Experience from "@/core/models/Experience";

/**
 * Ritorna tutte le esperienze come plain objects (lean).
 * Non chiama dbConnect(): la connessione è responsabilità del chiamante
 * (server component o test setup).
 */
export async function getExperiences() {
  return Experience.find({}).lean();
}
