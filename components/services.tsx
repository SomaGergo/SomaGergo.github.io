'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { Card } from '@/components/ui/card'

const services = [
  {
    title: 'AI Agents & Automation',
    description:
      'Designing practical AI agents and workflow automations that reduce repetitive work, support teams, and turn manual processes into faster systems.',
    deliverables: ['Internal AI assistants', 'Workflow automation', 'Prompt-driven business tools'],
  },
  {
    title: 'Data Analytics & Dashboards',
    description:
      'Building reporting systems, dashboards, and analytics workflows that turn raw campaign, product, or business data into clear decisions.',
    deliverables: ['Live dashboards', 'Automated reporting', 'KPI tracking and insights'],
  },
  {
    title: 'Model Training',
    description:
      'Training and evaluating machine learning models for prediction, classification, ranking, and decision support across real business datasets.',
    deliverables: ['Supervised ML models', 'Feature engineering', 'Model evaluation pipelines'],
  },
  {
    title: 'Deep Learning',
    description:
      'Developing deep learning solutions for more complex tasks such as image understanding, segmentation, sequence modeling, and advanced pattern recognition.',
    deliverables: ['Neural networks', 'Computer vision pipelines', 'Custom training workflows'],
  },
  {
    title: 'Natural Language Processing',
    description:
      'Creating NLP systems that can understand, classify, summarize, transcribe, or enrich text and speech data for products and operations.',
    deliverables: ['Text classification', 'Transcription pipelines', 'Language and sentiment analysis'],
  },
  {
    title: 'Applied AI Prototypes',
    description:
      'Turning early-stage ideas into strong prototypes that demonstrate feasibility, validate use cases, and help teams move from concept to build.',
    deliverables: ['Rapid prototyping', 'Proof-of-concept systems', 'Technical feasibility demos'],
  },
]

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.08, rootMargin: '-40px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="mx-auto max-w-7xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-12 space-y-4"
      >
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary">Services</p>
        <h2 className="text-4xl font-bold text-foreground md:text-6xl">
          What I Can <span className="text-primary">Build For You</span>
        </h2>
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
          If you are hiring for AI, data, or automation work, these are the areas where I can
          contribute most directly.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.08 }}
          >
            <Card className="group h-full border-border bg-card/80 p-7 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold leading-tight text-foreground">
                    {service.title}
                  </h3>
                  <ArrowRight className="mt-1 h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </div>

                <p className="text-sm leading-7 text-muted-foreground">{service.description}</p>

                <div className="space-y-2 border-t border-border/60 pt-4">
                  {service.deliverables.map((deliverable) => (
                    <div key={deliverable} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
