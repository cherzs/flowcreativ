import PortfolioPreview from "@/components/portfolio-preview"
import CTASection from "@/components/cta-section"

import type { Locale } from "@/i18n-config"

export default async function PortfolioPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    return (
        <main className="pt-24 bg-white">
            <div className="container mx-auto px-4 mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-6">Our Portfolio</h1>
                <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                    A showcase of our recent projects and success stories.
                </p>
            </div>

            {/* Reusing the portfolio component */}
            <PortfolioPreview lang={lang} />

            <CTASection lang={lang} />
        </main>
    )
}
