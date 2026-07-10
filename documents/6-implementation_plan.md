# IMPLEMENTATION_PLAN.md

**CRITICAL RULE:** This document acts as the project state machine. The AI must physically check off boxes `[x]` in this file as steps are completed in future sessions.

## 1. Overview
- **Project Name:** Shopinsane
- **MVP Target Date:** August 1, 2026 (4 weeks)
- **Build Philosophy:** 
  - **Zero-cost $0/mo infrastructure:** Utilizing Supabase (Free Tier), Cloudflare Pages, and GitHub Actions.
  - **Premium UI digital asset:** Creating a high-end, immersive experience leveraging Framer Motion, Aceternity UI, and Tailwind CSS.
  - **Strict modularity for AI context limits:** Ensuring every component and utility is small, decoupled, and isolated to optimize coding via LLM prompts and context boundaries.

---

## 2. Phase 1: Project Setup

### Step 1.1: Initialize Project
- **Duration Estimate:** 1 day
- **Goal Statement:** Scaffold the Next.js target architecture with necessary UI/state dependencies.
- **Tasks:**
  1. Initialize Next.js: `npx create-next-app@latest shopinsane --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`
  2. Enter directory: `cd shopinsane`
  3. Install core dependencies: `npm install framer-motion clsx tailwind-merge zustand @supabase/supabase-js @supabase/ssr lucide-react`
  4. Create scaffolding directories: `mkdir -p src/components/ui src/components/layout src/lib/utils src/store`
- **Success Criteria:**
  - [x] App spins up successfully via `npm run dev`.
  - [x] Folder structure matches strict modularity targets.
- **Reference:** TECH_STACK.md, FRONTEND_GUIDELINES.md

### Step 1.2: Environment Setup
- **Duration Estimate:** 0.5 days
- **Goal Statement:** Configure strict environment and secret variables for Edge & Supabase.
- **Tasks:**
  1. Create `.env.local` configuration for development.
  2. Define necessary keys: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, etc.
  3. Create `.env.example` file to document required keys for future deployment.
- **Success Criteria:**
  - [x] Local environment loads properly in Next.js.
  - [x] Developer secrets are correctly ignored via `.gitignore`.
- **Reference:** TECH_STACK.md

### Step 1.3: DB Setup
- **Duration Estimate:** 1 day
- **Goal Statement:** Provision the full relational schema and RLS policies on Supabase.
- **Tasks:**
  1. **EXPLICIT INSTRUCTION:** Use connected Supabase MCP to execute full schema from BACKEND_STRUCTURE.md.
  2. Implement users, products, orders, and order_items tables.
  3. Enforce Row Level Security (RLS) to partition read/write capabilities properly.
- **Success Criteria:**
  - [x] MCP confirms tables and schema are live.
  - [x] Unauthenticated clients cannot write data; unauthenticated clients can only read products.
- **Reference:** BACKEND_STRUCTURE.md

---

## 3. Phase 2: Design System

### Step 2.1: Tailwind Configuration
- **Duration Estimate:** 0.5 days
- **Goal Statement:** Configure styling engine, animations, and Aceternity UI base utilities.
- **Tasks:**
  1. Edit `tailwind.config.ts` to include custom properties, animations, and color palettes.
  2. Implement utility class merger in `src/lib/utils.ts` (e.g., `cn` function).
- **Success Criteria:**
  - [x] Tailwind watcher compiles successfully.
  - [x] Custom animations/colors are accessible system-wide.
- **Reference:** DESIGN_SYSTEM.md

### Step 2.2: Core Components 
- **Duration Estimate:** 1.5 days
- **Goal Statement:** Build foundational UI elements to block out the application layout.
- **Tasks:**
  1. Build atomic UI components (Buttons, Inputs, Cards).
  2. Build layout wrappers (Navbar, Footer).
  3. Create simple manual test page (`/dev-ui`) to test responsiveness and states.
- **Success Criteria:**
  - [x] Base components are robust and handle responsive resizing.
  - [x] Typography and spacing align with premium UI standards.
- **Reference:** DESIGN_SYSTEM.md

---

## 4. Phase 3: Authentication

### Step 3.1: Backend Auth Setup
- **Duration Estimate:** 1 day
- **Goal Statement:** Construct Supabase SSR logic compatible with Edge Runtime.
- **Tasks:**
  1. Create client setup `src/lib/supabase/client.ts` and server setups `src/lib/supabase/server.ts`.
  2. Construct Next.js middleware (`src/middleware.ts`) to manage sessions across edge routes.
