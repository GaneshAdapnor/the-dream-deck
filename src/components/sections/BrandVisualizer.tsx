import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDeck } from '../../context/DeckContext'

const CATEGORIES = [
  {
    id: 'luxury',
    label: 'Luxury Flagship',
    eyebrow: 'Prestige Retail · Luxury Wing',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=85',
    available: 3,
    unit: 'flagship positions',
    sqft: '5,000 – 15,000 sq ft',
    dailyVisitors: '47,000',
    hhi: '$168K',
    slideIndex: 4,
    accentColor: '#C9973A',
    scarcityLabel: 'Only 3 flagship positions remain',
    adjacencies: ['Hermès', 'Versace', 'Balenciaga'],
    pitch:
      'Three flagship positions remain in the Luxury Wing. Your brand alongside the world\'s most coveted names — in front of the highest-income demographics in the region, 365 days a year.',
  },
  {
    id: 'retail',
    label: 'Premium Retail',
    eyebrow: 'Brand Retail · Prime Corridors',
    image: 'https://images.unsplash.com/photo-1555529771-122e5d9f2341?w=1920&q=85',
    available: 12,
    unit: 'inline spaces',
    sqft: '2,000 – 8,000 sq ft',
    dailyVisitors: '68,000',
    hhi: '$122K',
    slideIndex: 3,
    accentColor: '#4A9EE0',
    scarcityLabel: '12 prime inline spaces available',
    adjacencies: ['Apple', 'Nike', 'Zara'],
    pitch:
      '68,000 people walk past these locations every day. Your conversion opportunity begins at the door — positioned between the destination\'s most-visited entertainment anchors.',
  },
  {
    id: 'fb',
    label: 'F&B Concept',
    eyebrow: 'Dining & Lifestyle · Three Zones',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85',
    available: 8,
    unit: 'F&B opportunities',
    sqft: '1,500 – 6,000 sq ft',
    dailyVisitors: '52,000',
    hhi: '$110K',
    slideIndex: 5,
    accentColor: '#E8834A',
    scarcityLabel: '8 F&B opportunities across 3 zones',
    adjacencies: ['Benihana', 'Sugar Factory', 'Kioku'],
    pitch:
      'Dining at American Dream drives repeat visits and extended dwell time. Three distinct zones — fast-casual, food hall, and elevated — each with captured audiences that don\'t leave.',
  },
  {
    id: 'events',
    label: 'Brand Activation',
    eyebrow: 'Events & Pop-Ups · 200K Sq Ft',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1920&q=85',
    available: 6,
    unit: 'activation windows',
    sqft: '500 – 200,000 sq ft',
    dailyVisitors: '40M+',
    hhi: '$115K avg',
    slideIndex: 8,
    accentColor: '#A855F7',
    scarcityLabel: '6 priority activation windows remain',
    adjacencies: ['Pitbull', 'Samsung', 'Marvel'],
    pitch:
      '200K sq ft of activatable space with a built-in, captive audience. Previous activations have driven millions in earned media and six-figure attendance in a single weekend.',
  },
]

