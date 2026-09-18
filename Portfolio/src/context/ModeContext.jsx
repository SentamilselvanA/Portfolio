import { createContext, useContext, useState, useEffect } from 'react'

const ModeContext = createContext(null)

export function ModeProvider({ children }) {
  const [portfolioMode, setPortfolioMode] = useState(() => {
    return localStorage.getItem('portfolioMode') || 'universe'
  })
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    localStorage.setItem('portfolioMode', portfolioMode)
  }, [portfolioMode])

  const switchMode = (newMode) => {
    if (newMode === portfolioMode || transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setPortfolioMode(newMode)
      setTimeout(() => setTransitioning(false), 350)
    }, 300)
  }

  return (
    <ModeContext.Provider value={{ portfolioMode, switchMode, transitioning }}>
      {children}
    </ModeContext.Provider>
  )
}

export const useMode = () => useContext(ModeContext)
