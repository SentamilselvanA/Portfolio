import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Field ──────────────────────────────────────────────
export function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div className="flex flex-col gap-1 flex-1">
      {label && <label className="admin-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          padding: '8px 12px', borderRadius: 8, fontSize: 13,
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
          color: '#fff', outline: 'none', width: '100%', boxSizing: 'border-box',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = '#c026d3'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
      />
    </div>
  )
}

// ── Textarea ───────────────────────────────────────────
export function Textarea({ label, value, onChange, rows = 3 }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="admin-label">{label}</label>}
      <textarea
        value={value}
        rows={rows}
        onChange={e => onChange(e.target.value)}
        style={{
          padding: '8px 12px', borderRadius: 8, fontSize: 13, resize: 'vertical',
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
          color: '#fff', outline: 'none', width: '100%', boxSizing: 'border-box',
          fontFamily: 'Inter, sans-serif', lineHeight: 1.6,
        }}
        onFocus={e => e.target.style.borderColor = '#c026d3'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
      />
    </div>
  )
}

// ── FormCard ───────────────────────────────────────────
export function FormCard({ title, icon, action, children }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>{icon}</span> {title}
        </h3>
        {action && <div>{action}</div>}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}

// ── SaveBtn ────────────────────────────────────────────
export function SaveBtn({ onClick }) {
  const [saved, setSaved] = useState(false)

  const handle = () => {
    onClick()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <motion.button
      onClick={handle}
      whileTap={{ scale: 0.97 }}
      style={{
        marginTop: 8, padding: '10px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14,
        border: 'none', cursor: 'pointer', alignSelf: 'flex-start',
        background: saved ? '#10b981' : 'linear-gradient(135deg,#c026d3,#a855f7)',
        color: '#fff', transition: 'background 0.3s',
      }}>
      {saved ? '✓ Saved!' : 'Save Changes'}
    </motion.button>
  )
}

// ── AddBtn ─────────────────────────────────────────────
export function AddBtn({ onClick, label = 'Add' }) {
  return (
    <button onClick={onClick}
      style={{
        padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
        background: 'rgba(192,38,211,0.12)', border: '1px dashed rgba(192,38,211,0.4)',
        color: '#c026d3', cursor: 'pointer', alignSelf: 'flex-start',
      }}>
      + {label}
    </button>
  )
}

// ── RemoveBtn ──────────────────────────────────────────
export function RemoveBtn({ onClick }) {
  return (
    <button onClick={onClick}
      style={{
        padding: '8px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600,
        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
        color: '#f87171', cursor: 'pointer', flexShrink: 0,
      }}>
      ✕
    </button>
  )
}

// ── Toast ──────────────────────────────────────────────
export function Toast({ message, type = 'success' }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
            padding: '12px 20px', borderRadius: 12, fontWeight: 600, fontSize: 14,
            background: type === 'success' ? '#10b981' : '#ef4444', color: '#fff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
