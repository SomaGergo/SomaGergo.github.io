'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(100,200,255,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(160,120,255,0.16),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40" />

      <motion.div
        className="absolute h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        animate={{ x: mousePosition.x - 144, y: mousePosition.y - 144 }}
        transition={{ type: 'spring', damping: 28, stiffness: 180 }}
      />
      <motion.div
        className="absolute h-48 w-48 rounded-full bg-accent/10 blur-2xl"
        animate={{ x: mousePosition.x - 96, y: mousePosition.y - 96 }}
        transition={{ type: 'spring', damping: 22, stiffness: 140 }}
      />

      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-primary backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Available for opportunities
          </div>

          <h1 className="text-5xl font-semibold leading-[0.95] text-foreground sm:text-6xl lg:text-8xl">
            <span className="block">AI Engineer</span>
            <span className="mt-2 block bg-gradient-to-r from-primary via-cyan-300 to-primary bg-clip-text text-transparent">
              & Data Scientist
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Building machine learning systems, data products, and AI workflows that turn complex information into clear business value.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View Services
            </motion.button>

            <motion.a
              href="mailto:agergosoma@gmail.com"
              className="rounded-full border border-border px-7 py-3.5 font-medium text-foreground transition-all hover:border-primary hover:text-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Email Me
            </motion.a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-4">
            {[
              {
                name: 'LinkedIn',
                path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
                link: 'https://www.linkedin.com/in/soma-gergo-a504b7289',
              },
              {
                name: 'Email',
                path: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
                link: 'mailto:agergosoma@gmail.com',
              },
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.link}
                target={social.name === 'LinkedIn' ? '_blank' : undefined}
                rel={social.name === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary hover:text-primary"
                whileHover={{ y: -4, scale: 1.05 }}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <div className="text-[11px] font-mono uppercase tracking-[0.35em] text-muted-foreground">Scroll</div>
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-primary/40 p-1.5">
          <motion.div
            className="h-2 w-1 rounded-full bg-primary"
            animate={{ y: [0, 8, 0], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}
