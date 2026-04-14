import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

type Path = 'leasing' | 'events' | 'sponsorship'

const PATHS: { id: Path; title: string; subtitle: string; icon: string; fields: string[] }[] = [
  {
    id: 'leasing',
    title: 'Retail Leasing',
    subtitle: 'Flagship, mid-tier, pop-up, and F&B opportunities.',
    icon: '🏬',
    fields: ['Company / Brand Name', 'Category', 'Target Space Size (sq ft)', 'Message'],
  },
  {
    id: 'events',
    title: 'Event Booking',
    subtitle: 'Concerts, product launches, activations, and corporate events.',
    icon: '🎤',
    fields: ['Company / Organization', 'Event Type', 'Estimated Attendance', 'Preferred Date(s)', 'Message'],
  },
  {
    id: 'sponsorship',
    title: 'Brand Partnership',
    subtitle: 'Sponsorships, naming rights, and branded activations.',
    icon: '🤝',
    fields: ['Company / Brand', 'Partnership Focus', 'Budget Range', 'Message'],
  },
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [activePath, setActivePath] = useState<Path>('leasing')
  const [submitted, setSubmitted] = useState(false)

  const currentPath = PATHS.find((p) => p.id === activePath)!

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative bg-ink py-28 lg:py-36 overflow-hidden">
      {/* Full-width gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-gradient" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.06] blur-3xl rounded-full bg-gold" />

      <div className="section-container lg:pl-72" ref={ref}>
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="eyebrow mb-4"
          >
            Partner With Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-lg max-w-2xl"
          >
            Your next move{' '}
            <span className="shimmer-text font-display italic">starts here.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="body-lg max-w-xl mt-6"
          >
            Select the partnership path that matches your goal.
            Our team will respond within one business day.
          </motion.p>
        </div>

        {/* Path selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          {PATHS.map((path) => (
            <button
              key={path.id}
              onClick={() => { setActivePath(path.id); setSubmitted(false) }}
              className={`text-left p-8 border transition-all duration-300 ${
                activePath === path.id
                  ? 'border-gold bg-ink-card'
                  : 'border-ink-border bg-ink-2 hover:border-gold/40'
              }`}
            >
              <span className="text-4xl block mb-4">{path.icon}</span>
              <p className={`font-display text-2xl mb-2 transition-colors duration-300 ${
                activePath === path.id ? 'text-gold' : 'text-cream'
              }`}>
                {path.title}
              </p>
              <p className="font-sans text-sm text-cream-muted">{path.subtitle}</p>
            </button>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="max-w-2xl"
        >
          {submitted ? (
            <div className="border border-gold/40 bg-ink-card p-12 text-center">
              <div className="w-12 h-12 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#C9973A" strokeWidth="2">
                  <polyline points="4 10 8 14 16 6" />
                </svg>
              </div>
              <h3 className="font-display text-3xl text-cream mb-4">Message Received</h3>
              <p className="body-md mb-8">
                Our team will reach out within one business day.
                We look forward to building something remarkable together.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-outline"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Always present fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="eyebrow block mb-2">First Name</label>
                  <input
                    required
                    placeholder="Alexandra"
                    className="w-full bg-ink-card border border-ink-border text-cream placeholder-cream-dim px-5 py-4 font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="eyebrow block mb-2">Last Name</label>
                  <input
                    required
                    placeholder="Morgan"
                    className="w-full bg-ink-card border border-ink-border text-cream placeholder-cream-dim px-5 py-4 font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="eyebrow block mb-2">Email</label>
                <input
                  required
                  type="email"
                  placeholder="alex@brand.com"
                  className="w-full bg-ink-card border border-ink-border text-cream placeholder-cream-dim px-5 py-4 font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-200"
                />
              </div>

              {/* Dynamic path fields */}
              {currentPath.fields.map((field) => (
                <div key={field}>
                  <label className="eyebrow block mb-2">{field}</label>
                  {field === 'Message' ? (
                    <textarea
                      rows={4}
                      placeholder={`Tell us about your ${activePath === 'leasing' ? 'space needs' : activePath === 'events' ? 'event vision' : 'partnership goals'}...`}
                      className="w-full bg-ink-card border border-ink-border text-cream placeholder-cream-dim px-5 py-4 font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
                    />
                  ) : (
                    <input
                      placeholder={field}
                      className="w-full bg-ink-card border border-ink-border text-cream placeholder-cream-dim px-5 py-4 font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-200"
                    />
                  )}
                </div>
              ))}

              <div className="flex items-center gap-4 pt-4">
                <button type="submit" className="btn-gold">
                  Submit Inquiry
                </button>
                <p className="font-sans text-xs text-cream-dim">
                  Response within 1 business day
                </p>
              </div>
            </form>
          )}
        </motion.div>

        {/* Direct contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-20 pt-12 border-t border-ink-border grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { role: 'Retail Leasing', contact: 'leasing@americandream.com', phone: '+1 (201) 500-8900' },
            { role: 'Events & Booking', contact: 'events@americandream.com', phone: '+1 (201) 500-8901' },
            { role: 'Brand Partnerships', contact: 'partnerships@americandream.com', phone: '+1 (201) 500-8902' },
          ].map(({ role, contact, phone }) => (
            <div key={role}>
              <p className="eyebrow mb-3">{role}</p>
              <p className="font-display text-lg text-cream hover:text-gold transition-colors cursor-pointer">
                {contact}
              </p>
              <p className="font-sans text-sm text-cream-muted mt-1">{phone}</p>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-ink-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <span className="font-display text-2xl text-cream">American</span>
            <span className="font-display text-2xl text-gold ml-2">Dream</span>
            <p className="font-sans text-xs text-cream-dim mt-1">
              1 American Dream Way, East Rutherford, NJ 07073
            </p>
          </div>
          <p className="font-sans text-xs text-cream-dim">
            © {new Date().getFullYear()} American Dream. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
