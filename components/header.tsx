"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          TECHFORGE
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-white/80 hover:text-white transition-colors">
            HOME
          </Link>
          <Link href="/about" className="text-sm text-white/80 hover:text-white transition-colors">
            ABOUT US
          </Link>
          <Link href="/services" className="text-sm text-white/80 hover:text-white transition-colors">
            SERVICES
          </Link>
          <Link href="/portfolio" className="text-sm text-white/80 hover:text-white transition-colors">
            PORTFOLIO
          </Link>
          <Link href="/blog" className="text-sm text-white/80 hover:text-white transition-colors">
            BLOG
          </Link>
          <Link href="/faq" className="text-sm text-white/80 hover:text-white transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="text-sm text-white/80 hover:text-white transition-colors">
            CONTACT
          </Link>
        </nav>

        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">Get Started</Button>
      </div>
    </header>
  )
}
