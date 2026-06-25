import HeroSection from '@/components/sections/HeroSection'
import StatsBar from '@/components/sections/StatsBar'
import ServicesSection from '@/components/sections/ServicesSection'
import HowItWorks from '@/components/sections/HowItWorks'
import WhyElevation from '@/components/sections/WhyElevation'
import Testimonials from '@/components/sections/Testimonials'
import PricingSection from '@/components/sections/PricingSection'
import CtaBanner from '@/components/sections/CtaBanner'

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <HowItWorks />
      <WhyElevation />
      <Testimonials />
      <PricingSection />
      <CtaBanner />
    </>
  )
}
