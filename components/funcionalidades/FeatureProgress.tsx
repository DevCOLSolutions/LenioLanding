import type { RefObject } from "react"

/**
 * Progreso del recorrido: cuenta los "pares" de pantallas
 * (4 total), no las 8 features.
 */
export function FeatureProgress({
  fillRef,
  count,
  label,
}: {
  fillRef: RefObject<HTMLDivElement | null>
  count: number
  label: string
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center"
    >
      <div className="flex items-center gap-4 rounded-full border border-black/5 bg-white/85 px-5 py-2.5 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)] backdrop-blur-sm md:gap-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
          {label}
        </span>

        <div
          ref={fillRef}
          className="relative h-px w-28 overflow-hidden rounded-full bg-black/10 md:w-44"
        >
          <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-[#19303E]" />
        </div>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: count }).map((_, index) => (
            <span
              key={index}
              data-progress-dot
              className="size-1.5 rounded-full bg-neutral-300 transition-colors duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  )
}