"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Building2,
  Users,
  BookOpen,
  Cpu,
  Award,
  GitBranch,
  FileText,
  Cloud,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { externalLinks, withUtm } from "@/lib/externalLinks";

interface Pillar {
  number: string;
  category: "normativa" | "operacion" | "gobernanza";
  categoryLabel: string;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Sparkles;
  highlights: string[];
  metricBadge: string;
  normativeCode?: string;
}

const PILLARS: Pillar[] = [
  {
    number: "01",
    category: "normativa",
    categoryLabel: "Despliegue & Currículo",
    title: "Despliegue Zero-Setup Colombia",
    tagline: "Listo para operar en 5 minutos bajo la normativa nacional",
    description:
      "Precargado con los 14 grados escolares del sistema educativo colombiano (Prejardín, Jardín, Transición y Primaria/Secundaria de 1° a 11°). Incorpora de fábrica las 9 áreas fundamentales y 16 asignaturas de la Ley 115 de 1994.",
    icon: Sparkles,
    highlights: [
      "14 grados y ciclos MEN automáticos",
      "9 áreas obligatorias de la Ley General de Educación",
      "Configuración instantánea de Calendario A y B"
    ],
    metricBadge: "100% Alineado MEN",
    normativeCode: "Ley 115 de 1994 · Art. 23"
  },
  {
    number: "02",
    category: "operacion",
    categoryLabel: "Estructura Institucional",
    title: "Arquitectura Multisede & Jornadas",
    tagline: "Unifica campus principal, sedes rurales y múltiples turnos",
    description:
      "Gestiona sedes descentralizadas con jornadas mañana, tarde, única o nocturna en un único panel rectoral. Permite compartir o segregar plantas docentes sin duplicar bases de datos ni generar discrepancias.",
    icon: Building2,
    highlights: [
      "Sedes urbanas y rurales en un único sistema",
      "Jornadas segregadas con calendarios independientes",
      "Consolidado directivo centralizado en tiempo real"
    ],
    metricBadge: "Sedes ilimitadas",
    normativeCode: "Decreto 1075 de 2015"
  },
  {
    number: "03",
    category: "operacion",
    categoryLabel: "Admisiones & Cupos",
    title: "Matrícula con Código Correlativo",
    tagline: "Regla matemática estricta para evitar duplicidad y desorden",
    description:
      "Asignación automática de identificador institucional correlativo (EST-0001, EST-0002...) por cohorte y año lectivo. Matrícula individual o masiva mediante importación asistida con validación estricta de cupos por aula física.",
    icon: Users,
    highlights: [
      "Secuencia correlativa matemática inmutable",
      "Alertas automáticas de aforo máximo por salón",
      "Importador inteligente de archivos SIMAT / Excel"
    ],
    metricBadge: "0 Duplicados",
    normativeCode: "SIMAT Compatible"
  },
  {
    number: "04",
    category: "normativa",
    categoryLabel: "Pedagogía Oficial",
    title: "Malla Curricular & Intensidades IHS",
    tagline: "Estandarización de contenidos y carga horaria semanal",
    description:
      "Estructura las Intensidades Horarias Semanales (IHS) de cada área y asignatura. Distribuye horas de clase por grado, define competencias (cognitivas, procedimentales y actitudinales) y asegura el cumplimiento del plan de estudios.",
    icon: BookOpen,
    highlights: [
      "Balanceo exacto de horas semanales por docente",
      "Competencias y Desempeños DBA precargados",
      "Planes de área sincronizados entre profesores"
    ],
    metricBadge: "Control IHS Exacto",
    normativeCode: "Derechos Básicos de Aprendizaje (DBA)"
  },
  {
    number: "05",
    category: "operacion",
    categoryLabel: "Algoritmos & Horarios",
    title: "Motor de Horarios (Min-Conflicts Solver)",
    tagline: "Resuelve mallas horarias gigantes en segundos sin cruces",
    description:
      "Algoritmo matemático de satisfacción de restricciones (CSP). Elimina horas muertas, respeta descansos pedagógicos, asigna aulas especializadas (laboratorios, informática, canchas) y cuenta con simulación 'Dry Run' previa a la publicación.",
    icon: Cpu,
    highlights: [
      "0 cruces de docentes y aulas garantizado",
      "Optimización de recreos y bloques pedagógicos",
      "Modo simulación 'Dry Run' antes de publicar"
    ],
    metricBadge: "Cálculo en < 10 seg",
    normativeCode: "Algoritmo CSP Heurístico"
  },
  {
    number: "06",
    category: "normativa",
    categoryLabel: "Evaluación & Calificaciones",
    title: "Calificador Jerárquico Auditado",
    tagline: "Decreto 1290 de 2009 con cálculo exacto a dos decimales",
    description:
      "Escala nacional oficial (1.0 a 5.0) con homologación a Desempeño Superior, Alto, Básico y Bajo. Ponderación por períodos (25% / 25% / 25% / 25% o configurable), redondeo institucional y cierre formal de planillas con candado digital.",
    icon: Award,
    highlights: [
      "Escala numérica 1.0 - 5.0 y escala cualitativa",
      "Cálculo automático de acumulados y definitivas",
      "Cierre con candado criptográfico por período"
    ],
    metricBadge: "Decreto 1290",
    normativeCode: "Decreto 1290 de 2009 (SIEE)"
  },
  {
    number: "07",
    category: "gobernanza",
    categoryLabel: "Gobernanza & Auditoría",
    title: "Flujos de Aprobación & Visto Bueno",
    tagline: "Trazabilidad formal en cambios extemporáneos de notas",
    description:
      "Cuando un período cierra, ningún docente puede alterar una nota unilateralmente. Las solicitudes de ajuste extemporáneo requieren radicación con evidencia pedagógica (médica, supletorio), aprobación de Coordinación y firma final de Rectoría con SLA medible.",
    icon: GitBranch,
    highlights: [
      "Bloqueo estricto de auto-aprobación",
      "Doble visto bueno con justificación formal",
      "Notificaciones 'Es tu turno' a directivos"
    ],
    metricBadge: "SLA < 24 Horas",
    normativeCode: "Auditoría ISO 21001 Cl. 8.5"
  },
  {
    number: "08",
    category: "normativa",
    categoryLabel: "Reportes & Secretaría",
    title: "Boletines Oficiales & Comisiones",
    tagline: "Generación masiva de informes académicos en PDF de alta fidelidad",
    description:
      "Emisión instantánea de boletines periódicos y consolidados finales con código QR de verificación, puestos por curso, puestos por grado y actas oficiales de comisiones de evaluación y promoción para radicar ante Secretarías de Educación.",
    icon: FileText,
    highlights: [
      "PDFs vectoriales listos para imprimir o enviar",
      "Actas de comisiones de promoción automáticas",
      "Puestos y promedios ponderados en tiempo real"
    ],
    metricBadge: "Listos en 1 Clic",
    normativeCode: "Formatos MEN Oficiales"
  },
  {
    number: "09",
    category: "operacion",
    categoryLabel: "Infraestructura & Cloud",
    title: "Almacenamiento Cloudflare R2",
    tagline: "Repositorio institucional sin costos ocultos por descarga",
    description:
      "Almacena guías, evidencias pedagógicas, planes de mejoramiento, resoluciones y documentos institucionales. Respaldado en infraestructura edge de alta velocidad, con cifrado en reposo y sin penalizaciones por tráfico de datos.",
    icon: Cloud,
    highlights: [
      "Sin cobros abusivos por descargas (Zero-Egress)",
      "Cifrado en tránsito (TLS 1.3) y en reposo (AES-256)",
      "Respaldo diario continuo y disponibilidad 99.9%"
    ],
    metricBadge: "Cloudflare Edge",
    normativeCode: "Cifrado Militar AES-256"
  },
  {
    number: "10",
    category: "gobernanza",
    categoryLabel: "Seguridad & Calidad",
    title: "Gobernanza, ISO 21001 & Habeas Data",
    tagline: "Protección rigurosa de datos de menores y segregación de roles",
    description:
      "Segregación estricta de funciones entre Propietario, Rectoría, Coordinación, Docentes y Auditores. Registro de eventos inmutable (Audit Log) y cumplimiento riguroso de la Ley 1581 de 2012 para el tratamiento de datos de niños y adolescentes.",
    icon: ShieldCheck,
    highlights: [
      "Roles y privilegios granulares basados en RBAC",
      "Bitácora forense de auditoría inalterable",
      "Cumplimiento Ley 1581 Habeas Data de menores"
    ],
    metricBadge: "ISO 21001 & 9001",
    normativeCode: "Ley Estatutaria 1581 de 2012"
  }
];

