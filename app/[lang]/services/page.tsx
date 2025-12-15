import ServicesOverview from "@/components/services-overview"
import CTASection from "@/components/cta-section"
import { getDictionary } from "@/lib/get-dictionary"
import type { Locale } from "@/i18n-config"

export default async function ServicesPage({ params }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(params.lang)

    return (
        <main>
            {/* Reusing the services component but we could make a detailed one later */}
            <ServicesOverview dictionary={dictionary.services} />

            <CTASection lang={params.lang} />
        </main >
    )
}
