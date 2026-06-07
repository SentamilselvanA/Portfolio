import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILLS = {
  Programming: [
    { name: 'C', level: 80, icon: '🔵', color: '#a8b9cc', projects: ['DSA Practice', 'Competitive Coding'] },
    { name: 'C++', level: 82, icon: '➕', color: '#00599c', projects: ['DSA Practice', 'SkillRack'] },
    { name: 'Python', level: 78, icon: '🐍', color: '#3776ab', projects: ['Battery Fault Prediction', 'Udemy'] },
    { name: 'Java', level: 80, icon: '☕', color: '#f89820', projects: ['OOP Projects', 'HackerRank'] },
    { name: 'JavaScript', level: 85, icon: '⚡', color: '#f7df1e', projects: ['AlgoVision', 'Skill Gap Analyzer'] },
  ],
  Frontend: [
    { name: 'React.js', level: 85, icon: '⚛️', color: '#61dafb', projects: ['AlgoVision', 'Skill Gap Analyzer'] },
    { name: 'HTML', level: 95, icon: '🌐', color: '#e34f26', projects: ['All Projects'] },
    { name: 'CSS', level: 90, icon: '🎨', color: '#1572b6', projects: ['All Projects'] },
    { name: 'Tailwind', level: 85, icon: '💨', color: '#38bdf8', projects: ['Skill Gap Analyzer', 'Portfolio'] },
  ],
  Backend: [
    { name: 'Node.js', level: 82, icon: '🟩', color: '#339933', projects: ['Skill Gap Analyzer'] },
    { name: 'Express.js', level: 80, icon: '🛤️', color: '#ffffff', projects: ['REST APIs', 'Skill Gap Analyzer'] },
  ],
  Database: [
    { name: 'MongoDB', level: 78, icon: '🍃', color: '#47a248', projects: ['Skill Gap Analyzer'] },
    { name: 'MySQL', level: 75, icon: '🐬', color: '#00758f', projects: ['HackerRank SQL', 'Projects'] },
  ],
  Tools: [
    { name: 'Git', level: 85, icon: '🔀', color: '#f05032', projects: ['All Projects'] },
    { name: 'GitHub', level: 88, icon: '🐙', color: '#ffffff', projects: ['All Projects'] },
    { name: 'VS Code', level: 95, icon: '💻', color: '#007acc', projects: ['Daily Driver'] },
    { name: 'Vite', level: 80, icon: '⚡', color: '#646cff', projects: ['Portfolio', 'React Apps'] },
    { name: 'Canva', level: 75, icon: '🖌️', color: '#00c4cc', projects: ['Design Work'] },
  ],
}

function SkillOrb({ skill, index }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  // Fixed size on mobile, dynamic on desktop
  const size = typeof window !== 'undefined' && window.innerWidth < 768
    ? 80
    : 90 + (skill.level / 100) * 30

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, scale: 0, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className="skill-orb"
        style={{ width: size, height: size, cursor: 'pointer' }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.25, y: -8, zIndex: 20 }}
        animate={inView ? { y: [0, -6, 0] } : {}}
        transition={hovered ? { duration: 0.3 } : { duration: 3 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${skill.color}44, ${skill.color}11)`,
            border: `2px solid ${skill.color}66`,
            boxShadow: hovered ? `0 0 30px ${skill.color}77` : `0 0 12px ${skill.color}33`,
            transition: 'box-shadow 0.3s', borderRadius: '50%'
          }}
        />
        <div className="absolute inset-0 rounded-full flex flex-col items-center justify-center z-10">
          <span className="text-lg md:text-2xl mb-0.5">{skill.icon}</span>
          <span className="font-mono font-bold text-white" style={{ fontSize: '0.6rem' }}>{skill.name}</span>
          <span className="font-mono" style={{ color: skill.color, fontSize: '0.6rem' }}>{skill.level}%</span>
        </div>
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
          <motion.circle cx="50" cy="50" r="46" fill="none" stroke={skill.color} strokeWidth="3"
            strokeLinecap="round" pathLength="100"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: skill.level / 100 } : {}}
            transition={{ duration: 1.5, delay: index * 0.07 + 0.3, ease: 'easeOut' }}
            style={{ strokeDasharray: '100', filter: `drop-shadow(0 0 3px ${skill.color})` }}
          />
        </svg>
      </motion.div>

      {/* Tooltip — only on desktop */}
      {hovered && (
        <motion.div
          className="absolute bottom-full mb-2 glass p-3 rounded-xl z-30 w-44 text-center pointer-events-none hidden md:block"
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          style={{ borderColor: `${skill.color}44` }}
        >
          <div className="font-orbitron text-sm font-bold mb-1" style={{ color: skill.color }}>{skill.name}</div>
          <div className="font-mono text-xs text-gray-400 mb-1">Proficiency: {skill.level}%</div>
          <div className="text-xs text-gray-500">
            <span className="text-cyan-400">Used in: </span>{skill.projects.join(', ')}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Programming')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="skills" className="relative py-16 md:py-24 px-4 z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div ref={ref} className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="font-mono text-purple-400 text-sm tracking-widest mb-3">// CHAPTER 02</div>
          <h2 className="font-orbitron font-black text-3xl md:text-6xl glow-purple text-purple-400 mb-4 md:mb-6">SKILL MATRIX</h2>
          <p className="text-gray-300 text-sm md:text-base">Interactive control room — hover to activate each module</p>
        </motion.div>

        {/* Category tabs — scrollable on mobile */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide justify-start md:justify-center">
          {Object.keys(SKILLS).map(cat => (
            <motion.button key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs md:text-sm tracking-wider transition-all duration-300 whitespace-nowrap flex-shrink-0 border ${activeCategory === cat ? 'bg-purple-500/20 border-purple-400 text-purple-300' : 'border-gray-700 text-gray-500'}`}
              whileTap={{ scale: 0.95 }}>
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Orbs grid */}
        <motion.div
          key={activeCategory}
          className="flex flex-wrap justify-center gap-4 md:gap-8 items-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
        >
          {SKILLS[activeCategory].map((skill, i) => (
            <SkillOrb key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
