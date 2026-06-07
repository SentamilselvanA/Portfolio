import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MILESTONES = [
  { year: '2021–2022', title: 'SSLC — 84.6%', desc: 'Completed secondary education at Government High School, Muthanoor with 84.6%, building a strong foundation for higher studies.', icon: '📚', color: '#00f5ff', side: 'left' },
  { year: '2023–2024', title: 'HSC — 87.6%', desc: 'Achieved 87.6% in Higher Secondary Certificate at Government Model School, Dharmapuri, excelling in Science stream.', icon: '🏫', color: '#8b5cf6', side: 'right' },
  { year: '2024', title: 'B.E CSE @ Sri Eshwar', desc: 'Joined Sri Eshwar College of Engineering for B.E Computer Science and Engineering. Currently maintaining a CGPA of 7.83 (till 3rd semester).', icon: '🎓', color: '#ec4899', side: 'left' },
  { year: '2024', title: 'Full Stack Development', desc: 'Mastered the MERN stack — React, Node.js, Express, MongoDB. Built real-world projects including a Skill Gap Analyzer and AlgoVision.', icon: '⚡', color: '#fbbf24', side: 'right' },
  { year: '2024', title: '170+ LeetCode & 1200+ CodeChef', desc: 'Solved 170+ LeetCode problems and 1200+ CodeChef & SkillRack problems, earning a Diamond Badge and ranking 14849 on SkillRack.', icon: '🧩', color: '#10b981', side: 'left' },
  { year: 'NOW', title: 'Preparing For Career', desc: 'Building impactful products, earning certifications, and seeking opportunities to grow as a software engineer at scale.', icon: '🎯', color: '#00f5ff', side: 'right' },
]

const colorRgb = {
  '#00f5ff': '0,245,255',
  '#8b5cf6': '139,92,246',
  '#ec4899': '236,72,153',
  '#fbbf24': '251,191,36',
  '#10b981': '16,185,129',
}

function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isLeft = item.side === 'left'

  return (
    <div ref={ref}>
      {/* ── Desktop layout ── */}
      <motion.div
        className="relative hidden md:flex items-center mb-12"
        style={{ flexDirection: isLeft ? 'row' : 'row-reverse' }}
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      >
        <div style={{ width: '42%', paddingRight: isLeft ? '2rem' : 0, paddingLeft: isLeft ? 0 : '2rem', textAlign: isLeft ? 'right' : 'left' }}>
          <div className="glass gradient-border p-5"
            style={{ background: `rgba(${colorRgb[item.color]},0.05)` }}>
            <div className="font-mono text-xs mb-1" style={{ color: item.color }}>{item.year}</div>
            <div className="font-orbitron font-bold text-white mb-2 text-sm">{item.title}</div>
            <div className="text-sm text-gray-300 leading-relaxed">{item.desc}</div>
          </div>
        </div>
        <div style={{ width: '16%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
          <motion.div
            className="rounded-full flex items-center justify-center text-xl"
            style={{ width: 52, height: 52, background: `radial-gradient(circle, ${item.color}22, ${item.color}11)`, border: `2px solid ${item.color}`, boxShadow: `0 0 18px ${item.color}44` }}
            animate={inView ? { scale: [0.8, 1.1, 1] } : {}}
            transition={{ duration: 0.6, delay: index * 0.08 + 0.3 }}
          >{item.icon}</motion.div>
        </div>
        <div style={{ width: '42%' }} />
      </motion.div>

      {/* ── Mobile layout ── */}
      <motion.div
        className="flex md:hidden items-start gap-3 mb-6"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.07 }}
      >
        {/* icon */}
        <div className="flex-shrink-0 mt-1">
          <div className="rounded-full flex items-center justify-center text-base"
            style={{ width: 40, height: 40, background: `radial-gradient(circle, ${item.color}22, ${item.color}11)`, border: `2px solid ${item.color}`, boxShadow: `0 0 12px ${item.color}33` }}>
            {item.icon}
          </div>
        </div>
        {/* card */}
        <div className="flex-1 min-w-0 rounded-xl p-3"
          style={{ background: `rgba(${colorRgb[item.color]},0.06)`, border: `1px solid ${item.color}22` }}>
          <div className="font-mono mb-0.5" style={{ color: item.color, fontSize: '0.65rem' }}>{item.year}</div>
          <div className="font-orbitron font-bold text-white mb-1" style={{ fontSize: '0.78rem' }}>{item.title}</div>
          <div className="text-gray-300 leading-relaxed" style={{ fontSize: '0.72rem' }}>{item.desc}</div>
        </div>
      </motion.div>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="about" className="relative py-16 md:py-24 px-4 z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div ref={ref} className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="font-mono text-cyan-400 text-sm tracking-widest mb-3">// CHAPTER 01</div>
          <h2 className="font-orbitron font-black text-3xl md:text-6xl glow-cyan text-cyan-400 mb-4 md:mb-6">MY JOURNEY</h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Passionate CSE student at Sri Eshwar College of Engineering, focused on Full Stack Development, DSA, and Software Engineering — transforming ideas into real-world applications.
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop center line */}
          <div className="timeline-line hidden md:block" />
          {/* Mobile left line */}
          <div className="md:hidden absolute top-0 bottom-0"
            style={{ left: 20, width: 2, background: 'linear-gradient(180deg, transparent, var(--cyan), var(--purple), var(--pink), transparent)' }} />

          <div className="md:block hidden">
            {MILESTONES.map((item, i) => <TimelineItem key={i} item={item} index={i} />)}
          </div>
          <div className="md:hidden pl-14">
            {MILESTONES.map((item, i) => <TimelineItem key={i} item={item} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
