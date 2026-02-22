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
    toolName: "ERP Readiness Checker",
    slug: "/tools/erp-readiness",
  })
}

export default function ERPReadinessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
