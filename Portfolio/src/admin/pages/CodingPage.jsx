import { useState } from 'react'
import { Field, FormCard, SaveBtn, AddBtn, RemoveBtn } from '../components/AdminUI'

export default function CodingPage({ data, onSave }) {
  const [platforms, setPlatforms] = useState(data.platforms.map(p => ({
    ...p,
    stats: p.stats.map(s => ({ ...s })),
    bars: p.bars.map(b => [...b]),
  })))

  const updatePlatform = (pi, k, v) =>
    setPlatforms(ps => ps.map((p, idx) => idx === pi ? { ...p, [k]: v } : p))

  const updatePlatStat = (pi, si, k, v) =>
    setPlatforms(ps => ps.map((p, idx) => idx === pi
      ? { ...p, stats: p.stats.map((s, sidx) => sidx === si ? { ...s, [k]: v } : s) }
      : p))

  const updateBar = (pi, bi, col, v) =>
    setPlatforms(ps => ps.map((p, idx) => idx === pi
      ? { ...p, bars: p.bars.map((b, bidx) => bidx === bi ? (col === 0 ? [v, b[1]] : [b[0], Number(v)]) : b) }
      : p))

  const addBar = pi =>
    setPlatforms(ps => ps.map((p, idx) => idx === pi ? { ...p, bars: [...p.bars, ['New Topic', 70]] } : p))

  const removeBar = (pi, bi) =>
    setPlatforms(ps => ps.map((p, idx) => idx === pi ? { ...p, bars: p.bars.filter((_, bidx) => bidx !== bi) } : p))

  const handleSave = () => onSave('coding', { platforms })

  return (
    <div className="flex flex-col gap-6">
      <div className="p-3 rounded-xl text-xs font-mono" style={{ background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.12)', color: '#00f5ff' }}>
        💡 Quick stat badges (top cards) are automatically derived from each platform's Problems Solved value and SkillRack Rank below — no separate entry needed.
      </div>

      {platforms.map((p, pi) => (
        <FormCard key={pi} title={`${p.platform} Platform`} icon={p.icon}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <Field label="Platform Name" value={p.platform} onChange={v => updatePlatform(pi, 'platform', v)} />
            <Field label="Profile Link" value={p.link} onChange={v => updatePlatform(pi, 'link', v)} />
          </div>

          {/* SkillRack rank — canonical field for the rank quick badge */}
          {p.rank !== undefined && (
            <div className="mb-3">
              <Field
                label="SkillRack Rank (drives the Rank quick badge)"
                value={String(p.rank)}
                onChange={v => updatePlatform(pi, 'rank', Number(v))}
                type="number"
              />
            </div>
          )}

          {p.stats.length > 0 && (
            <div className="mb-3">
              <label className="admin-label mb-2 block">
                Stats
                {p.quickBadge && (
                  <span className="ml-2 text-xs" style={{ color: '#00f5ff' }}>
                    — stats[0].value also drives the "{p.quickBadge.label}" quick badge
                  </span>
                )}
              </label>
              {p.stats.map((s, si) => (
                <div key={si} className="grid grid-cols-3 gap-2 mb-2">
                  <Field label="Label" value={s.label} onChange={v => updatePlatStat(pi, si, 'label', v)} />
                  <Field label="Value" value={String(s.value)} onChange={v => updatePlatStat(pi, si, 'value', Number(v))} type="number" />
                  <Field label="Suffix" value={s.suffix || ''} onChange={v => updatePlatStat(pi, si, 'suffix', v)} />
                </div>
              ))}
            </div>
          )}

          {p.bars.length > 0 && (
            <div className="mb-3">
              <label className="admin-label mb-2 block">Skill Bars</label>
              {p.bars.map((b, bi) => (
                <div key={bi} className="flex gap-2 items-end mb-2">
                  <Field label="Topic" value={b[0]} onChange={v => updateBar(pi, bi, 0, v)} />
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="admin-label">{b[1]}%</label>
                    <input type="range" min={0} max={100} value={b[1]}
                      onChange={e => updateBar(pi, bi, 1, e.target.value)}
                      style={{ width: '100%', accentColor: '#c026d3' }} />
                  </div>
                  <RemoveBtn onClick={() => removeBar(pi, bi)} />
                </div>
              ))}
              <AddBtn onClick={() => addBar(pi)} label="Add Bar" />
            </div>
          )}

          <SaveBtn onClick={handleSave} />
        </FormCard>
      ))}
    </div>
  )
}
