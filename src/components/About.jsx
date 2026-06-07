import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MILESTONES = [
  {
    year: '2021–2022', title: 'SSLC — 84.6%',
    desc: 'Completed secondary education at Government High School, Muthanoor with 84.6%, building a strong foundation for higher studies.',
    icon: '📚', color: '#00f5ff', side: 'left'
  },
  {
    year: '2023–2024', title: 'HSC — 87.6%',
    desc: 'Achieved 87.6% in Higher Secondary Certificate at Government Model School, Dharmapuri, excelling in Science stream.',
    icon: '🏫', color: '#8b5cf6', side: 'right'
  },
  {
    year: '2024', title: 'B.E CSE @ Sri Eshwar',
    desc: 'Joined Sri Eshwar College of Engineering for B.E Computer Science and Engineering. Currently maintaining a CGPA of 7.83 (till 3rd semester).',
    icon: '🎓', color: '#ec4899', side: 'left'
  },
  {
    year: '2024', title: 'Full Stack Development',
    desc: 'Mastered the MERN stack — React, Node.js, Express, MongoDB. Built real-world projects including a Skill Gap Analyzer and AlgoVision.',
    icon: '⚡', color: '#fbbf24', side: 'right'
  },
  {
    year: '2024', title: '170+ LeetCode & 1200+ CodeChef',
    desc: 'Solved 170+ LeetCode problems and 1200+ CodeChef & SkillRack problems, earning a Diamond Badge and ranking 14849 on SkillRack.',
    icon: '🧩', color: '#10b981', side: 'left'
  },
  {
    year: 'NOW', title: 'Preparing For Career',
    desc: 'Building impactful products, earning certifications, and seeking opportunities to grow as a software engineer at scale.',
    icon: '🎯', color: '#00f5ff', side: 'right'
  },
]

function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const isLeft = item.side === 'left'

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center mb-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Content */}
      <div className={`w-5/12 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <div className="glass gradient-border p-5 hover:scale-105 transition-transform duration-300"
          style={{ background: `rgba(${item.color === '#00f5ff' ? '0,245,255' : item.color === '#8b5cf6' ? '139,92,246' : item.color === '#ec4899' ? '236,72,153' : item.color === '#fbbf24' ? '251,191,36' : '16,185,129'},0.05)` }}>
          <div className="font-mono text-xs mb-1" style={{ color: item.color }}>{item.year}</div>
          <div className="font-orbitron font-bold text-white mb-2">{item.title}</div>
          <div className="text-sm text-gray-400 leading-relaxed">{item.desc}</div>
        </div>
      </div>

      {/* Center dot */}
      <div className="w-2/12 flex justify-center relative z-10">
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{ background: `radial-gradient(circle, ${item.color}22, ${item.color}11)`, border: `2px solid ${item.color}`, boxShadow: `0 0 20px ${item.color}44` }}
          animate={inView ? { scale: [0.8, 1.1, 1], rotate: [0, 10, 0] } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
        >
          {item.icon}
        </motion.div>
      </div>

      {/* Empty space */}
      <div className="w-5/12" />
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="about" className="relative py-24 px-4 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div ref={ref} className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="font-mono text-cyan-400 text-sm tracking-widest mb-3">// CHAPTER 01</div>
          <h2 className="font-orbitron font-black text-4xl md:text-6xl glow-cyan text-cyan-400 mb-6">MY JOURNEY</h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">Passionate CSE student at Sri Eshwar College of Engineering, focused on Full Stack Development, DSA, and Software Engineering — transforming ideas into real-world applications.</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="timeline-line" />
          {MILESTONES.map((item, i) => <TimelineItem key={i} item={item} index={i} />)}
        </div>
      </div>
    </section>
  )
}
