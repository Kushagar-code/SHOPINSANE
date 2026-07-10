# IMPLEMENTATION_PART_2.md - Page-by-Page Interface State Machine

This document details the page-by-page interface state machine and layout specifications for the Phase 2 build of the **Shopinsane** storefront, aligned with the white-canvas design system tokens and visual guidelines.

---

## 1. Global System Mock Data Seeding

The following static mock datasets are established for local auth scope mapping, catalog indexing, and order state transition management.

### 1.1 Local Admin Accounts
These credentials are checked on client-side authentication bridges for private `/admin` routes.
- **Admin 1:**
  - Email: `joepsycho@shopinsane.com`
  - Password: `AdminSecure2026!`
  - Role: `admin`
- **Admin 2:**
  - Email: `rajan@shopinsane.com`
  - Password: `AdminSecure2026!`
  - Role: `admin`

### 1.2 Internal Product Catalog (22 Items)
A collection of exactly 22 items distributed across 4 distinct categories. Image fields link to high-quality, un-cropped, design-aligned assets:

```typescript
export interface Product {
  id: string;
  category_id: string;
  name: string;
  price: number;
  original_price?: number;
  image_url: string;
  thumbnails: string[];
  tags: string[];
  rating: number;
  review_count: number;
  description: string;
  stock: number;         // Remaining stock quantity
  units_sold: number;    // Sales tracking metric
}
```

