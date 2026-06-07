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
  },
  {
    id: 1, name: 'AlgoVision', subtitle: 'Algorithm Visualizer Platform',
    icon: '📈', color: '#8b5cf6', size: 110,
    desc: 'Built an interactive educational platform to visualize data structures and algorithms through real-time animations and step-by-step execution. Implemented sorting and searching visualizations with dynamic code highlighting for better learning.',
    features: ['Sorting algorithm visualizations', 'Searching algorithm animations', 'Step-by-step execution', 'Dynamic code highlighting', 'Speed control'],
    tech: ['React.js', 'JavaScript', 'CSS3'],
    challenge: 'Synchronizing animation frames with algorithm state transitions to ensure visualizations remain accurate at all speeds.',
    github: 'https://github.com', live: '#',
  },
  {
    id: 2, name: 'Skill Gap Analyzer', subtitle: 'MERN Stack Career Tool',
    icon: '🧭', color: '#ec4899', size: 115,
    desc: "Developed a MERN stack application that analyzes users' technical skills and recommends personalized learning paths. Implemented authentication, dashboards, responsive UI, and REST APIs.",
    features: ['Skill gap analysis', 'Personalized learning paths', 'JWT authentication', 'Interactive dashboard', 'REST APIs', 'Responsive UI'],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    challenge: 'Designing a recommendation algorithm that maps user skill levels to relevant learning resources with meaningful gap analysis.',
    github: 'https://github.com', live: '#',
  },
]

