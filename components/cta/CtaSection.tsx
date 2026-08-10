"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { externalLinks } from "@/lib/externalLinks";
import { Button } from "../ui/button";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section
      id="cta"
      className="relative mt-10 w-full overflow-hidden border-y border-neutral-200/80 bg-muted/60 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative z-10 max-w-xl text-center lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-[#19303E] sm:text-4xl lg:text-5xl leading-[1.15]">
            Comienza a usar Lenio hoy
          </h2>

          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-md">
            Lenio es la plataforma diseñada para potenciar el trabajo docente, integrar equipos y acompañar procesos de calidad. Crea tu espacio personal en minutos y conecta con funcionalidades pensadas para transformar tu labor diaria.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Link href={externalLinks.app} target="_blank" rel="noopener noreferrer">
              <Button className="inline-flex h-10 items-center justify-center gap-2 bg-gradient-to-r from-[#19303E] to-[#1D5969] px-7 text-base hover:opacity-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1D5969]/50">
                {t("button")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Imagen lenio_das.png con rounded-2xl, borde normal (oculta en móvil) */}
      <div className="pointer-events-none absolute hidden lg:block lg:-bottom-40 lg:right-16 z-0 lg:opacity-100">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-2 shadow-2xl">
          <Image
            src="/lenio_das.png"
            alt="Lenio Dashboard Background"
            width={650}
            height={480}
            className="h-auto w-[580px] max-w-none object-contain rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
