import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL as string;

if (!MONGODB_URI) {
  throw new Error("DATABASE_URL non definita nelle variabili d'ambiente");
}

type MongooseCache = { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };

declare global {
  var __mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = globalThis.__mongooseCache ?? { conn: null, promise: null };
globalThis.__mongooseCache = cached;

export default async function dbConnect(): Promise<mongoose.Connection | null> {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return null;
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
