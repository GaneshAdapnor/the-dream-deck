import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useDeck } from '../../context/DeckContext'

const LEASING_TIERS = [
  {
    category: 'Flagship Retail',
    description: 'Large-format anchor spaces for iconic brand expressions in the highest-traffic zones of the property.',
    sqft: '5,000 – 50,000',
    traffic: '40M+ annual visitors',
    cta: 'Inquire About Flagship',
    tierClass: 'tier-flagship',
    labelClass: 'tier-flagship-label',
  },
  {
    category: 'Mid-Tier Retail',
    description: 'Prime inline and endcap spaces with exceptional visibility, serving the property\'s core demographic.',
    sqft: '1,500 – 5,000',
    traffic: 'All-season foot traffic',
    cta: 'Explore Mid-Tier',
    tierClass: 'tier-mid',
    labelClass: 'tier-mid-label',
  },
  {
    category: 'Pop-Up & Flex',
    description: 'Short-term, high-impact activation spaces. Perfect for launches, limited editions, or market testing.',
    sqft: '200 – 2,000',
    traffic: 'Flexible terms available',
    cta: 'Book a Pop-Up',
    tierClass: 'tier-popup',
    labelClass: 'tier-popup-label',
  },
  {
    category: 'F&B Concepts',
    description: 'Inline, food hall, and freestanding restaurant opportunities across multiple dining zones.',
    sqft: '500 – 8,000',
    traffic: 'Multi-zone dining draws',
    cta: 'See F&B Spaces',
    tierClass: 'tier-fb',
    labelClass: 'tier-fb-label',
  },
]

const BRAND_LOGOS = [
  'ZARA', 'H&M', 'UNIQLO', 'APPLE', 'NIKE', 'ADIDAS',
  'LUSH', 'SEPHORA', 'PANDORA', 'PRIMARK', 'FOREVER 21', 'VICTORIA\'S SECRET',
]

export default function Retail() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { goToSlide } = useDeck()

  return (
    <section id="retail" className="relative bg-ink-2 py-28 lg:py-36 overflow-hidden">
      {/* Gold accent blob — pure CSS, no inline style */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.04] blur-3xl bg-gold" />

      <div className="section-container lg:pl-72" ref={ref}>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="eyebrow mb-4"
            >
              Retail
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="display-lg"
            >
              Every brand category.<br />
              <span className="shimmer-text font-display italic">Every opportunity.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="body-md max-w-sm"
          >
            450+ retail and dining concepts spanning multiple categories, price points,
            and experience types — all within one property that generates extraordinary
            foot traffic year-round.
          </motion.p>
        </div>

        {/* Leasing tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {LEASING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`card-dark group hover:border-gold/40 transition-all duration-300 ${tier.tierClass}`}
            >
              <p className={`font-sans text-xs tracking-widest uppercase mb-3 ${tier.labelClass}`}>
                {tier.category}
              </p>
              <p className="body-md mb-6">{tier.description}</p>
              <div className="flex gap-6 mb-6">
                <div>
                  <p className="font-display text-2xl text-cream">{tier.sqft}</p>
                  <p className="font-sans text-xs tracking-widest uppercase text-cream-dim mt-1">Sq Ft Range</p>
                </div>
                <div className="w-px bg-ink-border" />
                <div>
                  <p className="font-display text-xl text-cream">{tier.traffic}</p>
                  <p className="font-sans text-xs tracking-widest uppercase text-cream-dim mt-1">Audience</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => goToSlide(7)}
                className="font-sans text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors flex items-center gap-2"
              >
                {tier.cta} →
              </button>
            </motion.div>
          ))}
        </div>

        {/* Featured brands scrolling marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="eyebrow mb-8 text-center">Featured Tenants Include</p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-ink-2 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-ink-2 to-transparent pointer-events-none" />
            <div className="flex gap-12 overflow-hidden">
              <div className="flex gap-12 animate-[marquee_20s_linear_infinite] shrink-0">
                {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
                  <span
                    key={`${brand}-${i}`}
                    className="font-sans font-semibold text-xs tracking-widest uppercase text-cream-dim whitespace-nowrap hover:text-gold transition-colors cursor-default"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero retail image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-20 relative overflow-hidden group aspect-21-8"
        >
          <img
            src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=1400&q=80"
            alt="American Dream Retail Environment"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/40" />
          <div className="absolute inset-0 flex items-center justify-between px-12">
            <div>
              <p className="font-display text-4xl md:text-5xl text-cream italic">
                "The retail destination<br />the NYC metro has been missing."
              </p>
            </div>
            <button
              type="button"
              onClick={() => goToSlide(7)}
              className="hidden md:block btn-gold shrink-0"
              data-cursor="Inquire"
            >
              Inquire About Space
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
