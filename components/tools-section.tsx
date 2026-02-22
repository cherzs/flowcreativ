import Link from 'next/link'
import { Boxes, Calculator, ClipboardCheck, Server, Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type ToolCardItem = {
  title: string
  description: string
  cta: string
  href: string
}

type ToolsSectionDictionary = {
  eyebrow?: string
  title: string
  subtitle: string
  exploreDescription?: string
  exploreCta?: string
  exploreHref?: string
  featuredItems?: ToolCardItem[]
  items: ToolCardItem[]
}

const toolIcons = [Boxes, ClipboardCheck, Calculator, Settings, Server]

function getLocalizedHref(lang: string, href: string): string {
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

export default function ToolsSection({
  dictionary,
  lang,
}: {
  dictionary: ToolsSectionDictionary
  lang: string
}) {
  const featuredTools =
    dictionary.featuredItems && dictionary.featuredItems.length > 0
      ? dictionary.featuredItems
      : dictionary.items.slice(0, 3)

  return (
    <section className="border-b border-border bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 space-y-4">
          {dictionary.eyebrow ? (
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {dictionary.eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            {dictionary.title}
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {dictionary.subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredTools.map((item, index) => {
            const Icon = toolIcons[index] || Boxes

            return (
              <Card
                key={item.title}
                className="h-full border-border/70 bg-card/80 shadow-[0_12px_30px_rgba(17,17,17,0.06)]"
              >
                <CardHeader>
                  <div className="mb-2 inline-flex size-10 items-center justify-center rounded-full border border-border bg-muted/60">
                    <Icon className="size-5 text-foreground" />
                  </div>
                  <CardTitle className="text-xl leading-snug">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link href={getLocalizedHref(lang, item.href)}>{item.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {dictionary.exploreCta ? (
          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-border/70 bg-card/60 p-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {dictionary.exploreDescription}
            </p>
            <Button asChild className="w-full md:w-auto">
              <Link href={getLocalizedHref(lang, dictionary.exploreHref ?? '/tools')}>
                {dictionary.exploreCta}
              </Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
