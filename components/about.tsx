'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { useIsMobile } from '@/hooks/use-mobile'

const timeline = [
  {
    year: '2023 - July 2026',
    title: 'BSc in Data Science & AI',
    company: 'Breda University of Applied Sciences',
    description: 'Graduated with a Bachelor of Science in Data Science and Artificial Intelligence, building a strong foundation in machine learning, statistical analysis, and data visualization.',
    achievements: ['BSc diploma earned in July 2026', '10+ applied projects', 'Practical experience in machine learning and visualization'],
  },
  {
    year: 'August 2024 - January 2026',
    title: 'Digital Data Architect & AI Developer',
    company: 'Marketing Agency',
    description: 'Built and maintained data pipelines and live dashboards for social and programmatic campaigns, while developing AI automation solutions for the media team.',
    achievements: ['Automated campaign reporting', 'AI-driven personalization for outreach', 'Operational AI agents for internal workflows'],
  },
]

const certifications = [
  {
    icon: '🌟',
    name: 'Certified AI Practitioner',
    issuer: 'Coursera',
  },
  {
    icon: '🌟',
    name: 'Machine Learning Engineer',
    issuer: 'edX',
  },
]

export function About() {
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
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isMobile])

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="space-y-4 mb-16 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-foreground">
          About <span className="text-primary">Me</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
          {'Passionate about leveraging AI to solve real-world problems and pushing the boundaries of what\'s possible with machine learning'}
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="p-8 border-border bg-card/50 backdrop-blur">
            <h3 className="text-2xl font-semibold text-foreground mb-6">My Story</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {"I graduated from Breda University of Applied Sciences with a BSc in Data Science and Artificial Intelligence in July 2026. I have completed over 10 applied projects across machine learning, analytics, and AI systems."}
              </p>
              <p>
                {"During my internship at a marketing agency in Antwerp, I built live campaign dashboards, automated reporting systems, and AI agents that improved media team workflows and engagement personalization."}
              </p>
              <p>
                {"I enjoy turning complex data into clear business value and building intelligent systems that support teams with actionable insights."}
              </p>
            </div>


          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-8">Experience Timeline</h3>
          <div className="relative">
            <motion.div
              className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-primary/30"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              style={{ transformOrigin: 'top' }}
            />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="relative pl-8"
                >
                  <motion.div
                    className="absolute left-0 top-1 w-4 h-4 rounded-full bg-primary border-4 border-background"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.5 }}
                  />
                  
                  <Card className="p-6 border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <motion.div
                          className="text-xs font-mono text-primary mb-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          {item.year}
                        </motion.div>
                        <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{item.company}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="space-y-1">
                      {item.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.6 + index * 0.1 + i * 0.05 }}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {achievement}
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <Card className="inline-block p-8 border-border bg-card/50 backdrop-blur">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {"Let's build something amazing together"}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl">
            {"I'm always interested in hearing about new projects and opportunities in AI/ML"}
          </p>
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.button>
        </Card>
      </motion.div>
    </div>
  )
}
