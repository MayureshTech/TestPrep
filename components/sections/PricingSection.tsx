'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import ServiceCard from '@/components/ui/ServiceCard'
import { services } from '@/lib/data'
import { staggerContainer, fadeUp } from '@/components/motion/variants'

export default function PricingSection() {
  const shouldReduceMotion = useReducedMotion()
  const containerVariants = shouldReduceMotion ? {} : staggerContainer
  const itemVariants = shouldReduceMotion ? {} : fadeUp

  return (
    <section id="pricing" className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <SectionLabel>Transparent Pricing</SectionLabel>
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 font-display text-3xl text-navy md:text-4xl lg:text-5xl"
          >
            No Hidden Fees. Just Results.
          </motion.h2>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 text-center text-sm text-charcoal/50"
        >
          All plans include a free initial consultation.
        </motion.p>
      </div>
    </section>
  )
}
