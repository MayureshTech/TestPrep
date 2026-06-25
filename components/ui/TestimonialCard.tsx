'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { scaleIn } from '@/components/motion/variants'

interface TestimonialCardProps {
  quote: string
  name: string
  location: string
  scoreGain: string
}

export default function TestimonialCard({
  quote,
  name,
  location,
  scoreGain,
}: TestimonialCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const cardVariants = shouldReduceMotion ? {} : scaleIn

  return (
    <motion.div
      variants={cardVariants}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      className="relative min-w-[320px] max-w-[360px] shrink-0 overflow-hidden rounded-2xl bg-navy-mid p-8 md:min-w-[340px]"
    >
      {/* Score badge */}
      <div className="absolute right-6 top-6 rounded-full bg-gold/10 px-3 py-1 text-xs font-bold text-gold">
        {scoreGain}
      </div>

      {/* Quote mark */}
      <Quote
        size={48}
        className="mb-4 text-gold/15"
        fill="currentColor"
        strokeWidth={0}
      />

      {/* Quote text */}
      <p className="mb-6 text-base leading-relaxed text-white/90 italic">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Attribution */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
          <span className="text-sm font-bold text-gold">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gold">{name}</p>
          <p className="text-xs text-white/50">{location}</p>
        </div>
      </div>
    </motion.div>
  )
}
