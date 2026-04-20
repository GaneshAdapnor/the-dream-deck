import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { DINING_CONCEPTS } from '../../data/content'
import { useDeck } from '../../context/DeckContext'

export default function Dining() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { goToSlide } = useDeck()

  return (
    <section id="dining" className="relative bg-ink-2 py-28 lg:py-36 overflow-hidden">
      <div className="section-container lg:pl-72" ref={ref}>
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="eyebrow mb-4"
          >
            Dining & Lifestyle
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-lg max-w-2xl"
          >
            Don't just eat.{' '}
            <span className="shimmer-text font-display italic">Experience.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="body-lg max-w-xl mt-6"
          >
            Dining at American Dream is not an afterthought — it is a destination in itself.
            100+ dining concepts across elevated restaurant experiences, celebrity concepts,
            and a globally-curated food hall.
          </motion.p>
        </div>

        {/* Full-width hero dining image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mb-16 overflow-hidden group aspect-16-6"
        >
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80"
            alt="American Dream Fine Dining"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent" />
          <div className="absolute inset-0 flex items-end p-10">
            <div>
              <p className="font-display text-5xl text-cream italic mb-2">100+</p>
              <p className="font-sans text-xs tracking-widest uppercase text-cream-muted">Dining concepts across every occasion</p>
            </div>
          </div>
        </motion.div>

        {/* Dining grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
          {DINING_CONCEPTS.map((concept, i) => (
            <motion.div
              key={concept.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden cursor-default aspect-4-3"
            >
              <img
                src={concept.image}
                alt={concept.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display text-xl text-cream">{concept.name}</p>
                <p className="font-sans text-xs tracking-widest uppercase text-gold mt-1">{concept.type}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dining differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-px bg-ink-border"
        >
          {[
            { stat: '100+', label: 'Dining Concepts' },
            { stat: 'Global', label: 'Cuisine Diversity' },
            { stat: '3', label: 'Dining Zones' },
            { stat: '7 Days', label: 'Always Open' },
          ].map(({ stat, label }) => (
            <div key={label} className="bg-ink-card px-8 py-10 flex flex-col items-center text-center gap-2">
              <p className="font-display text-4xl text-gold">{stat}</p>
              <p className="font-sans text-xs tracking-widest uppercase text-cream-muted">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* F&B leasing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-ink-border p-8"
        >
          <div>
            <h3 className="font-display text-2xl text-cream mb-2">
              F&B Leasing Opportunities Available
            </h3>
            <p className="body-md max-w-md">
              Inline, food hall, and standalone restaurant spaces with options from fast-casual to
              white-tablecloth fine dining.
            </p>
          </div>
          <button type="button" onClick={() => goToSlide(7)} className="btn-gold shrink-0">
            Explore F&B Leasing
          </button>
        </motion.div>
      </div>
    </section>
  )
}
