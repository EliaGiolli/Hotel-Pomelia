# A11Y Audit — Hotel Pomelia

**Data:** 2026-06-27  
**Strumento:** jest-axe 10.x (axe-core 4.12.x)  
**Ambiente:** Vitest + jsdom  
**Standard di riferimento:** WCAG 2.1 AA  

---

## Risultati Test Automatizzati

```
src/core/a11y.test.tsx

✓ A11Y: Navbar
✓ A11Y: Room Card — BookingTriggerButton
✓ A11Y: Room Card — struttura completa
✓ A11Y: BookingForm — DateStep
✓ A11Y: BookingForm — RoomStep
✓ A11Y: BookingForm — BoardStep
✓ A11Y: BookingForm — SummaryStep

7/7 test passati
```

---

## Tabella Riepilogativa

| Componente | Stato A11Y | Violazioni axe-core | Azione Correttiva |
|---|:---:|---|---|
| Navbar | ✅ PASSA | Nessuna violazione automatica | Vedere Note A / verifica manuale colore |
| Room Card (BookingTriggerButton) | ✅ PASSA | Nessuna | — |
| Room Card (struttura) | ✅ PASSA | Nessuna | — |
| BookingForm — DateStep | ✅ PASSA | Nessuna | — |
| BookingForm — RoomStep | ✅ PASSA | Nessuna | — |
| BookingForm — BoardStep | ✅ PASSA | Nessuna | — |
| BookingForm — SummaryStep | ✅ PASSA | Nessuna | — |
| EsperienzeContent (non in scope test) | ⚠️ REVIEW | Non testato automaticamente | Vedere Nota B |

---

## Analisi Semantica — Bottoni costruiti con `<div>` o `<span>`

**Nessuna violazione trovata.**

Tutti gli elementi interattivi usano tag o componenti semanticamente corretti:

| Elemento | Componente MUI | Tag HTML reso | Corretto? |
|---|---|---|---|
| Link di navigazione desktop | `Button component={Link}` | `<a href="...">` | ✅ |
| Link di navigazione mobile | `ListItemButton component={Link}` | `<a href="...">` | ✅ |
| Bottone hamburger | `IconButton` | `<button type="button">` | ✅ |
| Bottone chiudi drawer | `IconButton` | `<button type="button">` | ✅ |
| CTA "Prenota ora" | `Button component={Link}` | `<a href="/prenota">` | ✅ |
| CTA "Prenota questa camera" | `Button` (no component) | `<button type="button">` | ✅ |
| Radio options (RoomStep, BoardStep) | `FormControlLabel + Radio` | `<input type="radio">` con `<label>` | ✅ |
| Date input (DateStep) | `DatePicker` MUI | `<input type="text">` con label | ✅ |
| Campi dati ospite (SummaryStep) | `TextField` | `<input>` con `<label>` esplicita | ✅ |

---

## Note di Analisi Statica

### Nota A — Navbar: `aria-controls` e Drawer

**File:** `src/shared/components/ui/Navbar.tsx` riga 93

```tsx
<IconButton
  aria-controls="mobile-nav-drawer"
  aria-expanded={drawerOpen}
  ...
>
```

Il `<Drawer id="mobile-nav-drawer">` passa l'id alla radice del `Modal` MUI, che rimane nel DOM anche con `open=false` (come elemento nascosto). axe-core non segnala violazioni perché il riferimento è tecnicamente valido.

**Osservazione**: l'`id` è applicato al `div` radice del `Modal`, non al `<nav>` interno (definito in `PaperProps`). Uno screen reader che segue `aria-controls` atterrerà sul `div` wrapper, non sul `<nav>` con `aria-label="Menu mobile"`. Questo è funzionale ma non ideale.

**Azione consigliata (bassa priorità):**
```tsx
// Navbar.tsx — aggiungere id direttamente all'elemento nav via PaperProps
PaperProps={{
  id: "mobile-nav-drawer",      // ← sposta qui l'id
  component: "nav",
  "aria-label": "Menu mobile",
}}
// Rimuovere id dalla prop <Drawer> stessa
```

