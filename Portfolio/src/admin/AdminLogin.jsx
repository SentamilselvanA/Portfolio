import { useState } from 'react'
import { motion } from 'framer-motion'

const ADMIN_PASS = 'Sentamilselvan@2007'

export default function AdminLogin({ onLogin }) {
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)

  const submit = e => {
    e.preventDefault()
    if (pass === ADMIN_PASS) {
      sessionStorage.setItem('adminAuth', '1')
      onLogin()
    } else {
      setError('Incorrect password. Try again.')
      setPass('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm mx-4"
      >
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '2.5rem' }}>
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-black"
              style={{ background: 'linear-gradient(135deg, #c026d3, #a855f7)' }}>
              STS
            </div>
            <h1 className="text-xl font-bold text-white mb-1">Admin Dashboard</h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>Portfolio Management System</p>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={pass}
                onChange={e => { setPass(e.target.value); setError('') }}
                placeholder="Enter admin password"
                autoFocus
                style={{
                  width: '100%', padding: '12px 44px 12px 16px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box',
                }}
              />
              <button type="button" onClick={() => setShow(s => !s)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 16 }}>
                {show ? '🙈' : '👁️'}
              </button>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ color: '#f87171', fontSize: 13, textAlign: 'center' }}>
                {error}
              </motion.p>
            )}

            <button type="submit"
              style={{ padding: '12px', borderRadius: 12, background: 'linear-gradient(135deg, #c026d3, #a855f7)', color: '#fff', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer' }}>
              Login to Dashboard
            </button>
          </form>

          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, textAlign: 'center', marginTop: 24 }}>
            Protected area — portfolio owner only
          </p>
        </div>
      </motion.div>
    </div>
  )
}
