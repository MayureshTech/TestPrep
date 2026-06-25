'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import TestimonialCard from '@/components/ui/TestimonialCard'
import { testimonials } from '@/lib/data'
import { fadeUp } from '@/components/motion/variants'

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion()
  const itemVariants = shouldReduceMotion ? {} : fadeUp
  const carouselRef = useRef<HTMLDivElement>(null)

  return (
    <section id="testimonials" className="bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <SectionLabel light>Student Results</SectionLabel>
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 font-display text-3xl text-white md:text-4xl lg:text-5xl"
          >
            Real Students. Real Scores.
          </motion.h2>
        </div>

        {/* Draggable Carousel */}
        <motion.div
          ref={carouselRef}
          className="hide-scrollbar -mx-6 cursor-grab overflow-x-auto px-6 active:cursor-grabbing md:-mx-10 md:px-10"
          whileTap={{ cursor: 'grabbing' }}
        >
          <motion.div
            drag="x"
            dragConstraints={carouselRef}
            className="flex gap-6 pb-4"
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} {...t} />
            ))}
          </motion.div>
        </motion.div>

        {/* Mobile drag hint */}
        <p className="mt-4 text-center text-xs text-white/30 md:hidden">
          Drag to explore
        </p>
      </div>
    </section>
  )
}
