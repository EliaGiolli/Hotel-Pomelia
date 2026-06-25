# 🌿 Hotel Pomelia — Turismo Responsabile a Ragusa, Sicilia

> Boutique hotel ecosostenibile nel cuore degli Iblei ragusani.
> Tre generazioni di ospitalità autentica dal 1958. **Società Benefit certificata** (L. 208/2015).
> Energia 100% rinnovabile · Cucina biologica 0 km · Lenzuola GOTS · Spiaggia barrier-free.

Questo repository contiene l'applicazione web ufficiale di Hotel Pomelia, costruita con **Next.js App Router**, **React 19**, **Mongoose** e **Material UI 6**.

---

## 🛠️ Tech Stack

| Layer | Tecnologia | Versione |
|---|---|---|
| Framework | Next.js (App Router) | `^16.2.9` |
| UI Library | React | `^19.2.7` |
| Component Library | Material UI + Emotion | `^6.5.0` |
| Icone | MUI Icons Material | `^6.5.0` |
| Date Picker | MUI X Date Pickers + DayJS | `^7.28.3` |
| Database ODM | Mongoose | `9.7.2` |
| Database Driver | MongoDB | `7.3.0` |
| Validazione Schema | Zod | `^4.4.3` |
| Form Management | React Hook Form + zodResolver | `^7.80.0` |
| State Management | Zustand | `^5.0.3` |
| Linguaggio | TypeScript | `^5.7.3` |
| Seed Script | tsx (con --env-file) | via npx |

---

## 🏗️ Architettura del Progetto

Il progetto adotta un'architettura **modulare per feature** che separa nettamente la logica di dominio dall'infrastruttura tecnica. La direzione delle dipendenze è rigidamente unidirezionale: `features` → `core` e `shared`, mai lateralmente tra feature.

```
hotel-pomelia/
├── scripts/
│   └── seed.ts                      # Popolamento MongoDB: rooms, experiences, restaurants
├── src/
│   ├── app/                         # Next.js App Router — route e file di sistema globali
│   │   ├── layout.tsx               # Root layout: ThemeRegistry, Navbar, Footer, metadata globali
│   │   ├── page.tsx                 # Home — Server Component: metadata + JSON-LD Schema.org
│   │   ├── loading.tsx              # Skeleton globale (Server Component, Suspense boundary)
│   │   ├── error.tsx                # Error boundary globale (Client Component obbligatorio)
│   │   ├── not-found.tsx            # Pagina 404 globale (Server Component)
│   │   ├── camere/page.tsx          # Rotta /camere — Server Component
│   │   ├── esperienze/page.tsx      # Rotta /esperienze — Server Component
│   │   ├── ristorazione/page.tsx    # Rotta /ristorazione — Server Component
│   │   ├── prenota/page.tsx         # Rotta /prenota — Server Component
│   │   └── sostenibilita/page.tsx   # Rotta /sostenibilita — Server Component
│   │
│   ├── components/
│   │   └── ThemeRegistry.tsx        # Client boundary MUI: ThemeProvider + Emotion cache SSR
│   │
│   ├── core/                        # Logiche e risorse globali, indipendenti dalla feature
│   │   ├── database/
│   │   │   └── mongoose.ts          # Singleton connessione MongoDB con cache globalThis
│   │   ├── models/
│   │   │   ├── Room.ts              # Modello Mongoose: camere
│   │   │   ├── Experience.ts        # Modello Mongoose: esperienze
│   │   │   ├── Restaurant.ts        # Modello Mongoose: voci menu ristorante
│   │   │   └── Booking.ts           # Modello Mongoose: prenotazioni
│   │   ├── store/
│   │   │   └── useBookingStore.ts   # Zustand: wizard step e camera preselezionata
│   │   └── theme/
│   │       └── theme.ts             # Tema MUI: palette mediterranea, tipografia, override globali
│   │
│   ├── features/                    # Moduli per dominio applicativo
│   │   ├── home/
│   │   │   ├── components/
│   │   │   │   └── HomeContent.tsx  # "use client": hero, value prop, storia, manifesto, CTA
│   │   │   └── constants/
│   │   │       └── homeData.ts      # Dati statici: highlights, generazioni, benefit pillars
│   │   ├── camere/
│   │   │   └── components/
│   │   │       ├── CamereContent.tsx         # "use client": griglia camere con dettagli
│   │   │       └── BookingTriggerButton.tsx  # "use client": pre-seleziona camera → /prenota
│   │   ├── esperienze/
│   │   │   └── components/
│   │   │       └── EsperienzeContent.tsx     # "use client": griglia con tags e highlights
│   │   ├── ristorazione/
│   │   │   └── components/
│   │   │       └── RistorazioneContent.tsx   # "use client": menu raggruppato per categoria
│   │   ├── sostenibilita/
│   │   │   └── components/
│   │   │       └── SostenibilitaContent.tsx  # "use client": 6 pilastri + progress bar MUI
│   │   └── booking/
│   │       ├── actions/
│   │       │   └── submitBooking.ts          # "use server": valida Zod → persiste su MongoDB
│   │       ├── components/
│   │       │   ├── BookingForm.tsx           # "use client": wizard container
│   │       │   ├── BookingFormProvider.tsx   # "use client": React Hook Form context
│   │       │   └── steps/
│   │       │       ├── DateStep.tsx          # Step 1: date arrivo/partenza con MUI X DatePicker
│   │       │       ├── RoomStep.tsx          # Step 2: selezione tipologia camera
│   │       │       ├── BoardStep.tsx         # Step 3: regime di pensione
│   │       │       └── SummaryStep.tsx       # Step 4: riepilogo + dati ospite + invio
│   │       ├── hooks/
│   │       │   └── useBookingFormLogic.ts    # Hook: step, submit, dialog, useTransition
│   │       └── schemas/
│   │           └── bookingFormSchema.ts      # Zod: validazione con refine cross-field
│   │
│   └── shared/                      # Componenti UI trasversali a tutte le feature
│       └── components/ui/
│           ├── Navbar.tsx           # Barra di navigazione globale
│           └── Footer.tsx           # Footer globale
```

