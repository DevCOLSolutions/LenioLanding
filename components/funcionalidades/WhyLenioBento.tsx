"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { externalLinks } from "@/lib/externalLinks";
import { ArrowUpRight } from "lucide-react";

export function WhyLenioBento() {
  return (
    <section
      id="why"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center scroll-mt-16 bg-white py-12 lg:py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-8 md:mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            POR QUÉ LENIO
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl lg:text-4xl">
            Diseñado para la realidad del docente en Latinoamérica
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[auto_auto_auto]">
          {/* HERO CARD */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#19303E] via-[#1C4654] to-[#1D5969] p-8 text-white shadow-xl md:col-span-2 md:p-10">
            <h3 className="mb-4 text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
              Hecho para el colegio de verdad, no para el ideal
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-neutral-200 md:text-base">
              Muchos colegios —sobre todo los públicos y los medianos— hoy
              sobreviven dispersos entre Excel, chats informales y carpetas físicas.
              Lenio no te pide que cambies cómo enseñas, solo te da un lugar
              unificado donde todo tu trabajo finalmente encaja.
            </p>
          </div>

          {/* IMAGEN 1: Profesor en aula */}
          <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-neutral-200/80 shadow-sm md:row-span-2">
            <Image
              src="/teacher.png"
              alt="Profesor revisando su clase en el salón"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Card: Simplicidad */}
          <div className="rounded-3xl border border-neutral-200/80 bg-neutral-50/80 p-8 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:bg-white">
            <h4 className="mb-2 text-lg font-semibold text-neutral-900 md:text-xl">
              Se aprende en un recreo
            </h4>
            <p className="text-xs leading-relaxed text-neutral-600 md:text-sm">
              Nada de capacitaciones interminables de 40 horas. Si sabes usar
              WhatsApp y enviar un correo, sabes usar Lenio. Probado y validado
              con docentes reales.
            </p>
          </div>

          {/* IMAGEN 2: Sala de profesores / comunidad */}
          <div className="relative min-h-[220px] overflow-hidden rounded-3xl border border-neutral-200/80 shadow-sm">
            <Image
              src="/chars.png"
              alt="Profesores en equipo"
              fill
              className="object-cover object-top transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Card: Organización */}
          <div className="rounded-3xl border border-neutral-200/80 bg-neutral-50/80 p-8 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:bg-white">
            <h4 className="mb-2 text-lg font-semibold text-neutral-900 md:text-xl">
              Documentación lista cuando la pidan
            </h4>
            <p className="text-xs leading-relaxed text-neutral-600 md:text-sm">
              Planeaciones, seguimiento y evidencias organizadas automáticamente,
              para que una revisión de Secretaría o auditoría ISO no te tome
              por sorpresa un lunes.
            </p>
          </div>

          {/* Card: Escalable — ancha */}
          <div className="rounded-3xl bg-gradient-to-r from-[#1D5969] to-[#19303E] p-8 text-white shadow-xl md:col-span-3 md:p-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h4 className="mb-2 text-xl font-bold text-white md:text-2xl">
                  Empieza tú solo, sin pedirle permiso a nadie
                </h4>
                <p className="max-w-xl text-xs leading-relaxed text-neutral-300 md:text-sm">
                  Pruébalo como docente gratis. Si te sirve, tu colegio lo adopta
                  completo cuando esté listo — no al revés.
                </p>
              </div>
              <Link href={externalLinks.app} target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-600 hover:shadow-lg">
                  Empieza gratis <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyLenioBento;
