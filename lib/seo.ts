import type { Metadata } from "next"

import type { Locale } from "@/i18n-config"

const DEFAULT_SITE_URL = "https://flowreativ.com"

type ToolMetadataOptions = {
  lang: Locale
  toolName: string
  slug: string
}

type ToolSchemaOptions = {
  lang: Locale
  toolName: string
  slug: string
}

function normalizeSiteUrl(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) {
    return DEFAULT_SITE_URL
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/\/+$/, "")
  }

  return `https://${trimmed}`.replace(/\/+$/, "")
}

function normalizePath(path: string): string {
  if (!path) {
    return "/"
  }

  return path.startsWith("/") ? path : `/${path}`
}

export function getSiteUrl(): string {
  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    DEFAULT_SITE_URL,
  )
}

export function getAbsoluteUrl(path: string): string {
  return `${getSiteUrl()}${normalizePath(path)}`
}

export function createRootMetadata(lang: Locale): Metadata {
  const title =
    lang === "id"
      ? "Konsultan ERP & Automation Indonesia | FlowCreativ"
      : "ERP & Automation Consultant Indonesia | FlowCreativ"
  const description =
    lang === "id"
      ? "FlowCreativ membantu perusahaan mengimplementasikan ERP, automation, dan sistem terintegrasi untuk pertumbuhan yang scalable dan efisien."
      : "FlowCreativ helps companies implement ERP, automation, and integrated systems for scalable and efficient growth."

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    keywords: [
      "implementasi ERP Indonesia",
      "konsultan ERP Indonesia",
      "implementasi Odoo Indonesia",
      "workflow automation perusahaan",
      "digital transformation SME Indonesia",
    ],
    alternates: {
      canonical: getAbsoluteUrl(`/${lang}`),
      languages: {
        en: getAbsoluteUrl("/en"),
        id: getAbsoluteUrl("/id"),
      },
    },
    openGraph: {
      title,
      description,
      url: getAbsoluteUrl(`/${lang}`),
      siteName: "FlowCreativ",
      type: "website",
      locale: lang === "id" ? "id_ID" : "en_US",
      images: [
        {
          url: getAbsoluteUrl("/logo.png"),
        },
      ],
    },
  }
}

export function createHomeMetadata(lang: Locale): Metadata {
  const title =
    lang === "id"
      ? "Konsultan ERP & Automation Indonesia | FlowCreativ"
      : "ERP & Automation Consultant Indonesia | FlowCreativ"
  const description =
    lang === "id"
      ? "FlowCreativ membantu perusahaan mengimplementasikan ERP, automation, dan sistem terintegrasi untuk pertumbuhan yang scalable dan efisien."
      : "FlowCreativ helps companies implement ERP, automation, and integrated systems for scalable and efficient growth."

  return {
    title,
    description,
    keywords: [
      "jasa implementasi ERP",
      "konsultan Odoo Indonesia",
      "jasa automation bisnis",
      "sistem terintegrasi perusahaan",
      "business process optimization",
    ],
    alternates: {
      canonical: getAbsoluteUrl(`/${lang}`),
    },
    openGraph: {
      title,
      description,
      url: getAbsoluteUrl(`/${lang}`),
      siteName: "FlowCreativ",
      type: "website",
    },
  }
}

export function createServicesMetadata(lang: Locale): Metadata {
  const title =
    lang === "id"
      ? "Layanan ERP & Automation Indonesia | FlowCreativ"
      : "ERP & Automation Services Indonesia | FlowCreativ"
  const description =
    lang === "id"
      ? "Layanan implementasi ERP, Odoo, workflow automation, dan integrasi sistem untuk perusahaan yang ingin scale operasional."
      : "ERP implementation, Odoo setup, workflow automation, and system integration services for growing companies."

  return {
    title,
    description,
    keywords: [
      "vendor ERP Indonesia",
      "implementasi Odoo Indonesia",
      "workflow automation perusahaan",
      "enterprise system integration",
    ],
    alternates: {
      canonical: getAbsoluteUrl(`/${lang}/services`),
    },
  }
}

