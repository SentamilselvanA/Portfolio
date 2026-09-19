import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePortfolioData } from '../../hooks/usePortfolioData'

function SkillCard({ skill, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl p-4 flex items-center gap-3 transition-all hover:-translate-y-1 cursor-default"
      style={{ background: '#ffffff', border: '1px solid #eee5f5', boxShadow: '0 2px 12px rgba(192,38,211,0.05)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ boxShadow: '0 8px 24px rgba(192,38,211,0.12)', borderColor: 'rgba(192,38,211,0.25)' }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: 'rgba(192,38,211,0.07)', border: '1px solid rgba(192,38,211,0.15)' }}>
        {skill.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm mb-1.5" style={{ color: '#172033' }}>{skill.name}</div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#f1e8ff' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #c026d3, #a855f7)' }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : {}}
            transition={{ duration: 1.2, delay: index * 0.06 + 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>
      <span className="text-xs font-semibold flex-shrink-0" style={{ color: '#c026d3' }}>{skill.level}%</span>
    </motion.div>
  )
}

export default function ProfessionalSkills() {
  const [activeCategory, setActiveCategory] = useState('Programming')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const { skills: SKILLS } = usePortfolioData()

  return (
    <section id="p-skills" className="py-20 px-4" style={{ background: '#faf7ff' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div ref={ref} className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(192,38,211,0.08)', color: '#c026d3', border: '1px solid rgba(192,38,211,0.2)' }}>
            Technical Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#172033' }}>Skills & Expertise</h2>
          <p className="text-base" style={{ color: '#64748b' }}>Technologies I work with across the full stack</p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Object.keys(SKILLS).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={activeCategory === cat
                ? { background: 'linear-gradient(135deg, #c026d3, #a855f7)', color: '#ffffff', boxShadow: '0 4px 14px rgba(192,38,211,0.3)' }
                : { background: '#ffffff', color: '#64748b', border: '1px solid #eee5f5' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
        >
          {SKILLS[activeCategory].map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