#### Seed Array:
```typescript
export const SEEDED_PRODUCTS: Product[] = [
  // ================= CAT-1: SMARTPHONES =================
  {
    id: "prod-s1",
    category_id: "cat-1",
    name: "Titanium Pro Max 15",
    price: 1199.99,
    original_price: 1299.99,
    image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["flagship", "5g", "premium"],
    rating: 4.8,
    review_count: 142,
    description: "Experience ultimate computing power in your palm. Grade-5 titanium chassis paired with dynamic high-refresh displays.",
    stock: 25,
    units_sold: 48
  },
  {
    id: "prod-s2",
    category_id: "cat-1",
    name: "Galaxy Ultra 24",
    price: 1299.99,
    image_url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["flagship", "stylus", "android"],
    rating: 4.9,
    review_count: 98,
    description: "Next-generation generative AI processing combined with an integrated S-Pen and raw 200MP camera matrices.",
    stock: 18,
    units_sold: 62
  },
  {
    id: "prod-s3",
    category_id: "cat-1",
    name: "Pixel 8a",
    price: 499.99,
    original_price: 549.99,
    image_url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["midrange", "camera", "android"],
    rating: 4.5,
    review_count: 210,
    description: "Pure Android software environment featuring class-leading low-light camera processing and machine learning tools.",
    stock: 50,
    units_sold: 110
  },
  {
    id: "prod-s4",
    category_id: "cat-1",
    name: "Nothing Phone 2",
    price: 599.99,
    image_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["design", "unique", "android"],
    rating: 4.6,
    review_count: 85,
    description: "Symmetrical design architecture showing an elegant, interactive transparent rear glyph interface.",
    stock: 32,
    units_sold: 37
  },
  {
    id: "prod-s5",
    category_id: "cat-1",
    name: "Foldable Pro X",
    price: 1799.99,
    image_url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["foldable", "premium"],
    rating: 4.4,
    review_count: 36,
    description: "Multi-tasking powerhouse featuring an ultra-thin folding glass panel that transforms from handset to tablet format.",
    stock: 10,
    units_sold: 14
  },
  {
    id: "prod-s6",
    category_id: "cat-1",
    name: "OnePlus 12 Pro",
    price: 899.99,
    image_url: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["flagship", "fast-charge", "android"],
    rating: 4.7,
    review_count: 53,
    description: "Smooth display panels matching 100W wired quick charging elements for robust mobile power cycles.",
    stock: 40,
    units_sold: 29
  },

  // ================= CAT-2: AUDIO =================
  {
    id: "prod-a1",
    category_id: "cat-2",
    name: "Noise Cancelling Pods Pro",
    price: 249.99,
    original_price: 299.99,
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["wireless", "anc", "in-ear"],
    rating: 4.7,
    review_count: 312,
    description: "Double the active noise cancellation capability paired with adaptive audio algorithms and sweat resistance configurations.",
    stock: 75,
    units_sold: 142
  },
  {
    id: "prod-a2",
    category_id: "cat-2",
    name: "Studio Over-Ear Max",
    price: 549.99,
    image_url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["wireless", "anc", "over-ear"],
    rating: 4.8,
    review_count: 175,
    description: "High-fidelity custom audio drivers embedded in pristine, lightweight aramid housings with dynamic head tracking.",
    stock: 30,
    units_sold: 84
  },
  {
    id: "prod-a3",
    category_id: "cat-2",
    name: "Sport Buds Fit",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["workout", "wireless"],
    rating: 4.3,
    review_count: 94,
    description: "Flexible, secure-fit ear hooks optimized for running and intense training regimes. Rain and sweatproof IPX7 rating.",
    stock: 60,
    units_sold: 45
  },
  {
    id: "prod-a4",
    category_id: "cat-2",
    name: "Acoustic Wireless XM5",
    price: 299.99,
    image_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["anc", "in-ear"],
    rating: 4.7,
    review_count: 220,
    description: "Unprecedented clarity with dual processor elements driving active noise reduction profiles in dense environments.",
    stock: 45,
    units_sold: 99
  },
  {
    id: "prod-a5",
    category_id: "cat-2",
    name: "Bass Heavy Earbuds",
    price: 129.99,
    image_url: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["bass", "budget"],
    rating: 4.2,
    review_count: 140,
    description: "Enhanced low-frequency feedback and solid punch performance designed for bass-heavy audio genres.",
    stock: 80,
    units_sold: 115
  },

  // ================= CAT-3: POWER & CABLES =================
  {
    id: "prod-p1",
    category_id: "cat-3",
    name: "Nano 65W Charger",
    price: 49.99,
    original_price: 59.99,
    image_url: "https://images.unsplash.com/photo-1622445262465-2481c4574875?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1622445262465-2481c4574875?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["gan", "fast-charge"],
    rating: 4.8,
    review_count: 512,
    description: "Gallium Nitride (GaN) semiconductor architecture supplying ultra-fast charging matrices in a micro pocket format.",
    stock: 120,
    units_sold: 340
  },
  {
    id: "prod-p2",
    category_id: "cat-3",
    name: "Magnetic Wireless Pack",
    price: 79.99,
    image_url: "https://images.unsplash.com/photo-1622445261812-70b135c3a44d?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1622445261812-70b135c3a44d?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["magsafe", "wireless"],
    rating: 4.6,
    review_count: 184,
    description: "Snaps magnetically into alignment with modern smartphone frames for a wireless 15W battery pack boost.",
    stock: 55,
    units_sold: 92
  },
  {
    id: "prod-p3",
    category_id: "cat-3",
    name: "Braided USB-C Cable (2m)",
    price: 19.99,
    image_url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["cable", "durable"],
    rating: 4.9,
    review_count: 672,
    description: "Heavy-duty double-braided ballistic nylon exterior sheath protecting high-speed 100W PD transmission lines.",
    stock: 200,
    units_sold: 580
  },
  {
    id: "prod-p4",
    category_id: "cat-3",
    name: "Desktop Charging Station",
    price: 119.99,
    image_url: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["desk", "wireless"],
    rating: 4.7,
    review_count: 86,
    description: "Multi-outlet power hub containing dedicated magnetic stands, secondary USB-C ports, and clean organization frames.",
    stock: 15,
    units_sold: 23
  },
  {
    id: "prod-p5",
    category_id: "cat-3",
    name: "Car Mount Wireless Charger",
    price: 39.99,
    image_url: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["car", "wireless"],
    rating: 4.4,
    review_count: 115,
    description: "Vent-secured smartphone cradle featuring auto-clamping motor locks and continuous 15W Qi power delivery.",
    stock: 85,
    units_sold: 64
  },

  // ================= CAT-4: ACCESSORIES =================
  {
    id: "prod-c1",
    category_id: "cat-4",
    name: "Aramid Fiber Case",
    price: 59.99,
    original_price: 69.99,
    image_url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["case", "slim"],
    rating: 4.8,
    review_count: 242,
    description: "Ultra-thin, bulletproof aerospace material construction offering military-grade surface drop armor shielding.",
    stock: 90,
    units_sold: 180
  },
  {
    id: "prod-c2",
    category_id: "cat-4",
    name: "Tempered Glass Screen (2-Pack)",
    price: 14.99,
    image_url: "https://images.unsplash.com/photo-1605152276897-4f618f831968?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1605152276897-4f618f831968?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["protection", "glass"],
    rating: 4.7,
    review_count: 830,
    description: "9H hardness index glass shields keeping original display clarity while preventing localized face impacts.",
    stock: 150,
    units_sold: 450
  },
  {
    id: "prod-c3",
    category_id: "cat-4",
    name: "Magnetic Phone Grip",
    price: 24.99,
    image_url: "https://images.unsplash.com/photo-1503328427499-d92d1ac3ceb7?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1503328427499-d92d1ac3ceb7?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["grip", "magsafe"],
    rating: 4.5,
    review_count: 198,
    description: "Low-profile collapsible ring adapter providing absolute orientation handles and quick tabletop stand positions.",
    stock: 110,
    units_sold: 76
  },
  {
    id: "prod-c4",
    category_id: "cat-4",
    name: "Mobile Gimbal Stabilizer",
    price: 149.99,
    image_url: "https://images.unsplash.com/photo-1584438784894-089d6a128f3e?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1584438784894-089d6a128f3e?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["video", "creator"],
    rating: 4.6,
    review_count: 57,
    description: "3-axis active stabilization motor deck equipped with facial AI tracking profiles for cinematic mobile tracking.",
    stock: 22,
    units_sold: 34
  },
  {
    id: "prod-c5",
    category_id: "cat-4",
    name: "Bluetooth Tracker Tag",
    price: 29.99,
    image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["tracker", "bluetooth"],
    rating: 4.3,
    review_count: 320,
    description: "Locate hardware attachments in seconds via localized Bluetooth networks and ultra-wideband audio cues.",
    stock: 130,
    units_sold: 215
  },
  {
    id: "prod-c6",
    category_id: "cat-4",
    name: "Leather Wallet Stand",
    price: 49.99,
    image_url: "https://images.unsplash.com/photo-1622445261812-70b135c3a44d?w=600&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1622445261812-70b135c3a44d?w=600&auto=format&fit=crop&q=60"
    ],
    tags: ["leather", "magsafe", "accessory"],
    rating: 4.5,
    review_count: 78,
    description: "Premium leather card holder with integrated kickstand that aligns magnetically to phone surfaces.",
    stock: 45,
    units_sold: 112
  }
];
```

