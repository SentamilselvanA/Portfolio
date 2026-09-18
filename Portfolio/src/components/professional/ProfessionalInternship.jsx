import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { INTERNSHIP } from '../../data/portfolioData'

export default function ProfessionalInternship() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="p-intern" className="py-20 px-4" style={{ background: '#faf7ff' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div ref={ref} className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(192,38,211,0.08)', color: '#c026d3', border: '1px solid rgba(192,38,211,0.2)' }}>
            Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#172033' }}>Professional Experience</h2>
        </motion.div>

        {/* Main card */}
        <motion.div
          className="rounded-3xl p-8 md:p-10 mb-8"
          style={{ background: '#ffffff', border: '1px solid #eee5f5', boxShadow: '0 8px 40px rgba(192,38,211,0.08)' }}
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                style={{ background: 'rgba(192,38,211,0.08)', color: '#c026d3', border: '1px solid rgba(192,38,211,0.2)' }}>
                {INTERNSHIP.period}
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{ color: '#172033' }}>{INTERNSHIP.role}</h3>
              <p className="text-base font-medium" style={{ color: '#a855f7' }}>{INTERNSHIP.company}</p>
            </div>
            <a href={INTERNSHIP.certificateLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 self-start"
              style={{ background: 'linear-gradient(135deg, #c026d3, #a855f7)', boxShadow: '0 4px 16px rgba(192,38,211,0.3)', whiteSpace: 'nowrap' }}>
              📄 View Certificate
            </a>
          </div>

          <p className="text-base leading-relaxed mb-8" style={{ color: '#64748b' }}>{INTERNSHIP.description}</p>

          {/* Learning areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INTERNSHIP.learningAreas.map((area, i) => (
              <motion.div key={i}
                className="rounded-2xl p-5 transition-all"
                style={{ background: '#faf7ff', border: '1px solid #eee5f5' }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                whileHover={{ borderColor: 'rgba(192,38,211,0.25)', boxShadow: '0 8px 24px rgba(192,38,211,0.08)' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: 'rgba(192,38,211,0.08)', border: '1px solid rgba(192,38,211,0.15)' }}>
                    {area.icon}
                  </div>
                  <h4 className="font-bold text-sm" style={{ color: '#172033' }}>{area.title}</h4>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
