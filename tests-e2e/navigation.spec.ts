// =============================================================================
// TEST E2E: navigation.spec.ts — Happy Path della navigazione principale
//
// PERCHÉ È IMPORTANTE:
//   Questo test verifica il percorso più critico per il business: un utente
//   apre il sito, vede la homepage, naviga verso le camere e trova le card
//   con i prodotti. Se uno di questi passaggi è rotto — titolo sbagliato,
//   link non cliccabile, pagina /camere vuota — l'utente abbandona prima
//   ancora di raggiungere il form di prenotazione.
//
// COSA TESTIAMO (Happy Path):
//   1. Caricamento homepage  → titolo SEO corretto
//   2. Click "Camere"        → navigazione verso /camere
//   3. Pagina /camere        → URL aggiornato e almeno una .room-card visibile
//
// PREREQUISITI:
//   - Il dev server (npm run dev) deve essere attivo su localhost:3000
//   - MongoDB deve essere raggiungibile (le .room-card sono dati reali)
//   - Il config webServer in playwright.config.ts avvia il server se assente
// =============================================================================

import { test, expect } from "@playwright/test";

// ---------------------------------------------------------------------------
// Scenario: Happy Path — Homepage → /camere
//
// Simula il comportamento dell'utente tipo: apre il sito dalla ricerca Google
// (landing sulla homepage), esplora la sezione Camere e verifica che ci siano
// opzioni di soggiorno disponibili prima di procedere alla prenotazione.
// ---------------------------------------------------------------------------
test("navigazione homepage → pagina camere con card visibili", async ({ page }) => {

  // 1. Apri la homepage
  //    baseURL è configurato su localhost:3000 in playwright.config.ts
  await page.goto("/");

  // 2. Verifica che il titolo SEO sia quello atteso.
  //    Un titolo sbagliato penalizza il ranking e confonde l'utente
  //    sulle SERP di Google.
  await expect(page).toHaveTitle(
    "Hotel Pomelia | Turismo Responsabile a Ragusa, Sicilia"
  );

  // 3. Individua il link "Camere" all'interno della navigazione principale
  //    desktop (aria-label="Navigazione principale").
  //    Scoping al nav evita di cliccare il gemello nascosto nel drawer mobile.
  const mainNav = page.getByRole("navigation", {
    name: "Navigazione principale",
  });
  const camereLink = mainNav.getByRole("link", { name: "Camere" });

  // 4. Verifica che il link esista e sia visibile prima di cliccare.
  //    Se la navbar non renderizza, il test fallisce qui con un messaggio chiaro.
  await expect(camereLink).toBeVisible();

  // 5. Clicca il link e attendi che la navigazione si completi.
  //    Playwright aspetta automaticamente la risposta della pagina.
  await camereLink.click();

  // 6. Verifica che l'URL contenga /camere.
  //    Controlla che il router abbia navigato correttamente e che non ci
  //    siano redirect imprevisti (es. 404 → homepage).
  await expect(page).toHaveURL(/\/camere/);

  // 7. Verifica che almeno una .room-card sia visibile nel DOM.
  //    Questa assertion conferma che:
  //    a) il server component ha recuperato i dati da MongoDB
  //    b) le card sono state renderizzate correttamente
  //    c) il DB contiene almeno una camera disponibile (available: true)
  //
  //    Se il DB è vuoto o la connessione fallisce, questo step fallirà
  //    con un timeout esplicito — segnale di un problema infrastrutturale.
  const firstCard = page.locator(".room-card").first();
  await expect(firstCard).toBeVisible();
});

// ---------------------------------------------------------------------------
// Scenario: Verifica che la navbar sia presente su tutte le pagine chiave
//
// La persistenza della navbar è garantita dal layout root (layout.tsx).
// Se il layout viene accidentalmente rimosso da una pagina, l'utente perde
// la navigazione e non può tornare alla homepage o al form di prenotazione.
// ---------------------------------------------------------------------------
test("la navbar è presente e funzionante su /camere", async ({ page }) => {

  // Naviga direttamente su /camere (deep link, es. utente arriva da Google)
  await page.goto("/camere");

  // Verifica che la navbar sia presente nella pagina
  const mainNav = page.getByRole("navigation", {
    name: "Navigazione principale",
  });
  await expect(mainNav).toBeVisible();

  // Verifica che il link verso la homepage (logo) sia cliccabile
  const homeLink = mainNav.getByRole("link", {
    name: "Hotel Pomelia — Homepage",
  });
  await expect(homeLink).toBeVisible();

  // Verifica che il link "Prenota ora" sia presente —
  // è il principale CTA della navbar e deve essere sempre raggiungibile
  const prenotaLink = mainNav.getByRole("link", { name: "Prenota ora" });
  await expect(prenotaLink).toBeVisible();
});
