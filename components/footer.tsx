import Link from "next/link"

export default function Footer({ dictionary, lang }: { dictionary: any; lang: string }) {
  return (
    <footer className="bg-black border-t border-white/10 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">FlowCreativ</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              {dictionary.description}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-white">{dictionary.mainServices}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href={`/${lang}/services`} className="hover:text-white transition-colors">
                  IT Consulting
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-white transition-colors">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-white transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-white transition-colors">
                  Odoo ERP
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">{dictionary.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href={`/${lang}/about`} className="hover:text-white transition-colors">
                  {dictionary.quickLinks}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/portfolio`} className="hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/blog`} className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/careers`} className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/faq`} className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">{dictionary.contact}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Email: zhafrang638@gmail.com</li>
              <li>Phone: +62 851-6191-7939</li>
              <li className="flex gap-4 mt-4">
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/60">
          <p>{dictionary.rights}</p>
        </div>
      </div>
    </footer>
  )
}
