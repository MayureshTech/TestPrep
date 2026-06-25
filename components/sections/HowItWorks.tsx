'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Search, Map, TrendingUp } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { processSteps } from '@/lib/data'
import { staggerContainer, fadeUp } from '@/components/motion/variants'

const iconMap: Record<string, React.ElementType> = {
  search: Search,
  map: Map,
  'trending-up': TrendingUp,
}

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion()
  const containerVariants = shouldReduceMotion ? {} : staggerContainer
  const itemVariants = shouldReduceMotion ? {} : fadeUp

  return (
    <section id="process" className="bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <SectionLabel light>The Process</SectionLabel>
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 font-display text-3xl text-white md:text-4xl lg:text-5xl"
          >
            Three Steps to Your Target Score
          </motion.h2>
        </div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative grid gap-12 md:grid-cols-3 md:gap-8"
        >
          {/* Connecting line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-24 hidden md:block">
            <svg
              className="h-1 w-full"
              preserveAspectRatio="none"
              viewBox="0 0 1200 4"
            >
              <motion.line
                x1="16%"
                y1="2"
                x2="84%"
                y2="2"
                stroke="rgba(212, 160, 23, 0.3)"
                strokeWidth="2"
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
              />
            </svg>
          </div>

          {processSteps.map((step) => {
            const Icon = iconMap[step.icon] || Search
            return (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number */}
                <span className="mb-6 font-display text-7xl font-normal text-gold/20 md:text-8xl">
                  {step.step}
                </span>

                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
                  <Icon size={24} className="text-gold" />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>

                {/* Description */}
                <p className="max-w-xs text-sm leading-relaxed text-white/60">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
