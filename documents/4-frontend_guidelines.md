# Shopinsane Frontend Guidelines

## 1. Design Principles

*   **Absolute Immersion:** Fluid transitions, staggered animations, and a continuous sense of spatial depth.
*   **Uncompromising Contrast:** Pitch blacks set against vibrant electric violets and stark slates, ensuring focal points pop immediately.
*   **Restrained Precision:** Negative space is a first-class citizen. Typography and layout must breathe to convey premium exclusivity.
*   **Performance as Luxury:** Micro-interactions (hovers, clicks) must be instantaneous (150ms-250ms), and 60fps scrolling is non-negotiable.

## 2. Design Tokens

### Color Palette

**Primary: Electric Violet**
*   `50`: `#F3E8FF` (Lightest tint, subtle backgrounds)
*   `100`: `#E9D5FF`
*   `200`: `#D8B4FE`
*   `300`: `#C084FC`
*   `400`: `#A855F7`
*   `500`: `#9333EA` (Core Brand Color, CTAs, intense accents)
*   `600`: `#7E22CE`
*   `700`: `#6B21A8`
*   `800`: `#581C87`
*   `900`: `#3B0764` (Deepest shade, hover states on dark elements)

**Neutral: Deep Slate / Pitch Black**
*   `50`: `#F8FAFC`
*   `100`: `#F1F5F9`
*   `200`: `#E2E8F0`
*   `300`: `#CBD5E1`
*   `400`: `#94A3B8` (Subtle text, disabled element outlines)
*   `500`: `#64748B`
*   `600`: `#475569` (Secondary text)
*   `700`: `#334155`
*   `800`: `#1E293B` (Cards, elevated surfaces)
*   `900`: `#0F172A` (Rich background)
*   `950`: `#020617` (Pitch Black, Page Background)

**Semantics (Premium Dark Mode Equivalents)**
*   **Success:** `#10B981` (Emerald) - Confirmations, completed steps.
*   **Warning:** `#F59E0B` (Amber) - Non-critical alerts, missing info.
*   **Error:** `#EF4444` (Red) - Destructive actions, validation failures.
*   **Info:** `#3B82F6` (Blue) - Contextual help, updates.

**Usage Rules:**
*   **Backgrounds:** Exclusively use Neutral 950 for the main body. Surfaces (cards, modals) elevate using Neutral 900 or 800.
*   **Text:** Primary text is white (`#FFFFFF`) or Neutral 50. Secondary text is Neutral 400.
*   **Accents:** Primary 500 is reserved for primary CTAs and critical active states. Avoid washing the screen in violet; use it surgically.

### Typography

*   **Primary Font:** `Inter` (sans-serif, clean, modern).
*   **Secondary/Monospace (optional, for data/code):** `Geist Mono` or `Fira Code`.

**Scale:**
*   `xs`: 0.75rem (12px), Line Height: 1rem (16px) - Metadata, tiny badges.
*   `sm`: 0.875rem (14px), Line Height: 1.25rem (20px) - Secondary text, small inputs.
*   `base`: 1rem (16px), Line Height: 1.5rem (24px) - Body text, standard buttons/inputs.
*   `lg`: 1.125rem (18px), Line Height: 1.75rem (28px) - Subtitles.
*   `xl`: 1.25rem (20px), Line Height: 1.75rem (28px) - Section headers.
*   `2xl`: 1.5rem (24px), Line Height: 2rem (32px) - Prominent section headers.
*   `3xl`: 1.875rem (30px), Line Height: 2.25rem (36px) - Page titles.
*   `4xl`: 2.25rem (36px), Line Height: 2.5rem (40px) - Hero headlines.
*   `5xl`: 3rem (48px), Line Height: 1 (48px) - Display text.

**Weights:**
*   `light`: 300
*   `regular`: 400
*   `medium`: 500
*   `semibold`: 600
*   `bold`: 700

### Spacing Scale & Border Radius

