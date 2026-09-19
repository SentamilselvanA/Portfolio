import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { usePortfolioData } from '../../hooks/usePortfolioData'

export default function ProfessionalContact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const { personal: PERSONAL, social: SOCIAL_LINKS } = usePortfolioData()

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    await new Promise(r => setTimeout(r, 2000))
    setStatus('sent')
    setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }, 4000)
  }

  const contactInfo = [
    { icon: '📧', label: 'Email',    value: PERSONAL.email,    href: `mailto:${PERSONAL.email}` },
    { icon: '💼', label: 'LinkedIn', value: 'sentamil-selvan', href: SOCIAL_LINKS.find(l => l.label === 'LinkedIn')?.href },
    { icon: '🐙', label: 'GitHub',   value: 'SentamilselvanA', href: SOCIAL_LINKS.find(l => l.label === 'GitHub')?.href },
    { icon: '🧩', label: 'LeetCode', value: 'sentamilselvan001', href: SOCIAL_LINKS.find(l => l.label === 'LeetCode')?.href },
  ]

  return (
    <section id="p-contact" className="py-20 px-4" style={{ background: '#ffffff' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div ref={ref} className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(192,38,211,0.08)', color: '#c026d3', border: '1px solid rgba(192,38,211,0.2)' }}>
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#172033' }}>Let's Work Together</h2>
          <p className="text-base" style={{ color: '#64748b' }}>Open to opportunities, collaborations, and interesting conversations</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left — info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(135deg, #faf7ff, #f5f0ff)', border: '1px solid #eee5f5' }}>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#172033' }}>Get in Touch</h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#64748b' }}>
                Whether you have a project in mind, a job opportunity, or just want to say hello — I'd love to hear from you. I'm currently open to full-time roles and internship opportunities.
              </p>

              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:-translate-y-0.5 group"
                    style={{ background: '#ffffff', border: '1px solid #eee5f5', boxShadow: '0 2px 10px rgba(192,38,211,0.04)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: 'rgba(192,38,211,0.08)' }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-0.5" style={{ color: '#94a3b8' }}>{item.label}</div>
                      <div className="text-sm font-semibold group-hover:text-purple-600 transition-colors" style={{ color: '#172033' }}>{item.value}</div>
                    </div>
                    <span className="ml-auto text-sm" style={{ color: '#c026d3' }}>→</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
            <div className="rounded-3xl p-8" style={{ background: '#ffffff', border: '1px solid #eee5f5', boxShadow: '0 8px 40px rgba(192,38,211,0.07)' }}>
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div key="sent" className="flex flex-col items-center justify-center h-80 text-center"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#172033' }}>Message Sent!</h3>
                    <p className="text-sm" style={{ color: '#64748b' }}>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="text-xl font-bold mb-5" style={{ color: '#172033' }}>Send a Message</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { key: 'name',  label: 'Name',    placeholder: 'Your name',    type: 'text'  },
                        { key: 'email', label: 'Email',   placeholder: 'your@email.com', type: 'email' },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>{f.label}</label>
                          <input type={f.type} value={form[f.key]}
                            onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                            placeholder={f.placeholder}
                            className="pro-input w-full" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Subject</label>
                      <input type="text" value={form.subject}
                        onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                        placeholder="What's this about?"
                        className="pro-input w-full" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Message</label>
                      <textarea rows={4} value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        placeholder="Your message..."
                        className="pro-input w-full resize-none" />
                    </div>
                    <motion.button type="submit" disabled={status === 'sending'}
                      className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all"
                      style={{ background: 'linear-gradient(135deg, #c026d3, #a855f7)', boxShadow: '0 4px 20px rgba(192,38,211,0.3)' }}
                      whileHover={{ scale: 1.01, boxShadow: '0 8px 28px rgba(192,38,211,0.4)' }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {status === 'sending' ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⟳</motion.span>
                          Sending...
                        </span>
                      ) : 'Send Message →'}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div className="text-center mt-16 pt-8" style={{ borderTop: '1px solid #eee5f5' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
          <div className="font-bold text-lg mb-1" style={{ color: '#172033' }}>
            <span style={{ color: '#c026d3' }}>S</span>entamilselvan
          </div>
          <div className="text-sm mb-4" style={{ color: '#94a3b8' }}>Full Stack Developer · CSE Student</div>
          <div className="flex justify-center gap-4 flex-wrap mb-4">
            {SOCIAL_LINKS.slice(0, 4).map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                className="text-sm transition-all hover:-translate-y-0.5" style={{ color: '#94a3b8' }}>
                {l.icon} {l.label}
              </a>
            ))}
          </div>
          <div className="text-xs" style={{ color: '#cbd5e1' }}>© 2024 Sentamilselvan · Built with React + Tailwind + Framer Motion</div>
        </motion.div>
      </div>
    </section>
  )
}
