# Shopinsane Technology Stack

## 1. App Context
- **Type**: Web (Next.js Edge Serverless App deployed on Cloudflare Pages)
- **Scale**: MVP (Production-grade, zero-cost turnkey digital asset)
- **Timeline**: August 1, 2026

## 2. Frontend Technologies

### Framework: Next.js (App Router)
- **Version**: Next.js 14.2.4
- **Documentation URL**: https://nextjs.org/docs
- **Reason for selection**: Next.js provides the best-in-class developer experience with App Router, server components, and native edge compatibility, which pair seamlessly with Cloudflare Pages for a zero-cost, highly performant deployment.
- **Alternatives considered and why rejected**: 
  - *React + Vite*: Rejected because it lacks native server-side rendering (SSR) and seamless serverless functions capabilities out-of-the-box, requiring more complex backend setups that deviate from the turnkey zero-cost requirement.

### Language: TypeScript
- **Version**: TypeScript 5.5.3
- **Documentation URL**: https://www.typescriptlang.org/docs/
- **Reason for selection**: Ensures type safety across the full stack (especially when generating Supabase database types), preventing runtime errors and improving codebase scaling.
- **Alternatives considered and why rejected**: 
  - *JavaScript*: Rejected due to lack of static typing, increasing the risk of bugs in a production-grade asset.

### Styling: Tailwind CSS
- **Version**: Tailwind CSS 3.4.4
- **Documentation URL**: https://tailwindcss.com/docs
- **Reason for selection**: Utility-first CSS allows for rapid UI development without context switching. It produces a minimal CSS bundle in production.
- **Alternatives considered and why rejected**: 
  - *Styled Components / Emotion*: Rejected because runtime CSS-in-JS incurs performance overhead and does not play as nicely with React Server Components.

### State Management: Zustand
- **Version**: Zustand 4.5.4
- **Documentation URL**: https://zustand-demo.pmnd.rs/
- **Reason for selection**: Minimalist, fast, and hook-based API that avoids the boilerplate of larger state management tools. Perfect for lightweight client-side state in a mostly server-driven Next.js app.
- **Alternatives considered and why rejected**: 
  - *Redux Toolkit*: Rejected due to excessive boilerplate for an MVP and heavy bundle size.
  - *Context API*: Rejected for frequent state updates preventing unnecessary re-renders.

### Forms: React Hook Form + Zod
- **Version**: React Hook Form 7.52.1, Zod 3.23.8
- **Documentation URL**: https://react-hook-form.com/get-started, https://zod.dev/
- **Reason for selection**: React Hook Form offers performant, uncontrolled form validation. Paired with Zod, it provides end-to-end type safety mapping strictly to Supabase schemas.
- **Alternatives considered and why rejected**: 
  - *Formik / Yup*: Rejected because Formik relies on controlled components (which can be slower), and Zod offers superior TypeScript inference over Yup.

### HTTP Client: Native Fetch API / Supabase JS Client
- **Version**: Native (Web Standard) / @supabase/supabase-js 2.44.2
- **Documentation URL**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API, https://supabase.com/docs/reference/javascript/introduction
- **Reason for selection**: Native Fetch interacts natively with Next.js Cache API for data fetching. Supabase JS handles authenticated DB requests seamlessly.
- **Alternatives considered and why rejected**: 
  - *Axios*: Rejected as it unnecessarily increases bundle size and bypasses Next.js native fetch extensions (caching/revalidation).

### UI Components: Aceternity UI, Framer Motion, Lucide React
- **Version**: Aceternity UI (Source Copy), Framer Motion 11.2.12, Lucide React 0.400.0
- **Documentation URL**: https://ui.aceternity.com/, https://www.framer.com/motion/, https://lucide.dev/
- **Reason for selection**: Aceternity and Framer Motion provide highly premium, animated UI components to meet the "premium asset" philosophy. Lucide provides a clean, modern, and lightweight SVG icon set.
- **Alternatives considered and why rejected**: 
  - *Material UI*: Rejected because it looks generic and is difficult to customize to a premium, bespoke aesthetic.
  - *FontAwesome*: Rejected due to larger bundle size compared to Lucide's tree-shakeable system.

## 3. Backend Technologies

### Runtime Environment: Node.js (Local Dev / Actions)
- **Version**: Node.js 20.15.0 LTS
- **Documentation URL**: https://nodejs.org/docs/latest-v20.x/api/
- **Reason for selection**: Rock-solid Long Term Support ensuring stability for local development and GitHub Actions pipelines.
- **Alternatives considered and why rejected**: 
  - *Bun / Deno*: Rejected to maximize compatibility with the broader ecosystem and standard GitHub Actions, keeping the turnkey asset foolproof for future owners.

### Backend Framework: Next.js Server Actions / API Routes
- **Version**: Next.js 14.2.4
- **Documentation URL**: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
- **Reason for selection**: Server Actions eliminate the need for an external API layer, allowing secure, backend mutations directly from React components while deployed trivially to Cloudflare Pages edge network.
- **Alternatives considered and why rejected**: 
  - *Express.js / NestJS*: Rejected as they require a separate hosting infrastructure, violating the zero-cost architecture goal.

### Database & Auth: Supabase (PostgreSQL)
- **Version**: PostgreSQL 15, Supabase Auth
- **Documentation URL**: https://supabase.com/docs, https://www.postgresql.org/docs/15/index.html
- **Reason for selection**: Provides an enterprise-grade PostgreSQL database, instant APIs, and Auth out-of-the-box with a very generous free tier ($0 cost).
- **Alternatives considered and why rejected**: 
  - *Firebase*: Rejected due to NoSQL strictly limiting relational data structures standard in modern platforms, and vendor lock-in risk.
  - *PlanetScale + NextAuth*: Rejected because Supabase provides a unified solution (DB + Auth + Storage) reducing architectural complexity.