- **Success Criteria:**
  - [x] Token refresh logic functions automatically.
  - [x] Unauthenticated requests to protected endpoints bounce back successfully.
- **Reference:** BACKEND_STRUCTURE.md

### Step 3.2: Frontend Auth Pages
- **Duration Estimate:** 1.5 days
- **Goal Statement:** Complete user registration and login UIs connected to state.
- **Tasks:**
  1. Create `/login` page with highly visual, animated entry forms.
  2. Create `/register` interface.
  3. Integrate Supabase `signInWithPassword` and `signUp` RPCs.
- **Success Criteria:**
  - [x] User can cleanly sign in and register a new account.
  - [x] Layout header reflects properly fetched `User` object.
- **Reference:** PRD.md (Multi-Factor Free-Tier Access Control)

---

## 5. Phase 4: Core Features

### Step 4.1: Immersive Hero & Dynamic Catalog
- **Duration Estimate:** 2.5 days
- **Goal Statement:** Implement immersive landing page and robust product fetching.
- **Tasks:**
  1. **Backend:** Write fetch functions in `src/lib/api/products.ts`.
  2. **Frontend:** Build Framer Motion 3D/Parallax Hero component on `/page.tsx`.
  3. **Frontend:** Build Product Grid mapping out `ProductCard` items.
  4. **Integration:** Connect DB fetch to UI via React Suspense and RSCs.
  5. **Test:** Validate layout integrity under different viewport constraints.
- **Success Criteria:**
  - [x] Hero remains performant visually (constant 60fps).
  - [x] Catalog renders real items from DB schema seamlessly.
- **Reference:** PRD.md (Immersive Hero & Dynamic Catalog)

### Step 4.2: High-End Interactive Shopping Cart Drawer
- **Duration Estimate:** 2 days
- **Goal Statement:** Implement global state cart management operating as an overlay drawer.
- **Tasks:**
  1. **Backend/State:** Configure `src/store/cartStore.ts` using Zustand to track selected products and total prices.
  2. **Frontend:** Create `CartDrawer.tsx` utilizing Framer Motion slide-in animations.
  3. **Integration:** Inject "Add to Cart" functionality into `ProductCard` to push to Zustand array.
  4. **Test:** Evaluate state persistence (or resets) upon navigation interactions.
- **Success Criteria:**
  - [x] Cart tallies price precisely.
  - [x] Slide-out drawer performs frictionlessly.
- **Reference:** PRD.md (High-End Interactive Shopping Cart Drawer)

### Step 4.3: Single-Page Secure Mock Checkout
- **Duration Estimate:** 2.5 days
- **Goal Statement:** Simulate a premium, frictionless one-step payment flow.
- **Tasks:**
  1. **Backend:** Set down endpoint/server action `src/app/api/checkout/route.ts` to log order details to DB.
  2. **Frontend:** Build structured form on `/checkout` capturing shipping and mock card info.
  3. **Integration:** Submit client Zustand cart state to server action and convert into Supabase `orders` / `order_items`.
  4. **Test:** Guarantee strict payload delivery and failure handling.
- **Success Criteria:**
  - [x] App writes successfully to both `orders` and `order_items`.
  - [x] Condition variables effectively block faulty payloads.
- **Reference:** PRD.md (Single-Page Secure Mock Checkout)

### Step 4.4: Order Progression Timeline UI
- **Duration Estimate:** 1.5 days
- **Goal Statement:** Build visual indicators tracking user order status.
- **Tasks:**
  1. **Backend:** Set DB queries to extract status parameters of a singular user order.
  2. **Frontend:** Configure `OrderTimeline` component depicting distinct milestones (e.g., Processed, Shipped, Delivered).
  3. **Integration:** Render timeline onto the successful checkout confirmation page.
  4. **Test:** Modify manual order status inside Supabase dashboard to verify UI syncs visually.
- **Success Criteria:**
  - [x] Component updates timeline progression accurately matching backend schema state.
- **Reference:** PRD.md (Order Progression Timeline UI)

### Step 4.5: Multi-Factor Free-Tier Access Control
- **Duration Estimate:** 1.5 days
- **Goal Statement:** Apply defensive programming constraints to prevent Free-Tier abuse.
- **Tasks:**
  1. **Backend:** Apply strict API limit checks and gating prior to Supabase insert logic.
  2. **Frontend:** Graceful alert UI conveying to user if throttle hits.
  3. **Integration:** Embed guardrails into auth callbacks and `/checkout` POSTs.
  4. **Test:** Force a ratelimit interaction and observe UI modal behavior.
