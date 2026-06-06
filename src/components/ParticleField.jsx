import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let mouse = { x: W / 2, y: H / 2 }

    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    const onMouse = e => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)

    const N = 120
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      color: ['#00f5ff', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 3)]
    }))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        // Mouse repulsion
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          p.vx += (dx / dist) * 0.3
          p.vy += (dy / dist) * 0.3
        }
        p.vx *= 0.98; p.vy *= 0.98
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 8
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Lines between nearby particles
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,245,255,${0.12 * (1 - d / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  )
}
