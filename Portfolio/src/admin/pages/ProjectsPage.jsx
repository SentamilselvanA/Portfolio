import { useState } from 'react'
import { Field, Textarea, FormCard, SaveBtn, AddBtn, RemoveBtn } from '../components/AdminUI'

function ProjectCard({ proj, idx, onChange, onRemove }) {
  const set = (k, v) => onChange(idx, k, v)
  return (
    <div className="p-4 rounded-2xl flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between">
        <span style={{ color: '#c026d3', fontWeight: 700, fontSize: 13 }}>Project #{idx + 1}</span>
        <RemoveBtn onClick={onRemove} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Name" value={proj.name} onChange={v => set('name', v)} />
        <Field label="Subtitle" value={proj.subtitle} onChange={v => set('subtitle', v)} />
        <Field label="Icon" value={proj.icon} onChange={v => set('icon', v)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Color" value={proj.color} onChange={v => set('color', v)} />
        <Field label="GitHub URL" value={proj.github} onChange={v => set('github', v)} />
        <Field label="Live URL" value={proj.live} onChange={v => set('live', v)} />
        <Field label="Tech (comma separated)" value={(proj.tech || []).join(', ')}
          onChange={v => set('tech', v.split(',').map(s => s.trim()).filter(Boolean))} />
      </div>
      <Textarea label="Description" value={proj.desc} onChange={v => set('desc', v)} rows={3} />
      <Textarea label="Features (one per line)" value={(proj.features || []).join('\n')}
        onChange={v => set('features', v.split('\n').map(s => s.trim()).filter(Boolean))} rows={3} />
      <Textarea label="Challenge" value={proj.challenge} onChange={v => set('challenge', v)} rows={2} />
    </div>
  )
}

export default function ProjectsPage({ data, onSave }) {
  const [projects, setProjects] = useState(data.map(p => ({ ...p, features: [...p.features], tech: [...p.tech] })))

  const update = (i, k, v) => setProjects(ps => ps.map((p, idx) => idx === i ? { ...p, [k]: v } : p))
  const remove = i => setProjects(ps => ps.filter((_, idx) => idx !== i))
  const add = () => setProjects(ps => [...ps, {
    id: ps.length, name: '', subtitle: '', icon: '🚀', color: '#8b5cf6', size: 110,
    desc: '', features: [], tech: [], challenge: '', github: '#', live: '#',
  }])

  return (
    <div className="flex flex-col gap-6">
      <FormCard title="Projects Manager" icon="🚀">
        <div className="flex flex-col gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={i} proj={p} idx={i} onChange={update} onRemove={() => remove(i)} />
          ))}
        </div>
        <AddBtn onClick={add} label="Add Project" />
        <SaveBtn onClick={() => onSave('projects', projects)} />
      </FormCard>
    </div>
  )
}