**Spacing (rem/px):**
*   `0`: 0
*   `1`: 0.25rem (4px)
*   `2`: 0.5rem (8px)
*   `3`: 0.75rem (12px)
*   `4`: 1rem (16px)
*   `5`: 1.25rem (20px)
*   `6`: 1.5rem (24px)
*   `8`: 2rem (32px)
*   `10`: 2.5rem (40px)
*   `12`: 3rem (48px)
*   `16`: 4rem (64px)

**Border Radius:**
*   `none`: 0
*   `sm`: 0.125rem (2px)
*   `DEFAULT`: 0.25rem (4px)
*   `md`: 0.375rem (6px)
*   `lg`: 0.5rem (8px)
*   `xl`: 0.75rem (12px)
*   `2xl`: 1rem (16px)
*   `3xl`: 1.5rem (24px)
*   `full`: 9999px (Pills/Circles)

### Shadows & Glows

*   **sm:** `0 1px 2px 0 rgba(0, 0, 0, 0.5)`
*   **DEFAULT:** `0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)`
*   **md:** `0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5)`
*   **lg:** `0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)`
*   **glow-primary:** `0 0 15px 0px rgba(147, 51, 234, 0.4)` (Brand accent glow)
*   **glow-intense:** `0 0 25px 5px rgba(147, 51, 234, 0.6)` (Active states, critical highlights)

---

## 3. Component Library

*Prerequisites: These assume Tailwind CSS configured with the tokens above (`bg-neutral-950`, `text-neutral-50`, `bg-primary-500`, etc.).*

### Button

**Usage Rules:** Use primary sparingly (1-2 per view). Ghost for secondary actions. Use appropriate semantics (danger) for destructive actions.
**Accessibility:** Must have `focus-visible` states explicitly defined to avoid blurring outlines. Use `aria-disabled="true"` when visually disabled but still focusable for tooltips.

```tsx
// Base classes for all buttons
// inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 relative overflow-hidden group

// --- Variants ---
// Primary: bg-primary-500 text-white hover:bg-primary-400 hover:shadow-glow-primary active:scale-95 focus-visible:ring-primary-500 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed
// Secondary: bg-neutral-800 text-neutral-100 hover:bg-neutral-700 active:scale-95 focus-visible:ring-neutral-400 disabled:bg-neutral-900 disabled:text-neutral-600 disabled:cursor-not-allowed
// Danger: bg-red-600 text-white hover:bg-red-500 active:scale-95 focus-visible:ring-red-500 disabled:bg-red-900 disabled:text-red-400 disabled:cursor-not-allowed
// Outline: bg-transparent text-primary-400 border border-primary-500/50 hover:border-primary-400 hover:bg-primary-500/10 active:scale-95 focus-visible:ring-primary-500 disabled:border-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed
// Ghost: bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white active:scale-95 focus-visible:ring-neutral-400 disabled:text-neutral-600 disabled:cursor-not-allowed

// --- Sizes ---
// sm: text-sm px-3 py-1.5 h-8
// md: text-base px-4 py-2 h-10
// lg: text-lg px-6 py-3 h-12

// --- States (applied atop variants) ---
// Loading (adds overlay/spinner): cursor-wait opacity-80 pointer-events-none

// Example: Primary Medium Default
<button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 relative overflow-hidden group bg-primary-500 text-white hover:bg-primary-400 hover:shadow-glow-primary active:scale-95 focus-visible:ring-primary-500 text-base px-4 py-2 h-10">
  Buy Now
</button>

// Example: Secondary Small Disabled
<button disabled className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 relative overflow-hidden group bg-neutral-800 text-neutral-100 disabled:bg-neutral-900 disabled:text-neutral-600 disabled:cursor-not-allowed text-sm px-3 py-1.5 h-8">
  Cancel
</button>
```

### Input

**Usage Rules:** Labels must be visually associated. Placeholder text should be `neutral-500`.
**Accessibility:** Provide `id` linking to `htmlFor` on labels. Show explicit `aria-invalid` and `aria-describedby` when errors occur.

