"use client"

import { useLocale } from "next-intl"

import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"

export function LanguageSwitcher() {
  const locale = useLocale()

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-muted/50 p-0.5 text-sm">
      {(["es", "en"] as const).map((code) => {
        const active = locale === code
        return (
          <Link
            key={code}
            href="/"
            locale={code}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              active
                ? "bg-background font-medium text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {code === "es" ? "ES" : "EN"}
          </Link>
        )
      })}
    </div>
  )
}