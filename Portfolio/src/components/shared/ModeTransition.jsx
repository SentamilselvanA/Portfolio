import { motion, AnimatePresence } from 'framer-motion'
import { useMode } from '../../context/ModeContext'

export default function ModeTransition() {
  const { transitioning } = useMode()
  return (
    <AnimatePresence>
      {transitioning && (
        <motion.div
          className="fixed inset-0 z-[99999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: 'radial-gradient(ellipse at center, rgba(192,38,211,0.18), rgba(10,10,20,0.92))' }}
        />
      )}
    </AnimatePresence>
  )
}
