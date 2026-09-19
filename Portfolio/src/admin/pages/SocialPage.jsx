import { useState, useEffect } from 'react'
import { Field, FormCard, SaveBtn, AddBtn, RemoveBtn } from '../components/AdminUI'

export default function SocialPage({ data, rolesData, onSave }) {
  const [links, setLinks] = useState(data.map(s => ({ ...s })))
  const [roles, setRoles] = useState([...rolesData])

  useEffect(() => { setLinks(data.map(s => ({ ...s }))) }, [data])
  useEffect(() => { setRoles([...rolesData]) }, [rolesData])

  const updateLink = (i, k, v) => setLinks(ls => ls.map((l, idx) => idx === i ? { ...l, [k]: v } : l))
  const removeLink = i => setLinks(ls => ls.filter((_, idx) => idx !== i))
  const addLink = () => setLinks(ls => [...ls, { icon: '🔗', label: '', href: '', color: '#ffffff' }])

  const updateRole = (i, v) => setRoles(rs => rs.map((r, idx) => idx === i ? v : r))
  const removeRole = i => setRoles(rs => rs.filter((_, idx) => idx !== i))
  const addRole = () => setRoles(rs => [...rs, ''])

  return (
    <div className="flex flex-col gap-6">
      <FormCard title="Social & Profile Links" icon="🔗">
        <div className="flex flex-col gap-3">
          {links.map((l, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <Field label="Icon" value={l.icon} onChange={v => updateLink(i, 'icon', v)} />
              <Field label="Label" value={l.label} onChange={v => updateLink(i, 'label', v)} />
              <Field label="URL" value={l.href} onChange={v => updateLink(i, 'href', v)} />
              <div className="flex items-end gap-2">
                <Field label="Color" value={l.color} onChange={v => updateLink(i, 'color', v)} />
                <RemoveBtn onClick={() => removeLink(i)} />
              </div>
            </div>
          ))}
        </div>
        <AddBtn onClick={addLink} label="Add Link" />
        <SaveBtn onClick={() => onSave('social', links)} />
      </FormCard>

      <FormCard title="Rotating Roles (Hero)" icon="🔄">
        <div className="flex flex-col gap-2">
          {roles.map((r, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Field label="" value={r} onChange={v => updateRole(i, v)} />
              <RemoveBtn onClick={() => removeRole(i)} />
            </div>
          ))}
        </div>
        <AddBtn onClick={addRole} label="Add Role" />
        <SaveBtn onClick={() => onSave('roles', roles)} />
      </FormCard>
    </div>
  )
}