### ORM / Database Client: Supabase JS Client
- **Version**: @supabase/supabase-js 2.44.2, @supabase/ssr 0.4.0
- **Documentation URL**: https://supabase.com/docs/reference/javascript/introduction
- **Reason for selection**: Direct, type-safe integration with the database leveraging PostgreSQL Row Level Security instead of relying on a heavy ORM layer.
- **Alternatives considered and why rejected**: 
  - *Prisma ORM*: Rejected because Prisma adds considerable Cold Start latency on edge environments and requires heavy query engines not strictly needed when using Supabase heavily reliant on RLS.

### Caching Strategy: Next.js Native Cache + Cloudflare Edge caching
- **Version**: Next.js 14 Data Cache, Cloudflare CDN
- **Documentation URL**: https://nextjs.org/docs/app/building-your-application/caching
- **Reason for selection**: Maximizes global performance across the Cloudflare edge network without requiring a dedicated Redis instance, sustaining the zero-cost requirement.
- **Alternatives considered and why rejected**: 
  - *Redis / Upstash*: Rejected because it introduces another critical dependency and potential cost layer that is redundant for an MVP leveraging Next.js caching correctly.

### File Storage: Supabase Storage
- **Version**: Supabase Storage
- **Documentation URL**: https://supabase.com/docs/guides/storage
- **Reason for selection**: Deeply integrated with Supabase Auth and database RLS policies. It supports CDN-cached image transformations out-of-the-box on the free tier.
- **Alternatives considered and why rejected**: 
  - *AWS S3*: Rejected because it requires separate billing management and complex IAM configurations, removing the turnkey nature of the asset.

### Email: N/A
- **Status**: Out of scope for MVP as per PRD.

## 4. Environment Variables

The application requires the following environment variables. In Cloudflare Pages, these must be set in the project dashboard.

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR_PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." # Only needed if bypassing RLS occasionally in secure server contexts
```

## 5. NPM Scripts (`package.json`)

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "format": "prettier --write .",
  "supabase:types": "npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts"
}
```

## 6. Dependency Lock Blocks

Note: Next.js handles front-to-back functionality. These exact versions represent the logical separation for the system.

### Frontend Dependencies
```json
"dependencies": {
  "next": "14.2.4",
  "react": "18.3.1",
  "react-dom": "18.3.1",
  "framer-motion": "11.2.12",
  "lucide-react": "0.400.0",
  "zustand": "4.5.4",
  "react-hook-form": "7.52.1",
  "@hookform/resolvers": "3.9.0",
  "zod": "3.23.8",
  "clsx": "2.1.1",
  "tailwind-merge": "2.3.0"
},
"devDependencies": {
  "typescript": "5.5.3",
  "@types/node": "20.14.9",
  "@types/react": "18.3.3",
  "@types/react-dom": "18.3.0",
  "tailwindcss": "3.4.4",
  "postcss": "8.4.39",
  "autoprefixer": "10.4.19",
  "eslint": "8.57.0",
  "eslint-config-next": "14.2.4",
  "prettier": "3.3.2"
}
```

### Backend / Integration Dependencies
```json
"dependencies": {
  "@supabase/supabase-js": "2.44.2",
  "@supabase/ssr": "0.4.0"
}
```

## 7. Security Configuration

- **Row Level Security (RLS)**: Enforced directly on Supabase PostgreSQL. 
  - `SELECT`: Allowed for public/authenticated users based on table context (e.g., public products, user-specific profiles).
  - `INSERT/UPDATE/DELETE`: Strictly authenticated users only based on `auth.uid() = user_id`.
- **Authentication**: Using `@supabase/ssr` to configure cookie-based auth sessions. The Next.js middleware is configured to validate the Supabase Auth cookie on protected routes.
- **CORS**: Supabase handles CORS inherently based on allowed domains set within the Supabase dashboard (must include the deployed Cloudflare Pages URL). Next.js Server Actions and API Routes do not require bespoke CORS tuning because they share the same origin domain.

## 8. Git Branching Strategy & CI/CD Pipeline

- **Branching Strategy (Trunk-Based)**: 
  - `main`: The single source of truth and production branch.
  - `feature/*`, `fix/*`: Ephemeral branches for development. PRs merge directly into `main`.
- **Cloudflare Pages Auto-Deploy**: 
  - Cloudflare Pages is connected directly to the GitHub repository.
  - Pushing to `main` instantly triggers a Cloudflare integration build (`npm run build`) and edge deployment automatically. No bespoke GitHub Actions are needed for deployment, keeping configuration minimal.
- **Supabase Keepalive (GitHub Actions)**:
  - Because Supabase pauses free-tier databases after 1 week of inactivity, a scheduled cron job is configured to prevent pause logic.
  - **File**: `.github/workflows/keepalive.yml`
  - **Trigger**: Runs automatically via cron (e.g., `cron: '0 0 * * 1'`, weekly).
  - **Action**: Performs a lightweight read operation (via `curl` or script to an API route) to simulate database activity, securing the MVP's $0 ongoing maintenance profile without manual intervention.

## 9. Version Upgrade Policy

- **Strict Adherence**: Keep versions locked tightly to the specific versions indicated during the MVP lifecycle.
- **Security Patches**: Only `npm audit fix` for critical vulnerabilities, unless upgrading explicitly breaks the turnkey functionality.
- **Major Frameworks**: Do not upgrade to Next.js 15 or React 19 until they have matured fully in the stable channel and Cloudflare Pages explicitly guarantees first-class Edge integration without breaking changes for current caching topologies.