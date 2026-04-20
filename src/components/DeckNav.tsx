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

export default function DeckNav({ current, slides, onPrev, onNext, onGoTo }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const total = slides.length

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-56 z-50 flex-col justify-between py-12 px-8">
        <div className="absolute inset-0 bg-ink/85 backdrop-blur-md border-r border-ink-border" />

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

        {/* Slide list */}
        <div className="relative z-10 flex flex-col gap-0.5">
          {slides.map(({ id, label }, i) => {
            const isActive = current === i
            return (
              <button
                type="button"
                key={id}
                onClick={() => onGoTo(i)}
                className="group flex items-center gap-3 py-2 text-left transition-all duration-300"
              >
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
            )
          })}
        </div>

        {/* Prev / Next / Counter / CTA */}
        <div className="relative z-10 flex flex-col gap-4">
          {/* Arrows + slide counter */}
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
            className="w-full border border-gold text-gold font-sans text-[10px] tracking-widest uppercase py-3 px-4 hover:bg-gold hover:text-ink transition-all duration-300"
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

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="bg-ink-2/96 backdrop-blur-lg border-b border-ink-border"
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

      {/* ── Mobile Prev / Next (bottom bar) ── */}
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
