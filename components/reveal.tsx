'use client'

import React from "react"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  fullWidth?: boolean
}

export function Reveal({ children, className = '', delay = 0, direction = 'up', fullWidth = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const directions = {
    up: { y: 100, x: 0 },
    down: { y: -100, x: 0 },
    left: { x: 100, y: 0 },
    right: { x: -100, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
      } : {
        opacity: 0,
        ...directions[direction],
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxText({ children, baseVelocity = 100 }: { children: React.ReactNode, baseVelocity?: number }) {
  const baseX = useMotionValue(0)
  const smoothX = useSpring(baseX, { damping: 50, stiffness: 400 })
  const x = useTransform(smoothX, (v) => `${v}%`)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    let animationFrame: number

    const animate = () => {
      if (!isHovered) {
        baseX.set(baseX.get() + (baseVelocity / 100))
        if (baseX.get() > 100 || baseX.get() < -100) {
          baseX.set(0)
        }
      }
      animationFrame = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationFrame)
  }, [baseVelocity, baseX, isHovered])

  return (
    <motion.div
      style={{ x }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  )
}
