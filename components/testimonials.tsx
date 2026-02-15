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
    <section className="bg-white py-24 border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-3">
            Client{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
              Stories
            </span>
          </h2>
          <p className="text-neutral-600 text-base md:text-lg max-w-2xl">
            Hear what our clients say about working with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-neutral-200 shadow-sm">
              <CardContent className="p-8">
                <div className="text-purple-500 text-4xl mb-4">"</div>
                <p className="text-neutral-700 mb-6 leading-relaxed">{testimonial.quote}</p>
                <div>
                  <p className="text-neutral-900 font-semibold">{testimonial.author}</p>
                  <p className="text-neutral-500 text-sm">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
