"use client";

import { useTranslations } from "next-intl";
import { Play, Sparkles, BellRing, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ClasesIcon, AgentesIaIcon, InboxIcon, ConstructorFormatosIcon, AgendaIcon, EquiposIcon, FlujosIcon, RepositorioIcon } from "@/components/icons";
import { Link } from "@/i18n/routing";
import { externalLinks, withUtm } from "@/lib/externalLinks";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";

interface FloatingIconProps {
  children: React.ReactNode;
  y?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

function FloatingIcon({
  children,
  y = 7,
  rotate = 3,
  duration = 3.5,
  delay = 0,
  className = "",
}: FloatingIconProps) {
  return (
    <motion.span
      className={`inline-block align-middle mx-1 sm:mx-1.5 select-none cursor-pointer ${className}`}
      animate={{
        y: [-y, y],
        rotate: [-rotate, rotate],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
      whileHover={{
        scale: 1.15,
        filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.12))",
        transition: { type: "spring", stiffness: 400, damping: 15 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  );
}

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="producto"
      className="scroll-mt-20 relative w-full min-h-[90vh] flex items-center justify-center py-16 sm:py-24 overflow-hidden "
    >

      {/* ========================================================================= */}
      {/* 1. CONTENEDOR PRINCIPAL HERO                                              */}
      {/* ========================================================================= */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center gap-10">

        {/* 1.2 Título y Subtítulo con motion escalonado */}
        <div className="w-full text-center max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-heading text-4xl sm:text-6xl md:text-6xl lg:text-6xl font-bold text-[#19303E] leading-[1.18]"
          >
            <FloatingIcon duration={3.2} delay={0} y={7} rotate={-3}>
              <AgendaIcon size={70} />
            </FloatingIcon>
            <FloatingIcon duration={3.8} delay={0.4} y={8} rotate={2}>
              <ClasesIcon size={70} />
            </FloatingIcon>{" "}
            {t("title.part1")}{" "}
            <span
              className="underline decoration-4 underline-offset-4"
            >
              {t("title.part2")}{" "}
              <span className="">{t("title.part3")}</span>
            </span>{" "}
            <FloatingIcon duration={3.4} delay={0.2} y={7} rotate={3}>
              <AgentesIaIcon size={70} />
            </FloatingIcon>
            <FloatingIcon duration={4.1} delay={0.7} y={6} rotate={-2}>
              <RepositorioIcon size={70} />
            </FloatingIcon>{" "}
            {t("title.part4")}{" "}
            <FloatingIcon duration={3.6} delay={0.3} y={8} rotate={-3}>
              <ConstructorFormatosIcon size={70} />
            </FloatingIcon>
            <FloatingIcon duration={3.1} delay={0.8} y={7} rotate={4}>
              <InboxIcon size={70} />
            </FloatingIcon>{" "}
            {t("title.part5")}{" "}
            <FloatingIcon duration={3.9} delay={0.5} y={8} rotate={-2}>
              <EquiposIcon size={70} />
            </FloatingIcon>
            <FloatingIcon duration={3.5} delay={0.1} y={6} rotate={3}>
              <FlujosIcon size={70} />
            </FloatingIcon>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="max-w-6xl mx-auto mt-6 text-base sm:text-lg text-muted-foreground text-balance"
          >
            {t("subtitle")}
          </motion.p>
        </div>




        {/* 1.4 Fila de CTA: Avatares + Botones con micro-interacciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="max-w-6xl mx-auto w-full"
        >
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 items-center">

            {/* Botones de acción principales con motion */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href={withUtm(externalLinks.app, "hero-primary")} className="block">
                  <Button className="h-11 px-7 bg-gradient-to-r from-[#19303E] to-[#1D5969] hover:from-[#152733] hover:to-[#174754] text-white ">
                    {t("ctaStart")} <ArrowUpRight className="ml-1.5 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href="#flujos" className="block">
                  <Button className="h-11 px-6 border-slate-200 text-slate-700 hover:bg-slate-50" variant="outline">
                    <Play className="mr-1.5 w-4 h-4 text-[#1D5969]" /> {t("ctaDemo")}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground font-medium">
            {t("trustNote")}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
