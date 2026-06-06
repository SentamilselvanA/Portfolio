import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

function scramble(target, setter, duration = 1200) {
  const len = target.length
  let start = null
  const step = ts => {
    if (!start) start = ts
    const p = Math.min((ts - start) / duration, 1)
    const revealed = Math.floor(p * len)
    setter(
      target.split('').map((c, i) =>
        i < revealed ? c : CHARS[Math.floor(Math.random() * CHARS.length)]
      ).join('')
    )
    if (p < 1) requestAnimationFrame(step)
    else setter(target)
  }
  requestAnimationFrame(step)
}

export default function Loader({ onComplete }) {
  const [name, setName] = useState('////////////////')
  const [sub, setSub] = useState('')
  const [phase, setPhase] = useState('scramble') // scramble | portal | done
  const [particles, setParticles] = useState([])
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    // Generate background particles
    setParticles(Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      color: ['#00f5ff', '#8b5cf6', '#ec4899', '#fbbf24'][Math.floor(Math.random() * 4)]
    })))

    // Phase 1: scramble name
    setTimeout(() => scramble('SENTAMILSELVAN', setName), 300)

    // Phase 2: show subtitle
    setTimeout(() => {
      setSub('Welcome to my digital universe.')
    }, 1800)

    // Phase 3: portal transition
    setTimeout(() => setPhase('portal'), 3200)

    // Phase 4: complete
    setTimeout(() => { setPhase('done'); onComplete() }, 4600)
  }, [])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ background: '#000' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Star particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`, top: `${p.y}%`,
                width: p.size, height: p.size,
                background: p.color,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.4, 0.8],
                y: [0, -30, 0]
              }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {/* Central content */}
          <motion.div
            className="relative text-center z-10"
            animate={phase === 'portal' ? {
              scale: [1, 1.5, 8, 40],
              opacity: [1, 1, 0.5, 0],
              filter: ['blur(0px)', 'blur(0px)', 'blur(4px)', 'blur(20px)']
            } : {}}
            transition={{ duration: 1.4, ease: [0.4, 0, 1, 1] }}
          >
            {/* Outer ring */}
            <motion.div
              className="absolute rounded-full border border-cyan-500/20"
              style={{ inset: -80 }}
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity } }}
            />
            <motion.div
              className="absolute rounded-full border border-purple-500/20"
              style={{ inset: -120 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />

            {/* Name */}
            <motion.h1
              className="font-orbitron font-black tracking-widest text-4xl md:text-7xl glow-cyan"
              style={{ color: '#00f5ff', letterSpacing: '0.3em' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {name}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="font-mono text-gray-400 mt-6 text-lg tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: sub ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              {sub}
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="mt-10 mx-auto h-px w-64 overflow-hidden"
              style={{ background: 'rgba(0,245,255,0.1)' }}
            >
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(90deg, #00f5ff, #8b5cf6, #ec4899)' }}
                initial={{ width: '0%' }}
                animate={{ width: phase === 'portal' ? '100%' : '70%' }}
                transition={{ duration: phase === 'portal' ? 0.5 : 2.5, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Portal activation text */}
            <AnimatePresence>
              {phase === 'portal' && (
                <motion.div
                  className="font-mono text-cyan-400 text-sm mt-4 tracking-widest"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  ENTERING DIGITAL UNIVERSE...
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Corner decorations */}
          {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-8 h-8`}>
              <div className="w-full h-0.5 bg-cyan-500/50" />
              <div className="h-full w-0.5 bg-cyan-500/50" />
            </div>
          ))}

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)', opacity: 0.4 }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
