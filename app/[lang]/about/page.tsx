import TeamCard from "@/components/team-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/get-dictionary"

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    const dictionary = await getDictionary(lang)
    const about = dictionary.aboutPage

    const teamMembers = [
        {
            name: "Muhammad Zhafran Ghaly",
            role: "Founder & Lead ERP Architect",
            summary: lang === 'id'
                ? "Founder FlowCreativ yang memimpin arsitektur dan pengiriman ERP. Telah mengirimkan sistem untuk Patra Jasa, People Impact, Nordenmorse, Andalan Mitra Guna, dan SaaSquatch."
                : "Founder of FlowCreativ leading ERP architecture and delivery. Delivered systems for Patra Jasa, People Impact, Nordenmorse, Andalan Mitra Guna, and SaaSquatch.",
            image: "/ghaly.png"
        },
        {
            name: "Bima Surya Nurwahid",
            role: "Full-Stack & Mobile Developer",
            summary: lang === 'id'
                ? "Pengembang full-stack dan mobile yang membangun produk skalabel dan platform internal. Telah mengirimkan solusi absensi pengenalan wajah dan sistem multi-CMS."
                : "Full-stack and mobile developer building scalable products and internal platforms. Delivered face recognition attendance solutions and multi‑CMS systems.",
            image: "/bima.jpg"
        },
        {
            name: "Benediktus Satriya",
            role: "Backend Developer",
            summary: lang === 'id'
                ? "Pengembang backend dengan pengalaman enterprise di CIMB Niaga, Sinarmas, dan Telkomsel By.U."
                : "Backend developer with enterprise experience across CIMB Niaga, Sinarmas, and Telkomsel By.U.",
            image: "/bene.png"
        }
    ]

    return (
        <main className="min-h-screen pt-24 pb-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900">{about.title}</h1>
                    <p className="text-xl text-neutral-600">
                        {about.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
                        <div className="p-6 rounded-2xl bg-white border border-neutral-200">
                            <h3 className="text-xl font-semibold mb-4 text-neutral-900">{about.missionTitle}</h3>
                            <p className="text-neutral-600">{about.missionDescription}</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white border border-neutral-200">
                            <h3 className="text-xl font-semibold mb-4 text-neutral-900">{about.visionTitle}</h3>
                            <p className="text-neutral-600">{about.visionDescription}</p>
                        </div>
                    </div>

                    <div className="pt-8">
                        <Link href={`/${lang}/contact`}>
                            <Button variant="pill" size="lg" className="h-12 px-8">
                                {about.ctaButton}
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>

            <section className="mt-20">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">
                        {about.teamTitle}
                    </h2>
                    <p className="text-neutral-600">
                        {about.teamDescription}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member, index) => (
                        <TeamCard
                            key={index}
                            name={member.name}
                            role={member.role}
                            summary={member.summary}
                            image={member.image}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}
