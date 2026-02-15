import TeamCard from "@/components/team-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Locale } from "@/i18n-config"

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    return (
        <main className="min-h-screen pt-24 pb-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900">About FlowCreativ</h1>
                    <p className="text-xl text-neutral-600">
                        We are a team of digital innovators dedicated to shrinking the gap between technology and business growth.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
                        <div className="p-6 rounded-2xl bg-white border border-neutral-200">
                            <h3 className="text-xl font-semibold mb-4 text-neutral-900">Our Mission</h3>
                            <p className="text-neutral-600">To empower businesses with scalable, high-performance digital solutions that drive real results.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white border border-neutral-200">
                            <h3 className="text-xl font-semibold mb-4 text-neutral-900">Our Vision</h3>
                            <p className="text-neutral-600">To be the go-to partner for companies looking to transform their digital presence through design and technology.</p>
                        </div>
                    </div>

                    <div className="pt-8">
                        <Link href={`/${lang}/contact`}>
                            <Button variant="pill" size="lg" className="h-12 px-8">
                                Work With Us
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>

            <section className="mt-20">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">
                        People Behind FlowCreativ
                    </h2>
                    <p className="text-neutral-600">
                        Meet the engineers and consultants behind our delivery.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TeamCard
                        name="Muhammad Zhafran Ghaly"
                        role="Founder & Lead ERP Architect"
                        summary="Founder of FlowCreativ leading ERP architecture and delivery. Delivered systems for Patra Jasa, People Impact, Nordenmorse, Andalan Mitra Guna, and SaaSquatch."
                        image="/ghaly.png"
                    />
                    <TeamCard
                        name="Bima Surya Nurwahid"
                        role="Full-Stack & Mobile Developer"
                        summary="Full-stack and mobile developer building scalable products and internal platforms. Delivered face recognition attendance solutions and multi‑CMS systems."
                        image="/bima.jpg"
                    />
                    <TeamCard
                        name="Benediktus Satriya"
                        role="Backend Developer"
                        summary="Backend developer with enterprise experience across CIMB Niaga, Sinarmas, and Telkomsel By.U."
                        image="/bene.png"
                    />
                </div>
            </section>
        </main>
    )
}
