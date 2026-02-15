"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function PortfolioPreview({ lang, limit }: { lang: string; limit?: number }) {
  const projects = [
    {
      title: "SaaSquatchLeads",
      industry: "SaaS / Dashboard",
      description: "Lead generation SaaS with dashboard, automations, and modern onboarding flows.",
      image: "/SaasquatchLeads.png",
      href: "https://www.saasquatchleads.com",
    },
    {
      title: "Trading Journal Web App",
      industry: "Trading Tools",
      description: "Browser-based trading journal to log, review, and analyze trading performance.",
      image: "/tradingjournal.png",
      href: "https://trading-journal-nu-brown.vercel.app",
    },
    {
      title: "Kubeletto Website",
      industry: "Company / Client Website",
      description: "Company website for Kubeletto with clean, product-focused layout.",
      image: "/Kubeletto.png",
      href: "https://kubeletto.com",
    },
    {
      title: "Trading Assistance Tool",
      industry: "Trading Tools",
      description: "Web-based trading assistance interface to support decision-making workflows.",
      image: "/tradingassis.png",
      href: "https://trading-assistance.vercel.app",
    },
    {
      title: "Odoo ERP Instance",
      industry: "ERP / Odoo Implementation",
      description: "Self-hosted Odoo deployment tailored for business operations.",
      image: "/webportalodoo.png",
      href: "http://77.237.240.156:8069",
    },
    {
      title: "Odoo FMS Implementation",
      industry: "ERP / Odoo Implementation",
      description: "Fleet Management System built on Odoo with custom flows.",
      image: "/odooinspectportal.png",
      href: "https://e-inspection.patra-jasa.com/fms",
    },
    {
      title: "CHILL.IN Website Concept",
      industry: "Brand & Landing Page Concept",
      description: "CHILL.IN brand-first website exploration focusing on visual storytelling.",
      image: "/Chill_in.png",
      href: "https://v0-chill-in-website-design-vu.vercel.app",
    },
    {
      title: "Ember Roastery Landing Page",
      industry: "Landing Page / Brand Concept",
      description: "Landing page exploration for a specialty coffee roastery brand.",
      image: "/emberroas.png",
      href: "https://v0-ember-roastery-landing-page.vercel.app",
    },
    {
      title: "Luxury Glamping UI",
      industry: "Landing Page / Brand Concept",
      description: "Luxury glamping booking experience UI with premium visual direction.",
      image: "/serene.png",
      href: "https://luxury-glamping-ui.vercel.app/",
    },
  ]

  const items = limit ? projects.slice(0, limit) : projects
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const current = items[activeIndex]

  const titleParts = useMemo(() => current.title.split(" "), [current.title])
  const titlePrimary = titleParts[0]
  const titleSecondary = titleParts.slice(1).join(" ")

  const handleNext = () => {
    setDirection("next")
    setActiveIndex((index) => (index + 1) % items.length)
  }

  const handlePrev = () => {
    setDirection("prev")
    setActiveIndex((index) => (index - 1 + items.length) % items.length)
  }

  return (
    <section className="relative bg-white text-neutral-900 py-24 border-y border-neutral-200 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative container mx-auto px-4">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">Selected Work</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">Portfolio Highlights</h2>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1.6fr] gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-6 text-neutral-500 text-sm uppercase tracking-[0.3em]">
              <span className="text-purple-600 font-semibold">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="h-px w-10 bg-neutral-300" />
              <span>{current.industry}</span>
            </div>

            <h3 className="text-5xl md:text-6xl font-semibold leading-tight">
              <span className="block text-neutral-900">{titlePrimary}</span>
              {titleSecondary ? <span className="block text-neutral-400">{titleSecondary}</span> : null}
            </h3>

            <p className="text-neutral-600 max-w-xl leading-relaxed">{current.description}</p>

            <Link
              href={current.href}
              target="_blank"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Visit Website <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="flex items-center gap-4 pt-6">
              <button
                type="button"
                onClick={handlePrev}
                className="h-12 w-12 rounded-lg border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 transition-colors"
                aria-label="Previous project"
              >
                <ArrowLeft className="h-5 w-5 mx-auto" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="h-12 w-12 rounded-lg border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 transition-colors"
                aria-label="Next project"
              >
                <ArrowRight className="h-5 w-5 mx-auto" />
              </button>

              <div className="flex items-center gap-2 ml-2">
                {items.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2 w-2 rounded-full ${index === activeIndex ? "bg-purple-600" : "bg-neutral-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              key={`${current.title}-${activeIndex}`}
              className={`relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200 ${
                direction === "next" ? "portfolio-slide-in-right" : "portfolio-slide-in-left"
              }`}
            >
              <Image
                src={current.image}
                alt={current.title}
                width={1200}
                height={800}
                className="w-full h-[360px] md:h-[420px] object-cover"
                priority
              />
            </div>

            <div className="absolute bottom-4 right-4 text-xs uppercase tracking-[0.35em] text-neutral-500">
              {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
