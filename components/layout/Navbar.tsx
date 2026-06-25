'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import GoldButton from '@/components/ui/GoldButton'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      style={{ height: 72 }}
    >
      <nav className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-wide text-white">
            ELEVATION
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
            Test Prep
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium uppercase tracking-wide text-white/80 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <GoldButton href="#cta" size="sm">
            Book Free Consultation
          </GoldButton>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="flex h-10 w-10 items-center justify-center text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-navy/98 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block text-sm font-medium uppercase tracking-wide text-white/80 transition-colors hover:text-gold"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <GoldButton href="#cta" size="md" className="w-full">
                  Book Free Consultation
                </GoldButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
