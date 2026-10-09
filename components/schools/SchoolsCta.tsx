"use client";

import { motion } from "motion/react";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  CalendarCheck,
  Users,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { externalLinks, withUtm } from "@/lib/externalLinks";

export default function SchoolsCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-white border-t border-slate-100">
      {/* Fondo con resplandores sutiles */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 -z-10 h-[450px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#1D5969]/10 via-[#FCD116]/5 to-transparent blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-[#19303E] via-[#1D5969] to-[#12232D] p-8 sm:p-14 lg:p-16 text-white shadow-2xl">
          {/* Malla decorativa de fondo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
          />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
              <GraduationCap className="size-4 text-[#FCD116]" />
              <span>Workspace Institucional para Colegios</span>
            </div>

            {/* Titular */}
            <h2 className="mt-6 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-[1.15]">
              El centro de mando que tu equipo directivo y docente merece
            </h2>

            {/* Bajada */}
            <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed text-balance">
              Únete a las instituciones que ya transformaron sus procesos académicos, eliminaron los
              cruces de horarios y auditan sus calificaciones con pleno apego a la normativa colombiana.
            </p>

            {/* Micro-puntos de valor */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Estudiantes ilimitados
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Capacitación en vivo incluida
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Soporte prioritario directo
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Sin contratos de permanencia
              </span>
            </div>

            {/* Botones de acción */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={withUtm(externalLinks.app, "schools-cta-start")}
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto h-12 px-8 bg-white text-[#19303E] hover:bg-slate-100 font-semibold text-base shadow-lg shadow-black/20">
                  Iniciar prueba gratis de 15 días
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>

              <Link
                href={externalLinks.contacto}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-7 border-white/30 text-white bg-white/10 hover:bg-white/20 font-medium text-base backdrop-blur"
                >
                  <PhoneCall className="mr-2 size-4 text-[#FCD116]" />
                  Solicitar demo con un asesor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
