import Hero from "@/components/hero"
import TrustedBy from "@/components/trusted-by"
import ServicesOverview from "@/components/services-overview"
import WhyChooseUs from "@/components/why-choose-us"
import PortfolioPreview from "@/components/portfolio-preview"
import ProcessSection from "@/components/process-section"
import Testimonials from "@/components/testimonials"
import CTASection from "@/components/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TrustedBy />
      <ServicesOverview />
      <WhyChooseUs />
      <PortfolioPreview />
      <ProcessSection />
      <Testimonials />
      <CTASection />
    </main>
  )
}
