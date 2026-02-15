import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-semibold text-neutral-900 text-center mb-12">Frequently Asked Questions</h1>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    <AccordionItem value="item-1" className="border border-neutral-200 rounded-lg px-4 bg-white">
                        <AccordionTrigger className="text-lg text-neutral-900 hover:no-underline">How long does a website project take?</AccordionTrigger>
                        <AccordionContent className="text-neutral-600">
                            Typically, a standard company profile website takes 1-2 weeks, while more complex e-commerce or custom web applications can take 4-8 weeks depending on the requirements.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border border-neutral-200 rounded-lg px-4 bg-white">
                        <AccordionTrigger className="text-lg text-neutral-900 hover:no-underline">Do you provide hosting and domain?</AccordionTrigger>
                        <AccordionContent className="text-neutral-600">
                            Yes, we can handle the entire setup including domain registration and cloud hosting configuration so you don't have to worry about the technical details.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border border-neutral-200 rounded-lg px-4 bg-white">
                        <AccordionTrigger className="text-lg text-neutral-900 hover:no-underline">Is the design mobile-friendly?</AccordionTrigger>
                        <AccordionContent className="text-neutral-600">
                            Absolutely. All our designs are "Mobile-First" and fully responsive, ensuring they look perfect on smartphones, tablets, and desktops.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border border-neutral-200 rounded-lg px-4 bg-white">
                        <AccordionTrigger className="text-lg text-neutral-900 hover:no-underline">What is your payment structure?</AccordionTrigger>
                        <AccordionContent className="text-neutral-600">
                            We typically require a 50% deposit to start the project, with the remaining 50% due upon completion and your final approval before launch.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </main>
    )
}
