import { FEATURE_PAIRS } from "./data"
import { FeatureIntro } from "./FeatureIntro"
import { FeatureScene } from "./FeatureScene"

/**
 * Track horizontal: la intro ("Todo lo que necesitas para enseñar.")
 * abre el recorrido y le siguen los pares de features. En móvil se apilan.
 */
export function HorizontalFeatureScroller({
  trackRef,
}: {
  trackRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={trackRef}
      data-track
      className="no-scrollbar mx-auto w-full lg:flex lg:h-full lg:w-max lg:overflow-x-auto"
    >
      <FeatureIntro />

      {FEATURE_PAIRS.map((pair, pairIndex) => {
        const isDark = pair.some((feature) => feature.theme === "dark")
        return (
          <div
            key={pairIndex}
            data-pair-scene
            className={`w-full lg:h-full lg:w-[100vw] lg:shrink-0 ${
              isDark ? "bg-[#0C1A24]" : "bg-white"
            }`}
          >
            <div
              className="mx-auto grid h-full w-full max-w-[1400px] grid-cols-1 lg:grid-cols-2 lg:items-center"
              data-pair-grid
            >
              {pair.map((feature) => (
                <FeatureScene key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}