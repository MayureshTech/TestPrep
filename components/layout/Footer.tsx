'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/components/motion/variants'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Gold divider */}
      <div className="h-px w-full bg-gold/30" />

      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Logo + Tagline */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <a href="#" className="mb-4 inline-flex flex-col leading-none">
              <span className="font-display text-2xl tracking-wide text-white">
                ELEVATION
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Test Prep
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Prepare Smart. Score Higher. Expert SAT & ACT tutoring for ambitious students.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#' },
                { label: 'Services', href: '#services' },
                { label: 'How It Works', href: '#process' },
                { label: 'Testimonials', href: '#testimonials' },
                { label: 'Pricing', href: '#pricing' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a
                  href="https://elevationtestprep.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  elevationtestprep.com
                </a>
              </li>
              <li>Book your free consultation today</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Elevation Test Prep. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="transition-colors hover:text-gold">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-gold">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
