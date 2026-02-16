import Hero from "@/components/hero"
import TrustedBy from "@/components/trusted-by"
import ServicesOverview from "@/components/services-overview"
import PricingSection from "@/components/pricing-section"
import WhyChooseUs from "@/components/why-choose-us"
import PortfolioPreview from "@/components/portfolio-preview"
import ProcessSection from "@/components/process-section"
import Testimonials from "@/components/testimonials"
import CTASection from "@/components/cta-section"
import { getDictionary } from "@/lib/get-dictionary"
import type { Locale } from "@/i18n-config"

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <main className="min-h-screen">
      {/* @ts-ignore */}
      <Hero dictionary={dictionary.hero} lang={lang} />
      {/* @ts-ignore */}
      <ServicesOverview dictionary={dictionary.services} />
      {/* @ts-ignore */}
      <PricingSection dictionary={dictionary.pricing} lang={lang} />
      {/* @ts-ignore */}
      <WhyChooseUs dictionary={dictionary.whyChooseUs} lang={lang} />
      {/* @ts-ignore */}
      <TrustedBy dictionary={dictionary.trustedBy} />
      {/* @ts-ignore */}
      <PortfolioPreview lang={lang} limit={6} dictionary={dictionary.portfolio} />
      <ProcessSection dictionary={dictionary.process} lang={lang} />
      {/* @ts-ignore */}
      <Testimonials dictionary={dictionary.testimonials} />
      {/* @ts-ignore */}
      <CTASection lang={lang} dictionary={dictionary.cta} />
    </main>
  )
}
