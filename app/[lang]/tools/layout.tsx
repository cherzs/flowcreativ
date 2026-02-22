import type { Metadata } from "next"
import type React from "react"

import type { Locale } from "@/i18n-config"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params

  return {
    title: "ERP & Automation Intelligence Tools | FlowCreativ",
    description:
      lang === "id"
        ? "Gunakan assessment tools profesional untuk menganalisis kesiapan ERP dan automation bisnis Anda."
        : "Use professional assessment tools to evaluate ERP and automation readiness for your business.",
  }
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
