import React, { useId } from "react"
import { cn } from "@/lib/utils"

export interface RepositorioIconProps extends React.SVGProps<SVGSVGElement> {
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

export function RepositorioIcon({
  size = 24,
  width,
  height,
  grayscale = false,
  gray = false,
  className,
  ...props
}: RepositorioIconProps) {
  const id = useId().replace(/:/g, "")
  const isGray = grayscale || gray

  const finalWidth = width ?? size
  const finalHeight = height ?? size

  const gradientId = `g-repositorio-${id}`
  const shadowId = `s-repositorio-${id}`

  const stops = isGray
    ? {
      start: "#CBD5E1",
      mid: "#64748B",
      end: "#334155",
    }
    : {
      start: "#FFC27A",
      mid: "#FB923C",
      end: "#E26A0A",
    }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={finalWidth}
      height={finalHeight}
      role="img"
      aria-label="Repositorio"
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

      <path
        d="M24 44Q24 34 34 34H54L64 46H94Q104 46 104 56V88Q104 98 94 98H34Q24 98 24 88Z"
        fill={`url(#${gradientId})`}
        stroke={`url(#${gradientId})`}
        strokeWidth="12"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <rect x="46" y="68" width="36" height="9" rx="4.5" fill="#fff" opacity="0.93" />
      <ellipse cx="44" cy="44" rx="12" ry="5" transform="rotate(-20 44 44)" fill="#fff" opacity="0.4" />
    </svg>
  )
}

export default RepositorioIcon
