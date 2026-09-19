import { useState, useEffect } from 'react'
import { Field, Textarea, FormCard, SaveBtn } from '../components/AdminUI'

export default function PersonalPage({ data, onSave }) {
  const [form, setForm] = useState({ ...data })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => { setForm({ ...data }) }, [data])

  return (
    <div className="flex flex-col gap-6">
      <FormCard title="Personal Information" icon="👤">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name" value={form.name} onChange={v => set('name', v)} />
          <Field label="Short Name / Logo" value={form.shortName} onChange={v => set('shortName', v)} />
          <Field label="Title" value={form.title} onChange={v => set('title', v)} />
          <Field label="Subtitle (eyebrow)" value={form.subtitle} onChange={v => set('subtitle', v)} />
          <Field label="Location" value={form.location} onChange={v => set('location', v)} />
          <Field label="Email" value={form.email} onChange={v => set('email', v)} type="email" />
          <Field label="Phone" value={form.phone} onChange={v => set('phone', v)} />
          <Field label="Resume Path" value={form.resumePath} onChange={v => set('resumePath', v)} />
        </div>
        <Textarea label="Bio" value={form.bio} onChange={v => set('bio', v)} rows={3} />
        <Textarea label="Tagline" value={form.tagline} onChange={v => set('tagline', v)} rows={2} />
        <div className="flex items-center gap-3 mt-2">
          <label className="admin-label">Available for Work</label>
          <button
            onClick={() => set('available', !form.available)}
            style={{
              padding: '4px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
              background: form.available ? '#10b981' : '#64748b', color: '#fff',
            }}>
            {form.available ? 'Yes' : 'No'}
          </button>
        </div>
        <SaveBtn onClick={() => onSave('personal', form)} />
      </FormCard>
    </div>
  )
}
