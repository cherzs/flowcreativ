import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
                        <p className="text-xl text-white/60">
                            Ready to start your project? Contact us today.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                                <div className="space-y-4 text-white/80">
                                    <p className="flex items-center gap-3">
                                        <span className="text-purple-500 text-xl">✉️</span> flowcreative911@gmail.com
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <span className="text-purple-500 text-xl">📱</span> +62 851-6191-7939
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <span className="text-purple-500 text-xl">📍</span> Sleman, Yogyakarta
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10">
                                <h3 className="text-xl font-bold mb-2">Office Hours</h3>
                                <p className="text-white/60">Monday - Friday: 09:00 - 17:00 WIB</p>
                                <p className="text-white/60">Saturday - Sunday: Closed</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                                    <Input id="name" placeholder="John Doe" className="bg-white/5 border-white/10" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                                    <Input id="email" type="email" placeholder="john@example.com" className="bg-white/5 border-white/10" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <Textarea id="message" placeholder="Tell us about your project..." className="min-h-[150px] bg-white/5 border-white/10" />
                                </div>

                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
