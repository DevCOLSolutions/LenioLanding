import { use } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

import Header from "@/components/header/Header";
import SchoolsHero from "@/components/schools/SchoolsHero";
import SchoolsPillars from "@/components/schools/SchoolsPillars";
import WorkflowsSection from "@/components/workflows/WorkflowsSection";
import { PricingSection } from "@/components/pricing/pricing-section";
import SchoolsCta from "@/components/schools/SchoolsCta";
import Footer from "@/components/footer/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const descriptions: Record<string, string> = {
    es: "El sistema operativo digital para colegios e instituciones educativas. Matrícula correlativa, Decreto 1290, Ley 115, motor algorítmico de horarios y trazabilidad ISO 21001.",
    en: "The digital operating system for schools and educational institutions. Correlative enrollment, algorithmic timetable solver, and ISO 21001 traceability.",
    pt: "O sistema operacional digital para colégios e instituições de ensino. Matrícula correlativa, gerador de horários e rastreabilidade ISO 21001.",
    it: "Il sistema operativo digitale per scuole e istituti educativi. Iscrizioni correlate, orari con algoritmi e tracciabilità ISO 21001.",
    pl: "Cyfrowy system operacyjny dla szkół i instytucji edukacyjnych. Rejestracja korelacyjna, algorytmiczne plany lekcji i śledzenie ISO 21001.",
    ro: "Sistemul de operare digital pentru școli și instituții de învățământ. Înscrieri corelative, orare algoritmice și trasabilitate ISO 21001.",
  };

  const titles: Record<string, string> = {
    es: "Lenio Schools — Centro de Mando Digital para Colegios",
    en: "Lenio Schools — Digital Command Center for Schools",
    pt: "Lenio Schools — Centro de Comando Digital para Colégios",
    it: "Lenio Schools — Centro di Comando Digitale per Scuole",
    pl: "Lenio Schools — Cyfrowe Centrum Zarządzania dla Szkół",
    ro: "Lenio Schools — Centru Digital de Comandă pentru Școli",
  };

  return {
    title: titles[locale] ?? titles.es,
    description: descriptions[locale] ?? descriptions.es,
  };
}

export default function SchoolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex flex-1 flex-col">
        <SchoolsHero />
        <SchoolsPillars />
        <WorkflowsSection />
        <PricingSection />
        <SchoolsCta />
      </main>
      <Footer />
    </div>
  );
}
