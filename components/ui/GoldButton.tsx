'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GoldButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  pulse?: boolean
}

export default function GoldButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  pulse = false,
}: GoldButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'

  const variants = {
    primary: 'bg-gold text-navy hover:bg-gold-warm',
    secondary: 'bg-navy text-white border border-gold hover:bg-navy-mid',
    ghost: 'bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/5',
  }

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const combined = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    pulse && 'animate-pulse-glow',
    className
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={combined}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={combined}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
