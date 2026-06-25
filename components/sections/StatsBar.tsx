'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { stats } from '@/lib/data'
import { staggerContainer, fadeUp } from '@/components/motion/variants'

export default function StatsBar() {
  const shouldReduceMotion = useReducedMotion()
  const containerVariants = shouldReduceMotion ? {} : staggerContainer
  const itemVariants = shouldReduceMotion ? {} : fadeUp

  return (
    <section className="bg-gold py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-0"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={`flex flex-1 flex-col items-center px-6 text-center ${
                index !== stats.length - 1
                  ? 'md:border-r md:border-navy/20'
                  : ''
              }`}
            >
              <div className="flex items-center gap-1">
                <span className="font-mono text-5xl font-bold text-navy md:text-6xl lg:text-7xl">
                  {stat.label === 'Top 1% Tutors' ? (
                    <>
                      <AnimatedCounter target={1} duration={1.5} />
                      <span className="text-4xl md:text-5xl lg:text-6xl">%</span>
                    </>
                  ) : (
                    <AnimatedCounter target={stat.value} duration={2} />
                  )}
                </span>
                {stat.label !== 'Top 1% Tutors' && (
                  <ArrowUp size={32} className="text-navy/60" strokeWidth={3} />
                )}
              </div>
              <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-navy/80">
                {stat.label}
              </p>
              <p className="text-xs font-medium uppercase tracking-wide text-navy/50">
                {stat.unit}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
