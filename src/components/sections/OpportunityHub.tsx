import { useState, useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useDeck } from '../../context/DeckContext'

const PATHS = [
  {
    id: 'lease',
    number: '01',
    title: 'Lease a Space',
    subtitle: 'Retail · Luxury · F&B · Pop-Up',
    headline: 'Place your brand at the center of the most extraordinary destination in North America.',
    stat: '$2.5B+',
    statLabel: 'Annual retail potential',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80',
    accentColor: '#C9973A',
    slideIndex: 3,
    cta: 'Explore Leasing',
  },
  {
    id: 'sponsor',
    number: '02',
    title: 'Sponsor & Partner',
    subtitle: 'Brand Partnerships · Naming Rights · Media',
    headline: 'Reach 40 million high-income consumers in the most premium brand environment on the East Coast.',
    stat: '40M+',
    statLabel: 'Annual consumers reached',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80',
    accentColor: '#7DD3F5',
    slideIndex: 9,
    cta: 'Discuss Partnership',
  },
  {
    id: 'host',
    number: '03',
    title: 'Host an Event',
    subtitle: 'Concerts · Launches · Conventions · Pop-Ups',
    headline: 'The most powerful event platform in the region. 200K sq ft of activatable space, zero competition.',
    stat: '200K+',
    statLabel: 'Sq ft of event space',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80',
    accentColor: '#A855F7',
    slideIndex: 8,
    cta: 'Book a Venue',
  },
]

export default function OpportunityHub() {
  const [hovered, setHovered] = useState<number | null>(null)
  const rootRef = useRef<HTMLElement>(null)
  const { goToSlide } = useDeck()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hub-header', {
        opacity: 0, y: 28,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.1,
      })
      gsap.from('.hub-panel', {
        opacity: 0, y: 40, scale: 0.97,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="opportunity"
      className="relative w-full h-screen overflow-hidden bg-ink flex flex-col"
    >
      {/* Header */}
      <div className="relative z-10 shrink-0 flex flex-col lg:flex-row items-start lg:items-end justify-between px-8 lg:px-12 pt-10 pb-8 border-b border-ink-border bg-ink">
        <div>
          <p className="hub-header eyebrow mb-3">Three Paths. One Decision.</p>
          <h2 className="hub-header font-display text-4xl lg:text-5xl text-cream leading-none">
            The Opportunity
          </h2>
        </div>
        <p className="hub-header hidden lg:block font-sans text-sm text-cream-muted max-w-xs text-right leading-relaxed mt-4 lg:mt-0">
          Choose the partnership that fits your ambition.
          <br />Each path leads to an extraordinary outcome.
        </p>
      </div>

      {/* Expandable panels */}
      <div className="flex-1 flex overflow-hidden">
        {PATHS.map((path, i) => (
          <motion.div
            key={path.id}
            className="hub-panel relative overflow-hidden cursor-pointer flex-1"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            animate={{
              flexGrow: hovered === null ? 1 : hovered === i ? 2.8 : 0.55,
            }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => goToSlide(path.slideIndex)}
            data-cursor={path.cta}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={path.image}
                alt={path.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-ink/72" />

            {/* Hover accent glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: hovered === i ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: `radial-gradient(ellipse at 50% 100%, ${path.accentColor}35 0%, transparent 65%)`,
              }}
            />

            {/* Left separator (not on first panel) */}
            {i > 0 && (
              <div className="absolute top-0 left-0 h-full w-px bg-ink-border" />
            )}

            {/* Large ghost number */}
            <div
              className="absolute top-6 left-5 font-display text-[10rem] leading-none select-none pointer-events-none"
              style={{ color: `${path.accentColor}0F` }}
            >
              {path.number}
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-7 lg:p-9">
              {/* Subtitle */}
              <p
                className="font-sans text-[10px] tracking-widest uppercase mb-3 transition-colors duration-300"
                style={{ color: path.accentColor }}
              >
                {path.subtitle}
              </p>

              {/* Title */}
              <h3 className="font-display text-2xl lg:text-3xl text-cream mb-4 leading-tight">
                {path.title}
              </h3>

              {/* Expanding content on hover */}
              <motion.div
                animate={{
                  opacity: hovered === i ? 1 : 0,
                  height: hovered === i ? 'auto' : 0,
                  marginBottom: hovered === i ? 0 : 0,
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <p className="font-sans text-sm text-cream-muted leading-relaxed mb-6 max-w-xs">
                  {path.headline}
                </p>

                <div className="mb-7">
                  <p
                    className="font-display text-5xl leading-none"
                    style={{ color: path.accentColor }}
                  >
                    {path.stat}
                  </p>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-cream-muted mt-2">
                    {path.statLabel}
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="font-sans text-xs tracking-widest uppercase py-3.5 px-7 text-ink font-semibold transition-all duration-300"
                  style={{ background: path.accentColor }}
                >
                  {path.cta} →
                </motion.button>
              </motion.div>

              {/* Collapsed hint arrow */}
              <motion.p
                animate={{
                  opacity: hovered === i ? 0 : 0.35,
                  y: hovered === i ? 6 : 0,
                }}
                transition={{ duration: 0.25 }}
                className="font-sans text-[10px] tracking-widest uppercase text-cream-muted"
              >
                Explore →
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
