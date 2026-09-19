import { useState, useEffect } from 'react'
import { Field, FormCard, SaveBtn, AddBtn, RemoveBtn } from '../components/AdminUI'

export default function AchievementsPage({ data, onSave }) {
  const [items, setItems] = useState(data.map(a => ({ ...a })))

  useEffect(() => { setItems(data.map(a => ({ ...a }))) }, [data])

  const update = (i, k, v) => setItems(ls => ls.map((a, idx) => idx === i ? { ...a, [k]: v } : a))
  const remove = i => setItems(ls => ls.filter((_, idx) => idx !== i))
  const add = () => setItems(ls => [...ls, { icon: '🏆', title: '', org: '', year: '2024', color: '#c026d3', type: 'cert', link: '#' }])

  return (
    <div className="flex flex-col gap-6">
      <FormCard title="Achievements & Certifications" icon="🏆">
        <div className="flex flex-col gap-3">
          {items.map((a, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                <Field label="Icon" value={a.icon} onChange={v => update(i, 'icon', v)} />
                <Field label="Title" value={a.title} onChange={v => update(i, 'title', v)} />
                <Field label="Organization" value={a.org} onChange={v => update(i, 'org', v)} />
                <Field label="Year" value={a.year} onChange={v => update(i, 'year', v)} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-end">
                <Field label="Color" value={a.color} onChange={v => update(i, 'color', v)} />
                <Field label="Link" value={a.link} onChange={v => update(i, 'link', v)} />
                <div className="flex flex-col gap-1">
                  <label className="admin-label">Type</label>
                  <select value={a.type} onChange={e => update(i, 'type', e.target.value)}
                    style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 13 }}>
                    <option value="cert">Certificate</option>
                    <option value="achievement">Achievement</option>
                  </select>
                </div>
                <div className="flex items-end pb-0.5">
                  <RemoveBtn onClick={() => remove(i)} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <AddBtn onClick={add} label="Add Achievement" />
        <SaveBtn onClick={() => onSave('achievements', items)} />
      </FormCard>
    </div>
  )
}
