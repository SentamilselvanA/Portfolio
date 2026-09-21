import { useState, useCallback } from 'react'
import {
  PERSONAL as D_PERSONAL,
  SOCIAL_LINKS as D_SOCIAL,
  ROLES as D_ROLES,
  MILESTONES as D_MILESTONES,
  SKILLS as D_SKILLS,
  PROJECTS as D_PROJECTS,
  CODING_STATS as D_CODING,
  ACHIEVEMENTS as D_ACHIEVEMENTS,
  INTERNSHIP as D_INTERNSHIP,
} from '../data/portfolioData'

const KEY = 'adminPortfolioData'

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Repair coding shape if it was saved before quick/platforms were nested
    if (parsed && parsed.coding) {
      const c = parsed.coding
      if (!Array.isArray(c.quick))     c.quick     = D_CODING.quick.map(q => ({ ...q }))
      if (!Array.isArray(c.platforms)) c.platforms = D_CODING.platforms.map(p => ({
        ...p,
        stats: (p.stats || []).map(s => ({ ...s })),
        bars:  (p.bars  || []).map(b => [...b]),
        ...(Array.isArray(p.langBadges) ? { langBadges: p.langBadges.map(l => ({ ...l })) } : {}),
      }))
      // Repair langBadges on each platform from defaults if missing
      c.platforms.forEach(p => {
        if (!Array.isArray(p.langBadges)) {
          const def = D_CODING.platforms.find(d => d.platform === p.platform)
          if (def && Array.isArray(def.langBadges))
            p.langBadges = def.langBadges.map(l => ({ ...l }))
        }
      })
    }
    return parsed
  } catch { return null }
}

function defaults() {
  return {
    personal: { ...D_PERSONAL },
    social: D_SOCIAL.map(s => ({ ...s })),
    roles: [...D_ROLES],
    milestones: D_MILESTONES.map(m => ({ ...m })),
    skills: JSON.parse(JSON.stringify(D_SKILLS)),
    projects: D_PROJECTS.map(p => ({ ...p, features: [...p.features], tech: [...p.tech] })),
    coding: {
      quick: (Array.isArray(D_CODING.quick) ? D_CODING.quick : []).map(q => ({ ...q })),
      platforms: (Array.isArray(D_CODING.platforms) ? D_CODING.platforms : []).map(p => ({
        ...p,
        stats: (Array.isArray(p.stats) ? p.stats : []).map(s => ({ ...s })),
        bars:  (Array.isArray(p.bars)  ? p.bars  : []).map(b => [...b]),
        ...(Array.isArray(p.langBadges) ? { langBadges: p.langBadges.map(l => ({ ...l })) } : {}),
      })),
    },
    achievements: D_ACHIEVEMENTS.map(a => ({ ...a })),
    internship: {
      ...D_INTERNSHIP,
      learningAreas: D_INTERNSHIP.learningAreas.map(l => ({ ...l })),
    },
  }
}

export function useAdminData() {
  const [data, setData] = useState(() => load() || defaults())

  const save = useCallback((section, value) => {
    setData(prev => {
      const next = { ...prev, [section]: value }
      localStorage.setItem(KEY, JSON.stringify(next))
      window.dispatchEvent(new Event('portfolioDataUpdated'))
      return next
    })
  }, [])

  const reset = useCallback(() => {
    const d = defaults()
    localStorage.setItem(KEY, JSON.stringify(d))
    window.dispatchEvent(new Event('portfolioDataUpdated'))
    setData(d)
  }, [])

  return { data, save, reset }
}

// Called by portfolioData consumers to get live data
export function getAdminData() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}
