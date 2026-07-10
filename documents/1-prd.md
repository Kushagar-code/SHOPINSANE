# Product Requirements Document (PRD)

## 1. Problem Statement
Ambitious indie builders and digital creators face massive friction when trying to launch premium, deeply animated e-commerce storefronts. They are forced to choose between boring, template-driven platforms (like Shopify) that carry high recurring monthly costs, or complicated custom setups that quickly blow past free-tier database limits due to structural inefficiencies or inactivity shutdowns. Shopinsane solves this by providing an ultra-premium, deeply immersive web experience designed to hook premium consumers, built on top of a highly optimized, production-grade infrastructure that runs forever on a strict $0.00 infrastructure budget.

## 2. Goals & Objectives
* **SMART Goal 1:** Deploy an end-to-end e-commerce engine operating continuously with a fixed recurring infrastructure cost of exactly $0.00/month across all underlying dependencies (Hosting, Database, Assets).
* **SMART Goal 2:** Build an experience optimized for premium asset buyers, ensuring it scores a performance profile of >90 on Google Lighthouse for Core Web Vitals despite relying on heavy animation payloads.
* **SMART Goal 3:** Maintain automated architectural stability by implementing an autonomous background mechanism that prevents database pausing, achieving 99.9% database availability without human intervention.

## 3. Success Metrics
* **Infrastructure Overhead:** Exactly $0.00 USD spent monthly.
* **Conversion Friction Metric:** Time-to-checkout for a cold user must stay under 120 seconds through seamless, single-page drawer interactions.
* **Code Scalability Score:** Maintain absolute code modularity with zero cross-file spaghetti logic, achieving sub-200 lines of code per component file to optimize for context-aware AI engineering and high asset valuation upon sale.

## 4. Target Personas

### Persona 1: The Premium Enthusiast (Kaelen)
* **Demographics:** 22-36 years old, high disposable income, design-focused consumer.
* **Pain Points:** Completely checked out of traditional, flat e-commerce layouts. Demands visual feedback, premium transitions, and flawless micro-interactions. Disenchanted by slow loading speeds or clunky cart screens.
* **Goals:** Wants to discover exclusive, beautifully curated drops in an environment that feels like a premium digital art exhibit.
* **Tech Proficiency:** High. Very sensitive to smooth framer-motion curves and responsive desktop/mobile layouts.

### Persona 2: The Turnkey Investor (Julian)
* **Demographics:** 30-50 years old, micro-SaaS buyer, digital asset flipper.
* **Pain Points:** Inheriting codebase nightmares built by AI with circular dependencies, hard-coded secrets, or expensive ongoing server overheads that drain profits.
* **Goals:** Acquire clean, high-performance, self-sustaining properties requiring near-zero daily technical maintenance.
* **Tech Proficiency:** Medium-High. Inspects backend relationships, Git action workflows, and hosting tiers during technical due diligence.

## 5. Features & Requirements

### P0 — Must Have (MVP)

#### Feature 1: Immersive Hero & Dynamic Catalog View
* **Description:** An animated landing experience using Aceternity UI design primitives coupled to an optimized grid displaying item catalogs with real-time reactive classification filtering.
* **User Story:** As a premium enthusiast, I want to experience high-impact, smooth spatial interactions right on the homepage so that I immediately perceive the brand as high-end and exclusive.
* **Acceptance Criteria:**
    * [ ] The home page must render a full-screen dynamic header animation utilizing Framer Motion curves.
    * [ ] Changing category filters must dynamically update the view state without a full page refresh.
    * [ ] Catalog data must stream using Next.js Server Components from the Supabase client directly.
* **Success Metric:** First Input Delay (FID) must be less than 50ms upon interaction with catalog components.

#### Feature 2: High-End Interactive Shopping Cart Drawer
* **Description:** A slide-out global cart canvas component managed via lightweight Zustand state containers, eliminating page shifts.
* **User Story:** As a shopper, I want to add products instantly without leaving my current reading context or breaking the scrolling rhythm.
* **Acceptance Criteria:**
    * [ ] Clicking "Add to Cart" triggers an explicit micro-interaction layout transition on the item card.
    * [ ] The cart must appear as a sliding overlay layer that preserves current scroll metrics underneath.
    * [ ] Quantity mutations must reflect across subtotals and database sync objects immediately.
* **Success Metric:** Zero layout shifts (CLS score of exactly 0) during cart activation.

#### Feature 3: Single-Page Secure Mock Checkout
* **Description:** An input deck verifying checkout addresses and shipping parameters, updating order history states without live card processing.
* **User Story:** As an end-user, I want a frictionless, simple checkout layout where I don't have to enter actual banking credentials to complete a test acquisition.
* **Acceptance Criteria:**
    * [ ] All address input components must contain automated field validation rules via Zod schemas.
    * [ ] Form completion instantly pushes a new finalized row to the database orders collection.
    * [ ] Submission drops active global Zustand cart states back to an empty definition.
