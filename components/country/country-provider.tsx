"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react"

import {
  countryExists,
  detectCountryFromLocaleTag,
  localizedCountryList,
  type CountryCode,
  type CountryListItem,
} from "@/lib/country/countries"
import { getCountryCookie, setCountryCookie } from "@/lib/country/cookies"
import {
  resolveSelection,
  type CountrySelection,
} from "@/lib/country/pricing"
import { DEFAULT_COUNTRY_CODE } from "@/lib/site"

let cachedCode: string | null = null
const listeners = new Set<() => void>()

function readStoredCountry(): CountryCode {
  if (typeof window === "undefined") return DEFAULT_COUNTRY_CODE
  if (cachedCode) return cachedCode
  const cookie = getCountryCookie()
  if (cookie && countryExists(cookie)) {
    cachedCode = cookie
    return cachedCode
  }
  const detected = detectCountryFromLocaleTag(navigator.language)
  if (detected) cachedCode = detected
  return cachedCode ?? DEFAULT_COUNTRY_CODE
}

function getSnapshot() {
  return readStoredCountry()
}

function getServerSnapshot() {
  return DEFAULT_COUNTRY_CODE
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

interface CountryContextValue {
  selection: CountrySelection
  countries: CountryListItem[]
  selected: CountryListItem | null
  setCountry: (code: CountryCode) => void
}

const CountryContext = createContext<CountryContextValue | null>(null)

export function CountryProvider({
  uiLocale,
  children,
}: {
  uiLocale: string
  children: ReactNode
}) {
  const code = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const selection = useMemo(() => resolveSelection(code), [code])

  const setCountry = useCallback((value: CountryCode) => {
    const next = resolveSelection(value)
    cachedCode = next.code
    setCountryCookie(next.code)
    listeners.forEach((listener) => listener())
  }, [])

  const { countries, selected } = useMemo(() => {
    const list = localizedCountryList(uiLocale)
    const selected =
      list.find((c) => c.code === selection.code) ??
      list.find((c) => c.code === DEFAULT_COUNTRY_CODE) ??
      null
    return { countries: list, selected }
  }, [uiLocale, selection.code])

  const value = useMemo(
    () => ({ selection, countries, selected, setCountry }),
    [selection, countries, selected, setCountry]
  )

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  )
}

export function useCountry(): CountryContextValue {
  const value = useContext(CountryContext)
  if (!value) {
    throw new Error("useCountry debe usarse dentro de <CountryProvider />")
  }
  return value
}