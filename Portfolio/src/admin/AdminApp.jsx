import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLogin from './AdminLogin'
import { useAdminData } from './useAdminData'
import DashboardPage from './pages/DashboardPage'
import PersonalPage from './pages/PersonalPage'
import SocialPage from './pages/SocialPage'
import SkillsPage from './pages/SkillsPage'
import ProjectsPage from './pages/ProjectsPage'
import AchievementsPage from './pages/AchievementsPage'
import InternshipPage from './pages/InternshipPage'
import CodingPage from './pages/CodingPage'
import MilestonesPage from './pages/MilestonesPage'
import { Toast } from './components/AdminUI'

const NAV = [
  { id: 'dashboard',    icon: '🏠', label: 'Dashboard'      },
  { id: 'personal',     icon: '👤', label: 'Personal Info'  },
  { id: 'social',       icon: '🔗', label: 'Social & Roles' },
  { id: 'milestones',   icon: '📅', label: 'Milestones'     },
  { id: 'skills',       icon: '⚡', label: 'Skills'         },
  { id: 'projects',     icon: '🚀', label: 'Projects'       },
  { id: 'achievements', icon: '🏆', label: 'Achievements'   },
  { id: 'internship',   icon: '💼', label: 'Internship'     },
  { id: 'coding',       icon: '📊', label: 'Coding Stats'   },
]

function Sidebar({ active, onNav, onLogout, onReset, collapsed, onToggle }) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      style={{
        background: 'rgba(15,12,41,0.98)', borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0,
        overflow: 'hidden', flexShrink: 0, zIndex: 10,
      }}>
      {/* Logo */}
      <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#c026d3,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: '#fff', flexShrink: 0 }}>
          STS
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>Admin Panel</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>Portfolio Manager</div>
          </motion.div>
        )}
        <button onClick={onToggle} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 16, flexShrink: 0 }}>
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0.75rem 0.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(item => {
          const isActive = active === item.id
          return (
            <button key={item.id} onClick={() => onNav(item.id)}
              title={collapsed ? item.label : ''}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '10px' : '10px 12px',
                borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: isActive ? 'rgba(192,38,211,0.15)' : 'transparent',
                borderLeft: isActive ? '2px solid #c026d3' : '2px solid transparent',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && <span style={{ color: isActive ? '#c026d3' : 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: isActive ? 700 : 500 }}>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div style={{ padding: '0.75rem 0.5rem', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <button onClick={onReset} title="Reset to Defaults"
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '10px' : '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'transparent', justifyContent: collapsed ? 'center' : 'flex-start', width: '100%' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{ fontSize: 18 }}>🔄</span>
          {!collapsed && <span style={{ color: '#f87171', fontSize: 13, fontWeight: 500 }}>Reset Defaults</span>}
        </button>
        <button onClick={onLogout} title="Logout"
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '10px' : '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'transparent', justifyContent: collapsed ? 'center' : 'flex-start', width: '100%' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{ fontSize: 18 }}>🚪</span>
          {!collapsed && <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Logout</span>}
        </button>
        <a href="/" title="View Portfolio"
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '10px' : '10px 12px', borderRadius: 10, textDecoration: 'none', justifyContent: collapsed ? 'center' : 'flex-start' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{ fontSize: 18 }}>🌐</span>
          {!collapsed && <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>View Portfolio</span>}
        </a>
      </div>
    </motion.aside>
  )
}

export default function AdminApp() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('adminAuth') === '1')
  const [page, setPage] = useState('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [toast, setToast] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { data, save, reset } = useAdminData()

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />

  const handleSave = (section, value) => {
    save(section, value)
    setToast('Changes saved successfully!')
    setTimeout(() => setToast(''), 2500)
  }

  const handleReset = () => {
    if (window.confirm('Reset ALL portfolio data to defaults? This cannot be undone.')) {
      reset()
      setToast('Reset to defaults!')
      setTimeout(() => setToast(''), 2500)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    setAuthed(false)
  }

  const currentPage = NAV.find(n => n.id === page)

  const renderPage = () => {
    switch (page) {
      case 'dashboard':    return <DashboardPage data={data} onNavigate={p => { setPage(p); setMobileOpen(false) }} />
      case 'personal':     return <PersonalPage data={data.personal} onSave={handleSave} />
      case 'social':       return <SocialPage data={data.social} rolesData={data.roles} onSave={handleSave} />
      case 'milestones':   return <MilestonesPage data={data.milestones} onSave={handleSave} />
      case 'skills':       return <SkillsPage data={data.skills} onSave={handleSave} />
      case 'projects':     return <ProjectsPage data={data.projects} onSave={handleSave} />
      case 'achievements': return <AchievementsPage data={data.achievements} onSave={handleSave} />
      case 'internship':   return <InternshipPage data={data.internship} onSave={handleSave} />
      case 'coding':       return <CodingPage data={data.coding} onSave={handleSave} />
      default:             return null
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0812', fontFamily: 'Inter, sans-serif' }}>
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar active={page} onNav={p => setPage(p)} onLogout={handleLogout} onReset={handleReset} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-40 md:hidden" style={{ background: 'rgba(0,0,0,0.6)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)} />
            <motion.div className="fixed left-0 top-0 bottom-0 z-50 md:hidden"
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}>
              <Sidebar active={page} onNav={p => { setPage(p); setMobileOpen(false) }} onLogout={handleLogout} onReset={handleReset} collapsed={false} onToggle={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Topbar */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(15,12,41,0.6)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 5 }}>
          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setMobileOpen(true)}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 20 }}>
            ☰
          </button>
          <div>
            <h1 style={{ color: '#fff', fontWeight: 700, fontSize: 18, margin: 0 }}>
              {currentPage?.icon} {currentPage?.label}
            </h1>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Live</span>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div key={page}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}>
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Toast message={toast} />
    </div>
  )
}
