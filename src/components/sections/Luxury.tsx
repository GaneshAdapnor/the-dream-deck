import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { LUXURY_BRANDS } from '../../data/content'
import { useDeck } from '../../context/DeckContext'

export default function Luxury() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { goToSlide } = useDeck()

  return (
    <section id="luxury" className="relative bg-ink py-28 lg:py-36 overflow-hidden">
      {/* Subtle gold texture in background */}
      <div className="absolute inset-0 opacity-[0.025] bg-gold-blob-top-right" />

      <div className="section-container lg:pl-72" ref={ref}>
        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Left — Imagery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden aspect-3-4">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=85"
                alt="American Dream Luxury Wing"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>
            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 bg-ink-card border border-gold/30 p-6 max-w-xs"
            >
              <p className="font-display text-4xl text-gold">$2.5B+</p>
              <p className="font-sans text-xs tracking-widest uppercase text-cream-muted mt-2">
                Annual luxury retail potential in the NYC metro catchment
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="pt-8"
          >
            <p className="eyebrow mb-6">The Luxury Collection</p>
            <h2 className="display-lg mb-8">
              Where{' '}
              <span className="shimmer-text font-display italic">prestige</span>
              <br />
              finds its audience.
            </h2>
            <p className="body-lg mb-8 max-w-md">
              The Luxury Collection at American Dream is the premier luxury retail destination
              in the greater New York metropolitan area. With dedicated entrances, curated
              environments, and VIP services, it is built to match the expectation of the
              world's most discerning consumers.
            </p>
            <p className="body-md mb-10 max-w-md">
              40 million+ potential customers within one hour — including the highest concentration
              of ultra-high-net-worth individuals in North America.
            </p>
            <button type="button" onClick={() => goToSlide(7)} className="btn-gold mb-6">
              Explore Luxury Leasing
            </button>
          </motion.div>
        </div>

        {/* Luxury brand names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="eyebrow text-center mb-10">Current Luxury Tenants & Partners</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-ink-border">
            {LUXURY_BRANDS.map((brand) => (
              <div
                key={brand}
                className="bg-ink-card flex items-center justify-center py-8 px-4 hover:bg-ink-2 transition-colors group"
              >
                <span className="font-display text-lg text-cream-dim group-hover:text-gold transition-colors duration-300 text-center tracking-wide">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Luxury differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: 'Dedicated Entry Points',
              body: 'Separate luxury access with valet, concierge, and a distinct arrival experience designed for high-net-worth shoppers.',
            },
            {
              title: 'Curated Adjacencies',
              body: 'Your brand positioned alongside the world\'s most prestigious houses — curation that protects positioning and elevates perception.',
            },
            {
              title: 'VIP Programming',
              body: 'Private shopping events, after-hours exclusives, and brand-specific programming that deepens client relationships.',
            },
          ].map(({ title, body }) => (
            <div key={title} className="border-t border-gold/20 pt-6">
              <div className="gold-line mb-4" />
              <h3 className="font-display text-xl text-cream mb-3">{title}</h3>
              <p className="body-md">{body}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
