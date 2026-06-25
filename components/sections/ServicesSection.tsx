'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import ServiceCard from '@/components/ui/ServiceCard'
import { services } from '@/lib/data'
import { staggerContainer, fadeUp } from '@/components/motion/variants'

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion()
  const containerVariants = shouldReduceMotion ? {} : staggerContainer
  const itemVariants = shouldReduceMotion ? {} : fadeUp

  const featuredService = services.find((s) => s.featured)
  const otherServices = services.filter((s) => !s.featured)

  return (
    <section id="services" className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <SectionLabel>What We Offer</SectionLabel>
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 font-display text-3xl text-navy md:text-4xl lg:text-5xl"
          >
            Choose Your Path to a Higher Score
          </motion.h2>
        </div>

        {/* Featured Card */}
        {featuredService && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-8"
          >
            <ServiceCard {...featuredService} />
          </motion.div>
        )}

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {otherServices.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
