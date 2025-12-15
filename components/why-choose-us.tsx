import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WhyChooseUs({ dictionary, lang }: { dictionary: any; lang: string }) {
  return (
    <section className="bg-gradient-to-br from-black via-purple-950/10 to-black py-24 border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
              {dictionary.titleStart}
              <br />
              {dictionary.titleMiddle}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {dictionary.titleHighlight}
              </span>
            </h2>
            <p className="text-sm text-white/40 uppercase tracking-wider">{dictionary.subtitle}</p>
          </div>

          <div className="space-y-8">
            {dictionary.features.map((feature: any, index: number) => (
              <div key={index}>
                <h3 className="text-white text-xl font-semibold mb-2">• {feature.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}

            <Link href={`/${lang}/contact`}>
              <Button className="bg-transparent border-2 border-white/20 hover:bg-white/10 text-white mt-4">
                {dictionary.cta}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
