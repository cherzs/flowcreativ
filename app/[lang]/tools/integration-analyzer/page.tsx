import type { Metadata } from 'next'

import ToolPlaceholder from '@/components/tools/tool-placeholder'
import type { Locale } from '@/i18n-config'
import { createToolMetadata, getToolSchema } from '@/lib/seo'

const copy = {
  id: {
    title: 'Integration Analyzer',
    subtitle:
      'Tool ini membantu memetakan kompleksitas integrasi antarsistem dalam operasional perusahaan.',
    note: 'Dengan analisis ini Anda dapat memprioritaskan integrasi yang paling berdampak untuk mengurangi proses manual.',
    cta: 'Jadwalkan Konsultasi ERP Gratis',
  },
  en: {
    title: 'Integration Analyzer',
    subtitle:
      'This tool helps map cross-system integration complexity in your operations.',
    note: 'The analysis helps prioritize high-impact integrations to reduce manual work and data silos.',
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
    toolName: 'Integration Analyzer',
    slug: '/tools/integration-analyzer',
  })
}

export default async function IntegrationAnalyzerPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  return (
    <ToolPlaceholder
      lang={lang}
      copy={copy}
      schemaId="tool-schema-integration-analyzer"
      schema={getToolSchema({
        lang,
        toolName: 'Integration Analyzer',
        slug: '/tools/integration-analyzer',
      })}
    />
  )
}
