# 🌿 Hotel Pomelia — Responsible Tourism in Ragusa, Sicily

> Eco-sustainable boutique hotel in the heart of the Iblean mountains.
> Three generations of authentic hospitality since 1958. **Certified Benefit Corporation** (Italian Law 208/2015).
> 100% renewable energy · Organic zero-km cuisine · GOTS-certified linen · Barrier-free beach.

This repository contains the official web application of Hotel Pomelia, built with **Next.js App Router**, **React 19**, **Mongoose**, and **Material UI 6**.

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | `^16.2.9` |
| UI Library | React | `^19.2.7` |
| Component Library | Material UI + Emotion | `^6.5.0` |
| Icons | MUI Icons Material | `^6.5.0` |
| Date Picker | MUI X Date Pickers + DayJS | `^7.28.3` |
| Database ODM | Mongoose | `9.7.2` |
| Database Driver | MongoDB | `7.3.0` |
| Schema Validation | Zod | `^4.4.3` |
| Form Management | React Hook Form + zodResolver | `^7.80.0` |
| State Management | Zustand | `^5.0.3` |
| Language | TypeScript | `^5.7.3` |
| Seed Script | tsx (with --env-file) | via npx |

---

## 🏗️ Project Architecture

The project adopts a **feature-based modular architecture** that strictly separates domain logic from technical infrastructure. Dependency direction is rigidly unidirectional: `features` → `core` and `shared`, never laterally between features.

```
hotel-pomelia/
├── scripts/
│   └── seed.ts                      # MongoDB seeder: rooms, experiences, restaurants
├── tests-e2e/                       # Playwright end-to-end tests
│   └── navigation.spec.ts           # Happy path: homepage → /camere navigation
├── playwright.config.ts             # Playwright config: baseURL, browser, webServer
├── vitest.config.ts                 # Vitest config: jsdom/node environments, @/ alias
├── vitest.setup.ts                  # Global test setup: @testing-library/jest-dom matchers
├── src/
│   ├── app/                         # Next.js App Router — routes and global system files
│   │   ├── layout.tsx               # Root layout: ThemeRegistry, Navbar, Footer, global metadata
│   │   ├── page.tsx                 # Home — Server Component: metadata + JSON-LD Schema.org
│   │   ├── loading.tsx              # Global skeleton (Server Component, Suspense boundary)
│   │   ├── error.tsx                # Global error boundary (mandatory Client Component)
│   │   ├── not-found.tsx            # Global 404 page (Server Component)
│   │   ├── camere/page.tsx          # /camere route — Server Component
│   │   ├── esperienze/page.tsx      # /esperienze route — Server Component
│   │   ├── ristorazione/page.tsx    # /ristorazione route — Server Component
│   │   ├── prenota/page.tsx         # /prenota route — Server Component
│   │   └── sostenibilita/page.tsx   # /sostenibilita route — Server Component
│   │
│   ├── core/                        # Global logic and resources, feature-independent
│   │   ├── database/
│   │   │   └── mongoose.ts          # MongoDB singleton with globalThis cache
│   │   ├── lib/
│   │   │   └── test-db.ts           # Test utility: connectDB / clearDB / closeDB (in-memory)
│   │   ├── models/
│   │   │   ├── Room.ts              # Mongoose model: hotel rooms
│   │   │   ├── Experience.ts        # Mongoose model: local experiences
│   │   │   ├── Restaurant.ts        # Mongoose model: restaurant menu items
│   │   │   └── Booking.ts           # Mongoose model: guest bookings
│   │   ├── queries/
│   │   │   ├── getRooms.ts          # Query function: available rooms (available: true)
│   │   │   ├── getRooms.test.ts     # Integration tests: getRooms with mongodb-memory-server
│   │   │   ├── getExperiences.ts    # Query function: all experiences
│   │   │   └── getExperiences.test.ts # Integration tests: getExperiences with mongodb-memory-server
│   │   ├── store/
│   │   │   └── useBookingStore.ts   # Zustand: wizard step and pre-selected room
│   │   └── theme/
│   │       └── theme.ts             # MUI theme: Mediterranean palette, typography, global overrides
│   │
│   ├── features/                    # Domain-specific application modules
│   │   ├── home/
│   │   │   ├── components/
│   │   │   │   └── HomeContent.tsx  # Hero, value prop, history, manifesto, CTA
│   │   │   └── constants/
│   │   │       └── homeData.ts      # Static data: highlights, generations, benefit pillars
│   │   ├── camere/
│   │   │   └── components/
│   │   │       ├── CamereContent.tsx         # Room grid with details and booking trigger
│   │   │       ├── CamereContent.test.tsx    # Component tests: rendering with mock data
│   │   │       └── BookingTriggerButton.tsx  # Pre-selects room → navigates to /prenota
│   │   ├── esperienze/
│   │   │   └── components/
│   │   │       ├── EsperienzeContent.tsx     # Experience grid with tags and highlights
│   │   │       └── EsperienzeContent.test.tsx # Component tests: rendering with mock data
│   │   ├── ristorazione/
│   │   │   └── components/
│   │   │       └── RistorazioneContent.tsx   # Menu grouped by category
│   │   ├── sostenibilita/
│   │   │   └── components/
│   │   │       └── SostenibilitaContent.tsx  # 6 sustainability pillars with MUI progress bars
│   │   └── booking/
│   │       ├── actions/
│   │       │   └── submitBooking.ts          # "use server": Zod validate → persist to MongoDB
│   │       ├── components/
│   │       │   ├── BookingForm.tsx           # Wizard container
│   │       │   ├── BookingFormProvider.tsx   # React Hook Form context provider
│   │       │   └── steps/
│   │       │       ├── DateStep.tsx          # Step 1: arrival/departure with MUI X DatePicker
│   │       │       ├── RoomStep.tsx          # Step 2: room type selection
│   │       │       ├── BoardStep.tsx         # Step 3: meal plan selection
│   │       │       └── SummaryStep.tsx       # Step 4: recap + guest info + submit
│   │       ├── hooks/
│   │       │   └── useBookingFormLogic.ts    # Hook: step, submit, dialog, useTransition
│   │       └── schemas/
│   │           ├── bookingFormSchema.ts      # Zod: validation with cross-field refine
│   │           └── bookingFormSchema.test.ts # Unit tests: schema validation logic
│   │
│   └── shared/                      # Cross-feature UI components
│       └── components/ui/
│           ├── Navbar.tsx           # Global navigation bar
│           ├── Footer.tsx           # Global footer
│           └── ThemeRegistry.tsx    # Client boundary: MUI ThemeProvider + Emotion SSR cache
```

