import ServicesOverview from "@/components/services-overview"
import CTASection from "@/components/cta-section"
import { getDictionary } from "@/lib/get-dictionary"
import type { Locale } from "@/i18n-config"

export default async function ServicesPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    const dictionary = await getDictionary(lang)

    return (
        <main>
            {/* Reusing the services component but we could make a detailed one later */}
            <ServicesOverview dictionary={dictionary.services} />

            {/* @ts-ignore */}
            <CTASection lang={lang} dictionary={dictionary.cta} />
        </main>
    )
}
