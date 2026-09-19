import { useState, useEffect } from 'react'
import {
  PERSONAL as D_PERSONAL, SOCIAL_LINKS as D_SOCIAL, ROLES as D_ROLES,
  MILESTONES as D_MILESTONES, SKILLS as D_SKILLS, PROJECTS as D_PROJECTS,
  CODING_STATS as D_CODING, ACHIEVEMENTS as D_ACHIEVEMENTS, INTERNSHIP as D_INTERNSHIP,
} from '../data/portfolioData'

const KEY = 'adminPortfolioData'

function readLive() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function merge(ov) {
  return {
    personal:     ov.personal     || D_PERSONAL,
    social:       ov.social       || D_SOCIAL,
    roles:        ov.roles        || D_ROLES,
    milestones:   ov.milestones   || D_MILESTONES,
    skills:       ov.skills       || D_SKILLS,
    projects:     ov.projects     || D_PROJECTS,
    coding:       ov.coding       || D_CODING,
    achievements: ov.achievements || D_ACHIEVEMENTS,
    internship:   ov.internship   || D_INTERNSHIP,
  }
}

export function usePortfolioData() {
  const [data, setData] = useState(() => merge(readLive()))

  useEffect(() => {
    const refresh = () => setData(merge(readLive()))
    // fires when another tab writes localStorage
    window.addEventListener('storage', refresh)
    // fires when admin saves in the same tab
    window.addEventListener('portfolioDataUpdated', refresh)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener('portfolioDataUpdated', refresh)
    }
  }, [])

  return data
}