```tsx
// Base Wrapper (label + input + error text)
// flex flex-col space-y-1.5

// Label: text-sm font-medium text-neutral-300 group-focus-within:text-white transition-colors duration-200

// Base Input Classes
// flex w-full rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:border-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 hover:border-neutral-700

// --- Variants ---
// Default: focus-visible:ring-primary-500/50
// Error: border-red-500/50 focus-visible:ring-red-500/50 focus-visible:border-red-500

// --- Sizes ---
// sm: h-8 px-3 text-sm
// md: h-10 px-4 text-base
// lg: h-12 px-4 text-lg

// Example: Standard Input with Label & Error
<div className="flex flex-col space-y-1.5">
  <label htmlFor="email" className="text-sm font-medium text-neutral-300 transition-colors duration-200">Email Address</label>
  <input 
    id="email" 
    type="email" 
    placeholder="contact@shopinsane.com"
    className="flex w-full rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 hover:border-neutral-700 focus-visible:ring-primary-500/50 focus-visible:border-neutral-700 h-10 px-4 text-base"
  />
</div>

// Example: Error State
<div className="flex flex-col space-y-1.5">
  <label htmlFor="card" className="text-sm font-medium text-red-500">Card Number</label>
  <input 
    id="card" 
    aria-invalid="true"
    className="flex w-full rounded-lg bg-neutral-900 border text-neutral-100 placeholder:text-neutral-500 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 border-red-500/50 focus-visible:ring-red-500/50 focus-visible:border-red-500 h-10 px-4 text-base"
  />
  <span className="text-xs text-red-400">Invalid card number format.</span>
</div>
```

### Card (Aceternity Animated Style)

**Usage Rules:** For discrete content objects (products, stats). Hover states involve subtle lift, border glow, or internal element movement.
**Accessibility:** If the card is clickable as a whole, structure it gracefully (e.g., wrap in `<a>` or use `aria-labelledby`).

```tsx
// Base Card Container
// relative group rounded-2xl bg-neutral-900/50 border border-neutral-800 shadow-md backdrop-blur-sm overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-neutral-700

// Interactive/Animated Overlay (Aceternity style subtle background shift on hover)
// absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none

// Content Wrapper
// relative z-10 p-6 flex flex-col space-y-4

// Example: Interactive Product Card
<div className="relative group rounded-2xl bg-neutral-900/50 border border-neutral-800 shadow-md backdrop-blur-sm overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-neutral-700">
  <div className="absolute inset-0 bg-gradient-to-t from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
  <div className="relative z-10 p-6 flex flex-col space-y-4">
    <div className="h-48 w-full bg-neutral-800 rounded-lg overflow-hidden relative">
        {/* Image goes here, scaled on hover group-hover:scale-105 duration-700 */}
        <div className="absolute inset-0 bg-neutral-800 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
    </div>
    <div className="space-y-1">
      <h3 className="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors duration-300">Monolith Keyboard</h3>
      <p className="text-sm text-neutral-400">$299.00 USD</p>
    </div>
  </div>
</div>
```

### Modal

**Usage Rules:** Use immediately to interrupt flow for required input or deep confirmation. Blur background heavily.
**Accessibility:** Trap focus inside the modal. Must close on `ESC`. Use `role="dialog"`, `aria-modal="true"`.

```tsx
// Backdrop/Overlay
// fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200

// Modal Container
// relative z-50 w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6 shadow-glow-primary/10 animate-in zoom-in-95 duration-200

// Close Button (top right)
// absolute right-4 top-4 rounded-md text-neutral-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500

// Example Modal
<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
  <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative z-50 w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6 animate-in zoom-in-95 duration-200">
    <button aria-label="Close" className="absolute right-4 top-4 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
      <svg className="w-5 h-5 text-neutral-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
    
    <div className="flex flex-col space-y-1 sm:text-left text-center">
      <h2 id="modal-title" className="text-xl font-semibold text-white tracking-tight">Access Restricted</h2>
      <p className="text-sm text-neutral-400">You need a premium tier account to execute this action.</p>
    </div>

    <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
      <button className="mt-2 sm:mt-0 inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white px-4 py-2 text-sm h-10">Cancel</button>
      <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 bg-primary-500 text-white hover:bg-primary-400 hover:shadow-glow-primary px-4 py-2 text-sm h-10">Upgrade Plan</button>
    </div>
  </div>
</div>
```