export default function BrandVisualizer() {
  const [active, setActive] = useState(0)
  const [pulsing, setPulsing] = useState(false)
  const [visitorCount, setVisitorCount] = useState(44821)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { goToSlide } = useDeck()

  const cat = CATEGORIES[active]

  // Start pulsing scarcity badge after 1.2s
  useEffect(() => {
    const t = setTimeout(() => setPulsing(true), 1200)
    return () => clearTimeout(t)
  }, [])

  // Simulate a live visitor counter ticking up
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVisitorCount(v => v + Math.floor(Math.random() * 3 + 1))
    }, 800)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-ink flex flex-col lg:flex-row">

      {/* ── Left: Cinematic image zone ─────────────────────── */}
      <div className="relative flex-1 overflow-hidden min-h-[40vh] lg:min-h-0">

        {/* Cross-fading background images */}
        <AnimatePresence mode="sync">
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/10 via-transparent to-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

        {/* Accent glow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat.id + '-glow'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 30% 90%, ${cat.accentColor}25 0%, transparent 65%)`,
            }}
          />
        </AnimatePresence>

        {/* Top-left: live counter */}
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-ink/70 backdrop-blur-sm border border-white/10 px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="font-sans text-[10px] tracking-widest uppercase text-cream-muted">
            Live · {visitorCount.toLocaleString()} visitors today
          </span>
        </div>

        {/* Bottom-left: pitch copy */}
        <div className="absolute bottom-6 left-6 right-6 lg:right-16 max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.id + '-pitch'}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="font-sans text-[10px] tracking-widest uppercase mb-3"
                style={{ color: cat.accentColor }}
              >
                {cat.eyebrow}
              </p>
              <p className="font-display text-xl lg:text-2xl text-cream leading-snug">
                {cat.pitch}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Right: Selector panel ──────────────────────────── */}
      <div className="relative w-full lg:w-[340px] xl:w-[380px] bg-ink border-t lg:border-t-0 lg:border-l border-ink-border flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-ink-border shrink-0">
          <p className="eyebrow mb-1">Your Space Awaits</p>
          <h2 className="font-display text-3xl lg:text-4xl text-cream leading-tight">
            Where does your<br />
            <span className="shimmer-text">brand belong?</span>
          </h2>
        </div>

        {/* Category selector */}
        <div className="px-6 py-5 flex flex-col gap-2 shrink-0">
          {CATEGORIES.map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => setActive(i)}
              whileHover={{ x: 2 }}
              className={`text-left px-4 py-3 border transition-all duration-300 ${
                active === i
                  ? 'border-gold/60 bg-gold/5'
                  : 'border-ink-border hover:border-gold/20 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="font-sans text-[11px] font-semibold tracking-widest uppercase transition-colors duration-300"
                    style={{ color: active === i ? c.accentColor : '#5A5248' }}
                  >
                    {c.label}
                  </p>
                  <p className="font-sans text-[10px] text-cream-dim mt-0.5">{c.sqft}</p>
                </div>
                {active === i && (
                  <motion.div
                    layoutId="category-dot"
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: c.accentColor }}
                  />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Dynamic stats */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat.id + '-stats'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex-1 flex flex-col px-8 pb-8 overflow-auto"
          >
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-5 mb-5 pt-2">
              <div>
                <p
                  className="font-display text-3xl leading-none"
                  style={{ color: cat.accentColor }}
                >
                  {cat.dailyVisitors}
                </p>
                <p className="font-sans text-[9px] tracking-widest uppercase text-cream-muted mt-1.5">
                  Daily visitors past this space
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-cream leading-none">{cat.hhi}</p>
                <p className="font-sans text-[9px] tracking-widest uppercase text-cream-muted mt-1.5">
                  Avg household income
                </p>
              </div>
            </div>

            {/* Scarcity badge */}
            <motion.div
              animate={pulsing ? { opacity: [1, 0.65, 1] } : {}}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-3 px-4 py-3 mb-5 border"
              style={{
                borderColor: `${cat.accentColor}50`,
                background: `${cat.accentColor}0D`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: cat.accentColor }}
              />
              <p className="font-sans text-[11px] text-cream-muted">
                <span className="font-semibold" style={{ color: cat.accentColor }}>
                  {cat.scarcityLabel}
                </span>
              </p>
            </motion.div>

            {/* Neighbors */}
            <div className="mb-5">
              <p className="font-sans text-[9px] tracking-widest uppercase text-cream-dim mb-2.5">
                Your neighbors
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.adjacencies.map(b => (
                  <span
                    key={b}
                    className="font-sans text-[10px] tracking-widest uppercase px-3 py-1.5 border border-ink-border text-cream-dim"
                  >
                    {b}
                  </span>
                ))}
                <span className="font-sans text-[10px] tracking-widest uppercase px-3 py-1.5 border border-dashed border-gold/30 text-gold/60">
                  + You
                </span>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              type="button"
              onClick={() => goToSlide(cat.slideIndex)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 font-sans font-semibold text-sm tracking-widest uppercase text-ink mt-auto"
              style={{
                background: cat.accentColor,
                boxShadow: `0 0 32px ${cat.accentColor}40`,
              }}
            >
              Claim This Space →
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