---

## 2. Phased Build Breakdown

The project implementation timeline is structured into four sequential, checkable phases.

### Phase 1: Global Setup & Core Layout Foundations

#### Step 1.1: Root Design Variables
- **Duration Estimate:** 1.5 Hours
- **Goal Statement:** Define the CSS custom properties mapping the DESIGN.md tokens to enable full application design coherence.
- **Task Checklist:**
  - [x] Add the HSL/HEX root tokens to `src/app/globals.css` (or `index.css` equivalent context) matching the color schema.
  - [x] Declare Canvas Mist (`#f2f4f5`), Pure White (`#ffffff`), Ink Black (`#000000`), Faint Border (`#ebebeb`), Muted Gray (`#787574`), and Shop Violet (`#5433eb`).
  - [x] Map type scales for caption (11px), body-sm (12px), body (14px), body-lg (16px) with tight negative tracking configurations.
  - [x] Configure Tailwind custom transitions and shadow keys (`--shadow-sm`, `--shadow-sm-2`, `--shadow-lg`, `--shadow-lg-2`).
- **Success Criteria:**
  - Checking browser DevTools inspect panels verifies that token classes accurately load on the `<html>`/`:root` tag.
  - Page components successfully apply variables without hardcoded style entries.
- **Cross-References:**
  - `DESIGN.md` -> Section: "Tokens — Colors", "Tokens — Typography", "Tokens — Spacing & Shapes"
  - `TECH_STACK.md` -> Section: "2. Frontend Technologies -> Styling: Tailwind CSS"

#### Step 1.2: Persistent Left Navigation Rail
- **Duration Estimate:** 2 Hours
- **Goal Statement:** Implement the 64px persistent sidebar rail on the left screen edge to structure global layouts.
- **Task Checklist:**
  - [x] Create a `SidebarRail` component utilizing a fixed vertical positioning layout (`fixed left-0 top-0 h-screen w-16`).
  - [x] Configure icon zones: 24px outlined Lucide icons centered within 48px square tap spots.
  - [x] Apply state changes: active states fill the background container with Canvas Mist (`#f2f4f5`) using a `20px` radius border transition.
  - [x] Integrate standard paths: `/` (Home), `/checkout` (Cart/Checkout redirect), and `/admin` (Dashboard control).
  - [x] Render a 32px circular profile avatar with a 1px faint border ring at the bottom of the rail.