/* ── Desktop planet ── */
function Planet({ project, index, onClick, isActive }) {
  const angle = (index / PROJECTS.length) * Math.PI * 2
  const orbitR = 200
  const x = Math.cos(angle) * orbitR
  const y = Math.sin(angle) * orbitR * 0.5

  return (
    <motion.div
      className="absolute flex flex-col items-center cursor-pointer"
      style={{ left: '50%', top: '50%' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, x: x - project.size / 2, y: y - project.size / 2 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => onClick(project)}
      whileHover={{ scale: 1.15 }}
    >
      <motion.div
        className="planet relative flex items-center justify-center"
        style={{
          width: project.size, height: project.size,
          background: `radial-gradient(circle at 35% 35%, ${project.color}44, ${project.color}11, #010205)`,
          border: `2px solid ${project.color}88`,
          boxShadow: isActive ? `0 0 50px ${project.color}, 0 0 100px ${project.color}44` : `0 0 18px ${project.color}44`,
          borderRadius: '50%', transition: 'box-shadow 0.3s',
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-3xl">{project.icon}</span>
        <div className="absolute rounded-full border"
          style={{ inset: -10, borderColor: `${project.color}33`, animation: `ringPulse ${3 + index * 0.5}s ease-in-out infinite` }} />
      </motion.div>
      <div className="mt-2 text-center pointer-events-none" style={{ width: 120 }}>
        <div className="font-orbitron text-xs font-bold truncate" style={{ color: project.color }}>{project.name}</div>
        <div className="font-mono text-gray-500 truncate" style={{ fontSize: '0.6rem' }}>{project.subtitle}</div>
      </div>
    </motion.div>
  )
}

/* ── Mobile card ── */
function MobileCard({ project, index, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="w-full rounded-2xl p-4 cursor-pointer active:scale-95 transition-transform"
      style={{
        background: `linear-gradient(135deg, ${project.color}08, rgba(0,0,0,0))`,
        border: `1px solid ${project.color}30`,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onClick(project)}
    >
      <div className="flex items-center gap-3 mb-3">
        {/* Planet icon */}
        <div
          className="flex-shrink-0 rounded-full flex items-center justify-center text-2xl"
          style={{
            width: 56, height: 56,
            background: `radial-gradient(circle at 35% 35%, ${project.color}44, ${project.color}11)`,
            border: `2px solid ${project.color}66`,
            boxShadow: `0 0 16px ${project.color}33`,
          }}
        >
          {project.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-orbitron font-bold truncate text-sm" style={{ color: project.color }}>
            {project.name}
          </div>
          <div className="font-mono text-gray-500 truncate" style={{ fontSize: '0.65rem' }}>
            {project.subtitle}
          </div>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed mb-3" style={{ fontSize: '0.75rem' }}>
        {project.desc.slice(0, 120)}...
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tech.map(t => (
          <span key={t} className="px-2 py-0.5 rounded-full font-mono"
            style={{ fontSize: '0.6rem', background: `${project.color}11`, border: `1px solid ${project.color}33`, color: project.color }}>
            {t}
          </span>
        ))}
      </div>

      <div className="font-mono" style={{ color: project.color, fontSize: '0.65rem' }}>
        Tap to explore →
      </div>
    </motion.div>
  )
}

/* ── Modal ── */
function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <motion.div className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative glass-dark w-full md:max-w-2xl md:mx-4 md:rounded-2xl rounded-t-2xl overflow-y-auto z-10"
        style={{
          border: `1px solid ${project.color}44`,
          boxShadow: `0 0 60px ${project.color}22`,
          maxHeight: '90vh',
          padding: 'clamp(1rem, 4vw, 2rem)',
        }}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0 flex-1 mr-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ background: `radial-gradient(circle, ${project.color}22, transparent)`, border: `2px solid ${project.color}` }}>
              {project.icon}
            </div>
            <div className="min-w-0">
              <h3 className="font-orbitron font-black text-base md:text-xl truncate" style={{ color: project.color }}>{project.name}</h3>
              <p className="font-mono text-xs text-gray-400 truncate">{project.subtitle}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-400 transition-colors text-sm">
            ✕
          </button>
        </div>

        <p className="text-gray-300 mb-4 leading-relaxed text-sm">{project.desc}</p>

        {/* Features */}
        <div className="mb-4">
          <div className="font-orbitron text-xs mb-2" style={{ color: project.color }}>FEATURES</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {project.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                <span style={{ color: project.color }}>▸</span> {f}
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-4">
          <div className="font-orbitron text-xs mb-2" style={{ color: project.color }}>TECH STACK</div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 rounded-full font-mono text-xs"
                style={{ background: `${project.color}11`, border: `1px solid ${project.color}44`, color: project.color }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Challenge */}
        <div className="mb-5 glass p-3 rounded-xl">
          <div className="font-orbitron text-xs text-yellow-400 mb-1.5">⚡ CHALLENGE SOLVED</div>
          <p className="text-xs text-gray-300">{project.challenge}</p>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl text-center font-mono text-xs font-bold transition-all"
            style={{ background: `${project.color}11`, border: `1px solid ${project.color}44`, color: project.color }}>
            🐙 GitHub
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl text-center font-mono text-xs font-bold transition-all"
            style={{ background: `${project.color}22`, border: `1px solid ${project.color}66`, color: project.color }}>
            🚀 Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Main section ── */
export default function Projects() {
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="projects" className="relative py-16 md:py-24 px-4 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div ref={ref} className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="font-mono text-pink-400 text-sm tracking-widest mb-3">// CHAPTER 03</div>
          <h2 className="font-orbitron font-black text-3xl md:text-6xl glow-pink text-pink-400 mb-4">PROJECT GALAXY</h2>
          <p className="text-gray-300 text-sm md:text-base">Each planet is a world I built. Click to explore.</p>
        </motion.div>

        {/* ── Desktop galaxy ── */}
        <div className="hidden md:block">
          <div className="relative flex items-center justify-center" style={{ height: 560 }}>
            {/* Center star */}
            <motion.div
              className="absolute w-16 h-16 rounded-full flex items-center justify-center z-10"
              style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.3), rgba(0,245,255,0.05))', border: '2px solid rgba(0,245,255,0.4)', boxShadow: '0 0 30px rgba(0,245,255,0.35)' }}
              animate={{ scale: [1, 1.1, 1], rotate: 360 }}
              transition={{ scale: { duration: 3, repeat: Infinity }, rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
            >
              <span className="text-xl">✦</span>
            </motion.div>

            {/* Orbit rings */}
            {[220, 270].map((r, i) => (
              <div key={i} className="absolute rounded-full border border-dashed pointer-events-none"
                style={{ width: r * 2, height: r, borderColor: 'rgba(0,245,255,0.06)', borderRadius: '50%' }} />
            ))}

            {PROJECTS.map((p, i) => (
              <Planet key={p.id} project={p} index={i} onClick={setSelected} isActive={selected?.id === p.id} />
            ))}
          </div>
          <div className="text-center mt-2">
            <p className="font-mono text-xs text-gray-700">↑ Click any planet to explore the project</p>
          </div>
        </div>

        {/* ── Mobile card list ── */}
        <div className="flex flex-col gap-4 md:hidden">
          {PROJECTS.map((p, i) => (
            <MobileCard key={p.id} project={p} index={i} onClick={setSelected} />
          ))}
        </div>

      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
