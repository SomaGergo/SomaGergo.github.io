'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const projects = [
  {
    title: 'NLP Video Transcription Pipeline',
    description: 'Advanced NLP pipeline that transcribes video input and translates to any language while predicting emotions per sentence.',
    details: 'Built end-to-end pipeline for video processing, speech-to-text transcription, multi-language translation, and emotion detection per sentence. Integrated multiple NLP models for accurate sentiment and emotion analysis across different languages.',
    technologies: ['Python', 'Whisper', 'Transformers', 'FFmpeg', 'spaCy'],
    metrics: { languages: '20+', accuracy: '92%', emotions: '7 types' },
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'NAC Breda Player Signing Predictor',
    description: 'ML-powered system predicting optimal football player signings for NAC Breda using 30+ performance features.',
    details: 'Developed comprehensive ML model analyzing player statistics, performance metrics, team fit, and market value. Built predictive models using various algorithms to identify best signing opportunities for the next season.',
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'Matplotlib'],
    metrics: { features: '30+', models: '5 types', accuracy: '87%' },
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'ANWB Road Accident Prediction',
    description: 'Predictive ML system for ANWB analyzing road accident likelihood based on multiple risk factors.',
    details: 'Created machine learning models to predict accident probability using historical data, weather conditions, road characteristics, and traffic patterns. Developed risk assessment tool for insurance premium optimization.',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'GeoPandas', 'Folium'],
    metrics: { accuracy: '84%', factors: '25+', coverage: 'Netherlands' },
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    title: 'June20 Automated Reporting Dashboard',
    description: 'Live automated reporting and dashboard tool for marketing agency June20, streamlining campaign analytics.',
    details: 'Designed and implemented real-time dashboard system for marketing campaign tracking and automated report generation. Integrated multiple data sources and created interactive visualizations for client presentations.',
    technologies: ['Python', 'Dash', 'Plotly', 'SQL', 'API Integration'],
    metrics: { clients: '10+', reports: 'Real-time', automation: '80%' },
    gradient: 'from-orange-500/20 to-red-500/20',
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
    <div ref={containerRef} className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed">
            {'AI/ML solutions delivering measurable impact across computer vision, NLP, and predictive analytics'}
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-6 px-6 md:px-12"
            style={{ width: 'max-content' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100, rotateY: -15 }}
                animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 100, rotateY: -15 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.05, y: -15, rotateY: 5 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="w-[400px] md:w-[500px]"
                style={{ perspective: 1200 }}
              >
                <Card className="h-full group relative overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                  {/* Ripple effect on hover */}
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 3, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      style={{
                        background: 'radial-gradient(circle, rgba(100, 200, 255, 0.3) 0%, transparent 70%)',
                      }}
                    />
                  )}
                  
                  {/* Background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100`}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    animate={hoveredIndex === index ? {
                      boxShadow: [
                        '0 0 0 0 rgba(100, 200, 255, 0.4)',
                        '0 0 0 8px rgba(100, 200, 255, 0)',
                        '0 0 0 0 rgba(100, 200, 255, 0.4)',
                      ],
                    } : {}}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                  
                  {/* Hover overlay with details */}
                  <motion.div
                    className="absolute inset-0 bg-background/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 p-8 flex flex-col justify-center"
                    initial={{ opacity: 0 }}
                  >
                    <div className="space-y-4">
                      <motion.h4
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        className="text-xl font-semibold text-primary"
                      >
                        Project Details
                      </motion.h4>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm text-muted-foreground leading-relaxed"
                      >
                        {project.details}
                      </motion.p>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-3 gap-3 pt-4"
                      >
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
                            <div className="text-lg font-bold text-primary">{value}</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">{key}</div>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <div className="relative p-8 space-y-6">
                    <motion.h3
                      className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors leading-tight"
                      whileHover={{ x: 5 }}
                    >
                      {project.title}
                    </motion.h3>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          initial={{ scale: 0 }}
                          animate={inView ? { scale: 1 } : {}}
                          transition={{ delay: (index * 0.1) + (techIndex * 0.05) }}
                        >
                          <Badge
                            variant="secondary"
                            className="text-xs bg-secondary/50 text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                      {Object.entries(project.metrics).map(([key, value], i) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 20 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: (index * 0.1) + 0.3 + (i * 0.1) }}
                          className="text-center"
                        >
                          <div className="text-lg font-bold text-primary">{value}</div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wide">{key}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-2 mt-6"
        >
          {projects.map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/30"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.05 }}
              whileHover={{ scale: 1.5, backgroundColor: 'rgba(100, 200, 255, 1)' }}
            />
          ))}
        </motion.div>
      </div>


    </div>
  )
}
