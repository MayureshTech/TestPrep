# plan.md — Build Plan for Elevation Test Prep Website

## Project Summary

Build a premium, conversion-focused marketing website for **Elevation Test Prep**, a SAT/ACT tutoring service.  
Tech stack: **Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion**  
Goal: Make visitors book a free consultation or inquire about services.

---

## Phase Overview

| Phase | Name | Deliverables |
|---|---|---|
| 0 | Setup | Project scaffold, config, fonts, CSS vars |
| 1 | Data & Tokens | `lib/data.ts`, `motion/variants.ts`, Tailwind config |
| 2 | Layout Shell | Root layout, Navbar, Footer |
| 3 | Hero | Full-bleed animated hero section |
| 4 | Stats Bar | Animated score counter strip |
| 5 | Services | Pricing cards grid |
| 6 | How It Works | 3-step process section |
| 7 | Why Elevation | 3-pillar value props |
| 8 | Testimonials | Draggable quote carousel |
| 9 | Pricing Table | Full pricing overview |
| 10 | CTA Banner | Final conversion section |
| 11 | Polish & QA | Responsive fixes, perf audit, a11y |

---

## Phase 0 — Project Setup

### Commands to Run
```bash
npx create-next-app@latest elevation-test-prep \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd elevation-test-prep

npm install framer-motion
npm install lucide-react
npm install @lenis/lenis        # smooth scroll (optional)
npm install clsx                # conditional class utility
```

### Files to Create/Edit

**`app/globals.css`**
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --navy:        #0D1B3E;
  --navy-mid:    #1E2A3A;
  --steel-blue:  #2A4A7F;
  --gold:        #D4A017;
  --gold-warm:   #E8B84B;
  --ivory:       #F8F7F4;
  --off-white:   #EDF0F5;
  --charcoal:    #1E2A3A;
  --score-green: #3DAA6E;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Focus rings */
:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
}
```

**`tailwind.config.ts`** — extend with all tokens from `agent.md`

**`next.config.ts`**
```ts
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
}
export default nextConfig
```

---

## Phase 1 — Data Layer & Animation Tokens

### `lib/data.ts`
Populate with all content from `agent.md` data section:
- `services[]` — 5 service offerings with prices
- `testimonials[]` — 4 student/parent testimonials
- `processSteps[]` — 3 how-it-works steps
- `stats[]` — 3 animated stat values
- `pillars[]` — 3 "Why Elevation" value props

### `components/motion/variants.ts`
```ts
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
```

---

## Phase 2 — Layout Shell

### `app/layout.tsx`
```tsx
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Elevation Test Prep — Higher Scores. Brighter Futures.',
  description: 'Expert SAT & ACT tutoring with top 1% scorers. Individual, group, and unlimited packages. Average 200+ point SAT gains.',
  keywords: ['SAT tutoring', 'ACT prep', 'test prep', 'SAT bootcamp'],
  openGraph: {
    title: 'Elevation Test Prep',
    description: 'Prepare Smart. Score Higher.',
    type: 'website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### `components/layout/Navbar.tsx`
- Behavior: transparent on load, `navy/95 + blur` after scrollY > 80
- Desktop links: Home, Services, How It Works, Testimonials, Pricing
- CTA: "Book Free Consultation" → scrolls to `#cta`
- Mobile: hamburger → `AnimatePresence` animated drawer
- Logo: "ELEVATION / TEST PREP" in brand fonts (or SVG if provided)

### `components/layout/Footer.tsx`
- Dark navy background
- Logo + tagline left
- Quick links center
- Contact info right: `elevationtestprep.com`
- Bottom bar: copyright, legal links
- Subtle gold divider line at top

---

## Phase 3 — Hero Section

### `components/sections/HeroSection.tsx`

**Visual:**
- Navy background with radial gold glow (CSS background, no image needed)
- Left column: eyebrow tag + headline + subline + 2 CTAs + 3 trust badges
- Right column: student photo (placeholder `public/images/student-hero.jpg`)

**Animations (all `'use client'`):**
- Eyebrow: `fadeUp`, delay 0
- Headline words: staggered `fadeUp` on each word (split `"Higher Scores. Brighter Futures."` by spaces)
- Subline: `fadeUp`, delay 0.4
- CTAs: `scaleIn`, delay 0.6
- Trust badges: `staggerContainer` → `scaleIn`, delay 0.8
- Photo: `fadeIn`, delay 0.3

**Headline split technique:**
```tsx
const words = "Higher Scores. Brighter Futures.".split(" ")
return (
  <motion.h1 variants={staggerFast} initial="hidden" animate="show">
    {words.map((word, i) => (
      <motion.span key={i} variants={fadeUp} className="inline-block mr-3">
        {word}
      </motion.span>
    ))}
  </motion.h1>
)
```

**Trust badges (3 pills):**
```tsx
const badges = [
  { icon: <Trophy />, label: "Top 1% Tutors" },
  { icon: <TrendingUp />, label: "Avg +200 SAT Points" },
  { icon: <Calendar />, label: "Free Consultation" },
]
```

---

## Phase 4 — Stats Bar

### `components/sections/StatsBar.tsx`

**Visual:** Gold background strip, three large numbers side by side

### `components/ui/AnimatedCounter.tsx`
```tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface Props {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
}

export default function AnimatedCounter({ target, duration = 2, suffix = '', prefix = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const shouldReduceMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (shouldReduceMotion) { setCount(target); return }

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
      {prefix}{count}{suffix}
    </span>
  )
}
```

**StatsBar layout:**
```tsx
// Navy text on gold background
// Three columns with vertical dividers
// Each: AnimatedCounter + upward arrow + label
```

---

## Phase 5 — Services Section

### `components/sections/ServicesSection.tsx`
- Map `services` from `lib/data.ts`
- Section label: "WHAT WE OFFER"
- Section title: "Choose Your Path to a Higher Score"
- Grid: 2-col on tablet, 3-col on desktop
- "Unlimited" card: full-width featured card at top, gold border

### `components/ui/ServiceCard.tsx`
```tsx
interface ServiceCardProps {
  icon: string       // lucide icon name
  title: string
  price: number
  unit?: string | null
  description: string
  featured?: boolean
}
```
- Hover: `whileHover={{ y: -6 }}` + box shadow with gold tint
- Price in `font-mono`, navy color
- Icon in navy circle (dark bg, gold icon)
- "Get Started" link → `#cta`

---

## Phase 6 — How It Works

### `components/sections/HowItWorks.tsx`
- Dark navy background
- Section label: "THE PROCESS"
- Section title: "Three Steps to Your Target Score"
- 3 steps from `processSteps` data
- Layout: horizontal on desktop, vertical on mobile
- Animation: steps stagger in from bottom with connecting line drawing in between them (SVG animated path, optional)
- Each step: large number (gold, DM Serif, 80px), icon, title, description

**Connecting line (desktop):**  
An SVG horizontal line between step cards that draws itself from left to right using `pathLength` animation tied to `whileInView`.

---

## Phase 7 — Why Elevation

### `components/sections/WhyElevation.tsx`
- Ivory background
- Two-column layout: left column = copy + 3 pillars, right column = visual
- Right visual: Large stat card showing "200 Points Average SAT Gain" with animated counter, nested inside a mock testimonial bubble — gives social proof without needing an image
- Each pillar: icon (gold) + title (navy bold) + description
- `staggerContainer` on pillars list

---

## Phase 8 — Testimonials

### `components/sections/Testimonials.tsx`
- Dark navy background
- Section label: "STUDENT RESULTS"
- Section title: "Real Students. Real Scores."
- Horizontal draggable carousel using Framer Motion `drag="x"`
- Drag constraints: `dragConstraints={{ left: -totalWidth, right: 0 }}`
- Show "drag to explore" hint on mobile only

### `components/ui/TestimonialCard.tsx`
```tsx
interface TestimonialCardProps {
  quote: string
  name: string
  location: string
  scoreGain: string
}
```
- `min-width: 340px` per card
- Gold score badge (top right corner): `+210 SAT`
- Large decorative quote mark behind text (DM Serif, 6rem, gold, opacity 0.1)
- Student name + location in Inter 600, gold

---

## Phase 9 — Pricing Section

### `components/sections/PricingSection.tsx`
- Ivory background
- Section label: "TRANSPARENT PRICING"
- Section title: "No Hidden Fees. Just Results."
- Reuse `ServiceCard` components in a clean 2–3 col grid
- "Most Popular" badge on Unlimited package
- Each card: `scaleIn` with stagger
- Bottom note: "All plans include a free initial consultation."

---

## Phase 10 — CTA Banner

### `components/sections/CtaBanner.tsx`
- Navy background with subtle gold radial glow
- Full-width, centered
- Large headline: "Your Goals. Our Mission." (DM Serif)
- Subline: "Book your free consultation today — no commitment required."
- Two CTAs: "Book Free Consultation" (gold button, pulsing glow animation) + "Call Us" (ghost)
- Website URL: `elevationtestprep.com` subtly below
- ID: `id="cta"` for scroll targeting from Navbar

**Pulsing CTA:**
```tsx
// Tailwind class: animate-pulse-glow
// Defined in tailwind.config.ts keyframes
<GoldButton className="animate-pulse-glow">
  Book Free Consultation
</GoldButton>
```

---

## Phase 11 — Polish & QA Checklist

### Responsive
- [ ] Hero stacks correctly on mobile (photo below text or hidden)
- [ ] Stats bar wraps gracefully on < 400px
- [ ] Service cards: 1 col on mobile, 2 on tablet, 3 on desktop
- [ ] Testimonials draggable on touch
- [ ] Navbar drawer works on all mobile breakpoints

### Performance
- [ ] Images use `next/image` with `priority` on hero image
- [ ] Fonts loaded with `display=swap`
- [ ] No layout shifts on animation start
- [ ] Lighthouse score target: Performance > 85, A11y > 95

### Accessibility
- [ ] All `motion` animations respect `useReducedMotion`
- [ ] Keyboard nav through all interactive elements
- [ ] ARIA roles and labels on icon buttons
- [ ] Color contrast checked on all text/bg combinations
- [ ] Skip-to-content link at top of `<body>`

### Animation QA
- [ ] `AnimatedCounter` fires exactly once per page visit (not on re-scroll)
- [ ] No janky repaints — verify with DevTools
- [ ] Hero word-stagger feels smooth, not mechanical
- [ ] Testimonial drag has momentum feel (Framer Motion default kinetic)
- [ ] CTA pulse is subtle — not distracting

### Content
- [ ] Replace all `// CONTENT: replace with real X` placeholders before launch
- [ ] Real student photo in hero
- [ ] Real logo SVG
- [ ] Real testimonial attribution

---

## Deployment

```bash
# Vercel (recommended)
npm i -g vercel
vercel

# OR
# Push to GitHub, connect Vercel to repo
# Set environment variables if needed (none at MVP stage)
```

**Domain:** Point `elevationtestprep.com` to Vercel deployment.

---

## Estimated Build Time

| Phase | Est. Time |
|---|---|
| 0–1 (Setup + Data) | 30 min |
| 2 (Layout Shell) | 45 min |
| 3 (Hero) | 1 hr |
| 4 (Stats) | 30 min |
| 5 (Services) | 45 min |
| 6–7 (Process + Why) | 1 hr |
| 8 (Testimonials) | 45 min |
| 9–10 (Pricing + CTA) | 45 min |
| 11 (Polish) | 1 hr |
| **Total** | **~7–8 hrs** |
