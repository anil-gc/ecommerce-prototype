# GadgetBazar — Bangladesh Tech & Gadgets Store Prototype

A scalable, high-performance tech and gadgets e-commerce frontend prototype tailored for the Bangladesh market. Built with modern React, TypeScript, Tailwind CSS, TanStack Query, and an accessible design system.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18.0.0 or later (v22.13.0 verified)
- **npm**: v9.0.0 or later (v11.16.0 verified)

### Installation & Development
```bash
# Clone or navigate to the repository
cd sakil-ecommerce

# Install dependencies (lockfile committed)
npm install

# Start local Vite development server
npm run dev

# Run unit and component behavior tests
npm test

# Run ESLint validation
npm run lint

# Compile TypeScript and generate production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🧭 Routes & Features (Phase 2 Storefront)

| Route | Purpose | Features |
| :--- | :--- | :--- |
| `/` | **Storefront Homepage** | Focused hero, architecture highlights, department navigation, featured devices, new arrivals, and sample promotional offers. |
| `/shop` | **Full Store Catalog** | Faceted filtering (category, brand, BDT price range, in-stock), search query, sorting, active filter chips, and pagination. |
| `/category/:slug` | **Category Filtered View** | Pre-filtered catalog for departments (Smartphones, Laptops, Audio, Smartwatches, Gaming, Chargers). Unknown slugs render recovery 404 state. |
| `/product/:slug` | **Product Detail Page (PDP)** | Multi-image gallery with thumbnail switcher, specifications table, stock availability, Bangladesh delivery estimate, and related products. |
| `*` | **Catch-all 404 Page** | Accessible error screen with clear navigation links back to Home and Shop. |

---

## 🔍 Development-Only Inspection Utilities

Per Phase 2 requirements, the catalog service provides transparent, non-intrusive URL parameters for QA and reviewing loading and error states without altering deterministic production behavior:

1. **Simulate Network Latency / Inspect Loading Skeletons**:
   - Add `?dev_delay=3000` to any catalog URL (e.g., `http://localhost:5173/shop?dev_delay=3000`).
   - The mock service will artificially hold the query for 3 seconds, letting you inspect skeleton loaders and layout stability.
2. **Simulate Network Failure / Inspect Retryable Error States**:
   - Add `?dev_error=true` to any catalog URL (e.g., `http://localhost:5173/shop?dev_error=true`).
   - The catalog query triggers a recoverable error view equipped with an interactive **"Retry Request"** button.

---

## 🏛️ Architecture & Project Structure

The project maintains clear layer boundaries, avoiding unnecessary abstractions while ensuring strong isolation between UI components, state management, and data access.

```
sakil-ecommerce/
├── src/
│   ├── app/                    # Central application configuration & bootstrap
│   │   ├── config.ts           # Centralized brand, navigation, contact, & delivery rules
│   │   ├── providers.tsx       # TanStack Query & React providers
│   │   ├── router.tsx          # React Router route definitions
│   │   └── tokens.ts           # Reusable design tokens (colors, radii, focus rings)
│   ├── components/             # Reusable UI & navigation components
│   │   ├── feedback/           # DemoNotice banner & status feedback
│   │   ├── navigation/         # Navbar, MobileMenu, Footer, SkipToContent
│   │   └── ui/                 # Accessible Button, Input, Select, Badge, Card, Skeleton, EmptyState, InlineError, ProductImage, ProductCard
│   ├── features/               # Feature domain modules
│   │   ├── home/               # Homepage hero, trust highlights, categories, featured, new arrivals, offers
│   │   ├── shop/               # Store catalog with FilterSidebar, MobileFilterDrawer, and pagination
│   │   ├── product/            # ProductDetailPage with gallery, specs, and related devices
│   │   └── not-found/          # User-friendly 404 page
│   ├── layouts/                # AppShell container with skip-link, header, & footer
│   ├── mock/                   # 27 sample products across 6 departments and 8 brands
│   ├── services/               # Data access layer
│   │   ├── catalogService.ts   # CatalogService interface & singleton export
│   │   ├── mockCatalogService.ts # Asynchronous mock service with latency simulation & dev overrides
│   │   └── useCatalog.ts       # TanStack Query hooks consuming CatalogService
│   ├── test/                   # Vitest setup & testing utilities
│   ├── types/                  # Typed domain models (Product, Category, Brand, QueryParams)
│   ├── utils/                  # Currency (poisha/BDT), classnames (cn), helpers
│   ├── index.css               # Tailwind CSS v4 entry point & base styles
│   └── main.tsx                # Application mounting entry point
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
└── eslint.config.js
```

---

