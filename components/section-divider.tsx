'use client'

import { motion } from 'framer-motion'

export function SectionDivider() {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
      {/* Center line with pulse */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />
      
      {/* Moving dots */}
      <div className="absolute left-0 right-0 flex justify-center gap-8">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      {/* Diamond shape */}
      <motion.div
        className="absolute w-4 h-4 bg-primary/20 border-2 border-primary"
        style={{ transform: 'rotate(45deg)' }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [45, 90, 45],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />
      
      {/* Side waves */}
      {['left', 'right'].map((side) => (
        <motion.div
          key={side}
          className={`absolute ${side}-0 w-32 h-px bg-gradient-to-${side === 'left' ? 'r' : 'l'} from-primary/50 to-transparent`}
          animate={{
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
