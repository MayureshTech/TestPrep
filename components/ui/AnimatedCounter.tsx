'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface AnimatedCounterProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
}

export default function AnimatedCounter({
  target,
  duration = 2,
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const shouldReduceMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (shouldReduceMotion) {
      setCount(target)
      return
    }

    const start = performance.now()
    const animate = (time: number) => {
      const elapsed = (time - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, target, duration, shouldReduceMotion])

  return (
    <span ref={ref} className="font-mono">
      {prefix}
      {count}
      {suffix}
    </span>
  )
}
