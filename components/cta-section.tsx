import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTASection({ lang }: { lang: string }) {
  return (
    <section className="bg-white py-24 border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">
              Ready to start your project?
            </h2>
            <p className="text-neutral-600 text-base md:text-lg max-w-xl">
              {"Let's build something amazing together. Get in touch for a free consultation and quote."}
            </p>
          </div>
          <div className="border border-neutral-200 rounded-2xl p-8">
            <h3 className="text-neutral-900 text-lg font-semibold mb-2">Start a Project</h3>
            <p className="text-neutral-600 text-sm mb-6">
              Tell us about your goals and we will get back within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${lang}/contact`}>
                <Button variant="pill" size="lg" className="h-12 px-8 text-base">
                  Get a Free Quote
                </Button>
              </Link>
              <Link href={`/${lang}/contact`}>
                <Button
                  size="lg"
                  variant="pillOutline"
                  className="h-12 px-8 text-base"
                >
                  Schedule a Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
