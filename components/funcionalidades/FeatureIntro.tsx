"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/*  1. CONTENIDO — 8 Funcionalidades Integradas de Lenio              */
/* ------------------------------------------------------------------ */

type MockupKind =
  | "workspaces"
  | "repository"
  | "teams"
  | "classes"
  | "inbox"
  | "builder"
  | "ai"
  | "agenda";

interface FeatureContent {
  id: string;
  title: string;
  highlight?: string;
  description?: string;
  bullets?: string[];
  indicator?: string;
  stat?: { value: string; label: string };
  mockup?: MockupKind;
  aiPrompt?: string;
}

const features: FeatureContent[] = [
  {
    id: "workspaces",
    title: "Espacios de trabajo",
    highlight: "Tu espacio. Tu contexto.",
    description:
      "Arquitectura conceptual diseñada para separar y organizar la vida docente.",
    bullets: [
      "Espacio personal para tu trabajo docente.",
      "Espacios institucionales para trabajar con tu colegio.",
      "Puedes pertenecer a varios espacios de trabajo.",
      "Tu información personal permanece contigo siempre.",
      "Cada workspace mantiene su contexto, información y permisos.",
    ],
    indicator: "Arquitectura Multi-Contexto",
    mockup: "workspaces",
  },
  {
    id: "repository",
    title: "Repositorio",
    highlight: "Todo tu trabajo docente. En un solo lugar.",
    description:
      "Tu trabajo docente no debería estar repartido entre carpetas, chats y correos.",
    bullets: [
      "Repositorio centralizado de recursos y documentos.",
      "Control de versiones, historial y trazabilidad.",
      "Flujos compatibles con procesos de calidad e ISO.",
      "Comparte únicamente lo que necesites.",
    ],
    indicator: "ISO & Calidad Docente",
    mockup: "repository",
  },
  {
    id: "teams",
    title: "Equipos",
    highlight: "Trabaja con las personas que necesitas.",
    description:
      "No es simplemente un grupo de chat; es un verdadero espacio colaborativo con control de flujos.",
    bullets: [
      "Semilleros de investigación y grupos de estudio.",
      "Áreas académicas y comités institucionales.",
      "Proyectos y equipos de trabajo colaborativo.",
      "Control efectivo de flujos y roles de trabajo.",
    ],
    indicator: "Colaboración Efectiva",
    mockup: "teams",
  },
  {
    id: "classes",
    title: "Clases",
    highlight: "Todo lo que ocurre en el aula.",
    description:
      "El espacio operativo diario del docente que concentra la gestión del grupo.",
    bullets: [
      "Planeación didáctica y secuenciación.",
      "Registro de asistencia y calificaciones.",
      "Tablero de anuncios y actividades.",
      "Seguimiento integral del estudiante y del grupo.",
    ],
    indicator: "Espacio Operativo de Aula",
    mockup: "classes",
  },
  {
    id: "inbox",
    title: "Inbox",
    highlight: "Toda tu comunicación, en un solo lugar.",
    description:
      "Una bandeja para el trabajo docente, no otra aplicación de mensajería informal.",
    bullets: [
      "Comunicación con tus equipos y otros docentes.",
      "Conexión con la comunidad de usuarios de Lenio.",
      "Mensajes relacionados estrictamente con tu trabajo.",
    ],
    indicator: "Comunicación Enfocada",
    mockup: "inbox",
  },
  {
    id: "builder",
    title: "Constructor de formatos",
    highlight: "Crea exactamente los formatos que necesitas.",
    description:
      "Editor visual reutilizable tipo Word / Canva diseñado para documentos escolares.",
    bullets: [
      "Diseña circulares, planeaciones y rúbricas.",
      "Formatos de evaluación, informes y formularios.",
      "Crea un formato una vez y reutilízalo o modifícalo.",
      "Genera instancias o documentos de un solo uso.",
    ],
    indicator: "Editor Tipo Canva / Word",
    mockup: "builder",
  },
  {
    id: "ai",
    title: "Agentes de IA",
    description:
      "Es IA contextualizada al trabajo real del docente con memoria de tu entorno.",
    bullets: [
      "Memoria contextual continua de tu espacio personal e institucional.",
      "Entiende tus clases, historial, repositorio y documentos previos.",
      "Agentes especializados: Planeador, Evaluador, Actividades y Retroalimentación.",
      "Alineada al contexto de tu colegio y al marco curricular nacional.",
    ],
    mockup: "ai",
  },
  {
    id: "agenda",
    title: "Agenda",
    highlight: "Tu tiempo también pertenece al workspace.",
    description:
      "Cada workspace mantiene su propia agenda para gestionar el tiempo de forma ordenada.",
    bullets: [
      "Visualiza tu horario y compromisos.",
      "Crea eventos y organiza actividades.",
      "Gestiona los eventos institucionales del workspace.",
      "Diferentes contextos de calendario independientes.",
    ],
    indicator: "Gestión de Tiempo Multi-Espacio",
    mockup: "agenda",
  },
];

