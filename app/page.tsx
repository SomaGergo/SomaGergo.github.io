'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LoadingScreen } from '@/components/loading-screen'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Navigation } from '@/components/navigation'
import { CursorEffect } from '@/components/cursor-effect'
import { AnimatedBackground } from '@/components/animated-background'

export default function Page() {
  const [activeSection, setActiveSection] = useState('home')
  const [loadingComplete, setLoadingComplete] = useState(false)

  return (
    <>
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      <div className="min-h-screen bg-background overflow-x-hidden">
        {loadingComplete && (
          <>
            <CursorEffect />
            <AnimatedBackground />
          </>
        )}
        
        <Navigation 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          visible={loadingComplete}
        />
        
        <main className="relative z-10">
          <motion.section 
            id="home" 
            className="min-h-screen"
            initial={{ opacity: 0 }}
            animate={loadingComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Hero />
          </motion.section>
          
          <motion.section 
            id="projects" 
            className="min-h-screen py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <Projects />
          </motion.section>
          
          <motion.section 
            id="skills" 
            className="py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <Skills />
          </motion.section>
          
          <motion.section 
            id="about" 
            className="py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <About />
          </motion.section>
          
          <motion.section 
            id="contact" 
            className="min-h-screen py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <Contact />
          </motion.section>
        </main>
      </div>
    </>
  )
}
