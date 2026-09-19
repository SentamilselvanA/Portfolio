import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePortfolioData } from '../../hooks/usePortfolioData'

export default function ProfessionalAbout() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const { personal: PERSONAL, milestones: MILESTONES } = usePortfolioData()

  return (
    <section id="p-about" className="py-20 px-4" style={{ background: '#ffffff' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div ref={ref} className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(192,38,211,0.08)', color: '#c026d3', border: '1px solid rgba(192,38,211,0.2)' }}>
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#172033' }}>My Journey</h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: '#64748b' }}>{PERSONAL.bio}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, transparent, #c026d3, #a855f7, transparent)' }} />
          {/* Left line — mobile */}
          <div className="md:hidden absolute top-0 bottom-0 left-5 w-px"
            style={{ background: 'linear-gradient(180deg, transparent, #c026d3, #a855f7, transparent)' }} />

          <div className="space-y-8 md:space-y-0">
            {MILESTONES.map((item, i) => (
              <MilestoneItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MilestoneItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isLeft = item.side === 'left'

  return (
    <div ref={ref}>
      {/* Desktop */}
      <motion.div
        className="relative hidden md:flex items-center mb-10"
        style={{ flexDirection: isLeft ? 'row' : 'row-reverse' }}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.07 }}
      >
        <div style={{ width: '44%', paddingRight: isLeft ? '2.5rem' : 0, paddingLeft: isLeft ? 0 : '2.5rem', textAlign: isLeft ? 'right' : 'left' }}>
          <div className="rounded-2xl p-5 transition-all hover:-translate-y-1"
            style={{ background: '#faf7ff', border: '1px solid #eee5f5', boxShadow: '0 4px 20px rgba(192,38,211,0.06)' }}>
            <div className="text-xs font-semibold mb-1" style={{ color: '#c026d3' }}>{item.year}</div>
            <div className="font-bold text-base mb-2" style={{ color: '#172033' }}>{item.title}</div>
            <div className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{item.desc}</div>
          </div>
        </div>
        {/* Center dot */}
        <div style={{ width: '12%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
            style={{ background: 'linear-gradient(135deg, rgba(192,38,211,0.15), rgba(168,85,247,0.1))', border: '2px solid #c026d3', boxShadow: '0 0 16px rgba(192,38,211,0.25)' }}
            animate={inView ? { scale: [0.8, 1.1, 1] } : {}}
            transition={{ duration: 0.5, delay: index * 0.07 + 0.3 }}
          >{item.icon}</motion.div>
        </div>
        <div style={{ width: '44%' }} />
      </motion.div>

      {/* Mobile */}
      <motion.div
        className="flex md:hidden relative items-start gap-3 mb-5 pl-14"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.06 }}
      >
        <div className="absolute left-0 flex justify-center" style={{ width: 40 }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-base"
            style={{ background: 'rgba(192,38,211,0.1)', border: '2px solid #c026d3' }}>
            {item.icon}
          </div>
        </div>
        <div className="flex-1 rounded-xl p-4" style={{ background: '#faf7ff', border: '1px solid #eee5f5' }}>
          <div className="text-xs font-semibold mb-0.5" style={{ color: '#c026d3' }}>{item.year}</div>
          <div className="font-bold text-sm mb-1" style={{ color: '#172033' }}>{item.title}</div>
          <div className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{item.desc}</div>
        </div>
      </motion.div>
    </div>
  )
}
