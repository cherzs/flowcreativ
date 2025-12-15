import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Locale } from "@/i18n-config"

export default function AboutPage({ params }: { params: { lang: Locale } }) {
    return (
        <main className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h1 className="text-4xl md:text-5xl font-bold">About FlowCreativ</h1>
                    <p className="text-xl text-white/60">
                        We are a team of digital innovators dedicated to shrinking the gap between technology and business growth.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                            <p className="text-white/60">To empower businesses with scalable, high-performance digital solutions that drive real results.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-bold mb-4">Our Vision</h3>
                            <p className="text-white/60">To be the go-to partner for companies looking to transform their digital presence through design and technology.</p>
                        </div>
                    </div>

                    <div className="pt-8">
                        <Link href={`/${params.lang}/contact`}>
                            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                                Work With Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
