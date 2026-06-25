# agent.md — AI Agent Instructions for Elevation Test Prep Website

## Role

You are a senior Next.js frontend engineer and UI/UX specialist.  
Your task is to build the **Elevation Test Prep** marketing website from scratch using the specifications in `design.md` and the plan in `plan.md`.

You produce clean, readable, maintainable TypeScript code. You do not over-abstract. You do not add packages unless they are specified or clearly necessary.

---

## Core Directives

### 1. Always Read Before You Write
Before creating any file, check if a similar file already exists in the project. Never overwrite without confirming.

### 2. Follow design.md Exactly
Every color, font, animation token, and layout decision is already made in `design.md`. Do not invent new styles. Do not substitute Tailwind defaults for the custom palette unless there is no alternative.

### 3. Follow plan.md Phase by Phase
Work through each phase sequentially. Do not skip ahead. After completing each phase, produce a summary of what was built and what comes next.

### 4. Never Leave TODOs in Shipped Code
If a section requires real content you don't have (e.g. actual tutor headshots), use sensible placeholder structures but leave a clear `// CONTENT: replace with real X` comment inline — not a vague `// TODO`.

### 5. TypeScript First
All files use `.tsx` or `.ts`. No `.js` or `.jsx`. Use proper typing for all props, state, and function signatures.

### 6. Component Naming Convention
- PascalCase for components: `HeroSection.tsx`, `ServiceCard.tsx`  
- camelCase for utilities: `useScrollOpacity.ts`, `animationVariants.ts`  
- kebab-case for CSS modules if any: `hero-section.module.css`

---

## Tech Stack

| Tool | Purpose |
|---|---|
| `Next.js 14+` (App Router) | Framework, routing, metadata |
| `TypeScript` | Type safety |
| `Tailwind CSS v3` | Utility styling |
| `Framer Motion` (`motion`) | All animations |
| `Lenis` (optional) | Smooth scroll, if instructed |
| `shadcn/ui` | Pre-built accessible components (Dialog, etc.) |
| `lucide-react` | Icon set |
| `@vercel/analytics` | Page analytics (optional) |

---

## Project Structure to Create

```
elevation-test-prep/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Home page — composes all sections
│   ├── globals.css             # Tailwind directives, CSS vars, font imports
│   └── favicon.ico
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── StatsBar.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── WhyElevation.tsx
│   │   ├── Testimonials.tsx
│   │   ├── PricingSection.tsx
│   │   └── CtaBanner.tsx
│   ├── ui/
│   │   ├── AnimatedCounter.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── GoldButton.tsx
│   │   └── SectionLabel.tsx
│   └── motion/
│       └── variants.ts         # All Framer Motion variant objects
├── lib/
│   └── data.ts                 # All static content (services, testimonials, steps)
├── public/
│   └── images/                 # Placeholder folder
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## CSS Variables to Define in globals.css

```css
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
  --white:       #FFFFFF;

  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}
```

---

## Tailwind Config Extensions Required

```ts
// tailwind.config.ts
extend: {
  colors: {
    navy:       '#0D1B3E',
    'navy-mid': '#1E2A3A',
    steel:      '#2A4A7F',
    gold:       '#D4A017',
    'gold-warm':'#E8B84B',
    ivory:      '#F8F7F4',
    charcoal:   '#1E2A3A',
    'score-green': '#3DAA6E',
  },
  fontFamily: {
    display: ['"DM Serif Display"', 'Georgia', 'serif'],
    body:    ['Inter', 'system-ui', 'sans-serif'],
    mono:    ['"JetBrains Mono"', 'monospace'],
  },
  keyframes: {
    'pulse-glow': {
      '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 160, 23, 0)' },
      '50%':      { boxShadow: '0 0 0 8px rgba(212, 160, 23, 0.25)' },
    },
    'float': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%':      { transform: 'translateY(-8px)' },
    }
  },
  animation: {
    'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
    'float':      'float 4s ease-in-out infinite',
  }
}
```

---

## Framer Motion Rules

### Always use `whileInView` for scroll-triggered animations
```tsx
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.2 }}
>
```

### Respect reduced motion
```tsx
import { useReducedMotion } from 'framer-motion'

const shouldReduceMotion = useReducedMotion()
const heroVariants = shouldReduceMotion ? {} : fadeUp
```

### AnimatePresence for conditional rendering
```tsx
import { AnimatePresence, motion } from 'framer-motion'
// Wrap any component that conditionally mounts/unmounts
```

---

## Data Layer (lib/data.ts) — Populate This First

```ts
export const services = [
  {
    id: 'unlimited',
    icon: 'infinity',
    title: 'Unlimited Test Prep Tutoring',
    price: 1995,
    unit: null,
    description: 'Unlimited support. Unlimited potential.',
    featured: true,
  },
  {
    id: 'individual',
    icon: 'user',
    title: 'Individual Tutoring',
    price: 95,
    unit: 'per hour',
    description: 'One-on-one. 100% focused on you.',
  },
  {
    id: 'group',
    icon: 'users',
    title: 'Group Tutoring',
    price: 40,
    unit: 'per hour',
    description: 'Collaborate. Learn. Succeed together.',
  },
  {
    id: 'bootcamp',
    icon: 'zap',
    title: 'SAT Bootcamp',
    price: 995,
    unit: null,
    description: 'Intensive prep. Maximum impact.',
  },
  {
    id: 'analysis',
    icon: 'clipboard-list',
    title: 'SAT Test & Analysis Session',
    price: 50,
    unit: null,
    description: 'Take the test. Get the insights.',
  },
]