### Key Principle — Server / Client Split

Every route in `src/app/` is a **pure Server Component**: it exports `metadata` (and where relevant, JSON-LD Schema.org), contains no `"use client"`, and fully delegates rendering to the corresponding Client Component in `src/features/`. This guarantees statically analysable metadata for Next.js and complete client bundle tree-shaking.

```
src/app/sostenibilita/page.tsx              → Server Component (metadata + OpenGraph)
        ↓ imports
src/features/sostenibilita/components/
  SostenibilitaContent.tsx                  → "use client" (MUI, icons, full JSX)
```

---

## 🧪 Testing Strategy

The project adopts a **three-layer testing pyramid** that mirrors the application's own architecture. Each layer has a distinct scope, isolation mechanism, and business justification. All tests are co-located with the source files they cover — a convention that keeps context visible and avoids test files becoming orphaned over time.

```
tests-e2e/                      ← Layer 3: End-to-End (Playwright)
  └── navigation.spec.ts

src/features/**/
  └── *.test.tsx                ← Layer 2a: Component Integration (Vitest + Testing Library)

src/core/queries/
  └── *.test.ts                 ← Layer 2b: Database Integration (Vitest + mongodb-memory-server)

src/features/booking/schemas/
  └── bookingFormSchema.test.ts ← Layer 1: Unit (Vitest, pure logic, zero I/O)
```

### Tools

