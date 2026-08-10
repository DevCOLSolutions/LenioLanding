"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

import type { FeatureSceneProps } from "./types"

/**
 * Editorial: gran tipografía, imagen como apoyo. Ideal para abrir
 * el recorrido (Planeación).
 */
export function EditorialLayout({ feature, step, titleId }: FeatureSceneProps) {
  const t = useTranslations("funcionalidades")
  const id = feature.id

  return (
    <div className="grid h-full items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-6">
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
          className="font-heading max-w-xl text-4xl font-semibold tracking-tight text-[#19303E] md:text-5xl"
        >
          {t(`${id}.title`)}
        </h2>

        <p
          data-feature-desc
          className="mt-5 max-w-lg leading-relaxed text-neutral-500"
        >
          {t(`${id}.description`)}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {(t.raw(`${id}.items`) as string[]).map((item) => (
            <span
              key={item}
              data-feature-item
              className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-700 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.35)]"
            >
              <span className="size-1 rounded-full bg-[#FFC83D]" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="lg:col-span-6" data-feature-visual>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-black/5 bg-neutral-100 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.45)]">
          <Image
            src={feature.image}
            alt={t(`alts.${feature.altKey}`)}
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}