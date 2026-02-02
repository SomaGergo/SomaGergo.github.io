'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete?: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)

  const stages = [
    'INITIALIZING NEURAL NETWORKS',
    'LOADING AI MODELS',
    'COMPILING DATA PIPELINES',
    'READY TO LAUNCH',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setLoading(false)
            onComplete?.()
          }, 600)
          return 100
        }
        const newProgress = prev + 1.2
        
        if (newProgress >= 25 && stage === 0) setStage(1)
        if (newProgress >= 60 && stage === 1) setStage(2)
        if (newProgress >= 95 && stage === 2) setStage(3)
        
        return newProgress
      })
    }, 25)

    return () => clearInterval(interval)
  }, [stage, onComplete])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
        >
          {/* Animated grid */}
          <motion.div 
            className="absolute inset-0 opacity-[0.03]"
            animate={{ 
              backgroundPosition: ['0px 0px', '50px 50px'],
            }}
            transition={{ 
              duration: 20, 
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear'
            }}
            style={{
              backgroundImage: 'linear-gradient(rgba(100, 200, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 200, 255, 0.5) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />

          {/* Radial gradient pulses */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(100, 200, 255, 0.1) 0%, transparent 70%)`,
                }}
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{ 
                  width: ['0px', '1200px', '2000px'],
                  height: ['0px', '1200px', '2000px'],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.8,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-16">
            {/* Central logo animation */}
            <div className="relative">
              <motion.div 
                className="relative w-32 h-32"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary/30 rounded-full"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: 'linear' },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
                  }}
                />
                
                {/* Middle hexagon */}
                <motion.div
                  className="absolute inset-4 border-2 border-primary/50"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                  animate={{ 
                    rotate: -360,
                    borderColor: ['rgba(100, 200, 255, 0.5)', 'rgba(100, 200, 255, 0.8)', 'rgba(100, 200, 255, 0.5)'],
                  }}
                  transition={{ 
                    rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: 'linear' },
                    borderColor: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                />
                
                {/* Inner core */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-8 h-8 bg-primary"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                    }}
                    animate={{ 
                      rotate: [0, 90, 180, 270, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                  />
                </div>

                {/* Orbiting particles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      marginTop: -4,
                      marginLeft: -4,
                    }}
                    animate={{
                      x: [0, 60 * Math.cos((i * 120 * Math.PI) / 180), 0],
                      y: [0, 60 * Math.sin((i * 120 * Math.PI) / 180), 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.3,
                      ease: 'linear',
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-primary/30 blur-3xl rounded-full"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>

            {/* Stage text */}
            <div className="h-10 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5 }}
                  className="text-sm md:text-base font-medium tracking-[0.3em] text-foreground/80"
                >
                  {stages[stage]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="w-[90vw] max-w-md space-y-4">
              <div className="relative h-1 bg-border/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary relative"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
              </div>
              
              <div className="flex justify-between items-center">
                <motion.span
                  key={Math.floor(progress)}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-mono text-primary tabular-nums"
                >
                  {Math.floor(progress).toString().padStart(3, '0')}%
                </motion.span>
                <motion.div
                  className="flex gap-1"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 bg-muted-foreground rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Data stream effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xs font-mono text-primary/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    y: [0, -100],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 3,
                  }}
                >
                  {Math.random() > 0.5 ? '01' : '10'}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
