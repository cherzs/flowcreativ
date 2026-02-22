import type { Metadata } from 'next'

import ToolPlaceholder from '@/components/tools/tool-placeholder'
import type { Locale } from '@/i18n-config'
import { createToolMetadata, getToolSchema } from '@/lib/seo'

const copy = {
  id: {
    title: 'Scalability Assessment',
    subtitle:
      'Tool ini mengukur kesiapan arsitektur sistem dan proses bisnis untuk mendukung pertumbuhan cepat.',
    note: 'Assessment membantu mengidentifikasi bottleneck kapasitas lebih awal agar ekspansi berjalan lebih stabil.',
    cta: 'Jadwalkan Konsultasi ERP Gratis',
  },
  en: {
    title: 'Scalability Assessment',
    subtitle:
      'This tool evaluates system architecture and process readiness to support rapid growth.',
    note: 'The assessment identifies capacity bottlenecks early so expansion can run with fewer operational risks.',
    cta: 'Book Free ERP Consultation',
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  return createToolMetadata({
    lang,
    toolName: 'Scalability Assessment',
    slug: '/tools/scalability-assessment',
  })
}

export default async function ScalabilityAssessmentPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  return (
    <ToolPlaceholder
      lang={lang}
      copy={copy}
      schemaId="tool-schema-scalability-assessment"
      schema={getToolSchema({
        lang,
        toolName: 'Scalability Assessment',
        slug: '/tools/scalability-assessment',
      })}
    />
  )
}
