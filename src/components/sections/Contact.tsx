import { useState } from 'react'
import { motion } from 'framer-motion'

const PATHS = [
  {
    id: 'lease',
    label: 'Retail & Leasing',
    headline: 'Secure your space in the most visited destination in the region.',
    stat: '450+',
    statLabel: 'Brands already in residence',
    email: 'leasing@americandream.com',
    phone: '+1 (201) 559-3300',
    image: 'https://images.unsplash.com/photo-1555529771-122e5d9f2341?w=900&q=70',
    cta: 'Start the Conversation',
    glowClass: 'path-glow-gold',
    barClass:  'path-bar-gold',
    statClass: 'path-stat-gold',
    btnClass:  'path-btn-gold',
    labelActive: '#C9973A',
    btnActiveBg: '#C9973A',
  },
  {
    id: 'events',
    label: 'Events & Venues',
    headline: 'Book 200K+ sq ft of world-class activation and performance space.',
    stat: '12K',
    statLabel: 'Max single-event capacity',
    email: 'events@americandream.com',
    phone: '+1 (201) 559-3301',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=70',
    cta: 'Check Availability',
    glowClass: 'path-glow-purple',
    barClass:  'path-bar-purple',
    statClass: 'path-stat-purple',
    btnClass:  'path-btn-purple',
    labelActive: '#A855F7',
    btnActiveBg: '#A855F7',
  },
  {
    id: 'sponsor',
    label: 'Brand Partnership',
    headline: 'Build a media platform reaching 40M high-income consumers annually.',
    stat: '40M+',
    statLabel: 'Annual consumer touchpoints',
    email: 'partners@americandream.com',
    phone: '+1 (201) 559-3302',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=70',
    cta: 'Propose a Partnership',
    glowClass: 'path-glow-sky',
    barClass:  'path-bar-sky',
    statClass: 'path-stat-sky',
    btnClass:  'path-btn-sky',
    labelActive: '#7DD3F5',
    btnActiveBg: '#7DD3F5',
  },
]

export default function Contact() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      id="contact"
      className="relative w-full h-screen overflow-hidden bg-ink flex flex-col"
    >
      {/* Ambient bottom glow */}
      <div className="absolute inset-0 pointer-events-none contact-glow" />

      {/* ── Header ── */}
      <div className="shrink-0 px-8 lg:px-16 pt-10 pb-7 border-b border-ink-border">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Ready When You Are</p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none tracking-tight text-cream">
              The door is open.{' '}
              <span className="shimmer-text italic">Step in.</span>
            </h2>
          </div>
          <p className="hidden lg:block font-sans text-sm text-cream-muted max-w-xs text-right leading-relaxed">
            Choose the conversation you want to start.
            <br />We respond within one business day.
          </p>
        </div>
      </div>

      {/* ── Three path panels ── */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 min-h-0">
        {PATHS.map((path, i) => (
          <motion.div
            key={path.id}
            className="relative overflow-hidden group cursor-pointer border-r border-ink-border last:border-r-0"
            onClick={() => setActive(active === i ? null : i)}
            whileHover="hover"
          >
            {/* Background image with hover zoom */}
            <motion.img
              src={path.image}
              alt={path.label}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              variants={{ hover: { scale: 1.05 } }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-ink/83" />

            {/* Accent radial glow — class-based color, opacity animated */}
            <motion.div
              className={`absolute inset-0 pointer-events-none ${path.glowClass}`}
              animate={{ opacity: active === i ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Active top-border bar — class-based color, scaleX animated */}
            <motion.div
              className={`absolute top-0 left-0 right-0 h-[2px] origin-left ${path.barClass}`}
              animate={{ scaleX: active === i ? 1 : 0 }}
              initial={{ scaleX: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col p-8 lg:p-10">
              {/* Label — color animated via Framer Motion animate (not style) */}
              <motion.p
                className="font-sans text-[10px] tracking-widest uppercase mb-4"
                animate={{ color: active === i ? path.labelActive : '#5A5248' }}
                transition={{ duration: 0.3 }}
              >
                {path.label}
              </motion.p>

              {/* Headline */}
              <h3 className="font-display text-xl lg:text-2xl text-cream leading-snug mb-auto">
                {path.headline}
              </h3>

              {/* Bottom: stat + contact + CTA */}
              <div className="mt-6 pt-5 border-t border-ink-border">
                {/* Stat — class-based color, no inline style */}
                <p className={`font-display text-5xl leading-none mb-1 ${path.statClass}`}>
                  {path.stat}
                </p>
                <p className="font-sans text-[10px] tracking-widest uppercase text-cream-muted mb-5">
                  {path.statLabel}
                </p>

                <div className="space-y-1 mb-5">
                  <p className="font-sans text-xs text-cream-dim">{path.email}</p>
                  <p className="font-sans text-xs text-cream-dim">{path.phone}</p>
                </div>

                {/* CTA — bg/color animated via Framer Motion, border via class */}
                <motion.button
                  type="button"
                  className={`w-full py-3 font-sans text-[11px] tracking-widest uppercase font-medium ${path.btnClass}`}
                  animate={{
                    backgroundColor: active === i ? path.btnActiveBg : 'transparent',
                    color: active === i ? '#08090A' : path.labelActive,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {path.cta} →
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Footer strip ── */}
      <div className="shrink-0 border-t border-ink-border px-8 lg:px-16 py-5 flex items-center justify-between">
        <div>
          <p className="font-display text-xl text-cream leading-none">
            American <span className="shimmer-text">Dream</span>
          </p>
          <p className="font-sans text-[9px] tracking-widest uppercase text-cream-dim mt-1">
            1 American Dream Way · East Rutherford, NJ · Adjacent to MetLife Stadium
          </p>
        </div>
        <p className="hidden md:block font-sans text-[10px] text-cream-dim/40">
          © 2025 Triple Five Group. All rights reserved.
        </p>
      </div>
    </section>
  )
}
