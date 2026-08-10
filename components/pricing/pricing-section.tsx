"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Sparkles,
  Bot,
} from "lucide-react";

import { useCountry } from "@/components/country/country-provider";
import {
  annualProRate,
  annualSchoolRate,
  formatAmount,
  monthlyGoRate,
  planRateForCurrency,
} from "@/lib/country/pricing";
import { toFlagClass } from "@/lib/country/countries";

import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Lite",
    priceType: "free" as const,
    description:
      "Empieza a organizar tu trabajo docente.",
    features: [
      "Workspace personal",
      "Gestión básica de clases",
      "Estudiantes y actividades",
      "Calificaciones básicas",
      "Planeación básica",
      "10 créditos IA al mes",
      "Acceso a modelos básicos",
    ],
    href: "/docs/plans/lite",
  },
  {
    name: "Go",
    priceType: "go" as const,
    description:
      "Las herramientas que necesitas para incorporar Lenio a tu trabajo diario.",
    features: [
      "Todo lo incluido en Lite",
      "Más clases y estudiantes",
      "Evaluaciones y rúbricas",
      "Seguimiento académico",
      "Planeaciones completas",
      "150 créditos IA al mes",
      "Acceso a modelos básicos y estándar",
      "Agentes de IA establecidos",
    ],
    href: "/docs/plans/go",
  },
  {
    name: "Pro",
    priceType: "pro" as const,
    description:
      "Convierte la IA en un verdadero equipo de asistentes para tu trabajo docente.",
    popular: true,
    features: [
      "Todo lo incluido en Go",
      "400 créditos IA al mes",
      "Acceso a modelos avanzados",
      "Agentes de IA establecidos",
      "Crea tus propios agentes de IA",
      "Personalización avanzada de agentes",
      "Análisis avanzado del rendimiento",
      "Automatizaciones con IA",
    ],
    href: "/docs/plans/pro",
  },
  {
    name: "School",
    priceType: "school" as const,
    description:
      "Lleva Lenio a toda tu institución y conecta a tus docentes en un mismo entorno.",
    icon: Building2,
    pricingNote: "Una plaza corresponde a un docente.",
    features: [
      "Workspace institucional",
      "Gestión de docentes",
      "Roles y permisos",
      "Equipos y departamentos",
      "Gestión de plazas",
      "Recursos institucionales",
      "Administración centralizada",
      "Herramientas institucionales de IA",
    ],
    href: "/docs/plans/school",
  },
];

type Billing = "monthly" | "annual";

export function PricingSection() {
  const { selection } = useCountry();
  const rates = planRateForCurrency(selection.currency);
  const money = (amount: number) => formatAmount(amount, selection);
  const [billing, setBilling] = useState<Billing>("monthly");
  const [seats, setSeats] = useState(1);

  return (
    <section id="precios" className="w-full py-20 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">

          <h2 className="text-4xl text-[#19303E] font-bold tracking-tight sm:text-5xl">
            Precios
          </h2>

          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Comienza gratis y escala cuando necesites más capacidades.
          </p>

          {/* Billing toggle */}
          <div className="mt-2 inline-flex items-center rounded-full border bg-muted/60 p-1">
            {(["monthly", "annual"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setBilling(option)}
                className={[
                  "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                  billing === option
                    ? "bg-gradient-to-r from-[#19303E] to-[#1D5969] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {option === "monthly" ? "Mensual" : "Anual"}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="mt-7 grid gap-6 lg:grid-cols-4">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <article
                key={plan.name}
                className={[
                  "relative flex flex-col rounded-2xl border bg-background p-6",
                  "transition-all duration-200",
                  "hover:-translate-y-1 hover:shadow-lg",
                  plan.popular
                    ? "border-primary shadow-md ring-1 ring-primary/20"
                    : "shadow-sm",
                ].join(" ")}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-[#19303E] to-[#1D5969] text-white px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm">

                      Preferido
                    </div>
                  </div>
                )}

                {/* Plan header */}
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-2xl font-semibold tracking-tight">
                      Lenio {plan.name}
                    </h3>
                    <span
                      aria-hidden
                      className={cn(
                        toFlagClass(selection.code),
                        "ml-auto h-3.5 w-5 shrink-0 rounded-[2px] align-middle"
                      )}
                    />
                  </div>


                </div>

                {/* Price */}
                <div className="mt-2">
                  {(plan.priceType === "free" || plan.priceType === "go") && (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold tracking-tight">
                        {plan.priceType === "free"
                          ? "$0"
                          : billing === "annual"
                            ? money(rates.go)
                            : money(monthlyGoRate(rates))}
                      </span>

                      <span className="text-sm text-muted-foreground">
                        {plan.priceType === "free"
                          ? "/ mes"
                          : billing === "annual"
                            ? "/ año"
                            : "/ mes"}
                      </span>
                    </div>
                  )}






                  {plan.priceType === "pro" && (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold tracking-tight">
                          {billing === "annual"
                            ? money(annualProRate(rates))
                            : money(rates.pro)}
                        </span>

                        <span className="text-sm text-muted-foreground">
                          {billing === "annual" ? "/ año" : "/ mes"}
                        </span>
                      </div>


                    </>
                  )}

                  {plan.priceType === "school" && (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold tracking-tight">
                          {billing === "annual"
                            ? money(annualSchoolRate(rates) * seats)
                            : money(rates.school * seats)}
                        </span>

                        <span className="text-sm text-muted-foreground">
                          {billing === "annual"
                            ? "/ año por plaza"
                            : "/ mes por plaza"}
                        </span>
                      </div>




                    </>
                  )}




                </div>



                {/* Features */}
                <div className="flex-1 mt-6">


                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-3 w-3 text-primary" />
                        </span>

                        <span className="leading-5">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.priceType === "school" && (
                  <>



                    {/* Seat simulator */}
                    <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border bg-muted/40 px-3.5 py-3">
                      <span className="text-sm font-medium">
                        Plazas
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          aria-label="Quitar una plaza"
                          onClick={() =>
                            setSeats((value) => Math.max(1, value - 1))
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full border bg-background text-lg leading-none text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
                          disabled={seats <= 1}
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center font-semibold tabular-nums">
                          {seats}
                        </span>
                        <button
                          type="button"
                          aria-label="Añadir una plaza"
                          onClick={() => setSeats((value) => value + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border bg-background text-lg leading-none text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Documentation button */}
                <Link
                  href={plan.href}
                  className={[
                    "group mt-8 inline-flex w-full items-center justify-center gap-2",
                    "rounded-lg border px-4 py-2.5",
                    "text-sm font-medium",
                    "transition-all duration-200",
                    plan.popular
                      ? "border-primary bg-gradient-to-r from-[#19303E] to-[#1D5969] text-white hover:bg-primary/90"
                      : "hover:bg-muted",
                  ].join(" ")}
                >
                  Suscríbete ahora
                </Link>
              </article>
            );
          })}
        </div>

        {/* Credit explanation */}


        {/* Bottom note */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Consulta la <Link href="/docs/plans/pro" className=" underline">documentación</Link> para conocer los límites,
          características y especificaciones completas de cada plan.
        </p>
      </div>
    </section>
  );
}