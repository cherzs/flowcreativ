import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/get-dictionary"

export default async function FAQPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    const dictionary = await getDictionary(lang)
    const faq = dictionary.faqPage

    return (
        <main className="min-h-screen pt-24 pb-12 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-semibold text-neutral-900 text-center mb-12">{faq.title}</h1>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faq.items.map((item: any, index: number) => (
                        <AccordionItem key={index} value={`item-${index + 1}`} className="border border-neutral-200 rounded-lg px-4 bg-white">
                            <AccordionTrigger className="text-lg text-neutral-900 hover:no-underline">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-neutral-600">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </main>
    )
}
