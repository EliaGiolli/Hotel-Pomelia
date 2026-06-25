<div align="center">

# Hotel Pomelia

**Boutique hotel website — ecosostenibile, Ragusa Ibla, Sicilia.**

A production-grade full-stack web app for a fictional *Società Benefit* hospitality brand. RSC-first architecture, Server Actions, multi-step booking form with Zod + React Hook Form, MUI v6 custom theme.

<br/>

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/Material_UI_v6-007FFF?style=flat-square&logo=mui&logoColor=white)](https://mui.com/)
[![Prisma](https://img.shields.io/badge/Prisma_5-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Zod](https://img.shields.io/badge/Zod_4-3E67B1?style=flat-square&logo=zod&logoColor=white)](https://zod.dev/)

</div>

---

## What this is

Hotel Pomelia is the official website for a fictional boutique hotel in Ragusa Ibla, Sicily. Beyond being a presentational site, it's a technical showcase for:

- **RSC-first** — every informational page is a React Server Component with zero client-side JavaScript
- **Server Actions** — booking form submission goes directly to Prisma/MongoDB, no REST API layer
- **Shared Zod schema** — the same schema validates the client-side form (via RHF resolver) and the server-side action
- **Feature-based architecture** — domain modules own their components, actions, schemas, and hooks; they never cross-import

The hotel brand itself is built around three pillars: 100% renewable energy, a zero-kilometre organic kitchen, and a barrier-free beach.

---

## Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 — App Router | Server Components + Server Actions throughout |
| Language | TypeScript 5 — strict mode | Path alias `@/*` → `src/*` |
| UI | Material UI v6 + Emotion | Custom Mediterranean palette, no Tailwind |
| Forms | React Hook Form 7 + Zod resolver | Multi-step, client-validated before server submission |
| Validation | Zod 4 | Single schema, shared client ↔ server |
| State | Zustand v5 | Booking form step + pre-selected room across navigation |
| ORM | Prisma 5 | MongoDB Atlas (free tier compatible) |
| Dates | Day.js + MUI X Date Pickers | `it` locale |

---

## Architecture

Three layers, strict dependency direction — features may import from `core` and `shared`, never from each other.

```
src/
├── app/                          # Thin wrappers: export metadata + render one feature component
│   ├── layout.tsx
│   ├── page.tsx                  # / — JSON-LD Hotel schema + <HomeContent />
│   ├── camere/page.tsx
│   ├── ristorazione/page.tsx
│   ├── esperienze/page.tsx
│   ├── sostenibilita/page.tsx
│   └── prenota/page.tsx          # "use client" boundary — mounts BookingFormProvider
│
├── core/                         # Infrastructure — never imports from features
│   ├── database/prisma.ts        # Singleton Prisma client
│   ├── store/useBookingStore.ts  # Zustand — booking step + preSelectedRoom
│   └── theme/theme.ts            # MUI theme: palette, typography, component overrides
│
├── shared/                       # Reusable UI, domain-agnostic
│   └── components/ui/
│       ├── Navbar.tsx            # "use client" — sticky nav, mobile drawer
│       └── Footer.tsx            # RSC — semantic footer
│
├── features/                     # Domain modules, self-contained
│   ├── home/components/HomeContent.tsx
│   ├── camere/components/
│   │   ├── CamereContent.tsx
│   │   └── BookingTriggerButton.tsx   # Calls preSelectRoom() → navigates to /prenota
│   ├── ristorazione/components/RistorazioneContent.tsx
│   ├── esperienze/components/EsperienzeContent.tsx
│   └── booking/
│       ├── schemas/bookingFormSchema.ts   # Zod — shared client + server
│       ├── actions/submitBooking.ts       # "use server" — validate → Prisma.create()
│       ├── hooks/useBookingFormLogic.ts   # RHF + Zod resolver + step management
│       └── components/
│           ├── BookingFormProvider.tsx
│           ├── BookingForm.tsx
│           └── steps/
│               ├── DateStep.tsx          # Check-in / check-out (Day.js validation)
│               ├── RoomStep.tsx          # Room type selection
│               ├── BoardStep.tsx         # Colazione / Mezza Pensione / Pensione Completa
│               └── SummaryStep.tsx       # Guest name, email, notes, confirm
│
└── components/
    └── ThemeRegistry.tsx         # "use client" — AppRouterCacheProvider for MUI SSR
```

### Key constraints

- `app/` pages contain **no business logic** — only `metadata` exports and a single component mount
- `core/` is **pure infrastructure** — Prisma client, theme, global stores
- Features are **independently deployable** in concept — no lateral imports

---

## Booking flow

```
/camere  →  BookingTriggerButton
              └─ preSelectRoom(roomType)   [Zustand]
              └─ router.push('/prenota')

/prenota  →  BookingFormProvider           [use client]
              └─ useBookingFormLogic       [RHF + Zod resolver]
                  ├─ DateStep
                  ├─ RoomStep
                  ├─ BoardStep
                  └─ SummaryStep
                       └─ submitBooking()  [Server Action]
                            ├─ bookingFormSchema.safeParse()
                            ├─ prisma.bookingRequest.create()
                            └─ { success } | { error, fieldErrors }
```

---

## Routes

```
/                  Home — hero, manifesto, highlights, CTA
/camere            Rooms & Suites — 4 cards with artisan features
/ristorazione      Restaurant & Kitchen Garden — 0-km menu, workshops
/esperienze        Territory — Iblei trekking, olive oil tasting, Agrigento
/sostenibilita     Manifesto — sustainability pillars with progress metrics
/prenota           Booking Request Form — 4-step, RSC-compatible
```

---

## Getting started

**Prerequisites:** Node.js ≥ 18, a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (free tier is fine).

```bash
git clone https://github.com/your-username/hotel-pomelia.git
cd hotel-pomelia
npm install
```

Copy the environment template and set your Atlas connection string:

```bash
cp .env.example .env.local
```

```env
DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/hotel-pomelia?retryWrites=true&w=majority"
```

Push the schema and generate the Prisma client:

```bash
npm run db:push
```

Start the dev server:

```bash
npm run dev
# → http://localhost:3000
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run db:push` | Push Prisma schema to MongoDB + generate client |
| `npm run db:generate` | Regenerate Prisma client only |
| `npm run db:studio` | Prisma Studio GUI |

---

## Database schema

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
  boardType   String            // "Colazione" | "Mezza Pensione" | "Pensione Completa"
  roomType    String
  notes       String?
  status      String   @default("PENDING")  // PENDING | CONFIRMED | REJECTED
}
```

---

## Design tokens

| Token | Value | Role |
|---|---|---|
| Primary — Saffron Gold | `#F4C430` | CTAs, active icons, highlights |
| Secondary — Mediterranean Teal | `#00A896` | Labels, links, overlines |
| Background warm | `#FAF7F0` | Section fills |
| Dark navy | `#1A1A2E` | Navbar, footer, dark sections |
| Heading | Playfair Display | h1–h6 |
| Body | Inter | Body, captions, UI labels |

---

## License

Educational and portfolio use only. All Unsplash images are used under the [Unsplash License](https://unsplash.com/license). Hotel Pomelia is a fictional brand.
