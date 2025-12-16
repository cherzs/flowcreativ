import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "../globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { i18n, type Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/get-dictionary"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FlowCreativ - IT Consulting & Development Solutions",
  description: "Expert IT consulting, web development, mobile apps, and ERP solutions for growing businesses",
  generator: "v0.app",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
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
      <body className={`font-sans antialiased`}>
        {/* @ts-ignore */}
        <Header dictionary={dictionary.navigation} lang={lang} />
        {children}
        {/* @ts-ignore */}
        <Footer dictionary={dictionary.footer} lang={lang} />
        <Analytics />
      </body>
    </html>
  )
}
