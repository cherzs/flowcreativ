import type { MetadataRoute } from "next"

import { i18n } from "@/i18n-config"
import { getSiteUrl } from "@/lib/seo"

type RouteConfig = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
}

const ROUTES: RouteConfig[] = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" },
  { path: "/portfolio", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "daily" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools", priority: 0.9, changeFrequency: "weekly" },
  {
    path: "/tools/odoo-module-recommender",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  { path: "/tools/erp-readiness", priority: 0.9, changeFrequency: "weekly" },
  {
    path: "/tools/automation-roi-calculator",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "/tools/workflow-efficiency-analyzer",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "/tools/erp-cost-estimator",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "/tools/erp-readiness-checker",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  { path: "/tools/digital-maturity", priority: 0.7, changeFrequency: "weekly" },
  { path: "/tools/ai-readiness", priority: 0.7, changeFrequency: "weekly" },
  {
    path: "/tools/scalability-assessment",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    path: "/tools/integration-analyzer",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    path: "/tools/reporting-readiness",
    priority: 0.7,
    changeFrequency: "weekly",
  },
]

function localizedPath(lang: string, path: string): string {
  if (!path) {
    return `/${lang}`
  }
  return `/${lang}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const now = new Date()

  return ROUTES.flatMap((route) => {
    return i18n.locales.map((lang) => {
      const url = `${siteUrl}${localizedPath(lang, route.path)}`
      const alternates = Object.fromEntries(
        i18n.locales.map((locale) => [
          locale,
          `${siteUrl}${localizedPath(locale, route.path)}`,
        ]),
      )

      return {
        url,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: alternates,
        },
      }
    })
  })
}
