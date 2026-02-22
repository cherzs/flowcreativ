import type { Metadata } from 'next'

import ToolPlaceholder from '@/components/tools/tool-placeholder'
import type { Locale } from '@/i18n-config'
import { createToolMetadata, getToolSchema } from '@/lib/seo'

const copy = {
  id: {
    title: 'Digital Maturity Assessment',
    subtitle:
      'Tool ini membantu mengukur tingkat kematangan digital bisnis Anda sebelum scale implementasi.',
    note: 'Anda bisa memetakan level proses, data, dan governance untuk menentukan prioritas transformasi yang paling relevan.',
    cta: 'Jadwalkan Konsultasi ERP Gratis',
  },
  en: {
    title: 'Digital Maturity Assessment',
    subtitle:
      'This tool helps measure your digital maturity level before scaling implementation.',
    note: 'You can map process, data, and governance maturity to prioritize the most relevant transformation initiatives.',
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
    toolName: 'Digital Maturity Assessment',
    slug: '/tools/digital-maturity',
  })
}

export default async function DigitalMaturityPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  return (
    <ToolPlaceholder
      lang={lang}
      copy={copy}
      schemaId="tool-schema-digital-maturity"
      schema={getToolSchema({
        lang,
        toolName: 'Digital Maturity Assessment',
        slug: '/tools/digital-maturity',
      })}
    />
  )
}
