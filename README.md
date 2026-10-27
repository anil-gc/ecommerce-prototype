# GadgetBazar — Bangladesh Tech & Gadgets Store Prototype

A scalable, high-performance tech and gadgets e-commerce frontend prototype tailored for the Bangladesh market. Built with modern React, TypeScript, Tailwind CSS, TanStack Query, Zustand, and an accessible design system.

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

## 🧭 Routes & Features (Phase 3 Cart & Demo Checkout)

| Route | Purpose | Features |
| :--- | :--- | :--- |
| `/` | **Storefront Homepage** | Focused hero, architecture highlights, department navigation, featured devices, new arrivals, and sample promotional offers. |
| `/shop` | **Full Store Catalog** | Faceted filtering (category, brand, BDT price range, in-stock), search query, sorting, active filter chips, pagination, and direct "Add" purchase controls. |
| `/category/:slug` | **Category Filtered View** | Pre-filtered catalog for departments (Smartphones, Laptops, Audio, Smartwatches, Gaming, Chargers). |
| `/product/:slug` | **Product Detail Page (PDP)** | Multi-image gallery, interactive quantity stepper, "Add to Cart" button with stock limits, specs table, and related devices. |
| `/cart` | **Shopping Cart** | Editable quantities, remove actions, live inventory clamping, stock reconciliation warnings, BDT subtotal, delivery zone fee calculation, and order total. |
| `/checkout` | **Demo Checkout Form** | Bangladesh mobile phone validator (`013–019` or `+880`), delivery address, regional zone rates (Inside Dhaka ৳60, Outside ৳120), Cash on Delivery simulation, and duplicate-click protection. |
| `/order-success` | **Demo Order Confirmation** | Simulated order reference, timestamp, purchased items snapshot, delivery charge, grand total, and "Continue Shopping" navigation. |
| `*` | **Catch-all 404 Page** | Accessible error screen with clear navigation links back to Home and Shop. |

---

## 🛒 Cart Architecture & Persistence Rules

1. **Zustand State Management**:
   - Cart lines identified by stable product ID. Adding an existing product increments quantity up to available mock stock.
   - Rejects quantities exceeding mock stock. Adding out-of-stock items is disabled.
2. **Versioned `localStorage` Persistence**:
   - Persists only product IDs and quantities under key `gb_cart_v1` (`{ version: 1, items: [...] }`).
   - **Never persists calculated totals or prices** — pricing is always freshly derived from catalog data to prevent stale totals or tampering.
   - **Corrupted Storage Recovery**: Invalid JSON or schema mismatches are caught gracefully and reset without application crashes.
   - **Catalog Reconciliation**: Upon cart restoration, if any item is out of stock or has reduced inventory, the quantity is automatically clamped and an accessible notification warning is presented to the user.
3. **Accessible Header Cart Badge & Notifications**:
   - Real-time cart badge in header reflecting total item count.
   - Accessible feedback toast (`role="status"`, `aria-live="polite"`) confirming additions with a quick link to `/cart`.

---

## 📦 Bangladesh Regional Delivery & Demo Checkout

1. **Simulated Delivery Charges**:
   - **Inside Dhaka**: ৳60 (`6,000` integer poisha) • 1–2 business days demo estimate.
   - **Outside Dhaka**: ৳120 (`12,000` integer poisha) • 3–4 business days demo estimate.
2. **Bangladesh Phone Validation (`src/utils/phone.ts`)**:
   - Validates 11-digit local mobile numbers (`013–019`), `+880`, `880`, and hyphenated inputs.
   - Normalizes to international E.164 and clean hyphenated Bangladesh format (`01700-000000`).
3. **Privacy & Security Boundaries**:
   - **No Real Transactions**: Prominently disclosed: *"Demo checkout — use sample details. No order will be placed and no payment will be collected."*
   - **No Personal Data Stored**: Customer personal data (name, phone, address) is **never saved to localStorage, analytics, or external servers**.
   - Only a non-personal order snapshot (reference code, items snapshot, totals, delivery zone) is kept in temporary `sessionStorage` for page refresh on `/order-success`.
   - **Payment Method**: Only *"Cash on delivery — demo only"* is simulated. Digital gateways (bKash, Nagad, cards) are explicitly noted as future roadmap placeholders. No card credentials, PINs, or OTPs are collected.

---

## 🔍 Development-Only Inspection Utilities

- **Inspect Loading Skeletons**: Append `?dev_delay=3000` to any catalog URL to simulate 3-second latency.
- **Inspect Retryable Error State**: Append `?dev_error=true` to any catalog URL to trigger a network error and verify the interactive *"Retry Request"* button.

---

## 📋 Phase Roadmap & Progress

- [x] **Phase 1 — Foundation and Design System** *(Completed)*
- [x] **Phase 2 — Storefront and Product Catalog** *(Completed)*
- [x] **Phase 3 — Cart and Demo Checkout** *(Completed)*
  - [x] Working purchase controls on product cards and product detail page.
  - [x] Zustand cart store with add, remove, change quantity, and clear actions.
  - [x] Real-time stock limit checks and out-of-stock disablement.
  - [x] Header cart badge with total item quantity and accessible confirmation toasts.
  - [x] Full `/cart` page with editable quantities, line totals, delivery estimator, and empty cart state.
  - [x] Versioned, validated `localStorage` persistence with corrupted storage recovery.
  - [x] Catalog reconciliation for removed products and reduced stock.
  - [x] Full `/checkout` form with Bangladesh phone normalization and delivery zone selection.
  - [x] Demo order confirmation flow (`/order-success`) with non-personal sessionStorage snapshots.
  - [x] Automated test suite expanded to 44 tests across 7 test files (100% passing).
- [ ] **Phase 4 — Polish, Testing, and Deployment Preparation**
- [ ] **Phase 5 — Optional Django API Connection**
