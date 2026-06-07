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
  const [phase, setPhase] = useState('scramble')
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setParticles(Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      color: ['#00f5ff', '#8b5cf6', '#ec4899', '#fbbf24'][Math.floor(Math.random() * 4)]
    })))

    setTimeout(() => scramble('SENTAMILSELVAN', setName), 300)
    setTimeout(() => setSub('Welcome to my digital universe.'), 1800)
    setTimeout(() => setPhase('portal'), 3200)
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
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.x}%`, top: `${p.y}%`,
                width: p.size, height: p.size,
                background: p.color,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8], y: [0, -20, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {/* Central content */}
          <motion.div
            className="relative text-center z-10 px-6 w-full"
            style={{ maxWidth: '100vw' }}
            animate={phase === 'portal' ? {
              scale: [1, 1.5, 8, 40],
              opacity: [1, 1, 0.5, 0],
              filter: ['blur(0px)', 'blur(0px)', 'blur(4px)', 'blur(20px)']
            } : {}}
            transition={{ duration: 1.4, ease: [0.4, 0, 1, 1] }}
          >
            {/* Rings — sized relative to viewport so they don't overflow mobile */}
            <motion.div
              className="absolute rounded-full border border-cyan-500/20 pointer-events-none"
              style={{
                top: '50%', left: '50%',
                width: 'min(320px, 70vw)', height: 'min(320px, 70vw)',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute rounded-full border border-purple-500/15 pointer-events-none"
              style={{
                top: '50%', left: '50%',
                width: 'min(440px, 90vw)', height: 'min(440px, 90vw)',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />

            {/* Name — fluid size, no letter-spacing overflow */}
            <motion.h1
              className="font-orbitron font-black glow-cyan"
              style={{
                color: '#00f5ff',
                fontSize: 'clamp(1.3rem, 6.5vw, 4.5rem)',
                letterSpacing: 'clamp(0.05em, 1vw, 0.25em)',
                whiteSpace: 'nowrap',
                display: 'block',
                width: '100%',
                textAlign: 'center',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {name}
            </motion.h1>

            {/* Subtitle — wraps gracefully on mobile */}
            <motion.p
              className="font-mono text-gray-400 mt-6 tracking-wider"
              style={{ fontSize: 'clamp(0.7rem, 3vw, 1.1rem)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: sub ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              {sub}
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="mt-8 mx-auto h-px overflow-hidden"
              style={{
                width: 'min(256px, 70vw)',
                background: 'rgba(0,245,255,0.1)'
              }}
            >
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(90deg, #00f5ff, #8b5cf6, #ec4899)' }}
                initial={{ width: '0%' }}
                animate={{ width: phase === 'portal' ? '100%' : '70%' }}
                transition={{ duration: phase === 'portal' ? 0.5 : 2.5, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Portal text */}
            <AnimatePresence>
              {phase === 'portal' && (
                <motion.div
                  className="font-mono text-cyan-400 mt-4 tracking-widest"
                  style={{ fontSize: 'clamp(0.6rem, 2.5vw, 0.875rem)' }}
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
          {[
            { pos: 'top-4 left-4', rotate: '0deg' },
            { pos: 'top-4 right-4', rotate: '90deg' },
            { pos: 'bottom-4 right-4', rotate: '180deg' },
            { pos: 'bottom-4 left-4', rotate: '270deg' },
          ].map(({ pos, rotate }, i) => (
            <div key={i} className={`absolute ${pos} w-6 h-6 md:w-8 md:h-8`}
              style={{ transform: `rotate(${rotate})` }}>
              <div className="w-full h-px bg-cyan-500/50" />
              <div className="h-full w-px bg-cyan-500/50" />
            </div>
          ))}

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)', opacity: 0.3 }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
