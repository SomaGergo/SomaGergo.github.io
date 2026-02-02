'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
  visible: boolean
}

export function Navigation({ activeSection, setActiveSection, visible }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const sections = ['home', 'projects', 'skills', 'about', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setActiveSection])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const navItems = [
    { id: 'home', label: 'Home', index: '01' },
    { id: 'projects', label: 'Projects', index: '02' },
    { id: 'skills', label: 'Skills', index: '03' },
    { id: 'about', label: 'About', index: '04' },
    { id: 'contact', label: 'Contact', index: '05' },
  ]

  if (!visible) return null

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled 
            ? 'bg-background/60 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5' 
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection('home')}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border-2 border-primary relative">
                  <motion.div
                    className="absolute inset-1 bg-primary"
                    animate={{ 
                      clipPath: [
                        'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                        'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                        'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
                <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  AI.DS
                </span>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-card/30 backdrop-blur-sm rounded-full px-2 py-2 border border-border/50">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors rounded-full',
                    activeSection === item.id 
                      ? 'text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-xs opacity-50">{item.index}</span>
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="hidden md:block px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden w-10 h-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={mobileMenuOpen ? 'open' : 'closed'}
                className="flex flex-col gap-1.5"
              >
                <motion.span
                  className="w-5 h-0.5 bg-current"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 },
                  }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-current"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-current"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 },
                  }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l border-border p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-6 mt-20">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      'flex items-center gap-4 text-left group',
                      activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <span className="text-xs font-mono opacity-50">{item.index}</span>
                    <span className="text-2xl font-semibold group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
                
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium"
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
