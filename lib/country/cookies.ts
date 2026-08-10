export const COUNTRY_COOKIE_NAME = "lenio_country"

export function getCountryCookie(): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${COUNTRY_COOKIE_NAME}=([^;]*)`)
  )
  return match ? decodeURIComponent(match[1]) : null
}

export function setCountryCookie(code: string): void {
  if (typeof document === "undefined") return
  document.cookie = `${COUNTRY_COOKIE_NAME}=${encodeURIComponent(
    code
  )}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
}