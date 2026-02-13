import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function PortfolioPreview({ lang, limit }: { lang: string; limit?: number }) {
  const projects = [
    {
      title: "Flowreativ Website",
      industry: "Company / Client Website",
      description: "Marketing website for Flowreativ with multi-language support and modern brand experience.",
      tech: ["Next.js", "Tailwind CSS", "Vercel"],
      image: "",
      href: "https://flowreativ.com/en",
    },
    {
      title: "SaaSquatchLeads",
      industry: "SaaS / Dashboard",
      description: "Lead generation SaaS with dashboard, automations, and modern onboarding flows.",
      tech: ["Next.js", "TypeScript", "PostgreSQL"],
      image: "",
      href: "https://www.saasquatchleads.com",
    },
    {
      title: "Trading Journal Web App",
      industry: "Trading Tools",
      description: "Browser-based trading journal to log, review, and analyze trading performance.",
      tech: ["Next.js", "React", "Vercel"],
      image: "",
      href: "https://trading-journal-nu-brown.vercel.app",
    },
    {
      title: "Kubeletto Website",
      industry: "Company / Client Website",
      description: "Company website for Kubeletto with clean, product-focused layout.",
      tech: ["Next.js", "Tailwind CSS"],
      image: "",
      href: "https://kubeletto.com",
    },
    {
      title: "Trading Assistance Tool",
      industry: "Trading Tools",
      description: "Web-based trading assistance interface to support decision-making workflows.",
      tech: ["Next.js", "React"],
      image: "",
      href: "https://trading-assistance.vercel.app",
    },
    {
      title: "Odoo ERP Instance",
      industry: "ERP / Odoo Implementation",
      description: "Self-hosted Odoo deployment tailored for business operations.",
      tech: ["Odoo", "PostgreSQL"],
      image: "",
      href: "http://77.237.240.156:8069",
    },
    {
      title: "Odoo FMS Implementation",
      industry: "ERP / Odoo Implementation",
      description: "Fleet Management System built on Odoo with custom flows.",
      tech: ["Odoo", "Python"],
      image: "",
      href: "http://odoo-alb-1817820945.ap-southeast-3.elb.amazonaws.com:8018/fms",
    },
    {
      title: "CHILL.IN Website Concept",
      industry: "Brand & Landing Page Concept",
      description: "CHILL.IN brand-first website exploration focusing on visual storytelling.",
      tech: ["Next.js", "Tailwind CSS"],
      image: "",
      href: "https://v0-chill-in-website-design-vu.vercel.app",
    },
    {
      title: "CHILL.IN Landing Page v2",
      industry: "Brand & Landing Page Concept",
      description: "Alternative CHILL.IN landing page layout exploring different hero and CTA structure.",
      tech: ["Next.js", "Tailwind CSS"],
      image: "",
      href: "https://v0-chill-in-landing-page-two.vercel.app",
    },
    {
      title: "CHILL.IN Website Design",
      industry: "Brand & Landing Page Concept",
      description: "Another CHILL.IN visual direction focusing on typography and layout studies.",
      tech: ["Next.js", "Tailwind CSS"],
      image: "",
      href: "https://v0-chill-in-website-design.vercel.app",
    },
    {
      title: "Ember Roastery Landing Page",
      industry: "Landing Page / Brand Concept",
      description: "Landing page exploration for a specialty coffee roastery brand.",
      tech: ["Next.js", "Tailwind CSS"],
      image: "",
      href: "https://v0-ember-roastery-landing-page.vercel.app",
    },
    {
      title: "Flowcreativ Coffee Landing",
      industry: "Landing Page / Brand Concept",
      description: "Playful landing page concept for Flowcreativ coffee branding.",
      tech: ["Next.js", "Tailwind CSS"],
      image: "",
      href: "https://v0-flowcreativcoffe.vercel.app",
    },
    {
      title: "Luxury Glamping UI",
      industry: "Landing Page / Brand Concept",
      description: "Luxury glamping booking experience UI with premium visual direction.",
      tech: ["Next.js", "Tailwind CSS"],
      image: "",
      href: "https://luxury-glamping-ui.vercel.app/",
    },
    {
      title: "STS K9 Website Clone",
      industry: "UI Study / Clone",
      description: "UI clone study to reverse-engineer layout, spacing, and typography.",
      tech: ["Next.js", "Tailwind CSS"],
      image: "",
      href: "https://v0-stsk9-website-clone.vercel.app",
    }
  ]

  const visibleProjects = limit ? projects.slice(0, limit) : projects

  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            FEATURED{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">PROJECTS</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Delivering impactful solutions that drive business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleProjects.map((project) => (
            <Link key={project.title} href={project.href || `/${lang}/portfolio`} target="_blank">
              <Card className="bg-white/5 border-white/10 overflow-hidden hover:bg-white/10 transition-all group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                    {project.industry}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs bg-white/5 text-white/60 px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href={`/${lang}/portfolio`}>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8">View All Projects</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
