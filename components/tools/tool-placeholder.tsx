import Link from 'next/link'

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

type ToolPlaceholderCopy = {
  title: string
  subtitle: string
  note: string
  cta: string
}

type ToolPlaceholderProps = {
  lang: Locale
  copy: Record<Locale, ToolPlaceholderCopy>
  schema?: Record<string, unknown>
  schemaId?: string
}

export default function ToolPlaceholder({
  lang,
  copy,
  schema,
  schemaId,
}: ToolPlaceholderProps) {
  const localizedCopy = copy[lang] ?? copy.en

  return (
    <>
      {schema ? <JsonLd id={schemaId} data={schema} /> : null}
      <main className="min-h-screen bg-background px-4 pb-14 pt-24 text-foreground">
        <div className="container mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{localizedCopy.title}</CardTitle>
              <CardDescription>{localizedCopy.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {localizedCopy.note}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/${lang}/contact`}>{localizedCopy.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  )
}
