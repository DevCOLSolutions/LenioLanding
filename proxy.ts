import createMiddleware from "next-intl/middleware"
import { NextResponse, NextRequest } from "next/server"
import { routing } from "./i18n/routing"
import { COUNTRY_COOKIE_NAME } from "@/lib/country/cookies"
import {
  countryExists,
  detectCountryFromLocaleTag,
  isSpanishSpeakingCountry,
} from "@/lib/country/countries"

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  // Definir el país desde la cookie o desde Accept-Language
  const existing = request.cookies.get(COUNTRY_COOKIE_NAME)?.value
  const acceptLanguage = request.headers.get("accept-language") ?? ""
  const country =
    existing && countryExists(existing)
      ? existing
      : (detectCountryFromLocaleTag(acceptLanguage) ?? undefined)

  // Forzar el idioma según el país: hispanohablantes → es, resto → en
  const targetLocale = country && isSpanishSpeakingCountry(country) ? "es" : "en"
  const localizedRequest = new NextRequest(request.url, {
    headers: {
      ...Object.fromEntries(request.headers),
      "accept-language": targetLocale,
    },
  })

  const response = intlMiddleware(localizedRequest) as NextResponse

  if (!existing || !countryExists(existing)) {
    const detected = detectCountryFromLocaleTag(acceptLanguage)
    if (detected) {
      response.cookies.set(COUNTRY_COOKIE_NAME, detected, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      })
    }
  }

  return response
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
}