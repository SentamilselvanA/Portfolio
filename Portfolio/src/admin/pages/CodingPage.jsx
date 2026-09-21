import { useState, useEffect } from 'react'
import { Field, FormCard, SaveBtn, AddBtn, RemoveBtn } from '../components/AdminUI'

// Maps quick[i].label to the platform name whose stats[0].value it mirrors.
const QUICK_TO_PLATFORM = {
  'LeetCode':  'LeetCode',
  'CodeChef':  'CodeChef',
  'SkillRack': 'SkillRack',
}

// Given updated platforms, return a new quick array with values synced from
// the corresponding platform's stats[0].value. Non-mapped quick entries
// (e.g. 'SkillRack Rank') are left completely untouched.
function syncQuick(quick, platforms) {
  return quick.map(q => {
    const platformName = QUICK_TO_PLATFORM[q.label]
    if (!platformName) return q                          // e.g. SkillRack Rank — unchanged
    const platform = platforms.find(p => p.platform === platformName)
    if (!platform || !platform.stats.length) return q   // platform not found — unchanged
    return { ...q, value: platform.stats[0].value }
  })
}

export default function CodingPage({ data, onSave }) {
  const quick_    = Array.isArray(data.quick)     ? data.quick     : []
  const platforms_ = Array.isArray(data.platforms) ? data.platforms : []

  const [quick, setQuick] = useState(quick_.map(q => ({ ...q })))
  const [platforms, setPlatforms] = useState(platforms_.map(p => ({
    ...p,
    stats:      Array.isArray(p.stats)      ? p.stats.map(s => ({ ...s }))      : [],
    bars:       Array.isArray(p.bars)       ? p.bars.map(b => [...b])           : [],
    langBadges: Array.isArray(p.langBadges) ? p.langBadges.map(l => ({ ...l })) : undefined,
  })))

  useEffect(() => {
    const q_ = Array.isArray(data.quick)     ? data.quick     : []
    const p_ = Array.isArray(data.platforms) ? data.platforms : []
    setQuick(q_.map(q => ({ ...q })))
    setPlatforms(p_.map(p => ({
      ...p,
      stats:      Array.isArray(p.stats)      ? p.stats.map(s => ({ ...s }))      : [],
      bars:       Array.isArray(p.bars)       ? p.bars.map(b => [...b])           : [],
      langBadges: Array.isArray(p.langBadges) ? p.langBadges.map(l => ({ ...l })) : undefined,
    })))
  }, [data])

  const updateQuick = (i, k, v) =>
    setQuick(qs => qs.map((q, idx) => idx === i ? { ...q, [k]: v } : q))

  const updatePlatStat = (pi, si, k, v) =>
    setPlatforms(ps => ps.map((p, idx) => idx === pi
      ? { ...p, stats: p.stats.map((s, sidx) => sidx === si ? { ...s, [k]: v } : s) }
      : p))

  const updateBar = (pi, bi, col, v) =>
    setPlatforms(ps => ps.map((p, idx) => idx === pi
      ? { ...p, bars: p.bars.map((b, bidx) => bidx === bi ? (col === 0 ? [v, b[1]] : [b[0], Number(v)]) : b) }
      : p))

  const addStat = pi =>
    setPlatforms(ps => ps.map((p, idx) => idx === pi
      ? { ...p, stats: [...p.stats, { label: 'Problems Solved', value: 0, suffix: '+' }] }
      : p))

  const removeStat = (pi, si) =>
    setPlatforms(ps => ps.map((p, idx) => idx === pi
      ? { ...p, stats: p.stats.filter((_, sidx) => sidx !== si) }
      : p))

  const addBar = pi =>
    setPlatforms(ps => ps.map((p, idx) => idx === pi ? { ...p, bars: [...p.bars, ['New Topic', 70]] } : p))

  const removeBar = (pi, bi) =>
    setPlatforms(ps => ps.map((p, idx) => idx === pi ? { ...p, bars: p.bars.filter((_, bidx) => bidx !== bi) } : p))

  const updateBadge = (pi, li, k, v) =>
    setPlatforms(ps => ps.map((p, idx) => idx === pi
      ? { ...p, langBadges: p.langBadges.map((l, lidx) => lidx === li ? { ...l, [k]: v } : l) }
      : p))

  const addBadge = pi =>
    setPlatforms(ps => ps.map((p, idx) => idx === pi
      ? { ...p, langBadges: [...(Array.isArray(p.langBadges) ? p.langBadges : []), { lang: 'New', stars: 3, color: '#ffffff' }] }
      : p))

  const removeBadge = (pi, li) =>
    setPlatforms(ps => ps.map((p, idx) => idx === pi
      ? { ...p, langBadges: (p.langBadges || []).filter((_, lidx) => lidx !== li) }
      : p))

  const addPlatform = () =>
    setPlatforms(ps => [...ps, {
      platform: 'New Platform', icon: '🌐', color: '#ffffff',
      stats: [], bars: [], link: '#',
    }])

  const removePlatform = pi =>
    setPlatforms(ps => ps.filter((_, idx) => idx !== pi))

  const handleSave = () => {
    // Sync quick values from platform stats before saving — one canonical update
    const syncedQuick = syncQuick(quick, platforms)
    setQuick(syncedQuick)
    onSave('coding', { quick: syncedQuick, platforms })
  }

  return (
    <div className="flex flex-col gap-6">
      <FormCard title="Quick Stats (Top Badges)" icon="📊">
        <p className="text-xs font-mono mb-3" style={{ color: '#94a3b8' }}>
          LeetCode, CodeChef, and SkillRack values are automatically kept in sync with the platform stats below when you save. Only edit icon, color, label, or suffix here if needed.
        </p>
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
        <SaveBtn onClick={handleSave} />
      </FormCard>

      {platforms.map((p, pi) => (
        <FormCard key={pi} title={`${p.platform} Platform`} icon={p.icon}
          action={<button onClick={() => removePlatform(pi)}
            style={{ padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
              color: '#f87171', cursor: 'pointer' }}>Remove</button>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <Field label="Platform Name" value={p.platform} onChange={v => setPlatforms(ps => ps.map((pl, idx) => idx === pi ? { ...pl, platform: v } : pl))} />
            <Field label="Profile Link" value={p.link} onChange={v => setPlatforms(ps => ps.map((pl, idx) => idx === pi ? { ...pl, link: v } : pl))} />
          </div>

          <div className="mb-3">
              <label className="admin-label mb-2 block">Stats</label>
              {p.stats.map((s, si) => (
                <div key={si} className="flex gap-2 items-end mb-2">
                  <Field label="Label" value={s.label} onChange={v => updatePlatStat(pi, si, 'label', v)} />
                  <Field label="Value" value={String(s.value)} onChange={v => updatePlatStat(pi, si, 'value', Number(v))} type="number" />
                  <Field label="Suffix" value={s.suffix || ''} onChange={v => updatePlatStat(pi, si, 'suffix', v)} />
                  <RemoveBtn onClick={() => removeStat(pi, si)} />
                </div>
              ))}
              <AddBtn onClick={() => addStat(pi)} label="Add Stat" />
            </div>

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

          {p.platform === 'HackerRank' && (
            <div className="mb-3">
              <label className="admin-label mb-2 block">Language Badges</label>
              {(p.langBadges || []).map((l, li) => (
                <div key={li} className="flex gap-2 items-end mb-2">
                  <Field label="Language" value={l.lang} onChange={v => updateBadge(pi, li, 'lang', v)} />
                  <div className="flex flex-col gap-1" style={{ minWidth: 90 }}>
                    <label className="admin-label">Stars ({l.stars}/5)</label>
                    <input type="range" min={1} max={5} value={l.stars}
                      onChange={e => updateBadge(pi, li, 'stars', Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#fbbf24' }} />
                  </div>
                  <Field label="Color" value={l.color} onChange={v => updateBadge(pi, li, 'color', v)} />
                  <RemoveBtn onClick={() => removeBadge(pi, li)} />
                </div>
              ))}
              <AddBtn onClick={() => addBadge(pi)} label="Add Badge" />
            </div>
          )}

          <SaveBtn onClick={handleSave} />
        </FormCard>
      ))}
      <AddBtn onClick={addPlatform} label="Add Platform" />
    </div>
  )
}