export function createToolsHubMetadata(lang: Locale): Metadata {
  const title =
    lang === "id"
      ? "ERP & Automation Intelligence Tools | FlowCreativ"
      : "ERP & Automation Intelligence Tools | FlowCreativ"
  const description =
    lang === "id"
      ? "Gunakan assessment tools gratis kami untuk menganalisis kesiapan ERP, ROI automation, biaya implementasi, dan efisiensi workflow."
      : "Use our free assessment tools to evaluate ERP readiness, automation ROI, implementation cost, and workflow efficiency."

  return {
    title,
    description,
    keywords: [
      "ERP readiness checker",
      "automation ROI calculator",
      "ERP cost estimator online",
      "workflow efficiency analyzer",
      "digital maturity assessment tool",
    ],
    alternates: {
      canonical: getAbsoluteUrl(`/${lang}/tools`),
    },
  }
}

export function createBlogMetadata(lang: Locale): Metadata {
  const mainKeyword =
    lang === "id"
      ? "implementasi ERP Indonesia"
      : "ERP implementation Indonesia"
  const title =
    lang === "id"
      ? `${mainKeyword} - Panduan Lengkap 2026 | FlowCreativ`
      : `${mainKeyword} - Complete Guide 2026 | FlowCreativ`
  const description =
    lang === "id"
      ? "Pelajari implementasi ERP, automation, biaya, risiko, dan best practice untuk perusahaan Indonesia."
      : "Learn ERP implementation, automation strategy, costs, risks, and best practices for companies in Indonesia."

  return {
    title,
    description,
    keywords: [
      "implementasi ERP Indonesia",
      "Odoo implementation cost",
      "ERP gagal implementasi",
      "digital transformation SME Indonesia",
    ],
    alternates: {
      canonical: getAbsoluteUrl(`/${lang}/blog`),
    },
  }
}

export function createToolMetadata({
  lang,
  toolName,
  slug,
}: ToolMetadataOptions): Metadata {
  const title = `${toolName} | ERP & Automation Assessment Tool - FlowCreativ`
  const description =
    lang === "id"
      ? `Gunakan ${toolName} untuk menganalisis kesiapan bisnis Anda sebelum implementasi ERP dan automation. Gratis dan profesional.`
      : `Use ${toolName} to assess your business readiness before ERP and automation implementation. Free and professional.`

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/${lang}${normalizePath(slug)}`),
    },
    openGraph: {
      title,
      description,
      url: getAbsoluteUrl(`/${lang}${normalizePath(slug)}`),
      siteName: "FlowCreativ",
      type: "website",
    },
  }
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FlowCreativ",
    url: getSiteUrl(),
    logo: getAbsoluteUrl("/logo.png"),
    sameAs: ["https://www.linkedin.com/company/flowcreativ"],
  }
}

export function getServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "ERP Implementation",
    provider: {
      "@type": "Organization",
      name: "FlowCreativ",
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
  }
}

export function getBlogFaqSchema(lang: Locale) {
  const questions =
    lang === "id"
      ? [
        {
          q: "Berapa biaya implementasi ERP?",
          a: "Biaya implementasi ERP tergantung kompleksitas, jumlah user, dan kebutuhan kustomisasi.",
        },
        {
          q: "Kapan perusahaan sebaiknya mulai ERP?",
          a: "Saat proses lintas departemen mulai tidak terintegrasi, reporting lambat, dan operasional masih bergantung pada proses manual.",
        },
        {
          q: "Apakah Odoo cocok untuk perusahaan berkembang?",
          a: "Odoo cocok untuk perusahaan berkembang karena modular, fleksibel, dan dapat dikustomisasi sesuai kebutuhan operasional.",
        },
      ]
      : [
        {
          q: "How much does ERP implementation cost?",
          a: "ERP implementation cost depends on complexity, user count, and customization requirements.",
        },
        {
          q: "When should a company start ERP implementation?",
          a: "When cross-department processes are no longer integrated, reporting is slow, and operations still rely on manual workflows.",
        },
        {
          q: "Is Odoo suitable for growing companies?",
          a: "Odoo is suitable for growing companies because it is modular, flexible, and customizable for operational needs.",
        },
      ]

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }
}

export function getToolSchema({ lang, toolName, slug }: ToolSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: toolName,
    url: getAbsoluteUrl(`/${lang}${normalizePath(slug)}`),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
  }
}
