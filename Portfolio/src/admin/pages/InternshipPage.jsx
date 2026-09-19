import { useState, useEffect } from 'react'
import { Field, Textarea, FormCard, SaveBtn, AddBtn, RemoveBtn } from '../components/AdminUI'

export default function InternshipPage({ data, onSave }) {
  const [form, setForm] = useState({
    ...data,
    learningAreas: data.learningAreas.map(l => ({ ...l })),
  })

  useEffect(() => {
    setForm({ ...data, learningAreas: data.learningAreas.map(l => ({ ...l })) })
  }, [data])
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const updateArea = (i, k, v) =>
    setForm(f => ({ ...f, learningAreas: f.learningAreas.map((a, idx) => idx === i ? { ...a, [k]: v } : a) }))
  const removeArea = i =>
    setForm(f => ({ ...f, learningAreas: f.learningAreas.filter((_, idx) => idx !== i) }))
  const addArea = () =>
    setForm(f => ({ ...f, learningAreas: [...f.learningAreas, { title: '', desc: '', icon: '⚡' }] }))

  return (
    <div className="flex flex-col gap-6">
      <FormCard title="Internship Details" icon="💼">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Role" value={form.role} onChange={v => set('role', v)} />
          <Field label="Company" value={form.company} onChange={v => set('company', v)} />
          <Field label="Period" value={form.period} onChange={v => set('period', v)} />
          <Field label="Certificate Link" value={form.certificateLink} onChange={v => set('certificateLink', v)} />
        </div>
        <Textarea label="Description" value={form.description} onChange={v => set('description', v)} rows={4} />
        <SaveBtn onClick={() => onSave('internship', form)} />
      </FormCard>

      <FormCard title="Learning Areas" icon="📚">
        <div className="flex flex-col gap-3">
          {form.learningAreas.map((a, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                <Field label="Icon" value={a.icon} onChange={v => updateArea(i, 'icon', v)} />
                <Field label="Title" value={a.title} onChange={v => updateArea(i, 'title', v)} />
                <div className="flex items-end">
                  <RemoveBtn onClick={() => removeArea(i)} />
                </div>
              </div>
              <Textarea label="Description" value={a.desc} onChange={v => updateArea(i, 'desc', v)} rows={2} />
            </div>
          ))}
        </div>
        <AddBtn onClick={addArea} label="Add Learning Area" />
        <SaveBtn onClick={() => onSave('internship', form)} />
      </FormCard>
    </div>
  )
}
