'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/components/motion/variants'

interface SectionLabelProps {
  children: React.ReactNode
  light?: boolean
}

export default function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <motion.span
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${
        light
          ? 'bg-white/10 text-gold-warm'
          : 'bg-gold/10 text-gold'
      }`}
    >
      {children}
    </motion.span>
  )
}
