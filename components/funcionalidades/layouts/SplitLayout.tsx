"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

import type { FeatureSceneProps } from "./types"

/**
 * Split: columna de texto a la izquierda, visual a la derecha.
 */
export function SplitLayout({ feature, step, titleId }: FeatureSceneProps) {
  const t = useTranslations("funcionalidades")
  const id = feature.id

  return (
    <div className="grid h-full items-center gap-10 lg:grid-cols-2 lg:gap-12">
      <div className="order-2 lg:order-1">
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
          className="font-heading max-w-xl text-4xl font-semibold tracking-tight text-[#19303E]"
        >
          {t(`${id}.title`)}
        </h2>

        <p
          data-feature-desc
          className="mt-4 max-w-lg leading-relaxed text-neutral-500"
        >
          {t(`${id}.description`)}
        </p>

        <ul className="mt-6 grid max-w-md gap-2.5">
          {(t.raw(`${id}.items`) as string[]).map((item) => (
            <li
              key={item}
              data-feature-item
              className="flex items-start gap-2.5 text-sm text-neutral-700"
            >
              <span className="mt-1.5 flex size-1.5 shrink-0 rounded-full bg-[#1D5969]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="order-1 lg:order-2" data-feature-visual>
        <div className="relative aspect-[3/4] max-w-sm overflow-hidden rounded-3xl border border-black/5 bg-neutral-100 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.45)] lg:ml-auto">
          <Image
            src={feature.image}
            alt={t(`alts.${feature.altKey}`)}
            fill
            sizes="(min-width: 1024px) 25vw, 100vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}