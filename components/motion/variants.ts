import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' }
  }
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 }
  }
}

export const staggerFast: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 }
  }
}
