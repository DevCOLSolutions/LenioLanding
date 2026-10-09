import { Geist_Mono, Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import "../globals.css"
import "flag-icons/css/flag-icons.min.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CountryProvider } from "@/components/country/country-provider"
import { cn } from "@/lib/utils"
import { routing } from "@/i18n/routing"
import { siteConfig } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const OG_LOCALES: Record<string, string> = {
  es: "es_CO",
  en: "en_US",
  pt: "pt_BR",
  it: "it_IT",
  pl: "pl_PL",
  ro: "ro_RO",
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })
  const url = siteConfig.url
  const isDefault = locale === routing.defaultLocale
  const basePath = isDefault ? "" : `/${locale}`
  const ogLocale = OG_LOCALES[locale] ?? OG_LOCALES[routing.defaultLocale]
  const ogAlternateLocale = routing.locales
    .filter((l) => l !== locale)
    .map((l) => OG_LOCALES[l])
    .filter(Boolean)
  const languages = Object.fromEntries([
    ...routing.locales.map((l) => [
      l,
      l === routing.defaultLocale ? `${url}/` : `${url}/${l}`,
    ]),
    ["x-default", `${url}/`],
  ])

  return {
    metadataBase: new URL(url),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: `${url}${basePath}/`,
      languages,
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: ogAlternateLocale,
      url: `${url}${basePath}/`,
      siteName: siteConfig.name,
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [
        {
          url: `${url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [`${url}${siteConfig.ogImage}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "technology",
    icons: {
      icon: "/favicon.ico",
    },
    applicationName: siteConfig.name,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()
  const tMeta = await getTranslations({ locale, namespace: "metadata" })
  const url = siteConfig.url
  const appDescription = tMeta("orgDescription")

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <CountryProvider uiLocale={locale}>{children}</CountryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: siteConfig.name,
                  url: url,
                  logo: `${url}/favicon.ico`,
                  description: appDescription,
                  email: siteConfig.contactEmail,
                },
                {
                  "@type": "WebSite",
                  name: siteConfig.name,
                  url: url,
                },
                {
                  "@type": "SoftwareApplication",
                  name: siteConfig.name,
                  applicationCategory: "EducationalApplication",
                  operatingSystem: "Web",
                  url: url,
                  description: appDescription,
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
