import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero({ dictionary, lang }: { dictionary: any; lang: string }) {
  return (
    <section className="relative min-h-screen flex items-center bg-white border-b border-neutral-200">
      <div className="container mx-auto px-4 py-28 md:py-32">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-900 leading-[1.1] tracking-tight">
            <span className="block">{dictionary.titleStart}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
              {dictionary.titleHighlight}
            </span>
            <span className="block">{dictionary.titleEnd}</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 mt-5 mb-9 leading-relaxed max-w-2xl">
            {dictionary.description}
          </p>
          <Link href={`/${lang}/contact`}>
            <Button variant="pill" size="lg" className="h-12 px-10 text-base">
              {dictionary.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
