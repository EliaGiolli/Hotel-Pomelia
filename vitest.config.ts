/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Alias esplicito: garantisce che @/* → src/* funzioni in tutti gli ambienti
    // Vitest (jsdom e node). tsconfigPaths da solo non risolve i file in
    // @vitest-environment node perché quel contesto non passa per Vite.
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    // tests-e2e/ usa Playwright (@playwright/test) — incompatibile con Vitest
    exclude: ["node_modules", ".next", "dist", "tests-e2e"],
  },
});
