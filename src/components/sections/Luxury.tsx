import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { LUXURY_BRANDS } from '../../data/content'
import { useDeck } from '../../context/DeckContext'

const LUX_IMAGE =
  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=85'

const FEATURES = [
  {
    title: 'Dedicated Entry',
    body: 'Valet, concierge, and a distinct arrival experience designed for discerning shoppers.',
  },
  {
    title: 'Curated Adjacencies',
    body: "Alongside the world's most prestigious houses — curation that protects positioning.",
  },
  {
    title: 'VIP Programming',
    body: 'Private events, after-hours exclusives, and brand-specific client programming.',
  },
]

const STATS = [
  { value: '$2.5B+', label: 'Annual luxury retail potential in the NYC metro' },
  { value: '40M+',   label: 'Consumers within one hour radius' },
  { value: '10+',    label: 'Global prestige houses in residence' },
]

export default function Luxury() {
  const rootRef = useRef<HTMLElement>(null)
  const { goToSlide } = useDeck()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })
      tl.from('.lux-eyebrow', { opacity: 0, y: 14, duration: 0.6, ease: 'power3.out' })
      tl.from('.lux-line', {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.9, ease: 'power4.out',
      }, '-=0.3')
      tl.from('.lux-body', { opacity: 0, y: 18, duration: 0.7, ease: 'power3.out' }, '-=0.35')
      tl.from('.lux-cta',  { opacity: 0, y: 14, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      tl.from('.lux-stat', { opacity: 0, x: 28, stagger: 0.12, duration: 0.7, ease: 'power3.out' }, '-=0.6')
      tl.from('.lux-feat', { opacity: 0, y: 16, stagger: 0.1, duration: 0.65, ease: 'power3.out' }, '-=0.4')
      tl.from('.lux-marquee', { opacity: 0, duration: 0.5 }, '-=0.3')
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="luxury"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* ── Full-bleed image ── */}
      <div className="absolute inset-0">
        <img
          src={LUX_IMAGE}
          alt="American Dream Luxury Wing"
          className="w-full h-full object-cover animate-ken-burns"
          loading="eager"
        />
      </div>

      {/* ── Cinematic overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/20" />

      {/* ── Left: editorial copy ── */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[58%] flex flex-col justify-center px-8 md:px-14 lg:px-16 pb-20">
        <p className="lux-eyebrow eyebrow mb-5">The Luxury Collection</p>

        {/* Headline — lines animate individually */}
        <div className="mb-8">
          {['Where', 'prestige', 'finds its', 'audience.'].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <p
                className={`lux-line font-display text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.88] tracking-tight ${
                  i === 1 ? 'shimmer-text italic' : 'text-cream'
                }`}
              >
                {word}
              </p>
            </div>
          ))}
        </div>

        <p className="lux-body font-sans text-base lg:text-lg text-cream-muted max-w-sm leading-relaxed mb-8">
          The premier luxury destination in the greater NYC metro — 40M+ consumers within
          one hour, including the highest concentration of UHNW individuals in North America.
        </p>

        <button
          type="button"
          onClick={() => goToSlide(9)}
          className="lux-cta btn-gold self-start mb-10"
          data-cursor="Leasing"
        >
          Reserve a Flagship Position
        </button>

        {/* Feature row */}
        <div className="grid grid-cols-3 gap-5 max-w-md">
          {FEATURES.map(({ title, body }) => (
            <div key={title} className="lux-feat">
              <div className="h-px w-6 bg-gold mb-3" />
              <p className="font-sans text-[10px] tracking-widest uppercase text-gold mb-1">{title}</p>
              <p className="font-sans text-[11px] text-cream-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: floating stat stack ── */}
      <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col gap-3 w-60">
        {STATS.map(({ value, label }, i) => (
          <div
            key={value}
            className={`lux-stat border border-ink-border p-6 ${
              i === 0
                ? 'bg-ink/80 backdrop-blur-md border-gold/25'
                : 'bg-ink/60 backdrop-blur-sm'
            }`}
          >
            <p
              className={`font-display leading-none ${
                i === 0 ? 'text-5xl text-gold' : 'text-3xl text-cream'
              }`}
            >
              {value}
            </p>
            {i === 0 && <div className="h-px w-8 bg-gold/30 my-3" />}
            <p className="font-sans text-[10px] tracking-widest uppercase text-cream-muted mt-2 leading-relaxed">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Bottom: scrolling brand marquee ── */}
      <div className="lux-marquee absolute bottom-0 left-0 right-0 border-t border-gold/15 bg-ink/70 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center py-4 gap-8">
          <p className="shrink-0 font-sans text-[9px] tracking-widest2 uppercase text-gold/50 pl-6 pr-4">
            Prestige Tenants ·
          </p>
          <div className="flex gap-12 animate-marquee">
            {[...LUXURY_BRANDS, ...LUXURY_BRANDS, ...LUXURY_BRANDS].map((brand, i) => (
              <span
                key={i}
                className="font-display text-sm text-cream-dim/55 tracking-widest whitespace-nowrap"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
