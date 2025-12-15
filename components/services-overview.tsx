import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Code, Smartphone, Palette, Shield, Server, Settings } from "lucide-react"

export default function ServicesOverview() {
  const services = [
    {
      icon: Settings,
      title: "IT Consulting",
      description:
        "Strategic technology consulting to optimize your IT infrastructure and digital transformation journey.",
    },
    {
      icon: Code,
      title: "Web Development",
      description:
        "Custom web applications built with modern frameworks for scalability, performance, and user experience.",
    },
    {
      icon: Settings,
      title: "Odoo ERP",
      description: "Complete Odoo implementation, customization, and integration for streamlined business operations.",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native iOS and Android applications with beautiful interfaces and seamless functionality.",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "User-centered design solutions that combine aesthetics with intuitive user experiences.",
    },
    {
      icon: Shield,
      title: "Cyber Security",
      description: "Comprehensive security audits, penetration testing, and infrastructure protection services.",
    },
    {
      icon: Server,
      title: "Server Setup",
      description: "Cloud infrastructure design, deployment, and management for reliable, scalable operations.",
    },
    {
      icon: Code,
      title: "API Development",
      description: "RESTful and GraphQL API design and development for seamless system integrations.",
    },
  ]

  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            OUR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">SERVICES</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.title} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all group">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-white/60 leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
