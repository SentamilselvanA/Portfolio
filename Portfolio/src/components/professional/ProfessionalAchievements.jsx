import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ACHIEVEMENTS } from '../../data/portfolioData'

export default function ProfessionalAchievements() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="p-vault" className="py-20 px-4" style={{ background: '#ffffff' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(192,38,211,0.08)', color: '#c026d3', border: '1px solid rgba(192,38,211,0.2)' }}>
            Achievements
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#172033' }}>Certifications & Milestones</h2>
          <p className="text-base" style={{ color: '#64748b' }}>Credentials earned through dedication and continuous learning</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div key={i}
              className="rounded-2xl p-5 text-center group transition-all"
              style={{ background: '#faf7ff', border: '1px solid #eee5f5', boxShadow: '0 4px 16px rgba(192,38,211,0.05)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -6, boxShadow: '0 16px 36px rgba(192,38,211,0.12)', borderColor: 'rgba(192,38,211,0.25)' }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{a.icon}</div>
              <div className="font-bold text-sm mb-1 leading-tight" style={{ color: '#172033' }}>{a.title}</div>
              <div className="text-xs mb-2" style={{ color: '#94a3b8' }}>{a.org}</div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-3"
                style={{ background: 'rgba(192,38,211,0.08)', color: '#c026d3', border: '1px solid rgba(192,38,211,0.18)' }}>
                {a.year}
              </div>
              {a.link && a.link !== '#' && (
                <div>
                  <a href={a.link} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-medium transition-all hover:underline"
                    style={{ color: '#a855f7' }}>
                    View Certificate →
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
