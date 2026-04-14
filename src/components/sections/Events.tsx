import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EVENT_TYPES } from '../../data/content'
import TiltCard from '../TiltCard'

gsap.registerPlugin(ScrollTrigger)

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const PAST_HIGHLIGHTS = [
  { type: 'Concert',      name: 'Pitbull Live at American Dream',                attendees: '12,000' },
  { type: 'Brand Launch', name: 'Major Apparel Brand Global Flagship Opening',   attendees: '8,500'  },
  { type: 'Corporate',    name: 'Fortune 500 Experiential Summit',               attendees: '3,200'  },
  { type: 'Film',         name: 'Nickelodeon Feature Film Red Carpet Premiere',  attendees: '5,700'  },
]

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ev-heading', {
        opacity: 0, y: 28, stagger: 0.1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.ev-heading', start: 'top 82%' },
      })
      gsap.from('.ev-card', {
        opacity: 0, y: 28, stagger: 0.07, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.ev-card', start: 'top 85%' },
      })
      gsap.from('.ev-row', {
        opacity: 0, x: -20, stagger: 0.06, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.ev-row', start: 'top 85%' },
      })
      gsap.from('.ev-spec', {
        opacity: 0, y: 16, stagger: 0.08, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.ev-spec', start: 'top 88%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="events" className="relative bg-ink-2 py-28 lg:py-36 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-gold-glow-corner" />

      <div className="section-container lg:pl-72">

        {/* Header */}
        <div className="mb-16">
          <p className="ev-heading eyebrow mb-4">Events & Platform</p>
          <h2 className="ev-heading display-lg max-w-3xl">
            This isn't a building.{' '}
            <span className="shimmer-text font-display italic">It's a platform.</span>
          </h2>
          <p className="ev-heading body-lg max-w-xl mt-6">
            200,000+ sq ft of activatable space with built-in audiences — the most powerful
            event platform in the region.
          </p>
        </div>

        {/* Hero event image */}
        <div className="relative mb-16 overflow-hidden group aspect-16-6">
          <img
            src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1400&q=80"
            alt="American Dream Events"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/30 to-ink/80" />
          <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
            <div>
              <p className="font-display text-5xl text-cream italic">200K+</p>
              <p className="font-sans text-xs tracking-widest uppercase text-cream-muted">Sq ft of activatable event space</p>
            </div>
            <button type="button" onClick={() => scrollTo('contact')} className="hidden md:block btn-gold" data-cursor="Book">
              Book an Event
            </button>
          </div>
        </div>

        {/* Event type grid — TiltCard for 3D hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {EVENT_TYPES.map((ev) => (
            <TiltCard key={ev.title} intensity={8}>
              <div className="ev-card card-dark hover:border-gold/40 transition-all duration-300 group h-full">
                <span className="text-3xl block mb-4">{ev.icon}</span>
                <h3 className="font-display text-xl text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                  {ev.title}
                </h3>
                <p className="body-md">{ev.description}</p>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Past highlights */}
        <p className="eyebrow mb-8">Past Event Highlights</p>
        <div className="space-y-px mb-16">
          {PAST_HIGHLIGHTS.map((h) => (
            <div
              key={h.name}
              className="ev-row flex items-center justify-between bg-ink-card border border-ink-border px-8 py-5 hover:border-gold/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-6">
                <span className="font-sans text-xs tracking-widest uppercase text-gold w-24 shrink-0">{h.type}</span>
                <span className="font-display text-lg text-cream">{h.name}</span>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="font-display text-2xl text-cream">{h.attendees}</p>
                <p className="font-sans text-xs tracking-widest uppercase text-cream-dim">Attendees</p>
              </div>
            </div>
          ))}
        </div>

        {/* Venue specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-border mb-8">
          {[
            { stat: '200K+', label: 'Event Sq Ft' },
            { stat: '12K',   label: 'Max Capacity' },
            { stat: '6',     label: 'Activation Zones' },
            { stat: '365',   label: 'Days Available' },
          ].map(({ stat, label }) => (
            <div key={label} className="ev-spec bg-ink-card flex flex-col items-center justify-center py-10 text-center">
              <p className="font-display text-4xl text-gold mb-2">{stat}</p>
              <p className="font-sans text-xs tracking-widest uppercase text-cream-muted">{label}</p>
            </div>
          ))}
        </div>

        {/* Venue sub-modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Performing Arts',
              body: 'State-of-the-art stage infrastructure, professional rigging, lighting, and sound. Intimate to full-scale theatrical.',
              img: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80',
            },
            {
              title: 'Exposition & Convention',
              body: 'Convention-ready space with full AV, flexible floor plans, on-site catering, and adjacent hotel accommodations.',
              img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
            },
          ].map(({ title, body, img }) => (
            <div key={title} className="relative overflow-hidden group aspect-4-3">
              <img src={img} alt={title} loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/10" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="eyebrow mb-2">Venue Spotlight</p>
                <h3 className="font-display text-3xl text-cream mb-3">{title}</h3>
                <p className="body-md max-w-sm mb-4">{body}</p>
                <button type="button" onClick={() => scrollTo('contact')}
                  className="self-start font-sans text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
                  data-cursor="Inquire">
                  Inquire →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
