import Link from 'next/link'

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

const content = {
  id: {
    title: 'ERP Cost Estimator',
    subtitle:
      'Tool ini memberikan estimasi kasar biaya dan durasi implementasi ERP berdasarkan kompleksitas bisnis.',
    note: 'Estimator ini membantu mengurangi ketidakpastian budget sejak awal dan mempermudah perencanaan tahap implementasi.',
    cta: 'Jadwalkan Konsultasi ERP Gratis',
  },
  en: {
    title: 'ERP Cost Estimator',
    subtitle:
      'This tool provides a rough estimate of ERP implementation cost and timeline based on business complexity.',
    note: 'It helps reduce budget uncertainty early and supports better implementation planning.',
    cta: 'Book Free ERP Consultation',
  },
} as const

export default async function ERPCostEstimatorPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const copy = content[lang] ?? content.en

  return (
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
  )
}
