import { motion } from 'framer-motion'

function StatCard({ icon, label, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.25rem' }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{label}</div>
    </motion.div>
  )
}

export default function DashboardPage({ data, onNavigate }) {
  const stats = [
    { icon: '🚀', label: 'Projects', value: data.projects.length, color: '#a855f7' },
    { icon: '⚡', label: 'Skills', value: Object.values(data.skills).flat().length, color: '#00f5ff' },
    { icon: '🏆', label: 'Achievements', value: data.achievements.length, color: '#fbbf24' },
    { icon: '🔗', label: 'Social Links', value: data.social.length, color: '#10b981' },
    { icon: '📅', label: 'Milestones', value: data.milestones.length, color: '#ec4899' },
    { icon: '📊', label: 'Coding Platforms', value: data.coding.platforms.length, color: '#f97316' },
  ]

  const sections = [
    { id: 'personal',     icon: '👤', label: 'Personal Info',    desc: 'Name, bio, contact, resume' },
    { id: 'social',       icon: '🔗', label: 'Social & Roles',   desc: 'Links, rotating hero roles' },
    { id: 'milestones',   icon: '📅', label: 'Milestones',       desc: 'Timeline / about section' },
    { id: 'skills',       icon: '⚡', label: 'Skills',           desc: 'All skill categories & levels' },
    { id: 'projects',     icon: '🚀', label: 'Projects',         desc: 'Project cards & details' },
    { id: 'achievements', icon: '🏆', label: 'Achievements',     desc: 'Certs & accomplishments' },
    { id: 'internship',   icon: '💼', label: 'Internship',       desc: 'Work experience details' },
    { id: 'coding',       icon: '📊', label: 'Coding Stats',     desc: 'Platform stats & bars' },
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome */}
      <div>
        <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 800, marginBottom: 4 }}>
          Welcome back, <span style={{ background: 'linear-gradient(135deg,#c026d3,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sentamilselvan</span> 👋
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>
          Manage your portfolio content. Changes are saved to localStorage and reflected live on the portfolio.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* Quick nav */}
      <div>
        <h3 style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
          Manage Sections
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {sections.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
              style={{
                padding: '1rem', borderRadius: 14, textAlign: 'left', cursor: 'pointer',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(192,38,211,0.4)'; e.currentTarget.style.background = 'rgba(192,38,211,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{s.label}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{s.desc}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Info box */}
      <div style={{ background: 'rgba(192,38,211,0.08)', border: '1px solid rgba(192,38,211,0.2)', borderRadius: 14, padding: '1rem 1.25rem' }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.6 }}>
          <span style={{ color: '#c026d3', fontWeight: 700 }}>ℹ️ How it works: </span>
          All edits are saved to <code style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 6px', borderRadius: 4 }}>localStorage</code>.
          The portfolio reads from localStorage first, falling back to the default data file.
          To reset everything to defaults, use the <strong>Reset to Defaults</strong> button in the sidebar.
        </p>
      </div>
    </div>
  )
}
