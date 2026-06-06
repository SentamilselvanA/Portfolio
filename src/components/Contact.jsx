import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const TERMINAL_LINES = [
  '> Initializing secure channel...',
  '> Establishing connection to Sentamilselvan...',
  '> Connection established. Ready to receive transmissions.',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [termLines, setTermLines] = useState([])
  const [focused, setFocused] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => setTermLines(p => [...p, line]), i * 800 + 300)
    })
  }, [inView])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    await new Promise(r => setTimeout(r, 2500))
    setStatus('sent')
    setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }) }, 4000)
  }

  const LINKS = [
    { icon: '🐙', label: 'GitHub', href: 'https://github.com', color: '#ffffff' },
    { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com', color: '#0077b5' },
    { icon: '📧', label: 'Email', href: 'mailto:sentamilselvan@email.com', color: '#00f5ff' },
    { icon: '🧩', label: 'LeetCode', href: 'https://leetcode.com', color: '#ffa116' },
  ]

  return (
    <section id="contact" className="relative py-24 px-4 z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div ref={ref} className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="font-mono text-cyan-400 text-sm tracking-widest mb-3">// CHAPTER 06</div>
          <h2 className="font-orbitron font-black text-4xl md:text-6xl glow-cyan text-cyan-400 mb-4">TRANSMISSION HUB</h2>
          <p className="text-gray-400">Open a secure channel. Send a transmission.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Terminal */}
          <motion.div className="glass-dark rounded-2xl overflow-hidden border border-cyan-500/20"
            initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-500/10"
              style={{ background: 'rgba(0,245,255,0.03)' }}>
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="font-mono text-xs text-gray-500 ml-2">transmission_terminal.sh</span>
            </div>
            <div className="p-6 font-mono text-sm min-h-64">
              {termLines.map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`mb-2 ${line.startsWith('> Initializing') ? 'text-gray-500' : line.startsWith('> Establishing') ? 'text-yellow-400' : 'text-green-400'}`}>
                  {line}
                </motion.div>
              ))}
              {termLines.length === TERMINAL_LINES.length && (
                <motion.span className="text-cyan-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {'> '}
                  <span style={{ animation: 'blink 1s step-end infinite', borderRight: '2px solid #00f5ff', paddingRight: 2 }}>&nbsp;</span>
                </motion.span>
              )}
            </div>

            {/* Social links */}
            <div className="px-6 pb-6">
              <div className="font-mono text-xs text-gray-500 mb-3">// CONNECT ON</div>
              <div className="grid grid-cols-2 gap-3">
                {LINKS.map((l, i) => (
                  <a key={i} href={l.href} target="_blank"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105"
                    style={{ background: `${l.color}09`, border: `1px solid ${l.color}22`, color: l.color }}>
                    <span>{l.icon}</span>
                    <span className="font-mono text-xs">{l.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div className="glass gradient-border p-6 rounded-2xl"
            initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
            <div className="font-orbitron text-cyan-400 font-bold mb-6 flex items-center gap-2">
              <span className="text-green-400">●</span> SEND A TRANSMISSION
            </div>

            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div key="sent" className="flex flex-col items-center justify-center h-72 text-center"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <motion.div className="text-6xl mb-4" animate={{ rotate: [0, 360] }} transition={{ duration: 1 }}>✅</motion.div>
                  <div className="font-orbitron text-green-400 text-xl font-bold mb-2">TRANSMISSION SENT</div>
                  <div className="font-mono text-sm text-gray-400">Your message is traveling at light speed.</div>
                  <div className="font-mono text-xs text-cyan-400 mt-2">I'll respond within 24 hours.</div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {[
                    { key: 'name', label: 'SENDER_NAME', placeholder: 'Your name...', type: 'text' },
                    { key: 'email', label: 'SENDER_ADDRESS', placeholder: 'your@email.com', type: 'email' },
                  ].map(field => (
                    <div key={field.key}>
                      <div className="font-mono text-xs text-cyan-400/60 mb-1">{'>'} {field.label}</div>
                      <input
                        type={field.type}
                        value={form[field.key]}
                        onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                        onFocus={() => setFocused(field.key)}
                        onBlur={() => setFocused(null)}
                        placeholder={field.placeholder}
                        className="terminal-input"
                        style={{ borderColor: focused === field.key ? '#00f5ff' : undefined }}
                      />
                    </div>
                  ))}
                  <div>
                    <div className="font-mono text-xs text-cyan-400/60 mb-1">{'>'} MESSAGE_PAYLOAD</div>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      placeholder="Your message..."
                      className="terminal-input resize-none"
                      style={{ borderColor: focused === 'message' ? '#00f5ff' : undefined }}
                    />
                  </div>
                  <motion.button type="submit" disabled={status === 'sending'}
                    className="w-full py-4 rounded-xl font-orbitron font-bold tracking-wider text-sm transition-all"
                    style={{
                      background: status === 'sending' ? 'rgba(0,245,255,0.1)' : 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(139,92,246,0.15))',
                      border: '1px solid rgba(0,245,255,0.5)',
                      color: '#00f5ff',
                      boxShadow: status === 'sending' ? 'none' : '0 0 20px rgba(0,245,255,0.2)'
                    }}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,245,255,0.4)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⟳</motion.span>
                        TRANSMITTING...
                      </span>
                    ) : '⚡ SEND TRANSMISSION'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div className="text-center mt-16 pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
          <div className="font-orbitron text-cyan-400 font-bold text-lg mb-2">SENTAMILSELVAN</div>
          <div className="font-mono text-xs text-gray-600">
            Built with React + Tailwind + Framer Motion | © 2024
          </div>
          <div className="font-mono text-xs text-gray-700 mt-1">
            // Try: ↑↑↓↓←→←→BA for a surprise
          </div>
        </motion.div>
      </div>
    </section>
  )
}