- **Success Criteria:**
  - Sidebar remains locked to the left edge of the viewport during layout scrolling.
  - Hovering and active states execute smooth animations on target states.
  - The main page layouts receive a `pl-16` padding definition to prevent overlap.
- **Cross-References:**
  - `DESIGN.md` -> Section: "Components -> Sidebar Nav Rail", "Layout"
  - `APP_FLOW.md` -> Section: "3. Navigation Map"

#### Step 1.3: Ink Black App Download Banner
- **Duration Estimate:** 1 Hour
- **Goal Statement:** Render the 48px top download banner utilizing Shopify Sans styling definitions.
- **Task Checklist:**
  - [x] Create `AppDownloadBanner` fixed/sticky at the top edge of the main page content wrapper.
  - [x] Configure backgrounds to Ink Black (`#000000`), height to 48px, containing a 24px rounded application thumbnail placeholder.
  - [x] Render the centered text: "Download Shop app" link styled with Shopify Sans fonts, paired with "Available on iOS & Android" subtext at 10px.
  - [x] Incorporate the white right chevron indicator.
  - [x] Wire the close icon button to save a dismissal state to session/local storage to hide the banner persistently.
- **Success Criteria:**
  - Banner aligns flush against page borders with exact typography styling.
  - Clicking close triggers animation dismissals and updates the state.
- **Cross-References:**
  - `DESIGN.md` -> Section: "Components -> App Download Banner"
  - `PRD.md` -> Section: "5. Features & Requirements -> Target Personas (Julian / Julian's due diligence)"

---

### Phase 2: The Discovery Engine Homepage

#### Step 2.1: Fluid Canvas Header Animation
- **Duration Estimate:** 2.5 Hours
- **Goal Statement:** Build an animated landing area featuring spring-driven animations reacting to scroll milestones.
- **Task Checklist:**
  - [x] Configure a `HeroHeader` container using Framer Motion's `useScroll` and `useTransform` hooks.
  - [x] Map scroll ranges to apply parallax translations and opacity fades to background elements.
  - [x] Display the "Curated Assets For Premium Creators" display heading in large GT Standard Semibold styling.
  - [x] Include micro-interactions: element card lists floating and slightly overlapping the logo.
- **Success Criteria:**
  - Scroll velocity seamlessly modifies the header translation values.
  - Performance scores remain clear of rendering jank (less than 50ms First Input Delay).
- **Cross-References:**
  - `DESIGN.md` -> Section: "Do's and Don'ts -> Do (vertical breathing room)", "Imagery"
  - `PRD.md` -> Section: "5. Features & Requirements -> Feature 1: Immersive Hero & Dynamic Catalog View"

#### Step 2.2: Pill-Shaped Search Input
- **Duration Estimate:** 2 Hours
- **Goal Statement:** Create the brand search bar with its right-aligned violet action trigger and custom shadows.
- **Task Checklist:**
  - [x] Build a search input container with `9999px` radius, Pure White fill, and hairline borders (0.1 opacity border).
  - [x] Implement text values mapping to a client-side filter state.
  - [x] Render a 48px circular submit button in Shop Violet (`#5433eb`) on the right margin.
  - [x] Apply the specialized shadow token `0 4px 24px rgba(69,36,219,0.34)` to highlight the submit button.
- **Success Criteria:**
  - Search input conforms to custom pill roundings without layout distortions.
  - Typing triggers debounced filter state updates mapping catalog items.
- **Cross-References:**
  - `DESIGN.md` -> Section: "Components -> Search Input with Violet Submit", "Tokens — Colors"
  - `APP_FLOW.md` -> Section: "2.3 Cart Management (Zustand Drawer) Flow"

#### Step 2.3: Category Pill Row
- **Duration Estimate:** 1.5 Hours
- **Goal Statement:** Build a scrollable pill row enabling users to toggle active catalog classes.
- **Task Checklist:**
  - [x] Render a horizontal flex container displaying the four product category tags.
  - [x] Style each tag as a pill (`9999px` border-radius) with Pure White backgrounds, a hairline border, and a subtle shadow lift (`rgba(0,0,0,0.06) 0 2px 8px`).
  - [x] Affix circular 16px brand icons containing colors mapped to corresponding classifications.
  - [x] Set active toggles: selecting a category highlights its boundaries using a Shop Violet hairline tint or active background wash.
