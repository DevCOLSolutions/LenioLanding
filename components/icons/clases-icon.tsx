import React, { useId } from "react"
import { cn } from "@/lib/utils"

export interface ClasesIconProps extends React.SVGProps<SVGSVGElement> {
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

export function ClasesIcon({
  size = 24,
  width,
  height,
  grayscale = false,
  gray = false,
  className,
  ...props
}: ClasesIconProps) {
  const id = useId().replace(/:/g, "")
  const isGray = grayscale || gray

  const finalWidth = width ?? size
  const finalHeight = height ?? size

  const gradientId = `g-clases-${id}`
  const shadowId = `s-clases-${id}`

  const stops = isGray
    ? {
      start: "#CBD5E1",
      mid: "#64748B",
      end: "#334155",
    }
    : {
      start: "#6EE7A0",
      mid: "#22C55E",
      end: "#15803D",
    }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={finalWidth}
      height={finalHeight}
      role="img"
      aria-label="Clases"
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
      <rect x="20" y="24" width="88" height="62" rx="18" fill={`url(#${gradientId})`} />
      <rect x="58" y="84" width="12" height="16" fill={`url(#${gradientId})`} />
      <rect x="38" y="96" width="52" height="12" rx="6" fill={`url(#${gradientId})`} />
      <rect x="36" y="42" width="40" height="9" rx="4.5" fill="#fff" opacity="0.93" />
      <rect x="36" y="60" width="24" height="9" rx="4.5" fill="#fff" opacity="0.93" />
      <ellipse cx="40" cy="34" rx="12" ry="5" transform="rotate(-20 40 34)" fill="#fff" opacity="0.4" />
    </svg>
  )
}

export default ClasesIcon
