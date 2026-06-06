import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'profiles', 'vault', 'contact']
const LABELS = ['Home', 'About', 'Skills', 'Projects', 'Stats', 'Vault', 'Contact']

export default function Navbar({ onLogoClick, soundOn, onSoundToggle }) {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) { setActive(id); break }
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      style={{
        background: scrolled ? 'rgba(2,4,8,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,245,255,0.1)' : 'none',
        transition: 'all 0.4s ease'
      }}
    >
      {/* Logo */}
      <button
        onClick={onLogoClick}
        className="font-orbitron font-black text-cyan-400 glow-cyan text-xl tracking-wider hover:scale-105 transition-transform"
        title="Click 5 times for a surprise..."
      >
        STS
      </button>

      {/* Section dots */}
      <div className="flex items-center gap-3">
        {SECTIONS.map((id, i) => (
          <div key={id} className="relative group" onClick={() => scrollTo(id)}>
            <div className={`nav-dot ${active === id ? 'active' : ''}`} />
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {LABELS[i]}
            </span>
          </div>
        ))}
      </div>

      {/* Sound toggle */}
      <button
        onClick={onSoundToggle}
        className="font-mono text-xs px-3 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:glow-box-cyan transition-all"
        title="Toggle ambient sound"
      >
        {soundOn ? '🔊 SFX' : '🔇 SFX'}
      </button>
    </motion.nav>
  )
}
