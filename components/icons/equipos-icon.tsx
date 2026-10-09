import React, { useId } from "react"
import { cn } from "@/lib/utils"

export interface EquiposIconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Tamaño en píxeles o unidades CSS. Aplica tanto a width como a height.
   * @default 24
   */
  size?: number | string
  /**
   * Si es true, renderiza el ícono en escala de grises.
   * @default false
   */
  grayscale?: boolean
  /**
   * Alias de `grayscale`.
   * @default false
   */
  gray?: boolean
}

export function EquiposIcon({
  size = 24,
  width,
  height,
  grayscale = false,
  gray = false,
  className,
  ...props
}: EquiposIconProps) {
  const id = useId().replace(/:/g, "")
  const isGray = grayscale || gray

  const finalWidth = width ?? size
  const finalHeight = height ?? size

  const gradientId = `g-equipos-${id}`
  const shadowId = `s-equipos-${id}`

  const stops = isGray
    ? {
      start: "#CBD5E1",
      mid: "#64748B",
      end: "#334155",
    }
    : {
      start: "#FFB3DD",
      mid: "#F26AB0",
      end: "#D93C8C",
    }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={finalWidth}
      height={finalHeight}
      role="img"
      aria-label="Equipos"
      className={cn("inline-block align-middle", isGray && "grayscale", className)}
      {...props}
    >
      <defs>
        <radialGradient id={gradientId} cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor={stops.start} />
          <stop offset="0.55" stopColor={stops.mid} />
          <stop offset="1" stopColor={stops.end} />
        </radialGradient>
        <radialGradient id={shadowId}>
          <stop offset="0" stopColor="#000" stopOpacity="0.22" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g opacity="0.78">
        <circle cx="88" cy="42" r="13" fill={`url(#${gradientId})`} />
        <path
          d="M70 100A20 20 0 0 1 110 100Z"
          fill={`url(#${gradientId})`}
          stroke={`url(#${gradientId})`}
          strokeWidth="8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
      <circle cx="50" cy="48" r="17" fill={`url(#${gradientId})`} />
      <path
        d="M24 102A26 26 0 0 1 76 102Z"
        fill={`url(#${gradientId})`}
        stroke={`url(#${gradientId})`}
        strokeWidth="8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <ellipse cx="43" cy="40" rx="8" ry="4" transform="rotate(-30 43 40)" fill="#fff" opacity="0.4" />
    </svg>
  )
}

export default EquiposIcon
