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
    title: 'ERP Readiness Checker',
    subtitle:
      'Landing page ini disiapkan untuk assessment kesiapan ERP sebelum implementasi penuh.',
    note: 'Tool interaktif sedang kami finalisasi. Anda tetap bisa mulai dengan sesi konsultasi gratis.',
    cta: 'Jadwalkan Konsultasi ERP Gratis',
  },
  en: {
    title: 'ERP Readiness Checker',
    subtitle:
      'This landing page is prepared for ERP readiness assessment before full implementation.',
    note: 'The interactive tool is being finalized. You can start with a free consultation session.',
    cta: 'Book Free ERP Consultation',
  },
} as const

export default async function ERPReadinessCheckerPage({
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
