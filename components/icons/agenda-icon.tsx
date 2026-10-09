import React, { useId } from "react"
import { cn } from "@/lib/utils"

export interface AgendaIconProps extends React.SVGProps<SVGSVGElement> {
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

export function AgendaIcon({
  size = 24,
  width,
  height,
  grayscale = false,
  gray = false,
  className,
  ...props
}: AgendaIconProps) {
  const id = useId().replace(/:/g, "")
  const isGray = grayscale || gray

  const finalWidth = width ?? size
  const finalHeight = height ?? size

  const gradientId = `g-agenda-${id}`
  const shadowId = `s-agenda-${id}`

  const stops = isGray
    ? {
      start: "#CBD5E1",
      mid: "#64748B",
      end: "#334155",
    }
    : {
      start: "#FF8A8A",
      mid: "#EF4444",
      end: "#C81E2E",
    }

  const tabColor = isGray ? "#334155" : "#A31524"

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={finalWidth}
      height={finalHeight}
      role="img"
      aria-label="Agenda"
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

      <rect x="20" y="28" width="88" height="80" rx="22" fill={`url(#${gradientId})`} />
      <rect x="38" y="16" width="13" height="26" rx="6.5" fill={tabColor} />
      <rect x="77" y="16" width="13" height="26" rx="6.5" fill={tabColor} />
      <rect x="34" y="52" width="60" height="7" rx="3.5" fill="#fff" opacity="0.93" />
      <g fill="#fff" opacity="0.93">
        <circle cx="44" cy="76" r="5.5" />
        <circle cx="64" cy="76" r="5.5" />
        <circle cx="84" cy="76" r="5.5" />
        <circle cx="44" cy="93" r="5.5" />
        <circle cx="64" cy="93" r="5.5" />
      </g>
      <ellipse cx="40" cy="42" rx="12" ry="5" transform="rotate(-25 40 42)" fill="#fff" opacity="0.4" />
    </svg>
  )
}

export default AgendaIcon
