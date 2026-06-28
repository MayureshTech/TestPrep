'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Trophy, TrendingUp, Calendar } from 'lucide-react'
import GoldButton from '@/components/ui/GoldButton'
import { fadeUp, fadeIn, scaleIn, staggerContainer, staggerFast } from '@/components/motion/variants'

const headlineWords = ['Higher', 'Scores.', 'Brighter', 'Futures.']

const badges = [
  { icon: Trophy, label: 'Top 1% Tutors' },
  { icon: TrendingUp, label: 'Avg +200 SAT Points' },
  { icon: Calendar, label: 'Free Consultation' },
]

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  const heroVariants = shouldReduceMotion ? {} : fadeUp
  const staggerVariants = shouldReduceMotion ? {} : staggerFast
  const scaleVariants = shouldReduceMotion ? {} : scaleIn
  const fadeVariants = shouldReduceMotion ? {} : fadeIn

  return (
    <section
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-navy pt-[72px]"
      style={{
        backgroundImage: 'radial-gradient(ellipse at 70% 80%, rgba(212, 160, 23, 0.08) 0%, transparent 60%)',
      }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            {/* Eyebrow */}
            <motion.span
              variants={heroVariants}
              initial="hidden"
              animate="show"
              className="inline-block w-fit rounded-full bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold"
            >
              SAT & ACT Experts
            </motion.span>

            {/* Headline */}
            <motion.h1
              variants={staggerVariants}
              initial="hidden"
              animate="show"
              className="font-display text-4xl leading-[1.1] text-white md:text-5xl lg:text-[4.5rem]"
            >
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={heroVariants}
                  className={`inline-block mr-3 ${
                    word === 'Futures.' ? 'italic text-gold' : ''
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subline */}
            <motion.p
              variants={heroVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.4 }}
              className="max-w-lg text-lg leading-relaxed text-white/70 md:text-xl"
            >
              Expert instruction. Proven strategies. Real results. Work with top 1% scorers who know how to teach.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={scaleVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <GoldButton href="#cta" size="lg" pulse>
                Book Free Consultation
              </GoldButton>
              <GoldButton href="#services" variant="ghost" size="lg">
                Explore Services
              </GoldButton>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              {badges.map((badge) => (
                <motion.div
                  key={badge.label}
                  variants={scaleVariants}
                  className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm"
                >
                  <badge.icon size={16} className="text-gold" />
                  {badge.label}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Student Photo */}
          <motion.div
            variants={fadeVariants}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-2xl">
              <Image
                src="images/student-hero.jpg"
                alt="Smiling student confident about her SAT prep journey with Elevation Test Prep"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0px, 400px"
                priority
              />
              {/* Gold bottom shadow/glow */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3"
                style={{
                  background: 'linear-gradient(to top, rgba(212, 160, 23, 0.15), transparent)',
                }}
              />
            </div>
            {/* Decorative gold ring */}
            <div className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 rounded-full border border-gold/20" />
            <div className="pointer-events-none absolute -top-6 -left-6 h-24 w-24 rounded-full border border-gold/10" />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-navy to-transparent" />
    </section>
  )
}
