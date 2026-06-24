# 🌿 Hotel Pomelia

> **Boutique hotel ecosostenibile nel cuore della Sicilia ragusana.**  
> Official website for a fictional *Società Benefit* hospitality brand — built as a showcase of modern full-stack web development with a focus on SEO, accessibility, and sustainable design.

---

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![MUI](https://img.shields.io/badge/Material_UI_v6-007FFF?style=flat-square&logo=mui&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-brown?style=flat-square)

---

## Overview

Hotel Pomelia is a **full-stack informational & booking-request website** for a three-generation, family-run boutique hotel located in the Ragusa Iblea region of Sicily. The hotel operates as a certified *Società Benefit*, prioritising:

- 100% renewable solar energy
- Zero-kilometer organic kitchen (*maccu di favi*, *schiaccia ragusana*, *mpanatigghi*)
- Upcycled furniture crafted by local Sicilian artisans
- GOTS-certified organic hemp & cotton linens
- A certified barrier-free private beach (zero architectural barriers)

The site is designed to convert organic search traffic through structured semantic HTML, Next.js Metadata API, and JSON-LD schema — no payment gateway required.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) — App Router, Server & Client Components |
| Language | TypeScript 5 |
| UI Library | [Material UI v6](https://mui.com/) with custom Mediterranean theme |
| State Management | [Zustand v5](https://zustand-demo.pmnd.rs/) — booking form flow |
| Database | MongoDB Atlas via [Prisma ORM v5](https://www.prisma.io/) |
| Styling | Emotion (MUI default) + custom palette (`#F4C430` terracotta · `#00A896` teal) |
| Images | Next.js `<Image>` + Unsplash copyright-free placeholders |
| Date Handling | [Day.js](https://day.js.org/) + MUI X Date Pickers |

---

## Features

- **Server Components first** — all informational pages are RSC for fast TTFB and zero hydration cost
- **SEO-optimised** — per-page `metadata` exports, Open Graph tags, and a Hotel `JSON-LD` schema on the homepage
- **Multi-step booking form** — Zustand-managed steps (dates → room type → board option → confirm)
- **REST API** — `POST /api/bookings` validates and persists requests; `GET /api/rooms` serves room data
- **Accessible** — `aria-label` on all icon buttons, semantic landmarks (`<main>`, `<article>`, `<section>`), high contrast palette
- **Responsive** — MUI `Grid2` breakpoints from mobile-first to desktop

---

## Routes

```
/                  → Home — hero, value proposition, highlights, CTA
/camere            → Accommodations — room cards with artisan features
/ristorazione      → Restaurant & Garden — 0-km kitchen, workshops
/esperienze        → Territory & Activities — trekking, olive oil tasting
/sostenibilita     → Our Manifesto — sustainability pillars
/prenota           → Booking Request Form (Client Component, multi-step)
/api/bookings      → POST — create booking request
/api/rooms         → GET  — list rooms
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

### 2. Configure environment variables

Copy the example and fill in your values:

```bash
cp .env.example .env.local
```

```env
# .env.local
DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/hotel-pomelia?retryWrites=true&w=majority"
```

### 3. Initialise the database

```bash
# Push the Prisma schema to MongoDB and generate the client
npm run db:push
```

### 4. Start the dev server

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

## Project Structure

```
hotel-pomelia/
├── prisma/
│   └── schema.prisma        # Room + BookingRequest models
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout — MUI ThemeProvider, fonts
│   │   ├── page.tsx          # / — Home (Server Component)
│   │   ├── camere/page.tsx   # /camere (Server Component)
│   │   ├── prenota/page.tsx  # /prenota (Client Component)
│   │   └── api/
│   │       ├── bookings/route.ts
│   │       └── rooms/route.ts
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── store/
│   │   └── useBookingStore.ts  # Zustand booking flow state
│   ├── theme/
│   │   └── theme.ts            # Custom MUI palette & typography
│   └── lib/
│       └── prisma.ts           # Singleton Prisma client
└── public/
```

---

## Database Schema

```prisma
model Room {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  description String
  capacity    Int
  features    String[]   // e.g. ["Arredi di recupero", "Lenzuola in Canapa"]
  images      String[]   // Unsplash URLs
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
| Primary | `#F4C430` | Accents, CTAs, icons |
| Secondary | `#00A896` | Teal highlights, links |
| Background warm | `#FAF7F0` | Section backgrounds |
| Typography | Playfair Display + Inter | Headings + body |

---

## License

This project is for educational and portfolio purposes. All Unsplash images are used under the [Unsplash License](https://unsplash.com/license). Hotel Pomelia is a fictional brand.

---

<p align="center">Made with care for the Sicilian coast · <strong>Hotel Pomelia</strong></p>
