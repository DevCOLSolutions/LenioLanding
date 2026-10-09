import { DEFAULT_COUNTRY_CODE } from "@/lib/site"
import { countryExists, type CountryCode } from "./countries"

export type PricingRegion = "latam" | "us" | "europe" | "other"

export type PlanId = "lite" | "go" | "pro" | "school"

export interface PlanRates {
  /** Go: pago mensual */
  go: number
  /** Pro: pago mensual */
  pro: number
  /** School: mensual por plaza */
  school: number
}

/**
 * Precios base mensuales por moneda.
 *
 * Regla de fijación (ago 2026): precio local ≈ 90% de la conversión
 * directa USD → moneda (paridad regional por poder adquisitivo),
 * redondeado a un número comercial dentro de ±5%.
 * Colombia usa su tabla propia en COP.
 *
 * La oferta anual equivale a pagar 10 meses (base × 10).
 */
export const PLAN_RATES: Record<string, PlanRates> = {
  // USD: US, EC, PA, SV
  USD: { go: 2.9, pro: 12.99, school: 7.99 },
  // Tabla propia de Colombia
  COP: { go: 4990, pro: 29900, school: 12900 },
  // MXN 16.9/USD · ×0.9 → 44/197.6/121.6
  MXN: { go: 45, pro: 199, school: 119 },
  // PEN 3.41/USD · ×0.9 → 8.9/39.86/24.52
  PEN: { go: 8.9, pro: 39.9, school: 24.5 },
  // CLP ~920/USD · ×0.9 → 2401/10757/6616
  CLP: { go: 2390, pro: 10690, school: 6690 },
  // DOP ~59/USD · ×0.9 → 154/689/424
  DOP: { go: 155, pro: 690, school: 425 },
  // CRC ~455/USD · ×0.9 → 1187/5337/3284
  CRC: { go: 1190, pro: 5350, school: 3300 },
  // BOB 6.96/USD · ×0.9 → 18.2/81.5/50.1
  BOB: { go: 18, pro: 81, school: 50 },
  // PYG ~7500/USD · ×0.9 → 19575/87643/53932
  PYG: { go: 19500, pro: 87900, school: 53900 },
  // GTQ 7.62/USD · ×0.9 → 19.9/89.1/54.8
  GTQ: { go: 20, pro: 89, school: 55 },
  // HNL ~26.7/USD · ×0.9 → 69.7/312.3/192.1
  HNL: { go: 70, pro: 315, school: 190 },
  // BRL ~5.10/USD · ×0.9 → 13.31/59.64/36.67
  BRL: { go: 12.9, pro: 59.9, school: 36.9 },
  // EUR 0.86/USD · ×0.9 → 2.25/10.06/6.18
  EUR: { go: 2.25, pro: 9.99, school: 5.99 },
  // PLN 3.73/USD · ×0.9 → 9.74/43.6/26.8
  PLN: { go: 9.95, pro: 43.99, school: 26.99 },
  // RON 4.34/USD · ×0.9 → 11.33/50.7/31.2
  RON: { go: 11.49, pro: 49.99, school: 30.99 },
}

export function planRateForCurrency(currency: string): PlanRates {
  return PLAN_RATES[currency] ?? PLAN_RATES.USD
}

/** La oferta anual equivale a pagar 10 meses, redondeada a centavos. */
function timesTen(value: number): number {
  return Number((value * 10).toFixed(2))
}

export function monthlyGoRate(rates: PlanRates): number {
  return rates.go
}

export function annualGoRate(rates: PlanRates): number {
  return timesTen(rates.go)
}

export function annualProRate(rates: PlanRates): number {
  return timesTen(rates.pro)
}

export function annualSchoolRate(rates: PlanRates): number {
  return timesTen(rates.school)
}

/**
 * País soportado → moneda de cobro.
 * Ecuador, Panamá y El Salvador usan USD de facto; Brasil cobra en
 * BRL; España, Portugal e Italia comparten EUR con Polonia (PLN) y
 * Rumanía (RON) en su moneda local.
 */
export const COUNTRY_CURRENCY: Record<string, string> = {
  CO: "COP",
  PE: "PEN",
  EC: "USD",
  MX: "MXN",
  CL: "CLP",
  DO: "DOP",
  PA: "USD",
  CR: "CRC",
  BO: "BOB",
  PY: "PYG",
  GT: "GTQ",
  SV: "USD",
  HN: "HNL",
  BR: "BRL",
  ES: "EUR",
  PT: "EUR",
  IT: "EUR",
  PL: "PLN",
  RO: "RON",
  US: "USD",
}

export function currencyForCountry(code: CountryCode): string {
  return COUNTRY_CURRENCY[code] ?? "USD"
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
  GB: "en-GB", PT: "pt-PT", IT: "it-IT", PL: "pl-PL", RO: "ro-RO",
  BR: "pt-BR",
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

  const currency = currencyForCountry(code)

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
  const isInteger = Number.isInteger(amount)
  return new Intl.NumberFormat(selection.locale, {
    style: "currency",
    currency: selection.currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: isInteger ? 0 : 2,
    maximumFractionDigits: isInteger ? 0 : 2,
  }).format(amount)
}