import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Slide {
  id: string
  label: string
}

interface Props {
  current: number
  slides: Slide[]
  onPrev: () => void
  onNext: () => void
  onGoTo: (i: number) => void
}

// Thumbnail preview images per section id
const SECTION_THUMBS: Record<string, string> = {
  hero:          'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=240&q=60',
  overview:      'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=240&q=60',
  opportunity:   'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=240&q=60',
  retail:        'https://images.unsplash.com/photo-1555529771-122e5d9f2341?w=240&q=60',
  luxury:        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=240&q=60',
  dining:        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=240&q=60',
  entertainment: 'https://images.unsplash.com/photo-1562774053-701939374585?w=240&q=60',
  'brand-viz':   'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=240&q=60',
  events:        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=240&q=60',
  contact:       'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=240&q=60',
}

export default function DeckNav({ current, slides, onPrev, onNext, onGoTo }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const total = slides.length

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-56 z-50 flex-col justify-between py-12 px-8">
        {/* Background */}
        <div className="absolute inset-0 bg-ink/90 backdrop-blur-md border-r border-ink-border" />

        {/* Progress bar — right edge fills as deck progresses */}
        <div className="absolute right-0 top-0 h-full w-px bg-ink-border">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gold"
            animate={{ height: `${((current + 1) / total) * 100}%` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <button
            type="button"
            onClick={() => onGoTo(0)}
            className="flex flex-col gap-0.5 group"
          >
            <span className="font-display text-2xl text-cream leading-none tracking-tight group-hover:text-gold transition-colors duration-300">
              American
            </span>
            <span className="font-display text-2xl text-gold leading-none tracking-tight">
              Dream
            </span>
            <div className="mt-3 h-px w-8 bg-gold transition-all duration-300 group-hover:w-14" />
          </button>
        </div>

        {/* Slide list with hover thumbnails */}
        <div className="relative z-10 flex flex-col gap-0.5">
          {slides.map(({ id, label }, i) => {
            const isActive = current === i
            const thumb    = SECTION_THUMBS[id]

            return (
              <div
                key={id}
                className="relative"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Thumbnail preview — floats to the right of sidebar */}
                <AnimatePresence>
                  {hoveredIdx === i && thumb && (
                    <motion.div
                      initial={{ opacity: 0, x: -6, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -4, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-28 h-18 overflow-hidden border border-gold/30 z-50 shadow-xl pointer-events-none"
                      style={{ height: '72px' }}
                    >
                      <img
                        src={thumb}
                        alt={label}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-ink/20" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => onGoTo(i)}
                  className="group flex items-center gap-3 py-2 text-left transition-all duration-300 w-full"
                >
                  {/* Accent indicator */}
                  <span className={`flex-shrink-0 transition-all duration-300 ${
                    isActive
                      ? 'w-4 h-px bg-gold'
                      : 'w-1.5 h-px bg-cream-dim group-hover:w-3 group-hover:bg-cream-muted'
                  }`} />
                  <span className={`font-sans text-[10px] tracking-widest uppercase transition-all duration-300 ${
                    isActive ? 'text-gold' : 'text-cream-dim group-hover:text-cream-muted'
                  }`}>
                    {label}
                  </span>
                </button>
              </div>
            )
          })}
        </div>

        {/* Bottom controls */}
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onPrev}
              disabled={current === 0}
              className="font-sans text-[10px] tracking-widest uppercase text-cream-dim hover:text-gold disabled:opacity-20 transition-colors duration-200"
            >
              ↑ Prev
            </button>
            <span className="font-sans text-[10px] text-cream-dim/50 tabular-nums">
              {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={onNext}
              disabled={current === total - 1}
              className="font-sans text-[10px] tracking-widest uppercase text-cream-dim hover:text-gold disabled:opacity-20 transition-colors duration-200"
            >
              ↓ Next
            </button>
          </div>

          <button
            type="button"
            onClick={() => onGoTo(total - 1)}
            className="w-full border border-gold text-gold font-sans text-[10px] tracking-widest uppercase py-3 px-4 hover:bg-gold hover:text-ink transition-all duration-300 animate-pulse-gold"
          >
            Inquire Now
          </button>
          <p className="font-sans text-[10px] text-cream-dim text-center leading-relaxed">
            leasing@americandream.com
          </p>
        </div>
      </nav>

      {/* ── Mobile Top Bar ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 bg-ink/92 backdrop-blur-md border-b border-ink-border">
          <button
            type="button"
            onClick={() => onGoTo(0)}
            className="flex items-center gap-2"
          >
            <span className="font-display text-xl text-cream">American</span>
            <span className="font-display text-xl text-gold">Dream</span>
          </button>
          <div className="flex items-center gap-4">
            <span className="font-sans text-[10px] text-cream-dim/60 tabular-nums">
              {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(v => !v)}
              className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={`block h-px w-6 bg-cream transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-px w-6 bg-cream transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-6 bg-cream transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile progress bar */}
        <div className="h-px bg-ink-border relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gold"
            animate={{ width: `${((current + 1) / total) * 100}%` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="bg-ink/96 backdrop-blur-lg border-b border-ink-border"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {slides.map(({ id, label }, i) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => { onGoTo(i); setMobileOpen(false) }}
                    className={`text-left py-2.5 font-sans text-xs tracking-widest uppercase transition-colors duration-200 ${
                      current === i ? 'text-gold' : 'text-cream-muted hover:text-cream'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => { onGoTo(total - 1); setMobileOpen(false) }}
                  className="mt-4 w-full border border-gold text-gold font-sans text-xs tracking-widest uppercase py-3 hover:bg-gold hover:text-ink transition-all duration-300"
                >
                  Inquire Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile bottom prev / next ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t border-ink-border bg-ink/92 backdrop-blur-md">
        <button
          type="button"
          onClick={onPrev}
          disabled={current === 0}
          className="flex-1 py-4 font-sans text-[10px] tracking-widest uppercase text-cream-dim hover:text-gold disabled:opacity-20 transition-colors duration-200 border-r border-ink-border"
        >
          ← Prev
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={current === total - 1}
          className="flex-1 py-4 font-sans text-[10px] tracking-widest uppercase text-cream-dim hover:text-gold disabled:opacity-20 transition-colors duration-200"
        >
          Next →
        </button>
      </div>
    </>
  )
}
