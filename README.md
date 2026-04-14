# American Dream — Interactive Sales Deck

A world-class, fully interactive browser-based sales tool for **American Dream** (East Rutherford, NJ) — the Western Hemisphere's largest mixed-use entertainment and retail destination. Built for a commercial sales team pitching prospective tenants, sponsors, and event partners.

**Live Demo:** _Deploy to Vercel/Netlify and add URL here_

---

## What This Is

A purpose-built sales experience that replaces the fragmented "YouTube + PDF + spreadsheet" pitch process with a single, cinematic, self-contained web application. It works equally well screen-shared on a live sales call or sent as a standalone link.

### Sections (Non-Linear Navigation)

| Section | Purpose |
|---|---|
| **Hero** | Cinematic opener — immediate impact, brand identity, 3 CTA paths |
| **The Property** | Animated stats, location data, scale, catchment area |
| **Retail** | Leasing tiers, featured tenants, brand marquee |
| **Luxury** | Premium wing positioning, luxury tenant roster |
| **Dining & Lifestyle** | F&B portfolio, dining concepts, F&B leasing CTA |
| **Entertainment** | Interactive attraction switcher (DreamWorks, Nickelodeon, Big SNOW, Ice Rink) |
| **Events & Platform** | Event types, past highlights, venue specs, performing arts + expo callouts |
| **Partner With Us** | Multi-path inquiry form (Leasing / Events / Sponsorship) |

---

## Tech Stack

| Tool | Purpose |
|---|---|
| **Vite 6 + React 19** | Fast build tooling, component architecture |
| **TypeScript** | Type-safe components and data contracts |
| **Tailwind CSS 3** | Utility-first styling with custom design tokens |
| **Framer Motion** | Scroll-triggered reveals, page-level animations, AnimatePresence transitions |
| **react-intersection-observer** | Efficient scroll-based section detection |

---

## Setup

```bash
# Clone and install
git clone <repo-url>
cd american-dream-sales-deck
npm install

# Development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Or connect your GitHub repo to Vercel — it detects Vite automatically, no config needed.

### Deploy to Netlify

Add a `netlify.toml` at the root:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

---

## Replacing the Hero Video

In `src/components/Hero.tsx`, update the `HERO_VIDEO_ID` constant to the official American Dream YouTube video ID:

```ts
const HERO_VIDEO_ID = 'YOUR_VIDEO_ID_HERE'
```

The video loads on-demand (facade pattern) — clicking "Watch the Story" injects the iframe. This preserves the 90+ Lighthouse score.

---

## Architecture: Expandable by Design

```
src/
├── components/
│   ├── Navigation.tsx          # Non-linear sidebar nav + mobile menu
│   ├── Hero.tsx                # Cinematic opener with image carousel + video modal
│   └── sections/               # One file per section — trivial to add more
│       ├── Overview.tsx
│       ├── Retail.tsx
│       ├── Luxury.tsx
│       ├── Dining.tsx
│       ├── Entertainment.tsx
│       ├── Events.tsx
│       └── Contact.tsx
├── data/
│   └── content.ts              # All copy, stats, and config in one place
├── hooks/
│   ├── useCountUp.ts           # Animated number counter
│   └── useActiveSection.ts     # IntersectionObserver-based nav state
└── index.css                   # Tailwind layers + global design tokens
```

**To add a new module** (e.g., a Sponsorship sub-section):

1. Add entry to `NAV_ITEMS` in `content.ts`
2. Create `src/components/sections/Sponsorship.tsx`
3. Import and render `<Sponsorship />` in `App.tsx`

No architectural changes required.

---

## Design Decisions

### Property: American Dream (East Rutherford, NJ)

Chosen for:
- Most ambitious attractions portfolio in North America (DreamWorks Water Park, Nickelodeon Universe, Big SNOW — all "only/largest in Western Hemisphere" superlatives)
- NYC metro proximity — largest consumer catchment on earth
- Brand new (2019–2021) — compelling "future of retail" narrative
- Adjacent to MetLife Stadium — events/sports crossover story

### Visual Language

- **Dark luxury palette** (`#08090A` base, `#C9973A` gold) — inspired by Apple, Tesla, Saint Laurent
- **Cormorant Garamond** for display type — editorial, fashion-forward
- **Inter** for body/UI — clean, modern, readable
- Gold shimmer text effect on key headlines — conveys premium without gimmick
- No white backgrounds — every section maintains the immersive dark environment

### Performance Strategy

- Hero video uses facade pattern (thumbnail → iframe on click) — not autoplay on load
- Images use native `loading="lazy"` on all below-fold assets
- Ken Burns effect is pure CSS animation — zero JS overhead
- Framer Motion animations are scroll-triggered, not load-triggered
- Bundle: **113 kB gzipped** (Framer Motion is the largest dependency at ~50 kB)

### Non-Linear Navigation

Left sidebar on desktop, slide-down menu on mobile. `IntersectionObserver` tracks the active section in real time. Any section is one click away at all times — the user is never forced through a linear sequence.

---

## AI Tools Used

| Tool | How It Was Used |
|---|---|
| **Claude (Anthropic)** | Full application architecture, all React/TypeScript components, Tailwind config, design system, content strategy, and copywriting |
| **Midjourney / DALL·E** | Would generate property-specific renderings, luxury interior visuals, and hero imagery (currently using Unsplash placeholders for speed) |
| **Unsplash** | Placeholder photography across all sections — to be replaced with official American Dream assets and AI-generated imagery |

---

## What I'd Improve With More Time

1. **Real video assets** — Embed the official American Dream promo as an autoplaying muted hero background, replacing the static image carousel
2. **AI-generated hero imagery** — Midjourney renderings of the property's attractions to replace stock photography
3. **Interactive catchment map** — D3 or Mapbox visualization showing 1-hour drive-time population density around the property
4. **Leasing sub-module** — Clickable floor plan with available space filterable by zone, category, and square footage
5. **Sponsorship module** — Tiered partner packages with reach data, activation examples, and a rate card
6. **GSAP ScrollTrigger** — More complex parallax and text-split reveal effects beyond Framer Motion's capabilities
7. **CMS integration** — Move `content.ts` to Sanity or Contentful so the sales team can update stats and copy without a developer
8. **Analytics** — PostHog event tracking to surface which sections prospects engage with most, informing sales follow-up

---

## Content Note

All statistics and tenant references reflect publicly available information about American Dream as of 2024–2025. Contact and inquiry information is illustrative — update with real team contacts before deploying to prospects.
