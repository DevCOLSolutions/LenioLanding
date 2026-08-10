"use client"

import { FEATURES } from "./data"
import { FeatureLayout } from "./FeatureLayout"

/**
 * Escena de una feature dentro del track horizontal.
 * Resuelve el número de paso y el layout declarado en data.ts.
 */
export function FeatureScene({ feature }: { feature: (typeof FEATURES)[number] }) {
  const index = FEATURES.findIndex((f) => f.id === feature.id)
  const step = `0${index + 1}`
  const titleId = `feature-${feature.id}-title`

  return (
    <section
      data-panel
      aria-labelledby={titleId}
      className="relative flex w-full flex-col justify-center px-6 py-16 sm:px-10 lg:h-full lg:w-full lg:py-0"
    >
      {feature.theme === "dark" && (
        <>
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[#1D5969]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-[#FFC83D]/10 blur-3xl" />
        </>
      )}
      <div className="relative">
        <FeatureLayout feature={feature} step={step} titleId={titleId} />
      </div>
    </section>
  )
}