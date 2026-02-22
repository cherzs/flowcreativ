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
    title: 'Automation ROI Calculator',
    subtitle:
      'Landing page ini disiapkan untuk simulasi dampak finansial dan operasional dari automation.',
    note: 'Kalkulator interaktif sedang dalam tahap pengembangan. Untuk saat ini, tim kami bisa bantu hitung baseline ROI Anda.',
    cta: 'Jadwalkan Konsultasi ERP Gratis',
  },
  en: {
    title: 'Automation ROI Calculator',
    subtitle:
      'This landing page is prepared to simulate financial and operational impact from automation.',
    note: 'The interactive calculator is in progress. For now, our team can help estimate your ROI baseline.',
    cta: 'Book Free ERP Consultation',
  },
} as const

export default async function AutomationROICalculatorPage({
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
