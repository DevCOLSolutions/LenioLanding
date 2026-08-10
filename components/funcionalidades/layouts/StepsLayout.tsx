"use client"

import { useTranslations } from "next-intl"

import type { FeatureSceneProps } from "./types"

interface StepsItem {
  title: string
  description: string
}

/**
 * Steps: pasos numerados (01 Crear · 02 Configurar · 03 Publicar).
 */
export function StepsLayout({ feature, step, titleId }: FeatureSceneProps) {
  const t = useTranslations("funcionalidades")
  const id = feature.id
  const steps = t.raw(`${id}.steps`) as StepsItem[]

  return (
    <div className="grid h-full items-center gap-10 lg:grid-cols-2 lg:gap-12">
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
          className="mt-4 max-w-md leading-relaxed text-neutral-500"
        >
          {t(`${id}.description`)}
        </p>
      </div>

      <ol className="relative space-y-4 border-l border-[#19303E]/10 pl-6">
        {steps.map((stepItem, index) => (
          <li key={stepItem.title} data-feature-item className="relative">
            <span className="absolute -left-[31px] top-0 flex size-[22px] items-center justify-center rounded-full bg-[#19303E] text-[10px] font-bold text-white">
              {index + 1}
            </span>
            <h3 className="font-heading text-base font-semibold text-[#19303E]">
              {stepItem.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-500">
              {stepItem.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}