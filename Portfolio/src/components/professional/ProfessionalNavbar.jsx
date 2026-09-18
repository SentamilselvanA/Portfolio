import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UiModeToggle from '../shared/UiModeToggle'

const NAV_ITEMS = [
  { id: 'p-hero',     label: 'Home'            },
  { id: 'p-about',   label: 'About'           },
  { id: 'p-skills',  label: 'Skills'          },
  { id: 'p-projects',label: 'Projects'        },
  { id: 'p-vault',   label: 'Achievements'    },
  { id: 'p-intern',  label: 'Internship'      },
  { id: 'p-profiles',label: 'Coding Profiles' },
  { id: 'p-contact', label: 'Contact'         },
]

export default function ProfessionalNavbar() {
  const [active, setActive]     = useState('p-hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
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
        className="pro-nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        style={{
          background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid #eee5f5' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(192,38,211,0.07)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <div className="font-bold text-xl tracking-tight" style={{ color: '#172033' }}>
          <span style={{ color: '#c026d3' }}>S</span>entamilselvan
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                style={{ color: isActive ? '#c026d3' : '#64748b' }}
              >
                {isActive && (
                  <motion.span
                    layoutId="pro-nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(192,38,211,0.08)', border: '1px solid rgba(192,38,211,0.2)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            )
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <UiModeToggle />
          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-lg border transition-all"
            style={{ borderColor: 'rgba(192,38,211,0.25)' }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <motion.span className="block w-5 h-0.5 rounded-full" style={{ background: '#c026d3' }}
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} transition={{ duration: 0.25 }} />
            <motion.span className="block w-5 h-0.5 rounded-full" style={{ background: '#c026d3' }}
              animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }} />
            <motion.span className="block w-5 h-0.5 rounded-full" style={{ background: '#c026d3' }}
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} transition={{ duration: 0.25 }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(23,32,51,0.4)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-72 lg:hidden flex flex-col pt-20 pb-8 px-5"
              style={{ background: '#ffffff', borderLeft: '1px solid #eee5f5', boxShadow: '-4px 0 30px rgba(192,38,211,0.1)' }}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className="font-bold text-xl mb-8" style={{ color: '#172033' }}>
                <span style={{ color: '#c026d3' }}>S</span>entamilselvan
              </div>
              <nav className="flex flex-col gap-1 flex-1">
                {NAV_ITEMS.map(({ id, label }, i) => {
                  const isActive = active === id
                  return (
                    <motion.button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all"
                      style={{
                        background: isActive ? 'rgba(192,38,211,0.07)' : 'transparent',
                        color: isActive ? '#c026d3' : '#64748b',
                        border: isActive ? '1px solid rgba(192,38,211,0.18)' : '1px solid transparent',
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: isActive ? '#c026d3' : '#cbd5e1' }} />
                      {label}
                    </motion.button>
                  )
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