* **Success Metric:** 100% data tracking alignment between form submissions and state entries.

#### Feature 4: Order Progression Timeline UI
* **Description:** An interactive post-purchase visualization tracing order tracking states from placement to completion.
* **User Story:** As a customer, I want to visually track my order's progression along an elegant timeline so that I have complete confidence in the delivery pipeline.
* **Acceptance Criteria:**
    * [ ] UI must visually isolate four distinct milestones: Ordered, Shipped, Out for Delivery, and Delivered.
    * [ ] Timeline node states must shift instantly based on target database status markers.
    * [ ] An easily accessible simulation mechanism must be present to advance states sequentially for testing.
* **Success Metric:** State shifts must render instantly upon a data change without causing broken structural rendering.

#### Feature 5: Multi-Factor Free-Tier Access Control
* **Description:** User authentication layers handled through Supabase Auth, preventing unauthenticated read/write loops into user data profiles.
* **User Story:** As a user, I want my personal transaction logs and address metrics locked behind secure credentials so that other buyers can't read them.
* **Acceptance Criteria:**
    * [ ] Protected dashboard routes must trigger route re-routing if accessed by anonymous user agents.
    * [ ] The sign-up layout must strictly force robust password profiles through input regex rules.
    * [ ] Valid active tokens must seamlessly persist across page reloads via client-side cookie storage.
* **Success Metric:** Complete block of unauthenticated user access to order histories.

### P1 — Should Have
* Debounced global header search parsing data streams in real time.
* Advanced address record adjustments within user dashboard accounts.

### P2 — Nice to Have
* Interactive review rating blocks utilizing specialized animation components.
* Dynamic personal collections or wishlist boards mapped directly to client storage profiles.

## 6. Explicitly OUT OF SCOPE
* **No Real Financial Payment Integrations:** Strict exclusion of production Stripe/PayPal API endpoints; all checkouts are handled through secure mock simulation layers.
* **No Multi-Tenant Vendor Portal:** The architecture is limited strictly to a high-end single-merchant presentation profile.
* **No External Logistic API Bridges:** No live webhooks hooking into real DHL, FedEx, or ups status servers; tracking updates run on deterministic system simulations.
* **No Complex Analytical Marketing Matrices:** No heavy Google Analytics or Segment scripts tracking tracking data to optimize page performance.
* **No Multi-Currency Ledger Systems:** Native pricing metrics are strictly locked into a single default currency node to prevent conversion database overhead.

## 7. User Scenarios

### Scenario 1: Standard Premium Acquisition Flow
* **Context:** A user arrives on Shopinsane seeking to acquire a featured high-end asset.
* **Steps:** The user scrolls through the homepage, interacts with an Aceternity-style animated product block, opens the detail layout, activates the add-to-cart mechanism, launches the cart drawer, advances directly into checkout, fulfills mock parameters, and submits the transaction.
* **Expected Outcome:** The screen renders an interactive confirmation page before routing directly to the order history view showing the timeline locked on the "Ordered" milestone.
* **Edge Case:** If the user attempts to move into checkout while the Zustand store registers empty item vectors, the activation component must remain strictly disabled.

### Scenario 2: Unauthenticated Checkout Capture
* **Context:** A guest user attempts to process an asset purchase without active profile validation.
* **Steps:** The guest populates a cart drawer configuration and triggers the checkout step without an active access token.
* **Expected Outcome:** The system catches the missing user profile, locks down the route, and smoothly routes the browser context into the login layout with clear instruction panels.
* **Edge Case:** Upon finishing registration, the client context must seamlessly bounce back to the checkout deck with the exact prior cart configuration intact.

### Scenario 3: Real-Time Timeline Progression Update
* **Context:** Testing the visual timeline responsive shifts when database entries change.
* **Steps:** An administrator changes an order record from "Ordered" to "Shipped" inside the backend table console, while the customer views their active order page.
* **Expected Outcome:** Upon refreshing the interface or listening via data event hooks, the timeline rendering instantly advances its active highlighted visual pointer to the "Shipped" layout step.
* **Edge Case:** If a record mutation falls outside of the four expected state definitions, the view layer must degrade into an "Ordered" fallback configuration safely.

## 8. Non-Functional Requirements
* **Performance Optimization:** Absolute utilization of Next.js App Router architectures combined with optimized asset formatting to preserve speed profiles over low-bandwidth mobile devices.
* **Security Profiles:** Strict execution of database Row Level Security (RLS) rules verifying that authenticated vectors cannot read or modify adjacent buyer records under any manipulation pattern.
* **Accessibility Integrity:** Full implementation of semantic HTML containers, keyboard navigation compliance across all interactive sliders, and explicit focus states for accessible readers.