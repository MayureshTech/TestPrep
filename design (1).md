# Design.md — Elevation Test Prep Website

## Brand Identity Snapshot

**Brand:** Elevation Test Prep  
**Tagline:** *Prepare Smart. Score Higher.*  
**Audience:** High school students (14–18) and their parents seeking SAT/ACT tutoring  
**Single Job of the Site:** Convert a visitor into a consultation booking or service inquiry  
**Tone:** Ambitious, trustworthy, human — not corporate, not flashy

---

## Color Palette

| Name | Hex | Usage |
|---|---|---|
| Navy Depth | `#0D1B3E` | Primary background for headers, hero, dark sections |
| Ivory White | `#F8F7F4` | Light section backgrounds, cards |
| Elevation Gold | `#D4A017` | Primary accent, CTAs, highlights, pricing |
| Gold Warm | `#E8B84B` | Secondary gold for hover states and gradients |
| Charcoal | `#1E2A3A` | Body text on light backgrounds |
| Steel Blue | `#2A4A7F` | Mid-tone for card backgrounds, borders |
| Score Green | `#3DAA6E` | Success indicators, score gain stats |
| Off White | `#EDF0F5` | Subtle section dividers, input backgrounds |

**Palette Philosophy:**  
Navy + Gold is inherited from the brand image — but we push it further. The gold becomes the single electric pulse of the site: it animates, it glows faintly on dark backgrounds, it marks every number worth remembering. The navy is rich and trustworthy, not flat-dark. The ivory sections breathe.

---

## Typography

### Display Face — `DM Serif Display` (Google Fonts)
Used for: Hero headline, section headings, pricing numbers  
Weight: 400 (regular) — this face has natural authority at large sizes  
Style: Italic variant for emphasis on key phrases like *Brighter Futures*

### Body Face — `Inter` (Google Fonts)
Used for: Body copy, navigation, cards, descriptions  
Weights: 400 (body), 500 (subheads), 600 (labels), 700 (CTAs)

### Utility / Mono — `JetBrains Mono` (optional, sparingly)
Used for: Score numbers in stats, pricing figures, counters  
This gives score numbers a "data readout" quality — feels precise and earned

### Type Scale (rem)

```
--text-xs: 0.75rem      /* labels, tags */
--text-sm: 0.875rem     /* captions */
--text-base: 1rem       /* body copy */
--text-lg: 1.125rem     /* card text */
--text-xl: 1.25rem      /* subheadings */
--text-2xl: 1.5rem      /* section intros */
--text-3xl: 1.875rem    /* section titles */
--text-5xl: 3rem        /* hero supporting */
--text-7xl: 4.5rem      /* hero headline */
--text-9xl: 7rem        /* stat numbers (200 pts, 8 pts) */
```

---

## Layout Concept

**One long, narrative scroll** — no page reloads, sections reveal themselves as the user descends. Each section has a clear single purpose.

```
┌────────────────────────────────────┐
│  NAV (sticky, transparent → solid) │
│  Logo left │ Links center │ CTA →  │
├────────────────────────────────────┤
│  HERO  (navy bg, full-bleed)       │
│  Left: Headline + subline + CTA    │
│  Right: Student photo w/ gold glow │
│  Bottom: 3 trust badges animating  │
├────────────────────────────────────┤
│  STATS BAR  (gold bg strip)        │
│  200↑ SAT  |  8↑ ACT  |  1500+    │
│  students helped  |  Top 1% tutors │
├────────────────────────────────────┤
│  SERVICES  (ivory bg, cards)       │
│  5 pricing cards in grid           │
│  Each with icon, price, desc, CTA  │
├────────────────────────────────────┤
│  HOW IT WORKS  (navy bg)           │
│  3-step process, stagger reveal    │
│  Diagnostic → Plan → Score Higher  │
├────────────────────────────────────┤
│  WHY ELEVATION  (ivory bg)         │
│  3 pillars: Expert, Strategy, Real │
│  Side-by-side with visual          │
├────────────────────────────────────┤
│  TESTIMONIALS  (dark navy)         │
│  Horizontal scroll carousel        │
│  Quote + student name + score gain │
├────────────────────────────────────┤
│  PRICING OVERVIEW  (ivory)         │
│  Clean 5-column comparison         │
│  Highlight: Unlimited at $1,995    │
├────────────────────────────────────┤
│  CTA BANNER  (gold bg)             │
│  "Your Goals. Our Mission."        │
│  Book Free Consultation button     │
├────────────────────────────────────┤
│  FOOTER  (navy deep)               │
│  Logo | Links | Contact | Legal    │
└────────────────────────────────────┘
```

