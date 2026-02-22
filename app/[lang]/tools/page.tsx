import Link from 'next/link'
import { ArrowRight, Gauge, Layers, LineChart } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
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
import { getDictionary } from '@/lib/get-dictionary'
import type { Metadata } from 'next'
import { createToolsHubMetadata } from '@/lib/seo'

type ToolHubItem = {
  title: string
  description: string
  href: string
  badge?: string
}

type ToolHubCategory = {
  title: string
  description: string
  items: ToolHubItem[]
}

type ToolsHubDictionary = {
  eyebrow?: string
  title: string
  subtitle: string
  description: string
  contactTitle: string
  contactDescription: string
  contactCta: string
  categoryCountSuffix: string
  categories: ToolHubCategory[]
}

const categoryIcons = [Gauge, LineChart, Layers]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  return createToolsHubMetadata(lang)
}

function getLocalizedHref(lang: Locale, href: string): string {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href
  }

  if (href === '/') {
    return `/${lang}`
  }

  if (href === `/${lang}` || href.startsWith(`/${lang}/`)) {
    return href
  }

  const normalizedHref = href.startsWith('/') ? href : `/${href}`
  return `/${lang}${normalizedHref}`
}

export default async function ToolsHubPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const toolsHub = dictionary.toolsHub as ToolsHubDictionary
  const cardCta = lang === 'id' ? 'Coba Sekarang' : 'Try Now'

  return (
    <main className="min-h-screen bg-background pb-16 pt-24 text-foreground">
      <div className="container mx-auto px-4">
        <section className="max-w-4xl space-y-4">
          {toolsHub.eyebrow ? (
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {toolsHub.eyebrow}
            </p>
          ) : null}
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {toolsHub.title}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {toolsHub.subtitle}
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {toolsHub.description}
          </p>
        </section>

        <section className="mt-10 space-y-10">
          {toolsHub.categories.map((category, index) => {
            const CategoryIcon = categoryIcons[index] ?? Gauge
            return (
              <div key={category.title} className="space-y-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CategoryIcon className="size-5 text-muted-foreground" />
                      <h2 className="text-2xl font-semibold">{category.title}</h2>
                    </div>
                    <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {category.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {category.items.length} {toolsHub.categoryCountSuffix}
                  </Badge>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {category.items.map((item) => (
                    <Card
                      key={item.title}
                      className="h-full border-border/70 bg-card/85 shadow-[0_12px_30px_rgba(17,17,17,0.06)]"
                    >
                      <CardHeader className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <CardTitle className="text-lg leading-snug">{item.title}</CardTitle>
                          {item.badge ? (
                            <Badge variant="secondary" className="rounded-full">
                              {item.badge}
                            </Badge>
                          ) : null}
                        </div>
                        <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent />
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full justify-between">
                          <Link href={getLocalizedHref(lang, item.href)}>
                            {cardCta}
                            <ArrowRight className="size-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </section>

        <Card className="mt-12 border-border/80 bg-card/70">
          <CardHeader>
            <CardTitle>{toolsHub.contactTitle}</CardTitle>
            <CardDescription>{toolsHub.contactDescription}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href={`/${lang}/contact`}>
                {toolsHub.contactCta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
