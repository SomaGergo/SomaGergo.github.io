'use client'

import { motion } from 'framer-motion'

import { Card } from '@/components/ui/card'
import { GOOGLE_CALENDAR_BOOKING_LINK } from '@/lib/site-config'

export function BookingCta() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="overflow-hidden border border-border/70 bg-card/80 p-8 shadow-xl shadow-primary/10 backdrop-blur-xl sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(100,200,255,0.12),transparent_35%)]" />
          <div className="relative z-10 mx-auto max-w-3xl space-y-6 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary">
              Discovery Call
            </p>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Let&apos;s discuss your project
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
              Book a free 30-minute discovery call to discuss your idea, workflow or data challenge.
            </p>
            <motion.a
              href={GOOGLE_CALENDAR_BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Book a discovery call
            </motion.a>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
