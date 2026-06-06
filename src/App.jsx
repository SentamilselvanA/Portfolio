import { useState, useEffect, useRef, useCallback } from 'react'
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

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [konamiIdx, setKonamiIdx] = useState(0)
  const [easterEgg, setEasterEgg] = useState(false)
  const [logoClicks, setLogoClicks] = useState(0)
  const [secretMsg, setSecretMsg] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
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
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }

    const hover = () => { cursorRef.current?.classList.add('hover'); followerRef.current?.classList.add('hover') }
    const unhover = () => { cursorRef.current?.classList.remove('hover'); followerRef.current?.classList.remove('hover') }

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,[role=button]').forEach(el => { el.addEventListener('mouseenter', hover); el.addEventListener('mouseleave', unhover) })

    const animate = () => {
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.15
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.15
      if (followerRef.current) {
        followerRef.current.style.left = followerPos.current.x + 'px'
        followerRef.current.style.top = followerPos.current.y + 'px'
      }
      // trail
      let px = mousePos.current.x, py = mousePos.current.y
      dots.forEach((dot, i) => {
        dot.x += (px - dot.x) * (0.3 - i * 0.015)
        dot.y += (py - dot.y) * (0.3 - i * 0.015)
        dot.el.style.left = dot.x + 'px'
        dot.el.style.top = dot.y + 'px'
        px = dot.x; py = dot.y
      })
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

  const handleLogoClick = useCallback(() => {
    const next = logoClicks + 1
    setLogoClicks(next)
    if (next >= 5) { setSecretMsg(true); setTimeout(() => setSecretMsg(false), 4000); setLogoClicks(0) }
  }, [logoClicks])

  return (
    <div className="relative min-h-screen animated-bg">
      {/* Ambient orbs */}
      <div className="ambient-orb" style={{ width: 600, height: 600, background: '#00f5ff', top: '10%', left: '-10%' }} />
      <div className="ambient-orb" style={{ width: 500, height: 500, background: '#8b5cf6', top: '40%', right: '-10%' }} />
      <div className="ambient-orb" style={{ width: 400, height: 400, background: '#ec4899', bottom: '10%', left: '30%' }} />

      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />

      {/* Progress bar */}
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      {!loaded ? (
        <Loader onComplete={() => setLoaded(true)} />
      ) : (
        <>
          <ParticleField />
          <Navbar onLogoClick={handleLogoClick} soundOn={soundOn} onSoundToggle={() => setSoundOn(s => !s)} />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <CodingProfiles />
          <AchievementVault />
          <Contact />
        </>
      )}

      {/* Easter egg overlays */}
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

      {/* Hidden secret — inspect the DOM */}
      <div style={{ display: 'none' }} data-secret="true">
        {`/* 
          ██████╗ ███████╗██╗   ██╗
          ██╔══██╗██╔════╝██║   ██║
          ██║  ██║█████╗  ██║   ██║
          ██║  ██║██╔══╝  ╚██╗ ██╔╝
          ██████╔╝███████╗ ╚████╔╝ 
          ╚═════╝ ╚══════╝  ╚═══╝  
          
          Hey, you found the secret message! 👾
          Sentamilselvan - Built this with passion.
          "Code is poetry. Make it beautiful."
          
          If you're reading this, you're exactly
          the kind of detail-oriented person I want
          to work with. Let's connect!
        */`}
      </div>
    </div>
  )
}
