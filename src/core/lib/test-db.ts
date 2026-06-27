// =============================================================================
// UTILITY: test-db.ts — Gestione del database MongoDB in-memory per i test
//
// ARCHITETTURA DI ISOLAMENTO:
//
//   Vitest esegue ogni file di test in un worker Node.js separato con
//   il proprio grafo di moduli. Ciò significa che ogni file di test
//   ottiene la propria istanza di `mongoose` e dei suoi model.
//
//   Ogni suite che usa il DB deve seguire questo schema fisso:
//
//     beforeAll → connectDB()   Avvia un processo mongod su porta casuale
//                               in una directory temporanea dedicata.
//                               Nessun conflitto tra file di test in esecuzione
//                               parallela: ogni worker ha il suo mongod.
//
//     afterEach → clearDB()     Svuota tutte le collection dopo ogni singolo
//                               test. I dati di un caso d'uso non "inquinano"
//                               il successivo. L'alternativa (dropDatabase) è
//                               più pesante perché ricrea gli indici ogni volta.
//
//     afterAll  → closeDB()     Disconnette Mongoose e ferma il processo mongod.
//                               Nessuna risorsa rimane in memoria dopo la suite.
//
// PERCHÉ NON USIAMO dbConnect() (src/core/database/mongoose.ts):
//   - Legge DATABASE_URL dall'ambiente: non definita nei test di integrazione.
//   - Usa una cache globale (globalThis.__mongooseCache): renderebbe impossibile
//     connettere Mongoose a un URI diverso senza resettare lo stato globale.
//   - connectDB() qui si connette direttamente all'URI in-memory, bypassando
//     sia DATABASE_URL sia la cache, senza side-effect sulle altre funzioni.
//
// NOTA SUI MODELLI MONGOOSE:
//   I model (Room, Experience…) usano la connessione di default di Mongoose.
//   Chiamare connectDB() prima dei test è sufficiente perché tutti i model
//   importati nello stesso worker useranno automaticamente quella connessione.
// =============================================================================

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// Istanza del server in-memory. Viene popolata da connectDB e usata da closeDB.
// È locale al worker del file di test — nessun rischio di collisioni tra suite.
let mongod: MongoMemoryServer;

/**
 * Avvia un'istanza MongoDB in-memory e connette Mongoose ad essa.
 * Da chiamare in beforeAll().
 */
export async function connectDB(): Promise<void> {
  // Se Mongoose ha già una connessione aperta (stato inatteso), la chiudiamo
  // prima di aprirne una nuova verso il server in-memory.
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
}

/**
 * Disconnette Mongoose e ferma il processo mongod.
 * Da chiamare in afterAll().
 */
export async function closeDB(): Promise<void> {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

/**
 * Svuota tutte le collection senza abbattere il database.
 * Da chiamare in afterEach() per isolare i casi d'uso all'interno della stessa suite.
 */
export async function clearDB(): Promise<void> {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}