- **Success Criteria:**
  - [x] System gracefully declines over-provisioning actions securely.
- **Reference:** PRD.md (Multi-Factor Free-Tier Access Control), BACKEND_STRUCTURE.md

---

## 6. Phase 5: Testing

### Step 5.1: Unit & Integration Testing
- **Duration Estimate:** 1.5 days
- **Goal Statement:** Assure utility and state predictability.
- **Tasks:**
  1. `npm install -D vitest @testing-library/react`
  2. Produce tests for Zustand Cart calculations (`cartStore.test.ts`).
  3. Produce tests mapping UI configurations.
- **Success Criteria:**
  - [x] Core cart/auth logic maps properly to a 100% test pass track.
- **Reference:** TECH_STACK.md

### Step 5.2: E2E Core Flows
- **Duration Estimate:** 1.5 days
- **Goal Statement:** Rehearse the master flow autonomously.
- **Tasks:**
  1. `npx playwright install`
  2. Script a full mock walk: Homepage -> Add Item -> Open Drawer -> Checkout Submit -> Timeline View.
  3. Embed CLI script shortcut block inside `package.json`.
- **Success Criteria:**
  - [x] Unattended Playwright CI testing runs end to end seamlessly.
- **Reference:** PRD.md

---

## 7. Phase 6: Deployment & Maintenance

### Step 6.1: Edge Deployment
- **Duration Estimate:** 1 day
- **Goal Statement:** Push app cleanly to Cloudflare Pages.
- **Tasks:**
  1. Prepare Next.js edge configs and push repository target to Cloudflare dashboard.
  2. Transfer variables from `.env.local` uniformly to deployment environment inputs.
  3. Initialize build and resolve subsequent routing edge-case checks.
- **Success Criteria:**
  - [x] Application propagates to edge network via Cloudflare interface reliably.
- **Reference:** TECH_STACK.md

### Step 6.2: GitHub Actions Keep-alive
- **Duration Estimate:** 0.5 days
- **Goal Statement:** Prevent DB/App pausing due to free-tier inactivity penalties.
- **Tasks:**
  1. Code out `.github/workflows/keepalive.yml`.
  2. Establish cron trigger hitting site landing every 48 hours fetching 200 HTTP code.
  3. Push payload and manually trigger workflow test.
- **Success Criteria:**
  - [x] Logs convey Ping confirmation verifying activity.
- **Reference:** TECH_STACK.md, PRD.md

---

## Milestones Table

| Milestone | Target Sequence | Area of Focus |
| :--- | :--- | :--- | 
| **M1: Foundation** | Week 1 | Base config, UI Core, Supabase schema injection, Auth |
| **M2: Shopping Exp.**| Week 2 | Immersive pages, Dynamic catalog, Zustand Cart UI |
| **M3: Checkout** | Week 3 | API routing limits, Mock single-page checkout loop, Order timeline |
| **M4: Ship** | Week 4 | End-to-end testing, CI verification, Cloudflare edge deployment |

---

## Risk Mitigation Table

| Risk Factor | Impact Severity | Mitigation Strategy |
| :--- | :--- | :--- |
| **Supabase DB Synchronization** | High | Using strict schema configurations pre-planned in BACKEND_STRUCTURE.md mapped via MCP tool commands. |
| **UI Animation Latency Drops** | Medium | Isolate Framer components precisely, utilizing server-side rendering for static scaffolding underneath. |
| **Edge-Runtime Incompatibilities**| Medium | Avoid Node.js-locked APIs; strictly adhere to Edge-friendly fetches and Supabase SSR guide recommendations. |
| **Hit LLM Context Thresholds** | High | Architect granular component separation natively limiting file-read complexity payloads requested going forward. |

---

## Overall MVP Success Criteria
- [x] Application deployed and globally accessible on Cloudflare Pages.
- [x] Database mapped logically utilizing Supabase with functioning RLS gates.
- [x] Premium immersive landing loads dynamically fetched records.
- [x] Single-page checkout tracks and processes data flawlessly to the order-timeline interface.
- [x] E2E and Unit testing suite guarantees functional core flows.
- [x] GitHub script safely mitigates free-tier deployment expiration metrics.