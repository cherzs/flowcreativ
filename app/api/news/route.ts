import { NextResponse } from "next/server"

import { i18n, type Locale } from "@/i18n-config"
import { getOfficialNewsSources, getPaginatedCuratedNews } from "@/lib/news"

export const revalidate = 300

function getLocale(value: string | null): Locale {
  if (value && i18n.locales.includes(value as Locale)) {
    return value as Locale
  }

  return i18n.defaultLocale
}

function getLimit(value: string | null): number {
  if (!value) {
    return 12
  }

  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed)) {
    return 12
  }

  return Math.min(Math.max(parsed, 1), 24)
}

function getPage(value: string | null): number {
  if (!value) {
    return 1
  }

  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed)) {
    return 1
  }

  return Math.max(parsed, 1)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = getLocale(searchParams.get("lang"))
  const page = getPage(searchParams.get("page"))
  const pageSize = getLimit(searchParams.get("pageSize") ?? searchParams.get("limit"))

  const paginatedNews = await getPaginatedCuratedNews({ lang, page, pageSize })
  const officialSources = getOfficialNewsSources(lang)

  return NextResponse.json({
    items: paginatedNews.items,
    officialSources,
    meta: {
      lang,
      count: paginatedNews.items.length,
      page: paginatedNews.page,
      pageSize: paginatedNews.pageSize,
      totalItems: paginatedNews.totalItems,
      totalPages: paginatedNews.totalPages,
      hasPreviousPage: paginatedNews.hasPreviousPage,
      hasNextPage: paginatedNews.hasNextPage,
      fetchedAt: new Date().toISOString(),
    },
  })
}