### Alert/Toast

**Usage Rules:** Edge-anchored (bottom right or top center). Auto-dismisses except for errors.
**Accessibility:** Use `role="status"` or `aria-live="polite"` for non-critical, `role="alert"` or `aria-live="assertive"` for errors.

```tsx
// Base Toast Container
// pointer-events-auto relative flex w-full max-w-sm items-center justify-between space-x-4 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 p-4 pr-6 shadow-xl transition-all

// --- Variants ---
// Default/Info: border-neutral-800 border-l-primary-500 border-l-4
// Success: border-neutral-800 border-l-emerald-500 border-l-4 bg-emerald-500/5
// Error: border-red-500/30 bg-red-950/30 text-red-50 border-l-red-500 border-l-4

// Example: Success Toast (Bottom Right)
<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
  <div role="status" aria-live="polite" className="pointer-events-auto relative flex w-full max-w-sm items-center justify-between space-x-4 overflow-hidden rounded-xl bg-neutral-900 p-4 pr-6 shadow-xl transition-all border-neutral-800 border border-l-4 border-l-emerald-500 bg-emerald-500/5 animate-in slide-in-from-right sm:slide-in-from-bottom">
    <div className="flex w-full items-start gap-4">
      <div className="text-emerald-500 shrink-0 mt-0.5">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      </div>
      <div className="flex-1 grid gap-1">
        <p className="text-sm font-medium text-neutral-50">Transaction Complete</p>
        <p className="text-sm text-neutral-400">Asset successfully transferred to your wallet.</p>
      </div>
    </div>
    <button className="absolute right-2 top-2 rounded-md p-1 text-neutral-500 hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  </div>
</div>
```

### Loading State (Shimmer/Skeleton)

**Usage Rules:** Use to maintain layout while fetching data. Prefer subtle pulses over high-contrast flashes.
**Accessibility:** Ensure `aria-hidden="true"` so screen readers ignore visual placeholders.

```tsx
// Base Skeleton Classes
// animate-pulse rounded-md bg-neutral-800/80

// Example: Product Card Skeleton
<div aria-hidden="true" className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
  <div className="h-48 w-full bg-neutral-800/80 rounded-lg animate-pulse"></div>
  <div className="space-y-2">
    <div className="h-5 w-2/3 bg-neutral-800/80 rounded-md animate-pulse"></div>
    <div className="h-4 w-1/3 bg-neutral-800/50 rounded-md animate-pulse"></div>
  </div>
</div>
```

### Empty State (Premium Minimal)

**Usage Rules:** Large padded areas when no data exists. Simple icon, title, description, and primary CTA.
**Accessibility:** Ensure the container is logically placed in the layout flow.

```tsx
// Container
// flex h-[400px] shrink-0 items-center justify-center rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/30 text-center

// Example
<div className="flex flex-col h-[400px] w-full shrink-0 items-center justify-center rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/30 p-8 text-center animate-in fade-in duration-500">
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800 mb-4 shadow-inner">
     <svg className="h-8 w-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
  </div>
  <h3 className="text-xl font-medium text-neutral-100 mt-2">No Assets Owned</h3>
  <p className="mt-2 text-sm text-neutral-400 max-w-sm mx-auto mb-6">You haven't acquired any premium digital assets yet. Browse the marketplace to start your collection.</p>
  <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 bg-primary-500 text-white hover:bg-primary-400 hover:shadow-glow-primary px-4 py-2 h-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">
    Explore Marketplace
  </button>
</div>
```

---

## 4. Layout System

### Grid System
*   **Max Width:** `max-w-7xl` (1280px) for general content constraints.
*   **Columns:** 12-column grid structure (`grid-cols-12`).
*   **Gutters:** `gap-4` (16px) on mobile, `gap-6` (24px) or `gap-8` (32px) on desktop.

