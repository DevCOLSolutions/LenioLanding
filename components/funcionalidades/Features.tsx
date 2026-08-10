"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { FEATURE_PAIRS } from "./data"
import { FeatureProgress } from "./FeatureProgress"
import { HorizontalFeatureScroller } from "./HorizontalFeatureScroller"

gsap.registerPlugin(ScrollTrigger)

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

/* Selectores animados por escena (por par de features) */
const ANIMATION_SELECTORS = [
  "[data-feature-eyebrow]",
  "[data-feature-title]",
  "[data-feature-desc]",
  "[data-feature-item]",
  "[data-feature-stat]",
  "[data-feature-visual]",
]

export default function FeaturesSection() {
  const t = useTranslations("funcionalidades")
  const sectionRef = useRef<HTMLElement | null>(null)
  const pinRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const fillRef = useRef<HTMLDivElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia()

      // Desktop: recorrido horizontal (pin + scrub + revelado por par)
      matchMedia.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current
          const pin = pinRef.current
          if (!track || !pin) return

          const pairs = Array.from(
            pin.querySelectorAll<HTMLElement>("[data-pair-scene]")
          )
          const dots = Array.from(
            pin.querySelectorAll<HTMLElement>("[data-progress-dot]")
          )

          const getDistance = () => track.scrollWidth - window.innerWidth

          const scrub = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => "+=" + getDistance(),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (fillRef.current) {
                  fillRef.current.style.transform = `scaleX(${self.progress})`
                }
                const index = Math.min(
                  dots.length - 1,
                  Math.floor(self.progress * dots.length)
                )
                dots.forEach((dot, dotIndex) => {
                  dot.style.background =
                    dotIndex === index ? "#19303E" : "#d4d4d4"
                })
              },
            },
          })

          // La intro es la pantalla inicial ya visible; cada par
          // aparece y anima al hacer scroll (containerAnimation).
          pairs.forEach((pair) => {
            const q = (selector: string) =>
              pair.querySelectorAll<HTMLElement>(selector)

            const timeline = gsap.timeline({
              defaults: { ease: "power2.out" },
              scrollTrigger: {
                trigger: pair,
                containerAnimation: scrub,
                start: "left 78%",
                end: "left -8%",
                toggleActions: "play none none reverse",
              },
            })

            timeline
              .fromTo(
                q("[data-feature-eyebrow]"),
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.4 },
                0
              )
              .fromTo(
                q("[data-feature-title]"),
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.6 },
                "-=0.2"
              )
              .fromTo(
                q("[data-feature-desc]"),
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.5 },
                "-=0.26"
              )
              .fromTo(
                q("[data-feature-item]"),
                { opacity: 0, y: 32 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
                "-=0.3"
              )
              .fromTo(
                q("[data-feature-stat]"),
                { opacity: 0, y: 36, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6 },
                "-=0.3"
              )
              .fromTo(
                q("[data-feature-visual]"),
                { opacity: 0, y: 42, scale: 0.97 },
                { opacity: 1, y: 0, scale: 1, duration: 0.65 },
                "-=0.35"
              )

            // Parallax sutil de los visuales dentro del par
            const parallax = pair.querySelector<HTMLElement>(
              "[data-feature-parallax]"
            )
            if (parallax) {
              gsap.fromTo(
                parallax,
                { yPercent: 6 },
                {
                  yPercent: -6,
                  ease: "none",
                  scrollTrigger: {
                    trigger: pair,
                    containerAnimation: scrub,
                    start: "left right",
                    end: "right left",
                    scrub: 0.4,
                  },
                }
              )
            }
          })
        }
      )

      // Desktop con reduced-motion / móvil: todo visible en apilado
      matchMedia.add("(min-width: 1024px) and (prefers-reduced-motion: reduce)", () => {
        gsap.set(ANIMATION_SELECTORS.join(","), { clearProps: "all" })
      })
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      className="w-full scroll-mt-20 bg-white"
    >
      {/* Zona pinned: intro + track horizontal por pares + progreso */}
      <div
        ref={pinRef}
        data-features-pin
        className="relative flex flex-col lg:h-screen lg:overflow-hidden lg:pt-16"
      >
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <HorizontalFeatureScroller trackRef={trackRef} />
        </div>

        <FeatureProgress
          fillRef={fillRef}
          count={FEATURE_PAIRS.length + 1}
          label={t("progressLabel")}
        />
      </div>
    </section>
  )
}