import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useDeck } from '../context/DeckContext'

// Official American Dream promo — replace with updated ID if needed
const HERO_VIDEO_ID = 'CYRcwGZjSh0'
const HERO_BG_IMAGE = 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1920&q=85'

export default function Hero() {
  const rootRef      = useRef<HTMLElement>(null)
  const headlineRef  = useRef<HTMLDivElement>(null)
  const [videoOpen, setVideoOpen] = useState(false)
  const { goToSlide } = useDeck()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Gold rule enters from left
      tl.from('.hero-line', {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 0.9,
        ease: 'power4.out',
      })

      // Eyebrow
      tl.from('.hero-eyebrow', {
        opacity: 0,
        y: 14,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.5')

      // Each title character
      tl.from('.hero-char', {
        y: '115%',
        duration: 0.8,
        stagger: 0.028,
        ease: 'power4.out',
      }, '-=0.4')

      // Subtitle
      tl.from('.hero-sub', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.3')

      // Tags
      tl.from('.hero-tag', {
        opacity: 0,
        y: 12,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.4')

      // CTAs
      tl.from('.hero-cta', {
        opacity: 0,
        y: 16,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const line1 = 'American'
  const line2 = 'Dream'

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative w-full h-screen min-h-[680px] flex items-center overflow-hidden"
    >
      {/* ── Static Image Background ── */}
      <div className="hero-bg absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={HERO_BG_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-ink/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/20 to-transparent" />

      {/* ── Top gold rule ── */}
      <div className="hero-line absolute top-0 left-0 right-0 h-px bg-gold-gradient" />

      {/* ── Content ── */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 w-full">
        <p className="hero-eyebrow eyebrow mb-6">
          East Rutherford, NJ · 10 Miles from Manhattan · Gateway to 40M Consumers
        </p>

        {/* Headline — split chars */}
        <div ref={headlineRef}>
          <div className="overflow-hidden mb-1">
            <div className="flex">
              {line1.split('').map((ch, i) => (
                <div key={i} className="overflow-hidden">
                  <span className="hero-char font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] tracking-tight text-cream inline-block">
                    {ch}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden mb-10">
            <div className="flex">
              {line2.split('').map((ch, i) => (
                <div key={i} className="overflow-hidden">
                  <span className="hero-char shimmer-text font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] tracking-tight inline-block">
                    {ch}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="hero-sub font-display text-xl md:text-2xl text-cream/75 italic max-w-lg mb-10 leading-relaxed">
          The world's most extraordinary destination —<br />
          where scale meets imagination.
        </p>

        {/* Pill tags */}
        <div className="flex flex-wrap gap-3 mb-10">
          {['3M+ Sq Ft', '450+ Brands', '40M Catchment', '10 Min to Manhattan'].map((tag) => (
            <span
              key={tag}
              className="hero-tag font-sans text-xs tracking-widest uppercase text-gold border border-gold/30 px-4 py-2 bg-gold/5 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => goToSlide(2)}
            className="hero-cta btn-gold"
            data-cursor="Leasing"
          >
            Explore Leasing
          </button>
          <button
            type="button"
            onClick={() => goToSlide(6)}
            className="hero-cta btn-outline"
            data-cursor="Events"
          >
            Book an Event
          </button>
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="hero-cta btn-ghost flex items-center gap-2"
            data-cursor="Play"
          >
            <PlayIcon />
            Watch the Story
          </button>
        </div>
      </div>

      {/* ── Video Modal ── */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[150] bg-ink/96 flex items-center justify-center p-4"
          onClick={() => setVideoOpen(false)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 font-sans text-xs tracking-widest uppercase text-cream-muted hover:text-cream transition-colors"
            onClick={() => setVideoOpen(false)}
          >
            Close ✕
          </button>
          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="video-responsive shadow-2xl border border-ink-border">
              <iframe
                src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1&rel=0`}
                title="American Dream — The World's Most Extraordinary Destination"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <polygon points="2,1 11,6 2,11" />
    </svg>
  )
}
