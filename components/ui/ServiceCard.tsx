'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Infinity,
  User,
  Users,
  Zap,
  ClipboardList,
  ArrowRight,
} from 'lucide-react'
import { scaleIn } from '@/components/motion/variants'

const iconMap: Record<string, React.ElementType> = {
  infinity: Infinity,
  user: User,
  users: Users,
  zap: Zap,
  'clipboard-list': ClipboardList,
}

interface ServiceCardProps {
  icon: string
  title: string
  price: number
  unit?: string | null
  description: string
  featured?: boolean
}

export default function ServiceCard({
  icon,
  title,
  price,
  unit,
  description,
  featured = false,
}: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const Icon = iconMap[icon] || Zap
  const cardVariants = shouldReduceMotion ? {} : scaleIn

  return (
    <motion.div
      variants={cardVariants}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      className={`group relative flex flex-col rounded-2xl border bg-white p-6 transition-shadow hover:shadow-xl md:p-8 ${
        featured
          ? 'border-2 border-gold shadow-lg shadow-gold/10'
          : 'border-slate-200 hover:border-gold hover:shadow-gold/10'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
          Most Popular
        </span>
      )}

      {/* Icon */}
      <div
        className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full ${
          featured ? 'bg-gold/10' : 'bg-navy'
        }`}
      >
        <Icon
          size={22}
          className={featured ? 'text-gold' : 'text-gold'}
          strokeWidth={2}
        />
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-bold text-navy">{title}</h3>

      {/* Price */}
      <div className="mb-4 flex items-baseline gap-1">
        <span className="font-mono text-4xl font-bold text-navy">
          ${price.toLocaleString()}
        </span>
        {unit && (
          <span className="text-sm font-medium uppercase tracking-wide text-charcoal/60">
            {unit}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mb-6 text-sm leading-relaxed text-charcoal/70">{description}</p>

      {/* CTA */}
      <a
        href="#cta"
        className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-warm"
      >
        Get Started
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </a>
    </motion.div>
  )
}