export const testimonials = [
  {
    id: 1,
    quote: "My SAT score jumped 210 points after working with Elevation. The strategies were unlike anything I'd seen.",
    name: "Sarah M.",
    location: "Boston, MA",
    scoreGain: "+210 SAT",
  },
  {
    id: 2,
    quote: "The tutors are top 1% scorers who actually know how to teach. My daughter got into her dream school.",
    name: "James T.",
    location: "Parent",
    scoreGain: "+180 SAT",
  },
  {
    id: 3,
    quote: "I went from a 24 to a 32 on the ACT in 8 weeks. The personalized plan made all the difference.",
    name: "Carlos R.",
    location: "Chicago, IL",
    scoreGain: "+8 ACT",
  },
  {
    id: 4,
    quote: "Fast responses, amazing tutors, and real results. Lightning-fast communication and absolute expertise.",
    name: "Jennifer E.",
    location: "Parent",
    scoreGain: "+195 SAT",
  },
]

export const processSteps = [
  {
    step: 1,
    title: 'Free Diagnostic',
    description: 'We identify your exact strengths and score gaps with a full diagnostic session — no guessing, no generic plans.',
    icon: 'search',
  },
  {
    step: 2,
    title: 'Custom Study Plan',
    description: 'Your tutor builds a personalized roadmap targeting your highest-yield improvements before test day.',
    icon: 'map',
  },
  {
    step: 3,
    title: 'Score Higher',
    description: 'Consistent sessions, proven strategies, and real practice tests — until your score reflects your potential.',
    icon: 'trending-up',
  },
]

export const stats = [
  { value: 200, label: 'Point SAT Gain', suffix: '↑', unit: 'avg' },
  { value: 8,   label: 'Point ACT Gain', suffix: '↑', unit: 'avg' },
  { value: 1,   label: 'Top 1% Tutors', suffix: '%', unit: 'only' },
]

export const pillars = [
  {
    icon: 'trophy',
    title: 'Expert Tutors',
    description: 'Every Elevation tutor scored in the top 1% on the SAT or ACT. Not just high scorers — trained teachers who know how to transfer that knowledge to you.',
  },
  {
    icon: 'target',
    title: 'Proven Strategies',
    description: 'We teach the patterns the test actually uses. Our curriculum is built around the Digital SAT format — personalized to your specific gaps, not a one-size plan.',
  },
  {
    icon: 'bar-chart-2',
    title: 'Real Results',
    description: 'Our students average 200+ point SAT gains and 8+ ACT point improvements. We track every session and adapt until your score reflects your potential.',
  },
]
```

---

## Key Component Specifications

### `AnimatedCounter.tsx`
- Accept: `target: number`, `duration?: number`, `suffix?: string`
- Use `useMotionValue` + `useTransform` + `useInView`
- When `inView` becomes true, animate from `0` to `target` over `duration` seconds
- Display with `font-mono` styling
- Respect `useReducedMotion` — if true, show final number immediately

### `Navbar.tsx`
- `useState` for scroll position via `useEffect`
- Background: `transparent` until `scrollY > 80`, then `navy/95` + blur
- Mobile: hamburger menu with `AnimatePresence` slide-down drawer
- Desktop: links center, logo left, "Book Free Consultation" CTA right

### `HeroSection.tsx`
- Full-height `100dvh`
- Navy background with radial gold glow using CSS `radial-gradient`
- Staggered word-by-word animation on headline (split by space)
- Photo on right with gold bottom shadow
- Two CTAs: primary (gold) and secondary (ghost)
- Three trust badges at bottom: "Top 1% Tutors", "+200 SAT avg", "Free Consultation"

### `StatsBar.tsx`
- Gold background strip, `py-12`
- Three stats in flex row, separated by vertical dividers
- Each `AnimatedCounter` fires once on viewport entry
- Numbers in `font-mono`, labels in `font-body uppercase tracking-widest`

### `ServicesSection.tsx`
- Grid: `2 col tablet` / `3 col desktop`
- "Unlimited" card: spans full width or features prominently, gold border
- Cards: `ServiceCard` component with hover lift animation

### `Testimonials.tsx`
- Dark navy background
- Large quote mark (DM Serif, opacity 0.15) in background
- Horizontal drag scroll with `drag="x"` Framer Motion
- Each card: `TestimonialCard` with score badge in gold

---

## Accessibility Requirements

- All images: meaningful `alt` text
- All interactive elements: keyboard accessible
- Focus rings: visible, gold-colored (`outline: 2px solid #D4A017`)
- ARIA labels on icon-only buttons
- Color contrast: maintain WCAG AA minimum on all text/bg combos
- Landmark regions: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`

---

## What the Agent Should NOT Do

- Do not install Chakra UI, MUI, or other heavy UI frameworks
- Do not use inline styles except for dynamic values (e.g. animation inline transform)
- Do not duplicate logic — extract to hooks or utilities
- Do not leave unused imports
- Do not hardcode content inside components — pull from `lib/data.ts`
- Do not use `any` TypeScript type
- Do not create animations that loop continuously except for the CTA pulse glow (ambient, subtle)
