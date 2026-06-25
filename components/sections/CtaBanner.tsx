'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Phone } from 'lucide-react'
import GoldButton from '@/components/ui/GoldButton'
import { fadeUp } from '@/components/motion/variants'

export default function CtaBanner() {
  const shouldReduceMotion = useReducedMotion()
  const itemVariants = shouldReduceMotion ? {} : fadeUp

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-navy py-20 md:py-28"
      style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 100%, rgba(212, 160, 23, 0.1) 0%, transparent 60%)',
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 text-center lg:px-10">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="font-display text-3xl text-white md:text-4xl lg:text-5xl"
        >
          Your Goals. Our Mission.
        </motion.h2>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/70"
        >
          Book your free consultation today — no commitment required.
        </motion.p>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <GoldButton href="#" size="lg" pulse>
            Book Free Consultation
          </GoldButton>
          <GoldButton href="tel:" variant="ghost" size="lg">
            <Phone size={18} className="mr-2" />
            Call Us
          </GoldButton>
        </motion.div>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 text-sm text-white/30"
        >
          elevationtestprep.com
        </motion.p>
      </div>
    </section>
  )
}
