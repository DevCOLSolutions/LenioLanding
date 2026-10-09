import React, { useId } from "react"
import { cn } from "@/lib/utils"

export interface FlujosIconProps extends React.SVGProps<SVGSVGElement> {
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

export function FlujosIcon({
  size = 24,
  width,
  height,
  grayscale = false,
  gray = false,
  className,
  ...props
}: FlujosIconProps) {
  const id = useId().replace(/:/g, "")
  const isGray = grayscale || gray

  const finalWidth = width ?? size
  const finalHeight = height ?? size

  const gradientId = `g-flujos-${id}`
  const shadowId = `s-flujos-${id}`

  const stops = isGray
    ? {
      start: "#CBD5E1",
      mid: "#64748B",
      end: "#334155",
    }
    : {
      start: "#7FEDE0",
      mid: "#14B8A6",
      end: "#0B7F74",
    }

  const strokeColor = isGray ? "#475569" : "#0D9488"

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={finalWidth}
      height={finalHeight}
      role="img"
      aria-label="Flujos de trabajo"
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

      <g fill="none" stroke={strokeColor} strokeWidth="8" strokeLinejoin="round" strokeLinecap="round">
        <path d="M32 64H66" />
        <path d="M66 64H76Q100 64 100 42" />
        <path d="M66 64H76Q100 64 100 86" />
      </g>
      <circle cx="30" cy="64" r="15" fill={`url(#${gradientId})`} />
      <circle cx="66" cy="64" r="15" fill={`url(#${gradientId})`} />
      <circle cx="100" cy="36" r="14" fill={`url(#${gradientId})`} />
      <circle cx="100" cy="92" r="14" fill={`url(#${gradientId})`} />
      <g fill="#fff" opacity="0.93">
        <circle cx="66" cy="64" r="5.5" />
      </g>
      <ellipse cx="24" cy="58" rx="6" ry="3" transform="rotate(-30 24 58)" fill="#fff" opacity="0.4" />
    </svg>
  )
}

export default FlujosIcon
