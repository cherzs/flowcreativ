"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function Header({ dictionary, lang }: { dictionary: any; lang: string }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const switchLanguage = (newLang: string) => {
    if (!pathname) return "/"
    const segments = pathname.split("/")
    segments[1] = newLang
    return segments.join("/")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-lg border-b border-neutral-200" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center">
          <Image
            src="/logo.png"
            alt="FlowCreativ Logo"
            width={400}
            height={100}
            className="h-12 md:h-16 w-auto object-contain invert"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href={`/${lang}`}
            className={`text-sm tracking-wide transition-colors ${
              "text-neutral-700 hover:text-neutral-900"
            }`}
          >
            {dictionary.home}
          </Link>
          <Link
            href={`/${lang}/about`}
            className={`text-sm tracking-wide transition-colors ${
              "text-neutral-700 hover:text-neutral-900"
            }`}
          >
            {dictionary.about}
          </Link>
          <Link
            href={`/${lang}/services`}
            className={`text-sm tracking-wide transition-colors ${
              "text-neutral-700 hover:text-neutral-900"
            }`}
          >
            {dictionary.services}
          </Link>
          <Link
            href={`/${lang}/portfolio`}
            className={`text-sm tracking-wide transition-colors ${
              "text-neutral-700 hover:text-neutral-900"
            }`}
          >
            {dictionary.portfolio}
          </Link>
          <Link
            href={`/${lang}/blog`}
            className={`text-sm tracking-wide transition-colors ${
              "text-neutral-700 hover:text-neutral-900"
            }`}
          >
            {dictionary.blog}
          </Link>
          <Link
            href={`/${lang}/faq`}
            className={`text-sm tracking-wide transition-colors ${
              "text-neutral-700 hover:text-neutral-900"
            }`}
          >
            {dictionary.faq}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className={`text-sm tracking-wide transition-colors ${
              "text-neutral-700 hover:text-neutral-900"
            }`}
          >
            {dictionary.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            <a
              href={switchLanguage("en")}
              className={
                lang === "en"
                  ? "text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-900"
              }
            >
              EN
            </a>
            <span className="text-neutral-300">|</span>
            <a
              href={switchLanguage("id")}
              className={
                lang === "id"
                  ? "text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-900"
              }
            >
              ID
            </a>
          </div>
          <Link href={`/${lang}/contact`}>
            <Button variant="pill" size="default" className="h-10 px-6">
              {dictionary.getStarted}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
