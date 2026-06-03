'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const projects = [
  {
    title: 'NLP Video Transcription Pipeline',
    description: 'Advanced NLP pipeline that transcribes video and detects emotions while translating to multiple languages.',
    details: 'Built an end-to-end system for speech-to-text, multi-language translation, and sentence-level emotion scoring to improve accessibility and content analytics.',
    technologies: ['Python', 'Whisper', 'Transformers', 'FFmpeg', 'spaCy'],
    metrics: { languages: '20+', accuracy: '92%', emotions: '7' },
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'NAC Breda Signing Predictor',
    description: 'Machine learning system predicting the best football player signings for NAC Breda using performance and market data.',
    details: 'Developed models that analyze player statistics, team fit, and market value to recommend optimal recruits for the next season.',
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'Matplotlib'],
    metrics: { features: '30+', models: '5', accuracy: '87%' },
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'Retail Demographics Classifier',
    description: 'Keras-based image classifier that profiles retail customer demographics to support store analytics.',
    details: 'Trained deep learning models on customer image data to infer age groups and demographics, helping retail teams understand shopper patterns.',
    technologies: ['Python', 'Keras', 'TensorFlow', 'OpenCV', 'Pandas'],
    metrics: { dataset: '10k+', accuracy: '89%', classes: '4' },
    gradient: 'from-emerald-500/20 to-lime-500/20',
  },
  {
    title: 'June20 Reporting Dashboard',
    description: 'Live dashboard and automated reporting system for campaign analytics at June20.',
    details: 'Designed dashboards and automation tools to reduce manual reporting effort and surface real-time campaign insights across social and programmatic advertising.',
    technologies: ['Python', 'Dash', 'Plotly', 'SQL', 'API'],
    metrics: { clients: '10+', reports: 'Realtime', automation: '80%' },
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    title: 'ANWB Accident Risk Model',
    description: 'Predictive machine learning model estimating road accident likelihood using environmental and traffic data.',
    details: 'Built accident probability models for ANWB using historical, weather, and roadway data to create actionable risk insights.',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'GeoPandas', 'Folium'],
    metrics: { factors: '25+', accuracy: '84%', coverage: 'NL' },
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    title: 'iOS AI Mobile App',
    description: 'In-progress native iOS app bringing AI features to mobile users with a polished, modern interface.',
    details: 'Currently building a SwiftUI app that integrates CoreML and mobile-first design to deliver AI-powered utilities on iOS.',
    technologies: ['SwiftUI', 'CoreML', 'Swift', 'iOS', 'Firebase'],
    metrics: { platform: 'iOS', status: 'In Progress', users: 'Early Beta' },
    gradient: 'from-sky-500/20 to-indigo-500/20',
  },
]

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative"
          >
            <Card className="h-full overflow-hidden border-border bg-card/95 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <div className="relative p-8 pt-10 space-y-5">
                <div className="absolute -top-4 left-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-cyan-200/20 blur-2xl" />
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
                      className="text-xs bg-secondary/50 text-secondary-foreground cursor-default"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/50">
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
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
