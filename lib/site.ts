export const siteConfig = {
  name: "Lenio",
  brand: "CETI OS",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://uselenio.com",
  ogImage: "/opengraph-image.png",
  localeDefault: "es",
  locales: ["es", "en"] as const,
  contactEmail: "hola@lenio.co",
  defaultCountry: "US" as const,
}

export type SiteConfig = typeof siteConfig

export const DEFAULT_COUNTRY_CODE = siteConfig.defaultCountry
