"use client";

import { motion } from "motion/react";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  Cpu,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { externalLinks, withUtm } from "@/lib/externalLinks";

export default function SchoolsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32">
      {/* Luces y mallas de fondo sutiles */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#1D5969]/15 via-[#19303E]/10 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-0 -z-10 h-96 w-96 rounded-full bg-[#FCD116]/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge superior */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#1D5969]/25 bg-white/80 px-4 py-1.5 text-xs sm:text-sm font-medium text-[#19303E] shadow-sm backdrop-blur"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-[#1D5969]">Lenio Schools</span>
            <span className="text-muted-foreground">·</span>
            <span>Centro de Mando Digital para Colegios</span>
            <span className="hidden sm:inline-flex rounded-full bg-[#1D5969]/10 px-2 py-0.5 text-[11px] font-bold text-[#1D5969]">
              Multi-Usuario
            </span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-[#19303E] sm:text-5xl lg:text-6xl leading-[1.12]"
          >
            El sistema operativo digital{" "}
            <span className="bg-gradient-to-r from-[#19303E] via-[#1D5969] to-[#0D9488] bg-clip-text text-transparent">
              para colegios e instituciones
            </span>
          </motion.h1>

          {/* Subtítulo explicativo */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600"
          >
            A diferencia del espacio personal para docentes independientes, el{" "}
            <strong className="font-semibold text-[#19303E]">Workspace Institucional de Lenio</strong> reúne a
            Rectores, Coordinadores, Jefes de Área y Docentes en un entorno multiusuario. Centraliza matrícula
            con código correlativo, currículo oficial de Colombia (Ley 115), motor de horarios por algoritmos y
            calificador jerárquico auditado.
          </motion.p>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
          >
            <Link
              href={withUtm(externalLinks.app, "schools-hero-start")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button className="w-full sm:w-auto h-12 px-7 bg-gradient-to-r from-[#19303E] to-[#1D5969] text-white font-medium text-base shadow-lg shadow-[#19303E]/20 hover:opacity-95 hover:shadow-xl transition-all">
                Iniciar prueba gratis de 15 días
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>

            <a href="#pilares" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-12 px-6 border-slate-300 bg-white hover:bg-slate-50 text-[#19303E] text-base font-medium shadow-sm"
              >
                Explorar los 10 Pilares del Módulo
              </Button>
            </a>
          </motion.div>

          {/* Micro-puntos de confianza */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-600" />
              15 días de prueba sin tarjeta
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-600" />
              Estudiantes ilimitados incluidos
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-600" />
              Normativa MEN y Decreto 1290 precargados
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-600" />
              Trazabilidad ISO 21001 & ISO 9001
            </span>
          </motion.div>

          {/* Maqueta interactiva / Vista previa del Centro de Mando */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-12 w-full max-w-5xl rounded-2xl border border-slate-200/90 bg-white p-2 sm:p-4 shadow-2xl shadow-slate-900/10"
          >
            {/* Barra superior de la ventana */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 px-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-red-400" />
                  <div className="size-3 rounded-full bg-amber-400" />
                  <div className="size-3 rounded-full bg-emerald-400" />
                </div>
                <div className="ml-3 flex items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  <GraduationCap className="size-3.5 text-[#1D5969]" />
                  <span>Colegio Campestre Los Andes · Año Lectivo 2026 (Calendario A)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 border border-emerald-200">
                  ● Min-Conflicts Solver: 0 Cruces
                </span>
                <span className="hidden md:inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-600">
                  Cloudflare R2: 24 GB / Sin límite egress
                </span>
              </div>
            </div>

            {/* Dashboard interior de Lenio Schools */}
            <div className="mt-3 grid gap-3 lg:grid-cols-4 text-left">
              {/* Tarjeta 1: Despliegue Zero-Setup */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-all hover:bg-white hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1D5969]">Pilar 1 · Despliegue</span>
                  <Sparkles className="size-4 text-[#FCD116]" />
                </div>
                <div className="mt-2 text-lg font-bold text-[#19303E]">Zero-Setup Colombia</div>
                <p className="mt-1 text-xs text-slate-500">
                  14 grados escolares (Prejardín a 11°) y las 9 áreas de la Ley 115 activadas al instante.
                </p>
                <div className="mt-3 inline-flex items-center gap-1 rounded bg-[#1D5969]/10 px-2 py-0.5 text-[11px] font-semibold text-[#1D5969]">
                  16 Normas MEN listas
                </div>
              </div>

              {/* Tarjeta 2: Matrícula & Código Correlativo */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-all hover:bg-white hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1D5969]">Pilar 3 · Matrícula</span>
                  <Users className="size-4 text-[#1D5969]" />
                </div>
                <div className="mt-2 text-lg font-bold text-[#19303E]">Código Correlativo</div>
                <p className="mt-1 text-xs text-slate-500">
                  EST-0001, EST-0002... Regla matemática de matrícula única anual sin duplicados.
                </p>
                <div className="mt-3 inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                  820 alumnos · Matrícula en lote
                </div>
              </div>

              {/* Tarjeta 3: Motor de Horarios */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-all hover:bg-white hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1D5969]">Pilar 5 · Horarios</span>
                  <Cpu className="size-4 text-[#1D5969]" />
                </div>
                <div className="mt-2 text-lg font-bold text-[#19303E]">Min-Conflicts Solver</div>
                <p className="mt-1 text-xs text-slate-500">
                  Generación de mallas complejas en segundos, respetando recreos, aulas y disponibilidad docente.
                </p>
                <div className="mt-3 inline-flex items-center gap-1 rounded bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-800">
                  Dry Run antes de publicar
                </div>
              </div>

              {/* Tarjeta 4: Gobernanza & Calidad */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-all hover:bg-white hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1D5969]">Pilar 10 · Calidad</span>
                  <ShieldCheck className="size-4 text-emerald-600" />
                </div>
                <div className="mt-2 text-lg font-bold text-[#19303E]">ISO 21001 & Ley 1581</div>
                <p className="mt-1 text-xs text-slate-500">
                  Segregación de funciones (Owner, Admin, Member), actas cerradas e inmutables con trazabilidad.
                </p>
                <div className="mt-3 inline-flex items-center gap-1 rounded bg-purple-100 px-2 py-0.5 text-[11px] font-semibold text-purple-800">
                  Habeas data para menores
                </div>
              </div>
            </div>

            {/* Fila inferior resumen visual */}
            <div className="mt-3 rounded-lg border border-slate-100 bg-slate-900 px-4 py-3 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-medium">Sesión institucional multiusuario activa:</span>
                <span className="text-slate-300">Rectoría, Coordinación Académica 10° y 11°, 28 Docentes conectados</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 font-mono text-[11px]">
                <span>Escala: 1.0 a 5.0 (Decreto 1290)</span>
                <span>·</span>
                <span>Calificador: 100% Jerárquico</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
