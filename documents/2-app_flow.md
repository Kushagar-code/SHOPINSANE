# Shopinsane App Flow Documentation

## 1. Entry Points
Users can enter the Shopinsane app through the following entry points:
- **Direct Navigation (`/`)**: Entering the root URL loads the immersive product catalog.
- **Deep Links (`/products/[slug]`)**: Clicking shared links or search engine results to view a specific product.
- **Order Tracking Link (`/orders/[id]`)**: Accessing a direct link from a post-checkout confirmation to view the visual order tracking timeline.
- **Authentication Routes (`/login`, `/signup`)**: Accessing the app through direct links to sign up or log in.

## 2. Core User Flows

### 2.1 Onboarding & Registration Flow
**Happy Path:**
Landing Page (`/`) → User clicks "Sign In/Up" in header → Navigates to `/login` → User clicks "Create Account" → Navigates to `/signup` → User enters valid email and password → Submits form → System creates Supabase Auth user → Redirects to `/` with authenticated state active.

**Error States:**
- **Invalid Input (Zod Validation)**: 
  - Email empty/invalid format: "Please enter a valid email address."
  - Password < 8 chars: "Password must be at least 8 characters long."
- **System Errors**: Supabase auth failure: "Registration failed. Please try again later."
- **Network Offline**: "Network error. Please check your connection and try again."

**Edge Cases:**
- **Abandonment**: User clicks back or logo → Returns to `/` with no state change.
- **Session Expiry**: N/A for registration context, but valid session tokens expire after set Supabase limits requiring re-login.

### 2.2 Browsing Catalog with Aceternity UI Flow
**Happy Path:**
Landing Page (`/`) loads Aceternity UI hero animation → User scrolls down → High-end Framer Motion animations reveal product cards → User interacts with a specific Product Card (hover triggers 3D rotate/shine) → User clicks product → System navigates to `/products/[slug]` → Views full immersive product details and similar recommendations.

**Error States:**
- **Timeout fetching products**: System shows fallback: "Unable to load products. Please refresh the page."
- **Invalid Product URL**: Navigating to a non-existent `/products/[slug]` displays the 404 Error Screen.

**Edge Cases:**
- **Going Back**: Clicking browser back restores scroll position in the catalog grid.
- **Zero Results**: Empty state graphic displays: "No products available at the moment."

### 2.3 Cart Management (Zustand Drawer) Flow
**Happy Path:**
User on `/` or `/products/[slug]` → Clicks "Add to Cart" → Zustand state updates → Slide-out cart drawer smoothly animates in from the right edge → Displays updated line item and subtotals → User clicks '+' or '-' to adjust quantities → Zustand state immediately reflects changes → User clicks 'Close' or overlay → Cart drawer slides out.

**Error States:**
- **Max Quantity Reached**: Disables '+' button. System toast: "Maximum available quantity reached."
- **Offline Behavior**: Since cart uses local Zustand state, adding to cart succeeds offline, but syncing or proceeding to checkout displays network errors.

**Edge Cases:**
- **Empty Cart Drawer**: Hovering over the cart icon while empty → "Your cart is empty."
- **Outside Click**: Clicking the semi-transparent overlay immediately dismisses the drawer without losing cart contents.

### 2.4 Mock Checkout Flow
**Happy Path:**
Cart Drawer open → User clicks "Proceed to Checkout" → Validates if Cart > 0 → System navigates to `/checkout` → User fills in dummy shipping/billing info → Clicks "Complete Order" (no real payments) → System generates mock Order ID via Supabase → Zustand cart is cleared → System redirects to `/orders/[id]`.

**Error States:**
- **Invalid Input (Zod Validation)**:
  - Address empty: "Shipping address is required."
  - Zip code invalid format: "Please enter a valid postal code."
- **System Timeout**: Order creation timeout in Supabase: "Checkout failed to process. Your items are safe. Please try again."

**Edge Cases:**
- **Abandonment**: User abandons checkout to browse catalog. Cart Zustand state is retained.
- **Session Expiry**: If checkout requires auth and token expires mid-checkout, redirects to `/login?redirect=/checkout`.

### 2.5 Visual Order Tracking Flow
**Happy Path:**
System redirects to `/orders/[id]` → Fetches order details from Supabase via Next.js Edge Runtime → Displays dynamic visual order tracking timeline (Order Placed → Processing → Shipped → Delivered) with animation on the active tier.

**Error States:**
- **Invalid Order ID**: System tries fetching non-existent ID → Displays 404 layout: "Order not found or you do not have permission to view it."

**Edge Cases:**
- **Refreshing:** Direct page refresh re-fetches safely via server-side rendering without losing timeline context.

## 3. Navigation Map
```text
Root (/) - Product Catalog
├── /login - Authentication (Sign In)
├── /signup - Authentication (Register)
├── /products/[slug] - Product Details Page
├── [Slide-out Cart Drawer] - Persistent Overlay
├── /checkout - Mock Checkout Page
└── /orders/[id] - Visual Order Tracking Timeline
    └── 404 (Not Found) - Fallback
    └── 500 (Server Error) - Fallback
```

## 4. Screen Inventory

### 4.1 Home / Product Catalog (`/`)
- **Access Level**: Public
- **Purpose**: Immersive product discovery using Aceternity UI.
- **Key Elements**: Hero section with Framer Motion, Product Grid, Cart Icon.
- **Actions**:
  - Click Product → Navigate to `/products/[slug]`.
  - Click Add to Cart → Opens Slide-out Cart Drawer.
  - Click Login → Navigate to `/login`.