- **Success Criteria:**
  - Users can slide horizontally on mobile viewports without breaking layouts.
  - Selecting categories filters the lower grid catalog elements immediately.
- **Cross-References:**
  - `DESIGN.md` -> Section: "Components -> Category Pill", "Surfaces"
  - `PRD.md` -> Section: "5. Features & Requirements -> Feature 1: Immersive Hero & Dynamic Catalog View"

#### Step 2.4: Hero Floating Product Card Grid
- **Duration Estimate:** 3 Hours
- **Goal Statement:** Formulate the card list displaying the 22 seeded catalog products with bleed layouts and dual-layer shadows.
- **Task Checklist:**
  - [x] Create a `ProductGrid` wrapping `ProductCard` components.
  - [x] Design the card with `28px` border radius, Pure White surface, and no visible outer card padding.
  - [x] Bleed the product image to the top edges using a custom `20px` inner radius configuration.
  - [x] Apply dual-layer shadow tokens: `0 4px 6px -1px rgba(0,0,0,0.1)` combined with `0 2px 4px -2px rgba(0,0,0,0.1)`.
  - [x] Render details: Product name in GT Standard Semibold, price, rating stars, and review counts in micro captions.
- **Success Criteria:**
  - Cards render as elevated blocks floating over the Canvas Mist background.
  - Hover triggers light 3D scaling micro-animations on desktop viewports.
- **Cross-References:**
  - `DESIGN.md` -> Section: "Components -> Hero Floating Product Card", "Tokens — Spacing & Shapes"
  - `APP_FLOW.md` -> Section: "4.1 Home / Product Catalog (`/`)"

---

### Phase 3: Immersive Detail Contexts & Global Cart

#### Step 3.1: Product Detail Layout & Reviews
- **Duration Estimate:** 2.5 Hours
- **Goal Statement:** Create the dynamic details screen utilizing full-bleed hero visuals, thumbnail strips, and interactive reviews.
- **Task Checklist:**
  - [x] Design a `/products/[id]` (or slug fallback) page.
  - [x] Display full-bleed product hero images inside a `28px` rounded panel.
  - [x] Assemble a bottom `MiniThumbnailStrip` displaying additional images as 48px square nodes with `12px` radii separated by 2px gaps.
  - [x] Render metadata columns: Large title text using GT Standard tracking constraints, tag indicators, price values, and detailed descriptions.
  - [x] Build a Customer Reviews segment showing a list of simulated reviews (User email, rating stars, and feedback commentary).
- **Success Criteria:**
  - Clicking mini thumbnails swaps active main hero assets cleanly.
  - Customers can view reviews and submit a new mock rating star score and comment.
- **Cross-References:**
  - `DESIGN.md` -> Section: "Components -> Mini Product Thumbnail Strip", "Typography Hierarchy Rules"
  - `APP_FLOW.md` -> Section: "4.2 Product Details (`/products/[slug]`)"

#### Step 3.2: Related Items Gallery
- **Duration Estimate:** 2 Hours
- **Goal Statement:** Establish related item galleries that automatically filter catalog items using category and tag matches.
- **Task Checklist:**
  - [x] Include a horizontal product carousel below product description details.
  - [x] Write client-side array filters isolating catalog entries belonging to same category IDs.
  - [x] Filter out current active items to prevent self-referential listings.
  - [x] Render carousel navigation arrows styled with circular white buttons and shadows.
- **Success Criteria:**
  - Gallery populates with exactly 2 to 4 contextual products.
  - Navigating to different product categories refreshes recommendations instantly.
- **Cross-References:**
  - `DESIGN.md` -> Section: "Components -> Category Carousel Arrow"
  - `APP_FLOW.md` -> Section: "2.2 Browsing Catalog Flow"

#### Step 3.3: Zustand-driven Shopping Cart Drawer
- **Duration Estimate:** 3 Hours
- **Goal Statement:** Develop the global cart overlay managing slide animations and calculations.
- **Task Checklist:**
  - [x] Set up a Zustand store (`src/store/useCartStore.ts`) tracking items, quantities, and drawer states.
  - [x] Implement `CartDrawer` using Framer Motion slide transitions (`initial={{ x: '100%' }}`).
  - [x] Map absolute page properties: drawer overlay must block body scrolling underneath while active.
  - [x] Add line items with thumbnail images, quantity selectors (+/-), subtotals, and a clear button.
  - [x] Insert a Shop Violet "Proceed to Checkout" action button linking directly to `/checkout`.
