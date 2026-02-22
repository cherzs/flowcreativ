import Link from "next/link"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

import JsonLd from "@/components/seo/json-ld"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/get-dictionary"
import { getOfficialNewsSources, getPaginatedCuratedNews } from "@/lib/news"
import type { Metadata } from "next"
import { createBlogMetadata, getBlogFaqSchema } from "@/lib/seo"

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  return createBlogMetadata(lang)
}

const sourceFallbackImages = {
  "the-news-api": "/modern-tech-dashboard-mockup.jpg",
  "hacker-news": "/web-development-workspace.png",
  forem: "/ui-ux-design-studio.png",
  "stack-exchange": "/mobile-app-design.png",
} as const

function getCardImage(sourceId: keyof typeof sourceFallbackImages, imageUrl?: string) {
  if (imageUrl && /^https?:\/\//i.test(imageUrl)) {
    return imageUrl
  }

  return sourceFallbackImages[sourceId]
}

type BlogSearchParams = {
  page?: string | string[]
}

function parsePageParam(value: string | string[] | undefined): number {
  const rawValue = Array.isArray(value) ? value[0] : value
  if (!rawValue) {
    return 1
  }

  const parsed = Number.parseInt(rawValue, 10)
  if (Number.isNaN(parsed)) {
    return 1
  }

  return Math.max(parsed, 1)
}

function buildBlogPageHref(lang: Locale, page: number): string {
  if (page <= 1) {
    return `/${lang}/blog`
  }

  const params = new URLSearchParams({ page: String(page) })
  return `/${lang}/blog?${params.toString()}`
}

type PaginationSlot = number | "ellipsis-start" | "ellipsis-end"

function getPaginationSlots(currentPage: number, totalPages: number): PaginationSlot[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const slots: PaginationSlot[] = [1]
  const windowStart = Math.max(2, currentPage - 1)
  const windowEnd = Math.min(totalPages - 1, currentPage + 1)

  if (windowStart > 2) {
    slots.push("ellipsis-start")
  }

  for (let page = windowStart; page <= windowEnd; page += 1) {
    slots.push(page)
  }

  if (windowEnd < totalPages - 1) {
    slots.push("ellipsis-end")
  }

  slots.push(totalPages)
  return slots
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>
  searchParams: Promise<BlogSearchParams>
}) {
  const { lang } = await params
  const resolvedSearchParams = await searchParams
  const dictionary = await getDictionary(lang)
  const blog = dictionary.blogPage
  const currentPage = parsePageParam(resolvedSearchParams.page)

  const paginatedNews = await getPaginatedCuratedNews({
    lang,
    page: currentPage,
    pageSize: 9,
  })
  const newsItems = paginatedNews.items
  const officialSources = getOfficialNewsSources(lang)
  const paginationSlots = getPaginationSlots(
    paginatedNews.page,
    paginatedNews.totalPages,
  )

  const dateFormatter = new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", {
    dateStyle: "medium",
  })

  return (
    <main className="min-h-screen bg-background pb-16 pt-24 text-foreground">
      <JsonLd id="blog-faq-schema" data={getBlogFaqSchema(lang)} />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {blog.title}
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">{blog.description}</p>
        </div>

        <Card className="mt-10 border-border/80 bg-card/70">
          <CardHeader>
            <CardTitle className="text-xl">{blog.sourcesTitle}</CardTitle>
            <CardDescription>{blog.sourcesDescription}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {officialSources.map((source) => (
              <Button key={source.url} asChild variant="outline" size="sm">
                <Link href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.label}
                  <ExternalLink className="size-4" />
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>

        <section className="mt-12 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">{blog.latestTitle}</h2>
            <p className="text-muted-foreground">{blog.latestDescription}</p>
            <p className="text-sm text-muted-foreground">{blog.refreshIntervalNote}</p>
          </div>

          {newsItems.length ? (
            <div className="space-y-8">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {newsItems.map((item) => (
                  <Card
                    key={`${item.sourceId}-${item.id}`}
                    className="flex h-full flex-col overflow-hidden border-border/70 bg-card/85"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/70 bg-muted">
                      <img
                        src={getCardImage(item.sourceId, item.imageUrl)}
                        alt={item.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <Badge variant="secondary" className="rounded-full">
                          {item.sourceName}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {dateFormatter.format(new Date(item.publishedAt))}
                        </p>
                      </div>
                      <CardTitle className="text-lg leading-snug">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {item.excerpt}
                      </p>
                      <Button asChild variant="outline" className="w-full justify-between">
                        <Link href={item.url} target="_blank" rel="noopener noreferrer">
                          {blog.readMore}
                          <ExternalLink className="size-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {paginatedNews.totalPages > 1 ? (
                <div className="space-y-3">
                  <p className="text-center text-sm text-muted-foreground">
                    {blog.pageInfoPrefix} {paginatedNews.page} {blog.pageInfoMiddle}{" "}
                    {paginatedNews.totalPages}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {paginatedNews.hasPreviousPage ? (
                      <Button asChild variant="outline" size="sm">
                        <Link href={buildBlogPageHref(lang, paginatedNews.page - 1)}>
                          <ChevronLeft className="size-4" />
                          {blog.paginationPrevious}
                        </Link>
                      </Button>
                    ) : (
                      <Button disabled variant="outline" size="sm">
                        <ChevronLeft className="size-4" />
                        {blog.paginationPrevious}
                      </Button>
                    )}

                    {paginationSlots.map((slot) =>
                      typeof slot === "number" ? (
                        <Button
                          key={`page-${slot}`}
                          asChild
                          variant={slot === paginatedNews.page ? "default" : "outline"}
                          size="sm"
                        >
                          <Link href={buildBlogPageHref(lang, slot)}>{slot}</Link>
                        </Button>
                      ) : (
                        <span
                          key={slot}
                          className="px-2 text-sm text-muted-foreground"
                          aria-hidden="true"
                        >
                          ...
                        </span>
                      ),
                    )}

                    {paginatedNews.hasNextPage ? (
                      <Button asChild variant="outline" size="sm">
                        <Link href={buildBlogPageHref(lang, paginatedNews.page + 1)}>
                          {blog.paginationNext}
                          <ChevronRight className="size-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button disabled variant="outline" size="sm">
                        {blog.paginationNext}
                        <ChevronRight className="size-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <Card className="border-dashed border-border/80 bg-card/60">
              <CardHeader>
                <CardTitle>{blog.emptyTitle}</CardTitle>
                <CardDescription>{blog.emptyDescription}</CardDescription>
              </CardHeader>
            </Card>
          )}
        </section>
      </div>
    </main>
  )
}