| Tool | Role | Environment |
|---|---|---|
| [Vitest](https://vitest.dev/) v4 | Test runner for unit and integration tests | `node` / `jsdom` per file |
| [@testing-library/react](https://testing-library.com/) v16 | Component rendering and DOM assertions | jsdom |
| [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) v11 | Real MongoDB process in-memory, isolated per test suite | node |
| [Playwright](https://playwright.dev/) v1.61 | Browser automation for end-to-end tests | Chromium |

---

### Layer 1 — Unit Tests: Business Logic Validation

**File:** [`src/features/booking/schemas/bookingFormSchema.test.ts`](src/features/booking/schemas/bookingFormSchema.test.ts)

**What it tests:** The Zod schema that validates every booking form submission before it reaches the database.

**Why it matters for the business:** The Zod schema is the guardian of data integrity. An undetected validation error allows bookings with impossible dates (check-out before check-in), malformed emails that make guest follow-up impossible, or missing required fields that break downstream logic. These are the kinds of bugs that surface in production as silent data corruption rather than thrown exceptions.

**Isolation:** Pure function tests — no I/O, no DOM, no network. Runs in milliseconds. No mocks needed because the schema has no external dependencies.

**Environment:** `// @vitest-environment node` is not needed; the schema is a pure TypeScript module.

| Test case | Business scenario |
|---|---|
| Valid booking accepted | Baseline: the form can actually be submitted at all |
| Malformed email rejected | Guest can't be contacted for booking confirmation |
| Name shorter than 2 chars | Almost certainly a typo — rejected at the boundary |
| Check-in in the past | Would create records inconsistent with actual room availability |
| Check-out equal to check-in | Zero-night stay: operationally impossible |
| Check-out before check-in | Inverted dates cannot be handled by the rooms department |
| Invalid `boardType` enum value | Arbitrary value could be the result of HTTP payload tampering |

```ts
// The shared schema validates on both sides of the network boundary:
// client-side (React Hook Form resolver) and server-side (Server Action safeParse).
// A single source of truth — no duplication, no drift.
const result = bookingFormSchema.safeParse({ ...validBase, guestEmail: "not-an-email" });
expect(result.success).toBe(false);
expect(result.error.issues.map(i => i.path[0])).toContain("guestEmail");
```

---

### Layer 2a — Component Integration Tests: Async Server Components

**Files:**
- [`src/features/camere/components/CamereContent.test.tsx`](src/features/camere/components/CamereContent.test.tsx)
- [`src/features/esperienze/components/EsperienzeContent.test.tsx`](src/features/esperienze/components/EsperienzeContent.test.tsx)

**What it tests:** The rendering behaviour of the two main data-driven page components against controlled mock data — including an empty list, a populated list, and partially populated objects.

**Why it matters for the business:**
- `/camere` is the primary conversion point of the hotel. If the component crashes (undefined list, missing fields), potential guests see a blank page and cannot start a booking.
- `/esperienze` is the editorial showcase that differentiates the hotel from competitors. Missing data silently reduces time-on-page and conversion.
- The "Accessible to all" badge on highlighted experiences is a critical marketing signal for guests with mobility needs. A regression here makes that information invisible.

**What is mocked and why:**

| Mock target | Reason |
|---|---|
| `next/image` | Requires a Canvas API not available in jsdom |
| `next/link` | Passthrough: only `href` and `children` are needed |
| `@/core/database/mongoose` (dbConnect) | No real DB connection in component tests |
| `@/core/models/Room` / `@/core/models/Experience` | `find().lean()` return value controlled per test |
| `BookingTriggerButton` | Uses `useRouter` and Zustand; isolates CamereContent from client-side dependencies |

**Technique:** Because both components are async server components, they are called as plain async functions (`await CamereContent()`), and the returned JSX is passed directly to `render()`. This bypasses the Next.js runtime while fully exercising the rendering logic.

**Environment:** `jsdom` (default) — DOM assertions via `@testing-library/jest-dom`.

| Test case | What is asserted |
|---|---|
| Populated list (2 items) | One `h3` heading per room/experience, correct number of "Prenota" buttons |
| Empty list | Section heading still present; zero dynamic cards; no crash |
| Minimal object (optional fields absent) | Component renders without throwing; item title visible |
| `highlight: true` badge | Chip "Accessibile a tutti" appears exactly once, not on non-highlighted items |

```ts
// Async server components are called directly — no special wrapper needed.
// The returned JSX is a plain ReactElement, fully compatible with render().
const ui = await CamereContent();
render(ui);
expect(screen.getAllByRole("button", { name: /^Prenota/i })).toHaveLength(mockRooms.length);
```

---

### Layer 2b — Database Integration Tests: Query Functions

**Files:**
- [`src/core/queries/getRooms.test.ts`](src/core/queries/getRooms.test.ts)
- [`src/core/queries/getExperiences.test.ts`](src/core/queries/getExperiences.test.ts)

**What it tests:** The two query functions (`getRooms`, `getExperiences`) that form the data access layer — against a **real MongoDB process** running in-memory.

**Why it matters for the business:** These functions are the single point through which all room and experience data flows to the public-facing pages. A wrong filter (e.g., returning unavailable rooms), a field mapping error, or a Mongoose Document being passed where a plain object is required are exactly the kinds of regressions that mocks would miss — and that a real query against a real schema catches immediately.

**Isolation architecture:** `mongodb-memory-server` starts a dedicated `mongod` process per test suite (random port, temporary directory). Vitest runs each test file in a separate Node.js worker, so every file has its own `mongoose` instance and its own in-memory server — zero cross-suite interference.

```
beforeAll  → connectDB()   Starts mongod, connects Mongoose to the in-memory URI
afterEach  → clearDB()     Deletes all documents after each test (no dropDatabase overhead)
afterAll   → closeDB()     Disconnects Mongoose, stops the mongod process
```

**Why not `dbConnect()`:** The production `dbConnect()` reads `DATABASE_URL` from the environment and uses a `globalThis` cache. Both behaviours are unwanted in tests: no real Atlas connection, no shared state across tests. `connectDB()` connects Mongoose directly to the in-memory URI, bypassing both.

**Environment:** `// @vitest-environment node` — pure Node.js, no DOM required.

| Test case | What is asserted |
|---|---|
| Empty DB | Returns `[]` without throwing |
| `available: true` filter | Only available rooms returned; unavailable ones excluded |
| Mix of available / unavailable | Exactly N results for N available documents |
| Data fidelity | Every saved field (`name`, `capacity`, `features`, `images`) matches what is read back |
| Optional fields absent | Mongoose schema defaults applied; no crash |
| Lean result | Returned objects are POJOs — no `.save()` method, proving `.lean()` is effective |

```ts
// Lean check: Next.js cannot serialize Mongoose Documents across the RSC boundary.
// This test would catch a regression where .lean() was accidentally removed.
const [room] = await getRooms();
expect(typeof (room as any).save).toBe("undefined");
expect(room._id).toBeDefined();
```

---

### Layer 3 — End-to-End Tests: Critical User Paths

**File:** [`tests-e2e/navigation.spec.ts`](tests-e2e/navigation.spec.ts)

**Tool:** Playwright v1.61 — real Chromium browser, full network stack, real MongoDB.

**What it tests:** The most business-critical user journey: a guest opens the site, sees the homepage, navigates to the rooms page, and finds booking options available.

**Why it matters for the business:** If any step in this path is broken — wrong title, unclickable link, empty `/camere` page — the user abandons before reaching the booking form. This test is the only one in the suite that validates the entire vertical slice: Next.js routing, Mongoose data fetching, MUI rendering, and browser navigation all working together.

**Scope:**

| Test | Path covered |
|---|---|
| Happy path | `GET /` → verify SEO title → click "Camere" in nav → verify URL → verify `.room-card` visible |
| Navbar persistence | `GET /camere` (deep link) → navbar present → logo link visible → "Prenota ora" CTA visible |

**Selector strategy:**
- Navigation links are scoped to `getByRole("navigation", { name: "Navigazione principale" })` to avoid accidentally clicking the hidden mobile drawer duplicate.
- Room cards are targeted via `className="room-card"` applied to the MUI `Card` component — a stable, semantic selector that doesn't depend on MUI's internal class name generation.
- The homepage title (`toHaveTitle`) validates the full SEO metadata exported from `layout.tsx`.

```ts
// Scoping the click to the main nav element avoids the mobile drawer duplicate.
// Playwright won't click hidden elements, but explicit scoping makes intent clear.
const mainNav = page.getByRole("navigation", { name: "Navigazione principale" });
await mainNav.getByRole("link", { name: "Camere" }).click();
await expect(page).toHaveURL(/\/camere/);
await expect(page.locator(".room-card").first()).toBeVisible();
```

**Configuration highlights (`playwright.config.ts`):**
- `webServer`: automatically starts `npm run dev` before the suite and reuses an existing server in local development (`reuseExistingServer: !process.env.CI`)
- `retries: 2` in CI to absorb transient network / cold-start flakiness
- `screenshot: "only-on-failure"` for fast local runs; `trace: "on-first-retry"` for CI debugging
- `forbidOnly: !!process.env.CI` to prevent accidentally committed `.only` calls from passing CI

---

### Running the Tests

```bash
# Unit + integration tests (Vitest)
npm test                  # single run — schema, component, and DB tests
npm run test:watch        # watch mode during development
npm run test:ui           # Vitest browser UI (interactive)

# End-to-end tests (Playwright)
# Requires: npm run dev running on localhost:3000 (or webServer auto-starts it)
npm run test:e2e          # headless Chromium
npm run test:e2e:ui       # Playwright interactive UI — step through tests visually
npm run test:e2e:debug    # Pause at each step with DevTools open
```

**First-time Playwright setup** — install the Chromium binary (one-time):
```bash
npx playwright install chromium
```

**Current test count:**

| Suite | File | Tests | Runner |
|---|---|---|---|
| Schema validation | `bookingFormSchema.test.ts` | 7 | Vitest |
| CamereContent rendering | `CamereContent.test.tsx` | 3 | Vitest |
| EsperienzeContent rendering | `EsperienzeContent.test.tsx` | 4 | Vitest |
| getRooms query | `getRooms.test.ts` | 5 | Vitest |
| getExperiences query | `getExperiences.test.ts` | 5 | Vitest |
| Navigation happy path | `navigation.spec.ts` | 2 | Playwright |
| **Total** | | **26** | |

---

## 🍃 Database & Mongoose Models

### Connection — `src/core/database/mongoose.ts`

Implements the **singleton with `globalThis` cache** pattern to prevent multiple connections during Next.js hot-reload in development. The first invocation opens the connection and stores it; subsequent calls return the already-established connection immediately without opening new sockets.

```ts
// Usage in any Server Action or Route Handler
import dbConnect from "@/core/database/mongoose";
await dbConnect();
```

The `DATABASE_URL` variable is read at module load: if absent, an explicit `Error` is raised before the server responds to any request.

Models use the `models.ModelName || model(...)` pattern to prevent re-registration during Next.js hot-reload cycles, which would cause an `OverwriteModelError`.

---

### 🛏️ Model `Room` — Hotel Rooms

| Field | Mongoose Type | Required | Default |
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

### 🎯 Model `Experience` — Local Experiences

| Field | Mongoose Type | Required | Default |
|---|---|---|---|
| `title` | `String` | ✅ | — |
| `subtitle` | `String` | ❌ | `""` |
| `description` | `String` | ✅ | — |
| `price` | `Number` | ❌ | — |
| `duration` | `String` | ❌ | `""` |
| `image` | `String` | ❌ | `""` |
| `iconKey` | `String` | ❌ | `""` |
| `tags` | `[String]` | ❌ | `[]` |
| `highlights` | `[String]` | ❌ | `[]` |

> `tags` and `highlights` have `default: []` to guarantee that `.map()` in the frontend never receives `undefined`, even on documents created before a schema migration. This resolved a production build crash on the `/esperienze` route.

---

### 🍽️ Model `Restaurant` — Menu Items

| Field | Mongoose Type | Required |
|---|---|---|
| `name` | `String` | ✅ |
| `description` | `String` | ✅ |
| `price` | `Number` | ✅ |
| `category` | `String` | ✅ |

The `category` (`'antipasti'`, `'primi'`, `'dolci'`, etc.) is a free string filtered client-side to group menu items into distinct sections.

---

### 📅 Model `Booking` — Guest Reservations

| Field | Mongoose Type | Required | Notes |
|---|---|---|---|
| `roomId` | `ObjectId` | ✅ | Ref → `"Room"` collection |
| `guestName` | `String` | ✅ | — |
| `guestEmail` | `String` | ✅ | — |
| `checkIn` | `Date` | ✅ | — |
| `checkOut` | `Date` | ✅ | — |
| `totalPrice` | `Number` | ✅ | — |
| `status` | `enum` | ❌ | `'pending'` \| `'confirmed'` \| `'cancelled'` |
| `createdAt` | `Date` | ❌ | `Date.now` |

---

## 📋 Booking Flow

The wizard is orchestrated by 4 step components + 1 central hook + 1 Server Action + 1 Zustand store.

```
useBookingStore (Zustand)
  └── step: 1 | 2 | 3 | 4
  └── preSelectedRoomType: string   ← set by BookingTriggerButton on /camere

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

### Zod Validation (`bookingFormSchema.ts`)

The schema applies two cross-field `refine` checks beyond per-field validations:

- `checkIn >= today` — arrival date cannot be in the past
- `checkOut > checkIn` — departure must be after arrival

The same schema is shared between the client-side resolver (React Hook Form) and the server-side `safeParse` (Server Action), eliminating any duplication of validation logic.

The `BoardType` type is derived from the `BOARD_TYPES` array with `as const`, guaranteeing type-safety on the Mongoose enum without manual redefinition.

---

## 🌐 Next.js Infrastructure — Global System Files

| File | Type | Activation |
|---|---|---|
| `src/app/loading.tsx` | Server Component | Automatic during every navigation with Suspense |
| `src/app/error.tsx` | **Client Component** (`"use client"`) | Automatic on any unhandled exception in any segment |
| `src/app/not-found.tsx` | Server Component | Non-existent routes or explicit `notFound()` call |

### `loading.tsx` — Loading Skeleton

Displays a centered MUI `CircularProgress` with "Caricamento in corso…" text. Being a Server Component, it adds no JavaScript to the client bundle. Next.js wraps it automatically in a `<Suspense>` around the current segment.

### `error.tsx` — Error Boundary

**Must be a Client Component**: Next.js injects the `error` (caught exception) and `reset` (retry render function) props at runtime, which is incompatible with Server Components.

- `useEffect` logs the error to the console for production debugging
- The "Riprova" button calls `reset()`, which unmounts and remounts the failed segment
- The `digest` field on `error` is the unique crash ID assigned by Next.js, useful for correlating server-side logs

### `not-found.tsx` — 404 Page

Activated both automatically for non-existent routes and explicitly by calling `notFound()` from any Server Component (e.g., when a MongoDB document is not found). To create a segment-specific 404, add `not-found.tsx` in the relevant subfolder (e.g., `src/app/camere/not-found.tsx`).

---

## 🎨 Theme & Typography

The MUI theme is centralised in `src/core/theme/theme.ts` and injected globally by `ThemeRegistry` (`src/shared/components/ui/ThemeRegistry.tsx`), which serves as a Client boundary to isolate `ThemeProvider` (non-serialisable) from the RSC tree.

### Mediterranean Palette

| MUI Token | Colour | Hex | Usage |
|---|---|---|---|
| `primary.main` | Saffron gold | `#F4C430` | CTAs, active icons, highlights |
| `primary.dark` | Deep gold | `#D4A820` | Primary hover |
| `secondary.main` | Teal green | `#00A896` | Labels, links, overlines |
| `secondary.dark` | Deep teal | `#007A6E` | Secondary hover |
| `background.default` | Ivory cream | `#FAF7F0` | Alternating section backgrounds |
| `text.primary` | Night blue | `#1A1A2E` | Primary text, navbar |
| `text.secondary` | Lavender grey | `#5C5C7A` | Descriptions, captions |
| `error.main` | Terracotta | `#C85C40` | Form errors, critical messages |

### Typography

- **Headings (h1–h6):** Playfair Display (serif) — loaded via Google Fonts runtime in `layout.tsx`
- **Body / UI:** Inter (sans-serif) — `system-ui` fallback stack
- **Button:** `textTransform: none` and `fontWeight: 600` applied globally via `components.MuiButton.styleOverrides`

---

## 🚀 Installation & Commands

### 1. Clone the repository

```bash
git clone https://github.com/<org>/hotel-pomelia.git
cd hotel-pomelia
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create the `.env.local` file in the project root:

```env
DATABASE_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/hotel-pomelia?retryWrites=true&w=majority
```

> This variable is read at module load in `src/core/database/mongoose.ts`. If absent, the server terminates immediately with an explicit `Error` before responding to any request.

### 4. Available commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server on `http://localhost:3000` with hot-reload |
| `npm run build` | Compile production build (SSR + static export) |
| `npm run start` | Start production server (requires completed `build`) |
| `npm run lint` | Run ESLint across the project with Next.js rules |
| `npm run db:seed` | Seed MongoDB Atlas with sample data (see below) |
| `npm test` | Run all Vitest tests (unit + integration) — single pass |
| `npm run test:watch` | Vitest watch mode for active development |
| `npm run test:ui` | Vitest interactive browser UI |
| `npm run test:e2e` | Run Playwright E2E tests (requires dev server or auto-starts it) |
| `npm run test:e2e:ui` | Playwright interactive UI — visual step-through |
| `npm run test:e2e:debug` | Playwright debug mode with DevTools paused at each step |

### 5. Database seeding

```bash
npm run db:seed
```

This runs internally:

```bash
npx tsx --env-file=.env.local scripts/seed.ts
```

`tsx` executes TypeScript natively without intermediate compilation. The `--env-file=.env.local` flag loads environment variables directly, without requiring `dotenv` in the script code.

**Execution sequence:**

1. Connect to MongoDB Atlas via `DATABASE_URL`
2. `Room.deleteMany({})` → insert 2 rooms (Suite Pomelia, Camera Deluxe)
3. `Experience.deleteMany({})` → insert 2 experiences (Winery Tour, Boat Excursion)
4. `Restaurant.deleteMany({})` → insert 2 menu items (Cavatelli, Cannolo)
5. Disconnect and terminate process

> ⚠️ The seed runs `deleteMany({})` on each collection before inserting. Do not run it against a production database with real guest data.

---

## 📁 Application Routes

| URL | File | Metadata | Content |
|---|---|---|---|
| `/` | `src/app/page.tsx` | ✅ + JSON-LD | Hero, value proposition, three-generation history, Benefit Corp manifesto, CTA |
| `/camere` | `src/app/camere/page.tsx` | ✅ | Room grid with features and direct booking button |
| `/esperienze` | `src/app/esperienze/page.tsx` | ✅ | Experiences with tags, highlights, and duration from MongoDB |
| `/ristorazione` | `src/app/ristorazione/page.tsx` | ✅ | Restaurant menu grouped by category |
| `/prenota` | `src/app/prenota/page.tsx` | ✅ | 4-step booking wizard with Zod + Server Action |
| `/sostenibilita` | `src/app/sostenibilita/page.tsx` | ✅ + OpenGraph | 6 sustainability pillars with progress bars and metrics |

---

## 🔄 Migration from Prisma to Mongoose

The project was migrated from the **Prisma** ORM (declarative schema + generated client) to the **Mongoose** ODM for the following technical reasons:

| Aspect | Prisma (previous) | Mongoose (current) |
|---|---|---|
| Schema | Separate `.prisma` file | TypeScript interface + inline Schema |
| Arrays with defaults | Requires explicit migration | `default: []` in the schema |
| Next.js hot-reload | Global client with workaround | Native `models.X \|\| model()` pattern |
| Seed script | `prisma db push` + generated client | `tsx --env-file` — zero configuration |
| Bundle size | Generated client (~200 KB) | Native MongoDB driver only |

The `globalThis.__mongooseCache` cache resolves the multiple-connections problem in development, equivalent to the Prisma singleton but without additional dependencies.

---

*Hotel Pomelia S.r.l. — Ragusa, Sicily · Benefit Corporation L. 208/2015 · Educational and portfolio use*
