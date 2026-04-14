import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [label, setLabel]     = useState('')

  useEffect(() => {
    const dot  = dotRef.current!
    const ring = ringRef.current!

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setVisible(true)
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power3.out' })
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n
    let raf: number
    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.10)
      ringY = lerp(ringY, mouseY, 0.10)
      gsap.set(ring, { x: ringX, y: ringY })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onHoverIn = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      setLabel(el.dataset.cursor ?? '')
      gsap.to(ring, { scale: el.dataset.cursor ? 2.8 : 1.8, duration: 0.35, ease: 'power3.out' })
      gsap.to(dot,  { scale: 0, duration: 0.2 })
    }
    const onHoverOut = () => {
      setLabel('')
      gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power3.out' })
      gsap.to(dot,  { scale: 1, duration: 0.2 })
    }

    const bindTargets = () => {
      document.querySelectorAll('button, a, [data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
        el.addEventListener('mouseenter', onHoverIn)
        el.addEventListener('mouseleave', onHoverOut)
      })
    }
    bindTargets()

    const obs = new MutationObserver(bindTargets)
    obs.observe(document.body, { childList: true, subtree: true })

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      obs.disconnect()
    }
  }, [])

  return (
    /* cursor-root provides opacity transition via CSS class (no inline style) */
    <div className={`cursor-root fixed inset-0 z-[300] pointer-events-none ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Dot — will-change-transform via Tailwind */}
      <div
        ref={dotRef}
        className="absolute w-2 h-2 bg-gold rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
      {/* Ring — will-change-transform via Tailwind */}
      <div
        ref={ringRef}
        className="absolute w-10 h-10 rounded-full border border-gold/60 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center will-change-transform"
      >
        <span className="font-sans text-[8px] tracking-widest uppercase text-gold whitespace-nowrap">
          {label}
        </span>
      </div>
    </div>
  )
}
