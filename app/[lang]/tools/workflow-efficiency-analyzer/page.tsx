import Link from 'next/link'
import type { Metadata } from 'next'

import JsonLd from '@/components/seo/json-ld'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Locale } from '@/i18n-config'
import { createToolMetadata, getToolSchema } from '@/lib/seo'

const content = {
  id: {
    title: 'Workflow Efficiency Analyzer',
    subtitle:
      'Tool ini membantu menganalisis tingkat inefficiency dalam workflow operasional perusahaan.',
    note: 'Tujuannya adalah mengidentifikasi bottleneck proses dan memetakan kebutuhan sistem yang lebih terintegrasi.',
    cta: 'Jadwalkan Konsultasi ERP Gratis',
  },
  en: {
    title: 'Workflow Efficiency Analyzer',
    subtitle:
      'This tool helps analyze inefficiency levels in your operational workflows.',
    note: 'The goal is to identify bottlenecks and map requirements for a more integrated system.',
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
    toolName: 'Workflow Efficiency Analyzer',
    slug: '/tools/workflow-efficiency-analyzer',
  })
}

export default async function WorkflowEfficiencyAnalyzerPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const copy = content[lang] ?? content.en

  return (
    <>
      <JsonLd
        id="tool-schema-workflow-efficiency"
        data={getToolSchema({
          lang,
          toolName: 'Workflow Efficiency Analyzer',
          slug: '/tools/workflow-efficiency-analyzer',
        })}
      />
      <main className="min-h-screen bg-background px-4 pt-24 pb-14 text-foreground">
        <div className="container mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{copy.title}</CardTitle>
              <CardDescription>{copy.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{copy.note}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/${lang}/contact`}>{copy.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  )
}
