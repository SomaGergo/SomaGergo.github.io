'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, BrainCircuit, ChartColumnBig, Sparkles } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { useIsMobile } from '@/hooks/use-mobile'
import { GOOGLE_CALENDAR_BOOKING_LINK } from '@/lib/site-config'

const serviceCards = [
  {
    title: 'AI Agents & Intelligent Automation',
    description:
      'Intelligent assistants and automated workflows connected to your business tools.',
    icon: Bot,
  },
  {
    title: 'Custom Machine Learning',
    description:
      'Custom predictive, computer vision and NLP models built around your data.',
    icon: BrainCircuit,
  },
  {
    title: 'Data Engineering & Analytics',
    description:
      'Automated pipelines, dashboards and reliable analytics infrastructure.',
    icon: ChartColumnBig,
  },
  {
    title: 'AI Products & Prototypes',
    description:
      'From early concept to functional prototype and production integration.',
    icon: Sparkles,
  },
]

const detailedServices = [
  {
    title: 'AI Agents & Intelligent Automation',
    description:
      'Build AI-powered systems that can understand information, interact with business tools and carry out multi-step tasks. These solutions can support employees, customers and internal operations while reducing repetitive manual work.',
    examples: [
      'Internal knowledge assistants',
      'Customer support agents',
      'Document search and question-answering systems',
      'Automated research and reporting workflows',
      'Email and CRM automation',
      'Retrieval-Augmented Generation systems',
      'API and third-party tool integrations',
    ],
    bestFor:
      'Businesses that want to reduce manual work, improve access to information or automate recurring knowledge-based processes.',
  },
  {
    title: 'Custom Machine Learning',
    description:
      'Develop machine learning models tailored to your data, business objectives and operational environment. This can include the full process from data preparation and experimentation to evaluation, deployment and ongoing improvement.',
    examples: [
      'Predictive modelling and forecasting',
      'Classification systems',
      'Recommendation systems',
      'Computer vision and image analysis',
      'Natural language processing',
      'Anomaly and fraud detection',
      'Model evaluation and optimization',
    ],
    bestFor:
      'Businesses with historical or domain-specific data that want to predict outcomes, identify patterns or automate complex decisions.',
  },
  {
    title: 'Data Engineering & Analytics',
    description:
      'Transform disconnected, manual or unreliable data into structured systems that are ready for reporting, analysis and machine learning. Build data flows that update automatically and give teams access to reliable business information.',
    examples: [
      'Automated data pipelines',
      'API-based data collection',
      'Data cleaning and transformation',
      'Cloud databases and data warehouses',
      'Business and marketing dashboards',
      'KPI monitoring',
      'Automated anomaly alerts',
    ],
    bestFor:
      'Teams that rely on spreadsheets, manual exports or disconnected platforms and need a reliable source of truth.',
  },
  {
    title: 'AI Products & Prototypes',
    description:
      'Turn an AI or data idea into a functional prototype, internal tool or production-ready application. I can help assess feasibility, design the technical approach and build the solution from the first concept to a working product.',
    examples: [
      'AI-powered web applications',
      'Proofs of concept',
      'MVP development',
      'Backend APIs',
      'Model integration',
      'Internal business tools',
      'AI features for existing products',
    ],
    bestFor:
      'Startups and businesses that want to validate, demonstrate or launch an AI-powered product or feature.',
  },
]

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '-40px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isMobile])

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
          What I Can <span className="text-primary">Help You Build</span>
        </h2>
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
          AI, machine learning and data services designed to solve real business problems with the
          right level of technical depth and practical execution.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {serviceCards.map((service, index) => {
          const Icon = service.icon

          return (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.08 }}
          >
            <Card className="group h-full border-border bg-card/80 p-7 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold leading-tight text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm leading-7 text-muted-foreground">{service.description}</p>
              </div>
            </Card>
          </motion.div>
        )})}
      </div>

      <div className="mt-24 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-3xl font-semibold text-foreground md:text-5xl">
            AI and data solutions tailored to your business
          </h3>
          <p className="max-w-4xl text-lg leading-relaxed text-muted-foreground">
            I help businesses design and build practical AI, machine learning and data solutions.
            Whether you need an intelligent agent, a custom predictive model, a reliable data
            pipeline or a functional AI product, the solution is designed around your specific
            problem, data and goals.
          </p>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-2">
          {detailedServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.24 + index * 0.08 }}
            >
              <Card className="h-full border-border bg-card/75 p-8 shadow-lg shadow-primary/5">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-2xl font-semibold text-foreground">{service.title}</h4>
                    <p className="text-base leading-7 text-muted-foreground">{service.description}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
                      Examples
                    </p>
                    <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                      {service.examples.map((example) => (
                        <li key={example} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                    <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
                      Best for
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {service.bestFor}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Card className="border-border bg-card/80 p-8 shadow-lg shadow-primary/5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-3">
                <h3 className="text-3xl font-semibold text-foreground">
                  Not sure what solution you need?
                </h3>
                <p className="text-base leading-7 text-muted-foreground">
                  You do not need to arrive with a complete technical specification. Tell me about
                  the problem, the current process and the result you want to achieve. I will help
                  identify what can realistically be built and propose the most suitable approach.
                </p>
              </div>
              <motion.a
                href={GOOGLE_CALENDAR_BOOKING_LINK}
                className="inline-flex rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Discuss your project
              </motion.a>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