export default function SchoolsPillars() {
  const [selectedCategory, setSelectedCategory] = useState<
    "todos" | "normativa" | "operacion" | "gobernanza"
  >("todos");

  const filteredPillars =
    selectedCategory === "todos"
      ? PILLARS
      : PILLARS.filter((p) => p.category === selectedCategory);

  return (
    <section id="pilares" className="scroll-mt-20 py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la sección */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1D5969]/30 bg-white px-3.5 py-1 text-xs font-semibold text-[#19303E] shadow-xs">
            <Layers className="size-3.5 text-[#1D5969]" />
            <span>Módulo Institucional Integral</span>
          </div>

          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-[#19303E] sm:text-4xl lg:text-5xl">
            Los 10 Pilares del Centro de Mando Lenio
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Cada componente fue modelado según los requerimientos operativos reales de colegios públicos y
            privados en Colombia. Sin adaptaciones forzadas: ingeniería pura al servicio de la educación.
          </p>

          {/* Filtros por categoría */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "todos", label: "Todos los Pilares (10)" },
              { id: "normativa", label: "Normativa MEN & Currículo" },
              { id: "operacion", label: "Operación & Algoritmos" },
              { id: "gobernanza", label: "Gobernanza & Auditoría" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id as typeof selectedCategory)}
                className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === tab.id
                    ? "bg-[#19303E] text-white shadow-md shadow-[#19303E]/15"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid interactivo de Pilares */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.article
                  layout
                  key={pillar.number}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[#1D5969]/40 hover:shadow-xl hover:shadow-[#19303E]/5"
                >
                  <div>
                    {/* Header de la tarjeta */}
                    <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#19303E] to-[#1D5969] text-white shadow-sm shadow-[#19303E]/20 transition-transform group-hover:scale-105">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold tracking-wider uppercase text-[#1D5969]">
                            {pillar.categoryLabel}
                          </span>
                          <div className="font-mono text-xs font-semibold text-slate-400">
                            Pilar {pillar.number}
                          </div>
                        </div>
                      </div>

                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                        {pillar.metricBadge}
                      </span>
                    </div>

                    {/* Contenido principal */}
                    <div className="mt-4">
                      <h3 className="font-heading text-xl font-bold text-[#19303E] group-hover:text-[#1D5969] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-slate-500">
                        {pillar.tagline}
                      </p>
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Lista de aspectos clave */}
                    <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                      {pillar.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer de la tarjeta con referencia normativa */}
                  {pillar.normativeCode && (
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400 font-mono">
                      <span>{pillar.normativeCode}</span>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Banner CTA integrado */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#19303E] via-[#1D5969] to-[#19303E] p-8 text-white shadow-xl sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <span className="rounded-full bg-[#FCD116]/20 px-3 py-1 text-xs font-bold text-[#FCD116] uppercase tracking-wider">
              Migración Acompañada
            </span>
            <h3 className="mt-3 font-heading text-2xl font-bold sm:text-3xl">
              ¿Tu colegio ya usa otra plataforma académica?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-200 leading-relaxed">
              El equipo de ingeniería de Lenio migra tus listas de estudiantes, asignaturas y registros
              históricos en menos de 48 horas sin costo adicional.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href={withUtm(externalLinks.app, "schools-pillars-start")}>
              <Button className="h-11 px-6 bg-white text-[#19303E] hover:bg-slate-100 font-semibold shadow-md">
                Comenzar prueba gratis de 15 días
                <ArrowUpRight className="ml-1.5 size-4" />
              </Button>
            </Link>
            <Link href={externalLinks.contacto}>
              <Button variant="outline" className="h-11 px-6 border-white/30 text-white bg-transparent hover:bg-white/10 font-medium">
                Hablar con un Asesor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
