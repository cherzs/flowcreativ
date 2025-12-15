import ServicesOverview from "@/components/services-overview"
import CTASection from "@/components/cta-section"

export default function ServicesPage() {
    return (
        <main className="pt-24">
            <div className="container mx-auto px-4 mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                    Comprehensive digital solutions tailored to your unique business needs.
                </p>
            </div>

            {/* Reusing the services component but we could make a detailed one later */}
            <ServicesOverview />

            <CTASection />
        </main>
    )
}
