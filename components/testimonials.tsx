import { Card, CardContent } from "@/components/ui/card"

export default function Testimonials({ dictionary }: { dictionary: any }) {
  const testimonials = dictionary.items

  return (
    <section className="bg-white py-24 border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">{dictionary.label}</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-3">
            {dictionary.titleStart}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
              {dictionary.titleHighlight}
            </span>
          </h2>
          <p className="text-neutral-600 text-base md:text-lg max-w-2xl">
            {dictionary.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial: any, index: number) => (
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
