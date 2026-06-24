# CLAUDE.md - Hotel Pomelia Web Project

## Project Overview
You are building the official website for **Hotel Pomelia**, a fictional eco-friendly, family-run boutique hotel located in the Ragusa region of Sicily (active for 3 generations, managed by Chiara, Laura, and Alessandro). The hotel operates as a "Società Benefit", focusing on responsible tourism, 100% renewable energy, sustainable design, organic local food, and territorial integration.

**Core Tech Stack:** Next.js (App Router), MongoDB, Prisma ORM, Material UI (MUI), Zustand (State Management).
**Media Strategy:** Use copyright-free placeholder images from Unsplash matching the sustainable, Sicilian, and modern hospitality vibe.
**Scope:** Informational and interactive booking request site. **No payment gateway integration required.**

---

## Architecture & Routes Structure

### 1. Public Routes (Next.js App Router)
*   ` / ` (Home Page): **Server Component**. Hero section with Unsplash video/image of Ragusa countryside/sea, value proposition ("Società Benefit", eco-luxury), overview of experiences, and a quick booking inquiry widget.
*   `/camere` (Accommodations): **Server Component**. Showcase of rooms featuring sustainable design, upcycled furniture by local artisans, and certified GOTS organic cotton/hemp linens.
*   `/ristorazione` (Ristorante & Orto): **Server Component**. Deep dive into the 0-km organic kitchen. Highlights parsed from source materials: *Maccu di favi ragusano*, *Schiaccia ragusana*, *'Mpanatigghi*, and workshops on Sicilian cooking and permaculture.
*   `/esperienze` (Territory & Activities): **Server Component**. Guided excursions, trekking, and the strategic day-trip to Agrigento/Chiaramonte for premium olive oil tasting.
*   `/sostenibilita` (Our Manifesto): **Server Component**. Explaining the core pillars of their responsible tourism model (solar energy, circular economy, linen donation programs, accessibility features like the barrier-free private beach).
*   `/prenota` (Booking Request Form): **Client Component**. Multi-step form managed via **Zustand** to select dates, room types, and board options (Full board, Half board, Breakfast).

### 2. API Routes (`/api/...`)
*   `POST /api/bookings`: Validates and saves booking requests to MongoDB via Prisma.
*   `GET /api/rooms`: Fetches dynamic room availability and details.

---

## SEO & Copywriting Guidelines

### Target Keywords & Semantic HTML
*   **Primary Keywords:** *hotel ecosostenibile Ragusa*, *turismo responsabile Sicilia*, *hotel biologico Ragusa*, *vacanze sostenibili Sicilia*.
*   **Secondary Keywords:** *schiaccia ragusana*, *maccu di favi*, *società benefit hotel*, *spiaggia accessibile disabili Ragusa*.
*   **Execution:** Leverage Next.js Metadata API on every page. Use rich semantic layout structures (`<main>`, `<article>`, `<section>`, `<header>`) to optimize search crawler indexing on experiential culinary keywords.

---

## Database Schema (Prisma / MongoDB)

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Room {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  description String
  capacity    Int
  features    String[] // e.g., ["Arredi di recupero", "Lenzuola in Canapa"]
  images      String[] // Unsplash URLs
}

model BookingRequest {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  createdAt    DateTime @default(now())
  guestName    String
  guestEmail   String
  checkIn      DateTime
  checkOut     DateTime
  boardType    String   // "Pensione Completa", "Mezza Pensione", "Colazione"
  roomType     String
  notes        String?
  status       String   @default("PENDING") // PENDING, CONFIRMED, REJECTED
}
UI/UX & Styling Rules (Material UI)
Theme Palette: Build a custom MUI theme using natural tones. Earthy terracotta/yellows (#F4C430) mixed with deep Mediterranean blues/teals (#00A896).

Accessibility: Ensure a high contrast ratio. Use descriptive aria-label tags on icons. Keep in mind the hotel's focus on accessibility (zero architectural barriers, certified barrier-free beach access).

Components: Use MUI Container, Grid2 (next-gen grid), Card, and Button with elevation set to 0 or 1 for a flat, modern eco-design feel.

Development Workflow & Milestones
Follow this step-by-step roadmap to implement the project methodically:

Phase 1: Environment Setup & Data Layer
Initialize the Next.js project with TypeScript and App Router.

Configure Material UI (MUI) with the custom Mediterranean color palette and theme providers.

Set up Prisma with the MongoDB connection string. Run npx prisma db push to initialize the collections.

Seed the database with sample room types incorporating the artisan features mentioned in the copy.

Phase 2: Static Server Components & Copywriting (SEO Focus)
Build the global layout, navigation header, and footer.

Implement the / (Home Page) and /sostenibilita pages using raw semantic copy derived from the hotel's mission.

Develop the /ristorazione and /esperienze pages, organizing the traditional Sicilian culinary details (maccu, schiaccia) inside targeted <article> elements.

Integrate Next.js static/dynamic metadata headers for all completed routes.

Phase 3: Interactive Features & State Management
Set up the Zustand store inside src/store/useBookingStore.ts to manage step progression, temporary user selections, and field validation.

Create the multi-step form client UI inside /prenota.

Build the /api/bookings route handler to receive form submissions, validate date intervals, and store records using Prisma.

Connect the client form to trigger the API and show a stylized custom MUI success dialog without redirecting to third-party financial components.

Phase 4: Refinement & Performance Check
Audit all image elements to use Next.js <Image> component for automated optimization using responsive Unsplash links.

Double-check contrast metrics on typography overlays.
Since I know Next.js but I'm not a pro user, write meaningful comments in english whenever you feel like there's an important feature