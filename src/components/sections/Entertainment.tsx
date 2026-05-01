import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ENTERTAINMENT_CARDS } from '../../data/content'
import { useDeck } from '../../context/DeckContext'

const cardVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    filter: 'brightness(0.3)',
    x: dir > 0 ? '3%' : '-3%',
  }),
  center: {
    opacity: 1,
    filter: 'brightness(1)',
    x: '0%',
  },
  exit: (dir: number) => ({
    opacity: 0,
    filter: 'brightness(0.3)',
    x: dir > 0 ? '-3%' : '3%',
  }),
}

export default function Entertainment() {
  const [cardIndex, setCardIndex] = useState(0)
  const [dir, setDir]             = useState(1)
  const { goToSlide }             = useDeck()
  const total                     = ENTERTAINMENT_CARDS.length

  const goCard = useCallback((i: number) => {
    if (i === cardIndex || i < 0 || i >= total) return
    setDir(i > cardIndex ? 1 : -1)
    setCardIndex(i)
  }, [cardIndex, total])

  const card = ENTERTAINMENT_CARDS[cardIndex]

  return (
    <section className="relative bg-ink h-screen overflow-hidden">

      {/* ── Top progress strip ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-ink-border z-30 flex">
        {ENTERTAINMENT_CARDS.map((_, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => goCard(i)}
            className="flex-1 h-full relative overflow-hidden"
            aria-label={`Go to attraction ${i + 1}`}
          >
            <motion.div
              className="absolute inset-0 bg-gold"
              animate={{ scaleX: i <= cardIndex ? 1 : 0 }}
              initial={{ scaleX: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.button>
        ))}
      </div>

      {/* ── Card carousel ── */}
      <AnimatePresence initial={false} custom={dir} mode="wait">
        <motion.div
          key={cardIndex}
          custom={dir}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: 'easeOut' }}
              loading="eager"
            />
          </div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

          {/* ── GIANT background number ── */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 font-display text-[38vw] leading-[0.8] text-cream/[0.05] select-none pointer-events-none tabular-nums"
          >
            {String(cardIndex + 1).padStart(2, '0')}
          </div>

          {/* Card content — bottom left */}
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-14 lg:px-16 pb-24 max-w-3xl">
            <span className={`ent-badge inline-block font-sans text-xs tracking-widest uppercase px-4 py-1.5 mb-6 border ${card.badgeClass}`}>
              {card.stat}
            </span>
            <p className="font-sans text-[10px] tracking-widest uppercase text-gold mb-3">
              {card.subtitle}
            </p>
            <h2 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] text-cream leading-none mb-6 tracking-tight">
              {card.title}
            </h2>
            <p className="font-sans text-base lg:text-lg text-cream-muted max-w-md mb-10 leading-relaxed">
              {card.description}
            </p>
            <button
              type="button"
              onClick={() => goToSlide(9)}
              className="btn-gold"
              data-cursor="Partner"
            >
              Sponsorship Opportunities
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Section header ── */}
      <div className="absolute top-4 left-6 md:left-12 z-20 max-w-xs pointer-events-none">
        <p className="eyebrow mb-1">Attractions & Entertainment</p>
        <p className="font-display text-sm md:text-base text-cream/55 leading-tight italic">
          Experiences no other property{' '}
          <span className="shimmer-text">in the world</span> can offer.
        </p>
      </div>

      {/* ── Card navigation — bottom right ── */}
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
          {String(cardIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => goCard(cardIndex + 1)}
          disabled={cardIndex === total - 1}
          className="w-10 h-10 border border-ink-border bg-ink/60 backdrop-blur-sm flex items-center justify-center text-cream-dim hover:border-gold hover:text-gold disabled:opacity-20 transition-all duration-200"
          aria-label="Next attraction"
        >
          →
        </button>
      </div>

      {/* ── Dot indicators — bottom center ── */}
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
