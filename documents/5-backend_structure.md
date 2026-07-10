# Shopinsane Backend Structure

## 1. Architecture Overview
Shopinsane operates as a serverless Edge application leveraging the **Next.js App Router (Edge Runtime)** paired precisely with **Supabase (PostgreSQL)** acting as a zero-cost Backend-as-a-Service. 
*   **Auth Strategy**: Supabase GoTrue handles authentication natively. The client issues login requests triggering Supabase to issue JWT tokens. These tokens are seamlessly caught by `@supabase/ssr` middleware, establishing secure HttpOnly cookie routing sessions to enable global app state hydration without local storage vulnerabilities.
*   **Data Flow**: Client Components trigger Next.js Server Actions. These Server Actions run securely on the Edge, interfacing with the Supabase PostgreSQL database using the `@supabase/supabase-js` client in a fully type-safe manner. 
*   **Caching Strategy**: Static and pseudo-static requests (e.g., initial catalog loads) heavily utilize Next.js Native fetch-cache combined with optimal Cloudflare Edge caching for $0-cost global low-latency responses. Cache revalidation occurs selectively via Server Actions acting on database mutations.

---

## 2. Database Schema

All database components are managed via PostgreSQL.

### Table: `profiles`
*Linked 1:1 with `auth.users` via Supabase GoTrue.*
| Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | PK, References `auth.users(id)` ON DELETE CASCADE | Unique profile ID mirroring auth user layer. |
| `email` | `VARCHAR(255)` | NOT NULL, UNIQUE | User's registered email address for marketing / logs. |
| `full_name` | `VARCHAR(255)` | NULL | Optional profile name. |
| `avatar_url` | `VARCHAR(255)` | NULL | Optional link to avatar asset. |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | DEFAULT `now()` | Record creation timestamp. |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | DEFAULT `now()` | Record update timestamp. |

*   **Indexes:** PK (`id`), Unique (`email`).
*   **RLS:** `SELECT` allowed bounds to `auth.uid() = id`. `UPDATE` allowed bounds to `auth.uid() = id`.

### Table: `categories`
| Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | PK, DEFAULT `gen_random_uuid()` | Unique category ID. |
| `name` | `VARCHAR(255)` | NOT NULL, UNIQUE | Display name of the category. |
| `slug` | `VARCHAR(255)` | NOT NULL, UNIQUE | URL-friendly category slug. |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | DEFAULT `now()` | Record creation timestamp. |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | DEFAULT `now()` | Record update timestamp. |

*   **Indexes:** PK (`id`), Unique (`slug`).
*   **RLS:** `SELECT` allowed publicly. `INSERT/UPDATE/DELETE` strictly restricted to `service_role`.

### Table: `products`
| Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | PK, DEFAULT `gen_random_uuid()` | Unique product ID. |
| `category_id` | `UUID` | References `categories(id)` ON DELETE SET NULL | FK linking product to category. |
| `name` | `VARCHAR(255)` | NOT NULL | Display name of the product. |
| `slug` | `VARCHAR(255)` | NOT NULL, UNIQUE | URL-friendly product routing slug. |
| `description` | `TEXT` | NOT NULL | Full detail description of the product. |
| `price` | `NUMERIC(10,2)` | NOT NULL, CHECK (`price &gt;= 0`) | Asset price constraint enforcing zero or positive. |
| `image_url` | `VARCHAR(512)` | NOT NULL | Primary asset media link (hosted on Supabase Storage). |
| `inventory_count` | `INTEGER` | NOT NULL, DEFAULT `0`, CHECK (`inventory_count &gt;= 0`) | Stock tracking integer. |
| `tags` | `TEXT[]` | NULL | Array of strings for tag-based client filtering. |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | DEFAULT `now()` | Record creation timestamp. |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | DEFAULT `now()` | Record update timestamp. |

*   **Indexes:** PK (`id`), Unique (`slug`), FK (`category_id`), GIN Index (`tags`).
*   **RLS:** `SELECT` allowed publicly. `INSERT/UPDATE/DELETE` strictly restricted to `service_role`.

### Table: `carts`
| Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | PK, DEFAULT `gen_random_uuid()` | Unique cart session ID. |
| `user_id` | `UUID` | References `profiles(id)` ON DELETE CASCADE | Optional authenticated owner attachment. |
| `session_token` | `VARCHAR(255)` | UNIQUE, NULL | Fallback identifier for guest carts. |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | DEFAULT `now()` | Record creation timestamp. |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | DEFAULT `now()` | Record update timestamp. |

