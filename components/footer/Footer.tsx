"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { externalLinks, withUtm } from "@/lib/externalLinks";
import { CountrySelector } from "@/components/country/country-selector";
import {
  ArrowUpRight,
  Globe2,
  FileText,
  Share2,
} from "lucide-react";
import { Button } from "../ui/button";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();
  const productItems = t.raw("productItems") as string[];

  return (
    <footer className="relative border-t border-neutral-200/80 bg-white text-neutral-700">
      {/* ------------------------------------------------------------------ */}
      {/* 1. CTA Franja Final (Previa al Footer)                              */}
      {/* ------------------------------------------------------------------ */}
      <div className="border-b border-neutral-200/80 bg-gradient-to-r from-[#19303E] to-[#1D5969] px-6 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              {t("ctaTitle")}
            </h2>
            <p className="text-xs text-neutral-200 sm:text-sm">
              {t("ctaSubtitle")}
            </p>
          </div>
          <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto">
            <Link href={withUtm(externalLinks.app, "footer")} target="_blank" rel="noopener noreferrer">
              <Button
                variant="secondary"
                className="inline-flex h-10 items-center gap-2 px-6 shadow-md transition-all hover:shadow-lg"
              >
                {t("ctaButton")} <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Grid Principal Claro Responsivo (5 Columnas)                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-14">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-3 lg:grid-cols-5">
          {/* 1. Columna Marca / Bio */}
          <div className="col-span-2 space-y-4 sm:col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logoLenio.png"
                alt="Lenio Logo"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="text-2xl font-bold tracking-tight text-[#19303E]">
                Lenio.
              </span>
            </div>

            <p className="max-w-sm text-xs leading-relaxed text-neutral-600 sm:max-w-none">
              {t.rich("bio", {
                link: (chunks) => (
                  <strong className="cursor-pointer font-medium text-[#19303E] underline">
                    {chunks}
                  </strong>
                ),
              })}
            </p>

            <div className="pt-2">
              <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
                <Globe2 className="h-3.5 w-3.5 text-[#19303E]" /> {t("countryRegion")}
              </div>
              <CountrySelector />
            </div>
          </div>

          {/* 2. Columna Producto (8 Funcionalidades) */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#19303E]">{t("productTitle")}</h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              {productItems.map((item) => (
                <li key={item}>
                  <Link href="#features" className="transition-colors hover:text-neutral-900">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Columna Compañía */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#19303E]">{t("companyTitle")}</h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <Link href={externalLinks.contacto} className="transition-colors hover:text-neutral-900">
                  {t("aboutCeti")}
                </Link>
              </li>
              <li>
                <a
                  href="https://medium.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-neutral-900"
                >
                  {t("blog")}
                </a>
              </li>
              <li>
                <Link href={externalLinks.contacto} className="transition-colors hover:text-neutral-900">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Columna Recursos */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#19303E]">{t("resourcesTitle")}</h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <Link href={externalLinks.centroAyuda} target="_blank" className="transition-colors hover:text-neutral-900">
                  {t("docs")}
                </Link>
              </li>
              <li>
                <Link href={externalLinks.centroAyuda} target="_blank" className="transition-colors hover:text-neutral-900">
                  {t("helpFaq")}
                </Link>
              </li>
              <li>
                <Link href={externalLinks.documentacion} target="_blank" className="transition-colors hover:text-neutral-900">
                  {t("guides")}
                </Link>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-neutral-900"
                >
                  {t("community")}
                </a>
              </li>
              <li>
                <Link href="#features" className="transition-colors hover:text-neutral-900">
                  {t("changelog")}
                </Link>
              </li>
              <li>
                <Link href="#features" className="transition-colors hover:text-neutral-900">
                  {t("status")}
                </Link>
              </li>
            </ul>
          </div>

          {/* 5. Columna Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#19303E]">{t("legalTitle")}</h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <a href="https://policies.ceti.team/terms" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-900">
                  {t("terms")}
                </a>
              </li>
              <li>
                <a href="https://policies.ceti.team/privacy" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-900">
                  {t("privacy")}
                </a>
              </li>
              <li>
                <a href="https://policies.ceti.team/habeas-data" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-900">
                  {t("dataProtection")}
                </a>
              </li>
              <li>
                <a href="https://policies.ceti.team/cookies" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-900">
                  {t("cookies")}
                </a>
              </li>
              <li>
                <a href="https://policies.ceti.team/sla" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-900">
                  {t("sla")}
                </a>
              </li>
              <li>
                <a href="https://policies.ceti.team/seguridad" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-900">
                  {t("security")}
                </a>
              </li>
              <li>
                <a href="https://policies.ceti.team/creditos" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-900">
                  {t("credits")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Franja Inferior Clara (Bottom Bar)                              */}
      {/* ------------------------------------------------------------------ */}
      <div className="border-t border-neutral-200/80 bg-neutral-50 px-6 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="space-y-1 text-xs text-neutral-600">
            <p>{t("rights", { year: currentYear })}</p>
            <p className="text-neutral-500">{t("madeIn")}</p>
          </div>

          {/* Iconos Redes Sociales */}
          <div className="flex items-center gap-2.5 text-neutral-500">
            <a
              href="https://linkedin.com/company/ceti-team"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white p-2 text-neutral-600 shadow-sm transition-all hover:bg-neutral-100"
              aria-label="LinkedIn CETI TEAM"
            >
              <Share2 className="h-4 w-4" />
            </a>
            <a
              href="https://medium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white p-2 text-neutral-600 shadow-sm transition-all hover:bg-neutral-100"
              aria-label="Medium CETI TEAM"
            >
              <FileText className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
