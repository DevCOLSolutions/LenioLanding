import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  // El idioma se decide por país (cookie lenio_country), no por una cookie de idioma
  localeCookie: false,
})

export type Locale = (typeof routing.locales)[number]

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)