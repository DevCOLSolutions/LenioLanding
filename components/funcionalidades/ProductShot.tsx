"use client"

import Image from "next/image"

/**
 * Ventana con el dashboard real de Lenio. Se usa en la intro
 * y en layouts tipo showcase para anclar el producto.
 */
export function ProductShot({
  alt,
  label = "Lenio",
  ratio = "aspect-[16/10]",
}: {
  alt: string
  label?: string
  ratio?: string
}) {
  return (
    <div className="relative">
      <div
        data-feature-parallax
        className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_45px_90px_-32px_rgba(15,23,42,0.4)]"
      >
        <div className="flex items-center gap-1.5 border-b border-black/5 bg-neutral-50 px-4 py-3">
          <span className="size-2.5 rounded-full bg-neutral-300" />
          <span className="size-2.5 rounded-full bg-neutral-300" />
          <span className="size-2.5 rounded-full bg-neutral-300" />
          <span className="ml-auto truncate pr-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            {label}
          </span>
        </div>
        <div className={`relative w-full ${ratio} overflow-hidden bg-neutral-100`}>
          <Image
            src="/lenio_das.png"
            alt={alt}
            fill
            sizes="(min-width: 768px) 25vw, 100vw"
            className="object-cover object-top"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}