---

### Nota B — EsperienzeContent: icone dinamiche senza `aria-hidden`

**File:** `src/features/esperienze/components/EsperienzeContent.tsx`

```tsx
<Box>{iconMap[exp.iconKey] ?? null}</Box>
```

Le icone in `iconMap` (presumibilmente componenti MUI SvgIcon) sono decorative nel contesto della card: il titolo e la descrizione dell'esperienza forniscono già il testo. Se le icone non hanno `aria-hidden="true"`, i screen reader possono annunciare un nome generico ("icon" o il nome del file SVG).

**Azione consigliata:**
```tsx
// Passare aria-hidden a ogni icona nel map
const iconMap: Record<string, React.ReactElement> = {
  hiking: <HikingIcon aria-hidden="true" />,
  food:   <RestaurantIcon aria-hidden="true" />,
  // ...
};
```

---

### Nota C — SummaryStep: "Riepilogo prenotazione" non è un heading

**File:** `src/features/booking/components/steps/SummaryStep.tsx` riga 27

```tsx
<Typography variant="subtitle1" fontWeight={600} gutterBottom>
  Riepilogo prenotazione
</Typography>
```

Questa stringa introduce un blocco di dati riepilogativi ma non è marcata come heading. Nella struttura del passo, il solo `<h2>` è "I tuoi dati" (riga 48). Il riepilogo viene percepito dai screen reader come testo normale, non come intestazione di sezione.

**Azione consigliata (opzionale):**
```tsx
// Aggiungere component="h3" se si vuole che sia navigabile come heading
<Typography variant="subtitle1" component="h3" fontWeight={600} gutterBottom>
  Riepilogo prenotazione
</Typography>
```

---

## Limitazioni dell'audit automatizzato

axe-core in ambiente jsdom **non è in grado di rilevare** le seguenti classi di problemi:

| Categoria WCAG | Criterio | Motivo del limite |
|---|---|---|
| Contrasto colore | 1.4.3 Contrast (Minimum) | jsdom non applica CSS reale — i valori computati sono assenti |
| Focus visibile | 2.4.7 Focus Visible | Impossibile simulare :focus con jsdom |
| Gestione focus modale | 2.1.2 No Keyboard Trap | Richiede interazione utente reale |
| Ordine di lettura | 1.3.2 Meaningful Sequence | Dipende da layout CSS non presente in jsdom |

### Punti da verificare manualmente nel browser

1. **Contrasto testo bianco su sfondo `#1A1A2E` (Navbar)**: rapporto stimato ~14:1 — probabilmente conforme AA, confermare con browser DevTools.
2. **Contrasto link attivi `#F4C430` su `#1A1A2E`**: rapporto stimato ~8:1 — conforme.
3. **Focus trap nel Drawer mobile**: aprire il menu con tastiera (Tab fino all'hamburger, Invio), verificare che il focus rimanga nel drawer e che Esc lo chiuda.
4. **Annuncio risultato prenotazione**: il `<Dialog aria-labelledby="booking-result-title">` deve essere annunciato da NVDA/VoiceOver al submit — testare con screen reader reale.
5. **DatePicker keyboard**: i MUI DatePicker hanno un calendario interattivo — verificare navigazione da tastiera e annunci delle date.

---

## Checklist finale

- [x] Test axe-core eseguiti su tutti i componenti principali
- [x] Analisi statica per bottoni costruiti con div/span (nessuno trovato)
- [x] Identificate icone decorative potenzialmente prive di `aria-hidden`
- [ ] Verifica manuale contrasto colori nel browser
- [ ] Test con NVDA o VoiceOver del flusso di prenotazione completo
- [ ] Verifica focus management nel Drawer mobile
- [ ] Aggiornare questo documento dopo fix e re-test

---

*Generato con: jest-axe + axe-core 4.12.x — per i criteri WCAG non testabili automaticamente è richiesta una sessione di test manuale con screen reader.*
