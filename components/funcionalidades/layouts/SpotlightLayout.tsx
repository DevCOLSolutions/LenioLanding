"use client"

import { Sparkles, type LucideIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import type { FeatureSceneProps } from "./types"

const IAU_ICONS: LucideIcon[] = [Sparkles, Sparkles, Sparkles]

/**
 * Spotlight: escena oscura con gran presencia para la IA.
 * La IA está integrada al trabajo real del docente.
 */
export function SpotlightLayout({ feature, step, titleId }: FeatureSceneProps) {
  const t = useTranslations("funcionalidades")
  const id = feature.id
  const capabilities = t.raw(`${id}.capabilities`) as string[]

  return (
    <div className="relative flex h-full flex-col justify-center">
      <div data-feature-eyebrow className="mb-3 flex items-center gap-2.5">
        <span className="inline-flex h-7 items-center rounded-full bg-white/10 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FFC83D] backdrop-blur">
          {step}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
          {t(`${id}.eyebrow`)}
        </span>
      </div>

      <h2
        id={titleId}
        data-feature-title
        className="font-heading max-w-xl text-5xl font-semibold tracking-tight text-white md:text-6xl"
      >
        {t(`${id}.title`)}
      </h2>

      <p
        data-feature-desc
        className="mt-5 max-w-lg leading-relaxed text-white/60"
      >
        {t(`${id}.description`)}
      </p>

      <div
        data-feature-visual
        className="mt-8 grid gap-2.5 sm:grid-cols-2"
      >
        {capabilities.map((capability, index) => {
          const Icon = IAU_ICONS[index % IAU_ICONS.length]
          return (
            <span
              key={capability}
              data-feature-item
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-medium text-white/85 backdrop-blur"
            >
              <Icon className="size-4 shrink-0 text-[#FFC83D]" />
              {capability}
            </span>
          )
        })}
      </div>
    </div>
  )
}