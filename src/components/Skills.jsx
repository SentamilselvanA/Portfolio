import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILLS = {
  Frontend: [
    { name: 'React', level: 88, icon: '⚛️', color: '#61dafb', projects: ['Student Mgmt', 'Event Platform', 'Dance App'] },
    { name: 'JavaScript', level: 85, icon: '⚡', color: '#f7df1e', projects: ['Weather App', 'Expense Tracker'] },
    { name: 'HTML', level: 95, icon: '🌐', color: '#e34f26', projects: ['All Projects'] },
    { name: 'CSS', level: 90, icon: '🎨', color: '#1572b6', projects: ['All Projects'] },
    { name: 'Tailwind', level: 85, icon: '💨', color: '#38bdf8', projects: ['Dance App', 'Portfolio'] },
  ],
  Backend: [
    { name: 'Node.js', level: 82, icon: '🟩', color: '#339933', projects: ['Student Mgmt', 'Event Platform'] },
    { name: 'Express.js', level: 80, icon: '🛤️', color: '#ffffff', projects: ['REST APIs', 'Event Platform'] },
  ],
  Database: [
    { name: 'MongoDB', level: 78, icon: '🍃', color: '#47a248', projects: ['Student Mgmt', 'Expense Tracker'] },
    { name: 'MySQL', level: 75, icon: '🐬', color: '#00758f', projects: ['Java Projects'] },
  ],
  Tools: [
    { name: 'Git', level: 85, icon: '🔀', color: '#f05032', projects: ['All Projects'] },
    { name: 'GitHub', level: 88, icon: '🐙', color: '#ffffff', projects: ['Open Source'] },
    { name: 'Postman', level: 80, icon: '📮', color: '#ef5b25', projects: ['API Testing'] },
    { name: 'VS Code', level: 95, icon: '💻', color: '#007acc', projects: ['Daily Driver'] },
  ],
}

function SkillOrb({ skill, index }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const size = 90 + (skill.level / 100) * 30

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, scale: 0, y: 40 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Orb */}
      <motion.div
        className="skill-orb"
        style={{ width: size, height: size, cursor: 'pointer' }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.3, y: -12, zIndex: 20 }}
        animate={inView ? { y: [0, -8, 0] } : {}}
        transition={hovered ? { duration: 0.3 } : { duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${skill.color}44, ${skill.color}11)`,
            border: `2px solid ${skill.color}66`,
            boxShadow: hovered ? `0 0 40px ${skill.color}88, 0 0 80px ${skill.color}44` : `0 0 15px ${skill.color}44`,
            transition: 'box-shadow 0.3s',
            borderRadius: '50%'
          }}
        />
        {/* Inner content */}
        <div className="absolute inset-0 rounded-full flex flex-col items-center justify-center z-10">
          <span className="text-2xl mb-1">{skill.icon}</span>
          <span className="font-mono text-xs font-bold text-white">{skill.name}</span>
          <span className="font-mono text-xs" style={{ color: skill.color }}>{skill.level}%</span>
        </div>

        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
          <motion.circle cx="50" cy="50" r="46" fill="none" stroke={skill.color} strokeWidth="3"
            strokeLinecap="round"
            pathLength="100"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: skill.level / 100 } : {}}
            transition={{ duration: 1.5, delay: index * 0.08 + 0.3, ease: 'easeOut' }}
            style={{ strokeDasharray: '100', filter: `drop-shadow(0 0 4px ${skill.color})` }}
          />
        </svg>
      </motion.div>

      {/* Tooltip on hover */}
      {hovered && (
        <motion.div
          className="absolute bottom-full mb-3 glass p-3 rounded-xl z-30 w-48 text-center pointer-events-none"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          style={{ borderColor: `${skill.color}44` }}
        >
          <div className="font-orbitron text-sm font-bold mb-1" style={{ color: skill.color }}>{skill.name}</div>
          <div className="font-mono text-xs text-gray-400 mb-2">Proficiency: {skill.level}%</div>
          <div className="text-xs text-gray-500">
            <span className="text-cyan-400">Used in: </span>
            {skill.projects.join(', ')}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Frontend')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="skills" className="relative py-24 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="font-mono text-purple-400 text-sm tracking-widest mb-3">// CHAPTER 02</div>
          <h2 className="font-orbitron font-black text-4xl md:text-6xl glow-purple text-purple-400 mb-4">SKILL MATRIX</h2>
          <p className="text-gray-400">Interactive control room — hover to activate each module</p>
        </motion.div>

        {/* Category selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {Object.keys(SKILLS).map(cat => (
            <motion.button key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-mono text-sm tracking-wider transition-all duration-300 ${activeCategory === cat ? 'bg-purple-500/20 border-purple-400 text-purple-300 glow-box-purple' : 'border-gray-600 text-gray-500 hover:border-gray-400'} border`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Skill orbs */}
        <motion.div
          key={activeCategory}
          className="flex flex-wrap justify-center gap-8 items-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
        >
          {SKILLS[activeCategory].map((skill, i) => (
            <SkillOrb key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06), transparent)' }} />
        </div>
      </div>
    </section>
  )
}
