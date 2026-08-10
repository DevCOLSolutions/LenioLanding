"use client"

import { useTranslations } from "next-intl"

import type { FeatureSceneProps } from "./types"

/**
 * Stat: número grande y evidenciable como protagonista.
 */
export function StatLayout({ feature, step, titleId }: FeatureSceneProps) {
  const t = useTranslations("funcionalidades")
  const id = feature.id
  const stat = t.raw(`${id}.stat`) as { value: string; unit: string; label: string }

  return (
    <div className="flex h-full flex-col justify-center gap-10">
      <div>
        <div data-feature-eyebrow className="mb-3 flex items-center gap-2.5">
          <span className="inline-flex h-7 items-center rounded-full bg-[#19303E]/5 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1D5969]">
            {step}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            {t(`${id}.eyebrow`)}
          </span>
        </div>

        <h2
          id={titleId}
          data-feature-title
          className="font-heading max-w-lg text-4xl font-semibold tracking-tight text-[#19303E]"
        >
          {t(`${id}.title`)}
        </h2>
      </div>

      <div data-feature-visual>
        <div className="flex items-end gap-4">
          <span
            data-feature-stat
            className="font-heading text-7xl font-semibold leading-none tracking-tight text-[#19303E] md:text-8xl"
          >
            {stat.value}
          </span>
          <span className="pb-2 text-xl font-medium text-[#1D5969]">
            {stat.unit}
          </span>
        </div>
        <p
          data-feature-item
          className="mt-4 max-w-md text-lg leading-relaxed text-neutral-500"
        >
          {stat.label}
        </p>
      </div>

      <p
        data-feature-desc
        className="max-w-lg leading-relaxed text-neutral-500"
      >
        {t(`${id}.description`)}
      </p>
    </div>
  )
}