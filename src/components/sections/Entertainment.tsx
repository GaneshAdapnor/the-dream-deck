import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ENTERTAINMENT_CARDS } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Entertainment() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track   = trackRef.current!
      const section = sectionRef.current!

      // Set track width via DOM — avoids inline style prop
      track.style.width = `${ENTERTAINMENT_CARDS.length * 100}vw`

      const getSlideDistance = () => track.scrollWidth - section.offsetWidth

      // ── Horizontal pin + scrub ──
      const st = gsap.to(track, {
        x: () => -getSlideDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          end: () => `+=${getSlideDistance()}`,
          invalidateOnRefresh: true,
        },
      })

      // ── Parallax on each card image ──
      gsap.utils.toArray<HTMLElement>('.ent-img').forEach((img) => {
        gsap.fromTo(img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              containerAnimation: st,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        )
      })

      // ── Title fade-in ──
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="entertainment" className="relative bg-ink overflow-hidden">

      {/* ── Header ── */}
      <div ref={titleRef} className="lg:pl-64 px-6 md:px-12 pt-24 pb-16">
        <p className="eyebrow mb-4">Attractions & Entertainment</p>
        <h2 className="display-lg max-w-3xl">
          Experiences no other property{' '}
          <span className="shimmer-text font-display italic">in the world</span> can offer.
        </h2>
        <p className="body-lg max-w-xl mt-6">Scroll to explore →</p>
      </div>

      {/* ── Horizontal track ── */}
      <div ref={trackRef} className="flex will-change-transform">
        {ENTERTAINMENT_CARDS.map((card, i) => (
          <div key={card.title} className="ent-card">
            {/* Parallax image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="ent-img absolute inset-0 w-full h-full object-cover scale-110"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

            {/* Card index watermark */}
            <div className="absolute top-8 right-10 font-display text-7xl text-cream/[0.06] select-none leading-none">
              0{i + 1}
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end lg:pl-64 px-10 lg:px-16 pb-16 max-w-3xl">
              <span className={`ent-badge inline-block self-start font-sans text-xs tracking-widest uppercase px-3 py-1 mb-6 border ${card.badgeClass}`}>
                {card.stat}
              </span>
              <p className="font-sans text-xs tracking-widest uppercase text-gold mb-3">
                {card.subtitle}
              </p>
              <h2 className="font-display text-5xl md:text-7xl text-cream leading-none mb-6">
                {card.title}
              </h2>
              <p className="body-lg max-w-md mb-10">{card.description}</p>
              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={() => scrollTo('contact')}
                  className="btn-gold"
                  data-cursor="Partner"
                >
                  Sponsorship Opportunities
                </button>
                <span className="font-sans text-xs tracking-widest uppercase text-cream-dim">
                  {i + 1} / {ENTERTAINMENT_CARDS.length}
                </span>
              </div>
            </div>

            {/* Peek arrow to next card */}
            {i < ENTERTAINMENT_CARDS.length - 1 && (
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-ink/60 to-transparent flex items-center justify-end pr-4">
                <span className="font-sans text-[10px] tracking-widest uppercase text-cream-dim rotate-90 whitespace-nowrap">
                  Next →
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Post-scroll impact strip ── */}
      <div className="lg:pl-64 px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { h: 'Built-in Foot Traffic',   b: 'Every attraction independently drives visitation — compounding foot traffic no single brand could generate.' },
          { h: 'Brand Activation Canvas', b: 'Sponsor, name, or integrate your brand within any attraction. Category-exclusive opportunities available.' },
          { h: 'Year-Round Draw',          b: 'All indoor. 365 days. Every experience operates in every weather condition, always.' },
        ].map(({ h, b }) => (
          <div key={h} className="border-t border-gold/20 pt-6">
            <div className="gold-line mb-4" />
            <h3 className="font-display text-xl text-cream mb-3">{h}</h3>
            <p className="body-md">{b}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