- **Success Criteria:**
  - Adding items updates badge counters and opens the slide-in drawer.
  - Empty cart displays the desaturated empty state layout.
- **Cross-References:**
  - `DESIGN.md` -> Section: "Do's and Don'ts -> Do (Violet accent constraints)", "Tokens — Spacing & Shapes"
  - `PRD.md` -> Section: "5. Features & Requirements -> Feature 2: High-End Interactive Shopping Cart Drawer"

---

### Phase 4: Mock Transaction Path & Protected Control Board

#### Step 4.1: Mock Checkout Form
- **Duration Estimate:** 2.5 Hours
- **Goal Statement:** Design the single-page checkout form validating inputs via explicit Zod schemas.
- **Task Checklist:**
  - [x] Setup a checkout page path `/checkout` displaying order summaries.
  - [x] Create shipping address inputs: email, full name, shipping street address, city, postal code.
  - [x] Validate address structures using Zod schemas (`email`, `min(1)` bounds, zip-code regex matching).
  - [x] Build a mock submit handler: on successful validate, push mock order data to store (or local storage collections), deduct stock quantities, reset cart state, and redirect to the confirmation tracking path.
- **Success Criteria:**
  - Validation fails flag invalid fields with descriptive muted red message nodes.
  - Proceeding with blank cart contents bounces users back to `/`.
- **Cross-References:**
  - `TECH_STACK.md` -> Section: "2. Frontend Technologies -> Forms: React Hook Form + Zod"
  - `PRD.md` -> Section: "5. Features & Requirements -> Feature 3: Single-Page Secure Mock Checkout"

#### Step 4.2: Interactive Order Timeline & Carrier Details
- **Duration Estimate:** 2 Hours
- **Goal Statement:** Develop the visual order progression timeline displaying tracking statuses, carrier names, and tracking codes.
- **Task Checklist:**
  - [x] Create the order confirmation page route `/orders/[id]`.
  - [x] Build a tracking stepper tracing four steps: `Ordered` -> `Shipped` -> `Out for Delivery` -> `Delivered`.
  - [x] Display carrier identification details (e.g. FedEx, DHL, UPS) and a unique alphanumeric tracking number.
  - [x] Highlight active statuses and completed connection lines using Shop Violet color accents.
- **Success Criteria:**
  - Stepper dynamically reads database string properties (`status`) and displays active highlights correctly.
  - Layout displays carrier details, tracking codes, and delivery estimations clearly.
- **Cross-References:**
  - `PRD.md` -> Section: "5. Features & Requirements -> Feature 4: Order Progression Timeline UI"
  - `APP_FLOW.md` -> Section: "2.5 Visual Order Tracking Flow"

#### Step 4.3: Secure Admin Sales & Inventory Control Board
- **Duration Estimate:** 3 Hours
- **Goal Statement:** Build the secure dashboard to add products, manually advance order statuses, assign carriers, and view detailed metrics.
- **Task Checklist:**
  - [x] Setup the `/admin` dashboard path.
  - [x] Lock route access: verify the current session user email matches `joepsycho@shopinsane.com` or `rajan@shopinsane.com`.
  - [x] Render a form to Add New Products (name, category, price, stock, description, image URL).
  - [x] Display Sales Metrics: Total Sales Revenue, Total Units Sold, remaining stock list of all 22 products, and identification of the most popular item.
  - [x] Render an Order pipeline console to:
    - Update order statuses (`Ordered` -> `Shipped` -> `Out for Delivery` -> `Delivered`).
    - Input carrier names (e.g. DHL/FedEx) and assign tracking codes.
- **Success Criteria:**
  - Navigating to `/admin` without admin credentials blocks page access.
  - Adding a product inserts it immediately into the home catalog list.
  - Transitioning tracking status instantly updates the active customer order timeline pages.
- **Cross-References:**
  - `PRD.md` -> Section: "5. Features & Requirements -> Feature 5: Multi-Factor Free-Tier Access Control"
  - `APP_FLOW.md` -> Section: "5. Decision Points (IF-THEN Logic)"