### Principio chiave — Server / Client split

Ogni rotta in `src/app/` è un **Server Component puro**: esporta `metadata` (e dove necessario JSON-LD Schema.org), non contiene `"use client"` e delega interamente il rendering al Client Component corrispondente in `src/features/`. Questo garantisce metadata staticamente analizzabili da Next.js e tree-shaking completo del bundle client.

```
src/app/sostenibilita/page.tsx              → Server Component (metadata + OpenGraph)
        ↓ importa
src/features/sostenibilita/components/
  SostenibilitaContent.tsx                  → "use client" (MUI, icone, JSX completo)
```

---

## 🍃 Database & Modelli Mongoose

### Connessione — `src/core/database/mongoose.ts`

Implementa il pattern **singleton con cache `globalThis`** per evitare connessioni multiple durante l'hot-reload di Next.js in sviluppo. La prima invocazione apre la connessione e la memorizza; le successive restituiscono immediatamente quella già stabilita senza aprire nuovi socket.

```ts
// Utilizzo in qualsiasi Server Action o Route Handler
import dbConnect from "@/core/database/mongoose";
await dbConnect();
```

La variabile `DATABASE_URL` viene letta al caricamento del modulo: se assente, viene sollevato un `Error` esplicito prima ancora che il server risponda a qualsiasi richiesta.

I modelli usano il pattern `models.ModelName || model(...)` per evitare la re-registrazione del modello nei cicli di hot-reload di Next.js, che causerebbe un `OverwriteModelError`.

---

### 🛏️ Modello `Room` — Camere

| Campo | Tipo Mongoose | Obbligatorio | Default |
|---|---|---|---|
| `name` | `String` | ✅ | — |
| `type` | `String` | ✅ | — |
| `pricePerNight` | `Number` | ✅ | — |
| `description` | `String` | ❌ | — |
| `images` | `[String]` | ❌ | `[]` |
| `available` | `Boolean` | ❌ | `true` |
| `capacity` | `Number` | ✅ | `2` |
| `features` | `[String]` | ❌ | `[]` |
| `createdAt` | `Date` | ❌ | `Date.now` |

---

### 🎯 Modello `Experience` — Esperienze

| Campo | Tipo Mongoose | Obbligatorio | Default |
|---|---|---|---|
| `title` | `String` | ✅ | — |
| `subtitle` | `String` | ❌ | `""` |
| `description` | `String` | ✅ | — |
| `price` | `Number` | ❌ | — |
| `duration` | `String` | ❌ | — |
| `image` | `String` | ❌ | `""` |
| `iconKey` | `String` | ❌ | `""` |
| `tags` | `[String]` | ❌ | `[]` |
| `highlights` | `[String]` | ❌ | `[]` |

> `tags` e `highlights` hanno `default: []` per garantire che il `.map()` nel frontend non riceva mai `undefined`, anche su documenti creati prima della migrazione dello schema. Questo ha risolto il crash di build sulla rotta `/esperienze`.

---

### 🍽️ Modello `Restaurant` — Menu Ristorante

| Campo | Tipo Mongoose | Obbligatorio |
|---|---|---|
| `name` | `String` | ✅ |
| `description` | `String` | ✅ |
| `price` | `Number` | ✅ |
| `category` | `String` | ✅ |

La `category` (`'antipasti'`, `'primi'`, `'dolci'`, ecc.) è una stringa libera filtrata lato frontend per raggruppare le voci del menu in sezioni distinte.

---

### 📅 Modello `Booking` — Prenotazioni

