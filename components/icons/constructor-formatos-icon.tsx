import React, { useId } from "react"
import { cn } from "@/lib/utils"

export interface ConstructorFormatosIconProps extends React.SVGProps<SVGSVGElement> {
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

export function ConstructorFormatosIcon({
  size = 24,
  width,
  height,
  grayscale = false,
  gray = false,
  className,
  ...props
}: ConstructorFormatosIconProps) {
  const id = useId().replace(/:/g, "")
  const isGray = grayscale || gray

  const finalWidth = width ?? size
  const finalHeight = height ?? size

  const gradientId = `g-formatos-${id}`
  const shadowId = `s-formatos-${id}`

  const stops = isGray
    ? {
      start: "#CBD5E1",
      mid: "#64748B",
      end: "#334155",
    }
    : {
      start: "#FFE98A",
      mid: "#FBBF24",
      end: "#E08A00",
    }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={finalWidth}
      height={finalHeight}
      role="img"
      aria-label="Constructor de formatos"
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
      <rect x="26" y="18" width="76" height="92" rx="18" fill={`url(#${gradientId})`} />
      <rect x="40" y="34" width="48" height="12" rx="6" fill="#fff" opacity="0.93" />
      <rect x="40" y="56" width="20" height="36" rx="6" fill="#fff" opacity="0.93" />
      <rect x="68" y="56" width="20" height="15" rx="6" fill="#fff" opacity="0.93" />
      <rect x="68" y="77" width="20" height="15" rx="6" fill="#fff" opacity="0.93" />
      <ellipse cx="42" cy="30" rx="12" ry="5" transform="rotate(-20 42 30)" fill="#fff" opacity="0.4" />
    </svg>
  )
}

export default ConstructorFormatosIcon
