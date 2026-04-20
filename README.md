<div align="center">

# The Dream Deck

### Interactive Sales Deck for American Dream — East Rutherford, NJ

*A cinematic, slide-based sales presentation built for the browser. 8 discrete full-screen slides navigated like a Digideck — click, keyboard, or sidebar — not a scrollable website.*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![GSAP](https://img.shields.io/badge/GSAP-GreenSock-88CE02?style=for-the-badge)](https://greensock.com)

---

</div>

## What This Is

A browser-based sales deck that replaces fragmented pitch materials (PDFs, YouTube links, spreadsheets) with a single, immersive, self-contained experience.

It works equally well:
- **Screen-shared on a sales call** — the presenter controls the deck
- **Sent as a standalone link** — the prospect explores at their own pace
- **Presented fullscreen** — hit F11 for a true presentation mode

---

## Running Locally

### Prerequisites

- **Node.js 18+** — check with `node -v`
- **npm 9+** — check with `npm -v`

### 1. Install dependencies

```bash
cd american-dream-sales-deck
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

The dev server supports hot module replacement — edits appear instantly without a full reload.

### 3. Build for production

```bash
npm run build
```

Runs TypeScript type-checking first, then bundles everything into `dist/`. Zero warnings = clean build.

### 4. Preview the production build locally

```bash
npm run preview
```

Serves `dist/` on **[http://localhost:4173](http://localhost:4173)**. Use this to verify the production bundle before deploying — it behaves identically to a deployed environment.

### Other commands

```bash
npm run lint    # ESLint with TypeScript rules
```

---

## Navigating the Deck

The deck behaves like a presentation, not a website. There is no continuous scroll.

| Action | Result |
|---|---|
| Click a slide name in the left sidebar | Jump directly to that slide |
| `→` or `↓` arrow key | Advance to next slide |
| `←` or `↑` arrow key | Go to previous slide |
| **Prev / Next** buttons (sidebar, desktop) | Step through slides one at a time |
| **Prev / Next** bar (bottom, mobile) | Step through slides one at a time |
| Hamburger menu icon (mobile) | Open full slide list |
| **Inquire Now** button (any slide or sidebar) | Jump directly to the Contact slide |

> Arrow keys are automatically disabled when a form field (input, textarea, select) is focused, so users can type freely on the Contact slide without accidentally changing slides.

---

## The 8 Slides

| # | Slide | What It Contains |
|---|---|---|
| 01 | **Home** | YouTube video background, animated character-split headline, stat pills, CTAs |
| 02 | **The Property** | Animated stat counters, location strip (distance to landmarks), photo grid |
| 03 | **Retail** | 4 leasing tiers (Flagship / Mid-Tier / Pop-Up / F&B), brand marquee, retail imagery |
| 04 | **Luxury** | Split-layout with imagery, luxury brand grid, 3 differentiator cards |
| 05 | **Dining** | Hero dining image, 6-concept photo grid, dining stats, F&B leasing CTA |
| 06 | **Entertainment** | Full-screen internal card carousel for 4 attractions (see below) |
| 07 | **Events** | Event type grid, past highlights table, venue specs, performing arts + expo images |
| 08 | **Partner With Us** | 3-path inquiry form: Retail Leasing · Event Booking · Brand Partnership |

### Entertainment slide — internal carousel

The Entertainment slide has its own mini-carousel for the 4 category-defining attractions:

1. DreamWorks Water Park — Western Hemisphere's largest indoor water park
2. Nickelodeon Universe — Western Hemisphere's largest indoor theme park
3. Big SNOW — North America's only indoor real-snow ski slope
4. NHL Ice Rink — Professional-grade ice entertainment

Use the `←` / `→` arrow buttons or the dot indicators **within the slide** to move between attraction cards. The deck-level keyboard arrows still navigate to the previous or next slide from anywhere.

---

## Project Structure

```
american-dream-sales-deck/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Cursor.tsx              # Custom magnetic cursor (desktop only)
│   │   ├── DeckNav.tsx             # Sidebar nav + mobile top bar + mobile bottom bar
│   │   ├── Hero.tsx                # Slide 01 — GSAP text reveal, video background
│   │   ├── Preloader.tsx           # Cinematic splash screen shown on first load
│   │   ├── TiltCard.tsx            # Reusable 3D perspective tilt card wrapper
│   │   └── sections/
│   │       ├── Overview.tsx        # Slide 02 — stat counters, location strip
│   │       ├── Retail.tsx          # Slide 03 — leasing tiers, brand marquee
│   │       ├── Luxury.tsx          # Slide 04 — brand grid, differentiators
│   │       ├── Dining.tsx          # Slide 05 — concept grid, F&B CTA
│   │       ├── Entertainment.tsx   # Slide 06 — full-screen attraction carousel
│   │       ├── Events.tsx          # Slide 07 — event types, highlights, specs
│   │       └── Contact.tsx         # Slide 08 — multi-path inquiry form
│   ├── context/
│   │   └── DeckContext.ts          # useDeck() — goToSlide, current index, total
│   ├── data/
│   │   └── content.ts              # Single source of truth for all copy and data
│   ├── hooks/
│   │   ├── useActiveSection.ts
│   │   └── useCountUp.ts
│   ├── App.tsx                     # Slide deck controller — AnimatePresence transitions
│   ├── App.css
│   ├── index.css                   # Tailwind layers + global styles + design tokens
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | React 19 + TypeScript 6 | Component architecture, type safety |
| Build tool | Vite 8 | Dev server with HMR, production bundler |
| Styling | Tailwind CSS 3 | Custom design token system, utility classes |
| Slide transitions | Framer Motion 12 | `AnimatePresence` — direction-aware fade/slide between deck pages |
| Entrance animations | GSAP 3 | Character-split text reveals, stat counter tweens, stagger sequences |
| Scroll-in animations | react-intersection-observer | Trigger animations when slide content enters the viewport |

---

## Key Interactions

### Preloader
Character-by-character reveal of "American Dream" with an animated gold grid and corner marks. Shown once on first load, then slides away.

### Custom cursor (desktop)
A gold dot + ring that follows the mouse with GSAP physics-based lag. Expands and shows a contextual label ("Leasing", "Play", "Inquire") when hovering interactive elements. Native cursor is hidden on pointer devices.

### Hero text reveal
Staggered GSAP timeline: gold rule → eyebrow → each letter of the headline animates up individually → subtitle → pill tags → CTAs. Runs once on slide mount.

### Animated stat counters (The Property slide)
GSAP tweens on `data-target` DOM attributes — no React state updates during animation. Counter runs from 0 to the target value with an ease-out curve when the slide mounts.

### Entertainment carousel
Full-screen card per attraction. Framer Motion `AnimatePresence` handles the card-to-card transition (direction-aware). Prev/next buttons and dot indicators are rendered within the slide.

### 3D tilt cards (Events slide)
Mouse-position-driven `perspective + rotateX/Y` transform on the `TiltCard` wrapper. Resets smoothly on mouse leave via CSS transition.

### Deck transitions
`AnimatePresence` with `mode="wait"` wraps each slide. Transitions are direction-aware: advancing slides in from the right, going back slides in from the left. Duration: 420ms.

---

## Customising Content

### Update copy, stats, and brand lists

Everything lives in one file — no component edits needed for content changes:

```
src/data/content.ts
```

- `STATS` — the 4 animated counters on The Property slide
- `ENTERTAINMENT_CARDS` — the 4 attraction cards
- `LUXURY_BRANDS` — the brand grid on the Luxury slide
- `EVENT_TYPES` — the 6 event type cards
- `DINING_CONCEPTS` — the 6 dining concept photos
- `NAV_ITEMS` — sidebar labels (change display names here)

### Change the hero video

In [src/components/Hero.tsx](src/components/Hero.tsx), update the constant at the top:

```ts
const HERO_VIDEO_ID = 'YOUR_YOUTUBE_VIDEO_ID'
```

The video plays muted and looped as a background. A separate "Watch the Story" button opens it with audio in a modal.

### Add a new slide

1. Create `src/components/sections/NewSlide.tsx`
2. Add an entry to the `SLIDES` array in `src/App.tsx`:
   ```ts
   { id: 'new-slide', label: 'New Slide', Component: NewSlide }
   ```
3. The sidebar, keyboard navigation, and slide counter update automatically.
4. If the new slide has a CTA pointing to Contact, use `useDeck().goToSlide(7)` (or the updated index).

### Change colours

Edit `tailwind.config.js` under `theme.extend.colors`:

| Token | Default | Role |
|---|---|---|
| `gold` | `#C9973A` | Primary accent, CTAs, active indicators |
| `gold.light` | `#E8C97A` | Hover state for gold elements |
| `ink` | `#08090A` | Primary background |
| `ink-2` | `#0F1012` | Alternate section background |
| `ink-card` | `#14161A` | Card backgrounds |
| `cream` | `#F0EBE0` | Primary text |
| `cream.muted` | `#9A9080` | Secondary text |
| `cream.dim` | `#5A5248` | Tertiary / disabled text |

---

## Performance

Actual production build output:

| Chunk | Size (gzip) |
|---|---|
| App logic | 13.7 kB |
| GSAP | 27.2 kB |
| Framer Motion | 43.3 kB |
| React + ReactDOM | 58.1 kB |
| **Total JS** | **~142 kB** |

- All below-fold images use native `loading="lazy"`
- YouTube background iframe loads on mount but is `pointer-events: none` — no interaction cost
- GSAP animations fire on slide mount, not on page scroll — no continuous scroll listeners
- Vendor chunks split into separate files and load in parallel

---

## Deploying

The `dist/` folder after `npm run build` is a fully static site — no server required.

### Vercel (recommended)

```bash
npx vercel --prod
```

Or connect the repo in the Vercel dashboard:
- **Build command:** `npm run build`
- **Output directory:** `dist`

### Netlify

Create a `netlify.toml` at the project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Then push to the connected repo or drag-drop `dist/` into the Netlify dashboard.

### Any static file server

```bash
npm run build
npx serve dist
```

---

## Design Language

- **Dark luxury palette** — `#08090A` base, `#C9973A` gold. Reference: Apple, Tesla, Saint Laurent
- **Cormorant Garamond** — editorial, high-fashion display typeface
- **Inter** — clean, readable body and UI text
- Every slide stays dark — the immersive environment never breaks
- Gold shimmer text on hero headlines — premium signal, not gimmick

---

## What Could Be Built Next

| Priority | Feature |
|---|---|
| High | Official American Dream property photography to replace Unsplash placeholders |
| High | Interactive leasing floor plan — clickable zones filterable by category and sq ft |
| Medium | Sponsorship module — tiered partner packages with reach data and rate cards |
| Medium | CMS integration (Sanity / Contentful) so the sales team owns copy updates |
| Low | Prospect analytics — track which slides and CTAs drive the most engagement |
| Low | Catchment map — Mapbox visualisation of 1-hour drive-time population density |

---

<div align="center">

Built by **Ganesh** · April 2026

*American Dream · East Rutherford, NJ · Gateway to New York City*

</div>
