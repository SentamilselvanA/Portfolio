import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const ACHIEVEMENTS = [
  { icon: '🥇', title: 'SQL Basic Certification', org: 'HackerRank', year: '2024', color: '#10b981', type: 'cert' },
  { icon: '🥈', title: 'SQL Intermediate Certification', org: 'HackerRank', year: '2024', color: '#10b981', type: 'cert' },
  { icon: '🥉', title: 'SQL Advanced Certification', org: 'HackerRank', year: '2024', color: '#10b981', type: 'cert' },
  { icon: '📚', title: 'Mastering DSA with C & C++', org: 'Udemy', year: '2024', color: '#fbbf24', type: 'cert' },
  { icon: '🐍', title: 'Python for Complete Beginners', org: 'Udemy', year: '2024', color: '#3776ab', type: 'cert' },
  { icon: '☕', title: 'Java for Beginners', org: 'Udemy', year: '2024', color: '#f89820', type: 'cert' },
  { icon: '🧩', title: '200+ LeetCode Solved', org: 'LeetCode', year: '2024', color: '#ffa116', type: 'achievement' },
  { icon: '🏆', title: '1200+ SkillRack Problems', org: 'SkillRack', year: '2024', color: '#00f5ff', type: 'achievement' },
]

const VAULT_GEARS = [
  { size: 80, x: 20, y: 20, speed: 15 },
  { size: 50, x: 60, y: 30, speed: -10 },
  { size: 60, x: 15, y: 65, speed: 12 },
  { size: 40, x: 70, y: 70, speed: -8 },
]

export default function AchievementVault() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="vault" className="relative py-24 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="font-mono text-yellow-400 text-sm tracking-widest mb-3">// CHAPTER 05</div>
          <h2 className="font-orbitron font-black text-4xl md:text-6xl glow-gold text-yellow-400 mb-6">ACHIEVEMENT VAULT</h2>
          <p className="text-gray-300">Classified credentials. Access requires authorization.</p>
        </motion.div>

        {!open && (
          <motion.div
            className="relative max-w-2xl mx-auto h-80 rounded-2xl overflow-hidden cursor-pointer"
            style={{ perspective: 1000 }}
            initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            onClick={() => setOpen(true)}
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f0f23)', border: '2px solid rgba(251,191,36,0.4)', boxShadow: '0 0 40px rgba(251,191,36,0.2)' }}>

              {VAULT_GEARS.map((g, i) => (
                <div key={i} className="absolute opacity-10"
                  style={{ width: g.size, height: g.size, left: `${g.x}%`, top: `${g.y}%`, transform: 'translate(-50%,-50%)' }}>
                  <div className="w-full h-full rounded-full border-4 border-yellow-400"
                    style={{ animation: `rotate360 ${Math.abs(g.speed)}s linear infinite ${g.speed < 0 ? 'reverse' : ''}` }} />
                </div>
              ))}

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div className="w-32 h-32 rounded-full border-4 border-yellow-400 flex items-center justify-center mb-4"
                  style={{ boxShadow: '0 0 30px rgba(251,191,36,0.4)' }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}>
                  <div className="w-20 h-20 rounded-full border-2 border-yellow-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center">
                      <span className="text-xl">🔐</span>
                    </div>
                  </div>
                </motion.div>
                <div className="font-orbitron text-yellow-400 font-bold text-lg mb-1">CLASSIFIED VAULT</div>
                <div className="font-mono text-yellow-300/60 text-sm">CLICK TO AUTHENTICATE</div>

                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="absolute w-px h-3 bg-yellow-400/30"
                    style={{ top: '50%', left: '50%', transformOrigin: '0 -60px', transform: `rotate(${i * 30}deg) translateX(-50%)` }} />
                ))}
              </div>

              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-yellow-400/40" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-yellow-400/10" />
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div className="relative max-w-2xl mx-auto h-20 mb-8 overflow-hidden flex items-center justify-center"
                initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.8 }}>
                <div className="font-orbitron text-green-400 tracking-widest">🔓 ACCESS GRANTED</div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ACHIEVEMENTS.map((a, i) => (
                  <motion.div key={i} className="glass gradient-border p-5 text-center hover:scale-105 transition-all cursor-default group"
                    initial={{ opacity: 0, y: 60, rotateX: -30 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    style={{ perspective: 800 }}>
                    <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">{a.icon}</div>
                    <div className="font-orbitron text-xs font-bold mb-1 leading-tight" style={{ color: a.color }}>{a.title}</div>
                    <div className="font-mono text-xs text-gray-500 mb-1">{a.org}</div>
                    <div className="font-mono text-xs px-2 py-0.5 rounded-full inline-block"
                      style={{ background: `${a.color}11`, color: a.color, border: `1px solid ${a.color}33` }}>
                      {a.year}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div className="text-center mt-8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <button onClick={() => setOpen(false)}
                  className="font-mono text-sm text-gray-500 border border-gray-700 px-4 py-2 rounded-full hover:border-yellow-400 hover:text-yellow-400 transition-all">
                  🔒 Lock Vault
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
