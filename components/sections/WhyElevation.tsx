'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Trophy, Target, BarChart2, TrendingUp } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { pillars } from '@/lib/data'
import { staggerContainer, fadeUp, scaleIn } from '@/components/motion/variants'

const iconMap: Record<string, React.ElementType> = {
  trophy: Trophy,
  target: Target,
  'bar-chart-2': BarChart2,
}

export default function WhyElevation() {
  const shouldReduceMotion = useReducedMotion()
  const containerVariants = shouldReduceMotion ? {} : staggerContainer
  const itemVariants = shouldReduceMotion ? {} : fadeUp
  const scaleVariants = shouldReduceMotion ? {} : scaleIn

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Column: Copy + Pillars */}
          <div>
            <SectionLabel>Why Elevation</SectionLabel>
            <motion.h2
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-4 font-display text-3xl text-navy md:text-4xl lg:text-5xl"
            >
              Results That Speak for Themselves
            </motion.h2>
            <motion.p
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-4 max-w-lg text-base leading-relaxed text-charcoal/70"
            >
              We don&apos;t just teach test content — we teach the test itself. Every strategy is battle-tested and personalized to your strengths.
            </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 space-y-8"
            >
              {pillars.map((pillar) => {
                const Icon = iconMap[pillar.icon] || Trophy
                return (
                  <motion.div
                    key={pillar.title}
                    variants={itemVariants}
                    className="flex gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <Icon size={20} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-navy">{pillar.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal/70">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Right Column: Visual Stat Card */}
          <motion.div
            variants={scaleVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative overflow-hidden rounded-2xl bg-navy p-8 shadow-2xl">
              {/* Decorative quote mark */}
              <span className="absolute -top-4 -right-4 font-display text-9xl text-gold/10">
                &ldquo;
              </span>

              <div className="relative z-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                  <TrendingUp size={24} className="text-gold" />
                </div>

                <p className="mb-6 text-lg italic leading-relaxed text-white/90">
                  &ldquo;I never thought I could break 1400. Elevation made it possible — and then some.&rdquo;
                </p>

                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-sm font-semibold text-gold">Maya K.</p>
                    <p className="text-xs text-white/50">Boston, MA</p>
                  </div>
                </div>

                {/* Big stat */}
                <div className="mt-8 rounded-xl bg-gold/10 p-6 text-center">
                  <p className="font-mono text-5xl font-bold text-gold md:text-6xl">
                    <AnimatedCounter target={200} duration={2} />
                  </p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-gold-warm">
                    Points Average SAT Gain
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 rounded-full border border-gold/20" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
