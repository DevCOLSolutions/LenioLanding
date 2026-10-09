"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GitCommitHorizontal,
  BellRing,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  PackageCheck,
  Sparkles,
  ArrowRight,
  Send,
  UserCheck,
  History,
  FileCheck2,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkflowStep {
  title: string;
  role: string;
  assignee: string;
  avatarText: string;
  status: "completed" | "current" | "pending";
  date: string;
  sla?: string;
  note?: string;
}

interface WorkflowDemo {
  id: string;
  title: string;
  badge: string;
  description: string;
  slaMax: string;
  isoStandard: string;
  steps: WorkflowStep[];
  currentTurnNote: string;
}

const DEMOS: WorkflowDemo[] = [
  {
    id: "grades",
    title: "Modificación Extemporánea de Calificaciones",
    badge: "Académico",
    description:
      "Ajustes de notas fuera de fecha con justificación pedagógica, doble visto bueno y bloqueo de auto-aprobación.",
    slaMax: "24 horas hábiles",
    isoStandard: "ISO 21001:2018 Cláusula 8.5",
    currentTurnNote:
      "El Prof. Ricardo radicó solicitud de cambio en Matemáticas 10°A por evaluación supletoria médica comprobada.",
    steps: [
      {
        title: "Radicación con evidencia",
        role: "Docente Titular",
        assignee: "Prof. Ricardo Silva",
        avatarText: "RS",
        status: "completed",
        date: "Hoy, 08:30 AM",
        note: "Adjuntó certificado médico y examen supletorio calificado (4.6/5.0).",
      },
      {
        title: "Validación Pedagógica",
        role: "Jefe de Área",
        assignee: "Lic. Martha Gómez",
        avatarText: "MG",
        status: "completed",
        date: "Hoy, 10:15 AM",
        note: "Aprobado: coincide con el estándar de evaluación y derecho de reposición.",
      },
      {
        title: "Autorización de Apertura",
        role: "Coordinación Académica",
        assignee: "¡Es tu turno!",
        avatarText: "TU",
        status: "current",
        date: "Esperando tu decisión",
        sla: "Quedan 3h 45m para cumplir SLA",
        note: "Revisa la justificación y autoriza la actualización en el libro de calificaciones oficial.",
      },
      {
        title: "Actualización & Asiento Oficial",
        role: "Secretaría Académica",
        assignee: "Sistema Automático",
        avatarText: "SA",
        status: "pending",
        date: "Al completar etapa 3",
        note: "Registro inmutable con sello criptográfico y notificación al acudiente.",
      },
    ],
  },
  {
    id: "requisition",
    title: "Requerimiento de Materiales y Aula Especial",
    badge: "Recursos & Laboratorios",
    description:
      "Solicitud de reactivos, proyectores y laboratorio de química para proyectos STEAM con control de inventario.",
    slaMax: "48 horas hábiles",
    isoStandard: "ISO 9001:2015 Cláusula 7.1.3",
    currentTurnNote:
      "Área de Ciencias requiere microscopios y reactivos para feria de ciencias el 14 de Noviembre.",
    steps: [
      {
        title: "Requisición y Ficha Técnica",
        role: "Docente de Ciencias",
        assignee: "Lic. Carlos Navarro",
        avatarText: "CN",
        status: "completed",
        date: "Ayer, 03:20 PM",
        note: "Lista de insumos: 12 placas portaobjetos y uso de sala digital 3.",
      },
      {
        title: "Disponibilidad de Almacén",
        role: "Encargado de Inventario",
        assignee: "Sonia Beltrán",
        avatarText: "SB",
        status: "completed",
        date: "Hoy, 09:00 AM",
        note: "Insumos reservados en stock. No requiere compra adicional.",
      },
      {
        title: "Aprobación y Reserva de Espacio",
        role: "Coordinación de Recursos",
        assignee: "¡Es tu turno!",
        avatarText: "TU",
        status: "current",
        date: "Esperando tu decisión",
        sla: "Quedan 8h 10m para cumplir SLA",
        note: "Confirma el horario sin cruce con otras secciones para bloquear el espacio en la agenda institucional.",
      },
      {
        title: "Confirmación y Despacho",
        role: "Logística Escolar",
        assignee: "Equipo de Servicios",
        avatarText: "ES",
        status: "pending",
        date: "Al completar etapa 3",
        note: "Preparación de equipos y firma de entrega en conserjería.",
      },
    ],
  },
  {
    id: "curriculum",
    title: "Revisión y Aprobación de Planeador Semanal",
    badge: "Gestión Curricular",
    description:
      "Alineación de objetivos de aprendizaje, evidencias pedagógicas y adaptaciones PIAR antes de iniciar semana.",
    slaMax: "12 horas hábiles",
    isoStandard: "ISO 21001:2018 Cláusula 8.2.2",
    currentTurnNote:
      "Planeador curricular grado 7° con integración de herramientas de IA contextualizadas y rúbrica formativa.",
    steps: [
      {
        title: "Carga de Secuencia Didáctica",
        role: "Docente de Humanidades",
        assignee: "Prof. Andrea Ortiz",
        avatarText: "AO",
        status: "completed",
        date: "Lunes, 07:00 AM",
        note: "Incluye adaptaciones para 2 estudiantes con adecuación PIAR.",
      },
      {
        title: "Visto Bueno Inclusión / Orientación",
        role: "Orientación Escolar",
        assignee: "Psic. David Torres",
        avatarText: "DT",
        status: "completed",
        date: "Lunes, 11:30 AM",
        note: "Estrategias de ajuste curricular validadas favorablemente.",
      },
      {
        title: "Visto Bueno de Coordinación",
        role: "Coordinación Pedagógica",
        assignee: "¡Es tu turno!",
        avatarText: "TU",
        status: "current",
        date: "Esperando tu decisión",
        sla: "Quedan 2h 15m para cumplir SLA",
        note: "Verifica coherencia con el DBA (Derechos Básicos de Aprendizaje) y autoriza el inicio de unidad.",
      },
      {
        title: "Publicación a Estudiantes y Familias",
        role: "Plataforma Escolar",
        assignee: "Sistema Automático",
        avatarText: "SA",
        status: "pending",
        date: "Al completar etapa 3",
        note: "Sincronización instantánea con la agenda de clase de los alumnos.",
      },
    ],
  },
];

