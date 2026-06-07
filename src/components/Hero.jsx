import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ROLES = ['Full Stack Developer', 'MERN Stack Developer', 'Problem Solver', 'Computer Science Student', 'Tech Enthusiast']

function MagneticBtn({ children, href, onClick, target, download, className = '', style = {} }) {
  const ref = useRef(null)
  const isMobile = () => window.innerWidth < 768
  const onMove = e => {
    if (isMobile()) return
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }
  const onLeave = () => { ref.current.style.transform = 'translate(0,0)' }
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      target={target ?? (href ? '_blank' : undefined)}
      rel={href ? 'noopener noreferrer' : undefined}
      download={download}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`magnetic-btn inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full font-mono font-semibold text-sm tracking-wider transition-all duration-300 ${className}`}
      style={{ transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1)', ...style }}
    >
      {children}
    </Tag>
  )
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const onMouse = e => {
      const r = sectionRef.current?.getBoundingClientRect()
      if (r) setMousePos({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 })
    }
    window.addEventListener('mousemove', onMouse)
    return () => window.removeEventListener('mousemove', onMouse)
  }, [isMobile])

  return (
    <>
      <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">

        {/* Rotating rings — hidden on mobile to avoid overflow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none hidden md:flex">
          {[300, 450, 600, 750].map((size, i) => (
            <div key={i} className="absolute rounded-full border"
              style={{
                width: size, height: size,
                borderColor: `rgba(0,245,255,${0.08 - i * 0.015})`,
                animation: `${i % 2 === 0 ? 'rotate360' : 'counter-rotate'} ${20 + i * 8}s linear infinite`
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div
          className="relative z-10 text-center w-full max-w-4xl mx-auto"
          style={isMobile ? {} : {
            transform: `perspective(1000px) rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`
          }}
        >
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm font-mono"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400">Available for opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-orbitron font-black shimmer-text leading-tight mb-4 w-full"
            style={{ fontSize: 'clamp(1.4rem, 4.2vw, 3.8rem)', whiteSpace: 'nowrap', overflow: 'visible' }}
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            SENTAMILSELVAN
          </motion.h1>

          {/* Animated role */}
          <div className="h-10 flex items-center justify-center mb-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIdx}
                className="font-mono text-base md:text-2xl text-cyan-400 tracking-widest px-2 text-center"
                initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {`> ${ROLES[roleIdx]}`}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Holographic card */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '1rem',
              padding: '0.875rem 1.25rem', borderRadius: '1rem',
              background: 'linear-gradient(135deg, rgba(0,245,255,0.06), rgba(139,92,246,0.08), rgba(236,72,153,0.05))',
              border: '1px solid rgba(0,245,255,0.18)',
              boxShadow: '0 0 24px rgba(0,245,255,0.07), 0 8px 32px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              maxWidth: '100%',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', fontWeight: 900, fontFamily: 'Orbitron, sans-serif',
                boxShadow: '0 0 14px rgba(0,245,255,0.25)',
              }}>S</div>
              <div style={{ textAlign: 'left', minWidth: 0 }}>
                <div style={{ fontFamily: 'Orbitron, sans-serif', color: '#00f5ff', fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Sentamilselvan</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,255,255,0.45)', fontSize: '0.7rem', marginTop: 2 }}>Full Stack Developer</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', color: '#a78bfa', fontSize: '0.7rem', marginTop: 2, whiteSpace: 'nowrap' }}>Dharmapuri, Tamil Nadu, India 🇮🇳</div>
              </div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="font-mono text-xs md:text-sm text-gray-300 max-w-lg mx-auto mb-6 leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
          >
            Building scalable web applications, solving coding challenges, and continuously learning modern technologies to create impactful digital experiences.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          >
            {[['170+', 'LeetCode'], ['1200+', 'CodeChef'], ['1200+', 'SkillRack'], ['B.E', 'CSE']].map(([val, label]) => (
              <div key={label} className="glass px-3 py-2 rounded-lg text-center">
                <div className="font-orbitron text-cyan-400 font-bold text-xs md:text-sm">{val}</div>
                <div className="font-mono text-gray-500" style={{ fontSize: '0.65rem' }}>{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
          >
            <MagneticBtn href="/resume.pdf" target="_blank" download="Sentamilselvan_Resume.pdf"
              className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 glow-box-cyan">
              📄 Resume
            </MagneticBtn>
            <MagneticBtn
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-purple-500 text-purple-400 hover:bg-purple-500/10 glow-box-purple">
              💬 Contact
            </MagneticBtn>
            <MagneticBtn href="https://github.com"
              className="border border-pink-500 text-pink-400 hover:bg-pink-500/10 glow-box-pink">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </MagneticBtn>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        >
          <span className="font-mono text-xs text-gray-600 tracking-widest">SCROLL</span>
          <motion.div className="w-px h-10 bg-gradient-to-b from-cyan-500 to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }} />
        </motion.div>
      </section>

      {/* Section divider */}
      <div className="relative z-10 flex flex-col items-center" style={{ marginTop: 60, marginBottom: 60 }}>
        <div style={{
          width: '50%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.18), rgba(139,92,246,0.18), transparent)'
        }} />
        <div style={{
          width: 6, height: 6, borderRadius: '50%', marginTop: -3,
          background: 'rgba(0,245,255,0.5)', boxShadow: '0 0 8px rgba(0,245,255,0.4)'
        }} />
      </div>
    </>
  )
}