| Campo | Tipo Mongoose | Obbligatorio | Note |
|---|---|---|---|
| `roomId` | `ObjectId` | ✅ | Ref → collection `"Room"` |
| `guestName` | `String` | ✅ | — |
| `guestEmail` | `String` | ✅ | — |
| `checkIn` | `Date` | ✅ | — |
| `checkOut` | `Date` | ✅ | — |
| `totalPrice` | `Number` | ✅ | — |
| `status` | `enum` | ❌ | `'pending'` \| `'confirmed'` \| `'cancelled'` |
| `createdAt` | `Date` | ❌ | `Date.now` |

---

## 📋 Flusso di Prenotazione

Il wizard è orchestrato da 4 componenti step + 1 hook centrale + 1 Server Action + 1 Zustand store.

```
useBookingStore (Zustand)
  └── step: 1 | 2 | 3 | 4
  └── preSelectedRoomType: string   ← impostato da BookingTriggerButton in /camere

useBookingFormLogic (React Hook Form + zodResolver)
  └── Step 1 — DateStep      → trigger: [checkIn, checkOut]
  └── Step 2 — RoomStep      → trigger: [roomType]
  └── Step 3 — BoardStep     → trigger: [boardType]
  └── Step 4 — SummaryStep   → trigger: [guestName, guestEmail] → onSubmit()

submitBooking() ["use server" — Server Action]
  └── bookingFormSchema.safeParse(data)   ← Zod
  └── dbConnect()
  └── Booking.create({ ..., status: "pending" })
  └── return { success: true } | { success: false, error, fieldErrors }
```

### Validazione Zod (`bookingFormSchema.ts`)

Il schema applica due `refine` cross-field oltre alle validazioni per campo:

- `checkIn >= oggi` — la data di arrivo non può essere nel passato
- `checkOut > checkIn` — la partenza deve essere successiva all'arrivo

Il medesimo schema è condiviso tra il resolver lato client (React Hook Form) e la safeParse lato server (Server Action), eliminando qualsiasi duplicazione della logica di validazione.

Il tipo `BoardType` è derivato dall'array `BOARD_TYPES` con `as const`, garantendo type-safety sull'enum di Mongoose senza ridefinizioni manuali.

---

## 🌐 Infrastruttura Next.js — File di Sistema Globali

| File | Tipo | Attivazione |
|---|---|---|
| `src/app/loading.tsx` | Server Component | Automatica da Next.js durante ogni navigazione con Suspense |
| `src/app/error.tsx` | **Client Component** (`"use client"`) | Automatica al lancio di un'eccezione non catturata in qualsiasi segmento |
| `src/app/not-found.tsx` | Server Component | Route inesistenti o chiamata esplicita a `notFound()` |

### `loading.tsx` — Skeleton di caricamento

Mostra un `CircularProgress` MUI centrato verticalmente con testo "Caricamento in corso…". Essendo un Server Component, non aggiunge JavaScript al bundle client. Next.js lo avvolge automaticamente in un `<Suspense>` attorno al segmento corrente.

### `error.tsx` — Error Boundary

