import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer({
  dictionary,
  contact,
  lang,
}: {
  dictionary: any
  contact: any
  lang: string
}) {
  return (
    <footer className="bg-white border-t border-neutral-200 text-neutral-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">FlowCreativ</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {dictionary.description}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-neutral-900">{dictionary.mainServices}</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link href={`/${lang}/services`} className="hover:text-neutral-900 transition-colors">
                  IT Consulting
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-neutral-900 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-neutral-900 transition-colors">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-neutral-900 transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-neutral-900 transition-colors">
                  Odoo ERP
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-neutral-900">{dictionary.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link href={`/${lang}/about`} className="hover:text-neutral-900 transition-colors">
                  {dictionary.quickLinks}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/portfolio`} className="hover:text-neutral-900 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/blog`} className="hover:text-neutral-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/careers`} className="hover:text-neutral-900 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/faq`} className="hover:text-neutral-900 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-neutral-900 flex items-center gap-2">
              <Mail className="h-4 w-4 text-purple-600" />
              {contact.info.title}
            </h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>
                <a
                  href={`mailto:${contact.info.email}`}
                  className="flex items-center gap-3 hover:text-purple-600 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {contact.info.email}
                </a>
              </li>
              <li className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${contact.info.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 hover:text-purple-600 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {contact.info.phone}
                </a>
                <a
                  href={`https://wa.me/${contact.info.phone.replace(/[\s+-]/g, '')}?text=${encodeURIComponent(
                    lang === "id"
                      ? "Halo, saya tertarik dengan layanan FlowCreativ"
                      : "Hello, I am interested in FlowCreativ services"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-medium rounded-full transition-all duration-200"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                {contact.info.location}
              </li>
              <li className="flex items-center gap-4 pt-2">
                <a
                  href="https://www.linkedin.com/company/flow-creativ/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/flowcreativconsultant/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900 transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-8 pt-8 text-center text-sm text-neutral-500">
          <p>{dictionary.rights}</p>
        </div>
      </div>
    </footer>
  )
}
