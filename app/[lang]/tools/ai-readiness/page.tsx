import type { Metadata } from 'next'

import ToolPlaceholder from '@/components/tools/tool-placeholder'
import type { Locale } from '@/i18n-config'
import { createToolMetadata, getToolSchema } from '@/lib/seo'

const copy = {
  id: {
    title: 'AI Readiness Assessment',
    subtitle:
      'Assessment ini mengevaluasi kesiapan data, tim, dan proses untuk mengadopsi AI secara terarah.',
    note: 'Hasil assessment membantu Anda memilih use case AI yang realistis dan bernilai bisnis tinggi.',
    cta: 'Jadwalkan Konsultasi ERP Gratis',
  },
  en: {
    title: 'AI Readiness Assessment',
    subtitle:
      'This assessment evaluates data, team, and process readiness for practical AI adoption.',
    note: 'The result helps you prioritize realistic, high-impact AI use cases aligned with business objectives.',
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
    toolName: 'AI Readiness Assessment',
    slug: '/tools/ai-readiness',
  })
}

export default async function AIReadinessPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  return (
    <ToolPlaceholder
      lang={lang}
      copy={copy}
      schemaId="tool-schema-ai-readiness"
      schema={getToolSchema({
        lang,
        toolName: 'AI Readiness Assessment',
        slug: '/tools/ai-readiness',
      })}
    />
  )
}
