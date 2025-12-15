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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center">
          <Image
            src="/logo.png"
            alt="FlowCreativ Logo"
            width={400}
            height={100}
            className="h-16 md:h-24 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href={`/${lang}`} className="text-sm text-white/80 hover:text-white transition-colors">
            {dictionary.home}
          </Link>
          <Link href={`/${lang}/about`} className="text-sm text-white/80 hover:text-white transition-colors">
            {dictionary.about}
          </Link>
          <Link href={`/${lang}/services`} className="text-sm text-white/80 hover:text-white transition-colors">
            {dictionary.services}
          </Link>
          <Link href={`/${lang}/portfolio`} className="text-sm text-white/80 hover:text-white transition-colors">
            {dictionary.portfolio}
          </Link>
          <Link href={`/${lang}/blog`} className="text-sm text-white/80 hover:text-white transition-colors">
            {dictionary.blog}
          </Link>
          <Link href={`/${lang}/faq`} className="text-sm text-white/80 hover:text-white transition-colors">
            {dictionary.faq}
          </Link>
          <Link href={`/${lang}/contact`} className="text-sm text-white/80 hover:text-white transition-colors">
            {dictionary.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            <Link href={switchLanguage("en")} className={`${lang === "en" ? "text-white" : "text-white/50 hover:text-white"}`}>EN</Link>
            <span className="text-white/20">|</span>
            <Link href={switchLanguage("id")} className={`${lang === "id" ? "text-white" : "text-white/50 hover:text-white"}`}>ID</Link>
          </div>
          <Link href={`/${lang}/contact`}>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">{dictionary.getStarted}</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
