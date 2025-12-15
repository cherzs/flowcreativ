import Hero from "@/components/hero"
import TrustedBy from "@/components/trusted-by"
import ServicesOverview from "@/components/services-overview"
import WhyChooseUs from "@/components/why-choose-us"
import PortfolioPreview from "@/components/portfolio-preview"
import ProcessSection from "@/components/process-section"
import Testimonials from "@/components/testimonials"
import CTASection from "@/components/cta-section"
import { getDictionary } from "@/lib/get-dictionary"
import type { Locale } from "@/i18n-config"

export default async function HomePage({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang)

  return (
    <main className="min-h-screen">
      {/* @ts-ignore */}
      <Hero dictionary={dictionary.hero} lang={params.lang} />
      <TrustedBy />
      {/* @ts-ignore */}
      <ServicesOverview dictionary={dictionary.services} />
      {/* @ts-ignore */}
      <WhyChooseUs dictionary={dictionary.whyChooseUs} lang={params.lang} />
      {/* @ts-ignore */}
      <PortfolioPreview lang={params.lang} />
      <ProcessSection />
      <Testimonials />
      {/* @ts-ignore */}
      <CTASection lang={params.lang} />
    </main>
  )
}
