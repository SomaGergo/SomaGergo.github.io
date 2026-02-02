'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

const skillCategories = [
  {
    title: 'Machine Learning',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    skills: ['Scikit-learn', 'XGBoost', 'Random Forest', 'SVM', 'Ensemble Methods', 'Feature Engineering'],
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Deep Learning',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    skills: ['PyTorch', 'TensorFlow', 'Keras', 'CNN', 'RNN/LSTM', 'GANs', 'Transformers'],
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'NLP & LLMs',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    skills: ['BERT', 'GPT', 'T5', 'Hugging Face', 'spaCy', 'NLTK', 'LangChain'],
    color: 'from-green-500/20 to-teal-500/20',
  },
  {
    title: 'Computer Vision',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    skills: ['OpenCV', 'YOLO', 'ResNet', 'Mask R-CNN', 'Object Detection', 'Segmentation'],
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    title: 'Data Engineering',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    skills: ['Apache Spark', 'Airflow', 'Kafka', 'Pandas', 'NumPy', 'SQL', 'ETL Pipelines'],
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'MLOps & Deployment',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    skills: ['MLflow', 'Kubeflow', 'Docker', 'Kubernetes', 'FastAPI', 'AWS SageMaker'],
    color: 'from-yellow-500/20 to-orange-500/20',
  },
]

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: '-80px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="space-y-4 mb-16 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-foreground">
          Technical <span className="text-primary">Expertise</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
          {'Specialized in AI/ML technologies with hands-on experience across the entire data science lifecycle'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 80, rotateX: -20, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : { opacity: 0, y: 80, rotateX: -20, scale: 0.9 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.08, rotateY: 8, z: 50 }}
            style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
          >
            <Card className="group relative overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-500 h-full hover:shadow-2xl hover:shadow-primary/20">
              {/* Particle effects */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/60 rounded-full"
                    initial={{
                      x: '50%',
                      y: '50%',
                    }}
                    animate={{
                      x: `${50 + (Math.cos((i * 30 * Math.PI) / 180) * 50)}%`,
                      y: `${50 + (Math.sin((i * 30 * Math.PI) / 180) * 50)}%`,
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
              
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100`}
                transition={{ duration: 0.5 }}
              />
              
              <div className="relative p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="p-3 rounded-xl bg-primary/10 text-primary"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ scale: 0, opacity: 0, rotateX: -90 }}
                      animate={inView ? { scale: 1, opacity: 1, rotateX: 0 } : { scale: 0, opacity: 0, rotateX: -90 }}
                      transition={{ 
                        delay: (index * 0.1) + (skillIndex * 0.06),
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ 
                        scale: 1.15, 
                        backgroundColor: 'rgba(100, 200, 255, 0.2)',
                        y: -3,
                        boxShadow: '0 8px 16px rgba(100, 200, 255, 0.3)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 text-sm rounded-md bg-secondary/50 text-secondary-foreground hover:text-primary transition-all duration-300 cursor-default relative overflow-hidden"
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '200%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">{skill}</span>
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.div
                className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:scale-150"
                transition={{ duration: 0.7 }}
              />
              
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-8 px-8 py-6 bg-card/50 border border-border rounded-xl">
          {[
            { label: 'Years Experience', value: '5+' },
            { label: 'Projects Completed', value: '50+' },
            { label: 'Research Papers', value: '3' },
            { label: 'Kaggle Rank', value: 'Expert' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + i * 0.1 }}
              className="text-center"
            >
              <motion.div
                className="text-3xl font-bold text-primary mb-1"
                whileHover={{ scale: 1.2 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
