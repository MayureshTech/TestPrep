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
      <body className="antialiased">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-gold focus:text-navy focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
