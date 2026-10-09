import countries from "world-countries"

export type CountryCode = string

export interface CountryListItem {
  code: CountryCode
  name: string
  currency: string
}

const byCode = new Map<CountryCode, CountryListItem>()

/**
 * Países con presencia de Lenio, en el orden en que se muestran
 * en el selector (Colombia primero). Cualquier país fuera de esta
 * lista no aparece en la UI y resuelve al default (USD).
 */
export const SUPPORTED_COUNTRY_CODES = [
  "CO", "PE", "EC", "MX", "CL", "DO", "PA", "CR", "BO", "PY",
  "GT", "SV", "HN", "BR", "ES", "PT", "IT", "PL", "RO", "US",
] as const

export type SiteLocale = "es" | "en" | "pt" | "it" | "pl" | "ro"

/**
 * País soportado → idioma del sitio. El selector de países es el
 * único switcher: elegir un país define moneda e idioma.
 */
const COUNTRY_SITE_LOCALE: Record<string, SiteLocale> = {
  CO: "es", PE: "es", EC: "es", MX: "es", CL: "es", DO: "es",
  PA: "es", CR: "es", BO: "es", PY: "es", GT: "es", SV: "es",
  HN: "es", ES: "es",
  US: "en",
  BR: "pt", PT: "pt",
  IT: "it",
  PL: "pl",
  RO: "ro",
}

export function localeForCountry(code: CountryCode): SiteLocale {
  return COUNTRY_SITE_LOCALE[code] ?? "en"
}

const supportedOrder = new Map<string, number>(
  SUPPORTED_COUNTRY_CODES.map((code, index) => [code, index])
)

for (const code of SUPPORTED_COUNTRY_CODES) {
  const c = countries.find((country) => country.cca2 === code)
  if (!c) continue
  const currency = Object.keys(c.currencies ?? {})[0] ?? ""
  byCode.set(c.cca2, { code: c.cca2, name: c.name.common, currency })
}

export function countryExists(code: string | null | undefined): code is CountryCode {
  return typeof code === "string" && code.length === 2 && byCode.has(code.toUpperCase())
}

export function toFlagClass(code: CountryCode): string {
  return `fi fi-${code.toLowerCase()}`
}

const SPANISH_SPEAKING_CODES = new Set<CountryCode>([
  "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "ES", "GT",
  "HN", "MX", "NI", "PA", "PE", "PY", "SV", "UY", "VE",
])

export function isSpanishSpeakingCountry(code: CountryCode): boolean {
  return SPANISH_SPEAKING_CODES.has(code.toUpperCase())
}

const displayNamesCache = new Map<string, Intl.DisplayNames>()

function getDisplayNames(locale: string): Intl.DisplayNames {
  const cached = displayNamesCache.get(locale)
  if (cached) return cached
  const names = new Intl.DisplayNames([locale], { type: "region" })
  displayNamesCache.set(locale, names)
  return names
}

export function localizedCountryList(locale: string): CountryListItem[] {
  const names = getDisplayNames(locale)
  return [...byCode.values()]
    .map((item) => {
      let name = item.name
      try {
        const localized = names.of(item.code)
        if (localized && localized !== item.code) name = localized
      } catch {
        // fallback a name.common
      }
      return { ...item, name }
    })
    .sort(
      (a, b) =>
        (supportedOrder.get(a.code) ?? Number.MAX_SAFE_INTEGER) -
        (supportedOrder.get(b.code) ?? Number.MAX_SAFE_INTEGER)
    )
}

export function detectCountryFromLocaleTag(localeString: string): CountryCode | null {
  const firstTag = localeString.split(",")[0].trim()
  const tag = firstTag.split(/[_-]/)[1]
  if (tag && countryExists(tag)) return tag.toUpperCase()
  return null
}