---

## Signature Element

**The Score Odometer Animation**

On the Stats Bar, the numbers `200` and `8` don't simply appear — they roll up from `0` like an odometer when the section enters the viewport. Each digit increments in sequence using a slot-machine style counter, in JetBrains Mono, in gold. The ticker includes a subtle upward arrow that trails slightly behind the number.

This single moment is the most memorable thing on the page. Students see their score going up. Parents feel the results are real and earned. It happens once, naturally, as they scroll — never loops.

---

## Animation Philosophy

**"Purposeful, not performative."**  
Every animation earns its place. We use Framer Motion exclusively.

### Animation Tokens

```ts
// Stagger container
const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 }
  }
}

// Fade up (primary reveal)
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
}

// Scale in (for cards)
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } }
}

// Slide left (for testimonials)
const slideIn = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
}
```

### Where Animations Fire

| Element | Animation | Trigger |
|---|---|---|
| Hero headline | Fade up, word by word (stagger) | Page load |
| Hero photo | Fade in + subtle scale | Page load, 0.3s delay |
| Nav | Background opacity 0→1 on scroll past 80px | Scroll |
| Stats numbers | Odometer roll-up | `whileInView` |
| Service cards | Scale in, staggered | `whileInView` |
| Process steps | Fade up, staggered | `whileInView` |
| Testimonials | Horizontal drag scroll, fade in | `whileInView` + drag |
| CTA button | Gentle pulse glow on idle | CSS keyframe (ambient) |
| Card hover | Lift + gold border glow | `whileHover` |

**Respect `prefers-reduced-motion`** — wrap all motion in a check; fall back to instant visibility.

---

## Component Visual Specifications

### Navigation
- Height: `72px`
- Background: `transparent` on hero, transitions to `rgba(13, 27, 62, 0.95)` with `backdrop-filter: blur(12px)` on scroll
- Logo: SVG, white/gold version
- Links: Inter 500, text-sm, tracking-wide, uppercase
- CTA: Gold button, `bg-[#D4A017]`, black text, `rounded-full`, `px-5 py-2.5`

### Hero Section
- Min-height: `100vh`
- Background: `#0D1B3E` with a radial gold gradient glow at `20% 80%` opacity `0.08`
- Eyebrow tag: Gold pill, uppercase, text-xs — "SAT & ACT Experts"
- Headline: DM Serif Display, 72px desktop / 40px mobile, white
- Italic gold on "Brighter Futures"
- CTA Primary: Gold button (large, `px-8 py-4`)
- CTA Secondary: Ghost button, white border
- Photo treatment: Rounded, slight drop shadow in gold at bottom

### Service Cards
- Background: white
- Border: `1px solid #E2E8F0`, on hover: `2px solid #D4A017` with glow
- Icon: Dark navy circle bg, gold icon SVG
- Price: JetBrains Mono, 48px, navy
- Label: Inter 700, uppercase, tracking-widest, text-sm
- Border radius: `16px`
- Hover: `translateY(-6px)` + shadow `0 20px 60px rgba(212, 160, 23, 0.12)`

### Stats Bar
- Background: `#D4A017` (solid gold)
- Numbers: JetBrains Mono, 72px, navy
- Labels: Inter 600, navy, uppercase, text-sm
- Dividers: `1px solid rgba(13, 27, 62, 0.2)`

### Testimonial Cards
- Background: `#1E2A3A`
- Quote mark: DM Serif Display, 120px, gold, opacity 0.2
- Text: Inter 400, white, italic
- Name + score: Inter 600, gold
- Layout: horizontal drag carousel, `overflow-x: scroll`, `scroll-snap-type: x mandatory`

---

## Responsive Breakpoints

```
Mobile:   < 640px   — single column, reduced type scale
Tablet:   640–1024px — 2-col grids, adjusted spacing
Desktop: > 1024px   — full layout as described
Wide:    > 1440px   — max-width 1400px, centered
```

---

## What This Design Is NOT

- Not a generic SaaS template with a purple gradient
- Not a bootstrap-era grid with stock photos
- Not using default Tailwind blue
- Not stacking 10 features in a list with checkmarks
- Not copy that says "Unlock Your Potential" without evidence

---

## Fonts Import (globals.css)

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
```
