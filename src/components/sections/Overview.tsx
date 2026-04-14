import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

function formatValue(val: number, fmt: string): string {
  if (fmt === 'compact') {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1).replace('.0', '')}M`
    if (val >= 1_000) return `${(val / 1_000).toFixed(0)}K`
  }
  return val.toLocaleString()
}

const LOCATION_POINTS = [
  { label: '10 min', sub: 'to Manhattan' },
  { label: '5 min',  sub: 'to MetLife Stadium' },
  { label: '12 min', sub: 'to Newark Airport' },
  { label: '1 hr',   sub: 'to 40M consumers' },
]

export default function Overview() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading lines stagger in ──
      gsap.from('.ov-heading', {
        opacity: 0, y: 32,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.ov-heading', start: 'top 82%' },
      })

      // ── Stat counters animate up ──
      document.querySelectorAll<HTMLElement>('.ov-stat').forEach((el) => {
        const target  = Number(el.dataset.target)
        const fmt     = el.dataset.fmt ?? 'number'
        const suffix  = el.dataset.suffix ?? ''
        const obj     = { val: 0 }

        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 2,
              ease: 'power3.out',
              onUpdate: () => {
                const display = el.querySelector<HTMLSpanElement>('.ov-stat-num')
                if (display) display.textContent = formatValue(Math.round(obj.val), fmt) + suffix
              },
            })
            gsap.from(el, { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' })
          },
        })
      })

      // ── Location strip slides up ──
      gsap.from('.ov-location', {
        opacity: 0, y: 24,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ov-location', start: 'top 88%' },
      })

      // ── Image grid stagger ──
      gsap.from('.ov-img', {
        opacity: 0, y: 30, scale: 0.97,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ov-img', start: 'top 88%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="relative bg-ink py-28 lg:py-36 overflow-hidden"
    >
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.025] bg-grid-gold" />

      <div className="section-container lg:pl-72">
        {/* Header */}
        <div className="mb-20">
          <p className="ov-heading eyebrow mb-4">The Property</p>
          <h2 className="ov-heading display-lg max-w-2xl">
            Not a mall.{' '}
            <span className="shimmer-text font-display italic">A destination.</span>
          </h2>
          <p className="ov-heading body-lg max-w-xl mt-6">
            American Dream draws foot traffic no standalone retailer could generate and
            places your brand in front of the largest consumer market on earth.
          </p>
        </div>

        {/* Animated stat counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-24">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="ov-stat flex flex-col items-center text-center lg:items-start lg:text-left"
              data-target={s.value}
              data-fmt={s.format}
              data-suffix={s.suffix}
            >
              <div className="stat-number tabular-nums">
                <span className="ov-stat-num">0</span>
              </div>
              <div className="gold-line mt-3 mb-2 mx-auto lg:mx-0" />
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Location strip */}
        <div className="ov-location border border-ink-border bg-ink-card mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink-border">
            {LOCATION_POINTS.map(({ label, sub }) => (
              <div key={label} className="px-8 py-6 text-center">
                <p className="font-display text-3xl text-gold">{label}</p>
                <p className="font-sans text-xs tracking-widest uppercase text-cream-muted mt-1">{sub}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-ink-border px-8 py-4 flex items-center gap-3">
            <LocationIcon />
            <p className="font-sans text-xs tracking-widest uppercase text-cream-muted">
              1 American Dream Way, East Rutherford, NJ · Adjacent to MetLife Stadium & Meadowlands Sports Complex
            </p>
          </div>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { src: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=800&q=80', label: 'Interior Experience' },
            { src: 'https://images.unsplash.com/photo-1520885708668-0027a54c2083?w=800&q=80', label: 'Retail Environment' },
            { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', label: 'Architecture & Scale' },
          ].map(({ src, label }) => (
            <div
              key={label}
              className="ov-img relative group overflow-hidden aspect-4-3"
            >
              <img
                src={src}
                alt={label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 font-sans text-xs tracking-widest uppercase text-cream-muted">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9973A" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
