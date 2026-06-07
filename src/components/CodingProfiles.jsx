import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const step = ts => {
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(ease * target))
      if (p < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

function ContributionGrid() {
  const weeks = 26
  const days = 7
  const grid = Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => Math.random())
  )
  const getColor = v => {
    if (v < 0.2) return 'rgba(0,245,255,0.05)'
    if (v < 0.4) return 'rgba(0,245,255,0.2)'
    if (v < 0.6) return 'rgba(0,245,255,0.45)'
    if (v < 0.8) return 'rgba(0,245,255,0.7)'
    return '#00f5ff'
  }

  return (
    <div className="flex gap-1 overflow-x-auto pb-2">
      {grid.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-1">
          {week.map((val, di) => (
            <motion.div key={di}
              className="w-3 h-3 rounded-sm"
              style={{ background: getColor(val) }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: wi * 0.02 + di * 0.01, duration: 0.3 }}
              title={`${Math.floor(val * 10)} contributions`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

const PLATFORM_CARDS = [
  {
    platform: 'LeetCode', icon: '🧩', color: '#ffa116',
    stats: [
      { label: 'Problems Solved', value: 170, suffix: '+' },
    ],
    bars: [['Arrays & Strings', 80], ['Dynamic Programming', 60], ['Trees & Graphs', 65]],
  },
  {
    platform: 'CodeChef', icon: '👨‍🍳', color: '#8b5cf6',
    stats: [
      { label: 'Problems Solved', value: 1200, suffix: '+' },
    ],
    bars: [['Basic Programming', 95], ['Data Structures', 80], ['Algorithms', 75]],
  },
  {
    platform: 'SkillRack', icon: '🏆', color: '#00f5ff',
    stats: [
      { label: 'Problems Solved', value: 1200, suffix: '+' },
      { label: 'Certificates', value: 15, suffix: '+' },
    ],
    bars: [['C Programming', 90], ['Java', 80], ['Python', 78]],
  },
  {
    platform: 'HackerRank', icon: '⭐', color: '#10b981',
    stats: [],
    badges: ['5★ C++', '3★ C', '3★ Python', '3★ Java', '3★ SQL', '2★ Problem Solving'],
    bars: [],
  },
]

const QUICK_STATS = [
  { label: 'LeetCode', value: 170, icon: '🧩', color: '#ffa116', suffix: '+' },
  { label: 'CodeChef', value: 1200, icon: '👨‍🍳', color: '#8b5cf6', suffix: '+' },
  { label: 'SkillRack', value: 1200, icon: '🏆', color: '#00f5ff', suffix: '+' },
  { label: 'SkillRack Rank', value: 14849, icon: '📊', color: '#ec4899', prefix: '#' },
]

export default function CodingProfiles() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="profiles" className="relative py-24 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="font-mono text-yellow-400 text-sm tracking-widest mb-3">// CHAPTER 04</div>
          <h2 className="font-orbitron font-black text-4xl md:text-6xl glow-gold text-yellow-400 mb-4">STATS DASHBOARD</h2>
          <p className="text-gray-400">Quantified progress — every commit, every solve, every streak.</p>
        </motion.div>

        {/* Quick stat badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {QUICK_STATS.map((b, i) => (
            <motion.div key={i} className="glass gradient-border p-5 text-center hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}>
              <div className="text-3xl mb-2">{b.icon}</div>
              <div className="font-orbitron text-2xl font-black" style={{ color: b.color }}>
                {b.prefix || ''}<Counter target={b.value} suffix={b.suffix || ''} />
              </div>
              <div className="font-mono text-xs text-gray-400 mt-1">{b.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Platform cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {PLATFORM_CARDS.map((platform, pi) => (
            <motion.div key={pi} className="glass gradient-border p-6"
              initial={{ opacity: 0, x: pi % 2 === 0 ? -40 : 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + pi * 0.15, duration: 0.8 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{platform.icon}</span>
                <h3 className="font-orbitron font-bold text-xl" style={{ color: platform.color }}>{platform.platform}</h3>
              </div>

              {platform.stats.length > 0 && (
                <div className="flex gap-6 mb-4">
                  {platform.stats.map((s, i) => (
                    <div key={i}>
                      <div className="font-orbitron text-2xl font-black" style={{ color: platform.color }}>
                        <Counter target={s.value} suffix={s.suffix} />
                      </div>
                      <div className="font-mono text-xs text-gray-500 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {platform.badges && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {platform.badges.map(b => (
                    <span key={b} className="px-2 py-1 rounded-full font-mono text-xs"
                      style={{ background: `${platform.color}11`, border: `1px solid ${platform.color}33`, color: platform.color }}>
                      {b}
                    </span>
                  ))}
                </div>
              )}

              {platform.bars.length > 0 && (
                <div className="space-y-2">
                  {platform.bars.map(([name, pct]) => (
                    <div key={name}>
                      <div className="flex justify-between font-mono text-xs text-gray-400 mb-1">
                        <span>{name}</span><span style={{ color: platform.color }}>{pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${platform.color}, ${platform.color}88)` }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${pct}%` } : {}}
                          transition={{ duration: 1.2, delay: 0.5 + pi * 0.15 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contribution graph */}
        <motion.div className="glass gradient-border p-6"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-orbitron text-cyan-400 font-bold">CONTRIBUTION GRAPH</h3>
            <span className="font-mono text-xs text-gray-500">Last 6 months</span>
          </div>
          <ContributionGrid />
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="font-mono text-xs text-gray-500">Less</span>
            {[0.05, 0.25, 0.5, 0.75, 1].map((v, i) => (
              <div key={i} className="w-3 h-3 rounded-sm" style={{ background: `rgba(0,245,255,${v})` }} />
            ))}
            <span className="font-mono text-xs text-gray-500">More</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
