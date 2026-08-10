import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site"
import { routing } from "@/i18n/routing"

export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteConfig.url

  return routing.locales.map((locale) => ({
    url: `${url}/${locale === routing.defaultLocale ? "" : locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: {
      languages: {
        "es-CO": `${url}/`,
        en: `${url}/en`,
      },
    },
  }))
}
