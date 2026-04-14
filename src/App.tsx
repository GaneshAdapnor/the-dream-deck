import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Overview from './components/sections/Overview'
import Retail from './components/sections/Retail'
import Luxury from './components/sections/Luxury'
import Dining from './components/sections/Dining'
import Entertainment from './components/sections/Entertainment'
import Events from './components/sections/Events'
import Contact from './components/sections/Contact'
import { useActiveSection } from './hooks/useActiveSection'
import { NAV_ITEMS } from './data/content'

gsap.registerPlugin(ScrollTrigger)

const SECTION_IDS = NAV_ITEMS.map((n) => n.id)

export default function App() {
  const [ready, setReady] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)

  // ── Lenis smooth scroll wired to GSAP ticker ──
  useEffect(() => {
    if (!ready) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      lenis.destroy()
    }
  }, [ready])

  return (
    <>
      {/* Custom cursor — desktop only, hidden on touch */}
      <Cursor />

      {/* Splash screen — slides away when done */}
      {!ready && <Preloader onComplete={() => setReady(true)} />}

      {/* Main app — rendered immediately so fonts/images preload behind the preloader */}
      <div className="relative">
        <Navigation activeSection={activeSection} />
        <main className="lg:pl-56">
          <Hero />
          <Overview />
          <Retail />
          <Luxury />
          <Dining />
          <Entertainment />
          <Events />
          <Contact />
        </main>
      </div>
    </>
  )
}
