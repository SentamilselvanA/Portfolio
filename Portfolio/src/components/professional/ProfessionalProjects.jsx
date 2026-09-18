import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { PROJECTS } from '../../data/portfolioData'

function ProjectCard({ project, index, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl overflow-hidden cursor-pointer group"
      style={{ background: '#ffffff', border: '1px solid #eee5f5', boxShadow: '0 4px 20px rgba(192,38,211,0.06)' }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(192,38,211,0.14)', borderColor: 'rgba(192,38,211,0.3)' }}
      onClick={() => onClick(project)}
    >
      {/* Visual area */}
      <div className="h-44 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color}12, ${project.color}06)` }}>
        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">{project.icon}</div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(135deg, ${project.color}10, transparent)` }} />
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg mb-1" style={{ color: '#172033' }}>{project.name}</h3>
        <p className="text-sm mb-3" style={{ color: '#a855f7' }}>{project.subtitle}</p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748b' }}>{project.desc.slice(0, 110)}...</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: 'rgba(192,38,211,0.07)', color: '#c026d3', border: '1px solid rgba(192,38,211,0.15)' }}>
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex-1 py-2 rounded-xl text-center text-xs font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: '#faf7ff', border: '1px solid #eee5f5', color: '#64748b' }}>
            🐙 GitHub
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex-1 py-2 rounded-xl text-center text-xs font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #c026d3, #a855f7)' }}>
            🚀 Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <motion.div className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative w-full md:max-w-2xl md:mx-4 md:rounded-2xl rounded-t-2xl overflow-y-auto z-10"
        style={{ background: '#ffffff', border: '1px solid #eee5f5', boxShadow: '0 20px 60px rgba(192,38,211,0.15)', maxHeight: '90vh', padding: 'clamp(1.25rem,4vw,2rem)' }}
        initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: `${project.color}12`, border: `1px solid ${project.color}30` }}>
              {project.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg" style={{ color: '#172033' }}>{project.name}</h3>
              <p className="text-sm" style={{ color: '#a855f7' }}>{project.subtitle}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all hover:bg-red-50"
            style={{ border: '1px solid #eee5f5', color: '#94a3b8' }}>✕</button>
        </div>

        <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748b' }}>{project.desc}</p>

        <div className="mb-5">
          <div className="font-semibold text-sm mb-2" style={{ color: '#172033' }}>Features</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm" style={{ color: '#64748b' }}>
                <span style={{ color: '#c026d3' }}>✓</span> {f}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <div className="font-semibold text-sm mb-2" style={{ color: '#172033' }}>Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(192,38,211,0.07)', color: '#c026d3', border: '1px solid rgba(192,38,211,0.15)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-4 mb-5" style={{ background: '#faf7ff', border: '1px solid #eee5f5' }}>
          <div className="font-semibold text-sm mb-1" style={{ color: '#c026d3' }}>⚡ Challenge Solved</div>
          <p className="text-sm" style={{ color: '#64748b' }}>{project.challenge}</p>
        </div>

        <div className="flex gap-3">
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl text-center text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: '#faf7ff', border: '1px solid #eee5f5', color: '#64748b' }}>
            🐙 GitHub
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl text-center text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #c026d3, #a855f7)' }}>
            🚀 Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProfessionalProjects() {
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="p-projects" className="py-20 px-4" style={{ background: '#ffffff' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(192,38,211,0.08)', color: '#c026d3', border: '1px solid rgba(192,38,211,0.2)' }}>
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#172033' }}>Featured Projects</h2>
          <p className="text-base" style={{ color: '#64748b' }}>A selection of projects I've built with passion and purpose</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onClick={setSelected} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
