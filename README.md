# GadgetBazar — Bangladesh Tech & Gadgets Store Prototype

A scalable, accessible, high-performance tech and gadgets e-commerce frontend prototype tailored for the Bangladesh market. Built with modern React 18, TypeScript, Tailwind CSS v4, TanStack Query v5, Zustand v5, and Lucide React.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18.0.0 or later (v22.13.0 verified)
- **npm**: v9.0.0 or later (v11.16.0 verified)

### Available Scripts
```bash
# Clone or navigate to the repository
cd sakil-ecommerce

# Install dependencies (lockfile committed)
npm install

# Start local Vite development server
npm run dev

# Run Vitest unit & integration behavior test suite
npm test

# Run Playwright end-to-end browser journey tests (Desktop & Mobile 360px)
npm run test:e2e

# Run ESLint validation
npm run lint

# Compile TypeScript and generate optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🧭 Routes & User Journeys

| Route | Purpose | Features |
| :--- | :--- | :--- |
| `/` | **Storefront Homepage** | Focused hero, architecture highlights, department navigation, featured devices, new arrivals, and sample promotional offers. |
| `/shop` | **Full Store Catalog** | Real-time faceted filtering (category, brand, BDT price range, in-stock), search query, sorting, active filter chips, pagination, and direct "Add" purchase controls. |
| `/category/:slug` | **Category Filtered View** | Pre-filtered catalog for departments (Smartphones, Laptops, Audio, Smartwatches, Gaming, Chargers). Unknown slugs render recovery 404 state. |
| `/product/:slug` | **Product Detail Page (PDP)** | Multi-image gallery with thumbnail switcher, interactive quantity stepper, "Add to Cart" button with stock limits, specs table, and related devices. |
| `/cart` | **Shopping Cart** | Editable quantities, remove actions, live inventory clamping, stock reconciliation warnings, BDT subtotal, delivery zone fee calculation, and order total. |
| `/checkout` | **Demo Checkout Form** | Bangladesh mobile phone validator (`013–019` or `+880`), delivery address, regional zone rates (Inside Dhaka ৳60, Outside ৳120), Cash on Delivery simulation, and duplicate-click protection. |
| `/order-success` | **Demo Order Confirmation** | Simulated order reference, timestamp, purchased items snapshot, delivery charge, grand total, and "Continue Shopping" navigation. |
| `*` | **Catch-all 404 Page** | Accessible error screen with clear navigation links back to Home and Shop. |

---

## 💎 Design System & Accessibility Polish

- **Visual Direction**: Crisp white/light-gray background (`bg-slate-50`), dark navy typography (`text-slate-900`) for visual hierarchy and readability, and emerald primary actions (`#059669` / `bg-emerald-600`).
- **Responsive Viewports**: Tested and verified across **mobile (360px)**, **tablet (768px)**, and **desktop (1440px)** without awkward overflow or cramped forms.
- **Accessibility (a11y)**:
  - Skip-to-content keyboard link (`#main-content`).
  - High-contrast focus rings (`focus-visible:ring-emerald-600 focus-visible:ring-offset-2`).
  - Respects user motion preferences (`prefers-reduced-motion: reduce`) by disabling unnecessary animations.
  - Semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<dialog>`).
  - Form controls with `aria-invalid`, `aria-describedby`, and associated `InlineError`.
  - Mobile filter drawer and mobile navigation with ESC-key dismissal and focus restoration.
- **Image Optimization**:
  - Fixed aspect ratio containers (`aspect-square` / `aspect-[4/3]`) to prevent Cumulative Layout Shift (CLS).
  - Lazy loading for below-the-fold media with automatic fallback if an asset fails to load.

---

## 🇧🇩 Bangladesh Context & Currency Handling

1. **Integer Poisha Accounting**:
   - All prices and compare-at prices are stored as integer poisha (`1 BDT = 100 poisha`, e.g., ৳78,500 = `7850000` poisha).
   - Prevents floating-point rounding errors during calculations.
   - Formatted using `Intl.NumberFormat('en-BD')` with Bengali Taka symbol `৳` or `BDT`.

2. **Regional Delivery Rules**:
   - Inside Dhaka: ৳60 (`6,000` integer poisha) • 1–2 business days demo estimate.
   - Outside Dhaka: ৳120 (`12,000` integer poisha) • 3–4 business days demo estimate.
   - Centralized in `src/app/config.ts`.

3. **Bangladesh Phone Validation (`src/utils/phone.ts`)**:
   - Supports 11-digit local format (`013–019`), `+880`, `880`, and hyphenated inputs.
   - Normalizes to international E.164 and clean hyphenated Bangladesh format (`01700-000000`).

---

## 🛒 Cart Architecture & Persistence

- **Zustand State Management**: Identified by stable product ID. Adding an existing item increments its quantity up to `product.stock`.
- **Versioned `localStorage` Persistence**:
  - Persists only product IDs and quantities under key `gb_cart_v1` (`{ version: 1, items: [...] }`).
  - **Never persists calculated totals or prices** — pricing is always freshly derived from catalog data to prevent stale totals or tampering.
  - **Corrupted Storage Recovery**: Invalid JSON or schema mismatches are caught gracefully and reset without application crashes.
  - **Catalog Reconciliation**: Upon cart restoration, if any item is out of stock or has reduced inventory, the quantity is automatically clamped and an accessible notification warning is presented to the user.
- **Privacy & Security Boundaries**:
  - Customer personal details (name, phone, address) are **never saved to localStorage, analytics, or external servers**.
  - Only a non-personal order snapshot (reference code, items snapshot, totals, delivery zone) is kept in temporary `sessionStorage` for page refresh on `/order-success`.
  - **Payment Method**: Only *"Cash on delivery — demo only"* is simulated. Digital gateways (bKash, Nagad, cards) are explicitly noted as future roadmap placeholders. No card credentials, PINs, or OTPs are collected.

---

## 🔍 Development-Only Inspection Utilities

- **Inspect Loading Skeletons**: Append `?dev_delay=3000` to any catalog URL to simulate 3-second latency.
- **Inspect Retryable Error State**: Append `?dev_error=true` to any catalog URL to trigger a network error and verify the interactive *"Retry Request"* button.

---

## 🌐 SEO & Social Sharing Limitations of Client-Rendered SPAs

As a pure client-side single-page application (SPA) rendered by Vite/React in the browser:
1. **Search Engine Indexing**: Modern search engines (Googlebot) execute JavaScript and index client-rendered text, but crawlers that do not run JavaScript will see the fallback shell from `index.html`.
2. **Per-Product Social Cards**: Social media platforms (Facebook, Twitter/X, WhatsApp, LinkedIn) scrape OpenGraph metadata directly from raw HTML without executing JavaScript. Consequently, shared links will display the general store metadata rather than individual product titles and preview images unless server-side rendering (SSR), pre-rendering, or an edge-worker meta-rewriter is configured in a production deployment.

---

## 🚀 Static Deployment Guide

The production build creates pure static assets in `dist/`.

### Deployment Config & SPA Rewrites
- **Netlify / Cloudflare Pages**: Configured via `public/_redirects` (`/* /index.html 200`).
- **Vercel**: Configured via `vercel.json` (`rewrites: [{ "source": "/(.*)", "destination": "/index.html" }]`).

### Deploy to Vercel (Free)
```bash
# Using Vercel CLI
npx vercel
# Settings: Framework: Vite | Output directory: dist | Build command: npm run build
```

### Deploy to Netlify (Free)
```bash
# Using Netlify CLI
npx netlify deploy --prod --dir=dist
```

### Public Client Environment Variables
All client-side environment variables prefixed with `VITE_` (such as `VITE_API_BASE_URL` in Phase 5) are bundled directly into the public JavaScript output and are **visible to anyone inspecting the browser**. Never store private secrets, API secret keys, or database credentials in client `.env` files.

---

## 📋 Comprehensive Phase Progress

- [x] **Phase 1 — Foundation and Design System** *(Completed)*
- [x] **Phase 2 — Storefront and Product Catalog** *(Completed)*
- [x] **Phase 3 — Cart and Demo Checkout** *(Completed)*
- [x] **Phase 4 — Polish, Testing, and Deployment Preparation** *(Completed)*
  - [x] Responsive layout verification across 360px, 768px, and 1440px.
  - [x] Reduced motion preference (`prefers-reduced-motion`) support.
  - [x] Keyboard navigation and high-contrast focus indicators.
  - [x] Dynamic document titles via `useDocumentTitle` across all views.
  - [x] Custom SVG brand favicon (`/favicon.svg`) and OpenGraph / Twitter sharing metadata.
  - [x] SPA fallback routing files (`_redirects`, `vercel.json`).
  - [x] Vitest integration behavior test suite: **56 tests passing** across 10 test files.
  - [x] Playwright browser journey test suite: **8 tests passing** (Desktop Chrome + Mobile Chrome 360px).
  - [x] Zero ESLint errors, zero TypeScript errors, clean production bundle.
- [ ] **Phase 5 — Optional Django API Connection** *(Runs only upon explicit request)*
