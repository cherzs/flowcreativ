import ServicesOverview from "@/components/services-overview"
import CTASection from "@/components/cta-section"
import JsonLd from "@/components/seo/json-ld"
import { getDictionary } from "@/lib/get-dictionary"
import type { Locale } from "@/i18n-config"
import type { Metadata } from "next"
import { createServicesMetadata, getServiceSchema } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  return createServicesMetadata(lang)
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    const dictionary = await getDictionary(lang)

    return (
        <main>
            <JsonLd id="service-schema" data={getServiceSchema()} />
            {/* Reusing the services component but we could make a detailed one later */}
            <ServicesOverview dictionary={dictionary.services} />

            {/* @ts-ignore */}
            <CTASection lang={lang} dictionary={dictionary.cta} />
        </main>
    )
}