export default function WorkflowsSection() {
  const [activeDemoId, setActiveDemoId] = useState<string>("grades");
  const [simulatedAction, setSimulatedAction] = useState<"idle" | "approved" | "changes">("idle");

  const currentDemo = DEMOS.find((d) => d.id === activeDemoId) || DEMOS[0];

  const handleSelectDemo = (id: string) => {
    setActiveDemoId(id);
    setSimulatedAction("idle");
  };

  return (
    <section
      id="flujos"
      className="scroll-mt-20 relative w-full py-24 sm:py-32 bg-gradient-to-b from-white via-slate-50/70 to-white overflow-hidden border-t border-slate-100"
    >
      {/* Elementos ambientales de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#1D5969]/10 via-[#FFC83D]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 right-10 w-96 h-96 bg-slate-200/40 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* 1. ENCABEZADO DE SECCIÓN CON ANIMACIÓN                                   */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#19303E]/5 border border-[#19303E]/10 text-xs font-medium text-[#19303E] mb-5 shadow-xs"
          >
            <GitCommitHorizontal className="w-3.5 h-3.5 text-[#1D5969]" />
            <span>Automatización & Gobernanza Institucional</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#19303E] leading-[1.15]"
          >
            Crea, programa y despacha flujos escolares.{" "}
            <span className="bg-gradient-to-r from-[#19303E] via-[#1D5969] to-[#FFC83D] bg-clip-text text-transparent">
              El sistema te avisa cuando es tu turno.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed text-balance"
          >
            Elimina cadenas interminables de correos y documentos perdidos. Configura circuitos de aprobación para
            calificaciones, permisos, requisiciones y planeaciones con tiempos SLA claros, firmas digitales y rigor
            normativo ISO.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* 2. LOS 3 PILARES CLAVE: CREA, PROGRAMA, NOTIFICACIÓN TU TURNO             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Pilar 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-[#19303E] mb-5 border border-slate-200">
              <FileSpreadsheet className="w-5 h-5 text-[#1D5969]" />
            </div>
            <h3 className="text-lg font-semibold text-[#19303E] mb-2">1. Diseña y personaliza</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Modela flujos lineales o con condiciones específicas. Asigna roles precisos (Docente, Coordinador,
              Rectoría) y garantiza que quien solicita nunca pueda auto-aprobarse.
            </p>
          </motion.div>

          {/* Pilar 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 mb-5 border border-amber-200">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-[#19303E] mb-2">2. Programa y define SLAs</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Establece plazos máximos por etapa (horas o días hábiles). El sistema sincroniza con el calendario escolar
              y previene cuellos de botella antes del cierre de periodo.
            </p>
          </motion.div>

          {/* Pilar 3 - Destacado "Tu Turno" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#19303E] to-[#1D5969] text-white shadow-md shadow-slate-900/10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-28 h-28 bg-[#FFC83D]/20 rounded-full blur-xl pointer-events-none" />
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-[#FFC83D] mb-5 border border-white/20">
              <BellRing className="w-5 h-5 text-[#FFC83D] animate-bounce" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-white">3. Notificación: «Es tu turno»</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFC83D] text-[#19303E]">
                En vivo
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              Cuando el trámite avanza, el responsable recibe una alerta instantánea en su bandeja. Con un solo clic
              revisa evidencias, aprueba o solicita ajustes con observaciones.
            </p>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 3. SIMULADOR INTERACTIVO DE FLUJO ESCOLAR                                  */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden"
        >
          {/* Barra superior de pestañas de flujos */}
          <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#1D5969]" />
              <span>Explora flujos reales en colegios:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {DEMOS.map((demo) => {
                const isSelected = demo.id === activeDemoId;
                return (
                  <button
                    key={demo.id}
                    onClick={() => handleSelectDemo(demo.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-[#19303E] text-white shadow-xs"
                        : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-slate-200"
                    }`}
                  >
                    {demo.badge}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cuerpo interactivo del flujo */}
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Header del trámite actual */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1D5969] bg-[#1D5969]/10 px-2.5 py-0.5 rounded-md">
                    {currentDemo.badge}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    SLA Máximo: <strong className="text-slate-700">{currentDemo.slaMax}</strong>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#19303E]">{currentDemo.title}</h3>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl">{currentDemo.description}</p>
              </div>

              {/* Sello de Auditoría ISO */}
              <div className="self-start lg:self-center px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-left">
                  <p className="text-[11px] font-semibold text-slate-800 leading-tight">Auditoría Inmutable</p>
                  <p className="text-[10px] text-slate-500">{currentDemo.isoStandard}</p>
                </div>
              </div>
            </div>

            {/* PIPELINE / TIMELINE DE ETAPAS */}
            <div className="relative mb-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {currentDemo.steps.map((step, idx) => {
                  const isCurrent = step.status === "current";
                  const isCompleted = step.status === "completed" || (isCurrent && simulatedAction === "approved");

                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                      className={`relative flex flex-col p-4 rounded-xl border transition-all ${
                        isCurrent
                          ? "bg-amber-50/50 border-amber-300 ring-2 ring-amber-400/20 shadow-sm"
                          : isCompleted
                          ? "bg-slate-50/70 border-emerald-200"
                          : "bg-slate-50/30 border-slate-200/60 opacity-70"
                      }`}
                    >
                      {/* Cabecera del paso */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                          Paso 0{idx + 1}
                        </span>
                        {isCompleted ? (
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Resuelto
                          </span>
                        ) : isCurrent ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-[#FFC83D] px-2.5 py-0.5 rounded-full shadow-xs animate-pulse">
                            <BellRing className="w-3 h-3" /> ¡Tu turno!
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium">En espera</span>
                        )}
                      </div>

                      {/* Título de la etapa */}
                      <h4 className="text-sm font-bold text-[#19303E] leading-snug mb-1">{step.title}</h4>
                      <p className="text-xs text-slate-500 mb-3">{step.role}</p>

                      {/* Responsable & Avatar */}
                      <div className="mt-auto pt-3 border-t border-slate-200/60 flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isCurrent
                              ? "bg-[#19303E] text-[#FFC83D]"
                              : isCompleted
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {step.avatarText}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-slate-800 truncate">{step.assignee}</p>
                          <p className="text-[10px] text-slate-400 truncate">{step.date}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* INTERACCIÓN VIVA: "ES TU TURNO DE ACTUAR" */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-[#19303E] text-white shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Lado izquierdo: Notificación simulada */}
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
                    </span>
                    <span className="text-xs font-semibold text-[#FFC83D] tracking-wide uppercase">
                      Bandeja activa • Coordinación Académica
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <BellRing className="w-5 h-5 text-[#FFC83D]" />
                    Tienes 1 solicitud asignada esperando tu visto bueno
                  </h4>

                  <p className="text-sm text-slate-300 leading-relaxed">{currentDemo.currentTurnNote}</p>

                  <div className="flex items-center gap-4 pt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      SLA: Quedan 3h 45m
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                      Evidencias anexadas verificadas
                    </span>
                  </div>
                </div>

                {/* Lado derecho: Acciones de decisión interactiva */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {simulatedAction === "idle" && (
                    <>
                      <Button
                        onClick={() => setSimulatedAction("changes")}
                        variant="outline"
                        className="bg-transparent border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white text-xs h-10 px-4"
                      >
                        <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-400" />
                        Pedir correcciones
                      </Button>

                      <Button
                        onClick={() => setSimulatedAction("approved")}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs h-10 px-5 shadow-sm"
                      >
                        <UserCheck className="w-4 h-4 mr-1.5" />
                        Aprobar y firmar
                      </Button>
                    </>
                  )}

                  {simulatedAction === "approved" && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-3 bg-emerald-950/80 border border-emerald-500/40 px-4 py-2.5 rounded-xl text-emerald-200 text-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <p className="font-semibold text-white">¡Aprobado con éxito!</p>
                        <p className="text-[11px] text-emerald-300">
                          Se despachó la notificación a Secretaría y al docente.
                        </p>
                      </div>
                      <button
                        onClick={() => setSimulatedAction("idle")}
                        className="ml-2 text-slate-400 hover:text-white p-1"
                        title="Reiniciar simulador"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}

                  {simulatedAction === "changes" && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-3 bg-amber-950/80 border border-amber-500/40 px-4 py-2.5 rounded-xl text-amber-200 text-xs"
                    >
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <p className="font-semibold text-white">Observaciones enviadas</p>
                        <p className="text-[11px] text-amber-300">
                          El docente fue notificado para adjuntar el anexo faltante.
                        </p>
                      </div>
                      <button
                        onClick={() => setSimulatedAction("idle")}
                        className="ml-2 text-slate-400 hover:text-white p-1"
                        title="Reiniciar simulador"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 4. BENEFICIOS INSTITUCIONALES EN FILA                                    */}
        {/* ========================================================================= */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-white border border-slate-200/70">
            <p className="text-2xl font-bold text-[#19303E]">0 Papeles</p>
            <p className="text-xs text-slate-500 mt-0.5">Radicación 100% digital y sin extravíos</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200/70">
            <p className="text-2xl font-bold text-[#1D5969]">100% Auditado</p>
            <p className="text-xs text-slate-500 mt-0.5">Fecha, hora, IP y usuario en cada decisión</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200/70">
            <p className="text-2xl font-bold text-emerald-600">-70% Tiempo</p>
            <p className="text-xs text-slate-500 mt-0.5">Resolución más rápida con alertas "Tu Turno"</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200/70">
            <p className="text-2xl font-bold text-[#19303E]">ISO 21001</p>
            <p className="text-xs text-slate-500 mt-0.5">Cumple estándares de calidad educativa</p>
          </div>
        </div>
      </div>
    </section>
  );
}
