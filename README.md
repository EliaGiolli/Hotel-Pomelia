# Hotel Pomelia

> **Boutique hotel ecosostenibile nel cuore della Sicilia ragusana.**  
> Official website for a fictional *Società Benefit* hospitality brand — built as a showcase of modern full-stack web development with a focus on SEO, accessibility, and sustainable design.

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![MUI](https://img.shields.io/badge/Material_UI_v6-007FFF?style=flat-square&logo=mui&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_5-2D3748?style=flat-square&logo=prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)

---

## Overview

Hotel Pomelia is a **full-stack informational & booking-request website** for a three-generation, family-run boutique hotel in the Ragusa Iblea region of Sicily. The hotel operates as a certified *Società Benefit* and prioritises:

- 100% renewable solar energy (130% of capacity)
- Zero-kilometer organic kitchen (*maccu di favi*, *schiaccia ragusana*, *'mpanatigghi*)
- Upcycled furniture crafted by local Sicilian artisans
- GOTS-certified organic hemp & cotton linens
- A certified barrier-free private beach

The site is engineered to convert organic search traffic through structured semantic HTML, Next.js 16 Metadata API, JSON-LD Hotel schema, and pure React Server Components on every informational page.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 — App Router, RSC-first, Server Actions |
| Language | TypeScript 5 |
| UI Library | Material UI v6 with custom Mediterranean theme (`#F4C430` · `#00A896`) |
| Validation | Zod — schema-first, shared between client and server |
| State Management | Zustand v5 — booking form multi-step flow |
| Database | MongoDB Atlas via Prisma ORM v5 |
| Styling | Emotion (MUI default) — no CSS modules, no Tailwind |
| Images | Next.js `<Image>` with Unsplash placeholders |

---

## Architecture

The project follows a **three-layer feature-based structure**:

```
src/
├── app/                        # Next.js App Router — thin page wrappers only
│   ├── layout.tsx              # Root layout: ThemeRegistry, Navbar, Footer
│   ├── page.tsx                # / — metadata + JSON-LD + <HomeContent />
│   ├── camere/page.tsx
│   ├── ristorazione/page.tsx
│   ├── esperienze/page.tsx
│   ├── sostenibilita/page.tsx
│   ├── prenota/page.tsx        # Client Component — multi-step booking form
│   └── api/                    # Legacy REST routes (→ removed in Phase 2)
│
├── core/                       # Infrastructure shared across the entire app
│   ├── database/
│   │   └── prisma.ts           # Singleton Prisma client
│   ├── store/                  # Global Zustand stores (Phase 2)
│   └── theme/
│       └── theme.ts            # MUI theme: palette, typography, component overrides
│
├── shared/                     # Reusable UI & utilities, domain-agnostic
│   ├── components/
│   │   └── ui/
│   │       ├── Navbar.tsx      # "use client" — sticky nav with mobile drawer
│   │       └── Footer.tsx      # RSC — semantic footer with contact & links
│   ├── schemas/                # Cross-feature Zod schemas (Phase 3)
│   ├── types/                  # Shared TypeScript types
│   └── helpers/
│
└── features/                   # Domain-scoped modules
    ├── home/
    │   └── components/HomeContent.tsx
    ├── camere/
    │   └── components/CamereContent.tsx
    ├── ristorazione/
    │   └── components/RistorazioneContent.tsx
    ├── esperienze/
    │   └── components/EsperienzeContent.tsx
    ├── booking/
    │   ├── schemas/
    │   │   └── bookingFormSchema.ts    # Zod — validated on client + server
    │   ├── actions/
    │   │   └── submitBooking.ts        # Server Action replacing /api/bookings
    │   ├── components/                 # RHF multi-step form (Phase 3)
    │   └── hooks/
    └── sostenibilita/
```

### Design principles

- **`app/` pages are wrappers** — they export `metadata` and render one feature component. No business logic.
- **`core/` is infrastructure** — Prisma client, theme, global stores. Never imports from `features/`.
- **`features/` own their domain** — components, actions, schemas, and hooks live together. A feature imports from `core/` and `shared/`, never from another feature.
- **RSC by default** — `"use client"` only where interactivity is unavoidable (Navbar, booking form).

---

## Routes

```
/                  → Home — hero, 3 generazioni, Società Benefit manifesto, CTA
/camere            → Camere & Suite — 4 room cards with artisan features
/ristorazione      → Ristorante & Orto — 0-km kitchen, dishes, workshops
/esperienze        → Territorio & Esperienze — trekking, oil tasting, Agrigento, beach
/sostenibilita     → Manifesto — sustainability pillars with progress metrics
/prenota           → Booking Request Form — multi-step (dates → room → guest → confirm)
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (free tier works fine)

### 1. Clone & install

```bash
git clone https://github.com/your-username/hotel-pomelia.git
cd hotel-pomelia
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

```env
DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/hotel-pomelia?retryWrites=true&w=majority"
```

### 3. Initialise the database

```bash
npm run db:push      # Push schema to MongoDB and generate Prisma client
```

### 4. Start dev server

```bash
npm run dev
# → http://localhost:3000
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js in development mode |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to MongoDB |
| `npm run db:generate` | Regenerate Prisma Client |
| `npm run db:studio` | Open Prisma Studio GUI |

---

## Database Schema

```prisma
model Room {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  description String
  capacity    Int
  features    String[]
  images      String[]
}

model BookingRequest {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  createdAt   DateTime @default(now())
  guestName   String
  guestEmail  String
  checkIn     DateTime
  checkOut    DateTime
  boardType   String   // "Pensione Completa" | "Mezza Pensione" | "Colazione"
  roomType    String
  notes       String?
  status      String   @default("PENDING") // PENDING | CONFIRMED | REJECTED
}
```

---

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| Primary (Saffron Gold) | `#F4C430` | CTAs, icons, active states |
| Secondary (Teal) | `#00A896` | Highlights, links, labels |
| Background warm | `#FAF7F0` | Section backgrounds |
| Dark navy | `#1A1A2E` | Navbar, footer, dark sections |
| Terracotta | `#C85C40` | Error states, Family badge |
| Heading font | Playfair Display | h1–h6 |
| Body font | Inter | Body, captions, UI |

---

## Roadmap

| Phase | Status | Description |
|---|---|---|
| **Phase 1** — Upgrade & Structure | ✅ Done | Next.js 16, React 19, MUI 6.5, feature-based folder layout, Zod schema, Server Action stub |
| **Phase 2** — Domain Decomposition | ⏳ Next | Remove API routes, migrate Zustand store to `core/store/`, wire Server Action to booking form |
| **Phase 3** — Forms & Validation | ⏳ Pending | React Hook Form + Zod resolver, multi-step form in `features/booking/components/`, accessible field error display |

---

## License

This project is for educational and portfolio purposes. All Unsplash images are used under the [Unsplash License](https://unsplash.com/license). Hotel Pomelia is a fictional brand.

---

<p align="center">Made with care for the Sicilian coast · <strong>Hotel Pomelia</strong></p>
