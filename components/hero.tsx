'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
    }> = []

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.3
            ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
        
        const gradient = ctx.createRadialGradient(p1.x, p1.y, 0, p1.x, p1.y, p1.size * 2)
        gradient.addColorStop(0, `rgba(100, 200, 255, ${p1.alpha})`)
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p1.x, p1.y, p1.size * 2, 0, Math.PI * 2)
        ctx.fill()
        
        p1.x += p1.vx
        p1.y += p1.vy
        
        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1
      }
      
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
      
      {/* Floating data points */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xs font-mono text-primary/30"
            initial={{ 
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
            }}
            animate={{
              x: [
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
              ],
              y: [
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
              ],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          >
            {['01', '10', '11', 'AI', 'ML', 'π', 'Σ', '∫'][i % 8]}
          </motion.div>
        ))}
      </div>
      
      {/* Mouse follower glow - enhanced */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none z-10"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
        }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-accent/10 blur-2xl pointer-events-none z-10"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 150,
        }}
      />

      {/* Geometric shapes floating */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          >
            <div 
              className="w-3 h-3 border border-primary/20"
              style={{
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-20 text-center px-6 space-y-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-block"
          >
            <div className="text-xs md:text-sm text-primary font-mono tracking-widest flex items-center gap-3 justify-center px-4 py-2 bg-primary/5 border border-primary/20 rounded-full backdrop-blur-sm">
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-2 h-2 bg-primary rounded-full"
              />
              AVAILABLE FOR OPPORTUNITIES
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-[0.9] relative"
            style={{ perspective: '1000px' }}
          >
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 100, rotateX: -90 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <span className="relative inline-block">
                  {'AI Engineer'}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'linear',
                    }}
                    style={{ mixBlendMode: 'overlay' }}
                  />
                </span>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 100, rotateX: -90 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-primary relative"
              >
                <motion.span
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(100, 200, 255, 0.3)',
                      '0 0 40px rgba(100, 200, 255, 0.5)',
                      '0 0 20px rgba(100, 200, 255, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {'& Data Scientist'}
                </motion.span>
              </motion.div>
            </div>
          </motion.h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed font-light"
        >
          Specializing in machine learning pipelines, deep learning models, and production-grade AI systems that drive measurable business impact
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex items-center justify-center gap-4 pt-8 flex-wrap"
        >
          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
          
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-border text-foreground rounded-full font-medium hover:border-primary hover:text-primary transition-all backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex items-center justify-center gap-6 pt-12"
        >
          {[
            { name: 'LinkedIn', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', link: 'https://www.linkedin.com/in/soma-gergo-a504b7289' },
            { name: 'Email', path: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z', link: 'mailto:agergosoma@gmail.com' },
          ].map((social, i) => (
            <motion.a
              key={social.name}
              href={social.link}
              target={social.name === 'LinkedIn' ? '_blank' : undefined}
              rel={social.name === 'LinkedIn' ? 'noopener noreferrer' : undefined}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.1, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + i * 0.1 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.path}/>
              </svg>
            </motion.a>
          ))}
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          className="text-xs text-muted-foreground font-mono tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          SCROLL
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="relative"
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
