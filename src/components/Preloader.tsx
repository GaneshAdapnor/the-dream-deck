import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const rootRef  = useRef<HTMLDivElement>(null)
  const lineRef  = useRef<HTMLDivElement>(null)
  const textRef  = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // After the panel slides up, notify parent
          gsap.to(panelRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
            onComplete,
          })
        },
      })

      // Gold rule grows
      tl.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 0.7,
        ease: 'power3.out',
      })

      // Each letter drops in
      tl.from('.pre-char', {
        y: '120%',
        duration: 0.7,
        stagger: 0.04,
        ease: 'power4.out',
      }, '-=0.3')

      // Subtitle fades
      tl.from('.pre-sub', {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.2')

      // Hold then exit
      tl.to({}, { duration: 0.6 })

      // Shrink text before wipe
      tl.to(textRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.4,
        ease: 'power3.in',
      })
    }, rootRef)

    return () => ctx.revert()
  }, [onComplete])

  const title = 'American Dream'

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink overflow-hidden"
    >
      {/* animated gold grid */}
      <div className="absolute inset-0 opacity-[0.04] pre-grid" />

      <div ref={rootRef} className="relative text-center px-8">
        {/* Gold line */}
        <div ref={lineRef} className="mx-auto mb-8 h-px w-24 bg-gold-gradient" />

        {/* Title — split into chars */}
        <div ref={textRef} className="overflow-hidden">
          <div className="flex justify-center flex-wrap">
            {title.split('').map((ch, i) => (
              <div key={i} className="overflow-hidden">
                <span
                  className={`pre-char inline-block font-display text-[clamp(2.5rem,8vw,6rem)] leading-none tracking-tight ${
                    i < 8 ? 'text-cream' : i === 8 ? 'text-cream' : 'shimmer-text'
                  }`}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              </div>
            ))}
          </div>

          <p className="pre-sub font-sans text-xs tracking-widest2 uppercase text-gold mt-6">
            East Rutherford · New Jersey · Gateway to New York City
          </p>
        </div>
      </div>

      {/* Corner marks */}
      {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos) => (
        <div key={pos} className={`absolute ${pos} w-4 h-4`}>
          <div className="absolute top-0 left-0 w-full h-px bg-gold/40" />
          <div className="absolute top-0 left-0 h-full w-px bg-gold/40" />
        </div>
      ))}
    </div>
  )
}
