import { motion, AnimatePresence } from 'framer-motion'
import { useMode } from '../../context/ModeContext'

export default function UiModeToggle() {
  const { portfolioMode, switchMode, transitioning } = useMode()
  const isPro = portfolioMode === 'professional'

  return (
    <motion.button
      onClick={() => switchMode(isPro ? 'universe' : 'professional')}
      disabled={transitioning}
      className="ui-mode-toggle"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      title={isPro ? 'Switch to Digital Universe' : 'Switch to Professional View'}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={portfolioMode}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5"
        >
          {isPro ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              Universe View
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
              Professional View
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
