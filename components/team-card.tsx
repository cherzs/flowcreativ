"use client"

import { useMemo, useState } from "react"

type TeamCardProps = {
  name: string
  role: string
  summary: string
  image?: string
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export default function TeamCard({ name, role, summary, image }: TeamCardProps) {
  const [imageError, setImageError] = useState(false)
  const initials = useMemo(() => getInitials(name), [name])

  return (
    <article className="rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="p-6 text-center">
        <div className="mx-auto h-28 w-28 rounded-full ring-2 ring-neutral-200/80 p-1">
          <div className="h-full w-full overflow-hidden rounded-full bg-neutral-100">
            {image && !imageError ? (
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
                <span className="text-2xl font-semibold text-neutral-500">{initials}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-neutral-900">{name}</h3>
          <p className="text-sm text-neutral-500">{role}</p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">{summary}</p>
        </div>

      </div>
    </article>
  )
}
