import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL as string;

if (!MONGODB_URI) {
  throw new Error("DATABASE_URL non definita nelle variabili d'ambiente");
}

declare global {
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

const cached = globalThis.mongoose ?? { conn: null, promise: null };
globalThis.mongoose = cached;

export default async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
