import type { Metadata } from "next"
import type React from "react"

import type { Locale } from "@/i18n-config"
import { createToolMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  return createToolMetadata({
    lang,
    toolName: "Odoo Module Recommender",
    slug: "/tools/odoo-module-recommender",
  })
}

export default function OdooModuleRecommenderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
