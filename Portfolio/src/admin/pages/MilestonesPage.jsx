import { useState } from 'react'
import { Field, Textarea, FormCard, SaveBtn, AddBtn, RemoveBtn } from '../components/AdminUI'

export default function MilestonesPage({ data, onSave }) {
  const [items, setItems] = useState(data.map(m => ({ ...m })))

  const update = (i, k, v) => setItems(ms => ms.map((m, idx) => idx === i ? { ...m, [k]: v } : m))
  const remove = i => setItems(ms => ms.filter((_, idx) => idx !== i))
  const add = () => setItems(ms => [...ms, { year: '', title: '', desc: '', icon: '⭐', color: '#c026d3', side: 'left' }])

  return (
    <div className="flex flex-col gap-6">
      <FormCard title="Timeline Milestones" icon="📅">
        <div className="flex flex-col gap-3">
          {items.map((m, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                <Field label="Year" value={m.year} onChange={v => update(i, 'year', v)} />
                <Field label="Title" value={m.title} onChange={v => update(i, 'title', v)} />
                <Field label="Icon" value={m.icon} onChange={v => update(i, 'icon', v)} />
                <Field label="Color" value={m.color} onChange={v => update(i, 'color', v)} />
              </div>
              <div className="flex gap-2 items-end mb-2">
                <div className="flex flex-col gap-1">
                  <label className="admin-label">Side</label>
                  <select value={m.side} onChange={e => update(i, 'side', e.target.value)}
                    style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 13 }}>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div className="flex-1" />
                <RemoveBtn onClick={() => remove(i)} />
              </div>
              <Textarea label="Description" value={m.desc} onChange={v => update(i, 'desc', v)} rows={2} />
            </div>
          ))}
        </div>
        <AddBtn onClick={add} label="Add Milestone" />
        <SaveBtn onClick={() => onSave('milestones', items)} />
      </FormCard>
    </div>
  )
}