*   **Indexes:** PK (`id`), FK (`user_id`), Unique (`session_token`).
*   **RLS:** `SELECT`, `INSERT`, `UPDATE`, `DELETE` bounded to `auth.uid() = user_id` OR matching `session_token`.

### Table: `cart_items`
| Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | PK, DEFAULT `gen_random_uuid()` | Unique cart item ID. |
| `cart_id` | `UUID` | NOT NULL, References `carts(id)` ON DELETE CASCADE | FK bridging item strictly to active cart. |
| `product_id` | `UUID` | NOT NULL, References `products(id)` ON DELETE CASCADE | FK bridging item strictly to active product. |
| `quantity` | `INTEGER` | NOT NULL, DEFAULT `1`, CHECK (`quantity &gt; 0`) | Volume of asset added to cart. |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | DEFAULT `now()` | Record creation timestamp. |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | DEFAULT `now()` | Record update timestamp. |

*   **Indexes:** PK (`id`), FK (`cart_id`), FK (`product_id`), Unique composite (`cart_id`, `product_id`).
*   **RLS:** Policies inherit automatically via FK check validating permissions on parent `carts` table.

### Table: `orders`
| Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | PK, DEFAULT `gen_random_uuid()` | Unique mock order ID. |
| `user_id` | `UUID` | NOT NULL, References `profiles(id)` ON DELETE CASCADE | Security bond enforcing authenticated mock checkout. |
| `status` | `VARCHAR(50)` | NOT NULL, DEFAULT `'Ordered'`, CHECK (`status` IN ('Ordered', 'Processing', 'Shipped', 'Delivered')) | Pipeline stage controlling dynamic tracking timeline UI. |
| `total_amount` | `NUMERIC(10,2)` | NOT NULL, CHECK (`total_amount &gt;= 0`) | Snapshot of calculated invoice sum. |
| `shipping_address` | `JSONB` | NOT NULL | Captured dummy delivery snapshot ensuring validation history. |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | DEFAULT `now()` | Mock creation timestamp. |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | DEFAULT `now()` | Progression tracking timestamp. |

*   **Indexes:** PK (`id`), FK (`user_id`), Index (`status`).
*   **RLS:** `SELECT` allowed strictly via `auth.uid() = user_id`. `INSERT` allowed strictly via `auth.uid() = user_id`.

### Table: `order_items`
| Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | PK, DEFAULT `gen_random_uuid()` | Unique Mock Line Item ID. |
| `order_id` | `UUID` | NOT NULL, References `orders(id)` ON DELETE CASCADE | Parent Order Link. |
| `product_id` | `UUID` | NOT NULL, References `products(id)` ON DELETE SET NULL | Catalog Product Link. |
| `price_at_purchase` | `NUMERIC(10,2)` | NOT NULL, CHECK (`price_at_purchase &gt;= 0`) | Freezing the asset price to prevent history manipulation. |
| `quantity` | `INTEGER` | NOT NULL, CHECK (`quantity &gt; 0`) | Units purchased. |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | DEFAULT `now()` | Record creation timestamp. |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | DEFAULT `now()` | Record update timestamp. |

*   **Indexes:** PK (`id`), FK (`order_id`), FK (`product_id`).
*   **RLS:** Read/Write policies strictly inherit rules from parent `orders(id)`.

---

## 3. API Endpoints

### 3.1 Checkout Processing &amp; Cart Syncing (Server Action: `processCheckout`)
*   **Auth Required**: Yes
*   **Method**: Server Action (POST equivalent)
*   **Request Body**:
    ```json
    {
      "cartId": "uuid-string",
      "shippingAddress": {
        "street": "123 Elite Way",
        "city": "Metropolis",
        "zipCode": "12345",
        "country": "MockNation"
      }
    }
    ```
*   **Validation Rules**: Zod schema demands rigorous strictness for `shippingAddress` objects.
*   **Response (200)**:
    ```json
    {
      "success": true,
      "orderId": "new-order-uuid-string",
      "status": "Ordered"
    }
    ```
