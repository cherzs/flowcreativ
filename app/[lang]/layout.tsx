import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "../globals.css"
import JsonLd from "@/components/seo/json-ld"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { i18n, type Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/get-dictionary"
import { createRootMetadata, getOrganizationSchema } from "@/lib/seo"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  const metadata = createRootMetadata(lang)

  return {
    ...metadata,
    icons: {
      icon: "/logo.png",
      apple: "/logo.png",
    },
  }
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}>) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <html lang={lang}>
      <body className={`${inter.variable} ${_geistMono.variable} font-sans antialiased`}>
        <JsonLd id="organization-schema" data={getOrganizationSchema()} />
        {/* @ts-ignore */}
        <Header dictionary={dictionary.navigation} lang={lang} />
        {children}
        {/* @ts-ignore */}
        <Footer dictionary={dictionary.footer} contact={dictionary.contact} lang={lang} />
        <Analytics />
      </body>
    </html>
  )
}
