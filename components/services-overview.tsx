import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Code, Smartphone, Palette, Shield, Server, Settings } from "lucide-react"

export default function ServicesOverview({ dictionary }: { dictionary: any }) {
  const icons = [Settings, Code, Settings, Smartphone, Palette, Shield, Server, Code]

  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {dictionary.titleStart}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{dictionary.titleHighlight}</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {dictionary.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dictionary.items.map((service: any, index: number) => {
            const Icon = icons[index] || Settings // Fallback icon
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
