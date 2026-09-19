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

// Derives coding.quick from platforms so there is ONE canonical value per stat.
// quick[0] = LeetCode  → platforms[0].stats[0].value
// quick[1] = CodeChef  → platforms[1].stats[0].value
// quick[2] = SkillRack → platforms[2].stats[0].value
// quick[3] = SkillRack Rank → platforms[2].rank
function deriveQuick(platforms) {
  const lc  = platforms.find(p => p.platform === 'LeetCode')
  const cc  = platforms.find(p => p.platform === 'CodeChef')
  const sr  = platforms.find(p => p.platform === 'SkillRack')

  return [
    lc && lc.quickBadge
      ? { ...lc.quickBadge, value: lc.stats[0]?.value ?? 0 }
      : null,
    cc && cc.quickBadge
      ? { ...cc.quickBadge, value: cc.stats[0]?.value ?? 0 }
      : null,
    sr && sr.quickBadge
      ? { ...sr.quickBadge, value: sr.stats[0]?.value ?? 0 }
      : null,
    sr
      ? { label: 'SkillRack Rank', icon: '📊', color: '#ec4899', prefix: '#', suffix: '', value: sr.rank ?? 0 }
      : null,
  ].filter(Boolean)
}

function merge(ov) {
  const rawCoding = ov.coding || D_CODING
  // Attach derived quick array — never stored, always computed
  const coding = {
    ...rawCoding,
    quick: deriveQuick(rawCoding.platforms),
  }
  return {
    personal:     ov.personal     || D_PERSONAL,
    social:       ov.social       || D_SOCIAL,
    roles:        ov.roles        || D_ROLES,
    milestones:   ov.milestones   || D_MILESTONES,
    skills:       ov.skills       || D_SKILLS,
    projects:     ov.projects     || D_PROJECTS,
    coding,
    achievements: ov.achievements || D_ACHIEVEMENTS,
    internship:   ov.internship   || D_INTERNSHIP,
  }
}

export function usePortfolioData() {
  const [data, setData] = useState(() => merge(readLive()))

  useEffect(() => {
    const refresh = () => setData(merge(readLive()))
    window.addEventListener('storage', refresh)
    window.addEventListener('portfolioDataUpdated', refresh)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener('portfolioDataUpdated', refresh)
    }
  }, [])

  return data
}
