"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

import type { FeatureSceneProps } from "./types"

/**
 * Visual dominant: la imagen es la protagonista, con el texto
 * superpuesto y legible sobre ella.
 */
export function VisualLayout({ feature, step, titleId }: FeatureSceneProps) {
  const t = useTranslations("funcionalidades")
  const id = feature.id

  return (
    <div data-feature-visual className="relative h-full">
      <div className="relative overflow-hidden rounded-3xl border border-black/5 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.5)] md:inset-y-4">
        <Image
          src={feature.image}
          alt={t(`alts.${feature.altKey}`)}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A24]/85 via-[#0C1A24]/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-9">
          <div data-feature-eyebrow className="mb-3 inline-flex items-center gap-2.5">
            <span className="inline-flex h-7 items-center rounded-full bg-white/15 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
              {step}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              {t(`${id}.eyebrow`)}
            </span>
          </div>

          <h2
            id={titleId}
            data-feature-title
            className="font-heading max-w-lg text-4xl font-semibold tracking-tight"
          >
            {t(`${id}.title`)}
          </h2>

          <p
            data-feature-desc
            className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 md:text-base"
          >
            {t(`${id}.description`)}
          </p>
        </div>
      </div>
    </div>
  )
}