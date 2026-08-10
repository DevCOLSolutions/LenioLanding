"use client"

import {
  BarChart3,
  FileText,
  GraduationCap,
  ListChecks,
  type LucideIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"

import type { FeatureSceneProps } from "./types"

const AGENT_ICONS: LucideIcon[] = [
  GraduationCap,
  ListChecks,
  FileText,
  BarChart3,
]

/**
 * Quote: "Tu equipo de asistentes." con los agentes especializados.
 */
export function QuoteLayout({ feature, step, titleId }: FeatureSceneProps) {
  const t = useTranslations("funcionalidades")
  const id = feature.id
  const agents = t.raw(`${id}.agents`) as string[]

  return (
    <div className="flex h-full flex-col justify-center">
      <div data-feature-eyebrow className="mb-3 flex items-center gap-2.5">
        <span className="inline-flex h-7 items-center rounded-full bg-white/10 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FFC83D] backdrop-blur">
          {step}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
          {t(`${id}.eyebrow`)}
        </span>
      </div>

      <blockquote
        id={titleId}
        data-feature-title
        className="font-heading border-l-4 border-[#FFC83D] pl-5 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl"
      >
        {t(`${id}.quote`)}
      </blockquote>

      <p
        data-feature-desc
        className="mt-5 max-w-lg leading-relaxed text-white/60"
      >
        {t(`${id}.description`)}
      </p>

      <div data-feature-visual className="mt-8 grid max-w-md gap-3 sm:grid-cols-2">
        {agents.map((agent, index) => {
          const Icon = AGENT_ICONS[index % AGENT_ICONS.length]
          return (
            <span
              key={agent}
              data-feature-item
              className="inline-flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-medium text-white/85 backdrop-blur"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#FFC83D]">
                <Icon className="size-4" />
              </span>
              {agent}
            </span>
          )
        })}
      </div>
    </div>
  )
}