import "server-only"

import type { Locale } from "@/i18n-config"

const NEWS_REVALIDATE_SECONDS = 60 * 5
const REQUEST_TIMEOUT_MS = 9_000
const MIN_NEWS_LIMIT = 1
const MAX_NEWS_LIMIT = 60
const MAX_NEWS_POOL = 120
const DEFAULT_PAGE_SIZE = 9

const TOPIC_KEYWORDS = [
  "odoo",
  "erp",
  "automation",
  "workflow",
  "ai",
  "artificial intelligence",
  "machine learning",
  "programming",
  "developer",
  "web development",
  "software engineering",
  "typescript",
  "javascript",
  "python",
  "next.js",
  "react",
  "digital transformation",
  "transformasi digital",
  "pemrograman",
  "otomasi",
]

const THE_NEWS_SEARCH_QUERY = [
  "odoo",
  "erp",
  "automation",
  "website",
  "programming",
  "ai",
  "software development",
].join(",")

type NewsSourceId =
  | "the-news-api"
  | "hacker-news"
  | "forem"
  | "stack-exchange"

export type NewsItem = {
  id: string
  title: string
  excerpt: string
  url: string
  sourceId: NewsSourceId
  sourceName: string
  publishedAt: string
  language: string
  imageUrl?: string
}

type CuratedNewsOptions = {
  lang: Locale
  limit?: number
}

export type PaginatedCuratedNewsOptions = {
  lang: Locale
  page?: number
  pageSize?: number
}

export type PaginatedCuratedNewsResult = {
  items: NewsItem[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type OfficialSource = {
  label: string
  url: string
}

type TheNewsApiArticle = {
  uuid?: string
  title?: string
  description?: string
  snippet?: string
  url?: string
  source?: string
  language?: string
  published_at?: string
  image_url?: string
}

type TheNewsApiResponse = {
  data?: TheNewsApiArticle[]
}

type HackerNewsItem = {
  id?: number
  type?: string
  title?: string
  url?: string
  score?: number
  descendants?: number
  time?: number
}

type ForemArticle = {
  id?: number
  title?: string
  description?: string
  url?: string
  published_timestamp?: string
  tag_list?: string[] | string
  cover_image?: string | null
  social_image?: string | null
}

type StackExchangeQuestion = {
  question_id?: number
  title?: string
  link?: string
  creation_date?: number
  tags?: string[]
  score?: number
  answer_count?: number
  owner?: {
    profile_image?: string
  }
}

type StackExchangeResponse = {
  items?: StackExchangeQuestion[]
}

function isRelevantTopic(text: string): boolean {
  const normalized = text.toLowerCase()
  return TOPIC_KEYWORDS.some((keyword) => normalized.includes(keyword))
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
}

function toIsoString(dateValue: string | number | Date | undefined): string {
  if (!dateValue) {
    return new Date(0).toISOString()
  }

  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) {
    return new Date(0).toISOString()
  }

  return date.toISOString()
}

function withTimeoutSignal(timeoutMs: number): AbortSignal {
  if ("timeout" in AbortSignal) {
    return AbortSignal.timeout(timeoutMs)
  }

  const controller = new AbortController()
  setTimeout(() => controller.abort(), timeoutMs)
  return controller.signal
}

async function safeFetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      signal: withTimeoutSignal(REQUEST_TIMEOUT_MS),
      next: { revalidate: NEWS_REVALIDATE_SECONDS },
    })

    if (!response.ok) {
      return null
    }

    return (await response.json()) as T
  } catch {
    return null
  }
}

function normalizeUrl(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl)
    parsed.searchParams.delete("utm_source")
    parsed.searchParams.delete("utm_medium")
    parsed.searchParams.delete("utm_campaign")
    parsed.searchParams.delete("utm_content")
    parsed.searchParams.delete("utm_term")
    return parsed.toString()
  } catch {
    return rawUrl
  }
}

function dedupeNews(items: NewsItem[]): NewsItem[] {
  const map = new Map<string, NewsItem>()

  for (const item of items) {
    const key = normalizeUrl(item.url)
    if (!map.has(key)) {
      map.set(key, item)
    }
  }

  return Array.from(map.values())
}

