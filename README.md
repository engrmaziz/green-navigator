# Green Navigator MVP: Technical Build & Infrastructure

## 1. Project Overview
[cite_start]**Green Navigator** is an ultra-premium B2B SaaS platform engineered for SMB carbon reporting[cite: 1, 78]. [cite_start]The platform automates the end-to-end process of measuring, analyzing, and offsetting carbon footprints by transforming unstructured utility data into actionable environmental insights[cite: 3, 44, 123].

## 2. Technical Stack
* [cite_start]**Framework:** Next.js 15 (App Router) for cutting-edge performance and SEO[cite: 78, 197].
* **Language:** TypeScript for type-safe, scalable development.
* **Styling:** Tailwind CSS V4 & Vanilla CSS.
* **Animations:** Framer Motion (Fluid entrance and micro-interactions).
* **Backend & Database:** Supabase (Auth, PostgreSQL, and Storage).
* [cite_start]**AI Engine:** Gemini 3.1 Flash (OCR & Data Extraction)[cite: 44, 109].

## 3. UI/UX Design System: "Industrial Zen"
The application follows a strictly defined **Cinematic Dark Mode** aesthetic:
* **Palette:** Deep Charcoal (#121212) bases with Emerald (#50C878) and Forest Green accents.
* **Glassmorphism:** High-blur (40px) surfaces with 1px semi-transparent borders for dimensional depth.
* **Bento Grid:** A modular layout system for the dashboard that maximizes whitespace and content focus.
* **Typography:** Bold, modern Sans-Serif scaling for high-impact metric visualization.



## 4. Core Features & App Architecture

### A. Intelligent Onboarding (`/onboarding`)
A high-fidelity flow designed to capture company metadata while providing immediate visual feedback through glassmorphism input tiles.

### B. Authenticated Analytics Dashboard (`/app/dashboard`)
* [cite_start]**Metric Tiles:** Real-time readouts of $CO_2e$ equivalents and extraction statuses[cite: 13, 122].
* **Data Visualization:** Custom Recharts implementation (Area and Donut charts) optimized for Next.js SSR.
* [cite_start]**Document Intelligence:** A split-screen interface allowing users to view original PDF bills (like SNGPL or LESCO) alongside live-extracted AI data[cite: 44, 109].

### C. Regional Calculation Engine (Pakistan Focus)
Green Navigator bypasses generic global emission factors to provide high-accuracy localized results:
* [cite_start]**Electricity (Any DISCO):** Applies a grid-specific factor of **0.425 kg $CO_2e$ / kWh**[cite: 115, 123].
* [cite_start]**Natural Gas (SNGPL/SSGC):** Prioritizes **MMBTU** extraction for energy-content accuracy[cite: 44, 46].
    * **Formula:** $MMBTU \times 53.06 = \text{kg } CO_2e$.
    * [cite_start]**Fallback:** If only **CM** (Cubic Meters) is found, it applies a volumetric factor of **1.94 kg $CO_2e$ / $m^3$**[cite: 44, 57].



## 5. Stability & Performance Benchmarks
* **Hydration Fixes:** Swapped `next/font/google` for standard HTML link tags to prevent networking timeouts.
* **Layout Resilience:** Implemented `minHeight` bounds on Recharts parent containers to prevent layout computation crashes in Next.js Turbopack.
* **Dynamic Loading:** Utilized `next/dynamic` for heavy client-side components to ensure zero-error builds during `npm run build`.

## 6. Implementation Notes
* **Immutable Records:** All processed bills are stored in the `emissions` ledger for auditability.
* [cite_start]**Traceability:** Gemini extracts the `raw_text_found` for every metric to ensure data integrity[cite: 44, 109].

## 7. Contribution Workflow
All project changes, including updates to this `README.md`, should be implemented through a pull request.
