import { DEFAULT_COUNTRY_CODE } from "@/lib/site"
import { countryExists, getCountry, type CountryCode } from "./countries"

export type PricingRegion = "latam" | "us" | "europe" | "other"

export type PlanId = "lite" | "go" | "pro" | "school"

export interface PlanRates {
  /** Go: pago anual */
  go: number
  /** Pro: pago mensual */
  pro: number
  /** School: mensual por plaza */
  school: number
}

/**
 * Precios de cabecera por moneda.
 *  - go     = pago anual (el ≈ mensual se calcula como Math.round(go / 12))
 *  - pro    = pago mensual (el anual se calcula como pro * 12)
 *  - school = mensual por plaza (el anual se calcula como school * 12)
 * El ancla son los precios en COP (Go $20.000/año · Pro $30.000/mes · School $12.900/plaza/mes);
 * el resto son equivalentes redondeados aproximados.
 */
export const PLAN_RATES: Record<string, PlanRates> = {
  COP: { go: 20000, pro: 30000, school: 12900 },
  USD: { go: 5, pro: 7, school: 3 },
  MXN: { go: 90, pro: 130, school: 56 },
  ARS: { go: 6000, pro: 9000, school: 3900 },
  CLP: { go: 4900, pro: 7500, school: 3200 },
  PEN: { go: 19, pro: 27, school: 12 },
  UYU: { go: 210, pro: 290, school: 125 },
  BRL: { go: 27, pro: 40, school: 17 },
  EUR: { go: 5, pro: 6, school: 3 },
  GBP: { go: 4, pro: 6, school: 3 },
  CHF: { go: 4, pro: 6, school: 3 },
}

export function planRateForCurrency(currency: string): PlanRates {
  return PLAN_RATES[currency] ?? PLAN_RATES.USD
}

export function monthlyGoRate(rates: PlanRates): number {
  return Math.round(rates.go / 12)
}

export function annualProRate(rates: PlanRates): number {
  return rates.pro * 12
}

export function annualSchoolRate(rates: PlanRates): number {
  return rates.school * 12
}

interface RegionConfig {
  defaultCurrency: string
  currencies: string[]
}

/**
 * El país → región → moneda → precio.
 * `currencies` lista las monedas soportadas para mostrar precios locales.
 */
export const REGIONS: Record<PricingRegion, RegionConfig> = {
  latam: {
    defaultCurrency: "COP",
    currencies: ["COP", "ARS", "CLP", "MXN", "PEN", "UYU", "BRL", "USD"],
  },
  us: {
    defaultCurrency: "USD",
    currencies: ["USD"],
  },
  europe: {
    defaultCurrency: "EUR",
    currencies: ["EUR", "GBP", "CHF"],
  },
  other: {
    defaultCurrency: "USD",
    currencies: ["USD"],
  },
}

const LATAM_CODES = new Set([
  "AR", "BO", "BR", "CL", "CO", "CR", "CU", "DO", "EC", "GT", "HN",
  "MX", "NI", "PA", "PY", "PE", "SV", "UY", "VE",
])

const EUROPE_CODES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "CH", "NO", "IS", "IE",
])

const COUNTRY_LOCALES: Record<string, string> = {
  CO: "es-CO", MX: "es-MX", CL: "es-CL", AR: "es-AR", PE: "es-PE",
  UY: "es-UY", EC: "es-EC", CR: "es-CR", DO: "es-DO", GT: "es-GT",
  HN: "es-HN", SV: "es-SV", NI: "es-NI", PA: "es-PA", BO: "es-BO",
  PY: "es-PY", VE: "es-VE", US: "en-US", CA: "en-CA", ES: "es-ES",
  GB: "en-GB",
}

const REGION_DEFAULT_LOCALE: Record<PricingRegion, string> = {
  latam: "es-CO",
  us: "en-US",
  europe: "es-ES",
  other: "en-US",
}

function regionForCountry(code: CountryCode): {
  region: PricingRegion
  currency: string
  locale: string
} {
  let region: PricingRegion
  if (LATAM_CODES.has(code)) {
    region = "latam"
  } else if (code === "US" || code === "CA") {
    region = "us"
  } else if (EUROPE_CODES.has(code)) {
    region = "europe"
  } else {
    region = "other"
  }

  const datasetCurrency = getCountry(code)?.currency
  const regionConfig = REGIONS[region]
  const currency =
    datasetCurrency && regionConfig.currencies.includes(datasetCurrency)
      ? datasetCurrency
      : regionConfig.defaultCurrency

  return {
    region,
    currency,
    locale: COUNTRY_LOCALES[code] ?? REGION_DEFAULT_LOCALE[region],
  }
}

export interface CountrySelection {
  code: CountryCode
  region: PricingRegion
  currency: string
  locale: string
}

export function resolveSelection(
  rawCode: string | null | undefined
): CountrySelection {
  const code =
    rawCode && countryExists(rawCode)
      ? rawCode.toUpperCase()
      : DEFAULT_COUNTRY_CODE

  const { region, currency, locale } = regionForCountry(code)

  return { code, region, currency, locale }
}

export function formatAmount(
  amount: number,
  selection: CountrySelection
): string {
  return new Intl.NumberFormat(selection.locale, {
    style: "currency",
    currency: selection.currency,
    currencyDisplay: "narrowSymbol",
  }).format(amount)
}