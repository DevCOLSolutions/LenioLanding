"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Search, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "@/i18n/routing"
import {
  isSpanishSpeakingCountry,
  toFlagClass,
  type CountryCode,
} from "@/lib/country/countries"
import { useCountry } from "./country-provider"

function Flag({
  code,
  className,
}: {
  code: CountryCode
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn(
        toFlagClass(code),
        "inline-block h-3.5 w-5 shrink-0 rounded-[2px]",
        className
      )}
    />
  )
}

export function CountrySelector() {
  const t = useTranslations("countrySelector")
  const { selection, countries, selected, setCountry } = useCountry()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (open) {
      window.setTimeout(() => searchRef.current?.focus(), 0)
    }
  }, [open])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return countries
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.code.toLowerCase().includes(term) ||
        c.currency.toLowerCase().includes(term)
    )
  }, [countries, search])

  if (!selected) return null

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="h-9 gap-2 px-3 text-xs font-medium text-foreground"
            aria-label={t("label", { country: selected.name, currency: selected.currency })}
          >
            <Flag code={selected.code} />
            <span className="truncate max-w-[120px]">{selected.name}</span>
          </Button>
        }
      />
      <DropdownMenuContent className="w-64">
        <div className="px-1 pt-1 pb-1.5">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                // Evitar que el typeahead del menú (Base UI) intercepte las teclas
                // y bloquee la escritura en este campo.
                if (e.key.length === 1) e.stopPropagation()
              }}
              placeholder={t("searchPlaceholder")}
              className="h-8 w-full rounded-md bg-muted pr-2.5 pl-7 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        {filtered.length === 0 ? (
          <p className="px-3 py-4 text-center text-xs text-muted-foreground">
            {t("noResults")}
          </p>
        ) : (
          <ul className="overflow-y-auto p-0.5" style={{ maxHeight: 288 }}>
            {filtered.map((country) => {
              const isCurrent = country.code === selection.code
              return (
                <li key={country.code}>
                  <DropdownMenuItem
                    onClick={() => {
                      const code = country.code as CountryCode
                      setCountry(code)
                      setSearch("")
                      setOpen(false)
                      const target: "es" | "en" = isSpanishSpeakingCountry(code)
                        ? "es"
                        : "en"
                      if (target !== locale) {
                        router.replace(pathname, { locale: target })
                      }
                    }}
                    className="gap-2.5"
                  >
                    <Flag code={country.code} className="size-4" />
                    <span className="flex-1 truncate">{country.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {country.currency}
                    </span>
                    <span className="flex w-4 items-center justify-center">
                      {isCurrent && (
                        <Check className="size-4 text-foreground" />
                      )}
                    </span>
                  </DropdownMenuItem>
                </li>
              )
            })}
          </ul>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}