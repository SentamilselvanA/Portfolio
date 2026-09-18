import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ModeProvider, useMode } from './context/ModeContext'
import ModeTransition from './components/shared/ModeTransition'

// Universe UI
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import CodingProfiles from './components/CodingProfiles'
import AchievementVault from './components/AchievementVault'
import Contact from './components/Contact'
import ParticleField from './components/ParticleField'

// Professional UI
import ProfessionalNavbar from './components/professional/ProfessionalNavbar'
import ProfessionalHero from './components/professional/ProfessionalHero'
import ProfessionalAbout from './components/professional/ProfessionalAbout'
import ProfessionalSkills from './components/professional/ProfessionalSkills'
import ProfessionalProjects from './components/professional/ProfessionalProjects'
import ProfessionalCodingProfiles from './components/professional/ProfessionalCodingProfiles'
import ProfessionalAchievements from './components/professional/ProfessionalAchievements'
import ProfessionalInternship from './components/professional/ProfessionalInternship'
import ProfessionalContact from './components/professional/ProfessionalContact'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

function UniverseApp({ onLogoClick, soundOn, setSoundOn }) {
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [konamiIdx, setKonamiIdx] = useState(0)
  const [easterEgg, setEasterEgg] = useState(false)
  const [secretMsg, setSecretMsg] = useState(false)
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const trailsRef = useRef([])
  const mousePos = useRef({ x: 0, y: 0 })
  const followerPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  // Cursor + trail
  useEffect(() => {
    const dots = Array.from({ length: 12 }, (_, i) => {
      const d = document.createElement('div')
      d.className = 'trail-dot'
      d.style.opacity = String((12 - i) / 20)
      d.style.width = d.style.height = `${6 - i * 0.4}px`
      document.body.appendChild(d)
      return { el: d, x: 0, y: 0 }
    })
    trailsRef.current = dots

    const move = e => {
      if (!document.body.classList.contains('universe-mode')) return
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      // Check if hovering any interactive element — works for dynamically rendered elements
      const isHover = !!e.target.closest('a, button, [role="button"], input, textarea, select, label')
      cursorRef.current?.classList.toggle('hover', isHover)
      followerRef.current?.classList.toggle('hover', isHover)
    }

    document.addEventListener('mousemove', move)

    const animate = () => {
      if (document.body.classList.contains('universe-mode')) {
        followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.15
        followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.15
        if (followerRef.current) {
          followerRef.current.style.left = followerPos.current.x + 'px'
          followerRef.current.style.top = followerPos.current.y + 'px'
        }
        let px = mousePos.current.x, py = mousePos.current.y
        dots.forEach((dot, i) => {
          dot.x += (px - dot.x) * (0.3 - i * 0.015)
          dot.y += (py - dot.y) * (0.3 - i * 0.015)
          dot.el.style.left = dot.x + 'px'
          dot.el.style.top = dot.y + 'px'
          px = dot.x; py = dot.y
        })
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(rafRef.current)
      dots.forEach(d => d.el.remove())
    }
  }, [])

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      setProgress((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Konami code
  useEffect(() => {
    const onKey = e => {
      const next = konamiIdx + 1
      if (e.key === KONAMI[konamiIdx]) {
        if (next === KONAMI.length) {
          setEasterEgg(true)
          setKonamiIdx(0)
          setTimeout(() => setEasterEgg(false), 3000)
        } else setKonamiIdx(next)
      } else setKonamiIdx(0)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [konamiIdx])

  return (
    <div className="relative min-h-screen animated-bg">
      <div className="ambient-orb" style={{ width: 500, height: 500, background: '#00f5ff', top: '10%', left: '-12%' }} />
      <div className="ambient-orb" style={{ width: 420, height: 420, background: '#8b5cf6', top: '40%', right: '-12%' }} />
      <div className="ambient-orb" style={{ width: 340, height: 340, background: '#ec4899', bottom: '10%', left: '30%' }} />

      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      {!loaded ? (
        <Loader onComplete={() => setLoaded(true)} />
      ) : (
        <>
          <ParticleField />
          <Navbar onLogoClick={onLogoClick} soundOn={soundOn} onSoundToggle={() => setSoundOn(s => !s)} />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <CodingProfiles />
          <AchievementVault />
          <Contact />
        </>
      )}

      {easterEgg && (
        <div className="easter-egg-overlay flex items-center justify-center">
          <div className="glass p-8 text-center" style={{ zIndex: 100001, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            <div className="font-orbitron text-3xl glow-cyan text-cyan-400 mb-2">🎮 KONAMI CODE!</div>
            <div className="font-mono text-green-400">Achievement Unlocked: Gamer Soul</div>
            <div className="text-sm text-gray-400 mt-2">You know the ancient code. Respect.</div>
          </div>
        </div>
      )}
      {secretMsg && (
        <div style={{ position: 'fixed', bottom: 40, right: 40, zIndex: 100001 }}>
          <div className="glass p-6 glow-box-gold">
            <div className="font-orbitron text-yellow-400 glow-gold text-lg mb-1">🏆 SECRET UNLOCKED</div>
            <div className="font-mono text-sm text-gray-300">You clicked the logo 5 times.</div>
            <div className="font-mono text-xs text-cyan-400 mt-1">// Curiosity is the mark of a great developer.</div>
          </div>
        </div>
      )}
      <div style={{ display: 'none' }} data-secret="true">
        {`/* Hey, you found the secret message! 👾 Sentamilselvan - Built this with passion. */`}
      </div>
    </div>
  )
}

function ProfessionalApp() {
  return (
    <div className="relative min-h-screen" style={{ background: '#ffffff' }}>
      <ProfessionalNavbar />
      <ProfessionalHero />
      <ProfessionalAbout />
      <ProfessionalSkills />
      <ProfessionalProjects />
      <ProfessionalInternship />
      <ProfessionalAchievements />
      <ProfessionalCodingProfiles />
      <ProfessionalContact />
    </div>
  )
}

function AppContent() {
  const { portfolioMode, transitioning } = useMode()
  const [logoClicks, setLogoClicks] = useState(0)
  const [secretMsg, setSecretMsg] = useState(false)
  const [soundOn, setSoundOn] = useState(false)

  useLayoutEffect(() => {
    const isPro = portfolioMode === 'professional'
    document.body.classList.toggle('pro-mode', isPro)
    document.body.classList.toggle('universe-mode', !isPro)
  }, [portfolioMode])

  useEffect(() => {
    return () => document.body.classList.remove('pro-mode', 'universe-mode')
  }, [])

  const handleLogoClick = useCallback(() => {
    const next = logoClicks + 1
    setLogoClicks(next)
    if (next >= 5) { setSecretMsg(true); setTimeout(() => setSecretMsg(false), 4000); setLogoClicks(0) }
  }, [logoClicks])

  return (
    <>
      <ModeTransition />
      <AnimatePresence mode="wait">
        <motion.div
          key={portfolioMode}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        >
          {portfolioMode === 'universe' ? (
            <UniverseApp onLogoClick={handleLogoClick} soundOn={soundOn} setSoundOn={setSoundOn} />
          ) : (
            <ProfessionalApp />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <ModeProvider>
      <AppContent />
    </ModeProvider>
  )
}