**Deve essere obbligatoriamente un Client Component**: Next.js inietta le props `error` (l'eccezione catturata) e `reset` (funzione per ritentare il render del segmento) a runtime, operazione non compatibile con i Server Component.

- `useEffect` logga l'errore in console per facilitare il debugging in produzione
- Il bottone "Riprova" chiama `reset()` che smonta e rimonta il segmento fallito
- Il campo `digest` su `error` è l'ID univoco del crash assegnato da Next.js, utile per correlare i log server-side

### `not-found.tsx` — Pagina 404

Attivata sia automaticamente per route inesistenti, sia esplicitamente chiamando `notFound()` da qualsiasi Server Component (es. quando un documento MongoDB non viene trovato). Per creare un 404 specifico per un singolo segmento, è sufficiente aggiungere `not-found.tsx` nella relativa sottocartella (es. `src/app/camere/not-found.tsx`).

---

## 🎨 Tema & Tipografia

Il tema MUI è centralizzato in `src/core/theme/theme.ts` e iniettato globalmente dal `ThemeRegistry` (`src/components/ThemeRegistry.tsx`), che funge da Client boundary per isolare `ThemeProvider` (non serializzabile) dall'albero RSC.

### Palette mediterranea

| Token MUI | Colore | Hex | Uso |
|---|---|---|---|
| `primary.main` | Oro zafferano | `#F4C430` | CTA, icone attive, highlights |
| `primary.dark` | Oro intenso | `#D4A820` | Hover su primary |
| `secondary.main` | Verde teal | `#00A896` | Label, link, overline |
| `secondary.dark` | Teal profondo | `#007A6E` | Hover su secondary |
| `background.default` | Crema avorio | `#FAF7F0` | Sfondo sezioni alternate |
| `text.primary` | Blu notte | `#1A1A2E` | Testi principali, navbar |
| `text.secondary` | Grigio lavanda | `#5C5C7A` | Descrizioni, caption |
| `error.main` | Terracotta | `#C85C40` | Errori form, messaggi critici |

### Tipografia

- **Headings (h1–h6):** Playfair Display (serif) — caricato via Google Fonts runtime nel `layout.tsx`
- **Body / UI:** Inter (sans-serif) — sistema di fallback `system-ui`
- **Button:** `textTransform: none` e `fontWeight: 600` applicati globalmente tramite `components.MuiButton.styleOverrides`

---

## 🚀 Installazione e Comandi

### 1. Clona il repository

```bash
git clone https://github.com/<org>/hotel-pomelia.git
cd hotel-pomelia
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Configura le variabili d'ambiente

Crea il file `.env.local` nella root del progetto:

```env
DATABASE_URL=mongodb+srv://<utente>:<password>@<cluster>.mongodb.net/hotel-pomelia?retryWrites=true&w=majority
```

> La variabile è letta al load del modulo `src/core/database/mongoose.ts`. Se assente, il server termina immediatamente con un `Error` esplicito prima di rispondere a qualsiasi richiesta.

### 4. Comandi disponibili

| Comando | Descrizione |
|---|---|
| `npm run dev` | Avvia il server di sviluppo su `http://localhost:3000` con hot-reload |
| `npm run build` | Compila la build di produzione (SSR + static export) |
| `npm run start` | Avvia il server di produzione (richiede `build` completata) |
| `npm run lint` | Esegue ESLint sull'intero progetto con le regole Next.js |
| `npm run db:seed` | Popola MongoDB Atlas con i dati di esempio (vedi sotto) |

### 5. Seed del database

```bash
npm run db:seed
```

Il comando esegue internamente:

```bash
npx tsx --env-file=.env.local scripts/seed.ts
```

`tsx` esegue TypeScript nativo senza compilazione intermedia. Il flag `--env-file=.env.local` carica le variabili d'ambiente direttamente, senza richiedere `dotenv` nel codice dello script.

**Sequenza di esecuzione:**

1. Connessione a MongoDB Atlas tramite `DATABASE_URL`
2. `Room.deleteMany({})` → inserimento 2 camere (Suite Pomelia, Camera Deluxe)
3. `Experience.deleteMany({})` → inserimento 2 esperienze (Tour Cantine, Escursione Barca)
4. `Restaurant.deleteMany({})` → inserimento 2 voci menu (Cavatelli, Cannolo)
5. Disconnessione e terminazione processo

> ⚠️ Il seed esegue `deleteMany({})` su ogni collection prima dell'inserimento. Non eseguirlo su un database di produzione con dati reali.

---

## 📁 Route dell'Applicazione

| URL | File | Metadata | Contenuto |
|---|---|---|---|
| `/` | `src/app/page.tsx` | ✅ + JSON-LD | Hero, value proposition, storia tre generazioni, manifesto Società Benefit, CTA |
| `/camere` | `src/app/camere/page.tsx` | ✅ | Griglia camere con features e pulsante prenotazione diretta |
| `/esperienze` | `src/app/esperienze/page.tsx` | ✅ | Esperienze con tags, highlights e durata da MongoDB |
| `/ristorazione` | `src/app/ristorazione/page.tsx` | ✅ | Menu ristorante raggruppato per categoria |
| `/prenota` | `src/app/prenota/page.tsx` | ✅ | Wizard prenotazione a 4 step con Zod + Server Action |
| `/sostenibilita` | `src/app/sostenibilita/page.tsx` | ✅ + OpenGraph | 6 pilastri sostenibilità con progress bar e metriche |

---

## 🔄 Migrazione da Prisma a Mongoose

Il progetto è stato migrato dall'ORM **Prisma** (schema dichiarativo + client generato) al driver ODM **Mongoose** per le seguenti ragioni tecniche:

| Aspetto | Prisma (precedente) | Mongoose (attuale) |
|---|---|---|
| Schema | File `.prisma` separato | Interfaccia TypeScript + Schema inline |
| Array con default | Richiede migrazione esplicita | `default: []` nello schema |
| Hot-reload Next.js | Client globale con workaround | Pattern `models.X \|\| model()` nativo |
| Seed script | `prisma db push` + client generato | `tsx --env-file` — zero configurazione |
| Bundle size | Client generato (~200 KB) | Solo driver nativo MongoDB |

La cache `globalThis.__mongooseCache` risolve il problema delle connessioni multiple in sviluppo, equivalente al singleton Prisma ma senza dipendenze aggiuntive.

---

*Hotel Pomelia S.r.l. — Ragusa, Sicilia · Società Benefit L. 208/2015 · Uso educativo e portfolio*
