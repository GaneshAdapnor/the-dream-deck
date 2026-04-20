import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { DeckContext } from './context/DeckContext'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import DeckNav from './components/DeckNav'
import Hero from './components/Hero'
import Overview from './components/sections/Overview'
import Retail from './components/sections/Retail'
import Luxury from './components/sections/Luxury'
import Dining from './components/sections/Dining'
import Entertainment from './components/sections/Entertainment'
import Events from './components/sections/Events'
import Contact from './components/sections/Contact'

export const SLIDES = [
  { id: 'hero',          label: 'Home',           Component: Hero          },
  { id: 'overview',      label: 'The Property',   Component: Overview      },
  { id: 'retail',        label: 'Retail',          Component: Retail        },
  { id: 'luxury',        label: 'Luxury',          Component: Luxury        },
  { id: 'dining',        label: 'Dining',          Component: Dining        },
  { id: 'entertainment', label: 'Entertainment',   Component: Entertainment },
  { id: 'events',        label: 'Events',          Component: Events        },
  { id: 'contact',       label: 'Partner With Us', Component: Contact       },
]

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
}

export default function App() {
  const [ready,     setReady]     = useState(false)
  const [current,   setCurrent]   = useState(0)
  const [direction, setDirection] = useState(1)

  const goToSlide = useCallback((index: number) => {
    if (index === current) return
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  const goNext = useCallback(() => {
    if (current < SLIDES.length - 1) goToSlide(current + 1)
  }, [current, goToSlide])

  const goPrev = useCallback(() => {
    if (current > 0) goToSlide(current - 1)
  }, [current, goToSlide])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't hijack when user is typing in a form field
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const { Component } = SLIDES[current]

  return (
    <DeckContext.Provider value={{ goToSlide, current, total: SLIDES.length }}>
      <Cursor />
      {!ready && <Preloader onComplete={() => setReady(true)} />}

      {ready && (
        <div className="fixed inset-0 overflow-hidden bg-ink">
          {/* Fixed sidebar deck nav */}
          <DeckNav
            current={current}
            slides={SLIDES.map(s => ({ id: s.id, label: s.label }))}
            onPrev={goPrev}
            onNext={goNext}
            onGoTo={goToSlide}
          />

          {/* Slide viewport — offset right of the sidebar on desktop */}
          <div className="absolute inset-0 lg:left-56 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 overflow-y-auto hide-scrollbar"
              >
                <Component />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </DeckContext.Provider>
  )
}
