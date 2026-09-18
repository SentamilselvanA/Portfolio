import { useState } from 'react'
import { Field, FormCard, SaveBtn, AddBtn, RemoveBtn } from '../components/AdminUI'

export default function CodingPage({ data, onSave }) {
  const [quick, setQuick] = useState(data.quick.map(q => ({ ...q })))
  const [platforms, setPlatforms] = useState(data.platforms.map(p => ({
    ...p,
    stats: p.stats.map(s => ({ ...s })),
    bars: p.bars.map(b => [...b]),
  })))

  const updateQuick = (i, k, v) => setQuick(qs => qs.map((q, idx) => idx === i ? { ...q, [k]: v } : q))

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

  return (
    <div className="flex flex-col gap-6">
      <FormCard title="Quick Stats (Hero Cards)" icon="📊">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quick.map((q, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Label" value={q.label} onChange={v => updateQuick(i, 'label', v)} />
                <Field label="Icon" value={q.icon} onChange={v => updateQuick(i, 'icon', v)} />
                <Field label="Value" value={String(q.value)} onChange={v => updateQuick(i, 'value', Number(v))} type="number" />
                <Field label="Color" value={q.color} onChange={v => updateQuick(i, 'color', v)} />
                <Field label="Prefix (e.g. #)" value={q.prefix || ''} onChange={v => updateQuick(i, 'prefix', v)} />
                <Field label="Suffix (e.g. +)" value={q.suffix || ''} onChange={v => updateQuick(i, 'suffix', v)} />
              </div>
            </div>
          ))}
        </div>
        <SaveBtn onClick={() => onSave('coding', { quick, platforms })} />
      </FormCard>

      {platforms.map((p, pi) => (
        <FormCard key={pi} title={`${p.platform} Platform`} icon={p.icon}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <Field label="Platform Name" value={p.platform} onChange={v => setPlatforms(ps => ps.map((pl, idx) => idx === pi ? { ...pl, platform: v } : pl))} />
            <Field label="Profile Link" value={p.link} onChange={v => setPlatforms(ps => ps.map((pl, idx) => idx === pi ? { ...pl, link: v } : pl))} />
          </div>

          {p.stats.length > 0 && (
            <div className="mb-3">
              <label className="admin-label mb-2 block">Stats</label>
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

          <SaveBtn onClick={() => onSave('coding', { quick, platforms })} />
        </FormCard>
      ))}
    </div>
  )
}
