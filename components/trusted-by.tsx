"use client"

import { useEffect, useRef, type RefObject } from "react"

const MARQUEE_SPEED_PX = 70

const useMarqueeSpeed = (ref: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const updateDuration = () => {
      const distance = element.scrollWidth / 2
      if (distance > 0) {
        const duration = distance / MARQUEE_SPEED_PX
        element.style.setProperty("--marquee-duration", `${duration}s`)
      }
    }

    updateDuration()

    if (typeof ResizeObserver === "undefined") {
      return
    }

    const observer = new ResizeObserver(updateDuration)
    observer.observe(element)

    return () => observer.disconnect()
  }, [ref])
}

export default function TrustedBy({ dictionary }: { dictionary: any }) {
  const delivered = [
    { type: "image", label: "People Impact", src: "/logos/impact.png" },
    { type: "text", label: "Nordenmorse" },
    { type: "image", label: "Andalan Mitra Guna", src: "/logos/amg.jpg" },
    { type: "image", label: "Harlan Dog Training", src: "/logos/harlan_dog_training.png" },
  ]
  const contributed = [
    { type: "image", label: "Patra Jasa", src: "/logos/patra_jasa.svg" },
    { type: "image", label: "CIMB Niaga", src: "/logos/cimb_niaga.svg" },
    { type: "image", label: "Telkomsel By.U", src: "/logos/by_u.svg" },
    { type: "image", label: "Sinarmas", src: "/logos/sinarmas.svg" },
    { type: "image", label: "SaaSquatch", src: "/logos/saasquatch.png" },
  ]
  const marqueeDelivered = [...delivered, ...delivered]
  const marqueeContributed = [...contributed, ...contributed]
  const deliveredRef = useRef<HTMLDivElement>(null)
  const contributedRef = useRef<HTMLDivElement>(null)

  useMarqueeSpeed(deliveredRef)
  useMarqueeSpeed(contributedRef)

  return (
    <section className="bg-white border-y border-neutral-200 py-16">
      <div className="container mx-auto px-4">
        <p className="text-center text-neutral-500 text-xs tracking-[0.3em] uppercase mb-6">
          {dictionary.deliveredTitle}
        </p>
        <div className="trusted-marquee mb-10">
          <div className="trusted-marquee-track" ref={deliveredRef}>
            {marqueeDelivered.map((client, index) => {
              const isDuplicate = index >= delivered.length
              return (
                <div
                  key={`${client.label}-${index}`}
                  aria-hidden={isDuplicate}
                  className="flex items-center"
                >
                  {client.type === "image" ? (
                    <img
                      src={client.src}
                      alt={client.label}
                      className="h-10 md:h-12 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-neutral-600 text-2xl md:text-3xl font-semibold tracking-wide hover:text-neutral-900 transition-colors">
                      {client.label}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <p className="text-center text-neutral-500 text-xs tracking-[0.2em] uppercase mb-4">
          {dictionary.contributedTitle}
        </p>
        <p className="text-center text-neutral-500 text-sm max-w-4xl mx-auto mb-8 leading-relaxed">
          {dictionary.contributedDescription}
        </p>
        <div className="trusted-marquee">
          <div className="trusted-marquee-track reverse" ref={contributedRef}>
            {marqueeContributed.map((client, index) => {
              const isDuplicate = index >= contributed.length
              return (
                <div
                  key={`${client.label}-${index}`}
                  aria-hidden={isDuplicate}
                  className="flex items-center"
                >
                  <img
                    src={client.src}
                    alt={client.label}
                    className="h-9 md:h-11 w-auto object-contain opacity-65 hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
              )
            })}
          </div>
        </div>

        <p className="text-center text-neutral-500 text-sm mt-8">
          {dictionary.footerText}
        </p>
      </div>
    </section>
  )
}
