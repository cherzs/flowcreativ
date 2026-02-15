import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WhyChooseUs({ dictionary, lang }: { dictionary: any; lang: string }) {
  return (
    <section className="bg-white py-24 border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-6 leading-tight">
              {dictionary.titleStart}
              <br />
              {dictionary.titleMiddle}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {dictionary.titleHighlight}
              </span>
            </h2>
            <p className="text-sm text-neutral-500 uppercase tracking-wider">{dictionary.subtitle}</p>
          </div>

          <div className="space-y-8">
            {dictionary.features.map((feature: any, index: number) => (
              <div key={index}>
                <h3 className="text-neutral-900 text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}

            <Link href={`/${lang}/contact`}>
              <Button className="bg-transparent border-2 border-neutral-300 hover:bg-neutral-100 text-neutral-900 mt-4 rounded-full">
                {dictionary.cta}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