### Responsive Breakpoints
*   `sm`: `640px` (Tablets / Large Phones)
*   `md`: `768px` (Portrait Tablets)
*   `lg`: `1024px` (Laptops)
*   `xl`: `1280px` (Desktop)
*   `2xl`: `1536px` (Wide Desktop)

### Code Snippets

**1. Centered Content Layout (Landing Pages/Auth)**
```tsx
<div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 selection:bg-primary-500/30">
  <main className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
    {/* Auth Form / Centered Content */}
  </main>
</div>
```

**2. Two-Column Product Detail Split**
```tsx
<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
    {/* Product Sticky Gallery (Left) */}
    <div className="lg:sticky lg:top-8 self-start">
      <div className="aspect-square bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
        {/* Main Image */}
      </div>
    </div>
    
    {/* Product Meta & Actions (Right) */}
    <div className="flex flex-col space-y-8">
      {/* Title, Price, Description, Buy Buttons */}
    </div>
  </div>
</div>
```

**3. Dashboard Layout with Sidebar**
```tsx
<div className="min-h-screen bg-neutral-950 flex">
  {/* Sticky Sidebar */}
  <aside className="fixed inset-y-0 left-0 w-64 bg-neutral-900 border-r border-neutral-800 z-40 hidden lg:flex flex-col">
    {/* Nav Links */}
  </aside>

  {/* Main Content Area */}
  <main className="flex-1 flex flex-col lg:pl-64">
    <header className="sticky top-0 z-30 h-16 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md flex items-center px-4 sm:px-6">
      {/* Top Bar (Mobile Menu Toggle, Profile) */}
    </header>
    <div className="p-4 sm:p-6 lg:p-8 flex-1">
      {/* Dashboard Widgets / Routing Output */}
    </div>
  </main>
</div>
```

---

## 5. Accessibility

*   **Contrast (WCAG 2.1 AA):** The primary background (`Neutral 950`, `#020617`) paired with text colors (`Neutral 50`, `Neutral 400`) strictly adheres to >= 4.5:1 ratio for normal text.
*   **Focus Management:** 
    *   No fallback `outline: none` without `focus-visible` replacement.
    *   Global focus structure used in components: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:ring-primary-500`.
*   **Aria Live Regions:** Dynamic content updates (Toasts, Cart additions) must utilize `aria-live="polite"` or `aria-live="assertive"`. Skeleton loaders must hide from screen readers via `aria-hidden="true"`.

---

## 6. Animation System

To maintain a premium, deliberate feel, animations should be purposeful—not chaotic. Use Framer Motion for complex orchestrations, and Tailwind for micro-interactions.

### Durations
*   `75ms`: Instant snappy interaction (active states, toggle clicks).
*   `150ms`: Standard hover micro-interaction.
*   `200ms`-`300ms`: Entrance/Exit of small UI elements (modals, dropdowns). (`duration-200`)
*   `500ms`-`700ms`: Large structural shifts, layout animations, lazy image reveals.

### Easing Curves (Framer Motion equivalents)
*   **Standard (Tailwind `ease-out`):** `[0.2, 0.4, 0, 1]` or Spring (`stiffness: 400, damping: 30`). Quick start, gentle stop. Suitable for closing/hiding.
*   **Emphasized Deceleration (Luxury Feel):** `[0.16, 1, 0.3, 1]` or Spring (`stiffness: 300, damping: 35`). Used for entering screen—objects feel "heavy" but smooth.

### Safe Properties to Animate
Rely strictly on compositor layers for 60fps performance on mobile:
*   `transform` (`translate`, `scale`, `rotate`)
*   `opacity`
*   *Avoid animating `width`, `height`, `top`, `left`, `box-shadow` on continuous loops or massive DOM subtrees.*

### Prefers Reduced Motion
All declarative animations (Tailwind `animate-*`) and transitions must respect system settings:
*   Ensure Tailwind variant `motion-reduce:transition-none` and `motion-reduce:animate-none` are applied globally or heavily used on highly animated components.
*   In Framer Motion, utilize `useReducedMotion()` hook to strip complex interpolations down to simple opacities or disable them entirely.
```