- **State Variants**: 
  - Loading: Skeleton UI for featured products.
  - Empty: "No products available."
  - Error: Error boundary standard UI.

### 4.2 Product Details (`/products/[slug]`)
- **Access Level**: Public
- **Purpose**: Deep dive into specific product specs.
- **Key Elements**: Large image gallery, price, add to cart button, description, similar items.
- **Actions**:
  - Add to Cart → Triggers Zustand state, opens Drawer.
  - Back → Navigates to `/`.
- **State Variants**: Loading skeleton, 404 (Product not found).

### 4.3 Slide-out Cart Drawer (Overlay)
- **Access Level**: Public
- **Purpose**: Global cart state management via Zustand.
- **Key Elements**: Line items, quantity selectors, subtotal, checkout button.
- **Actions**:
  - Adjust quantity (+/-) → Updates state immediately.
  - Remove Item → Removes from state.
  - Checkout → Navigates to `/checkout`.
  - Close → Dismisses drawer.
- **State Variants**: Empty ("Your cart is empty").

### 4.4 Checkout (`/checkout`)
- **Access Level**: Authenticated (or Guest depending on strictness, default Authenticated).
- **Purpose**: Capture mock shipping/billing data.
- **Key Elements**: Shipping form, order summary, "Complete Order" button.
- **Actions**: 
  - Submit Form → Validates with Zod, pushes to `/orders/[id]`.
  - Back to Cart → Returns to `/`.
- **State Variants**: Loading (processing order mock), Error (validation failures).

### 4.5 Visual Order Tracking (`/orders/[id]`)
- **Access Level**: Private (tied to session) / Obfuscated Public.
- **Purpose**: Displays dynamic visual order tracking timeline with carrier details.
- **Key Elements**: Timeline stepper, carrier details block (Carrier name, Tracking number, Estimated delivery date), order summary, receipt.
- **Actions**:
  - Continue Shopping → Navigates to `/`.
- **State Variants**: Loading (fetching order), 404 (Invalid ID).

### 4.6 Admin Sales & Inventory Console (`/admin`)
- **Access Level**: Restricted to admin roles (`joepsycho@shopinsane.com`, `rajan@shopinsane.com`).
- **Purpose**: Manage product additions, track sales, stock inventory, and update order statuses.
- **Key Elements**:
  - Add Product Form (fields: name, price, stock, description, image).
  - Sales Analytics Panel (Total Sales revenue, units sold, order count).
  - Inventory Metrics (Current stock level of all 22 products).
  - Popular Products Table (Ranking products by units sold).
  - Order Pipeline Stepper (Manually transition user tracking status and assign delivery carrier/tracking code).
- **Actions**:
  - Add New Product → Updates catalog database.
  - Advance status → Changes tracking state of an active order.
- **State Variants**: Unauthenticated (renders access denied page or redirects to `/login`).

## 5. Decision Points (IF-THEN Logic)
- **Cart Access**: IF user clicks Add to Cart THEN increase Zustand quantity AND slide out drawer.
- **Checkout Validation**: IF form inputs fail Zod schema THEN highlight fields AND prevent submission ELSE create Supabase record.
- **Session Logic**: IF user accesses `/checkout` without active Supabase token THEN redirect to `/login` ELSE render checkout form.
- **Empty States**: IF catalog fetch returns 0 items THEN show Empty Graphic ELSE show Grid.
- **Drawer Behavior**: IF cart is empty AND user clicks Cart icon THEN show empty cart state without Checkout button.

## 6. Error Handling

### 6.1 Missing Resources (404)
- **What Displays**: Sleek, branded graphic with "Oops! This page broke our immersive experience."
- **User Actions**: "Return Home" button.
- **System Recovery**: Clicking button forces router push to `/`.

### 6.2 Server/Edge Errors (500)
- **What Displays**: "Our servers are taking a moment. Please wait."
- **User Actions**: "Try Again" button.
- **System Recovery**: Invokes Next.js `reset()` function in `error.tsx` boundary.

### 6.3 Network Offline
- **What Displays**: Global toast notification: "You are currently offline. Some features may be unavailable."
- **User Actions**: User can still view cached pages and manage locally-cached Zustand cart.
- **System Recovery**: Automatically dismisses when `navigator.onLine` fires true.

## 7. Responsive Behavior

### Mobile vs Desktop Differences
- **Aceternity UI Animations**: 
  - *Desktop*: Full 3D tilt effects, parallax scrolling, complex hover states on product cards.
  - *Mobile*: Reduced motion preference check; hover effects converted to tap states, parallax disabled for scroll performance, simplified entry animations.
- **Slide-out Cart Drawer**:
  - *Desktop*: Slides in from the right covering 30-40% of the viewport width. Background is a glassmorphism overlay.
  - *Mobile*: Slides up from the bottom (bottom-sheet style) or takes up 100% of the screen horizontally to ensure touch targets (quantity modifiers) remain accessible. Back/swipe gestures are mapped to close the drawer.
- **Visual Order Tracking**:
  - *Desktop*: Horizontal timeline layout using Framer motion sequence.
  - *Mobile*: Vertical timeline layout to prevent horizontal overflow anxiety.
- **Navigation Map**:
  - *Desktop*: Horizontal header links.
  - *Mobile*: Hamburger menu that utilizes a similar Aceternity slide-in animation as the cart drawer.