/* ------------------------------------------------------------------ */
/*  2. MOCKUPS VISUALES PERSONALIZADOS                                 */
/* ------------------------------------------------------------------ */

function MockupFrame({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.12)]">
      <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/70 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
        </div>
        {title && (
          <span className="text-[11px] font-medium text-neutral-400">
            {title}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function WorkspacesMockup() {
  return (
    <MockupFrame title="Un espacio de trabajo para cada contexto">
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-neutral-200/60 bg-neutral-50/50 p-1 shadow-sm">
        <Image
          src="/esp1.png"
          alt="Espacios de trabajo en Lenio"
          width={800}
          height={500}
          className="h-auto max-h-[220px] w-full object-contain rounded-lg transition-transform duration-500 hover:scale-102 sm:max-h-[250px]"
        />
      </div>
    </MockupFrame>
  );
}

function RepositoryMockup() {
  return (
    <MockupFrame title="Repositorio Centralizado">
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-neutral-200/60 bg-neutral-50/50 p-1 shadow-sm">
        <Image
          src="/repo1.png"
          alt="Repositorio Centralizado en Lenio"
          width={800}
          height={500}
          className="h-auto max-h-[220px] w-full object-contain rounded-lg transition-transform duration-500 hover:scale-102 sm:max-h-[250px]"
        />
      </div>
    </MockupFrame>
  );
}

function TeamsMockup() {
  return (
    <MockupFrame title="Equipos Colaborativos">
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-neutral-200/60 bg-neutral-50/50 p-1 shadow-sm">
        <Image
          src="/teams1.png"
          alt="Equipos Colaborativos en Lenio"
          width={800}
          height={500}
          className="h-auto max-h-[220px] w-full object-contain rounded-lg transition-transform duration-500 hover:scale-102 sm:max-h-[250px]"
        />
      </div>
    </MockupFrame>
  );
}

function ClassesMockup() {
  return (
    <MockupFrame title="Espacio Operativo de Aula">
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-neutral-200/60 bg-neutral-50/50 p-1 shadow-sm">
        <Image
          src="/class1.png"
          alt="Espacio Operativo de Aula en Lenio"
          width={800}
          height={500}
          className="h-auto max-h-[220px] w-full object-contain rounded-lg transition-transform duration-500 hover:scale-102 sm:max-h-[250px]"
        />
      </div>
    </MockupFrame>
  );
}

function InboxMockup() {
  return (
    <MockupFrame title="Inbox Trabajo Docente">
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-neutral-200/60 bg-neutral-50/50 p-1 shadow-sm">
        <Image
          src="/inbox1.png"
          alt="Inbox Trabajo Docente en Lenio"
          width={800}
          height={500}
          className="h-auto max-h-[220px] w-full object-contain rounded-lg transition-transform duration-500 hover:scale-102 sm:max-h-[250px]"
        />
      </div>
    </MockupFrame>
  );
}

function BuilderMockup() {
  return (
    <MockupFrame title="Constructor Tipo Canva / Word">
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-neutral-200/60 bg-neutral-50/50 p-1 shadow-sm">
        <Image
          src="/formats1.png"
          alt="Constructor de Formatos en Lenio"
          width={800}
          height={500}
          className="h-auto max-h-[220px] w-full object-contain rounded-lg transition-transform duration-500 hover:scale-102 sm:max-h-[250px]"
        />
      </div>
    </MockupFrame>
  );
}

function AIMockup() {
  return (
    <MockupFrame title="IA Contextualizada al Currículo">
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-neutral-200/60 bg-neutral-50/50 p-1 shadow-sm">
        <Image
          src="/ia.png"
          alt="Agentes de IA en Lenio"
          width={800}
          height={500}
          className="h-auto max-h-[220px] w-full object-contain rounded-lg transition-transform duration-500 hover:scale-102 sm:max-h-[250px]"
        />
      </div>
    </MockupFrame>
  );
}

function AgendaMockup() {
  return (
    <MockupFrame title="Agenda Multi-Workspace">
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-neutral-200/60 bg-neutral-50/50 p-1 shadow-sm">
        <Image
          src="/agenda.png"
          alt="Agenda Multi-Workspace en Lenio"
          width={800}
          height={500}
          className="h-auto max-h-[220px] w-full object-contain rounded-lg transition-transform duration-500 hover:scale-102 sm:max-h-[250px]"
        />
      </div>
    </MockupFrame>
  );
}

function renderMockup(feature: FeatureContent) {
  switch (feature.mockup) {
    case "workspaces":
      return <WorkspacesMockup />;
    case "repository":
      return <RepositoryMockup />;
    case "teams":
      return <TeamsMockup />;
    case "classes":
      return <ClassesMockup />;
    case "inbox":
      return <InboxMockup />;
    case "builder":
      return <BuilderMockup />;
    case "ai":
      return <AIMockup />;
    case "agenda":
      return <AgendaMockup />;
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  3. BLOQUE DE FEATURE (Tarjeta individual con posición alternada) */
/* ------------------------------------------------------------------ */

function FeatureBlock({
  feature,
  index,
}: {
  feature: FeatureContent;
  index: number;
}) {
  const isVisual = Boolean(feature.mockup);
  // Alternar posición visual: en índices impares (1, 3, 5, 7) el mockup aparece primero (arriba)
  const visualTop = index % 2 === 1;

  const textContent = (
    <div className="space-y-3">
      <h3 className="feature-title text-2xl font-semibold tracking-tight text-[#19303E] md:text-3xl lg:text-4xl">
        {feature.title}
      </h3>

      {feature.description && (
        <p className="feature-description text-sm leading-relaxed text-neutral-600 md:text-base">
          {feature.description}
        </p>
      )}

      {feature.bullets && feature.bullets.length > 0 && (
        <ul className="space-y-1.5 pt-1">
          {feature.bullets.map((bullet, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs text-neutral-600 md:text-sm"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {feature.stat && (
        <div className="feature-stat flex items-baseline gap-3 pt-1">
          <span className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            {feature.stat.value}
          </span>
          <span className="text-xs font-medium text-neutral-500 md:text-sm">
            {feature.stat.label}
          </span>
        </div>
      )}
    </div>
  );

  const visualContent = isVisual && (
    <div className={`feature-visual w-full ${visualTop ? "mb-4" : "mt-4"}`}>
      {renderMockup(feature)}
    </div>
  );

  return (
    <div className="feature-card flex h-full w-full flex-col justify-between rounded-3xl border border-neutral-200/80 bg-neutral-50/70 p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-neutral-300 hover:bg-white hover:shadow-md">
      {visualTop ? (
        <>
          {visualContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {visualContent}
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4. SECCIÓN PRINCIPAL (FeaturesSection / FeatureIntro)               */
/* ------------------------------------------------------------------ */

export function FeatureIntro() {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressTopRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  const nextMobileCard = () => {
    setActiveMobileIndex((prev) => (prev + 1) % features.length);
  };

  const prevMobileCard = () => {
    setActiveMobileIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- Desktop / Tablet grande: track horizontal continuo con pin ---
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const wrapper = wrapperRef.current;
        if (!track || !wrapper) return;

        const getScrollDistance = () => track.scrollWidth - window.innerWidth;

        const horizontalTween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const pct = `${p * 100}%`;
              if (progressFillRef.current) {
                progressFillRef.current.style.width = pct;
              }
              if (progressTopRef.current) {
                progressTopRef.current.style.width = pct;
              }
              if (progressTextRef.current) {
                progressTextRef.current.textContent = `${Math.round(p * 100)}%`;
              }
            },
          },
        });

        // Animación de revelado individual por cada tarjeta de funcionalidad al acercarse al viewport
        blockRefs.current.forEach((block) => {
          if (!block) return;
          gsap.fromTo(
            block,
            { opacity: 0.3, x: 50, scale: 0.97 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: block,
                containerAnimation: horizontalTween,
                start: "left 92%",
                end: "left 45%",
                scrub: 0.5,
              },
            }
          );
        });

        return () => {
          horizontalTween.scrollTrigger?.kill();
          horizontalTween.kill();
        };
      });

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="relative bg-white">
      {/* ---------- Móvil / Tablet: Carrusel Interactivo de Funcionalidades ---------- */}
      <div className="block lg:hidden px-4 py-12 sm:px-6 bg-white">
        {/* Header Intro Móvil */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-[#1D5969] to-[#19303E] p-6 text-white shadow-xl">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-white leading-tight sm:text-3xl">
              Todo lo que necesitas para enseñar.
            </h2>
            <p className="text-sm leading-relaxed text-neutral-200">
              Una plataforma diseñada alrededor del trabajo real del docente.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4">
            <span className="text-xs text-white/80">Descubre todas las funcionalidades </span>
            <Image
              src="/logoLenioOscuro.svg"
              alt="Lenio Logo"
              width={90}
              height={90}
              className="h-9 w-auto object-contain"
            />
          </div>
        </div>

        {/* Carrusel Controls */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">


          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevMobileCard}
              aria-label="Anterior funcionalidad"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-100 active:scale-95"
            >
              <ChevronLeft className="h-4 w-4 text-neutral-800" />
            </button>
            <button
              type="button"
              onClick={nextMobileCard}
              aria-label="Siguiente funcionalidad"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-100 active:scale-95"
            >
              <ChevronRight className="h-4 w-4 text-neutral-800" />
            </button>
          </div>
        </div>

        {/* Tarjeta Activa del Carrusel Móvil */}
        <div className="transition-all duration-300">
          <FeatureBlock feature={features[activeMobileIndex]} index={activeMobileIndex} />
        </div>

        {/* Indicadores de Puntos Móvil */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {features.map((f, idx) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveMobileIndex(idx)}
              aria-label={`Ver ${f.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${activeMobileIndex === idx ? "w-7 bg-emerald-600" : "w-2 bg-neutral-200"
                }`}
            />
          ))}
        </div>
      </div>

      {/* ---------- Desktop: Recorrido horizontal continuo con Intro + 8 features ---------- */}
      <div
        ref={wrapperRef}
        className="hidden relative h-auto w-full overflow-hidden bg-white lg:block lg:h-screen"
      >
        <div
          ref={trackRef}
          className="flex h-full flex-col gap-10 px-4 py-16 sm:px-6 lg:w-max lg:flex-row lg:flex-nowrap lg:items-center lg:gap-10 lg:pl-16 lg:pr-[35vw] xl:pr-[40vw] lg:py-12"
        >
          {/* Bloque 0: Tarjeta de Presentación / Intro de la Sección */}
          <div className="flex w-full max-w-xl shrink-0 flex-col justify-center lg:h-[calc(100vh-10rem)] lg:max-h-[640px] lg:min-h-[480px] lg:w-[440px] xl:w-[480px] lg:shrink-0">
            <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-r from-[#1D5969] to-[#19303E] p-8 text-white shadow-xl transition-all duration-300">
              <div className="space-y-5">
                <h2 className="text-3xl font-bold tracking-tight text-white leading-[1.15] md:text-4xl lg:text-5xl">
                  Todo lo que necesitas para enseñar.
                </h2>
                <p className="text-base leading-relaxed text-neutral-200 md:text-lg">
                  Una plataforma diseñada alrededor del trabajo real del docente.
                </p>
              </div>

              <div className="relative z-10 mt-8 ">
                <div className="flex justify-end items-end mb-4">
                  <Image
                    src="/logoLenioOscuro.svg"
                    alt="Lenio Logo"
                    width={150}
                    height={150}
                    className="drop-shadow-[-10px_-10px_15px_rgba(255,255,255,0.31)]"
                  />
                </div>
                <div className=" pt-6 border-t border-white/30 flex items-center justify-between text-xs text-white/80">
                  <span>Descubre todas las funcionalidades</span>
                  <span className="flex items-center gap-1 font-medium text-white">
                    Explorar →
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bloques 1 - 8: Tarjetas de Funcionalidades */}
          {features.map((feature, i) => (
            <div
              key={feature.id}
              ref={(el) => {
                blockRefs.current[i] = el;
              }}
              className="feature-block flex w-full max-w-xl shrink-0 flex-col justify-center lg:h-[calc(100vh-10rem)] lg:max-h-[640px] lg:min-h-[480px] lg:w-[480px] xl:w-[540px] lg:shrink-0"
            >
              <FeatureBlock feature={feature} index={i} />
            </div>
          ))}
        </div>

        {/* Indicador de progreso flotante durante el pin horizontal (Desktop) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-6 z-30 hidden justify-center lg:flex"
        >
          <div className="flex items-center gap-3.5 rounded-full border border-neutral-200/90 bg-white/95 px-5 py-2.5 shadow-lg backdrop-blur-md">
            <span className="text-[11px] font-semibold text-neutral-400">
              Ecosistema
            </span>
            <div className="relative h-2 w-36 overflow-hidden rounded-full bg-neutral-200 md:w-52">
              <div
                ref={progressFillRef}
                className="h-full w-0 rounded-full bg-emerald-600 transition-[width] duration-75 ease-out"
              />
            </div>
            <span
              ref={progressTextRef}
              className="w-9 text-right font-mono text-[11px] font-bold text-neutral-800"
            >
              0%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export { FeatureIntro as FeaturesSection };
export default FeatureIntro;