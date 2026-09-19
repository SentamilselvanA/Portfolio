import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePortfolioData } from '../../hooks/usePortfolioData'

function Counter({ target, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const step = ts => {
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(ease * target))
      if (p < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])
  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

export default function ProfessionalCodingProfiles() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const { coding: CODING_STATS } = usePortfolioData()

  return (
    <section id="p-profiles" className="py-20 px-4" style={{ background: '#faf7ff' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(192,38,211,0.08)', color: '#c026d3', border: '1px solid rgba(192,38,211,0.2)' }}>
            Coding Profiles
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#172033' }}>Stats Dashboard</h2>
          <p className="text-base" style={{ color: '#64748b' }}>Quantified progress across competitive programming platforms</p>
        </motion.div>

        {/* Quick stat badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {CODING_STATS.quick.map((b, i) => (
            <motion.div key={i}
              className="rounded-2xl p-5 text-center"
              style={{ background: '#ffffff', border: '1px solid #eee5f5', boxShadow: '0 4px 16px rgba(192,38,211,0.06)' }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(192,38,211,0.12)' }}
            >
              <div className="text-3xl mb-2">{b.icon}</div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#c026d3' }}>
                <Counter target={b.value} suffix={b.suffix || ''} prefix={b.prefix || ''} />
              </div>
              <div className="text-xs font-medium" style={{ color: '#94a3b8' }}>{b.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CODING_STATS.platforms.map((platform, pi) => (
            <motion.div key={pi}
              className="rounded-2xl p-6"
              style={{ background: '#ffffff', border: '1px solid #eee5f5', boxShadow: '0 4px 16px rgba(192,38,211,0.05)' }}
              initial={{ opacity: 0, x: pi % 2 === 0 ? -24 : 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + pi * 0.08, duration: 0.6 }}
              whileHover={{ boxShadow: '0 12px 30px rgba(192,38,211,0.1)', borderColor: 'rgba(192,38,211,0.2)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{platform.icon}</span>
                  <h3 className="font-bold text-lg" style={{ color: '#172033' }}>{platform.platform}</h3>
                </div>
                <a href={platform.link} target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:-translate-y-0.5"
                  style={{ background: 'rgba(192,38,211,0.08)', color: '#c026d3', border: '1px solid rgba(192,38,211,0.2)' }}>
                  View Profile →
                </a>
              </div>

              {platform.stats.length > 0 && (
                <div className="flex gap-6 mb-4 flex-wrap">
                  {platform.stats.map((s, i) => (
                    <div key={i}>
                      <div className="text-2xl font-bold" style={{ color: '#c026d3' }}>
                        <Counter target={s.value} suffix={s.suffix || ''} />
                      </div>
                      <div className="text-xs" style={{ color: '#94a3b8' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {platform.langBadges?.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {platform.langBadges.map(({ lang, stars, color }) => (
                    <div key={lang} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl"
                      style={{ background: '#faf7ff', border: '1px solid #eee5f5' }}>
                      <span className="font-bold text-sm" style={{ color }}>{lang}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <span key={si} style={{ color: si < stars ? '#fbbf24' : '#e2e8f0', fontSize: 10 }}>★</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {platform.bars.length > 0 && (
                <div className="space-y-3">
                  {platform.bars.map(([name, pct]) => (
                    <div key={name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: '#64748b' }}>{name}</span>
                        <span style={{ color: '#c026d3' }}>{pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: '#f1e8ff' }}>
                        <motion.div className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #c026d3, #a855f7)' }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${pct}%` } : {}}
                          transition={{ duration: 1.2, delay: 0.4 + pi * 0.08 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
