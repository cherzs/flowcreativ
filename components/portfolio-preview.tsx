import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function PortfolioPreview({ lang }: { lang: string }) {
  const projects = [
    {
      title: "E-Commerce Platform",
      industry: "Retail",
      description: "Custom Shopify solution processing 10K+ daily transactions",
      tech: ["React", "Node.js", "PostgreSQL"],
      image: "/ecommerce-store-mockup.png",
    },
    {
      title: "Healthcare Management System",
      industry: "Healthcare",
      description: "HIPAA-compliant patient management and telemedicine platform",
      tech: ["Next.js", "AWS", "MongoDB"],
      image: "/healthcare-system-ui.png",
    },
    {
      title: "Fintech Mobile App",
      industry: "Finance",
      description: "Banking app with 500K+ active users and real-time transactions",
      tech: ["React Native", "Firebase", "Stripe"],
      image: "/fintech-banking-app.png",
    },
  ]

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
          {projects.map((project) => (
            <Card
              key={project.title}
              className="bg-white/5 border-white/10 overflow-hidden hover:bg-white/10 transition-all group"
            >
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