function sortByLatest(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

async function fetchFromTheNewsApiLanguage(
  language: "en" | "id",
  limit: number,
  token: string,
): Promise<NewsItem[]> {
  const params = new URLSearchParams({
    api_token: token,
    search: THE_NEWS_SEARCH_QUERY,
    language,
    limit: String(Math.min(Math.max(limit, 1), 20)),
  })

  const data = await safeFetchJson<TheNewsApiResponse>(
    `https://api.thenewsapi.com/v1/news/all?${params.toString()}`,
  )

  if (!data?.data?.length) {
    return []
  }

  return data.data
    .filter((article) => Boolean(article.title) && Boolean(article.url))
    .map((article, index) => ({
      id: article.uuid ?? `thenews-${language}-${index}`,
      title: stripHtml(article.title ?? ""),
      excerpt: stripHtml(
        article.description ??
          article.snippet ??
          "Latest update from The News API feed.",
      ),
      url: article.url ?? "",
      sourceId: "the-news-api" as const,
      sourceName: article.source?.trim() || "The News API",
      publishedAt: toIsoString(article.published_at),
      language: article.language ?? language,
      imageUrl: article.image_url,
    }))
}

async function fetchFromTheNewsApi(
  lang: Locale,
  limit: number,
): Promise<NewsItem[]> {
  const token = process.env.THE_NEWS_API_TOKEN
  if (!token) {
    return []
  }

  const preferredLanguage = lang === "id" ? "id" : "en"
  const fallbackLanguage = preferredLanguage === "id" ? "en" : "id"

  const primaryItems = await fetchFromTheNewsApiLanguage(
    preferredLanguage,
    limit,
    token,
  )

  if (primaryItems.length >= Math.ceil(limit * 0.6)) {
    return primaryItems.slice(0, limit)
  }

  const fallbackItems = await fetchFromTheNewsApiLanguage(
    fallbackLanguage,
    limit,
    token,
  )

  return dedupeNews([...primaryItems, ...fallbackItems]).slice(0, limit)
}

async function fetchFromHackerNews(limit: number): Promise<NewsItem[]> {
  const topStoryIds = await safeFetchJson<number[]>(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
  )

  if (!topStoryIds?.length) {
    return []
  }

  const candidateCount = clampNumber(limit * 4, 40, MAX_NEWS_POOL)
  const candidateIds = topStoryIds.slice(0, candidateCount)
  const storyPayloads = await Promise.all(
    candidateIds.map((id) =>
      safeFetchJson<HackerNewsItem>(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      ),
    ),
  )

  const stories = storyPayloads.filter(
    (story): story is HackerNewsItem =>
      Boolean(story?.id) && story?.type === "story" && Boolean(story.title),
  )

  const relevantStories = stories.filter((story) =>
    isRelevantTopic(`${story.title ?? ""} ${story.url ?? ""}`),
  )

  const rankedStories = (relevantStories.length ? relevantStories : stories).slice(
    0,
    limit,
  )

  return rankedStories.map((story) => ({
    id: String(story.id),
    title: stripHtml(story.title ?? ""),
    excerpt: `HN score ${story.score ?? 0} with ${story.descendants ?? 0} comments.`,
    url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
    sourceId: "hacker-news" as const,
    sourceName: "Hacker News",
    publishedAt: toIsoString((story.time ?? 0) * 1000),
    language: "en",
    imageUrl: undefined,
  }))
}

async function fetchFromForem(limit: number): Promise<NewsItem[]> {
  const perPage = clampNumber(limit * 2, 20, 100)
  const articles = await safeFetchJson<ForemArticle[]>(
    `https://dev.to/api/articles?per_page=${perPage}&top=7`,
  )

  if (!articles?.length) {
    return []
  }

  const relevantArticles = articles.filter((article) => {
    const tagText = Array.isArray(article.tag_list)
      ? article.tag_list.join(" ")
      : article.tag_list ?? ""

    return isRelevantTopic(
      `${article.title ?? ""} ${article.description ?? ""} ${tagText}`,
    )
  })

  return relevantArticles.slice(0, limit).map((article, index) => ({
    id: String(article.id ?? `forem-${index}`),
    title: stripHtml(article.title ?? ""),
    excerpt: stripHtml(
      article.description ?? "Practical engineering insights from DEV Community.",
    ),
    url: article.url ?? "https://dev.to",
    sourceId: "forem" as const,
    sourceName: "DEV Community",
    publishedAt: toIsoString(article.published_timestamp),
    language: "en",
    imageUrl: article.cover_image ?? article.social_image ?? undefined,
  }))
}

async function fetchFromStackExchange(limit: number): Promise<NewsItem[]> {
  const pageSize = clampNumber(limit * 2, 20, 100)
  const params = new URLSearchParams({
    order: "desc",
    sort: "activity",
    tagged: "odoo;erp;next.js;reactjs;typescript;python;artificial-intelligence",
    site: "stackoverflow",
    pagesize: String(pageSize),
  })

  const payload = await safeFetchJson<StackExchangeResponse>(
    `https://api.stackexchange.com/2.3/questions?${params.toString()}`,
  )

  if (!payload?.items?.length) {
    return []
  }

  return payload.items.slice(0, limit).map((question, index) => {
    const tags = question.tags?.join(", ") || "technology"
    return {
      id: String(question.question_id ?? `stack-${index}`),
      title: stripHtml(question.title ?? ""),
      excerpt: `Stack Overflow activity. Tags: ${tags}. Score ${question.score ?? 0}, ${question.answer_count ?? 0} answers.`,
      url: question.link ?? "https://stackoverflow.com/questions",
      sourceId: "stack-exchange" as const,
      sourceName: "Stack Overflow",
      publishedAt: toIsoString((question.creation_date ?? 0) * 1000),
      language: "en",
      imageUrl: question.owner?.profile_image,
    }
  })
}

async function getCuratedNewsPool(lang: Locale, poolLimit: number): Promise<NewsItem[]> {
  const safePoolLimit = clampNumber(poolLimit, 24, MAX_NEWS_POOL)
  const theNewsLimit = clampNumber(Math.ceil(safePoolLimit * 0.6), 12, 20)
  const sideFeedLimit = clampNumber(Math.ceil(safePoolLimit * 0.7), 12, 80)

  const [theNewsItems, hackerNewsItems, foremItems, stackExchangeItems] =
    await Promise.all([
      fetchFromTheNewsApi(lang, theNewsLimit),
      fetchFromHackerNews(sideFeedLimit),
      fetchFromForem(sideFeedLimit),
      fetchFromStackExchange(sideFeedLimit),
    ])

  const merged = dedupeNews([
    ...theNewsItems,
    ...hackerNewsItems,
    ...foremItems,
    ...stackExchangeItems,
  ])

  return sortByLatest(merged).slice(0, safePoolLimit)
}

export async function getPaginatedCuratedNews({
  lang,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: PaginatedCuratedNewsOptions): Promise<PaginatedCuratedNewsResult> {
  const safePageSize = clampNumber(pageSize, MIN_NEWS_LIMIT, 24)
  const requestedPage = Math.max(1, Math.floor(page))
  const requiredItems = requestedPage * safePageSize + safePageSize
  const poolLimit = clampNumber(requiredItems, 24, MAX_NEWS_POOL)

  const allItems = await getCuratedNewsPool(lang, poolLimit)
  const totalItems = allItems.length
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize))
  const currentPage = Math.min(requestedPage, totalPages)
  const start = (currentPage - 1) * safePageSize
  const end = start + safePageSize

  return {
    items: allItems.slice(start, end),
    page: currentPage,
    pageSize: safePageSize,
    totalItems,
    totalPages,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
  }
}

export async function getCuratedNews({
  lang,
  limit = 12,
}: CuratedNewsOptions): Promise<NewsItem[]> {
  const safeLimit = clampNumber(limit, MIN_NEWS_LIMIT, MAX_NEWS_LIMIT)
  const paginatedResult = await getPaginatedCuratedNews({
    lang,
    page: 1,
    pageSize: safeLimit,
  })

  return paginatedResult.items
}

export function getOfficialNewsSources(lang: Locale): OfficialSource[] {
  return [
    {
      label:
        lang === "id"
          ? "Odoo News (Sumber Resmi)"
          : "Odoo News (Official Source)",
      url: "https://www.odoo.com/id_ID/blog/odoo-news-5",
    },
  ]
}
