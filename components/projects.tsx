'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { projects } from '@/lib/projects'

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="space-y-4 mb-12"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-foreground">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed">
          AI and mobile solutions built to deliver real business value through smart automation, analytics, and data-driven insights.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="relative"
          >
            <Card className="h-full overflow-hidden border-border bg-card/95 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <div className="relative p-8 pt-10 space-y-5">
                <div className="absolute -top-4 left-6 h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-cyan-200/20 blur-2xl" />
                <h3 className="text-2xl font-semibold text-foreground leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="cursor-default bg-secondary/50 text-xs text-secondary-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 border-t border-border/50 pt-4">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="rounded-2xl bg-background/70 p-3 text-center">
                      <div className="text-lg font-bold text-primary">{value}</div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{key}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-sm text-muted-foreground">
                  {project.details}
                </div>

                {project.contentFile ? (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    Read project write-up
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <div className="text-sm text-muted-foreground/70">
                    Full case study coming soon
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
