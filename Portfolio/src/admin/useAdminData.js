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
    return raw ? JSON.parse(raw) : null
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
    coding: JSON.parse(JSON.stringify(D_CODING)),
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
