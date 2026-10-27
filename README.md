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
│   │   └── ui/                 # Accessible Button, Input, Select, Badge, Card, Skeleton, EmptyState, InlineError, ProductImage
│   ├── features/               # Feature domain modules
│   │   ├── home/               # Homepage hero, trust highlights, categories, & featured showcase
│   │   ├── shop/               # Foundation catalog browser with URL search parameter sync
│   │   └── not-found/          # User-friendly 404 page
│   ├── layouts/                # AppShell container with skip-link, header, & footer
│   ├── mock/                   # Deterministic demo fixtures for categories, brands, & products
│   ├── services/               # Data access layer
│   │   ├── catalogService.ts   # CatalogService interface & singleton export
│   │   ├── mockCatalogService.ts # Asynchronous mock service with latency simulation
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
- **Borders & Elevation**: Restrained borders (`border-slate-200`) and subtle shadows (`shadow-xs` / `shadow-sm`) keep focus squarely on product imagery.
- **Accessibility (a11y)**:
  - Skip-to-content keyboard link (`#main-content`).
  - High-contrast focus rings (`focus-visible:ring-emerald-600 focus-visible:ring-offset-2`).
  - Semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`).
  - Form controls with `aria-invalid`, `aria-describedby`, and associated `InlineError`.
  - Mobile menu dialog with ESC-key dismissal and focus restoration.
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
- **Service Contract**: `CatalogService` defines methods (`getProducts`, `getProductBySlug`, `getFeaturedProducts`, `getCategories`, `getBrands`).
- **TanStack Query Ready**: The UI communicates via custom React Query hooks (`useFeaturedProducts`, `useCategories`, `useProducts`), providing built-in caching, background refetching, and structured loading/error states.
- **Swappable Backend (Phase 5 ready)**: An API client or Django/DRF adapter can be swapped behind `src/services/catalogService.ts` without touching React components.

---

## ⚠️ Prototype Scope Boundaries & Limitations

- **Frontend Only**: No real database, authentication service, or payment gateway.
- **Simulated Fixtures**: All products, prices, and inventory levels are demo fixtures, not live retail claims.
- **No Fake Controls in Phase 1**: Per Phase 1 requirements, navigation exposes only working links. Fake account avatars, fake wishlist counters, and non-functional cart controls have been excluded until their respective phases.
- **Notice Bar**: A visible demo disclaimer informs visitors that this is an engineering prototype.

---

## 📋 Phase Roadmap & Progress

- [x] **Phase 1 — Foundation and Design System** *(Completed)*
  - [x] Node v22.13.0 environment verification and Vite 6 setup.
  - [x] Tailwind CSS v4 setup via `@tailwindcss/vite`.
  - [x] Clean directory structure and reusable design tokens.
  - [x] Accessible UI components: `Button`, `Input`, `Select`, `Badge`, `Card`, `Skeleton`, `EmptyState`, `InlineError`, `ProductImage`.
  - [x] Responsive AppShell: logo, working navigation, mobile menu drawer, main area, footer, skip-to-content.
  - [x] Foundation homepage with hero, trust highlights, categories, and async featured products.
  - [x] Useful 404 page with recovery navigation.
  - [x] Typed `Product`, `Category`, `Brand` models with integer poisha monetary storage.
  - [x] Currency formatter utility using `Intl.NumberFormat('en-BD')`.
  - [x] Asynchronous `CatalogService` interface and `MockCatalogService` implementation with TanStack Query hooks.
  - [x] Vitest unit test suite (18 tests passing) and ESLint validation (0 errors).
- [ ] **Phase 2 — Storefront and Product Catalog**
- [ ] **Phase 3 — Cart and Demo Checkout**
- [ ] **Phase 4 — Polish, Testing, and Deployment Preparation**
- [ ] **Phase 5 — Optional Django API Connection**
