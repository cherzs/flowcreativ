import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Hero({ dictionary, lang }: { dictionary: any; lang: string }) {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-black via-purple-950/20 to-black overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-900/30 via-pink-900/20 to-transparent" />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              {dictionary.titleStart}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {dictionary.titleHighlight}
              </span>
              <br />
              {dictionary.titleEnd}
            </h1>
            <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-xl">
              {dictionary.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${lang}/contact`}>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 text-base">
                  {dictionary.ctaPrimary}
                </Button>
              </Link>
              <Link href={`/${lang}/portfolio`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 text-base bg-transparent"
                >
                  {dictionary.ctaSecondary}
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex gap-4 mt-12">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 text-sm text-white/80">
                {dictionary.badge}
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/modern-tech-dashboard-mockup.jpg"
              alt="Technology Dashboard"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
