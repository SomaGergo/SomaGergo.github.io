'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.2, rootMargin: '-30px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const contactInfo = [
    {
      label: 'Email',
      value: 'agergosoma@gmail.com',
      link: 'mailto:agergosoma@gmail.com',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/soma-gergo',
      link: 'https://www.linkedin.com/in/soma-gergo-a504b7289',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ]

  return (
    <div ref={containerRef} className="mx-auto max-w-7xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl"
      >
        <Card className="overflow-hidden border border-border/70 bg-card/80 p-8 shadow-xl shadow-primary/10 backdrop-blur-xl sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(100,200,255,0.12),transparent_35%)]" />
          <div className="relative z-10 space-y-6 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary">Contact</p>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Email me at</h2>
            <a
              href="mailto:agergosoma@gmail.com"
              className="inline-flex text-xl font-medium text-primary transition-colors hover:text-primary/80 sm:text-2xl"
            >
              agergosoma@gmail.com
            </a>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
              Open to thoughtful projects, collaborations, and AI work with real impact.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.link}
                  target={info.label === 'LinkedIn' ? '_blank' : undefined}
                  rel={info.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm text-foreground transition-all hover:border-primary hover:text-primary"
                >
                  {info.icon}
                  <span>{info.label}</span>
                </a>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
