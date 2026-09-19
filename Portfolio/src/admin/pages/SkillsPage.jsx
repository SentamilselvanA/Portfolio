import { useState, useEffect } from 'react'
import { Field, FormCard, SaveBtn, AddBtn, RemoveBtn } from '../components/AdminUI'

const CATEGORIES = ['Programming', 'Frontend', 'Backend', 'Database', 'Tools']

export default function SkillsPage({ data, onSave }) {
  const [skills, setSkills] = useState(JSON.parse(JSON.stringify(data)))
  const [activeTab, setActiveTab] = useState('Programming')

  useEffect(() => { setSkills(JSON.parse(JSON.stringify(data))) }, [data])

  const updateSkill = (cat, i, k, v) =>
    setSkills(s => ({ ...s, [cat]: s[cat].map((sk, idx) => idx === i ? { ...sk, [k]: v } : sk) }))

  const removeSkill = (cat, i) =>
    setSkills(s => ({ ...s, [cat]: s[cat].filter((_, idx) => idx !== i) }))

  const addSkill = cat =>
    setSkills(s => ({ ...s, [cat]: [...(s[cat] || []), { name: '', level: 75, icon: '⚡', color: '#888888', projects: [] }] }))

  return (
    <div className="flex flex-col gap-6">
      <FormCard title="Skills Manager" icon="⚡">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              style={{
                padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                background: activeTab === cat ? 'linear-gradient(135deg,#c026d3,#a855f7)' : 'rgba(255,255,255,0.07)',
                color: activeTab === cat ? '#fff' : 'rgba(255,255,255,0.6)',
              }}>
              {cat} ({(skills[cat] || []).length})
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {(skills[activeTab] || []).map((sk, i) => (
            <div key={i} className="p-3 rounded-xl flex flex-col gap-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Field label="Icon" value={sk.icon} onChange={v => updateSkill(activeTab, i, 'icon', v)} />
                <Field label="Name" value={sk.name} onChange={v => updateSkill(activeTab, i, 'name', v)} />
                <Field label="Color" value={sk.color} onChange={v => updateSkill(activeTab, i, 'color', v)} />
                <div className="flex flex-col gap-1">
                  <label className="admin-label">Level: {sk.level}%</label>
                  <input type="range" min={0} max={100} value={sk.level}
                    onChange={e => updateSkill(activeTab, i, 'level', Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#c026d3' }} />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <Field label="Projects (comma separated)" value={(sk.projects || []).join(', ')}
                  onChange={v => updateSkill(activeTab, i, 'projects', v.split(',').map(s => s.trim()).filter(Boolean))} />
                <RemoveBtn onClick={() => removeSkill(activeTab, i)} />
              </div>
            </div>
          ))}
        </div>
        <AddBtn onClick={() => addSkill(activeTab)} label={`Add ${activeTab} Skill`} />
        <SaveBtn onClick={() => onSave('skills', skills)} />
      </FormCard>
    </div>
  )
}
