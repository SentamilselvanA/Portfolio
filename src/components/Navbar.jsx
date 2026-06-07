import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { id: 'hero',     label: 'Home'     },
  { id: 'about',    label: 'About'    },
  { id: 'skills',   label: 'Skills'   },
  { id: 'projects', label: 'Projects' },
  { id: 'profiles', label: 'Stats'    },
  { id: 'vault',    label: 'Vault'    },
  { id: 'contact',  label: 'Contact'  },
]

export default function Navbar({ onLogoClick, soundOn, onSoundToggle }) {
  const [active, setActive]   = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id)
        if (el) {
          const { top, bottom } = el.getBoundingClientRect()
          if (top <= 200 && bottom >= 200) { setActive(id); break }
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        style={{
          background: scrolled ? 'rgba(1,2,5,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,245,255,0.08)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={onLogoClick}
          className="font-orbitron font-black text-cyan-400 glow-cyan text-xl tracking-wider hover:scale-105 transition-transform flex-shrink-0"
          title="Click 5 times for a surprise..."
        >
          STS
        </button>

        {/* ── Desktop nav links ── */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative px-4 py-2 rounded-lg font-mono text-sm tracking-wider transition-colors duration-200"
                style={{ color: isActive ? '#00f5ff' : 'rgba(255,255,255,0.45)' }}
              >
                {/* sliding active pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'rgba(0,245,255,0.07)',
                      border: '1px solid rgba(0,245,255,0.18)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            )
          })}
        </div>

        {/* ── Right side ── */}
        <div className="flex items-center gap-3">
          {/* SFX toggle — hidden on xs */}
          <button
            onClick={onSoundToggle}
            className="hidden sm:block font-mono text-xs px-3 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 transition-all"
          >
            {soundOn ? '🔊 SFX' : '🔇 SFX'}
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <motion.span className="block w-5 h-0.5 bg-cyan-400 rounded-full origin-center"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              transition={{ duration: 0.25 }} />
            <motion.span className="block w-5 h-0.5 bg-cyan-400 rounded-full"
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }} />
            <motion.span className="block w-5 h-0.5 bg-cyan-400 rounded-full origin-center"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              transition={{ duration: 0.25 }} />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* backdrop */}
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* drawer panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-64 md:hidden flex flex-col pt-20 pb-8 px-5"
              style={{
                background: 'rgba(1,2,5,0.97)',
                borderLeft: '1px solid rgba(0,245,255,0.10)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
              }}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className="font-orbitron font-black text-cyan-400 text-xl tracking-wider mb-8 glow-cyan">
                STS
              </div>

              <nav className="flex flex-col gap-1 flex-1">
                {NAV_ITEMS.map(({ id, label }, i) => {
                  const isActive = active === id
                  return (
                    <motion.button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-sm tracking-wider text-left transition-colors duration-200"
                      style={{
                        background: isActive ? 'rgba(0,245,255,0.07)' : 'transparent',
                        border: isActive ? '1px solid rgba(0,245,255,0.16)' : '1px solid transparent',
                        color: isActive ? '#00f5ff' : 'rgba(255,255,255,0.5)',
                      }}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: isActive ? '#00f5ff' : 'rgba(255,255,255,0.18)' }}
                      />
                      {label}
                    </motion.button>
                  )
                })}
              </nav>

              <button
                onClick={onSoundToggle}
                className="font-mono text-xs px-4 py-2.5 rounded-full border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 transition-all mt-4"
              >
                {soundOn ? '🔊 SFX ON' : '🔇 SFX OFF'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
