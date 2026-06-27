/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    // jsdom simula il DOM del browser — necessario per testare componenti React
    environment: "jsdom",
    // Setup globale eseguito prima di ogni suite di test
    setupFiles: ["./vitest.setup.ts"],
    // Rende disponibili describe/it/expect senza importarli in ogni file
    globals: true,
    // Esclude build artifacts e cartelle di sistema
    exclude: ["node_modules", ".next", "dist"],
  },
});