## 💎 Design System & Visual Identity

- **Canvas & Typography**: White/light-gray background (`bg-slate-50`), dark navy typography (`text-slate-900`) for visual hierarchy and readability.
- **Primary Actions**: Emerald (`#059669` / `bg-emerald-600`), representing tech, growth, and trust in Bangladesh.
- **Borders & Elevation**: Restrained borders (`border-slate-200`) and subtle shadows (`shadow-2xs` / `shadow-xs`) keep focus squarely on product imagery.
- **Accessibility (a11y)**:
  - Skip-to-content keyboard link (`#main-content`).
  - High-contrast focus rings (`focus-visible:ring-emerald-600 focus-visible:ring-offset-2`).
  - Semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`).
  - Form controls with `aria-invalid`, `aria-describedby`, and associated `InlineError`.
  - Mobile filter drawer and mobile navigation with ESC-key dismissal and focus restoration.
- **Responsive Layout**: Designed mobile-first, tested and verified across mobile (360px), tablet (768px), and desktop (1440px).

---

## 🇧🇩 Bangladesh Context & Currency Handling

1. **Integer Poisha Accounting**:
   - All prices and compare-at prices are stored as integer poisha (`1 BDT = 100 poisha`, e.g., ৳78,500 = `7850000` poisha).
   - Prevents floating-point rounding errors during calculations.
   - Formatted using `Intl.NumberFormat('en-BD')` with Bengali Taka symbol `৳` or `BDT`.

2. **Regional Delivery Rules**:
   - Inside Dhaka: ৳60 (`6000` poisha)
   - Outside Dhaka: ৳120 (`12000` poisha)
   - Centralized in `src/app/config.ts`.

3. **Editable Placeholder Brand**:
   - Default: `GadgetBazar`. Brand name, support phone (`+880 1700-000000`), support email, and Gulshan-1 Dhaka address are centralized in `src/app/config.ts`.

---

## 🔌 Asynchronous Service Boundary

- **Decoupled from Fixtures**: Page components and UI widgets never import mock fixture files directly.
- **Service Contract**: `CatalogService` defines methods (`getProducts`, `getProductBySlug`, `getFeaturedProducts`, `getNewArrivals`, `getOffers`, `getRelatedProducts`, `getCategories`, `getBrands`).
- **TanStack Query Ready**: The UI communicates via custom React Query hooks (`useFeaturedProducts`, `useNewArrivals`, `useOffers`, `useRelatedProducts`, `useCategories`, `useProducts`), providing built-in caching, background refetching, and structured loading/error states.
- **Swappable Backend (Phase 5 ready)**: An API client or Django/DRF adapter can be swapped behind `src/services/catalogService.ts` without touching React components.

---

## ⚠️ Prototype Scope Boundaries & Limitations

- **Frontend Only**: No real database, authentication service, or payment gateway.
- **Simulated Fixtures**: All products, prices, and inventory levels are demo fixtures, not live retail claims.
- **Phase 2 Scope Boundary**: Purchasing controls, cart additions, quantity modifiers, and checkout belong to Phase 3. Products visibly display real-time availability without inactive or non-functional purchase buttons.
- **Notice Bar**: A visible demo disclaimer informs visitors that this is an engineering prototype.

---

## 📋 Phase Roadmap & Progress

- [x] **Phase 1 — Foundation and Design System** *(Completed)*
- [x] **Phase 2 — Storefront and Product Catalog** *(Completed)*
  - [x] Created 27 consistent sample products across all 6 departments and 8 brands with both in-stock and out-of-stock items.
  - [x] Responsive product cards with fixed aspect ratios and image error fallback.
  - [x] Complete homepage with focused hero, category navigation, featured devices, new arrivals, and fixture-derived offers.
  - [x] Full route implementation (`/`, `/shop`, `/category/:slug`, `/product/:slug`, 404).
  - [x] Faceted catalog filtering (category, brand, BDT price range, in-stock status) working synchronously with search and sorting.
  - [x] URL Search parameter synchronization (browser history, refresh, deep-linking, malformed parameter handling).
  - [x] Accessible mobile filter drawer with active filter counter badge, apply, and reset actions.
  - [x] Product detail page with image gallery, specs table, availability notice, delivery estimate, and related products.
  - [x] Documented dev inspection overrides (`?dev_delay=3000`, `?dev_error=true`).
  - [x] Automated test suite expanded to 24 tests; 0 ESLint errors; production build verified.
- [ ] **Phase 3 — Cart and Demo Checkout**
- [ ] **Phase 4 — Polish, Testing, and Deployment Preparation**
- [ ] **Phase 5 — Optional Django API Connection**
