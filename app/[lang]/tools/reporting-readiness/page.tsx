import type { Metadata } from 'next'

import ToolPlaceholder from '@/components/tools/tool-placeholder'
import type { Locale } from '@/i18n-config'
import { createToolMetadata, getToolSchema } from '@/lib/seo'

const copy = {
  id: {
    title: 'Reporting Readiness Assessment',
    subtitle:
      'Assessment ini membantu mengevaluasi kesiapan data dan struktur pelaporan untuk kebutuhan dashboard manajemen.',
    note: 'Anda dapat memetakan gap kualitas data, konsistensi metrik, dan kebutuhan integrasi sebelum membangun reporting stack.',
    cta: 'Jadwalkan Konsultasi ERP Gratis',
  },
  en: {
    title: 'Reporting Readiness Assessment',
    subtitle:
      'This assessment evaluates data and reporting structure readiness for management dashboards.',
    note: 'It helps map data quality gaps, metric consistency, and integration requirements before building a reporting stack.',
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
    toolName: 'Reporting Readiness Assessment',
    slug: '/tools/reporting-readiness',
  })
}

export default async function ReportingReadinessPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  return (
    <ToolPlaceholder
      lang={lang}
      copy={copy}
      schemaId="tool-schema-reporting-readiness"
      schema={getToolSchema({
        lang,
        toolName: 'Reporting Readiness Assessment',
        slug: '/tools/reporting-readiness',
      })}
    />
  )
}
