import React, { useId } from "react"
import { cn } from "@/lib/utils"

export interface InboxIconProps extends React.SVGProps<SVGSVGElement> {
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

export function InboxIcon({
  size = 24,
  width,
  height,
  grayscale = false,
  gray = false,
  className,
  ...props
}: InboxIconProps) {
  const id = useId().replace(/:/g, "")
  const isGray = grayscale || gray

  const finalWidth = width ?? size
  const finalHeight = height ?? size

  const gradientId = `g-inbox-${id}`
  const shadowId = `s-inbox-${id}`

  const stops = isGray
    ? {
      start: "#CBD5E1",
      mid: "#64748B",
      end: "#334155",
    }
    : {
      start: "#8FE3FF",
      mid: "#22B8F0",
      end: "#0A86C8",
    }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={finalWidth}
      height={finalHeight}
      role="img"
      aria-label="Inbox"
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
        d="M102 26 26 56 56 68 68 102Z"
        fill={`url(#${gradientId})`}
        stroke={`url(#${gradientId})`}
        strokeWidth="12"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M58 68 94 34"
        stroke="#fff"
        strokeOpacity="0.9"
        strokeWidth="6"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <ellipse cx="46" cy="48" rx="9" ry="4" transform="rotate(-30 46 48)" fill="#fff" opacity="0.4" />
    </svg>
  )
}

export default InboxIcon
