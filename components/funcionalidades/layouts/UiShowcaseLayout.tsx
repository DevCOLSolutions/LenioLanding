"use client"

import { ListChecks, Sparkles, Target, type LucideIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { ProductShot } from "../ProductShot"
import type { FeatureSceneProps } from "./types"

const ANNOTATION_ICONS: LucideIcon[] = [Target, ListChecks, Sparkles]

/**
 * UI showcase: mockup del producto con chips de anotación.
 */
export function UiShowcaseLayout({
  feature,
  step,
  titleId,
}: FeatureSceneProps) {
  const t = useTranslations("funcionalidades")
  const id = feature.id
  const annotations = t.raw(`${id}.annotations`) as string[]

  return (
    <div className="flex h-full flex-col justify-center gap-8 lg:justify-between">
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

        <p
          data-feature-desc
          className="mt-4 max-w-lg leading-relaxed text-neutral-500"
        >
          {t(`${id}.description`)}
        </p>
      </div>

      <div data-feature-visual className="relative">
        <ProductShot alt={t(`alts.${feature.altKey}`)} ratio="aspect-[16/10]" />
        <div className="mt-4 flex flex-wrap gap-2">
          {annotations.map((annotation, index) => {
            const Icon = ANNOTATION_ICONS[index % ANNOTATION_ICONS.length]
            return (
              <span
                key={annotation}
                data-feature-item
                className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.35)]"
              >
                <Icon className="size-3.5 text-[#1D5969]" />
                {annotation}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}