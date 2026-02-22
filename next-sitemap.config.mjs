const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://flowcreativ.com"

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: siteUrl.replace(/\/+$/, ""),
  generateRobotsTxt: false,
  outDir: "public",
  sitemapSize: 5000,
  exclude: ["/api/*", "/_next/*"],
  alternateRefs: [
    {
      href: `${siteUrl.replace(/\/+$/, "")}/en`,
      hreflang: "en",
    },
    {
      href: `${siteUrl.replace(/\/+$/, "")}/id`,
      hreflang: "id",
    },
  ],
}

export default config
