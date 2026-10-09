import React, { useId } from "react"
import { cn } from "@/lib/utils"

export interface AgentesIaIconProps extends React.SVGProps<SVGSVGElement> {
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

export function AgentesIaIcon({
  size = 24,
  width,
  height,
  grayscale = false,
  gray = false,
  className,
  ...props
}: AgentesIaIconProps) {
  const id = useId().replace(/:/g, "")
  const isGray = grayscale || gray

  const finalWidth = width ?? size
  const finalHeight = height ?? size

  const gradientId = `g-agentes-${id}`
  const shadowId = `s-agentes-${id}`

  const stops = isGray
    ? {
      start: "#CBD5E1",
      mid: "#64748B",
      end: "#334155",
    }
    : {
      start: "#F0A8FF",
      mid: "#C453F0",
      end: "#8E24C4",
    }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={finalWidth}
      height={finalHeight}
      role="img"
      aria-label="Agentes de IA"
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
      <rect x="18" y="22" width="92" height="68" rx="26" fill={`url(#${gradientId})`} />
      <polygon
        points="38,86 38,108 62,90"
        fill={`url(#${gradientId})`}
        stroke={`url(#${gradientId})`}
        strokeWidth="8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M64 34C66 48 72 54 86 56C72 58 66 64 64 78C62 64 56 58 42 56C56 54 62 48 64 34Z"
        fill="#fff"
        opacity="0.93"
      />
      <ellipse cx="40" cy="36" rx="12" ry="5" transform="rotate(-25 40 36)" fill="#fff" opacity="0.4" />
    </svg>
  )
}

export default AgentesIaIcon
