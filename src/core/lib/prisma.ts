import { PrismaClient } from "@prisma/client";

// Singleton pattern to avoid creating multiple Prisma connections in development
// (Next.js hot reload would otherwise open a new connection on every change)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
