import { getDictionary } from '@/lib/get-dictionary'
import { type Locale } from '@/i18n-config'
import { ContactForm } from '@/components/contact/contact-form'
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {dictionary.contact.title}
            </h1>
            <p className="text-xl text-white/60">
              {dictionary.contact.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column: Contact Info */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-purple-400" />
                  {dictionary.contact.info.title}
                </h3>
                <div className="space-y-4 text-white/80">
                  <a
                    href={`mailto:${dictionary.contact.info.email}`}
                    className="flex items-center gap-3 hover:text-purple-400 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {dictionary.contact.info.email}
                  </a>
                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${dictionary.contact.info.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 hover:text-purple-400 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      {dictionary.contact.info.phone}
                    </a>
                    <a
                      href={`https://wa.me/${dictionary.contact.info.phone.replace(/[\s+-]/g, '')}?text=${encodeURIComponent(lang === 'id' ? 'Halo, saya tertarik dengan layanan FlowCreativ' : 'Hello, I am interested in FlowCreativ services')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-full transition-all duration-200 hover:scale-105"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </div>
                  <p className="flex items-center gap-3">
                    <MapPin className="h-4 w-4" />
                    {dictionary.contact.info.location}
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 backdrop-blur">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-400" />
                  {dictionary.contact.hours.title}
                </h3>
                <p className="text-white/60 mb-1">
                  {dictionary.contact.hours.weekdays}
                </p>
                <p className="text-white/60">
                  {dictionary.contact.hours.weekends}
                </p>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <h2 className="text-2xl font-bold mb-6">
                {dictionary.contact.form.title}
              </h2>
              <ContactForm dictionary={dictionary.contact.form} lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
