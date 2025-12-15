import PortfolioPreview from "@/components/portfolio-preview"
import CTASection from "@/components/cta-section"

export default function PortfolioPage() {
    return (
        <main className="pt-24">
            <div className="container mx-auto px-4 mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                    A showcase of our recent projects and success stories.
                </p>
            </div>

            {/* Reusing the portfolio component */}
            <PortfolioPreview />

            <CTASection />
        </main>
    )
}
