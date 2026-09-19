import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioData } from '../../hooks/usePortfolioData'

export default function ProfessionalHero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const { personal: PERSONAL, roles: ROLES, social: SOCIAL_LINKS, coding } = usePortfolioData()

  useEffect(() => {
    if (!ROLES.length) return
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2800)
    return () => clearInterval(t)
  }, [ROLES.length])

  const github = SOCIAL_LINKS.find(l => l.label === 'GitHub')
  const linkedin = SOCIAL_LINKS.find(l => l.label === 'LinkedIn')

  return (
    <section id="p-hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-24"
      style={{ background: 'linear-gradient(160deg, #faf7ff 0%, #ffffff 50%, #fdf4ff 100%)' }}>

      {/* Soft background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: '-15%', right: '-10%', background: 'radial-gradient(circle, rgba(192,38,211,0.07) 0%, transparent 70%)' }} />
        <div className="absolute rounded-full" style={{ width: 500, height: 500, bottom: '-10%', left: '-8%', background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left content */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ background: 'rgba(192,38,211,0.08)', border: '1px solid rgba(192,38,211,0.2)', color: '#c026d3' }}
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {PERSONAL.subtitle}
            </motion.div>

            <motion.h1
              className="font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#172033' }}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
            >
              Hi, I'm{' '}
              <span style={{ background: 'linear-gradient(135deg, #c026d3, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {PERSONAL.name}
              </span>
            </motion.h1>

            {/* Animated role */}
            <div className="h-9 flex items-center mb-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIdx}
                  className="text-lg font-medium"
                  style={{ color: '#a855f7' }}
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {ROLES[roleIdx]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.p
              className="text-base leading-relaxed mb-8"
              style={{ color: '#64748b', maxWidth: 480 }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            >
              {PERSONAL.tagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            >
              <button
                onClick={() => document.getElementById('p-projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #c026d3, #a855f7)', boxShadow: '0 4px 20px rgba(192,38,211,0.3)' }}
              >
                View Projects
              </button>
              <a
                href={PERSONAL.resumePath} target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5"
                style={{ border: '2px solid #c026d3', color: '#c026d3', background: 'transparent' }}
              >
                View Resume
              </a>
              <button
                onClick={() => document.getElementById('p-contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5"
                style={{ border: '2px solid #eee5f5', color: '#64748b', background: 'transparent' }}
              >
                Contact Me
              </button>
            </motion.div>

            {/* Social row */}
            <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              {[github, linkedin].filter(Boolean).map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5"
                  style={{ background: '#faf7ff', border: '1px solid #eee5f5', color: '#64748b' }}>
                  <span>{l.icon}</span> {l.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — profile card */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.9 }}
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(192,38,211,0.15), rgba(168,85,247,0.1))', transform: 'rotate(3deg)', borderRadius: 28 }} />
              <div className="relative rounded-3xl p-8 text-center" style={{ background: '#ffffff', border: '1px solid #eee5f5', boxShadow: '0 20px 60px rgba(192,38,211,0.1)', borderRadius: 24, minWidth: 280 }}>
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #c026d3, #a855f7)', boxShadow: '0 8px 24px rgba(192,38,211,0.35)' }}>
                  S
                </div>
                <h3 className="font-bold text-xl mb-1" style={{ color: '#172033' }}>{PERSONAL.name}</h3>
                <p className="text-sm mb-1" style={{ color: '#a855f7' }}>{PERSONAL.title}</p>
                <p className="text-xs mb-5" style={{ color: '#94a3b8' }}>📍 {PERSONAL.location}</p>

                {/* Quick stats — driven by live coding data */}
                <div className="grid grid-cols-3 gap-3">
                  {coding.quick.slice(0, 2).map(q => (
                    <div key={q.label} className="rounded-xl p-2" style={{ background: '#faf7ff', border: '1px solid #eee5f5' }}>
                      <div className="font-bold text-sm" style={{ color: '#c026d3' }}>
                        {q.prefix || ''}{q.value}{q.suffix || ''}
                      </div>
                      <div className="text-xs" style={{ color: '#94a3b8' }}>{q.label}</div>
                    </div>
                  ))}
                  <div className="rounded-xl p-2" style={{ background: '#faf7ff', border: '1px solid #eee5f5' }}>
                    <div className="font-bold text-sm" style={{ color: '#c026d3' }}>{PERSONAL.cgpa || '7.83'}</div>
                    <div className="text-xs" style={{ color: '#94a3b8' }}>CGPA</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
      >
        <span className="text-xs font-medium" style={{ color: '#cbd5e1' }}>Scroll</span>
        <motion.div className="w-px h-8 rounded-full" style={{ background: 'linear-gradient(180deg, #c026d3, transparent)' }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>
    </section>
  )
}
