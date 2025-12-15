import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTASection({ lang }: { lang: string }) {
  return (
    <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-pink-900 py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">READY TO START YOUR PROJECT?</h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          {"Let's build something amazing together. Get in touch for a free consultation and quote."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${lang}/contact`}>
            <Button size="lg" className="bg-white text-purple-900 hover:bg-white/90 px-8 text-base font-semibold">
              Get a Free Quote
            </Button>
          </Link>
          <Link href={`/${lang}/contact`}>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 text-base bg-transparent"
            >
              Schedule a Call
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
