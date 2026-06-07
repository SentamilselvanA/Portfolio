import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const PROJECTS = [
  {
    id: 0, name: 'Battery Fault Prediction', subtitle: 'ML-Powered Predictive System',
    icon: '🔋', color: '#00f5ff', size: 120,
    desc: 'Developed a machine learning-based battery fault prediction system capable of analyzing battery parameters and identifying potential faults before failure. Integrated predictive analytics models with Flask for a user-friendly interface.',
    features: ['Battery parameter analysis', 'Fault prediction before failure', 'Flask web interface', 'ML model integration', 'Real-time analytics'],
    tech: ['Machine Learning', 'Python', 'Flask'],
    challenge: 'Training an accurate predictive model on imbalanced fault data while keeping the Flask API response time under 200ms.',
    github: 'https://github.com', live: '#',
    orbit: { radius: 0, angle: 0, speed: 0 }
  },
  {
    id: 1, name: 'AlgoVision', subtitle: 'Algorithm Visualizer Platform',
    icon: '📈', color: '#8b5cf6', size: 110,
    desc: 'Built an interactive educational platform to visualize data structures and algorithms through real-time animations and step-by-step execution. Implemented sorting and searching visualizations with dynamic code highlighting for better learning.',
    features: ['Sorting algorithm visualizations', 'Searching algorithm animations', 'Step-by-step execution', 'Dynamic code highlighting', 'Speed control'],
    tech: ['React.js', 'JavaScript', 'CSS3'],
    challenge: 'Synchronizing animation frames with algorithm state transitions to ensure visualizations remain accurate at all speeds.',
    github: 'https://github.com', live: '#',
    orbit: { radius: 0, angle: 120, speed: 0 }
  },
  {
    id: 2, name: 'Skill Gap Analyzer', subtitle: 'MERN Stack Career Tool',
    icon: '🧭', color: '#ec4899', size: 115,
    desc: "Developed a MERN stack application that analyzes users' technical skills and recommends personalized learning paths. Implemented authentication, dashboards, responsive UI, and REST APIs.",
    features: ['Skill gap analysis', 'Personalized learning paths', 'JWT authentication', 'Interactive dashboard', 'REST APIs', 'Responsive UI'],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    challenge: 'Designing a recommendation algorithm that maps user skill levels to relevant learning resources with meaningful gap analysis.',
    github: 'https://github.com', live: '#',
    orbit: { radius: 0, angle: 240, speed: 0 }
  },
]

function Planet({ project, index, onClick, isActive }) {
  const angle = (index / PROJECTS.length) * Math.PI * 2
  const orbitR = 220
  const x = Math.cos(angle) * orbitR
  const y = Math.sin(angle) * (orbitR * 0.5)

  return (
    <motion.div
      className="absolute flex flex-col items-center cursor-pointer"
      style={{ left: '50%', top: '50%' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, x: x - project.size / 2, y: y - project.size / 2 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => onClick(project)}
      whileHover={{ scale: 1.2 }}
    >
      <motion.div
        className="planet relative flex items-center justify-center"
        style={{
          width: project.size, height: project.size,
          background: `radial-gradient(circle at 35% 35%, ${project.color}44, ${project.color}11, #020408)`,
          border: `2px solid ${project.color}88`,
          boxShadow: isActive
            ? `0 0 60px ${project.color}, 0 0 120px ${project.color}44`
            : `0 0 20px ${project.color}44`,
          borderRadius: '50%',
          transition: 'box-shadow 0.3s'
        }}
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-3xl">{project.icon}</span>
        <div className="absolute rounded-full border"
          style={{ inset: -12, borderColor: `${project.color}33`, animation: `ringPulse ${3 + index * 0.5}s ease-in-out infinite` }} />
      </motion.div>
      <div className="mt-3 text-center pointer-events-none">
        <div className="font-orbitron text-xs font-bold" style={{ color: project.color }}>{project.name}</div>
        <div className="font-mono text-xs text-gray-500">{project.subtitle}</div>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative glass-dark rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10"
        style={{ border: `1px solid ${project.color}44`, boxShadow: `0 0 60px ${project.color}22` }}
        initial={{ scale: 0.5, opacity: 0, y: 60 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{ background: `radial-gradient(circle, ${project.color}22, transparent)`, border: `2px solid ${project.color}` }}>
              {project.icon}
            </div>
            <div>
              <h3 className="font-orbitron font-black text-xl" style={{ color: project.color }}>{project.name}</h3>
              <p className="font-mono text-sm text-gray-400">{project.subtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-400 transition-colors">✕</button>
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed">{project.desc}</p>

        <div className="mb-6">
          <div className="font-orbitron text-sm mb-3" style={{ color: project.color }}>FEATURES</div>
          <div className="grid grid-cols-2 gap-2">
            {project.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                <span style={{ color: project.color }}>▸</span> {f}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="font-orbitron text-sm mb-3" style={{ color: project.color }}>TECH STACK</div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 rounded-full font-mono text-xs"
                style={{ background: `${project.color}11`, border: `1px solid ${project.color}44`, color: project.color }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8 glass p-4 rounded-xl">
          <div className="font-orbitron text-sm text-yellow-400 mb-2">⚡ CHALLENGE SOLVED</div>
          <p className="text-sm text-gray-400">{project.challenge}</p>
        </div>

        <div className="flex gap-4">
          <a href={project.github} target="_blank"
            className="flex-1 py-3 rounded-xl text-center font-mono text-sm font-bold transition-all hover:scale-105"
            style={{ background: `${project.color}11`, border: `1px solid ${project.color}44`, color: project.color }}>
            🐙 GitHub
          </a>
          <a href={project.live} target="_blank"
            className="flex-1 py-3 rounded-xl text-center font-mono text-sm font-bold transition-all hover:scale-105"
            style={{ background: `${project.color}22`, border: `1px solid ${project.color}66`, color: project.color }}>
            🚀 Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="projects" className="relative py-24 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} className="text-center mb-8"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="font-mono text-pink-400 text-sm tracking-widest mb-3">// CHAPTER 03</div>
          <h2 className="font-orbitron font-black text-4xl md:text-6xl glow-pink text-pink-400 mb-6">PROJECT GALAXY</h2>
          <p className="text-gray-300">Each planet is a world I built. Click to explore.</p>
        </motion.div>

        <div className="relative flex items-center justify-center" style={{ height: 600 }}>
          <motion.div
            className="absolute w-20 h-20 rounded-full flex items-center justify-center z-10"
            style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.3), rgba(0,245,255,0.05))', border: '2px solid rgba(0,245,255,0.4)', boxShadow: '0 0 40px rgba(0,245,255,0.4)' }}
            animate={{ scale: [1, 1.1, 1], rotate: 360 }}
            transition={{ scale: { duration: 3, repeat: Infinity }, rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
          >
            <span className="text-2xl">✦</span>
          </motion.div>

          {[250, 310].map((r, i) => (
            <div key={i} className="absolute rounded-full border border-dashed"
              style={{ width: r * 2, height: r, borderColor: 'rgba(0,245,255,0.06)', borderRadius: '50%' }} />
          ))}

          {PROJECTS.map((p, i) => (
            <Planet key={p.id} project={p} index={i} onClick={setSelected} isActive={selected?.id === p.id} />
          ))}
        </div>

        <div className="text-center mt-4">
          <p className="font-mono text-xs text-gray-600">↑ Click any planet to explore the project</p>
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
