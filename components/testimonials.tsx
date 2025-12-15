import { Card, CardContent } from "@/components/ui/card"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "TechForge transformed our outdated systems into a modern, scalable platform. Their expertise in cloud architecture saved us 40% in operational costs.",
      author: "Sarah Johnson",
      role: "CTO, RetailCorp",
    },
    {
      quote:
        "The team delivered our mobile app ahead of schedule with exceptional quality. Their agile approach kept us informed every step of the way.",
      author: "Michael Chen",
      role: "Founder, HealthTech Solutions",
    },
    {
      quote:
        "Outstanding Odoo implementation! They understood our complex workflows and delivered a solution that improved efficiency by 60%.",
      author: "Emma Williams",
      role: "Operations Director, ManufacturePro",
    },
  ]

  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            CLIENT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              TESTIMONIALS
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">Hear what our clients say about working with us</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <div className="text-purple-400 text-4xl mb-4">"</div>
                <p className="text-white/80 mb-6 leading-relaxed">{testimonial.quote}</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
