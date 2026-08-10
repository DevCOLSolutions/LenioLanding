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
      languages: {
        "es-CO": `${url}/`,
        en: `${url}/en`,
        "x-default": `${url}/`,
      },
    },
    openGraph: {
      type: "website",
      locale: "es_CO",
      alternateLocale: ["en_US"],
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
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              logo: `${siteConfig.url}/favicon.ico`,
              description: "CETI OS",
              email: siteConfig.contactEmail,
            }),
          }}
        />
      </body>
    </html>
  )
}
