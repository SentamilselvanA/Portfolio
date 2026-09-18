import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let mouse = { x: W / 2, y: H / 2, vx: 0, vy: 0 }
    let bursts = []
    let ripples = []
    let streaks = []
    let frame = 0

    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    const onMouse = e => {
      mouse.vx = e.clientX - mouse.x
      mouse.vy = e.clientY - mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY
      // velocity streak
      const speed = Math.sqrt(mouse.vx ** 2 + mouse.vy ** 2)
      if (speed > 6) {
        streaks.push({ x: mouse.x, y: mouse.y, vx: mouse.vx * 0.3, vy: mouse.vy * 0.3, life: 1, color: speed > 15 ? '#ec4899' : speed > 10 ? '#8b5cf6' : '#00f5ff' })
      }
    }
    const onClick = e => {
      // Click burst — explode 28 particles outward
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.8 })
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.5, delay: 8 })
      for (let i = 0; i < 28; i++) {
        const angle = (i / 28) * Math.PI * 2
        const speed = 2 + Math.random() * 5
        const colors = ['#00f5ff', '#8b5cf6', '#ec4899', '#fbbf24', '#ffffff']
        bursts.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          r: Math.random() * 2.5 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1, decay: 0.018 + Math.random() * 0.012
        })
      }
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('click', onClick)

    // ── Aurora bands ──────────────────────────────────────────────
    const AURORA = [
      { y: H * 0.08, amp: 40, freq: 0.004, speed: 0.006, color: '0,245,255',  a: 0.04, h: 80 },
      { y: H * 0.12, amp: 30, freq: 0.005, speed: 0.009, color: '139,92,246', a: 0.03, h: 60 },
      { y: H * 0.06, amp: 50, freq: 0.003, speed: 0.004, color: '236,72,153', a: 0.025, h: 50 },
    ]

    // ── Nebula blobs ──────────────────────────────────────────────
    const BLOBS = [
      { x: W*0.1,  y: H*0.2,  vx:0.15,  vy:0.09,  r:300, color:'0,245,255',  a:0.05 },
      { x: W*0.85, y: H*0.45, vx:-0.12, vy:0.07,  r:260, color:'139,92,246', a:0.045 },
      { x: W*0.5,  y: H*0.9,  vx:0.08,  vy:-0.11, r:240, color:'236,72,153', a:0.04 },
      { x: W*0.3,  y: H*0.65, vx:-0.09, vy:-0.08, r:200, color:'251,191,36', a:0.03 },
    ]

    // ── Warp grid ─────────────────────────────────────────────────
    const GCOLS = Math.ceil(W / 80) + 2
    const GROWS = Math.ceil(H / 80) + 2
    const GSIZE = 80

    // ── Star particles ────────────────────────────────────────────
    const N = 180
    const PCOLS = ['#00f5ff','#8b5cf6','#ec4899','#ffffff','#fbbf24','#10b981']
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      ox: 0, oy: 0,
      vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5,
      r: Math.random() * 1.8 + 0.5,
      color: PCOLS[Math.floor(Math.random() * PCOLS.length)],
      pulse: Math.random() * Math.PI * 2,
      depth: Math.random() * 0.7 + 0.3, // parallax depth
    }))

    // ── Shooting stars ────────────────────────────────────────────
    let shootTimer = 0, shootStar = null
    const spawnShoot = () => {
      const fromTop = Math.random() > 0.5
      shootStar = fromTop
        ? { x: Math.random() * W * 0.8, y: 0,            vx: 2+Math.random()*4, vy: 1.5+Math.random()*2.5, life:1 }
        : { x: 0,                        y: Math.random()*H*0.5, vx: 3+Math.random()*4, vy: 0.5+Math.random()*1.5, life:1 }
    }

    let raf
    const draw = () => {
      frame++
      ctx.clearRect(0, 0, W, H)

      // ── Aurora ──
      AURORA.forEach(a => {
        a.phase = (a.phase || 0) + a.speed
        ctx.save()
        for (let x = 0; x <= W; x += 3) {
          const yOffset = Math.sin(x * a.freq + a.phase) * a.amp
          const grad = ctx.createLinearGradient(0, a.y + yOffset, 0, a.y + yOffset + a.h)
          grad.addColorStop(0, `rgba(${a.color},0)`)
          grad.addColorStop(0.4, `rgba(${a.color},${a.a})`)
          grad.addColorStop(1, `rgba(${a.color},0)`)
          ctx.fillStyle = grad
          ctx.fillRect(x, a.y + yOffset, 4, a.h)
        }
        ctx.restore()
      })

      // ── Nebula blobs ──
      BLOBS.forEach(b => {
        b.x += b.vx; b.y += b.vy
        if (b.x < -b.r) b.x = W+b.r; if (b.x > W+b.r) b.x = -b.r
        if (b.y < -b.r) b.y = H+b.r; if (b.y > H+b.r) b.y = -b.r
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        g.addColorStop(0, `rgba(${b.color},${b.a})`)
        g.addColorStop(1, `rgba(${b.color},0)`)
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2)
        ctx.fillStyle = g; ctx.fill()
      })

      // ── Warp grid ──
      ctx.save()
      ctx.strokeStyle = 'rgba(0,245,255,0.04)'
      ctx.lineWidth = 0.5
      for (let row = 0; row < GROWS; row++) {
        ctx.beginPath()
        for (let col = 0; col < GCOLS; col++) {
          let gx = col * GSIZE
          let gy = row * GSIZE
          // bend grid toward mouse
          const ddx = gx - mouse.x, ddy = gy - mouse.y
          const dd = Math.sqrt(ddx*ddx + ddy*ddy)
          const warp = Math.max(0, 1 - dd / 300) * 22
          gx -= (ddx / (dd+1)) * warp
          gy -= (ddy / (dd+1)) * warp
          col === 0 ? ctx.moveTo(gx, gy) : ctx.lineTo(gx, gy)
        }
        ctx.stroke()
      }
      for (let col = 0; col < GCOLS; col++) {
        ctx.beginPath()
        for (let row = 0; row < GROWS; row++) {
          let gx = col * GSIZE
          let gy = row * GSIZE
          const ddx = gx - mouse.x, ddy = gy - mouse.y
          const dd = Math.sqrt(ddx*ddx + ddy*ddy)
          const warp = Math.max(0, 1 - dd / 300) * 22
          gx -= (ddx / (dd+1)) * warp
          gy -= (ddy / (dd+1)) * warp
          row === 0 ? ctx.moveTo(gx, gy) : ctx.lineTo(gx, gy)
        }
        ctx.stroke()
      }
      // bright grid nodes near mouse
      for (let row = 0; row < GROWS; row++) {
        for (let col = 0; col < GCOLS; col++) {
          const gx = col * GSIZE, gy = row * GSIZE
          const d = Math.sqrt((gx-mouse.x)**2 + (gy-mouse.y)**2)
          if (d < 200) {
            const a = (1 - d/200) * 0.5
            ctx.beginPath(); ctx.arc(gx, gy, 1.5, 0, Math.PI*2)
            ctx.fillStyle = `rgba(0,245,255,${a})`; ctx.fill()
          }
        }
      }
      ctx.restore()

      // ── Mouse halo ──
      const msize = 160 + Math.sqrt(mouse.vx**2+mouse.vy**2) * 4
      const mg = ctx.createRadialGradient(mouse.x,mouse.y,0,mouse.x,mouse.y,msize)
      mg.addColorStop(0,'rgba(0,245,255,0.10)')
      mg.addColorStop(0.4,'rgba(139,92,246,0.04)')
      mg.addColorStop(1,'rgba(0,0,0,0)')
      ctx.beginPath(); ctx.arc(mouse.x,mouse.y,msize,0,Math.PI*2)
      ctx.fillStyle=mg; ctx.fill()

      // ── Velocity streaks ──
      streaks = streaks.filter(s => s.life > 0.02)
      streaks.forEach(s => {
        s.life -= 0.06
        s.x += s.vx; s.y += s.vy
        s.vx *= 0.9; s.vy *= 0.9
        const a = s.life * 0.6
        ctx.beginPath()
        ctx.arc(s.x, s.y, Math.max(0.1, s.life * 3), 0, Math.PI*2)
        ctx.fillStyle = s.color.replace(')', `,${a})`).replace('rgb','rgba').replace('#00f5ff',`rgba(0,245,255,${a})`).replace('#8b5cf6',`rgba(139,92,246,${a})`).replace('#ec4899',`rgba(236,72,153,${a})`)
        ctx.shadowBlur = 8; ctx.shadowColor = s.color
        ctx.fill(); ctx.shadowBlur = 0
      })

      // ── Ripples ──
      ripples = ripples.filter(r => r.alpha > 0.01)
      ripples.forEach(rp => {
        if (rp.delay) { rp.delay--; return }
        rp.r += 5; rp.alpha *= 0.91
        ctx.beginPath(); ctx.arc(rp.x,rp.y,rp.r,0,Math.PI*2)
        ctx.strokeStyle=`rgba(0,245,255,${rp.alpha})`; ctx.lineWidth=1.5; ctx.stroke()
        if (rp.r > 40) {
          ctx.beginPath(); ctx.arc(rp.x,rp.y,rp.r*0.55,0,Math.PI*2)
          ctx.strokeStyle=`rgba(139,92,246,${rp.alpha*0.6})`; ctx.lineWidth=1; ctx.stroke()
        }
      })

      // ── Click bursts ──
      bursts = bursts.filter(b => b.life > 0)
      bursts.forEach(b => {
        b.life -= b.decay
        b.x += b.vx; b.y += b.vy
        b.vx *= 0.95; b.vy *= 0.95
        const r = Math.max(0.1, b.r * b.life)
        ctx.beginPath(); ctx.arc(b.x,b.y,r,0,Math.PI*2)
        ctx.fillStyle = b.color
        ctx.shadowBlur = 10; ctx.shadowColor = b.color; ctx.globalAlpha = b.life
        ctx.fill(); ctx.shadowBlur = 0; ctx.globalAlpha = 1
      })

      // ── Shooting star ──
      shootTimer++
      if (shootTimer > 180 + Math.random()*200) { shootTimer=0; spawnShoot() }
      if (shootStar) {
        shootStar.x += shootStar.vx; shootStar.y += shootStar.vy
        shootStar.life -= 0.016
        if (shootStar.life<=0 || shootStar.x>W || shootStar.y>H) { shootStar=null }
        else {
          const len = 90 * shootStar.life
          const sg = ctx.createLinearGradient(
            shootStar.x - shootStar.vx/shootStar.vx*len,
            shootStar.y - shootStar.vy/shootStar.vx*len,
            shootStar.x, shootStar.y
          )
          sg.addColorStop(0,'rgba(255,255,255,0)')
          sg.addColorStop(1,`rgba(255,255,255,${shootStar.life})`)
          ctx.beginPath()
          ctx.moveTo(shootStar.x - shootStar.vx*22, shootStar.y - shootStar.vy*22)
          ctx.lineTo(shootStar.x, shootStar.y)
          ctx.strokeStyle = sg; ctx.lineWidth=2; ctx.stroke()
          // head glow
          ctx.beginPath(); ctx.arc(shootStar.x,shootStar.y,2,0,Math.PI*2)
          ctx.fillStyle=`rgba(255,255,255,${shootStar.life})`
          ctx.shadowBlur=12; ctx.shadowColor='#ffffff'; ctx.fill(); ctx.shadowBlur=0
        }
      }

      // ── Particles (parallax + constellation) ──
      particles.forEach(p => {
        const dx = p.x-mouse.x, dy = p.y-mouse.y
        const dist = Math.sqrt(dx*dx+dy*dy)
        if (dist < 140 && dist > 1) {
          const f = ((140-dist)/140) * 0.55
          p.vx += (dx/dist)*f; p.vy += (dy/dist)*f
        } else if (dist < 300 && dist > 140) {
          p.vx -= (dx/dist)*0.018; p.vy -= (dy/dist)*0.018
        }
        p.vx *= 0.97; p.vy *= 0.97
        p.x += p.vx * p.depth; p.y += p.vy * p.depth
        p.pulse += 0.035
        if (p.x<0) p.x=W; if (p.x>W) p.x=0
        if (p.y<0) p.y=H; if (p.y>H) p.y=0

        const twinkle = Math.max(0.1, p.r + Math.sin(p.pulse)*0.5)
        const bright = dist < 200 ? 1 + (1-dist/200)*6 : 1
        ctx.beginPath(); ctx.arc(p.x,p.y,twinkle,0,Math.PI*2)
        ctx.fillStyle = p.color
        ctx.shadowBlur = bright * 5; ctx.shadowColor = p.color
        ctx.fill(); ctx.shadowBlur = 0
      })

      // Constellation web — colored lines, fading with distance
      for (let i=0; i<N; i++) {
        for (let j=i+1; j<N; j++) {
          const dx = particles[i].x-particles[j].x
          const dy = particles[i].y-particles[j].y
          const d = Math.sqrt(dx*dx+dy*dy)
          if (d < 120) {
            const base = 0.15*(1-d/120)
            const mx=(particles[i].x+particles[j].x)/2, my=(particles[i].y+particles[j].y)/2
            const md = Math.sqrt((mx-mouse.x)**2+(my-mouse.y)**2)
            const boost = md<220 ? (1-md/220)*0.4 : 0
            // alternating line colors based on particle index
            const lineColor = (i+j)%3===0 ? `rgba(0,245,255,${base+boost})`
                            : (i+j)%3===1 ? `rgba(139,92,246,${base+boost*0.7})`
                            : `rgba(236,72,153,${base*0.6+boost*0.5})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x,particles[i].y)
            ctx.lineTo(particles[j].x,particles[j].y)
            ctx.strokeStyle=lineColor; ctx.lineWidth=0.5; ctx.stroke()
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
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.65 }}
    />
  )
}