*   **Error Cases**:
    *   `401 UNAUTHORIZED`: If session token is missing/expired.
    *   `400 BAD_REQUEST`: Zod validation failure on user input fields.
    *   `404 NOT_FOUND`: Provided `cartId` cannot be located attached to user.
    *   `422 UNPROCESSABLE_ENTITY`: Internal items possess zero inventory or logic gap exists.
*   **Side Effects**:
    *   Inserts new records actively in `orders` and `order_items`.
    *   Drops respective row data systematically in `carts` causing Zustand hooks to empty.
    *   Triggers `revalidatePath('/orders')` to update front-end routing cache mapping.

### 3.2 Product Catalog Fetching (Route Handler: `GET /api/products`)
*   **Auth Required**: No (Public Access)
*   **Method**: GET
*   **Validation Rules**: Optional Zod parsing on search `?q=`, category `?cat=`.
*   **Response (200)**:
    ```json
    {
      "products": [
        {
          "id": "uuid",
          "name": "Luxury Framer Component",
          "slug": "luxury-framer",
          "price": 199.99,
          "imageUrl": "https://[ref].supabase.co/storage/v1/object/public/...",
          "categoryId": "uuid"
        }
      ]
    }
    ```
*   **Error Cases**:
    *   `500 INTERNAL_SERVER_ERROR`: Supabase connection timeouts or database rejection.
*   **Side Effects**: Triggers Cloudflare Edge caching architecture mapping directly.

### 3.3 Order Timeline Retrieval (Server Action: `fetchOrderProgress`)
*   **Auth Required**: Yes
*   **Method**: Server Action (GET equivalent parameter retrieval)
*   **Request Params**: `orderId` (UUID string)
*   **Response (200)**:
    ```json
    {
      "orderId": "uuid",
      "currentStatus": "Shipped",
      "timestamp": "2026-08-01T12:00:00Z"
    }
    ```
*   **Error Cases**:
    *   `401 UNAUTHORIZED`: Invalid user attempting to read order states not belonging to their `auth.uid()`.
    *   `404 NOT_FOUND`: RLS automatically returns empty subsets handling invalid fetches securely.

---

## 4. Authentication Integration

*   **Supabase GoTrue**: Directly utilizes Supabase’s robust C++ authored authentication module wrapping standard JWT flows.
*   **Auth Storage**: Bypasses Local Storage completely utilizing `@supabase/ssr` bridging directly to HTTPOnly secure Next.js cookies preserving session state elegantly without XSS vulnerabilities.
*   **Policy Structure (RLS)**: Public roles permit sweeping catalog reads. Authenticated Customer bounds guarantee personal user assets (`profiles`, `orders`, `carts`) securely route uniquely allowing 1:1 row interactions.
*   **PG_Crypto Password Security**: Offloaded fundamentally to Supabase eliminating bespoke hashing algorithms on Next.js backend infrastructure rendering serverless execution radically faster.

---

## 5. Error Response Format (Standard)

```json
{
  "status": "error",
  "errorCode": "VALIDATION_FAILED",
  "message": "Shipping address Zip Code must be exactly 5 digits."
}
```

*   `400`: `VALIDATION_FAILED`, `BAD_REQUEST`
*   `401`: `UNAUTHORIZED_ACCESS`
*   `403`: `FORBIDDEN_ACTION` (RLS Violations)
*   `404`: `RESOURCE_NOT_FOUND`
*   `500`: `INTERNAL_SERVER_ERROR`

---

## 6. Caching Strategy

*   **Product Catalog**: Bound natively to Next.js `fetch` passing `{ next: { revalidate: 3600 } }`. Caches highly-requested data across the Cloudflare edge resolving latency drastically on empty budgets.
*   **Invalidation**: When administrative mutations push via Supabase MCP directly editing catalog item values, Next.js `revalidatePath('/products')` fires tearing down stale cache structures preserving data sync organically.

---

## 7. Rate Limiting

*   Managed entirely via Cloudflare application firewall protections automatically preventing DDOS.
*   Strict limits handled simultaneously via Supabase standard platform API limits (e.g. limiting auth loops automatically restricting brute forcing algorithms dynamically) securing the MVP's $0 constraint explicitly.

---

## 8. Migration Strategy

*   DDL scripts representing the schemas described actively execute autonomously via the `supabase migration up` CLI standard routing directly relying on the robust AI-enabled **Supabase MCP** connection linking your context window safely eliminating external terminal management natively.