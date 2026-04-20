import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ENTERTAINMENT_CARDS } from '../../data/content'
import { useDeck } from '../../context/DeckContext'

const cardVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit:  (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
}

export default function Entertainment() {
  const [cardIndex, setCardIndex] = useState(0)
  const [dir, setDir]             = useState(1)
  const { goToSlide }             = useDeck()

  const goCard = useCallback((i: number) => {
    if (i === cardIndex) return
    setDir(i > cardIndex ? 1 : -1)
    setCardIndex(i)
  }, [cardIndex])

  const card = ENTERTAINMENT_CARDS[cardIndex]

  return (
    <section className="relative bg-ink h-screen overflow-hidden">

      {/* Section header overlay — top-left */}
      <div className="absolute top-8 left-6 md:left-12 z-20 max-w-md pointer-events-none">
        <p className="eyebrow mb-2">Attractions & Entertainment</p>
        <p className="font-display text-lg md:text-xl text-cream/60 leading-tight">
          Experiences no other property{' '}
          <span className="shimmer-text font-display italic">in the world</span> can offer.
        </p>
      </div>

      {/* Card carousel */}
      <AnimatePresence initial={false} custom={dir} mode="wait">
        <motion.div
          key={cardIndex}
          custom={dir}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

          {/* Large watermark number */}
          <div className="absolute top-8 right-10 font-display text-7xl text-cream/[0.06] select-none leading-none">
            0{cardIndex + 1}
          </div>

          {/* Card content — bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-16 pb-28 max-w-3xl">
            <span className={`ent-badge inline-block self-start font-sans text-xs tracking-widest uppercase px-3 py-1 mb-6 border ${card.badgeClass}`}>
              {card.stat}
            </span>
            <p className="font-sans text-xs tracking-widest uppercase text-gold mb-3">
              {card.subtitle}
            </p>
            <h2 className="font-display text-5xl md:text-7xl text-cream leading-none mb-6">
              {card.title}
            </h2>
            <p className="body-lg max-w-md mb-10">
              {card.description}
            </p>
            <button
              type="button"
              onClick={() => goToSlide(7)}
              className="btn-gold"
              data-cursor="Partner"
            >
              Sponsorship Opportunities
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Card navigation — bottom right */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4">
        <button
          type="button"
          onClick={() => goCard(cardIndex - 1)}
          disabled={cardIndex === 0}
          className="w-10 h-10 border border-ink-border bg-ink/60 backdrop-blur-sm flex items-center justify-center text-cream-dim hover:border-gold hover:text-gold disabled:opacity-20 transition-all duration-200"
          aria-label="Previous attraction"
        >
          ←
        </button>
        <span className="font-sans text-[10px] tracking-widest uppercase text-cream-dim tabular-nums">
          {String(cardIndex + 1).padStart(2, '0')} / {String(ENTERTAINMENT_CARDS.length).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => goCard(cardIndex + 1)}
          disabled={cardIndex === ENTERTAINMENT_CARDS.length - 1}
          className="w-10 h-10 border border-ink-border bg-ink/60 backdrop-blur-sm flex items-center justify-center text-cream-dim hover:border-gold hover:text-gold disabled:opacity-20 transition-all duration-200"
          aria-label="Next attraction"
        >
          →
        </button>
      </div>

      {/* Dot indicators — bottom center */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {ENTERTAINMENT_CARDS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goCard(i)}
            aria-label={`Go to card ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === cardIndex
                ? 'w-5 h-1.5 bg-gold'
                : 'w-1.5 h-1.5 bg-cream-dim/40 hover:bg-cream-dim'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
