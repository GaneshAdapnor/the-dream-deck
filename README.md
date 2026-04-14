<div align="center">

# The Dream Deck

### Interactive Sales Platform for American Dream — East Rutherford, NJ

*A cinematic, browser-based sales tool that replaces fragmented pitch decks with a single, immersive destination experience.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-C9973A?style=for-the-badge)](https://the-dream-deck.vercel.app)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/ganeshadapnors-projects/the-dream-deck)
[![GitHub](https://img.shields.io/badge/GitHub-the--dream--deck-181717?style=for-the-badge&logo=github)](https://github.com/GaneshAdapnor/the-dream-deck)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![GSAP](https://img.shields.io/badge/GSAP-GreenSock-88CE02?style=for-the-badge)](https://greensock.com)

---

</div>

## The Problem This Solves

Today, pitching a property like American Dream means manually pulling up a YouTube video, jumping between PDFs, opening a separate demographics spreadsheet, and verbally narrating what prospects should be seeing.

**That's broken.**

This tool eliminates all of that friction. It's a self-contained, interactive sales experience that works on a live screen-shared call *or* as a standalone link a prospect can explore alone — no salesperson required.

---

## Live Experience

> The deck is structured around 8 non-linear sections. The prospect controls their journey — nothing is linear, nothing is forced.

| # | Section | Business Purpose |
|---|---|---|
| 1 | **Hero** | Cinematic opening — immediate scale and energy within 3 seconds |
| 2 | **The Property** | Location, catchment, scale — data made visual |
| 3 | **Retail** | Leasing tiers, tenant roster, inquiry CTA |
| 4 | **Luxury** | Elevated wing positioning, luxury brand adjacency |
| 5 | **Dining & Lifestyle** | F&B as a destination, not an afterthought |
| 6 | **Entertainment** | The 4 category-defining attractions — horizontal scroll experience |
| 7 | **Events & Platform** | Concert, activation, convention, and venue capabilities |
| 8 | **Partner With Us** | 3-path inquiry form: Leasing · Events · Sponsorship |

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | React 19 + Vite 6 | Fast dev/build cycle, modern component architecture |
| **Language** | TypeScript 5 | Type-safe props, data contracts, zero runtime surprises |
| **Styling** | Tailwind CSS 3 | Custom design token system, utility-first, no CSS drift |
| **Animation** | GSAP + ScrollTrigger | Industry-standard for premium web animation — used by Apple, Disney |
| **Smooth Scroll** | Lenis | Physics-based scrolling wired directly to GSAP ticker |
| **Transitions** | Framer Motion | AnimatePresence for section reveals and modal transitions |
| **Build** | Vite with manual chunk splitting | Vendor chunks load in parallel — no single large bundle |

---

## Key Interactions

### Preloader / Splash Screen
Letter-by-letter character reveal of "American Dream" with animated gold grid and corner marks — sets the cinematic tone before the page loads.

### Custom Magnetic Cursor
A gold dot + ring that follows the mouse with GSAP lerp-based lag. Expands and displays contextual labels ("Leasing", "Play", "Inquire") on hover. Native cursor hidden on pointer devices.

### Hero — GSAP Text Reveal
Staggered timeline: gold rule → eyebrow → character-split headline (each letter individually animated) → subtitle → pill tags → CTAs. YouTube video background (fullscreen iframe cover technique) plays behind everything.

### Entertainment — GSAP Horizontal Scroll
The entertainment section pins in place while 4 full-viewport attraction cards scroll horizontally. Each card has its own image parallax effect (containerAnimation). The most technically demanding interaction in the project.

### Animated Stat Counters
Pure GSAP tweens on `data-target` elements — no React state updates during animation. Counters start when the section enters the viewport, using `easeOutQuart` for a premium feel.

### 3D Tilt Cards
Mouse-position-driven `perspective + rotateX/Y` transform on event cards. Resets smoothly on mouse leave via CSS transition.

### Scroll Progress Bar
Gold line grows along the sidebar rail (desktop) and top edge (mobile), driven via DOM ref — no React state, no re-renders.

---

## Architecture

```
src/
├── components/
│   ├── Cursor.tsx              # Custom magnetic cursor (GSAP-powered)
│   ├── Preloader.tsx           # Cinematic splash screen
│   ├── Navigation.tsx          # Non-linear sidebar + mobile nav + progress bar
│   ├── Hero.tsx                # GSAP text reveal + YouTube video background
│   ├── TiltCard.tsx            # Reusable 3D perspective tilt wrapper
│   └── sections/
│       ├── Overview.tsx        # Animated stat counters + location strip
│       ├── Retail.tsx          # Leasing tiers + brand marquee
│       ├── Luxury.tsx          # Premium wing + brand grid
│       ├── Dining.tsx          # Dining concepts grid
│       ├── Entertainment.tsx   # GSAP horizontal scroll (pinned)
│       ├── Events.tsx          # Event types + past highlights + venue modules
│       └── Contact.tsx         # Multi-path inquiry form
├── data/
│   └── content.ts              # Single source of truth for all copy + config
├── hooks/
│   ├── useCountUp.ts           # Animated number counter hook
│   └── useActiveSection.ts     # IntersectionObserver nav state
└── index.css                   # Tailwind layers + global design tokens + CSS classes
```

**Adding a new section takes 3 steps:**
1. Add to `NAV_ITEMS` in `content.ts`
2. Create `src/components/sections/NewSection.tsx`
3. Import and render in `App.tsx`

No structural changes required.

---

## Performance

| Chunk | Size (gzip) |
|---|---|
| App logic | **14 kB** |
| GSAP | 44 kB |
| Framer Motion | 43 kB |
| React + ReactDOM | 58 kB |
| Lenis | 5 kB |
| **Total** | **~165 kB** |

- Vendor chunks load in parallel (manual chunk splitting via `vite.config.ts`)
- All below-fold images use native `loading="lazy"`
- YouTube video is facade-loaded (thumbnail → iframe on click, not on page load)
- GSAP animations are scroll-triggered, not load-triggered
- Lenis smooth scroll adds zero layout cost

---

## Setup & Running Locally

```bash
# 1. Clone
git clone https://github.com/GaneshAdapnor/the-dream-deck.git
cd the-dream-deck

# 2. Install
npm install

# 3. Run
npm run dev
```

Open **http://localhost:5173**

```bash
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

---

## Deploy

**Vercel (recommended — zero config)**
```bash
npx vercel --prod
```

**Netlify**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
```

---

## Design Decisions

### Why American Dream?
- Most ambitious mixed-use property in North America — DreamWorks Water Park (largest indoor waterpark in Western Hemisphere), Nickelodeon Universe (largest indoor theme park in Western Hemisphere), Big SNOW (only indoor real-snow ski slope in North America)
- NYC metro proximity — largest consumer catchment on earth (40M+ within 1 hour)
- Adjacent to MetLife Stadium — events and sports crossover narrative
- Opened 2019–2021 — "future of retail" story is still being written

### Visual Language
- **Dark luxury palette** (`#08090A` base, `#C9973A` gold) — Apple, Tesla, Saint Laurent as reference points
- **Cormorant Garamond** — editorial, high-fashion display type
- **Inter** — clean, readable body and UI text
- Gold shimmer text on hero headlines — premium signal without gimmick
- Every section stays dark — the immersive environment never breaks

### Product Thinking
- **Non-linear navigation** — the deck works as a standalone prospect tool, not just a screen-share
- **3 CTA paths** — Leasing, Events, Sponsorship all lead to tailored inquiry forms
- **Content in `content.ts`** — a sales team or CMS can update stats, copy, and tenants without touching components

---

## AI Tools Used

| Tool | Usage |
|---|---|
| **Claude (Anthropic)** | Architecture planning, all React/TypeScript/CSS components, GSAP animation design, content strategy, copywriting, and performance optimization |
| **GSAP (GreenSock)** | ScrollTrigger horizontal pinning, character-split text reveals, counter animations, cursor physics |
| **Unsplash** | Placeholder photography — to be replaced with official American Dream assets or AI-generated property-specific imagery |
| **Midjourney / DALL·E** | Intended for AI-generated hero renderings and attraction visuals not publicly available |

---

## What I'd Build Next

| Priority | Feature |
|---|---|
| 🔴 High | **Real video background** — Official American Dream YouTube promo as autoplaying muted hero |
| 🔴 High | **AI-generated visuals** — Midjourney renderings of each attraction to replace stock imagery |
| 🟡 Medium | **Interactive floor plan** — Clickable leasing map filterable by zone, category, sq ft |
| 🟡 Medium | **Sponsorship module** — Tiered partner packages with reach data and a rate card |
| 🟡 Medium | **CMS integration** — Sanity or Contentful so sales team owns copy without a developer |
| 🟢 Low | **Prospect analytics** — PostHog events to surface which sections drive the most engagement |
| 🟢 Low | **Catchment map** — D3/Mapbox visualization of 1-hour drive-time population density |

---

## Project Brief

Built as a response to the following brief:

> *"Build the tool that replaces [the fragmented pitch process]. A cross between a high-end pitch deck, a luxury brand website, and an immersive destination experience — all in one. The visual polish of a luxury brand and the interactivity of a modern web experience."*

---

<div align="center">

Built by **Ganesh** · April 2026

*American Dream · East Rutherford, NJ · Gateway to New York City*

</div>
