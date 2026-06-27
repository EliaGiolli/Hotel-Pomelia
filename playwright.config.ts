import { defineConfig, devices } from "@playwright/test";

/**
 * Configurazione Playwright per i test E2E di Hotel Pomelia.
 *
 * STRUTTURA:
 *   - I test si trovano in tests-e2e/
 *   - Il server di sviluppo deve girare su localhost:3000 (npm run dev)
 *   - webServer avvia automaticamente il dev server se non è già attivo;
 *     in CI lo avvia sempre da zero (reuseExistingServer: false).
 *
 * BROWSER:
 *   Solo Chromium in locale per rapidità. In CI aggiungere Firefox e WebKit
 *   decommentando i progetti corrispondenti.
 */
export default defineConfig({
  // Directory dove Playwright cerca i file *.spec.ts
  testDir: "./tests-e2e",

  // Ogni test gira in isolamento: un contesto browser fresco per file
  fullyParallel: true,

  // In CI blocca la suite se qualcuno ha lasciato test.only() committati
  forbidOnly: !!process.env.CI,

  // Ritenta i test falliti solo in CI (rete instabile, risorse limitate)
  retries: process.env.CI ? 2 : 0,

  // Un solo worker in CI per non saturare le risorse del runner
  workers: process.env.CI ? 1 : undefined,

  // Report HTML interattivo: apre automaticamente dopo l'esecuzione
  reporter: "html",

  use: {
    // Tutte le navigate relative partono da qui
    baseURL: "http://localhost:3000",

    // Cattura una trace completa al primo retry: utile per il debug in CI
    trace: "on-first-retry",

    // Screenshot automatico solo quando un test fallisce
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Decommentare per coprire altri browser in CI:
    // { name: "firefox",  use: { ...devices["Desktop Firefox"] } },
    // { name: "webkit",   use: { ...devices["Desktop Safari"] }  },
    // { name: "mobile-chrome", use: { ...devices["Pixel 5"] }    },
  ],

  webServer: {
    // Avvia il dev server prima della suite; lo ferma alla fine
    command: "npm run dev",
    url: "http://localhost:3000",
    // In locale riutilizza il server già attivo (più veloce);
    // in CI ne avvia sempre uno pulito
    reuseExistingServer: !process.env.CI,
    // Timeout per l'avvio del server Next.js (può essere lento al cold start)
    timeout: 60_000,
  },
});
