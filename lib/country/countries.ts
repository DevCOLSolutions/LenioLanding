import countries from "world-countries"

export type CountryCode = string

export interface CountryListItem {
  code: CountryCode
  name: string
  currency: string
}

const byCode = new Map<CountryCode, CountryListItem>()

for (const c of countries) {
  const currency = Object.keys(c.currencies ?? {})[0] ?? ""
  byCode.set(c.cca2, { code: c.cca2, name: c.name.common, currency })
}

export function countryExists(code: string | null | undefined): code is CountryCode {
  return typeof code === "string" && code.length === 2 && byCode.has(code.toUpperCase())
}

export function getCountry(code: string): CountryListItem | undefined {
  return byCode.get(code.toUpperCase())
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
    .sort((a, b) => a.name.localeCompare(b.name, locale))
}

export function detectCountryFromLocaleTag(localeString: string): CountryCode | null {
  const firstTag = localeString.split(",")[0].trim()
  const tag = firstTag.split(/[_-]/)[1]
  if (tag && countryExists(tag)) return tag.toUpperCase()
  return null
}