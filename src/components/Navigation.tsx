import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_ITEMS, type SectionId } from '../data/content'

interface NavigationProps {
  activeSection: SectionId
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [mobileOpen, setMobileOpen]       = useState(false)
  const [progressPct, setProgressPct]     = useState(0)
  const sidebarBarRef                     = useRef<HTMLDivElement>(null)
  const mobileBarRef                      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const total    = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? window.scrollY / total : 0

      // Drive both bars via DOM ref — avoids inline style prop warnings
      if (sidebarBarRef.current) sidebarBarRef.current.style.transform = `scaleY(${progress})`
      if (mobileBarRef.current)  mobileBarRef.current.style.transform  = `scaleX(${progress})`

      setProgressPct(Math.round(progress * 100))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-56 z-50 flex-col justify-between py-12 px-8">
        <div className="absolute inset-0 bg-ink/85 backdrop-blur-md border-r border-ink-border" />

        {/* Vertical scroll-progress rail */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-ink-border overflow-hidden">
          <div ref={sidebarBarRef} className="progress-bar-v" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            className="flex flex-col gap-0.5 group"
            data-cursor=""
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

        {/* Nav items */}
        <div className="relative z-10 flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = activeSection === id
            return (
              <button
                type="button"
                key={id}
                onClick={() => scrollTo(id)}
                className="group flex items-center gap-3 py-2 text-left transition-all duration-300"
              >
                <span
                  className={`flex-shrink-0 transition-all duration-300 ${
                    isActive
                      ? 'w-4 h-px bg-gold'
                      : 'w-1.5 h-px bg-cream-dim group-hover:w-3 group-hover:bg-cream-muted'
                  }`}
                />
                <span
                  className={`font-sans text-[10px] tracking-widest uppercase transition-all duration-300 ${
                    isActive ? 'text-gold' : 'text-cream-dim group-hover:text-cream-muted'
                  }`}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Bottom CTA + scroll % */}
        <div className="relative z-10 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="w-full border border-gold text-gold font-sans text-[10px] tracking-widest uppercase py-3 px-4 hover:bg-gold hover:text-ink transition-all duration-300"
            data-cursor="Inquire"
          >
            Inquire Now
          </button>
          <p className="font-sans text-[10px] text-cream-dim text-center leading-relaxed">
            leasing@americandream.com
          </p>
          <p className="font-sans text-[10px] text-cream-dim/40 text-center tabular-nums">
            {progressPct}%
          </p>
        </div>
      </nav>

      {/* ── Mobile Top Bar ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50">
        {/* Thin horizontal progress rail */}
        <div className="absolute top-0 left-0 right-0 h-px bg-ink-border overflow-hidden">
          <div ref={mobileBarRef} className="progress-bar-h" />
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-ink/92 backdrop-blur-md border-b border-ink-border">
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2"
          >
            <span className="font-display text-xl text-cream">American</span>
            <span className="font-display text-xl text-gold">Dream</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-6 bg-cream transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-px w-6 bg-cream transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-cream transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
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
                {NAV_ITEMS.map(({ id, label }) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => { scrollTo(id); setMobileOpen(false) }}
                    className={`text-left py-2.5 font-sans text-xs tracking-widest uppercase transition-colors duration-200 ${
                      activeSection === id ? 'text-gold' : 'text-cream-muted hover:text-cream'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => { scrollTo('contact'); setMobileOpen(false) }}
                  className="mt-4 w-full border border-gold text-gold font-sans text-xs tracking-widest uppercase py-3 hover:bg-gold hover:text-ink transition-all duration-300"
                >
                  Inquire Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
